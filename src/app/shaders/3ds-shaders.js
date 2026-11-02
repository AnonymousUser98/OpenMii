// src/app/shaders/3ds-shaders.js
// 3DS and Tomodachi Life shaders — shader ids "3ds" and "3ds_alt".
//
// Defines: THREE_DS_VERTEX_SHADER, THREE_DS_LUT, TOMODACHI_LIFE_LUT, threeDSLookupTexture,
//          initThreeDSLookupTexture, tomodachiLifeLookupTexture, initTomodachiLifeLookupTexture,
//          THREE_DS_FRAGMENT_SHADER, TOMODACHI_LIFE_FRAGMENT_SHADER, ThreeDSShaderMaterial,
//          TomodachiLifeShaderMaterial
// Uses from other files:
//   app/shaders/shader-registry.js: Cx, applyHairTipSettings
//   app/items/item-lists.js: HAT_MODEL_INFO

var THREE_DS_VERTEX_SHADER = includeGLSL("3ds/3ds.vert.glsl"),
  THREE_DS_LUT = new Uint8Array([
    5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12,
    12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 21, 21, 22, 23, 23, 24, 25,
    25, 26, 27, 27, 28, 29, 30, 30, 31, 32, 33, 34, 34, 35, 36, 37, 39, 40, 41, 43, 44, 46, 47, 49,
    51, 53, 55, 57, 60, 63, 65, 68, 71, 74, 78, 81, 85, 89, 93, 98, 102, 107, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
    3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10,
    10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 19,
    19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 28, 28, 29, 29, 30, 31, 31, 32,
    32, 33, 34, 34, 35, 36, 36, 37, 38, 39, 39, 40, 41, 42, 42, 43, 44, 45, 45, 46, 47, 48, 49, 50,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
  ]),
  TOMODACHI_LIFE_LUT = new Uint8Array([
    2.75, 2.75, 2.75, 2.2, 2.2, 2.2, 2.2, 1.65, 1.65, 1.65, 1.65, 1.65, 1.1, 1.1, 1.1, 1.1, 1.1,
    1.1, 1.1, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55,
    0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 1.1, 1.1,
    1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.65, 1.65, 1.65, 1.65, 1.65, 1.65,
    1.65, 1.65, 1.65, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.75, 2.75, 2.75, 2.75, 3.3, 3.3, 3.3, 3.3,
    3.85, 3.85, 3.85, 3.85, 4.4, 4.4, 4.4, 4.95, 4.95, 4.95, 5.5, 5.5, 5.5, 6.05, 6.05, 6.6, 6.6,
    6.6, 7.15, 7.15, 7.7, 7.7, 8.25, 8.25, 8.8, 8.8, 9.35, 9.35, 9.9, 9.9, 10.45, 10.45, 11, 11.55,
    11.55, 12.1, 12.65, 12.65, 13.2, 13.75, 13.75, 14.3, 14.85, 14.85, 15.4, 15.95, 16.5, 16.5,
    17.05, 17.6, 18.15, 18.7, 18.7, 19.25, 19.8, 20.35, 21.45, 22, 22.55, 23.65, 24.2, 25.3, 25.85,
    26.95, 28.05, 29.15, 30.25, 31.35, 33, 34.65, 35.75, 37.4, 39.05, 40.7, 42.9, 44.55, 46.75,
    48.95, 51.15, 53.9, 56.1, 58.85, 52, 50, 48, 46, 44, 42, 41, 39, 37, 35, 33, 32, 30, 29, 28, 26,
    26, 25, 24, 23, 22, 21, 20, 20, 19, 18, 17, 17, 16, 15, 15, 14, 13, 13, 12, 11, 11, 10, 10, 9,
    9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]),
  threeDSLookupTexture = null;
function initThreeDSLookupTexture() {
  if (threeDSLookupTexture) return;
  ((threeDSLookupTexture = new DataTexture_2(THREE_DS_LUT, 512, 1, 1028, 1009)),
    (threeDSLookupTexture.minFilter = 1006),
    (threeDSLookupTexture.magFilter = 1006),
    (threeDSLookupTexture.needsUpdate = !0));
}
var tomodachiLifeLookupTexture = null;
function initTomodachiLifeLookupTexture() {
  if (tomodachiLifeLookupTexture) return;
  ((tomodachiLifeLookupTexture = new DataTexture_2(TOMODACHI_LIFE_LUT, 512, 1, 1028, 1009)),
    (tomodachiLifeLookupTexture.minFilter = 1006),
    (tomodachiLifeLookupTexture.magFilter = 1006),
    (tomodachiLifeLookupTexture.needsUpdate = !0));
}
var THREE_DS_FRAGMENT_SHADER = includeGLSL("3ds/3ds.frag.glsl"),
  TOMODACHI_LIFE_FRAGMENT_SHADER = includeGLSL("3ds/tomodachi-life.frag.glsl");
class ThreeDSShaderMaterial extends ShaderMaterial_2 {
  constructor(e = {}) {
    if (!e.lut) initThreeDSLookupTexture();
    let t = e.lights || [];
    for (let o = 0; o < 8; ++o)
      t.push({
        position: new Vector3_2(-0.53906, 0.53906, 0.64697),
        diffuse: new Vector3_2(1, 1, 1),
        specular_0: new Vector3_2(1, 1, 1),
        specular_1: new Vector3_2(0, 0, 0),
        ambient: new Vector3_2(0, 0, 0),
        spot_direction: new Vector3_2(0, 0, 1),
        dist_atten_bias: 0,
        dist_atten_scale: 0,
      });
    let r = e.fragment || THREE_DS_FRAGMENT_SHADER;
    if (Cx())
      r =
        `#define UseHairShadow
` + r;
    let n = {
      uniforms: {
        light_src: { value: t },
        u_lightEnable: { value: e.lightEnable !== void 0 ? e.lightEnable : !0 },
        u_LUT: { value: e.lut || threeDSLookupTexture },
        u_hairTipColor: { value: new Vector3_2(0, 0, 0) },
        u_hairTipDir: { value: new Vector3_2(-0.2, 0.7, 0.2) },
        u_hairTipPos: { value: 45 },
        u_useHairTip: { value: !1 },
        u_hairTipFlip: { value: !1 },
      },
      vertexShader: THREE_DS_VERTEX_SHADER,
      fragmentShader: r,
    };
    (delete e.lut, delete e.fragment);
    super(n);
    this._modulateType = 0;
    let i = Object.assign({}, e);
    if (
      (delete i.lightEnable,
      delete i.drawType,
      delete i.eyeShine,
      delete i.eyeShineTex,
      typeof i.map > "u")
    )
      delete i.map;
    if (e.additionalInfo) this.additionalInfo = e.additionalInfo;
    (applyHairTipSettings(this, e), delete i.charInfo, delete i.additionalInfo, this.setValues(i));
  }
  additionalInfo;
  _color3;
  _opacity;
  get useHairTip() {
    return !0;
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
class TomodachiLifeShaderMaterial extends ThreeDSShaderMaterial {
  constructor(e) {
    (initTomodachiLifeLookupTexture(),
      (e.lut = tomodachiLifeLookupTexture),
      (e.fragment = TOMODACHI_LIFE_FRAGMENT_SHADER),
      (e.lights = [
        {
          specular_0: new Vector3_2(1, 0.96078, 0.91765),
          specular_1: new Vector3_2(0.49804, 0.46275, 0.48627),
          diffuse: new Vector3_2(1, 1, 1),
          ambient: new Vector3_2(0, 0, 0),
          position: new Vector3_2(-0.34253, 0.85645, 0.3855),
          spot_direction: new Vector3_2(0, 0, 1),
          dist_atten_bias: 0,
          dist_atten_scale: 0,
        },
        {
          specular_0: new Vector3_2(0, 0, 0),
          specular_1: new Vector3_2(0, 0, 0),
          diffuse: new Vector3_2(0.4, 0.34902, 0.30196),
          ambient: new Vector3_2(0, 0, 0),
          position: new Vector3_2(0, -0.24243, 0.96973),
          spot_direction: new Vector3_2(0, 0, 1),
          dist_atten_bias: 0,
          dist_atten_scale: 1,
        },
      ]));
    for (let t = 0; t < 6; ++t)
      e.lights.push({
        specular_0: new Vector3_2(1, 0.96078, 0.91765),
        specular_1: new Vector3_2(0.49804, 0.46275, 0.48627),
        diffuse: new Vector3_2(1, 1, 1),
        ambient: new Vector3_2(0, 0, 0),
        position: new Vector3_2(-0.34253, 0.85645, 0.3855),
        spot_direction: new Vector3_2(0, 0, 1),
        dist_atten_bias: 0,
        dist_atten_scale: 0,
      });
    super(e);
  }
}
