// GLSL/TEV Shaders from Citra ported to Three.js by kat21 for use in Mii Creator
precision highp int;
precision highp float;

// reused hair tip code from toon shader
varying vec3 v_modelPos;
varying vec3 v_color;
uniform int u_useHairTip;
uniform bool u_hairTipFlip;
uniform vec3 u_hairTipColor;
uniform vec3 u_hairTipDir;
uniform float u_hairTipPos;

uniform vec4 u_const1;
uniform vec4 u_const2;
uniform vec4 u_const3;
uniform vec4 u_const4;
in vec2 texcoord0;

#define NUM_TEV_STAGES 6
#define NUM_LIGHTS 8
#define NUM_LIGHTING_SAMPLERS 24
struct LightSrc {
  vec3 specular_0;
  vec3 specular_1;
  vec3 diffuse;
  vec3 ambient;
  vec3 position;
  vec3 spot_direction;
};

uniform vec3 lighting_global_ambient;
uniform LightSrc light_src[NUM_LIGHTS];

vec4 tev_combiner_buffer_color = vec4(0.0, 0.0, 0.0, 1.0);

uniform sampler2D s_texture;
uniform sampler2D s_overlay;

float byteround(float x) {
  return round(x * 255.0) * (1.0 / 255.0);
}

vec2 byteround(vec2 x) {
  return round(x * 255.0) * (1.0 / 255.0);
}

vec3 byteround(vec3 x) {
  return round(x * 255.0) * (1.0 / 255.0);
}

vec4 byteround(vec4 x) {
  return round(x * 255.0) * (1.0 / 255.0);
}

uniform int u_type;

uniform sampler2D u_LUT;

float LookupLightingLUTSigned(int lutIndex, float pos) {
  float x = clamp(pos * 0.5 + 0.5, 0.0, 1.0);
  float idx = x * 255.0;
  float offset = float(lutIndex) * 256.0;
  float texX = (idx + offset + 0.5) / 512.0;
  return texture2D(u_LUT, vec2(texX, 0.5)).r;
}

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

uniform int u_mode;
uniform bool u_lightEnable;
in vec3 v_normal_view;
in vec3 v_position_view;

void main() {
vec4 primary_fragment_color = vec4(0.0);
vec4 secondary_fragment_color = vec4(0.0);

  vec4 color = vec4(0.0);
  if(u_mode == 0) // FFL_MODULATE_MODE_CONSTANT
  {
    color = conditional_darken(u_const1);
  } else if(u_mode == 1) // FFL_MODULATE_MODE_TEXTURE_DIRECT
  {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = conditional_darken(texel);
  } else if(u_mode == 2) // FFL_MODULATE_MODE_RGB_LAYERED
  {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
  } else if(u_mode == 3) // FFL_MODULATE_MODE_ALPHA
  {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = vec4(u_const1.rgb, u_const1.a * texel.r);
  } else if(u_mode == 4) // FFL_MODULATE_MODE_LUMINANCE_ALPHA
  {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
  } else if(u_mode == 5) // FFL_MODULATE_MODE_ALPHA_OPA
  {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = vec4(texel.r * u_const1.rgb, u_const1.a);
  }
    else if (u_mode == 6) {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    color = vec4(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), 1.0);
  }
  else if (u_mode == 7) {
    mediump vec4 texel = texture2D(s_texture, texcoord0);
    mediump vec4 overlay = texture2D(s_overlay, texcoord0);
    color = vec4(mix(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
  }

  // Hair tip color
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
  

vec4 diffuse_sum = vec4(0.0, 0.0, 0.0, 1.0);
vec4 specular_sum = vec4(0.0, 0.0, 0.0, 1.0);
vec3 light_vector = vec3(0.0);
float light_distance = 0.0;
vec3 refl_value = vec3(0.0);
vec3 half_vector = vec3(0.0);
float dot_product = 0.0;
float clamp_highlights = 1.0;
vec3 N = normalize(v_normal_view);
vec3 V = normalize(-v_position_view);
light_vector = normalize(light_src[0].position);
light_distance = length(light_vector);
light_vector = normalize(light_vector);
half_vector = normalize(V) + light_vector;
dot_product = max(dot(light_vector, N), 0.0);
refl_value.r = 1.0;
refl_value.g = refl_value.r;
refl_value.b = refl_value.r;

diffuse_sum.rgb += ((light_src[0].diffuse * dot_product) + light_src[0].ambient) * 1.0 * 1.0;
specular_sum.rgb += (((1. * LookupLightingLUTSigned(0, dot(N, normalize(half_vector)))) * light_src[0].specular_0) + ((1. * LookupLightingLUTSigned(1, dot(N, normalize(V)))) * refl_value * light_src[0].specular_1)) * clamp_highlights * 1.0 * 1.0;
light_vector = normalize(light_src[1].position);
light_distance = length(light_vector);
half_vector = normalize(V) + light_vector;
dot_product = max(dot(light_vector, N), 0.0);
refl_value.r = 1.0;
refl_value.g = refl_value.r;
refl_value.b = refl_value.r;
diffuse_sum.rgb += ((light_src[1].diffuse * dot_product) + light_src[1].ambient) * 1.0 * 1.0;
specular_sum.rgb += (((1. * LookupLightingLUTSigned(0, dot(N, normalize(half_vector)))) * light_src[1].specular_0) + ((1. * LookupLightingLUTSigned(1, dot(N, normalize(V)))) * refl_value * light_src[1].specular_1)) * clamp_highlights * 1.0 * 1.0;
diffuse_sum.rgb += lighting_global_ambient;
primary_fragment_color = clamp(diffuse_sum, vec4(0.0), vec4(1.0));
secondary_fragment_color = clamp(specular_sum, vec4(0.0), vec4(1.0));

vec4 combiner_buffer = vec4(0.0);
vec4 next_combiner_buffer = tev_combiner_buffer_color;
vec4 combiner_output = vec4(1.0);
vec3 color_results_1 = vec3(0.0);
vec3 color_results_2 = vec3(0.0);
vec3 color_results_3 = vec3(0.0);
float alpha_results_1 = 0.0;
float alpha_results_2 = 0.0;
float alpha_results_3 = 0.0;
color_results_1 = color.rgb;
color_results_2 = vec3(1.0); // u_const1.rgb;
color_results_3 = vec3(1.0); // u_const1.rgb;
vec3 color_output_0 = byteround(clamp(color_results_1, vec3(0.0), vec3(1.0)));
alpha_results_1 = color.a;
alpha_results_2 = 1.0; // u_const1.a;
alpha_results_3 = 1.0; // u_const1.a;
float alpha_output_0 = byteround(clamp(alpha_results_1, 0.0, 1.0));
combiner_output = vec4(clamp(color_output_0 * 1.0, vec3(0.0), vec3(1.0)), clamp(alpha_output_0 * 1.0, 0.0, 1.0));
combiner_buffer = next_combiner_buffer;
next_combiner_buffer.rgb = combiner_output.rgb;
color_results_1 = vec3(1.0); // u_const2.rgb;
color_results_2 = vec3(1.0); // u_const2.aaa;
color_results_3 = primary_fragment_color.rgb;
vec3 color_output_1 = byteround(clamp(color_results_1, vec3(0.0), vec3(1.0)));
alpha_results_1 = combiner_output.a;
alpha_results_2 = 1.0; // color.a;
alpha_results_3 = 1.0; // color.a;
float alpha_output_1 = byteround(clamp(alpha_results_1, 0.0, 1.0));
combiner_output = vec4(clamp(color_output_1 * 1.0, vec3(0.0), vec3(1.0)), clamp(alpha_output_1 * 1.0, 0.0, 1.0));
combiner_buffer = next_combiner_buffer;
color_results_1 = combiner_output.rgb;
color_results_2 = vec3(0.90196, 0.78431, 0.70588);// u_const3.rgb;
color_results_3 = primary_fragment_color.rgb;
vec3 color_output_2 = byteround(clamp(color_results_1 * color_results_3 + color_results_2 * (vec3(1.0) - color_results_3), vec3(0.0), vec3(1.0)));
alpha_results_1 = combiner_output.a;
alpha_results_2 = color.a;
alpha_results_3 = color.a;
float alpha_output_2 = byteround(clamp(alpha_results_1, 0.0, 1.0));
combiner_output = vec4(clamp(color_output_2 * 1.0, vec3(0.0), vec3(1.0)), clamp(alpha_output_2 * 1.0, 0.0, 1.0));
combiner_buffer = next_combiner_buffer;
color_results_1 = combiner_output.rgb;
color_results_2 = combiner_buffer.rgb;
color_results_3 = secondary_fragment_color.rgb;
vec3 color_output_3 = byteround(clamp(color_results_1 * color_results_2 + color_results_3, vec3(0.0), vec3(1.0)));
alpha_results_1 = combiner_output.a;
alpha_results_2 = color.a;
alpha_results_3 = color.a;
float alpha_output_3 = byteround(clamp(alpha_results_1, 0.0, 1.0));
combiner_output = vec4(clamp(color_output_3 * 1.0, vec3(0.0), vec3(1.0)), clamp(alpha_output_3 * 1.0, 0.0, 1.0));
combiner_buffer = next_combiner_buffer;
combiner_buffer = next_combiner_buffer;
combiner_buffer = next_combiner_buffer;

#ifdef UseHairShadow
if (u_type==4){
    combiner_output.rgb *= mix(1.0, 0.8, step(0.6, v_color.r));
}
#endif

  if(color.a < 0.1)
    discard;

gl_FragColor = combiner_output;
}