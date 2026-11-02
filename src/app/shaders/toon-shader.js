// src/app/shaders/toon-shader.js
// Toon shader — shader id "toon".
//
// Defines: TOON_VERTEX_SHADER, TOON_FRAGMENT_SHADER, ToonShaderMaterial
// Uses from other files:
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/shaders/shader-registry.js: applyHairTipSettings

var TOON_VERTEX_SHADER = includeGLSL("toon/toon.vert.glsl"),
  TOON_FRAGMENT_SHADER = includeGLSL("toon/toon.frag.glsl");
class ToonShaderMaterial extends ShaderMaterial_2 {
  get isToonShader() {
    return !0;
  }
  get supportsModulate() {
    return !0;
  }
  constructor(e = {}) {
    let t = {
      uniforms: {
        u_lightDir: { value: new Vector3_2(-0.5, 0.6, 3) },
        u_lightEnable: { value: e.lightEnable !== void 0 ? e.lightEnable : !0 },
        u_hairTipColor: { value: new Vector3_2(0, 0, 0) },
        u_hairTipDir: { value: new Vector3_2(-0.2, 0.7, 0.2) },
        u_hairTipPos: { value: 45 },
        u_useHairTip: { value: !1 },
        u_hairTipFlip: { value: !1 },
        ...(e.eyeShineOrigin && { u_eyeShineOrigin: { value: e.eyeShineOrigin } }),
        ...(e.eyeShineTex && { s_eyeShineTex: { value: e.eyeShineTex } }),
        ...(e.eyeShinePos && { u_eyeShinePos: { value: e.eyeShinePos } }),
        ...(e.eyeShineRot && { u_eyeShineRot: { value: e.eyeShineRot } }),
        ...(e.eyeShineScale && { u_eyeShineScale: { value: e.eyeShineScale } }),
        ...(e.partOrigin && { u_eyeMir: { value: e.partOrigin } }),
      },
      vertexShader: TOON_VERTEX_SHADER,
      fragmentShader: TOON_FRAGMENT_SHADER,
    };
    super(t);
    this._modulateType = 0;
    let r = Object.assign({}, e);
    if (
      (delete r.lightEnable,
      delete r.drawType,
      delete r.eyeShineOrigin,
      delete r.eyeShineTex,
      delete r.eyeShinePos,
      delete r.eyeShineScale,
      delete r.partOrigin,
      e.additionalInfo)
    )
      this.additionalInfo = e.additionalInfo;
    (applyHairTipSettings(this, e), delete r.charInfo, delete r.additionalInfo, this.setValues(r));
  }
  additionalInfo;
  _color3;
  _opacity;
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
