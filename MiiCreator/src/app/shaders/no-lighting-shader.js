// src/app/shaders/no-lighting-shader.js
// No Lighting shader — shader id "lightDisabled".
//
// Defines: NoLightingShaderMaterial
// Uses from other files:
//   app/shaders/shader-registry.js: Cx, applyHairTipSettings
//   app/items/item-lists.js: HAT_MODEL_INFO

class NoLightingShaderMaterial extends ShaderMaterial_2 {
  get isWiiShader() {
    return !0;
  }
  get supportsModulate() {
    return !0;
  }
  constructor(e = {}) {
    let t = includeGLSL("no-lighting/no-lighting.frag.glsl"),
      r = {
        u_hairTipColor: { value: new Vector3_2(0, 0, 0) },
        u_hairTipDir: { value: new Vector3_2(-0.2, 0.7, 0.2) },
        u_hairTipPos: { value: 45 },
        u_useHairTip: { value: !1 },
        u_hairTipFlip: { value: !1 },
      };
    if (Cx()) r.u_useHairShadow = { value: !0 };
    let n = {
      vertexShader: includeGLSL("no-lighting/no-lighting.vert.glsl"),
      fragmentShader: t,
      uniforms: r,
    };
    super(n);
    this._modulateType = 0;
    let i = Object.assign({}, e);
    (delete i.charInfo,
      delete i.additionalInfo,
      delete i.lightEnable,
      this.setValues(i),
      applyHairTipSettings(this, e));
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
    if (!this.uniforms.u_hairTipDir) this.uniforms.u_hairTipDir = { value: new Vector3_2(-0.2, 0.7, 0.2) };
    if (!this.uniforms.u_hairTipDir.value)
      this.uniforms.u_hairTipDir = { value: new Vector3_2(-0.2, 0.7, 0.2) };
    this.uniforms.u_hairTipDir.value.x = t[e % t.length];
  }
  set hairTipY(e) {
    let t = [0, -0.5, -0.25, -0.1, 0, 0.1, 0.25, 0.5];
    if (!this.uniforms.u_hairTipDir) this.uniforms.u_hairTipDir = { value: new Vector3_2(-0.2, 0.7, 0.2) };
    if (!this.uniforms.u_hairTipDir.value)
      this.uniforms.u_hairTipDir = { value: new Vector3_2(-0.2, 0.7, 0.2) };
    this.uniforms.u_hairTipDir.value.z = t[e % t.length];
  }
  set hairTipFlip(e) {
    this.uniforms.u_hairTipFlip = { value: e };
  }
  additionalInfo;
  _color3;
  _opacity;
  get color() {
    if (!this.uniforms.u_const1) return null;
    else if (this._color3) return this._color3;
    let e = this.uniforms.u_const1.value,
      t = new Color_2(e.x, e.y, e.z);
    return ((this._color3 = t), t);
  }
  set color(e) {
    function t(i, o = 1) {
      return new Vector4_2(i.r, i.g, i.b, o);
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
    let r = e ? e : new Color_2(1, 1, 1);
    this._color3 = r;
    let n = this.opacity;
    if (this._opacity) delete this._opacity;
    this.uniforms.u_const1 = { value: t(r, n) };
  }
  get modulateMode() {
    return this.uniforms.u_mode ? this.uniforms.u_mode.value : null;
  }
  set modulateMode(e) {
    this.uniforms.u_mode = { value: e };
  }
  get modulateType() {
    return this._modulateType;
  }
  _modulateType;
  set modulateType(e) {
    ((this._modulateType = e), (this.uniforms.u_type = { value: e }));
  }
  get map() {
    return this.uniforms.s_texture ? this.uniforms.s_texture.value : null;
  }
  set map(e) {
    this.uniforms.s_texture = { value: e };
  }
  get overlayMap() {
    return this.uniforms.s_overlay ? this.uniforms.s_overlay.value : null;
  }
  set overlayMap(e) {
    this.uniforms.s_overlay = { value: e };
  }
}
