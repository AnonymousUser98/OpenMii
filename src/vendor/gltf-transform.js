// src/vendor/gltf-transform.js
// glTF-Transform (+ gl-matrix parts): optimises exported 3D models.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

class z5 {
  constructor() {
    this._listeners = {};
  }
  addEventListener(e, t) {
    let r = this._listeners;
    if (r[e] === void 0) r[e] = [];
    if (r[e].indexOf(t) === -1) r[e].push(t);
    return this;
  }
  removeEventListener(e, t) {
    let n = this._listeners[e];
    if (n !== void 0) {
      let i = n.indexOf(t);
      if (i !== -1) n.splice(i, 1);
    }
    return this;
  }
  dispatchEvent(e) {
    let r = this._listeners[e.type];
    if (r !== void 0) {
      let n = r.slice(0);
      for (let i = 0, o = n.length; i < o; i++) n[i].call(this, e);
    }
    return this;
  }
  dispose() {
    for (let e in this._listeners) delete this._listeners[e];
  }
}
class yu {
  constructor(e, t, r, n = {}) {
    if (
      ((this._name = void 0),
      (this._parent = void 0),
      (this._child = void 0),
      (this._attributes = void 0),
      (this._disposed = !1),
      (this._name = e),
      (this._parent = t),
      (this._child = r),
      (this._attributes = n),
      !t.isOnGraph(r))
    )
      throw Error("Cannot connect disconnected graphs.");
  }
  getName() {
    return this._name;
  }
  getParent() {
    return this._parent;
  }
  getChild() {
    return this._child;
  }
  setChild(e) {
    return ((this._child = e), this);
  }
  getAttributes() {
    return this._attributes;
  }
  dispose() {
    if (this._disposed) return;
    (this._parent._destroyRef(this), (this._disposed = !0));
  }
  isDisposed() {
    return this._disposed;
  }
}
class rb extends z5 {
  constructor(...e) {
    super(...e);
    ((this._emptySet = /*@__PURE__*/ new Set()),
      (this._edges = /*@__PURE__*/ new Set()),
      (this._parentEdges = /*@__PURE__*/ new Map()),
      (this._childEdges = /*@__PURE__*/ new Map()));
  }
  listEdges() {
    return Array.from(this._edges);
  }
  listParentEdges(e) {
    return Array.from(this._childEdges.get(e) || this._emptySet);
  }
  listParents(e) {
    let t = /*@__PURE__*/ new Set();
    for (let r of this.listParentEdges(e)) t.add(r.getParent());
    return Array.from(t);
  }
  listChildEdges(e) {
    return Array.from(this._parentEdges.get(e) || this._emptySet);
  }
  listChildren(e) {
    let t = /*@__PURE__*/ new Set();
    for (let r of this.listChildEdges(e)) t.add(r.getChild());
    return Array.from(t);
  }
  disconnectParents(e, t) {
    for (let r of this.listParentEdges(e)) if (!t || t(r.getParent())) r.dispose();
    return this;
  }
  _createEdge(e, t, r, n) {
    let i = new yu(e, t, r, n);
    this._edges.add(i);
    let o = i.getParent();
    if (!this._parentEdges.has(o)) this._parentEdges.set(o, /*@__PURE__*/ new Set());
    this._parentEdges.get(o).add(i);
    let s = i.getChild();
    if (!this._childEdges.has(s)) this._childEdges.set(s, /*@__PURE__*/ new Set());
    return (this._childEdges.get(s).add(i), i);
  }
  _destroyEdge(e) {
    return (
      this._edges.delete(e),
      this._parentEdges.get(e.getParent()).delete(e),
      this._childEdges.get(e.getChild()).delete(e),
      this
    );
  }
}
function Xg() {
  return (
    (Xg =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r) if (Object.prototype.hasOwnProperty.call(r, n)) e[n] = r[n];
        }
        return e;
      }),
    Xg.apply(this, arguments)
  );
}
class Vl {
  constructor(e) {
    if (((this.list = []), e)) for (let t of e) this.list.push(t);
  }
  add(e) {
    this.list.push(e);
  }
  remove(e) {
    let t = this.list.indexOf(e);
    if (t >= 0) this.list.splice(t, 1);
  }
  removeChild(e) {
    let t = [];
    for (let r of this.list) if (r.getChild() === e) t.push(r);
    for (let r of t) this.remove(r);
    return t;
  }
  listRefsByChild(e) {
    let t = [];
    for (let r of this.list) if (r.getChild() === e) t.push(r);
    return t;
  }
  values() {
    return this.list;
  }
}
class wn {
  constructor(e) {
    if (((this.set = /*@__PURE__*/ new Set()), (this.map = /*@__PURE__*/ new Map()), e))
      for (let t of e) this.add(t);
  }
  add(e) {
    let t = e.getChild();
    (this.removeChild(t), this.set.add(e), this.map.set(t, e));
  }
  remove(e) {
    (this.set.delete(e), this.map.delete(e.getChild()));
  }
  removeChild(e) {
    let t = this.map.get(e) || null;
    if (t) this.remove(t);
    return t;
  }
  getRefByChild(e) {
    return this.map.get(e) || null;
  }
  values() {
    return Array.from(this.set);
  }
}
class Ts {
  constructor(e) {
    if (((this.map = {}), e)) Object.assign(this.map, e);
  }
  set(e, t) {
    this.map[e] = t;
  }
  delete(e) {
    delete this.map[e];
  }
  get(e) {
    return this.map[e] || null;
  }
  keys() {
    return Object.keys(this.map);
  }
  values() {
    return Object.values(this.map);
  }
}
var mn = Symbol("attributes"),
  kd = Symbol("immutableKeys");
class nb extends z5 {
  constructor(e) {
    super();
    ((this._disposed = !1),
      (this.graph = void 0),
      (this[mn] = void 0),
      (this[kd] = void 0),
      (this.graph = e),
      (this[kd] = /*@__PURE__*/ new Set()),
      (this[mn] = this._createAttributes()));
  }
  getDefaults() {
    return {};
  }
  _createAttributes() {
    let e = this.getDefaults(),
      t = {};
    for (let r in e) {
      let n = e[r];
      if (n instanceof nb) {
        let i = this.graph._createEdge(r, this, n);
        (this[kd].add(r), (t[r] = i));
      } else t[r] = n;
    }
    return t;
  }
  isOnGraph(e) {
    return this.graph === e.graph;
  }
  isDisposed() {
    return this._disposed;
  }
  dispose() {
    if (this._disposed) return;
    (this.graph.listChildEdges(this).forEach((e) => e.dispose()),
      this.graph.disconnectParents(this),
      (this._disposed = !0),
      this.dispatchEvent({ type: "dispose" }));
  }
  detach() {
    return (this.graph.disconnectParents(this), this);
  }
  swap(e, t) {
    for (let r in this[mn]) {
      let n = this[mn][r];
      if (n instanceof yu) {
        let i = n;
        if (i.getChild() === e) this.setRef(r, t, i.getAttributes());
      } else if (n instanceof Vl)
        for (let i of n.listRefsByChild(e)) {
          let o = i.getAttributes();
          (this.removeRef(r, e), this.addRef(r, t, o));
        }
      else if (n instanceof wn) {
        let i = n.getRefByChild(e);
        if (i) {
          let o = i.getAttributes();
          (this.removeRef(r, e), this.addRef(r, t, o));
        }
      } else if (n instanceof Ts)
        for (let i of n.keys()) {
          let o = n.get(i);
          if (o.getChild() === e) this.setRefMap(r, i, t, o.getAttributes());
        }
    }
    return this;
  }
  get(e) {
    return this[mn][e];
  }
  set(e, t) {
    return ((this[mn][e] = t), this.dispatchEvent({ type: "change", attribute: e }));
  }
  getRef(e) {
    let t = this[mn][e];
    return t ? t.getChild() : null;
  }
  setRef(e, t, r) {
    if (this[kd].has(e)) throw Error(`Cannot overwrite immutable attribute, "${e}".`);
    let n = this[mn][e];
    if (n) n.dispose();
    if (!t) return this;
    let i = this.graph._createEdge(e, this, t, r);
    return ((this[mn][e] = i), this.dispatchEvent({ type: "change", attribute: e }));
  }
  listRefs(e) {
    return this.assertRefList(e)
      .values()
      .map((r) => r.getChild());
  }
  addRef(e, t, r) {
    let n = this.graph._createEdge(e, this, t, r);
    return (this.assertRefList(e).add(n), this.dispatchEvent({ type: "change", attribute: e }));
  }
  removeRef(e, t) {
    let r = this.assertRefList(e);
    if (r instanceof Vl) for (let n of r.listRefsByChild(t)) n.dispose();
    else {
      let n = r.getRefByChild(t);
      if (n) n.dispose();
    }
    return this;
  }
  assertRefList(e) {
    let t = this[mn][e];
    if (t instanceof Vl || t instanceof wn) return t;
    throw Error(`Expected RefList or RefSet for attribute "${e}"`);
  }
  listRefMapKeys(e) {
    return this.assertRefMap(e).keys();
  }
  listRefMapValues(e) {
    return this.assertRefMap(e)
      .values()
      .map((t) => t.getChild());
  }
  getRefMap(e, t) {
    let n = this.assertRefMap(e).get(t);
    return n ? n.getChild() : null;
  }
  setRefMap(e, t, r, n) {
    let i = this.assertRefMap(e),
      o = i.get(t);
    if (o) o.dispose();
    if (!r) return this;
    n = Object.assign(n || {}, { key: t });
    let s = this.graph._createEdge(e, this, r, Xg({}, n, { key: t }));
    return (i.set(t, s), this.dispatchEvent({ type: "change", attribute: e, key: t }));
  }
  assertRefMap(e) {
    let t = this[mn][e];
    if (t instanceof Ts) return t;
    throw Error(`Expected RefMap for attribute "${e}"`);
  }
  dispatchEvent(e) {
    return (
      super.dispatchEvent(Xg({}, e, { target: this })),
      this.graph.dispatchEvent(Xg({}, e, { target: this, type: `node:${e.type}` })),
      this
    );
  }
  _destroyRef(e) {
    let t = e.getName();
    if (this[mn][t] === e) {
      if (((this[mn][t] = null), this[kd].has(t))) e.getChild().dispose();
    } else if (this[mn][t] instanceof Vl) this[mn][t].remove(e);
    else if (this[mn][t] instanceof wn) this[mn][t].remove(e);
    else if (this[mn][t] instanceof Ts) {
      let r = this[mn][t];
      for (let n of r.keys()) if (r.get(n) === e) r.delete(n);
    } else return;
    (this.graph._destroyEdge(e), this.dispatchEvent({ type: "change", attribute: t }));
  }
}
var FF = "v4.2.1",
  Wf = "@glb.bin",
  Ie;
(function (e) {
  ((e.ACCESSOR = "Accessor"),
    (e.ANIMATION = "Animation"),
    (e.ANIMATION_CHANNEL = "AnimationChannel"),
    (e.ANIMATION_SAMPLER = "AnimationSampler"),
    (e.BUFFER = "Buffer"),
    (e.CAMERA = "Camera"),
    (e.MATERIAL = "Material"),
    (e.MESH = "Mesh"),
    (e.PRIMITIVE = "Primitive"),
    (e.PRIMITIVE_TARGET = "PrimitiveTarget"),
    (e.NODE = "Node"),
    (e.ROOT = "Root"),
    (e.SCENE = "Scene"),
    (e.SKIN = "Skin"),
    (e.TEXTURE = "Texture"),
    (e.TEXTURE_INFO = "TextureInfo"));
})(Ie || (Ie = {}));
var cb;
(function (e) {
  ((e.INTERLEAVED = "interleaved"), (e.SEPARATE = "separate"));
})(cb || (cb = {}));
var Sa;
(function (e) {
  ((e.ARRAY_BUFFER = "ARRAY_BUFFER"),
    (e.ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER"),
    (e.INVERSE_BIND_MATRICES = "INVERSE_BIND_MATRICES"),
    (e.OTHER = "OTHER"),
    (e.SPARSE = "SPARSE"));
})(Sa || (Sa = {}));
var ta;
(function (e) {
  ((e[(e.R = 4096)] = "R"), (e[(e.G = 256)] = "G"), (e[(e.B = 16)] = "B"), (e[(e.A = 1)] = "A"));
})(ta || (ta = {}));
var Ud;
(function (e) {
  ((e.GLTF = "GLTF"), (e.GLB = "GLB"));
})(Ud || (Ud = {}));
var Kg = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array,
};
class rr {
  static createBufferFromDataURI(e) {
    if (typeof Buffer > "u") {
      let t = atob(e.split(",")[1]),
        r = new Uint8Array(t.length);
      for (let n = 0; n < t.length; n++) r[n] = t.charCodeAt(n);
      return r;
    } else {
      let t = e.split(",")[1],
        r = e.indexOf("base64") >= 0;
      return Buffer.from(t, r ? "base64" : "utf8");
    }
  }
  static encodeText(e) {
    return /*@__PURE__*/ new TextEncoder().encode(e);
  }
  static decodeText(e) {
    return /*@__PURE__*/ new TextDecoder().decode(e);
  }
  static concat(e) {
    let t = 0;
    for (let i of e) t += i.byteLength;
    let r = new Uint8Array(t),
      n = 0;
    for (let i of e) (r.set(i, n), (n += i.byteLength));
    return r;
  }
  static pad(e, t = 0) {
    let r = this.padNumber(e.byteLength);
    if (r === e.byteLength) return e;
    let n = new Uint8Array(r);
    if ((n.set(e), t !== 0)) for (let i = e.byteLength; i < r; i++) n[i] = t;
    return n;
  }
  static padNumber(e) {
    return Math.ceil(e / 4) * 4;
  }
  static equals(e, t) {
    if (e === t) return !0;
    if (e.byteLength !== t.byteLength) return !1;
    let r = e.byteLength;
    while (r--) if (e[r] !== t[r]) return !1;
    return !0;
  }
  static toView(e, t = 0, r = 1 / 0) {
    return new Uint8Array(e.buffer, e.byteOffset + t, Math.min(e.byteLength, r));
  }
  static assertView(e) {
    if (e && !ArrayBuffer.isView(e))
      throw Error(`Method requires Uint8Array parameter; received "${typeof e}".`);
    return e;
  }
}
class DF {
  match(e) {
    return e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255;
  }
  getSize(e) {
    let t = new DataView(e.buffer, e.byteOffset + 4),
      r,
      n;
    while (t.byteLength) {
      if (
        ((r = t.getUint16(0, !1)),
        yZ(t, r),
        (n = t.getUint8(r + 1)),
        n === 192 || n === 193 || n === 194)
      )
        return [t.getUint16(r + 7, !1), t.getUint16(r + 5, !1)];
      t = new DataView(e.buffer, t.byteOffset + r + 2);
    }
    throw TypeError("Invalid JPG, no size found");
  }
  getChannels(e) {
    return 3;
  }
}
class hb {
  match(e) {
    return (
      e.length >= 8 &&
      e[0] === 137 &&
      e[1] === 80 &&
      e[2] === 78 &&
      e[3] === 71 &&
      e[4] === 13 &&
      e[5] === 10 &&
      e[6] === 26 &&
      e[7] === 10
    );
  }
  getSize(e) {
    let t = new DataView(e.buffer, e.byteOffset);
    if (rr.decodeText(e.slice(12, 16)) === hb.PNG_FRIED_CHUNK_NAME)
      return [t.getUint32(32, !1), t.getUint32(36, !1)];
    return [t.getUint32(16, !1), t.getUint32(20, !1)];
  }
  getChannels(e) {
    return 4;
  }
}
hb.PNG_FRIED_CHUNK_NAME = "CgBI";
class Ea {
  static registerFormat(e, t) {
    this.impls[e] = t;
  }
  static getMimeType(e) {
    for (let t in this.impls) if (this.impls[t].match(e)) return t;
    return null;
  }
  static getSize(e, t) {
    if (!this.impls[t]) return null;
    return this.impls[t].getSize(e);
  }
  static getChannels(e, t) {
    if (!this.impls[t]) return null;
    return this.impls[t].getChannels(e);
  }
  static getVRAMByteLength(e, t) {
    if (!this.impls[t]) return null;
    if (this.impls[t].getVRAMByteLength) return this.impls[t].getVRAMByteLength(e);
    let r = 0,
      n = 4,
      i = this.getSize(e, t);
    if (!i) return null;
    while (i[0] > 1 || i[1] > 1)
      ((r += i[0] * i[1] * n),
        (i[0] = Math.max(Math.floor(i[0] / 2), 1)),
        (i[1] = Math.max(Math.floor(i[1] / 2), 1)));
    return ((r += 1 * n), r);
  }
  static mimeTypeToExtension(e) {
    if (e === "image/jpeg") return "jpg";
    return e.split("/").pop();
  }
  static extensionToMimeType(e) {
    if (e === "jpg") return "image/jpeg";
    if (!e) return "";
    return `image/${e}`;
  }
}
Ea.impls = { "image/jpeg": new DF(), "image/png": new hb() };
function yZ(e, t) {
  if (t > e.byteLength) throw TypeError("Corrupt JPG, exceeded buffer limits");
  if (e.getUint8(t) !== 255) throw TypeError("Invalid JPG, marker table corrupted");
  return e;
}
class Hd {
  static basename(e) {
    let t = e.split(/[\\/]/).pop();
    return t.substring(0, t.lastIndexOf("."));
  }
  static extension(e) {
    if (e.startsWith("data:image/")) {
      let t = e.match(/data:(image\/\w+)/)[1];
      return Ea.mimeTypeToExtension(t);
    } else if (e.startsWith("data:model/gltf+json")) return "gltf";
    else if (e.startsWith("data:model/gltf-binary")) return "glb";
    else if (e.startsWith("data:application/")) return "bin";
    return e.split(/[\\/]/).pop().split(/[.]/).pop();
  }
}
var W5 = typeof Float32Array < "u" ? Float32Array : Array;
if (!Math.hypot)
  Math.hypot = function () {
    var e = 0,
      t = arguments.length;
    while (t--) e += arguments[t] * arguments[t];
    return Math.sqrt(e);
  };
function xZ() {
  var e = new W5(3);
  if (W5 != Float32Array) ((e[0] = 0), (e[1] = 0), (e[2] = 0));
  return e;
}
function V5(e) {
  var t = e[0],
    r = e[1],
    n = e[2];
  return Math.hypot(t, r, n);
}
function bZ(e, t, r) {
  var n = t[0],
    i = t[1],
    o = t[2],
    s = r[3] * n + r[7] * i + r[11] * o + r[15];
  return (
    (s = s || 1),
    (e[0] = (r[0] * n + r[4] * i + r[8] * o + r[12]) / s),
    (e[1] = (r[1] * n + r[5] * i + r[9] * o + r[13]) / s),
    (e[2] = (r[2] * n + r[6] * i + r[10] * o + r[14]) / s),
    e
  );
}
(function () {
  var e = xZ();
  return function (t, r, n, i, o, s) {
    var a, l;
    if (!r) r = 3;
    if (!n) n = 0;
    if (i) l = Math.min(i * r + n, t.length);
    else l = t.length;
    for (a = n; a < l; a += r)
      ((e[0] = t[a]),
        (e[1] = t[a + 1]),
        (e[2] = t[a + 2]),
        o(e, e, s),
        (t[a] = e[0]),
        (t[a + 1] = e[1]),
        (t[a + 2] = e[2]));
    return t;
  };
})();
function K5(e) {
  let t = NF(),
    r = e.propertyType === Ie.NODE ? [e] : e.listChildren();
  for (let n of r)
    n.traverse((i) => {
      let o = i.getMesh();
      if (!o) return;
      let s = _Z(o, i.getWorldMatrix());
      if (s.min.every(isFinite) && s.max.every(isFinite)) (Q5(s.min, t), Q5(s.max, t));
    });
  return t;
}
function _Z(e, t) {
  let r = NF();
  for (let n of e.listPrimitives()) {
    let i = n.getAttribute("POSITION"),
      o = n.getIndices();
    if (!i) continue;
    let s = [0, 0, 0],
      a = [0, 0, 0];
    for (let l = 0, c = o ? o.getCount() : i.getCount(); l < c; l++) {
      let u = o ? o.getScalar(l) : l;
      ((s = i.getElement(u, s)), (a = bZ(a, s, t)), Q5(a, r));
    }
  }
  return r;
}
function Q5(e, t) {
  for (let r = 0; r < 3; r++)
    ((t.min[r] = Math.min(e[r], t.min[r])), (t.max[r] = Math.max(e[r], t.max[r])));
}
function NF() {
  return { min: [1 / 0, 1 / 0, 1 / 0], max: [-1 / 0, -1 / 0, -1 / 0] };
}
var MF = "https://null.example";
class c1 {
  static dirname(e) {
    let t = e.lastIndexOf("/");
    if (t === -1) return "./";
    return e.substring(0, t + 1);
  }
  static basename(e) {
    return Hd.basename(new URL(e, MF).pathname);
  }
  static extension(e) {
    return Hd.extension(new URL(e, MF).pathname);
  }
  static resolve(e, t) {
    if (!this.isRelativePath(t)) return t;
    let r = e.split("/"),
      n = t.split("/");
    r.pop();
    for (let i = 0; i < n.length; i++) {
      if (n[i] === ".") continue;
      if (n[i] === "..") r.pop();
      else r.push(n[i]);
    }
    return r.join("/");
  }
  static isAbsoluteURL(e) {
    return this.PROTOCOL_REGEXP.test(e);
  }
  static isRelativePath(e) {
    return !/^(?:[a-zA-Z]+:)?\//.test(e);
  }
}
c1.DEFAULT_INIT = {};
c1.PROTOCOL_REGEXP = /^[a-zA-Z]+:\/\//;
function IF(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Vf(e) {
  if (IF(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0) return !0;
  let r = t.prototype;
  if (IF(r) === !1) return !1;
  if (Object.hasOwn(r, "isPrototypeOf") === !1) return !1;
  return !0;
}
var Y5, X5;
(function (e) {
  ((e[(e.SILENT = 4)] = "SILENT"),
    (e[(e.ERROR = 3)] = "ERROR"),
    (e[(e.WARN = 2)] = "WARN"),
    (e[(e.INFO = 1)] = "INFO"),
    (e[(e.DEBUG = 0)] = "DEBUG"));
})(X5 || (X5 = {}));
class rl {
  constructor(e) {
    ((this.verbosity = void 0), (this.verbosity = e));
  }
  debug(e) {
    if (this.verbosity <= rl.Verbosity.DEBUG);
  }
  info(e) {
    if (this.verbosity <= rl.Verbosity.INFO);
  }
  warn(e) {
    if (this.verbosity <= rl.Verbosity.WARN);
  }
  error(e) {
    if (this.verbosity <= rl.Verbosity.ERROR);
  }
}
Y5 = rl;
rl.Verbosity = X5;
rl.DEFAULT_INSTANCE = new Y5(Y5.Verbosity.INFO);
function vZ(e) {
  var t = e[0],
    r = e[1],
    n = e[2],
    i = e[3],
    o = e[4],
    s = e[5],
    a = e[6],
    l = e[7],
    c = e[8],
    u = e[9],
    d = e[10],
    h = e[11],
    f = e[12],
    p = e[13],
    g = e[14],
    m = e[15],
    A = t * s - r * o,
    y = t * a - n * o,
    x = t * l - i * o,
    b = r * a - n * s,
    v = r * l - i * s,
    _ = n * l - i * a,
    w = c * p - u * f,
    S = c * g - d * f,
    E = c * m - h * f,
    T = u * g - d * p,
    M = u * m - h * p,
    C = d * m - h * g;
  return A * C - y * M + x * T + b * E - v * S + _ * w;
}
function CZ(e, t, r) {
  var n = t[0],
    i = t[1],
    o = t[2],
    s = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    u = t[7],
    d = t[8],
    h = t[9],
    f = t[10],
    p = t[11],
    g = t[12],
    m = t[13],
    A = t[14],
    y = t[15],
    x = r[0],
    b = r[1],
    v = r[2],
    _ = r[3];
  return (
    (e[0] = x * n + b * a + v * d + _ * g),
    (e[1] = x * i + b * l + v * h + _ * m),
    (e[2] = x * o + b * c + v * f + _ * A),
    (e[3] = x * s + b * u + v * p + _ * y),
    (x = r[4]),
    (b = r[5]),
    (v = r[6]),
    (_ = r[7]),
    (e[4] = x * n + b * a + v * d + _ * g),
    (e[5] = x * i + b * l + v * h + _ * m),
    (e[6] = x * o + b * c + v * f + _ * A),
    (e[7] = x * s + b * u + v * p + _ * y),
    (x = r[8]),
    (b = r[9]),
    (v = r[10]),
    (_ = r[11]),
    (e[8] = x * n + b * a + v * d + _ * g),
    (e[9] = x * i + b * l + v * h + _ * m),
    (e[10] = x * o + b * c + v * f + _ * A),
    (e[11] = x * s + b * u + v * p + _ * y),
    (x = r[12]),
    (b = r[13]),
    (v = r[14]),
    (_ = r[15]),
    (e[12] = x * n + b * a + v * d + _ * g),
    (e[13] = x * i + b * l + v * h + _ * m),
    (e[14] = x * o + b * c + v * f + _ * A),
    (e[15] = x * s + b * u + v * p + _ * y),
    e
  );
}
function wZ(e, t) {
  var r = t[0],
    n = t[1],
    i = t[2],
    o = t[4],
    s = t[5],
    a = t[6],
    l = t[8],
    c = t[9],
    u = t[10];
  return (
    (e[0] = Math.hypot(r, n, i)),
    (e[1] = Math.hypot(o, s, a)),
    (e[2] = Math.hypot(l, c, u)),
    e
  );
}
function TZ(e, t) {
  var r = new W5(3);
  wZ(r, t);
  var n = 1 / r[0],
    i = 1 / r[1],
    o = 1 / r[2],
    s = t[0] * n,
    a = t[1] * i,
    l = t[2] * o,
    c = t[4] * n,
    u = t[5] * i,
    d = t[6] * o,
    h = t[8] * n,
    f = t[9] * i,
    p = t[10] * o,
    g = s + u + p,
    m = 0;
  if (g > 0)
    ((m = Math.sqrt(g + 1) * 2),
      (e[3] = 0.25 * m),
      (e[0] = (d - f) / m),
      (e[1] = (h - l) / m),
      (e[2] = (a - c) / m));
  else if (s > u && s > p)
    ((m = Math.sqrt(1 + s - u - p) * 2),
      (e[3] = (d - f) / m),
      (e[0] = 0.25 * m),
      (e[1] = (a + c) / m),
      (e[2] = (h + l) / m));
  else if (u > p)
    ((m = Math.sqrt(1 + u - s - p) * 2),
      (e[3] = (h - l) / m),
      (e[0] = (a + c) / m),
      (e[1] = 0.25 * m),
      (e[2] = (d + f) / m));
  else
    ((m = Math.sqrt(1 + p - s - u) * 2),
      (e[3] = (a - c) / m),
      (e[0] = (h + l) / m),
      (e[1] = (d + f) / m),
      (e[2] = 0.25 * m));
  return e;
}
class gr {
  static identity(e) {
    return e;
  }
  static eq(e, t, r = 0.00001) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++) if (Math.abs(e[n] - t[n]) > r) return !1;
    return !0;
  }
  static clamp(e, t, r) {
    if (e < t) return t;
    if (e > r) return r;
    return e;
  }
  static decodeNormalizedInt(e, t) {
    switch (t) {
      case 5126:
        return e;
      case 5123:
        return e / 65535;
      case 5121:
        return e / 255;
      case 5122:
        return Math.max(e / 32767, -1);
      case 5120:
        return Math.max(e / 127, -1);
      default:
        throw Error("Invalid component type.");
    }
  }
  static encodeNormalizedInt(e, t) {
    switch (t) {
      case 5126:
        return e;
      case 5123:
        return Math.round(gr.clamp(e, 0, 1) * 65535);
      case 5121:
        return Math.round(gr.clamp(e, 0, 1) * 255);
      case 5122:
        return Math.round(gr.clamp(e, -1, 1) * 32767);
      case 5120:
        return Math.round(gr.clamp(e, -1, 1) * 127);
      default:
        throw Error("Invalid component type.");
    }
  }
  static decompose(e, t, r, n) {
    let i = V5([e[0], e[1], e[2]]),
      o = V5([e[4], e[5], e[6]]),
      s = V5([e[8], e[9], e[10]]);
    if (vZ(e) < 0) i = -i;
    ((t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]));
    let l = e.slice(),
      c = 1 / i,
      u = 1 / o,
      d = 1 / s;
    ((l[0] *= c),
      (l[1] *= c),
      (l[2] *= c),
      (l[4] *= u),
      (l[5] *= u),
      (l[6] *= u),
      (l[8] *= d),
      (l[9] *= d),
      (l[10] *= d),
      TZ(r, l),
      (n[0] = i),
      (n[1] = o),
      (n[2] = s));
  }
  static compose(e, t, r, n) {
    let i = n,
      o = t[0],
      s = t[1],
      a = t[2],
      l = t[3],
      c = o + o,
      u = s + s,
      d = a + a,
      h = o * c,
      f = o * u,
      p = o * d,
      g = s * u,
      m = s * d,
      A = a * d,
      y = l * c,
      x = l * u,
      b = l * d,
      v = r[0],
      _ = r[1],
      w = r[2];
    return (
      (i[0] = (1 - (g + A)) * v),
      (i[1] = (f + b) * v),
      (i[2] = (p - x) * v),
      (i[3] = 0),
      (i[4] = (f - b) * _),
      (i[5] = (1 - (h + A)) * _),
      (i[6] = (m + y) * _),
      (i[7] = 0),
      (i[8] = (p + x) * w),
      (i[9] = (m - y) * w),
      (i[10] = (1 - (h + g)) * w),
      (i[11] = 0),
      (i[12] = e[0]),
      (i[13] = e[1]),
      (i[14] = e[2]),
      (i[15] = 1),
      i
    );
  }
}
function EZ(e, t) {
  if (!!e !== !!t) return !1;
  let r = e.getChild(),
    n = t.getChild();
  return r === n || r.equals(n);
}
function SZ(e, t) {
  if (!!e !== !!t) return !1;
  let r = e.values(),
    n = t.values();
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++) {
    let o = r[i],
      s = n[i];
    if (o.getChild() === s.getChild()) continue;
    if (!o.getChild().equals(s.getChild())) return !1;
  }
  return !0;
}
function MZ(e, t) {
  if (!!e !== !!t) return !1;
  let r = e.keys(),
    n = t.keys();
  if (r.length !== n.length) return !1;
  for (let i of r) {
    let o = e.get(i),
      s = t.get(i);
    if (!!o !== !!s) return !1;
    let a = o.getChild(),
      l = s.getChild();
    if (a === l) continue;
    if (!a.equals(l)) return !1;
  }
  return !0;
}
function PF(e, t) {
  if (e === t) return !0;
  if (!!e !== !!t || !e || !t) return !1;
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
  return !0;
}
function kF(e, t) {
  if (e === t) return !0;
  if (!!e !== !!t) return !1;
  if (!Vf(e) || !Vf(t)) return e === t;
  let r = e,
    n = t,
    i = 0,
    o = 0,
    s;
  for (s in r) i++;
  for (s in n) o++;
  if (i !== o) return !1;
  for (s in r) {
    let a = r[s],
      l = n[s];
    if (ub(a) && ub(l)) {
      if (!PF(a, l)) return !1;
    } else if (Vf(a) && Vf(l)) {
      if (!kF(a, l)) return !1;
    } else if (a !== l) return !1;
  }
  return !0;
}
function ub(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e);
}
var RF = "23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ",
  IZ = 999,
  RZ = 6,
  OF = /*@__PURE__*/ new Set(),
  OZ = function () {
    let t = "";
    for (let r = 0; r < RZ; r++) t += RF.charAt(Math.floor(Math.random() * RF.length));
    return t;
  },
  UF = function () {
    for (let t = 0; t < IZ; t++) {
      let r = OZ();
      if (!OF.has(r)) return (OF.add(r), r);
    }
    return "";
  },
  Gd = (e) => e,
  LZ = /*@__PURE__*/ new Set();
class fb extends nb {
  constructor(e, t = "") {
    super(e);
    ((this[mn].name = t), this.init(), this.dispatchEvent({ type: "create" }));
  }
  getGraph() {
    return this.graph;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { name: "", extras: {} });
  }
  set(e, t) {
    if (Array.isArray(t)) t = t.slice();
    return super.set(e, t);
  }
  getName() {
    return this.get("name");
  }
  setName(e) {
    return this.set("name", e);
  }
  getExtras() {
    return this.get("extras");
  }
  setExtras(e) {
    return this.set("extras", e);
  }
  clone() {
    return new this.constructor(this.graph).copy(this, Gd);
  }
  copy(e, t = Gd) {
    for (let r in this[mn]) {
      let n = this[mn][r];
      if (n instanceof yu) {
        if (!this[kd].has(r)) n.dispose();
      } else if (n instanceof Vl || n instanceof wn) for (let i of n.values()) i.dispose();
      else if (n instanceof Ts) for (let i of n.values()) i.dispose();
    }
    for (let r in e[mn]) {
      let n = this[mn][r],
        i = e[mn][r];
      if (i instanceof yu)
        if (this[kd].has(r)) n.getChild().copy(t(i.getChild()), t);
        else this.setRef(r, t(i.getChild()), i.getAttributes());
      else if (i instanceof wn || i instanceof Vl)
        for (let o of i.values()) this.addRef(r, t(o.getChild()), o.getAttributes());
      else if (i instanceof Ts)
        for (let o of i.keys()) {
          let s = i.get(o);
          this.setRefMap(r, o, t(s.getChild()), s.getAttributes());
        }
      else if (Vf(i)) this[mn][r] = JSON.parse(JSON.stringify(i));
      else if (Array.isArray(i) || i instanceof ArrayBuffer || ArrayBuffer.isView(i))
        this[mn][r] = i.slice();
      else this[mn][r] = i;
    }
    return this;
  }
  equals(e, t = LZ) {
    if (this === e) return !0;
    if (this.propertyType !== e.propertyType) return !1;
    for (let r in this[mn]) {
      if (t.has(r)) continue;
      let n = this[mn][r],
        i = e[mn][r];
      if (n instanceof yu || i instanceof yu) {
        if (!EZ(n, i)) return !1;
      } else if (n instanceof wn || i instanceof wn || n instanceof Vl || i instanceof Vl) {
        if (!SZ(n, i)) return !1;
      } else if (n instanceof Ts || i instanceof Ts) {
        if (!MZ(n, i)) return !1;
      } else if (Vf(n) || Vf(i)) {
        if (!kF(n, i)) return !1;
      } else if (ub(n) || ub(i)) {
        if (!PF(n, i)) return !1;
      } else if (n !== i) return !1;
    }
    return !0;
  }
  detach() {
    return (this.graph.disconnectParents(this, (e) => e.propertyType !== "Root"), this);
  }
  listParents() {
    return this.graph.listParents(this);
  }
}
class os extends fb {
  getDefaults() {
    return Object.assign(super.getDefaults(), { extensions: new Ts() });
  }
  getExtension(e) {
    return this.getRefMap("extensions", e);
  }
  setExtension(e, t) {
    if (t) t._validateParent(this);
    return this.setRefMap("extensions", e, t);
  }
  listExtensions() {
    return this.listRefMapValues("extensions");
  }
}
class St extends os {
  init() {
    this.propertyType = Ie.ACCESSOR;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      array: null,
      type: St.Type.SCALAR,
      componentType: St.ComponentType.FLOAT,
      normalized: !1,
      sparse: !1,
      buffer: null,
    });
  }
  static getElementSize(e) {
    switch (e) {
      case St.Type.SCALAR:
        return 1;
      case St.Type.VEC2:
        return 2;
      case St.Type.VEC3:
        return 3;
      case St.Type.VEC4:
        return 4;
      case St.Type.MAT2:
        return 4;
      case St.Type.MAT3:
        return 9;
      case St.Type.MAT4:
        return 16;
      default:
        throw Error("Unexpected type: " + e);
    }
  }
  static getComponentSize(e) {
    switch (e) {
      case St.ComponentType.BYTE:
        return 1;
      case St.ComponentType.UNSIGNED_BYTE:
        return 1;
      case St.ComponentType.SHORT:
        return 2;
      case St.ComponentType.UNSIGNED_SHORT:
        return 2;
      case St.ComponentType.UNSIGNED_INT:
        return 4;
      case St.ComponentType.FLOAT:
        return 4;
      default:
        throw Error("Unexpected component type: " + e);
    }
  }
  getMinNormalized(e) {
    let t = this.getNormalized(),
      r = this.getElementSize(),
      n = this.getComponentType();
    if ((this.getMin(e), t)) for (let i = 0; i < r; i++) e[i] = gr.decodeNormalizedInt(e[i], n);
    return e;
  }
  getMin(e) {
    let t = this.getArray(),
      r = this.getCount(),
      n = this.getElementSize();
    for (let i = 0; i < n; i++) e[i] = 1 / 0;
    for (let i = 0; i < r * n; i += n)
      for (let o = 0; o < n; o++) {
        let s = t[i + o];
        if (Number.isFinite(s)) e[o] = Math.min(e[o], s);
      }
    return e;
  }
  getMaxNormalized(e) {
    let t = this.getNormalized(),
      r = this.getElementSize(),
      n = this.getComponentType();
    if ((this.getMax(e), t)) for (let i = 0; i < r; i++) e[i] = gr.decodeNormalizedInt(e[i], n);
    return e;
  }
  getMax(e) {
    let t = this.get("array"),
      r = this.getCount(),
      n = this.getElementSize();
    for (let i = 0; i < n; i++) e[i] = -1 / 0;
    for (let i = 0; i < r * n; i += n)
      for (let o = 0; o < n; o++) {
        let s = t[i + o];
        if (Number.isFinite(s)) e[o] = Math.max(e[o], s);
      }
    return e;
  }
  getCount() {
    let e = this.get("array");
    return e ? e.length / this.getElementSize() : 0;
  }
  getType() {
    return this.get("type");
  }
  setType(e) {
    return this.set("type", e);
  }
  getElementSize() {
    return St.getElementSize(this.get("type"));
  }
  getComponentSize() {
    return this.get("array").BYTES_PER_ELEMENT;
  }
  getComponentType() {
    return this.get("componentType");
  }
  getNormalized() {
    return this.get("normalized");
  }
  setNormalized(e) {
    return this.set("normalized", e);
  }
  getScalar(e) {
    let t = this.getElementSize(),
      r = this.getComponentType(),
      n = this.getArray();
    if (this.getNormalized()) return gr.decodeNormalizedInt(n[e * t], r);
    return n[e * t];
  }
  setScalar(e, t) {
    let r = this.getElementSize(),
      n = this.getComponentType(),
      i = this.getArray();
    if (this.getNormalized()) i[e * r] = gr.encodeNormalizedInt(t, n);
    else i[e * r] = t;
    return this;
  }
  getElement(e, t) {
    let r = this.getNormalized(),
      n = this.getElementSize(),
      i = this.getComponentType(),
      o = this.getArray();
    for (let s = 0; s < n; s++)
      if (r) t[s] = gr.decodeNormalizedInt(o[e * n + s], i);
      else t[s] = o[e * n + s];
    return t;
  }
  setElement(e, t) {
    let r = this.getNormalized(),
      n = this.getElementSize(),
      i = this.getComponentType(),
      o = this.getArray();
    for (let s = 0; s < n; s++)
      if (r) o[e * n + s] = gr.encodeNormalizedInt(t[s], i);
      else o[e * n + s] = t[s];
    return this;
  }
  getSparse() {
    return this.get("sparse");
  }
  setSparse(e) {
    return this.set("sparse", e);
  }
  getBuffer() {
    return this.getRef("buffer");
  }
  setBuffer(e) {
    return this.setRef("buffer", e);
  }
  getArray() {
    return this.get("array");
  }
  setArray(e) {
    return (
      this.set("componentType", e ? BZ(e) : St.ComponentType.FLOAT),
      this.set("array", e),
      this
    );
  }
  getByteLength() {
    let e = this.get("array");
    return e ? e.byteLength : 0;
  }
}
St.Type = {
  SCALAR: "SCALAR",
  VEC2: "VEC2",
  VEC3: "VEC3",
  VEC4: "VEC4",
  MAT2: "MAT2",
  MAT3: "MAT3",
  MAT4: "MAT4",
};
St.ComponentType = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
};
function BZ(e) {
  switch (e.constructor) {
    case Float32Array:
      return St.ComponentType.FLOAT;
    case Uint32Array:
      return St.ComponentType.UNSIGNED_INT;
    case Uint16Array:
      return St.ComponentType.UNSIGNED_SHORT;
    case Uint8Array:
      return St.ComponentType.UNSIGNED_BYTE;
    case Int16Array:
      return St.ComponentType.SHORT;
    case Int8Array:
      return St.ComponentType.BYTE;
    default:
      throw Error("Unknown accessor componentType.");
  }
}
class q5 extends os {
  init() {
    this.propertyType = Ie.ANIMATION;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { channels: new wn(), samplers: new wn() });
  }
  addChannel(e) {
    return this.addRef("channels", e);
  }
  removeChannel(e) {
    return this.removeRef("channels", e);
  }
  listChannels() {
    return this.listRefs("channels");
  }
  addSampler(e) {
    return this.addRef("samplers", e);
  }
  removeSampler(e) {
    return this.removeRef("samplers", e);
  }
  listSamplers() {
    return this.listRefs("samplers");
  }
}
class Qf extends os {
  init() {
    this.propertyType = Ie.ANIMATION_CHANNEL;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      targetPath: null,
      targetNode: null,
      sampler: null,
    });
  }
  getTargetPath() {
    return this.get("targetPath");
  }
  setTargetPath(e) {
    return this.set("targetPath", e);
  }
  getTargetNode() {
    return this.getRef("targetNode");
  }
  setTargetNode(e) {
    return this.setRef("targetNode", e);
  }
  getSampler() {
    return this.getRef("sampler");
  }
  setSampler(e) {
    return this.setRef("sampler", e);
  }
}
Qf.TargetPath = {
  TRANSLATION: "translation",
  ROTATION: "rotation",
  SCALE: "scale",
  WEIGHTS: "weights",
};
class Wd extends os {
  init() {
    this.propertyType = Ie.ANIMATION_SAMPLER;
  }
  getDefaultAttributes() {
    return Object.assign(super.getDefaults(), {
      interpolation: Wd.Interpolation.LINEAR,
      input: null,
      output: null,
    });
  }
  getInterpolation() {
    return this.get("interpolation");
  }
  setInterpolation(e) {
    return this.set("interpolation", e);
  }
  getInput() {
    return this.getRef("input");
  }
  setInput(e) {
    return this.setRef("input", e, { usage: Sa.OTHER });
  }
  getOutput() {
    return this.getRef("output");
  }
  setOutput(e) {
    return this.setRef("output", e, { usage: Sa.OTHER });
  }
}
Wd.Interpolation = { LINEAR: "LINEAR", STEP: "STEP", CUBICSPLINE: "CUBICSPLINE" };
class Z5 extends os {
  init() {
    this.propertyType = Ie.BUFFER;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { uri: "" });
  }
  getURI() {
    return this.get("uri");
  }
  setURI(e) {
    return this.set("uri", e);
  }
}
class Yf extends os {
  init() {
    this.propertyType = Ie.CAMERA;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      type: Yf.Type.PERSPECTIVE,
      znear: 0.1,
      zfar: 100,
      aspectRatio: null,
      yfov: (Math.PI * 2 * 50) / 360,
      xmag: 1,
      ymag: 1,
    });
  }
  getType() {
    return this.get("type");
  }
  setType(e) {
    return this.set("type", e);
  }
  getZNear() {
    return this.get("znear");
  }
  setZNear(e) {
    return this.set("znear", e);
  }
  getZFar() {
    return this.get("zfar");
  }
  setZFar(e) {
    return this.set("zfar", e);
  }
  getAspectRatio() {
    return this.get("aspectRatio");
  }
  setAspectRatio(e) {
    return this.set("aspectRatio", e);
  }
  getYFov() {
    return this.get("yfov");
  }
  setYFov(e) {
    return this.set("yfov", e);
  }
  getXMag() {
    return this.get("xmag");
  }
  setXMag(e) {
    return this.set("xmag", e);
  }
  getYMag() {
    return this.get("ymag");
  }
  setYMag(e) {
    return this.set("ymag", e);
  }
}
Yf.Type = { PERSPECTIVE: "perspective", ORTHOGRAPHIC: "orthographic" };
class ui extends fb {
  _validateParent(e) {
    if (!this.parentTypes.includes(e.propertyType))
      throw Error(`Parent "${e.propertyType}" invalid for child "${this.propertyType}".`);
  }
}
ui.EXTENSION_NAME = void 0;
class On extends os {
  init() {
    this.propertyType = Ie.TEXTURE_INFO;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      texCoord: 0,
      magFilter: null,
      minFilter: null,
      wrapS: On.WrapMode.REPEAT,
      wrapT: On.WrapMode.REPEAT,
    });
  }
  getTexCoord() {
    return this.get("texCoord");
  }
  setTexCoord(e) {
    return this.set("texCoord", e);
  }
  getMagFilter() {
    return this.get("magFilter");
  }
  setMagFilter(e) {
    return this.set("magFilter", e);
  }
  getMinFilter() {
    return this.get("minFilter");
  }
  setMinFilter(e) {
    return this.set("minFilter", e);
  }
  getWrapS() {
    return this.get("wrapS");
  }
  setWrapS(e) {
    return this.set("wrapS", e);
  }
  getWrapT() {
    return this.get("wrapT");
  }
  setWrapT(e) {
    return this.set("wrapT", e);
  }
}
On.WrapMode = { CLAMP_TO_EDGE: 33071, MIRRORED_REPEAT: 33648, REPEAT: 10497 };
On.MagFilter = { NEAREST: 9728, LINEAR: 9729 };
On.MinFilter = {
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987,
};
var { R: ib, G: ob, B: sb, A: FZ } = ta;
class zd extends os {
  init() {
    this.propertyType = Ie.MATERIAL;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      alphaMode: zd.AlphaMode.OPAQUE,
      alphaCutoff: 0.5,
      doubleSided: !1,
      baseColorFactor: [1, 1, 1, 1],
      baseColorTexture: null,
      baseColorTextureInfo: new On(this.graph, "baseColorTextureInfo"),
      emissiveFactor: [0, 0, 0],
      emissiveTexture: null,
      emissiveTextureInfo: new On(this.graph, "emissiveTextureInfo"),
      normalScale: 1,
      normalTexture: null,
      normalTextureInfo: new On(this.graph, "normalTextureInfo"),
      occlusionStrength: 1,
      occlusionTexture: null,
      occlusionTextureInfo: new On(this.graph, "occlusionTextureInfo"),
      roughnessFactor: 1,
      metallicFactor: 1,
      metallicRoughnessTexture: null,
      metallicRoughnessTextureInfo: new On(this.graph, "metallicRoughnessTextureInfo"),
    });
  }
  getDoubleSided() {
    return this.get("doubleSided");
  }
  setDoubleSided(e) {
    return this.set("doubleSided", e);
  }
  getAlpha() {
    return this.get("baseColorFactor")[3];
  }
  setAlpha(e) {
    let t = this.get("baseColorFactor").slice();
    return ((t[3] = e), this.set("baseColorFactor", t));
  }
  getAlphaMode() {
    return this.get("alphaMode");
  }
  setAlphaMode(e) {
    return this.set("alphaMode", e);
  }
  getAlphaCutoff() {
    return this.get("alphaCutoff");
  }
  setAlphaCutoff(e) {
    return this.set("alphaCutoff", e);
  }
  getBaseColorFactor() {
    return this.get("baseColorFactor");
  }
  setBaseColorFactor(e) {
    return this.set("baseColorFactor", e);
  }
  getBaseColorTexture() {
    return this.getRef("baseColorTexture");
  }
  getBaseColorTextureInfo() {
    return this.getRef("baseColorTexture") ? this.getRef("baseColorTextureInfo") : null;
  }
  setBaseColorTexture(e) {
    return this.setRef("baseColorTexture", e, { channels: ib | ob | sb | FZ, isColor: !0 });
  }
  getEmissiveFactor() {
    return this.get("emissiveFactor");
  }
  setEmissiveFactor(e) {
    return this.set("emissiveFactor", e);
  }
  getEmissiveTexture() {
    return this.getRef("emissiveTexture");
  }
  getEmissiveTextureInfo() {
    return this.getRef("emissiveTexture") ? this.getRef("emissiveTextureInfo") : null;
  }
  setEmissiveTexture(e) {
    return this.setRef("emissiveTexture", e, { channels: ib | ob | sb, isColor: !0 });
  }
  getNormalScale() {
    return this.get("normalScale");
  }
  setNormalScale(e) {
    return this.set("normalScale", e);
  }
  getNormalTexture() {
    return this.getRef("normalTexture");
  }
  getNormalTextureInfo() {
    return this.getRef("normalTexture") ? this.getRef("normalTextureInfo") : null;
  }
  setNormalTexture(e) {
    return this.setRef("normalTexture", e, { channels: ib | ob | sb });
  }
  getOcclusionStrength() {
    return this.get("occlusionStrength");
  }
  setOcclusionStrength(e) {
    return this.set("occlusionStrength", e);
  }
  getOcclusionTexture() {
    return this.getRef("occlusionTexture");
  }
  getOcclusionTextureInfo() {
    return this.getRef("occlusionTexture") ? this.getRef("occlusionTextureInfo") : null;
  }
  setOcclusionTexture(e) {
    return this.setRef("occlusionTexture", e, { channels: ib });
  }
  getRoughnessFactor() {
    return this.get("roughnessFactor");
  }
  setRoughnessFactor(e) {
    return this.set("roughnessFactor", e);
  }
  getMetallicFactor() {
    return this.get("metallicFactor");
  }
  setMetallicFactor(e) {
    return this.set("metallicFactor", e);
  }
  getMetallicRoughnessTexture() {
    return this.getRef("metallicRoughnessTexture");
  }
  getMetallicRoughnessTextureInfo() {
    return this.getRef("metallicRoughnessTexture")
      ? this.getRef("metallicRoughnessTextureInfo")
      : null;
  }
  setMetallicRoughnessTexture(e) {
    return this.setRef("metallicRoughnessTexture", e, { channels: ob | sb });
  }
}
zd.AlphaMode = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
class qg extends os {
  init() {
    this.propertyType = Ie.MESH;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { weights: [], primitives: new wn() });
  }
  addPrimitive(e) {
    return this.addRef("primitives", e);
  }
  removePrimitive(e) {
    return this.removeRef("primitives", e);
  }
  listPrimitives() {
    return this.listRefs("primitives");
  }
  getWeights() {
    return this.get("weights");
  }
  setWeights(e) {
    return this.set("weights", e);
  }
}
class pb extends os {
  init() {
    this.propertyType = Ie.NODE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      translation: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
      weights: [],
      camera: null,
      mesh: null,
      skin: null,
      children: new wn(),
    });
  }
  copy(e, t = Gd) {
    if (t === Gd) throw Error("Node cannot be copied.");
    return super.copy(e, t);
  }
  getTranslation() {
    return this.get("translation");
  }
  getRotation() {
    return this.get("rotation");
  }
  getScale() {
    return this.get("scale");
  }
  setTranslation(e) {
    return this.set("translation", e);
  }
  setRotation(e) {
    return this.set("rotation", e);
  }
  setScale(e) {
    return this.set("scale", e);
  }
  getMatrix() {
    return gr.compose(this.get("translation"), this.get("rotation"), this.get("scale"), []);
  }
  setMatrix(e) {
    let t = this.get("translation").slice(),
      r = this.get("rotation").slice(),
      n = this.get("scale").slice();
    return (
      gr.decompose(e, t, r, n),
      this.set("translation", t).set("rotation", r).set("scale", n)
    );
  }
  getWorldTranslation() {
    let e = [0, 0, 0];
    return (gr.decompose(this.getWorldMatrix(), e, [0, 0, 0, 1], [1, 1, 1]), e);
  }
  getWorldRotation() {
    let e = [0, 0, 0, 1];
    return (gr.decompose(this.getWorldMatrix(), [0, 0, 0], e, [1, 1, 1]), e);
  }
  getWorldScale() {
    let e = [1, 1, 1];
    return (gr.decompose(this.getWorldMatrix(), [0, 0, 0], [0, 0, 0, 1], e), e);
  }
  getWorldMatrix() {
    let e = [];
    for (let n = this; n != null; n = n.getParentNode()) e.push(n);
    let t,
      r = e.pop().getMatrix();
    while ((t = e.pop())) CZ(r, r, t.getMatrix());
    return r;
  }
  addChild(e) {
    let t = e.getParentNode();
    if (t) t.removeChild(e);
    for (let r of e.listParents()) if (r.propertyType === Ie.SCENE) r.removeChild(e);
    return this.addRef("children", e);
  }
  removeChild(e) {
    return this.removeRef("children", e);
  }
  listChildren() {
    return this.listRefs("children");
  }
  getParentNode() {
    for (let e of this.listParents()) if (e.propertyType === Ie.NODE) return e;
    return null;
  }
  getMesh() {
    return this.getRef("mesh");
  }
  setMesh(e) {
    return this.setRef("mesh", e);
  }
  getCamera() {
    return this.getRef("camera");
  }
  setCamera(e) {
    return this.setRef("camera", e);
  }
  getSkin() {
    return this.getRef("skin");
  }
  setSkin(e) {
    return this.setRef("skin", e);
  }
  getWeights() {
    return this.get("weights");
  }
  setWeights(e) {
    return this.set("weights", e);
  }
  traverse(e) {
    e(this);
    for (let t of this.listChildren()) t.traverse(e);
    return this;
  }
}
class Wo extends os {
  init() {
    this.propertyType = Ie.PRIMITIVE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      mode: Wo.Mode.TRIANGLES,
      material: null,
      indices: null,
      attributes: new Ts(),
      targets: new wn(),
    });
  }
  getIndices() {
    return this.getRef("indices");
  }
  setIndices(e) {
    return this.setRef("indices", e, { usage: Sa.ELEMENT_ARRAY_BUFFER });
  }
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, { usage: Sa.ARRAY_BUFFER });
  }
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
  getMaterial() {
    return this.getRef("material");
  }
  setMaterial(e) {
    return this.setRef("material", e);
  }
  getMode() {
    return this.get("mode");
  }
  setMode(e) {
    return this.set("mode", e);
  }
  listTargets() {
    return this.listRefs("targets");
  }
  addTarget(e) {
    return this.addRef("targets", e);
  }
  removeTarget(e) {
    return this.removeRef("targets", e);
  }
}
Wo.Mode = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
};
class $5 extends fb {
  init() {
    this.propertyType = Ie.PRIMITIVE_TARGET;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { attributes: new Ts() });
  }
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, { usage: Sa.ARRAY_BUFFER });
  }
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
}
function Es() {
  return (
    (Es = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Es.apply(null, arguments)
  );
}
class mb extends os {
  init() {
    this.propertyType = Ie.SCENE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { children: new wn() });
  }
  copy(e, t = Gd) {
    if (t === Gd) throw Error("Scene cannot be copied.");
    return super.copy(e, t);
  }
  addChild(e) {
    let t = e.getParentNode();
    if (t) t.removeChild(e);
    return this.addRef("children", e);
  }
  removeChild(e) {
    return this.removeRef("children", e);
  }
  listChildren() {
    return this.listRefs("children");
  }
  traverse(e) {
    for (let t of this.listChildren()) t.traverse(e);
    return this;
  }
}
class J5 extends os {
  init() {
    this.propertyType = Ie.SKIN;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      skeleton: null,
      inverseBindMatrices: null,
      joints: new wn(),
    });
  }
  getSkeleton() {
    return this.getRef("skeleton");
  }
  setSkeleton(e) {
    return this.setRef("skeleton", e);
  }
  getInverseBindMatrices() {
    return this.getRef("inverseBindMatrices");
  }
  setInverseBindMatrices(e) {
    return this.setRef("inverseBindMatrices", e, { usage: Sa.INVERSE_BIND_MATRICES });
  }
  addJoint(e) {
    return this.addRef("joints", e);
  }
  removeJoint(e) {
    return this.removeRef("joints", e);
  }
  listJoints() {
    return this.listRefs("joints");
  }
}
class gb extends os {
  init() {
    this.propertyType = Ie.TEXTURE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { image: null, mimeType: "", uri: "" });
  }
  getMimeType() {
    return this.get("mimeType") || Ea.extensionToMimeType(Hd.extension(this.get("uri")));
  }
  setMimeType(e) {
    return this.set("mimeType", e);
  }
  getURI() {
    return this.get("uri");
  }
  setURI(e) {
    this.set("uri", e);
    let t = Ea.extensionToMimeType(Hd.extension(e));
    if (t) this.set("mimeType", t);
    return this;
  }
  getImage() {
    return this.get("image");
  }
  setImage(e) {
    return this.set("image", rr.assertView(e));
  }
  getSize() {
    let e = this.get("image");
    if (!e) return null;
    return Ea.getSize(e, this.getMimeType());
  }
}
class Qd extends os {
  init() {
    this.propertyType = Ie.ROOT;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      asset: { generator: `glTF-Transform ${FF}`, version: "2.0" },
      defaultScene: null,
      accessors: new wn(),
      animations: new wn(),
      buffers: new wn(),
      cameras: new wn(),
      materials: new wn(),
      meshes: new wn(),
      nodes: new wn(),
      scenes: new wn(),
      skins: new wn(),
      textures: new wn(),
    });
  }
  constructor(e) {
    super(e);
    ((this._extensions = /*@__PURE__*/ new Set()),
      e.addEventListener("node:create", (t) => {
        this._addChildOfRoot(t.target);
      }));
  }
  clone() {
    throw Error("Root cannot be cloned.");
  }
  copy(e, t = Gd) {
    if (t === Gd) throw Error("Root cannot be copied.");
    (this.set("asset", Es({}, e.get("asset"))),
      this.setName(e.getName()),
      this.setExtras(Es({}, e.getExtras())),
      this.setDefaultScene(e.getDefaultScene() ? t(e.getDefaultScene()) : null));
    for (let r of e.listRefMapKeys("extensions")) {
      let n = e.getExtension(r);
      this.setExtension(r, t(n));
    }
    return this;
  }
  _addChildOfRoot(e) {
    if (e instanceof mb) this.addRef("scenes", e);
    else if (e instanceof pb) this.addRef("nodes", e);
    else if (e instanceof Yf) this.addRef("cameras", e);
    else if (e instanceof J5) this.addRef("skins", e);
    else if (e instanceof qg) this.addRef("meshes", e);
    else if (e instanceof zd) this.addRef("materials", e);
    else if (e instanceof gb) this.addRef("textures", e);
    else if (e instanceof q5) this.addRef("animations", e);
    else if (e instanceof St) this.addRef("accessors", e);
    else if (e instanceof Z5) this.addRef("buffers", e);
    return this;
  }
  getAsset() {
    return this.get("asset");
  }
  listExtensionsUsed() {
    return Array.from(this._extensions);
  }
  listExtensionsRequired() {
    return this.listExtensionsUsed().filter((e) => e.isRequired());
  }
  _enableExtension(e) {
    return (this._extensions.add(e), this);
  }
  _disableExtension(e) {
    return (this._extensions.delete(e), this);
  }
  listScenes() {
    return this.listRefs("scenes");
  }
  setDefaultScene(e) {
    return this.setRef("defaultScene", e);
  }
  getDefaultScene() {
    return this.getRef("defaultScene");
  }
  listNodes() {
    return this.listRefs("nodes");
  }
  listCameras() {
    return this.listRefs("cameras");
  }
  listSkins() {
    return this.listRefs("skins");
  }
  listMeshes() {
    return this.listRefs("meshes");
  }
  listMaterials() {
    return this.listRefs("materials");
  }
  listTextures() {
    return this.listRefs("textures");
  }
  listAnimations() {
    return this.listRefs("animations");
  }
  listAccessors() {
    return this.listRefs("accessors");
  }
  listBuffers() {
    return this.listRefs("buffers");
  }
}
class Vd {
  static fromGraph(e) {
    return Vd._GRAPH_DOCUMENTS.get(e) || null;
  }
  constructor() {
    ((this._graph = new rb()),
      (this._root = new Qd(this._graph)),
      (this._logger = rl.DEFAULT_INSTANCE),
      Vd._GRAPH_DOCUMENTS.set(this._graph, this));
  }
  getRoot() {
    return this._root;
  }
  getGraph() {
    return this._graph;
  }
  getLogger() {
    return this._logger;
  }
  setLogger(e) {
    return ((this._logger = e), this);
  }
  clone() {
    throw Error("Use 'cloneDocument(source)' from '@gltf-transform/functions'.");
  }
  merge(e) {
    throw Error("Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.");
  }
  async transform(...e) {
    let t = e.map((r) => r.name);
    for (let r of e) await r(this, { stack: t });
    return this;
  }
  createExtension(e) {
    let t = e.EXTENSION_NAME;
    return (
      this.getRoot()
        .listExtensionsUsed()
        .find((n) => n.extensionName === t) || new e(this)
    );
  }
  createScene(e = "") {
    return new mb(this._graph, e);
  }
  createNode(e = "") {
    return new pb(this._graph, e);
  }
  createCamera(e = "") {
    return new Yf(this._graph, e);
  }
  createSkin(e = "") {
    return new J5(this._graph, e);
  }
  createMesh(e = "") {
    return new qg(this._graph, e);
  }
  createPrimitive() {
    return new Wo(this._graph);
  }
  createPrimitiveTarget(e = "") {
    return new $5(this._graph, e);
  }
  createMaterial(e = "") {
    return new zd(this._graph, e);
  }
  createTexture(e = "") {
    return new gb(this._graph, e);
  }
  createAnimation(e = "") {
    return new q5(this._graph, e);
  }
  createAnimationChannel(e = "") {
    return new Qf(this._graph, e);
  }
  createAnimationSampler(e = "") {
    return new Wd(this._graph, e);
  }
  createAccessor(e = "", t = null) {
    if (!t) t = this.getRoot().listBuffers()[0];
    return new St(this._graph, e).setBuffer(t);
  }
  createBuffer(e = "") {
    return new Z5(this._graph, e);
  }
}
Vd._GRAPH_DOCUMENTS = /*@__PURE__*/ new WeakMap();
class Zn {
  constructor(e) {
    ((this.extensionName = ""),
      (this.prereadTypes = []),
      (this.prewriteTypes = []),
      (this.readDependencies = []),
      (this.writeDependencies = []),
      (this.document = void 0),
      (this.required = !1),
      (this.properties = /*@__PURE__*/ new Set()),
      (this._listener = void 0),
      (this.document = e),
      e.getRoot()._enableExtension(this),
      (this._listener = (r) => {
        let n = r,
          i = n.target;
        if (i instanceof ui && i.extensionName === this.extensionName) {
          if (n.type === "node:create") this._addExtensionProperty(i);
          if (n.type === "node:dispose") this._removeExtensionProperty(i);
        }
      }));
    let t = e.getGraph();
    (t.addEventListener("node:create", this._listener),
      t.addEventListener("node:dispose", this._listener));
  }
  dispose() {
    this.document.getRoot()._disableExtension(this);
    let e = this.document.getGraph();
    (e.removeEventListener("node:create", this._listener),
      e.removeEventListener("node:dispose", this._listener));
    for (let t of this.properties) t.dispose();
  }
  static register() {}
  isRequired() {
    return this.required;
  }
  setRequired(e) {
    return ((this.required = e), this);
  }
  listProperties() {
    return Array.from(this.properties);
  }
  _addExtensionProperty(e) {
    return (this.properties.add(e), this);
  }
  _removeExtensionProperty(e) {
    return (this.properties.delete(e), this);
  }
  install(e, t) {
    return this;
  }
  preread(e, t) {
    return this;
  }
  prewrite(e, t) {
    return this;
  }
}
Zn.EXTENSION_NAME = void 0;
class HF {
  constructor(e) {
    ((this.jsonDoc = void 0),
      (this.buffers = []),
      (this.bufferViews = []),
      (this.bufferViewBuffers = []),
      (this.accessors = []),
      (this.textures = []),
      (this.textureInfos = /*@__PURE__*/ new Map()),
      (this.materials = []),
      (this.meshes = []),
      (this.cameras = []),
      (this.nodes = []),
      (this.skins = []),
      (this.animations = []),
      (this.scenes = []),
      (this.jsonDoc = e));
  }
  setTextureInfo(e, t) {
    if ((this.textureInfos.set(e, t), t.texCoord !== void 0)) e.setTexCoord(t.texCoord);
    if (t.extras !== void 0) e.setExtras(t.extras);
    let r = this.jsonDoc.json.textures[t.index];
    if (r.sampler === void 0) return;
    let n = this.jsonDoc.json.samplers[r.sampler];
    if (n.magFilter !== void 0) e.setMagFilter(n.magFilter);
    if (n.minFilter !== void 0) e.setMinFilter(n.minFilter);
    if (n.wrapS !== void 0) e.setWrapS(n.wrapS);
    if (n.wrapT !== void 0) e.setWrapT(n.wrapT);
  }
}
var LF = { logger: rl.DEFAULT_INSTANCE, extensions: [], dependencies: {} },
  DZ = /*@__PURE__*/ new Set([
    Ie.BUFFER,
    Ie.TEXTURE,
    Ie.MATERIAL,
    Ie.MESH,
    Ie.PRIMITIVE,
    Ie.NODE,
    Ie.SCENE,
  ]);
class GF {
  static read(e, t = LF) {
    let r = Es({}, LF, t),
      { json: n } = e,
      i = new Vd().setLogger(r.logger);
    this.validate(e, r);
    let o = new HF(e),
      s = n.asset,
      a = i.getRoot().getAsset();
    if (s.copyright) a.copyright = s.copyright;
    if (s.extras) a.extras = s.extras;
    if (n.extras !== void 0) i.getRoot().setExtras(Es({}, n.extras));
    let l = n.extensionsUsed || [],
      c = n.extensionsRequired || [];
    r.extensions.sort((_, w) => (_.EXTENSION_NAME > w.EXTENSION_NAME ? 1 : -1));
    for (let _ of r.extensions)
      if (l.includes(_.EXTENSION_NAME)) {
        let w = i.createExtension(_).setRequired(c.includes(_.EXTENSION_NAME)),
          S = w.prereadTypes.filter((E) => !DZ.has(E));
        if (S.length)
          r.logger.warn(
            `Preread hooks for some types (${S.join()}), requested by extension ${w.extensionName}, are unsupported. Please file an issue or a PR.`,
          );
        for (let E of w.readDependencies) w.install(E, r.dependencies[E]);
      }
    let u = n.buffers || [];
    (i
      .getRoot()
      .listExtensionsUsed()
      .filter((_) => _.prereadTypes.includes(Ie.BUFFER))
      .forEach((_) => _.preread(o, Ie.BUFFER)),
      (o.buffers = u.map((_) => {
        let w = i.createBuffer(_.name);
        if (_.extras) w.setExtras(_.extras);
        if (_.uri && _.uri.indexOf("__") !== 0) w.setURI(_.uri);
        return w;
      })));
    let d = n.bufferViews || [];
    o.bufferViewBuffers = d.map((_, w) => {
      if (!o.bufferViews[w]) {
        let S = e.json.buffers[_.buffer],
          E = S.uri ? e.resources[S.uri] : e.resources[Wf],
          T = _.byteOffset || 0;
        o.bufferViews[w] = rr.toView(E, T, _.byteLength);
      }
      return o.buffers[_.buffer];
    });
    let h = n.accessors || [];
    o.accessors = h.map((_) => {
      let w = o.bufferViewBuffers[_.bufferView],
        S = i.createAccessor(_.name, w).setType(_.type);
      if (_.extras) S.setExtras(_.extras);
      if (_.normalized !== void 0) S.setNormalized(_.normalized);
      if (_.bufferView === void 0) return S;
      return (S.setArray(lb(_, o)), S);
    });
    let f = n.images || [],
      p = n.textures || [];
    (i
      .getRoot()
      .listExtensionsUsed()
      .filter((_) => _.prereadTypes.includes(Ie.TEXTURE))
      .forEach((_) => _.preread(o, Ie.TEXTURE)),
      (o.textures = f.map((_) => {
        let w = i.createTexture(_.name);
        if (_.extras) w.setExtras(_.extras);
        if (_.bufferView !== void 0) {
          let S = n.bufferViews[_.bufferView],
            E = e.json.buffers[S.buffer],
            T = E.uri ? e.resources[E.uri] : e.resources[Wf],
            M = S.byteOffset || 0,
            C = S.byteLength,
            R = T.slice(M, M + C);
          w.setImage(R);
        } else if (_.uri !== void 0) {
          if ((w.setImage(e.resources[_.uri]), _.uri.indexOf("__") !== 0)) w.setURI(_.uri);
        }
        if (_.mimeType !== void 0) w.setMimeType(_.mimeType);
        else if (_.uri) {
          let S = Hd.extension(_.uri);
          w.setMimeType(Ea.extensionToMimeType(S));
        }
        return w;
      })),
      i
        .getRoot()
        .listExtensionsUsed()
        .filter((_) => _.prereadTypes.includes(Ie.MATERIAL))
        .forEach((_) => _.preread(o, Ie.MATERIAL)));
    let g = n.materials || [];
    ((o.materials = g.map((_) => {
      let w = i.createMaterial(_.name);
      if (_.extras) w.setExtras(_.extras);
      if (_.alphaMode !== void 0) w.setAlphaMode(_.alphaMode);
      if (_.alphaCutoff !== void 0) w.setAlphaCutoff(_.alphaCutoff);
      if (_.doubleSided !== void 0) w.setDoubleSided(_.doubleSided);
      let S = _.pbrMetallicRoughness || {};
      if (S.baseColorFactor !== void 0) w.setBaseColorFactor(S.baseColorFactor);
      if (_.emissiveFactor !== void 0) w.setEmissiveFactor(_.emissiveFactor);
      if (S.metallicFactor !== void 0) w.setMetallicFactor(S.metallicFactor);
      if (S.roughnessFactor !== void 0) w.setRoughnessFactor(S.roughnessFactor);
      if (S.baseColorTexture !== void 0) {
        let E = S.baseColorTexture,
          T = o.textures[p[E.index].source];
        (w.setBaseColorTexture(T), o.setTextureInfo(w.getBaseColorTextureInfo(), E));
      }
      if (_.emissiveTexture !== void 0) {
        let E = _.emissiveTexture,
          T = o.textures[p[E.index].source];
        (w.setEmissiveTexture(T), o.setTextureInfo(w.getEmissiveTextureInfo(), E));
      }
      if (_.normalTexture !== void 0) {
        let E = _.normalTexture,
          T = o.textures[p[E.index].source];
        if (
          (w.setNormalTexture(T),
          o.setTextureInfo(w.getNormalTextureInfo(), E),
          _.normalTexture.scale !== void 0)
        )
          w.setNormalScale(_.normalTexture.scale);
      }
      if (_.occlusionTexture !== void 0) {
        let E = _.occlusionTexture,
          T = o.textures[p[E.index].source];
        if (
          (w.setOcclusionTexture(T),
          o.setTextureInfo(w.getOcclusionTextureInfo(), E),
          _.occlusionTexture.strength !== void 0)
        )
          w.setOcclusionStrength(_.occlusionTexture.strength);
      }
      if (S.metallicRoughnessTexture !== void 0) {
        let E = S.metallicRoughnessTexture,
          T = o.textures[p[E.index].source];
        (w.setMetallicRoughnessTexture(T),
          o.setTextureInfo(w.getMetallicRoughnessTextureInfo(), E));
      }
      return w;
    })),
      i
        .getRoot()
        .listExtensionsUsed()
        .filter((_) => _.prereadTypes.includes(Ie.MESH))
        .forEach((_) => _.preread(o, Ie.MESH)));
    let m = n.meshes || [];
    (i
      .getRoot()
      .listExtensionsUsed()
      .filter((_) => _.prereadTypes.includes(Ie.PRIMITIVE))
      .forEach((_) => _.preread(o, Ie.PRIMITIVE)),
      (o.meshes = m.map((_) => {
        let w = i.createMesh(_.name);
        if (_.extras) w.setExtras(_.extras);
        if (_.weights !== void 0) w.setWeights(_.weights);
        return (
          (_.primitives || []).forEach((E) => {
            let T = i.createPrimitive();
            if (E.extras) T.setExtras(E.extras);
            if (E.material !== void 0) T.setMaterial(o.materials[E.material]);
            if (E.mode !== void 0) T.setMode(E.mode);
            for (let [R, B] of Object.entries(E.attributes || {}))
              T.setAttribute(R, o.accessors[B]);
            if (E.indices !== void 0) T.setIndices(o.accessors[E.indices]);
            let M = (_.extras && _.extras.targetNames) || [];
            ((E.targets || []).forEach((R, B) => {
              let L = M[B] || B.toString(),
                k = i.createPrimitiveTarget(L);
              for (let [z, X] of Object.entries(R)) k.setAttribute(z, o.accessors[X]);
              T.addTarget(k);
            }),
              w.addPrimitive(T));
          }),
          w
        );
      })));
    let A = n.cameras || [];
    o.cameras = A.map((_) => {
      let w = i.createCamera(_.name).setType(_.type);
      if (_.extras) w.setExtras(_.extras);
      if (_.type === Yf.Type.PERSPECTIVE) {
        let S = _.perspective;
        if ((w.setYFov(S.yfov), w.setZNear(S.znear), S.zfar !== void 0)) w.setZFar(S.zfar);
        if (S.aspectRatio !== void 0) w.setAspectRatio(S.aspectRatio);
      } else {
        let S = _.orthographic;
        w.setZNear(S.znear).setZFar(S.zfar).setXMag(S.xmag).setYMag(S.ymag);
      }
      return w;
    });
    let y = n.nodes || [];
    (i
      .getRoot()
      .listExtensionsUsed()
      .filter((_) => _.prereadTypes.includes(Ie.NODE))
      .forEach((_) => _.preread(o, Ie.NODE)),
      (o.nodes = y.map((_) => {
        let w = i.createNode(_.name);
        if (_.extras) w.setExtras(_.extras);
        if (_.translation !== void 0) w.setTranslation(_.translation);
        if (_.rotation !== void 0) w.setRotation(_.rotation);
        if (_.scale !== void 0) w.setScale(_.scale);
        if (_.matrix !== void 0) {
          let S = [0, 0, 0],
            E = [0, 0, 0, 1],
            T = [1, 1, 1];
          (gr.decompose(_.matrix, S, E, T), w.setTranslation(S), w.setRotation(E), w.setScale(T));
        }
        if (_.weights !== void 0) w.setWeights(_.weights);
        return w;
      })));
    let x = n.skins || [];
    ((o.skins = x.map((_) => {
      let w = i.createSkin(_.name);
      if (_.extras) w.setExtras(_.extras);
      if (_.inverseBindMatrices !== void 0)
        w.setInverseBindMatrices(o.accessors[_.inverseBindMatrices]);
      if (_.skeleton !== void 0) w.setSkeleton(o.nodes[_.skeleton]);
      for (let S of _.joints) w.addJoint(o.nodes[S]);
      return w;
    })),
      y.map((_, w) => {
        let S = o.nodes[w];
        if (((_.children || []).forEach((T) => S.addChild(o.nodes[T])), _.mesh !== void 0))
          S.setMesh(o.meshes[_.mesh]);
        if (_.camera !== void 0) S.setCamera(o.cameras[_.camera]);
        if (_.skin !== void 0) S.setSkin(o.skins[_.skin]);
      }));
    let b = n.animations || [];
    o.animations = b.map((_) => {
      let w = i.createAnimation(_.name);
      if (_.extras) w.setExtras(_.extras);
      let E = (_.samplers || []).map((M) => {
        let C = i
          .createAnimationSampler()
          .setInput(o.accessors[M.input])
          .setOutput(o.accessors[M.output])
          .setInterpolation(M.interpolation || Wd.Interpolation.LINEAR);
        if (M.extras) C.setExtras(M.extras);
        return (w.addSampler(C), C);
      });
      return (
        (_.channels || []).forEach((M) => {
          let C = i.createAnimationChannel().setSampler(E[M.sampler]).setTargetPath(M.target.path);
          if (M.target.node !== void 0) C.setTargetNode(o.nodes[M.target.node]);
          if (M.extras) C.setExtras(M.extras);
          w.addChannel(C);
        }),
        w
      );
    });
    let v = n.scenes || [];
    if (
      (i
        .getRoot()
        .listExtensionsUsed()
        .filter((_) => _.prereadTypes.includes(Ie.SCENE))
        .forEach((_) => _.preread(o, Ie.SCENE)),
      (o.scenes = v.map((_) => {
        let w = i.createScene(_.name);
        if (_.extras) w.setExtras(_.extras);
        return ((_.nodes || []).map((E) => o.nodes[E]).forEach((E) => w.addChild(E)), w);
      })),
      n.scene !== void 0)
    )
      i.getRoot().setDefaultScene(o.scenes[n.scene]);
    return (
      i
        .getRoot()
        .listExtensionsUsed()
        .forEach((_) => _.read(o)),
      h.forEach((_, w) => {
        let S = o.accessors[w],
          E = !!_.sparse,
          T = !_.bufferView && !S.getArray();
        if (E || T) S.setSparse(!0).setArray(PZ(_, o));
      }),
      i
    );
  }
  static validate(e, t) {
    let r = e.json;
    if (r.asset.version !== "2.0") throw Error(`Unsupported glTF version, "${r.asset.version}".`);
    if (r.extensionsRequired) {
      for (let n of r.extensionsRequired)
        if (!t.extensions.find((i) => i.EXTENSION_NAME === n))
          throw Error(`Missing required extension, "${n}".`);
    }
    if (r.extensionsUsed) {
      for (let n of r.extensionsUsed)
        if (!t.extensions.find((i) => i.EXTENSION_NAME === n))
          t.logger.warn(`Missing optional extension, "${n}".`);
    }
  }
}
function NZ(e, t) {
  let r = t.jsonDoc,
    n = t.bufferViews[e.bufferView],
    i = r.json.bufferViews[e.bufferView],
    o = Kg[e.componentType],
    s = St.getElementSize(e.type),
    a = o.BYTES_PER_ELEMENT,
    l = e.byteOffset || 0,
    c = new o(e.count * s),
    u = new DataView(n.buffer, n.byteOffset, n.byteLength),
    d = i.byteStride;
  for (let h = 0; h < e.count; h++)
    for (let f = 0; f < s; f++) {
      let p = l + h * d + f * a,
        g;
      switch (e.componentType) {
        case St.ComponentType.FLOAT:
          g = u.getFloat32(p, !0);
          break;
        case St.ComponentType.UNSIGNED_INT:
          g = u.getUint32(p, !0);
          break;
        case St.ComponentType.UNSIGNED_SHORT:
          g = u.getUint16(p, !0);
          break;
        case St.ComponentType.UNSIGNED_BYTE:
          g = u.getUint8(p);
          break;
        case St.ComponentType.SHORT:
          g = u.getInt16(p, !0);
          break;
        case St.ComponentType.BYTE:
          g = u.getInt8(p);
          break;
        default:
          throw Error(`Unexpected componentType "${e.componentType}".`);
      }
      c[h * s + f] = g;
    }
  return c;
}
function lb(e, t) {
  let r = t.jsonDoc,
    n = t.bufferViews[e.bufferView],
    i = r.json.bufferViews[e.bufferView],
    o = Kg[e.componentType],
    s = St.getElementSize(e.type),
    a = o.BYTES_PER_ELEMENT,
    l = s * a;
  if (i.byteStride !== void 0 && i.byteStride !== l) return NZ(e, t);
  let c = n.byteOffset + (e.byteOffset || 0),
    u = e.count * s * a;
  return new o(n.buffer.slice(c, c + u));
}
function PZ(e, t) {
  let r = Kg[e.componentType],
    n = St.getElementSize(e.type),
    i;
  if (e.bufferView !== void 0) i = lb(e, t);
  else i = new r(e.count * n);
  let o = e.sparse;
  if (!o) return i;
  let s = o.count,
    a = Es({}, e, o.indices, { count: s, type: "SCALAR" }),
    l = Es({}, e, o.values, { count: s }),
    c = lb(a, t),
    u = lb(l, t);
  for (let d = 0; d < a.count; d++) for (let h = 0; h < n; h++) i[c[d] * n + h] = u[d * n + h];
  return i;
}
var jg;
(function (e) {
  ((e[(e.ARRAY_BUFFER = 34962)] = "ARRAY_BUFFER"),
    (e[(e.ELEMENT_ARRAY_BUFFER = 34963)] = "ELEMENT_ARRAY_BUFFER"));
})(jg || (jg = {}));
class nl {
  constructor(e, t, r) {
    ((this._doc = void 0),
      (this.jsonDoc = void 0),
      (this.options = void 0),
      (this.accessorIndexMap = /*@__PURE__*/ new Map()),
      (this.animationIndexMap = /*@__PURE__*/ new Map()),
      (this.bufferIndexMap = /*@__PURE__*/ new Map()),
      (this.cameraIndexMap = /*@__PURE__*/ new Map()),
      (this.skinIndexMap = /*@__PURE__*/ new Map()),
      (this.materialIndexMap = /*@__PURE__*/ new Map()),
      (this.meshIndexMap = /*@__PURE__*/ new Map()),
      (this.nodeIndexMap = /*@__PURE__*/ new Map()),
      (this.imageIndexMap = /*@__PURE__*/ new Map()),
      (this.textureDefIndexMap = /*@__PURE__*/ new Map()),
      (this.textureInfoDefMap = /*@__PURE__*/ new Map()),
      (this.samplerDefIndexMap = /*@__PURE__*/ new Map()),
      (this.sceneIndexMap = /*@__PURE__*/ new Map()),
      (this.imageBufferViews = []),
      (this.otherBufferViews = /*@__PURE__*/ new Map()),
      (this.otherBufferViewsIndexMap = /*@__PURE__*/ new Map()),
      (this.extensionData = {}),
      (this.bufferURIGenerator = void 0),
      (this.imageURIGenerator = void 0),
      (this.logger = void 0),
      (this._accessorUsageMap = /*@__PURE__*/ new Map()),
      (this.accessorUsageGroupedByParent = /*@__PURE__*/ new Set(["ARRAY_BUFFER"])),
      (this.accessorParents = /*@__PURE__*/ new Map()),
      (this._doc = e),
      (this.jsonDoc = t),
      (this.options = r));
    let n = e.getRoot(),
      i = n.listBuffers().length,
      o = n.listTextures().length;
    ((this.bufferURIGenerator = new j5(i > 1, () => r.basename || "buffer")),
      (this.imageURIGenerator = new j5(o > 1, (s) => kZ(e, s) || r.basename || "texture")),
      (this.logger = e.getLogger()));
  }
  createTextureInfoDef(e, t) {
    let r = {
        magFilter: t.getMagFilter() || void 0,
        minFilter: t.getMinFilter() || void 0,
        wrapS: t.getWrapS(),
        wrapT: t.getWrapT(),
      },
      n = JSON.stringify(r);
    if (!this.samplerDefIndexMap.has(n))
      (this.samplerDefIndexMap.set(n, this.jsonDoc.json.samplers.length),
        this.jsonDoc.json.samplers.push(r));
    let i = { source: this.imageIndexMap.get(e), sampler: this.samplerDefIndexMap.get(n) },
      o = JSON.stringify(i);
    if (!this.textureDefIndexMap.has(o))
      (this.textureDefIndexMap.set(o, this.jsonDoc.json.textures.length),
        this.jsonDoc.json.textures.push(i));
    let s = { index: this.textureDefIndexMap.get(o) };
    if (t.getTexCoord() !== 0) s.texCoord = t.getTexCoord();
    if (Object.keys(t.getExtras()).length > 0) s.extras = t.getExtras();
    return (this.textureInfoDefMap.set(t, s), s);
  }
  createPropertyDef(e) {
    let t = {};
    if (e.getName()) t.name = e.getName();
    if (Object.keys(e.getExtras()).length > 0) t.extras = e.getExtras();
    return t;
  }
  createAccessorDef(e) {
    let t = this.createPropertyDef(e);
    if (
      ((t.type = e.getType()),
      (t.componentType = e.getComponentType()),
      (t.count = e.getCount()),
      this._doc
        .getGraph()
        .listParentEdges(e)
        .some(
          (n) =>
            (n.getName() === "attributes" && n.getAttributes().key === "POSITION") ||
            n.getName() === "input",
        ))
    )
      ((t.max = e.getMax([]).map(Math.fround)), (t.min = e.getMin([]).map(Math.fround)));
    if (e.getNormalized()) t.normalized = e.getNormalized();
    return t;
  }
  createImageData(e, t, r) {
    if (this.options.format === Ud.GLB)
      (this.imageBufferViews.push(t),
        (e.bufferView = this.jsonDoc.json.bufferViews.length),
        this.jsonDoc.json.bufferViews.push({
          buffer: 0,
          byteOffset: -1,
          byteLength: t.byteLength,
        }));
    else {
      let n = Ea.mimeTypeToExtension(r.getMimeType());
      ((e.uri = this.imageURIGenerator.createURI(r, n)), this.assignResourceURI(e.uri, t, !1));
    }
  }
  assignResourceURI(e, t, r) {
    let n = this.jsonDoc.resources;
    if (!(e in n)) {
      n[e] = t;
      return;
    }
    if (t === n[e]) {
      this.logger.warn(`Duplicate resource URI, "${e}".`);
      return;
    }
    let i = `Resource URI "${e}" already assigned to different data.`;
    if (!r) {
      this.logger.warn(i);
      return;
    }
    throw Error(i);
  }
  getAccessorUsage(e) {
    let t = this._accessorUsageMap.get(e);
    if (t) return t;
    if (e.getSparse()) return Sa.SPARSE;
    for (let r of this._doc.getGraph().listParentEdges(e)) {
      let { usage: n } = r.getAttributes();
      if (n) return n;
      if (r.getParent().propertyType !== Ie.ROOT)
        this.logger.warn(`Missing attribute ".usage" on edge, "${r.getName()}".`);
    }
    return Sa.OTHER;
  }
  addAccessorToUsageGroup(e, t) {
    let r = this._accessorUsageMap.get(e);
    if (r && r !== t) throw Error(`Accessor with usage "${r}" cannot be reused as "${t}".`);
    return (this._accessorUsageMap.set(e, t), this);
  }
}
nl.BufferViewTarget = jg;
nl.BufferViewUsage = Sa;
nl.USAGE_TO_TARGET = {
  [Sa.ARRAY_BUFFER]: jg.ARRAY_BUFFER,
  [Sa.ELEMENT_ARRAY_BUFFER]: jg.ELEMENT_ARRAY_BUFFER,
};
class j5 {
  constructor(e, t) {
    ((this.multiple = void 0),
      (this.basename = void 0),
      (this.counter = {}),
      (this.multiple = e),
      (this.basename = t));
  }
  createURI(e, t) {
    if (e.getURI()) return e.getURI();
    else if (!this.multiple) return `${this.basename(e)}.${t}`;
    else {
      let r = this.basename(e);
      return ((this.counter[r] = this.counter[r] || 1), `${r}_${this.counter[r]++}.${t}`);
    }
  }
}
function kZ(e, t) {
  let r = e
    .getGraph()
    .listParentEdges(t)
    .find((n) => n.getParent() !== e.getRoot());
  return r ? r.getName().replace(/texture$/i, "") : "";
}
var { BufferViewUsage: ab } = nl,
  { UNSIGNED_INT: UZ, UNSIGNED_SHORT: HZ, UNSIGNED_BYTE: GZ } = St.ComponentType,
  zZ = /*@__PURE__*/ new Set([Ie.ACCESSOR, Ie.BUFFER, Ie.MATERIAL, Ie.MESH]);
class zF {
  static write(e, t) {
    let r = e.getGraph(),
      n = e.getRoot(),
      i = {
        asset: Es({ generator: `glTF-Transform ${FF}` }, n.getAsset()),
        extras: Es({}, n.getExtras()),
      },
      o = { json: i, resources: {} },
      s = new nl(e, o, t),
      a = t.logger || rl.DEFAULT_INSTANCE,
      l = new Set(t.extensions.map((m) => m.EXTENSION_NAME)),
      c = e
        .getRoot()
        .listExtensionsUsed()
        .filter((m) => l.has(m.extensionName))
        .sort((m, A) => (m.extensionName > A.extensionName ? 1 : -1)),
      u = e
        .getRoot()
        .listExtensionsRequired()
        .filter((m) => l.has(m.extensionName))
        .sort((m, A) => (m.extensionName > A.extensionName ? 1 : -1));
    if (c.length < e.getRoot().listExtensionsUsed().length)
      a.warn("Some extensions were not registered for I/O, and will not be written.");
    for (let m of c) {
      let A = m.prewriteTypes.filter((y) => !zZ.has(y));
      if (A.length)
        a.warn(
          `Prewrite hooks for some types (${A.join()}), requested by extension ${m.extensionName}, are unsupported. Please file an issue or a PR.`,
        );
      for (let y of m.writeDependencies) m.install(y, t.dependencies[y]);
    }
    function d(m, A, y, x) {
      let b = [],
        v = 0;
      for (let S of m) {
        let E = s.createAccessorDef(S);
        E.bufferView = i.bufferViews.length;
        let T = S.getArray(),
          M = rr.pad(rr.toView(T));
        ((E.byteOffset = v),
          (v += M.byteLength),
          b.push(M),
          s.accessorIndexMap.set(S, i.accessors.length),
          i.accessors.push(E));
      }
      let _ = rr.concat(b),
        w = { buffer: A, byteOffset: y, byteLength: _.byteLength };
      if (x) w.target = x;
      return (i.bufferViews.push(w), { buffers: b, byteLength: v });
    }
    function h(m, A, y) {
      let x = m[0].getCount(),
        b = 0;
      for (let E of m) {
        let T = s.createAccessorDef(E);
        ((T.bufferView = i.bufferViews.length), (T.byteOffset = b));
        let M = E.getElementSize(),
          C = E.getComponentSize();
        ((b += rr.padNumber(M * C)),
          s.accessorIndexMap.set(E, i.accessors.length),
          i.accessors.push(T));
      }
      let v = x * b,
        _ = new ArrayBuffer(v),
        w = new DataView(_);
      for (let E = 0; E < x; E++) {
        let T = 0;
        for (let M of m) {
          let C = M.getElementSize(),
            R = M.getComponentSize(),
            B = M.getComponentType(),
            L = M.getArray();
          for (let k = 0; k < C; k++) {
            let z = E * b + T + k * R,
              X = L[E * C + k];
            switch (B) {
              case St.ComponentType.FLOAT:
                w.setFloat32(z, X, !0);
                break;
              case St.ComponentType.BYTE:
                w.setInt8(z, X);
                break;
              case St.ComponentType.SHORT:
                w.setInt16(z, X, !0);
                break;
              case St.ComponentType.UNSIGNED_BYTE:
                w.setUint8(z, X);
                break;
              case St.ComponentType.UNSIGNED_SHORT:
                w.setUint16(z, X, !0);
                break;
              case St.ComponentType.UNSIGNED_INT:
                w.setUint32(z, X, !0);
                break;
              default:
                throw Error("Unexpected component type: " + B);
            }
          }
          T += rr.padNumber(C * R);
        }
      }
      let S = {
        buffer: A,
        byteOffset: y,
        byteLength: v,
        byteStride: b,
        target: nl.BufferViewTarget.ARRAY_BUFFER,
      };
      return (i.bufferViews.push(S), { byteLength: v, buffers: [new Uint8Array(_)] });
    }
    function f(m, A, y) {
      let x = [],
        b = 0,
        v = /*@__PURE__*/ new Map(),
        _ = -1 / 0,
        w = !1;
      for (let B of m) {
        let L = s.createAccessorDef(B);
        (i.accessors.push(L), s.accessorIndexMap.set(B, i.accessors.length - 1));
        let k = [],
          z = [],
          X = [],
          G = Array(B.getElementSize()).fill(0);
        for (let K = 0, ae = B.getCount(); K < ae; K++) {
          if ((B.getElement(K, X), gr.eq(X, G, 0))) continue;
          ((_ = Math.max(K, _)), k.push(K));
          for (let Z = 0; Z < X.length; Z++) z.push(X[Z]);
        }
        let Q = k.length,
          de = { accessorDef: L, count: Q };
        if ((v.set(B, de), Q === 0)) continue;
        if (Q > B.getCount() / 2) w = !0;
        let oe = Kg[B.getComponentType()];
        ((de.indices = k), (de.values = new oe(z)));
      }
      if (!Number.isFinite(_)) return { buffers: x, byteLength: b };
      if (w)
        a.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");
      let S = _ < 255 ? Uint8Array : _ < 65535 ? Uint16Array : Uint32Array,
        E = _ < 255 ? GZ : _ < 65535 ? HZ : UZ,
        T = { buffer: A, byteOffset: y + b, byteLength: 0 };
      for (let B of m) {
        let L = v.get(B);
        if (L.count === 0) continue;
        L.indicesByteOffset = T.byteLength;
        let k = rr.pad(rr.toView(new S(L.indices)));
        (x.push(k), (b += k.byteLength), (T.byteLength += k.byteLength));
      }
      i.bufferViews.push(T);
      let M = i.bufferViews.length - 1,
        C = { buffer: A, byteOffset: y + b, byteLength: 0 };
      for (let B of m) {
        let L = v.get(B);
        if (L.count === 0) continue;
        L.valuesByteOffset = C.byteLength;
        let k = rr.pad(rr.toView(L.values));
        (x.push(k), (b += k.byteLength), (C.byteLength += k.byteLength));
      }
      i.bufferViews.push(C);
      let R = i.bufferViews.length - 1;
      for (let B of m) {
        let L = v.get(B);
        if (L.count === 0) continue;
        L.accessorDef.sparse = {
          count: L.count,
          indices: { bufferView: M, byteOffset: L.indicesByteOffset, componentType: E },
          values: { bufferView: R, byteOffset: L.valuesByteOffset },
        };
      }
      return { buffers: x, byteLength: b };
    }
    if (
      ((i.accessors = []),
      (i.bufferViews = []),
      (i.samplers = []),
      (i.textures = []),
      (i.images = n.listTextures().map((m, A) => {
        let y = s.createPropertyDef(m);
        if (m.getMimeType()) y.mimeType = m.getMimeType();
        let x = m.getImage();
        if (x) s.createImageData(y, x, m);
        return (s.imageIndexMap.set(m, A), y);
      })),
      c
        .filter((m) => m.prewriteTypes.includes(Ie.ACCESSOR))
        .forEach((m) => m.prewrite(s, Ie.ACCESSOR)),
      n.listAccessors().forEach((m) => {
        let { accessorUsageGroupedByParent: A, accessorParents: y } = s;
        if (s.accessorIndexMap.has(m)) return;
        let x = s.getAccessorUsage(m);
        if ((s.addAccessorToUsageGroup(m, x), A.has(x))) {
          let b = r.listParents(m).find((v) => v.propertyType !== Ie.ROOT);
          y.set(m, b);
        }
      }),
      c.filter((m) => m.prewriteTypes.includes(Ie.BUFFER)).forEach((m) => m.prewrite(s, Ie.BUFFER)),
      (n.listAccessors().length > 0 ||
        s.otherBufferViews.size > 0 ||
        (n.listTextures().length > 0 && t.format === Ud.GLB)) &&
        n.listBuffers().length === 0)
    )
      throw Error("Buffer required for Document resources, but none was found.");
    if (
      ((i.buffers = []),
      n.listBuffers().forEach((m, A) => {
        let y = s.createPropertyDef(m),
          x = s.accessorUsageGroupedByParent,
          b = m.listParents().filter((C) => C instanceof St),
          v = new Set(b.map((C) => s.accessorParents.get(C))),
          _ = new Map(Array.from(v).map((C, R) => [C, R])),
          w = {};
        for (let C of b) {
          var S;
          if (s.accessorIndexMap.has(C)) continue;
          let R = s.getAccessorUsage(C),
            B = R;
          if (x.has(R)) {
            let L = s.accessorParents.get(C);
            B += `:${_.get(L)}`;
          }
          (w[(S = B)] || (w[S] = { usage: R, accessors: [] }), w[B].accessors.push(C));
        }
        let E = [],
          T = i.buffers.length,
          M = 0;
        for (let { usage: C, accessors: R } of Object.values(w))
          if (C === ab.ARRAY_BUFFER && t.vertexLayout === cb.INTERLEAVED) {
            let B = h(R, T, M);
            M += B.byteLength;
            for (let L of B.buffers) E.push(L);
          } else if (C === ab.ARRAY_BUFFER)
            for (let B of R) {
              let L = h([B], T, M);
              M += L.byteLength;
              for (let k of L.buffers) E.push(k);
            }
          else if (C === ab.SPARSE) {
            let B = f(R, T, M);
            M += B.byteLength;
            for (let L of B.buffers) E.push(L);
          } else if (C === ab.ELEMENT_ARRAY_BUFFER) {
            let B = nl.BufferViewTarget.ELEMENT_ARRAY_BUFFER,
              L = d(R, T, M, B);
            M += L.byteLength;
            for (let k of L.buffers) E.push(k);
          } else {
            let B = d(R, T, M);
            M += B.byteLength;
            for (let L of B.buffers) E.push(L);
          }
        if (s.imageBufferViews.length && A === 0) {
          for (let C = 0; C < s.imageBufferViews.length; C++)
            if (
              ((i.bufferViews[i.images[C].bufferView].byteOffset = M),
              (M += s.imageBufferViews[C].byteLength),
              E.push(s.imageBufferViews[C]),
              M % 8)
            ) {
              let R = 8 - (M % 8);
              ((M += R), E.push(new Uint8Array(R)));
            }
        }
        if (s.otherBufferViews.has(m))
          for (let C of s.otherBufferViews.get(m))
            (i.bufferViews.push({ buffer: T, byteOffset: M, byteLength: C.byteLength }),
              s.otherBufferViewsIndexMap.set(C, i.bufferViews.length - 1),
              (M += C.byteLength),
              E.push(C));
        if (M) {
          let C;
          if (t.format === Ud.GLB) C = Wf;
          else ((C = s.bufferURIGenerator.createURI(m, "bin")), (y.uri = C));
          ((y.byteLength = M), s.assignResourceURI(C, rr.concat(E), !0));
        }
        (i.buffers.push(y), s.bufferIndexMap.set(m, A));
      }),
      n.listAccessors().find((m) => !m.getBuffer()))
    )
      a.warn("Skipped writing one or more Accessors: no Buffer assigned.");
    (c
      .filter((m) => m.prewriteTypes.includes(Ie.MATERIAL))
      .forEach((m) => m.prewrite(s, Ie.MATERIAL)),
      (i.materials = n.listMaterials().map((m, A) => {
        let y = s.createPropertyDef(m);
        if (m.getAlphaMode() !== zd.AlphaMode.OPAQUE) y.alphaMode = m.getAlphaMode();
        if (m.getAlphaMode() === zd.AlphaMode.MASK) y.alphaCutoff = m.getAlphaCutoff();
        if (m.getDoubleSided()) y.doubleSided = !0;
        if (((y.pbrMetallicRoughness = {}), !gr.eq(m.getBaseColorFactor(), [1, 1, 1, 1])))
          y.pbrMetallicRoughness.baseColorFactor = m.getBaseColorFactor();
        if (!gr.eq(m.getEmissiveFactor(), [0, 0, 0])) y.emissiveFactor = m.getEmissiveFactor();
        if (m.getRoughnessFactor() !== 1)
          y.pbrMetallicRoughness.roughnessFactor = m.getRoughnessFactor();
        if (m.getMetallicFactor() !== 1)
          y.pbrMetallicRoughness.metallicFactor = m.getMetallicFactor();
        if (m.getBaseColorTexture()) {
          let x = m.getBaseColorTexture(),
            b = m.getBaseColorTextureInfo();
          y.pbrMetallicRoughness.baseColorTexture = s.createTextureInfoDef(x, b);
        }
        if (m.getEmissiveTexture()) {
          let x = m.getEmissiveTexture(),
            b = m.getEmissiveTextureInfo();
          y.emissiveTexture = s.createTextureInfoDef(x, b);
        }
        if (m.getNormalTexture()) {
          let x = m.getNormalTexture(),
            b = m.getNormalTextureInfo(),
            v = s.createTextureInfoDef(x, b);
          if (m.getNormalScale() !== 1) v.scale = m.getNormalScale();
          y.normalTexture = v;
        }
        if (m.getOcclusionTexture()) {
          let x = m.getOcclusionTexture(),
            b = m.getOcclusionTextureInfo(),
            v = s.createTextureInfoDef(x, b);
          if (m.getOcclusionStrength() !== 1) v.strength = m.getOcclusionStrength();
          y.occlusionTexture = v;
        }
        if (m.getMetallicRoughnessTexture()) {
          let x = m.getMetallicRoughnessTexture(),
            b = m.getMetallicRoughnessTextureInfo();
          y.pbrMetallicRoughness.metallicRoughnessTexture = s.createTextureInfoDef(x, b);
        }
        return (s.materialIndexMap.set(m, A), y);
      })),
      c.filter((m) => m.prewriteTypes.includes(Ie.MESH)).forEach((m) => m.prewrite(s, Ie.MESH)),
      (i.meshes = n.listMeshes().map((m, A) => {
        let y = s.createPropertyDef(m),
          x = null;
        if (
          ((y.primitives = m.listPrimitives().map((b) => {
            let v = { attributes: {} };
            v.mode = b.getMode();
            let _ = b.getMaterial();
            if (_) v.material = s.materialIndexMap.get(_);
            if (Object.keys(b.getExtras()).length) v.extras = b.getExtras();
            let w = b.getIndices();
            if (w) v.indices = s.accessorIndexMap.get(w);
            for (let S of b.listSemantics())
              v.attributes[S] = s.accessorIndexMap.get(b.getAttribute(S));
            for (let S of b.listTargets()) {
              let E = {};
              for (let T of S.listSemantics()) E[T] = s.accessorIndexMap.get(S.getAttribute(T));
              ((v.targets = v.targets || []), v.targets.push(E));
            }
            if (b.listTargets().length && !x) x = b.listTargets().map((S) => S.getName());
            return v;
          })),
          m.getWeights().length)
        )
          y.weights = m.getWeights();
        if (x) ((y.extras = y.extras || {}), (y.extras.targetNames = x));
        return (s.meshIndexMap.set(m, A), y);
      })),
      (i.cameras = n.listCameras().map((m, A) => {
        let y = s.createPropertyDef(m);
        if (((y.type = m.getType()), y.type === Yf.Type.PERSPECTIVE)) {
          y.perspective = { znear: m.getZNear(), zfar: m.getZFar(), yfov: m.getYFov() };
          let x = m.getAspectRatio();
          if (x !== null) y.perspective.aspectRatio = x;
        } else
          y.orthographic = {
            znear: m.getZNear(),
            zfar: m.getZFar(),
            xmag: m.getXMag(),
            ymag: m.getYMag(),
          };
        return (s.cameraIndexMap.set(m, A), y);
      })),
      (i.nodes = n.listNodes().map((m, A) => {
        let y = s.createPropertyDef(m);
        if (!gr.eq(m.getTranslation(), [0, 0, 0])) y.translation = m.getTranslation();
        if (!gr.eq(m.getRotation(), [0, 0, 0, 1])) y.rotation = m.getRotation();
        if (!gr.eq(m.getScale(), [1, 1, 1])) y.scale = m.getScale();
        if (m.getWeights().length) y.weights = m.getWeights();
        return (s.nodeIndexMap.set(m, A), y);
      })),
      (i.skins = n.listSkins().map((m, A) => {
        let y = s.createPropertyDef(m),
          x = m.getInverseBindMatrices();
        if (x) y.inverseBindMatrices = s.accessorIndexMap.get(x);
        let b = m.getSkeleton();
        if (b) y.skeleton = s.nodeIndexMap.get(b);
        return (
          (y.joints = m.listJoints().map((v) => s.nodeIndexMap.get(v))),
          s.skinIndexMap.set(m, A),
          y
        );
      })),
      n.listNodes().forEach((m, A) => {
        let y = i.nodes[A],
          x = m.getMesh();
        if (x) y.mesh = s.meshIndexMap.get(x);
        let b = m.getCamera();
        if (b) y.camera = s.cameraIndexMap.get(b);
        let v = m.getSkin();
        if (v) y.skin = s.skinIndexMap.get(v);
        if (m.listChildren().length > 0)
          y.children = m.listChildren().map((_) => s.nodeIndexMap.get(_));
      }),
      (i.animations = n.listAnimations().map((m, A) => {
        let y = s.createPropertyDef(m),
          x = /*@__PURE__*/ new Map();
        return (
          (y.samplers = m.listSamplers().map((b, v) => {
            let _ = s.createPropertyDef(b);
            return (
              (_.input = s.accessorIndexMap.get(b.getInput())),
              (_.output = s.accessorIndexMap.get(b.getOutput())),
              (_.interpolation = b.getInterpolation()),
              x.set(b, v),
              _
            );
          })),
          (y.channels = m.listChannels().map((b) => {
            let v = s.createPropertyDef(b);
            return (
              (v.sampler = x.get(b.getSampler())),
              (v.target = { node: s.nodeIndexMap.get(b.getTargetNode()), path: b.getTargetPath() }),
              v
            );
          })),
          s.animationIndexMap.set(m, A),
          y
        );
      })),
      (i.scenes = n.listScenes().map((m, A) => {
        let y = s.createPropertyDef(m);
        return (
          (y.nodes = m.listChildren().map((x) => s.nodeIndexMap.get(x))),
          s.sceneIndexMap.set(m, A),
          y
        );
      })));
    let g = n.getDefaultScene();
    if (g) i.scene = n.listScenes().indexOf(g);
    return (
      (i.extensionsUsed = c.map((m) => m.extensionName)),
      (i.extensionsRequired = u.map((m) => m.extensionName)),
      c.forEach((m) => m.write(s)),
      VZ(i),
      o
    );
  }
}
function VZ(e) {
  let t = [];
  for (let r in e) {
    let n = e[r];
    if (Array.isArray(n) && n.length === 0) t.push(r);
    else if (n === null || n === "") t.push(r);
    else if (n && typeof n === "object" && Object.keys(n).length === 0) t.push(r);
  }
  for (let r of t) delete e[r];
}
var db;
(function (e) {
  ((e[(e.JSON = 1313821514)] = "JSON"), (e[(e.BIN = 5130562)] = "BIN"));
})(db || (db = {}));
class VF {
  constructor() {
    ((this._logger = rl.DEFAULT_INSTANCE),
      (this._extensions = /*@__PURE__*/ new Set()),
      (this._dependencies = {}),
      (this._vertexLayout = cb.INTERLEAVED),
      (this.lastReadBytes = 0),
      (this.lastWriteBytes = 0));
  }
  setLogger(e) {
    return ((this._logger = e), this);
  }
  registerExtensions(e) {
    for (let t of e) (this._extensions.add(t), t.register());
    return this;
  }
  registerDependencies(e) {
    return (Object.assign(this._dependencies, e), this);
  }
  setVertexLayout(e) {
    return ((this._vertexLayout = e), this);
  }
  async read(e) {
    return await this.readJSON(await this.readAsJSON(e));
  }
  async readAsJSON(e) {
    let t = await this.readURI(e, "view");
    this.lastReadBytes = t.byteLength;
    let r = BF(t) ? this._binaryToJSON(t) : { json: JSON.parse(rr.decodeText(t)), resources: {} };
    return (
      await this._readResourcesExternal(r, this.dirname(e)),
      this._readResourcesInternal(r),
      r
    );
  }
  async readJSON(e) {
    return (
      (e = this._copyJSON(e)),
      this._readResourcesInternal(e),
      GF.read(e, {
        extensions: Array.from(this._extensions),
        dependencies: this._dependencies,
        logger: this._logger,
      })
    );
  }
  async binaryToJSON(e) {
    let t = this._binaryToJSON(rr.assertView(e));
    this._readResourcesInternal(t);
    let r = t.json;
    if (r.buffers && r.buffers.some((n) => WZ(t, n)))
      throw Error("Cannot resolve external buffers with binaryToJSON().");
    else if (r.images && r.images.some((n) => QZ(t, n)))
      throw Error("Cannot resolve external images with binaryToJSON().");
    return t;
  }
  async readBinary(e) {
    return this.readJSON(await this.binaryToJSON(rr.assertView(e)));
  }
  async writeJSON(e, t = {}) {
    if (t.format === Ud.GLB && e.getRoot().listBuffers().length > 1)
      throw Error("GLB must have 0–1 buffers.");
    return zF.write(e, {
      format: t.format || Ud.GLTF,
      basename: t.basename || "",
      logger: this._logger,
      vertexLayout: this._vertexLayout,
      dependencies: Es({}, this._dependencies),
      extensions: Array.from(this._extensions),
    });
  }
  async writeBinary(e) {
    let { json: t, resources: r } = await this.writeJSON(e, { format: Ud.GLB }),
      n = new Uint32Array([1179937895, 2, 12]),
      i = JSON.stringify(t),
      o = rr.pad(rr.encodeText(i), 32),
      s = rr.toView(new Uint32Array([o.byteLength, 1313821514])),
      a = rr.concat([s, o]);
    n[n.length - 1] += a.byteLength;
    let l = Object.values(r)[0];
    if (!l || !l.byteLength) return rr.concat([rr.toView(n), a]);
    let c = rr.pad(l, 0),
      u = rr.toView(new Uint32Array([c.byteLength, 5130562])),
      d = rr.concat([u, c]);
    return ((n[n.length - 1] += d.byteLength), rr.concat([rr.toView(n), a, d]));
  }
  async _readResourcesExternal(e, t) {
    var r = this;
    let n = e.json.images || [],
      i = e.json.buffers || [],
      o = [...n, ...i].map(async function (s) {
        let a = s.uri;
        if (!a || a.match(/data:/)) return Promise.resolve();
        ((e.resources[a] = await r.readURI(r.resolve(t, a), "view")),
          (r.lastReadBytes += e.resources[a].byteLength));
      });
    await Promise.all(o);
  }
  _readResourcesInternal(e) {
    function t(i) {
      if (!i.uri) return;
      if (i.uri in e.resources) {
        rr.assertView(e.resources[i.uri]);
        return;
      }
      if (i.uri.match(/data:/)) {
        let o = `__${UF()}.${Hd.extension(i.uri)}`;
        ((e.resources[o] = rr.createBufferFromDataURI(i.uri)), (i.uri = o));
      }
    }
    ((e.json.images || []).forEach((i) => {
      if (i.bufferView === void 0 && i.uri === void 0)
        throw Error("Missing resource URI or buffer view.");
      t(i);
    }),
      (e.json.buffers || []).forEach(t));
  }
  _copyJSON(e) {
    let { images: t, buffers: r } = e.json;
    if (((e = { json: Es({}, e.json), resources: Es({}, e.resources) }), t))
      e.json.images = t.map((n) => Es({}, n));
    if (r) e.json.buffers = r.map((n) => Es({}, n));
    return e;
  }
  _binaryToJSON(e) {
    if (!BF(e)) throw Error("Invalid glTF 2.0 binary.");
    let t = new Uint32Array(e.buffer, e.byteOffset + 12, 2);
    if (t[1] !== db.JSON) throw Error("Missing required GLB JSON chunk.");
    let r = 20,
      n = t[0],
      i = rr.decodeText(rr.toView(e, r, n)),
      o = JSON.parse(i),
      s = r + n;
    if (e.byteLength <= s) return { json: o, resources: {} };
    let a = new Uint32Array(e.buffer, e.byteOffset + s, 2);
    if (a[1] !== db.BIN) return { json: o, resources: {} };
    let l = a[0],
      c = rr.toView(e, s + 8, l);
    return { json: o, resources: { [Wf]: c } };
  }
}
function WZ(e, t) {
  return t.uri !== void 0 && !(t.uri in e.resources);
}
function QZ(e, t) {
  return t.uri !== void 0 && !(t.uri in e.resources) && t.bufferView === void 0;
}
function BF(e) {
  if (e.byteLength < 3 * Uint32Array.BYTES_PER_ELEMENT) return !1;
  let t = new Uint32Array(e.buffer, e.byteOffset, 3);
  return t[0] === 1179937895 && t[1] === 2;
}
class eE extends VF {
  constructor(e = c1.DEFAULT_INIT) {
    super();
    ((this._fetchConfig = void 0), (this._fetchConfig = e));
  }
  async readURI(e, t) {
    let r = await fetch(e, this._fetchConfig);
    switch (t) {
      case "view":
        return new Uint8Array(await r.arrayBuffer());
      case "text":
        return r.text();
    }
  }
  resolve(e, t) {
    return c1.resolve(e, t);
  }
  dirname(e) {
    return c1.dirname(e);
  }
}
var QF = 163,
  YF = 166;
function YZ() {
  return {
    vkFormat: 0,
    typeSize: 1,
    pixelWidth: 0,
    pixelHeight: 0,
    pixelDepth: 0,
    layerCount: 0,
    faceCount: 1,
    levelCount: 0,
    supercompressionScheme: 0,
    levels: [],
    dataFormatDescriptor: [
      {
        vendorId: 0,
        descriptorType: 0,
        versionNumber: 2,
        colorModel: 0,
        colorPrimaries: 1,
        transferFunction: 2,
        flags: 0,
        texelBlockDimension: [0, 0, 0, 0],
        bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
        samples: [],
      },
    ],
    keyValue: {},
    globalData: null,
  };
}
class u1 {
  constructor(e, t, r, n) {
    ((this._dataView = void 0),
      (this._littleEndian = void 0),
      (this._offset = void 0),
      (this._dataView = new DataView(e.buffer, e.byteOffset + t, r)),
      (this._littleEndian = n),
      (this._offset = 0));
  }
  _nextUint8() {
    let e = this._dataView.getUint8(this._offset);
    return ((this._offset += 1), e);
  }
  _nextUint16() {
    let e = this._dataView.getUint16(this._offset, this._littleEndian);
    return ((this._offset += 2), e);
  }
  _nextUint32() {
    let e = this._dataView.getUint32(this._offset, this._littleEndian);
    return ((this._offset += 4), e);
  }
  _nextUint64() {
    let e = this._dataView.getUint32(this._offset, this._littleEndian),
      t = this._dataView.getUint32(this._offset + 4, this._littleEndian),
      r = e + 4294967296 * t;
    return ((this._offset += 8), r);
  }
  _nextInt32() {
    let e = this._dataView.getInt32(this._offset, this._littleEndian);
    return ((this._offset += 4), e);
  }
  _nextUint8Array(e) {
    let t = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, e);
    return ((this._offset += e), t);
  }
  _skip(e) {
    return ((this._offset += e), this);
  }
  _scan(e, t = 0) {
    let r = this._offset,
      n = 0;
    while (this._dataView.getUint8(this._offset) !== t && n < e) (n++, this._offset++);
    if (n < e) this._offset++;
    return new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + r, n);
  }
}
var Qge = new Uint8Array([0]),
  Ss = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function WF(e) {
  return /*@__PURE__*/ new TextDecoder().decode(e);
}
function Ab(e) {
  let t = new Uint8Array(e.buffer, e.byteOffset, Ss.length);
  if (
    t[0] !== Ss[0] ||
    t[1] !== Ss[1] ||
    t[2] !== Ss[2] ||
    t[3] !== Ss[3] ||
    t[4] !== Ss[4] ||
    t[5] !== Ss[5] ||
    t[6] !== Ss[6] ||
    t[7] !== Ss[7] ||
    t[8] !== Ss[8] ||
    t[9] !== Ss[9] ||
    t[10] !== Ss[10] ||
    t[11] !== Ss[11]
  )
    throw Error("Missing KTX 2.0 identifier.");
  let r = YZ(),
    n = 17 * Uint32Array.BYTES_PER_ELEMENT,
    i = new u1(e, Ss.length, n, !0);
  ((r.vkFormat = i._nextUint32()),
    (r.typeSize = i._nextUint32()),
    (r.pixelWidth = i._nextUint32()),
    (r.pixelHeight = i._nextUint32()),
    (r.pixelDepth = i._nextUint32()),
    (r.layerCount = i._nextUint32()),
    (r.faceCount = i._nextUint32()),
    (r.levelCount = i._nextUint32()),
    (r.supercompressionScheme = i._nextUint32()));
  let o = i._nextUint32(),
    s = i._nextUint32(),
    a = i._nextUint32(),
    l = i._nextUint32(),
    c = i._nextUint64(),
    u = i._nextUint64(),
    d = Math.max(r.levelCount, 1) * 3 * 8,
    h = new u1(e, Ss.length + n, d, !0);
  for (let le = 0, ue = Math.max(r.levelCount, 1); le < ue; le++)
    r.levels.push({
      levelData: new Uint8Array(e.buffer, e.byteOffset + h._nextUint64(), h._nextUint64()),
      uncompressedByteLength: h._nextUint64(),
    });
  let f = new u1(e, o, s, !0);
  f._skip(4);
  let p = f._nextUint16(),
    g = f._nextUint16(),
    m = f._nextUint16(),
    A = f._nextUint16(),
    y = f._nextUint8(),
    x = f._nextUint8(),
    b = f._nextUint8(),
    v = f._nextUint8(),
    _ = [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()],
    w = [
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
      f._nextUint8(),
    ],
    E = {
      vendorId: p,
      descriptorType: g,
      versionNumber: m,
      colorModel: y,
      colorPrimaries: x,
      transferFunction: b,
      flags: v,
      texelBlockDimension: _,
      bytesPlane: w,
      samples: [],
    },
    T = 6,
    M = 4,
    C = (A / 4 - T) / M;
  for (let le = 0; le < C; le++) {
    let ue = {
      bitOffset: f._nextUint16(),
      bitLength: f._nextUint8(),
      channelType: f._nextUint8(),
      samplePosition: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()],
      sampleLower: Number.NEGATIVE_INFINITY,
      sampleUpper: Number.POSITIVE_INFINITY,
    };
    if (ue.channelType & 64) ((ue.sampleLower = f._nextInt32()), (ue.sampleUpper = f._nextInt32()));
    else ((ue.sampleLower = f._nextUint32()), (ue.sampleUpper = f._nextUint32()));
    E.samples[le] = ue;
  }
  ((r.dataFormatDescriptor.length = 0), r.dataFormatDescriptor.push(E));
  let R = new u1(e, a, l, !0);
  while (R._offset < l) {
    let le = R._nextUint32(),
      ue = R._scan(le),
      I = WF(ue);
    if (((r.keyValue[I] = R._nextUint8Array(le - ue.byteLength - 1)), I.match(/^ktx/i))) {
      let Y = WF(r.keyValue[I]);
      r.keyValue[I] = Y.substring(0, Y.lastIndexOf("\x00"));
    }
    let N = le % 4 ? 4 - (le % 4) : 0;
    R._skip(N);
  }
  if (u <= 0) return r;
  let B = new u1(e, c, u, !0),
    L = B._nextUint16(),
    k = B._nextUint16(),
    z = B._nextUint32(),
    X = B._nextUint32(),
    G = B._nextUint32(),
    Q = B._nextUint32(),
    de = [];
  for (let le = 0, ue = Math.max(r.levelCount, 1); le < ue; le++)
    de.push({
      imageFlags: B._nextUint32(),
      rgbSliceByteOffset: B._nextUint32(),
      rgbSliceByteLength: B._nextUint32(),
      alphaSliceByteOffset: B._nextUint32(),
      alphaSliceByteLength: B._nextUint32(),
    });
  let oe = c + B._offset,
    K = oe + z,
    ae = K + X,
    Z = ae + G,
    F = new Uint8Array(e.buffer, e.byteOffset + oe, z),
    te = new Uint8Array(e.buffer, e.byteOffset + K, X),
    he = new Uint8Array(e.buffer, e.byteOffset + ae, G),
    re = new Uint8Array(e.buffer, e.byteOffset + Z, Q);
  return (
    (r.globalData = {
      endpointCount: L,
      selectorCount: k,
      imageDescs: de,
      endpointsData: F,
      selectorsData: te,
      tablesData: he,
      extendedData: re,
    }),
    r
  );
}
var xu = "EXT_mesh_gpu_instancing",
  Qo = "EXT_meshopt_compression",
  Zg = "EXT_texture_webp",
  $g = "EXT_texture_avif",
  bi = "KHR_draco_mesh_compression",
  ol = "KHR_lights_punctual",
  bu = "KHR_materials_anisotropy",
  _u = "KHR_materials_clearcoat",
  vu = "KHR_materials_diffuse_transmission",
  Cu = "KHR_materials_dispersion",
  wu = "KHR_materials_emissive_strength",
  Tu = "KHR_materials_ior",
  Eu = "KHR_materials_iridescence",
  Su = "KHR_materials_pbrSpecularGlossiness",
  Mu = "KHR_materials_sheen",
  Iu = "KHR_materials_specular",
  Ru = "KHR_materials_transmission",
  Yd = "KHR_materials_unlit",
  Ou = "KHR_materials_volume",
  ss = "KHR_materials_variants",
  oD = "KHR_mesh_quantization",
  Jg = "KHR_texture_basisu",
  Lu = "KHR_texture_transform",
  sl = "KHR_xmp_json_ld",
  rE = "INSTANCE_ATTRIBUTE";
class iE extends ui {
  init() {
    ((this.extensionName = xu),
      (this.propertyType = "InstancedMesh"),
      (this.parentTypes = [Ie.NODE]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { attributes: new Ts() });
  }
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, { usage: rE });
  }
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
}
iE.EXTENSION_NAME = xu;
class bb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = xu),
      (this.provideTypes = [Ie.NODE]),
      (this.prewriteTypes = [Ie.ACCESSOR]));
  }
  createInstancedMesh() {
    return new iE(this.document.getGraph());
  }
  read(e) {
    return (
      (e.jsonDoc.json.nodes || []).forEach((n, i) => {
        if (!n.extensions || !n.extensions[xu]) return;
        let o = n.extensions[xu],
          s = this.createInstancedMesh();
        for (let a in o.attributes) s.setAttribute(a, e.accessors[o.attributes[a]]);
        e.nodes[i].setExtension(xu, s);
      }),
      this
    );
  }
  prewrite(e) {
    e.accessorUsageGroupedByParent.add(rE);
    for (let t of this.properties)
      for (let r of t.listAttributes()) e.addAccessorToUsageGroup(r, rE);
    return this;
  }
  write(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listNodes()
        .forEach((r) => {
          let n = r.getExtension(xu);
          if (n) {
            let i = e.nodeIndexMap.get(r),
              o = t.json.nodes[i],
              s = { attributes: {} };
            (n.listSemantics().forEach((a) => {
              let l = n.getAttribute(a);
              s.attributes[a] = e.accessorIndexMap.get(l);
            }),
              (o.extensions = o.extensions || {}),
              (o.extensions[xu] = s));
          }
        }),
      this
    );
  }
}
bb.EXTENSION_NAME = xu;
function Bu() {
  return (
    (Bu = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Bu.apply(null, arguments)
  );
}
var e3;
(function (e) {
  ((e.QUANTIZE = "quantize"), (e.FILTER = "filter"));
})(e3 || (e3 = {}));
var d1;
(function (e) {
  ((e.ATTRIBUTES = "ATTRIBUTES"), (e.TRIANGLES = "TRIANGLES"), (e.INDICES = "INDICES"));
})(d1 || (d1 = {}));
var Di;
(function (e) {
  ((e.NONE = "NONE"),
    (e.OCTAHEDRAL = "OCTAHEDRAL"),
    (e.QUATERNION = "QUATERNION"),
    (e.EXPONENTIAL = "EXPONENTIAL"));
})(Di || (Di = {}));
function XZ(e) {
  if (!e.extensions || !e.extensions[Qo]) return !1;
  return !!e.extensions[Qo].fallback;
}
var { BYTE: jZ, SHORT: XF, FLOAT: KZ } = St.ComponentType,
  { encodeNormalizedInt: jF, decodeNormalizedInt: nE } = gr;
function qZ(e, t, r, n) {
  let { filter: i, bits: o } = n,
    s = {
      array: e.getArray(),
      byteStride: e.getElementSize() * e.getComponentSize(),
      componentType: e.getComponentType(),
      normalized: e.getNormalized(),
    };
  if (r !== d1.ATTRIBUTES) return s;
  if (i !== Di.NONE) {
    let a = e.getNormalized() ? ZZ(e) : new Float32Array(s.array);
    switch (i) {
      case Di.EXPONENTIAL:
        ((s.byteStride = e.getElementSize() * 4),
          (s.componentType = KZ),
          (s.normalized = !1),
          (s.array = t.encodeFilterExp(a, e.getCount(), s.byteStride, o)));
        break;
      case Di.OCTAHEDRAL:
        ((s.byteStride = o > 8 ? 8 : 4),
          (s.componentType = o > 8 ? XF : jZ),
          (s.normalized = !0),
          (a = e.getElementSize() === 3 ? JZ(a) : a),
          (s.array = t.encodeFilterOct(a, e.getCount(), s.byteStride, o)));
        break;
      case Di.QUATERNION:
        ((s.byteStride = 8),
          (s.componentType = XF),
          (s.normalized = !0),
          (s.array = t.encodeFilterQuat(a, e.getCount(), s.byteStride, o)));
        break;
      default:
        throw Error("Invalid filter.");
    }
    if (((s.min = e.getMin([])), (s.max = e.getMax([])), e.getNormalized()))
      ((s.min = s.min.map((l) => nE(l, e.getComponentType()))),
        (s.max = s.max.map((l) => nE(l, e.getComponentType()))));
    if (s.normalized)
      ((s.min = s.min.map((l) => jF(l, s.componentType))),
        (s.max = s.max.map((l) => jF(l, s.componentType))));
  } else if (s.byteStride % 4)
    ((s.array = $Z(s.array, e.getElementSize())),
      (s.byteStride = s.array.byteLength / e.getCount()));
  return s;
}
function ZZ(e) {
  let t = e.getComponentType(),
    r = e.getArray(),
    n = new Float32Array(r.length);
  for (let i = 0; i < r.length; i++) n[i] = nE(r[i], t);
  return n;
}
function $Z(e, t) {
  let n = rr.padNumber(e.BYTES_PER_ELEMENT * t) / e.BYTES_PER_ELEMENT,
    i = e.length / t,
    o = new e.constructor(i * n);
  for (let s = 0; s * t < e.length; s++) for (let a = 0; a < t; a++) o[s * n + a] = e[s * t + a];
  return o;
}
function JZ(e) {
  let t = new Float32Array((e.length * 4) / 3);
  for (let r = 0, n = e.length / 3; r < n; r++)
    ((t[r * 4] = e[r * 3]), (t[r * 4 + 1] = e[r * 3 + 1]), (t[r * 4 + 2] = e[r * 3 + 2]));
  return t;
}
function e$(e, t) {
  if (t === nl.BufferViewUsage.ELEMENT_ARRAY_BUFFER)
    return e.listParents().some((n) => n instanceof Wo && n.getMode() === Wo.Mode.TRIANGLES)
      ? d1.TRIANGLES
      : d1.INDICES;
  return d1.ATTRIBUTES;
}
function t$(e, t) {
  let r = t
    .getGraph()
    .listParentEdges(e)
    .filter((n) => !(n.getParent() instanceof Qd));
  for (let n of r) {
    let i = n.getName(),
      o = n.getAttributes().key || "",
      s = n.getParent().propertyType === Ie.PRIMITIVE_TARGET;
    if (i === "indices") return { filter: Di.NONE };
    if (i === "attributes") {
      if (o === "POSITION") return { filter: Di.NONE };
      if (o === "TEXCOORD_0") return { filter: Di.NONE };
      if (o.startsWith("JOINTS_")) return { filter: Di.NONE };
      if (o.startsWith("WEIGHTS_")) return { filter: Di.NONE };
      if (o === "NORMAL" || o === "TANGENT")
        return s ? { filter: Di.NONE } : { filter: Di.OCTAHEDRAL, bits: 8 };
    }
    if (i === "output") {
      let a = sD(e);
      if (a === "rotation") return { filter: Di.QUATERNION, bits: 16 };
      if (a === "translation") return { filter: Di.EXPONENTIAL, bits: 12 };
      if (a === "scale") return { filter: Di.EXPONENTIAL, bits: 12 };
      return { filter: Di.NONE };
    }
    if (i === "input") return { filter: Di.NONE };
    if (i === "inverseBindMatrices") return { filter: Di.NONE };
  }
  return { filter: Di.NONE };
}
function sD(e) {
  for (let t of e.listParents()) {
    if (!(t instanceof Wd)) continue;
    for (let r of t.listParents()) {
      if (!(r instanceof Qf)) continue;
      return r.getTargetPath();
    }
  }
  return null;
}
var KF = { method: e3.QUANTIZE };
class r3 extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Qo),
      (this.prereadTypes = [Ie.BUFFER, Ie.PRIMITIVE]),
      (this.prewriteTypes = [Ie.BUFFER, Ie.ACCESSOR]),
      (this.readDependencies = ["meshopt.decoder"]),
      (this.writeDependencies = ["meshopt.encoder"]),
      (this._decoder = null),
      (this._decoderFallbackBufferMap = /*@__PURE__*/ new Map()),
      (this._encoder = null),
      (this._encoderOptions = KF),
      (this._encoderFallbackBuffer = null),
      (this._encoderBufferViews = {}),
      (this._encoderBufferViewData = {}),
      (this._encoderBufferViewAccessors = {}));
  }
  install(e, t) {
    if (e === "meshopt.decoder") this._decoder = t;
    if (e === "meshopt.encoder") this._encoder = t;
    return this;
  }
  setEncoderOptions(e) {
    return ((this._encoderOptions = Bu({}, KF, e)), this);
  }
  preread(e, t) {
    if (!this._decoder) {
      if (!this.isRequired()) return this;
      throw Error(`[${Qo}] Please install extension dependency, "meshopt.decoder".`);
    }
    if (!this._decoder.supported) {
      if (!this.isRequired()) return this;
      throw Error(`[${Qo}]: Missing WASM support.`);
    }
    if (t === Ie.BUFFER) this._prereadBuffers(e);
    else if (t === Ie.PRIMITIVE) this._prereadPrimitives(e);
    return this;
  }
  _prereadBuffers(e) {
    let t = e.jsonDoc;
    (t.json.bufferViews || []).forEach((n, i) => {
      if (!n.extensions || !n.extensions[Qo]) return;
      let o = n.extensions[Qo],
        s = o.byteOffset || 0,
        a = o.byteLength || 0,
        { count: l, byteStride: c } = o,
        u = new Uint8Array(l * c),
        d = t.json.buffers[o.buffer],
        h = d.uri ? t.resources[d.uri] : t.resources[Wf],
        f = rr.toView(h, s, a);
      (this._decoder.decodeGltfBuffer(u, l, c, f, o.mode, o.filter), (e.bufferViews[i] = u));
    });
  }
  _prereadPrimitives(e) {
    let t = e.jsonDoc;
    (t.json.bufferViews || []).forEach((n) => {
      if (!n.extensions || !n.extensions[Qo]) return;
      let i = n.extensions[Qo],
        o = e.buffers[i.buffer],
        s = e.buffers[n.buffer],
        a = t.json.buffers[n.buffer];
      if (XZ(a)) this._decoderFallbackBufferMap.set(s, o);
    });
  }
  read(e) {
    if (!this.isRequired()) return this;
    for (let [t, r] of this._decoderFallbackBufferMap) {
      for (let n of t.listParents()) if (n instanceof St) n.swap(t, r);
      t.dispose();
    }
    return this;
  }
  prewrite(e, t) {
    if (t === Ie.ACCESSOR) this._prewriteAccessors(e);
    else if (t === Ie.BUFFER) this._prewriteBuffers(e);
    return this;
  }
  _prewriteAccessors(e) {
    let t = e.jsonDoc.json,
      r = this._encoder,
      n = this._encoderOptions,
      i = this.document.getGraph(),
      o = this.document.createBuffer(),
      s = this.document.getRoot().listBuffers().indexOf(o),
      a = 1,
      l = /*@__PURE__*/ new Map(),
      c = (u) => {
        for (let d of i.listParents(u)) {
          if (d.propertyType === Ie.ROOT) continue;
          let h = l.get(u);
          if (h === void 0) l.set(u, (h = a++));
          return h;
        }
        return -1;
      };
    ((this._encoderFallbackBuffer = o),
      (this._encoderBufferViews = {}),
      (this._encoderBufferViewData = {}),
      (this._encoderBufferViewAccessors = {}));
    for (let u of this.document.getRoot().listAccessors()) {
      if (sD(u) === "weights") continue;
      if (u.getSparse()) continue;
      let d = e.getAccessorUsage(u),
        h = e.accessorUsageGroupedByParent.has(d) ? c(u) : null,
        f = e$(u, d),
        p = n.method === e3.FILTER ? t$(u, this.document) : { filter: Di.NONE },
        g = qZ(u, r, f, p),
        { array: m, byteStride: A } = g,
        y = u.getBuffer();
      if (!y) throw Error(`${Qo}: Missing buffer for accessor.`);
      let x = this.document.getRoot().listBuffers().indexOf(y),
        b = [d, h, f, p.filter, A, x].join(":"),
        v = this._encoderBufferViews[b],
        _ = this._encoderBufferViewData[b],
        w = this._encoderBufferViewAccessors[b];
      if (!v || !_)
        ((w = this._encoderBufferViewAccessors[b] = []),
          (_ = this._encoderBufferViewData[b] = []),
          (v = this._encoderBufferViews[b] =
            {
              buffer: s,
              target: nl.USAGE_TO_TARGET[d],
              byteOffset: 0,
              byteLength: 0,
              byteStride: d === nl.BufferViewUsage.ARRAY_BUFFER ? A : void 0,
              extensions: {
                [Qo]: {
                  buffer: x,
                  byteOffset: 0,
                  byteLength: 0,
                  mode: f,
                  filter: p.filter !== Di.NONE ? p.filter : void 0,
                  byteStride: A,
                  count: 0,
                },
              },
            }));
      let S = e.createAccessorDef(u);
      if (
        ((S.componentType = g.componentType),
        (S.normalized = g.normalized),
        (S.byteOffset = v.byteLength),
        S.min && g.min)
      )
        S.min = g.min;
      if (S.max && g.max) S.max = g.max;
      (e.accessorIndexMap.set(u, t.accessors.length),
        t.accessors.push(S),
        w.push(S),
        _.push(new Uint8Array(m.buffer, m.byteOffset, m.byteLength)),
        (v.byteLength += m.byteLength),
        (v.extensions.EXT_meshopt_compression.count += u.getCount()));
    }
  }
  _prewriteBuffers(e) {
    let t = this._encoder;
    for (let r in this._encoderBufferViews) {
      let n = this._encoderBufferViews[r],
        i = this._encoderBufferViewData[r],
        o = this.document.getRoot().listBuffers()[n.extensions[Qo].buffer],
        s = e.otherBufferViews.get(o) || [],
        { count: a, byteStride: l, mode: c } = n.extensions[Qo],
        u = rr.concat(i),
        d = t.encodeGltfBuffer(u, a, l, c),
        h = rr.pad(d);
      ((n.extensions[Qo].byteLength = d.byteLength),
        (i.length = 0),
        i.push(h),
        s.push(h),
        e.otherBufferViews.set(o, s));
    }
  }
  write(e) {
    let t = 0;
    for (let o in this._encoderBufferViews) {
      let s = this._encoderBufferViews[o],
        a = this._encoderBufferViewData[o][0],
        l = e.otherBufferViewsIndexMap.get(a),
        c = this._encoderBufferViewAccessors[o];
      for (let f of c) f.bufferView = l;
      let u = e.jsonDoc.json.bufferViews[l],
        d = u.byteOffset || 0;
      (Object.assign(u, s), (u.byteOffset = t));
      let h = u.extensions[Qo];
      ((h.byteOffset = d), (t += rr.padNumber(s.byteLength)));
    }
    let r = this._encoderFallbackBuffer,
      n = e.bufferIndexMap.get(r),
      i = e.jsonDoc.json.buffers[n];
    return ((i.byteLength = t), (i.extensions = { [Qo]: { fallback: !0 } }), r.dispose(), this);
  }
}
r3.EXTENSION_NAME = Qo;
r3.EncoderMethod = e3;
class aD {
  match(e) {
    return e.length >= 12 && rr.decodeText(e.slice(4, 12)) === "ftypavif";
  }
  getSize(e) {
    if (!this.match(e)) return null;
    let t = new DataView(e.buffer, e.byteOffset, e.byteLength),
      r = qF(t, 0);
    if (!r) return null;
    let n = r.end;
    while ((r = qF(t, n)))
      if (r.type === "meta") n = r.start + 4;
      else if (r.type === "iprp" || r.type === "ipco") n = r.start;
      else if (r.type === "ispe") return [t.getUint32(r.start + 4), t.getUint32(r.start + 8)];
      else if (r.type === "mdat") break;
      else n = r.end;
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class _b extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = $g), (this.prereadTypes = [Ie.TEXTURE]));
  }
  static register() {
    Ea.registerFormat("image/avif", new aD());
  }
  preread(e) {
    return (
      (e.jsonDoc.json.textures || []).forEach((r) => {
        if (r.extensions && r.extensions[$g]) r.source = r.extensions[$g].source;
      }),
      this
    );
  }
  read(e) {
    return this;
  }
  write(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listTextures()
        .forEach((r) => {
          if (r.getMimeType() === "image/avif") {
            let n = e.imageIndexMap.get(r);
            (t.json.textures || []).forEach((o) => {
              if (o.source === n)
                ((o.extensions = o.extensions || {}),
                  (o.extensions[$g] = { source: o.source }),
                  delete o.source);
            });
          }
        }),
      this
    );
  }
}
_b.EXTENSION_NAME = $g;
function qF(e, t) {
  if (e.byteLength < 4 + t) return null;
  let r = e.getUint32(t);
  if (e.byteLength < r + t || r < 8) return null;
  return {
    type: rr.decodeText(new Uint8Array(e.buffer, e.byteOffset + t + 4, 4)),
    start: t + 8,
    end: t + r,
  };
}
class lD {
  match(e) {
    return e.length >= 12 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80;
  }
  getSize(e) {
    let t = rr.decodeText(e.slice(0, 4)),
      r = rr.decodeText(e.slice(8, 12));
    if (t !== "RIFF" || r !== "WEBP") return null;
    let n = new DataView(e.buffer, e.byteOffset),
      i = 12;
    while (i < n.byteLength) {
      let o = rr.decodeText(
          new Uint8Array([n.getUint8(i), n.getUint8(i + 1), n.getUint8(i + 2), n.getUint8(i + 3)]),
        ),
        s = n.getUint32(i + 4, !0);
      if (o === "VP8 ") {
        let a = n.getInt16(i + 14, !0) & 16383,
          l = n.getInt16(i + 16, !0) & 16383;
        return [a, l];
      } else if (o === "VP8L") {
        let a = n.getUint8(i + 9),
          l = n.getUint8(i + 10),
          c = n.getUint8(i + 11),
          u = n.getUint8(i + 12),
          d = 1 + (((l & 63) << 8) | a),
          h = 1 + (((u & 15) << 10) | (c << 2) | ((l & 192) >> 6));
        return [d, h];
      }
      i += 8 + s + (s % 2);
    }
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class vb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Zg), (this.prereadTypes = [Ie.TEXTURE]));
  }
  static register() {
    Ea.registerFormat("image/webp", new lD());
  }
  preread(e) {
    return (
      (e.jsonDoc.json.textures || []).forEach((r) => {
        if (r.extensions && r.extensions[Zg]) r.source = r.extensions[Zg].source;
      }),
      this
    );
  }
  read(e) {
    return this;
  }
  write(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listTextures()
        .forEach((r) => {
          if (r.getMimeType() === "image/webp") {
            let n = e.imageIndexMap.get(r);
            (t.json.textures || []).forEach((o) => {
              if (o.source === n)
                ((o.extensions = o.extensions || {}),
                  (o.extensions[Zg] = { source: o.source }),
                  delete o.source);
            });
          }
        }),
      this
    );
  }
}
vb.EXTENSION_NAME = Zg;
var vo, cD, uD;
function r$(e, t) {
  let r = new vo.DecoderBuffer();
  try {
    if ((r.Init(t, t.length), e.GetEncodedGeometryType(r) !== vo.TRIANGULAR_MESH))
      throw Error(`[${bi}] Unknown geometry type.`);
    let i = new vo.Mesh();
    if (!e.DecodeBufferToMesh(r, i).ok() || i.ptr === 0) throw Error(`[${bi}] Decoding failure.`);
    return i;
  } finally {
    vo.destroy(r);
  }
}
function n$(e, t) {
  let n = t.num_faces() * 3,
    i,
    o;
  if (t.num_points() <= 65534) {
    let s = n * Uint16Array.BYTES_PER_ELEMENT;
    ((i = vo._malloc(s)),
      e.GetTrianglesUInt16Array(t, s, i),
      (o = new Uint16Array(vo.HEAPU16.buffer, i, n).slice()));
  } else {
    let s = n * Uint32Array.BYTES_PER_ELEMENT;
    ((i = vo._malloc(s)),
      e.GetTrianglesUInt32Array(t, s, i),
      (o = new Uint32Array(vo.HEAPU32.buffer, i, n).slice()));
  }
  return (vo._free(i), o);
}
function i$(e, t, r, n) {
  let i = uD[n.componentType],
    o = cD[n.componentType],
    s = r.num_components(),
    l = t.num_points() * s,
    c = l * o.BYTES_PER_ELEMENT,
    u = vo._malloc(c);
  e.GetAttributeDataArrayForAllPoints(t, r, i, c, u);
  let d = new o(vo.HEAPF32.buffer, u, l).slice();
  return (vo._free(u), d);
}
function o$(e) {
  ((vo = e),
    (cD = {
      [St.ComponentType.FLOAT]: Float32Array,
      [St.ComponentType.UNSIGNED_INT]: Uint32Array,
      [St.ComponentType.UNSIGNED_SHORT]: Uint16Array,
      [St.ComponentType.UNSIGNED_BYTE]: Uint8Array,
      [St.ComponentType.SHORT]: Int16Array,
      [St.ComponentType.BYTE]: Int8Array,
    }),
    (uD = {
      [St.ComponentType.FLOAT]: vo.DT_FLOAT32,
      [St.ComponentType.UNSIGNED_INT]: vo.DT_UINT32,
      [St.ComponentType.UNSIGNED_SHORT]: vo.DT_UINT16,
      [St.ComponentType.UNSIGNED_BYTE]: vo.DT_UINT8,
      [St.ComponentType.SHORT]: vo.DT_INT16,
      [St.ComponentType.BYTE]: vo.DT_INT8,
    }));
}
var il, t3;
(function (e) {
  ((e[(e.EDGEBREAKER = 1)] = "EDGEBREAKER"), (e[(e.SEQUENTIAL = 0)] = "SEQUENTIAL"));
})(t3 || (t3 = {}));
var al;
(function (e) {
  ((e.POSITION = "POSITION"),
    (e.NORMAL = "NORMAL"),
    (e.COLOR = "COLOR"),
    (e.TEX_COORD = "TEX_COORD"),
    (e.GENERIC = "GENERIC"));
})(al || (al = {}));
var dD = {
    [al.POSITION]: 14,
    [al.NORMAL]: 10,
    [al.COLOR]: 8,
    [al.TEX_COORD]: 12,
    [al.GENERIC]: 12,
  },
  ZF = {
    decodeSpeed: 5,
    encodeSpeed: 5,
    method: t3.EDGEBREAKER,
    quantizationBits: dD,
    quantizationVolume: "mesh",
  };
function s$(e) {
  il = e;
}
function a$(e, t = ZF) {
  let r = Bu({}, ZF, t);
  r.quantizationBits = Bu({}, dD, t.quantizationBits);
  let n = new il.MeshBuilder(),
    i = new il.Mesh(),
    o = new il.ExpertEncoder(i),
    s = {},
    a = new il.DracoInt8Array(),
    l = e.listTargets().length > 0,
    c = !1;
  for (let g of e.listSemantics()) {
    let m = e.getAttribute(g);
    if (m.getSparse()) {
      c = !0;
      continue;
    }
    let A = l$(g),
      y = c$(n, m.getComponentType(), i, il[A], m.getCount(), m.getElementSize(), m.getArray());
    if (y === -1) throw Error(`Error compressing "${g}" attribute.`);
    if (((s[g] = y), r.quantizationVolume === "mesh" || g !== "POSITION"))
      o.SetAttributeQuantization(y, r.quantizationBits[A]);
    else if (typeof r.quantizationVolume === "object") {
      let { quantizationVolume: x } = r,
        b = Math.max(x.max[0] - x.min[0], x.max[1] - x.min[1], x.max[2] - x.min[2]);
      o.SetAttributeExplicitQuantization(y, r.quantizationBits[A], m.getElementSize(), x.min, b);
    } else throw Error("Invalid quantization volume state.");
  }
  let u = e.getIndices();
  if (!u) throw new yb("Primitive must have indices.");
  if (
    (n.AddFacesToMesh(i, u.getCount() / 3, u.getArray()),
    o.SetSpeedOptions(r.encodeSpeed, r.decodeSpeed),
    o.SetTrackEncodedProperties(!0),
    r.method === t3.SEQUENTIAL || l || c)
  )
    o.SetEncodingMethod(il.MESH_SEQUENTIAL_ENCODING);
  else o.SetEncodingMethod(il.MESH_EDGEBREAKER_ENCODING);
  let d = o.EncodeToDracoBuffer(!(l || c), a);
  if (d <= 0) throw new yb("Error applying Draco compression.");
  let h = new Uint8Array(d);
  for (let g = 0; g < d; ++g) h[g] = a.GetValue(g);
  let f = o.GetNumberOfEncodedPoints(),
    p = o.GetNumberOfEncodedFaces() * 3;
  return (
    il.destroy(a),
    il.destroy(i),
    il.destroy(n),
    il.destroy(o),
    { numVertices: f, numIndices: p, data: h, attributeIDs: s }
  );
}
function l$(e) {
  if (e === "POSITION") return al.POSITION;
  else if (e === "NORMAL") return al.NORMAL;
  else if (e.startsWith("COLOR_")) return al.COLOR;
  else if (e.startsWith("TEXCOORD_")) return al.TEX_COORD;
  return al.GENERIC;
}
function c$(e, t, r, n, i, o, s) {
  switch (t) {
    case St.ComponentType.UNSIGNED_BYTE:
      return e.AddUInt8Attribute(r, n, i, o, s);
    case St.ComponentType.BYTE:
      return e.AddInt8Attribute(r, n, i, o, s);
    case St.ComponentType.UNSIGNED_SHORT:
      return e.AddUInt16Attribute(r, n, i, o, s);
    case St.ComponentType.SHORT:
      return e.AddInt16Attribute(r, n, i, o, s);
    case St.ComponentType.UNSIGNED_INT:
      return e.AddUInt32Attribute(r, n, i, o, s);
    case St.ComponentType.FLOAT:
      return e.AddFloatAttribute(r, n, i, o, s);
    default:
      throw Error(`Unexpected component type, "${t}".`);
  }
}
class yb extends Error {}
class n3 extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = bi),
      (this.prereadTypes = [Ie.PRIMITIVE]),
      (this.prewriteTypes = [Ie.ACCESSOR]),
      (this.readDependencies = ["draco3d.decoder"]),
      (this.writeDependencies = ["draco3d.encoder"]),
      (this._decoderModule = null),
      (this._encoderModule = null),
      (this._encoderOptions = {}));
  }
  install(e, t) {
    if (e === "draco3d.decoder") ((this._decoderModule = t), o$(this._decoderModule));
    if (e === "draco3d.encoder") ((this._encoderModule = t), s$(this._encoderModule));
    return this;
  }
  setEncoderOptions(e) {
    return ((this._encoderOptions = e), this);
  }
  preread(e) {
    if (!this._decoderModule)
      throw Error(`[${bi}] Please install extension dependency, "draco3d.decoder".`);
    let t = this.document.getLogger(),
      r = e.jsonDoc,
      n = /*@__PURE__*/ new Map();
    try {
      let i = r.json.meshes || [];
      for (let o of i)
        for (let s of o.primitives) {
          if (!s.extensions || !s.extensions[bi]) continue;
          let a = s.extensions[bi],
            [l, c] = n.get(a.bufferView) || [];
          if (!c || !l) {
            let u = r.json.bufferViews[a.bufferView],
              d = r.json.buffers[u.buffer],
              h = d.uri ? r.resources[d.uri] : r.resources[Wf],
              f = u.byteOffset || 0,
              p = u.byteLength,
              g = rr.toView(h, f, p);
            ((l = new this._decoderModule.Decoder()),
              (c = r$(l, g)),
              n.set(a.bufferView, [l, c]),
              t.debug(`[${bi}] Decompressed ${g.byteLength} bytes.`));
          }
          for (let u in a.attributes) {
            let d = e.jsonDoc.json.accessors[s.attributes[u]],
              h = l.GetAttributeByUniqueId(c, a.attributes[u]),
              f = i$(l, c, h, d);
            e.accessors[s.attributes[u]].setArray(f);
          }
          if (s.indices !== void 0) e.accessors[s.indices].setArray(n$(l, c));
        }
    } finally {
      for (let [i, o] of Array.from(n.values()))
        (this._decoderModule.destroy(i), this._decoderModule.destroy(o));
    }
    return this;
  }
  read(e) {
    return this;
  }
  prewrite(e, t) {
    if (!this._encoderModule)
      throw Error(`[${bi}] Please install extension dependency, "draco3d.encoder".`);
    let r = this.document.getLogger();
    r.debug(`[${bi}] Compression options: ${JSON.stringify(this._encoderOptions)}`);
    let n = u$(this.document),
      i = /*@__PURE__*/ new Map(),
      o = "mesh";
    if (this._encoderOptions.quantizationVolume === "scene")
      if (this.document.getRoot().listScenes().length !== 1)
        r.warn(`[${bi}]: quantizationVolume=scene requires exactly 1 scene.`);
      else o = K5(this.document.getRoot().listScenes().pop());
    for (let s of Array.from(n.keys())) {
      let a = n.get(s);
      if (!a) throw Error("Unexpected primitive.");
      if (i.has(a)) {
        i.set(a, i.get(a));
        continue;
      }
      let l = s.getIndices(),
        c = e.jsonDoc.json.accessors,
        u;
      try {
        u = a$(s, Bu({}, this._encoderOptions, { quantizationVolume: o }));
      } catch (f) {
        if (f instanceof yb) {
          r.warn(`[${bi}]: ${f.message} Skipping primitive compression.`);
          continue;
        }
        throw f;
      }
      i.set(a, u);
      let d = e.createAccessorDef(l);
      if (
        ((d.count = u.numIndices),
        e.accessorIndexMap.set(l, c.length),
        c.push(d),
        u.numVertices > 65534 && St.getComponentSize(d.componentType) <= 2)
      )
        d.componentType = St.ComponentType.UNSIGNED_INT;
      else if (u.numVertices > 254 && St.getComponentSize(d.componentType) <= 1)
        d.componentType = St.ComponentType.UNSIGNED_SHORT;
      for (let f of s.listSemantics()) {
        let p = s.getAttribute(f);
        if (u.attributeIDs[f] === void 0) continue;
        let g = e.createAccessorDef(p);
        ((g.count = u.numVertices), e.accessorIndexMap.set(p, c.length), c.push(g));
      }
      let h = s.getAttribute("POSITION").getBuffer() || this.document.getRoot().listBuffers()[0];
      if (!e.otherBufferViews.has(h)) e.otherBufferViews.set(h, []);
      e.otherBufferViews.get(h).push(u.data);
    }
    return (
      r.debug(`[${bi}] Compressed ${n.size} primitives.`),
      (e.extensionData[bi] = { primitiveHashMap: n, primitiveEncodingMap: i }),
      this
    );
  }
  write(e) {
    let t = e.extensionData[bi];
    for (let r of this.document.getRoot().listMeshes()) {
      let n = e.jsonDoc.json.meshes[e.meshIndexMap.get(r)];
      for (let i = 0; i < r.listPrimitives().length; i++) {
        let o = r.listPrimitives()[i],
          s = n.primitives[i],
          a = t.primitiveHashMap.get(o);
        if (!a) continue;
        let l = t.primitiveEncodingMap.get(a);
        if (!l) continue;
        ((s.extensions = s.extensions || {}),
          (s.extensions[bi] = {
            bufferView: e.otherBufferViewsIndexMap.get(l.data),
            attributes: l.attributeIDs,
          }));
      }
    }
    if (!t.primitiveHashMap.size) {
      let r = e.jsonDoc.json;
      ((r.extensionsUsed = (r.extensionsUsed || []).filter((n) => n !== bi)),
        (r.extensionsRequired = (r.extensionsRequired || []).filter((n) => n !== bi)));
    }
    return this;
  }
}
n3.EXTENSION_NAME = bi;
n3.EncoderMethod = t3;
function u$(e) {
  let t = e.getLogger(),
    r = /*@__PURE__*/ new Set(),
    n = /*@__PURE__*/ new Set(),
    i = 0,
    o = 0;
  for (let d of e.getRoot().listMeshes())
    for (let h of d.listPrimitives())
      if (!h.getIndices()) (n.add(h), i++);
      else if (h.getMode() !== Wo.Mode.TRIANGLES) (n.add(h), o++);
      else r.add(h);
  if (i > 0) t.warn(`[${bi}] Skipping Draco compression of ${i} non-indexed primitives.`);
  if (o > 0) t.warn(`[${bi}] Skipping Draco compression of ${o} non-TRIANGLES primitives.`);
  let s = e.getRoot().listAccessors(),
    a = /*@__PURE__*/ new Map();
  for (let d = 0; d < s.length; d++) a.set(s[d], d);
  let l = /*@__PURE__*/ new Map(),
    c = /*@__PURE__*/ new Set(),
    u = /*@__PURE__*/ new Map();
  for (let d of Array.from(r)) {
    let h = $F(d, a);
    if (c.has(h)) {
      u.set(d, h);
      continue;
    }
    if (l.has(d.getIndices())) {
      let f = d.getIndices(),
        p = f.clone();
      (a.set(p, e.getRoot().listAccessors().length - 1), d.swap(f, p));
    }
    for (let f of d.listAttributes())
      if (l.has(f)) {
        let p = f.clone();
        (a.set(p, e.getRoot().listAccessors().length - 1), d.swap(f, p));
      }
    ((h = $F(d, a)), c.add(h), u.set(d, h), l.set(d.getIndices(), h));
    for (let f of d.listAttributes()) l.set(f, h);
  }
  for (let d of Array.from(l.keys())) {
    let h = new Set(d.listParents().map((f) => f.propertyType));
    if (h.size !== 2 || !h.has(Ie.PRIMITIVE) || !h.has(Ie.ROOT))
      throw Error(
        `[${bi}] Compressed accessors must only be used as indices or vertex attributes.`,
      );
  }
  for (let d of Array.from(r)) {
    let h = u.get(d),
      f = d.getIndices();
    if (l.get(f) !== h || d.listAttributes().some((p) => l.get(p) !== h))
      throw Error(`[${bi}] Draco primitives must share all, or no, accessors.`);
  }
  for (let d of Array.from(n)) {
    let h = d.getIndices();
    if (l.has(h) || d.listAttributes().some((f) => l.has(f)))
      throw Error(`[${bi}] Accessor cannot be shared by compressed and uncompressed primitives.`);
  }
  return u;
}
function $F(e, t) {
  let r = [],
    n = e.getIndices();
  r.push(t.get(n));
  for (let i of e.listAttributes()) r.push(t.get(i));
  return r.sort().join("|");
}
class h1 extends ui {
  init() {
    ((this.extensionName = ol), (this.propertyType = "Light"), (this.parentTypes = [Ie.NODE]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      color: [1, 1, 1],
      intensity: 1,
      type: h1.Type.POINT,
      range: null,
      innerConeAngle: 0,
      outerConeAngle: Math.PI / 4,
    });
  }
  getColor() {
    return this.get("color");
  }
  setColor(e) {
    return this.set("color", e);
  }
  getIntensity() {
    return this.get("intensity");
  }
  setIntensity(e) {
    return this.set("intensity", e);
  }
  getType() {
    return this.get("type");
  }
  setType(e) {
    return this.set("type", e);
  }
  getRange() {
    return this.get("range");
  }
  setRange(e) {
    return this.set("range", e);
  }
  getInnerConeAngle() {
    return this.get("innerConeAngle");
  }
  setInnerConeAngle(e) {
    return this.set("innerConeAngle", e);
  }
  getOuterConeAngle() {
    return this.get("outerConeAngle");
  }
  setOuterConeAngle(e) {
    return this.set("outerConeAngle", e);
  }
}
h1.EXTENSION_NAME = ol;
h1.Type = { POINT: "point", SPOT: "spot", DIRECTIONAL: "directional" };
class oE extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = ol;
  }
  createLight(e = "") {
    return new h1(this.document.getGraph(), e);
  }
  read(e) {
    let t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[ol]) return this;
    let i = (t.json.extensions[ol].lights || []).map((o) => {
      var s, a;
      let l = this.createLight()
        .setName(o.name || "")
        .setType(o.type);
      if (o.color !== void 0) l.setColor(o.color);
      if (o.intensity !== void 0) l.setIntensity(o.intensity);
      if (o.range !== void 0) l.setRange(o.range);
      if (((s = o.spot) == null ? void 0 : s.innerConeAngle) !== void 0)
        l.setInnerConeAngle(o.spot.innerConeAngle);
      if (((a = o.spot) == null ? void 0 : a.outerConeAngle) !== void 0)
        l.setOuterConeAngle(o.spot.outerConeAngle);
      return l;
    });
    return (
      t.json.nodes.forEach((o, s) => {
        if (!o.extensions || !o.extensions[ol]) return;
        let a = o.extensions[ol];
        e.nodes[s].setExtension(ol, i[a.light]);
      }),
      this
    );
  }
  write(e) {
    let t = e.jsonDoc;
    if (this.properties.size === 0) return this;
    let r = [],
      n = /*@__PURE__*/ new Map();
    for (let i of this.properties) {
      let o = i,
        s = { type: o.getType() };
      if (!gr.eq(o.getColor(), [1, 1, 1])) s.color = o.getColor();
      if (o.getIntensity() !== 1) s.intensity = o.getIntensity();
      if (o.getRange() != null) s.range = o.getRange();
      if (o.getName()) s.name = o.getName();
      if (o.getType() === h1.Type.SPOT)
        s.spot = { innerConeAngle: o.getInnerConeAngle(), outerConeAngle: o.getOuterConeAngle() };
      (r.push(s), n.set(o, r.length - 1));
    }
    return (
      this.document
        .getRoot()
        .listNodes()
        .forEach((i) => {
          let o = i.getExtension(ol);
          if (o) {
            let s = e.nodeIndexMap.get(i),
              a = t.json.nodes[s];
            ((a.extensions = a.extensions || {}), (a.extensions[ol] = { light: n.get(o) }));
          }
        }),
      (t.json.extensions = t.json.extensions || {}),
      (t.json.extensions[ol] = { lights: r }),
      this
    );
  }
}
oE.EXTENSION_NAME = ol;
var { R: d$, G: h$, B: f$ } = ta;
class sE extends ui {
  init() {
    ((this.extensionName = bu),
      (this.propertyType = "Anisotropy"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      anisotropyStrength: 0,
      anisotropyRotation: 0,
      anisotropyTexture: null,
      anisotropyTextureInfo: new On(this.graph, "anisotropyTextureInfo"),
    });
  }
  getAnisotropyStrength() {
    return this.get("anisotropyStrength");
  }
  setAnisotropyStrength(e) {
    return this.set("anisotropyStrength", e);
  }
  getAnisotropyRotation() {
    return this.get("anisotropyRotation");
  }
  setAnisotropyRotation(e) {
    return this.set("anisotropyRotation", e);
  }
  getAnisotropyTexture() {
    return this.getRef("anisotropyTexture");
  }
  getAnisotropyTextureInfo() {
    return this.getRef("anisotropyTexture") ? this.getRef("anisotropyTextureInfo") : null;
  }
  setAnisotropyTexture(e) {
    return this.setRef("anisotropyTexture", e, { channels: d$ | h$ | f$ });
  }
}
sE.EXTENSION_NAME = bu;
class aE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = bu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createAnisotropy() {
    return new sE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[bu]) {
          let s = this.createAnisotropy();
          e.materials[o].setExtension(bu, s);
          let a = i.extensions[bu];
          if (a.anisotropyStrength !== void 0) s.setAnisotropyStrength(a.anisotropyStrength);
          if (a.anisotropyRotation !== void 0) s.setAnisotropyRotation(a.anisotropyRotation);
          if (a.anisotropyTexture !== void 0) {
            let l = a.anisotropyTexture,
              c = e.textures[n[l.index].source];
            (s.setAnisotropyTexture(c), e.setTextureInfo(s.getAnisotropyTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(bu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[bu] = {});
            if (n.getAnisotropyStrength() > 0) s.anisotropyStrength = n.getAnisotropyStrength();
            if (n.getAnisotropyRotation() !== 0) s.anisotropyRotation = n.getAnisotropyRotation();
            if (n.getAnisotropyTexture()) {
              let a = n.getAnisotropyTexture(),
                l = n.getAnisotropyTextureInfo();
              s.anisotropyTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
aE.EXTENSION_NAME = bu;
var { R: JF, G: eD, B: p$ } = ta;
class lE extends ui {
  init() {
    ((this.extensionName = _u),
      (this.propertyType = "Clearcoat"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      clearcoatFactor: 0,
      clearcoatTexture: null,
      clearcoatTextureInfo: new On(this.graph, "clearcoatTextureInfo"),
      clearcoatRoughnessFactor: 0,
      clearcoatRoughnessTexture: null,
      clearcoatRoughnessTextureInfo: new On(this.graph, "clearcoatRoughnessTextureInfo"),
      clearcoatNormalScale: 1,
      clearcoatNormalTexture: null,
      clearcoatNormalTextureInfo: new On(this.graph, "clearcoatNormalTextureInfo"),
    });
  }
  getClearcoatFactor() {
    return this.get("clearcoatFactor");
  }
  setClearcoatFactor(e) {
    return this.set("clearcoatFactor", e);
  }
  getClearcoatTexture() {
    return this.getRef("clearcoatTexture");
  }
  getClearcoatTextureInfo() {
    return this.getRef("clearcoatTexture") ? this.getRef("clearcoatTextureInfo") : null;
  }
  setClearcoatTexture(e) {
    return this.setRef("clearcoatTexture", e, { channels: JF });
  }
  getClearcoatRoughnessFactor() {
    return this.get("clearcoatRoughnessFactor");
  }
  setClearcoatRoughnessFactor(e) {
    return this.set("clearcoatRoughnessFactor", e);
  }
  getClearcoatRoughnessTexture() {
    return this.getRef("clearcoatRoughnessTexture");
  }
  getClearcoatRoughnessTextureInfo() {
    return this.getRef("clearcoatRoughnessTexture")
      ? this.getRef("clearcoatRoughnessTextureInfo")
      : null;
  }
  setClearcoatRoughnessTexture(e) {
    return this.setRef("clearcoatRoughnessTexture", e, { channels: eD });
  }
  getClearcoatNormalScale() {
    return this.get("clearcoatNormalScale");
  }
  setClearcoatNormalScale(e) {
    return this.set("clearcoatNormalScale", e);
  }
  getClearcoatNormalTexture() {
    return this.getRef("clearcoatNormalTexture");
  }
  getClearcoatNormalTextureInfo() {
    return this.getRef("clearcoatNormalTexture") ? this.getRef("clearcoatNormalTextureInfo") : null;
  }
  setClearcoatNormalTexture(e) {
    return this.setRef("clearcoatNormalTexture", e, { channels: JF | eD | p$ });
  }
}
lE.EXTENSION_NAME = _u;
class cE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = _u), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createClearcoat() {
    return new lE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[_u]) {
          let s = this.createClearcoat();
          e.materials[o].setExtension(_u, s);
          let a = i.extensions[_u];
          if (a.clearcoatFactor !== void 0) s.setClearcoatFactor(a.clearcoatFactor);
          if (a.clearcoatRoughnessFactor !== void 0)
            s.setClearcoatRoughnessFactor(a.clearcoatRoughnessFactor);
          if (a.clearcoatTexture !== void 0) {
            let l = a.clearcoatTexture,
              c = e.textures[n[l.index].source];
            (s.setClearcoatTexture(c), e.setTextureInfo(s.getClearcoatTextureInfo(), l));
          }
          if (a.clearcoatRoughnessTexture !== void 0) {
            let l = a.clearcoatRoughnessTexture,
              c = e.textures[n[l.index].source];
            (s.setClearcoatRoughnessTexture(c),
              e.setTextureInfo(s.getClearcoatRoughnessTextureInfo(), l));
          }
          if (a.clearcoatNormalTexture !== void 0) {
            let l = a.clearcoatNormalTexture,
              c = e.textures[n[l.index].source];
            if (
              (s.setClearcoatNormalTexture(c),
              e.setTextureInfo(s.getClearcoatNormalTextureInfo(), l),
              l.scale !== void 0)
            )
              s.setClearcoatNormalScale(l.scale);
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(_u);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[_u] = {
              clearcoatFactor: n.getClearcoatFactor(),
              clearcoatRoughnessFactor: n.getClearcoatRoughnessFactor(),
            });
            if (n.getClearcoatTexture()) {
              let a = n.getClearcoatTexture(),
                l = n.getClearcoatTextureInfo();
              s.clearcoatTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getClearcoatRoughnessTexture()) {
              let a = n.getClearcoatRoughnessTexture(),
                l = n.getClearcoatRoughnessTextureInfo();
              s.clearcoatRoughnessTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getClearcoatNormalTexture()) {
              let a = n.getClearcoatNormalTexture(),
                l = n.getClearcoatNormalTextureInfo();
              if (
                ((s.clearcoatNormalTexture = e.createTextureInfoDef(a, l)),
                n.getClearcoatNormalScale() !== 1)
              )
                s.clearcoatNormalTexture.scale = n.getClearcoatNormalScale();
            }
          }
        }),
      this
    );
  }
}
cE.EXTENSION_NAME = _u;
var { R: m$, G: g$, B: A$, A: y$ } = ta;
class uE extends ui {
  init() {
    ((this.extensionName = vu),
      (this.propertyType = "DiffuseTransmission"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseTransmissionFactor: 0,
      diffuseTransmissionTexture: null,
      diffuseTransmissionTextureInfo: new On(this.graph, "diffuseTransmissionTextureInfo"),
      diffuseTransmissionColorFactor: [1, 1, 1],
      diffuseTransmissionColorTexture: null,
      diffuseTransmissionColorTextureInfo: new On(
        this.graph,
        "diffuseTransmissionColorTextureInfo",
      ),
    });
  }
  getDiffuseTransmissionFactor() {
    return this.get("diffuseTransmissionFactor");
  }
  setDiffuseTransmissionFactor(e) {
    return this.set("diffuseTransmissionFactor", e);
  }
  getDiffuseTransmissionTexture() {
    return this.getRef("diffuseTransmissionTexture");
  }
  getDiffuseTransmissionTextureInfo() {
    return this.getRef("diffuseTransmissionTexture")
      ? this.getRef("diffuseTransmissionTextureInfo")
      : null;
  }
  setDiffuseTransmissionTexture(e) {
    return this.setRef("diffuseTransmissionTexture", e, { channels: y$ });
  }
  getDiffuseTransmissionColorFactor() {
    return this.get("diffuseTransmissionColorFactor");
  }
  setDiffuseTransmissionColorFactor(e) {
    return this.set("diffuseTransmissionColorFactor", e);
  }
  getDiffuseTransmissionColorTexture() {
    return this.getRef("diffuseTransmissionColorTexture");
  }
  getDiffuseTransmissionColorTextureInfo() {
    return this.getRef("diffuseTransmissionColorTexture")
      ? this.getRef("diffuseTransmissionColorTextureInfo")
      : null;
  }
  setDiffuseTransmissionColorTexture(e) {
    return this.setRef("diffuseTransmissionColorTexture", e, { channels: m$ | g$ | A$ });
  }
}
uE.EXTENSION_NAME = vu;
class dE extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = vu;
  }
  createDiffuseTransmission() {
    return new uE(this.document.getGraph());
  }
  read(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[vu]) {
          let s = this.createDiffuseTransmission();
          e.materials[o].setExtension(vu, s);
          let a = i.extensions[vu];
          if (a.diffuseTransmissionFactor !== void 0)
            s.setDiffuseTransmissionFactor(a.diffuseTransmissionFactor);
          if (a.diffuseTransmissionColorFactor !== void 0)
            s.setDiffuseTransmissionColorFactor(a.diffuseTransmissionColorFactor);
          if (a.diffuseTransmissionTexture !== void 0) {
            let l = a.diffuseTransmissionTexture,
              c = e.textures[n[l.index].source];
            (s.setDiffuseTransmissionTexture(c),
              e.setTextureInfo(s.getDiffuseTransmissionTextureInfo(), l));
          }
          if (a.diffuseTransmissionColorTexture !== void 0) {
            let l = a.diffuseTransmissionColorTexture,
              c = e.textures[n[l.index].source];
            (s.setDiffuseTransmissionColorTexture(c),
              e.setTextureInfo(s.getDiffuseTransmissionColorTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  write(e) {
    let t = e.jsonDoc;
    for (let r of this.document.getRoot().listMaterials()) {
      let n = r.getExtension(vu);
      if (!n) continue;
      let i = e.materialIndexMap.get(r),
        o = t.json.materials[i];
      o.extensions = o.extensions || {};
      let s = (o.extensions[vu] = {
        diffuseTransmissionFactor: n.getDiffuseTransmissionFactor(),
        diffuseTransmissionColorFactor: n.getDiffuseTransmissionColorFactor(),
      });
      if (n.getDiffuseTransmissionTexture()) {
        let a = n.getDiffuseTransmissionTexture(),
          l = n.getDiffuseTransmissionTextureInfo();
        s.diffuseTransmissionTexture = e.createTextureInfoDef(a, l);
      }
      if (n.getDiffuseTransmissionColorTexture()) {
        let a = n.getDiffuseTransmissionColorTexture(),
          l = n.getDiffuseTransmissionColorTextureInfo();
        s.diffuseTransmissionColorTexture = e.createTextureInfoDef(a, l);
      }
    }
    return this;
  }
}
dE.EXTENSION_NAME = vu;
class hE extends ui {
  init() {
    ((this.extensionName = Cu),
      (this.propertyType = "Dispersion"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { dispersion: 0 });
  }
  getDispersion() {
    return this.get("dispersion");
  }
  setDispersion(e) {
    return this.set("dispersion", e);
  }
}
hE.EXTENSION_NAME = Cu;
class fE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Cu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createDispersion() {
    return new hE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    return (
      (e.jsonDoc.json.materials || []).forEach((n, i) => {
        if (n.extensions && n.extensions[Cu]) {
          let o = this.createDispersion();
          e.materials[i].setExtension(Cu, o);
          let s = n.extensions[Cu];
          if (s.dispersion !== void 0) o.setDispersion(s.dispersion);
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Cu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            ((o.extensions = o.extensions || {}),
              (o.extensions[Cu] = { dispersion: n.getDispersion() }));
          }
        }),
      this
    );
  }
}
fE.EXTENSION_NAME = Cu;
class pE extends ui {
  init() {
    ((this.extensionName = wu),
      (this.propertyType = "EmissiveStrength"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { emissiveStrength: 1 });
  }
  getEmissiveStrength() {
    return this.get("emissiveStrength");
  }
  setEmissiveStrength(e) {
    return this.set("emissiveStrength", e);
  }
}
pE.EXTENSION_NAME = wu;
class mE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = wu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createEmissiveStrength() {
    return new pE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    return (
      (e.jsonDoc.json.materials || []).forEach((n, i) => {
        if (n.extensions && n.extensions[wu]) {
          let o = this.createEmissiveStrength();
          e.materials[i].setExtension(wu, o);
          let s = n.extensions[wu];
          if (s.emissiveStrength !== void 0) o.setEmissiveStrength(s.emissiveStrength);
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(wu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            ((o.extensions = o.extensions || {}),
              (o.extensions[wu] = { emissiveStrength: n.getEmissiveStrength() }));
          }
        }),
      this
    );
  }
}
mE.EXTENSION_NAME = wu;
class gE extends ui {
  init() {
    ((this.extensionName = Tu), (this.propertyType = "IOR"), (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { ior: 1.5 });
  }
  getIOR() {
    return this.get("ior");
  }
  setIOR(e) {
    return this.set("ior", e);
  }
}
gE.EXTENSION_NAME = Tu;
class Cb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Tu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createIOR() {
    return new gE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    return (
      (e.jsonDoc.json.materials || []).forEach((n, i) => {
        if (n.extensions && n.extensions[Tu]) {
          let o = this.createIOR();
          e.materials[i].setExtension(Tu, o);
          let s = n.extensions[Tu];
          if (s.ior !== void 0) o.setIOR(s.ior);
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Tu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            ((o.extensions = o.extensions || {}), (o.extensions[Tu] = { ior: n.getIOR() }));
          }
        }),
      this
    );
  }
}
Cb.EXTENSION_NAME = Tu;
var { R: x$, G: b$ } = ta;
class AE extends ui {
  init() {
    ((this.extensionName = Eu),
      (this.propertyType = "Iridescence"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      iridescenceFactor: 0,
      iridescenceTexture: null,
      iridescenceTextureInfo: new On(this.graph, "iridescenceTextureInfo"),
      iridescenceIOR: 1.3,
      iridescenceThicknessMinimum: 100,
      iridescenceThicknessMaximum: 400,
      iridescenceThicknessTexture: null,
      iridescenceThicknessTextureInfo: new On(this.graph, "iridescenceThicknessTextureInfo"),
    });
  }
  getIridescenceFactor() {
    return this.get("iridescenceFactor");
  }
  setIridescenceFactor(e) {
    return this.set("iridescenceFactor", e);
  }
  getIridescenceTexture() {
    return this.getRef("iridescenceTexture");
  }
  getIridescenceTextureInfo() {
    return this.getRef("iridescenceTexture") ? this.getRef("iridescenceTextureInfo") : null;
  }
  setIridescenceTexture(e) {
    return this.setRef("iridescenceTexture", e, { channels: x$ });
  }
  getIridescenceIOR() {
    return this.get("iridescenceIOR");
  }
  setIridescenceIOR(e) {
    return this.set("iridescenceIOR", e);
  }
  getIridescenceThicknessMinimum() {
    return this.get("iridescenceThicknessMinimum");
  }
  setIridescenceThicknessMinimum(e) {
    return this.set("iridescenceThicknessMinimum", e);
  }
  getIridescenceThicknessMaximum() {
    return this.get("iridescenceThicknessMaximum");
  }
  setIridescenceThicknessMaximum(e) {
    return this.set("iridescenceThicknessMaximum", e);
  }
  getIridescenceThicknessTexture() {
    return this.getRef("iridescenceThicknessTexture");
  }
  getIridescenceThicknessTextureInfo() {
    return this.getRef("iridescenceThicknessTexture")
      ? this.getRef("iridescenceThicknessTextureInfo")
      : null;
  }
  setIridescenceThicknessTexture(e) {
    return this.setRef("iridescenceThicknessTexture", e, { channels: b$ });
  }
}
AE.EXTENSION_NAME = Eu;
class yE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Eu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createIridescence() {
    return new AE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Eu]) {
          let s = this.createIridescence();
          e.materials[o].setExtension(Eu, s);
          let a = i.extensions[Eu];
          if (a.iridescenceFactor !== void 0) s.setIridescenceFactor(a.iridescenceFactor);
          if (a.iridescenceIor !== void 0) s.setIridescenceIOR(a.iridescenceIor);
          if (a.iridescenceThicknessMinimum !== void 0)
            s.setIridescenceThicknessMinimum(a.iridescenceThicknessMinimum);
          if (a.iridescenceThicknessMaximum !== void 0)
            s.setIridescenceThicknessMaximum(a.iridescenceThicknessMaximum);
          if (a.iridescenceTexture !== void 0) {
            let l = a.iridescenceTexture,
              c = e.textures[n[l.index].source];
            (s.setIridescenceTexture(c), e.setTextureInfo(s.getIridescenceTextureInfo(), l));
          }
          if (a.iridescenceThicknessTexture !== void 0) {
            let l = a.iridescenceThicknessTexture,
              c = e.textures[n[l.index].source];
            (s.setIridescenceThicknessTexture(c),
              e.setTextureInfo(s.getIridescenceThicknessTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Eu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Eu] = {});
            if (n.getIridescenceFactor() > 0) s.iridescenceFactor = n.getIridescenceFactor();
            if (n.getIridescenceIOR() !== 1.3) s.iridescenceIor = n.getIridescenceIOR();
            if (n.getIridescenceThicknessMinimum() !== 100)
              s.iridescenceThicknessMinimum = n.getIridescenceThicknessMinimum();
            if (n.getIridescenceThicknessMaximum() !== 400)
              s.iridescenceThicknessMaximum = n.getIridescenceThicknessMaximum();
            if (n.getIridescenceTexture()) {
              let a = n.getIridescenceTexture(),
                l = n.getIridescenceTextureInfo();
              s.iridescenceTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getIridescenceThicknessTexture()) {
              let a = n.getIridescenceThicknessTexture(),
                l = n.getIridescenceThicknessTextureInfo();
              s.iridescenceThicknessTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
yE.EXTENSION_NAME = Eu;
var { R: tD, G: rD, B: nD, A: iD } = ta;
class xE extends ui {
  init() {
    ((this.extensionName = Su),
      (this.propertyType = "PBRSpecularGlossiness"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseFactor: [1, 1, 1, 1],
      diffuseTexture: null,
      diffuseTextureInfo: new On(this.graph, "diffuseTextureInfo"),
      specularFactor: [1, 1, 1],
      glossinessFactor: 1,
      specularGlossinessTexture: null,
      specularGlossinessTextureInfo: new On(this.graph, "specularGlossinessTextureInfo"),
    });
  }
  getDiffuseFactor() {
    return this.get("diffuseFactor");
  }
  setDiffuseFactor(e) {
    return this.set("diffuseFactor", e);
  }
  getDiffuseTexture() {
    return this.getRef("diffuseTexture");
  }
  getDiffuseTextureInfo() {
    return this.getRef("diffuseTexture") ? this.getRef("diffuseTextureInfo") : null;
  }
  setDiffuseTexture(e) {
    return this.setRef("diffuseTexture", e, { channels: tD | rD | nD | iD, isColor: !0 });
  }
  getSpecularFactor() {
    return this.get("specularFactor");
  }
  setSpecularFactor(e) {
    return this.set("specularFactor", e);
  }
  getGlossinessFactor() {
    return this.get("glossinessFactor");
  }
  setGlossinessFactor(e) {
    return this.set("glossinessFactor", e);
  }
  getSpecularGlossinessTexture() {
    return this.getRef("specularGlossinessTexture");
  }
  getSpecularGlossinessTextureInfo() {
    return this.getRef("specularGlossinessTexture")
      ? this.getRef("specularGlossinessTextureInfo")
      : null;
  }
  setSpecularGlossinessTexture(e) {
    return this.setRef("specularGlossinessTexture", e, { channels: tD | rD | nD | iD });
  }
}
xE.EXTENSION_NAME = Su;
class wb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Su), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createPBRSpecularGlossiness() {
    return new xE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Su]) {
          let s = this.createPBRSpecularGlossiness();
          e.materials[o].setExtension(Su, s);
          let a = i.extensions[Su];
          if (a.diffuseFactor !== void 0) s.setDiffuseFactor(a.diffuseFactor);
          if (a.specularFactor !== void 0) s.setSpecularFactor(a.specularFactor);
          if (a.glossinessFactor !== void 0) s.setGlossinessFactor(a.glossinessFactor);
          if (a.diffuseTexture !== void 0) {
            let l = a.diffuseTexture,
              c = e.textures[n[l.index].source];
            (s.setDiffuseTexture(c), e.setTextureInfo(s.getDiffuseTextureInfo(), l));
          }
          if (a.specularGlossinessTexture !== void 0) {
            let l = a.specularGlossinessTexture,
              c = e.textures[n[l.index].source];
            (s.setSpecularGlossinessTexture(c),
              e.setTextureInfo(s.getSpecularGlossinessTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Su);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Su] = {
              diffuseFactor: n.getDiffuseFactor(),
              specularFactor: n.getSpecularFactor(),
              glossinessFactor: n.getGlossinessFactor(),
            });
            if (n.getDiffuseTexture()) {
              let a = n.getDiffuseTexture(),
                l = n.getDiffuseTextureInfo();
              s.diffuseTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getSpecularGlossinessTexture()) {
              let a = n.getSpecularGlossinessTexture(),
                l = n.getSpecularGlossinessTextureInfo();
              s.specularGlossinessTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
wb.EXTENSION_NAME = Su;
var { R: _$, G: v$, B: C$, A: w$ } = ta;
class bE extends ui {
  init() {
    ((this.extensionName = Mu), (this.propertyType = "Sheen"), (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      sheenColorFactor: [0, 0, 0],
      sheenColorTexture: null,
      sheenColorTextureInfo: new On(this.graph, "sheenColorTextureInfo"),
      sheenRoughnessFactor: 0,
      sheenRoughnessTexture: null,
      sheenRoughnessTextureInfo: new On(this.graph, "sheenRoughnessTextureInfo"),
    });
  }
  getSheenColorFactor() {
    return this.get("sheenColorFactor");
  }
  setSheenColorFactor(e) {
    return this.set("sheenColorFactor", e);
  }
  getSheenColorTexture() {
    return this.getRef("sheenColorTexture");
  }
  getSheenColorTextureInfo() {
    return this.getRef("sheenColorTexture") ? this.getRef("sheenColorTextureInfo") : null;
  }
  setSheenColorTexture(e) {
    return this.setRef("sheenColorTexture", e, { channels: _$ | v$ | C$, isColor: !0 });
  }
  getSheenRoughnessFactor() {
    return this.get("sheenRoughnessFactor");
  }
  setSheenRoughnessFactor(e) {
    return this.set("sheenRoughnessFactor", e);
  }
  getSheenRoughnessTexture() {
    return this.getRef("sheenRoughnessTexture");
  }
  getSheenRoughnessTextureInfo() {
    return this.getRef("sheenRoughnessTexture") ? this.getRef("sheenRoughnessTextureInfo") : null;
  }
  setSheenRoughnessTexture(e) {
    return this.setRef("sheenRoughnessTexture", e, { channels: w$ });
  }
}
bE.EXTENSION_NAME = Mu;
class _E extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Mu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createSheen() {
    return new bE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Mu]) {
          let s = this.createSheen();
          e.materials[o].setExtension(Mu, s);
          let a = i.extensions[Mu];
          if (a.sheenColorFactor !== void 0) s.setSheenColorFactor(a.sheenColorFactor);
          if (a.sheenRoughnessFactor !== void 0) s.setSheenRoughnessFactor(a.sheenRoughnessFactor);
          if (a.sheenColorTexture !== void 0) {
            let l = a.sheenColorTexture,
              c = e.textures[n[l.index].source];
            (s.setSheenColorTexture(c), e.setTextureInfo(s.getSheenColorTextureInfo(), l));
          }
          if (a.sheenRoughnessTexture !== void 0) {
            let l = a.sheenRoughnessTexture,
              c = e.textures[n[l.index].source];
            (s.setSheenRoughnessTexture(c), e.setTextureInfo(s.getSheenRoughnessTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Mu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Mu] = {
              sheenColorFactor: n.getSheenColorFactor(),
              sheenRoughnessFactor: n.getSheenRoughnessFactor(),
            });
            if (n.getSheenColorTexture()) {
              let a = n.getSheenColorTexture(),
                l = n.getSheenColorTextureInfo();
              s.sheenColorTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getSheenRoughnessTexture()) {
              let a = n.getSheenRoughnessTexture(),
                l = n.getSheenRoughnessTextureInfo();
              s.sheenRoughnessTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
_E.EXTENSION_NAME = Mu;
var { R: T$, G: E$, B: S$, A: M$ } = ta;
class vE extends ui {
  init() {
    ((this.extensionName = Iu),
      (this.propertyType = "Specular"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      specularFactor: 1,
      specularTexture: null,
      specularTextureInfo: new On(this.graph, "specularTextureInfo"),
      specularColorFactor: [1, 1, 1],
      specularColorTexture: null,
      specularColorTextureInfo: new On(this.graph, "specularColorTextureInfo"),
    });
  }
  getSpecularFactor() {
    return this.get("specularFactor");
  }
  setSpecularFactor(e) {
    return this.set("specularFactor", e);
  }
  getSpecularColorFactor() {
    return this.get("specularColorFactor");
  }
  setSpecularColorFactor(e) {
    return this.set("specularColorFactor", e);
  }
  getSpecularTexture() {
    return this.getRef("specularTexture");
  }
  getSpecularTextureInfo() {
    return this.getRef("specularTexture") ? this.getRef("specularTextureInfo") : null;
  }
  setSpecularTexture(e) {
    return this.setRef("specularTexture", e, { channels: M$ });
  }
  getSpecularColorTexture() {
    return this.getRef("specularColorTexture");
  }
  getSpecularColorTextureInfo() {
    return this.getRef("specularColorTexture") ? this.getRef("specularColorTextureInfo") : null;
  }
  setSpecularColorTexture(e) {
    return this.setRef("specularColorTexture", e, { channels: T$ | E$ | S$, isColor: !0 });
  }
}
vE.EXTENSION_NAME = Iu;
class Tb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Iu), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createSpecular() {
    return new vE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Iu]) {
          let s = this.createSpecular();
          e.materials[o].setExtension(Iu, s);
          let a = i.extensions[Iu];
          if (a.specularFactor !== void 0) s.setSpecularFactor(a.specularFactor);
          if (a.specularColorFactor !== void 0) s.setSpecularColorFactor(a.specularColorFactor);
          if (a.specularTexture !== void 0) {
            let l = a.specularTexture,
              c = e.textures[n[l.index].source];
            (s.setSpecularTexture(c), e.setTextureInfo(s.getSpecularTextureInfo(), l));
          }
          if (a.specularColorTexture !== void 0) {
            let l = a.specularColorTexture,
              c = e.textures[n[l.index].source];
            (s.setSpecularColorTexture(c), e.setTextureInfo(s.getSpecularColorTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Iu);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Iu] = {});
            if (n.getSpecularFactor() !== 1) s.specularFactor = n.getSpecularFactor();
            if (!gr.eq(n.getSpecularColorFactor(), [1, 1, 1]))
              s.specularColorFactor = n.getSpecularColorFactor();
            if (n.getSpecularTexture()) {
              let a = n.getSpecularTexture(),
                l = n.getSpecularTextureInfo();
              s.specularTexture = e.createTextureInfoDef(a, l);
            }
            if (n.getSpecularColorTexture()) {
              let a = n.getSpecularColorTexture(),
                l = n.getSpecularColorTextureInfo();
              s.specularColorTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
Tb.EXTENSION_NAME = Iu;
var { R: I$ } = ta;
class CE extends ui {
  init() {
    ((this.extensionName = Ru),
      (this.propertyType = "Transmission"),
      (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      transmissionFactor: 0,
      transmissionTexture: null,
      transmissionTextureInfo: new On(this.graph, "transmissionTextureInfo"),
    });
  }
  getTransmissionFactor() {
    return this.get("transmissionFactor");
  }
  setTransmissionFactor(e) {
    return this.set("transmissionFactor", e);
  }
  getTransmissionTexture() {
    return this.getRef("transmissionTexture");
  }
  getTransmissionTextureInfo() {
    return this.getRef("transmissionTexture") ? this.getRef("transmissionTextureInfo") : null;
  }
  setTransmissionTexture(e) {
    return this.setRef("transmissionTexture", e, { channels: I$ });
  }
}
CE.EXTENSION_NAME = Ru;
class wE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Ru), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createTransmission() {
    return new CE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Ru]) {
          let s = this.createTransmission();
          e.materials[o].setExtension(Ru, s);
          let a = i.extensions[Ru];
          if (a.transmissionFactor !== void 0) s.setTransmissionFactor(a.transmissionFactor);
          if (a.transmissionTexture !== void 0) {
            let l = a.transmissionTexture,
              c = e.textures[n[l.index].source];
            (s.setTransmissionTexture(c), e.setTextureInfo(s.getTransmissionTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Ru);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Ru] = { transmissionFactor: n.getTransmissionFactor() });
            if (n.getTransmissionTexture()) {
              let a = n.getTransmissionTexture(),
                l = n.getTransmissionTextureInfo();
              s.transmissionTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
wE.EXTENSION_NAME = Ru;
class TE extends ui {
  init() {
    ((this.extensionName = Yd), (this.propertyType = "Unlit"), (this.parentTypes = [Ie.MATERIAL]));
  }
}
TE.EXTENSION_NAME = Yd;
class Eb extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Yd), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createUnlit() {
    return new TE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    return (
      (e.jsonDoc.json.materials || []).forEach((r, n) => {
        if (r.extensions && r.extensions[Yd]) e.materials[n].setExtension(Yd, this.createUnlit());
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          if (r.getExtension(Yd)) {
            let n = e.materialIndexMap.get(r),
              i = t.json.materials[n];
            ((i.extensions = i.extensions || {}), (i.extensions[Yd] = {}));
          }
        }),
      this
    );
  }
}
Eb.EXTENSION_NAME = Yd;
class EE extends ui {
  init() {
    ((this.extensionName = ss),
      (this.propertyType = "Mapping"),
      (this.parentTypes = ["MappingList"]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { material: null, variants: new wn() });
  }
  getMaterial() {
    return this.getRef("material");
  }
  setMaterial(e) {
    return this.setRef("material", e);
  }
  addVariant(e) {
    return this.addRef("variants", e);
  }
  removeVariant(e) {
    return this.removeRef("variants", e);
  }
  listVariants() {
    return this.listRefs("variants");
  }
}
EE.EXTENSION_NAME = ss;
class SE extends ui {
  init() {
    ((this.extensionName = ss),
      (this.propertyType = "MappingList"),
      (this.parentTypes = [Ie.PRIMITIVE]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { mappings: new wn() });
  }
  addMapping(e) {
    return this.addRef("mappings", e);
  }
  removeMapping(e) {
    return this.removeRef("mappings", e);
  }
  listMappings() {
    return this.listRefs("mappings");
  }
}
SE.EXTENSION_NAME = ss;
class xb extends ui {
  init() {
    ((this.extensionName = ss),
      (this.propertyType = "Variant"),
      (this.parentTypes = ["MappingList"]));
  }
}
xb.EXTENSION_NAME = ss;
class ME extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = ss;
  }
  createMappingList() {
    return new SE(this.document.getGraph());
  }
  createVariant(e = "") {
    return new xb(this.document.getGraph(), e);
  }
  createMapping() {
    return new EE(this.document.getGraph());
  }
  listVariants() {
    return Array.from(this.properties).filter((e) => e instanceof xb);
  }
  read(e) {
    let t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[ss]) return this;
    let i = (t.json.extensions[ss].variants || []).map((s) =>
      this.createVariant().setName(s.name || ""),
    );
    return (
      (t.json.meshes || []).forEach((s, a) => {
        let l = e.meshes[a];
        (s.primitives || []).forEach((u, d) => {
          if (!u.extensions || !u.extensions[ss]) return;
          let h = this.createMappingList(),
            f = u.extensions[ss];
          for (let p of f.mappings) {
            let g = this.createMapping();
            if (p.material !== void 0) g.setMaterial(e.materials[p.material]);
            for (let m of p.variants || []) g.addVariant(i[m]);
            h.addMapping(g);
          }
          l.listPrimitives()[d].setExtension(ss, h);
        });
      }),
      this
    );
  }
  write(e) {
    let t = e.jsonDoc,
      r = this.listVariants();
    if (!r.length) return this;
    let n = [],
      i = /*@__PURE__*/ new Map();
    for (let o of r) (i.set(o, n.length), n.push(e.createPropertyDef(o)));
    for (let o of this.document.getRoot().listMeshes()) {
      let s = e.meshIndexMap.get(o);
      o.listPrimitives().forEach((a, l) => {
        let c = a.getExtension(ss);
        if (!c) return;
        let u = e.jsonDoc.json.meshes[s].primitives[l],
          d = c.listMappings().map((h) => {
            let f = e.createPropertyDef(h),
              p = h.getMaterial();
            if (p) f.material = e.materialIndexMap.get(p);
            return ((f.variants = h.listVariants().map((g) => i.get(g))), f);
          });
        ((u.extensions = u.extensions || {}), (u.extensions[ss] = { mappings: d }));
      });
    }
    return (
      (t.json.extensions = t.json.extensions || {}),
      (t.json.extensions[ss] = { variants: n }),
      this
    );
  }
}
ME.EXTENSION_NAME = ss;
var { G: R$ } = ta;
class IE extends ui {
  init() {
    ((this.extensionName = Ou), (this.propertyType = "Volume"), (this.parentTypes = [Ie.MATERIAL]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      thicknessFactor: 0,
      thicknessTexture: null,
      thicknessTextureInfo: new On(this.graph, "thicknessTexture"),
      attenuationDistance: 1 / 0,
      attenuationColor: [1, 1, 1],
    });
  }
  getThicknessFactor() {
    return this.get("thicknessFactor");
  }
  setThicknessFactor(e) {
    return this.set("thicknessFactor", e);
  }
  getThicknessTexture() {
    return this.getRef("thicknessTexture");
  }
  getThicknessTextureInfo() {
    return this.getRef("thicknessTexture") ? this.getRef("thicknessTextureInfo") : null;
  }
  setThicknessTexture(e) {
    return this.setRef("thicknessTexture", e, { channels: R$ });
  }
  getAttenuationDistance() {
    return this.get("attenuationDistance");
  }
  setAttenuationDistance(e) {
    return this.set("attenuationDistance", e);
  }
  getAttenuationColor() {
    return this.get("attenuationColor");
  }
  setAttenuationColor(e) {
    return this.set("attenuationColor", e);
  }
}
IE.EXTENSION_NAME = Ou;
class RE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Ou), (this.prereadTypes = [Ie.MESH]), (this.prewriteTypes = [Ie.MESH]));
  }
  createVolume() {
    return new IE(this.document.getGraph());
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
  preread(e) {
    let t = e.jsonDoc,
      r = t.json.materials || [],
      n = t.json.textures || [];
    return (
      r.forEach((i, o) => {
        if (i.extensions && i.extensions[Ou]) {
          let s = this.createVolume();
          e.materials[o].setExtension(Ou, s);
          let a = i.extensions[Ou];
          if (a.thicknessFactor !== void 0) s.setThicknessFactor(a.thicknessFactor);
          if (a.attenuationDistance !== void 0) s.setAttenuationDistance(a.attenuationDistance);
          if (a.attenuationColor !== void 0) s.setAttenuationColor(a.attenuationColor);
          if (a.thicknessTexture !== void 0) {
            let l = a.thicknessTexture,
              c = e.textures[n[l.index].source];
            (s.setThicknessTexture(c), e.setTextureInfo(s.getThicknessTextureInfo(), l));
          }
        }
      }),
      this
    );
  }
  prewrite(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listMaterials()
        .forEach((r) => {
          let n = r.getExtension(Ou);
          if (n) {
            let i = e.materialIndexMap.get(r),
              o = t.json.materials[i];
            o.extensions = o.extensions || {};
            let s = (o.extensions[Ou] = {});
            if (n.getThicknessFactor() > 0) s.thicknessFactor = n.getThicknessFactor();
            if (Number.isFinite(n.getAttenuationDistance()))
              s.attenuationDistance = n.getAttenuationDistance();
            if (!gr.eq(n.getAttenuationColor(), [1, 1, 1]))
              s.attenuationColor = n.getAttenuationColor();
            if (n.getThicknessTexture()) {
              let a = n.getThicknessTexture(),
                l = n.getThicknessTextureInfo();
              s.thicknessTexture = e.createTextureInfoDef(a, l);
            }
          }
        }),
      this
    );
  }
}
RE.EXTENSION_NAME = Ou;
class Xf extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = oD;
  }
  read(e) {
    return this;
  }
  write(e) {
    return this;
  }
}
Xf.EXTENSION_NAME = oD;
class hD {
  match(e) {
    return (
      e[0] === 171 &&
      e[1] === 75 &&
      e[2] === 84 &&
      e[3] === 88 &&
      e[4] === 32 &&
      e[5] === 50 &&
      e[6] === 48 &&
      e[7] === 187 &&
      e[8] === 13 &&
      e[9] === 10 &&
      e[10] === 26 &&
      e[11] === 10
    );
  }
  getSize(e) {
    let t = Ab(e);
    return [t.pixelWidth, t.pixelHeight];
  }
  getChannels(e) {
    let r = Ab(e).dataFormatDescriptor[0];
    if (r.colorModel === QF)
      return r.samples.length === 2 && (r.samples[1].channelType & 15) === 15 ? 4 : 3;
    else if (r.colorModel === YF) return (r.samples[0].channelType & 15) === 3 ? 4 : 3;
    throw Error(`Unexpected KTX2 colorModel, "${r.colorModel}".`);
  }
  getVRAMByteLength(e) {
    let t = Ab(e),
      r = this.getChannels(e) > 3,
      n = 0;
    for (let i = 0; i < t.levels.length; i++) {
      let o = t.levels[i];
      if (o.uncompressedByteLength) n += o.uncompressedByteLength;
      else {
        let s = Math.max(1, Math.floor(t.pixelWidth / Math.pow(2, i))),
          a = Math.max(1, Math.floor(t.pixelHeight / Math.pow(2, i))),
          l = r ? 16 : 8;
        n += (s / 4) * (a / 4) * l;
      }
    }
    return n;
  }
}
class OE extends Zn {
  constructor(...e) {
    super(...e);
    ((this.extensionName = Jg), (this.prereadTypes = [Ie.TEXTURE]));
  }
  static register() {
    Ea.registerFormat("image/ktx2", new hD());
  }
  preread(e) {
    return (
      e.jsonDoc.json.textures.forEach((t) => {
        if (t.extensions && t.extensions[Jg]) {
          let r = t.extensions[Jg];
          t.source = r.source;
        }
      }),
      this
    );
  }
  read(e) {
    return this;
  }
  write(e) {
    let t = e.jsonDoc;
    return (
      this.document
        .getRoot()
        .listTextures()
        .forEach((r) => {
          if (r.getMimeType() === "image/ktx2") {
            let n = e.imageIndexMap.get(r);
            t.json.textures.forEach((i) => {
              if (i.source === n)
                ((i.extensions = i.extensions || {}),
                  (i.extensions[Jg] = { source: i.source }),
                  delete i.source);
            });
          }
        }),
      this
    );
  }
}
OE.EXTENSION_NAME = Jg;
class LE extends ui {
  init() {
    ((this.extensionName = Lu),
      (this.propertyType = "Transform"),
      (this.parentTypes = [Ie.TEXTURE_INFO]));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      offset: [0, 0],
      rotation: 0,
      scale: [1, 1],
      texCoord: null,
    });
  }
  getOffset() {
    return this.get("offset");
  }
  setOffset(e) {
    return this.set("offset", e);
  }
  getRotation() {
    return this.get("rotation");
  }
  setRotation(e) {
    return this.set("rotation", e);
  }
  getScale() {
    return this.get("scale");
  }
  setScale(e) {
    return this.set("scale", e);
  }
  getTexCoord() {
    return this.get("texCoord");
  }
  setTexCoord(e) {
    return this.set("texCoord", e);
  }
}
LE.EXTENSION_NAME = Lu;
class BE extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = Lu;
  }
  createTransform() {
    return new LE(this.document.getGraph());
  }
  read(e) {
    for (let [t, r] of Array.from(e.textureInfos.entries())) {
      if (!r.extensions || !r.extensions[Lu]) continue;
      let n = this.createTransform(),
        i = r.extensions[Lu];
      if (i.offset !== void 0) n.setOffset(i.offset);
      if (i.rotation !== void 0) n.setRotation(i.rotation);
      if (i.scale !== void 0) n.setScale(i.scale);
      if (i.texCoord !== void 0) n.setTexCoord(i.texCoord);
      t.setExtension(Lu, n);
    }
    return this;
  }
  write(e) {
    let t = Array.from(e.textureInfoDefMap.entries());
    for (let [r, n] of t) {
      let i = r.getExtension(Lu);
      if (!i) continue;
      n.extensions = n.extensions || {};
      let o = {},
        s = gr.eq;
      if (!s(i.getOffset(), [0, 0])) o.offset = i.getOffset();
      if (i.getRotation() !== 0) o.rotation = i.getRotation();
      if (!s(i.getScale(), [1, 1])) o.scale = i.getScale();
      if (i.getTexCoord() != null) o.texCoord = i.getTexCoord();
      n.extensions[Lu] = o;
    }
    return this;
  }
}
BE.EXTENSION_NAME = Lu;
var O$ = [Ie.ROOT, Ie.SCENE, Ie.NODE, Ie.MESH, Ie.MATERIAL, Ie.TEXTURE, Ie.ANIMATION];
class FE extends ui {
  init() {
    ((this.extensionName = sl), (this.propertyType = "Packet"), (this.parentTypes = O$));
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), { context: {}, properties: {} });
  }
  getContext() {
    return this.get("context");
  }
  setContext(e) {
    return this.set("context", Bu({}, e));
  }
  listProperties() {
    return Object.keys(this.get("properties"));
  }
  getProperty(e) {
    let t = this.get("properties");
    return e in t ? t[e] : null;
  }
  setProperty(e, t) {
    this._assertContext(e);
    let r = Bu({}, this.get("properties"));
    if (t) r[e] = t;
    else delete r[e];
    return this.set("properties", r);
  }
  toJSONLD() {
    let e = tE(this.get("context")),
      t = tE(this.get("properties"));
    return Bu({ "@context": e }, t);
  }
  fromJSONLD(e) {
    e = tE(e);
    let t = e["@context"];
    if (t) this.set("context", t);
    return (delete e["@context"], this.set("properties", e));
  }
  _assertContext(e) {
    if (!(e.split(":")[0] in this.get("context")))
      throw Error(`${sl}: Missing context for term, "${e}".`);
  }
}
FE.EXTENSION_NAME = sl;
function tE(e) {
  return JSON.parse(JSON.stringify(e));
}
class DE extends Zn {
  constructor(...e) {
    super(...e);
    this.extensionName = sl;
  }
  createPacket() {
    return new FE(this.document.getGraph());
  }
  listPackets() {
    return Array.from(this.properties);
  }
  read(e) {
    var t;
    let r = (t = e.jsonDoc.json.extensions) == null ? void 0 : t[sl];
    if (!r || !r.packets) return this;
    let n = e.jsonDoc.json,
      i = this.document.getRoot(),
      o = r.packets.map((l) => this.createPacket().fromJSONLD(l)),
      s = [[n.asset], n.scenes, n.nodes, n.meshes, n.materials, n.images, n.animations],
      a = [
        [i],
        i.listScenes(),
        i.listNodes(),
        i.listMeshes(),
        i.listMaterials(),
        i.listTextures(),
        i.listAnimations(),
      ];
    for (let l = 0; l < s.length; l++) {
      let c = s[l] || [];
      for (let u = 0; u < c.length; u++) {
        let d = c[u];
        if (d.extensions && d.extensions[sl]) {
          let h = d.extensions[sl];
          a[l][u].setExtension(sl, o[h.packet]);
        }
      }
    }
    return this;
  }
  write(e) {
    let { json: t } = e.jsonDoc,
      r = [];
    for (let n of this.properties) {
      r.push(n.toJSONLD());
      for (let i of n.listParents()) {
        let o;
        switch (i.propertyType) {
          case Ie.ROOT:
            o = t.asset;
            break;
          case Ie.SCENE:
            o = t.scenes[e.sceneIndexMap.get(i)];
            break;
          case Ie.NODE:
            o = t.nodes[e.nodeIndexMap.get(i)];
            break;
          case Ie.MESH:
            o = t.meshes[e.meshIndexMap.get(i)];
            break;
          case Ie.MATERIAL:
            o = t.materials[e.materialIndexMap.get(i)];
            break;
          case Ie.TEXTURE:
            o = t.images[e.imageIndexMap.get(i)];
            break;
          case Ie.ANIMATION:
            o = t.animations[e.animationIndexMap.get(i)];
            break;
          default:
            ((o = null),
              this.document
                .getLogger()
                .warn(`[${sl}]: Unsupported parent property, "${i.propertyType}"`));
            break;
        }
        if (!o) continue;
        ((o.extensions = o.extensions || {}), (o.extensions[sl] = { packet: r.length - 1 }));
      }
    }
    if (r.length > 0) ((t.extensions = t.extensions || {}), (t.extensions[sl] = { packets: r }));
    return this;
  }
}
DE.EXTENSION_NAME = sl;
var L$ = [n3, oE, aE, cE, dE, fE, mE, Cb, yE, wb, Tb, _E, wE, Eb, ME, RE, Xf, OE, BE, DE],
  Kge = [bb, r3, _b, vb, ...L$];
var V$ = In(xD(), 1);
function o3() {
  return (
    (o3 = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    o3.apply(null, arguments)
  );
}
var {
  POINTS: bD,
  LINES: Mb,
  LINE_STRIP: W$,
  LINE_LOOP: Q$,
  TRIANGLES: Ib,
  TRIANGLE_STRIP: Y$,
  TRIANGLE_FAN: X$,
} = Wo.Mode;
function FD(e, t) {
  return (Object.defineProperty(t, "name", { value: e }), t);
}
function kE(e, t) {
  let r = o3({}, e);
  for (let n in t) if (t[n] !== void 0) r[n] = t[n];
  return r;
}
var j$ = new Intl.NumberFormat(void 0, { maximumFractionDigits: 0 });
function _D(e) {
  return j$.format(e);
}
function K$(e, t, r = 2) {
  let n = e > t ? "–" : "+",
    i = "%";
  return n + ((Math.abs(e - t) / e) * 100).toFixed(r) + "%";
}
function q$(e, t) {
  return `${_D(e)} → ${_D(t)} (${K$(e, t)})`;
}
function DD(e) {
  let t = [];
  for (let r of e.listAttributes()) t.push(r);
  for (let r of e.listTargets()) for (let n of r.listAttributes()) t.push(n);
  return Array.from(new Set(t));
}
function Z$(e, t) {
  if (e == null && t == null) return !0;
  if (e == null || t == null) return !1;
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
  return !0;
}
function vD(e, t) {
  return e
    .createAccessor(t.getName())
    .setArray(t.getArray())
    .setType(t.getType())
    .setBuffer(t.getBuffer())
    .setNormalized(t.getNormalized())
    .setSparse(t.getSparse());
}
function $$(e, t = e) {
  let r = ND(e, t);
  for (let n = 0; n < r.length; n++) r[n] = n;
  return r;
}
function ND(e, t = e) {
  return t <= 65534 ? new Uint16Array(e) : new Uint32Array(e);
}
function J$(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
var n3e = { [bD]: bD, [Mb]: Mb, [W$]: Mb, [Q$]: Mb, [Ib]: Ib, [Y$]: Ib, [X$]: Ib };
var f1 = typeof Float32Array < "u" ? Float32Array : Array;
if (!Math.hypot)
  Math.hypot = function () {
    var e = 0,
      t = arguments.length;
    while (t--) e += arguments[t] * arguments[t];
    return Math.sqrt(e);
  };
function eJ(e) {
  var t = e[0],
    r = e[1],
    n = e[2],
    i = e[3],
    o = e[4],
    s = e[5],
    a = e[6],
    l = e[7],
    c = e[8],
    u = e[9],
    d = e[10],
    h = e[11],
    f = e[12],
    p = e[13],
    g = e[14],
    m = e[15],
    A = t * s - r * o,
    y = t * a - n * o,
    x = t * l - i * o,
    b = r * a - n * s,
    v = r * l - i * s,
    _ = n * l - i * a,
    w = c * p - u * f,
    S = c * g - d * f,
    E = c * m - h * f,
    T = u * g - d * p,
    M = u * m - h * p,
    C = d * m - h * g;
  return A * C - y * M + x * T + b * E - v * S + _ * w;
}
var Wl;
(function (e) {
  ((e.RENDER = "render"),
    (e.RENDER_CACHED = "render-cached"),
    (e.UPLOAD = "upload"),
    (e.UPLOAD_NAIVE = "upload-naive"),
    (e.DISTINCT = "distinct"),
    (e.DISTINCT_POSITION = "distinct-position"),
    (e.UNUSED = "unused"));
})(Wl || (Wl = {}));
function PD(e, t) {
  let r = e.getAttribute("POSITION"),
    n = e.getIndices();
  switch (t) {
    case Wl.RENDER:
      return n ? n.getCount() : r.getCount();
    case Wl.RENDER_CACHED:
      return n ? new Set(n.getArray()).size : r.getCount();
    case Wl.UPLOAD_NAIVE:
    case Wl.UPLOAD:
      return r.getCount();
    case Wl.DISTINCT:
    case Wl.DISTINCT_POSITION:
      return tJ(t);
    case Wl.UNUSED:
      return n ? r.getCount() - new Set(n.getArray()).size : 0;
    default:
      return rJ(t);
  }
}
function tJ(e) {
  throw Error(`Not implemented: ${e}`);
}
function rJ(e) {
  throw Error(`Unexpected value: ${e}`);
}
var Xd = 4294967295;
class kD {
  constructor(e) {
    ((this.attributes = []), (this.u8 = void 0), (this.u32 = void 0));
    let t = 0;
    for (let r of DD(e)) t += this._initAttribute(r);
    ((this.u8 = new Uint8Array(t)), (this.u32 = new Uint32Array(this.u8.buffer)));
  }
  _initAttribute(e) {
    let t = e.getArray(),
      r = new Uint8Array(t.buffer, t.byteOffset, t.byteLength),
      n = e.getElementSize() * e.getComponentSize(),
      i = rr.padNumber(n);
    return (this.attributes.push({ u8: r, byteStride: n, paddedByteStride: i }), i);
  }
  hash(e) {
    let t = 0;
    for (let { u8: r, byteStride: n, paddedByteStride: i } of this.attributes) {
      for (let o = 0; o < i; o++)
        if (o < n) this.u8[t + o] = r[e * n + o];
        else this.u8[t + o] = 0;
      t += i;
    }
    return nJ(0, this.u32);
  }
  equal(e, t) {
    for (let { u8: r, byteStride: n } of this.attributes)
      for (let i = 0; i < n; i++) if (r[e * n + i] !== r[t * n + i]) return !1;
    return !0;
  }
}
function nJ(e, t) {
  for (let i = 0, o = t.length; i < o; i++) {
    let s = t[i];
    ((s = Math.imul(s, 1540483477) >>> 0),
      (s = (s ^ (s >> 24)) >>> 0),
      (s = Math.imul(s, 1540483477) >>> 0),
      (e = Math.imul(e, 1540483477) >>> 0),
      (e = (e ^ s) >>> 0));
  }
  return e;
}
function iJ(e, t, r, n, i = Xd) {
  let o = t - 1,
    a = r.hash(n) & o;
  for (let l = 0; l <= o; l++) {
    let c = e[a];
    if (c === i || r.equal(c, n)) return a;
    a = (a + l + 1) & o;
  }
  throw Error("Hash table full.");
}
function UD(e, t, r) {
  let n = Vd.fromGraph(e.getGraph());
  if (!t || !r) [t, r] = oJ(e);
  let i = e.getIndices(),
    o = i ? i.getArray() : null,
    s = PD(e, Wl.RENDER),
    a = n.createAccessor(),
    l = s,
    c = ND(l, r);
  for (let d = 0; d < l; d++) c[d] = t[o ? o[d] : d];
  e.setIndices(a.setArray(c));
  let u = DD(e);
  for (let d of e.listAttributes()) {
    let h = vD(n, d);
    (CD(d, i, t, h, r), e.swap(d, h));
  }
  for (let d of e.listTargets())
    for (let h of d.listAttributes()) {
      let f = vD(n, h);
      (CD(h, i, t, f, r), d.swap(h, f));
    }
  if (i && i.listParents().length === 1) i.dispose();
  for (let d of u) if (d.listParents().length === 1) d.dispose();
  return e;
}
function CD(e, t, r, n, i) {
  let o = e.getElementSize(),
    s = e.getArray(),
    a = t ? t.getArray() : null,
    l = t ? t.getCount() : e.getCount(),
    c = new s.constructor(i * o),
    u = new Uint8Array(i);
  for (let d = 0; d < l; d++) {
    let h = a ? a[d] : d,
      f = r[h];
    if (u[f]) continue;
    for (let p = 0; p < o; p++) c[f * o + p] = s[h * o + p];
    u[f] = 1;
  }
  return n.setArray(c);
}
function oJ(e) {
  let t = PD(e, Wl.UPLOAD),
    r = e.getIndices(),
    n = r ? r.getArray() : null;
  if (!r || !n) return [$$(t, 1e6), t];
  let i = new Uint32Array(t).fill(Xd),
    o = 0;
  for (let s = 0; s < n.length; s++) {
    let a = n[s];
    if (i[a] === Xd) i[a] = o++;
  }
  return [i, o];
}
function sJ() {
  var e = new f1(9);
  if (f1 != Float32Array) ((e[1] = 0), (e[2] = 0), (e[3] = 0), (e[5] = 0), (e[6] = 0), (e[7] = 0));
  return ((e[0] = 1), (e[4] = 1), (e[8] = 1), e);
}
function aJ(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[4]),
    (e[4] = t[5]),
    (e[5] = t[6]),
    (e[6] = t[8]),
    (e[7] = t[9]),
    (e[8] = t[10]),
    e
  );
}
function lJ(e, t) {
  if (e === t) {
    var r = t[1],
      n = t[2],
      i = t[5];
    ((e[1] = t[3]), (e[2] = t[6]), (e[3] = r), (e[5] = t[7]), (e[6] = n), (e[7] = i));
  } else
    ((e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]));
  return e;
}
function cJ(e, t) {
  var r = t[0],
    n = t[1],
    i = t[2],
    o = t[3],
    s = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    u = t[8],
    d = u * s - a * c,
    h = -u * o + a * l,
    f = c * o - s * l,
    p = r * d + n * h + i * f;
  if (!p) return null;
  return (
    (p = 1 / p),
    (e[0] = d * p),
    (e[1] = (-u * n + i * c) * p),
    (e[2] = (a * n - i * s) * p),
    (e[3] = h * p),
    (e[4] = (u * r - i * l) * p),
    (e[5] = (-a * r + i * o) * p),
    (e[6] = f * p),
    (e[7] = (-c * r + n * l) * p),
    (e[8] = (s * r - n * o) * p),
    e
  );
}
function Lb() {
  var e = new f1(3);
  if (f1 != Float32Array) ((e[0] = 0), (e[1] = 0), (e[2] = 0));
  return e;
}
function HD(e, t) {
  var r = t[0],
    n = t[1],
    i = t[2],
    o = r * r + n * n + i * i;
  if (o > 0) o = 1 / Math.sqrt(o);
  return ((e[0] = t[0] * o), (e[1] = t[1] * o), (e[2] = t[2] * o), e);
}
function uJ(e, t, r) {
  var n = t[0],
    i = t[1],
    o = t[2],
    s = r[3] * n + r[7] * i + r[11] * o + r[15];
  return (
    (s = s || 1),
    (e[0] = (r[0] * n + r[4] * i + r[8] * o + r[12]) / s),
    (e[1] = (r[1] * n + r[5] * i + r[9] * o + r[13]) / s),
    (e[2] = (r[2] * n + r[6] * i + r[10] * o + r[14]) / s),
    e
  );
}
function dJ(e, t, r) {
  var n = t[0],
    i = t[1],
    o = t[2];
  return (
    (e[0] = n * r[0] + i * r[3] + o * r[6]),
    (e[1] = n * r[1] + i * r[4] + o * r[7]),
    (e[2] = n * r[2] + i * r[5] + o * r[8]),
    e
  );
}
(function () {
  var e = Lb();
  return function (t, r, n, i, o, s) {
    var a, l;
    if (!r) r = 3;
    if (!n) n = 0;
    if (i) l = Math.min(i * r + n, t.length);
    else l = t.length;
    for (a = n; a < l; a += r)
      ((e[0] = t[a]),
        (e[1] = t[a + 1]),
        (e[2] = t[a + 2]),
        o(e, e, s),
        (t[a] = e[0]),
        (t[a + 1] = e[1]),
        (t[a + 2] = e[2]));
    return t;
  };
})();
var hJ = "weld",
  wD = { overwrite: !0 };
function fJ(e, t = wD) {
  let r = e.getGraph(),
    i = Vd.fromGraph(r).getLogger(),
    o = o3({}, wD, t);
  if (e.getIndices() && !o.overwrite) return;
  if (e.getMode() === Wo.Mode.POINTS) return;
  let s = e.getAttribute("POSITION").getCount(),
    a = e.getIndices(),
    l = a == null ? void 0 : a.getArray(),
    c = a ? a.getCount() : s,
    u = new kD(e),
    d = J$(s + s / 4),
    h = new Uint32Array(d).fill(Xd),
    f = new Uint32Array(s).fill(Xd),
    p = 0;
  for (let g = 0; g < c; g++) {
    let m = l ? l[g] : g;
    if (f[m] !== Xd) continue;
    let A = iJ(h, d, u, m, Xd),
      y = h[A];
    if (y === Xd) ((h[A] = m), (f[m] = p++));
    else f[m] = f[y];
  }
  (i.debug(`${hJ}: ${q$(s, p)} vertices.`), UD(e, f, p));
}
var { FLOAT: pJ } = St.ComponentType;
function mJ(e, t) {
  let r = e.getAttribute("POSITION");
  if (r) TD(t, r);
  let n = e.getAttribute("NORMAL");
  if (n) ED(t, n);
  let i = e.getAttribute("TANGENT");
  if (i) SD(t, i);
  for (let o of e.listTargets()) {
    let s = o.getAttribute("POSITION");
    if (s) TD(t, s);
    let a = o.getAttribute("NORMAL");
    if (a) ED(t, a);
    let l = o.getAttribute("TANGENT");
    if (l) SD(t, l);
  }
  if (eJ(t) < 0) gJ(e);
}
function TD(e, t) {
  let r = t.getComponentType(),
    n = t.getNormalized(),
    i = t.getArray(),
    o = r === pJ ? i : new Float32Array(i.length),
    s = Lb();
  for (let a = 0, l = t.getCount(); a < l; a++) {
    if (n)
      ((s[0] = gr.decodeNormalizedInt(i[a * 3], r)),
        (s[1] = gr.decodeNormalizedInt(i[a * 3 + 1], r)),
        (s[2] = gr.decodeNormalizedInt(i[a * 3 + 2], r)));
    else ((s[0] = i[a * 3]), (s[1] = i[a * 3 + 1]), (s[2] = i[a * 3 + 2]));
    (uJ(s, s, e), (o[a * 3] = s[0]), (o[a * 3 + 1] = s[1]), (o[a * 3 + 2] = s[2]));
  }
  t.setArray(o).setNormalized(!1);
}
function ED(e, t) {
  let r = t.getArray(),
    n = t.getNormalized(),
    i = t.getComponentType(),
    o = sJ();
  (aJ(o, e), cJ(o, o), lJ(o, o));
  let s = Lb();
  for (let a = 0, l = t.getCount(); a < l; a++) {
    if (n)
      ((s[0] = gr.decodeNormalizedInt(r[a * 3], i)),
        (s[1] = gr.decodeNormalizedInt(r[a * 3 + 1], i)),
        (s[2] = gr.decodeNormalizedInt(r[a * 3 + 2], i)));
    else ((s[0] = r[a * 3]), (s[1] = r[a * 3 + 1]), (s[2] = r[a * 3 + 2]));
    if ((dJ(s, s, o), HD(s, s), n))
      ((r[a * 3] = gr.decodeNormalizedInt(s[0], i)),
        (r[a * 3 + 1] = gr.decodeNormalizedInt(s[1], i)),
        (r[a * 3 + 2] = gr.decodeNormalizedInt(s[2], i)));
    else ((r[a * 3] = s[0]), (r[a * 3 + 1] = s[1]), (r[a * 3 + 2] = s[2]));
  }
}
function SD(e, t) {
  let r = t.getArray(),
    n = t.getNormalized(),
    i = t.getComponentType(),
    o = Lb();
  for (let s = 0, a = t.getCount(); s < a; s++) {
    if (n)
      ((o[0] = gr.decodeNormalizedInt(r[s * 4], i)),
        (o[1] = gr.decodeNormalizedInt(r[s * 4 + 1], i)),
        (o[2] = gr.decodeNormalizedInt(r[s * 4 + 2], i)));
    else ((o[0] = r[s * 4]), (o[1] = r[s * 4 + 1]), (o[2] = r[s * 4 + 2]));
    if (
      ((o[0] = e[0] * o[0] + e[4] * o[1] + e[8] * o[2]),
      (o[1] = e[1] * o[0] + e[5] * o[1] + e[9] * o[2]),
      (o[2] = e[2] * o[0] + e[6] * o[1] + e[10] * o[2]),
      HD(o, o),
      n)
    )
      ((r[s * 4] = gr.decodeNormalizedInt(o[0], i)),
        (r[s * 4 + 1] = gr.decodeNormalizedInt(o[1], i)),
        (r[s * 4 + 2] = gr.decodeNormalizedInt(o[2], i)));
    else ((r[s * 4] = o[0]), (r[s * 4 + 1] = o[1]), (r[s * 4 + 2] = o[2]));
  }
}
function gJ(e) {
  if (e.getMode() !== Wo.Mode.TRIANGLES) return;
  if (!e.getIndices()) fJ(e);
  let t = e.getIndices();
  for (let r = 0, n = t.getCount(); r < n; r += 3) {
    let i = t.getScalar(r),
      o = t.getScalar(r + 2);
    (t.setScalar(r, o), t.setScalar(r + 2, i));
  }
}
function GD(e, t) {
  for (let r of e.listPrimitives()) {
    let n = AJ(r, e);
    if (r !== n) e.removePrimitive(r).addPrimitive(n);
  }
  for (let r of e.listPrimitives()) (UD(r), mJ(r, t));
}
function AJ(e, t) {
  if (e.listParents().some((n) => n instanceof qg && n !== t)) e = e.clone();
  for (let n of e.listTargets())
    if (n.listParents().some((o) => o instanceof Wo && o !== e))
      e.removeTarget(n).addTarget(n.clone());
  return e;
}
var {
  LINES: i3e,
  LINE_STRIP: o3e,
  LINE_LOOP: s3e,
  TRIANGLES: a3e,
  TRIANGLE_STRIP: l3e,
  TRIANGLE_FAN: c3e,
} = Wo.Mode;
var jd = "dedup",
  NE = {
    keepUniqueNames: !1,
    propertyTypes: [Ie.ACCESSOR, Ie.MESH, Ie.TEXTURE, Ie.MATERIAL, Ie.SKIN],
  };
function zD(e = NE) {
  let t = kE(NE, e),
    r = new Set(t.propertyTypes);
  for (let n of t.propertyTypes)
    if (!NE.propertyTypes.includes(n))
      throw Error(`${jd}: Unsupported deduplication on type "${n}".`);
  return FD(jd, (n) => {
    let i = n.getLogger();
    if (r.has(Ie.ACCESSOR)) yJ(n);
    if (r.has(Ie.TEXTURE)) bJ(n, t);
    if (r.has(Ie.MATERIAL)) _J(n, t);
    if (r.has(Ie.MESH)) xJ(n, t);
    if (r.has(Ie.SKIN)) vJ(n, t);
    i.debug(`${jd}: Complete.`);
  });
}
function yJ(e) {
  let t = e.getLogger(),
    r = /*@__PURE__*/ new Map(),
    n = /*@__PURE__*/ new Map(),
    i = /*@__PURE__*/ new Map(),
    o = /*@__PURE__*/ new Map(),
    s = e.getRoot().listMeshes();
  s.forEach((d) => {
    d.listPrimitives().forEach((h) => {
      (h.listAttributes().forEach((f) => a(f, n)), a(h.getIndices(), r));
    });
  });
  for (let d of e.getRoot().listAnimations())
    for (let h of d.listSamplers()) (a(h.getInput(), i), a(h.getOutput(), o));
  function a(d, h) {
    if (!d) return;
    let f = [
        d.getCount(),
        d.getType(),
        d.getComponentType(),
        d.getNormalized(),
        d.getSparse(),
      ].join(":"),
      p = h.get(f);
    if (!p) h.set(f, (p = /*@__PURE__*/ new Set()));
    p.add(d);
  }
  function l(d, h) {
    for (let f = 0; f < d.length; f++) {
      let p = d[f],
        g = rr.toView(p.getArray());
      if (h.has(p)) continue;
      for (let m = f + 1; m < d.length; m++) {
        let A = d[m];
        if (h.has(A)) continue;
        if (rr.equals(g, rr.toView(A.getArray()))) h.set(A, p);
      }
    }
  }
  let c = 0,
    u = /*@__PURE__*/ new Map();
  for (let d of [n, r, i, o]) for (let h of d.values()) ((c += h.size), l(Array.from(h), u));
  (t.debug(`${jd}: Merged ${u.size} of ${c} accessors.`),
    s.forEach((d) => {
      d.listPrimitives().forEach((h) => {
        h.listAttributes().forEach((p) => {
          if (u.has(p)) h.swap(p, u.get(p));
        });
        let f = h.getIndices();
        if (f && u.has(f)) h.swap(f, u.get(f));
      });
    }));
  for (let d of e.getRoot().listAnimations())
    for (let h of d.listSamplers()) {
      let f = h.getInput(),
        p = h.getOutput();
      if (f && u.has(f)) h.swap(f, u.get(f));
      if (p && u.has(p)) h.swap(p, u.get(p));
    }
  Array.from(u.keys()).forEach((d) => d.dispose());
}
function xJ(e, t) {
  let r = e.getLogger(),
    n = e.getRoot(),
    i = /*@__PURE__*/ new Map();
  (n.listAccessors().forEach((a, l) => i.set(a, l)),
    n.listMaterials().forEach((a, l) => i.set(a, l)));
  let o = n.listMeshes().length,
    s = /*@__PURE__*/ new Map();
  for (let a of n.listMeshes()) {
    let l = [];
    for (let u of a.listPrimitives()) l.push(VD(u, i));
    let c = "";
    if (t.keepUniqueNames) c += a.getName() + ";";
    if (((c += l.join(";")), s.has(c))) {
      let u = s.get(c);
      (a.listParents().forEach((d) => {
        if (d.propertyType !== Ie.ROOT) d.swap(a, u);
      }),
        a.dispose());
    } else s.set(c, a);
  }
  r.debug(`${jd}: Merged ${o - s.size} of ${o} meshes.`);
}
function bJ(e, t) {
  let r = e.getLogger(),
    n = e.getRoot(),
    i = n.listTextures(),
    o = /*@__PURE__*/ new Map();
  for (let s = 0; s < i.length; s++) {
    let a = i[s],
      l = a.getImage();
    if (o.has(a)) continue;
    for (let c = s + 1; c < i.length; c++) {
      let u = i[c],
        d = u.getImage();
      if (o.has(u)) continue;
      if (a.getMimeType() !== u.getMimeType()) continue;
      if (t.keepUniqueNames && a.getName() !== u.getName()) continue;
      let h = a.getSize(),
        f = u.getSize();
      if (!h || !f) continue;
      if (h[0] !== f[0]) continue;
      if (h[1] !== f[1]) continue;
      if (!l || !d) continue;
      if (rr.equals(l, d)) o.set(u, a);
    }
  }
  (r.debug(`${jd}: Merged ${o.size} of ${n.listTextures().length} textures.`),
    Array.from(o.entries()).forEach(([s, a]) => {
      (s.listParents().forEach((l) => {
        if (!(l instanceof Qd)) l.swap(s, a);
      }),
        s.dispose());
    }));
}
function _J(e, t) {
  let r = e.getLogger(),
    i = e.getRoot().listMaterials(),
    o = /*@__PURE__*/ new Map(),
    s = /*@__PURE__*/ new Map(),
    a = /*@__PURE__*/ new Set();
  if (!t.keepUniqueNames) a.add("name");
  for (let l = 0; l < i.length; l++) {
    let c = i[l];
    if (o.has(c)) continue;
    if (MD(c, s)) continue;
    for (let u = l + 1; u < i.length; u++) {
      let d = i[u];
      if (o.has(d)) continue;
      if (MD(d, s)) continue;
      if (c.equals(d, a)) o.set(d, c);
    }
  }
  (r.debug(`${jd}: Merged ${o.size} of ${i.length} materials.`),
    Array.from(o.entries()).forEach(([l, c]) => {
      (l.listParents().forEach((u) => {
        if (!(u instanceof Qd)) u.swap(l, c);
      }),
        l.dispose());
    }));
}
function vJ(e, t) {
  let r = e.getLogger(),
    i = e.getRoot().listSkins(),
    o = /*@__PURE__*/ new Map(),
    s = /*@__PURE__*/ new Set(["joints"]);
  if (!t.keepUniqueNames) s.add("name");
  for (let a = 0; a < i.length; a++) {
    let l = i[a];
    if (o.has(l)) continue;
    for (let c = a + 1; c < i.length; c++) {
      let u = i[c];
      if (o.has(u)) continue;
      if (l.equals(u, s) && Z$(l.listJoints(), u.listJoints())) o.set(u, l);
    }
  }
  (r.debug(`${jd}: Merged ${o.size} of ${i.length} skins.`),
    Array.from(o.entries()).forEach(([a, l]) => {
      (a.listParents().forEach((c) => {
        if (!(c instanceof Qd)) c.swap(a, l);
      }),
        a.dispose());
    }));
}
function VD(e, t) {
  let r = [];
  for (let n of e.listSemantics()) {
    let i = e.getAttribute(n);
    r.push(n + ":" + t.get(i));
  }
  if (e instanceof Wo) {
    let n = e.getIndices();
    if (n) r.push("indices:" + t.get(n));
    let i = e.getMaterial();
    if (i) r.push("material:" + t.get(i));
    r.push("mode:" + e.getMode());
    for (let o of e.listTargets()) r.push("target:" + VD(o, t));
  }
  return r.join(",");
}
function MD(e, t) {
  if (t.has(e)) return t.get(e);
  let r = e.getGraph(),
    n = /*@__PURE__*/ new Set(),
    i = r.listParentEdges(e);
  while (i.length > 0) {
    let o = i.pop();
    if (o.getAttributes().modifyChild === !0) return (t.set(e, !0), !0);
    let s = o.getChild();
    if (n.has(s)) continue;
    for (let a of r.listChildEdges(s)) i.push(a);
  }
  return (t.set(e, !1), !1);
}
var ID = "dequantize",
  Ob = { pattern: /^((?!JOINTS_).)*$/ };
function WD(e = Ob) {
  let t = kE(Ob, e);
  return FD(ID, (r) => {
    let n = r.getLogger();
    for (let i of r.getRoot().listMeshes()) for (let o of i.listPrimitives()) CJ(o, t);
    (r.createExtension(Xf).dispose(), n.debug(`${ID}: Complete.`));
  });
}
function CJ(e, t = Ob) {
  let r = kE(Ob, t);
  for (let n of e.listSemantics()) if (r.pattern.test(n)) RD(e.getAttribute(n));
  for (let n of e.listTargets())
    for (let i of n.listSemantics()) if (r.pattern.test(i)) RD(n.getAttribute(i));
}
function RD(e) {
  let t = e.getArray();
  if (!t) return;
  let r = wJ(t, e.getComponentType(), e.getNormalized());
  e.setArray(r).setNormalized(!1);
}
function wJ(e, t, r) {
  let n = new Float32Array(e.length);
  for (let i = 0, o = e.length; i < o; i++)
    if (r) n[i] = gr.decodeNormalizedInt(e[i], t);
    else n[i] = e[i];
  return n;
}
var { TEXTURE_INFO: u3e, ROOT: d3e } = Ie;
function TJ() {
  var e = new f1(4);
  if (f1 != Float32Array) ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0));
  return e;
}
(function () {
  var e = TJ();
  return function (t, r, n, i, o, s) {
    var a, l;
    if (!r) r = 4;
    if (!n) n = 0;
    if (i) l = Math.min(i * r + n, t.length);
    else l = t.length;
    for (a = n; a < l; a += r)
      ((e[0] = t[a]),
        (e[1] = t[a + 1]),
        (e[2] = t[a + 2]),
        (e[3] = t[a + 3]),
        o(e, e, s),
        (t[a] = e[0]),
        (t[a + 1] = e[1]),
        (t[a + 2] = e[2]),
        (t[a + 3] = e[3]));
    return t;
  };
})();
var h3e = {
  propertyTypes: [
    Ie.NODE,
    Ie.SKIN,
    Ie.MESH,
    Ie.CAMERA,
    Ie.PRIMITIVE,
    Ie.PRIMITIVE_TARGET,
    Ie.ANIMATION,
    Ie.MATERIAL,
    Ie.TEXTURE,
    Ie.ACCESSOR,
    Ie.BUFFER,
  ],
  keepLeaves: !1,
  keepAttributes: !1,
  keepIndices: !1,
  keepSolidTextures: !1,
  keepExtras: !1,
};
var { LINE_STRIP: f3e, LINE_LOOP: p3e, TRIANGLE_STRIP: m3e, TRIANGLE_FAN: g3e } = Wo.Mode;
var { ROOT: A3e, NODE: y3e, MESH: x3e, PRIMITIVE: b3e, ACCESSOR: _3e } = Ie;
var { TRANSLATION: v3e, ROTATION: C3e, SCALE: w3e, WEIGHTS: T3e } = Qf.TargetPath;
var EJ = {
  pattern: /.*/,
  quantizationVolume: "mesh",
  quantizePosition: 14,
  quantizeNormal: 10,
  quantizeTexcoord: 12,
  quantizeColor: 8,
  quantizeWeight: 8,
  quantizeGeneric: 12,
  normalizeWeights: !0,
  cleanup: !0,
};
var E3e = o3({ level: "high" }, EJ);
var OD;
(function (e) {
  ((e[(e.STEP = 0)] = "STEP"), (e[(e.LERP = 1)] = "LERP"), (e[(e.SLERP = 2)] = "SLERP"));
})(OD || (OD = {}));
var SJ = 0.000001;
function MJ(e, t, r, n = 0.0001) {
  let i = t.length / e.length,
    o = Array(i).fill(0),
    s = Array(i).fill(0),
    a = Array(i).fill(0),
    l = Array(i).fill(0),
    c = e.length - 1,
    u = 1;
  for (let d = 1; d < c; ++d) {
    let h = e[u - 1],
      f = e[d],
      p = e[d + 1],
      g = (f - h) / (p - h),
      m = !1;
    if (f !== p && (d !== 1 || f !== e[0])) {
      if ((i3(t, u - 1, l), i3(t, d, s), i3(t, d + 1, a), r === "slerp")) {
        let A = OJ(o, l, a, g),
          y = BD(l, s) + BD(s, a);
        m = !Rb(s, A, n) || y + Number.EPSILON >= Math.PI;
      } else if (r === "lerp") {
        let A = RJ(o, l, a, g);
        m = !Rb(s, A, n);
      } else if (r === "step") m = !Rb(s, l) || !Rb(s, a);
    }
    if (m) {
      if (d !== u) ((e[u] = e[d]), LD(t, u, i3(t, d, o)));
      u++;
    }
  }
  if (c > 0) ((e[u] = e[c]), LD(t, u, i3(t, c, o)), u++);
  return u;
}
function i3(e, t, r) {
  for (let n = 0, i = r.length; n < i; n++) r[n] = e[t * i + n];
  return r;
}
function LD(e, t, r) {
  for (let n = 0, i = r.length; n < i; n++) e[t * i + n] = r[n];
}
function Rb(e, t, r = 0) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (Math.abs(e[n] - t[n]) > r) return !1;
  return !0;
}
function IJ(e, t, r) {
  return e * (1 - r) + t * r;
}
function RJ(e, t, r, n) {
  for (let i = 0; i < t.length; i++) e[i] = IJ(t[i], r[i], n);
  return e;
}
function OJ(e, t, r, n) {
  let i = t[0],
    o = t[1],
    s = t[2],
    a = t[3],
    l = r[0],
    c = r[1],
    u = r[2],
    d = r[3],
    h,
    f,
    p,
    g,
    m;
  if (((f = i * l + o * c + s * u + a * d), f < 0))
    ((f = -f), (l = -l), (c = -c), (u = -u), (d = -d));
  if (1 - f > SJ)
    ((h = Math.acos(f)),
      (p = Math.sin(h)),
      (g = Math.sin((1 - n) * h) / p),
      (m = Math.sin(n * h) / p));
  else ((g = 1 - n), (m = n));
  return (
    (e[0] = g * i + m * l),
    (e[1] = g * o + m * c),
    (e[2] = g * s + m * u),
    (e[3] = g * a + m * d),
    e
  );
}
function BD(e, t) {
  let r = LJ(e, t);
  return Math.acos(2 * r * r - 1);
}
function LJ(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
var S3e = new Float32Array(0),
  M3e = { ready: Promise.resolve(), resample: MJ, tolerance: 0.0001, cleanup: !0 };
var {
  POINTS: I3e,
  LINES: R3e,
  LINE_STRIP: O3e,
  LINE_LOOP: L3e,
  TRIANGLES: B3e,
  TRIANGLE_STRIP: F3e,
  TRIANGLE_FAN: D3e,
} = Wo.Mode;
var PE;
(function (e) {
  ((e.LANCZOS3 = "lanczos3"), (e.LANCZOS2 = "lanczos2"));
})(PE || (PE = {}));
var N3e = {
  resizeFilter: PE.LANCZOS3,
  pattern: void 0,
  formats: void 0,
  slots: void 0,
  quality: void 0,
  effort: void 0,
  lossless: !1,
  nearLossless: !1,
  limitInputPixels: !0,
};
