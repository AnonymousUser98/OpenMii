// src/app/shaders/wiiu-variants.js
// Wii U variants — "wiiu_blinn" and "wiiu_ffliconwithbody" (Wii U (Bright)).
//
// Defines: S1e, ZL, JL, M1e, I1e, WiiUBlinnShaderMaterial, WiiUBrightShaderMaterial
// Uses from other files:
//   app/renderer/three-module.js: getTHREE
//   app/shaders/wiiu-shader.js: WiiUShader

var THREE = getTHREE();
var S1e = {
    ambient: new THREE.Color(0.8, 0.8, 0.8),
    diffuse: new THREE.Color(0.8, 0.8, 0.8),
    specular: new THREE.Color(0.1, 0.1, 0.1),
    specularPower: 0.01,
    specularMode: 0,
  },
  ZL = new THREE.Color(0.5, 0.5, 0.5),
  $L = new THREE.Color(0.9, 0.9, 0.9),
  JL = new THREE.Color(1, 1, 1),
  M1e = new THREE.Vector3(-0.35, 1, 0.8),
  eB = new THREE.Vector3(-0.5, 0.366, 0.785),
  I1e = new THREE.Vector4(0.3, 0.3, 0.3, 1);
class WiiUBlinnShaderMaterial extends WiiUShader {
  constructor(e = {}) {
    e = Object.assign({ useSpecularModeBlinn: !0 }, e);
    super(e);
    if (this.uniforms.u_material_specular_power) this.uniforms.u_material_specular_power.value = 2;
  }
}
class WiiUBrightShaderMaterial extends WiiUShader {
  constructor(e = {}) {
    e = Object.assign({}, e);
    super(e);
    ((this.uniforms.u_light_dir.value = eB),
      (this.uniforms.u_light_ambient.value = ZL),
      (this.uniforms.u_light_diffuse.value = $L),
      (this.uniforms.u_light_specular.value = JL));
  }
}
