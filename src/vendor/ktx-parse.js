// src/vendor/ktx-parse.js
// ktx-parse: KTX2 container reader.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var qR = 0;
var Nw = 2;
var ZR = 1;
var Pw = 2;
var $R = 0,
  JR = 1;
var eO = 10;
var tO = 0;
var kw = 9;
var Uw = 15,
  Hw = 16;
var Gw = 22;
var zw = 37;
var Vw = 43;
var Ww = 76;
var Qw = 83;
var Yw = 97;
var Xw = 100;
var jw = 103;
var Kw = 109;
var qw = 165,
  Zw = 166;
var ex = 1000066000;
class rO {
  constructor() {
    ((this.vkFormat = 0),
      (this.typeSize = 1),
      (this.pixelWidth = 0),
      (this.pixelHeight = 0),
      (this.pixelDepth = 0),
      (this.layerCount = 0),
      (this.faceCount = 1),
      (this.supercompressionScheme = 0),
      (this.levels = []),
      (this.dataFormatDescriptor = [
        {
          vendorId: 0,
          descriptorType: 0,
          descriptorBlockSize: 0,
          versionNumber: 2,
          colorModel: 0,
          colorPrimaries: 1,
          transferFunction: 2,
          flags: 0,
          texelBlockDimension: [0, 0, 0, 0],
          bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
          samples: [],
        },
      ]),
      (this.keyValue = {}),
      (this.globalData = null));
  }
}
class Op {
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
    let e =
      this._dataView.getUint32(this._offset, this._littleEndian) +
      4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return ((this._offset += 8), e);
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
  _scan(e, t) {
    t === void 0 && (t = 0);
    let r = this._offset,
      n = 0;
    for (; this._dataView.getUint8(this._offset) !== t && n < e; ) (n++, this._offset++);
    return (
      n < e && this._offset++,
      new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + r, n)
    );
  }
}
var dfe = new Uint8Array([0]),
  _s = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function KR(e) {
  return /*@__PURE__*/ new TextDecoder().decode(e);
}
function nO(e) {
  let t = new Uint8Array(e.buffer, e.byteOffset, _s.length);
  if (
    t[0] !== _s[0] ||
    t[1] !== _s[1] ||
    t[2] !== _s[2] ||
    t[3] !== _s[3] ||
    t[4] !== _s[4] ||
    t[5] !== _s[5] ||
    t[6] !== _s[6] ||
    t[7] !== _s[7] ||
    t[8] !== _s[8] ||
    t[9] !== _s[9] ||
    t[10] !== _s[10] ||
    t[11] !== _s[11]
  )
    throw Error("Missing KTX 2.0 identifier.");
  let r = new rO(),
    n = 17 * Uint32Array.BYTES_PER_ELEMENT,
    i = new Op(e, _s.length, n, !0);
  ((r.vkFormat = i._nextUint32()),
    (r.typeSize = i._nextUint32()),
    (r.pixelWidth = i._nextUint32()),
    (r.pixelHeight = i._nextUint32()),
    (r.pixelDepth = i._nextUint32()),
    (r.layerCount = i._nextUint32()),
    (r.faceCount = i._nextUint32()));
  let o = i._nextUint32();
  r.supercompressionScheme = i._nextUint32();
  let s = i._nextUint32(),
    a = i._nextUint32(),
    l = i._nextUint32(),
    c = i._nextUint32(),
    u = i._nextUint64(),
    d = i._nextUint64(),
    h = new Op(e, _s.length + n, 3 * o * 8, !0);
  for (let z = 0; z < o; z++)
    r.levels.push({
      levelData: new Uint8Array(e.buffer, e.byteOffset + h._nextUint64(), h._nextUint64()),
      uncompressedByteLength: h._nextUint64(),
    });
  let f = new Op(e, s, a, !0),
    p = {
      vendorId: f._skip(4)._nextUint16(),
      descriptorType: f._nextUint16(),
      versionNumber: f._nextUint16(),
      descriptorBlockSize: f._nextUint16(),
      colorModel: f._nextUint8(),
      colorPrimaries: f._nextUint8(),
      transferFunction: f._nextUint8(),
      flags: f._nextUint8(),
      texelBlockDimension: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()],
      bytesPlane: [
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
        f._nextUint8(),
      ],
      samples: [],
    },
    g = (p.descriptorBlockSize / 4 - 6) / 4;
  for (let z = 0; z < g; z++) {
    let X = {
      bitOffset: f._nextUint16(),
      bitLength: f._nextUint8(),
      channelType: f._nextUint8(),
      samplePosition: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()],
      sampleLower: -1 / 0,
      sampleUpper: 1 / 0,
    };
    (64 & X.channelType
      ? ((X.sampleLower = f._nextInt32()), (X.sampleUpper = f._nextInt32()))
      : ((X.sampleLower = f._nextUint32()), (X.sampleUpper = f._nextUint32())),
      (p.samples[z] = X));
  }
  ((r.dataFormatDescriptor.length = 0), r.dataFormatDescriptor.push(p));
  let m = new Op(e, l, c, !0);
  for (; m._offset < c; ) {
    let z = m._nextUint32(),
      X = m._scan(z),
      G = KR(X);
    if (((r.keyValue[G] = m._nextUint8Array(z - X.byteLength - 1)), G.match(/^ktx/i))) {
      let Q = KR(r.keyValue[G]);
      r.keyValue[G] = Q.substring(0, Q.lastIndexOf("\x00"));
    }
    m._skip(z % 4 ? 4 - (z % 4) : 0);
  }
  if (d <= 0) return r;
  let A = new Op(e, u, d, !0),
    y = A._nextUint16(),
    x = A._nextUint16(),
    b = A._nextUint32(),
    v = A._nextUint32(),
    _ = A._nextUint32(),
    w = A._nextUint32(),
    S = [];
  for (let z = 0; z < o; z++)
    S.push({
      imageFlags: A._nextUint32(),
      rgbSliceByteOffset: A._nextUint32(),
      rgbSliceByteLength: A._nextUint32(),
      alphaSliceByteOffset: A._nextUint32(),
      alphaSliceByteLength: A._nextUint32(),
    });
  let E = u + A._offset,
    T = E + b,
    M = T + v,
    C = M + _,
    R = new Uint8Array(e.buffer, e.byteOffset + E, b),
    B = new Uint8Array(e.buffer, e.byteOffset + T, v),
    L = new Uint8Array(e.buffer, e.byteOffset + M, _),
    k = new Uint8Array(e.buffer, e.byteOffset + C, w);
  return (
    (r.globalData = {
      endpointCount: y,
      selectorCount: x,
      imageDescs: S,
      endpointsData: R,
      selectorsData: B,
      tablesData: L,
      extendedData: k,
    }),
    r
  );
}
function $w(e, t) {
  if (t === TrianglesDrawMode) return e;
  if (t === TriangleFanDrawMode || t === TriangleStripDrawMode) {
    let r = e.getIndex();
    if (r === null) {
      let s = [],
        a = e.getAttribute("position");
      if (a !== void 0) {
        for (let l = 0; l < a.count; l++) s.push(l);
        (e.setIndex(s), (r = e.getIndex()));
      } else return e;
    }
    let n = r.count - 2,
      i = [];
    if (t === TriangleFanDrawMode)
      for (let s = 1; s <= n; s++) (i.push(r.getX(0)), i.push(r.getX(s)), i.push(r.getX(s + 1)));
    else
      for (let s = 0; s < n; s++)
        if (s % 2 === 0) (i.push(r.getX(s)), i.push(r.getX(s + 1)), i.push(r.getX(s + 2)));
        else (i.push(r.getX(s + 2)), i.push(r.getX(s + 1)), i.push(r.getX(s)));
    if (i.length / 3 !== n);
    let o = e.clone();
    return (o.setIndex(i), o.clearGroups(), o);
  } else return e;
}
