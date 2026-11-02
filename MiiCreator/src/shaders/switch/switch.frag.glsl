
// Switch Shader aka SampleShader, ported to Three.js by kat21
// Intended for use in Mii Creator, with custom edits made for it.
#define VARYING_QUALIFIER in
#define VARYING_INSTANCE In
precision highp float;

varying highp vec2 i_texCoord;
varying highp vec3 i_normal;
varying highp float i_specularMix;
varying highp vec3 i_modelPos;

uniform int u_type;
uniform int modulateType;
uniform int gammaType;
uniform int drawType;
uniform bool ignoreMatColor;
uniform int pad0;
uniform vec4 u_ConstColor0;
uniform vec4 u_ConstColor1;
uniform vec4 u_ConstColor2;
uniform vec4 u_ConstColor3;
uniform vec4 lightDirInView;
uniform vec4 lightColor;
uniform vec4 u_SssColor;
uniform vec4 u_SpecularColor;
uniform vec4 u_RimColor;

uniform highp float u_HalfLambertFactor;
uniform highp float u_SssSpecularFactor;
uniform highp float u_SpecularFactorA;
uniform highp float u_SpecularFactorB;
uniform highp float u_SpecularShininess;
uniform highp float u_RimPower;
uniform highp float u_RimWidth;
uniform highp sampler2D s_Tex;
uniform highp sampler2D s_Ovl;

uniform bool u_useHairTip;
uniform bool u_hairTipFlip;
uniform vec3 u_hairTipColor;
uniform vec3 u_hairTipDir;
uniform float u_hairTipPos;

// MAT 2 - SKIN/HAIR ALT
uniform vec4 u2_SssColor;
uniform vec4 u2_SpecularColor;
uniform vec4 u2_RimColor;
uniform highp float u2_HalfLambertFactor;
uniform highp float u2_SssSpecularFactor;
uniform highp float u2_SpecularFactorA;
uniform highp float u2_SpecularFactorB;
uniform highp float u2_SpecularShininess;
uniform highp float u2_RimPower;
uniform highp float u2_RimWidth;
// MAT 3 - SHIRT
uniform vec4 u3_SssColor;
uniform vec4 u3_SpecularColor;
uniform vec4 u3_RimColor;
uniform highp float u3_HalfLambertFactor;
uniform highp float u3_SssSpecularFactor;
uniform highp float u3_SpecularFactorA;
uniform highp float u3_SpecularFactorB;
uniform highp float u3_SpecularShininess;
uniform highp float u3_RimPower;
uniform highp float u3_RimWidth;
uniform highp sampler2D s_MaskTex;
// 👻 effect went unused here :(
uniform bool SAMPLE_MASK_TEXTURE;

/// 変調モード
#define MODULATE_TYPE_CONSTANT        ( 0 )
#define MODULATE_TYPE_TEXTRUE         ( 1 )
#define MODULATE_TYPE_LAYERED         ( 2 )
#define MODULATE_TYPE_ALPHA           ( 3 )
#define MODULATE_TYPE_ALPHA_OPA       ( 4 )
#define MODULATE_TYPE_GLASS           ( 5 )
#define MODULATE_TYPE_ICONBODY        ( 6 )

#define USE_DEGAMMA(type) (type != 0)

#define DRAW_TYPE_NORMAL   0
#define DRAW_TYPE_FACELINE 1
#define DRAW_TYPE_HAIR     2

vec3 ToLinear(vec3 rgb) {
  return pow(rgb, vec3(2.2));
}

vec3 ToSrgb(vec3 rgb) {
  return pow(rgb, vec3(1.0 / 2.2));
}

vec3 GetRimColor(vec3 color, float normalZ, float width, float power) {
  return color * pow(width * (1.0 - abs(normalZ)), power);
}

vec4 GetAlbedo() {
  vec4 texel;
  vec4 albedo;
  if(modulateType != MODULATE_TYPE_CONSTANT) {
    texel = texture(s_Tex, i_texCoord);
  }
  switch(modulateType) {
    case MODULATE_TYPE_CONSTANT:
      albedo = vec4(u_ConstColor0.rgb, 1.0);
      break;
    case MODULATE_TYPE_TEXTRUE:
      albedo = texel;
      break;
    case MODULATE_TYPE_LAYERED:
      albedo = vec4(u_ConstColor0.rgb * texel.r + u_ConstColor1.rgb * texel.g + u_ConstColor2.rgb * texel.b, texel.a);
      break;
    case MODULATE_TYPE_ALPHA:
      albedo = vec4(u_ConstColor0.rgb, texel.r);
      break;
    case MODULATE_TYPE_ALPHA_OPA:
      albedo = vec4(u_ConstColor0.rgb * texel.r, 1.0);
      break;
    case MODULATE_TYPE_GLASS:
      albedo = vec4(u_ConstColor0.rgb * texel.g, texel.r);
      break;
    case 6:
      texel = texture2D(s_Tex, i_texCoord);
      albedo = vec4(mix(u_ConstColor3.rgb, texel.r * u_ConstColor0.rgb + texel.g * u_ConstColor1.rgb + texel.b * u_ConstColor2.rgb, texel.a), 1.0);
      break;
    case 7:
      texel = texture2D(s_Tex, i_texCoord);
      mediump vec4 overlay = texture2D(s_Ovl, i_texCoord);
      albedo = vec4(mix(mix(u_ConstColor3.rgb, texel.r * u_ConstColor0.rgb + texel.g * u_ConstColor1.rgb + texel.b * u_ConstColor2.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
      break;
    default:
      albedo = vec4(0.0);
      break;
  }

  return albedo;
}

// Custom Mii Creator specific material params configuration. It's simpler to write when using a struct instead
struct MaterialParams {
  vec4 sssColor;
  vec4 specularColor;
  vec4 rimColor;
  mediump float halfLambertFactor;
  mediump float sssSpecularFactor;
  mediump float specularFactorA;
  mediump float specularFactorB;
  mediump float specularShininess;
  mediump float rimPower;
  mediump float rimWidth;
};

vec4 calcMatColor(MaterialParams m, vec4 albedo) {
  vec4 outputColor;
  vec3 normal = normalize(i_normal);
  vec3 lightDir = normalize(lightDirInView.xyz);

  float diffuseFactor = max(0.0, dot(normal, lightDir));

  float halfLambert = ((diffuseFactor) * m.halfLambertFactor + (1.0 - m.halfLambertFactor));

  vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
  float specAngle = max(dot(halfDir, normal), 0.0);
  float specular = pow(specAngle, m.specularShininess);

  float specularFactor = mix(m.specularFactorA, m.specularFactorB, i_specularMix);

  vec3 diffuseColor = lightColor.rgb * albedo.rgb * halfLambert;
  vec3 specularColor = specular * specularFactor * lightColor.rgb * m.specularColor.rgb;
  vec3 sssColor = m.sssColor.rgb * (1.0 - halfLambert);

  float sssSpecularFactor = (1.0 - albedo.a * m.sssSpecularFactor);

  outputColor = vec4(diffuseColor + (specularColor + sssColor), albedo.a);

  outputColor.rgb += (GetRimColor(m.rimColor.rgb, clamp(normal.z, 0.0, 1.0), m.rimWidth, m.rimPower));

  return outputColor;
}

void main() {
  /// ModulateType繧定・・縺励※繧｢繝ｫ繝吶ラ繧貞叙蠕・
  vec4 albedo = GetAlbedo();

  if(drawType == DRAW_TYPE_FACELINE) {
    if(albedo.a <= 0.001) {
      albedo.rgb = u_ConstColor0.rgb;
    } else {
      vec3 color = clamp(albedo.rgb / albedo.a, 0.0, 1.0);
      albedo.rgb = mix(u_ConstColor0.rgb, color, albedo.a);
    }
  }

  if(albedo.a == 0.0 && drawType != DRAW_TYPE_FACELINE) {
    discard;
  }

  if(USE_DEGAMMA(gammaType)) {
      /// SRGB to Linear
    albedo.rgb = ToLinear(albedo.rgb);
  }

  vec4 outputColor = vec4(vec3(0.0), albedo.a);

  if(SAMPLE_MASK_TEXTURE == true) {
// Custom mii creator-specific shader logic
// Used for blending outfit textures with Switch shader params.
    lowp vec4 maskTextureColor = texture2D(s_MaskTex, i_texCoord).rgba;

    MaterialParams m1 = MaterialParams(u_SssColor, u_SpecularColor, u_RimColor, u_HalfLambertFactor, u_SssSpecularFactor, u_SpecularFactorA, u_SpecularFactorB, u_SpecularShininess, u_RimPower, u_RimWidth);
    MaterialParams m2 = MaterialParams(u2_SssColor, u2_SpecularColor, u2_RimColor, u2_HalfLambertFactor, u2_SssSpecularFactor, u2_SpecularFactorA, u2_SpecularFactorB, u2_SpecularShininess, u2_RimPower, u2_RimWidth);
    MaterialParams m3 = MaterialParams(u3_SssColor, u3_SpecularColor, u3_RimColor, u3_HalfLambertFactor, u3_SssSpecularFactor, u3_SpecularFactorA, u3_SpecularFactorB, u3_SpecularShininess, u3_RimPower, u3_RimWidth);

    if(maskTextureColor.r > 0.5) { 
    // MAT 3 - Shirt
      outputColor = calcMatColor(m3, albedo);
    } else if(maskTextureColor.a > 0.5) {
    // MAT 1 - Base
      outputColor = calcMatColor(m1, albedo);
    } else {
    // MAT 2 - Skin
      outputColor = calcMatColor(m2, albedo);
    }
  } else {
    vec3 normal = normalize(i_normal);
    vec3 lightDir = normalize(lightDirInView.xyz);

    float diffuseFactor = max(0.0, dot(normal, lightDir));

    float halfLambert = ((diffuseFactor) * u_HalfLambertFactor + (1.0 - u_HalfLambertFactor));

    vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specAngle = max(dot(halfDir, normal), 0.0);
    float specular = pow(specAngle, u_SpecularShininess);

    float specularFactor;
    if(drawType != DRAW_TYPE_HAIR) {
      specularFactor = u_SpecularFactorA;
    } else {
      specularFactor = mix(u_SpecularFactorA, u_SpecularFactorB, i_specularMix);
    }    

    vec3 diffuseColor = lightColor.rgb * albedo.rgb * halfLambert;
    vec3 specularColor = specular * specularFactor * lightColor.rgb * u_SpecularColor.rgb;
    vec3 sssColor = u_SssColor.rgb * (1.0 - halfLambert);

    float sssSpecularFactor = (1.0 - albedo.a * u_SssSpecularFactor);

  /// FACELINE
    if(drawType == DRAW_TYPE_FACELINE) {
      outputColor = vec4(mix(diffuseColor + (specularColor + sssColor), diffuseColor + (specularColor) * sssSpecularFactor, albedo.a), 1.0);
    } else {
      outputColor = vec4(diffuseColor + (specularColor + sssColor), albedo.a);
    }

    outputColor.rgb += GetRimColor(u_RimColor.rgb, clamp(normal.z, 0.0, 1.0), u_RimWidth, u_RimPower);

if(u_type == 4) {
  if(u_useHairTip == true) {
    MaterialParams m2 = MaterialParams(u2_SssColor, u2_SpecularColor, u2_RimColor, u2_HalfLambertFactor, u2_SssSpecularFactor, u2_SpecularFactorA, u2_SpecularFactorB, u2_SpecularShininess, u2_RimPower, u2_RimWidth);

    vec3 dirVec = normalize(u_hairTipDir);
    if (u_hairTipFlip) { dirVec.x *= -1.0; }
    vec3 topColor = outputColor.rgb;

    vec3 tipAlbedoLinear = u_hairTipColor;
    if(USE_DEGAMMA(gammaType)) {
      tipAlbedoLinear = ToLinear(tipAlbedoLinear);
    }

    vec4 bottomColor = calcMatColor(m2, vec4(tipAlbedoLinear, 1.0));

    float p = dot(i_modelPos, dirVec);
    float r = clamp(p / u_hairTipPos, 0.0, 1.0);

    vec3 topSRGB = ToSrgb(topColor);
    vec3 bottomSRGB = ToSrgb(bottomColor.rgb);

    // 1. Automatically compute a bridge color in sRGB space
    vec3 midSRGB = mix(bottomSRGB, topSRGB, 0.5);
    midSRGB = mix(midSRGB, max(bottomSRGB, topSRGB), 0.25);

    // 2. Piecewise two-stage blend
    vec3 mixedSRGB;
    if (r < 0.5) {
        mixedSRGB = mix(bottomSRGB, midSRGB, r * 2.0);
    } else {
        mixedSRGB = mix(midSRGB, topSRGB, (r - 0.5) * 2.0);
    }

    outputColor.rgb = ToLinear(mixedSRGB);
  }
}
  }

  if(USE_DEGAMMA(gammaType)) {
      /// Linear to SRGB
    outputColor.rgb = ToSrgb(outputColor.rgb);
  }

  gl_FragColor = outputColor;
}