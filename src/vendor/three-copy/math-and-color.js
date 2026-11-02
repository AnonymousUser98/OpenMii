// src/vendor/three-copy/math-and-color.js
// A second, partial copy of three.js maths (Matrix3, Color, ColorManagement) pulled in by the
// renderer.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var rs = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff",
];
var qj = Math.PI / 180,
  Nfe = 180 / Math.PI;
function vd() {
  let e = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    r = (Math.random() * 4294967295) | 0,
    n = (Math.random() * 4294967295) | 0;
  return (
    rs[e & 255] +
    rs[(e >> 8) & 255] +
    rs[(e >> 16) & 255] +
    rs[(e >> 24) & 255] +
    "-" +
    rs[t & 255] +
    rs[(t >> 8) & 255] +
    "-" +
    rs[((t >> 16) & 15) | 64] +
    rs[(t >> 24) & 255] +
    "-" +
    rs[(r & 63) | 128] +
    rs[(r >> 8) & 255] +
    "-" +
    rs[(r >> 16) & 255] +
    rs[(r >> 24) & 255] +
    rs[n & 255] +
    rs[(n >> 8) & 255] +
    rs[(n >> 16) & 255] +
    rs[(n >> 24) & 255]
  ).toLowerCase();
}
function Fr(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
function UO(e, t) {
  return ((e % t) + t) % t;
}
function rx(e, t, r) {
  return (1 - r) * e + r * t;
}
function HO(e) {
  return e * qj;
}
var gT = 0;
var AT = 1;
var yT = 100;
var xT = 204,
  bT = 205;
var _T = 3;
var vT = 300;
var CT = 1000,
  ig = 1001,
  wT = 1002,
  TT = 1003;
var nx = 1006;
var GO = 1008;
var zO = 1009;
var VO = 1023;
var ix = "",
  va = "srgb",
  ET = "srgb-linear",
  ST = "linear",
  ox = "srgb";
var If = 7680;
var MT = 519;
var og = 2000,
  IT = 2001;
class Matrix3_2 {
  constructor(e, t, r, n, i, o, s, a, l) {
    if (
      ((Matrix3_2.prototype.isMatrix3 = !0), (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]), e !== void 0)
    )
      this.set(e, t, r, n, i, o, s, a, l);
  }
  set(e, t, r, n, i, o, s, a, l) {
    let c = this.elements;
    return (
      (c[0] = e),
      (c[1] = n),
      (c[2] = s),
      (c[3] = t),
      (c[4] = i),
      (c[5] = a),
      (c[6] = r),
      (c[7] = o),
      (c[8] = l),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
  }
  copy(e) {
    let t = this.elements,
      r = e.elements;
    return (
      (t[0] = r[0]),
      (t[1] = r[1]),
      (t[2] = r[2]),
      (t[3] = r[3]),
      (t[4] = r[4]),
      (t[5] = r[5]),
      (t[6] = r[6]),
      (t[7] = r[7]),
      (t[8] = r[8]),
      this
    );
  }
  extractBasis(e, t, r) {
    return (
      e.setFromMatrix3Column(this, 0),
      t.setFromMatrix3Column(this, 1),
      r.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(e) {
    let t = e.elements;
    return (this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this);
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    let r = e.elements,
      n = t.elements,
      i = this.elements,
      o = r[0],
      s = r[3],
      a = r[6],
      l = r[1],
      c = r[4],
      u = r[7],
      d = r[2],
      h = r[5],
      f = r[8],
      p = n[0],
      g = n[3],
      m = n[6],
      A = n[1],
      y = n[4],
      x = n[7],
      b = n[2],
      v = n[5],
      _ = n[8];
    return (
      (i[0] = o * p + s * A + a * b),
      (i[3] = o * g + s * y + a * v),
      (i[6] = o * m + s * x + a * _),
      (i[1] = l * p + c * A + u * b),
      (i[4] = l * g + c * y + u * v),
      (i[7] = l * m + c * x + u * _),
      (i[2] = d * p + h * A + f * b),
      (i[5] = d * g + h * y + f * v),
      (i[8] = d * m + h * x + f * _),
      this
    );
  }
  multiplyScalar(e) {
    let t = this.elements;
    return (
      (t[0] *= e),
      (t[3] *= e),
      (t[6] *= e),
      (t[1] *= e),
      (t[4] *= e),
      (t[7] *= e),
      (t[2] *= e),
      (t[5] *= e),
      (t[8] *= e),
      this
    );
  }
  determinant() {
    let e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      o = e[4],
      s = e[5],
      a = e[6],
      l = e[7],
      c = e[8];
    return t * o * c - t * s * l - r * i * c + r * s * a + n * i * l - n * o * a;
  }
  invert() {
    let e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      o = e[4],
      s = e[5],
      a = e[6],
      l = e[7],
      c = e[8],
      u = c * o - s * l,
      d = s * a - c * i,
      h = l * i - o * a,
      f = t * u + r * d + n * h;
    if (f === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    let p = 1 / f;
    return (
      (e[0] = u * p),
      (e[1] = (n * l - c * r) * p),
      (e[2] = (s * r - n * o) * p),
      (e[3] = d * p),
      (e[4] = (c * t - n * a) * p),
      (e[5] = (n * i - s * t) * p),
      (e[6] = h * p),
      (e[7] = (r * a - l * t) * p),
      (e[8] = (o * t - r * i) * p),
      this
    );
  }
  transpose() {
    let e,
      t = this.elements;
    return (
      (e = t[1]),
      (t[1] = t[3]),
      (t[3] = e),
      (e = t[2]),
      (t[2] = t[6]),
      (t[6] = e),
      (e = t[5]),
      (t[5] = t[7]),
      (t[7] = e),
      this
    );
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    let t = this.elements;
    return (
      (e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]),
      this
    );
  }
  setUvTransform(e, t, r, n, i, o, s) {
    let a = Math.cos(i),
      l = Math.sin(i);
    return (
      this.set(
        r * a,
        r * l,
        -r * (a * o + l * s) + o + e,
        -n * l,
        n * a,
        -n * (-l * o + a * s) + s + t,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(e, t) {
    return (this.premultiply(RT.makeScale(e, t)), this);
  }
  rotate(e) {
    return (this.premultiply(RT.makeRotation(-e)), this);
  }
  translate(e, t) {
    return (this.premultiply(RT.makeTranslation(e, t)), this);
  }
  makeTranslation(e, t) {
    if (e.isVector2) this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1);
    else this.set(1, 0, e, 0, 1, t, 0, 0, 1);
    return this;
  }
  makeRotation(e) {
    let t = Math.cos(e),
      r = Math.sin(e);
    return (this.set(t, -r, 0, r, t, 0, 0, 0, 1), this);
  }
  makeScale(e, t) {
    return (this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this);
  }
  equals(e) {
    let t = this.elements,
      r = e.elements;
    for (let n = 0; n < 9; n++) if (t[n] !== r[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 9; r++) this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    let r = this.elements;
    return (
      (e[t] = r[0]),
      (e[t + 1] = r[1]),
      (e[t + 2] = r[2]),
      (e[t + 3] = r[3]),
      (e[t + 4] = r[4]),
      (e[t + 5] = r[5]),
      (e[t + 6] = r[6]),
      (e[t + 7] = r[7]),
      (e[t + 8] = r[8]),
      e
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
var RT = /*@__PURE__*/ new Matrix3_2();
var WO = /*@__PURE__*/ new Matrix3_2().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322,
  ),
  QO = /*@__PURE__*/ new Matrix3_2().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715,
  );
function Zj() {
  let e = {
      enabled: !0,
      workingColorSpace: ET,
      spaces: {},
      convert: function (i, o, s) {
        if (this.enabled === !1 || o === s || !o || !s) return i;
        if (this.spaces[o].transfer === ox) ((i.r = Fl(i.r)), (i.g = Fl(i.g)), (i.b = Fl(i.b)));
        if (this.spaces[o].primaries !== this.spaces[s].primaries)
          (i.applyMatrix3(this.spaces[o].toXYZ), i.applyMatrix3(this.spaces[s].fromXYZ));
        if (this.spaces[s].transfer === ox) ((i.r = Rf(i.r)), (i.g = Rf(i.g)), (i.b = Rf(i.b)));
        return i;
      },
      fromWorkingColorSpace: function (i, o) {
        return this.convert(i, this.workingColorSpace, o);
      },
      toWorkingColorSpace: function (i, o) {
        return this.convert(i, o, this.workingColorSpace);
      },
      getPrimaries: function (i) {
        return this.spaces[i].primaries;
      },
      getTransfer: function (i) {
        if (i === ix) return ST;
        return this.spaces[i].transfer;
      },
      getLuminanceCoefficients: function (i, o = this.workingColorSpace) {
        return i.fromArray(this.spaces[o].luminanceCoefficients);
      },
      define: function (i) {
        Object.assign(this.spaces, i);
      },
      _getMatrix: function (i, o, s) {
        return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (i) {
        return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (i = this.workingColorSpace) {
        return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    r = [0.2126, 0.7152, 0.0722],
    n = [0.3127, 0.329];
  return (
    e.define({
      [ET]: {
        primaries: t,
        whitePoint: n,
        transfer: ST,
        toXYZ: WO,
        fromXYZ: QO,
        luminanceCoefficients: r,
        workingColorSpaceConfig: { unpackColorSpace: va },
        outputColorSpaceConfig: { drawingBufferColorSpace: va },
      },
      [va]: {
        primaries: t,
        whitePoint: n,
        transfer: ox,
        toXYZ: WO,
        fromXYZ: QO,
        luminanceCoefficients: r,
        outputColorSpaceConfig: { drawingBufferColorSpace: va },
      },
    }),
    e
  );
}
var $a = /*@__PURE__*/ Zj();
function Fl(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function Rf(e) {
  return e < 0.0031308 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var YO = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  Cd = { h: 0, s: 0, l: 0 },
  sx = { h: 0, s: 0, l: 0 };
function OT(e, t, r) {
  if (r < 0) r += 1;
  if (r > 1) r -= 1;
  if (r < 0.16666666666666666) return e + (t - e) * 6 * r;
  if (r < 0.5) return t;
  if (r < 0.6666666666666666) return e + (t - e) * 6 * (0.6666666666666666 - r);
  return e;
}
class Color_2 {
  constructor(e, t, r) {
    return ((this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(e, t, r));
  }
  set(e, t, r) {
    if (t === void 0 && r === void 0) {
      let n = e;
      if (n && n.isColor) this.copy(n);
      else if (typeof n === "number") this.setHex(n);
      else if (typeof n === "string") this.setStyle(n);
    } else this.setRGB(e, t, r);
    return this;
  }
  setScalar(e) {
    return ((this.r = e), (this.g = e), (this.b = e), this);
  }
  setHex(e, t = va) {
    return (
      (e = Math.floor(e)),
      (this.r = ((e >> 16) & 255) / 255),
      (this.g = ((e >> 8) & 255) / 255),
      (this.b = (e & 255) / 255),
      $a.toWorkingColorSpace(this, t),
      this
    );
  }
  setRGB(e, t, r, n = $a.workingColorSpace) {
    return ((this.r = e), (this.g = t), (this.b = r), $a.toWorkingColorSpace(this, n), this);
  }
  setHSL(e, t, r, n = $a.workingColorSpace) {
    if (((e = UO(e, 1)), (t = Fr(t, 0, 1)), (r = Fr(r, 0, 1)), t === 0))
      this.r = this.g = this.b = r;
    else {
      let i = r <= 0.5 ? r * (1 + t) : r + t - r * t,
        o = 2 * r - i;
      ((this.r = OT(o, i, e + 0.3333333333333333)),
        (this.g = OT(o, i, e)),
        (this.b = OT(o, i, e - 0.3333333333333333)));
    }
    return ($a.toWorkingColorSpace(this, n), this);
  }
  setStyle(e, t = va) {
    function r(i) {
      if (i === void 0) return;
      if (parseFloat(i) < 1);
    }
    let n;
    if ((n = /^(\w+)\(([^\)]*)\)/.exec(e))) {
      let i,
        o = n[1],
        s = n[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if ((i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)))
            return (
              r(i[4]),
              this.setRGB(
                Math.min(255, parseInt(i[1], 10)) / 255,
                Math.min(255, parseInt(i[2], 10)) / 255,
                Math.min(255, parseInt(i[3], 10)) / 255,
                t,
              )
            );
          if ((i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)))
            return (
              r(i[4]),
              this.setRGB(
                Math.min(100, parseInt(i[1], 10)) / 100,
                Math.min(100, parseInt(i[2], 10)) / 100,
                Math.min(100, parseInt(i[3], 10)) / 100,
                t,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (i =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                s,
              ))
          )
            return (
              r(i[4]),
              this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t)
            );
          break;
        default:
      }
    } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(e))) {
      let i = n[1],
        o = i.length;
      if (o === 3)
        return this.setRGB(
          parseInt(i.charAt(0), 16) / 15,
          parseInt(i.charAt(1), 16) / 15,
          parseInt(i.charAt(2), 16) / 15,
          t,
        );
      else if (o === 6) return this.setHex(parseInt(i, 16), t);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = va) {
    let r = YO[e.toLowerCase()];
    if (r !== void 0) this.setHex(r, t);
    return this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return ((this.r = e.r), (this.g = e.g), (this.b = e.b), this);
  }
  copySRGBToLinear(e) {
    return ((this.r = Fl(e.r)), (this.g = Fl(e.g)), (this.b = Fl(e.b)), this);
  }
  copyLinearToSRGB(e) {
    return ((this.r = Rf(e.r)), (this.g = Rf(e.g)), (this.b = Rf(e.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex(e = va) {
    return (
      $a.fromWorkingColorSpace(ns.copy(this), e),
      Math.round(Fr(ns.r * 255, 0, 255)) * 65536 +
        Math.round(Fr(ns.g * 255, 0, 255)) * 256 +
        Math.round(Fr(ns.b * 255, 0, 255))
    );
  }
  getHexString(e = va) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = $a.workingColorSpace) {
    $a.fromWorkingColorSpace(ns.copy(this), t);
    let { r, g: n, b: i } = ns,
      o = Math.max(r, n, i),
      s = Math.min(r, n, i),
      a,
      l,
      c = (s + o) / 2;
    if (s === o) ((a = 0), (l = 0));
    else {
      let u = o - s;
      switch (((l = c <= 0.5 ? u / (o + s) : u / (2 - o - s)), o)) {
        case r:
          a = (n - i) / u + (n < i ? 6 : 0);
          break;
        case n:
          a = (i - r) / u + 2;
          break;
        case i:
          a = (r - n) / u + 4;
          break;
      }
      a /= 6;
    }
    return ((e.h = a), (e.s = l), (e.l = c), e);
  }
  getRGB(e, t = $a.workingColorSpace) {
    return (
      $a.fromWorkingColorSpace(ns.copy(this), t),
      (e.r = ns.r),
      (e.g = ns.g),
      (e.b = ns.b),
      e
    );
  }
  getStyle(e = va) {
    $a.fromWorkingColorSpace(ns.copy(this), e);
    let { r: t, g: r, b: n } = ns;
    if (e !== va) return `color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})`;
    return `rgb(${Math.round(t * 255)},${Math.round(r * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, r) {
    return (this.getHSL(Cd), this.setHSL(Cd.h + e, Cd.s + t, Cd.l + r));
  }
  add(e) {
    return ((this.r += e.r), (this.g += e.g), (this.b += e.b), this);
  }
  addColors(e, t) {
    return ((this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this);
  }
  addScalar(e) {
    return ((this.r += e), (this.g += e), (this.b += e), this);
  }
  sub(e) {
    return (
      (this.r = Math.max(0, this.r - e.r)),
      (this.g = Math.max(0, this.g - e.g)),
      (this.b = Math.max(0, this.b - e.b)),
      this
    );
  }
  multiply(e) {
    return ((this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this);
  }
  multiplyScalar(e) {
    return ((this.r *= e), (this.g *= e), (this.b *= e), this);
  }
  lerp(e, t) {
    return (
      (this.r += (e.r - this.r) * t),
      (this.g += (e.g - this.g) * t),
      (this.b += (e.b - this.b) * t),
      this
    );
  }
  lerpColors(e, t, r) {
    return (
      (this.r = e.r + (t.r - e.r) * r),
      (this.g = e.g + (t.g - e.g) * r),
      (this.b = e.b + (t.b - e.b) * r),
      this
    );
  }
  lerpHSL(e, t) {
    (this.getHSL(Cd), e.getHSL(sx));
    let r = rx(Cd.h, sx.h, t),
      n = rx(Cd.s, sx.s, t),
      i = rx(Cd.l, sx.l, t);
    return (this.setHSL(r, n, i), this);
  }
  setFromVector3(e) {
    return ((this.r = e.x), (this.g = e.y), (this.b = e.z), this);
  }
  applyMatrix3(e) {
    let t = this.r,
      r = this.g,
      n = this.b,
      i = e.elements;
    return (
      (this.r = i[0] * t + i[3] * r + i[6] * n),
      (this.g = i[1] * t + i[4] * r + i[7] * n),
      (this.b = i[2] * t + i[5] * r + i[8] * n),
      this
    );
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return ((this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e);
  }
  fromBufferAttribute(e, t) {
    return ((this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), this);
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}
var ns = /*@__PURE__*/ new Color_2();
Color_2.NAMES = YO;
