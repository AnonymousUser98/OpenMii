// src/vendor/three-copy/materials.js
// A second, partial copy of three.js (Material, ShaderMaterial, vectors, Texture) used as the base
// of the custom shaders.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

class du {
  addEventListener(e, t) {
    if (this._listeners === void 0) this._listeners = {};
    let r = this._listeners;
    if (r[e] === void 0) r[e] = [];
    if (r[e].indexOf(t) === -1) r[e].push(t);
  }
  hasEventListener(e, t) {
    let r = this._listeners;
    if (r === void 0) return !1;
    return r[e] !== void 0 && r[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    let r = this._listeners;
    if (r === void 0) return;
    let n = r[e];
    if (n !== void 0) {
      let i = n.indexOf(t);
      if (i !== -1) n.splice(i, 1);
    }
  }
  dispatchEvent(e) {
    let t = this._listeners;
    if (t === void 0) return;
    let r = t[e.type];
    if (r !== void 0) {
      e.target = this;
      let n = r.slice(0);
      for (let i = 0, o = n.length; i < o; i++) n[i].call(this, e);
      e.target = null;
    }
  }
}
var xK = 0;
class Material_2 extends du {
  constructor() {
    super();
    ((this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: xK++ }),
      (this.uuid = vd()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = AT),
      (this.side = gT),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = xT),
      (this.blendDst = bT),
      (this.blendEquation = yT),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Color_2(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = _T),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = MT),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = If),
      (this.stencilZFail = If),
      (this.stencilZPass = If),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    if (this._alphaTest > 0 !== e > 0) this.version++;
    this._alphaTest = e;
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e === void 0) return;
    for (let t in e) {
      let r = e[t];
      if (r === void 0) continue;
      let n = this[t];
      if (n === void 0) continue;
      if (n && n.isColor) n.set(r);
      else if (n && n.isVector3 && r && r.isVector3) n.copy(r);
      else this[t] = r;
    }
  }
  toJSON(e) {
    let t = e === void 0 || typeof e === "string";
    if (t) e = { textures: {}, images: {} };
    let r = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
    if (((r.uuid = this.uuid), (r.type = this.type), this.name !== "")) r.name = this.name;
    if (this.color && this.color.isColor) r.color = this.color.getHex();
    if (this.roughness !== void 0) r.roughness = this.roughness;
    if (this.metalness !== void 0) r.metalness = this.metalness;
    if (this.sheen !== void 0) r.sheen = this.sheen;
    if (this.sheenColor && this.sheenColor.isColor) r.sheenColor = this.sheenColor.getHex();
    if (this.sheenRoughness !== void 0) r.sheenRoughness = this.sheenRoughness;
    if (this.emissive && this.emissive.isColor) r.emissive = this.emissive.getHex();
    if (this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1)
      r.emissiveIntensity = this.emissiveIntensity;
    if (this.specular && this.specular.isColor) r.specular = this.specular.getHex();
    if (this.specularIntensity !== void 0) r.specularIntensity = this.specularIntensity;
    if (this.specularColor && this.specularColor.isColor)
      r.specularColor = this.specularColor.getHex();
    if (this.shininess !== void 0) r.shininess = this.shininess;
    if (this.clearcoat !== void 0) r.clearcoat = this.clearcoat;
    if (this.clearcoatRoughness !== void 0) r.clearcoatRoughness = this.clearcoatRoughness;
    if (this.clearcoatMap && this.clearcoatMap.isTexture)
      r.clearcoatMap = this.clearcoatMap.toJSON(e).uuid;
    if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture)
      r.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid;
    if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture)
      ((r.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
        (r.clearcoatNormalScale = this.clearcoatNormalScale.toArray()));
    if (this.dispersion !== void 0) r.dispersion = this.dispersion;
    if (this.iridescence !== void 0) r.iridescence = this.iridescence;
    if (this.iridescenceIOR !== void 0) r.iridescenceIOR = this.iridescenceIOR;
    if (this.iridescenceThicknessRange !== void 0)
      r.iridescenceThicknessRange = this.iridescenceThicknessRange;
    if (this.iridescenceMap && this.iridescenceMap.isTexture)
      r.iridescenceMap = this.iridescenceMap.toJSON(e).uuid;
    if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture)
      r.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid;
    if (this.anisotropy !== void 0) r.anisotropy = this.anisotropy;
    if (this.anisotropyRotation !== void 0) r.anisotropyRotation = this.anisotropyRotation;
    if (this.anisotropyMap && this.anisotropyMap.isTexture)
      r.anisotropyMap = this.anisotropyMap.toJSON(e).uuid;
    if (this.map && this.map.isTexture) r.map = this.map.toJSON(e).uuid;
    if (this.matcap && this.matcap.isTexture) r.matcap = this.matcap.toJSON(e).uuid;
    if (this.alphaMap && this.alphaMap.isTexture) r.alphaMap = this.alphaMap.toJSON(e).uuid;
    if (this.lightMap && this.lightMap.isTexture)
      ((r.lightMap = this.lightMap.toJSON(e).uuid), (r.lightMapIntensity = this.lightMapIntensity));
    if (this.aoMap && this.aoMap.isTexture)
      ((r.aoMap = this.aoMap.toJSON(e).uuid), (r.aoMapIntensity = this.aoMapIntensity));
    if (this.bumpMap && this.bumpMap.isTexture)
      ((r.bumpMap = this.bumpMap.toJSON(e).uuid), (r.bumpScale = this.bumpScale));
    if (this.normalMap && this.normalMap.isTexture)
      ((r.normalMap = this.normalMap.toJSON(e).uuid),
        (r.normalMapType = this.normalMapType),
        (r.normalScale = this.normalScale.toArray()));
    if (this.displacementMap && this.displacementMap.isTexture)
      ((r.displacementMap = this.displacementMap.toJSON(e).uuid),
        (r.displacementScale = this.displacementScale),
        (r.displacementBias = this.displacementBias));
    if (this.roughnessMap && this.roughnessMap.isTexture)
      r.roughnessMap = this.roughnessMap.toJSON(e).uuid;
    if (this.metalnessMap && this.metalnessMap.isTexture)
      r.metalnessMap = this.metalnessMap.toJSON(e).uuid;
    if (this.emissiveMap && this.emissiveMap.isTexture)
      r.emissiveMap = this.emissiveMap.toJSON(e).uuid;
    if (this.specularMap && this.specularMap.isTexture)
      r.specularMap = this.specularMap.toJSON(e).uuid;
    if (this.specularIntensityMap && this.specularIntensityMap.isTexture)
      r.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid;
    if (this.specularColorMap && this.specularColorMap.isTexture)
      r.specularColorMap = this.specularColorMap.toJSON(e).uuid;
    if (this.envMap && this.envMap.isTexture) {
      if (((r.envMap = this.envMap.toJSON(e).uuid), this.combine !== void 0))
        r.combine = this.combine;
    }
    if (this.envMapRotation !== void 0) r.envMapRotation = this.envMapRotation.toArray();
    if (this.envMapIntensity !== void 0) r.envMapIntensity = this.envMapIntensity;
    if (this.reflectivity !== void 0) r.reflectivity = this.reflectivity;
    if (this.refractionRatio !== void 0) r.refractionRatio = this.refractionRatio;
    if (this.gradientMap && this.gradientMap.isTexture)
      r.gradientMap = this.gradientMap.toJSON(e).uuid;
    if (this.transmission !== void 0) r.transmission = this.transmission;
    if (this.transmissionMap && this.transmissionMap.isTexture)
      r.transmissionMap = this.transmissionMap.toJSON(e).uuid;
    if (this.thickness !== void 0) r.thickness = this.thickness;
    if (this.thicknessMap && this.thicknessMap.isTexture)
      r.thicknessMap = this.thicknessMap.toJSON(e).uuid;
    if (this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0)
      r.attenuationDistance = this.attenuationDistance;
    if (this.attenuationColor !== void 0) r.attenuationColor = this.attenuationColor.getHex();
    if (this.size !== void 0) r.size = this.size;
    if (this.shadowSide !== null) r.shadowSide = this.shadowSide;
    if (this.sizeAttenuation !== void 0) r.sizeAttenuation = this.sizeAttenuation;
    if (this.blending !== AT) r.blending = this.blending;
    if (this.side !== gT) r.side = this.side;
    if (this.vertexColors === !0) r.vertexColors = !0;
    if (this.opacity < 1) r.opacity = this.opacity;
    if (this.transparent === !0) r.transparent = !0;
    if (this.blendSrc !== xT) r.blendSrc = this.blendSrc;
    if (this.blendDst !== bT) r.blendDst = this.blendDst;
    if (this.blendEquation !== yT) r.blendEquation = this.blendEquation;
    if (this.blendSrcAlpha !== null) r.blendSrcAlpha = this.blendSrcAlpha;
    if (this.blendDstAlpha !== null) r.blendDstAlpha = this.blendDstAlpha;
    if (this.blendEquationAlpha !== null) r.blendEquationAlpha = this.blendEquationAlpha;
    if (this.blendColor && this.blendColor.isColor) r.blendColor = this.blendColor.getHex();
    if (this.blendAlpha !== 0) r.blendAlpha = this.blendAlpha;
    if (this.depthFunc !== _T) r.depthFunc = this.depthFunc;
    if (this.depthTest === !1) r.depthTest = this.depthTest;
    if (this.depthWrite === !1) r.depthWrite = this.depthWrite;
    if (this.colorWrite === !1) r.colorWrite = this.colorWrite;
    if (this.stencilWriteMask !== 255) r.stencilWriteMask = this.stencilWriteMask;
    if (this.stencilFunc !== MT) r.stencilFunc = this.stencilFunc;
    if (this.stencilRef !== 0) r.stencilRef = this.stencilRef;
    if (this.stencilFuncMask !== 255) r.stencilFuncMask = this.stencilFuncMask;
    if (this.stencilFail !== If) r.stencilFail = this.stencilFail;
    if (this.stencilZFail !== If) r.stencilZFail = this.stencilZFail;
    if (this.stencilZPass !== If) r.stencilZPass = this.stencilZPass;
    if (this.stencilWrite === !0) r.stencilWrite = this.stencilWrite;
    if (this.rotation !== void 0 && this.rotation !== 0) r.rotation = this.rotation;
    if (this.polygonOffset === !0) r.polygonOffset = !0;
    if (this.polygonOffsetFactor !== 0) r.polygonOffsetFactor = this.polygonOffsetFactor;
    if (this.polygonOffsetUnits !== 0) r.polygonOffsetUnits = this.polygonOffsetUnits;
    if (this.linewidth !== void 0 && this.linewidth !== 1) r.linewidth = this.linewidth;
    if (this.dashSize !== void 0) r.dashSize = this.dashSize;
    if (this.gapSize !== void 0) r.gapSize = this.gapSize;
    if (this.scale !== void 0) r.scale = this.scale;
    if (this.dithering === !0) r.dithering = !0;
    if (this.alphaTest > 0) r.alphaTest = this.alphaTest;
    if (this.alphaHash === !0) r.alphaHash = !0;
    if (this.alphaToCoverage === !0) r.alphaToCoverage = !0;
    if (this.premultipliedAlpha === !0) r.premultipliedAlpha = !0;
    if (this.forceSinglePass === !0) r.forceSinglePass = !0;
    if (this.wireframe === !0) r.wireframe = !0;
    if (this.wireframeLinewidth > 1) r.wireframeLinewidth = this.wireframeLinewidth;
    if (this.wireframeLinecap !== "round") r.wireframeLinecap = this.wireframeLinecap;
    if (this.wireframeLinejoin !== "round") r.wireframeLinejoin = this.wireframeLinejoin;
    if (this.flatShading === !0) r.flatShading = !0;
    if (this.visible === !1) r.visible = !1;
    if (this.toneMapped === !1) r.toneMapped = !1;
    if (this.fog === !1) r.fog = !1;
    if (Object.keys(this.userData).length > 0) r.userData = this.userData;
    function n(i) {
      let o = [];
      for (let s in i) {
        let a = i[s];
        (delete a.metadata, o.push(a));
      }
      return o;
    }
    if (t) {
      let i = n(e.textures),
        o = n(e.images);
      if (i.length > 0) r.textures = i;
      if (o.length > 0) r.images = o;
    }
    return r;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.name = e.name),
      (this.blending = e.blending),
      (this.side = e.side),
      (this.vertexColors = e.vertexColors),
      (this.opacity = e.opacity),
      (this.transparent = e.transparent),
      (this.blendSrc = e.blendSrc),
      (this.blendDst = e.blendDst),
      (this.blendEquation = e.blendEquation),
      (this.blendSrcAlpha = e.blendSrcAlpha),
      (this.blendDstAlpha = e.blendDstAlpha),
      (this.blendEquationAlpha = e.blendEquationAlpha),
      this.blendColor.copy(e.blendColor),
      (this.blendAlpha = e.blendAlpha),
      (this.depthFunc = e.depthFunc),
      (this.depthTest = e.depthTest),
      (this.depthWrite = e.depthWrite),
      (this.stencilWriteMask = e.stencilWriteMask),
      (this.stencilFunc = e.stencilFunc),
      (this.stencilRef = e.stencilRef),
      (this.stencilFuncMask = e.stencilFuncMask),
      (this.stencilFail = e.stencilFail),
      (this.stencilZFail = e.stencilZFail),
      (this.stencilZPass = e.stencilZPass),
      (this.stencilWrite = e.stencilWrite));
    let t = e.clippingPlanes,
      r = null;
    if (t !== null) {
      let n = t.length;
      r = Array(n);
      for (let i = 0; i !== n; ++i) r[i] = t[i].clone();
    }
    return (
      (this.clippingPlanes = r),
      (this.clipIntersection = e.clipIntersection),
      (this.clipShadows = e.clipShadows),
      (this.shadowSide = e.shadowSide),
      (this.colorWrite = e.colorWrite),
      (this.precision = e.precision),
      (this.polygonOffset = e.polygonOffset),
      (this.polygonOffsetFactor = e.polygonOffsetFactor),
      (this.polygonOffsetUnits = e.polygonOffsetUnits),
      (this.dithering = e.dithering),
      (this.alphaTest = e.alphaTest),
      (this.alphaHash = e.alphaHash),
      (this.alphaToCoverage = e.alphaToCoverage),
      (this.premultipliedAlpha = e.premultipliedAlpha),
      (this.forceSinglePass = e.forceSinglePass),
      (this.visible = e.visible),
      (this.toneMapped = e.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    if (e === !0) this.version++;
  }
  onBuild() {}
}
function YL(e) {
  let t = {};
  for (let r in e) {
    t[r] = {};
    for (let n in e[r]) {
      let i = e[r][n];
      if (
        i &&
        (i.isColor ||
          i.isMatrix3 ||
          i.isMatrix4 ||
          i.isVector2 ||
          i.isVector3 ||
          i.isVector4 ||
          i.isTexture ||
          i.isQuaternion)
      )
        if (i.isRenderTargetTexture) t[r][n] = null;
        else t[r][n] = i.clone();
      else if (Array.isArray(i)) t[r][n] = i.slice();
      else t[r][n] = i;
    }
  }
  return t;
}
function XL(e) {
  let t = [];
  for (let r = 0; r < e.length; r++) t.push(e[r].clone());
  return t;
}
var jL = `
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
var KL = `
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;
class ShaderMaterial_2 extends Material_2 {
  constructor(e) {
    super();
    if (
      ((this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = jL),
      (this.fragmentShader = KL),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      e !== void 0)
    )
      this.setValues(e);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.fragmentShader = e.fragmentShader),
      (this.vertexShader = e.vertexShader),
      (this.uniforms = YL(e.uniforms)),
      (this.uniformsGroups = XL(e.uniformsGroups)),
      (this.defines = Object.assign({}, e.defines)),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.fog = e.fog),
      (this.lights = e.lights),
      (this.clipping = e.clipping),
      (this.extensions = Object.assign({}, e.extensions)),
      (this.glslVersion = e.glslVersion),
      this
    );
  }
  toJSON(e) {
    let t = super.toJSON(e);
    ((t.glslVersion = this.glslVersion), (t.uniforms = {}));
    for (let n in this.uniforms) {
      let o = this.uniforms[n].value;
      if (o && o.isTexture) t.uniforms[n] = { type: "t", value: o.toJSON(e).uuid };
      else if (o && o.isColor) t.uniforms[n] = { type: "c", value: o.getHex() };
      else if (o && o.isVector2) t.uniforms[n] = { type: "v2", value: o.toArray() };
      else if (o && o.isVector3) t.uniforms[n] = { type: "v3", value: o.toArray() };
      else if (o && o.isVector4) t.uniforms[n] = { type: "v4", value: o.toArray() };
      else if (o && o.isMatrix3) t.uniforms[n] = { type: "m3", value: o.toArray() };
      else if (o && o.isMatrix4) t.uniforms[n] = { type: "m4", value: o.toArray() };
      else t.uniforms[n] = { value: o };
    }
    if (Object.keys(this.defines).length > 0) t.defines = this.defines;
    ((t.vertexShader = this.vertexShader),
      (t.fragmentShader = this.fragmentShader),
      (t.lights = this.lights),
      (t.clipping = this.clipping));
    let r = {};
    for (let n in this.extensions) if (this.extensions[n] === !0) r[n] = !0;
    if (Object.keys(r).length > 0) t.extensions = r;
    return t;
  }
}
class Quaternion_2 {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    ((this.isQuaternion = !0), (this._x = e), (this._y = t), (this._z = r), (this._w = n));
  }
  static slerpFlat(e, t, r, n, i, o, s) {
    let a = r[n + 0],
      l = r[n + 1],
      c = r[n + 2],
      u = r[n + 3],
      d = i[o + 0],
      h = i[o + 1],
      f = i[o + 2],
      p = i[o + 3];
    if (s === 0) {
      ((e[t + 0] = a), (e[t + 1] = l), (e[t + 2] = c), (e[t + 3] = u));
      return;
    }
    if (s === 1) {
      ((e[t + 0] = d), (e[t + 1] = h), (e[t + 2] = f), (e[t + 3] = p));
      return;
    }
    if (u !== p || a !== d || l !== h || c !== f) {
      let g = 1 - s,
        m = a * d + l * h + c * f + u * p,
        A = m >= 0 ? 1 : -1,
        y = 1 - m * m;
      if (y > Number.EPSILON) {
        let b = Math.sqrt(y),
          v = Math.atan2(b, m * A);
        ((g = Math.sin(g * v) / b), (s = Math.sin(s * v) / b));
      }
      let x = s * A;
      if (
        ((a = a * g + d * x),
        (l = l * g + h * x),
        (c = c * g + f * x),
        (u = u * g + p * x),
        g === 1 - s)
      ) {
        let b = 1 / Math.sqrt(a * a + l * l + c * c + u * u);
        ((a *= b), (l *= b), (c *= b), (u *= b));
      }
    }
    ((e[t] = a), (e[t + 1] = l), (e[t + 2] = c), (e[t + 3] = u));
  }
  static multiplyQuaternionsFlat(e, t, r, n, i, o) {
    let s = r[n],
      a = r[n + 1],
      l = r[n + 2],
      c = r[n + 3],
      u = i[o],
      d = i[o + 1],
      h = i[o + 2],
      f = i[o + 3];
    return (
      (e[t] = s * f + c * u + a * h - l * d),
      (e[t + 1] = a * f + c * d + l * u - s * h),
      (e[t + 2] = l * f + c * h + s * d - a * u),
      (e[t + 3] = c * f - s * u - a * d - l * h),
      e
    );
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get w() {
    return this._w;
  }
  set w(e) {
    ((this._w = e), this._onChangeCallback());
  }
  set(e, t, r, n) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = r),
      (this._w = n),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return (
      (this._x = e.x),
      (this._y = e.y),
      (this._z = e.z),
      (this._w = e.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(e, t = !0) {
    let { _x: r, _y: n, _z: i, _order: o } = e,
      { cos: s, sin: a } = Math,
      l = s(r / 2),
      c = s(n / 2),
      u = s(i / 2),
      d = a(r / 2),
      h = a(n / 2),
      f = a(i / 2);
    switch (o) {
      case "XYZ":
        ((this._x = d * c * u + l * h * f),
          (this._y = l * h * u - d * c * f),
          (this._z = l * c * f + d * h * u),
          (this._w = l * c * u - d * h * f));
        break;
      case "YXZ":
        ((this._x = d * c * u + l * h * f),
          (this._y = l * h * u - d * c * f),
          (this._z = l * c * f - d * h * u),
          (this._w = l * c * u + d * h * f));
        break;
      case "ZXY":
        ((this._x = d * c * u - l * h * f),
          (this._y = l * h * u + d * c * f),
          (this._z = l * c * f + d * h * u),
          (this._w = l * c * u - d * h * f));
        break;
      case "ZYX":
        ((this._x = d * c * u - l * h * f),
          (this._y = l * h * u + d * c * f),
          (this._z = l * c * f - d * h * u),
          (this._w = l * c * u + d * h * f));
        break;
      case "YZX":
        ((this._x = d * c * u + l * h * f),
          (this._y = l * h * u + d * c * f),
          (this._z = l * c * f - d * h * u),
          (this._w = l * c * u - d * h * f));
        break;
      case "XZY":
        ((this._x = d * c * u - l * h * f),
          (this._y = l * h * u - d * c * f),
          (this._z = l * c * f + d * h * u),
          (this._w = l * c * u + d * h * f));
        break;
      default:
    }
    if (t === !0) this._onChangeCallback();
    return this;
  }
  setFromAxisAngle(e, t) {
    let r = t / 2,
      n = Math.sin(r);
    return (
      (this._x = e.x * n),
      (this._y = e.y * n),
      (this._z = e.z * n),
      (this._w = Math.cos(r)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e) {
    let t = e.elements,
      r = t[0],
      n = t[4],
      i = t[8],
      o = t[1],
      s = t[5],
      a = t[9],
      l = t[2],
      c = t[6],
      u = t[10],
      d = r + s + u;
    if (d > 0) {
      let h = 0.5 / Math.sqrt(d + 1);
      ((this._w = 0.25 / h),
        (this._x = (c - a) * h),
        (this._y = (i - l) * h),
        (this._z = (o - n) * h));
    } else if (r > s && r > u) {
      let h = 2 * Math.sqrt(1 + r - s - u);
      ((this._w = (c - a) / h),
        (this._x = 0.25 * h),
        (this._y = (n + o) / h),
        (this._z = (i + l) / h));
    } else if (s > u) {
      let h = 2 * Math.sqrt(1 + s - r - u);
      ((this._w = (i - l) / h),
        (this._x = (n + o) / h),
        (this._y = 0.25 * h),
        (this._z = (a + c) / h));
    } else {
      let h = 2 * Math.sqrt(1 + u - r - s);
      ((this._w = (o - n) / h),
        (this._x = (i + l) / h),
        (this._y = (a + c) / h),
        (this._z = 0.25 * h));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors(e, t) {
    let r = e.dot(t) + 1;
    if (r < Number.EPSILON)
      if (((r = 0), Math.abs(e.x) > Math.abs(e.z)))
        ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = r));
      else ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = r));
    else
      ((this._x = e.y * t.z - e.z * t.y),
        (this._y = e.z * t.x - e.x * t.z),
        (this._z = e.x * t.y - e.y * t.x),
        (this._w = r));
    return this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Fr(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    let r = this.angleTo(e);
    if (r === 0) return this;
    let n = Math.min(1, t / r);
    return (this.slerp(e, n), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return ((this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this);
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    if (e === 0) ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1));
    else
      ((e = 1 / e),
        (this._x = this._x * e),
        (this._y = this._y * e),
        (this._z = this._z * e),
        (this._w = this._w * e));
    return (this._onChangeCallback(), this);
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    let { _x: r, _y: n, _z: i, _w: o } = e,
      { _x: s, _y: a, _z: l, _w: c } = t;
    return (
      (this._x = r * c + o * s + n * l - i * a),
      (this._y = n * c + o * a + i * s - r * l),
      (this._z = i * c + o * l + r * a - n * s),
      (this._w = o * c - r * s - n * a - i * l),
      this._onChangeCallback(),
      this
    );
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    let r = this._x,
      n = this._y,
      i = this._z,
      o = this._w,
      s = o * e._w + r * e._x + n * e._y + i * e._z;
    if (s < 0)
      ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (s = -s));
    else this.copy(e);
    if (s >= 1) return ((this._w = o), (this._x = r), (this._y = n), (this._z = i), this);
    let a = 1 - s * s;
    if (a <= Number.EPSILON) {
      let h = 1 - t;
      return (
        (this._w = h * o + t * this._w),
        (this._x = h * r + t * this._x),
        (this._y = h * n + t * this._y),
        (this._z = h * i + t * this._z),
        this.normalize(),
        this
      );
    }
    let l = Math.sqrt(a),
      c = Math.atan2(l, s),
      u = Math.sin((1 - t) * c) / l,
      d = Math.sin(t * c) / l;
    return (
      (this._w = o * u + this._w * d),
      (this._x = r * u + this._x * d),
      (this._y = n * u + this._y * d),
      (this._z = i * u + this._z * d),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(e, t, r) {
    return this.copy(e).slerp(t, r);
  }
  random() {
    let e = 2 * Math.PI * Math.random(),
      t = 2 * Math.PI * Math.random(),
      r = Math.random(),
      n = Math.sqrt(1 - r),
      i = Math.sqrt(r);
    return this.set(n * Math.sin(e), n * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return (
      (this._x = e[t]),
      (this._y = e[t + 1]),
      (this._z = e[t + 2]),
      (this._w = e[t + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._w), e);
  }
  fromBufferAttribute(e, t) {
    return (
      (this._x = e.getX(t)),
      (this._y = e.getY(t)),
      (this._z = e.getZ(t)),
      (this._w = e.getW(t)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}
class Vector3_2 {
  constructor(e = 0, t = 0, r = 0) {
    ((Vector3_2.prototype.isVector3 = !0), (this.x = e), (this.y = t), (this.z = r));
  }
  set(e, t, r) {
    if (r === void 0) r = this.z;
    return ((this.x = e), (this.y = t), (this.z = r), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), (this.z = e.z), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), this);
  }
  addVectors(e, t) {
    return ((this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this);
  }
  addScaledVector(e, t) {
    return ((this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this);
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), this);
  }
  subVectors(e, t) {
    return ((this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this);
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), this);
  }
  multiplyVectors(e, t) {
    return ((this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this);
  }
  applyEuler(e) {
    return this.applyQuaternion(qL.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(qL.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    let t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements;
    return (
      (this.x = i[0] * t + i[3] * r + i[6] * n),
      (this.y = i[1] * t + i[4] * r + i[7] * n),
      (this.z = i[2] * t + i[5] * r + i[8] * n),
      this
    );
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    let t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements,
      o = 1 / (i[3] * t + i[7] * r + i[11] * n + i[15]);
    return (
      (this.x = (i[0] * t + i[4] * r + i[8] * n + i[12]) * o),
      (this.y = (i[1] * t + i[5] * r + i[9] * n + i[13]) * o),
      (this.z = (i[2] * t + i[6] * r + i[10] * n + i[14]) * o),
      this
    );
  }
  applyQuaternion(e) {
    let t = this.x,
      r = this.y,
      n = this.z,
      { x: i, y: o, z: s, w: a } = e,
      l = 2 * (o * n - s * r),
      c = 2 * (s * t - i * n),
      u = 2 * (i * r - o * t);
    return (
      (this.x = t + a * l + o * u - s * c),
      (this.y = r + a * c + s * l - i * u),
      (this.z = n + a * u + i * c - o * l),
      this
    );
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    let t = this.x,
      r = this.y,
      n = this.z,
      i = e.elements;
    return (
      (this.x = i[0] * t + i[4] * r + i[8] * n),
      (this.y = i[1] * t + i[5] * r + i[9] * n),
      (this.z = i[2] * t + i[6] * r + i[10] * n),
      this.normalize()
    );
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Fr(this.x, e.x, t.x)),
      (this.y = Fr(this.y, e.y, t.y)),
      (this.z = Fr(this.z, e.z, t.z)),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Fr(this.x, e, t)),
      (this.y = Fr(this.y, e, t)),
      (this.z = Fr(this.z, e, t)),
      this
    );
  }
  clampLength(e, t) {
    let r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Fr(r, e, t));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      this
    );
  }
  lerpVectors(e, t, r) {
    return (
      (this.x = e.x + (t.x - e.x) * r),
      (this.y = e.y + (t.y - e.y) * r),
      (this.z = e.z + (t.z - e.z) * r),
      this
    );
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    let { x: r, y: n, z: i } = e,
      { x: o, y: s, z: a } = t;
    return ((this.x = n * a - i * s), (this.y = i * o - r * a), (this.z = r * s - n * o), this);
  }
  projectOnVector(e) {
    let t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    let r = e.dot(this) / t;
    return this.copy(e).multiplyScalar(r);
  }
  projectOnPlane(e) {
    return (XT.copy(this).projectOnVector(e), this.sub(XT));
  }
  reflect(e) {
    return this.sub(XT.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    let t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    let r = this.dot(e) / t;
    return Math.acos(Fr(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    let t = this.x - e.x,
      r = this.y - e.y,
      n = this.z - e.z;
    return t * t + r * r + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, r) {
    let n = Math.sin(t) * e;
    return (
      (this.x = n * Math.sin(r)),
      (this.y = Math.cos(t) * e),
      (this.z = n * Math.cos(r)),
      this
    );
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, r) {
    return ((this.x = e * Math.sin(t)), (this.y = r), (this.z = e * Math.cos(t)), this);
  }
  setFromMatrixPosition(e) {
    let t = e.elements;
    return ((this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this);
  }
  setFromMatrixScale(e) {
    let t = this.setFromMatrixColumn(e, 0).length(),
      r = this.setFromMatrixColumn(e, 1).length(),
      n = this.setFromMatrixColumn(e, 2).length();
    return ((this.x = t), (this.y = r), (this.z = n), this);
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return ((this.x = e._x), (this.y = e._y), (this.z = e._z), this);
  }
  setFromColor(e) {
    return ((this.x = e.r), (this.y = e.g), (this.z = e.b), this);
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return ((this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e);
  }
  fromBufferAttribute(e, t) {
    return ((this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this);
  }
  randomDirection() {
    let e = Math.random() * Math.PI * 2,
      t = Math.random() * 2 - 1,
      r = Math.sqrt(1 - t * t);
    return ((this.x = r * Math.cos(e)), (this.y = t), (this.z = r * Math.sin(e)), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}
var XT = /*@__PURE__*/ new Vector3_2(),
  qL = /*@__PURE__*/ new Quaternion_2();
class Vector4_2 {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    ((Vector4_2.prototype.isVector4 = !0), (this.x = e), (this.y = t), (this.z = r), (this.w = n));
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, r, n) {
    return ((this.x = e), (this.y = t), (this.z = r), (this.w = n), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), (this.w = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setW(e) {
    return ((this.w = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return (
      (this.x = e.x),
      (this.y = e.y),
      (this.z = e.z),
      (this.w = e.w !== void 0 ? e.w : 1),
      this
    );
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), (this.w += e), this);
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x),
      (this.y = e.y + t.y),
      (this.z = e.z + t.z),
      (this.w = e.w + t.w),
      this
    );
  }
  addScaledVector(e, t) {
    return (
      (this.x += e.x * t),
      (this.y += e.y * t),
      (this.z += e.z * t),
      (this.w += e.w * t),
      this
    );
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this);
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x),
      (this.y = e.y - t.y),
      (this.z = e.z - t.z),
      (this.w = e.w - t.w),
      this
    );
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this);
  }
  applyMatrix4(e) {
    let t = this.x,
      r = this.y,
      n = this.z,
      i = this.w,
      o = e.elements;
    return (
      (this.x = o[0] * t + o[4] * r + o[8] * n + o[12] * i),
      (this.y = o[1] * t + o[5] * r + o[9] * n + o[13] * i),
      (this.z = o[2] * t + o[6] * r + o[10] * n + o[14] * i),
      (this.w = o[3] * t + o[7] * r + o[11] * n + o[15] * i),
      this
    );
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), (this.z /= e.z), (this.w /= e.w), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    let t = Math.sqrt(1 - e.w * e.w);
    if (t < 0.0001) ((this.x = 1), (this.y = 0), (this.z = 0));
    else ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t));
    return this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t,
      r,
      n,
      i,
      o = 0.01,
      s = 0.1,
      a = e.elements,
      l = a[0],
      c = a[4],
      u = a[8],
      d = a[1],
      h = a[5],
      f = a[9],
      p = a[2],
      g = a[6],
      m = a[10];
    if (Math.abs(c - d) < 0.01 && Math.abs(u - p) < 0.01 && Math.abs(f - g) < 0.01) {
      if (
        Math.abs(c + d) < 0.1 &&
        Math.abs(u + p) < 0.1 &&
        Math.abs(f + g) < 0.1 &&
        Math.abs(l + h + m - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      t = Math.PI;
      let y = (l + 1) / 2,
        x = (h + 1) / 2,
        b = (m + 1) / 2,
        v = (c + d) / 4,
        _ = (u + p) / 4,
        w = (f + g) / 4;
      if (y > x && y > b)
        if (y < 0.01) ((r = 0), (n = 0.707106781), (i = 0.707106781));
        else ((r = Math.sqrt(y)), (n = v / r), (i = _ / r));
      else if (x > b)
        if (x < 0.01) ((r = 0.707106781), (n = 0), (i = 0.707106781));
        else ((n = Math.sqrt(x)), (r = v / n), (i = w / n));
      else if (b < 0.01) ((r = 0.707106781), (n = 0.707106781), (i = 0));
      else ((i = Math.sqrt(b)), (r = _ / i), (n = w / i));
      return (this.set(r, n, i, t), this);
    }
    let A = Math.sqrt((g - f) * (g - f) + (u - p) * (u - p) + (d - c) * (d - c));
    if (Math.abs(A) < 0.001) A = 1;
    return (
      (this.x = (g - f) / A),
      (this.y = (u - p) / A),
      (this.z = (d - c) / A),
      (this.w = Math.acos((l + h + m - 1) / 2)),
      this
    );
  }
  setFromMatrixPosition(e) {
    let t = e.elements;
    return ((this.x = t[12]), (this.y = t[13]), (this.z = t[14]), (this.w = t[15]), this);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      (this.w = Math.min(this.w, e.w)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      (this.w = Math.max(this.w, e.w)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Fr(this.x, e.x, t.x)),
      (this.y = Fr(this.y, e.y, t.y)),
      (this.z = Fr(this.z, e.z, t.z)),
      (this.w = Fr(this.w, e.w, t.w)),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Fr(this.x, e, t)),
      (this.y = Fr(this.y, e, t)),
      (this.z = Fr(this.z, e, t)),
      (this.w = Fr(this.w, e, t)),
      this
    );
  }
  clampLength(e, t) {
    let r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Fr(r, e, t));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      (this.w += (e.w - this.w) * t),
      this
    );
  }
  lerpVectors(e, t, r) {
    return (
      (this.x = e.x + (t.x - e.x) * r),
      (this.y = e.y + (t.y - e.y) * r),
      (this.z = e.z + (t.z - e.z) * r),
      (this.w = e.w + (t.w - e.w) * r),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return ((this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), (this.w = e[t + 3]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), (e[t + 3] = this.w), e);
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)),
      (this.y = e.getY(t)),
      (this.z = e.getZ(t)),
      (this.w = e.getW(t)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}
class Vector2_2 {
  constructor(e = 0, t = 0) {
    ((Vector2_2.prototype.isVector2 = !0), (this.x = e), (this.y = t));
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return ((this.x = e), (this.y = t), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), this);
  }
  addVectors(e, t) {
    return ((this.x = e.x + t.x), (this.y = e.y + t.y), this);
  }
  addScaledVector(e, t) {
    return ((this.x += e.x * t), (this.y += e.y * t), this);
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), this);
  }
  subVectors(e, t) {
    return ((this.x = e.x - t.x), (this.y = e.y - t.y), this);
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), this);
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    let t = this.x,
      r = this.y,
      n = e.elements;
    return ((this.x = n[0] * t + n[3] * r + n[6]), (this.y = n[1] * t + n[4] * r + n[7]), this);
  }
  min(e) {
    return ((this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this);
  }
  max(e) {
    return ((this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this);
  }
  clamp(e, t) {
    return ((this.x = Fr(this.x, e.x, t.x)), (this.y = Fr(this.y, e.y, t.y)), this);
  }
  clampScalar(e, t) {
    return ((this.x = Fr(this.x, e, t)), (this.y = Fr(this.y, e, t)), this);
  }
  clampLength(e, t) {
    let r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Fr(r, e, t));
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    let t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    let r = this.dot(e) / t;
    return Math.acos(Fr(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    let t = this.x - e.x,
      r = this.y - e.y;
    return t * t + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return ((this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this);
  }
  lerpVectors(e, t, r) {
    return ((this.x = e.x + (t.x - e.x) * r), (this.y = e.y + (t.y - e.y) * r), this);
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return ((this.x = e[t]), (this.y = e[t + 1]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.x), (e[t + 1] = this.y), e);
  }
  fromBufferAttribute(e, t) {
    return ((this.x = e.getX(t)), (this.y = e.getY(t)), this);
  }
  rotateAround(e, t) {
    let r = Math.cos(t),
      n = Math.sin(t),
      i = this.x - e.x,
      o = this.y - e.y;
    return ((this.x = i * r - o * n + e.x), (this.y = i * n + o * r + e.y), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
function jT(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
var kp;
class KT {
  static getDataURL(e) {
    if (/^data:/i.test(e.src)) return e.src;
    if (typeof HTMLCanvasElement > "u") return e.src;
    let t;
    if (e instanceof HTMLCanvasElement) t = e;
    else {
      if (kp === void 0) kp = jT("canvas");
      ((kp.width = e.width), (kp.height = e.height));
      let r = kp.getContext("2d");
      if (e instanceof ImageData) r.putImageData(e, 0, 0);
      else r.drawImage(e, 0, 0, e.width, e.height);
      t = kp;
    }
    return t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (
      (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && e instanceof ImageBitmap)
    ) {
      let t = jT("canvas");
      ((t.width = e.width), (t.height = e.height));
      let r = t.getContext("2d");
      r.drawImage(e, 0, 0, e.width, e.height);
      let n = r.getImageData(0, 0, e.width, e.height),
        i = n.data;
      for (let o = 0; o < i.length; o++) i[o] = Fl(i[o] / 255) * 255;
      return (r.putImageData(n, 0, 0), t);
    } else if (e.data) {
      let t = e.data.slice(0);
      for (let r = 0; r < t.length; r++)
        if (t instanceof Uint8Array || t instanceof Uint8ClampedArray)
          t[r] = Math.floor(Fl(t[r] / 255) * 255);
        else t[r] = Fl(t[r]);
      return { data: t, width: e.width, height: e.height };
    } else return e;
  }
}
var bK = 0;
class Source_2 {
  constructor(e = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: bK++ }),
      (this.uuid = vd()),
      (this.data = e),
      (this.dataReady = !0),
      (this.version = 0));
  }
  set needsUpdate(e) {
    if (e === !0) this.version++;
  }
  toJSON(e) {
    let t = e === void 0 || typeof e === "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    let r = { uuid: this.uuid, url: "" },
      n = this.data;
    if (n !== null) {
      let i;
      if (Array.isArray(n)) {
        i = [];
        for (let o = 0, s = n.length; o < s; o++)
          if (n[o].isDataTexture) i.push(qT(n[o].image));
          else i.push(qT(n[o]));
      } else i = qT(n);
      r.url = i;
    }
    if (!t) e.images[this.uuid] = r;
    return r;
  }
}
function qT(e) {
  if (
    (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && e instanceof ImageBitmap)
  )
    return KT.getDataURL(e);
  else if (e.data)
    return {
      data: Array.from(e.data),
      width: e.width,
      height: e.height,
      type: e.data.constructor.name,
    };
  else return {};
}
var _K = 0;
class Texture_2 extends du {
  constructor(
    e = Texture_2.DEFAULT_IMAGE,
    t = Texture_2.DEFAULT_MAPPING,
    r = ig,
    n = ig,
    i = nx,
    o = GO,
    s = VO,
    a = zO,
    l = Texture_2.DEFAULT_ANISOTROPY,
    c = ix,
  ) {
    super();
    ((this.isTexture = !0),
      Object.defineProperty(this, "id", { value: _K++ }),
      (this.uuid = vd()),
      (this.name = ""),
      (this.source = new Source_2(e)),
      (this.mipmaps = []),
      (this.mapping = t),
      (this.channel = 0),
      (this.wrapS = r),
      (this.wrapT = n),
      (this.magFilter = i),
      (this.minFilter = o),
      (this.anisotropy = l),
      (this.format = s),
      (this.internalFormat = null),
      (this.type = a),
      (this.offset = new Vector2_2(0, 0)),
      (this.repeat = new Vector2_2(1, 1)),
      (this.center = new Vector2_2(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Matrix3_2()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = c),
      (this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.renderTarget = null),
      (this.isRenderTargetTexture = !1),
      (this.pmremVersion = 0));
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.source = e.source),
      (this.mipmaps = e.mipmaps.slice(0)),
      (this.mapping = e.mapping),
      (this.channel = e.channel),
      (this.wrapS = e.wrapS),
      (this.wrapT = e.wrapT),
      (this.magFilter = e.magFilter),
      (this.minFilter = e.minFilter),
      (this.anisotropy = e.anisotropy),
      (this.format = e.format),
      (this.internalFormat = e.internalFormat),
      (this.type = e.type),
      this.offset.copy(e.offset),
      this.repeat.copy(e.repeat),
      this.center.copy(e.center),
      (this.rotation = e.rotation),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this.matrix.copy(e.matrix),
      (this.generateMipmaps = e.generateMipmaps),
      (this.premultiplyAlpha = e.premultiplyAlpha),
      (this.flipY = e.flipY),
      (this.unpackAlignment = e.unpackAlignment),
      (this.colorSpace = e.colorSpace),
      (this.renderTarget = e.renderTarget),
      (this.isRenderTargetTexture = e.isRenderTargetTexture),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON(e) {
    let t = e === void 0 || typeof e === "string";
    if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
    let r = {
      metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    if (Object.keys(this.userData).length > 0) r.userData = this.userData;
    if (!t) e.textures[this.uuid] = r;
    return r;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== vT) return e;
    if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
      switch (this.wrapS) {
        case CT:
          e.x = e.x - Math.floor(e.x);
          break;
        case ig:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case wT:
          if (Math.abs(Math.floor(e.x) % 2) === 1) e.x = Math.ceil(e.x) - e.x;
          else e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case CT:
          e.y = e.y - Math.floor(e.y);
          break;
        case ig:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case wT:
          if (Math.abs(Math.floor(e.y) % 2) === 1) e.y = Math.ceil(e.y) - e.y;
          else e.y = e.y - Math.floor(e.y);
          break;
      }
    if (this.flipY) e.y = 1 - e.y;
    return e;
  }
  set needsUpdate(e) {
    if (e === !0) (this.version++, (this.source.needsUpdate = !0));
  }
  set needsPMREMUpdate(e) {
    if (e === !0) this.pmremVersion++;
  }
}
Texture_2.DEFAULT_IMAGE = null;
Texture_2.DEFAULT_MAPPING = vT;
Texture_2.DEFAULT_ANISOTROPY = 1;
class DataTexture_2 extends Texture_2 {
  constructor(e = null, t = 1, r = 1, n, i, o, s, a, l = TT, c = TT, u, d) {
    super(null, o, s, a, l, c, n, i, u, d);
    ((this.isDataTexture = !0),
      (this.image = { data: e, width: t, height: r }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
