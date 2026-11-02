// src/app/shaders/wii-shaders.js
// MatCap shaders: Mii Channel, Wii Play, Simple+, Wii Room, Resort, Simple.
//
// Defines: WiiShaderMaterial, WiiPlayShaderMaterial, SimplePlusShaderMaterial,
//          WiiAlt3ShaderMaterial, WiiRoomShaderMaterial, ResortShaderMaterial, SimpleShaderMaterial
// Uses from other files:
//   app/shaders/shader-registry.js: Cx, applyHairTipSettings
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/assets/models.js: getMatCapTexture

class WiiShaderMaterial extends ShaderMaterial_2 {
  static matCapTexture = () => getMatCapTexture(0);
  static matCapBlend = 1;
  get isWiiShader() {
    return !0;
  }
  constructor(e = {}) {
    let t = includeGLSL("wii/matcap.frag.glsl");
    if (Cx())
      t =
        `#define UseHairShadow
` + t;
    let r = {
      uniforms: {
        matCapMap: { value: (e.matCap || WiiShaderMaterial.matCapTexture)() },
        matCapSecondaryMap: { value: e.matCapSecondary ? e.matCapSecondary() : null },
        matCapBlend: { value: e.matCapBlend || WiiShaderMaterial.matCapBlend },
        matCapSecondaryBlend: { value: e.matCapSecondaryBlend || 0 },
        matCapSecondaryStrength: { value: e.matCapSecondaryStrength || 1 },
        matCapRim: { value: e.matCapRim ? e.matCapRim() : null },
        matCapRimMode: { value: e.matCapRim ? 1 : 0 },
        u_lightEnable: { value: e.lightEnable !== void 0 ? e.lightEnable : 1 },
        u_hairTipColor: { value: new Vector3_2(0, 0, 0) },
        u_hairTipDir: { value: new Vector3_2(-0.2, 0.7, 0.2) },
        u_hairTipPos: { value: 45 },
        u_useHairTip: { value: !1 },
        u_hairTipFlip: { value: !1 },
      },
      vertexShader: includeGLSL("wii/matcap.vert.glsl"),
      fragmentShader: t,
    };
    super(r);
    this._modulateType = 0;
    let n = Object.assign({}, e);
    (delete n.matCap,
      delete n.matCapBlend,
      delete n.matCapRim,
      delete n.matCapSecondary,
      delete n.matCapSecondaryBlend,
      delete n.matCapSecondaryStrength,
      delete n.lightEnable,
      delete n.charInfo,
      delete n.additionalInfo,
      this.setValues(n),
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
  matCap;
  matCapBlend;
  matCapSecondary;
  matCapSecondaryBlend;
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
    this.uniforms.u_type = { value: e };
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
class WiiPlayShaderMaterial extends WiiShaderMaterial {
  static matCapTextureMul = () => getMatCapTexture(1);
  static matCapTextureAdd = () => getMatCapTexture(2);
  constructor(e = {}) {
    ((e.matCap = WiiPlayShaderMaterial.matCapTextureAdd),
      (e.matCapBlend = 1),
      (e.matCapSecondary = WiiPlayShaderMaterial.matCapTextureMul),
      (e.matCapSecondaryBlend = 2),
      (e.matCapSecondaryStrength = 1.7));
    super(e);
  }
}
class SimplePlusShaderMaterial extends WiiShaderMaterial {
  static matCapTextureMul = () => getMatCapTexture(3);
  static matCapTextureAdd = () => getMatCapTexture(4);
  constructor(e = {}) {
    ((e.matCap = SimplePlusShaderMaterial.matCapTextureMul),
      SimplePlusShaderMaterial.matCapTextureMul().minFilter,
      (e.matCapBlend = 2),
      (e.matCapSecondary = SimplePlusShaderMaterial.matCapTextureAdd),
      (e.matCapSecondaryBlend = 1),
      (e.matCapSecondaryStrength = 0.5));
    super(e);
  }
}
class WiiAlt3ShaderMaterial extends WiiShaderMaterial {
  static matCapTextureMul = () => getMatCapTexture(6);
  static matCapTextureAdd = () => getMatCapTexture(7);
  constructor(e = {}) {
    ((e.matCap = WiiAlt3ShaderMaterial.matCapTextureAdd),
      (e.matCapBlend = 1),
      (e.matCapSecondary = WiiAlt3ShaderMaterial.matCapTextureMul),
      (e.matCapSecondaryBlend = 2),
      (e.matCapSecondaryStrength = 1.8));
    super(e);
  }
}
class WiiRoomShaderMaterial extends WiiShaderMaterial {
  static matCapTextureMul = () => getMatCapTexture(8);
  constructor(e = {}) {
    ((e.matCap = WiiRoomShaderMaterial.matCapTextureMul), (e.matCapBlend = 3));
    super(e);
  }
}
class ResortShaderMaterial extends WiiShaderMaterial {
  static matCapTextureMul = () => getMatCapTexture(10);
  static matCapTextureAdd = () => getMatCapTexture(11);
  constructor(e = {}) {
    ((e.matCap = ResortShaderMaterial.matCapTextureAdd),
      (e.matCapBlend = 1),
      (e.matCapSecondary = ResortShaderMaterial.matCapTextureMul),
      (e.matCapSecondaryBlend = 2),
      (e.matCapSecondaryStrength = 1.8));
    super(e);
  }
}
class SimpleShaderMaterial extends WiiShaderMaterial {
  static matCapTexture = () => getMatCapTexture(9);
  constructor(e = {}) {
    ((e.matCap = SimpleShaderMaterial.matCapTexture), (e.matCapBlend = 2));
    super(e);
  }
}
