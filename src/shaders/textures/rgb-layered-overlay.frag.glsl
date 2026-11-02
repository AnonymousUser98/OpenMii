
uniform sampler2D u_texture;
uniform sampler2D u_overlay;
uniform vec4 u_const1;
uniform vec4 u_const2;
uniform vec4 u_const3;
uniform vec4 u_const4;
varying vec2 vUv;

void main() {
  // --- same color-mix logic as the base shader ---
  vec4 texColor = texture2D(u_texture, vUv);
  vec3 mixedColor = texColor.r * u_const1.rgb
                  + texColor.g * u_const2.rgb
                  + texColor.b * u_const3.rgb;
  float mixedAlpha = texColor.a;
  vec4 base = vec4(mixedColor + u_const4.rgb * (1.0 - mixedAlpha), 1.0);

  // --- source-over composite: overlay on top of base ---
  vec4 ov = texture2D(u_overlay, vUv);
  // Porter-Duff source-over:
  //   out.rgb = src.rgb * src.a + dst.rgb * (1 - src.a)
  //   out.a   = src.a           + dst.a   * (1 - src.a)
  float outA = ov.a + base.a * (1.0 - ov.a);
  vec3  outRGB = (ov.rgb * ov.a + base.rgb * base.a * (1.0 - ov.a))
                 / max(outA, 0.0001);   // avoid divide-by-zero
  gl_FragColor = vec4(outRGB, outA);
}
