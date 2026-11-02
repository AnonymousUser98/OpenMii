// src/app/renderer/ffl/face-builder.js
// FFLFaceBuilder: creates part meshes and draws the face mask textures.
//
// Defines: COMMON_COLOR_TABLE, KO, ZO, AL, JO, toFFLCharInfo, FFLFaceBuilder
// Uses from other files:
//   app/assets/models.js: ag, yL, xL, bL, _L, vL, lx
//   app/renderer/three-module.js: getTHREE
//   app/renderer/ffl/expression-table.js: FFL_EXPRESSION_TABLE
//   app/shaders/wiiu-shader.js: WiiUShader
//   app/renderer/ffl/char-model.js: CharModel
//   app/renderer/ffl/resource-reader.js: pL

var THREE = getTHREE();
var COMMON_COLOR_TABLE = includeJSON("common-color-table.json"),
  jO = [
    [0.0901961, 0.0784314, 0.0784314],
    [0.1254902, 0.0627451, 0.0313726],
    [0.1803922, 0.0470589, 0.0196079],
    [0.2901961, 0.137255, 0.0470589],
    [0.3294118, 0.3294118, 0.3529412],
    [0.1529412, 0.1215687, 0.0313726],
    [0.3215687, 0.2078432, 0.054902],
    [0.6941177, 0.5019608, 0.1568628],
    [0, 0, 0],
    [0.2980393, 0.3058824, 0.3058824],
    [0.2, 0.1176471, 0.0862746],
    [0.227451, 0.2196079, 0.1137255],
    [0.1647059, 0.1960785, 0.3960785],
    [0.1529412, 0.3058824, 0.2431373],
    [0.1882353, 0.109804, 0.0313726],
    [0.3960785, 0.0392157, 0.0196079],
    [0.0627451, 0.0941177, 0.2039216],
    [0.4627451, 0.2627451, 0],
    [0.3294118, 0.3058824, 0.2862746],
    [0.509804, 0.1882353, 0.0941177],
    [0.4705883, 0.0470589, 0.0470589],
    [0.5333334, 0.1254902, 0.1568628],
    [0.8627451, 0.4705883, 0.3137255],
    [0.2745099, 0.1176471, 0.0392157],
    [0.309804, 0.0901961, 0.0901961],
    [0.6, 0.2705883, 0.2392157],
    [0.9019608, 0.5215687, 0.5215687],
    [0.9019608, 0.6313726, 0.6078432],
    [0.2705883, 0.109804, 0.137255],
    [0.3607844, 0.0745099, 0.1450981],
    [0.3254902, 0.054902, 0.1450981],
    [0.427451, 0.1450981, 0.1568628],
    [0.4666667, 0.0705883, 0.2039216],
    [0.4156863, 0.1960785, 0.3019608],
    [0.4666667, 0.1960785, 0.2588236],
    [0.6862746, 0.3215687, 0.4156863],
    [0.8901961, 0.5490197, 0.6745099],
    [0.9019608, 0.6705883, 0.7333334],
    [0.0980393, 0.054902, 0.1254902],
    [0.109804, 0.0784314, 0.1215687],
    [0.1490197, 0.0470589, 0.1529412],
    [0.2627451, 0.1568628, 0.4196079],
    [0.3137255, 0.2156863, 0.4313726],
    [0.5254902, 0.3607844, 0.5607844],
    [0.4627451, 0.4039216, 0.5529412],
    [0.6705883, 0.5647059, 0.8117648],
    [0.8313726, 0.627451, 0.882353],
    [0.7215687, 0.6666667, 0.8352942],
    [0.0509804, 0.0627451, 0.1254902],
    [0.0352942, 0.1254902, 0.2],
    [0.1137255, 0.3568628, 0.5803922],
    [0.1960785, 0.5921569, 0.854902],
    [0.3607844, 0.6784314, 0.7843138],
    [0.4039216, 0.5254902, 0.882353],
    [0.3843138, 0.6235295, 0.882353],
    [0.5019608, 0.7803922, 0.9019608],
    [0.0235295, 0.0901961, 0.1058824],
    [0.0039216, 0.1215687, 0.1176471],
    [0.027451, 0.1568628, 0.1764706],
    [0.0941177, 0.2784314, 0.2705883],
    [0.1333334, 0.3450981, 0.3843138],
    [0.1882353, 0.5450981, 0.5529412],
    [0.3764706, 0.6901961, 0.5294118],
    [0.3882353, 0.7490197, 0.6627451],
    [0.4117648, 0.8078432, 0.6078432],
    [0.0196079, 0.1450981, 0.1058824],
    [0.1568628, 0.2862746, 0],
    [0.0039216, 0.2745099, 0.2313726],
    [0.1490197, 0.4196079, 0.3058824],
    [0.1725491, 0.5411765, 0],
    [0.4313726, 0.6, 0],
    [0.2784314, 0.7019608, 0.4352942],
    [0.509804, 0.7921569, 0.1215687],
    [0.4784314, 0.7843138, 0.3764706],
    [0.6196079, 0.854902, 0.5490197],
    [0.4196079, 0.4039216, 0.1176471],
    [0.454902, 0.4078432, 0.2705883],
    [0.6392157, 0.5960785, 0.0862746],
    [0.7215687, 0.6392157, 0.427451],
    [0.7647059, 0.709804, 0.3960785],
    [0.7490197, 0.7647059, 0.3176471],
    [0.7411765, 0.8117648, 0.3921569],
    [0.737255, 0.882353, 0.4901961],
    [0.2941177, 0.1607844, 0],
    [0.8117648, 0.6313726, 0.3529412],
    [0.8980393, 0.7764706, 0.1333334],
    [0.882353, 0.7647059, 0.3725491],
    [0.8705883, 0.8156863, 0.4862746],
    [0.882353, 0.8745099, 0.4784314],
    [0.3921569, 0.1803922, 0.0705883],
    [0.8, 0.4705883, 0.0392157],
    [0.737255, 0.509804, 0.2980393],
    [0.9019608, 0.5725491, 0.2509804],
    [0.9019608, 0.6431373, 0.4117648],
    [0.8078432, 0.7137255, 0.5882353],
    [0.1294118, 0.1294118, 0.1294118],
    [0.4862746, 0.4862746, 0.4862746],
    [0.6705883, 0.6705883, 0.6705883],
    [0.7764706, 0.7568628, 0.7137255],
    [0.8509804, 0.8509804, 0.8509804],
  ],
  KO = [
    [1, 0.8274509906768799, 0.6784313917160034],
    [1, 0.7137255072593689, 0.41960790753364563],
    [0.8705883026123047, 0.4745098948478699, 0.25882360339164734],
    [1, 0.6666666865348816, 0.5490196943283081],
    [0.6784313917160034, 0.3176470994949341, 0.16078439354896545],
    [0.38823530077934265, 0.17254909873008728, 0.09411770105361938],
    [1, 0.7450981140136719, 0.64705890417099],
    [1, 0.7725490927696228, 0.5607843995094299],
    [0.5490196943283081, 0.2352941930294037, 0.137254998087883],
    [0.2352941930294037, 0.1764705926179886, 0.137254998087883],
  ],
  qO = [
    [0.824, 0.118, 0.078],
    [1, 0.431, 0.098],
    [1, 0.847, 0.125],
    [0.471, 0.824, 0.125],
    [0, 0.471, 0.188],
    [0.039, 0.282, 0.706],
    [0.235, 0.667, 0.871],
    [0.961, 0.353, 0.49],
    [0.451, 0.157, 0.678],
    [0.282, 0.22, 0.094],
    [0.878, 0.878, 0.878],
    [0.094, 0.094, 0.078],
  ],
  ZO = [0.07, 0.059, 0.059];
function sg(e) {
  return (
    32 -
    [
      3, 4, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 3, 4, 4, 4, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 4, 3, 4,
      4, 4, 3, 3, 3, 4, 4, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ][e]
  );
}
function $O(e, t) {
  let r = FFL_EXPRESSION_TABLE[e];
  if (!r) r = FFL_EXPRESSION_TABLE[0];
  let n = t.eyeRotate;
  if (r.eyeRotate) {
    if (r.eyeRotate != 0) {
      if (((n = t.eyeRotate + r.eyeRotate), n < 0)) n = 0;
      else if (n > 7) n = 7;
    }
  }
  if (e == 67 || e == 77 || e == 78) {
    let i = t.mouthAspect;
    if (t.mouthAspect < 3) i = 0;
    else if (((i = t.mouthAspect + -3), i > 6)) i = 6;
    t.mouthAspect = i;
  }
  switch (e) {
    case 19:
    case 20:
      ((t.eyeScale = 4), (t.eyeAspect = 3));
    case 45:
    case 46:
    case 53:
    case 54:
      ((t.mouthAspect = 3), (t.mouthScale = 4));
      break;
    case 25:
    case 26:
    case 37:
    case 38:
    case 55:
    case 56:
    case 57:
    case 58:
      ((t.eyeScale = 4), (t.eyeAspect = 3), (t.eyeRotate = 4));
      break;
    case 33:
    case 34:
      ((t.eyeRotate = 4), (t.mouthAspect = 3), (t.mouthScale = 4));
      break;
    case 35:
    case 36:
      ((t.eyeRotate = 4),
        (t.eyeAspect = 3),
        (t.eyeScale = 4),
        (t.mouthScale = 4),
        (t.mouthAspect = 3));
      break;
    case 39:
    case 40:
      ((t.eyeRotate = 4), (t.eyeAspect = 3), (t.eyeScale = 4), (t.eyebrowRotate = 6));
      break;
    case 43:
    case 44:
    case 47:
    case 48:
      t.eyeRotate = 4;
      break;
    case 49:
    case 50:
    case 51:
    case 52:
      if (
        ((t.eyeRotate = 4),
        (t.eyeAspect = 3),
        (t.eyeScale = 4),
        (t.eyebrowScale = 4),
        (t.eyebrowAspect = 3),
        (t.eyebrowRotate = 6),
        (t.mouthAspect = 3),
        e === 51 || e == 52)
      )
        t.mouthScale = 4;
      else t.mouthScale = 7;
      ((t.eyeX = 2),
        (t.eyeY = 12),
        (t.eyebrowX = 2),
        (t.eyebrowY = 10),
        (t.mouthY = 13),
        (t.mustacheType = 0));
      break;
    case 67:
      t.mouthAspect = 0;
      break;
    case 68:
      t.mouthAspect = 3;
      break;
    case 69:
      t.eyeAspect = 3;
      break;
    case 72:
      break;
    default:
      break;
  }
  return t;
}
function gL(e) {
  return (
    32 - [6, 6, 5, 7, 6, 7, 6, 7, 4, 7, 6, 8, 5, 5, 6, 6, 7, 7, 6, 6, 5, 6, 7, 5, 6, 6, 6, 6][e]
  );
}
function sK(e, t) {
  switch (t) {
    case 3:
    case 15:
    case 19:
    case 20:
    case 21:
    case 23:
    case 25:
      if (e < 12) e = 12;
  }
  return e;
}
function AL(e, t) {
  switch (t) {
    case 14:
    case 26:
      if (e < 12) e = 12;
  }
  return e;
}
function aK(e) {
  let n = new THREE.Vector3(e.scaleX, e.scaleY, 1),
    i = new THREE.Vector3(0.88961464, 0.9276675, 1),
    o = new THREE.Euler(0, 0, THREE.MathUtils.degToRad(e.rot)),
    s = new THREE.Vector3(e.posX, e.posY, 0),
    a = new THREE.Matrix4().makeScale(n.x, n.y, n.z),
    l = new THREE.Matrix4().makeRotationFromEuler(o),
    c = new THREE.Matrix4().makeScale(i.x, i.y, i.z),
    u = new THREE.Matrix4().makeTranslation(s.x, s.y, s.z);
  return new THREE.Matrix4()
    .multiplyMatrices(a, new THREE.Matrix4())
    .premultiply(l)
    .premultiply(c)
    .premultiply(u);
}
function lK(e, t) {
  let r = 0,
    n = 0,
    i = 0;
  switch (e) {
    case 1:
      ((r = -0.5), (n = 1));
      break;
    case 2:
      i = 1;
      break;
    case 0:
      ((r = -1), (n = 1));
      break;
  }
  let o = [1, 1, 0, 0],
    s = [-0.5, 0.5, 0.5, -0.5],
    a = [0, 1, 1, 0],
    l = [],
    c = [];
  for (let u = 0; u < 4; u++) {
    let h = new THREE.Vector4(o[u] + r, s[u], 0, 1).clone().applyMatrix4(t);
    l.push(h.x, h.y, h.z);
    let f = u < 2 ? n : i,
      p = a[u];
    c.push(f, p);
  }
  return { positions: l, uvs: c };
}
class Bp extends THREE.ShaderMaterial {
  lightEnable = !1;
  modulateType;
  constructor(e = {}) {
    let t = { opacity: { value: 1 } },
      r = { value: new THREE.Matrix3() };
    if (Number(THREE.REVISION) < 151) t.uvTransform = r;
    else t.mapTransform = r;
    super({
      vertexShader: `
        #include <common>
        #include <uv_pars_vertex>

        void main() {
          #include <begin_vertex>
          #include <uv_vertex>
          #include <project_vertex>
        }`,
      fragmentShader: `
        #include <common>
        #include <uv_pars_fragment>
        #include <map_pars_fragment>
        uniform vec3 u_const1;
        uniform float opacity;
        uniform int modulateMode;
        uniform vec3 u_const2;
        uniform vec3 u_const3;

        void main() {
            mediump vec4 color;

  //#ifdef FFL_MODULATE_MODE_CONSTANT
    if(modulateMode == 0)
    {
      color = vec4(u_const1, opacity);
    }
#ifdef USE_MAP
    // modified to handle u_const1 alpha:
//#elif defined(FFL_MODULATE_MODE_TEXTURE_DIRECT)
    else if(modulateMode == 1)
    {
        mediump vec4 texel = texture2D(map, vMapUv);
        color = vec4(texel.rgb, opacity * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_RGB_LAYERED)
    else if(modulateMode == 2)
    {
        mediump vec4 texel = texture2D(map, vMapUv);
        color = vec4(texel.r * u_const1.rgb + texel.g * u_const2.rgb + texel.b * u_const3.rgb, opacity * texel.a);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA)
    else if(modulateMode == 3)
    {
        mediump vec4 texel = texture2D(map, vMapUv);
        color = vec4(u_const1.rgb, opacity * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_LUMINANCE_ALPHA)
    else if(modulateMode == 4)
    {
        mediump vec4 texel = texture2D(map, vMapUv);
        color = vec4(texel.g * u_const1.rgb, opacity * texel.r);
    }
//#elif defined(FFL_MODULATE_MODE_ALPHA_OPA)
    else if(modulateMode == 5)
    {
        mediump vec4 texel = texture2D(map, vMapUv);
        color = vec4(texel.r * u_const1.rgb, opacity);
    }
//#endif
#endif

    // avoids little outline around mask elements
    if(modulateMode != 0 && color.a == 0.0)
    {
        discard;
    }

    gl_FragColor = color;
        }`,
      uniforms: t,
    });
    ((this.lightEnable = !1),
      (this.modulateType = 0),
      (this.transparent = !0),
      (this.blending = THREE.NormalBlending),
      this.setValues(e));
  }
  get color() {
    return this.uniforms.u_const1 ? this.uniforms.u_const1.value : null;
  }
  _color3;
  set color(e) {
    if (Array.isArray(e)) {
      ((this.uniforms.u_const1 = { value: e[0] }),
        (this.uniforms.u_const2 = { value: e[1] }),
        (this.uniforms.u_const3 = { value: e[2] }));
      return;
    }
    let t = e ? e : new THREE.Color(1, 1, 1);
    ((this._color3 = t), (this.uniforms.u_const1 = { value: t }));
  }
  get modulateMode() {
    return this.uniforms.modulateMode ? this.uniforms.modulateMode.value : null;
  }
  set modulateMode(e) {
    this.uniforms.modulateMode = { value: e };
  }
  get map() {
    return this.uniforms.map ? this.uniforms.map.value : null;
  }
  set map(e) {
    this.uniforms.map = { value: e };
  }
}
function JO(e) {
  let t = (o, s) => {
      let a = 32 - s;
      return (o << a) >> a;
    },
    r = t(e & 1023, 10) / 511,
    n = t((e >> 10) & 1023, 10) / 511,
    i = t((e >> 20) & 1023, 10) / 511;
  return [r, n, i];
}
function toFFLCharInfo(e) {
  function t(r) {
    return r - 2147483648;
  }
  return {
    authorID: Array.from(e.authorId),
    authorType: 0,
    beard: {
      color: t(e.beardColor),
      mustache: e.mustacheType,
      scale: e.mustacheScale,
      type: e.beardType,
      y: e.mustacheY,
    },
    body: { build: e.build, height: e.height },
    createID: { data: Array.from(e.createId) },
    eye: {
      aspect: e.eyeAspect,
      color: t(e.eyeColor),
      rotate: e.eyeRotate,
      scale: e.eyeScale,
      type: e.eyeType,
      x: e.eyeX,
      y: e.eyeY,
    },
    eyebrow: {
      aspect: e.eyebrowAspect,
      color: t(e.eyebrowColor),
      rotate: e.eyebrowRotate,
      scale: e.eyebrowScale,
      type: e.eyebrowType,
      x: e.eyebrowX,
      y: e.eyebrowY,
    },
    faceline: {
      color: e.facelineColor,
      make: e.facelineMake,
      texture: e.facelineWrinkle,
      type: e.facelineType,
    },
    glass: { color: t(e.glassColor), scale: e.glassScale, type: e.glassType, y: e.glassY },
    hair: { color: t(e.hairColor), flip: e.hairFlip, type: e.hairType },
    miiVersion: 3,
    mole: { scale: e.moleScale, type: e.moleType, x: e.moleX, y: e.moleY },
    mouth: {
      aspect: e.mouthAspect,
      color: t(e.mouthColor),
      scale: e.mouthScale,
      type: e.mouthType,
      y: e.mouthY,
    },
    nose: { scale: e.noseScale, type: e.noseType, y: e.noseY },
    padding_0: 0,
    personal: {
      birthDay: e.birthDay,
      birthMonth: e.birthMonth,
      birthPlatform: e.originPlatform,
      copyable: 1,
      creator: e.creator,
      favorite: e.favorite,
      favoriteColor: e.favoriteColor,
      fontRegion: e.fontRegion,
      gender: e.gender,
      localonly: 0,
      name: e.nickname,
      ngWord: 0,
      positionInRoom: 0,
      regionMove: e.regionMove,
      roomIndex: 0,
    },
  };
}
class FFLFaceBuilder {
  FFLResource;
  initialized;
  constructor(e) {
    ((this.FFLResource = e), (this.initialized = !1));
  }
  camera(e = !1) {
    return FFLFaceBuilder.camera(e);
  }
  static camera(e = !1) {
    let t = 1,
      r = new THREE.OrthographicCamera(-t, t, e ? -t : t, e ? t : -t, t / 10, t * 10);
    return ((r.position.z = 1), r);
  }
  async initialize() {
    if (this.initialized === !0) return;
    this.initialized = !0;
  }
  async returnBufferGeometry(e, t, r = null) {
    let n = this.FFLResource.Header.shapeHeader[e][t],
      i = new THREE.BufferGeometry(),
      o = await this.FFLResource.readPartsInfo(n);
    if (!o) return null;
    let s = new Uint8Array(o);
    if (s.length === 0) return null;
    let a = this.FFLResource.getShapeHeader(s);
    if (r !== null) Object.assign(r, a);
    let l = await this.#t(s, a, 5, e);
    if (l) i.setIndex(l);
    let c = await this.#t(s, a, 0, e);
    if (c) i.setAttribute("position", c);
    let u = await this.#t(s, a, 1, e);
    if (u) i.setAttribute("normal", u);
    let d = await this.#t(s, a, 3, e);
    if (d) i.setAttribute("tangent", d);
    let h = await this.#t(s, a, 2, e);
    if (h) i.setAttribute("uv", h);
    if (e === "hairNormal" || e === "hairCap") {
      let f = await this.#t(s, a, 4, e);
      if (f) {
        if (f.count > 1) i.setAttribute("_color", f);
      }
    }
    return i;
  }
  async createMesh(e, t, r = null) {
    let n = await this.returnBufferGeometry(e, t, r);
    if (n === null) return null;
    else return new THREE.Mesh(n);
  }
  async #t(e, t, r, n) {
    let i = t.pos[r],
      o = t.size[r],
      s = this.FFLResource.Header.isExpand === pL;
    if (r == 5) o *= 2;
    let a = new DataView(e.buffer, e.byteOffset + i, o),
      l = 4;
    function c() {
      a = null;
    }
    let u;
    switch (r) {
      case 5:
        if (!s)
          u = new THREE.Uint16BufferAttribute(
            Uint16Array.from({ length: o / 2 }, (d, h) => a.getUint16(h * 2, !1)),
            1,
          );
        else
          u = new THREE.Uint16BufferAttribute(
            Uint16Array.from({ length: o / 2 }, (d, h) => a.getUint16(h * 2, !0)),
            1,
          );
        break;
      case 0: {
        if (!s)
          u = new THREE.InterleavedBufferAttribute(
            new THREE.InterleavedBuffer(
              Float32Array.from({ length: o / 4 }, (d, h) => a.getFloat32(h * 4, !1)),
              4,
            ),
            3,
            0,
          );
        else {
          let d = new Uint16Array(o / 2);
          for (let h = 0; h < d.length; h++) d[h] = a.getUint16(h * 2, !0);
          u = new THREE.Float16BufferAttribute(d, 3);
        }
        break;
      }
      case 1:
        if (!s) {
          let d = Uint32Array.from({ length: o / 4 }, (p, g) => a.getUint32(g * 4, !1)),
            h = o / 4,
            f = new Float32Array(h * 3);
          for (let p = 0; p < h; p++) {
            let g = d[p],
              m = (g << 22) >> 22,
              A = (g << 12) >> 22,
              y = (g << 2) >> 22;
            ((m /= 511), (A /= 511), (y /= 511));
            let x = Math.hypot(m, A, y);
            if (x > 0) ((m /= x), (A /= x), (y /= x));
            ((f[p * 3] = m), (f[p * 3 + 1] = A), (f[p * 3 + 2] = y));
          }
          u = new THREE.BufferAttribute(f, 3);
        } else u = new THREE.Int8BufferAttribute(new Int8Array(e.buffer, e.byteOffset + i, o), l, !0);
        break;
      case 3:
        u = new THREE.Int8BufferAttribute(new Int8Array(e.buffer, e.byteOffset + i, o), l, !0);
        break;
      case 2:
        if (!s)
          u = new THREE.Float32BufferAttribute(
            Float32Array.from({ length: o / 4 }, (d, h) => a.getFloat32(h * 4, !1)),
            2,
          );
        else {
          let d = new Uint16Array(o / 2);
          for (let h = 0; h < d.length; h++) d[h] = a.getUint16(h * 2, !0);
          u = new THREE.Float16BufferAttribute(d, 2);
        }
        break;
      case 4:
        u = new THREE.Uint8BufferAttribute(new Uint8Array(e.buffer, e.byteOffset + i, o), 4, !0);
        break;
      default:
        throw Error("❌" + ` Attribute type ${r} not supported`);
    }
    if ((c(), u.count > 0)) return u;
    else return null;
  }
  async readTexture(e, t, r = !0, n) {
    let i;
    if (window.useCustomNose === !0) {
      if (e === "noseline") return ((i = await yL()), i);
    }
    let o = await this.FFLResource.readPartsInfo(this.FFLResource.Header.textureHeader[e][t]);
    if (!o) return null;
    let s = new Uint8Array(o);
    if (s.length === 0) return null;
    let a = this.FFLResource.getTextureFooter(s),
      l,
      c;
    switch (a.TextureFormat) {
      case 0:
        ((l = THREE.RedFormat), (c = a.Width * a.Height));
        break;
      case 1:
        ((l = THREE.RGFormat), (c = a.Width * a.Height * 2));
        break;
      case 2:
        ((l = THREE.RGBAFormat), (c = a.Width * a.Height * 4));
        break;
      default:
        throw Error("Unsupported texture format");
    }
    return (
      (i = new THREE.DataTexture(s.subarray(0, c), a.Width, a.Height, l, THREE.UnsignedByteType)),
      (i.minFilter = THREE.LinearFilter),
      (i.magFilter = THREE.LinearFilter),
      (i.generateMipmaps = !1),
      (i.needsUpdate = !0),
      (i.flipY = r),
      n.initTexture(i),
      i
    );
  }
  calcRawMask(
    e,
    t,
    r = {
      eyebrowPosAddL: 0,
      eyebrowPosAddR: 0,
      eyeRotateAddL: 0,
      eyeRotateAddR: 0,
      eyebrowRotateAddL: 0,
      eyebrowRotateAddR: 0,
      mouthRotate: 0,
    },
    n = e.eyeType,
    i = e.eyeType,
  ) {
    let m = t * 0.015625,
      A = e.eyeX * 0.88961464,
      y = 0.4 * e.eyeScale + 1,
      x = 0.12 * e.eyeAspect + 0.64,
      b = 5.34375 * y,
      v = 4.5 * y * x,
      _ = e.eyeY * 1.0760943 + 18.451524,
      w = e.eyeRotate + r.eyeRotateAddL + sg(e.eyeType),
      S = e.eyeRotate + r.eyeRotateAddR + sg(e.eyeType),
      E = (w % 32) * 11.25,
      T = (S % 32) * 11.25,
      M = e.eyebrowX * 0.88961464,
      C = 0.4 * e.eyebrowScale + 1,
      R = 0.12 * e.eyebrowAspect + 0.64,
      B = 5.0625 * C,
      L = 4.5 * C * R,
      k = (e.eyebrowY + r.eyebrowPosAddL) * 1.0760943 + 16.549806,
      z = (e.eyebrowY + r.eyebrowPosAddR) * 1.0760943 + 16.549806,
      X = e.eyebrowRotate + r.eyebrowRotateAddL + gL(e.eyebrowType),
      G = e.eyebrowRotate + r.eyebrowRotateAddR + gL(e.eyebrowType),
      Q = (X % 32) * 11.25,
      de = (G % 32) * 11.25,
      oe = 0.4 * e.mouthScale + 1,
      K = 0.12 * e.mouthAspect + 0.64,
      ae = 6.1875 * oe,
      Z = 4.5 * oe * K,
      F = e.mouthY * 1.0760943 + 29.25885,
      te = e.mouthRotate !== 0 ? e.mouthRotate : 4,
      he = null,
      re = !1;
    if (r.mouthRotate > 0) ((te = r.mouthRotate), (he = (te % 45) * 8 - 32));
    else if (r.mouthRotate === 0) he = (te % 45) * 8 - 32;
    else ((he = r.mouthRotate), (re = !0));
    if (!he) he = (te % 45) * 8 - 32;
    let le = 0.4 * e.mustacheScale + 1,
      ue = 4.5 * le,
      I = 9 * le,
      N = e.mustacheY * 1.0760943 + 31.763552999999998,
      Y = 0.4 * e.moleScale + 1,
      P = e.moleX * 1.7792293 + 17.7661652,
      H = e.moleY * 1.0760943 + 17.9598606,
      W = [];
    if (
      ((W[0] = {
        posX: (32 - A) * m,
        posY: _ * m,
        scaleX: b * m,
        scaleY: AL(v * m, n),
        rot: E,
        origin: 0,
      }),
      (W[1] = {
        posX: (A + 32) * m,
        posY: _ * m,
        scaleX: b * m,
        scaleY: AL(v * m, i),
        rot: 360 - T,
        origin: 2,
      }),
      (W[2] = { posX: (32 - M) * m, posY: k * m, scaleX: B * m, scaleY: L * m, rot: Q, origin: 0 }),
      (W[3] = {
        posX: (M + 32) * m,
        posY: z * m,
        scaleX: B * m,
        scaleY: L * m,
        rot: 360 - de,
        origin: 2,
      }),
      (W[4] = {
        posX: (32 - (re ? 0 : he * 0.06)) * m,
        posY: F * m,
        scaleX: ae * m,
        scaleY: sK(Z * m, e.mouthType),
        rot: he,
        origin: 1,
        trueRot: -8,
      }),
      e.mustacheType !== 0)
    )
      W[5] = { posX: 32 * m, posY: N * m, scaleX: ue * m, scaleY: I * m, rot: 0, origin: 0 };
    if (e.mustacheType !== 0)
      W[6] = { posX: 32 * m, posY: N * m, scaleX: ue * m, scaleY: I * m, rot: 0, origin: 2 };
    if (e.moleType !== 0)
      W[7] = { posX: P * m, posY: H * m, scaleX: Y * m, scaleY: Y * m, rot: 0, origin: 1 };
    return W;
  }
  async drawMaskParam(e, t, r, n, i, o, s, a, l, c, u) {
    let d = !1,
      h = {
        cap: 5,
        beard: 16,
        mustache: 17,
        mouth: 18,
        eyebrow: 19,
        eye: 20,
        mole: 21,
        glass: 22,
        faceline: 23,
        faceMakeup: 24,
        noseline: 25,
      },
      f = {
        beard: 1,
        cap: 1,
        eye: 2,
        eyebrow: 3,
        faceline: 0,
        faceMakeup: 0,
        glass: 0,
        mole: 3,
        mouth: 2,
        mustache: 3,
        noseline: 4,
      },
      p = {
        mole: 5,
        eye: 4,
        eyebrow: 2,
        mouth: 1,
        mustache: 0,
        beard: -1,
        cap: -1,
        faceline: -1,
        faceMakeup: -1,
        glass: -1,
        noseline: -1,
      },
      g = aK(n),
      m = lK(n.origin, g),
      A = new THREE.BufferGeometry();
    (A.setAttribute("position", new THREE.Float32BufferAttribute(m.positions, 3)),
      A.setAttribute("uv", new THREE.Float32BufferAttribute(m.uvs, 2)),
      A.setIndex([0, 1, 2, 0, 2, 3]));
    let y = WiiUShader;
    if (l) {
      if ("supportsModulate" in l.prototype) y = l;
    }
    var x = 0,
      b = null,
      v = null,
      _ = null,
      w = null,
      S = null,
      E = null,
      T = u || 512;
    if ("isToonShader" in y.prototype) {
      switch (((x = h[e]), (b = t), t)) {
        case 0:
          b = [0.6, 0.44];
          break;
        case 1:
          b = [0.79, 0.45];
          break;
        case 2:
          b = [0.62, 0.47];
          break;
        case 3:
          b = [0.65, 0.43];
          break;
        case 4:
          b = [0.63, 0.47];
          break;
        case 5:
          b = [0.77, 0.55];
          break;
        case 6:
          b = [0.65, 0.41];
          break;
        case 7:
          b = [0.59, 0.43];
          break;
        case 8:
          b = [0.77, 0.42];
          break;
        case 9:
          b = [0.6, 0.51];
          break;
        case 11:
          b = [0.78, 0.52];
          break;
        case 12:
          b = [0.63, 0.51];
          break;
        case 15:
          b = [0.62, 0.43];
          break;
        case 16:
          b = [0.79, 0.48];
          break;
        case 17:
          b = [0.62, 0.41];
          break;
        case 18:
          b = [0.795, 0.43];
          break;
        case 19:
          b = [0.67, 0.38];
          break;
        case 20:
          b = [0.66, 0.47];
          break;
        case 22:
          b = [0.65, 0.51];
          break;
        case 24:
          b = [0.59, 0.46];
          break;
        case 25:
          b = [0.68, 0.44];
          break;
        case 27:
          b = [0.67, 0.45];
          break;
        case 28:
          b = [0.63, 0.43];
          break;
        case 29:
          b = [0.64, 0.34];
          break;
        case 30:
          b = [0.66, 0.43];
          break;
        case 31:
          b = [0.65, 0.44];
          break;
        case 32:
          b = [0.64, 0.43];
          break;
        case 33:
          b = [0.71, 0.36];
          break;
        case 35:
          b = [0.66, 0.43];
          break;
        case 36:
          b = [0.61, 0.44];
          break;
        case 37:
          b = [0.63, 0.41];
          break;
        case 38:
          b = [0.61, 0.43];
          break;
        case 39:
          b = [0.66, 0.41];
          break;
        case 40:
          b = [0.64, 0.49];
          break;
        case 41:
          b = [0.65, 0.46];
          break;
        case 42:
          b = [0.62, 0.44];
          break;
        case 43:
          b = [0.61, 0.41];
          break;
        case 44:
          b = [0.62, 0.39];
          break;
        case 45:
          b = [0.66, 0.37];
          break;
        case 46:
          b = [0.66, 0.43];
          break;
        case 48:
          b = [0.61, 0.47];
          break;
        case 49:
          b = [0.64, 0.5];
          break;
        case 50:
          b = [0.57, 0.43];
          break;
        case 51:
          b = [0.62, 0.51];
          break;
        case 52:
          b = [0.62, 0.4];
          break;
        case 53:
          b = [0.64, 0.43];
          break;
        case 54:
          b = [0.62, 0.48];
          break;
        case 55:
          b = [0.6, 0.45];
          break;
        case 56:
          b = [0.61, 0.39];
          break;
        case 57:
          b = [0.67, 0.51];
          break;
        case 58:
          b = [0.63, 0.44];
          break;
        case 59:
          b = [0.65, 0.46];
          break;
        case 10:
        case 13:
        case 14:
        case 21:
        case 23:
        case 26:
        case 34:
        case 47:
        case 60:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 78:
        case 79:
          b = [1, 1];
          break;
        default:
          b = [0.64, 0.43];
          break;
      }
      if (((b = new THREE.Vector2(...b)), c)) {
        v = new THREE.Vector2(0, 0);
        var M = c.eyeShine;
        if (c.eyeShine == -1) M = 0;
        if (ag()[M]) S = ag()[M];
        else b = null;
      } else b = null;
      if (((_ = new THREE.Vector2(1, 1)), (w = new THREE.Vector2(1, 1)), (E = 1), n.origin === 2)) E = -1;
    }
    let C = new THREE.Mesh(
      A,
      new y({
        modulateType: x,
        modulateMode: r === 1 ? 1 : f[e],
        ...(E && { partOrigin: E }),
        ...(b && { eyeShineOrigin: b }),
        ...(S && { eyeShineTex: S }),
        ...(v && { eyeShinePos: v }),
        ...(w && { eyeShineScale: w }),
        map: null,
        transparent: !0,
        color: o !== null ? [i, o, s] : i,
        side: THREE.DoubleSide,
        blending: THREE.CustomBlending,
        blendSrc: THREE.OneMinusDstAlphaFactor,
        blendSrcAlpha: THREE.SrcAlphaFactor,
        blendDst: THREE.DstAlphaFactor,
        blendDstAlpha: null,
        lightEnable: !1,
      }),
    );
    if (((C.renderOrder = p[e]), e === "eye" && t > 79));
    else if (e === "mouth" && t > 51);
    let R = null;
    if (window.useCustomEyebrows === !0) {
      if (e === "eyebrow") R = await xL();
    }
    if (window.useCustomEyes === !0) {
      if (e === "eye") R = await bL();
    }
    if (window.useCustomMouth === !0) {
      if (e === "mouth") R = await _L();
    }
    if (window.useCustomMustache === !0) {
      if (e === "mustache") R = await vL();
    }
    if (window.useCustomGlasses === !0) {
      if (e === "glass") R = await lx();
    }
    if (!R) R = await this.readTexture(e, t, d, a);
    if (R === null) throw "readTexture() is null.";
    return (
      (R.minFilter = THREE.LinearFilter),
      (R.magFilter = THREE.LinearFilter),
      (R.generateMipmaps = !1),
      (R.needsUpdate = !0),
      (C.material.map = R),
      (C.material.transparent = !0),
      (C.material.needsUpdate = !0),
      C
    );
  }
  async createFace(e, t, r, n = 512, i = WiiUShader, o, s = 0, a = !1, l = {}) {
    let c = new CharModel(this, e, i, {
      camera: r,
      renderer: t,
      textureSize: n,
      modelType: o,
      expression: s,
      useRenderTargets: a,
      extraMaterialParams: l,
    });
    switch (o) {
      case 1:
        return await c.initialize();
    }
    return (await c.initialize(), c);
  }
}
