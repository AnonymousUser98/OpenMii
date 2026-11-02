// shadeless material shader
precision highp float;
uniform int u_mode;
uniform int u_type;
uniform sampler2D s_texture;
uniform sampler2D s_overlay;
uniform vec4 u_const1;
uniform vec4 u_const2;
uniform vec4 u_const3;
uniform vec4 u_const4;
varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_modelPos;
uniform int u_useHairTip;
uniform bool u_hairTipFlip;
uniform vec3 u_hairTipColor;
uniform vec3 u_hairTipDir;
uniform float u_hairTipPos;
uniform bool u_useHairShadow;

#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5
#define FFL_MODULATE_MODE_OUTFIT          6
#define FFL_MODULATE_MODE_OUTFIT_OVERLAY  7

void main() {
  mediump vec4 color;

  if(u_mode == FFL_MODULATE_MODE_CONSTANT) {
    color = u_const1;
  } else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.rgb, u_const1.a * texel.a);
  } else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
  } else if(u_mode == FFL_MODULATE_MODE_ALPHA) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(u_const1.rgb, u_const1.a * texel.r);
  } else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
  } else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(texel.r * u_const1.rgb, u_const1.a);
  } else if (u_mode == FFL_MODULATE_MODE_OUTFIT) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    color = vec4(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), 1.0);
  } else if (u_mode == FFL_MODULATE_MODE_OUTFIT_OVERLAY) {
    mediump vec4 texel = texture2D(s_texture, vUv);
    mediump vec4 overlay = texture2D(s_overlay, vUv);
    color = vec4(mix(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
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

  gl_FragColor = color;
if (u_useHairShadow==true)
  if (u_type == 4) {
    color.rgb *= mix(1.0, 0.6, step(0.6, v_color.r));
  }

  gl_FragColor = color;
}