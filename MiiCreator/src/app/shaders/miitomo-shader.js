// src/app/shaders/miitomo-shader.js
// Miitomo shader — shader id "miitomo".
//
// Defines: MIITOMO_VERTEX_SHADER, MIITOMO_FRAGMENT_SHADER, KeyframeInterpolator,
//          MiitomoShaderMaterial, MiitomoShader
// Uses from other files:
//   app/mii/colors.js: FAVORITE_COLORS_RGB, COMMON_COLORS_RGB
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/renderer/three-module.js: getTHREE
//   app/shaders/shader-registry.js: applyHairTipSettings

var localforage = In(Hs(), 1);
var THREE = getTHREE(),
  MIITOMO_VERTEX_SHADER = includeGLSL("miitomo/miitomo.vert.glsl"),
  MIITOMO_FRAGMENT_SHADER = includeGLSL("miitomo/miitomo.frag.glsl");
class KeyframeInterpolator {
  constructor(e) {
    this.keys = e.sort((t, r) => t.x - r.x);
  }
  interpolate(e, t, r, n, i) {
    let o = 2 * e * e * e - 3 * e * e + 1,
      s = e * e * e - 2 * e * e + e,
      a = -2 * e * e * e + 3 * e * e,
      l = e * e * e - e * e;
    return o * t + s * n + a * r + l * i;
  }
  clamp(e, t, r) {
    return Math.min(Math.max(e, t), r);
  }
  generateLUT(e = 512) {
    let t = new Uint8Array(e),
      r = 0;
    for (let n = 0; n < e; n++) {
      let i = n / (e - 1);
      while (r < this.keys.length - 2 && i > this.keys[r + 1].x) r++;
      let o = this.keys[r],
        s = this.keys[r + 1],
        a = (i - o.x) / (s.x - o.x);
      a = isNaN(a) ? 0 : a;
      let l = this.interpolate(a, o.y, s.y, o.dx * (s.x - o.x), s.dx * (s.x - o.x));
      t[n] = Math.round(this.clamp(l, 0, 1) * 255);
    }
    return t;
  }
}
class MiitomoShaderMaterial extends THREE.ShaderMaterial {
  static LUTSpecularTextureType = { NONE: 0, DEFAULT_02: 1, SKIN_01: 2, DEFAULT_04: 3, MAX: 4 };
  static LUTFresnelTextureType = { NONE: 0, DEFAULT_02: 1, SKIN_01: 2, DEFAULT_03: 1, MAX: 4 };
  static lutDefinitions = {
    specular: {
      [MiitomoShaderMaterial.LUTSpecularTextureType.NONE]: new KeyframeInterpolator([
        { x: 0, y: 0, dx: 0, dy: 0 },
        { x: 1, y: 0, dx: 0, dy: 0 },
      ]),
      [MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02]: new KeyframeInterpolator([
        { x: 0, y: 0, dx: 0, dy: 0 },
        { x: 0.05, y: 0, dx: 0, dy: 0 },
        { x: 0.8, y: 0.038, dx: 0.157894736842105, dy: 0.157894736842105 },
        { x: 1, y: 0.11, dx: 0, dy: 0 },
      ]),
      [MiitomoShaderMaterial.LUTSpecularTextureType.SKIN_01]: new KeyframeInterpolator([
        { x: 0, y: 0.03, dx: -0.105263157894737, dy: -0.105263157894737 },
        { x: 1, y: 0, dx: 0, dy: 0 },
      ]),
      [MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_04]: new KeyframeInterpolator([
        { x: 0.002, y: 0.002, dx: 0, dy: 0 },
        {
          x: 0.801,
          y: 0.001,
          dx: 0.000000000000000166533453693773,
          dy: 0.000000000000000166533453693773,
        },
        { x: 0.893, y: 0.123, dx: 2.31578947368421, dy: 2.31578947368421 },
        { x: 0.944, y: 0.292, dx: 3.26315789473684, dy: 3.26315789473684 },
        { x: 1, y: 0.423, dx: 0, dy: 0 },
      ]),
    },
    fresnel: {
      [MiitomoShaderMaterial.LUTFresnelTextureType.NONE]: new KeyframeInterpolator([
        { x: 0, y: 0, dx: 0, dy: 0 },
        { x: 1, y: 0, dx: 0, dy: 0 },
      ]),
      [MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02]: new KeyframeInterpolator([
        { x: 0, y: 0.3, dx: -0.105263157894734, dy: -0.105263157894734 },
        { x: 0.175, y: 0.23, dx: -0.626315789473681, dy: -0.626315789473681 },
        { x: 0.6, y: 0.05, dx: -0.210526315789474, dy: -0.210526315789474 },
        { x: 1, y: 0, dx: -0.105263157894737, dy: -0.105263157894737 },
      ]),
      [MiitomoShaderMaterial.LUTFresnelTextureType.SKIN_01]: new KeyframeInterpolator([
        { x: 0.005, y: 0.35, dx: -0.105263157894734, dy: -0.105263157894734 },
        { x: 0.173, y: 0.319, dx: -0.205263157894734, dy: -0.205263157894734 },
        { x: 0.552, y: 0.051, dx: -0.210526315789474, dy: -0.210526315789474 },
        { x: 1, y: 0.001, dx: 0, dy: 0 },
      ]),
    },
  };
  static modulateTypeToLUTSpecular = [
    MiitomoShaderMaterial.LUTSpecularTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTSpecularTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTSpecularTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTSpecularTextureType.NONE,
    MiitomoShaderMaterial.LUTSpecularTextureType.NONE,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTSpecularTextureType.DEFAULT_02,
  ];
  static modulateTypeToLUTFresnel = [
    MiitomoShaderMaterial.LUTFresnelTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTFresnelTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTFresnelTextureType.SKIN_01,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTFresnelTextureType.NONE,
    MiitomoShaderMaterial.LUTFresnelTextureType.NONE,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
    MiitomoShaderMaterial.LUTFresnelTextureType.DEFAULT_02,
  ];
  static _lutTextures = null;
  static getLUTTextures(e = 512) {
    if (MiitomoShaderMaterial._lutTextures) return MiitomoShaderMaterial._lutTextures;
    let t = { specular: {}, fresnel: {} },
      r = Number(THREE.REVISION) <= 136 ? THREE.LuminanceFormat : THREE.RedFormat;
    function n(i, o) {
      for (let s in i) {
        let a = i[s].generateLUT(e);
        o[Number(s)] = Object.assign(new THREE.DataTexture(a, e, 1, r, THREE.UnsignedByteType), {
          colorSpace: THREE.LinearSRGBColorSpace,
          needsUpdate: !0,
        });
      }
    }
    return (
      n(MiitomoShaderMaterial.lutDefinitions.specular, t.specular),
      n(MiitomoShaderMaterial.lutDefinitions.fresnel, t.fresnel),
      (MiitomoShaderMaterial._lutTextures = t),
      t
    );
  }
  static defaultHSLightGroundColor = new THREE.Color(0.87843, 0.72157, 0.5898);
  static defaultHSLightSkyColor = new THREE.Color(0.87843, 0.83451, 0.80314);
  static defaultDirLightColor0 = new THREE.Color(0.35137, 0.32392, 0.32392);
  static defaultDirLightColor1 = new THREE.Color(0.10039, 0.09255, 0.09255);
  static defaultDirLightCount = 2;
  static defaultDirLightDirAndType0 = new THREE.Vector4(-0.2, 0.5, 0.8, -1);
  static defaultDirLightDirAndType1 = new THREE.Vector4(0, -0.19612, 0.98058, -1);
  static defaultLightColor = new THREE.Color(0.35137, 0.32392, 0.32392);
  static defaultLightDirection = this.defaultDirLightDirAndType0;
  static multiplyColorIfNeeded(e, t, r) {
    if (t === 1 || t === 4 || (r === 0 && t === 9))
      ((e.r *= 0.9019608), (e.g *= 0.9019608), (e.b *= 0.9019608));
    return e;
  }
  #t;
  constructor(e = {}) {
    let t = {
      uAlpha: { value: 1 },
      uHSLightGroundColor: { value: MiitomoShaderMaterial.defaultHSLightGroundColor },
      uHSLightSkyColor: { value: MiitomoShaderMaterial.defaultHSLightSkyColor },
      uDirLightColor0: { value: MiitomoShaderMaterial.defaultDirLightColor0 },
      uDirLightColor1: { value: MiitomoShaderMaterial.defaultDirLightColor1 },
      uDirLightCount: { value: MiitomoShaderMaterial.defaultDirLightCount },
      uDirLightDirAndType0: { value: MiitomoShaderMaterial.defaultDirLightDirAndType0.clone() },
      uDirLightDirAndType1: { value: MiitomoShaderMaterial.defaultDirLightDirAndType1.clone() },
      uLightEnable: { value: !0 },
      uLightColor: { value: MiitomoShaderMaterial.defaultLightColor },
      u_hairTipColor: { value: new THREE.Vector3(0, 0, 0) },
      u_hairTipDir: { value: new THREE.Vector3(-0.2, 0.7, 0.2) },
      u_hairTipPos: { value: 45 },
      u_useHairTip: { value: !1 },
    };
    if (typeof e.modulateType === void 0) alert("modulateType not set in LUTShaderMaterial");
    if (typeof e.modulateMode === void 0) alert("modulateMode not set in LUTShaderMaterial");
    let r = !1,
      n = -1,
      i = -1;
    if (typeof e.additionalInfo === "object")
      ((r = typeof e.additionalInfo.applyGhost === "boolean"),
        (n = e.additionalInfo.favoriteColor),
        (i = e.additionalInfo.facePaintColor));
    if (typeof e.facePaintColor < "u") i = e.facePaintColor;
    let o = "";
    if (typeof e.maskMap < "u") {
      o = `#define AGX_FEATURE_MASK_TEXTURE
`;
      let s = e.maskMap;
      ((s.wrapS = 1002), (s.wrapT = 1002), (s.needsUpdate = !0), (t.uMaskTexture = { value: s }));
    }
    if (r || e.applyGhost)
      ((o += `#define AGX_FEATURE_GHOST
`),
        (t.uGhostStrength = { value: 2.5 }));
    super({ vertexShader: MIITOMO_VERTEX_SHADER, fragmentShader: o !== "" ? o + MIITOMO_FRAGMENT_SHADER : MIITOMO_FRAGMENT_SHADER, uniforms: t });
    if (
      ((this.optionsALL = e),
      (this.#t = r || e.applyGhost || !1),
      (this.uGhostMode = -1),
      this.#t && typeof e.charInfo < "u")
    ) {
      if (((this._charInfo = e.charInfo), this.#t && this._charInfo !== void 0)) {
        let s;
        if (i > -1)
          ((s = new THREE.Vector3(...COMMON_COLORS_RGB[i])),
            (this.uniforms.uGhostMode = { value: 1 }),
            (this.uGhostMode = 1));
        else {
          if (n === -1) n = this._charInfo.personal.favoriteColor;
          ((s = new THREE.Vector3(...FAVORITE_COLORS_RGB[Math.min(11, Math.max(n, 0))])),
            (this.uniforms.uGhostMode = { value: 0 }),
            (this.uGhostMode = 0));
        }
        this.uniforms.uGhostColor = { value: s };
      }
      delete e.applyGhost;
    }
    (applyHairTipSettings(this, e),
      delete e.charInfo,
      delete e.additionalInfo,
      delete e.maskMap,
      delete e.drawType,
      (this._modulateType = 0),
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
    if (!this.uniforms.uColor0) return null;
    else if (this._color3) return this._color3;
    let e = this.uniforms.uColor0.value,
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
          ((this.uniforms.uColor0 = { value: t(e[0]) }),
            (this.uniforms.uColor1 = { value: t(e[1]) }),
            (this.uniforms.uColor2 = { value: t(e[2]) }));
          break;
        }
        case 4: {
          ((this.uniforms.uColor0 = { value: t(e[0]) }),
            (this.uniforms.uColor1 = { value: t(e[1]) }),
            (this.uniforms.uColor2 = { value: t(e[2]) }),
            (this.uniforms.uColor3 = { value: t(e[3]) }));
          break;
        }
      }
      return;
    }
    let r = e ? e : new THREE.Color(1, 1, 1);
    if (((this._color3 = r), this.modulateType !== void 0 && typeof this.modulateMode === "number"))
      MiitomoShaderMaterial.multiplyColorIfNeeded(r, this.modulateType, this.modulateMode);
    let n = this.opacity;
    if (this._opacity) delete this._opacity;
    this.uniforms.uColor0 = { value: t(r, n) };
  }
  get opacity() {
    if (!this.uniforms.uColor0) return this._opacity ? this._opacity : 1;
    return this.uniforms.uColor0.value.w;
  }
  set opacity(e) {
    if (!this.uniforms || !this.uniforms.uColor0) {
      this._opacity = 1;
      return;
    }
    this.uniforms.uColor0.value.w = e;
  }
  get modulateMode() {
    return this.uniforms.uMode ? this.uniforms.uMode.value : null;
  }
  set modulateMode(e) {
    this.uniforms.uMode = { value: e };
  }
  get lightEnable() {
    return this.uniforms.uLightEnable ? this.uniforms.uLightEnable.value : null;
  }
  set lightEnable(e) {
    this.uniforms.uLightEnable = { value: e };
  }
  get modulateType() {
    return this._modulateType;
  }
  set modulateType(e) {
    this.setModulateType(e);
  }
  setModulateType(e) {
    let t = MiitomoShaderMaterial.getLUTTextures(),
      r = MiitomoShaderMaterial.modulateTypeToLUTSpecular[e],
      n = MiitomoShaderMaterial.modulateTypeToLUTFresnel[e];
    if (r === void 0 || n === void 0) return;
    this._modulateType = e;
    let i = t.specular[r],
      o = t.fresnel[n];
    if (((this.uniforms.uType = { value: e }), this.#t))
      ((this.uniforms.uLUTSpecTexture = { value: t.specular[2] }),
        (this.uniforms.uLUTFresTexture = { value: t.fresnel[2] }));
    else
      ((this.uniforms.uLUTSpecTexture = { value: i }),
        (this.uniforms.uLUTFresTexture = { value: o }));
    ((this.uniforms.uAlphaTest = { value: e >= 6 && e <= 8 }),
      (this._side = this.side),
      (this.side = e === 6 ? THREE.DoubleSide : this.side));
  }
  get map() {
    return this.uniforms.uAlbedoTexture ? this.uniforms.uAlbedoTexture.value : null;
  }
  set map(e) {
    this.uniforms.uAlbedoTexture = { value: e };
  }
  get lightDirection() {
    return this.uniforms.uDirLightDirAndType0.value;
  }
  set lightDirection(e) {
    ((this.uniforms.uDirLightDirAndType0 = { value: e }),
      (this.uniforms.uDirLightDirAndType0.value.w = -1));
  }
  get isMiitomoShader() {
    return !0;
  }
  get canGhost() {
    return !0;
  }
  normalMapType = THREE.TangentSpaceNormalMap;
  set maskMap(e) {
    this.uniforms.uMaskTexture = { value: e };
  }
  get overlayMap() {
    return this.uniforms.uOverlayTexture ? this.uniforms.uOverlayTexture.value : null;
  }
  set overlayMap(e) {
    this.uniforms.uOverlayTexture = { value: e };
  }
  _charInfo;
  set charInfo(e) {
    this._charInfo = e;
  }
}
var MiitomoShader = MiitomoShaderMaterial;
