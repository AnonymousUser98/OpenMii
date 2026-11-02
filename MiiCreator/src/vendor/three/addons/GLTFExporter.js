// src/vendor/three/addons/GLTFExporter.js
// three.js GLTFExporter (3D model export).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var SR = {
  POSITION: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "unsigned byte normalized",
    "short",
    "short normalized",
    "unsigned short",
    "unsigned short normalized",
  ],
  NORMAL: ["byte normalized", "short normalized"],
  TANGENT: ["byte normalized", "short normalized"],
  TEXCOORD: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "short",
    "short normalized",
    "unsigned short",
  ],
};
class Rp {
  constructor() {
    ((this.textureUtils = null),
      (this.pluginCallbacks = []),
      this.register(function (e) {
        return new DR(e);
      }),
      this.register(function (e) {
        return new NR(e);
      }),
      this.register(function (e) {
        return new HR(e);
      }),
      this.register(function (e) {
        return new GR(e);
      }),
      this.register(function (e) {
        return new zR(e);
      }),
      this.register(function (e) {
        return new VR(e);
      }),
      this.register(function (e) {
        return new PR(e);
      }),
      this.register(function (e) {
        return new kR(e);
      }),
      this.register(function (e) {
        return new UR(e);
      }),
      this.register(function (e) {
        return new WR(e);
      }),
      this.register(function (e) {
        return new QR(e);
      }),
      this.register(function (e) {
        return new YR(e);
      }),
      this.register(function (e) {
        return new XR(e);
      }),
      this.register(function (e) {
        return new jR(e);
      }));
  }
  register(e) {
    if (this.pluginCallbacks.indexOf(e) === -1) this.pluginCallbacks.push(e);
    return this;
  }
  unregister(e) {
    if (this.pluginCallbacks.indexOf(e) !== -1)
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1);
    return this;
  }
  setTextureUtils(e) {
    return ((this.textureUtils = e), this);
  }
  parse(e, t, r, n) {
    let i = new FR(),
      o = [];
    for (let s = 0, a = this.pluginCallbacks.length; s < a; s++) o.push(this.pluginCallbacks[s](i));
    (i.setPlugins(o), i.setTextureUtils(this.textureUtils), i.writeAsync(e, t, n).catch(r));
  }
  parseAsync(e, t) {
    let r = this;
    return new Promise(function (n, i) {
      r.parse(e, n, i, t);
    });
  }
}
var Wr = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    BYTE: 5120,
    UNSIGNED_BYTE: 5121,
    SHORT: 5122,
    UNSIGNED_SHORT: 5123,
    INT: 5124,
    UNSIGNED_INT: 5125,
    FLOAT: 5126,
    ARRAY_BUFFER: 34962,
    ELEMENT_ARRAY_BUFFER: 34963,
    NEAREST: 9728,
    LINEAR: 9729,
    NEAREST_MIPMAP_NEAREST: 9984,
    LINEAR_MIPMAP_NEAREST: 9985,
    NEAREST_MIPMAP_LINEAR: 9986,
    LINEAR_MIPMAP_LINEAR: 9987,
    CLAMP_TO_EDGE: 33071,
    MIRRORED_REPEAT: 33648,
    REPEAT: 10497,
  },
  Fw = "KHR_mesh_quantization",
  xa = {};
xa[NearestFilter] = Wr.NEAREST;
xa[NearestMipmapNearestFilter] = Wr.NEAREST_MIPMAP_NEAREST;
xa[NearestMipmapLinearFilter] = Wr.NEAREST_MIPMAP_LINEAR;
xa[LinearFilter] = Wr.LINEAR;
xa[LinearMipmapNearestFilter] = Wr.LINEAR_MIPMAP_NEAREST;
xa[LinearMipmapLinearFilter] = Wr.LINEAR_MIPMAP_LINEAR;
xa[ClampToEdgeWrapping] = Wr.CLAMP_TO_EDGE;
xa[RepeatWrapping] = Wr.REPEAT;
xa[MirroredRepeatWrapping] = Wr.MIRRORED_REPEAT;
var MR = {
    scale: "scale",
    position: "translation",
    quaternion: "rotation",
    morphTargetInfluences: "weights",
  },
  Ej = new Color(),
  IR = 12,
  Sj = 1179937895,
  Mj = 2,
  RR = 8,
  Ij = 1313821514,
  Rj = 5130562;
function eg(e, t) {
  return (
    e.length === t.length &&
    e.every(function (r, n) {
      return r === t[n];
    })
  );
}
function Oj(e) {
  return /*@__PURE__*/ new TextEncoder().encode(e).buffer;
}
function Lj(e) {
  return eg(e.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function Bj(e, t, r) {
  let n = {
    min: Array(e.itemSize).fill(Number.POSITIVE_INFINITY),
    max: Array(e.itemSize).fill(Number.NEGATIVE_INFINITY),
  };
  for (let i = t; i < t + r; i++)
    for (let o = 0; o < e.itemSize; o++) {
      let s;
      if (e.itemSize > 4) s = e.array[i * e.itemSize + o];
      else {
        if (o === 0) s = e.getX(i);
        else if (o === 1) s = e.getY(i);
        else if (o === 2) s = e.getZ(i);
        else if (o === 3) s = e.getW(i);
        if (e.normalized === !0) s = MathUtils.normalize(s, e.array);
      }
      ((n.min[o] = Math.min(n.min[o], s)), (n.max[o] = Math.max(n.max[o], s)));
    }
  return n;
}
function BR(e) {
  return Math.ceil(e / 4) * 4;
}
function Dw(e, t = 0) {
  let r = BR(e.byteLength);
  if (r !== e.byteLength) {
    let n = new Uint8Array(r);
    if ((n.set(new Uint8Array(e)), t !== 0)) for (let i = e.byteLength; i < r; i++) n[i] = t;
    return n.buffer;
  }
  return e;
}
function OR() {
  if (typeof document > "u" && typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
  return document.createElement("canvas");
}
function LR(e, t) {
  if (e.toBlob !== void 0) return new Promise((n) => e.toBlob(n, t));
  let r;
  if (t === "image/jpeg") r = 0.92;
  else if (t === "image/webp") r = 0.8;
  return e.convertToBlob({ type: t, quality: r });
}
class FR {
  constructor() {
    ((this.plugins = []),
      (this.options = {}),
      (this.pending = []),
      (this.buffers = []),
      (this.byteOffset = 0),
      (this.buffers = []),
      (this.nodeMap = /*@__PURE__*/ new Map()),
      (this.skins = []),
      (this.extensionsUsed = {}),
      (this.extensionsRequired = {}),
      (this.uids = /*@__PURE__*/ new Map()),
      (this.uid = 0),
      (this.json = { asset: { version: "2.0", generator: "THREE.GLTFExporter r" + REVISION } }),
      (this.cache = {
        meshes: /*@__PURE__*/ new Map(),
        attributes: /*@__PURE__*/ new Map(),
        attributesNormalized: /*@__PURE__*/ new Map(),
        materials: /*@__PURE__*/ new Map(),
        textures: /*@__PURE__*/ new Map(),
        images: /*@__PURE__*/ new Map(),
      }),
      (this.textureUtils = null));
  }
  setPlugins(e) {
    this.plugins = e;
  }
  setTextureUtils(e) {
    this.textureUtils = e;
  }
  async writeAsync(e, t, r = {}) {
    if (
      ((this.options = Object.assign(
        {
          binary: !1,
          trs: !1,
          onlyVisible: !0,
          maxTextureSize: 1 / 0,
          animations: [],
          includeCustomExtensions: !1,
        },
        r,
      )),
      this.options.animations.length > 0)
    )
      this.options.trs = !0;
    (await this.processInputAsync(e), await Promise.all(this.pending));
    let n = this,
      { buffers: i, json: o } = n;
    r = n.options;
    let { extensionsUsed: s, extensionsRequired: a } = n,
      l = new Blob(i, { type: "application/octet-stream" }),
      c = Object.keys(s),
      u = Object.keys(a);
    if (c.length > 0) o.extensionsUsed = c;
    if (u.length > 0) o.extensionsRequired = u;
    if (o.buffers && o.buffers.length > 0) o.buffers[0].byteLength = l.size;
    if (r.binary === !0) {
      let d = new FileReader();
      (d.readAsArrayBuffer(l),
        (d.onloadend = function () {
          let h = Dw(d.result),
            f = new DataView(new ArrayBuffer(RR));
          (f.setUint32(0, h.byteLength, !0), f.setUint32(4, Rj, !0));
          let p = Dw(Oj(JSON.stringify(o)), 32),
            g = new DataView(new ArrayBuffer(RR));
          (g.setUint32(0, p.byteLength, !0), g.setUint32(4, Ij, !0));
          let m = new ArrayBuffer(IR),
            A = new DataView(m);
          (A.setUint32(0, Sj, !0), A.setUint32(4, Mj, !0));
          let y = IR + g.byteLength + p.byteLength + f.byteLength + h.byteLength;
          A.setUint32(8, y, !0);
          let x = new Blob([m, g, p, f, h], { type: "application/octet-stream" }),
            b = new FileReader();
          (b.readAsArrayBuffer(x),
            (b.onloadend = function () {
              t(b.result);
            }));
        }));
    } else if (o.buffers && o.buffers.length > 0) {
      let d = new FileReader();
      (d.readAsDataURL(l),
        (d.onloadend = function () {
          let h = d.result;
          ((o.buffers[0].uri = h), t(o));
        }));
    } else t(o);
  }
  serializeUserData(e, t) {
    if (Object.keys(e.userData).length === 0) return;
    let r = this.options,
      n = this.extensionsUsed;
    try {
      let i = JSON.parse(JSON.stringify(e.userData));
      if (r.includeCustomExtensions && i.gltfExtensions) {
        if (t.extensions === void 0) t.extensions = {};
        for (let o in i.gltfExtensions) ((t.extensions[o] = i.gltfExtensions[o]), (n[o] = !0));
        delete i.gltfExtensions;
      }
      if (Object.keys(i).length > 0) t.extras = i;
    } catch (i) {}
  }
  getUID(e, t = !1) {
    if (this.uids.has(e) === !1) {
      let n = /*@__PURE__*/ new Map();
      (n.set(!0, this.uid++), n.set(!1, this.uid++), this.uids.set(e, n));
    }
    return this.uids.get(e).get(t);
  }
  isNormalizedNormalAttribute(e) {
    if (this.cache.attributesNormalized.has(e)) return !1;
    let r = new Vector3();
    for (let n = 0, i = e.count; n < i; n++)
      if (Math.abs(r.fromBufferAttribute(e, n).length() - 1) > 0.0005) return !1;
    return !0;
  }
  createNormalizedNormalAttribute(e) {
    let t = this.cache;
    if (t.attributesNormalized.has(e)) return t.attributesNormalized.get(e);
    let r = e.clone(),
      n = new Vector3();
    for (let i = 0, o = r.count; i < o; i++) {
      if ((n.fromBufferAttribute(r, i), n.x === 0 && n.y === 0 && n.z === 0)) n.setX(1);
      else n.normalize();
      r.setXYZ(i, n.x, n.y, n.z);
    }
    return (t.attributesNormalized.set(e, r), r);
  }
  applyTextureTransform(e, t) {
    let r = !1,
      n = {};
    if (t.offset.x !== 0 || t.offset.y !== 0) ((n.offset = t.offset.toArray()), (r = !0));
    if (t.rotation !== 0) ((n.rotation = t.rotation), (r = !0));
    if (t.repeat.x !== 1 || t.repeat.y !== 1) ((n.scale = t.repeat.toArray()), (r = !0));
    if (r)
      ((e.extensions = e.extensions || {}),
        (e.extensions.KHR_texture_transform = n),
        (this.extensionsUsed.KHR_texture_transform = !0));
  }
  async buildMetalRoughTextureAsync(e, t) {
    if (e === t) return e;
    function r(h) {
      if (h.colorSpace === SRGBColorSpace)
        return function (p) {
          return p < 0.04045 ? p * 0.0773993808 : Math.pow(p * 0.9478672986 + 0.0521327014, 2.4);
        };
      return function (p) {
        return p;
      };
    }
    if (e instanceof CompressedTexture) e = await this.decompressTextureAsync(e);
    if (t instanceof CompressedTexture) t = await this.decompressTextureAsync(t);
    let n = e ? e.image : null,
      i = t ? t.image : null,
      o = Math.max(n ? n.width : 0, i ? i.width : 0),
      s = Math.max(n ? n.height : 0, i ? i.height : 0),
      a = OR();
    ((a.width = o), (a.height = s));
    let l = a.getContext("2d", { willReadFrequently: !0 });
    ((l.fillStyle = "#00ffff"), l.fillRect(0, 0, o, s));
    let c = l.getImageData(0, 0, o, s);
    if (n) {
      l.drawImage(n, 0, 0, o, s);
      let h = r(e),
        f = l.getImageData(0, 0, o, s).data;
      for (let p = 2; p < f.length; p += 4) c.data[p] = h(f[p] / 256) * 256;
    }
    if (i) {
      l.drawImage(i, 0, 0, o, s);
      let h = r(t),
        f = l.getImageData(0, 0, o, s).data;
      for (let p = 1; p < f.length; p += 4) c.data[p] = h(f[p] / 256) * 256;
    }
    l.putImageData(c, 0, 0);
    let d = (e || t).clone();
    if (
      ((d.source = new Source(a)),
      (d.colorSpace = NoColorSpace),
      (d.channel = (e || t).channel),
      e && t && e.channel !== t.channel)
    );
    return d;
  }
  async decompressTextureAsync(e, t = 1 / 0) {
    if (this.textureUtils === null)
      throw Error(
        "THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.",
      );
    return await this.textureUtils.decompress(e, t);
  }
  processBuffer(e) {
    let t = this.json,
      r = this.buffers;
    if (!t.buffers) t.buffers = [{ byteLength: 0 }];
    return (r.push(e), 0);
  }
  processBufferView(e, t, r, n, i) {
    let o = this.json;
    if (!o.bufferViews) o.bufferViews = [];
    let s;
    switch (t) {
      case Wr.BYTE:
      case Wr.UNSIGNED_BYTE:
        s = 1;
        break;
      case Wr.SHORT:
      case Wr.UNSIGNED_SHORT:
        s = 2;
        break;
      default:
        s = 4;
    }
    let a = e.itemSize * s;
    if (i === Wr.ARRAY_BUFFER) a = Math.ceil(a / 4) * 4;
    let l = BR(n * a),
      c = new DataView(new ArrayBuffer(l)),
      u = 0;
    for (let f = r; f < r + n; f++) {
      for (let p = 0; p < e.itemSize; p++) {
        let g;
        if (e.itemSize > 4) g = e.array[f * e.itemSize + p];
        else {
          if (p === 0) g = e.getX(f);
          else if (p === 1) g = e.getY(f);
          else if (p === 2) g = e.getZ(f);
          else if (p === 3) g = e.getW(f);
          if (e.normalized === !0) g = MathUtils.normalize(g, e.array);
        }
        if (t === Wr.FLOAT) c.setFloat32(u, g, !0);
        else if (t === Wr.INT) c.setInt32(u, g, !0);
        else if (t === Wr.UNSIGNED_INT) c.setUint32(u, g, !0);
        else if (t === Wr.SHORT) c.setInt16(u, g, !0);
        else if (t === Wr.UNSIGNED_SHORT) c.setUint16(u, g, !0);
        else if (t === Wr.BYTE) c.setInt8(u, g);
        else if (t === Wr.UNSIGNED_BYTE) c.setUint8(u, g);
        u += s;
      }
      if (u % a !== 0) u += a - (u % a);
    }
    let d = { buffer: this.processBuffer(c.buffer), byteOffset: this.byteOffset, byteLength: l };
    if (i !== void 0) d.target = i;
    if (i === Wr.ARRAY_BUFFER) d.byteStride = a;
    return (
      (this.byteOffset += l),
      o.bufferViews.push(d),
      { id: o.bufferViews.length - 1, byteLength: 0 }
    );
  }
  processBufferViewImage(e) {
    let t = this,
      r = t.json;
    if (!r.bufferViews) r.bufferViews = [];
    return new Promise(function (n) {
      let i = new FileReader();
      (i.readAsArrayBuffer(e),
        (i.onloadend = function () {
          let o = Dw(i.result),
            s = { buffer: t.processBuffer(o), byteOffset: t.byteOffset, byteLength: o.byteLength };
          ((t.byteOffset += o.byteLength), n(r.bufferViews.push(s) - 1));
        }));
    });
  }
  processAccessor(e, t, r, n) {
    let i = this.json,
      o = { 1: "SCALAR", 2: "VEC2", 3: "VEC3", 4: "VEC4", 9: "MAT3", 16: "MAT4" },
      s;
    if (e.array.constructor === Float32Array) s = Wr.FLOAT;
    else if (e.array.constructor === Int32Array) s = Wr.INT;
    else if (e.array.constructor === Uint32Array) s = Wr.UNSIGNED_INT;
    else if (e.array.constructor === Int16Array) s = Wr.SHORT;
    else if (e.array.constructor === Uint16Array) s = Wr.UNSIGNED_SHORT;
    else if (e.array.constructor === Int8Array) s = Wr.BYTE;
    else if (e.array.constructor === Uint8Array) s = Wr.UNSIGNED_BYTE;
    else
      throw Error(
        "THREE.GLTFExporter: Unsupported bufferAttribute component type: " +
          e.array.constructor.name,
      );
    if (r === void 0) r = 0;
    if (n === void 0 || n === 1 / 0) n = e.count;
    if (n === 0) return null;
    let a = Bj(e, r, n),
      l;
    if (t !== void 0) l = e === t.index ? Wr.ELEMENT_ARRAY_BUFFER : Wr.ARRAY_BUFFER;
    let c = this.processBufferView(e, s, r, n, l),
      u = {
        bufferView: c.id,
        byteOffset: c.byteOffset,
        componentType: s,
        count: n,
        max: a.max,
        min: a.min,
        type: o[e.itemSize],
      };
    if (e.normalized === !0) u.normalized = !0;
    if (!i.accessors) i.accessors = [];
    return i.accessors.push(u) - 1;
  }
  processImage(e, t, r, n = "image/png") {
    if (e !== null) {
      let i = this,
        { cache: o, json: s, options: a, pending: l } = i;
      if (!o.images.has(e)) o.images.set(e, {});
      let c = o.images.get(e),
        u = n + ":flipY/" + r.toString();
      if (c[u] !== void 0) return c[u];
      if (!s.images) s.images = [];
      let d = { mimeType: n },
        h = OR();
      ((h.width = Math.min(e.width, a.maxTextureSize)),
        (h.height = Math.min(e.height, a.maxTextureSize)));
      let f = h.getContext("2d", { willReadFrequently: !0 });
      if (r === !0) (f.translate(0, h.height), f.scale(1, -1));
      if (e.data !== void 0) {
        if (e.width > a.maxTextureSize || e.height > a.maxTextureSize);
        let g = new Uint8ClampedArray(e.height * e.width * 4);
        for (let m = 0; m < g.length; m += 4)
          ((g[m + 0] = e.data[m + 0]),
            (g[m + 1] = e.data[m + 1]),
            (g[m + 2] = e.data[m + 2]),
            (g[m + 3] = e.data[m + 3]));
        f.putImageData(new ImageData(g, e.width, e.height), 0, 0);
      } else if (
        (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && e instanceof ImageBitmap) ||
        (typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
      )
        f.drawImage(e, 0, 0, h.width, h.height);
      else
        throw Error(
          "THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.",
        );
      if (a.binary === !0)
        l.push(
          LR(h, n)
            .then((g) => i.processBufferViewImage(g))
            .then((g) => {
              d.bufferView = g;
            }),
        );
      else if (h.toDataURL !== void 0) d.uri = h.toDataURL(n);
      else
        l.push(
          LR(h, n)
            .then((g) => new FileReader().readAsDataURL(g))
            .then((g) => {
              d.uri = g;
            }),
        );
      let p = s.images.push(d) - 1;
      return ((c[u] = p), p);
    } else throw Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.");
  }
  processSampler(e) {
    let t = this.json;
    if (!t.samplers) t.samplers = [];
    let r = {
      magFilter: xa[e.magFilter],
      minFilter: xa[e.minFilter],
      wrapS: xa[e.wrapS],
      wrapT: xa[e.wrapT],
    };
    return t.samplers.push(r) - 1;
  }
  async processTextureAsync(e) {
    let r = this.options,
      n = this.cache,
      i = this.json;
    if (n.textures.has(e)) return n.textures.get(e);
    if (!i.textures) i.textures = [];
    if (e instanceof CompressedTexture) e = await this.decompressTextureAsync(e, r.maxTextureSize);
    let o = e.userData.mimeType;
    if (o === "image/webp") o = "image/png";
    let s = {
      sampler: this.processSampler(e),
      source: this.processImage(e.image, e.format, e.flipY, o),
    };
    if (e.name) s.name = e.name;
    await this._invokeAllAsync(async function (l) {
      l.writeTexture && (await l.writeTexture(e, s));
    });
    let a = i.textures.push(s) - 1;
    return (n.textures.set(e, a), a);
  }
  async processMaterialAsync(e) {
    let t = this.cache,
      r = this.json;
    if (t.materials.has(e)) return t.materials.get(e);
    if (e.isShaderMaterial) return null;
    if (!r.materials) r.materials = [];
    let n = { pbrMetallicRoughness: {} };
    if (e.isMeshStandardMaterial !== !0 && e.isMeshBasicMaterial !== !0);
    let i = e.color.toArray().concat([e.opacity]);
    if (!eg(i, [1, 1, 1, 1])) n.pbrMetallicRoughness.baseColorFactor = i;
    if (e.isMeshStandardMaterial)
      ((n.pbrMetallicRoughness.metallicFactor = e.metalness),
        (n.pbrMetallicRoughness.roughnessFactor = e.roughness));
    else
      ((n.pbrMetallicRoughness.metallicFactor = 0), (n.pbrMetallicRoughness.roughnessFactor = 1));
    if (e.metalnessMap || e.roughnessMap) {
      let s = await this.buildMetalRoughTextureAsync(e.metalnessMap, e.roughnessMap),
        a = { index: await this.processTextureAsync(s), texCoord: s.channel };
      (this.applyTextureTransform(a, s), (n.pbrMetallicRoughness.metallicRoughnessTexture = a));
    }
    if (e.map) {
      let s = { index: await this.processTextureAsync(e.map), texCoord: e.map.channel };
      (this.applyTextureTransform(s, e.map), (n.pbrMetallicRoughness.baseColorTexture = s));
    }
    if (e.emissive) {
      let s = e.emissive;
      if (Math.max(s.r, s.g, s.b) > 0) n.emissiveFactor = e.emissive.toArray();
      if (e.emissiveMap) {
        let l = {
          index: await this.processTextureAsync(e.emissiveMap),
          texCoord: e.emissiveMap.channel,
        };
        (this.applyTextureTransform(l, e.emissiveMap), (n.emissiveTexture = l));
      }
    }
    if (e.normalMap) {
      let s = { index: await this.processTextureAsync(e.normalMap), texCoord: e.normalMap.channel };
      if (e.normalScale && e.normalScale.x !== 1) s.scale = e.normalScale.x;
      (this.applyTextureTransform(s, e.normalMap), (n.normalTexture = s));
    }
    if (e.aoMap) {
      let s = { index: await this.processTextureAsync(e.aoMap), texCoord: e.aoMap.channel };
      if (e.aoMapIntensity !== 1) s.strength = e.aoMapIntensity;
      (this.applyTextureTransform(s, e.aoMap), (n.occlusionTexture = s));
    }
    if (e.transparent) n.alphaMode = "BLEND";
    else if (e.alphaTest > 0) ((n.alphaMode = "MASK"), (n.alphaCutoff = e.alphaTest));
    if (e.side === DoubleSide) n.doubleSided = !0;
    if (e.name !== "") n.name = e.name;
    (this.serializeUserData(e, n),
      await this._invokeAllAsync(async function (s) {
        s.writeMaterialAsync && (await s.writeMaterialAsync(e, n));
      }));
    let o = r.materials.push(n) - 1;
    return (t.materials.set(e, o), o);
  }
  async processMeshAsync(e) {
    let t = this.cache,
      r = this.json,
      n = [e.geometry.uuid];
    if (Array.isArray(e.material))
      for (let x = 0, b = e.material.length; x < b; x++) n.push(e.material[x].uuid);
    else n.push(e.material.uuid);
    let i = n.join(":");
    if (t.meshes.has(i)) return t.meshes.get(i);
    let o = e.geometry,
      s;
    if (e.isLineSegments) s = Wr.LINES;
    else if (e.isLineLoop) s = Wr.LINE_LOOP;
    else if (e.isLine) s = Wr.LINE_STRIP;
    else if (e.isPoints) s = Wr.POINTS;
    else s = e.material.wireframe ? Wr.LINES : Wr.TRIANGLES;
    let a = {},
      l = {},
      c = [],
      u = [],
      d = {
        uv: "TEXCOORD_0",
        uv1: "TEXCOORD_1",
        uv2: "TEXCOORD_2",
        uv3: "TEXCOORD_3",
        color: "COLOR_0",
        skinWeight: "WEIGHTS_0",
        skinIndex: "JOINTS_0",
      },
      h = o.getAttribute("normal");
    if (h !== void 0 && !this.isNormalizedNormalAttribute(h))
      o.setAttribute("normal", this.createNormalizedNormalAttribute(h));
    let f = null;
    for (let x in o.attributes) {
      if (x.slice(0, 5) === "morph") continue;
      let b = o.attributes[x];
      if (
        ((x = d[x] || x.toUpperCase()),
        !/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(x))
      )
        x = "_" + x;
      if (t.attributes.has(this.getUID(b))) {
        l[x] = t.attributes.get(this.getUID(b));
        continue;
      }
      f = null;
      let _ = b.array;
      if (x === "JOINTS_0" && !(_ instanceof Uint16Array) && !(_ instanceof Uint8Array))
        f = new BufferAttribute(new Uint16Array(_), b.itemSize, b.normalized);
      else if ((_ instanceof Uint32Array || _ instanceof Int32Array) && !x.startsWith("_"))
        f = Rp.Utils.toFloat32BufferAttribute(b);
      let w = this.processAccessor(f || b, o);
      if (w !== null) {
        if (!x.startsWith("_")) this.detectMeshQuantization(x, b);
        ((l[x] = w), t.attributes.set(this.getUID(b), w));
      }
    }
    if (h !== void 0) o.setAttribute("normal", h);
    if (Object.keys(l).length === 0) return null;
    if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
      let x = [],
        b = [],
        v = {};
      if (e.morphTargetDictionary !== void 0)
        for (let _ in e.morphTargetDictionary) v[e.morphTargetDictionary[_]] = _;
      for (let _ = 0; _ < e.morphTargetInfluences.length; ++_) {
        let w = {},
          S = !1;
        for (let E in o.morphAttributes) {
          if (E !== "position" && E !== "normal") {
            if (!S) S = !0;
            continue;
          }
          let T = o.morphAttributes[E][_],
            M = E.toUpperCase(),
            C = o.attributes[E];
          if (t.attributes.has(this.getUID(T, !0))) {
            w[M] = t.attributes.get(this.getUID(T, !0));
            continue;
          }
          let R = T.clone();
          if (!o.morphTargetsRelative)
            for (let B = 0, L = T.count; B < L; B++)
              for (let k = 0; k < T.itemSize; k++) {
                if (k === 0) R.setX(B, T.getX(B) - C.getX(B));
                if (k === 1) R.setY(B, T.getY(B) - C.getY(B));
                if (k === 2) R.setZ(B, T.getZ(B) - C.getZ(B));
                if (k === 3) R.setW(B, T.getW(B) - C.getW(B));
              }
          ((w[M] = this.processAccessor(R, o)), t.attributes.set(this.getUID(C, !0), w[M]));
        }
        if ((u.push(w), x.push(e.morphTargetInfluences[_]), e.morphTargetDictionary !== void 0))
          b.push(v[_]);
      }
      if (((a.weights = x), b.length > 0)) ((a.extras = {}), (a.extras.targetNames = b));
    }
    let p = Array.isArray(e.material);
    if (p && o.groups.length === 0) return null;
    let g = !1;
    if (p && o.index === null) {
      let x = [];
      for (let b = 0, v = o.attributes.position.count; b < v; b++) x[b] = b;
      (o.setIndex(x), (g = !0));
    }
    let m = p ? e.material : [e.material],
      A = p ? o.groups : [{ materialIndex: 0, start: void 0, count: void 0 }];
    for (let x = 0, b = A.length; x < b; x++) {
      let v = { mode: s, attributes: l };
      if ((this.serializeUserData(o, v), u.length > 0)) v.targets = u;
      if (o.index !== null) {
        let w = this.getUID(o.index);
        if (A[x].start !== void 0 || A[x].count !== void 0)
          w += ":" + A[x].start + ":" + A[x].count;
        if (t.attributes.has(w)) v.indices = t.attributes.get(w);
        else
          ((v.indices = this.processAccessor(o.index, o, A[x].start, A[x].count)),
            t.attributes.set(w, v.indices));
        if (v.indices === null) delete v.indices;
      }
      let _ = await this.processMaterialAsync(m[A[x].materialIndex]);
      if (_ !== null) v.material = _;
      c.push(v);
    }
    if (g === !0) o.setIndex(null);
    if (((a.primitives = c), !r.meshes)) r.meshes = [];
    await this._invokeAllAsync(function (x) {
      x.writeMesh && x.writeMesh(e, a);
    });
    let y = r.meshes.push(a) - 1;
    return (t.meshes.set(i, y), y);
  }
  detectMeshQuantization(e, t) {
    if (this.extensionsUsed[Fw]) return;
    let r = void 0;
    switch (t.array.constructor) {
      case Int8Array:
        r = "byte";
        break;
      case Uint8Array:
        r = "unsigned byte";
        break;
      case Int16Array:
        r = "short";
        break;
      case Uint16Array:
        r = "unsigned short";
        break;
      default:
        return;
    }
    if (t.normalized) r += " normalized";
    let n = e.split("_", 1)[0];
    if (SR[n] && SR[n].includes(r))
      ((this.extensionsUsed[Fw] = !0), (this.extensionsRequired[Fw] = !0));
  }
  processCamera(e) {
    let t = this.json;
    if (!t.cameras) t.cameras = [];
    let r = e.isOrthographicCamera,
      n = { type: r ? "orthographic" : "perspective" };
    if (r)
      n.orthographic = {
        xmag: e.right * 2,
        ymag: e.top * 2,
        zfar: e.far <= 0 ? 0.001 : e.far,
        znear: e.near < 0 ? 0 : e.near,
      };
    else
      n.perspective = {
        aspectRatio: e.aspect,
        yfov: MathUtils.degToRad(e.fov),
        zfar: e.far <= 0 ? 0.001 : e.far,
        znear: e.near < 0 ? 0 : e.near,
      };
    if (e.name !== "") n.name = e.type;
    return t.cameras.push(n) - 1;
  }
  processAnimation(e, t) {
    let r = this.json,
      n = this.nodeMap;
    if (!r.animations) r.animations = [];
    e = Rp.Utils.mergeMorphTargetTracks(e.clone(), t);
    let i = e.tracks,
      o = [],
      s = [];
    for (let a = 0; a < i.length; ++a) {
      let l = i[a],
        c = PropertyBinding.parseTrackName(l.name),
        u = PropertyBinding.findNode(t, c.nodeName),
        d = MR[c.propertyName];
      if (c.objectName === "bones")
        if (u.isSkinnedMesh === !0) u = u.skeleton.getBoneByName(c.objectIndex);
        else u = void 0;
      if (!u || !d) continue;
      let h = 1,
        f = l.values.length / l.times.length;
      if (d === MR.morphTargetInfluences) f /= u.morphTargetInfluences.length;
      let p;
      if (l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0)
        ((p = "CUBICSPLINE"), (f /= 3));
      else if (l.getInterpolation() === InterpolateDiscrete) p = "STEP";
      else p = "LINEAR";
      (s.push({
        input: this.processAccessor(new BufferAttribute(l.times, h)),
        output: this.processAccessor(new BufferAttribute(l.values, f)),
        interpolation: p,
      }),
        o.push({ sampler: s.length - 1, target: { node: n.get(u), path: d } }));
    }
    return (
      r.animations.push({
        name: e.name || "clip_" + r.animations.length,
        samplers: s,
        channels: o,
      }),
      r.animations.length - 1
    );
  }
  processSkin(e) {
    let t = this.json,
      r = this.nodeMap,
      n = t.nodes[r.get(e)],
      i = e.skeleton;
    if (i === void 0) return null;
    let o = e.skeleton.bones[0];
    if (o === void 0) return null;
    let s = [],
      a = new Float32Array(i.bones.length * 16),
      l = new Matrix4();
    for (let u = 0; u < i.bones.length; ++u)
      (s.push(r.get(i.bones[u])),
        l.copy(i.boneInverses[u]),
        l.multiply(e.bindMatrix).toArray(a, u * 16));
    if (t.skins === void 0) t.skins = [];
    return (
      t.skins.push({
        inverseBindMatrices: this.processAccessor(new BufferAttribute(a, 16)),
        joints: s,
        skeleton: r.get(o),
      }),
      (n.skin = t.skins.length - 1)
    );
  }
  async processNodeAsync(e) {
    let t = this.json,
      r = this.options,
      n = this.nodeMap;
    if (!t.nodes) t.nodes = [];
    let i = {};
    if (r.trs) {
      let s = e.quaternion.toArray(),
        a = e.position.toArray(),
        l = e.scale.toArray();
      if (!eg(s, [0, 0, 0, 1])) i.rotation = s;
      if (!eg(a, [0, 0, 0])) i.translation = a;
      if (!eg(l, [1, 1, 1])) i.scale = l;
    } else {
      if (e.matrixAutoUpdate) e.updateMatrix();
      if (Lj(e.matrix) === !1) i.matrix = e.matrix.elements;
    }
    if (e.name !== "") i.name = String(e.name);
    if ((this.serializeUserData(e, i), e.isMesh || e.isLine || e.isPoints)) {
      let s = await this.processMeshAsync(e);
      if (s !== null) i.mesh = s;
    } else if (e.isCamera) i.camera = this.processCamera(e);
    if (e.isSkinnedMesh) this.skins.push(e);
    if (e.children.length > 0) {
      let s = [];
      for (let a = 0, l = e.children.length; a < l; a++) {
        let c = e.children[a];
        if (c.visible || r.onlyVisible === !1) {
          let u = await this.processNodeAsync(c);
          if (u !== null) s.push(u);
        }
      }
      if (s.length > 0) i.children = s;
    }
    await this._invokeAllAsync(function (s) {
      s.writeNode && s.writeNode(e, i);
    });
    let o = t.nodes.push(i) - 1;
    return (n.set(e, o), o);
  }
  async processSceneAsync(e) {
    let t = this.json,
      r = this.options;
    if (!t.scenes) ((t.scenes = []), (t.scene = 0));
    let n = {};
    if (e.name !== "") n.name = e.name;
    t.scenes.push(n);
    let i = [];
    for (let o = 0, s = e.children.length; o < s; o++) {
      let a = e.children[o];
      if (a.visible || r.onlyVisible === !1) {
        let l = await this.processNodeAsync(a);
        if (l !== null) i.push(l);
      }
    }
    if (i.length > 0) n.nodes = i;
    this.serializeUserData(e, n);
  }
  async processObjectsAsync(e) {
    let t = new Scene();
    t.name = "AuxScene";
    for (let r = 0; r < e.length; r++) t.children.push(e[r]);
    await this.processSceneAsync(t);
  }
  async processInputAsync(e) {
    let t = this.options;
    ((e = e instanceof Array ? e : [e]),
      await this._invokeAllAsync(function (n) {
        n.beforeParse && n.beforeParse(e);
      }));
    let r = [];
    for (let n = 0; n < e.length; n++)
      if (e[n] instanceof Scene) await this.processSceneAsync(e[n]);
      else r.push(e[n]);
    if (r.length > 0) await this.processObjectsAsync(r);
    for (let n = 0; n < this.skins.length; ++n) this.processSkin(this.skins[n]);
    for (let n = 0; n < t.animations.length; ++n) this.processAnimation(t.animations[n], e[0]);
    await this._invokeAllAsync(function (n) {
      n.afterParse && n.afterParse(e);
    });
  }
  async _invokeAllAsync(e) {
    for (let t = 0, r = this.plugins.length; t < r; t++) await e(this.plugins[t]);
  }
}
class DR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_lights_punctual"));
  }
  writeNode(e, t) {
    if (!e.isLight) return;
    if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) return;
    let r = this.writer,
      { json: n, extensionsUsed: i } = r,
      o = {};
    if (e.name) o.name = e.name;
    if (((o.color = e.color.toArray()), (o.intensity = e.intensity), e.isDirectionalLight))
      o.type = "directional";
    else if (e.isPointLight) {
      if (((o.type = "point"), e.distance > 0)) o.range = e.distance;
    } else if (e.isSpotLight) {
      if (((o.type = "spot"), e.distance > 0)) o.range = e.distance;
      ((o.spot = {}),
        (o.spot.innerConeAngle = (1 - e.penumbra) * e.angle),
        (o.spot.outerConeAngle = e.angle));
    }
    if (e.decay !== void 0 && e.decay !== 2);
    if (
      e.target &&
      (e.target.parent !== e ||
        e.target.position.x !== 0 ||
        e.target.position.y !== 0 ||
        e.target.position.z !== -1)
    );
    if (!i[this.name])
      ((n.extensions = n.extensions || {}),
        (n.extensions[this.name] = { lights: [] }),
        (i[this.name] = !0));
    let s = n.extensions[this.name].lights;
    (s.push(o),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = { light: s.length - 1 }));
  }
}
class NR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_unlit"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshBasicMaterial) return;
    let n = this.writer.extensionsUsed;
    ((t.extensions = t.extensions || {}),
      (t.extensions[this.name] = {}),
      (n[this.name] = !0),
      (t.pbrMetallicRoughness.metallicFactor = 0),
      (t.pbrMetallicRoughness.roughnessFactor = 0.9));
  }
}
class PR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_clearcoat"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (((i.clearcoatFactor = e.clearcoat), e.clearcoatMap)) {
      let o = {
        index: await r.processTextureAsync(e.clearcoatMap),
        texCoord: e.clearcoatMap.channel,
      };
      (r.applyTextureTransform(o, e.clearcoatMap), (i.clearcoatTexture = o));
    }
    if (((i.clearcoatRoughnessFactor = e.clearcoatRoughness), e.clearcoatRoughnessMap)) {
      let o = {
        index: await r.processTextureAsync(e.clearcoatRoughnessMap),
        texCoord: e.clearcoatRoughnessMap.channel,
      };
      (r.applyTextureTransform(o, e.clearcoatRoughnessMap), (i.clearcoatRoughnessTexture = o));
    }
    if (e.clearcoatNormalMap) {
      let o = {
        index: await r.processTextureAsync(e.clearcoatNormalMap),
        texCoord: e.clearcoatNormalMap.channel,
      };
      if (e.clearcoatNormalScale.x !== 1) o.scale = e.clearcoatNormalScale.x;
      (r.applyTextureTransform(o, e.clearcoatNormalMap), (i.clearcoatNormalTexture = o));
    }
    ((t.extensions = t.extensions || {}), (t.extensions[this.name] = i), (n[this.name] = !0));
  }
}
class kR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_dispersion"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.dispersion === 0) return;
    let n = this.writer.extensionsUsed,
      i = {};
    ((i.dispersion = e.dispersion),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class UR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_iridescence"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (((i.iridescenceFactor = e.iridescence), e.iridescenceMap)) {
      let o = {
        index: await r.processTextureAsync(e.iridescenceMap),
        texCoord: e.iridescenceMap.channel,
      };
      (r.applyTextureTransform(o, e.iridescenceMap), (i.iridescenceTexture = o));
    }
    if (
      ((i.iridescenceIor = e.iridescenceIOR),
      (i.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0]),
      (i.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1]),
      e.iridescenceThicknessMap)
    ) {
      let o = {
        index: await r.processTextureAsync(e.iridescenceThicknessMap),
        texCoord: e.iridescenceThicknessMap.channel,
      };
      (r.applyTextureTransform(o, e.iridescenceThicknessMap), (i.iridescenceThicknessTexture = o));
    }
    ((t.extensions = t.extensions || {}), (t.extensions[this.name] = i), (n[this.name] = !0));
  }
}
class HR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_transmission"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (((i.transmissionFactor = e.transmission), e.transmissionMap)) {
      let o = {
        index: await r.processTextureAsync(e.transmissionMap),
        texCoord: e.transmissionMap.channel,
      };
      (r.applyTextureTransform(o, e.transmissionMap), (i.transmissionTexture = o));
    }
    ((t.extensions = t.extensions || {}), (t.extensions[this.name] = i), (n[this.name] = !0));
  }
}
class GR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_volume"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (((i.thicknessFactor = e.thickness), e.thicknessMap)) {
      let o = {
        index: await r.processTextureAsync(e.thicknessMap),
        texCoord: e.thicknessMap.channel,
      };
      (r.applyTextureTransform(o, e.thicknessMap), (i.thicknessTexture = o));
    }
    if (e.attenuationDistance !== 1 / 0) i.attenuationDistance = e.attenuationDistance;
    ((i.attenuationColor = e.attenuationColor.toArray()),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class zR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_ior"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
    let n = this.writer.extensionsUsed,
      i = {};
    ((i.ior = e.ior),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class VR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_specular"));
  }
  async writeMaterialAsync(e, t) {
    if (
      !e.isMeshPhysicalMaterial ||
      (e.specularIntensity === 1 &&
        e.specularColor.equals(Ej) &&
        !e.specularIntensityMap &&
        !e.specularColorMap)
    )
      return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (e.specularIntensityMap) {
      let o = {
        index: await r.processTextureAsync(e.specularIntensityMap),
        texCoord: e.specularIntensityMap.channel,
      };
      (r.applyTextureTransform(o, e.specularIntensityMap), (i.specularTexture = o));
    }
    if (e.specularColorMap) {
      let o = {
        index: await r.processTextureAsync(e.specularColorMap),
        texCoord: e.specularColorMap.channel,
      };
      (r.applyTextureTransform(o, e.specularColorMap), (i.specularColorTexture = o));
    }
    ((i.specularFactor = e.specularIntensity),
      (i.specularColorFactor = e.specularColor.toArray()),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class WR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_sheen"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (e.sheenRoughnessMap) {
      let o = {
        index: await r.processTextureAsync(e.sheenRoughnessMap),
        texCoord: e.sheenRoughnessMap.channel,
      };
      (r.applyTextureTransform(o, e.sheenRoughnessMap), (i.sheenRoughnessTexture = o));
    }
    if (e.sheenColorMap) {
      let o = {
        index: await r.processTextureAsync(e.sheenColorMap),
        texCoord: e.sheenColorMap.channel,
      };
      (r.applyTextureTransform(o, e.sheenColorMap), (i.sheenColorTexture = o));
    }
    ((i.sheenRoughnessFactor = e.sheenRoughness),
      (i.sheenColorFactor = e.sheenColor.toArray()),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class QR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_anisotropy"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (e.anisotropyMap) {
      let o = { index: await r.processTextureAsync(e.anisotropyMap) };
      (r.applyTextureTransform(o, e.anisotropyMap), (i.anisotropyTexture = o));
    }
    ((i.anisotropyStrength = e.anisotropy),
      (i.anisotropyRotation = e.anisotropyRotation),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class YR {
  constructor(e) {
    ((this.writer = e), (this.name = "KHR_materials_emissive_strength"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
    let n = this.writer.extensionsUsed,
      i = {};
    ((i.emissiveStrength = e.emissiveIntensity),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class XR {
  constructor(e) {
    ((this.writer = e), (this.name = "EXT_materials_bump"));
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || (e.bumpScale === 1 && !e.bumpMap)) return;
    let r = this.writer,
      n = r.extensionsUsed,
      i = {};
    if (e.bumpMap) {
      let o = { index: await r.processTextureAsync(e.bumpMap), texCoord: e.bumpMap.channel };
      (r.applyTextureTransform(o, e.bumpMap), (i.bumpTexture = o));
    }
    ((i.bumpFactor = e.bumpScale),
      (t.extensions = t.extensions || {}),
      (t.extensions[this.name] = i),
      (n[this.name] = !0));
  }
}
class jR {
  constructor(e) {
    ((this.writer = e), (this.name = "EXT_mesh_gpu_instancing"));
  }
  writeNode(e, t) {
    if (!e.isInstancedMesh) return;
    let r = this.writer,
      n = e,
      i = new Float32Array(n.count * 3),
      o = new Float32Array(n.count * 4),
      s = new Float32Array(n.count * 3),
      a = new Matrix4(),
      l = new Vector3(),
      c = new Quaternion(),
      u = new Vector3();
    for (let h = 0; h < n.count; h++)
      (n.getMatrixAt(h, a),
        a.decompose(l, c, u),
        l.toArray(i, h * 3),
        c.toArray(o, h * 4),
        u.toArray(s, h * 3));
    let d = {
      TRANSLATION: r.processAccessor(new BufferAttribute(i, 3)),
      ROTATION: r.processAccessor(new BufferAttribute(o, 4)),
      SCALE: r.processAccessor(new BufferAttribute(s, 3)),
    };
    if (n.instanceColor) d._COLOR_0 = r.processAccessor(n.instanceColor);
    ((t.extensions = t.extensions || {}),
      (t.extensions[this.name] = { attributes: d }),
      (r.extensionsUsed[this.name] = !0),
      (r.extensionsRequired[this.name] = !0));
  }
}
Rp.Utils = {
  insertKeyframe: function (e, t) {
    let n = e.getValueSize(),
      i = new e.TimeBufferType(e.times.length + 1),
      o = new e.ValueBufferType(e.values.length + n),
      s = e.createInterpolant(new e.ValueBufferType(n)),
      a;
    if (e.times.length === 0) {
      i[0] = t;
      for (let l = 0; l < n; l++) o[l] = 0;
      a = 0;
    } else if (t < e.times[0]) {
      if (Math.abs(e.times[0] - t) < 0.001) return 0;
      ((i[0] = t), i.set(e.times, 1), o.set(s.evaluate(t), 0), o.set(e.values, n), (a = 0));
    } else if (t > e.times[e.times.length - 1]) {
      if (Math.abs(e.times[e.times.length - 1] - t) < 0.001) return e.times.length - 1;
      ((i[i.length - 1] = t),
        i.set(e.times, 0),
        o.set(e.values, 0),
        o.set(s.evaluate(t), e.values.length),
        (a = i.length - 1));
    } else
      for (let l = 0; l < e.times.length; l++) {
        if (Math.abs(e.times[l] - t) < 0.001) return l;
        if (e.times[l] < t && e.times[l + 1] > t) {
          (i.set(e.times.slice(0, l + 1), 0),
            (i[l + 1] = t),
            i.set(e.times.slice(l + 1), l + 2),
            o.set(e.values.slice(0, (l + 1) * n), 0),
            o.set(s.evaluate(t), (l + 1) * n),
            o.set(e.values.slice((l + 1) * n), (l + 2) * n),
            (a = l + 1));
          break;
        }
      }
    return ((e.times = i), (e.values = o), a);
  },
  mergeMorphTargetTracks: function (e, t) {
    let r = [],
      n = {},
      i = e.tracks;
    for (let o = 0; o < i.length; ++o) {
      let s = i[o],
        a = PropertyBinding.parseTrackName(s.name),
        l = PropertyBinding.findNode(t, a.nodeName);
      if (a.propertyName !== "morphTargetInfluences" || a.propertyIndex === void 0) {
        r.push(s);
        continue;
      }
      if (
        s.createInterpolant !== s.InterpolantFactoryMethodDiscrete &&
        s.createInterpolant !== s.InterpolantFactoryMethodLinear
      ) {
        if (s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)
          throw Error(
            "THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.",
          );
        ((s = s.clone()), s.setInterpolation(InterpolateLinear));
      }
      let c = l.morphTargetInfluences.length,
        u = l.morphTargetDictionary[a.propertyIndex];
      if (u === void 0)
        throw Error("THREE.GLTFExporter: Morph target name not found: " + a.propertyIndex);
      let d;
      if (n[l.uuid] === void 0) {
        d = s.clone();
        let f = new d.ValueBufferType(c * d.times.length);
        for (let p = 0; p < d.times.length; p++) f[p * c + u] = d.values[p];
        ((d.name = (a.nodeName || "") + ".morphTargetInfluences"),
          (d.values = f),
          (n[l.uuid] = d),
          r.push(d));
        continue;
      }
      let h = s.createInterpolant(new s.ValueBufferType(1));
      d = n[l.uuid];
      for (let f = 0; f < d.times.length; f++) d.values[f * c + u] = h.evaluate(d.times[f]);
      for (let f = 0; f < s.times.length; f++) {
        let p = this.insertKeyframe(d, s.times[f]);
        d.values[p * c + u] = s.values[f];
      }
    }
    return ((e.tracks = r), e);
  },
  toFloat32BufferAttribute: function (e) {
    let t = new BufferAttribute(new Float32Array(e.count * e.itemSize), e.itemSize, !1);
    if (!e.normalized && !e.isInterleavedBufferAttribute) return (t.array.set(e.array), t);
    for (let r = 0, n = e.count; r < n; r++)
      for (let i = 0; i < e.itemSize; i++) t.setComponent(r, i, e.getComponent(r, i));
    return t;
  },
};
