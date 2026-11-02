// Custom Toon Shader by datkat21
precision highp float;
uniform int u_mode;
uniform int u_type;
uniform sampler2D s_texture;
uniform sampler2D s_overlay;
uniform sampler2D s_eyeShineTex;
uniform float u_eyeMir;
uniform vec3 u_lightDir;
uniform int u_origin;
uniform bool u_lightEnable;
uniform float u_rot;
uniform vec4 u_const1;
uniform vec4 u_const2;
uniform vec4 u_const3;
uniform vec4 u_const4;
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_modelNormal;
varying mediump vec3 v_tangent;
varying vec3 v_viewDir;
varying vec3 v_color;
varying vec3 v_modelPos;
varying vec4 v_position;
varying mat3 v_normalMatrix;
uniform int u_useHairTip;
uniform bool u_hairTipFlip;
uniform vec3 u_hairTipColor;
uniform vec3 u_hairTipDir;
uniform float u_hairTipPos;
uniform vec2 u_eyeShineOrigin;
uniform vec2 u_eyeShinePos;
uniform float u_eyeShineRot;
uniform vec2 u_eyeShineScale;
// uniform sampler2D u_matCap;

#define FFL_MODULATE_MODE_CONSTANT        0
#define FFL_MODULATE_MODE_TEXTURE_DIRECT  1
#define FFL_MODULATE_MODE_RGB_LAYERED     2
#define FFL_MODULATE_MODE_ALPHA           3
#define FFL_MODULATE_MODE_LUMINANCE_ALPHA 4
#define FFL_MODULATE_MODE_ALPHA_OPA       5
#define FFL_MODULATE_MODE_OUTFIT          6
#define FFL_MODULATE_MODE_OUTFIT_OVERLAY  7

vec3 applyTintedWhite(vec3 base, float amount) {
    vec3 whiteTint = mix(base, vec3(1.0), amount);
    return mix(base, whiteTint, amount);
}

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

mediump float calculateAnisotropicSpecular(mediump vec3 light, mediump vec3 tangent, mediump vec3 eye, mediump float power )
{
	mediump float dotLT = dot(light, tangent);
	mediump float dotVT = dot(eye, tangent);
	mediump float dotLN = sqrt(1.0 - dotLT * dotLT);
	mediump float dotVR = dotLN*sqrt(1.0 - dotVT * dotVT) - dotLT * dotVT;

	return pow(max(0.0, dotVR), power);
}

void main(){
  mediump vec4 color;

  if(u_mode == FFL_MODULATE_MODE_CONSTANT)
  {
    color = u_const1;
  }
  else if(u_mode == FFL_MODULATE_MODE_TEXTURE_DIRECT)
  {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(texel.rgb, u_const1.a * texel.a);
  }
  else if(u_mode == FFL_MODULATE_MODE_RGB_LAYERED)
  {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, u_const1.a * texel.a);
  }
  else if(u_mode == FFL_MODULATE_MODE_ALPHA)
  {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(u_const1.rgb, u_const1.a * texel.r);
  }
  else if(u_mode == FFL_MODULATE_MODE_LUMINANCE_ALPHA)
  {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(texel.g * u_const1.rgb, u_const1.a * texel.r);
  }
  else if(u_mode == FFL_MODULATE_MODE_ALPHA_OPA)
  {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(texel.r * u_const1.rgb, u_const1.a);
  }
  else if (u_mode == FFL_MODULATE_MODE_OUTFIT) {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    color = vec4(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), 1.0);
  }
  else if (u_mode == FFL_MODULATE_MODE_OUTFIT_OVERLAY) {
    mediump vec4 texel = texture2D(s_texture, v_uv);
    mediump vec4 overlay = texture2D(s_overlay, v_uv);
    color = vec4(mix(mix(u_const4.rgb, texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, texel.a), overlay.rgb, overlay.a), 1.0);
  }

  if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0 && u_type != 8) {
    discard;
  }

  if (u_lightEnable == false)
  {
    if (u_type == 20) {
    vec3 circleColor = vec3(1.0);  

    vec2 duv = (v_uv - u_eyeShineOrigin) / 0.25 + 0.5;

    duv.x = (duv.x - 0.5) * u_eyeMir + 0.5;

    duv.xy -= u_eyeShinePos.xy;

    mediump vec4 texel = texture2D(s_eyeShineTex, duv);

    mediump float mask = step(0.0, duv.x) * step(0.0, duv.y) * step(duv.x, 1.0) * step(duv.y, 1.0);
    texel *= mask;

    color.rgb = mix(color.rgb, circleColor, texel.r);
    }
    gl_FragColor = color;
    return;
  }

  if(u_mode != FFL_MODULATE_MODE_CONSTANT && color.a == 0.0) {
    discard;
  }

  vec3 N = normalize(v_normal);
  vec3 M = normalize(v_modelNormal);
  vec3 T = v_tangent;
  vec3 L = normalize(u_lightDir);
  vec3 L2 = normalize(vec3(-0.45,0.42,0.78));
  vec3 V = normalize(v_viewDir);
  vec3 H = normalize(L + V);
  float spec = max(dot(N, H), 0.0);

  float NdotL = max(dot(N, L), 0.0);
  // float MdotL = max(dot(M, L), 0.0);
  vec3 col = color.rgb;
  
  float rimStrength;
  float rimThreshold;
  float rimPower;
  vec3 minRimColor;
  float rimAlbedoInfluence;

  float toon;
  if (NdotL > 0.5) toon = 1.0;
  else toon = 0.5;

float fres = 1.0 - dot(N, V);
float shadowWeight = 1.0;
float fresWeight = 1.0;

// if (u_type == 0 || u_type == 3){
//   float shadow = 1.0 - toon;
//   vec3 hsv = rgb2hsv(col);
// // hsv.y *= mix(1.0, 1.35, shadow);
// hsv.y *= mix(1.0, 1.5, shadow);
// // hsv.z *= mix(1.0, 0.75, shadow);
// hsv.z *= mix(1.0, 0.8, shadow);
// col = hsv2rgb(hsv);
// }


if (u_type == 4) {
  if (u_useHairTip==1) {
    vec3 dirVec = normalize(u_hairTipDir);
    if (u_hairTipFlip) { dirVec.x *= -1.0; }
    vec3 topColor = col.rgb;
    vec3 bottomColor = u_hairTipColor;
    float p = dot(v_modelPos, normalize(dirVec));
    float r = clamp(p / u_hairTipPos, 0.0, 1.0);
    vec3 midColor = mix(bottomColor, topColor, 0.5);
    midColor = mix(midColor, max(bottomColor, topColor), 0.25); 
    vec3 finalColor;
    if (r < 0.5) { finalColor = mix(bottomColor, midColor, r * 2.0); } else { finalColor = mix(midColor, topColor, (r - 0.5) * 2.0); }
    col.rgb = finalColor;
  }

  float highlightStrength = 0.5;
  vec3 hairDir = vec3(0.0, 1.0, -0.1);
  float bandStart = 49.0;
  float bandEnd = 53.0;
  float bandFeather = 3.0;

  vec3 dir = normalize(hairDir);

  float coord = dot(v_modelPos, dir);

  float startSmooth = smoothstep(bandStart - bandFeather, bandStart + bandFeather, coord);
  float endSmooth = smoothstep(bandEnd - bandFeather, bandEnd + bandFeather, coord);

  float band = startSmooth * (1.0 - endSmooth);

  vec3 hairDir2 = vec3(0.0, -0.2, 0.1);     
  float bandCoord = dot(N, normalize(hairDir2));
  bandCoord = (bandCoord * 0.5 + 0.5); 
  
  band *= bandCoord;
  // The only one this would look bad on is 42's vertex colors :/
  band *= v_color.g;

  if (toon<1.0) band *= 0.;
  
  float amount = band * highlightStrength;

  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  vec3 desaturatedCol = mix(col, vec3(luma), 0.42); // 0.42 desaturation matches your 0.58 HSV multiplier

  // Brighten the color linearly, ensuring a minimum boost floor
  vec3 brightenedCol = desaturatedCol + vec3(0.4); 

  // Blend back to original color based on highlight amount
  col = mix(col, brightenedCol, amount);

  shadowWeight = .5 - v_color.r;
}

  if (u_type == 4) {
    // rimStrength = 1.2;
    // rimStrength =  1.2 - v_color.r;
    // rimThreshold = 0.3;
    // rimPower = 4.5;
    // minRimColor = vec3(0.25);
    // rimAlbedoInfluence = 0.3;
    rimStrength =  mix(1.2, 0.4, v_color.r);
    rimThreshold = 0.3;
    rimPower = 5.0;
    minRimColor = vec3(0.25);
    rimAlbedoInfluence = 0.2;

    col = mix(col, col.rgb*0.5, v_color.r);
  } else if (u_type == 0 || u_type == 3) {
    rimStrength = 1.2;
    rimThreshold = 0.3;
    rimPower = 6.3;
    minRimColor = vec3(0.1);
    rimAlbedoInfluence = 0.1;
  } else if (u_type == 2) {
    rimStrength = 1.0;
    rimThreshold = 0.35;
    rimPower = 3.0;
    minRimColor = vec3(0.3);
    // rimAlbedoInfluence = 0.5;
    rimAlbedoInfluence = 0.0;

    vec2 noseCenter = vec2(0.0, -0.4);
    vec2 offset = v_modelPos.xy - noseCenter;
    offset.x+=0.1;
    float oval = (1.0 - smoothstep(0.0, 1.0, (offset.x*offset.x)/0.25 + (offset.y*offset.y))) * 0.2;
    col += oval * col;
  } else if (u_type == 8) {
    rimStrength = 1.0;
    rimThreshold = 0.3;
    rimPower = 3.0;
    minRimColor = vec3(0.7);
    rimAlbedoInfluence = 0.5;

    vec3 L = normalize(vec3(0.0, -0.2, 1.0));
    float angled = pow(max(dot(reflect(-V, N), L), 0.0), 64.0);
    float shineStrength = 0.2;
    col += step(0.4, angled*shineStrength);

//     vec2 ellipseCenter = vec2(0.56, 0.44);   
//     vec2 ellipseCenter2 = vec2(2.0 - 0.56, 0.44);  
//     vec2 ellipseRadius = vec2(0.2, 0.06); 
//     vec3 ellipseColor  = vec3(1.0);

//     vec2 uv = v_uv;  

//     // ellipse distance
//     vec2 p = uv - ellipseCenter;
//     p /= ellipseRadius; 
//     float dist = length(p);

//     // ellipse2 distance
//     vec2 p2 = uv - ellipseCenter2;
//     p2 /= ellipseRadius;  
//     float dist2 = length(p2);

//     float edge = 0.002; 
//     float ellipse = smoothstep(1.0, 1.0 - edge, dist); 
//     ellipse += smoothstep(1.0, 1.0 - edge, dist2); 

//     float alphaCurrent = color.a;

// float ellipseMask = ellipse; 
// float mask = ellipseMask;
// col += vec3(mask);
// color.a += mask * 0.5;

    if (color.a == 0.0) discard;
    gl_FragColor = vec4(col, color.a);
    return;
  } else if (u_type == 5) {
    rimStrength = 1.2;
    rimThreshold = 0.7;
    rimPower = 3.0;
    minRimColor = vec3(0.2);
    rimAlbedoInfluence = 0.5;
  } else if (u_type==9 || u_type==10) {
    rimStrength = 1.2;
    rimThreshold = 0.7;
    rimPower = 3.0;
    minRimColor = vec3(0.2);
    rimAlbedoInfluence = 0.5;
  } else {
    rimStrength = 1.2;
    rimThreshold = 0.4;
    rimPower = 3.0;
    minRimColor = vec3(0.3);
    rimAlbedoInfluence = 0.25;
  }

float shadow = 1.0 - toon;

float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
vec3 gray = vec3(luma);

float shadowSat = mix(1.0, 1.23, shadow);
col = mix(gray, col, shadowSat);
col = mix(col, col * mix(1.0, 0.75, shadow), shadowWeight);

if (u_type != 6) {
   float toonRim = step(rimThreshold, pow(fres, rimPower));
    vec3 rimBase = mix(minRimColor, col, rimAlbedoInfluence);
    col = mix(col, col+toonRim*rimBase*rimStrength, fresWeight);
}

  gl_FragColor = vec4(col, color.a);
}