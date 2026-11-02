
uniform sampler2D u_texture;
uniform vec4 u_const4;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(u_texture, vUv);

vec3 mixedColor = texColor.rgb;
float mixedAlpha = texColor.a;
gl_FragColor = vec4(mixedColor + u_const4.rgb * (1.0 - mixedAlpha), 1.0);
}
