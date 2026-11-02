// src/app/shaders/wiiu-shader.js
// Wii U shader (FFL SampleShader) — shader id "wiiu".
//
// Defines: WIIU_VERTEX_SHADER, WIIU_FRAGMENT_SHADER, WiiUShaderMaterial, WiiUShader
// Uses from other files:
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/renderer/three-module.js: getTHREE
//   app/shaders/shader-registry.js: applyHairTipSettings

var THREE = getTHREE(),
  WIIU_VERTEX_SHADER = includeGLSL("wiiu/wiiu.vert.glsl"),
  WIIU_FRAGMENT_SHADER = includeGLSL("wiiu/wiiu.frag.glsl");
class WiiUShaderMaterial extends THREE.ShaderMaterial {
  static defaultLightAmbient = new THREE.Color(0.73, 0.73, 0.73);
  static defaultLightDiffuse = new THREE.Color(0.6, 0.6, 0.6);
  static defaultLightSpecular = new THREE.Color(0.7, 0.7, 0.7);
  static defaultLightDir = new THREE.Vector3(-0.4531539381, 0.4226179123, 0.7848858833);
  static defaultRimColor = new THREE.Color(0.3, 0.3, 0.3);
  static defaultRimPower = 2;
  static defaultLightDirection = this.defaultLightDir;
  static materialParams = [
    {
      ambient: new THREE.Color(0.85, 0.75, 0.75),
      diffuse: new THREE.Color(0.75, 0.75, 0.75),
      specular: new THREE.Color(0.3, 0.3, 0.3),
      specularPower: 1.2,
      specularMode: 0,
    },
    {
      ambient: new THREE.Color(1, 1, 1),
      diffuse: new THREE.Color(0.7, 0.7, 0.7),
      specular: new THREE.Color(0, 0, 0),
      specularPower: 40,
      specularMode: 1,
    },
    {
      ambient: new THREE.Color(0.9, 0.85, 0.85),
      diffuse: new THREE.Color(0.75, 0.75, 0.75),
      specular: new THREE.Color(0.22, 0.22, 0.22),
      specularPower: 1.5,
      specularMode: 0,
    },
    {
      ambient: new THREE.Color(0.85, 0.75, 0.75),
      diffuse: new THREE.Color(0.75, 0.75, 0.75),
      specular: new THREE.Color(0.3, 0.3, 0.3),
      specularPower: 1.2,
      specularMode: 0,
    },
    {
      ambient: new THREE.Color(1, 1, 1),
      diffuse: new THREE.Color(0.7, 0.7, 0.7),
      specular: new THREE.Color(0.35, 0.35, 0.35),
      specularPower: 10,
      specularMode: 1,
    },
    {
      ambient: new THREE.Color(0.75, 0.75, 0.75),
      diffuse: new THREE.Color(0.72, 0.72, 0.72),
      specular: new THREE.Color(0.3, 0.3, 0.3),
      specularPower: 1.5,
      specularMode: 0,
    },
    {
      ambient: new THREE.Color(1, 1, 1),
      diffuse: new THREE.Color(0.7, 0.7, 0.7),
      specular: new THREE.Color(0, 0, 0),
      specularPower: 40,
      specularMode: 1,
    },
    {
      ambient: new THREE.Color(1, 1, 1),
      diffuse: new THREE.Color(0.7, 0.7, 0.7),
      specular: new THREE.Color(0, 0, 0),
      specularPower: 40,
      specularMode: 1,
    },
    {
      ambient: new THREE.Color(1, 1, 1),
      diffuse: new THREE.Color(0.7, 0.7, 0.7),
      specular: new THREE.Color(0, 0, 0),
      specularPower: 40,
      specularMode: 1,
    },
    {
      ambient: new THREE.Color(0.95622, 0.95622, 0.95622),
      diffuse: new THREE.Color(0.49673, 0.49673, 0.49673),
      specular: new THREE.Color(0.24099, 0.24099, 0.24099),
      specularPower: 3,
      specularMode: 0,
    },
    {
      ambient: new THREE.Color(0.95622, 0.95622, 0.95622),
      diffuse: new THREE.Color(1.08497, 1.08497, 1.08497),
      specular: new THREE.Color(0.2409, 0.2409, 0.2409),
      specularPower: 3,
      specularMode: 0,
    },
  ];
  get needsLowResourceFix() {
    return !0;
  }
  constructor(e = {}) {
    let t = {
        u_light_ambient: { value: WiiUShaderMaterial.defaultLightAmbient },
        u_light_diffuse: { value: WiiUShaderMaterial.defaultLightDiffuse },
        u_light_specular: { value: WiiUShaderMaterial.defaultLightSpecular },
        u_light_dir: { value: WiiUShaderMaterial.defaultLightDir.clone() },
        u_light_enable: { value: !0 },
        u_rim_color: { value: WiiUShaderMaterial.defaultRimColor },
        u_rim_power: { value: WiiUShaderMaterial.defaultRimPower },
        u_hairTipColor: { value: new THREE.Vector3(0, 0, 0) },
        u_hairTipDir: { value: new THREE.Vector3(-0.2, 0.7, 0.2) },
        u_hairTipPos: { value: 45 },
        u_useHairTip: { value: !1 },
      },
      r = WIIU_VERTEX_SHADER;
    if (e.lowResourceFix)
      r =
        `#define LOW
` + r;
    delete e.lowResourceFix;
    super({ vertexShader: r, fragmentShader: WIIU_FRAGMENT_SHADER, uniforms: t });
    ((this._modulateType = 0),
      (this.useSpecularModeBlinn = !1),
      applyHairTipSettings(this, e),
      delete e.additionalInfo,
      delete e.charInfo,
      this.setValues(e));
  }
  get useHairTip() {
    return !0;
  }
  set hairTipColor(e) {
    if (!this.uniforms.u_useHairTip) this.uniforms.u_useHairTip = { value: !0 };
    if (!this.uniforms.u_useHairTip.value) this.uniforms.u_useHairTip = { value: !0 };
    let t = e ? e : this.color;
    this.uniforms.u_hairTipColor = { value: t };
    let r = 45;
    if (this.additionalInfo.hatType > -1) {
      if (HAT_MODEL_INFO[this.additionalInfo.hatType].mdlType === 1) r = 39;
    }
    this.uniforms.u_hairTipPos = { value: r };
  }
  set hairTipX(e) {
    let t = [0, 1.5, 1, 0.5, 0, -0.5, -1, -1.5];
    if (!this.uniforms.u_hairTipDir)
      this.uniforms.u_hairTipDir = { value: new THREE.Vector3(-0.2, 0.7, 0.2) };
    if (!this.uniforms.u_hairTipDir.value)
      this.uniforms.u_hairTipDir = { value: new THREE.Vector3(-0.2, 0.7, 0.2) };
    this.uniforms.u_hairTipDir.value.x = t[e % t.length];
  }
  set hairTipY(e) {
    let t = [0, -0.5, -0.25, -0.1, 0, 0.1, 0.25, 0.5];
    if (!this.uniforms.u_hairTipDir)
      this.uniforms.u_hairTipDir = { value: new THREE.Vector3(-0.2, 0.7, 0.2) };
    if (!this.uniforms.u_hairTipDir.value)
      this.uniforms.u_hairTipDir = { value: new THREE.Vector3(-0.2, 0.7, 0.2) };
    this.uniforms.u_hairTipDir.value.z = t[e % t.length];
  }
  set hairTipFlip(e) {
    this.uniforms.u_hairTipFlip = { value: e };
  }
  additionalInfo;
  get color() {
    if (!this.uniforms.u_const1) return null;
    else if (this._color3) return this._color3;
    let e = this.uniforms.u_const1.value,
      t = new THREE.Color(e.x, e.y, e.z);
    return ((this._color3 = t), t);
  }
  set color(e) {
    function t(i, o = 1) {
      return new THREE.Vector4(i.r, i.g, i.b, o);
    }
    if (Array.isArray(e)) {
      switch (e.length) {
        case 3: {
          ((this.uniforms.u_const1 = { value: t(e[0]) }),
            (this.uniforms.u_const2 = { value: t(e[1]) }),
            (this.uniforms.u_const3 = { value: t(e[2]) }));
          break;
        }
        case 4: {
          ((this.uniforms.u_const1 = { value: t(e[0]) }),
            (this.uniforms.u_const2 = { value: t(e[1]) }),
            (this.uniforms.u_const3 = { value: t(e[2]) }),
            (this.uniforms.u_const4 = { value: t(e[3]) }));
          break;
        }
      }
      return;
    }
    let r = e ? e : new THREE.Color(1, 1, 1);
    this._color3 = r;
    let n = this.opacity;
    if (this._opacity) delete this._opacity;
    this.uniforms.u_const1 = { value: t(r, n) };
  }
  get opacity() {
    if (!this.uniforms.u_const1) return this._opacity ? this._opacity : 1;
    return this.uniforms.u_const1.value.w;
  }
  set opacity(e) {
    if (!this.uniforms || !this.uniforms.u_const1) {
      this._opacity = 1;
      return;
    }
    this.uniforms.u_const1.value.w = e;
  }
  get modulateMode() {
    return this.uniforms.u_mode ? this.uniforms.u_mode.value : null;
  }
  set modulateMode(e) {
    this.uniforms.u_mode = { value: e };
  }
  get lightEnable() {
    return this.uniforms.u_light_enable ? this.uniforms.u_light_enable.value : null;
  }
  set lightEnable(e) {
    this.uniforms.u_light_enable = { value: e };
  }
  set useSpecularModeBlinn(e) {
    if (((this._useSpecularModeBlinn = e), this._modulateType !== void 0))
      this.modulateType = this._modulateType;
    if (e) {
      if (this.uniforms.u_material_specular_power)
        this.uniforms.u_material_specular_power.value = 2;
    }
  }
  get useSpecularModeBlinn() {
    return this._useSpecularModeBlinn;
  }
  get modulateType() {
    return this._modulateType;
  }
  set modulateType(e) {
    let t = WiiUShaderMaterial.materialParams[e];
    if (!t) return;
    ((this._modulateType = e),
      (this.uniforms.u_material_ambient = { value: t.ambient }),
      (this.uniforms.u_material_diffuse = { value: t.diffuse }),
      (this.uniforms.u_material_specular = { value: t.specular }),
      (this.uniforms.u_material_specular_mode = {
        value: this._useSpecularModeBlinn ? 0 : t.specularMode,
      }),
      (this.uniforms.u_material_specular_power = { value: t.specularPower }),
      (this.uniforms.u_type = { value: e }));
  }
  get map() {
    return this.uniforms.s_texture ? this.uniforms.s_texture.value : null;
  }
  set map(e) {
    this.uniforms.s_texture = { value: e };
  }
  get lightDirection() {
    return this.uniforms.u_light_dir.value;
  }
  set lightDirection(e) {
    this.uniforms.u_light_dir = { value: e };
  }
  get overlayMap() {
    return this.uniforms.s_overlay ? this.uniforms.s_overlay.value : null;
  }
  set overlayMap(e) {
    this.uniforms.s_overlay = { value: e };
  }
}
var WiiUShader = WiiUShaderMaterial;
