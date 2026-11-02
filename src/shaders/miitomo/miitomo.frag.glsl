
#define AGX_FEATURE_ALBEDO_TEXTURE

#define AGX_FEATURE_MII
/**
 * @file    LUT.fsh
 * @brief   LUT
 * @since   2014/10/02
 *
 * Copyright (c)2014 Nintendo Co., Ltd. All rights reserved.
 */

// シェーダーの種類毎に設定されるマクロリスト
// AGX_FEATURE_VERTEX_COLOR         頂点カラーが有効
// AGX_FEATURE_ALBEDO_TEXTURE       アルベドテクスチャーが有効
// AGX_FEATURE_BUMP_TEXTURE         バンプテクスチャーが有効
// AGX_FEATURE_MASK_TEXTURE         マスクテクスチャーが有効
// AGX_FEATURE_ALPHA_TEXTURE        アルファテクスチャーが有効
// AGX_FEATURE_SPHERE_MAP_TEXTURE   スフィア環境マップが有効
// AGX_FEATURE_SKIN_MASK            肌マスクが有効（uColor0）
// AGX_FEATURE_HAIR_MASK            髪マスクが有効（uColor1）
// AGX_FEATURE_ALPHA_TEST           アルファテストが有効
// AGX_FEATURE_FADE_OUT_COLOR       フェードアウトカラーが有効（uColor2）
// AGX_FEATURE_DISABLE_LIGHT        ライトが無効
// AGX_FEATURE_ALPHA_COLOR_FILTER   アルベドアルファによる色替えが有効
// AGX_FEATURE_ALBEDO_ALPHA         アルベドのアルファをカラーのアルファに適用
// AGX_FEATURE_PREMULTIPLY_ALPHA    プレマルチプライアルファな描画
// AGX_FEATURE_MII                  Miiを描画する
// AGX_FEATURE_MII_CONSTANT         Miiを描画する：Constant
// AGX_FEATURE_MII_TEXTURE_DIRECT   Miiを描画する：Texture Direct
// AGX_FEATURE_MII_RGB_LAYERED      Miiを描画する：RGB Layered
// AGX_FEATURE_MII_ALPHA            Miiを描画する：Alpha
// AGX_FEATURE_MII_LUMINANCE_ALPHA  Miiを描画する：Luminance Alpha
// AGX_FEATURE_MII_ALPHA_OPA        Miiを描画する：Alpha Opa
// AGX_FEATURE_GHOST                👻 (custom)

#ifdef GL_ES
precision mediump float;
#else
#   define lowp
#   define mediump
#   define highp
#endif

/// 変調処理のマクロ
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5
#define FFL_MODULATE_MODE_OUTFIT          6
#define FFL_MODULATE_MODE_OUTFIT_OVERLAY  7

#if defined(AGX_FEATURE_GHOST)
#define AGX_GHOST_MODULATE_FACELINE       0
#define AGX_GHOST_MODULATE_FOREHEAD       3
#define AGX_GHOST_MODULATE_HAIR           4
#define AGX_GHOST_MODULATE_CAP            5
#define AGX_GHOST_MODULATE_MAX            5
#define AGX_GHOST_MODULATE_BODY           9
#define AGX_GHOST_MODULATE_PANTS         10
#endif

// ----------------------------------------
// フラグメントシェーダーに入力される uniform 変数
#if defined(AGX_FEATURE_GHOST)
uniform mediump vec3 uGhostColor;
uniform float uGhostStrength;
uniform int   uGhostMode;
#endif
uniform int   uMode;   ///< 描画モード
uniform int   uType;   ///< 描画モード
uniform bool uAlphaTest;
uniform bool uLightEnable;
uniform mediump vec4    uColor0;            //!< 入力:[ 1 : 1 ] カラー0 (OR 肌カラー)
uniform mediump vec4    uColor1;            //!< 入力:[ 1 : 2 ] カラー1 (OR 髪カラー)
uniform mediump vec4    uColor2;            //!< 入力:[ 1 : 3 ] カラー2 (OR フェードアウトカラー)
uniform mediump vec4    uColor3;            //!< 入力:[ 1 : 4 ] カラー3 (OR テレサ)
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
uniform mediump vec3    uLightColor;        //!< 入力:[ 1 : 4 ] ライトの色
//#endif

#if defined(AGX_FEATURE_ALBEDO_TEXTURE)
uniform sampler2D       uAlbedoTexture;     //!< 入力: テクスチャー
#endif
#if defined(AGX_FEATURE_BUMP_TEXTURE)
uniform sampler2D       uNormalTexture;     //!< 入力: ノーマルマップ
#endif
#if defined(AGX_FEATURE_MASK_TEXTURE)
uniform sampler2D       uMaskTexture;       //!< 入力：マスクテクスチャー
#endif
#if defined(AGX_FEATURE_ALPHA_TEXTURE)
uniform sampler2D       uAlphaTexture;      //!< 入力：アルファテクスチャー
#endif
uniform sampler2D       uLUTSpecTexture;    //!< 入力: スペキュラーLUT
uniform sampler2D       uLUTFresTexture;    //!< 入力: フレネルLUT
#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
uniform sampler2D       uSphereMapTexture;  //!< 入力: スフィア環境マップ
#endif

uniform sampler2D       uOverlayTexture;

// ----------------------------------------
// フラグメントシェーダーに渡される varying 変数
varying lowp    vec4    vModelColor;                            //!< 出力:[ 1 : 1 ] モデルの色
#if !defined(AGX_FEATURE_BUMP_TEXTURE)
varying mediump vec3    vNormal;                                //!< 出力:[ 1 : 2 ] モデルの法線
#endif
#if defined(AGX_FEATURE_ALBEDO_TEXTURE) || defined(AGX_FEATURE_BUMP_TEXTURE) || defined(AGX_FEATURE_MASK_TEXTURE) || defined(AGX_FEATURE_ALPHA_TEXTURE)
varying mediump vec2    vTexcoord0;                             //!< 出力:[ 1 : 3 ] テクスチャーUV
#endif
// camera
varying mediump vec3    vEyeVecWorldOrTangent;                  //!< 出力:[ 1 : 4 ] 視線ベクトル
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
// punctual light
varying mediump vec3    vPunctualLightDirWorldOrTangent;        //!< 出力:[ 1 : 5 ] ライトの方向
varying mediump vec3    vPunctualLightHalfVecWorldOrTangent;    //!< 出力:[ 1 : 6 ] カメラとライトのハーフベクトル
// GI
varying mediump vec3    vGISpecularLightColor;                  //!< 出力:[ 1 : 7 ] GIフレネルで使用するカラー
// Lighting Result
varying mediump vec3    vDiffuseColor;                          //!< 出力:[ 1 : 8 ] ディフューズライティング結果
//#endif
// Reflect
#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
varying lowp    vec3    vReflectDir;                            //!< 出力:[ 1 : 9 ] 環境マップの反射ベクトル
#endif

varying mediump vec3 v_modelPos;
uniform bool u_useHairTip;
uniform mediump vec3 u_hairTipColor;
uniform mediump vec3 u_hairTipDir;
uniform mediump float u_hairTipPos;
uniform bool u_hairTipFlip;

// ------------------------------------------------------------
// フラグメントシェーダーのエントリーポイント
// ------------------------------------------------------------
void main()
{

    // ディフューズカラーを取得
    lowp vec4 albedoColor = vec4(1.0, 1.0, 1.0, 1.0);

#if defined(AGX_FEATURE_GHOST)
    lowp vec4 facelineTex;
#endif

    // ============================================================
    //  Mii
    // ============================================================
#if defined(AGX_FEATURE_MII)

   //#if defined(AGX_FEATURE_MII_CONSTANT)
    if(uMode == FFL_MODULATE_MODE_CONSTANT)
    {
        albedoColor = uColor0;
    }
    //#elif defined(AGX_FEATURE_MII_TEXTURE_DIRECT)
    else if(uMode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
    {
       albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
#if defined(AGX_FEATURE_GHOST)
      if (uType == AGX_GHOST_MODULATE_FACELINE && uMode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
      {
        facelineTex = albedoColor;
      }
#endif
    }
    //#elif defined(AGX_FEATURE_MII_RGB_LAYERED)
    else if(uMode == FFL_MODULATE_MODE_RGB_LAYERED)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.r * uColor0.rgb + albedoColor.g * uColor1.rgb + albedoColor.b * uColor2.rgb,
                           uColor0.a * albedoColor.a);
    }
    //#elif defined(AGX_FEATURE_MII_ALPHA)
    else if(uMode == FFL_MODULATE_MODE_ALPHA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(uColor0.rgb, uColor0.a * albedoColor.r);
    }
    //#elif defined(AGX_FEATURE_MII_LUMINANCE_ALPHA)
    else if(uMode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.g * uColor0.rgb, uColor0.a * albedoColor.r);
    }
    //#elif defined(AGX_FEATURE_MII_ALPHA_OPA)
    else if(uMode == FFL_MODULATE_MODE_ALPHA_OPA)
    {
        albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
        albedoColor = vec4(albedoColor.r * uColor0.rgb, uColor0.a);
    }
    else if (uMode == FFL_MODULATE_MODE_OUTFIT) {
    mediump vec4 texel = texture2D(uAlbedoTexture, vTexcoord0);
    albedoColor = vec4(mix(uColor3.rgb, texel.r * uColor0.rgb + texel.g * uColor1.rgb + texel.b * uColor2.rgb, texel.a), 1.0);
    }
    else if (uMode == FFL_MODULATE_MODE_OUTFIT_OVERLAY) {
      mediump vec4 texel = texture2D(uAlbedoTexture, vTexcoord0);
      mediump vec4 overlay = texture2D(uOverlayTexture, vTexcoord0);
      albedoColor = vec4(mix(mix(uColor3.rgb, texel.r * uColor0.rgb + texel.g * uColor1.rgb + texel.b * uColor2.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
    }
//#endif

  if (uType==4){
  if (u_useHairTip==true) {
    vec3 dirVec = normalize(u_hairTipDir);
    if (u_hairTipFlip) { dirVec.x *= -1.0; }
    vec3 topColor = albedoColor.rgb;
    vec3 bottomColor = u_hairTipColor;
    float p = dot(v_modelPos, normalize(dirVec));
    float r = clamp(p / u_hairTipPos, 0.0, 1.0);
    albedoColor.rgb = mix(bottomColor, topColor, r);
  }}

    albedoColor = albedoColor * vModelColor;
#endif

    // ============================================================
    //  Albedo Texture
    // ============================================================
#if !defined(AGX_FEATURE_MII) && defined(AGX_FEATURE_ALBEDO_TEXTURE)
    albedoColor = texture2D(uAlbedoTexture, vTexcoord0);
#endif
#if defined(AGX_FEATURE_ALPHA_TEXTURE)
    albedoColor.a   = texture2D(uAlphaTexture, vTexcoord0).r;
#endif

    // ============================================================
    //  Color Mask
    // ============================================================
    // ----------------------------------------
    // Deprecated
#if defined(AGX_FEATURE_ALPHA_COLOR_FILTER)
    // 一部の場所にColor0を反映する
    albedoColor.rgb = (albedoColor.rgb * albedoColor.a + uColor0.rgb * (1.0 - albedoColor.a));
    albedoColor.a = 1.0;
#elif defined(AGX_FEATURE_MASK_TEXTURE)
    // lowp vec3  maskTextureColor = texture2D(uMaskTexture, vTexcoord0).rgb;
    lowp vec4  maskTextureColor = texture2D(uMaskTexture, vTexcoord0).rgba;

#   if defined(AGX_FEATURE_SKIN_MASK) && defined(AGX_FEATURE_HAIR_MASK)
    // 肌と髪両方マスクが存在する
    lowp float maskColorValue = maskTextureColor.g + maskTextureColor.b;
    lowp vec3  maskColor      = maskTextureColor.g * uColor0.rgb + maskTextureColor.b * uColor1.rgb;
    albedoColor.rgb = (albedoColor.rgb * (1.0 - maskColorValue) + maskColor);

#   elif defined(AGX_FEATURE_SKIN_MASK)
    // 肌しかマスクが存在しない
    // albedoColor.rgb = (albedoColor.rgb * (1.0 - maskTextureColor.g) + maskTextureColor.g * uColor0.rgb);
    albedoColor.rgb = ((albedoColor.rgb * maskTextureColor.a) + (1.0 - maskTextureColor.a) * uColor0.rgb);

#   elif defined(AGX_FEATURE_HAIR_MASK)
    // 髪しかマスクが存在しない
    albedoColor.rgb = (albedoColor.rgb * (1.0 - maskTextureColor.b) + maskTextureColor.b * uColor1.rgb);

#   endif
#endif

    // Multiply the Albedo with the vertex color
    albedoColor *= vModelColor;

    // ============================================================
    //  Alpha test
    // ============================================================
//#if defined(AGX_FEATURE_ALPHA_TEST)
    if (uAlphaTest && albedoColor.a < 0.5) { discard; }
//#endif

    // ============================================================
    //  Bumpmap
    // ============================================================
    // 頂点からの情報
    lowp vec3 normalWorldOrTangent;
#if defined(AGX_FEATURE_BUMP_TEXTURE)
    // バンプマップから法線を取得する
    mediump vec3 bumpNormal = texture2D(uNormalTexture, vTexcoord0).rgb;

    // 法線の正規化は処理が重いのでいったん正規化しない様に...
//    normalWorldOrTangent = normalize(bumpNormal * 2.0 - 1.0);
    normalWorldOrTangent = bumpNormal * 2.0 - 1.0;

#else
    // 法線を正規化して取得する
    normalWorldOrTangent = normalize(vNormal);
#endif

    // ============================================================
    //  Lighting
    // ============================================================
    // 最終的なカラー情報
    lowp vec4 colorOut = vec4(0.0, 0.0, 0.0, albedoColor.a);  // 最終的に出力される色
    mediump vec3 fresnel  = vec3(0.0, 0.0, 0.0);   // フレネル
    mediump vec3 specular = vec3(0.0, 0.0, 0.0);   // スペキュラー

//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
if (uLightEnable) {

    // BRDFの計算を行う（バンプマッピングの場合は接空間）
    lowp vec3 N = normalWorldOrTangent;
    lowp vec3 V = vEyeVecWorldOrTangent.xyz;//normalize(vEyeVecWorldOrTangent.xyz);
    lowp vec3 I = vPunctualLightDirWorldOrTangent.xyz;//normalize(vPunctualLightDirWorldOrTangent.xyz);
    lowp vec3 H = vPunctualLightHalfVecWorldOrTangent.xyz;//normalize(vPunctualLightHalfVecWorldOrTangent.xyz);


    // ----------------------------------------
    // punctual light
    // 平行光源や点光源などの厳密なライティング計算を行なうもの
    {
        lowp float fSpecular = dot(N, H);

        lowp float specularIntensity = texture2D(uLUTSpecTexture, vec2(fSpecular)).r;
        specular = (specularIntensity * uLightColor.rgb);
    }

    // ----------------------------------------
    // GI
    // 半球ライトやIBL、SHのように法線方向に半球積分された結果でライティング計算を行なうもの
    {
        lowp float fFresnel = dot(N, V);
        lowp float fresnelIntensity = texture2D(uLUTFresTexture, vec2(fFresnel)).r;

        fresnel = (fresnelIntensity * vGISpecularLightColor.rgb);
    }
}
//#endif

#if defined(AGX_FEATURE_SPHERE_MAP_TEXTURE)
    // スフィア環境マップ
    specular += texture2D(uSphereMapTexture, vReflectDir.xy).rgb;
#endif

    float alpha = albedoColor.a;

    // ============================================================
    //  Specular Mask
    // ============================================================
#if !defined(AGX_FEATURE_ALPHA_COLOR_FILTER) && defined(AGX_FEATURE_MASK_TEXTURE)
  #if defined(AGX_FEATURE_GHOST)
        // vec3 v = ((1.0 - maskTextureColor.a) * vec3(1.0, 0.0, 0.0)) * uGhostStrength;
        vec3 v = uGhostColor;
        // vec3 tex = texture2D(uAlbedoTexture, vTexcoord0);
        if (maskTextureColor.a > 0.5) {
          // v = uGhostColor;
          // colorOut.a = 0.5;
          specular = (fresnel + specular) * v;
        } else {
          vec3 specIntensity = fresnel + specular;
          vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));
          specular = specIntensity * tint * (uGhostStrength * 2.5);
          alpha = clamp(specular.r, 0.65, 1.0);
          albedoColor.rgb = uGhostColor;// * 0.65;


    //         vec3 specIntensity = fresnel + specular;
    // vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));

    // specular = specIntensity * tint * (uGhostStrength * 2.0);
    // alpha    = (specIntensity * uGhostStrength).r;
    // albedoColor.rgb = uGhostColor;
        }
        // albedoColor.rgb = vec3(0.0,0.0,maskTextureColor.a);
  #else
        specular = specular * (1.0 - maskTextureColor.a) + fresnel;
  #endif
#else
    specular += fresnel;
#endif

#if defined(AGX_FEATURE_GHOST)
if (uType == AGX_GHOST_MODULATE_HAIR) {
  if (uGhostMode == 0) {
    vec3 specIntensity = fresnel + specular;
    vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));
    
    specular = specIntensity * tint * uGhostStrength;
    alpha = clamp(specular.r, 0.65, 1.0);
    albedoColor.rgb = uGhostColor - 0.25;
  } else {
    vec3 specIntensity = fresnel + specular;
    vec3 col = vec3(uColor0);
    vec3 tint = mix(vec3(1.0), col, step(0.001, length(col)));
    specular = specIntensity * tint * uGhostStrength;
    alpha = clamp(specular.r, 0.65, 1.0);
  }
} /*else if (uType == AGX_GHOST_MODULATE_CAP) {
  vec3 specIntensity = fresnel + specular;
  vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));

  specular = specIntensity * tint * uGhostStrength;
  alpha = clamp(specular.r, 0.4, 1.0);
  // albedoColor.rgb = uGhostColor;
} */else if (uType == AGX_GHOST_MODULATE_FACELINE || uType == AGX_GHOST_MODULATE_FOREHEAD) {
  vec3 specIntensity = fresnel + specular;
  vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));
  specular = specIntensity * tint * (uGhostStrength * 2.5);
  alpha = clamp(specular.r, 0.65, 1.0);
  albedoColor.rgb = mix(uGhostColor, facelineTex.rgb, facelineTex.a);
  // specular=vec3(0.0);
  // albedoColor.rgb = uGhostColor;// * 0.65;
} else if (uType < AGX_GHOST_MODULATE_MAX || ((uType == AGX_GHOST_MODULATE_BODY || uType == AGX_GHOST_MODULATE_PANTS) && uMode == FFL_MODULATE_MODE_CONSTANT)) {
  // vec3 v = uGhostColor * uGhostStrength;
  // specular = (fresnel + specular) * v;
  // alpha = specular.r;
  // albedoColor.rgb = uGhostColor;

  vec3 specIntensity = fresnel + specular;
  vec3 tint = mix(vec3(1.0), uGhostColor, step(0.001, length(uGhostColor)));

  specular = specIntensity * tint * uGhostStrength;
  alpha = clamp(specular.r, 0.65, 1.0);
  albedoColor.rgb = uGhostColor;
} 
#endif

    // ============================================================
    //  Output
    // ============================================================
//#if !defined(AGX_FEATURE_DISABLE_LIGHT)
if (uLightEnable)
    colorOut.rgb = vDiffuseColor.rgb * albedoColor.rgb + specular;
//#else
else
    colorOut.rgb = albedoColor.rgb;
//#endif

    // フェードアウトを実装する
#if defined(AGX_FEATURE_FADE_OUT_COLOR)
    colorOut.rgb = (colorOut.rgb * (1.0 - uColor2.a)) + (uColor2.rgb * uColor2.a);
#endif

    colorOut.a = alpha;

    // 色を反映させる
    gl_FragColor = colorOut;

    //#include <tonemapping_fragment>
    //#include <colorspace_fragment>
}
