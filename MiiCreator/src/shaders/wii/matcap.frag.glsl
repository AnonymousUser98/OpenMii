// Custom Wii-esque MatCap Shader by datkat21
precision highp float;
uniform int u_mode;
uniform int u_type;
uniform int u_lightEnable;
uniform int matCapBlend;
uniform int matCapSecondaryBlend;
uniform float matCapSecondaryStrength;
uniform sampler2D s_texture;
uniform sampler2D s_overlay;
uniform sampler2D matCapMap;
uniform sampler2D matCapSecondaryMap;
uniform sampler2D matCapRim;
uniform int matCapRimMode;
uniform vec4 u_const1;
uniform vec4 u_const2;
uniform vec4 u_const3;
uniform vec4 u_const4;
varying vec2 vUv;
varying vec3 v_normal;
varying vec3 v_modelNormal;
varying vec3 vViewDir;
varying vec3 v_color;
varying vec3 v_modelPos;
uniform int u_useHairTip;
uniform bool u_hairTipFlip;
uniform vec3 u_hairTipColor;
uniform vec3 u_hairTipDir;
uniform float u_hairTipPos;

#define MATCAP_BLEND_MODE_DISABLED        0
#define MATCAP_BLEND_MODE_ADDITIVE        1
#define MATCAP_BLEND_MODE_MULTIPLY        2
#define MATCAP_BLEND_MODE_ADDITIVE_PLUS   3
#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5
#define FFL_MODULATE_MODE_OUTFIT          6
#define FFL_MODULATE_MODE_OUTFIT_OVERLAY  7

vec4 conditional_darken(vec4 color) {
  vec4 out_color = color;
  float brightness = dot(out_color.rgb, vec3(0.299, 0.587, 0.114));

  float maxBrightness = 0.91;

  if (brightness > maxBrightness) {
      float scale = maxBrightness / brightness;
      out_color.rgb *= scale;
  }

  return out_color;
}

void main(){
  mediump vec4 color;

  if(u_mode == FFL_MODULATE_MODE_CONSTANT)
  {
    color = u_const1;
    if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE || matCapBlend == MATCAP_BLEND_MODE_ADDITIVE_PLUS) {
      color = conditional_darken(color);
    }
  }
  else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
  {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.rgb, u_const1.a * texel.a);
    if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE || matCapBlend == MATCAP_BLEND_MODE_ADDITIVE_PLUS) {
      color = conditional_darken(color);
    }
  }
  else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED)
  {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
  }
  else if(u_mode == FFL_MODULATE_MODE_ALPHA)
  {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(u_const1.rgb, u_const1.a * texel.r);
  }
  else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
  {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
  }
  else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA)
  {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.r * u_const1.rgb, u_const1.a);
  }
  else if (u_mode == FFL_MODULATE_MODE_OUTFIT) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), 1.0);
        if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE || matCapBlend == MATCAP_BLEND_MODE_ADDITIVE_PLUS) {
      color = conditional_darken(color);
    }
  }
  else if (u_mode == FFL_MODULATE_MODE_OUTFIT_OVERLAY) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    mediump vec4 overlay = texture2D(s_overlay, vUv);
    color = vec4(mix(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
        if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE || matCapBlend == MATCAP_BLEND_MODE_ADDITIVE_PLUS) {
      color = conditional_darken(color);
    }
  }

  if (u_type==4){
  if (u_useHairTip==1) {
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

  if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0) {
    discard;
  }

  if (u_lightEnable == 0)
  {
    gl_FragColor = color;
    return;
  }

  vec3 M = normalize(v_modelNormal);
  vec3 L = normalize(vec3(0.0,.8,1.0));
  float NdotL = max(dot(M, L), 0.0)*0.25+0.75;

  vec3 normal = normalize(v_normal);
  vec2 uv = normal.xy * 0.5 + 0.5;

  vec4 matCapPColor = texture2D(matCapMap, uv);

  vec3 col = color.rgb;

  if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE) {
    col = color.rgb + (matCapPColor.rgb * matCapPColor.rgb);
  } else if (matCapBlend == MATCAP_BLEND_MODE_MULTIPLY) {
    col = color.rgb * matCapPColor.rgb;
  } else if (matCapBlend == MATCAP_BLEND_MODE_ADDITIVE_PLUS) {
    col = color.rgb + matCapPColor.rgb;
  }

  if (matCapSecondaryBlend != MATCAP_BLEND_MODE_DISABLED) {
    vec4 matCapSColor = texture2D(matCapSecondaryMap, uv);
    if (matCapSecondaryBlend == MATCAP_BLEND_MODE_ADDITIVE) {
      col = col.rgb + (matCapSColor.rgb * matCapSecondaryStrength);
    } else if (matCapSecondaryBlend == MATCAP_BLEND_MODE_MULTIPLY) {
      col = col.rgb * (matCapSColor.rgb * matCapSecondaryStrength);
    }
  }

#ifdef UseHairShadow
  if (u_type == 4) {
    col *= mix(1.0, 0.6, step(0.6, v_color.r));
  }
#endif
  
  if (matCapRimMode == 1) {
    vec2 newUv = uv.xy;
    newUv.x+=0.5;
    newUv.xy*=2.0;
    float matCapRim = texture2D(matCapRim, newUv).r * 0.16;
    col = col+matCapRim;
  }

  gl_FragColor = vec4(col, color.a);
}