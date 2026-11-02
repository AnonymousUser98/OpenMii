
//
//  sample.flg
//  Fragment shader
//  Copyright (c) 2014 Nintendo Co., Ltd. All rights reserved.
//
//

#ifdef GL_ES
precision highp float;
#else
#   define lowp
#   define mediump
#   define highp
#endif


//
//  定数定義ファイル
//

/// シェーダーモード
#define FFL_SHADER_MODE_UR 0
#define FFL_SHADER_MODE_UB 1

/// 変調処理のマクロ
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5

/// スペキュラのモード
#define FFL_SPECULAR_MODE_BLINN 0
#define FFL_SPECULAR_MODE_ANISO 1

/// ライトのON/OFF
#define FFL_LIGHT_MODE_DISABLE 0
#define FFL_LIGHT_MODE_ENABLE 1

/// フラグメントのディスカードモード
#define FFL_DISCARD_FRAGMENT_DISABLE 0
#define FFL_DISCARD_FRAGMENT_ENABLE  1

/// 座標変換モード
#define FFL_COORDINATE_MODE_NONE   0
#define FFL_COORDINATE_MODE_NORMAL 1

//
//  関数の定義ファイル
//

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] tangent 接線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateAnisotropicSpecular(mediump vec3 light, mediump vec3 tangent, mediump vec3 eye, mediump float power )
{
	mediump float dotLT = dot(light, tangent);
	mediump float dotVT = dot(eye, tangent);
	mediump float dotLN = sqrt(1.0 - dotLT * dotLT);
	mediump float dotVR = dotLN*sqrt(1.0 - dotVT * dotVT) - dotLT * dotVT;

	return pow(max(0.0, dotVR), power);
}

/**
 * @brief 異方性反射の反射率を計算します。
 * @param[in] light   ライトの向き
 * @param[in] normal  法線
 * @param[in] eye     視線の向き
 * @param[in] power   鋭さ
 */
mediump float calculateBlinnSpecular(mediump vec3 light, mediump vec3 normal, mediump vec3 eye, mediump float power)
{
	return pow(max(dot(reflect(-light, normal), eye), 0.0), power);
}

/**
 * @brief 異方性反射、ブリン反射をブレンドします。
 * @param[in] blend ブレンド率
 * @param[in] blinn ブリンの値
 * @param[in] aniso 異方性の値
 */
mediump float calculateSpecularBlend(mediump float blend, mediump float blinn, mediump float aniso)
{
	return mix(aniso, blinn, blend);
}

/**
 * @brief アンビエントを計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 */
mediump vec3 calculateAmbientColor(mediump vec3 light, mediump vec3 material)
{
	return light * material;
}

/**
 * @brief 拡散を計算します。
 * @param[in] light    ライト
 * @param[in] material マテリアル
 * @param[in] ln       ライトと法線の内積
 */
mediump vec3 calculateDiffuseColor(mediump vec3 light, mediump vec3 material, mediump float ln)
{
	return light * material * ln;
}

/**
 * @brief 鏡面反射を計算します。
 * @param[in] light      ライト
 * @param[in] material   マテリアル
 * @param[in] reflection 反射率
 * @param[in] strength   幅
 */
mediump vec3 calculateSpecularColor(mediump vec3 light, mediump vec3 material, mediump float reflection, mediump float strength)
{
	return light * material * reflection * strength;
}

/**
 * @brief リムを計算します。
 * @param[in] color   リム色
 * @param[in] normalZ 法線のZ方向
 * @param[in] width   リム幅
 * @param[in] power   リムの鋭さ
 */
mediump vec3 calculateRimColor(mediump vec3 color, mediump float normalZ, mediump float width, mediump float power)
{
	return color * pow(width * (1.0 - abs(normalZ)), power);
}

/**
 * @brief ライト方向と法線の内積を求める
 * @note 特殊な実装になっています。
 */
mediump float calculateDot(mediump vec3 light, mediump vec3 normal)
{
	return max(dot(light, normal), 0.1);
}

// フラグメントシェーダーに入力される varying 変数
varying highp vec4 v_color;          //!< 出力: 頂点の色
varying highp   vec4 v_position;       //!< 出力: 位置情報
varying highp   vec3 v_normal;         //!< 出力: 法線ベクトル
// NOTE: ^^ Those two need to be highp to avoid weird black dot issue on Android
varying mediump vec3 v_tangent;        //!< 出力: 異方位
varying highp vec2 v_texCoord;       //!< 出力: テクスチャー座標

/// constカラー
uniform mediump vec4  u_const1; ///< constカラー1
uniform mediump vec4  u_const2; ///< constカラー2
uniform mediump vec4  u_const3; ///< constカラー3
uniform mediump vec4  u_const4; ///< constカラー4

/// ライト設定
uniform mediump vec3 u_light_ambient;  ///< カメラ空間のライト方向
uniform mediump vec3 u_light_diffuse;  ///< 拡散光用ライト
uniform mediump vec3 u_light_dir;
uniform bool u_light_enable;
uniform mediump vec3 u_light_specular; ///< 鏡面反射用ライト強度

/// マテリアル設定
uniform mediump vec3 u_material_ambient;         ///< 環境光用マテリアル設定
uniform mediump vec3 u_material_diffuse;         ///< 拡散光用マテリアル設定
uniform mediump vec3 u_material_specular;        ///< 鏡面反射用マテリアル設定
uniform int u_material_specular_mode;            ///< スペキュラの反射モード(CharModelに依存する設定のためub_modulateにしている)
uniform mediump float u_material_specular_power; ///< スペキュラの鋭さ(0.0を指定すると頂点カラーの設定が利用される)

/// 変調設定
uniform int u_mode;   ///< 描画モード
uniform int u_type;

/// リム設定
uniform mediump vec3  u_rim_color;
uniform mediump float u_rim_power;

// サンプラー
uniform sampler2D s_texture;
uniform sampler2D s_overlay;


varying mediump vec3 v_modelPos;
uniform bool u_useHairTip;
uniform bool u_hairTipFlip;
uniform mediump vec3 u_hairTipColor;
uniform mediump vec3 u_hairTipDir;
uniform mediump float u_hairTipPos;

// -------------------------------------------------------
// メイン文
void main()
{
    mediump vec4 color;

    mediump float specularPower    = u_material_specular_power;
    mediump float rimWidth         = v_color.a;

//#ifdef FFL_MODULATE_MODE_CONSTANT
    if(u_mode == FFL_MODULATE_MODE_CONSTANT)
    {
      color = u_const1;
    }
    // modified to handle u_const1 alpha:
//#elif defined(FFL_MODULATE_MODE_TEXTURE_DIRECT)
    else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.rgb, u_const1.a * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_RGB_LAYERED)
    else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(u_const1.rgb, u_const1.a * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA_OPA)
    else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA)
    {
        mediump vec4 texel = texture2D(s_texture, v_texCoord);
        color = vec4(texel.r * u_const1.rgb, u_const1.a);
    } else if (u_mode == 6) {
    mediump vec4 texel = texture2D(s_texture, v_texCoord);
    color = vec4(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), 1.0);
  }
  else if (u_mode == 7) {
    mediump vec4 texel = texture2D(s_texture, v_texCoord);
    mediump vec4 overlay = texture2D(s_overlay, v_texCoord);
    color = vec4(mix(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
  }
//#endif

if (u_type == 4) {
  if (u_useHairTip == true) {
    vec3 dirVec = normalize(u_hairTipDir);
    if (u_hairTipFlip) { dirVec.x *= -1.0; }
    vec3 topColor = color.rgb;
    vec3 bottomColor = u_hairTipColor;
    float p = dot(v_modelPos, normalize(dirVec));
    float r = clamp(p / u_hairTipPos, 0.0, 1.0);
    vec3 midColor = mix(bottomColor, topColor, 0.5);
    midColor = mix(midColor, max(bottomColor, topColor), 0.25); 
    vec3 finalColor;
    if (r < 0.5) { finalColor = mix(bottomColor, midColor, r * 2.0); } else { finalColor = mix(midColor, topColor, (r - 0.5) * 2.0); }
    color.rgb = finalColor;
  }}

    // avoids little outline around mask elements
    if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0)
    {
        discard;
    }

//#ifdef FFL_LIGHT_MODE_ENABLE
    if(u_light_enable)
    {
        /// 環境光の計算
        mediump vec3 ambient = calculateAmbientColor(u_light_ambient.xyz, u_material_ambient.xyz);

        /// 法線ベクトルの正規化
        mediump vec3 norm = normalize(v_normal);

        /// 視線ベクトル
        mediump vec3 eye = normalize(-v_position.xyz);

        // ライトの向き
        mediump float fDot = calculateDot(u_light_dir, norm);

        /// Diffuse計算
        mediump vec3 diffuse = calculateDiffuseColor(u_light_diffuse.xyz, u_material_diffuse.xyz, fDot);

        /// Specular計算
        mediump float specularBlinn = calculateBlinnSpecular(u_light_dir, norm, eye, u_material_specular_power);

        /// Specularの値を確保する変数を宣言
        mediump float reflection;
        mediump float strength = v_color.g;
        if(u_material_specular_mode == 0)
        {
            /// Blinnモデルの場合
            strength = 1.0;
            reflection = specularBlinn;
        }
        else
        {
            /// Aisoモデルの場合
            mediump float specularAniso = calculateAnisotropicSpecular(u_light_dir, v_tangent, eye, u_material_specular_power);
            reflection = calculateSpecularBlend(v_color.r, specularBlinn, specularAniso);
        }
        /// Specularの色を取得
        mediump vec3 specular = calculateSpecularColor(u_light_specular.xyz, u_material_specular.xyz, reflection, strength);

        // リムの色を計算
        mediump vec3 rimColor = calculateRimColor(u_rim_color.rgb, norm.z, rimWidth, u_rim_power);

        // カラーの計算
        color.rgb = (ambient + diffuse) * color.rgb + specular + rimColor;
    }
//#endif

    gl_FragColor = color;
}
