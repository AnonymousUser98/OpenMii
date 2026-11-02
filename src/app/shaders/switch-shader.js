// src/app/shaders/switch-shader.js
// Switch shader — shader id "switch".
//
// Defines: SWITCH_VERTEX_SHADER, SWITCH_FRAGMENT_SHADER, QL, SwitchShaderMaterial, SwitchShader
// Uses from other files:
//   app/shaders/switch-shader-params.js: SWITCH_DEFAULT_MATERIAL_PARAMS, kL, WT, UL, QT, HL, GL,
//                                        zL, VL, hg, WL
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/renderer/three-module.js: getTHREE
//   app/shaders/shader-registry.js: applyHairTipSettings

var THREE = getTHREE();
var SWITCH_VERTEX_SHADER = includeGLSL("switch/switch.vert.glsl"),
  SWITCH_FRAGMENT_SHADER = includeGLSL("switch/switch.frag.glsl"),
  QL = {
    halfLambertFactor: 0.5,
    sssSpecularBlendFactor: 0.5,
    sssColor: [0, 0, 0],
    specular: { color: [0, 0, 0], factorA: 1, factorB: 0, shininess: 0.8 },
    rimLight: { color: [-0.02, -0.02, -0.05], power: 1, width: 0.3 },
  };
function uu(e, t, r = !1) {
  let n = t;
  if (r) n += 2147483648;
  return e[n % e.length];
}
class SwitchShaderMaterial extends THREE.ShaderMaterial {
  static defaultLightDir = new THREE.Vector4(-0.12279, 0.70711, 0.69636, 1);
  static defaultLightColor = new THREE.Vector4(1, 1, 1, 1);
  _modulateType = -1;
  _drawType;
  _color3;
  _opacity;
  _charInfo;
  _additionalInfo;
  _ignoreMatColor;
  hatOverride;
  get needsLowResourceFix() {
    return !0;
  }
  constructor(e) {
    let t = Object.assign({}, e);
    if (e.modulateType === 0);
    let r = {
      lightDirInView: { value: SwitchShaderMaterial.defaultLightDir.clone() },
      lightColor: { value: SwitchShaderMaterial.defaultLightColor.clone() },
      lightEnable: { value: !0 },
      gammaType: { value: 1 },
      ignoreMatColor: { value: !1 },
      s_Tex: { value: e.map || null },
      u_hairTipColor: { value: new THREE.Vector3(0, 0, 0) },
      u_hairTipDir: { value: new THREE.Vector3(-0.2, 0.7, 0.2) },
      u_hairTipPos: { value: 45 },
      u_useHairTip: { value: !1 },
      u_hairTipFlip: { value: !1 },
      u2_SssColor: { value: new THREE.Vector4() },
      u2_SpecularColor: { value: new THREE.Vector4() },
      u2_RimColor: { value: new THREE.Vector4() },
      u2_HalfLambertFactor: { value: 0 },
      u2_SssSpecularFactor: { value: 0 },
      u2_SpecularFactorA: { value: 0 },
      u2_SpecularFactorB: { value: 0 },
      u2_SpecularShininess: { value: 0 },
      u2_RimPower: { value: 0 },
      u2_RimWidth: { value: 0 },
    };
    if (e.map) ((e.map.premultiplyAlpha = !1), (e.map.needsUpdate = !0));
    if (typeof e.maskMap < "u") {
      r.SAMPLE_MASK_TEXTURE = { value: !0 };
      let n = e.maskMap;
      ((n.premultiplyAlpha = !1),
        (n.needsUpdate = !0),
        (n.wrapS = 1002),
        (n.wrapT = 1002),
        (n.needsUpdate = !0),
        (r.s_MaskTex = { value: n }));
    }
    if (e.lowResourceFix) r.LOW = { value: !0 };
    else r.LOW = { value: !1 };
    (delete e.lowResourceFix, delete t.lowResourceFix);
    super({ vertexShader: SWITCH_VERTEX_SHADER, fragmentShader: SWITCH_FRAGMENT_SHADER, uniforms: r });
    if (
      ((this.charInfo = e.charInfo),
      (this.additionalInfo = e.additionalInfo),
      e.modulateType !== void 0)
    ) {
      if (e.modulateType === 0)
        ((t.blendAlpha = 0),
          (t.blendDst = 205),
          (t.blendEquation = 100),
          (t.blendSrc = 204),
          (t.blending = 1),
          delete t.map);
      ((this.modulateType = e.modulateType), (this._modulateType = e.modulateType));
    }
    if (e.modulateMode !== void 0) this.modulateMode = t.modulateMode;
    if (e.map !== void 0 && e.map !== null) this.map = e.map;
    if (e.drawType !== void 0) this.drawType = e.drawType;
    if (e.ignoreMatColor !== void 0) this.ignoreMatColor = e.ignoreMatColor;
    else this.ignoreMatColor = !1;
    (delete t.charInfo,
      delete t.modulateType,
      delete t.modulateMode,
      delete t.map,
      delete t.maskMap,
      this.setValues(t),
      (this.modulateType = t.modulateType),
      applyHairTipSettings(this, e));
  }
  get useHairTip() {
    return !0;
  }
  set hairTipColor(e) {
    if (e === void 0) return;
    let t,
      r = this.additionalInfo?.hairTipColor ?? -1;
    if (e instanceof THREE.Vector3 || e instanceof THREE.Vector4) {
      if (((t = new THREE.Vector3(e.x, e.y, e.z)), "w" in e && e.w !== void 0)) r = e.w;
    } else if (typeof e === "object") {
      if (((t = new THREE.Vector3(e.x ?? 1, e.y ?? 1, e.z ?? 1)), e.w !== void 0)) r = e.w;
    } else t = this.color ?? new THREE.Vector3(1, 1, 1);
    if (!this.uniforms.u_useHairTip) this.uniforms.u_useHairTip = { value: !0 };
    else this.uniforms.u_useHairTip.value = !0;
    if (!this.uniforms.u_hairTipColor) this.uniforms.u_hairTipColor = { value: t };
    else this.uniforms.u_hairTipColor.value.copy(t);
    let n = 45;
    if (this.additionalInfo?.hatType > -1 && HAT_MODEL_INFO[this.additionalInfo.hatType]?.mdlType === 1) n = 39;
    if (!this.uniforms.u_hairTipPos) this.uniforms.u_hairTipPos = { value: n };
    else this.uniforms.u_hairTipPos.value = n;
    let i = uu(hg, r);
    if (i) {
      let o = (a, l) => {
          if (!this.uniforms[a]) this.uniforms[a] = { value: new THREE.Vector4(...l) };
          else this.uniforms[a].value.set(...l);
        },
        s = (a, l) => {
          if (!this.uniforms[a]) this.uniforms[a] = { value: l };
          else this.uniforms[a].value = l;
        };
      (o("u2_SssColor", i.sssColor),
        o("u2_SpecularColor", i.specular.color),
        o("u2_RimColor", i.rimLight.color),
        s("u2_HalfLambertFactor", i.halfLambertFactor),
        s("u2_SssSpecularFactor", i.sssSpecularBlendFactor),
        s("u2_SpecularFactorA", i.specular.factorA),
        s("u2_SpecularFactorB", i.specular.factorB),
        s("u2_SpecularShininess", i.specular.shininess),
        s("u2_RimPower", i.rimLight.power),
        s("u2_RimWidth", i.rimLight.width));
    }
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
  get ignoreMatColor() {
    return this._ignoreMatColor;
  }
  set ignoreMatColor(e) {
    if (
      ((this._ignoreMatColor = e), (this.uniforms.ignoreMatColor.value = e), this._ignoreMatColor)
    ) {
      let t = Object.assign({}, QL);
      ((this.uniforms.u_SssColor = { value: new THREE.Vector4(...t.sssColor) }),
        (this.uniforms.u_SpecularColor = { value: new THREE.Vector4(...t.specular.color) }),
        (this.uniforms.u_RimColor = { value: new THREE.Vector4(...t.rimLight.color) }),
        (this.uniforms.u_HalfLambertFactor = { value: t.halfLambertFactor }),
        (this.uniforms.u_SssSpecularFactor = { value: t.sssSpecularBlendFactor }),
        (this.uniforms.u_SpecularFactorA = { value: t.specular.factorA }),
        (this.uniforms.u_SpecularFactorB = { value: t.specular.factorB }),
        (this.uniforms.u_SpecularShininess = { value: t.specular.shininess }),
        (this.uniforms.u_RimPower = { value: t.rimLight.power }),
        (this.uniforms.u_RimWidth = { value: t.rimLight.width }));
    }
  }
  get charInfo() {
    return this._charInfo;
  }
  set charInfo(e) {
    this._charInfo = e;
  }
  get additionalInfo() {
    return this._additionalInfo;
  }
  set additionalInfo(e) {
    this._additionalInfo = e;
  }
  get color() {
    if (!this.uniforms.u_ConstColor0) return null;
    else if (this._color3) return this._color3;
    let e = this.uniforms.u_ConstColor0.value,
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
          ((this.uniforms.u_ConstColor0 = { value: t(e[0]) }),
            (this.uniforms.u_ConstColor1 = { value: t(e[1]) }),
            (this.uniforms.u_ConstColor2 = { value: t(e[2]) }));
          break;
        }
        case 4: {
          ((this.uniforms.u_ConstColor0 = { value: t(e[0]) }),
            (this.uniforms.u_ConstColor1 = { value: t(e[1]) }),
            (this.uniforms.u_ConstColor2 = { value: t(e[2]) }),
            (this.uniforms.u_ConstColor3 = { value: t(e[3]) }));
          break;
        }
      }
      return;
    }
    let r = e ? e : new THREE.Color(1, 1, 1);
    this._color3 = r;
    let n = this.opacity;
    if (this._opacity) delete this._opacity;
    this.uniforms.u_ConstColor0 = { value: t(r, n) };
  }
  get opacity() {
    if (!this.uniforms.u_ConstColor0) return this._opacity ? this._opacity : 1;
    return this.uniforms.u_ConstColor0.value.w;
  }
  set opacity(e) {
    if (!this.uniforms || !this.uniforms.u_ConstColor0) {
      this._opacity = 1;
      return;
    }
    this.uniforms.u_ConstColor0.value.w = e;
  }
  get modulateMode() {
    return this.uniforms.u_mode ? this.uniforms.u_mode.value : null;
  }
  get isSwitchShader() {
    return !0;
  }
  set modulateMode(e) {
    if (e == 4) e = 5;
    else if (e == 5) e = 4;
    this.uniforms.modulateType = { value: e };
  }
  get lightEnable() {
    return this.uniforms.u_light_enable ? this.uniforms.u_light_enable.value : null;
  }
  set lightEnable(e) {
    this.uniforms.u_light_enable = { value: e };
  }
  get modulateType() {
    return this._modulateType;
  }
  set modulateType(e) {
    if (!this.additionalInfo) return;
    let t,
      r,
      n,
      i = 0,
      o = () => {
        if (this.additionalInfo.facePaintColor > -1)
          return uu(hg, this.additionalInfo.facePaintColor);
        else return uu(UL, this._charInfo.faceline.color);
      };
    switch (e) {
      case 0:
      case 3:
        t = o();
        break;
      case 1:
        t = uu(WL, this._charInfo.beard.color, !0);
        break;
      case 2:
        if (this.additionalInfo.facePaintColor > -1) t = uu(hg, this.additionalInfo.facePaintColor);
        else t = uu(HL, this._charInfo.faceline.color);
        break;
      case 4:
        t = uu(hg, this._charInfo.hair.color, !0);
        break;
      case 5:
        if (
          this.additionalInfo.hatCommonColor > -1 ||
          this.additionalInfo.hatPrimaryColor > -1 ||
          (this.additionalInfo.hatType > -1 && HAT_MODEL_INFO[this.additionalInfo.hatType].texType === 2)
        )
          ((t = VL), (this.hatOverride = !0));
        else
          t = uu(
            zL,
            this.additionalInfo.hatFavoriteColor > -1
              ? this.additionalInfo.hatFavoriteColor
              : this.additionalInfo.favoriteColor,
          );
        break;
      case 6:
      case 7:
        t = SWITCH_DEFAULT_MATERIAL_PARAMS;
        break;
      case 8:
        t = kL;
        break;
      case 9:
        if (typeof this.additionalInfo.favoriteColor < "u") {
          if (((t = uu(GL, this.additionalInfo.favoriteColor)), this.map)) ((r = o()), (n = t));
          if (this.additionalInfo.shirtColor > -1) ((t = QT), (n = Object.assign({}, QL)));
        }
        break;
      case 10:
        if (this._charInfo !== void 0) {
          if (this._charInfo.personal.special) t = WT[1];
          else t = WT[0];
          if (this.additionalInfo.pantsColor > -1) t = QT;
        }
        break;
    }
    switch (e) {
      case 4:
        i = 2;
        break;
      case 0:
      default:
        i = 0;
        break;
    }
    if (!t) return;
    if (
      ((this._modulateType = e),
      (this._drawType = i),
      (this.uniforms.u_type = { value: e }),
      (this.uniforms.u_SssColor = { value: new THREE.Vector4(...t.sssColor) }),
      (this.uniforms.u_SpecularColor = { value: new THREE.Vector4(...t.specular.color) }),
      (this.uniforms.u_RimColor = { value: new THREE.Vector4(...t.rimLight.color) }),
      (this.uniforms.u_HalfLambertFactor = { value: t.halfLambertFactor }),
      (this.uniforms.u_SssSpecularFactor = { value: t.sssSpecularBlendFactor }),
      (this.uniforms.u_SpecularFactorA = { value: t.specular.factorA }),
      (this.uniforms.u_SpecularFactorB = { value: t.specular.factorB }),
      (this.uniforms.u_SpecularShininess = { value: t.specular.shininess }),
      (this.uniforms.u_RimPower = { value: t.rimLight.power }),
      (this.uniforms.u_RimWidth = { value: t.rimLight.width }),
      (this.uniforms.drawType = { value: i }),
      r)
    )
      ((this.uniforms.u2_SssColor = { value: new THREE.Vector4(...r.sssColor) }),
        (this.uniforms.u2_SpecularColor = { value: new THREE.Vector4(...r.specular.color) }),
        (this.uniforms.u2_RimColor = { value: new THREE.Vector4(...r.rimLight.color) }),
        (this.uniforms.u2_HalfLambertFactor = { value: r.halfLambertFactor }),
        (this.uniforms.u2_SssSpecularFactor = { value: r.sssSpecularBlendFactor }),
        (this.uniforms.u2_SpecularFactorA = { value: r.specular.factorA }),
        (this.uniforms.u2_SpecularFactorB = { value: r.specular.factorB }),
        (this.uniforms.u2_SpecularShininess = { value: r.specular.shininess }),
        (this.uniforms.u2_RimPower = { value: r.rimLight.power }),
        (this.uniforms.u2_RimWidth = { value: r.rimLight.width }));
    if (n)
      ((this.uniforms.u3_SssColor = { value: new THREE.Vector4(...n.sssColor) }),
        (this.uniforms.u3_SpecularColor = { value: new THREE.Vector4(...n.specular.color) }),
        (this.uniforms.u3_RimColor = { value: new THREE.Vector4(...n.rimLight.color) }),
        (this.uniforms.u3_HalfLambertFactor = { value: n.halfLambertFactor }),
        (this.uniforms.u3_SssSpecularFactor = { value: n.sssSpecularBlendFactor }),
        (this.uniforms.u3_SpecularFactorA = { value: n.specular.factorA }),
        (this.uniforms.u3_SpecularFactorB = { value: n.specular.factorB }),
        (this.uniforms.u3_SpecularShininess = { value: n.specular.shininess }),
        (this.uniforms.u3_RimPower = { value: n.rimLight.power }),
        (this.uniforms.u3_RimWidth = { value: n.rimLight.width }));
  }
  get map() {
    return this.uniforms.s_Tex ? this.uniforms.s_Tex.value : null;
  }
  set map(e) {
    if (e) ((e.premultiplyAlpha = !1), (e.needsUpdate = !0));
    if (((this.uniforms.s_Tex = { value: e }), this._modulateType === 0))
      this.uniforms.drawType = { value: 1 };
  }
  get overlayMap() {
    return this.uniforms.s_Ovl ? this.uniforms.s_Ovl.value : null;
  }
  set overlayMap(e) {
    if (e) ((e.premultiplyAlpha = !1), (e.needsUpdate = !0));
    this.uniforms.s_Ovl = { value: e };
  }
  get drawType() {
    return this.uniforms.drawType ? this.uniforms.drawType.value : -1;
  }
  set drawType(e) {
    this.uniforms.drawType = { value: e };
  }
  get lightDirection() {
    return this.uniforms.u_light_dir.value;
  }
  set lightDirection(e) {
    this.uniforms.u_light_dir = { value: e };
  }
}
var SwitchShader = SwitchShaderMaterial;
