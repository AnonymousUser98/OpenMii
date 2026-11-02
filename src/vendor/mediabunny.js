// src/vendor/mediabunny.js
// Mediabunny: video/GIF encoding for animated renders.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var Zb = (e) => {
    let t = ((e % 360) + 360) % 360;
    if (t === 0 || t === 90 || t === 180 || t === 270) return t;
    else throw Error(`Invalid rotation ${e}.`);
  },
  Is = (e) => e && e[e.length - 1],
  Pu = (e) => e >= 0 && e < 4294967296,
  ht = (e) => {
    let t = 0;
    while (e.readBits(1) === 0 && t < 32) t++;
    if (t >= 32) throw Error("Invalid exponential-Golomb code.");
    return (1 << t) - 1 + e.readBits(t);
  },
  wc = (e) => {
    let t = ht(e);
    return (t & 1) === 0 ? -(t >> 1) : (t + 1) >> 1;
  },
  IN = (e, t, r, n) => {
    for (let i = t; i < r; i++) {
      let o = Math.floor(i / 8),
        s = e[o],
        a = 7 - (i & 7);
      ((s &= ~(1 << a)), (s |= ((n & (1 << (r - i - 1))) >> (r - i - 1)) << a), (e[o] = s));
    }
  },
  Fo = (e) => {
    if (e.constructor === Uint8Array) return e;
    else if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    else return new Uint8Array(e);
  },
  T1 = (e) => {
    if (e.constructor === DataView) return e;
    else if (ArrayBuffer.isView(e)) return new DataView(e.buffer, e.byteOffset, e.byteLength);
    else return new DataView(e);
  };
var Co = /*@__PURE__*/ new TextEncoder();
var ku = { bt709: 1, bt470bg: 5, smpte170m: 6, bt2020: 9, smpte432: 12 };
var Uu = { bt709: 1, smpte170m: 6, linear: 8, "iec61966-2-1": 13, pq: 16, hlg: 18 };
var Hu = { rgb: 0, bt709: 1, bt470bg: 5, smpte170m: 6, "bt2020-ncl": 9 };
var $b = (e) => !!e && !!e.primaries && !!e.transfer && !!e.matrix && e.fullRange !== void 0,
  p3 = (e) =>
    e instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) ||
    ArrayBuffer.isView(e);
class m3 {
  constructor() {
    ((this.currentPromise = Promise.resolve()), (this.pending = 0));
  }
  async acquire() {
    let e,
      t = new Promise((n) => {
        let i = !1;
        e = () => {
          if (i) return;
          (n(), this.pending--, (i = !0));
        };
      }),
      r = this.currentPromise;
    return ((this.currentPromise = t), this.pending++, await r, e);
  }
}
var a6 = (e, t, r) => {
  let n = 0,
    i = e.length - 1,
    o = -1;
  while (n <= i) {
    let s = (n + (i - n + 1) / 2) | 0;
    if (r(e[s]) <= t) ((o = s), (n = s + 1));
    else i = s - 1;
  }
  return o;
};
var E1 = () => {
  let e, t;
  return {
    promise: new Promise((n, i) => {
      ((e = n), (t = i));
    }),
    resolve: e,
    reject: t,
  };
};
var Rs = (e) => {
    throw Error(`Unexpected value: ${e}`);
  },
  l6 = (e, t, r) => {
    let n = e.getUint8(t),
      i = e.getUint8(t + 1),
      o = e.getUint8(t + 2);
    if (r) return n | (i << 8) | (o << 16);
    else return (n << 16) | (i << 8) | o;
  };
var c6 = (e, t, r, n) => {
  if (((r = r >>> 0), (r = r & 16777215), n))
    (e.setUint8(t, r & 255),
      e.setUint8(t + 1, (r >>> 8) & 255),
      e.setUint8(t + 2, (r >>> 16) & 255));
  else
    (e.setUint8(t, (r >>> 16) & 255),
      e.setUint8(t + 1, (r >>> 8) & 255),
      e.setUint8(t + 2, r & 255));
};
var S1 = (e, t, r) => Math.max(t, Math.min(r, e)),
  RN = (e, t, r) => e + (t - e) * r,
  Jb = "und";
var u6 = (e, t) => Math.round(e / t) * t,
  e_ = (e, t) => Math.round(e * t) / t;
var d6 = (e, t) => Math.floor(e * t) / t;
var mee = /^[a-z]{3}$/,
  ON = (e) => mee.test(e),
  rh = 1e6 * (1 + Number.EPSILON);
var LN = (e, t) => {
  let r = e < 0 ? -1 : 1;
  e = Math.abs(e);
  let n = 0,
    i = 1,
    o = 1,
    s = 0,
    a = e;
  while (!0) {
    let l = Math.floor(a),
      c = l * o + n,
      u = l * s + i;
    if (u > t) return { num: r * o, den: s };
    if (((n = o), (i = s), (o = c), (s = u), (a = 1 / (a - l)), !isFinite(a))) break;
  }
  return { num: r * o, den: s };
};
class h6 {
  constructor() {
    this.currentPromise = Promise.resolve();
  }
  call(e) {
    return (this.currentPromise = this.currentPromise.then(e));
  }
}
var i6 = null,
  f6 = () => {
    if (i6 !== null) return i6;
    return (i6 = typeof navigator < "u" && navigator.userAgent?.includes("Firefox"));
  },
  o6 = null,
  BN = () => {
    if (o6 !== null) return o6;
    return (o6 = !!(
      typeof navigator < "u" &&
      (navigator.vendor?.includes("Google Inc") || /Chrome/.test(navigator.userAgent))
    ));
  },
  s6 = null,
  FN = () => {
    if (s6 !== null) return s6;
    if (typeof navigator > "u") return null;
    let e = /\bChrome\/(\d+)/.exec(navigator.userAgent);
    if (!e) return null;
    return (s6 = Number(e[1]));
  };
var M1 = function* (e) {
    for (let t in e) {
      let r = e[t];
      if (r === void 0) continue;
      yield { key: t, value: r };
    }
  },
  DN = (e) => {
    switch (e.toLowerCase()) {
      case "image/jpeg":
      case "image/jpg":
        return ".jpg";
      case "image/png":
        return ".png";
      case "image/gif":
        return ".gif";
      case "image/webp":
        return ".webp";
      case "image/bmp":
        return ".bmp";
      case "image/svg+xml":
        return ".svg";
      case "image/tiff":
        return ".tiff";
      case "image/avif":
        return ".avif";
      case "image/x-icon":
      case "image/vnd.microsoft.icon":
        return ".ico";
      default:
        return null;
    }
  };
var NN = (e, t) => {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
    return !0;
  },
  PN = () => {
    Symbol.dispose ??= Symbol("Symbol.dispose");
  };
var kN = (e, t) => {
  let r = -1,
    n = 1 / 0;
  for (let i = 0; i < e.length; i++) {
    let o = t(e[i]);
    if (o < n) ((n = o), (r = i));
  }
  return r;
};
var I1 = (e) => {
    (Fe(Number.isInteger(e.num)), Fe(Number.isInteger(e.den)), Fe(e.den !== 0));
    let t = Math.abs(e.num),
      r = Math.abs(e.den);
    while (r !== 0) {
      let i = t % r;
      ((t = r), (r = i));
    }
    let n = t || 1;
    return { num: e.num / n, den: e.den / n };
  },
  p6 = (e, t) => {
    if (typeof e !== "object" || !e) throw TypeError(`${t} must be an object.`);
    if (!Number.isInteger(e.left) || e.left < 0)
      throw TypeError(`${t}.left must be a non-negative integer.`);
    if (!Number.isInteger(e.top) || e.top < 0)
      throw TypeError(`${t}.top must be a non-negative integer.`);
    if (!Number.isInteger(e.width) || e.width < 0)
      throw TypeError(`${t}.width must be a non-negative integer.`);
    if (!Number.isInteger(e.height) || e.height < 0)
      throw TypeError(`${t}.height must be a non-negative integer.`);
  };
var UN = (e) => new Promise((t) => setTimeout(t, e));
var m6 = (e) => {
  if (Array.isArray(e)) return e;
  else return [e];
};
class n0 {
  constructor() {
    this._listeners = /*@__PURE__*/ new Map();
  }
  on(e, t, r) {
    if (!this._listeners.has(e)) this._listeners.set(e, /*@__PURE__*/ new Set());
    let n = { fn: t, once: r?.once ?? !1 };
    return (
      this._listeners.get(e).add(n),
      () => {
        this._listeners.get(e)?.delete(n);
      }
    );
  }
  _emit(...e) {
    let [t, r] = e,
      n = this._listeners.get(t);
    if (!n) return;
    for (let i of n) {
      try {
        i.fn(r);
      } catch (o) {}
      if (i.once) n.delete(i);
    }
  }
}
var HN = (e) =>
  e !== null &&
  typeof e === "object" &&
  Object.getPrototypeOf(e) === Object.prototype &&
  Object.values(e).every((t) => typeof t === "string");
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var Tc;
(function (e) {
  ((e[(e.Silent = 0)] = "Silent"),
    (e[(e.Errors = 1)] = "Errors"),
    (e[(e.Warnings = 2)] = "Warnings"),
    (e[(e.Info = 3)] = "Info"));
})(Tc || (Tc = {}));
class Un {
  constructor() {}
  static get level() {
    return Un._level;
  }
  static set level(e) {
    if (e !== Tc.Silent && e !== Tc.Errors && e !== Tc.Warnings && e !== Tc.Info)
      throw TypeError("Invalid log level. Use one of the values of the LogLevel enum.");
    Un._level = e;
  }
  static get _emitter() {
    return (Un._emitterInstance ??= new n0());
  }
  static on(e, t, r) {
    return Un._emitter.on(e, t, r);
  }
  static _error(...e) {
    if ((Un._emitter._emit("error", e), Un._level >= Tc.Errors));
  }
  static _warn(...e) {
    if ((Un._emitter._emit("warn", e), Un._level >= Tc.Warnings));
  }
  static _info(...e) {
    if ((Un._emitter._emit("info", e), Un._level >= Tc.Info));
  }
}
Un._level = Tc.Info;
Un._emitterInstance = null;
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class t_ {
  constructor(e, t) {
    if (((this.data = e), (this.mimeType = t), !(e instanceof Uint8Array)))
      throw TypeError("data must be a Uint8Array.");
    if (typeof t !== "string") throw TypeError("mimeType must be a string.");
  }
}
class r_ {
  constructor(e, t, r, n) {
    if (
      ((this.data = e),
      (this.mimeType = t),
      (this.name = r),
      (this.description = n),
      !(e instanceof Uint8Array))
    )
      throw TypeError("data must be a Uint8Array.");
    if (t !== void 0 && typeof t !== "string")
      throw TypeError("mimeType, when provided, must be a string.");
    if (r !== void 0 && typeof r !== "string")
      throw TypeError("name, when provided, must be a string.");
    if (n !== void 0 && typeof n !== "string")
      throw TypeError("description, when provided, must be a string.");
  }
}
var GN = (e) => {
  if (!e || typeof e !== "object") throw TypeError("tags must be an object.");
  if (e.title !== void 0 && typeof e.title !== "string")
    throw TypeError("tags.title, when provided, must be a string.");
  if (e.description !== void 0 && typeof e.description !== "string")
    throw TypeError("tags.description, when provided, must be a string.");
  if (e.artist !== void 0 && typeof e.artist !== "string")
    throw TypeError("tags.artist, when provided, must be a string.");
  if (e.album !== void 0 && typeof e.album !== "string")
    throw TypeError("tags.album, when provided, must be a string.");
  if (e.albumArtist !== void 0 && typeof e.albumArtist !== "string")
    throw TypeError("tags.albumArtist, when provided, must be a string.");
  if (e.trackNumber !== void 0 && (!Number.isInteger(e.trackNumber) || e.trackNumber <= 0))
    throw TypeError("tags.trackNumber, when provided, must be a positive integer.");
  if (e.tracksTotal !== void 0 && (!Number.isInteger(e.tracksTotal) || e.tracksTotal <= 0))
    throw TypeError("tags.tracksTotal, when provided, must be a positive integer.");
  if (e.discNumber !== void 0 && (!Number.isInteger(e.discNumber) || e.discNumber <= 0))
    throw TypeError("tags.discNumber, when provided, must be a positive integer.");
  if (e.discsTotal !== void 0 && (!Number.isInteger(e.discsTotal) || e.discsTotal <= 0))
    throw TypeError("tags.discsTotal, when provided, must be a positive integer.");
  if (e.genre !== void 0 && typeof e.genre !== "string")
    throw TypeError("tags.genre, when provided, must be a string.");
  if (e.date !== void 0 && (!(e.date instanceof Date) || Number.isNaN(e.date.getTime())))
    throw TypeError("tags.date, when provided, must be a valid Date.");
  if (e.lyrics !== void 0 && typeof e.lyrics !== "string")
    throw TypeError("tags.lyrics, when provided, must be a string.");
  if (e.images !== void 0) {
    if (!Array.isArray(e.images)) throw TypeError("tags.images, when provided, must be an array.");
    for (let t of e.images) {
      if (!t || typeof t !== "object")
        throw TypeError("Each image in tags.images must be an object.");
      if (!(t.data instanceof Uint8Array)) throw TypeError("Each image.data must be a Uint8Array.");
      if (typeof t.mimeType !== "string") throw TypeError("Each image.mimeType must be a string.");
      if (!["coverFront", "coverBack", "unknown"].includes(t.kind))
        throw TypeError("Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.");
    }
  }
  if (e.comment !== void 0 && typeof e.comment !== "string")
    throw TypeError("tags.comment, when provided, must be a string.");
  if (e.raw !== void 0) {
    if (!e.raw || typeof e.raw !== "object")
      throw TypeError("tags.raw, when provided, must be an object.");
    for (let t of Object.values(e.raw))
      if (
        t !== null &&
        typeof t !== "string" &&
        !(t instanceof Uint8Array) &&
        !(t instanceof t_) &&
        !(t instanceof r_) &&
        !HN(t)
      )
        throw TypeError(
          "Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.",
        );
  }
};
var zN = (e) => {
  if (!e || typeof e !== "object") throw TypeError("disposition must be an object.");
  if (e.default !== void 0 && typeof e.default !== "boolean")
    throw TypeError("disposition.default must be a boolean.");
  if (e.primary !== void 0 && typeof e.primary !== "boolean")
    throw TypeError("disposition.primary must be a boolean.");
  if (e.forced !== void 0 && typeof e.forced !== "boolean")
    throw TypeError("disposition.forced must be a boolean.");
  if (e.original !== void 0 && typeof e.original !== "boolean")
    throw TypeError("disposition.original must be a boolean.");
  if (e.commentary !== void 0 && typeof e.commentary !== "boolean")
    throw TypeError("disposition.commentary must be a boolean.");
  if (e.hearingImpaired !== void 0 && typeof e.hearingImpaired !== "boolean")
    throw TypeError("disposition.hearingImpaired must be a boolean.");
  if (e.visuallyImpaired !== void 0 && typeof e.visuallyImpaired !== "boolean")
    throw TypeError("disposition.visuallyImpaired must be a boolean.");
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class Ni {
  constructor(e) {
    ((this.bytes = e), (this.pos = 0));
  }
  seekToByte(e) {
    this.pos = 8 * e;
  }
  readBit() {
    let e = Math.floor(this.pos / 8),
      t = this.bytes[e] ?? 0,
      r = 7 - (this.pos & 7),
      n = (t & (1 << r)) >> r;
    return (this.pos++, n);
  }
  readBits(e) {
    if (e === 1) return this.readBit();
    let t = 0;
    for (let r = 0; r < e; r++) ((t <<= 1), (t |= this.readBit()));
    return t;
  }
  writeBits(e, t) {
    let r = this.pos + e;
    for (let n = this.pos; n < r; n++) {
      let i = Math.floor(n / 8),
        o = this.bytes[i],
        s = 7 - (n & 7);
      ((o &= ~(1 << s)),
        (o |= ((t & (1 << (r - n - 1))) >> (r - n - 1)) << s),
        (this.bytes[i] = o));
    }
    this.pos = r;
  }
  readAlignedByte() {
    if (this.pos % 8 !== 0) throw Error("Bitstream is not byte-aligned.");
    let e = this.pos / 8,
      t = this.bytes[e] ?? 0;
    return ((this.pos += 8), t);
  }
  skipBits(e) {
    this.pos += e;
  }
  getBitsLeft() {
    return this.bytes.length * 8 - this.pos;
  }
  clone() {
    let e = new Ni(this.bytes);
    return ((e.pos = this.pos), e);
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var g3 = [
    96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350,
  ],
  A3 = [-1, 1, 2, 3, 4, 5, 6, 8];
var n_ = (e) => {
  let t = g3.indexOf(e.sampleRate),
    r = null;
  if (t === -1) ((t = 15), (r = e.sampleRate));
  let n = A3.indexOf(e.numberOfChannels);
  if (n === -1) throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);
  let i = 13;
  if (e.objectType >= 32) i += 6;
  if (t === 15) i += 24;
  let o = Math.ceil(i / 8),
    s = new Uint8Array(o),
    a = new Ni(s);
  if (e.objectType < 32) a.writeBits(5, e.objectType);
  else (a.writeBits(5, 31), a.writeBits(6, e.objectType - 32));
  if ((a.writeBits(4, t), t === 15)) a.writeBits(24, r);
  return (a.writeBits(4, n), s);
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var Oa = ["avc", "hevc", "vp9", "av1", "vp8", "prores"],
  Os = [
    "pcm-s16",
    "pcm-s16be",
    "pcm-s24",
    "pcm-s24be",
    "pcm-s32",
    "pcm-s32be",
    "pcm-f32",
    "pcm-f32be",
    "pcm-f64",
    "pcm-f64be",
    "pcm-u8",
    "pcm-s8",
    "ulaw",
    "alaw",
  ],
  b3 = ["aac", "opus", "mp3", "vorbis", "flac", "ac3", "eac3"],
  nh = [...b3, ...Os],
  Ec = ["webvtt"],
  x3 = [
    { maxMacroblocks: 99, maxBitrate: 64000, maxDpbMbs: 396, level: 10 },
    { maxMacroblocks: 396, maxBitrate: 192000, maxDpbMbs: 900, level: 11 },
    { maxMacroblocks: 396, maxBitrate: 384000, maxDpbMbs: 2376, level: 12 },
    { maxMacroblocks: 396, maxBitrate: 768000, maxDpbMbs: 2376, level: 13 },
    { maxMacroblocks: 396, maxBitrate: 2000000, maxDpbMbs: 2376, level: 20 },
    { maxMacroblocks: 792, maxBitrate: 4000000, maxDpbMbs: 4752, level: 21 },
    { maxMacroblocks: 1620, maxBitrate: 4000000, maxDpbMbs: 8100, level: 22 },
    { maxMacroblocks: 1620, maxBitrate: 1e7, maxDpbMbs: 8100, level: 30 },
    { maxMacroblocks: 3600, maxBitrate: 14000000, maxDpbMbs: 18000, level: 31 },
    { maxMacroblocks: 5120, maxBitrate: 20000000, maxDpbMbs: 20480, level: 32 },
    { maxMacroblocks: 8192, maxBitrate: 20000000, maxDpbMbs: 32768, level: 40 },
    { maxMacroblocks: 8192, maxBitrate: 50000000, maxDpbMbs: 32768, level: 41 },
    { maxMacroblocks: 8704, maxBitrate: 50000000, maxDpbMbs: 34816, level: 42 },
    { maxMacroblocks: 22080, maxBitrate: 135000000, maxDpbMbs: 110400, level: 50 },
    { maxMacroblocks: 36864, maxBitrate: 240000000, maxDpbMbs: 184320, level: 51 },
    { maxMacroblocks: 36864, maxBitrate: 240000000, maxDpbMbs: 184320, level: 52 },
    { maxMacroblocks: 139264, maxBitrate: 240000000, maxDpbMbs: 696320, level: 60 },
    { maxMacroblocks: 139264, maxBitrate: 480000000, maxDpbMbs: 696320, level: 61 },
    { maxMacroblocks: 139264, maxBitrate: 800000000, maxDpbMbs: 696320, level: 62 },
  ],
  VN = [
    { maxPictureSize: 36864, maxBitrate: 128000, tier: "L", level: 30 },
    { maxPictureSize: 122880, maxBitrate: 1500000, tier: "L", level: 60 },
    { maxPictureSize: 245760, maxBitrate: 3000000, tier: "L", level: 63 },
    { maxPictureSize: 552960, maxBitrate: 6000000, tier: "L", level: 90 },
    { maxPictureSize: 983040, maxBitrate: 1e7, tier: "L", level: 93 },
    { maxPictureSize: 2228224, maxBitrate: 12000000, tier: "L", level: 120 },
    { maxPictureSize: 2228224, maxBitrate: 30000000, tier: "H", level: 120 },
    { maxPictureSize: 2228224, maxBitrate: 20000000, tier: "L", level: 123 },
    { maxPictureSize: 2228224, maxBitrate: 50000000, tier: "H", level: 123 },
    { maxPictureSize: 8912896, maxBitrate: 25000000, tier: "L", level: 150 },
    { maxPictureSize: 8912896, maxBitrate: 1e8, tier: "H", level: 150 },
    { maxPictureSize: 8912896, maxBitrate: 40000000, tier: "L", level: 153 },
    { maxPictureSize: 8912896, maxBitrate: 160000000, tier: "H", level: 153 },
    { maxPictureSize: 8912896, maxBitrate: 60000000, tier: "L", level: 156 },
    { maxPictureSize: 8912896, maxBitrate: 240000000, tier: "H", level: 156 },
    { maxPictureSize: 35651584, maxBitrate: 60000000, tier: "L", level: 180 },
    { maxPictureSize: 35651584, maxBitrate: 240000000, tier: "H", level: 180 },
    { maxPictureSize: 35651584, maxBitrate: 120000000, tier: "L", level: 183 },
    { maxPictureSize: 35651584, maxBitrate: 480000000, tier: "H", level: 183 },
    { maxPictureSize: 35651584, maxBitrate: 240000000, tier: "L", level: 186 },
    { maxPictureSize: 35651584, maxBitrate: 800000000, tier: "H", level: 186 },
  ],
  g6 = [
    { maxPictureSize: 36864, maxBitrate: 200000, level: 10 },
    { maxPictureSize: 73728, maxBitrate: 800000, level: 11 },
    { maxPictureSize: 122880, maxBitrate: 1800000, level: 20 },
    { maxPictureSize: 245760, maxBitrate: 3600000, level: 21 },
    { maxPictureSize: 552960, maxBitrate: 7200000, level: 30 },
    { maxPictureSize: 983040, maxBitrate: 12000000, level: 31 },
    { maxPictureSize: 2228224, maxBitrate: 18000000, level: 40 },
    { maxPictureSize: 2228224, maxBitrate: 30000000, level: 41 },
    { maxPictureSize: 8912896, maxBitrate: 60000000, level: 50 },
    { maxPictureSize: 8912896, maxBitrate: 120000000, level: 51 },
    { maxPictureSize: 8912896, maxBitrate: 180000000, level: 52 },
    { maxPictureSize: 35651584, maxBitrate: 180000000, level: 60 },
    { maxPictureSize: 35651584, maxBitrate: 240000000, level: 61 },
    { maxPictureSize: 35651584, maxBitrate: 480000000, level: 62 },
  ],
  WN = [
    { maxPictureSize: 147456, maxBitrate: 1500000, tier: "M", level: 0 },
    { maxPictureSize: 278784, maxBitrate: 3000000, tier: "M", level: 1 },
    { maxPictureSize: 665856, maxBitrate: 6000000, tier: "M", level: 4 },
    { maxPictureSize: 1065024, maxBitrate: 1e7, tier: "M", level: 5 },
    { maxPictureSize: 2359296, maxBitrate: 12000000, tier: "M", level: 8 },
    { maxPictureSize: 2359296, maxBitrate: 30000000, tier: "H", level: 8 },
    { maxPictureSize: 2359296, maxBitrate: 20000000, tier: "M", level: 9 },
    { maxPictureSize: 2359296, maxBitrate: 50000000, tier: "H", level: 9 },
    { maxPictureSize: 8912896, maxBitrate: 30000000, tier: "M", level: 12 },
    { maxPictureSize: 8912896, maxBitrate: 1e8, tier: "H", level: 12 },
    { maxPictureSize: 8912896, maxBitrate: 40000000, tier: "M", level: 13 },
    { maxPictureSize: 8912896, maxBitrate: 160000000, tier: "H", level: 13 },
    { maxPictureSize: 8912896, maxBitrate: 60000000, tier: "M", level: 14 },
    { maxPictureSize: 8912896, maxBitrate: 240000000, tier: "H", level: 14 },
    { maxPictureSize: 35651584, maxBitrate: 60000000, tier: "M", level: 15 },
    { maxPictureSize: 35651584, maxBitrate: 240000000, tier: "H", level: 15 },
    { maxPictureSize: 35651584, maxBitrate: 60000000, tier: "M", level: 16 },
    { maxPictureSize: 35651584, maxBitrate: 240000000, tier: "H", level: 16 },
    { maxPictureSize: 35651584, maxBitrate: 1e8, tier: "M", level: 17 },
    { maxPictureSize: 35651584, maxBitrate: 480000000, tier: "H", level: 17 },
    { maxPictureSize: 35651584, maxBitrate: 160000000, tier: "M", level: 18 },
    { maxPictureSize: 35651584, maxBitrate: 800000000, tier: "H", level: 18 },
    { maxPictureSize: 35651584, maxBitrate: 160000000, tier: "M", level: 19 },
    { maxPictureSize: 35651584, maxBitrate: 800000000, tier: "H", level: 19 },
  ];
var y3 = ["ap4x", "ap4h", "apch", "apcn", "apcs", "apco"],
  Aee = [
    { fourCc: "apco", bitrate: 45000000, alpha: !1 },
    { fourCc: "apcs", bitrate: 102000000, alpha: !1 },
    { fourCc: "apcn", bitrate: 147000000, alpha: !1 },
    { fourCc: "apch", bitrate: 220000000, alpha: !1 },
    { fourCc: "ap4h", bitrate: 330000000, alpha: !0 },
    { fourCc: "ap4x", bitrate: 500000000, alpha: !0 },
  ],
  QN = (e, t, r, n, i) => {
    if (e === "avc") {
      let s = Math.ceil(t / 16) * Math.ceil(r / 16),
        a = x3.find((h) => s <= h.maxMacroblocks && n <= h.maxBitrate) ?? Is(x3),
        l = a ? a.level : 0,
        c = (100).toString(16).padStart(2, "0"),
        u = "00",
        d = l.toString(16).padStart(2, "0");
      return `avc1.${c}00${d}`;
    } else if (e === "hevc") {
      let l = t * r,
        c = VN.find((d) => l <= d.maxPictureSize && n <= d.maxBitrate) ?? Is(VN),
        u = "B0";
      return `hev1.1.6.${c.tier}${c.level}.B0`;
    } else if (e === "vp8") return "vp8";
    else if (e === "vp9") {
      let s = t * r,
        a = g6.find((c) => s <= c.maxPictureSize && n <= c.maxBitrate) ?? Is(g6),
        l = "08";
      return `vp09.00.${a.level.toString().padStart(2, "0")}.08`;
    } else if (e === "av1") {
      let s = t * r,
        a = WN.find((u) => s <= u.maxPictureSize && n <= u.maxBitrate) ?? Is(WN),
        l = a.level.toString().padStart(2, "0"),
        c = "08";
      return `av01.0.${l}${a.tier}.08`;
    } else if (e === "prores") {
      let s = Math.pow((t * r) / 2073600, 0.95),
        a = Aee.filter((u) => u.alpha === i),
        l = a[0].fourCc,
        c = 1 / 0;
      for (let { fourCc: u, bitrate: d } of a) {
        let h = Math.abs(d * s - n);
        if (h < c) ((c = h), (l = u));
      }
      return l;
    } else Rs(e);
    throw TypeError(`Unhandled codec '${String(e)}'.`);
  },
  YN = (e) => {
    let t = e.split("."),
      r = Number(t[1]),
      n = Number(t[2]),
      i = Number(t[3]),
      o = t[4] ? Number(t[4]) : 1;
    return [1, 1, r, 2, 1, n, 3, 1, i, 4, 1, o];
  },
  i_ = (e) => {
    let t = e.split("."),
      r = 1,
      n = 1,
      i = 129,
      o = Number(t[1]),
      s = t[2],
      a = Number(s.slice(0, -1)),
      l = (o << 5) + a,
      c = s.slice(-1) === "H" ? 1 : 0,
      d = Number(t[3]) === 8 ? 0 : 1,
      h = 0,
      f = t[4] ? Number(t[4]) : 0,
      p = t[5] ? Number(t[5][0]) : 1,
      g = t[5] ? Number(t[5][1]) : 1,
      m = t[5] ? Number(t[5][2]) : 0,
      A = (c << 7) + (d << 6) + 0 + (f << 4) + (p << 3) + (g << 2) + m,
      y = 0,
      x = 0;
    return [129, l, A, 0];
  };
var XN = 48000,
  jN = /^pcm-([usf])(\d+)(be)?$/,
  Kl = (e) => {
    if ((Fe(Os.includes(e)), e === "ulaw"))
      return { dataType: "ulaw", sampleSize: 1, littleEndian: !0, silentValue: 255 };
    else if (e === "alaw")
      return { dataType: "alaw", sampleSize: 1, littleEndian: !0, silentValue: 213 };
    let t = jN.exec(e);
    Fe(t);
    let r;
    if (t[1] === "u") r = "unsigned";
    else if (t[1] === "s") r = "signed";
    else r = "float";
    let n = Number(t[2]) / 8,
      i = t[3] !== "be";
    return { dataType: r, sampleSize: n, littleEndian: i, silentValue: e === "pcm-u8" ? 128 : 0 };
  },
  KN = (e) => {
    if (e.startsWith("avc1") || e.startsWith("avc3")) return "avc";
    else if (e.startsWith("hev1") || e.startsWith("hvc1")) return "hevc";
    else if (e === "vp8") return "vp8";
    else if (e.startsWith("vp09")) return "vp9";
    else if (e.startsWith("av01")) return "av1";
    else if (y3.includes(e)) return "prores";
    if (e === "mp3" || e === "mp4a.69" || e === "mp4a.6B" || e === "mp4a.6b" || e === "mp4a.40.34")
      return "mp3";
    else if (e.startsWith("mp4a.40.") || e === "mp4a.67") return "aac";
    else if (e === "opus") return "opus";
    else if (e === "vorbis") return "vorbis";
    else if (e === "flac") return "flac";
    else if (e === "ac-3" || e === "ac3") return "ac3";
    else if (e === "ec-3" || e === "eac3") return "eac3";
    else if (e === "ulaw") return "ulaw";
    else if (e === "alaw") return "alaw";
    else if (jN.test(e)) return e;
    if (e === "webvtt") return "webvtt";
    return null;
  },
  qN = (e) => {
    if (e === "avc") return { avc: { format: "avc" } };
    else if (e === "hevc") return { hevc: { format: "hevc" } };
    return {};
  };
var yee = ["avc1", "avc3", "hev1", "hvc1", "vp8", "vp09", "av01", ...y3],
  xee = /^(avc1|avc3)\.[0-9a-fA-F]{6}$/,
  bee = /^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,
  _ee = /^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,
  vee = /^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,
  o_ = (e) => {
    if (!e) throw TypeError("Video chunk metadata must be provided.");
    if (typeof e !== "object") throw TypeError("Video chunk metadata must be an object.");
    if (!e.decoderConfig)
      throw TypeError("Video chunk metadata must include a decoder configuration.");
    if (typeof e.decoderConfig !== "object")
      throw TypeError("Video chunk metadata decoder configuration must be an object.");
    if (typeof e.decoderConfig.codec !== "string")
      throw TypeError("Video chunk metadata decoder configuration must specify a codec string.");
    if (!yee.some((t) => e.decoderConfig.codec.startsWith(t)))
      throw TypeError(
        "Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.",
      );
    if (!Number.isInteger(e.decoderConfig.codedWidth) || e.decoderConfig.codedWidth <= 0)
      throw TypeError(
        "Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).",
      );
    if (!Number.isInteger(e.decoderConfig.codedHeight) || e.decoderConfig.codedHeight <= 0)
      throw TypeError(
        "Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).",
      );
    if (
      e.decoderConfig.displayAspectWidth !== void 0 &&
      (!Number.isInteger(e.decoderConfig.displayAspectWidth) ||
        e.decoderConfig.displayAspectWidth <= 0)
    )
      throw TypeError(
        "Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.",
      );
    if (
      e.decoderConfig.displayAspectHeight !== void 0 &&
      (!Number.isInteger(e.decoderConfig.displayAspectHeight) ||
        e.decoderConfig.displayAspectHeight <= 0)
    )
      throw TypeError(
        "Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.",
      );
    if (
      (e.decoderConfig.displayAspectWidth !== void 0) !==
      (e.decoderConfig.displayAspectHeight !== void 0)
    )
      throw TypeError(
        "Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.",
      );
    if (e.decoderConfig.description !== void 0) {
      if (!p3(e.decoderConfig.description))
        throw TypeError(
          "Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.",
        );
    }
    if (e.decoderConfig.colorSpace !== void 0) {
      let { colorSpace: t } = e.decoderConfig;
      if (typeof t !== "object")
        throw TypeError(
          "Video chunk metadata decoder configuration colorSpace, when provided, must be an object.",
        );
      let r = Object.keys(ku);
      if (t.primaries != null && !r.includes(t.primaries))
        throw TypeError(
          `Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${r.join(", ")}.`,
        );
      let n = Object.keys(Uu);
      if (t.transfer != null && !n.includes(t.transfer))
        throw TypeError(
          `Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${n.join(", ")}.`,
        );
      let i = Object.keys(Hu);
      if (t.matrix != null && !i.includes(t.matrix))
        throw TypeError(
          `Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(", ")}.`,
        );
      if (t.fullRange != null && typeof t.fullRange !== "boolean")
        throw TypeError(
          "Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.",
        );
    }
    if (e.decoderConfig.codec.startsWith("avc1") || e.decoderConfig.codec.startsWith("avc3")) {
      if (!xee.test(e.decoderConfig.codec))
        throw TypeError(
          "Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.",
        );
    } else if (
      e.decoderConfig.codec.startsWith("hev1") ||
      e.decoderConfig.codec.startsWith("hvc1")
    ) {
      if (!bee.test(e.decoderConfig.codec))
        throw TypeError(
          "Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.",
        );
    } else if (e.decoderConfig.codec.startsWith("vp8")) {
      if (e.decoderConfig.codec !== "vp8")
        throw TypeError(
          'Video chunk metadata decoder configuration codec string for VP8 must be "vp8".',
        );
    } else if (e.decoderConfig.codec.startsWith("vp09")) {
      if (!_ee.test(e.decoderConfig.codec))
        throw TypeError(
          'Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.',
        );
    } else if (e.decoderConfig.codec.startsWith("av01")) {
      if (!vee.test(e.decoderConfig.codec))
        throw TypeError(
          'Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.',
        );
    } else if (y3.some((t) => e.decoderConfig.codec.startsWith(t))) {
      if (!y3.some((t) => e.decoderConfig.codec === t))
        throw TypeError(
          `Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${y3.join(", ")}.`,
        );
    }
  },
  Cee = ["mp4a", "mp3", "opus", "vorbis", "flac", "ulaw", "alaw", "pcm", "ac-3", "ec-3"],
  s_ = (e) => {
    if (!e) throw TypeError("Audio chunk metadata must be provided.");
    if (typeof e !== "object") throw TypeError("Audio chunk metadata must be an object.");
    if (!e.decoderConfig)
      throw TypeError("Audio chunk metadata must include a decoder configuration.");
    if (typeof e.decoderConfig !== "object")
      throw TypeError("Audio chunk metadata decoder configuration must be an object.");
    if (typeof e.decoderConfig.codec !== "string")
      throw TypeError("Audio chunk metadata decoder configuration must specify a codec string.");
    if (!Cee.some((t) => e.decoderConfig.codec.startsWith(t)))
      throw TypeError(
        "Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.",
      );
    if (!Number.isInteger(e.decoderConfig.sampleRate) || e.decoderConfig.sampleRate <= 0)
      throw TypeError(
        "Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).",
      );
    if (
      !Number.isInteger(e.decoderConfig.numberOfChannels) ||
      e.decoderConfig.numberOfChannels <= 0
    )
      throw TypeError(
        "Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).",
      );
    if (e.decoderConfig.description !== void 0) {
      if (!p3(e.decoderConfig.description))
        throw TypeError(
          "Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.",
        );
    }
    if (
      e.decoderConfig.codec.startsWith("mp4a") &&
      e.decoderConfig.codec !== "mp4a.69" &&
      e.decoderConfig.codec !== "mp4a.6B" &&
      e.decoderConfig.codec !== "mp4a.6b"
    ) {
      if (
        !["mp4a.40.2", "mp4a.40.02", "mp4a.40.5", "mp4a.40.05", "mp4a.40.29", "mp4a.67"].includes(
          e.decoderConfig.codec,
        )
      )
        throw TypeError(
          "Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.",
        );
    } else if (
      e.decoderConfig.codec.startsWith("mp3") ||
      e.decoderConfig.codec.startsWith("mp4a")
    ) {
      if (
        e.decoderConfig.codec !== "mp3" &&
        e.decoderConfig.codec !== "mp4a.69" &&
        e.decoderConfig.codec !== "mp4a.6B" &&
        e.decoderConfig.codec !== "mp4a.6b"
      )
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".',
        );
    } else if (e.decoderConfig.codec.startsWith("opus")) {
      if (e.decoderConfig.codec !== "opus")
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for Opus must be "opus".',
        );
      if (e.decoderConfig.description && e.decoderConfig.description.byteLength < 18)
        throw TypeError(
          "Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.",
        );
    } else if (e.decoderConfig.codec.startsWith("vorbis")) {
      if (e.decoderConfig.codec !== "vorbis")
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".',
        );
      if (!e.decoderConfig.description)
        throw TypeError(
          "Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.",
        );
    } else if (e.decoderConfig.codec.startsWith("flac")) {
      if (e.decoderConfig.codec !== "flac")
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for FLAC must be "flac".',
        );
      let t = 42;
      if (!e.decoderConfig.description || e.decoderConfig.description.byteLength < t)
        throw TypeError(
          "Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.",
        );
    } else if (
      e.decoderConfig.codec.startsWith("ac-3") ||
      e.decoderConfig.codec.startsWith("ac3")
    ) {
      if (e.decoderConfig.codec !== "ac-3")
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".',
        );
    } else if (
      e.decoderConfig.codec.startsWith("ec-3") ||
      e.decoderConfig.codec.startsWith("eac3")
    ) {
      if (e.decoderConfig.codec !== "ec-3")
        throw TypeError(
          'Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".',
        );
    } else if (
      e.decoderConfig.codec.startsWith("pcm") ||
      e.decoderConfig.codec.startsWith("ulaw") ||
      e.decoderConfig.codec.startsWith("alaw")
    ) {
      if (!Os.includes(e.decoderConfig.codec))
        throw TypeError(
          `Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Os.join(", ")}).`,
        );
    }
  },
  a_ = (e) => {
    if (!e) throw TypeError("Subtitle metadata must be provided.");
    if (typeof e !== "object") throw TypeError("Subtitle metadata must be an object.");
    if (!e.config) throw TypeError("Subtitle metadata must include a config object.");
    if (typeof e.config !== "object")
      throw TypeError("Subtitle metadata config must be an object.");
    if (typeof e.config.description !== "string")
      throw TypeError("Subtitle metadata config description must be a string.");
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var ZN = [48000, 44100, 32000],
  $N = [24000, 22050, 16000];
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var Gu;
(function (e) {
  ((e[(e.NON_IDR_SLICE = 1)] = "NON_IDR_SLICE"),
    (e[(e.SLICE_DPA = 2)] = "SLICE_DPA"),
    (e[(e.SLICE_DPB = 3)] = "SLICE_DPB"),
    (e[(e.SLICE_DPC = 4)] = "SLICE_DPC"),
    (e[(e.IDR = 5)] = "IDR"),
    (e[(e.SEI = 6)] = "SEI"),
    (e[(e.SPS = 7)] = "SPS"),
    (e[(e.PPS = 8)] = "PPS"),
    (e[(e.AUD = 9)] = "AUD"),
    (e[(e.SPS_EXT = 13)] = "SPS_EXT"));
})(Gu || (Gu = {}));
var ul;
(function (e) {
  ((e[(e.RASL_N = 8)] = "RASL_N"),
    (e[(e.RASL_R = 9)] = "RASL_R"),
    (e[(e.BLA_W_LP = 16)] = "BLA_W_LP"),
    (e[(e.RSV_IRAP_VCL23 = 23)] = "RSV_IRAP_VCL23"),
    (e[(e.VPS_NUT = 32)] = "VPS_NUT"),
    (e[(e.SPS_NUT = 33)] = "SPS_NUT"),
    (e[(e.PPS_NUT = 34)] = "PPS_NUT"),
    (e[(e.AUD_NUT = 35)] = "AUD_NUT"),
    (e[(e.PREFIX_SEI_NUT = 39)] = "PREFIX_SEI_NUT"),
    (e[(e.SUFFIX_SEI_NUT = 40)] = "SUFFIX_SEI_NUT"));
})(ul || (ul = {}));
var R1 = function* (e) {
    let t = 0,
      r = -1;
    while (t < e.length - 2) {
      let n = e.indexOf(0, t);
      if (n === -1 || n >= e.length - 2) break;
      t = n;
      let i = 0;
      if (t + 3 < e.length && e[t + 1] === 0 && e[t + 2] === 0 && e[t + 3] === 1) i = 4;
      else if (e[t + 1] === 0 && e[t + 2] === 1) i = 3;
      if (i === 0) {
        t++;
        continue;
      }
      if (r !== -1 && t > r) yield { offset: r, length: t - r };
      ((r = t + i), (t = r));
    }
    if (r !== -1 && r < e.length) yield { offset: r, length: e.length - r };
  },
  iP = function* (e, t) {
    let r = 0,
      n = new DataView(e.buffer, e.byteOffset, e.byteLength);
    while (r + t <= e.length) {
      let i;
      if (t === 1) i = n.getUint8(r);
      else if (t === 2) i = n.getUint16(r, !1);
      else if (t === 3) i = l6(n, r, !1);
      else (Fe(t === 4), (i = n.getUint32(r, !1)));
      ((r += t), yield { offset: r, length: i }, (r += i));
    }
  },
  wee = (e, t) => {
    if (t.description) {
      let i = (Fo(t.description)[4] & 3) + 1;
      return iP(e, i);
    } else return R1(e);
  },
  oP = (e) => e & 31,
  l_ = (e) => {
    let t = [],
      r = e.length;
    for (let n = 0; n < r; n++)
      if (n + 2 < r && e[n] === 0 && e[n + 1] === 0 && e[n + 2] === 3) (t.push(0, 0), (n += 2));
      else t.push(e[n]);
    return new Uint8Array(t);
  },
  jye = new Uint8Array([0, 0, 0, 1]);
var sP = (e, t) => {
  let r = e.reduce((o, s) => o + t + s.byteLength, 0),
    n = new Uint8Array(r),
    i = 0;
  for (let o of e) {
    let s = new DataView(n.buffer, n.byteOffset, n.byteLength);
    switch (t) {
      case 1:
        s.setUint8(i, o.byteLength);
        break;
      case 2:
        s.setUint16(i, o.byteLength, !1);
        break;
      case 3:
        c6(s, i, o.byteLength, !1);
        break;
      case 4:
        s.setUint32(i, o.byteLength, !1);
        break;
    }
    ((i += t), n.set(o, i), (i += o.byteLength));
  }
  return n;
};
var aP = (e) => {
    try {
      let t = [],
        r = [],
        n = [];
      for (let a of R1(e)) {
        let l = e.subarray(a.offset, a.offset + a.length),
          c = oP(l[0]);
        if (c === Gu.SPS) t.push(l);
        else if (c === Gu.PPS) r.push(l);
        else if (c === Gu.SPS_EXT) n.push(l);
      }
      if (t.length === 0) return null;
      if (r.length === 0) return null;
      let i = t[0],
        o = Tee(i);
      Fe(o !== null);
      let s =
        o.profileIdc === 100 ||
        o.profileIdc === 110 ||
        o.profileIdc === 122 ||
        o.profileIdc === 144;
      return {
        configurationVersion: 1,
        avcProfileIndication: o.profileIdc,
        profileCompatibility: o.constraintFlags,
        avcLevelIndication: o.levelIdc,
        lengthSizeMinusOne: 3,
        sequenceParameterSets: t,
        pictureParameterSets: r,
        chromaFormat: s ? o.chromaFormatIdc : null,
        bitDepthLumaMinus8: s ? o.bitDepthLumaMinus8 : null,
        bitDepthChromaMinus8: s ? o.bitDepthChromaMinus8 : null,
        sequenceParameterSetExt: s ? n : null,
      };
    } catch (t) {
      return (Un._error("Error building AVC Decoder Configuration Record:", t), null);
    }
  },
  lP = (e) => {
    let t = [];
    (t.push(e.configurationVersion),
      t.push(e.avcProfileIndication),
      t.push(e.profileCompatibility),
      t.push(e.avcLevelIndication),
      t.push(252 | (e.lengthSizeMinusOne & 3)),
      t.push(224 | (e.sequenceParameterSets.length & 31)));
    for (let r of e.sequenceParameterSets) {
      let n = r.byteLength;
      (t.push(n >> 8), t.push(n & 255));
      for (let i = 0; i < n; i++) t.push(r[i]);
    }
    t.push(e.pictureParameterSets.length);
    for (let r of e.pictureParameterSets) {
      let n = r.byteLength;
      (t.push(n >> 8), t.push(n & 255));
      for (let i = 0; i < n; i++) t.push(r[i]);
    }
    if (
      e.avcProfileIndication === 100 ||
      e.avcProfileIndication === 110 ||
      e.avcProfileIndication === 122 ||
      e.avcProfileIndication === 144
    ) {
      (Fe(e.chromaFormat !== null),
        Fe(e.bitDepthLumaMinus8 !== null),
        Fe(e.bitDepthChromaMinus8 !== null),
        Fe(e.sequenceParameterSetExt !== null),
        t.push(252 | (e.chromaFormat & 3)),
        t.push(248 | (e.bitDepthLumaMinus8 & 7)),
        t.push(248 | (e.bitDepthChromaMinus8 & 7)),
        t.push(e.sequenceParameterSetExt.length));
      for (let r of e.sequenceParameterSetExt) {
        let n = r.byteLength;
        (t.push(n >> 8), t.push(n & 255));
        for (let i = 0; i < n; i++) t.push(r[i]);
      }
    }
    return new Uint8Array(t);
  };
var cP = {
    1: { num: 1, den: 1 },
    2: { num: 12, den: 11 },
    3: { num: 10, den: 11 },
    4: { num: 16, den: 11 },
    5: { num: 40, den: 33 },
    6: { num: 24, den: 11 },
    7: { num: 20, den: 11 },
    8: { num: 32, den: 11 },
    9: { num: 80, den: 33 },
    10: { num: 18, den: 11 },
    11: { num: 15, den: 11 },
    12: { num: 64, den: 33 },
    13: { num: 160, den: 99 },
    14: { num: 4, den: 3 },
    15: { num: 3, den: 2 },
    16: { num: 2, den: 1 },
  },
  Tee = (e) => {
    try {
      let t = new Ni(l_(e));
      if ((t.skipBits(1), t.skipBits(2), t.readBits(5) !== 7)) return null;
      let n = t.readAlignedByte(),
        i = t.readAlignedByte(),
        o = t.readAlignedByte();
      ht(t);
      let s = 1,
        a = 0,
        l = 0,
        c = 0;
      if (
        n === 100 ||
        n === 110 ||
        n === 122 ||
        n === 244 ||
        n === 44 ||
        n === 83 ||
        n === 86 ||
        n === 118 ||
        n === 128
      ) {
        if (((s = ht(t)), s === 3)) c = t.readBits(1);
        if (((a = ht(t)), (l = ht(t)), t.skipBits(1), t.readBits(1))) {
          for (let C = 0; C < (s !== 3 ? 8 : 12); C++)
            if (t.readBits(1)) {
              let B = C < 6 ? 16 : 64,
                L = 8,
                k = 8;
              for (let z = 0; z < B; z++) {
                if (k !== 0) {
                  let X = wc(t);
                  k = (L + X + 256) % 256;
                }
                L = k === 0 ? L : k;
              }
            }
        }
      }
      ht(t);
      let u = ht(t);
      if (u === 0) ht(t);
      else if (u === 1) {
        (t.skipBits(1), wc(t), wc(t));
        let M = ht(t);
        for (let C = 0; C < M; C++) wc(t);
      }
      (ht(t), t.skipBits(1));
      let d = ht(t),
        h = ht(t),
        f = 16 * (d + 1),
        p = 16 * (h + 1),
        g = f,
        m = p,
        A = t.readBits(1);
      if (!A) t.skipBits(1);
      if ((t.skipBits(1), t.readBits(1))) {
        let M = ht(t),
          C = ht(t),
          R = ht(t),
          B = ht(t),
          L,
          k;
        if ((c === 0 ? s : 0) === 0) ((L = 1), (k = 2 - A));
        else {
          let X = s === 3 ? 1 : 2,
            G = s === 1 ? 2 : 1;
          ((L = X), (k = G * (2 - A)));
        }
        ((g -= L * (M + C)), (m -= k * (R + B)));
      }
      let x = 2,
        b = 2,
        v = 2,
        _ = 0,
        w = { num: 1, den: 1 },
        S = null,
        E = null;
      if (t.readBits(1)) {
        if (t.readBits(1)) {
          let G = t.readBits(8);
          if (G === 255) w = { num: t.readBits(16), den: t.readBits(16) };
          else {
            let Q = cP[G];
            if (Q) w = Q;
          }
        }
        if (t.readBits(1)) t.skipBits(1);
        if (t.readBits(1)) {
          if ((t.skipBits(3), (_ = t.readBits(1)), t.readBits(1)))
            ((x = t.readBits(8)), (b = t.readBits(8)), (v = t.readBits(8)));
        }
        if (t.readBits(1)) (ht(t), ht(t));
        if (t.readBits(1)) (t.skipBits(32), t.skipBits(32), t.skipBits(1));
        let k = t.readBits(1);
        if (k) JN(t);
        let z = t.readBits(1);
        if (z) JN(t);
        if (k || z) t.skipBits(1);
        if ((t.skipBits(1), t.readBits(1)))
          (t.skipBits(1), ht(t), ht(t), ht(t), ht(t), (S = ht(t)), (E = ht(t)));
      }
      if (S === null) {
        Fe(E === null);
        let M = i & 16;
        if ((n === 44 || n === 86 || n === 100 || n === 110 || n === 122 || n === 244) && M)
          ((S = 0), (E = 0));
        else {
          let C = d + 1,
            R = h + 1,
            B = (2 - A) * R,
            L = x3.find((z) => z.level >= o) ?? Is(x3),
            k = Math.min(Math.floor(L.maxDpbMbs / (C * B)), 16);
          ((S = k), (E = k));
        }
      }
      return (
        Fe(E !== null),
        {
          profileIdc: n,
          constraintFlags: i,
          levelIdc: o,
          frameMbsOnlyFlag: A,
          chromaFormatIdc: s,
          bitDepthLumaMinus8: a,
          bitDepthChromaMinus8: l,
          codedWidth: f,
          codedHeight: p,
          displayWidth: g,
          displayHeight: m,
          pixelAspectRatio: w,
          colourPrimaries: x,
          matrixCoefficients: v,
          transferCharacteristics: b,
          fullRangeFlag: _,
          numReorderFrames: S,
          maxDecFrameBuffering: E,
        }
      );
    } catch (t) {
      return (Un._error("Error parsing AVC SPS:", t), null);
    }
  },
  JN = (e) => {
    let t = ht(e);
    (e.skipBits(4), e.skipBits(4));
    for (let r = 0; r <= t; r++) (ht(e), ht(e), e.skipBits(1));
    (e.skipBits(5), e.skipBits(5), e.skipBits(5), e.skipBits(5));
  };
var Eee = (e, t) => {
    if (t.description) {
      let i = (Fo(t.description)[21] & 3) + 1;
      return iP(e, i);
    } else return R1(e);
  },
  A6 = (e) => (e >> 1) & 63,
  See = (e) => {
    try {
      let t = new Ni(l_(e));
      (t.skipBits(16), t.readBits(4));
      let r = t.readBits(3),
        n = t.readBits(1),
        {
          general_profile_space: i,
          general_tier_flag: o,
          general_profile_idc: s,
          general_profile_compatibility_flags: a,
          general_constraint_indicator_flags: l,
          general_level_idc: c,
        } = Mee(t, r);
      ht(t);
      let u = ht(t),
        d = 0;
      if (u === 3) d = t.readBits(1);
      let h = ht(t),
        f = ht(t),
        p = h,
        g = f;
      if (t.readBits(1)) {
        let C = ht(t),
          R = ht(t),
          B = ht(t),
          L = ht(t),
          k = 1,
          z = 1,
          X = d === 0 ? u : 0;
        if (X === 1) ((k = 2), (z = 2));
        else if (X === 2) ((k = 2), (z = 1));
        ((p -= (C + R) * k), (g -= (B + L) * z));
      }
      let m = ht(t),
        A = ht(t);
      ht(t);
      let x = t.readBits(1) ? 0 : r,
        b = 0;
      for (let C = x; C <= r; C++) (ht(t), (b = ht(t)), ht(t));
      if ((ht(t), ht(t), ht(t), ht(t), ht(t), ht(t), t.readBits(1))) {
        if (t.readBits(1)) Iee(t);
      }
      if ((t.skipBits(1), t.skipBits(1), t.readBits(1)))
        (t.skipBits(4), t.skipBits(4), ht(t), ht(t), t.skipBits(1));
      let v = ht(t);
      if ((Ree(t, v), t.readBits(1))) {
        let C = ht(t);
        for (let R = 0; R < C; R++) (ht(t), t.skipBits(1));
      }
      (t.skipBits(1), t.skipBits(1));
      let _ = 2,
        w = 2,
        S = 2,
        E = 0,
        T = 0,
        M = { num: 1, den: 1 };
      if (t.readBits(1)) {
        let C = Lee(t, r);
        ((M = C.pixelAspectRatio),
          (_ = C.colourPrimaries),
          (w = C.transferCharacteristics),
          (S = C.matrixCoefficients),
          (E = C.fullRangeFlag),
          (T = C.minSpatialSegmentationIdc));
      }
      return {
        displayWidth: p,
        displayHeight: g,
        pixelAspectRatio: M,
        colourPrimaries: _,
        transferCharacteristics: w,
        matrixCoefficients: S,
        fullRangeFlag: E,
        maxDecFrameBuffering: b + 1,
        spsMaxSubLayersMinus1: r,
        spsTemporalIdNestingFlag: n,
        generalProfileSpace: i,
        generalTierFlag: o,
        generalProfileIdc: s,
        generalProfileCompatibilityFlags: a,
        generalConstraintIndicatorFlags: l,
        generalLevelIdc: c,
        chromaFormatIdc: u,
        bitDepthLumaMinus8: m,
        bitDepthChromaMinus8: A,
        minSpatialSegmentationIdc: T,
      };
    } catch (t) {
      return (Un._error("Error parsing HEVC SPS:", t), null);
    }
  },
  uP = (e) => {
    try {
      let t = [],
        r = [],
        n = [],
        i = [];
      for (let c of R1(e)) {
        let u = e.subarray(c.offset, c.offset + c.length),
          d = A6(u[0]);
        if (d === ul.VPS_NUT) t.push(u);
        else if (d === ul.SPS_NUT) r.push(u);
        else if (d === ul.PPS_NUT) n.push(u);
        else if (d === ul.PREFIX_SEI_NUT || d === ul.SUFFIX_SEI_NUT) i.push(u);
      }
      if (r.length === 0 || n.length === 0) return null;
      let o = See(r[0]);
      if (!o) return null;
      let s = 0;
      if (n.length > 0) {
        let c = n[0],
          u = new Ni(l_(c));
        if (
          (u.skipBits(16),
          ht(u),
          ht(u),
          u.skipBits(1),
          u.skipBits(1),
          u.skipBits(3),
          u.skipBits(1),
          u.skipBits(1),
          ht(u),
          ht(u),
          wc(u),
          u.skipBits(1),
          u.skipBits(1),
          u.readBits(1))
        )
          ht(u);
        (wc(u), wc(u), u.skipBits(1), u.skipBits(1), u.skipBits(1), u.skipBits(1));
        let d = u.readBits(1),
          h = u.readBits(1);
        if (!d && !h) s = 0;
        else if (d && !h) s = 2;
        else if (!d && h) s = 3;
        else s = 0;
      }
      let a = [
        ...(t.length ? [{ arrayCompleteness: 1, nalUnitType: ul.VPS_NUT, nalUnits: t }] : []),
        ...(r.length ? [{ arrayCompleteness: 1, nalUnitType: ul.SPS_NUT, nalUnits: r }] : []),
        ...(n.length ? [{ arrayCompleteness: 1, nalUnitType: ul.PPS_NUT, nalUnits: n }] : []),
        ...(i.length ? [{ arrayCompleteness: 1, nalUnitType: A6(i[0][0]), nalUnits: i }] : []),
      ];
      return {
        configurationVersion: 1,
        generalProfileSpace: o.generalProfileSpace,
        generalTierFlag: o.generalTierFlag,
        generalProfileIdc: o.generalProfileIdc,
        generalProfileCompatibilityFlags: o.generalProfileCompatibilityFlags,
        generalConstraintIndicatorFlags: o.generalConstraintIndicatorFlags,
        generalLevelIdc: o.generalLevelIdc,
        minSpatialSegmentationIdc: o.minSpatialSegmentationIdc,
        parallelismType: s,
        chromaFormatIdc: o.chromaFormatIdc,
        bitDepthLumaMinus8: o.bitDepthLumaMinus8,
        bitDepthChromaMinus8: o.bitDepthChromaMinus8,
        avgFrameRate: 0,
        constantFrameRate: 0,
        numTemporalLayers: o.spsMaxSubLayersMinus1 + 1,
        temporalIdNested: o.spsTemporalIdNestingFlag,
        lengthSizeMinusOne: 3,
        arrays: a,
      };
    } catch (t) {
      return (Un._error("Error building HEVC Decoder Configuration Record:", t), null);
    }
  },
  Mee = (e, t) => {
    let r = e.readBits(2),
      n = e.readBits(1),
      i = e.readBits(5),
      o = 0;
    for (let u = 0; u < 32; u++) o = (o << 1) | e.readBits(1);
    let s = new Uint8Array(6);
    for (let u = 0; u < 6; u++) s[u] = e.readBits(8);
    let a = e.readBits(8),
      l = [],
      c = [];
    for (let u = 0; u < t; u++) (l.push(e.readBits(1)), c.push(e.readBits(1)));
    if (t > 0) for (let u = t; u < 8; u++) e.skipBits(2);
    for (let u = 0; u < t; u++) {
      if (l[u]) e.skipBits(88);
      if (c[u]) e.skipBits(8);
    }
    return {
      general_profile_space: r,
      general_tier_flag: n,
      general_profile_idc: i,
      general_profile_compatibility_flags: o,
      general_constraint_indicator_flags: s,
      general_level_idc: a,
    };
  },
  Iee = (e) => {
    for (let t = 0; t < 4; t++)
      for (let r = 0; r < (t === 3 ? 2 : 6); r++)
        if (!e.readBits(1)) ht(e);
        else {
          let i = Math.min(64, 1 << (4 + (t << 1)));
          if (t > 1) wc(e);
          for (let o = 0; o < i; o++) wc(e);
        }
  },
  Ree = (e, t) => {
    let r = [];
    for (let n = 0; n < t; n++) r[n] = Oee(e, n, t, r);
  },
  Oee = (e, t, r, n) => {
    let i = 0,
      o = 0,
      s = 0;
    if (t !== 0) o = e.readBits(1);
    if (o) {
      if (t === r) {
        let l = ht(e);
        s = t - (l + 1);
      } else s = t - 1;
      (e.readBits(1), ht(e));
      let a = n[s] ?? 0;
      for (let l = 0; l <= a; l++) if (!e.readBits(1)) e.readBits(1);
      i = n[s];
    } else {
      let a = ht(e),
        l = ht(e);
      for (let c = 0; c < a; c++) (ht(e), e.readBits(1));
      for (let c = 0; c < l; c++) (ht(e), e.readBits(1));
      i = a + l;
    }
    return i;
  },
  Lee = (e, t) => {
    let r = 2,
      n = 2,
      i = 2,
      o = 0,
      s = 0,
      a = { num: 1, den: 1 };
    if (e.readBits(1)) {
      let l = e.readBits(8);
      if (l === 255) a = { num: e.readBits(16), den: e.readBits(16) };
      else {
        let c = cP[l];
        if (c) a = c;
      }
    }
    if (e.readBits(1)) e.readBits(1);
    if (e.readBits(1)) {
      if ((e.readBits(3), (o = e.readBits(1)), e.readBits(1)))
        ((r = e.readBits(8)), (n = e.readBits(8)), (i = e.readBits(8)));
    }
    if (e.readBits(1)) (ht(e), ht(e));
    if ((e.readBits(1), e.readBits(1), e.readBits(1), e.readBits(1))) (ht(e), ht(e), ht(e), ht(e));
    if (e.readBits(1)) {
      if ((e.readBits(32), e.readBits(32), e.readBits(1))) ht(e);
      if (e.readBits(1)) Bee(e, !0, t);
    }
    if (e.readBits(1))
      (e.readBits(1), e.readBits(1), e.readBits(1), (s = ht(e)), ht(e), ht(e), ht(e), ht(e));
    return {
      pixelAspectRatio: a,
      colourPrimaries: r,
      transferCharacteristics: n,
      matrixCoefficients: i,
      fullRangeFlag: o,
      minSpatialSegmentationIdc: s,
    };
  },
  Bee = (e, t, r) => {
    let n = !1,
      i = !1,
      o = !1;
    if (t) {
      if (((n = e.readBits(1) === 1), (i = e.readBits(1) === 1), n || i)) {
        if (((o = e.readBits(1) === 1), o))
          (e.readBits(8), e.readBits(5), e.readBits(1), e.readBits(5));
        if ((e.readBits(4), e.readBits(4), o)) e.readBits(4);
        (e.readBits(5), e.readBits(5), e.readBits(5));
      }
    }
    for (let s = 0; s <= r; s++) {
      let a = e.readBits(1) === 1,
        l = !0;
      if (!a) l = e.readBits(1) === 1;
      let c = !1;
      if (l) ht(e);
      else c = e.readBits(1) === 1;
      let u = 1;
      if (!c) u = ht(e) + 1;
      if (n) eP(e, u, o);
      if (i) eP(e, u, o);
    }
  },
  eP = (e, t, r) => {
    for (let n = 0; n < t; n++) {
      if ((ht(e), ht(e), r)) (ht(e), ht(e));
      e.readBits(1);
    }
  },
  dP = (e) => {
    let t = [];
    (t.push(e.configurationVersion),
      t.push(
        ((e.generalProfileSpace & 3) << 6) |
          ((e.generalTierFlag & 1) << 5) |
          (e.generalProfileIdc & 31),
      ),
      t.push((e.generalProfileCompatibilityFlags >>> 24) & 255),
      t.push((e.generalProfileCompatibilityFlags >>> 16) & 255),
      t.push((e.generalProfileCompatibilityFlags >>> 8) & 255),
      t.push(e.generalProfileCompatibilityFlags & 255),
      t.push(...e.generalConstraintIndicatorFlags),
      t.push(e.generalLevelIdc & 255),
      t.push(240 | ((e.minSpatialSegmentationIdc >> 8) & 15)),
      t.push(e.minSpatialSegmentationIdc & 255),
      t.push(252 | (e.parallelismType & 3)),
      t.push(252 | (e.chromaFormatIdc & 3)),
      t.push(248 | (e.bitDepthLumaMinus8 & 7)),
      t.push(248 | (e.bitDepthChromaMinus8 & 7)),
      t.push((e.avgFrameRate >> 8) & 255),
      t.push(e.avgFrameRate & 255),
      t.push(
        ((e.constantFrameRate & 3) << 6) |
          ((e.numTemporalLayers & 7) << 3) |
          ((e.temporalIdNested & 1) << 2) |
          (e.lengthSizeMinusOne & 3),
      ),
      t.push(e.arrays.length & 255));
    for (let r of e.arrays) {
      (t.push(((r.arrayCompleteness & 1) << 7) | 0 | (r.nalUnitType & 63)),
        t.push((r.nalUnits.length >> 8) & 255),
        t.push(r.nalUnits.length & 255));
      for (let n of r.nalUnits) {
        (t.push((n.length >> 8) & 255), t.push(n.length & 255));
        for (let i = 0; i < n.length; i++) t.push(n[i]);
      }
    }
    return new Uint8Array(t);
  };
var tP;
(function (e) {
  ((e[(e.audAllowed = 0)] = "audAllowed"),
    (e[(e.beforeFirstVcl = 1)] = "beforeFirstVcl"),
    (e[(e.afterFirstVcl = 2)] = "afterFirstVcl"),
    (e[(e.eoBitstreamAllowed = 3)] = "eoBitstreamAllowed"),
    (e[(e.noMoreDataAllowed = 4)] = "noMoreDataAllowed"));
})(tP || (tP = {}));
var Fee = function* (e) {
  let t = new Ni(e),
    r = () => {
      let n = 0;
      for (let i = 0; i < 8; i++) {
        let o = t.readAlignedByte();
        if (((n |= (o & 127) << (i * 7)), !(o & 128))) break;
        if (i === 7 && o & 128) return null;
      }
      if (n >= 4294967295) return null;
      return n;
    };
  while (t.getBitsLeft() >= 8) {
    t.skipBits(1);
    let n = t.readBits(4),
      i = t.readBits(1),
      o = t.readBits(1);
    if ((t.skipBits(1), i)) t.skipBits(8);
    let s;
    if (o) {
      let a = r();
      if (a === null) return;
      s = a;
    } else s = Math.floor(t.getBitsLeft() / 8);
    (Fe(t.pos % 8 === 0),
      yield { type: n, data: e.subarray(t.pos / 8, t.pos / 8 + s) },
      t.skipBits(s * 8));
  }
};
var c_ = (e) => {
  let t = T1(e),
    r = t.getUint8(9),
    n = t.getUint16(10, !0),
    i = t.getUint32(12, !0),
    o = t.getInt16(16, !0),
    s = t.getUint8(18),
    a = null;
  if (s) a = e.subarray(19, 21 + r);
  return {
    outputChannelCount: r,
    preSkip: n,
    inputSampleRate: i,
    outputGain: o,
    channelMappingFamily: s,
    channelMappingTable: a,
  };
};
var hP = (e, t, r) => {
    switch (e) {
      case "avc": {
        for (let n of wee(r, t)) {
          let i = r[n.offset],
            o = oP(i);
          if (o >= Gu.NON_IDR_SLICE && o <= Gu.SLICE_DPC) return "delta";
          if (o === Gu.IDR) return "key";
          if (o === Gu.SEI && (!BN() || FN() >= 144)) {
            let s = r.subarray(n.offset, n.offset + n.length),
              a = l_(s),
              l = 1;
            do {
              let c = 0;
              while (!0) {
                let h = a[l++];
                if (h === void 0) break;
                if (((c += h), h < 255)) break;
              }
              let u = 0;
              while (!0) {
                let h = a[l++];
                if (h === void 0) break;
                if (((u += h), h < 255)) break;
              }
              if (c === 6) {
                let h = new Ni(a);
                h.pos = 8 * l;
                let f = ht(h),
                  p = h.readBits(1);
                if (f === 0 && p === 1) return "key";
              }
              l += u;
            } while (l < a.length - 1);
          }
        }
        return "delta";
      }
      case "hevc": {
        for (let n of Eee(r, t)) {
          let i = A6(r[n.offset]);
          if (i < ul.BLA_W_LP) return "delta";
          if (i <= ul.RSV_IRAP_VCL23) return "key";
        }
        return "delta";
      }
      case "vp8":
        return (r[0] & 1) === 0 ? "key" : "delta";
      case "vp9": {
        let n = new Ni(r);
        if (n.readBits(2) !== 2) return null;
        let i = n.readBits(1);
        if ((n.readBits(1) << 1) + i === 3) n.skipBits(1);
        if (n.readBits(1)) return null;
        return n.readBits(1) === 0 ? "key" : "delta";
      }
      case "av1": {
        let n = !1;
        for (let { type: i, data: o } of Fee(r))
          if (i === 1) {
            let s = new Ni(o);
            (s.skipBits(4), (n = !!s.readBits(1)));
          } else if (i === 3 || i === 6 || i === 7) {
            if (n) return "key";
            let s = new Ni(o);
            if (s.readBits(1)) return null;
            return s.readBits(2) === 0 ? "key" : "delta";
          }
        return null;
      }
      case "prores":
        return "key";
      default:
        (Rs(e), Fe(!1));
    }
  },
  rP;
(function (e) {
  ((e[(e.STREAMINFO = 0)] = "STREAMINFO"),
    (e[(e.VORBIS_COMMENT = 4)] = "VORBIS_COMMENT"),
    (e[(e.PICTURE = 6)] = "PICTURE"));
})(rP || (rP = {}));
var fP = (e) => {
  if (e.length < 7) return null;
  if (e[0] !== 11 || e[1] !== 119) return null;
  let t = new Ni(e);
  (t.skipBits(16), t.skipBits(16));
  let r = t.readBits(2);
  if (r === 3) return null;
  let n = t.readBits(6),
    i = t.readBits(5);
  if (i > 8) return null;
  let o = t.readBits(3),
    s = t.readBits(3);
  if ((s & 1) !== 0 && s !== 1) t.skipBits(2);
  if ((s & 4) !== 0) t.skipBits(2);
  if (s === 2) t.skipBits(2);
  let a = t.readBits(1),
    l = Math.floor(n / 2);
  return { fscod: r, bsid: i, bsmod: o, acmod: s, lfeon: a, bitRateCode: l };
};
var Kye = new Uint8Array([5, 4, 65, 67, 45, 51]),
  qye = new Uint8Array([5, 4, 69, 65, 67, 51]),
  Dee = [1, 2, 3, 6],
  pP = (e) => {
    if (e.length < 6) return null;
    if (e[0] !== 11 || e[1] !== 119) return null;
    let t = new Ni(e);
    t.skipBits(16);
    let r = t.readBits(2);
    if ((t.skipBits(3), r !== 0 && r !== 2)) return null;
    let n = t.readBits(11),
      i = t.readBits(2),
      o = 0,
      s;
    if (i === 3) ((o = t.readBits(2)), (s = 3));
    else s = t.readBits(2);
    let a = t.readBits(3),
      l = t.readBits(1),
      c = t.readBits(5);
    if (c < 11 || c > 16) return null;
    let u = Dee[s],
      d;
    if (i < 3) d = ZN[i] / 1000;
    else d = $N[o] / 1000;
    return {
      dataRate: Math.round(((n + 1) * d) / (u * 16)),
      substreams: [
        { fscod: i, fscod2: o, bsid: c, bsmod: 0, acmod: a, lfeon: l, numDepSub: 0, chanLoc: 0 },
      ],
    };
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var mP = /*@__PURE__*/ new Uint8Array(0);
class O1 {
  constructor(e, t, r, n, i = -1, o, s) {
    if (
      ((this.data = e),
      (this.type = t),
      (this.timestamp = r),
      (this.duration = n),
      (this.sequenceNumber = i),
      e === mP && o === void 0)
    )
      throw Error(
        "Internal error: byteLength must be explicitly provided when constructing metadata-only packets.",
      );
    if (o === void 0) o = e.byteLength;
    if (!(e instanceof Uint8Array)) throw TypeError("data must be a Uint8Array.");
    if (t !== "key" && t !== "delta") throw TypeError('type must be either "key" or "delta".');
    if (!Number.isFinite(r)) throw TypeError("timestamp must be a number.");
    if (!Number.isFinite(n) || n < 0) throw TypeError("duration must be a non-negative number.");
    if (!Number.isFinite(i)) throw TypeError("sequenceNumber must be a number.");
    if (!Number.isInteger(o) || o < 0)
      throw TypeError("byteLength must be a non-negative integer.");
    if (s !== void 0 && (typeof s !== "object" || !s))
      throw TypeError("sideData, when provided, must be an object.");
    if (s?.alpha !== void 0 && !(s.alpha instanceof Uint8Array))
      throw TypeError("sideData.alpha, when provided, must be a Uint8Array.");
    if (
      s?.alphaByteLength !== void 0 &&
      (!Number.isInteger(s.alphaByteLength) || s.alphaByteLength < 0)
    )
      throw TypeError("sideData.alphaByteLength, when provided, must be a non-negative integer.");
    if (
      ((this.byteLength = o),
      (this.sideData = s ?? {}),
      this.sideData.alpha && this.sideData.alphaByteLength === void 0)
    )
      this.sideData.alphaByteLength = this.sideData.alpha.byteLength;
  }
  get isMetadataOnly() {
    return this.data === mP;
  }
  get microsecondTimestamp() {
    return Math.trunc(rh * this.timestamp);
  }
  get microsecondDuration() {
    return Math.trunc(rh * this.duration);
  }
  toEncodedVideoChunk() {
    if (this.isMetadataOnly)
      throw TypeError("Metadata-only packets cannot be converted to a video chunk.");
    if (typeof EncodedVideoChunk > "u")
      throw Error("Your browser does not support EncodedVideoChunk.");
    return new EncodedVideoChunk({
      data: this.data,
      type: this.type,
      timestamp: this.microsecondTimestamp,
      duration: this.microsecondDuration,
    });
  }
  alphaToEncodedVideoChunk(e = this.type) {
    if (!this.sideData.alpha) throw TypeError("This packet does not contain alpha side data.");
    if (this.isMetadataOnly)
      throw TypeError("Metadata-only packets cannot be converted to a video chunk.");
    if (typeof EncodedVideoChunk > "u")
      throw Error("Your browser does not support EncodedVideoChunk.");
    return new EncodedVideoChunk({
      data: this.sideData.alpha,
      type: e,
      timestamp: this.microsecondTimestamp,
      duration: this.microsecondDuration,
    });
  }
  toEncodedAudioChunk() {
    if (this.isMetadataOnly)
      throw TypeError("Metadata-only packets cannot be converted to an audio chunk.");
    if (typeof EncodedAudioChunk > "u")
      throw Error("Your browser does not support EncodedAudioChunk.");
    return new EncodedAudioChunk({
      data: this.data,
      type: this.type,
      timestamp: this.microsecondTimestamp,
      duration: this.microsecondDuration,
    });
  }
  static fromEncodedChunk(e, t) {
    if (!(e instanceof EncodedVideoChunk || e instanceof EncodedAudioChunk))
      throw TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");
    let r = new Uint8Array(e.byteLength);
    return (
      e.copyTo(r),
      new O1(r, e.type, e.timestamp / 1e6, (e.duration ?? 0) / 1e6, void 0, void 0, t)
    );
  }
  clone(e) {
    if (e !== void 0 && (typeof e !== "object" || e === null))
      throw TypeError("options, when provided, must be an object.");
    if (e?.data !== void 0 && !(e.data instanceof Uint8Array))
      throw TypeError("options.data, when provided, must be a Uint8Array.");
    if (e?.type !== void 0 && e.type !== "key" && e.type !== "delta")
      throw TypeError('options.type, when provided, must be either "key" or "delta".');
    if (e?.timestamp !== void 0 && !Number.isFinite(e.timestamp))
      throw TypeError("options.timestamp, when provided, must be a number.");
    if (e?.duration !== void 0 && !Number.isFinite(e.duration))
      throw TypeError("options.duration, when provided, must be a number.");
    if (e?.sequenceNumber !== void 0 && !Number.isFinite(e.sequenceNumber))
      throw TypeError("options.sequenceNumber, when provided, must be a number.");
    if (e?.sideData !== void 0 && (typeof e.sideData !== "object" || e.sideData === null))
      throw TypeError("options.sideData, when provided, must be an object.");
    return new O1(
      e?.data ?? this.data,
      e?.type ?? this.type,
      e?.timestamp ?? this.timestamp,
      e?.duration ?? this.duration,
      e?.sequenceNumber ?? this.sequenceNumber,
      this.byteLength,
      e?.sideData ?? this.sideData,
    );
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var gP = (e) => {
  let r =
    (e.hasVideo ? "video/" : e.hasAudio ? "audio/" : "application/") +
    (e.isQuickTime ? "quicktime" : "mp4");
  if (e.codecStrings.length > 0) {
    let n = [...new Set(e.codecStrings)];
    r += `; codecs="${n.join(", ")}"`;
  }
  return r;
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var u_ = 8,
  y6 = 16;
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class _3 {
  constructor(e) {
    this.value = e;
  }
}
class v3 {
  constructor(e) {
    this.value = e;
  }
}
class d_ {
  constructor(e) {
    this.value = e;
  }
}
class Sc {
  constructor(e) {
    this.value = e;
  }
}
var Ge;
(function (e) {
  ((e[(e.EBML = 440786851)] = "EBML"),
    (e[(e.EBMLVersion = 17030)] = "EBMLVersion"),
    (e[(e.EBMLReadVersion = 17143)] = "EBMLReadVersion"),
    (e[(e.EBMLMaxIDLength = 17138)] = "EBMLMaxIDLength"),
    (e[(e.EBMLMaxSizeLength = 17139)] = "EBMLMaxSizeLength"),
    (e[(e.DocType = 17026)] = "DocType"),
    (e[(e.DocTypeVersion = 17031)] = "DocTypeVersion"),
    (e[(e.DocTypeReadVersion = 17029)] = "DocTypeReadVersion"),
    (e[(e.Void = 236)] = "Void"),
    (e[(e.Segment = 408125543)] = "Segment"),
    (e[(e.SeekHead = 290298740)] = "SeekHead"),
    (e[(e.Seek = 19899)] = "Seek"),
    (e[(e.SeekID = 21419)] = "SeekID"),
    (e[(e.SeekPosition = 21420)] = "SeekPosition"),
    (e[(e.Duration = 17545)] = "Duration"),
    (e[(e.Info = 357149030)] = "Info"),
    (e[(e.TimestampScale = 2807729)] = "TimestampScale"),
    (e[(e.MuxingApp = 19840)] = "MuxingApp"),
    (e[(e.WritingApp = 22337)] = "WritingApp"),
    (e[(e.Tracks = 374648427)] = "Tracks"),
    (e[(e.TrackEntry = 174)] = "TrackEntry"),
    (e[(e.TrackNumber = 215)] = "TrackNumber"),
    (e[(e.TrackUID = 29637)] = "TrackUID"),
    (e[(e.TrackType = 131)] = "TrackType"),
    (e[(e.FlagEnabled = 185)] = "FlagEnabled"),
    (e[(e.FlagDefault = 136)] = "FlagDefault"),
    (e[(e.FlagForced = 21930)] = "FlagForced"),
    (e[(e.FlagOriginal = 21934)] = "FlagOriginal"),
    (e[(e.FlagHearingImpaired = 21931)] = "FlagHearingImpaired"),
    (e[(e.FlagVisualImpaired = 21932)] = "FlagVisualImpaired"),
    (e[(e.FlagCommentary = 21935)] = "FlagCommentary"),
    (e[(e.FlagLacing = 156)] = "FlagLacing"),
    (e[(e.Name = 21358)] = "Name"),
    (e[(e.Language = 2274716)] = "Language"),
    (e[(e.LanguageBCP47 = 2274717)] = "LanguageBCP47"),
    (e[(e.CodecID = 134)] = "CodecID"),
    (e[(e.CodecPrivate = 25506)] = "CodecPrivate"),
    (e[(e.CodecDelay = 22186)] = "CodecDelay"),
    (e[(e.SeekPreRoll = 22203)] = "SeekPreRoll"),
    (e[(e.DefaultDuration = 2352003)] = "DefaultDuration"),
    (e[(e.Video = 224)] = "Video"),
    (e[(e.PixelWidth = 176)] = "PixelWidth"),
    (e[(e.PixelHeight = 186)] = "PixelHeight"),
    (e[(e.DisplayWidth = 21680)] = "DisplayWidth"),
    (e[(e.DisplayHeight = 21690)] = "DisplayHeight"),
    (e[(e.DisplayUnit = 21682)] = "DisplayUnit"),
    (e[(e.AlphaMode = 21440)] = "AlphaMode"),
    (e[(e.Audio = 225)] = "Audio"),
    (e[(e.SamplingFrequency = 181)] = "SamplingFrequency"),
    (e[(e.Channels = 159)] = "Channels"),
    (e[(e.BitDepth = 25188)] = "BitDepth"),
    (e[(e.SimpleBlock = 163)] = "SimpleBlock"),
    (e[(e.BlockGroup = 160)] = "BlockGroup"),
    (e[(e.Block = 161)] = "Block"),
    (e[(e.BlockAdditions = 30113)] = "BlockAdditions"),
    (e[(e.BlockMore = 166)] = "BlockMore"),
    (e[(e.BlockAdditional = 165)] = "BlockAdditional"),
    (e[(e.BlockAddID = 238)] = "BlockAddID"),
    (e[(e.BlockDuration = 155)] = "BlockDuration"),
    (e[(e.ReferenceBlock = 251)] = "ReferenceBlock"),
    (e[(e.Cluster = 524531317)] = "Cluster"),
    (e[(e.Timestamp = 231)] = "Timestamp"),
    (e[(e.Cues = 475249515)] = "Cues"),
    (e[(e.CuePoint = 187)] = "CuePoint"),
    (e[(e.CueTime = 179)] = "CueTime"),
    (e[(e.CueTrackPositions = 183)] = "CueTrackPositions"),
    (e[(e.CueTrack = 247)] = "CueTrack"),
    (e[(e.CueClusterPosition = 241)] = "CueClusterPosition"),
    (e[(e.Colour = 21936)] = "Colour"),
    (e[(e.MatrixCoefficients = 21937)] = "MatrixCoefficients"),
    (e[(e.TransferCharacteristics = 21946)] = "TransferCharacteristics"),
    (e[(e.Primaries = 21947)] = "Primaries"),
    (e[(e.Range = 21945)] = "Range"),
    (e[(e.Projection = 30320)] = "Projection"),
    (e[(e.ProjectionType = 30321)] = "ProjectionType"),
    (e[(e.ProjectionPoseRoll = 30325)] = "ProjectionPoseRoll"),
    (e[(e.Attachments = 423732329)] = "Attachments"),
    (e[(e.AttachedFile = 24999)] = "AttachedFile"),
    (e[(e.FileDescription = 18046)] = "FileDescription"),
    (e[(e.FileName = 18030)] = "FileName"),
    (e[(e.FileMediaType = 18016)] = "FileMediaType"),
    (e[(e.FileData = 18012)] = "FileData"),
    (e[(e.FileUID = 18094)] = "FileUID"),
    (e[(e.Chapters = 272869232)] = "Chapters"),
    (e[(e.Tags = 307544935)] = "Tags"),
    (e[(e.Tag = 29555)] = "Tag"),
    (e[(e.Targets = 25536)] = "Targets"),
    (e[(e.TargetTypeValue = 26826)] = "TargetTypeValue"),
    (e[(e.TargetType = 25546)] = "TargetType"),
    (e[(e.TagTrackUID = 25541)] = "TagTrackUID"),
    (e[(e.TagEditionUID = 25545)] = "TagEditionUID"),
    (e[(e.TagChapterUID = 25540)] = "TagChapterUID"),
    (e[(e.TagAttachmentUID = 25542)] = "TagAttachmentUID"),
    (e[(e.SimpleTag = 26568)] = "SimpleTag"),
    (e[(e.TagName = 17827)] = "TagName"),
    (e[(e.TagLanguage = 17530)] = "TagLanguage"),
    (e[(e.TagString = 17543)] = "TagString"),
    (e[(e.TagBinary = 17541)] = "TagBinary"),
    (e[(e.ContentEncodings = 28032)] = "ContentEncodings"),
    (e[(e.ContentEncoding = 25152)] = "ContentEncoding"),
    (e[(e.ContentEncodingOrder = 20529)] = "ContentEncodingOrder"),
    (e[(e.ContentEncodingScope = 20530)] = "ContentEncodingScope"),
    (e[(e.ContentCompression = 20532)] = "ContentCompression"),
    (e[(e.ContentCompAlgo = 16980)] = "ContentCompAlgo"),
    (e[(e.ContentCompSettings = 16981)] = "ContentCompSettings"),
    (e[(e.ContentEncryption = 20533)] = "ContentEncryption"));
})(Ge || (Ge = {}));
var Nee = [Ge.EBML, Ge.Segment],
  Pee = [
    Ge.SeekHead,
    Ge.Info,
    Ge.Cluster,
    Ge.Tracks,
    Ge.Cues,
    Ge.Attachments,
    Ge.Chapters,
    Ge.Tags,
  ],
  n4e = [...Nee, ...Pee],
  AP = (e) => {
    if (e < 256) return 1;
    else if (e < 65536) return 2;
    else if (e < 16777216) return 3;
    else if (e < 4294967296) return 4;
    else if (e < 1099511627776) return 5;
    else return 6;
  },
  yP = (e) => {
    if (e < 1n << 8n) return 1;
    else if (e < 1n << 16n) return 2;
    else if (e < 1n << 24n) return 3;
    else if (e < 1n << 32n) return 4;
    else if (e < 1n << 40n) return 5;
    else if (e < 1n << 48n) return 6;
    else if (e < 1n << 56n) return 7;
    else return 8;
  },
  xP = (e) => {
    if (e >= -64 && e < 64) return 1;
    else if (e >= -8192 && e < 8192) return 2;
    else if (e >= -1048576 && e < 1048576) return 3;
    else if (e >= -134217728 && e < 134217728) return 4;
    else if (e >= -17179869184 && e < 17179869184) return 5;
    else return 6;
  },
  kee = (e) => {
    if (e < 127) return 1;
    else if (e < 16383) return 2;
    else if (e < 2097151) return 3;
    else if (e < 268435455) return 4;
    else if (e < 34359738367) return 5;
    else if (e < 4398046511103) return 6;
    else throw Error("EBML varint size not supported " + e);
  };
class x6 {
  constructor(e) {
    ((this.writer = e),
      (this.helper = new Uint8Array(8)),
      (this.helperView = new DataView(this.helper.buffer)),
      (this.offsets = /*@__PURE__*/ new WeakMap()),
      (this.dataOffsets = /*@__PURE__*/ new WeakMap()));
  }
  writeByte(e) {
    (this.helperView.setUint8(0, e), this.writer.write(this.helper.subarray(0, 1)));
  }
  writeFloat32(e) {
    (this.helperView.setFloat32(0, e, !1), this.writer.write(this.helper.subarray(0, 4)));
  }
  writeFloat64(e) {
    (this.helperView.setFloat64(0, e, !1), this.writer.write(this.helper));
  }
  writeUnsignedInt(e, t = AP(e)) {
    let r = 0;
    switch (t) {
      case 6:
        this.helperView.setUint8(r++, (e / 1099511627776) | 0);
      case 5:
        this.helperView.setUint8(r++, (e / 4294967296) | 0);
      case 4:
        this.helperView.setUint8(r++, e >> 24);
      case 3:
        this.helperView.setUint8(r++, e >> 16);
      case 2:
        this.helperView.setUint8(r++, e >> 8);
      case 1:
        this.helperView.setUint8(r++, e);
        break;
      default:
        throw Error("Bad unsigned int size " + t);
    }
    this.writer.write(this.helper.subarray(0, r));
  }
  writeUnsignedBigInt(e, t = yP(e)) {
    let r = 0;
    for (let n = t - 1; n >= 0; n--)
      this.helperView.setUint8(r++, Number((e >> BigInt(n * 8)) & 0xffn));
    this.writer.write(this.helper.subarray(0, r));
  }
  writeSignedInt(e, t = xP(e)) {
    if (e < 0) e += 2 ** (t * 8);
    this.writeUnsignedInt(e, t);
  }
  writeVarInt(e, t = kee(e)) {
    let r = 0;
    switch (t) {
      case 1:
        this.helperView.setUint8(r++, 128 | e);
        break;
      case 2:
        (this.helperView.setUint8(r++, 64 | (e >> 8)), this.helperView.setUint8(r++, e));
        break;
      case 3:
        (this.helperView.setUint8(r++, 32 | (e >> 16)),
          this.helperView.setUint8(r++, e >> 8),
          this.helperView.setUint8(r++, e));
        break;
      case 4:
        (this.helperView.setUint8(r++, 16 | (e >> 24)),
          this.helperView.setUint8(r++, e >> 16),
          this.helperView.setUint8(r++, e >> 8),
          this.helperView.setUint8(r++, e));
        break;
      case 5:
        (this.helperView.setUint8(r++, 8 | ((e / 4294967296) & 7)),
          this.helperView.setUint8(r++, e >> 24),
          this.helperView.setUint8(r++, e >> 16),
          this.helperView.setUint8(r++, e >> 8),
          this.helperView.setUint8(r++, e));
        break;
      case 6:
        (this.helperView.setUint8(r++, 4 | ((e / 1099511627776) & 3)),
          this.helperView.setUint8(r++, (e / 4294967296) | 0),
          this.helperView.setUint8(r++, e >> 24),
          this.helperView.setUint8(r++, e >> 16),
          this.helperView.setUint8(r++, e >> 8),
          this.helperView.setUint8(r++, e));
        break;
      default:
        throw Error("Bad EBML varint size " + t);
    }
    this.writer.write(this.helper.subarray(0, r));
  }
  writeAsciiString(e) {
    this.writer.write(new Uint8Array(e.split("").map((t) => t.charCodeAt(0))));
  }
  writeEBML(e) {
    if (e === null) return;
    if (e instanceof Uint8Array) this.writer.write(e);
    else if (Array.isArray(e)) for (let t of e) this.writeEBML(t);
    else if (
      (this.offsets.set(e, this.writer.getPos()),
      this.writeUnsignedInt(e.id),
      Array.isArray(e.data))
    ) {
      let t = this.writer.getPos(),
        r = e.size === -1 ? 1 : (e.size ?? 4);
      if (e.size === -1) this.writeByte(255);
      else this.writer.seek(this.writer.getPos() + r);
      let n = this.writer.getPos();
      if ((this.dataOffsets.set(e, n), this.writeEBML(e.data), e.size !== -1)) {
        let i = this.writer.getPos() - n,
          o = this.writer.getPos();
        (this.writer.seek(t), this.writeVarInt(i, r), this.writer.seek(o));
      }
    } else if (typeof e.data === "number") {
      let t = e.size ?? AP(e.data);
      (this.writeVarInt(t), this.writeUnsignedInt(e.data, t));
    } else if (typeof e.data === "bigint") {
      let t = e.size ?? yP(e.data);
      (this.writeVarInt(t), this.writeUnsignedBigInt(e.data, t));
    } else if (typeof e.data === "string")
      (this.writeVarInt(e.data.length), this.writeAsciiString(e.data));
    else if (e.data instanceof Uint8Array)
      (this.writeVarInt(e.data.byteLength, e.size), this.writer.write(e.data));
    else if (e.data instanceof _3) (this.writeVarInt(4), this.writeFloat32(e.data.value));
    else if (e.data instanceof v3) (this.writeVarInt(8), this.writeFloat64(e.data.value));
    else if (e.data instanceof d_) {
      let t = e.size ?? xP(e.data.value);
      (this.writeVarInt(t), this.writeSignedInt(e.data.value, t));
    } else if (e.data instanceof Sc) {
      let t = Co.encode(e.data.value);
      (this.writeVarInt(t.length), this.writer.write(t));
    } else Rs(e.data);
  }
}
var Uee = 8;
var i4e = 2 * Uee;
var bP = {
  avc: "V_MPEG4/ISO/AVC",
  hevc: "V_MPEGH/ISO/HEVC",
  vp8: "V_VP8",
  vp9: "V_VP9",
  av1: "V_AV1",
  prores: "V_PRORES",
  aac: "A_AAC",
  mp3: "A_MPEG/L3",
  opus: "A_OPUS",
  vorbis: "A_VORBIS",
  flac: "A_FLAC",
  ac3: "A_AC3",
  eac3: "A_EAC3",
  "pcm-u8": "A_PCM/INT/LIT",
  "pcm-s16": "A_PCM/INT/LIT",
  "pcm-s16be": "A_PCM/INT/BIG",
  "pcm-s24": "A_PCM/INT/LIT",
  "pcm-s24be": "A_PCM/INT/BIG",
  "pcm-s32": "A_PCM/INT/LIT",
  "pcm-s32be": "A_PCM/INT/BIG",
  "pcm-f32": "A_PCM/FLOAT/IEEE",
  "pcm-f64": "A_PCM/FLOAT/IEEE",
  webvtt: "S_TEXT/WEBVTT",
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var _P = (e) => {
  let r =
    (e.hasVideo ? "video/" : e.hasAudio ? "audio/" : "application/") +
    (e.isWebM ? "webm" : "x-matroska");
  if (e.codecStrings.length > 0) {
    let n = [...new Set(e.codecStrings.filter(Boolean))];
    r += `; codecs="${n.join(", ")}"`;
  }
  return r;
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var h_ = 7,
  f_ = 9,
  L1 = (e) => {
    let t = e.filePos,
      r = vP(e, 9),
      n = new Ni(r);
    if (n.readBits(12) !== 4095) return null;
    if ((n.skipBits(1), n.readBits(2) !== 0)) return null;
    let s = n.readBits(1),
      a = n.readBits(2) + 1,
      l = n.readBits(4);
    if (l === 15) return null;
    n.skipBits(1);
    let c = n.readBits(3);
    if (c === 0) throw Error("ADTS frames with channel configuration 0 are not supported.");
    (n.skipBits(1), n.skipBits(1), n.skipBits(1), n.skipBits(1));
    let u = n.readBits(13);
    n.skipBits(11);
    let d = n.readBits(2) + 1;
    if (d !== 1) throw Error("ADTS frames with more than one AAC frame are not supported.");
    let h = null;
    if (s === 1) e.filePos -= 2;
    else h = n.readBits(16);
    return {
      objectType: a,
      samplingFrequencyIndex: l,
      channelConfiguration: c,
      frameLength: u,
      numberOfAacFrames: d,
      crcCheck: h,
      startPos: t,
    };
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var Hee = function (e, t, r) {
    if (t !== null && t !== void 0) {
      if (typeof t !== "object" && typeof t !== "function") throw TypeError("Object expected.");
      var n, i;
      if (r) {
        if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
        n = t[Symbol.asyncDispose];
      }
      if (n === void 0) {
        if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
        if (((n = t[Symbol.dispose]), r)) i = n;
      }
      if (typeof n !== "function") throw TypeError("Object not disposable.");
      if (i)
        n = function () {
          try {
            i.call(this);
          } catch (o) {
            return Promise.reject(o);
          }
        };
      e.stack.push({ value: t, dispose: n, async: r });
    } else if (r) e.stack.push({ async: !0 });
    return t;
  },
  Gee = (function (e) {
    return function (t) {
      function r(s) {
        ((t.error = t.hasError ? new e(s, t.error, "An error was suppressed during disposal.") : s),
          (t.hasError = !0));
      }
      var n,
        i = 0;
      function o() {
        while ((n = t.stack.pop()))
          try {
            if (!n.async && i === 1) return ((i = 0), t.stack.push(n), Promise.resolve().then(o));
            if (n.dispose) {
              var s = n.dispose.call(n.value);
              if (n.async)
                return (
                  (i |= 2),
                  Promise.resolve(s).then(o, function (a) {
                    return (r(a), o());
                  })
                );
            } else i |= 1;
          } catch (a) {
            r(a);
          }
        if (i === 1) return t.hasError ? Promise.reject(t.error) : Promise.resolve();
        if (t.hasError) throw t.error;
      }
      return o();
    };
  })(
    typeof SuppressedError === "function"
      ? SuppressedError
      : function (e, t, r) {
          var n = Error(r);
          return ((n.name = "SuppressedError"), (n.error = e), (n.suppressed = t), n);
        },
  );
PN();
var CP = -1 / 0,
  wP = -1 / 0,
  b6 = null;
if (typeof FinalizationRegistry < "u")
  b6 = new FinalizationRegistry((e) => {
    let t = performance.now();
    if (e.type === "video") {
      if (t - CP >= 1000)
        (Un._error(
          "A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.",
        ),
          (CP = t));
      if (typeof VideoFrame < "u" && e.data instanceof VideoFrame) e.data.close();
    } else {
      if (t - wP >= 1000)
        (Un._error(
          "An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.",
        ),
          (wP = t));
      if (typeof AudioData < "u" && e.data instanceof AudioData) e.data.close();
    }
  });
class ih {
  constructor() {
    ((this._referenceCount = 0), (this._lastAllocationBuffer = null));
  }
}
var _6 = [
    "I420",
    "I420P10",
    "I420P12",
    "I420A",
    "I420AP10",
    "I420AP12",
    "I422",
    "I422P10",
    "I422P12",
    "I422A",
    "I422AP10",
    "I422AP12",
    "I444",
    "I444P10",
    "I444P12",
    "I444A",
    "I444AP10",
    "I444AP12",
    "NV12",
    "RGBA",
    "RGBX",
    "BGRA",
    "BGRX",
  ],
  zee = new Set(_6);
class na {
  get codedWidth() {
    return this.visibleRect.width;
  }
  get codedHeight() {
    return this.visibleRect.height;
  }
  get displayWidth() {
    return this.rotation % 180 === 0 ? this.squarePixelWidth : this.squarePixelHeight;
  }
  get displayHeight() {
    return this.rotation % 180 === 0 ? this.squarePixelHeight : this.squarePixelWidth;
  }
  get microsecondTimestamp() {
    return Math.trunc(rh * this.timestamp);
  }
  get microsecondDuration() {
    return Math.trunc(rh * this.duration);
  }
  get hasAlpha() {
    return this.format && this.format.includes("A");
  }
  constructor(e, t) {
    if (
      ((this._closed = !1),
      e instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) ||
        ArrayBuffer.isView(e))
    ) {
      if (!t || typeof t !== "object") throw TypeError("init must be an object.");
      if (t.format === void 0 || !zee.has(t.format))
        throw TypeError("init.format must be one of: " + _6.join(", "));
      if (!Number.isInteger(t.codedWidth) || t.codedWidth <= 0)
        throw TypeError("init.codedWidth must be a positive integer.");
      if (!Number.isInteger(t.codedHeight) || t.codedHeight <= 0)
        throw TypeError("init.codedHeight must be a positive integer.");
      if (t.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation))
        throw TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      if (!Number.isFinite(t.timestamp)) throw TypeError("init.timestamp must be a number.");
      if (t.duration !== void 0 && (!Number.isFinite(t.duration) || t.duration < 0))
        throw TypeError("init.duration, when provided, must be a non-negative number.");
      if (t.layout !== void 0) {
        if (!Array.isArray(t.layout))
          throw TypeError("init.layout, when provided, must be an array.");
        for (let i of t.layout) {
          if (!i || typeof i !== "object" || Array.isArray(i))
            throw TypeError("Each entry in init.layout must be an object.");
          if (!Number.isInteger(i.offset) || i.offset < 0)
            throw TypeError("plane.offset must be a non-negative integer.");
          if (!Number.isInteger(i.stride) || i.stride < 0)
            throw TypeError("plane.stride must be a non-negative integer.");
        }
      }
      if (t.visibleRect !== void 0) p6(t.visibleRect, "init.visibleRect");
      if (t.displayWidth !== void 0 && (!Number.isInteger(t.displayWidth) || t.displayWidth <= 0))
        throw TypeError("init.displayWidth, when provided, must be a positive integer.");
      if (
        t.displayHeight !== void 0 &&
        (!Number.isInteger(t.displayHeight) || t.displayHeight <= 0)
      )
        throw TypeError("init.displayHeight, when provided, must be a positive integer.");
      if ((t.displayWidth !== void 0) !== (t.displayHeight !== void 0))
        throw TypeError(
          "init.displayWidth and init.displayHeight must be either both provided or both omitted.",
        );
      ((this.format = t.format),
        (this.rotation = t.rotation ?? 0),
        (this.timestamp = t.timestamp),
        (this.duration = t.duration ?? 0));
      let r = t.layout ?? Qee(t.format, t.codedWidth, t.codedHeight),
        n = t.colorSpace ?? null;
      if (n === null)
        if (
          this.format === "RGBA" ||
          this.format === "RGBX" ||
          this.format === "BGRA" ||
          this.format === "BGRX"
        )
          n = { primaries: "bt709", transfer: "iec61966-2-1", matrix: "rgb", fullRange: !0 };
        else n = { primaries: "bt709", transfer: "bt709", matrix: "bt709", fullRange: !1 };
      if (
        ((this.visibleRect = {
          left: t.visibleRect?.left ?? 0,
          top: t.visibleRect?.top ?? 0,
          width: t.visibleRect?.width ?? t.codedWidth,
          height: t.visibleRect?.height ?? t.codedHeight,
        }),
        t.displayWidth !== void 0)
      )
        ((this.squarePixelWidth = this.rotation % 180 === 0 ? t.displayWidth : t.displayHeight),
          (this.squarePixelHeight = this.rotation % 180 === 0 ? t.displayHeight : t.displayWidth));
      else
        ((this.squarePixelWidth = this.visibleRect.width),
          (this.squarePixelHeight = this.visibleRect.height));
      ((this._data = t._doNotCopy ? Fo(e) : Fo(e).slice()),
        (this._layout = r),
        (this.colorSpace = new p_(n)));
    } else if (typeof VideoFrame < "u" && e instanceof VideoFrame) {
      if (t?.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation))
        throw TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      if (t?.timestamp !== void 0 && !Number.isFinite(t?.timestamp))
        throw TypeError("init.timestamp, when provided, must be a number.");
      if (t?.duration !== void 0 && (!Number.isFinite(t.duration) || t.duration < 0))
        throw TypeError("init.duration, when provided, must be a non-negative number.");
      if (t?.visibleRect !== void 0) p6(t.visibleRect, "init.visibleRect");
      ((this._data = e),
        (this._layout = null),
        (this.format = e.format),
        (this.visibleRect = {
          left: e.visibleRect?.x ?? 0,
          top: e.visibleRect?.y ?? 0,
          width: e.visibleRect?.width ?? e.codedWidth,
          height: e.visibleRect?.height ?? e.codedHeight,
        }),
        (this.rotation = t?.rotation ?? 0),
        (this.squarePixelWidth = e.displayWidth),
        (this.squarePixelHeight = e.displayHeight),
        (this.timestamp = t?.timestamp ?? e.timestamp / 1e6),
        (this.duration = t?.duration ?? (e.duration ?? 0) / 1e6),
        (this.colorSpace = new p_(e.colorSpace)));
    } else if (
      (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
      (typeof SVGImageElement < "u" && e instanceof SVGImageElement) ||
      (typeof ImageBitmap < "u" && e instanceof ImageBitmap) ||
      (typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement) ||
      (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
      (typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
    ) {
      if (!t || typeof t !== "object") throw TypeError("init must be an object.");
      if (t.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation))
        throw TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      if (!Number.isFinite(t.timestamp)) throw TypeError("init.timestamp must be a number.");
      if (t.duration !== void 0 && (!Number.isFinite(t.duration) || t.duration < 0))
        throw TypeError("init.duration, when provided, must be a non-negative number.");
      if (typeof VideoFrame < "u")
        return new na(
          new VideoFrame(e, {
            timestamp: Math.trunc(t.timestamp * rh),
            duration: Math.trunc((t.duration ?? 0) * rh) || void 0,
          }),
          t,
        );
      let r = 0,
        n = 0;
      if ("naturalWidth" in e) ((r = e.naturalWidth), (n = e.naturalHeight));
      else if ("videoWidth" in e) ((r = e.videoWidth), (n = e.videoHeight));
      else if ("width" in e) ((r = Number(e.width)), (n = Number(e.height)));
      if (!r || !n) throw TypeError("Could not determine dimensions.");
      let i = new OffscreenCanvas(r, n),
        o = i.getContext("2d", { alpha: f6(), willReadFrequently: !0 });
      if (!o)
        throw Error(
          "OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.",
        );
      (o.drawImage(e, 0, 0),
        (this._data = i),
        (this._layout = null),
        (this.format = "RGBX"),
        (this.visibleRect = { left: 0, top: 0, width: r, height: n }),
        (this.squarePixelWidth = r),
        (this.squarePixelHeight = n),
        (this.rotation = t.rotation ?? 0),
        (this.timestamp = t.timestamp),
        (this.duration = t.duration ?? 0),
        (this.colorSpace = new p_({
          matrix: "rgb",
          primaries: "bt709",
          transfer: "iec61966-2-1",
          fullRange: !0,
        })));
    } else if (e instanceof ih) {
      if (!t || typeof t !== "object") throw TypeError("init must be an object.");
      if (t.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation))
        throw TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
      if (!Number.isFinite(t.timestamp)) throw TypeError("init.timestamp must be a number.");
      if (t.duration !== void 0 && (!Number.isFinite(t.duration) || t.duration < 0))
        throw TypeError("init.duration, when provided, must be a non-negative number.");
      if (
        ((this._data = e),
        e._referenceCount++,
        (this.format = e.getFormat()),
        this.format !== null && !_6.includes(this.format))
      )
        throw TypeError("getFormat() must return a VideoSamplePixelFormat or null.");
      if (
        ((this.visibleRect = {
          left: 0,
          top: 0,
          width: e.getCodedWidth(),
          height: e.getCodedHeight(),
        }),
        !Number.isInteger(this.visibleRect.width) || this.visibleRect.width <= 0)
      )
        throw TypeError("getCodedWidth() must return a positive integer.");
      if (!Number.isInteger(this.visibleRect.height) || this.visibleRect.height <= 0)
        throw TypeError("getCodedHeight() must return a positive integer.");
      if (
        ((this.squarePixelWidth = e.getSquarePixelWidth()),
        !Number.isInteger(this.squarePixelWidth) || this.squarePixelWidth <= 0)
      )
        throw TypeError("getSquarePixelWidth() must return a positive integer.");
      if (
        ((this.squarePixelHeight = e.getSquarePixelHeight()),
        !Number.isInteger(this.squarePixelHeight) || this.squarePixelHeight <= 0)
      )
        throw TypeError("getSquarePixelHeight() must return a positive integer.");
      ((this.rotation = t.rotation ?? 0),
        (this.timestamp = t.timestamp),
        (this.duration = t.duration ?? 0),
        (this.colorSpace = e.getColorSpace()));
    } else
      throw TypeError(
        "Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.",
      );
    ((this.encodeOptions = t?.encodeOptions ?? {}),
      (this.pixelAspectRatio = I1({
        num: this.squarePixelWidth * this.codedHeight,
        den: this.squarePixelHeight * this.codedWidth,
      })),
      b6?.register(this, { type: "video", data: this._data }, this));
  }
  clone() {
    if (this._closed) throw Error("VideoSample is closed.");
    if ((Fe(this._data !== null), this._data instanceof ih))
      return new na(this._data, {
        timestamp: this.timestamp,
        duration: this.duration,
        rotation: this.rotation,
        encodeOptions: this.encodeOptions,
      });
    else if (w3(this._data))
      return new na(this._data.clone(), {
        timestamp: this.timestamp,
        duration: this.duration,
        rotation: this.rotation,
        encodeOptions: this.encodeOptions,
      });
    else if (this._data instanceof Uint8Array)
      return (
        Fe(this._layout),
        new na(this._data, {
          format: this.format,
          layout: this._layout,
          codedWidth: this.codedWidth,
          codedHeight: this.codedHeight,
          timestamp: this.timestamp,
          duration: this.duration,
          colorSpace: this.colorSpace,
          rotation: this.rotation,
          visibleRect: this.visibleRect,
          displayWidth: this.displayWidth,
          displayHeight: this.displayHeight,
          encodeOptions: this.encodeOptions,
          _doNotCopy: !0,
        })
      );
    else
      return new na(this._data, {
        format: this.format,
        codedWidth: this.codedWidth,
        codedHeight: this.codedHeight,
        timestamp: this.timestamp,
        duration: this.duration,
        colorSpace: this.colorSpace,
        rotation: this.rotation,
        visibleRect: this.visibleRect,
        displayWidth: this.displayWidth,
        displayHeight: this.displayHeight,
        encodeOptions: this.encodeOptions,
      });
  }
  close() {
    if (this._closed) return;
    if ((b6?.unregister(this), this._data instanceof ih)) {
      if ((this._data._referenceCount--, this._data._referenceCount === 0)) this._data.close();
    } else if (w3(this._data)) this._data.close();
    else this._data = null;
    this._closed = !0;
  }
  allocationSize(e = {}) {
    if ((SP(e), this._closed)) throw Error("VideoSample is closed.");
    if ((e.format ?? this.format) == null)
      throw Error("Cannot get allocation size when format is null.");
    if (w3(this._data)) return this._data.allocationSize(e);
    return MP(this, e).allocationSize;
  }
  async copyTo(e, t = {}) {
    if (!p3(e)) throw TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");
    if ((SP(t), this._closed)) throw Error("VideoSample is closed.");
    if ((t.format ?? this.format) == null)
      throw Error("Cannot copy video sample data when format is null.");
    if ((Fe(this._data !== null), w3(this._data))) return this._data.copyTo(e, t);
    if (
      t.format &&
      !["RGBA", "RGBX", "BGRA", "BGRX"].includes(this.format) &&
      ["RGBA", "RGBX", "BGRA", "BGRX"].includes(t.format)
    )
      if (this._data instanceof ih) {
        let l = { stack: [], error: void 0, hasError: !1 };
        try {
          let c = Hee(
            l,
            await this._data.toRgbSample(
              { timestamp: this.timestamp, duration: this.duration, rotation: this.rotation },
              t.colorSpace ?? "srgb",
            ),
            !1,
          );
          if (!(c instanceof na)) throw TypeError("toRgbSample() must return a VideoSample.");
          if (!["RGBA", "RGBX", "BGRA", "BGRX"].includes(c.format))
            throw Error(
              `Sample returned by toRgbSample was expected to have an RGB format, got '${c.format}' instead.`,
            );
          return await c.copyTo(e, t);
        } catch (c) {
          ((l.error = c), (l.hasError = !0));
        } finally {
          Gee(l);
        }
      } else {
        if (typeof VideoFrame > "u")
          throw Error(
            "For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.",
          );
        let l = this.toVideoFrame(),
          c = await l.copyTo(e, t);
        return (l.close(), c);
      }
    let r = MP(this, t);
    Fe(this.format);
    let n = Fo(e);
    if (n.byteLength < r.allocationSize)
      throw TypeError(
        `Destination buffer too small. Required: ${r.allocationSize}, Available: ${n.byteLength}`,
      );
    let i = g_(this.format),
      o;
    if (this._data instanceof ih) {
      let l = this._data.getDataPlanes();
      if (l instanceof Promise) l = await l;
      if (
        !Array.isArray(l) ||
        l.some(
          (c) => !(c.data instanceof Uint8Array) || !Number.isInteger(c.stride) || c.stride < 0,
        )
      )
        throw TypeError(
          'getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.',
        );
      o = l;
    } else if (this._data instanceof Uint8Array)
      (Fe(this._layout),
        Fe(this._layout.length === i.length),
        (o = this._layout.map((l, c) => {
          let u = Math.ceil(this.codedHeight / i[c].heightDivisor);
          return { data: this._data.subarray(l.offset, l.offset + l.stride * u), stride: l.stride };
        })));
    else {
      let c = this._data.getContext("2d");
      Fe(c);
      let u = c.getImageData(0, 0, this.codedWidth, this.codedHeight);
      o = [{ data: Fo(u.data), stride: 4 * this.codedWidth }];
    }
    let s = [],
      a = i.length;
    for (let l = 0; l < a; l++) {
      let c = r.computedLayouts[l],
        u = o[l].stride,
        d = o[l].data,
        h = c.sourceTop * u;
      h += c.sourceLeftBytes;
      let { destinationOffset: f, sourceWidthBytes: p } = c,
        g = { offset: f, stride: c.destinationStride };
      for (let m = 0; m < c.sourceHeight; m++) {
        if (h + p > d.byteLength) throw Error("Source buffer OOB read.");
        if (f + p > n.byteLength) throw Error("Destination buffer OOB write.");
        let A = d.subarray(h, h + p);
        (n.set(A, f), (h += u), (f += c.destinationStride));
      }
      s.push(g);
    }
    if (t.format !== void 0) {
      let l = this.format.startsWith("RGB") !== t.format.startsWith("RGB"),
        c = this.format.includes("X") && t.format.includes("A");
      if (l || c)
        for (let u = 0; u < r.allocationSize; u += 4) {
          if (l) {
            let d = n[u],
              h = n[u + 2];
            ((n[u] = h), (n[u + 2] = d));
          }
          if (c) n[u + 3] = 255;
        }
    }
    return s;
  }
  toVideoFrame() {
    if (this._closed) throw Error("VideoSample is closed.");
    if ((Fe(this._data !== null), this._data instanceof ih)) {
      if (this.format === null)
        throw Error(
          "Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.",
        );
      let e = this._data.getDataPlanes();
      if (e instanceof Promise)
        throw Error(
          "Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.",
        );
      let t = e.reduce((o, s) => o + s.data.byteLength, 0),
        r = new Uint8Array(t),
        n = 0,
        i = [];
      for (let o of e) (r.set(o.data, n), i.push(n), (n += o.data.byteLength));
      return new VideoFrame(r, {
        format: this.format,
        layout: e.map((o, s) => ({ offset: i[s], stride: o.stride })),
        codedWidth: this.codedWidth,
        codedHeight: this.codedHeight,
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration,
        colorSpace: this.colorSpace,
        visibleRect: this.visibleRect,
        displayWidth: this.squarePixelWidth,
        displayHeight: this.squarePixelHeight,
      });
    } else if (w3(this._data))
      return new VideoFrame(this._data, {
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration || void 0,
      });
    else if (this._data instanceof Uint8Array)
      return (
        Fe(this._layout),
        new VideoFrame(this._data, {
          format: this.format,
          codedWidth: this.codedWidth,
          codedHeight: this.codedHeight,
          layout: this._layout,
          timestamp: this.microsecondTimestamp,
          duration: this.microsecondDuration || void 0,
          colorSpace: this.colorSpace,
          visibleRect: this.visibleRect,
          displayWidth: this.squarePixelWidth,
          displayHeight: this.squarePixelHeight,
        })
      );
    else
      return new VideoFrame(this._data, {
        timestamp: this.microsecondTimestamp,
        duration: this.microsecondDuration || void 0,
      });
  }
  draw(e, t, r, n, i, o, s, a, l) {
    let c = 0,
      u = 0,
      d = this.displayWidth,
      h = this.displayHeight,
      f = 0,
      p = 0,
      g = this.displayWidth,
      m = this.displayHeight;
    if (o !== void 0)
      if (((c = t), (u = r), (d = n), (h = i), (f = o), (p = s), a !== void 0)) ((g = a), (m = l));
      else ((g = d), (m = h));
    else if (((f = t), (p = r), n !== void 0)) ((g = n), (m = i));
    if (
      !(
        (typeof CanvasRenderingContext2D < "u" && e instanceof CanvasRenderingContext2D) ||
        (typeof OffscreenCanvasRenderingContext2D < "u" &&
          e instanceof OffscreenCanvasRenderingContext2D)
      )
    )
      throw TypeError(
        "context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.",
      );
    if (!Number.isFinite(c)) throw TypeError("sx must be a number.");
    if (!Number.isFinite(u)) throw TypeError("sy must be a number.");
    if (!Number.isFinite(d) || d < 0) throw TypeError("sWidth must be a non-negative number.");
    if (!Number.isFinite(h) || h < 0) throw TypeError("sHeight must be a non-negative number.");
    if (!Number.isFinite(f)) throw TypeError("dx must be a number.");
    if (!Number.isFinite(p)) throw TypeError("dy must be a number.");
    if (!Number.isFinite(g) || g < 0) throw TypeError("dWidth must be a non-negative number.");
    if (!Number.isFinite(m) || m < 0) throw TypeError("dHeight must be a non-negative number.");
    if (this._closed) throw Error("VideoSample is closed.");
    ({ sx: c, sy: u, sWidth: d, sHeight: h } = this._rotateSourceRegion(c, u, d, h, this.rotation));
    let A = this.toCanvasImageSource();
    e.save();
    let y = f + g / 2,
      x = p + m / 2;
    (e.translate(y, x), e.rotate((this.rotation * Math.PI) / 180));
    let b = this.rotation % 180 === 0 ? 1 : g / m;
    (e.scale(1 / b, b), e.drawImage(A, c, u, d, h, -g / 2, -m / 2, g, m), e.restore());
  }
  drawWithFit(e, t) {
    if (
      !(
        (typeof CanvasRenderingContext2D < "u" && e instanceof CanvasRenderingContext2D) ||
        (typeof OffscreenCanvasRenderingContext2D < "u" &&
          e instanceof OffscreenCanvasRenderingContext2D)
      )
    )
      throw TypeError(
        "context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.",
      );
    if (!t || typeof t !== "object") throw TypeError("options must be an object.");
    if (!["fill", "contain", "cover"].includes(t.fit))
      throw TypeError("options.fit must be 'fill', 'contain', or 'cover'.");
    if (t.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation))
      throw TypeError("options.rotation, when provided, must be 0, 90, 180, or 270.");
    if (t.crop !== void 0) m_(t.crop, "options.");
    let r = e.canvas.width,
      n = e.canvas.height,
      i = t.rotation ?? this.rotation,
      [o, s] =
        i % 180 === 0
          ? [this.squarePixelWidth, this.squarePixelHeight]
          : [this.squarePixelHeight, this.squarePixelWidth],
      a = t.crop;
    if (a) a = EP(a, o, s);
    let l,
      c,
      u,
      d,
      {
        sx: h,
        sy: f,
        sWidth: p,
        sHeight: g,
      } = this._rotateSourceRegion(
        t.crop?.left ?? 0,
        t.crop?.top ?? 0,
        t.crop?.width ?? o,
        t.crop?.height ?? s,
        i,
      );
    if (t.fit === "fill") ((l = 0), (c = 0), (u = r), (d = n));
    else {
      let [A, y] = t.crop ? [t.crop.width, t.crop.height] : [o, s],
        x = t.fit === "contain" ? Math.min(r / A, n / y) : Math.max(r / A, n / y);
      ((u = A * x), (d = y * x), (l = (r - u) / 2), (c = (n - d) / 2));
    }
    e.save();
    let m = i % 180 === 0 ? 1 : u / d;
    (e.translate(r / 2, n / 2),
      e.rotate((i * Math.PI) / 180),
      e.scale(1 / m, m),
      e.translate(-r / 2, -n / 2),
      e.drawImage(this.toCanvasImageSource(), h, f, p, g, l, c, u, d),
      e.restore());
  }
  _rotateSourceRegion(e, t, r, n, i) {
    if (i === 90) [e, t, r, n] = [t, this.squarePixelHeight - e - r, n, r];
    else if (i === 180) [e, t] = [this.squarePixelWidth - e - r, this.squarePixelHeight - t - n];
    else if (i === 270) [e, t, r, n] = [this.squarePixelWidth - t - n, e, n, r];
    return { sx: e, sy: t, sWidth: r, sHeight: n };
  }
  toCanvasImageSource() {
    if (this._closed) throw Error("VideoSample is closed.");
    if ((Fe(this._data !== null), this._data instanceof ih || this._data instanceof Uint8Array)) {
      let e = this.toVideoFrame();
      return (queueMicrotask(() => e.close()), e);
    } else return this._data;
  }
  async transform(e) {
    if (!e || typeof e !== "object") throw TypeError("options must be an object.");
    if (e.width !== void 0 && (!Number.isInteger(e.width) || e.width <= 0))
      throw TypeError("options.width, when provided, must be a positive integer.");
    if (e.height !== void 0 && (!Number.isInteger(e.height) || e.height <= 0))
      throw TypeError("options.height, when provided, must be a positive integer.");
    if (
      e.roundDimensionsTo !== void 0 &&
      (!Number.isInteger(e.roundDimensionsTo) || e.roundDimensionsTo <= 0)
    )
      throw TypeError("options.roundDimensionsTo, when provided, must be a positive integer.");
    if (e.fit !== void 0 && !["fill", "contain", "cover"].includes(e.fit))
      throw TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');
    if (e.width !== void 0 && e.height !== void 0 && e.fit === void 0)
      throw TypeError(
        "When both options.width and options.height are provided, options.fit must also be provided.",
      );
    if (e.rotate !== void 0 && ![0, 90, 180, 270].includes(e.rotate))
      throw TypeError("options.rotate, when provided, must be 0, 90, 180 or 270.");
    if (e.crop !== void 0) m_(e.crop, "options.");
    if (e.alpha !== void 0 && !["keep", "discard"].includes(e.alpha))
      throw TypeError("options.alpha, when provided, must be 'keep' or 'discard'.");
    let t = Zb(this.rotation + (e.rotate ?? 0)),
      [r, n] =
        t % 180 === 0
          ? [this.squarePixelWidth, this.squarePixelHeight]
          : [this.squarePixelHeight, this.squarePixelWidth],
      i = e.crop;
    if (i) i = EP(i, r, n);
    let o = i ? i.width : r,
      s = i ? i.height : n,
      a = o / s,
      l,
      c;
    if (e.width !== void 0 && e.height === void 0) ((l = e.width), (c = l / a));
    else if (e.width === void 0 && e.height !== void 0) ((c = e.height), (l = c * a));
    else if (e.width !== void 0 && e.height !== void 0) ((l = e.width), (c = e.height));
    else ((l = o), (c = s));
    ((l = u6(l, e.roundDimensionsTo ?? 1)), (c = u6(c, e.roundDimensionsTo ?? 1)));
    let u = {
      width: l,
      height: c,
      fit: e.fit ?? "fill",
      rotation: t,
      crop: i ?? { left: 0, top: 0, width: r, height: n },
      alpha: e.alpha ?? "keep",
    };
    for (let p of Vee) {
      let g = p(this, u);
      if (g instanceof Promise) g = await g;
      if (g !== null) return g;
    }
    let d = null,
      h = !1;
    for (let p of C3)
      if (p.canvas.width === u.width && p.canvas.height === u.height) {
        ((d = p.canvas), (p.age = TP++));
        break;
      }
    if (d === null) {
      if (typeof OffscreenCanvas < "u") d = new OffscreenCanvas(u.width, u.height);
      else {
        if (typeof window > "u" || typeof document > "u")
          throw Error(
            "Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().",
          );
        ((d = document.createElement("canvas")), (d.width = u.width), (d.height = u.height));
      }
      if (((h = !0), C3.length >= Wee))
        C3.splice(
          kN(C3, (p) => p.age),
          1,
        );
      C3.push({ canvas: d, age: TP++ });
    }
    let f = d.getContext("2d", { alpha: !0 });
    if (!f)
      throw Error(
        "The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.",
      );
    if (((f.imageSmoothingQuality = "high"), u.alpha === "discard"))
      ((f.fillStyle = "black"), f.fillRect(0, 0, u.width, u.height));
    else if (!h) f.clearRect(0, 0, u.width, u.height);
    return (
      this.drawWithFit(f, { fit: u.fit, rotation: u.rotation, crop: u.crop }),
      new na(d, { timestamp: this.timestamp, duration: this.duration, rotation: 0 })
    );
  }
  setRotation(e) {
    if (![0, 90, 180, 270].includes(e)) throw TypeError("newRotation must be 0, 90, 180, or 270.");
    this.rotation = e;
  }
  setTimestamp(e) {
    if (!Number.isFinite(e)) throw TypeError("newTimestamp must be a number.");
    this.timestamp = e;
  }
  setDuration(e) {
    if (!Number.isFinite(e) || e < 0) throw TypeError("newDuration must be a non-negative number.");
    this.duration = e;
  }
  setEncodeOptions(e) {
    if (!e || typeof e !== "object") throw TypeError("newEncodeOptions must be an object.");
    this.encodeOptions = e;
  }
  [Symbol.dispose]() {
    this.close();
  }
}
var Vee = [];
var Wee = 3,
  C3 = [],
  TP = 0;
class p_ {
  constructor(e) {
    if (e !== void 0) {
      if (!e || typeof e !== "object")
        throw TypeError("init.colorSpace, when provided, must be an object.");
      let t = Object.keys(ku);
      if (e.primaries != null && !t.includes(e.primaries))
        throw TypeError(
          `init.colorSpace.primaries, when provided, must be one of ${t.join(", ")}.`,
        );
      let r = Object.keys(Uu);
      if (e.transfer != null && !r.includes(e.transfer))
        throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${r.join(", ")}.`);
      let n = Object.keys(Hu);
      if (e.matrix != null && !n.includes(e.matrix))
        throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${n.join(", ")}.`);
      if (e.fullRange != null && typeof e.fullRange !== "boolean")
        throw TypeError("init.colorSpace.fullRange, when provided, must be a boolean.");
    }
    ((this.primaries = e?.primaries ?? null),
      (this.transfer = e?.transfer ?? null),
      (this.matrix = e?.matrix ?? null),
      (this.fullRange = e?.fullRange ?? null));
  }
  toJSON() {
    return {
      primaries: this.primaries,
      transfer: this.transfer,
      matrix: this.matrix,
      fullRange: this.fullRange,
    };
  }
}
var w3 = (e) => typeof VideoFrame < "u" && e instanceof VideoFrame,
  EP = (e, t, r) => {
    let n = Math.min(e.left, t),
      i = Math.min(e.top, r),
      o = Math.min(e.width, t - n),
      s = Math.min(e.height, r - i);
    return (Fe(o >= 0), Fe(s >= 0), { left: n, top: i, width: o, height: s });
  },
  m_ = (e, t) => {
    if (!e || typeof e !== "object") throw TypeError(t + "crop, when provided, must be an object.");
    if (!Number.isInteger(e.left) || e.left < 0)
      throw TypeError(t + "crop.left must be a non-negative integer.");
    if (!Number.isInteger(e.top) || e.top < 0)
      throw TypeError(t + "crop.top must be a non-negative integer.");
    if (!Number.isInteger(e.width) || e.width < 0)
      throw TypeError(t + "crop.width must be a non-negative integer.");
    if (!Number.isInteger(e.height) || e.height < 0)
      throw TypeError(t + "crop.height must be a non-negative integer.");
  },
  SP = (e) => {
    if (!e || typeof e !== "object") throw TypeError("options must be an object.");
    if (e.colorSpace !== void 0 && !["display-p3", "srgb"].includes(e.colorSpace))
      throw TypeError("options.colorSpace, when provided, must be 'display-p3' or 'srgb'.");
    if (e.format !== void 0 && typeof e.format !== "string")
      throw TypeError("options.format, when provided, must be a string.");
    if (e.layout !== void 0) {
      if (!Array.isArray(e.layout))
        throw TypeError("options.layout, when provided, must be an array.");
      for (let t of e.layout) {
        if (!t || typeof t !== "object")
          throw TypeError("Each entry in options.layout must be an object.");
        if (!Number.isInteger(t.offset) || t.offset < 0)
          throw TypeError("plane.offset must be a non-negative integer.");
        if (!Number.isInteger(t.stride) || t.stride < 0)
          throw TypeError("plane.stride must be a non-negative integer.");
      }
    }
    if (e.rect !== void 0) {
      if (!e.rect || typeof e.rect !== "object")
        throw TypeError("options.rect, when provided, must be an object.");
      if (e.rect.x !== void 0 && (!Number.isInteger(e.rect.x) || e.rect.x < 0))
        throw TypeError("options.rect.x, when provided, must be a non-negative integer.");
      if (e.rect.y !== void 0 && (!Number.isInteger(e.rect.y) || e.rect.y < 0))
        throw TypeError("options.rect.y, when provided, must be a non-negative integer.");
      if (e.rect.width !== void 0 && (!Number.isInteger(e.rect.width) || e.rect.width < 0))
        throw TypeError("options.rect.width, when provided, must be a non-negative integer.");
      if (e.rect.height !== void 0 && (!Number.isInteger(e.rect.height) || e.rect.height < 0))
        throw TypeError("options.rect.height, when provided, must be a non-negative integer.");
    }
  },
  Qee = (e, t, r) => {
    let n = g_(e),
      i = [],
      o = 0;
    for (let s of n) {
      let a = Math.ceil(t / s.widthDivisor),
        l = Math.ceil(r / s.heightDivisor),
        c = a * s.sampleBytes,
        u = c * l;
      (i.push({ offset: o, stride: c }), (o += u));
    }
    return i;
  },
  g_ = (e) => {
    let t = (r, n, i, o, s) => {
      let a = [
        { sampleBytes: r, widthDivisor: 1, heightDivisor: 1 },
        { sampleBytes: n, widthDivisor: i, heightDivisor: o },
        { sampleBytes: n, widthDivisor: i, heightDivisor: o },
      ];
      if (s) a.push({ sampleBytes: r, widthDivisor: 1, heightDivisor: 1 });
      return a;
    };
    switch (e) {
      case "I420":
        return t(1, 1, 2, 2, !1);
      case "I420P10":
      case "I420P12":
        return t(2, 2, 2, 2, !1);
      case "I420A":
        return t(1, 1, 2, 2, !0);
      case "I420AP10":
      case "I420AP12":
        return t(2, 2, 2, 2, !0);
      case "I422":
        return t(1, 1, 2, 1, !1);
      case "I422P10":
      case "I422P12":
        return t(2, 2, 2, 1, !1);
      case "I422A":
        return t(1, 1, 2, 1, !0);
      case "I422AP10":
      case "I422AP12":
        return t(2, 2, 2, 1, !0);
      case "I444":
        return t(1, 1, 1, 1, !1);
      case "I444P10":
      case "I444P12":
        return t(2, 2, 1, 1, !1);
      case "I444A":
        return t(1, 1, 1, 1, !0);
      case "I444AP10":
      case "I444AP12":
        return t(2, 2, 1, 1, !0);
      case "NV12":
        return [
          { sampleBytes: 1, widthDivisor: 1, heightDivisor: 1 },
          { sampleBytes: 2, widthDivisor: 2, heightDivisor: 2 },
        ];
      case "RGBA":
      case "RGBX":
      case "BGRA":
      case "BGRX":
        return [{ sampleBytes: 4, widthDivisor: 1, heightDivisor: 1 }];
      default:
        (Rs(e), Fe(!1));
    }
  },
  MP = (e, t) => {
    let r = { left: 0, top: 0, width: e.codedWidth, height: e.codedHeight },
      n = t.rect,
      i = Yee(r, n, e.codedWidth, e.codedHeight, e.format),
      o = t.layout,
      s;
    if (!t.format || t.format === e.format) s = e.format;
    else if (["RGBA", "RGBX", "BGRA", "BGRX"].includes(t.format)) s = t.format;
    else throw Error("NotSupportedError: Invalid destination format.");
    return jee(i, s, o);
  },
  Yee = (e, t, r, n, i) => {
    let o = { ...e };
    if (t !== void 0) {
      if (t.width === 0 || t.height === 0)
        throw TypeError("visibleRect dimensions cannot be zero.");
      if ((t.x || 0) + (t.width || 0) > r) throw TypeError("visibleRect exceeds codedWidth.");
      if ((t.y || 0) + (t.height || 0) > n) throw TypeError("visibleRect exceeds codedHeight.");
      ((o.x = t.x || 0), (o.y = t.y || 0), (o.width = t.width || 0), (o.height = t.height || 0));
    }
    if (!Xee(i, o)) throw TypeError("visibleRect alignment is invalid for the format.");
    return o;
  },
  Xee = (e, t) => {
    if (e === null) return !0;
    let r = g_(e);
    for (let n = 0; n < r.length; n++) {
      let i = r[n],
        { widthDivisor: o, heightDivisor: s } = i;
      if ((t.x || 0) % o !== 0) return !1;
      if ((t.y || 0) % s !== 0) return !1;
    }
    return !0;
  },
  jee = (e, t, r) => {
    let n = g_(t),
      i = n.length;
    if (r !== void 0 && r.length !== i) throw TypeError(`Layout must have ${i} planes.`);
    let o = 0,
      s = [],
      a = [];
    for (let l = 0; l < i; l++) {
      let c = n[l],
        { sampleBytes: u, widthDivisor: d, heightDivisor: h } = c,
        f = {
          destinationOffset: 0,
          destinationStride: 0,
          sourceTop: 0,
          sourceHeight: 0,
          sourceLeftBytes: 0,
          sourceWidthBytes: 0,
        };
      if (
        ((f.sourceTop = Math.ceil(Math.trunc(e.y || 0) / h)),
        (f.sourceHeight = Math.ceil(Math.trunc(e.height || 0) / h)),
        (f.sourceLeftBytes = Math.floor(Math.trunc(e.x || 0) / d) * u),
        (f.sourceWidthBytes = Math.floor(Math.trunc(e.width || 0) / d) * u),
        r !== void 0)
      ) {
        let m = r[l];
        if (m.stride < f.sourceWidthBytes) throw TypeError(`Stride for plane ${l} is too small.`);
        ((f.destinationOffset = m.offset), (f.destinationStride = m.stride));
      } else ((f.destinationOffset = o), (f.destinationStride = f.sourceWidthBytes));
      let g = f.destinationStride * f.sourceHeight + f.destinationOffset;
      if (g > 4294967295) throw TypeError("Allocation size exceeds limit.");
      (a.push(g), (o = Math.max(o, g)));
      for (let m = 0; m < l; m++) {
        let A = s[m];
        if (a[l] <= A.destinationOffset || a[m] <= f.destinationOffset) continue;
        throw TypeError("Planes overlap.");
      }
      s.push(f);
    }
    return { allocationSize: o, computedLayouts: s };
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var OP = (e) => {
    if (!e || typeof e !== "object") throw TypeError("Encoding config must be an object.");
    if (!Oa.includes(e.codec))
      throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${Oa.join(", ")}.`);
    let t = e.bitrate;
    if (e.quality === void 0 && t === void 0) throw TypeError("config.quality must be provided.");
    if (e.quality !== void 0 && t !== void 0)
      throw TypeError("config.quality and config.bitrate cannot both be provided.");
    if (e.quality !== void 0 && !(e.quality instanceof oh))
      throw TypeError("config.quality, when provided, must be a Quality.");
    if (t !== void 0 && !(t instanceof oh) && (!Number.isInteger(t) || t <= 0))
      throw TypeError("config.bitrate, when provided, must be a positive integer or a quality.");
    if (
      e.keyFrameInterval !== void 0 &&
      (!Number.isFinite(e.keyFrameInterval) || e.keyFrameInterval < 0)
    )
      throw TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");
    if (
      e.sizeChangeBehavior !== void 0 &&
      !["deny", "passThrough", "fill", "contain", "cover"].includes(e.sizeChangeBehavior)
    )
      throw TypeError(
        "config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.",
      );
    if (e.transform !== void 0) {
      if (typeof e.transform !== "object" || !e.transform)
        throw TypeError("config.transform, when provided, must be an object.");
      if (
        e.transform.width !== void 0 &&
        (!Number.isInteger(e.transform.width) || e.transform.width <= 0)
      )
        throw TypeError("config.transform.width, when provided, must be a positive integer.");
      if (
        e.transform.height !== void 0 &&
        (!Number.isInteger(e.transform.height) || e.transform.height <= 0)
      )
        throw TypeError("config.transform.height, when provided, must be a positive integer.");
      if (e.transform.fit !== void 0 && !["fill", "contain", "cover"].includes(e.transform.fit))
        throw TypeError(
          'config.transform.fit, when provided, must be one of "fill", "contain", or "cover".',
        );
      if (
        e.transform.width !== void 0 &&
        e.transform.height !== void 0 &&
        e.transform.fit === void 0 &&
        !["fill", "contain", "cover"].includes(e.sizeChangeBehavior)
      )
        throw TypeError(
          "When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.",
        );
      if (
        e.transform.fit !== void 0 &&
        ["fill", "contain", "cover"].includes(e.sizeChangeBehavior) &&
        e.transform.fit !== e.sizeChangeBehavior
      )
        throw TypeError(
          "config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.",
        );
      if (e.transform.rotate !== void 0 && ![0, 90, 180, 270].includes(e.transform.rotate))
        throw TypeError("config.transform.rotate, when provided, must be 0, 90, 180 or 270.");
      if (e.transform.crop !== void 0) m_(e.transform.crop, "config.transform.");
      if (e.transform.process !== void 0 && typeof e.transform.process !== "function")
        throw TypeError("config.transform.process, when provided, must be a function.");
      if (
        e.transform.frameRate !== void 0 &&
        (!Number.isFinite(e.transform.frameRate) || e.transform.frameRate <= 0)
      )
        throw TypeError(
          "config.transform.frameRate, when provided, must be a finite positive number.",
        );
      if (e.transform.force !== void 0 && typeof e.transform.force !== "boolean")
        throw TypeError("config.transform.force, when provided, must be a boolean.");
    }
    if (e.onEncodedPacket !== void 0 && typeof e.onEncodedPacket !== "function")
      throw TypeError("config.onEncodedPacket, when provided, must be a function.");
    if (e.onEncoderConfig !== void 0 && typeof e.onEncoderConfig !== "function")
      throw TypeError("config.onEncoderConfig, when provided, must be a function.");
    if (e.onEncodedSample !== void 0 && typeof e.onEncodedSample !== "function")
      throw TypeError("config.onEncodedSample, when provided, must be a function.");
    Kee(e.codec, e);
  },
  Kee = (e, t) => {
    if (!t || typeof t !== "object") throw TypeError("Encoding options must be an object.");
    if (t.alpha !== void 0 && !["discard", "keep"].includes(t.alpha))
      throw TypeError("options.alpha, when provided, must be 'discard' or 'keep'.");
    let r = t.bitrateMode;
    if (r !== void 0 && !["constant", "variable"].includes(r))
      throw TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");
    if (t.latencyMode !== void 0 && !["quality", "realtime"].includes(t.latencyMode))
      throw TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");
    if (t.fullCodecString !== void 0 && typeof t.fullCodecString !== "string")
      throw TypeError("fullCodecString, when provided, must be a string.");
    if (t.fullCodecString !== void 0 && KN(t.fullCodecString) !== e)
      throw TypeError(
        `fullCodecString, when provided, must be a string that matches the specified codec (${e}).`,
      );
    if (
      t.hardwareAcceleration !== void 0 &&
      !["no-preference", "prefer-hardware", "prefer-software"].includes(t.hardwareAcceleration)
    )
      throw TypeError(
        "hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.",
      );
    if (t.scalabilityMode !== void 0 && typeof t.scalabilityMode !== "string")
      throw TypeError("scalabilityMode, when provided, must be a string.");
    if (t.contentHint !== void 0 && typeof t.contentHint !== "string")
      throw TypeError("contentHint, when provided, must be a string.");
  },
  LP = (e) => {
    let t = e.bitrateMode,
      r = e.quality._toVideoRateControl(e.codec, e.width, e.height, t),
      n = (o, s, a) => ({
        codec: e.fullCodecString ?? QN(e.codec, e.width, e.height, a, e.alpha === "keep"),
        width: e.width,
        height: e.height,
        displayWidth: e.squarePixelWidth,
        displayHeight: e.squarePixelHeight,
        bitrate: o,
        bitrateMode: s,
        alpha: e.alpha ?? "discard",
        framerate: e.framerate,
        latencyMode: e.latencyMode,
        hardwareAcceleration: e.hardwareAcceleration,
        scalabilityMode: e.scalabilityMode,
        contentHint: e.contentHint,
        ...qN(e.codec),
      }),
      i = [];
    if (r.quantizer !== null)
      i.push({ config: n(void 0, "quantizer", r.bitrate), quantizer: r.quantizer });
    if (r.bitrateMode !== "quantizer")
      i.push({ config: n(r.bitrate, r.bitrateMode, r.bitrate), quantizer: null });
    return (Fe(i.length > 0), i);
  };
class oh {
  constructor(e) {
    if (typeof e === "number" || typeof e === "string") e = { quality: e };
    if (!e || typeof e !== "object") throw TypeError("options must be an object.");
    if (e.bitrateMode !== void 0 && !["constant", "variable"].includes(e.bitrateMode))
      throw TypeError("options.bitrateMode, when provided, must be 'constant' or 'variable'.");
    if ("quality" in e) {
      if (
        typeof e.quality === "string"
          ? !(e.quality in IP)
          : typeof e.quality !== "number" || Number.isNaN(e.quality)
      )
        throw TypeError(
          "options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.",
        );
      if (e.preferBitrate !== void 0 && typeof e.preferBitrate !== "boolean")
        throw TypeError("options.preferBitrate, when provided, must be a boolean.");
      if ("bitrate" in e || "quantizer" in e)
        throw TypeError(
          "options.quality cannot be combined with options.bitrate or options.quantizer.",
        );
      ((this._quality = typeof e.quality === "string" ? IP[e.quality] : e.quality),
        (this._preferBitrate = e.preferBitrate ?? !1),
        (this._bitrate = void 0),
        (this._quantizer = void 0));
    } else {
      if (e.bitrate !== void 0 && (!Number.isInteger(e.bitrate) || e.bitrate <= 0))
        throw TypeError("options.bitrate, when provided, must be a positive integer.");
      if (e.quantizer !== void 0 && (!Number.isInteger(e.quantizer) || e.quantizer < 0))
        throw TypeError("options.quantizer, when provided, must be a non-negative integer.");
      if (e.bitrate === void 0 && e.quantizer === void 0)
        throw TypeError("At least one of options.bitrate or options.quantizer must be set.");
      if ("preferBitrate" in e)
        throw TypeError("options.preferBitrate can only be combined with options.quality.");
      ((this._quality = void 0),
        (this._preferBitrate = !1),
        (this._bitrate = e.bitrate),
        (this._quantizer = e.quantizer));
    }
    this._bitrateMode = e.bitrateMode;
  }
  _toVideoRateControl(e, t, r, n) {
    let i = qee[e],
      o = null,
      s = this._bitrateMode ?? n ?? "variable";
    if (this._quantizer !== void 0) {
      if (!i) {
        if (this._bitrate === void 0)
          throw Error(
            `Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`,
          );
      } else if (this._quantizer < i.min || this._quantizer > i.max) {
        if (this._bitrate === void 0)
          throw Error(
            `Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`,
          );
      } else if (((o = this._quantizer), this._bitrate === void 0)) s = "quantizer";
    } else if (this._bitrate === void 0 && i && !this._preferBitrate)
      (Fe(this._quality !== void 0),
        (o = S1(Math.round(RN(i.worst, i.best, this._quality)), i.min, i.max)));
    let a;
    if (this._bitrate !== void 0) a = this._bitrate;
    else {
      let l = this._quality;
      if (l === void 0) (Fe(o !== null && i), (l = S1((o - i.worst) / (i.best - i.worst), 0, 1)));
      a = RP(e, t, r, v6(l));
    }
    return { quantizer: o, bitrate: a, bitrateMode: s };
  }
  _toVideoBitrate(e, t, r) {
    if (this._bitrate !== void 0) return this._bitrate;
    return (Fe(this._quality !== void 0), RP(e, t, r, v6(this._quality)));
  }
  _toAudioBitrate(e) {
    if (Os.includes(e) || e === "flac") return;
    if (this._bitrate !== void 0) return this._bitrate;
    if (this._quality === void 0)
      throw Error(
        "This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.",
      );
    let t = v6(this._quality),
      n = { aac: 128000, opus: 64000, mp3: 160000, vorbis: 64000, ac3: 384000, eac3: 192000 }[e];
    if (!n) throw Error(`Unhandled codec: ${e}`);
    let i = n * t;
    if (e === "aac")
      i = [96000, 128000, 160000, 192000].reduce((s, a) =>
        Math.abs(a - i) < Math.abs(s - i) ? a : s,
      );
    else if (e === "opus" || e === "vorbis") i = Math.max(6000, i);
    else if (e === "mp3")
      i = [
        8000, 16000, 24000, 32000, 40000, 48000, 64000, 80000, 96000, 112000, 128000, 160000,
        192000, 224000, 256000, 320000,
      ].reduce((s, a) => (Math.abs(a - i) < Math.abs(s - i) ? a : s));
    return Math.round(i / 1000) * 1000;
  }
}
var IP = { "very-low": 0, low: 0.25, medium: 0.5, high: 0.75, "very-high": 1 },
  qee = {
    avc: { min: 0, max: 51, worst: 41, best: 16 },
    hevc: { min: 0, max: 51, worst: 41, best: 16 },
    vp9: { min: 0, max: 63, worst: 52, best: 20 },
    av1: { min: 0, max: 255, worst: 208, best: 80 },
  },
  v6 = (e) => 0.3 * Math.exp(2.5538 * e),
  RP = (e, t, r, n) => {
    let i = t * r,
      o = 2073600,
      s = 3000000,
      d =
        3000000 *
        Math.pow(i / 2073600, 0.95) *
        { avc: 1, hevc: 0.6, vp9: 0.6, av1: 0.4, vp8: 1.2, prores: 73.33333333333333 }[e] *
        n;
    return Math.ceil(d / 1000) * 1000;
  },
  BP = (e, t) => {
    if (e === "avc") return { avc: { quantizer: t } };
    else if (e === "hevc") return { hevc: { quantizer: t } };
    else if (e === "vp9") return { vp9: { quantizer: t } };
    else if (e === "av1") return { av1: { quantizer: t } };
    Fe(!1);
  };
var FP = (e, t) => {
  if (e !== void 0) return e;
  if (t === void 0) return;
  return t instanceof oh ? t : new oh({ bitrate: t });
};
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var DP = [];
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class zu {
  constructor(e, t, r, n, i) {
    ((this.bytes = e),
      (this.view = t),
      (this.offset = r),
      (this.start = n),
      (this.end = i),
      (this.bufferPos = n - r));
  }
  static tempFromBytes(e) {
    return new zu(e, T1(e), 0, 0, e.length);
  }
  get length() {
    return this.end - this.start;
  }
  get filePos() {
    return this.offset + this.bufferPos;
  }
  set filePos(e) {
    this.bufferPos = e - this.offset;
  }
  get remainingLength() {
    return Math.max(this.end - this.filePos, 0);
  }
  skip(e) {
    this.bufferPos += e;
  }
  slice(e, t = this.end - e) {
    if (e < this.start || e + t > this.end) throw RangeError("Slicing outside of original slice.");
    return new zu(this.bytes, this.view, this.offset, e, e + t);
  }
}
var Zee = (e, t) => {
    if (e.filePos < e.start || e.filePos + t > e.end)
      throw RangeError(
        `Tried reading [${e.filePos}, ${e.filePos + t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`,
      );
  },
  vP = (e, t) => {
    Zee(e, t);
    let r = e.bytes.subarray(e.bufferPos, e.bufferPos + t);
    return ((e.bufferPos += t), r);
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class T3 {
  constructor(e) {
    ((this.mutex = new m3()),
      (this.trackTimestampInfo = /*@__PURE__*/ new WeakMap()),
      (this.output = e));
  }
  onTrackClose(e) {}
  validateTimestamp(e, t, r) {
    if (t < 0) throw Error(`Timestamps must be non-negative (got ${t}s).`);
    let n = this.trackTimestampInfo.get(e);
    if (!n) {
      if (!r) throw Error("First packet must be a key packet.");
      ((n = { maxTimestamp: t, maxTimestampBeforeLastKeyPacket: null }),
        this.trackTimestampInfo.set(e, n));
    } else {
      if (r) n.maxTimestampBeforeLastKeyPacket = n.maxTimestamp;
      if (n.maxTimestampBeforeLastKeyPacket !== null && t < n.maxTimestampBeforeLastKeyPacket)
        throw Error(
          `Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${n.maxTimestampBeforeLastKeyPacket}s.`,
        );
      n.maxTimestamp = Math.max(n.maxTimestamp, t);
    }
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var B1 = /<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g;
var $ee = /(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})/,
  NP = (e) => {
    let t = $ee.exec(e);
    if (!t) throw Error("Expected match.");
    return (
      3600000 * Number(t[1] || "0") + 60000 * Number(t[2]) + 1000 * Number(t[3]) + Number(t[4])
    );
  },
  A_ = (e) => {
    let t = Math.floor(e / 3600000),
      r = Math.floor((e % 3600000) / 60000),
      n = Math.floor((e % 60000) / 1000),
      i = e % 1000;
    return (
      t.toString().padStart(2, "0") +
      ":" +
      r.toString().padStart(2, "0") +
      ":" +
      n.toString().padStart(2, "0") +
      "." +
      i.toString().padStart(3, "0")
    );
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class F1 {
  constructor(e) {
    ((this.writer = e),
      (this.helper = new Uint8Array(8)),
      (this.helperView = new DataView(this.helper.buffer)),
      (this.offsets = /*@__PURE__*/ new WeakMap()));
  }
  writeU32(e) {
    (this.helperView.setUint32(0, e, !1), this.writer.write(this.helper.subarray(0, 4)));
  }
  writeU64(e) {
    (this.helperView.setUint32(0, Math.floor(e / 4294967296), !1),
      this.helperView.setUint32(4, e, !1),
      this.writer.write(this.helper.subarray(0, 8)));
  }
  writeAscii(e) {
    for (let t = 0; t < e.length; t++)
      if ((this.helperView.setUint8(t % 8, e.charCodeAt(t)), t % 8 === 7))
        this.writer.write(this.helper);
    if (e.length % 8 !== 0) this.writer.write(this.helper.subarray(0, e.length % 8));
  }
  writeBox(e) {
    if ((this.offsets.set(e, this.writer.getPos()), e.contents && !e.children))
      (this.writeBoxHeader(e, e.size ?? e.contents.byteLength + 8), this.writer.write(e.contents));
    else {
      let t = this.writer.getPos();
      if ((this.writeBoxHeader(e, 0), e.contents)) this.writer.write(e.contents);
      if (e.children) {
        for (let i of e.children) if (i) this.writeBox(i);
      }
      let r = this.writer.getPos(),
        n = e.size ?? r - t;
      (this.writer.seek(t), this.writeBoxHeader(e, n), this.writer.seek(r));
    }
  }
  writeBoxHeader(e, t) {
    if ((this.writeU32(e.largeSize ? 1 : t), this.writeAscii(e.type), e.largeSize))
      this.writeU64(t);
  }
  measureBoxHeader(e) {
    return 8 + (e.largeSize ? 8 : 0);
  }
  patchBox(e) {
    let t = this.offsets.get(e);
    Fe(t !== void 0);
    let r = this.writer.getPos();
    (this.writer.seek(t), this.writeBox(e), this.writer.seek(r));
  }
  measureBox(e) {
    if (e.contents && !e.children) return this.measureBoxHeader(e) + e.contents.byteLength;
    else {
      let t = this.measureBoxHeader(e);
      if (e.contents) t += e.contents.byteLength;
      if (e.children) {
        for (let r of e.children) if (r) t += this.measureBox(r);
      }
      return t;
    }
  }
}
var Rr = /*@__PURE__*/ new Uint8Array(8),
  hl = /*@__PURE__*/ new DataView(Rr.buffer),
  vi = (e) => [((e % 256) + 256) % 256],
  Yt = (e) => (hl.setUint16(0, e, !1), [Rr[0], Rr[1]]),
  E6 = (e) => (hl.setInt16(0, e, !1), [Rr[0], Rr[1]]),
  UP = (e) => (hl.setUint32(0, e, !1), [Rr[1], Rr[2], Rr[3]]),
  rt = (e) => (hl.setUint32(0, e, !1), [Rr[0], Rr[1], Rr[2], Rr[3]]),
  Vu = (e) => (hl.setInt32(0, e, !1), [Rr[0], Rr[1], Rr[2], Rr[3]]),
  Rc = (e) => (
    hl.setUint32(0, Math.floor(e / 4294967296), !1),
    hl.setUint32(4, e, !1),
    [Rr[0], Rr[1], Rr[2], Rr[3], Rr[4], Rr[5], Rr[6], Rr[7]]
  ),
  Jee = (e) => (
    hl.setInt32(0, Math.floor(e / 4294967296), !1),
    hl.setUint32(4, e, !1),
    [Rr[0], Rr[1], Rr[2], Rr[3], Rr[4], Rr[5], Rr[6], Rr[7]]
  ),
  HP = (e) => (hl.setInt16(0, 256 * e, !1), [Rr[0], Rr[1]]),
  Zl = (e) => (hl.setInt32(0, 65536 * e, !1), [Rr[0], Rr[1], Rr[2], Rr[3]]),
  C6 = (e) => (hl.setInt32(0, 1073741824 * e, !1), [Rr[0], Rr[1], Rr[2], Rr[3]]),
  w6 = (e, t) => {
    let r = [],
      n = e;
    do {
      let i = n & 127;
      if (((n >>= 7), r.length > 0)) i |= 128;
      if ((r.push(i), t !== void 0)) t--;
    } while (n > 0 || t);
    return r.reverse();
  },
  Ln = (e, t = !1) => {
    let r = Array(e.length)
      .fill(null)
      .map((n, i) => e.charCodeAt(i));
    if (t) r.push(0);
    return r;
  },
  GP = (e) => {
    let t = e * (Math.PI / 180),
      r = Math.round(Math.cos(t)),
      n = Math.round(Math.sin(t));
    return [r, n, 0, -n, r, 0, 0, 0, 1];
  },
  zP = /*@__PURE__*/ GP(0),
  VP = (e) => [
    Zl(e[0]),
    Zl(e[1]),
    C6(e[2]),
    Zl(e[3]),
    Zl(e[4]),
    C6(e[5]),
    Zl(e[6]),
    Zl(e[7]),
    C6(e[8]),
  ],
  Ht = (e, t, r) => ({ type: e, contents: t && new Uint8Array(t.flat(10)), children: r }),
  dn = (e, t, r, n, i) => Ht(e, [vi(t), UP(r), n ?? []], i),
  WP = (e) => {
    if (e.isQuickTime) return Ht("ftyp", [Ln("qt  "), rt(512), Ln("qt  ")]);
    if (e.fragmented)
      if (e.cmaf)
        return Ht("ftyp", [
          Ln("iso5"),
          rt(512),
          Ln("iso5"),
          Ln("iso6"),
          Ln("mp41"),
          Ln("cmfc"),
          Ln("dash"),
        ]);
      else return Ht("ftyp", [Ln("iso5"), rt(512), Ln("iso5"), Ln("iso6"), Ln("mp41")]);
    return Ht("ftyp", [Ln("isom"), rt(512), Ln("isom"), e.holdsAvc ? Ln("avc1") : [], Ln("mp41")]);
  },
  S6 = () =>
    Ht("styp", [Ln("iso5"), rt(0), Ln("iso5"), Ln("iso6"), Ln("mp41"), Ln("cmfc"), Ln("dash")]),
  M6 = (e, t) => {
    let r = e.maxWrittenEndTimestamp - e.minWrittenTimestamp;
    if (!Number.isFinite(r)) r = 0;
    return dn("sidx", 1, 0, [
      rt(1),
      rt(dl),
      Rc(di(e.minWrittenTimestamp, dl)),
      Rc(0),
      Yt(0),
      Yt(1),
      rt(t & 2147483647),
      rt(di(r, dl)),
      rt(0),
    ]);
  },
  E3 = (e) => ({ type: "mdat", largeSize: e }),
  QP = (e) => ({ type: "free", size: e }),
  D1 = (e) =>
    Ht("moov", void 0, [
      ete(e.creationTime, e.trackDatas),
      ...e.trackDatas.map((t) => tte(t, e.creationTime)),
      e.isFragmented ? Hte(e.trackDatas) : null,
      Kte(e),
    ]),
  ete = (e, t) => {
    let r = Math.max(0, ...t.map((s) => di(y_(s), dl) + di(s.startTimestampOffset ?? 0, dl))),
      n = Math.max(0, ...t.map((s) => s.track.id)) + 1,
      i = !Pu(e) || !Pu(r),
      o = i ? Rc : rt;
    return dn("mvhd", +i, 0, [
      o(e),
      o(e),
      rt(dl),
      o(r),
      Zl(1),
      HP(1),
      Array(10).fill(0),
      VP(zP),
      Array(24).fill(0),
      rt(n),
    ]);
  },
  y_ = (e) => {
    if (e.samples.length === 0) return 0;
    let t = 1 / 0,
      r = -1 / 0;
    for (let n = 0; n < e.samples.length; n++) {
      let i = e.samples[n];
      if (i.timestamp < t) t = i.timestamp;
      if (i.timestamp + i.duration > r) r = i.timestamp + i.duration;
    }
    if (t === 1 / 0) return 0;
    return r - t;
  },
  tte = (e, t) => {
    let r = ek(e),
      n = e.startTimestampOffset !== null && e.startTimestampOffset > 0;
    return Ht("trak", void 0, [
      rte(e, t),
      n ? nte(e, e.startTimestampOffset) : null,
      ite(e, t),
      r.name !== void 0 ? Ht("udta", void 0, [Ht("name", [...Co.encode(r.name)])]) : null,
    ]);
  },
  rte = (e, t) => {
    let r = di(y_(e), dl) + di(e.startTimestampOffset ?? 0, dl),
      n = !Pu(t) || !Pu(r),
      i = n ? Rc : rt,
      o;
    if (e.type === "video") {
      let l = e.track.metadata.rotation;
      o = GP(l ?? 0);
    } else o = zP;
    let s = 2;
    if (e.track.metadata.disposition?.default !== !1) s |= 1;
    let a = e.type === "video" ? 0 : e.type === "audio" ? 1 : e.type === "subtitle" ? 2 : Rs(e);
    return dn("tkhd", +n, s, [
      i(t),
      i(t),
      rt(e.track.id),
      rt(0),
      i(r),
      Array(8).fill(0),
      Yt(0),
      Yt(a),
      HP(e.type === "audio" ? 1 : 0),
      Yt(0),
      VP(o),
      Zl(e.type === "video" ? e.info.width : 0),
      Zl(e.type === "video" ? e.info.height : 0),
    ]);
  },
  nte = (e, t) => {
    let r = di(t, dl),
      n = di(y_(e), dl),
      i = !Pu(r) || !Pu(n),
      o = i ? Rc : rt,
      s = i ? Jee : Vu;
    return Ht("edts", void 0, [
      dn("elst", i ? 1 : 0, 0, [rt(2), o(r), s(-1), Zl(1), o(n), s(0), Zl(1)]),
    ]);
  },
  ite = (e, t) => Ht("mdia", void 0, [ote(e, t), I6(!0, ste[e.type], ate[e.type]), lte(e)]),
  ote = (e, t) => {
    let r = di(y_(e), e.timescale),
      n = !Pu(t) || !Pu(r),
      i = n ? Rc : rt;
    return dn("mdhd", +n, 0, [
      i(t),
      i(t),
      rt(e.timescale),
      i(r),
      Yt(JP(e.track.metadata.languageCode ?? Jb)),
      Yt(0),
    ]);
  },
  ste = { video: "vide", audio: "soun", subtitle: "text" },
  ate = {
    video: "MediabunnyVideoHandler",
    audio: "MediabunnySoundHandler",
    subtitle: "MediabunnyTextHandler",
  },
  I6 = (e, t, r, n = "\x00\x00\x00\x00") =>
    dn("hdlr", 0, 0, [e ? Ln("mhlr") : rt(0), Ln(t), Ln(n), rt(0), rt(0), Ln(r, !0)]),
  lte = (e) => Ht("minf", void 0, [hte[e.type](), fte(), gte(e)]),
  cte = () => dn("vmhd", 0, 1, [Yt(0), Yt(0), Yt(0), Yt(0)]),
  ute = () => dn("smhd", 0, 0, [Yt(0), Yt(0)]),
  dte = () => dn("nmhd", 0, 0),
  hte = { video: cte, audio: ute, subtitle: dte },
  fte = () => Ht("dinf", void 0, [pte()]),
  pte = () => dn("dref", 0, 0, [rt(1)], [mte()]),
  mte = () => dn("url ", 0, 1),
  gte = (e) => {
    let t =
      e.compositionTimeOffsetTable.length > 1 ||
      e.compositionTimeOffsetTable.some((r) => r.sampleCompositionTimeOffset !== 0);
    return Ht("stbl", void 0, [
      Ate(e),
      Bte(e),
      t ? kte(e) : null,
      t ? Ute(e) : null,
      Dte(e),
      Nte(e),
      Pte(e),
      Fte(e),
    ]);
  },
  Ate = (e) => {
    let t;
    if (e.type === "video") t = yte(Jte(e.track.source._codec, e.info.decoderConfig.codec), e);
    else if (e.type === "audio") {
      let r = $P(e.track.source._codec, e.muxer.isQuickTime);
      (Fe(r), (t = wte(r, e)));
    } else if (e.type === "subtitle") t = Ote(rre[e.track.source._codec], e);
    return (Fe(t), dn("stsd", 0, 0, [rt(1)], [t]));
  },
  yte = (e, t) =>
    Ht(
      e,
      [
        Array(6).fill(0),
        Yt(1),
        Yt(0),
        Yt(0),
        Array(12).fill(0),
        Yt(t.info.width),
        Yt(t.info.height),
        rt(4718592),
        rt(4718592),
        rt(0),
        Yt(1),
        vi(10),
        Ln("Mediabunny"),
        Array(21).fill(0),
        Yt(t.info.hasAlphaChannel ? 32 : 24),
        E6(65535),
      ],
      [
        ere[t.track.source._codec]?.(t) ?? null,
        xte(t),
        $b(t.info.decoderConfig.colorSpace) ? bte(t) : null,
      ],
    ),
  xte = (e) => {
    if (e.info.pixelAspectRatio.num === e.info.pixelAspectRatio.den) return null;
    return Ht("pasp", [rt(e.info.pixelAspectRatio.num), rt(e.info.pixelAspectRatio.den)]);
  },
  bte = (e) =>
    Ht("colr", [
      Ln(e.muxer.isQuickTime ? "nclc" : "nclx"),
      Yt(ku[e.info.decoderConfig.colorSpace.primaries]),
      Yt(Uu[e.info.decoderConfig.colorSpace.transfer]),
      Yt(Hu[e.info.decoderConfig.colorSpace.matrix]),
      e.muxer.isQuickTime ? [] : vi((e.info.decoderConfig.colorSpace.fullRange ? 1 : 0) << 7),
    ]),
  _te = (e) => e.info.decoderConfig && Ht("avcC", [...Fo(e.info.decoderConfig.description)]),
  vte = (e) => e.info.decoderConfig && Ht("hvcC", [...Fo(e.info.decoderConfig.description)]),
  PP = (e) => {
    if (!e.info.decoderConfig) return null;
    let t = e.info.decoderConfig,
      r = t.codec.split("."),
      n = Number(r[1]),
      i = Number(r[2]),
      o = Number(r[3]),
      s = r[4] ? Number(r[4]) : 1,
      a = r[8] ? Number(r[8]) : Number(t.colorSpace?.fullRange ?? 0),
      l = (o << 4) + (s << 1) + a,
      c = r[5] ? Number(r[5]) : t.colorSpace?.primaries ? ku[t.colorSpace.primaries] : 2,
      u = r[6] ? Number(r[6]) : t.colorSpace?.transfer ? Uu[t.colorSpace.transfer] : 2,
      d = r[7] ? Number(r[7]) : t.colorSpace?.matrix ? Hu[t.colorSpace.matrix] : 2;
    return dn("vpcC", 1, 0, [vi(n), vi(i), vi(l), vi(c), vi(u), vi(d), Yt(0)]);
  },
  Cte = (e) => Ht("av1C", i_(e.info.decoderConfig.codec)),
  wte = (e, t) => {
    let r = 0,
      n,
      i = 16,
      o = Os.includes(t.track.source._codec);
    if (o) {
      let s = t.track.source._codec,
        { sampleSize: a } = Kl(s);
      if (((i = 8 * a), i > 16)) r = 1;
    }
    if (t.muxer.isQuickTime) r = 1;
    if (r === 0)
      n = [
        Array(6).fill(0),
        Yt(1),
        Yt(r),
        Yt(0),
        rt(0),
        Yt(t.info.numberOfChannels),
        Yt(i),
        Yt(0),
        Yt(0),
        Yt(t.info.sampleRate < 65536 ? t.info.sampleRate : 0),
        Yt(0),
      ];
    else {
      let s = o ? 0 : -2;
      n = [
        Array(6).fill(0),
        Yt(1),
        Yt(r),
        Yt(0),
        rt(0),
        Yt(t.info.numberOfChannels),
        Yt(Math.min(i, 16)),
        E6(s),
        Yt(0),
        Yt(t.info.sampleRate < 65536 ? t.info.sampleRate : 0),
        Yt(0),
        o ? [rt(1), rt(i / 8), rt((t.info.numberOfChannels * i) / 8)] : [rt(0), rt(0), rt(0)],
        rt(2),
      ];
    }
    return Ht(e, n, [tre(t.track.source._codec, t.muxer.isQuickTime)?.(t) ?? null]);
  },
  T6 = (e) => {
    let t;
    switch (e.track.source._codec) {
      case "aac":
        t = 64;
        break;
      case "mp3":
        t = 107;
        break;
      case "vorbis":
        t = 221;
        break;
      default:
        throw Error(`Unhandled audio codec: ${e.track.source._codec}`);
    }
    let r = [...vi(t), ...vi(21), ...UP(0), ...rt(0), ...rt(0)];
    if (e.info.decoderConfig.description) {
      let n = Fo(e.info.decoderConfig.description);
      r = [...r, ...vi(5), ...w6(n.byteLength), ...n];
    }
    return (
      (r = [...Yt(1), ...vi(0), ...vi(4), ...w6(r.length), ...r, ...vi(6), ...vi(1), ...vi(2)]),
      (r = [...vi(3), ...w6(r.length), ...r]),
      dn("esds", 0, 0, r)
    );
  },
  sh = (e) => Ht("wave", void 0, [Tte(e), Ete(e), Ht("\x00\x00\x00\x00")]),
  Tte = (e) => Ht("frma", [Ln($P(e.track.source._codec, e.muxer.isQuickTime))]),
  Ete = (e) => {
    let { littleEndian: t } = Kl(e.track.source._codec);
    return Ht("enda", [Yt(+t)]);
  },
  Ste = (e) => {
    let t = e.info.numberOfChannels,
      r = 3840,
      n = e.info.sampleRate,
      i = 0,
      o = 0,
      s = new Uint8Array(0),
      a = e.info.decoderConfig?.description;
    if (a) {
      Fe(a.byteLength >= 18);
      let l = Fo(a),
        c = c_(l);
      if (
        ((t = c.outputChannelCount),
        (r = c.preSkip),
        (n = c.inputSampleRate),
        (i = c.outputGain),
        (o = c.channelMappingFamily),
        c.channelMappingTable)
      )
        s = c.channelMappingTable;
    }
    return Ht("dOps", [vi(0), vi(t), Yt(r), rt(n), E6(i), vi(o), ...s]);
  },
  Mte = (e) => {
    let t = e.info.decoderConfig?.description;
    Fe(t);
    let r = Fo(t);
    return dn("dfLa", 0, 0, [...r.subarray(4)]);
  },
  Mc = (e) => {
    let { littleEndian: t, sampleSize: r } = Kl(e.track.source._codec),
      n = +t;
    return dn("pcmC", 0, 0, [vi(n), vi(8 * r)]);
  },
  Ite = (e) => {
    let t = fP(e.info.firstPacket.data);
    if (!t)
      throw Error(
        "Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).",
      );
    let r = new Uint8Array(3),
      n = new Ni(r);
    return (
      n.writeBits(2, t.fscod),
      n.writeBits(5, t.bsid),
      n.writeBits(3, t.bsmod),
      n.writeBits(3, t.acmod),
      n.writeBits(1, t.lfeon),
      n.writeBits(5, t.bitRateCode),
      n.writeBits(5, 0),
      Ht("dac3", [...r])
    );
  },
  Rte = (e) => {
    let t = pP(e.info.firstPacket.data);
    if (!t)
      throw Error(
        "Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).",
      );
    let r = 16;
    for (let s of t.substreams)
      if (((r += 23), s.numDepSub > 0)) r += 9;
      else r += 1;
    let n = Math.ceil(r / 8),
      i = new Uint8Array(n),
      o = new Ni(i);
    (o.writeBits(13, t.dataRate), o.writeBits(3, t.substreams.length - 1));
    for (let s of t.substreams)
      if (
        (o.writeBits(2, s.fscod),
        o.writeBits(5, s.bsid),
        o.writeBits(1, 0),
        o.writeBits(1, 0),
        o.writeBits(3, s.bsmod),
        o.writeBits(3, s.acmod),
        o.writeBits(1, s.lfeon),
        o.writeBits(3, 0),
        o.writeBits(4, s.numDepSub),
        s.numDepSub > 0)
      )
        o.writeBits(9, s.chanLoc);
      else o.writeBits(1, 0);
    return Ht("dec3", [...i]);
  },
  Ote = (e, t) => Ht(e, [Array(6).fill(0), Yt(1)], [nre[t.track.source._codec](t)]),
  Lte = (e) => Ht("vttC", [...Co.encode(e.info.config.description)]);
var Bte = (e) =>
    dn("stts", 0, 0, [
      rt(e.timeToSampleTable.length),
      e.timeToSampleTable.map((t) => [rt(t.sampleCount), rt(t.sampleDelta)]),
    ]),
  Fte = (e) => {
    if (e.samples.every((r) => r.type === "key")) return null;
    let t = [...e.samples.entries()].filter(([, r]) => r.type === "key");
    return dn("stss", 0, 0, [rt(t.length), t.map(([r]) => rt(r + 1))]);
  },
  Dte = (e) =>
    dn("stsc", 0, 0, [
      rt(e.compactlyCodedChunkTable.length),
      e.compactlyCodedChunkTable.map((t) => [rt(t.firstChunk), rt(t.samplesPerChunk), rt(1)]),
    ]),
  Nte = (e) => {
    if (e.type === "audio" && e.info.requiresPcmTransformation) {
      let { sampleSize: t } = Kl(e.track.source._codec);
      return dn("stsz", 0, 0, [
        rt(t * e.info.numberOfChannels),
        rt(e.samples.reduce((r, n) => r + di(n.duration, e.timescale), 0)),
      ]);
    }
    return dn("stsz", 0, 0, [rt(0), rt(e.samples.length), e.samples.map((t) => rt(t.size))]);
  },
  Pte = (e) => {
    if (e.finalizedChunks.length > 0 && Is(e.finalizedChunks).offset >= 4294967296)
      return dn("co64", 0, 0, [
        rt(e.finalizedChunks.length),
        e.finalizedChunks.map((t) => Rc(t.offset)),
      ]);
    return dn("stco", 0, 0, [
      rt(e.finalizedChunks.length),
      e.finalizedChunks.map((t) => rt(t.offset)),
    ]);
  },
  kte = (e) =>
    dn("ctts", 1, 0, [
      rt(e.compositionTimeOffsetTable.length),
      e.compositionTimeOffsetTable.map((t) => [
        rt(t.sampleCount),
        Vu(t.sampleCompositionTimeOffset),
      ]),
    ]),
  Ute = (e) => {
    let t = 1 / 0,
      r = -1 / 0,
      n = 1 / 0,
      i = -1 / 0;
    (Fe(e.compositionTimeOffsetTable.length > 0), Fe(e.samples.length > 0));
    for (let s = 0; s < e.compositionTimeOffsetTable.length; s++) {
      let a = e.compositionTimeOffsetTable[s];
      ((t = Math.min(t, a.sampleCompositionTimeOffset)),
        (r = Math.max(r, a.sampleCompositionTimeOffset)));
    }
    for (let s = 0; s < e.samples.length; s++) {
      let a = e.samples[s];
      ((n = Math.min(n, di(a.timestamp, e.timescale))),
        (i = Math.max(i, di(a.timestamp + a.duration, e.timescale))));
    }
    let o = Math.max(-t, 0);
    if (i >= 2147483648) return null;
    return dn("cslg", 0, 0, [Vu(o), Vu(t), Vu(r), Vu(n), Vu(i)]);
  },
  Hte = (e) => Ht("mvex", void 0, e.map(Gte)),
  Gte = (e) => dn("trex", 0, 0, [rt(e.track.id), rt(1), rt(0), rt(0), rt(0)]),
  R6 = (e, t) => Ht("moof", void 0, [zte(e), ...t.map(Vte)]),
  zte = (e) => dn("mfhd", 0, 0, [rt(e)]),
  YP = (e) => {
    let t = 0,
      r = 0,
      n = 0,
      i = 0,
      o = e.type === "delta";
    if (((r |= +o), o)) t |= 1;
    else t |= 2;
    return (t << 24) | (r << 16) | (n << 8) | i;
  },
  Vte = (e) => Ht("traf", void 0, [Wte(e), Qte(e), Yte(e)]),
  Wte = (e) => {
    Fe(e.currentChunk);
    let t = 0;
    ((t |= 8), (t |= 16), (t |= 32), (t |= 131072));
    let r = e.currentChunk.samples[1] ?? e.currentChunk.samples[0],
      n = { duration: r.timescaleUnitsToNextSample, size: r.size, flags: YP(r) };
    return dn("tfhd", 0, t, [rt(e.track.id), rt(n.duration), rt(n.size), rt(n.flags)]);
  },
  Qte = (e) => (
    Fe(e.currentChunk),
    dn("tfdt", 1, 0, [Rc(di(e.currentChunk.startTimestamp, e.timescale))])
  ),
  Yte = (e) => {
    Fe(e.currentChunk);
    let t = e.currentChunk.samples.map((g) => g.timescaleUnitsToNextSample),
      r = e.currentChunk.samples.map((g) => g.size),
      n = e.currentChunk.samples.map(YP),
      i = e.currentChunk.samples.map((g) => di(g.timestamp - g.decodeTimestamp, e.timescale)),
      o = new Set(t),
      s = new Set(r),
      a = new Set(n),
      l = new Set(i),
      c = a.size === 2 && n[0] !== n[1],
      u = o.size > 1,
      d = s.size > 1,
      h = !c && a.size > 1,
      f = l.size > 1 || [...l].some((g) => g !== 0),
      p = 0;
    return (
      (p |= 1),
      (p |= 4 * +c),
      (p |= 256 * +u),
      (p |= 512 * +d),
      (p |= 1024 * +h),
      (p |= 2048 * +f),
      dn("trun", 1, p, [
        rt(e.currentChunk.samples.length),
        rt(e.currentChunk.offset - e.currentChunk.moofOffset || 0),
        c ? rt(n[0]) : [],
        e.currentChunk.samples.map((g, m) => [
          u ? rt(t[m]) : [],
          d ? rt(r[m]) : [],
          h ? rt(n[m]) : [],
          f ? Vu(i[m]) : [],
        ]),
      ])
    );
  },
  XP = (e) => Ht("mfra", void 0, [...e.map(Xte), jte()]),
  Xte = (e, t) =>
    dn("tfra", 1, 0, [
      rt(e.track.id),
      rt(63),
      rt(e.finalizedChunks.length),
      e.finalizedChunks.map((n) => [
        Rc(di(n.samples[0].timestamp, e.timescale)),
        Rc(n.moofOffset),
        rt(t + 1),
        rt(1),
        rt(1),
      ]),
    ]),
  jte = () => dn("mfro", 0, 0, [rt(0)]),
  jP = () => Ht("vtte"),
  KP = (e, t, r, n, i) =>
    Ht("vttc", void 0, [
      i !== null ? Ht("vsid", [Vu(i)]) : null,
      r !== null ? Ht("iden", [...Co.encode(r)]) : null,
      t !== null ? Ht("ctim", [...Co.encode(A_(t))]) : null,
      n !== null ? Ht("sttg", [...Co.encode(n)]) : null,
      Ht("payl", [...Co.encode(e)]),
    ]),
  qP = (e) => Ht("vtta", [...Co.encode(e)]),
  Kte = (e) => {
    let t = [],
      r = e.format._options.metadataFormat ?? "auto",
      n = e.output._metadataTags;
    if (r === "mdir" || (r === "auto" && !e.isQuickTime)) {
      let i = Zte(n);
      if (i) t.push(i);
    } else if (r === "mdta") {
      let i = $te(n);
      if (i) t.push(i);
    } else if (r === "udta" || (r === "auto" && e.isQuickTime)) qte(t, e.output._metadataTags);
    if (t.length === 0) return null;
    return Ht("udta", void 0, t);
  },
  qte = (e, t) => {
    for (let { key: r, value: n } of M1(t))
      switch (r) {
        case "title":
          e.push(Ic("©nam", n));
          break;
        case "description":
          e.push(Ic("©des", n));
          break;
        case "artist":
          e.push(Ic("©ART", n));
          break;
        case "album":
          e.push(Ic("©alb", n));
          break;
        case "albumArtist":
          e.push(Ic("albr", n));
          break;
        case "genre":
          e.push(Ic("©gen", n));
          break;
        case "date":
          e.push(Ic("©day", n.toISOString().slice(0, 10)));
          break;
        case "comment":
          e.push(Ic("©cmt", n));
          break;
        case "lyrics":
          e.push(Ic("©lyr", n));
          break;
        case "raw":
          break;
        case "discNumber":
        case "discsTotal":
        case "trackNumber":
        case "tracksTotal":
        case "images":
          break;
        default:
          Rs(r);
      }
    if (t.raw)
      for (let r in t.raw) {
        let n = t.raw[r];
        if (n == null || r.length !== 4 || e.some((i) => i.type === r)) continue;
        if (typeof n === "string") e.push(Ic(r, n));
        else if (n instanceof Uint8Array) e.push(Ht(r, Array.from(n)));
      }
  },
  Ic = (e, t) => {
    let r = Co.encode(t);
    return Ht(e, [Yt(r.length), Yt(JP("und")), Array.from(r)]);
  },
  kP = { "image/jpeg": 13, "image/png": 14, "image/bmp": 27 },
  ZP = (e, t) => {
    let r = [];
    for (let { key: n, value: i } of M1(e))
      switch (n) {
        case "title":
          r.push({ key: t ? "title" : "©nam", value: ql(i) });
          break;
        case "description":
          r.push({ key: t ? "description" : "©des", value: ql(i) });
          break;
        case "artist":
          r.push({ key: t ? "artist" : "©ART", value: ql(i) });
          break;
        case "album":
          r.push({ key: t ? "album" : "©alb", value: ql(i) });
          break;
        case "albumArtist":
          r.push({ key: t ? "album_artist" : "aART", value: ql(i) });
          break;
        case "comment":
          r.push({ key: t ? "comment" : "©cmt", value: ql(i) });
          break;
        case "genre":
          r.push({ key: t ? "genre" : "©gen", value: ql(i) });
          break;
        case "lyrics":
          r.push({ key: t ? "lyrics" : "©lyr", value: ql(i) });
          break;
        case "date":
          r.push({ key: t ? "date" : "©day", value: ql(i.toISOString().slice(0, 10)) });
          break;
        case "images":
          for (let o of i) {
            if (o.kind !== "coverFront") continue;
            r.push({
              key: "covr",
              value: Ht("data", [rt(kP[o.mimeType] ?? 0), rt(0), Array.from(o.data)]),
            });
          }
          break;
        case "trackNumber":
          if (t) {
            let o = e.tracksTotal !== void 0 ? `${i}/${e.tracksTotal}` : i.toString();
            r.push({ key: "track", value: ql(o) });
          } else
            r.push({
              key: "trkn",
              value: Ht("data", [rt(0), rt(0), Yt(0), Yt(i), Yt(e.tracksTotal ?? 0), Yt(0)]),
            });
          break;
        case "discNumber":
          if (!t)
            r.push({
              key: "disc",
              value: Ht("data", [rt(0), rt(0), Yt(0), Yt(i), Yt(e.discsTotal ?? 0), Yt(0)]),
            });
          break;
        case "tracksTotal":
        case "discsTotal":
          break;
        case "raw":
          break;
        default:
          Rs(n);
      }
    if (e.raw)
      for (let n in e.raw) {
        let i = e.raw[n];
        if (i == null || (!t && n.length !== 4) || r.some((o) => o.key === n)) continue;
        if (typeof i === "string") r.push({ key: n, value: ql(i) });
        else if (i instanceof Uint8Array)
          r.push({ key: n, value: Ht("data", [rt(0), rt(0), Array.from(i)]) });
        else if (i instanceof t_)
          r.push({
            key: n,
            value: Ht("data", [rt(kP[i.mimeType] ?? 0), rt(0), Array.from(i.data)]),
          });
      }
    return r;
  },
  Zte = (e) => {
    let t = ZP(e, !1);
    if (t.length === 0) return null;
    return dn("meta", 0, 0, void 0, [
      I6(!1, "mdir", "", "appl"),
      Ht(
        "ilst",
        void 0,
        t.map((r) => Ht(r.key, void 0, [r.value])),
      ),
    ]);
  },
  $te = (e) => {
    let t = ZP(e, !0);
    if (t.length === 0) return null;
    return Ht("meta", void 0, [
      I6(!1, "mdta", ""),
      dn(
        "keys",
        0,
        0,
        [rt(t.length)],
        t.map((r) => Ht("mdta", [...Co.encode(r.key)])),
      ),
      Ht(
        "ilst",
        void 0,
        t.map((r, n) => {
          let i = String.fromCharCode(...rt(n + 1));
          return Ht(i, void 0, [r.value]);
        }),
      ),
    ]);
  },
  ql = (e) => Ht("data", [rt(1), rt(0), ...Co.encode(e)]),
  Jte = (e, t) => {
    switch (e) {
      case "avc":
        return t.startsWith("avc3") ? "avc3" : "avc1";
      case "hevc":
        return "hvc1";
      case "vp8":
        return "vp08";
      case "vp9":
        return "vp09";
      case "av1":
        return "av01";
      case "prores":
        return t;
    }
  },
  ere = { avc: _te, hevc: vte, vp8: PP, vp9: PP, av1: Cte, prores: null },
  $P = (e, t) => {
    switch (e) {
      case "aac":
        return "mp4a";
      case "mp3":
        return "mp4a";
      case "opus":
        return "Opus";
      case "vorbis":
        return "mp4a";
      case "flac":
        return "fLaC";
      case "ulaw":
        return "ulaw";
      case "alaw":
        return "alaw";
      case "pcm-u8":
        return "raw ";
      case "pcm-s8":
        return "sowt";
      case "ac3":
        return "ac-3";
      case "eac3":
        return "ec-3";
    }
    if (t)
      switch (e) {
        case "pcm-s16":
          return "sowt";
        case "pcm-s16be":
          return "twos";
        case "pcm-s24":
          return "in24";
        case "pcm-s24be":
          return "in24";
        case "pcm-s32":
          return "in32";
        case "pcm-s32be":
          return "in32";
        case "pcm-f32":
          return "fl32";
        case "pcm-f32be":
          return "fl32";
        case "pcm-f64":
          return "fl64";
        case "pcm-f64be":
          return "fl64";
      }
    else
      switch (e) {
        case "pcm-s16":
          return "ipcm";
        case "pcm-s16be":
          return "ipcm";
        case "pcm-s24":
          return "ipcm";
        case "pcm-s24be":
          return "ipcm";
        case "pcm-s32":
          return "ipcm";
        case "pcm-s32be":
          return "ipcm";
        case "pcm-f32":
          return "fpcm";
        case "pcm-f32be":
          return "fpcm";
        case "pcm-f64":
          return "fpcm";
        case "pcm-f64be":
          return "fpcm";
      }
  },
  tre = (e, t) => {
    switch (e) {
      case "aac":
        return T6;
      case "mp3":
        return T6;
      case "opus":
        return Ste;
      case "vorbis":
        return T6;
      case "flac":
        return Mte;
      case "ac3":
        return Ite;
      case "eac3":
        return Rte;
    }
    if (t)
      switch (e) {
        case "pcm-s24":
          return sh;
        case "pcm-s24be":
          return sh;
        case "pcm-s32":
          return sh;
        case "pcm-s32be":
          return sh;
        case "pcm-f32":
          return sh;
        case "pcm-f32be":
          return sh;
        case "pcm-f64":
          return sh;
        case "pcm-f64be":
          return sh;
      }
    else
      switch (e) {
        case "pcm-s16":
          return Mc;
        case "pcm-s16be":
          return Mc;
        case "pcm-s24":
          return Mc;
        case "pcm-s24be":
          return Mc;
        case "pcm-s32":
          return Mc;
        case "pcm-s32be":
          return Mc;
        case "pcm-f32":
          return Mc;
        case "pcm-f32be":
          return Mc;
        case "pcm-f64":
          return Mc;
        case "pcm-f64be":
          return Mc;
      }
    return null;
  },
  rre = { webvtt: "wvtt" },
  nre = { webvtt: Lte },
  JP = (e) => {
    Fe(e.length === 3);
    let t = 0;
    for (let r = 0; r < 3; r++) ((t <<= 5), (t += e.charCodeAt(r) - 96));
    return t;
  };
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class N1 {
  constructor(e, t) {
    if (
      ((this.finalized = !1),
      (this.started = !1),
      (this.pos = 0),
      (this.trackedWrites = null),
      (this.trackedStart = -1),
      (this.trackedEnd = -1),
      e._writerAcquired)
    )
      throw Error("Can't have multiple Writers for the same Target.");
    ((this.target = e), e._setMonotonicity(t), (e._writerAcquired = !0));
  }
  start() {
    (Fe(!this.started), this.target._start(), (this.started = !0));
  }
  write(e) {
    (Fe(this.started && !this.finalized),
      this.maybeTrackWrites(e),
      this.target._write(e, this.pos),
      (this.pos += e.byteLength));
  }
  seek(e) {
    this.pos = e;
  }
  getPos() {
    return this.pos;
  }
  async flush() {
    return (Fe(this.started && !this.finalized), this.target._flush());
  }
  async finalize() {
    (Fe(this.started && !this.finalized), await this.target._finalize(), (this.finalized = !0));
  }
  maybeTrackWrites(e) {
    if (!this.trackedWrites) return;
    let t = this.getPos();
    if (t < this.trackedStart) {
      if (t + e.byteLength <= this.trackedStart) return;
      ((e = e.subarray(this.trackedStart - t)), (t = 0));
    }
    let r = t + e.byteLength - this.trackedStart,
      n = this.trackedWrites.byteLength;
    while (n < r) n *= 2;
    if (n !== this.trackedWrites.byteLength) {
      let i = new Uint8Array(n);
      (i.set(this.trackedWrites, 0), (this.trackedWrites = i));
    }
    (this.trackedWrites.set(e, t - this.trackedStart),
      (this.trackedEnd = Math.max(this.trackedEnd, t + e.byteLength)));
  }
  startTrackingWrites() {
    ((this.trackedWrites = new Uint8Array(1024)),
      (this.trackedStart = this.getPos()),
      (this.trackedEnd = this.trackedStart));
  }
  stopTrackingWrites() {
    if (!this.trackedWrites)
      throw Error("Internal error: Can't get tracked writes since nothing was tracked.");
    let t = {
      data: this.trackedWrites.subarray(0, this.trackedEnd - this.trackedStart),
      start: this.trackedStart,
      end: this.trackedEnd,
    };
    return ((this.trackedWrites = null), t);
  }
}
var N4e = () => ({});
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class fl extends n0 {
  constructor() {
    super(...arguments);
    ((this._writerAcquired = !1), (this._monotonicity = null), (this.onwrite = null));
  }
  _setMonotonicity(e) {
    if (this._monotonicity !== !1) this._monotonicity = e;
  }
  _dispatchWrite(e, t) {
    (this.onwrite?.(e, t), this._emit("write", { start: e, end: t }));
  }
  slice(e) {
    if (!Number.isInteger(e) || e < 0) throw TypeError("offset must be a non-negative integer.");
    return new B6(this, e);
  }
}
var O6 = 65536,
  L6 = 4294967296;
class ah extends fl {
  constructor(e = {}) {
    super();
    if (((this.buffer = null), (this._maxPos = 0), !e || typeof e !== "object"))
      throw TypeError("BufferTarget options, when provided, must be an object.");
    if (e.onFinalize !== void 0 && typeof e.onFinalize !== "function")
      throw TypeError("options.onFinalize, when provided, must be a function.");
    if (
      ((this._options = e),
      (this._supportsResize = "resize" in new ArrayBuffer(0)),
      this._supportsResize)
    )
      try {
        this._buffer = new ArrayBuffer(O6, { maxByteLength: L6 });
      } catch {
        ((this._buffer = new ArrayBuffer(O6)), (this._supportsResize = !1));
      }
    else this._buffer = new ArrayBuffer(O6);
    this._bytes = new Uint8Array(this._buffer);
  }
  _ensureSize(e) {
    let t = this._buffer.byteLength;
    while (t < e) t *= 2;
    if (t === this._buffer.byteLength) return;
    if (t > L6)
      throw Error(
        `ArrayBuffer exceeded maximum size of ${L6} bytes. Please consider using another target.`,
      );
    if (this._supportsResize) this._buffer.resize(t);
    else {
      let r = new ArrayBuffer(t),
        n = new Uint8Array(r);
      (n.set(this._bytes, 0), (this._buffer = r), (this._bytes = n));
    }
  }
  _start() {}
  _write(e, t) {
    (this._ensureSize(t + e.byteLength),
      this._bytes.set(e, t),
      (this._maxPos = Math.max(this._maxPos, t + e.byteLength)),
      this._dispatchWrite(t, t + e.byteLength));
  }
  async _flush() {}
  async _finalize() {
    if (((this.buffer = this._buffer.slice(0, this._maxPos)), this._options.onFinalize))
      await this._options.onFinalize(this.buffer);
    this._emit("finalized");
  }
  async _close() {}
  _getSlice(e, t) {
    return this._bytes.slice(e, t);
  }
}
class B6 extends fl {
  constructor(e, t) {
    super();
    ((this._baseTarget = e), (this._offset = t));
  }
  _start() {}
  _write(e, t) {
    (this._baseTarget._write(e, this._offset + t), this._dispatchWrite(t, t + e.byteLength));
  }
  _flush() {
    return this._baseTarget._flush();
  }
  async _finalize() {
    this._emit("finalized");
  }
  async _close() {}
  _setMonotonicity(e) {
    (super._setMonotonicity(e), this._baseTarget._setMonotonicity(e));
  }
}
class P1 {
  constructor(e, t) {
    if (((this.rootPath = e), (this.getTarget = t), typeof e !== "string"))
      throw TypeError("rootPath must be a string.");
    if (typeof t !== "function") throw TypeError("getTarget must be a function.");
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var dl = 57600,
  ire = 2082844800,
  ek = (e) => {
    let t = {},
      r = e.track;
    if (r.metadata.name !== void 0) t.name = r.metadata.name;
    return t;
  },
  di = (e, t, r = !0) => {
    let n = e * t;
    return r ? Math.round(n) : n;
  };
class F6 extends T3 {
  constructor(e, t) {
    super(e);
    ((this.writer = null),
      (this.boxWriter = null),
      (this.initWriter = null),
      (this.initBoxWriter = null),
      (this.auxTarget = new ah()),
      (this.auxWriter = new N1(this.auxTarget, !1)),
      (this.auxBoxWriter = new F1(this.auxWriter)),
      (this.mdat = null),
      (this.ftypSize = null),
      (this.trackDatas = []),
      (this.allTracksKnown = E1()),
      (this.creationTime = Math.floor(Date.now() / 1000) + ire),
      (this.finalizedChunks = []),
      (this.nextFragmentNumber = 1),
      (this.maxWrittenTimestamp = -1 / 0),
      (this.minWrittenTimestamp = 1 / 0),
      (this.maxWrittenEndTimestamp = -1 / 0),
      (this.segmentHeaderSize = null),
      (this.format = t),
      (this.isQuickTime = t instanceof M3),
      (this.isCmaf = t instanceof S3),
      (this.minimumFragmentDuration =
        t._options.minimumFragmentDuration ?? (t instanceof S3 ? 1 / 0 : 1)),
      this.auxWriter.start());
  }
  async start() {
    let e = await this.mutex.acquire();
    if (!this.isCmaf)
      ((this.writer = await this.output._getRootWriter((r) =>
        this.format._options.fastStart !== void 0
          ? this.format._options.fastStart === "fragmented"
          : r instanceof ah,
      )),
        (this.boxWriter = new F1(this.writer)),
        (this.fastStart =
          this.format._options.fastStart ?? (this.writer.target instanceof ah ? "in-memory" : !1)),
        (this.isFragmented = this.fastStart === "fragmented"));
    else ((this.fastStart = "fragmented"), (this.isFragmented = !0));
    if (this.isCmaf) {
      if (!this.output._hasInitTarget())
        throw Error(
          "CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.",
        );
      let r = await this.output._getInitTarget(),
        n = new N1(r, !0);
      (n.start(), (this.initWriter = n), (this.initBoxWriter = new F1(n)));
    }
    let t = this.output.tracks.some((r) => r.isVideoTrack() && r.source._codec === "avc");
    {
      let r = this.initBoxWriter ?? this.boxWriter;
      if ((Fe(r), this.format._options.onFtyp)) r.writer.startTrackingWrites();
      if (
        (r.writeBox(
          WP({
            isQuickTime: this.isQuickTime,
            holdsAvc: t,
            fragmented: this.isFragmented,
            cmaf: this.isCmaf,
          }),
        ),
        this.format._options.onFtyp)
      ) {
        let { data: n, start: i } = r.writer.stopTrackingWrites();
        this.format._options.onFtyp(n, i);
      }
      if (((this.ftypSize = r.writer.getPos()), this.isCmaf)) await this.initWriter.flush();
    }
    if (this.fastStart === "in-memory");
    else if (this.fastStart === "reserve") {
      for (let r of this.output.tracks)
        if (r.metadata.maximumPacketCount === void 0)
          throw Error(
            "All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.",
          );
    } else if (this.isFragmented);
    else {
      if ((Fe(this.writer), Fe(this.boxWriter), this.format._options.onMdat))
        this.writer.startTrackingWrites();
      ((this.mdat = E3(!0)), this.boxWriter.writeBox(this.mdat));
    }
    (await this.writer?.flush(), e());
  }
  allTracksAreKnown() {
    for (let e of this.output.tracks)
      if (!e.source._closed && !this.trackDatas.some((t) => t.track === e)) return !1;
    return !0;
  }
  async getMimeType() {
    await this.allTracksKnown.promise;
    let e = this.trackDatas.map((t) => {
      if (t.type === "video") return t.info.decoderConfig.codec;
      else if (t.type === "audio") return t.info.decoderConfig.codec;
      else return { webvtt: "wvtt" }[t.track.source._codec];
    });
    return gP({
      isQuickTime: this.isQuickTime,
      hasVideo: this.trackDatas.some((t) => t.type === "video"),
      hasAudio: this.trackDatas.some((t) => t.type === "audio"),
      codecStrings: e,
    });
  }
  getVideoTrackData(e, t, r) {
    let n = this.trackDatas.find((h) => h.track === e);
    if (n) return n;
    (o_(r), Fe(r), Fe(r.decoderConfig));
    let i = { ...r.decoderConfig };
    (Fe(i.codedWidth !== void 0), Fe(i.codedHeight !== void 0));
    let o = !1;
    if (e.source._codec === "avc" && !i.description) {
      let h = aP(t.data);
      if (!h)
        throw Error(
          "Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.",
        );
      ((i.description = lP(h)), (o = !0));
    } else if (e.source._codec === "hevc" && !i.description) {
      let h = uP(t.data);
      if (!h)
        throw Error(
          "Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.",
        );
      ((i.description = dP(h)), (o = !0));
    }
    let s = LN(1 / (e.metadata.frameRate ?? dl), 1e6).den,
      { displayAspectWidth: a, displayAspectHeight: l } = i,
      c =
        a === void 0 || l === void 0
          ? { num: 1, den: 1 }
          : I1({ num: a * i.codedHeight, den: l * i.codedWidth }),
      u = i.codec === "ap4h" || i.codec === "ap4x",
      d = {
        muxer: this,
        track: e,
        type: "video",
        info: {
          width: i.codedWidth,
          height: i.codedHeight,
          pixelAspectRatio: c,
          decoderConfig: i,
          requiresAnnexBTransformation: o,
          hasAlphaChannel: u,
        },
        timescale: s,
        samples: [],
        sampleQueue: [],
        timestampProcessingQueue: [],
        timeToSampleTable: [],
        compositionTimeOffsetTable: [],
        lastTimescaleUnits: null,
        lastSample: null,
        startTimestampOffset: null,
        finalizedChunks: [],
        currentChunk: null,
        compactlyCodedChunkTable: [],
        closed: !1,
      };
    if (
      (this.trackDatas.push(d),
      this.trackDatas.sort((h, f) => h.track.id - f.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return d;
  }
  getAudioTrackData(e, t, r) {
    let n = this.trackDatas.find((a) => a.track === e);
    if (n) return n;
    (s_(r), Fe(r), Fe(r.decoderConfig));
    let i = { ...r.decoderConfig },
      o = !1;
    if (e.source._codec === "aac" && !i.description) {
      let a = L1(zu.tempFromBytes(t.data));
      if (!a)
        throw Error(
          "Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.",
        );
      let l = g3[a.samplingFrequencyIndex],
        c = A3[a.channelConfiguration];
      if (l === void 0 || c === void 0) throw Error("Invalid ADTS frame header.");
      ((i.description = n_({ objectType: a.objectType, sampleRate: l, numberOfChannels: c })),
        (o = !0));
    }
    let s = {
      muxer: this,
      track: e,
      type: "audio",
      info: {
        numberOfChannels: r.decoderConfig.numberOfChannels,
        sampleRate: r.decoderConfig.sampleRate,
        decoderConfig: i,
        requiresPcmTransformation: !this.isFragmented && Os.includes(e.source._codec),
        expectedNextPcmPacketTimestamp: null,
        requiresAdtsStripping: o,
        firstPacket: t,
      },
      timescale: i.sampleRate,
      samples: [],
      sampleQueue: [],
      timestampProcessingQueue: [],
      timeToSampleTable: [],
      compositionTimeOffsetTable: [],
      lastTimescaleUnits: null,
      lastSample: null,
      startTimestampOffset: null,
      finalizedChunks: [],
      currentChunk: null,
      compactlyCodedChunkTable: [],
      closed: !1,
    };
    if (
      (this.trackDatas.push(s),
      this.trackDatas.sort((a, l) => a.track.id - l.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return s;
  }
  getSubtitleTrackData(e, t) {
    let r = this.trackDatas.find((i) => i.track === e);
    if (r) return r;
    (a_(t), Fe(t), Fe(t.config));
    let n = {
      muxer: this,
      track: e,
      type: "subtitle",
      info: { config: t.config },
      timescale: 1000,
      samples: [],
      sampleQueue: [],
      timestampProcessingQueue: [],
      timeToSampleTable: [],
      compositionTimeOffsetTable: [],
      lastTimescaleUnits: null,
      lastSample: null,
      startTimestampOffset: null,
      finalizedChunks: [],
      currentChunk: null,
      compactlyCodedChunkTable: [],
      closed: !1,
      lastCueEndTimestamp: 0,
      cueQueue: [],
      nextSourceId: 0,
      cueToSourceId: /*@__PURE__*/ new WeakMap(),
    };
    if (
      (this.trackDatas.push(n),
      this.trackDatas.sort((i, o) => i.track.id - o.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return n;
  }
  async addEncodedVideoPacket(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getVideoTrackData(e, t, r),
        o = t.data;
      if (i.info.requiresAnnexBTransformation) {
        let a = [...R1(o)].map((l) => o.subarray(l.offset, l.offset + l.length));
        if (a.length === 0)
          throw Error(
            "Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.",
          );
        o = sP(a, 4);
      }
      this.validateTimestamp(i.track, t.timestamp, t.type === "key");
      let s = this.createSampleForTrack(i, o, t.timestamp, t.duration, t.type);
      await this.registerSample(i, s);
    } finally {
      n();
    }
  }
  async addEncodedAudioPacket(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getAudioTrackData(e, t, r),
        o = t.data;
      if (i.info.requiresAdtsStripping) {
        let c = L1(zu.tempFromBytes(o));
        if (!c) throw Error("Expected ADTS frame, didn't get one.");
        let u = c.crcCheck === null ? h_ : f_;
        o = o.subarray(u);
      }
      this.validateTimestamp(i.track, t.timestamp, t.type === "key");
      let { timestamp: s, duration: a } = t;
      if (i.info.requiresPcmTransformation) {
        let u = Kl(i.info.decoderConfig.codec).sampleSize * i.info.numberOfChannels;
        if (
          ((a = o.byteLength / u / i.info.sampleRate),
          i.info.expectedNextPcmPacketTimestamp !== null)
        ) {
          let d = s - i.info.expectedNextPcmPacketTimestamp;
          if (d < 0.01) s = i.info.expectedNextPcmPacketTimestamp;
          else {
            let h = await this.padWithSilence(i, i.info.expectedNextPcmPacketTimestamp, d);
            s = i.info.expectedNextPcmPacketTimestamp + h;
          }
        }
        i.info.expectedNextPcmPacketTimestamp = s + a;
      }
      let l = this.createSampleForTrack(i, o, s, a, t.type);
      await this.registerSample(i, l);
    } finally {
      n();
    }
  }
  async padWithSilence(e, t, r) {
    let n = di(r, e.timescale);
    if (((r = n / e.timescale), n > 0)) {
      let { sampleSize: i, silentValue: o } = Kl(e.info.decoderConfig.codec),
        s = n * e.info.numberOfChannels,
        a = new Uint8Array(i * s).fill(o),
        l = this.createSampleForTrack(e, new Uint8Array(a.buffer), t, r, "key");
      await this.registerSample(e, l);
    }
    return r;
  }
  async addSubtitleCue(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getSubtitleTrackData(e, r);
      if ((this.validateTimestamp(i.track, t.timestamp, !0), e.source._codec === "webvtt"))
        (i.cueQueue.push(t), await this.processWebVTTCues(i, t.timestamp));
    } finally {
      n();
    }
  }
  async processWebVTTCues(e, t) {
    while (e.cueQueue.length > 0) {
      let r = /*@__PURE__*/ new Set([]);
      for (let l of e.cueQueue)
        (Fe(l.timestamp <= t),
          Fe(e.lastCueEndTimestamp <= l.timestamp + l.duration),
          r.add(Math.max(l.timestamp, e.lastCueEndTimestamp)),
          r.add(l.timestamp + l.duration));
      let n = [...r].sort((l, c) => l - c),
        i = n[0],
        o = n[1] ?? i;
      if (t < o) break;
      if (e.lastCueEndTimestamp < i) {
        this.auxWriter.seek(0);
        let l = jP();
        this.auxBoxWriter.writeBox(l);
        let c = this.auxTarget._getSlice(0, this.auxWriter.getPos()),
          u = this.createSampleForTrack(
            e,
            c,
            e.lastCueEndTimestamp,
            i - e.lastCueEndTimestamp,
            "key",
          );
        (await this.registerSample(e, u), (e.lastCueEndTimestamp = i));
      }
      this.auxWriter.seek(0);
      for (let l = 0; l < e.cueQueue.length; l++) {
        let c = e.cueQueue[l];
        if (c.timestamp >= o) break;
        B1.lastIndex = 0;
        let u = B1.test(c.text),
          d = c.timestamp + c.duration,
          h = e.cueToSourceId.get(c);
        if (h === void 0 && o < d) ((h = e.nextSourceId++), e.cueToSourceId.set(c, h));
        if (c.notes) {
          let p = qP(c.notes);
          this.auxBoxWriter.writeBox(p);
        }
        let f = KP(c.text, u ? i : null, c.identifier ?? null, c.settings ?? null, h ?? null);
        if ((this.auxBoxWriter.writeBox(f), d === o)) e.cueQueue.splice(l--, 1);
      }
      let s = this.auxTarget._getSlice(0, this.auxWriter.getPos()),
        a = this.createSampleForTrack(e, s, i, o - i, "key");
      (await this.registerSample(e, a), (e.lastCueEndTimestamp = o));
    }
  }
  createSampleForTrack(e, t, r, n, i) {
    return {
      timestamp: r,
      decodeTimestamp: r,
      duration: n,
      data: t,
      size: t.byteLength,
      type: i,
      timescaleUnitsToNextSample: di(n, e.timescale),
    };
  }
  processTimestamps(e, t) {
    if (e.timestampProcessingQueue.length === 0) return;
    if (e.type === "audio" && e.info.requiresPcmTransformation) {
      if (!this.isFragmented) e.startTimestampOffset ??= e.timestampProcessingQueue[0].timestamp;
      let n = 0;
      for (let i = 0; i < e.timestampProcessingQueue.length; i++) {
        let o = e.timestampProcessingQueue[i],
          s = di(o.duration, e.timescale);
        n += s;
      }
      if (e.timeToSampleTable.length === 0)
        e.timeToSampleTable.push({ sampleCount: n, sampleDelta: 1 });
      else {
        let i = Is(e.timeToSampleTable);
        i.sampleCount += n;
      }
      e.timestampProcessingQueue.length = 0;
      return;
    }
    let r = e.timestampProcessingQueue.map((n) => n.timestamp).sort((n, i) => n - i);
    if (!this.isFragmented) e.startTimestampOffset ??= r[0];
    for (let n = 0; n < e.timestampProcessingQueue.length; n++) {
      let i = e.timestampProcessingQueue[n];
      i.decodeTimestamp = r[n];
      let o = di(i.timestamp - i.decodeTimestamp, e.timescale),
        s = di(i.duration, e.timescale);
      if (e.lastTimescaleUnits !== null) {
        Fe(e.lastSample);
        let a = di(i.decodeTimestamp, e.timescale, !1),
          l = Math.round(a - e.lastTimescaleUnits);
        if (
          (Fe(l >= 0),
          (e.lastTimescaleUnits += l),
          (e.lastSample.timescaleUnitsToNextSample = l),
          !this.isFragmented)
        ) {
          let c = Is(e.timeToSampleTable);
          if ((Fe(c), c.sampleCount === 1)) {
            c.sampleDelta = l;
            let d = e.timeToSampleTable[e.timeToSampleTable.length - 2];
            if (d && d.sampleDelta === l) (d.sampleCount++, e.timeToSampleTable.pop(), (c = d));
          } else if (c.sampleDelta !== l)
            (c.sampleCount--, e.timeToSampleTable.push((c = { sampleCount: 1, sampleDelta: l })));
          if (c.sampleDelta === s) c.sampleCount++;
          else e.timeToSampleTable.push({ sampleCount: 1, sampleDelta: s });
          let u = Is(e.compositionTimeOffsetTable);
          if ((Fe(u), u.sampleCompositionTimeOffset === o)) u.sampleCount++;
          else
            e.compositionTimeOffsetTable.push({ sampleCount: 1, sampleCompositionTimeOffset: o });
        }
      } else if (
        ((e.lastTimescaleUnits = di(i.decodeTimestamp, e.timescale, !1)), !this.isFragmented)
      )
        (e.timeToSampleTable.push({ sampleCount: 1, sampleDelta: s }),
          e.compositionTimeOffsetTable.push({ sampleCount: 1, sampleCompositionTimeOffset: o }));
      e.lastSample = i;
    }
    if (
      ((e.timestampProcessingQueue.length = 0),
      Fe(e.lastSample),
      Fe(e.lastTimescaleUnits !== null),
      t !== void 0 && e.lastSample.timescaleUnitsToNextSample === 0)
    ) {
      Fe(t.type === "key");
      let n = di(t.timestamp, e.timescale, !1),
        i = Math.round(n - e.lastTimescaleUnits);
      e.lastSample.timescaleUnitsToNextSample = i;
    }
  }
  async registerSample(e, t) {
    if (t.type === "key") this.processTimestamps(e, t);
    if ((e.timestampProcessingQueue.push(t), this.isFragmented))
      (e.sampleQueue.push(t), await this.interleaveSamples());
    else if (this.fastStart === "reserve") await this.registerSampleFastStartReserve(e, t);
    else await this.addSampleToTrack(e, t);
  }
  async addSampleToTrack(e, t) {
    if (!this.isFragmented) {
      if ((e.samples.push(t), this.fastStart === "reserve")) {
        let n = e.track.metadata.maximumPacketCount;
        if ((Fe(n !== void 0), e.samples.length > n))
          throw Error(
            `Track #${e.track.id} has already reached the maximum packet count (${n}). Either add less packets or increase the maximum packet count.`,
          );
      }
    }
    let r = !1;
    if (!e.currentChunk) r = !0;
    else {
      e.currentChunk.startTimestamp = Math.min(e.currentChunk.startTimestamp, t.timestamp);
      let n = t.timestamp - e.currentChunk.startTimestamp;
      if (this.isFragmented) {
        let i = this.trackDatas.every((o) => {
          if (e === o) return t.type === "key";
          let s = o.sampleQueue[0];
          if (s) return s.type === "key";
          return o.closed;
        });
        if (n >= this.minimumFragmentDuration && i && t.timestamp > this.maxWrittenTimestamp)
          ((r = !0), await this.finalizeFragment());
      } else r = n >= 0.5;
    }
    if (r) {
      if (e.currentChunk) await this.finalizeCurrentChunk(e);
      e.currentChunk = { startTimestamp: t.timestamp, samples: [], offset: null, moofOffset: null };
    }
    if ((Fe(e.currentChunk), e.currentChunk.samples.push(t), this.isFragmented))
      ((this.maxWrittenTimestamp = Math.max(this.maxWrittenTimestamp, t.timestamp)),
        (this.maxWrittenEndTimestamp = Math.max(
          this.maxWrittenEndTimestamp,
          t.timestamp + t.duration,
        )),
        (this.minWrittenTimestamp = Math.min(this.minWrittenTimestamp, t.timestamp)));
  }
  async finalizeCurrentChunk(e) {
    if ((Fe(!this.isFragmented), Fe(this.writer), !e.currentChunk)) return;
    (e.finalizedChunks.push(e.currentChunk), this.finalizedChunks.push(e.currentChunk));
    let t = e.currentChunk.samples.length;
    if (e.type === "audio" && e.info.requiresPcmTransformation)
      t = e.currentChunk.samples.reduce((r, n) => r + di(n.duration, e.timescale), 0);
    if (
      e.compactlyCodedChunkTable.length === 0 ||
      Is(e.compactlyCodedChunkTable).samplesPerChunk !== t
    )
      e.compactlyCodedChunkTable.push({ firstChunk: e.finalizedChunks.length, samplesPerChunk: t });
    if (this.fastStart === "in-memory") {
      e.currentChunk.offset = 0;
      return;
    }
    e.currentChunk.offset = this.writer.getPos();
    for (let r of e.currentChunk.samples) (Fe(r.data), this.writer.write(r.data), (r.data = null));
    await this.writer.flush();
  }
  async interleaveSamples(e = !1) {
    if ((Fe(this.isFragmented), !e && !this.allTracksAreKnown())) return;
    e: while (!0) {
      let t = null,
        r = 1 / 0;
      for (let i of this.trackDatas) {
        if (!e && i.sampleQueue.length === 0 && !i.closed) break e;
        if (i.sampleQueue.length > 0 && i.sampleQueue[0].timestamp < r)
          ((t = i), (r = i.sampleQueue[0].timestamp));
      }
      if (!t) break;
      let n = t.sampleQueue.shift();
      await this.addSampleToTrack(t, n);
    }
  }
  async finalizeFragment(e = !this.isCmaf) {
    Fe(this.isFragmented);
    let t = this.nextFragmentNumber++;
    if (t === 1) {
      let h = this.initBoxWriter ?? this.boxWriter;
      if ((Fe(h), this.format._options.onMoov)) h.writer.startTrackingWrites();
      this.ensureOneEnabledTrack();
      let f = D1(this);
      if ((h.writeBox(f), this.format._options.onMoov)) {
        let { data: p, start: g } = h.writer.stopTrackingWrites();
        this.format._options.onMoov(p, g);
      }
      if (this.isCmaf) {
        (Fe(this.initWriter),
          await this.initWriter.flush(),
          await this.initWriter.finalize(),
          (this.writer = await this.output._getRootWriter(!0)),
          (this.boxWriter = new F1(this.writer)));
        let p = this.boxWriter.measureBox(S6()),
          g = this.boxWriter.measureBox(M6(this, 0));
        ((this.segmentHeaderSize = p + g), this.writer.seek(this.segmentHeaderSize));
      }
    }
    (Fe(this.writer), Fe(this.boxWriter));
    let r = this.trackDatas.filter((h) => h.currentChunk),
      n = R6(t, r),
      i = this.writer.getPos(),
      o = i + this.boxWriter.measureBox(n),
      s = o + u_,
      a = 1 / 0;
    for (let h of r) {
      ((h.currentChunk.offset = s), (h.currentChunk.moofOffset = i));
      for (let f of h.currentChunk.samples) s += f.size;
      a = Math.min(a, h.currentChunk.startTimestamp);
    }
    let l = s - o,
      c = l >= 4294967296;
    if (c) for (let h of r) h.currentChunk.offset += y6 - u_;
    if (this.format._options.onMoof) this.writer.startTrackingWrites();
    let u = R6(t, r);
    if ((this.boxWriter.writeBox(u), this.format._options.onMoof)) {
      let { data: h, start: f } = this.writer.stopTrackingWrites();
      this.format._options.onMoof(h, f, a);
    }
    if ((Fe(this.writer.getPos() === o), this.format._options.onMdat))
      this.writer.startTrackingWrites();
    let d = E3(c);
    ((d.size = l), this.boxWriter.writeBox(d), this.writer.seek(o + (c ? y6 : u_)));
    for (let h of r)
      for (let f of h.currentChunk.samples) (this.writer.write(f.data), (f.data = null));
    if (this.format._options.onMdat) {
      let { data: h, start: f } = this.writer.stopTrackingWrites();
      this.format._options.onMdat(h, f);
    }
    for (let h of r)
      (h.finalizedChunks.push(h.currentChunk),
        this.finalizedChunks.push(h.currentChunk),
        (h.currentChunk = null));
    if (e) await this.writer.flush();
  }
  async registerSampleFastStartReserve(e, t) {
    if ((Fe(this.writer), Fe(this.boxWriter), this.allTracksAreKnown())) {
      if (!this.mdat) {
        this.ensureOneEnabledTrack();
        let r = D1(this),
          i = this.boxWriter.measureBox(r) + this.computeSampleTableSizeUpperBound() + 4096;
        if (
          (Fe(this.ftypSize !== null),
          this.writer.seek(this.ftypSize + i),
          this.format._options.onMdat)
        )
          this.writer.startTrackingWrites();
        ((this.mdat = E3(!0)), this.boxWriter.writeBox(this.mdat));
        for (let o of this.trackDatas) {
          for (let s of o.sampleQueue) await this.addSampleToTrack(o, s);
          o.sampleQueue.length = 0;
        }
      }
      await this.addSampleToTrack(e, t);
    } else e.sampleQueue.push(t);
  }
  computeSampleTableSizeUpperBound() {
    Fe(this.fastStart === "reserve");
    let e = 0;
    for (let t of this.trackDatas) {
      let r = t.track.metadata.maximumPacketCount;
      (Fe(r !== void 0),
        (e += 8 * Math.ceil(0.6666666666666666 * r)),
        (e += 4 * r),
        (e += 8 * Math.ceil(0.6666666666666666 * r)),
        (e += 12 * Math.ceil(0.6666666666666666 * r)),
        (e += 4 * r),
        (e += 8 * r));
    }
    return e;
  }
  async onTrackClose(e) {
    let t = await this.mutex.acquire(),
      r = this.trackDatas.find((n) => n.track === e);
    if (r) {
      if (((r.closed = !0), r.type === "subtitle" && e.source._codec === "webvtt"))
        await this.processWebVTTCues(r, 1 / 0);
      this.processTimestamps(r);
    }
    if (this.allTracksAreKnown()) this.allTracksKnown.resolve();
    if (this.isFragmented) await this.interleaveSamples();
    t();
  }
  ensureOneEnabledTrack() {
    for (let e of ["video", "audio", "subtitle"]) {
      let t = this.trackDatas.filter((n) => n.type === e);
      if (t.length === 0) continue;
      if (!t.some((n) => n.track.metadata.disposition?.default !== !1)) {
        let n = t[0];
        n.track.metadata.disposition = { ...n.track.metadata.disposition, default: !0 };
      }
    }
  }
  async finalize() {
    let e = await this.mutex.acquire();
    (this.allTracksKnown.resolve(), this.ensureOneEnabledTrack());
    for (let t of this.trackDatas) {
      if (((t.closed = !0), t.type === "subtitle" && t.track.source._codec === "webvtt"))
        await this.processWebVTTCues(t, 1 / 0);
      this.processTimestamps(t);
    }
    if (this.isFragmented) (await this.interleaveSamples(!0), await this.finalizeFragment(!1));
    else
      for (let t of this.trackDatas) {
        (await this.finalizeCurrentChunk(t), Fe(t.startTimestampOffset !== null));
        for (let r = 0; r < t.samples.length; r++) {
          let n = t.samples[r];
          ((n.timestamp -= t.startTimestampOffset), (n.decodeTimestamp -= t.startTimestampOffset));
        }
      }
    if ((Fe(this.writer), Fe(this.boxWriter), this.fastStart === "in-memory")) {
      this.mdat = E3(!1);
      let t;
      for (let n = 0; n < 2; n++) {
        let i = D1(this),
          o = this.boxWriter.measureBox(i);
        t = this.boxWriter.measureBox(this.mdat);
        let s = this.writer.getPos() + o + t;
        for (let a of this.finalizedChunks) {
          a.offset = s;
          for (let { data: l } of a.samples) (Fe(l), (s += l.byteLength), (t += l.byteLength));
        }
        if (s < 4294967296) break;
        if (t >= 4294967296) this.mdat.largeSize = !0;
      }
      if (this.format._options.onMoov) this.writer.startTrackingWrites();
      let r = D1(this);
      if ((this.boxWriter.writeBox(r), this.format._options.onMoov)) {
        let { data: n, start: i } = this.writer.stopTrackingWrites();
        this.format._options.onMoov(n, i);
      }
      if (this.format._options.onMdat) this.writer.startTrackingWrites();
      ((this.mdat.size = t), this.boxWriter.writeBox(this.mdat));
      for (let n of this.finalizedChunks)
        for (let i of n.samples) (Fe(i.data), this.writer.write(i.data), (i.data = null));
      if (this.format._options.onMdat) {
        let { data: n, start: i } = this.writer.stopTrackingWrites();
        this.format._options.onMdat(n, i);
      }
    } else if (this.isFragmented)
      if (this.isCmaf) {
        let t = this.segmentHeaderSize !== null ? this.writer.getPos() - this.segmentHeaderSize : 0;
        (this.writer.seek(0), this.boxWriter.writeBox(S6()), this.boxWriter.writeBox(M6(this, t)));
      } else {
        let t = this.writer.getPos(),
          r = XP(this.trackDatas);
        this.boxWriter.writeBox(r);
        let n = this.writer.getPos() - t;
        (this.writer.seek(this.writer.getPos() - 4), this.boxWriter.writeU32(n));
      }
    else {
      Fe(this.mdat);
      let t = this.boxWriter.offsets.get(this.mdat);
      Fe(t !== void 0);
      let r = this.writer.getPos() - t;
      if (
        ((this.mdat.size = r),
        (this.mdat.largeSize = r >= 4294967296),
        this.boxWriter.patchBox(this.mdat),
        this.format._options.onMdat)
      ) {
        let { data: i, start: o } = this.writer.stopTrackingWrites();
        this.format._options.onMdat(i, o);
      }
      let n = D1(this);
      if (this.fastStart === "reserve") {
        if (
          (Fe(this.ftypSize !== null), this.writer.seek(this.ftypSize), this.format._options.onMoov)
        )
          this.writer.startTrackingWrites();
        this.boxWriter.writeBox(n);
        let i = this.boxWriter.offsets.get(this.mdat) - this.writer.getPos();
        this.boxWriter.writeBox(QP(i));
      } else {
        if (this.format._options.onMoov) this.writer.startTrackingWrites();
        this.boxWriter.writeBox(n);
      }
      if (this.format._options.onMoov) {
        let { data: i, start: o } = this.writer.stopTrackingWrites();
        this.format._options.onMoov(i, o);
      }
    }
    e();
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var ore = -32768,
  sre = 32767,
  tk = "Mediabunny",
  rk = 6,
  nk = 5,
  are = { video: 1, audio: 2, subtitle: 17 };
class D6 extends T3 {
  constructor(e, t) {
    super(e);
    ((this.trackDatas = []),
      (this.allTracksKnown = E1()),
      (this.segment = null),
      (this.segmentInfo = null),
      (this.seekHead = null),
      (this.tracksElement = null),
      (this.tagsElement = null),
      (this.attachmentsElement = null),
      (this.segmentDuration = null),
      (this.cues = null),
      (this.currentCluster = null),
      (this.currentClusterStartMsTimestamp = null),
      (this.currentClusterMaxMsTimestamp = null),
      (this.trackDatasInCurrentCluster = /*@__PURE__*/ new Map()),
      (this.startTimestamp = 1 / 0),
      (this.endTimestamp = -1 / 0),
      (this.format = t));
  }
  async start() {
    let e = await this.mutex.acquire();
    ((this.writer = await this.output._getRootWriter(!!this.format._options.appendOnly)),
      (this.ebmlWriter = new x6(this.writer)),
      this.writeEBMLHeader(),
      this.createSegmentInfo(),
      this.createCues(),
      await this.writer.flush(),
      e());
  }
  writeEBMLHeader() {
    if (this.format._options.onEbmlHeader) this.writer.startTrackingWrites();
    let e = {
      id: Ge.EBML,
      data: [
        { id: Ge.EBMLVersion, data: 1 },
        { id: Ge.EBMLReadVersion, data: 1 },
        { id: Ge.EBMLMaxIDLength, data: 4 },
        { id: Ge.EBMLMaxSizeLength, data: 8 },
        { id: Ge.DocType, data: this.format instanceof i0 ? "webm" : "matroska" },
        { id: Ge.DocTypeVersion, data: 2 },
        { id: Ge.DocTypeReadVersion, data: 2 },
      ],
    };
    if ((this.ebmlWriter.writeEBML(e), this.format._options.onEbmlHeader)) {
      let { data: t, start: r } = this.writer.stopTrackingWrites();
      this.format._options.onEbmlHeader(t, r);
    }
  }
  maybeCreateSeekHead(e) {
    if (this.format._options.appendOnly) return;
    let t = new Uint8Array([28, 83, 187, 107]),
      r = new Uint8Array([21, 73, 169, 102]),
      n = new Uint8Array([22, 84, 174, 107]),
      i = new Uint8Array([25, 65, 164, 105]),
      o = new Uint8Array([18, 84, 195, 103]),
      s = {
        id: Ge.SeekHead,
        data: [
          {
            id: Ge.Seek,
            data: [
              { id: Ge.SeekID, data: t },
              {
                id: Ge.SeekPosition,
                size: 5,
                data: e ? this.ebmlWriter.offsets.get(this.cues) - this.segmentDataOffset : 0,
              },
            ],
          },
          {
            id: Ge.Seek,
            data: [
              { id: Ge.SeekID, data: r },
              {
                id: Ge.SeekPosition,
                size: 5,
                data: e
                  ? this.ebmlWriter.offsets.get(this.segmentInfo) - this.segmentDataOffset
                  : 0,
              },
            ],
          },
          {
            id: Ge.Seek,
            data: [
              { id: Ge.SeekID, data: n },
              {
                id: Ge.SeekPosition,
                size: 5,
                data: e
                  ? this.ebmlWriter.offsets.get(this.tracksElement) - this.segmentDataOffset
                  : 0,
              },
            ],
          },
          this.attachmentsElement
            ? {
                id: Ge.Seek,
                data: [
                  { id: Ge.SeekID, data: i },
                  {
                    id: Ge.SeekPosition,
                    size: 5,
                    data: e
                      ? this.ebmlWriter.offsets.get(this.attachmentsElement) -
                        this.segmentDataOffset
                      : 0,
                  },
                ],
              }
            : null,
          this.tagsElement
            ? {
                id: Ge.Seek,
                data: [
                  { id: Ge.SeekID, data: o },
                  {
                    id: Ge.SeekPosition,
                    size: 5,
                    data: e
                      ? this.ebmlWriter.offsets.get(this.tagsElement) - this.segmentDataOffset
                      : 0,
                  },
                ],
              }
            : null,
        ],
      };
    this.seekHead = s;
  }
  createSegmentInfo() {
    let e = { id: Ge.Duration, data: new v3(0) };
    this.segmentDuration = e;
    let t = {
      id: Ge.Info,
      data: [
        { id: Ge.TimestampScale, data: 1e6 },
        { id: Ge.MuxingApp, data: tk },
        { id: Ge.WritingApp, data: tk },
        !this.format._options.appendOnly ? e : null,
      ],
    };
    this.segmentInfo = t;
  }
  createTracks() {
    let e = { id: Ge.Tracks, data: [] };
    this.tracksElement = e;
    for (let t of this.trackDatas) {
      let r = bP[t.track.source._codec];
      Fe(r);
      let n = 0;
      if (t.type === "audio" && t.track.source._codec === "opus") {
        n = 80000000;
        let i = t.info.decoderConfig.description;
        if (i) {
          let o = Fo(i),
            s = c_(o);
          n = Math.round(1e9 * (s.preSkip / XN));
        }
      }
      e.data.push({
        id: Ge.TrackEntry,
        data: [
          { id: Ge.TrackNumber, data: t.track.id },
          { id: Ge.TrackUID, data: t.track.id },
          { id: Ge.TrackType, data: are[t.type] },
          t.track.metadata.disposition?.default === !1 ? { id: Ge.FlagDefault, data: 0 } : null,
          t.track.metadata.disposition?.forced ? { id: Ge.FlagForced, data: 1 } : null,
          t.track.metadata.disposition?.hearingImpaired
            ? { id: Ge.FlagHearingImpaired, data: 1 }
            : null,
          t.track.metadata.disposition?.visuallyImpaired
            ? { id: Ge.FlagVisualImpaired, data: 1 }
            : null,
          t.track.metadata.disposition?.original ? { id: Ge.FlagOriginal, data: 1 } : null,
          t.track.metadata.disposition?.commentary ? { id: Ge.FlagCommentary, data: 1 } : null,
          { id: Ge.FlagLacing, data: 0 },
          { id: Ge.Language, data: t.track.metadata.languageCode ?? Jb },
          { id: Ge.CodecID, data: r },
          t.codecPrivate ? { id: Ge.CodecPrivate, data: Fo(t.codecPrivate) } : null,
          { id: Ge.CodecDelay, data: 0 },
          { id: Ge.SeekPreRoll, data: n },
          t.track.metadata.name !== void 0
            ? { id: Ge.Name, data: new Sc(t.track.metadata.name) }
            : null,
          t.type === "video" ? this.videoSpecificTrackInfo(t) : null,
          t.type === "audio" ? this.audioSpecificTrackInfo(t) : null,
          t.type === "subtitle" ? this.subtitleSpecificTrackInfo(t) : null,
        ],
      });
    }
  }
  videoSpecificTrackInfo(e) {
    let { frameRate: t, rotation: r } = e.track.metadata,
      n = [t ? { id: Ge.DefaultDuration, data: 1e9 / t } : null],
      i = r ? Zb(-r) : 0,
      o =
        !!e.info.aspectRatio &&
        e.info.aspectRatio.num * e.info.height !== e.info.aspectRatio.den * e.info.width,
      s = e.info.decoderConfig.colorSpace,
      a = {
        id: Ge.Video,
        data: [
          { id: Ge.PixelWidth, data: e.info.width },
          { id: Ge.PixelHeight, data: e.info.height },
          o ? { id: Ge.DisplayWidth, data: e.info.aspectRatio.num } : null,
          o ? { id: Ge.DisplayHeight, data: e.info.aspectRatio.den } : null,
          o ? { id: Ge.DisplayUnit, data: 3 } : null,
          e.info.alphaMode ? { id: Ge.AlphaMode, data: 1 } : null,
          $b(s)
            ? {
                id: Ge.Colour,
                data: [
                  { id: Ge.MatrixCoefficients, data: Hu[s.matrix] },
                  { id: Ge.TransferCharacteristics, data: Uu[s.transfer] },
                  { id: Ge.Primaries, data: ku[s.primaries] },
                  { id: Ge.Range, data: s.fullRange ? 2 : 1 },
                ],
              }
            : null,
          i
            ? {
                id: Ge.Projection,
                data: [
                  { id: Ge.ProjectionType, data: 0 },
                  { id: Ge.ProjectionPoseRoll, data: new _3(((i + 180) % 360) - 180) },
                ],
              }
            : null,
        ],
      };
    return (n.push(a), n);
  }
  audioSpecificTrackInfo(e) {
    let t = Os.includes(e.track.source._codec) ? Kl(e.track.source._codec) : null;
    return [
      {
        id: Ge.Audio,
        data: [
          { id: Ge.SamplingFrequency, data: new _3(e.info.sampleRate) },
          { id: Ge.Channels, data: e.info.numberOfChannels },
          t ? { id: Ge.BitDepth, data: 8 * t.sampleSize } : null,
        ],
      },
    ];
  }
  subtitleSpecificTrackInfo(e) {
    return [];
  }
  maybeCreateTags() {
    let e = [],
      t = (i, o) => {
        e.push({
          id: Ge.SimpleTag,
          data: [
            { id: Ge.TagName, data: new Sc(i) },
            typeof o === "string"
              ? { id: Ge.TagString, data: new Sc(o) }
              : { id: Ge.TagBinary, data: o },
          ],
        });
      },
      r = this.output._metadataTags,
      n = /*@__PURE__*/ new Set();
    for (let { key: i, value: o } of M1(r))
      switch (i) {
        case "title":
          (t("TITLE", o), n.add("TITLE"));
          break;
        case "description":
          (t("DESCRIPTION", o), n.add("DESCRIPTION"));
          break;
        case "artist":
          (t("ARTIST", o), n.add("ARTIST"));
          break;
        case "album":
          (t("ALBUM", o), n.add("ALBUM"));
          break;
        case "albumArtist":
          (t("ALBUM_ARTIST", o), n.add("ALBUM_ARTIST"));
          break;
        case "genre":
          (t("GENRE", o), n.add("GENRE"));
          break;
        case "comment":
          (t("COMMENT", o), n.add("COMMENT"));
          break;
        case "lyrics":
          (t("LYRICS", o), n.add("LYRICS"));
          break;
        case "date":
          (t("DATE", o.toISOString().slice(0, 10)), n.add("DATE"));
          break;
        case "trackNumber":
          {
            let s = r.tracksTotal !== void 0 ? `${o}/${r.tracksTotal}` : o.toString();
            (t("PART_NUMBER", s), n.add("PART_NUMBER"));
          }
          break;
        case "discNumber":
          {
            let s = r.discsTotal !== void 0 ? `${o}/${r.discsTotal}` : o.toString();
            (t("DISC", s), n.add("DISC"));
          }
          break;
        case "tracksTotal":
        case "discsTotal":
          break;
        case "images":
        case "raw":
          break;
        default:
          Rs(i);
      }
    if (r.raw)
      for (let i in r.raw) {
        let o = r.raw[i];
        if (o == null || n.has(i)) continue;
        if (typeof o === "string" || o instanceof Uint8Array) t(i, o);
      }
    if (e.length === 0) return;
    this.tagsElement = {
      id: Ge.Tags,
      data: [
        {
          id: Ge.Tag,
          data: [
            {
              id: Ge.Targets,
              data: [
                { id: Ge.TargetTypeValue, data: 50 },
                { id: Ge.TargetType, data: "MOVIE" },
              ],
            },
            ...e,
          ],
        },
      ],
    };
  }
  maybeCreateAttachments() {
    let e = this.output._metadataTags,
      t = [],
      r = /*@__PURE__*/ new Set(),
      n = e.images ?? [];
    for (let i of n) {
      let o = i.name;
      if (o === void 0)
        o =
          (i.kind === "coverFront" ? "cover" : i.kind === "coverBack" ? "back" : "image") +
          (DN(i.mimeType) ?? "");
      let s;
      while (!0) {
        s = 0n;
        for (let a = 0; a < 8; a++) ((s <<= 8n), (s |= BigInt(Math.floor(Math.random() * 256))));
        if (s !== 0n && !r.has(s)) break;
      }
      (r.add(s),
        t.push({
          id: Ge.AttachedFile,
          data: [
            i.description !== void 0
              ? { id: Ge.FileDescription, data: new Sc(i.description) }
              : null,
            { id: Ge.FileName, data: new Sc(o) },
            { id: Ge.FileMediaType, data: i.mimeType },
            { id: Ge.FileData, data: i.data },
            { id: Ge.FileUID, data: s },
          ],
        }));
    }
    for (let [i, o] of Object.entries(e.raw ?? {})) {
      if (!(o instanceof r_)) continue;
      if (!/^\d+$/.test(i)) continue;
      if (n.find((a) => a.mimeType === o.mimeType && NN(a.data, o.data))) continue;
      t.push({
        id: Ge.AttachedFile,
        data: [
          o.description !== void 0 ? { id: Ge.FileDescription, data: new Sc(o.description) } : null,
          { id: Ge.FileName, data: new Sc(o.name ?? "") },
          { id: Ge.FileMediaType, data: o.mimeType ?? "" },
          { id: Ge.FileData, data: o.data },
          { id: Ge.FileUID, data: BigInt(i) },
        ],
      });
    }
    if (t.length === 0) return;
    this.attachmentsElement = { id: Ge.Attachments, data: t };
  }
  createSegment() {
    (this.createTracks(),
      this.maybeCreateTags(),
      this.maybeCreateAttachments(),
      this.maybeCreateSeekHead(!1));
    let e = {
      id: Ge.Segment,
      size: this.format._options.appendOnly ? -1 : rk,
      data: [
        this.seekHead,
        this.segmentInfo,
        this.tracksElement,
        this.attachmentsElement,
        this.tagsElement,
      ],
    };
    if (((this.segment = e), this.format._options.onSegmentHeader))
      this.writer.startTrackingWrites();
    if ((this.ebmlWriter.writeEBML(e), this.format._options.onSegmentHeader)) {
      let { data: t, start: r } = this.writer.stopTrackingWrites();
      this.format._options.onSegmentHeader(t, r);
    }
  }
  createCues() {
    this.cues = { id: Ge.Cues, data: [] };
  }
  get segmentDataOffset() {
    return (Fe(this.segment), this.ebmlWriter.dataOffsets.get(this.segment));
  }
  allTracksAreKnown() {
    for (let e of this.output.tracks)
      if (!e.source._closed && !this.trackDatas.some((t) => t.track === e)) return !1;
    return !0;
  }
  async getMimeType() {
    await this.allTracksKnown.promise;
    let e = this.trackDatas.map((t) => {
      if (t.type === "video") return t.info.decoderConfig.codec;
      else if (t.type === "audio") return t.info.decoderConfig.codec;
      else return { webvtt: "wvtt" }[t.track.source._codec];
    });
    return _P({
      isWebM: this.format instanceof i0,
      hasVideo: this.trackDatas.some((t) => t.type === "video"),
      hasAudio: this.trackDatas.some((t) => t.type === "audio"),
      codecStrings: e,
    });
  }
  getVideoTrackData(e, t, r) {
    let n = this.trackDatas.find((l) => l.track === e);
    if (n) return n;
    (o_(r),
      Fe(r),
      Fe(r.decoderConfig),
      Fe(r.decoderConfig.codedWidth !== void 0),
      Fe(r.decoderConfig.codedHeight !== void 0));
    let i = r.decoderConfig.displayAspectWidth,
      o = r.decoderConfig.displayAspectHeight,
      s = i === void 0 || o === void 0 ? null : I1({ num: i, den: o }),
      a = {
        track: e,
        type: "video",
        info: {
          width: r.decoderConfig.codedWidth,
          height: r.decoderConfig.codedHeight,
          aspectRatio: s,
          decoderConfig: r.decoderConfig,
          alphaMode: !!t.sideData.alpha,
        },
        chunkQueue: [],
        lastWrittenMsTimestamp: null,
        codecPrivate: r.decoderConfig.description ?? null,
        closed: !1,
      };
    if (e.source._codec === "vp9") a.codecPrivate = new Uint8Array(YN(a.info.decoderConfig.codec));
    else if (e.source._codec === "av1")
      a.codecPrivate = new Uint8Array(i_(a.info.decoderConfig.codec));
    else if (e.source._codec === "prores") a.codecPrivate = Co.encode(r.decoderConfig.codec);
    if (
      (this.trackDatas.push(a),
      this.trackDatas.sort((l, c) => l.track.id - c.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return a;
  }
  getAudioTrackData(e, t, r) {
    let n = this.trackDatas.find((a) => a.track === e);
    if (n) return n;
    (s_(r), Fe(r), Fe(r.decoderConfig));
    let i = { ...r.decoderConfig },
      o = !1;
    if (e.source._codec === "aac" && !i.description) {
      let a = L1(zu.tempFromBytes(t.data));
      if (!a)
        throw Error(
          "Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.",
        );
      let l = g3[a.samplingFrequencyIndex],
        c = A3[a.channelConfiguration];
      if (l === void 0 || c === void 0) throw Error("Invalid ADTS frame header.");
      ((i.description = n_({ objectType: a.objectType, sampleRate: l, numberOfChannels: c })),
        (o = !0));
    }
    let s = {
      track: e,
      type: "audio",
      info: {
        numberOfChannels: r.decoderConfig.numberOfChannels,
        sampleRate: r.decoderConfig.sampleRate,
        decoderConfig: i,
        requiresAdtsStripping: o,
      },
      chunkQueue: [],
      lastWrittenMsTimestamp: null,
      codecPrivate: i.description ?? null,
      closed: !1,
    };
    if (
      (this.trackDatas.push(s),
      this.trackDatas.sort((a, l) => a.track.id - l.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return s;
  }
  getSubtitleTrackData(e, t) {
    let r = this.trackDatas.find((i) => i.track === e);
    if (r) return r;
    (a_(t), Fe(t), Fe(t.config));
    let n = {
      track: e,
      type: "subtitle",
      info: { config: t.config },
      chunkQueue: [],
      lastWrittenMsTimestamp: null,
      codecPrivate: Co.encode(t.config.description),
      closed: !1,
    };
    if (
      (this.trackDatas.push(n),
      this.trackDatas.sort((i, o) => i.track.id - o.track.id),
      this.allTracksAreKnown())
    )
      this.allTracksKnown.resolve();
    return n;
  }
  async addEncodedVideoPacket(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getVideoTrackData(e, t, r),
        o = t.data;
      if (e.source._codec === "prores") {
        if (o.byteLength < 8) throw Error("ProRes packet too small, expected at least 8 bytes.");
        o = o.subarray(8);
      }
      let s = t.type === "key";
      this.validateTimestamp(i.track, t.timestamp, s);
      let { timestamp: a, duration: l } = t;
      if (e.metadata.frameRate !== void 0)
        ((a = e_(a, e.metadata.frameRate)), (l = e_(l, e.metadata.frameRate)));
      let c = i.info.alphaMode ? (t.sideData.alpha ?? null) : null,
        u = this.createInternalChunk(o, a, l, t.type, c);
      if (e.source._codec === "vp9") this.fixVP9ColorSpace(i, u);
      (i.chunkQueue.push(u), await this.interleaveChunks());
    } finally {
      n();
    }
  }
  async addEncodedAudioPacket(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getAudioTrackData(e, t, r),
        o = t.data;
      if (i.info.requiresAdtsStripping) {
        let l = L1(zu.tempFromBytes(o));
        if (!l) throw Error("Expected ADTS frame, didn't get one.");
        let c = l.crcCheck === null ? h_ : f_;
        o = o.subarray(c);
      }
      let s = t.type === "key";
      this.validateTimestamp(i.track, t.timestamp, s);
      let a = this.createInternalChunk(o, t.timestamp, t.duration, t.type);
      (i.chunkQueue.push(a), await this.interleaveChunks());
    } finally {
      n();
    }
  }
  async addSubtitleCue(e, t, r) {
    let n = await this.mutex.acquire();
    try {
      let i = this.getSubtitleTrackData(e, r);
      this.validateTimestamp(i.track, t.timestamp, !0);
      let o = t.text,
        s = Math.round(t.timestamp * 1000);
      ((B1.lastIndex = 0),
        (o = o.replace(B1, (u) => {
          let h = NP(u.slice(1, -1)) - s;
          return `<${A_(h)}>`;
        })));
      let a = Co.encode(o),
        l = `${t.settings ?? ""}
${t.identifier ?? ""}
${t.notes ?? ""}`,
        c = this.createInternalChunk(
          a,
          t.timestamp,
          t.duration,
          "key",
          l.trim() ? Co.encode(l) : null,
        );
      (i.chunkQueue.push(c), await this.interleaveChunks());
    } finally {
      n();
    }
  }
  async interleaveChunks(e = !1) {
    if (!e && !this.allTracksAreKnown()) return;
    e: while (!0) {
      let t = null,
        r = 1 / 0;
      for (let i of this.trackDatas) {
        if (!e && i.chunkQueue.length === 0 && !i.closed) break e;
        if (i.chunkQueue.length > 0 && i.chunkQueue[0].timestamp < r)
          ((t = i), (r = i.chunkQueue[0].timestamp));
      }
      if (!t) break;
      let n = t.chunkQueue.shift();
      this.writeBlock(t, n);
    }
    if (!e) await this.writer.flush();
  }
  fixVP9ColorSpace(e, t) {
    if (t.type !== "key") return;
    if (!e.info.decoderConfig.colorSpace || !e.info.decoderConfig.colorSpace.matrix) return;
    let r = new Ni(t.data);
    r.skipBits(2);
    let n = r.readBits(1),
      o = (r.readBits(1) << 1) + n;
    if (o === 3) r.skipBits(1);
    if (r.readBits(1)) return;
    if (r.readBits(1) !== 0) return;
    if ((r.skipBits(2), r.readBits(24) !== 4817730)) return;
    if (o >= 2) r.skipBits(1);
    let c = { rgb: 7, bt709: 2, bt470bg: 1, smpte170m: 3 }[e.info.decoderConfig.colorSpace.matrix];
    IN(t.data, r.pos, r.pos + 3, c);
  }
  createInternalChunk(e, t, r, n, i = null) {
    return { data: e, type: n, timestamp: t, duration: r, additions: i };
  }
  writeBlock(e, t) {
    if (!this.segment) this.createSegment();
    let r = Math.round(1000 * t.timestamp),
      n = this.trackDatas.every((u) => {
        if (e === u) return t.type === "key";
        let d = u.chunkQueue[0];
        if (d) return d.type === "key";
        return u.closed;
      }),
      i = !1;
    if (!this.currentCluster) i = !0;
    else {
      (Fe(this.currentClusterStartMsTimestamp !== null),
        Fe(this.currentClusterMaxMsTimestamp !== null));
      let u = r - this.currentClusterStartMsTimestamp;
      i =
        (n &&
          r > this.currentClusterMaxMsTimestamp &&
          u >= 1000 * (this.format._options.minimumClusterDuration ?? 1)) ||
        u > sre;
    }
    if (i) this.createNewCluster(r);
    let o = r - this.currentClusterStartMsTimestamp;
    if (o < ore) return;
    let s = new Uint8Array(4),
      a = new DataView(s.buffer);
    (a.setUint8(0, 128 | e.track.id), a.setInt16(1, o, !1));
    let l = Math.round(1000 * t.duration);
    if (!(!!t.additions || e.type === "subtitle")) {
      a.setUint8(3, Number(t.type === "key") << 7);
      let u = { id: Ge.SimpleBlock, data: [s, t.data] };
      this.ebmlWriter.writeEBML(u);
    } else {
      let u = {
        id: Ge.BlockGroup,
        data: [
          { id: Ge.Block, data: [s, t.data] },
          t.type === "delta"
            ? { id: Ge.ReferenceBlock, data: new d_(e.lastWrittenMsTimestamp - r) }
            : null,
          t.additions
            ? {
                id: Ge.BlockAdditions,
                data: [
                  {
                    id: Ge.BlockMore,
                    data: [
                      { id: Ge.BlockAddID, data: 1 },
                      { id: Ge.BlockAdditional, data: t.additions },
                    ],
                  },
                ],
              }
            : null,
          l > 0 ? { id: Ge.BlockDuration, data: l } : null,
        ],
      };
      this.ebmlWriter.writeEBML(u);
    }
    if (
      ((this.startTimestamp = Math.min(this.startTimestamp, r)),
      (this.endTimestamp = Math.max(this.endTimestamp, r + l)),
      (e.lastWrittenMsTimestamp = r),
      !this.trackDatasInCurrentCluster.has(e))
    )
      this.trackDatasInCurrentCluster.set(e, { firstMsTimestamp: r });
    this.currentClusterMaxMsTimestamp = Math.max(this.currentClusterMaxMsTimestamp, r);
  }
  createNewCluster(e) {
    if (this.currentCluster) this.finalizeCurrentCluster();
    if (this.format._options.onCluster) this.writer.startTrackingWrites();
    ((this.currentCluster = {
      id: Ge.Cluster,
      size: this.format._options.appendOnly ? -1 : nk,
      data: [{ id: Ge.Timestamp, data: e }],
    }),
      this.ebmlWriter.writeEBML(this.currentCluster),
      (this.currentClusterStartMsTimestamp = e),
      (this.currentClusterMaxMsTimestamp = e),
      this.trackDatasInCurrentCluster.clear());
  }
  finalizeCurrentCluster() {
    if ((Fe(this.currentCluster), !this.format._options.appendOnly)) {
      let n = this.writer.getPos() - this.ebmlWriter.dataOffsets.get(this.currentCluster),
        i = this.writer.getPos();
      (this.writer.seek(this.ebmlWriter.offsets.get(this.currentCluster) + 4),
        this.ebmlWriter.writeVarInt(n, nk),
        this.writer.seek(i));
    }
    if (this.format._options.onCluster) {
      Fe(this.currentClusterStartMsTimestamp !== null);
      let { data: n, start: i } = this.writer.stopTrackingWrites();
      this.format._options.onCluster(n, i, this.currentClusterStartMsTimestamp / 1000);
    }
    let e = this.ebmlWriter.offsets.get(this.currentCluster) - this.segmentDataOffset,
      t = /*@__PURE__*/ new Map();
    for (let [n, { firstMsTimestamp: i }] of this.trackDatasInCurrentCluster) {
      if (!t.has(i)) t.set(i, []);
      t.get(i).push(n);
    }
    let r = [...t.entries()].sort((n, i) => n[0] - i[0]);
    for (let [n, i] of r)
      (Fe(this.cues),
        this.cues.data.push({
          id: Ge.CuePoint,
          data: [
            { id: Ge.CueTime, data: n },
            ...i.map((o) => ({
              id: Ge.CueTrackPositions,
              data: [
                { id: Ge.CueTrack, data: o.track.id },
                { id: Ge.CueClusterPosition, data: e },
              ],
            })),
          ],
        }));
  }
  async onTrackClose(e) {
    let t = await this.mutex.acquire(),
      r = this.trackDatas.find((n) => n.track === e);
    if (r) r.closed = !0;
    if (this.allTracksAreKnown()) this.allTracksKnown.resolve();
    (await this.interleaveChunks(), t());
  }
  async finalize() {
    let e = await this.mutex.acquire();
    this.allTracksKnown.resolve();
    for (let t of this.trackDatas) t.closed = !0;
    if (!this.segment) this.createSegment();
    if ((await this.interleaveChunks(!0), this.currentCluster)) this.finalizeCurrentCluster();
    if ((Fe(this.cues), this.ebmlWriter.writeEBML(this.cues), !this.format._options.appendOnly)) {
      let t = this.writer.getPos() - this.segmentDataOffset;
      (this.writer.seek(this.ebmlWriter.offsets.get(this.segment) + 4),
        this.ebmlWriter.writeVarInt(t, rk));
      let r = this.startTimestamp === 1 / 0 ? 0 : this.endTimestamp - this.startTimestamp;
      ((this.segmentDuration.data = new v3(r)),
        this.writer.seek(this.ebmlWriter.offsets.get(this.segmentDuration)),
        this.ebmlWriter.writeEBML(this.segmentDuration),
        Fe(this.seekHead),
        this.writer.seek(this.ebmlWriter.offsets.get(this.seekHead)),
        this.maybeCreateSeekHead(!0),
        this.ebmlWriter.writeEBML(this.seekHead));
    }
    e();
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var lre = function (e, t, r) {
    if (t !== null && t !== void 0) {
      if (typeof t !== "object" && typeof t !== "function") throw TypeError("Object expected.");
      var n, i;
      if (r) {
        if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
        n = t[Symbol.asyncDispose];
      }
      if (n === void 0) {
        if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
        if (((n = t[Symbol.dispose]), r)) i = n;
      }
      if (typeof n !== "function") throw TypeError("Object not disposable.");
      if (i)
        n = function () {
          try {
            i.call(this);
          } catch (o) {
            return Promise.reject(o);
          }
        };
      e.stack.push({ value: t, dispose: n, async: r });
    } else if (r) e.stack.push({ async: !0 });
    return t;
  },
  cre = (function (e) {
    return function (t) {
      function r(s) {
        ((t.error = t.hasError ? new e(s, t.error, "An error was suppressed during disposal.") : s),
          (t.hasError = !0));
      }
      var n,
        i = 0;
      function o() {
        while ((n = t.stack.pop()))
          try {
            if (!n.async && i === 1) return ((i = 0), t.stack.push(n), Promise.resolve().then(o));
            if (n.dispose) {
              var s = n.dispose.call(n.value);
              if (n.async)
                return (
                  (i |= 2),
                  Promise.resolve(s).then(o, function (a) {
                    return (r(a), o());
                  })
                );
            } else i |= 1;
          } catch (a) {
            r(a);
          }
        if (i === 1) return t.hasError ? Promise.reject(t.error) : Promise.resolve();
        if (t.hasError) throw t.error;
      }
      return o();
    };
  })(
    typeof SuppressedError === "function"
      ? SuppressedError
      : function (e, t, r) {
          var n = Error(r);
          return ((n.name = "SuppressedError"), (n.error = e), (n.suppressed = t), n);
        },
  );
class I3 {
  constructor() {
    ((this._connectedTrack = null), (this._closingPromise = null), (this._closed = !1));
  }
  _ensureValidAdd() {
    if (!this._connectedTrack) throw Error("Source is not connected to an output track.");
    if (this._connectedTrack.output.state === "canceled") throw Error("Output has been canceled.");
    if (
      this._connectedTrack.output.state === "finalizing" ||
      this._connectedTrack.output.state === "finalized"
    )
      throw Error("Output has been finalized.");
    if (this._connectedTrack.output.state === "pending") throw Error("Output has not started.");
    if (this._closed) throw Error("Source is closed.");
  }
  async _start() {}
  async _flushAndClose(e) {}
  close() {
    if (this._closingPromise) return;
    let e = this._connectedTrack;
    if (!e) throw Error("Cannot call close without connecting the source to an output track.");
    if (e.output.state === "pending")
      throw Error("Cannot call close before output has been started.");
    this._closingPromise = (async () => {
      if (
        (await this._flushAndClose(!1),
        (this._closed = !0),
        e.output.state === "finalizing" || e.output.state === "finalized")
      )
        return;
      e.output._muxer.onTrackClose(e);
    })();
  }
  async _flushOrWaitForOngoingClose(e) {
    return (this._closingPromise ??= (async () => {
      (await this._flushAndClose(e), (this._closed = !0));
    })());
  }
}
class R3 extends I3 {
  constructor(e) {
    super();
    if (((this._connectedTrack = null), !Oa.includes(e)))
      throw TypeError(`Invalid video codec '${e}'. Must be one of: ${Oa.join(", ")}.`);
    this._codec = e;
  }
}
var ik = (e, t) => {
  if (e.metadata.hasOnlyKeyPackets && t.type !== "key")
    throw Error("Cannot add non-key packets to a hasOnlyKeyPackets video track.");
};
class ok {
  setError(e) {
    if (!this.errorSet) ((this.error = e), (this.errorSet = !0));
  }
  constructor(e, t) {
    ((this.source = e),
      (this.encodingConfig = t),
      (this.ensureEncoderPromise = null),
      (this.encoderInitialized = !1),
      (this.encoder = null),
      (this.muxer = null),
      (this.lastMultipleOfKeyFrameInterval = -1),
      (this.emittedEncoderPackets = 0),
      (this.codedWidth = null),
      (this.codedHeight = null),
      (this.outputWidth = null),
      (this.outputHeight = null),
      (this.frameRateLastSample = null),
      (this.frameRateLastTimestamp = null),
      (this.frameRateLastEndTimestamp = null),
      (this.preciseTimings = []),
      (this.customEncoder = null),
      (this.customEncoderCallSerializer = new h6()),
      (this.customEncoderQueueSize = 0),
      (this.defaultEncodeOptions = {}),
      (this.alphaEncoder = null),
      (this.splitter = null),
      (this.splitterCreationFailed = !1),
      (this.alphaFrameQueue = []),
      (this.error = null),
      (this.errorSet = !1),
      (this.lastMuxerPromise = Promise.resolve()),
      (this.closed = !1));
  }
  async add(e, t, r) {
    let n = e;
    try {
      (this.checkForEncoderError(), this.source._ensureValidAdd());
      let i = this.encodingConfig,
        o = i.sizeChangeBehavior ?? "deny",
        s = !1;
      if (this.codedWidth !== null && this.codedHeight !== null) {
        if (e.codedWidth !== this.codedWidth || e.codedHeight !== this.codedHeight) {
          if (((s = !0), o === "deny"))
            throw Error(
              `Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`,
            );
        }
      } else ((this.codedWidth = e.codedWidth), (this.codedHeight = e.codedHeight));
      if (
        i.transform?.width !== void 0 ||
        i.transform?.height !== void 0 ||
        i.transform?.rotate !== void 0 ||
        i.transform?.crop !== void 0 ||
        i.transform?.force === !0 ||
        (s && o !== "passThrough")
      ) {
        let u = i.transform?.width,
          d = i.transform?.height,
          h = i.transform?.fit ?? "fill";
        if (s && o !== "passThrough")
          (Fe(this.outputWidth),
            Fe(this.outputHeight),
            Fe(o !== "deny"),
            (u = this.outputWidth),
            (d = this.outputHeight),
            (h = o));
        let f = await e.transform({
          width: u,
          height: d,
          roundDimensionsTo: 2,
          crop: i.transform?.crop,
          rotate: i.transform?.rotate,
          fit: h,
          alpha: i.alpha,
        });
        if (this.outputWidth === null || this.outputHeight === null)
          ((this.outputWidth = f.displayWidth), (this.outputHeight = f.displayHeight));
        if (t) e.close();
        ((e = f), (t = !0));
      } else if (this.outputWidth === null || this.outputHeight === null)
        ((this.outputWidth = e.codedWidth), (this.outputHeight = e.codedHeight));
      let c = i.transform?.frameRate;
      if (c !== void 0) {
        let u = e.timestamp + e.duration,
          d = d6(e.timestamp, c);
        if (this.frameRateLastSample !== null)
          if (d <= this.frameRateLastTimestamp) {
            (this.frameRateLastSample.close(),
              (this.frameRateLastSample = e.clone()),
              (this.frameRateLastEndTimestamp = u));
            return;
          } else await this.padFrameRate(d, r);
        if (e === n) ((e = e.clone()), (t = !0));
        (e.setTimestamp(d),
          e.setDuration(1 / c),
          this.frameRateLastSample?.close(),
          (this.frameRateLastSample = e.clone()),
          (this.frameRateLastTimestamp = d),
          (this.frameRateLastEndTimestamp = u));
      }
      await this.processAndEncode(e, r);
    } finally {
      if (t) e.close();
    }
  }
  async processAndEncode(e, t) {
    let r = this.encodingConfig,
      n;
    if (r.transform?.process) {
      let i = r.transform.process(e);
      if (i instanceof Promise) i = await i;
      if (i === null) return;
      if (!Array.isArray(i)) i = [i];
      let o = [];
      try {
        for (let s of i)
          if (s instanceof na) o.push(s);
          else if (typeof VideoFrame < "u" && s instanceof VideoFrame) o.push(new na(s));
          else o.push(new na(s, { timestamp: e.timestamp, duration: e.duration }));
      } catch (s) {
        for (let a of o) if (a !== e) a.close();
        for (let a of i)
          if (a instanceof na && a !== e) a.close();
          else if (typeof VideoFrame < "u" && a instanceof VideoFrame) a.close();
        throw s;
      }
      n = o;
    } else n = [e];
    try {
      for (let i of n) {
        if (!this.encoderInitialized) {
          if (!this.ensureEncoderPromise) this.ensureEncoder(i);
          if (!this.encoderInitialized) await this.ensureEncoderPromise;
        }
        if ((Fe(this.encoderInitialized), this.closed)) break;
        let o = this.encodingConfig.keyFrameInterval ?? 2,
          s = Math.floor(i.timestamp / o),
          a = { ...this.defaultEncodeOptions, ...i.encodeOptions, ...t },
          l = {
            ...a,
            keyFrame:
              a.keyFrame !== void 0
                ? a.keyFrame
                : o === 0 || s !== this.lastMultipleOfKeyFrameInterval,
          };
        if (
          ((this.lastMultipleOfKeyFrameInterval = s),
          this.encodingConfig.onEncodedSample?.(i),
          this.customEncoder)
        ) {
          this.customEncoderQueueSize++;
          let c = i.clone(),
            u = this.customEncoderCallSerializer
              .call(() => this.customEncoder.encode(c, l))
              .catch((d) => this.setError(d))
              .finally(() => {
                (this.customEncoderQueueSize--, c.close());
              });
          if (this.customEncoderQueueSize >= 4) await u;
        } else {
          Fe(this.encoder);
          let c = i.toVideoFrame(),
            u = a6(this.preciseTimings, c.timestamp, (h) => h.microsecondTimestamp),
            d = u !== -1 ? this.preciseTimings[u] : null;
          if (d && d.microsecondTimestamp === c.timestamp) {
            if (d.timestamp !== i.timestamp) d.timestampIsValid = !1;
            if (d.duration !== i.duration) d.durationIsValid = !1;
          } else if (
            (this.preciseTimings.splice(u + 1, 0, {
              microsecondTimestamp: c.timestamp,
              timestamp: i.timestamp,
              duration: i.duration,
              timestampIsValid: !0,
              durationIsValid: !0,
            }),
            this.preciseTimings.length > 128)
          )
            this.preciseTimings.shift();
          if (!this.alphaEncoder)
            try {
              this.encoder.encode(c, l);
            } finally {
              c.close();
            }
          else if ((!!c.format && !c.format.includes("A")) || this.splitterCreationFailed) {
            this.alphaFrameQueue.push(null);
            try {
              this.encoder.encode(c, l);
            } finally {
              c.close();
            }
          } else {
            if (!this.splitter) this.splitter = new sk();
            let { colorFrame: f, alphaFrame: p } = await this.splitter.split(c);
            this.alphaFrameQueue.push(p);
            try {
              this.encoder.encode(f, l);
            } finally {
              f.close();
            }
          }
          if (this.encoder.encodeQueueSize >= 4)
            await new Promise((h) => this.encoder.addEventListener("dequeue", h, { once: !0 }));
        }
        await this.lastMuxerPromise;
      }
    } finally {
      for (let i of n) if (i !== e) i.close();
    }
  }
  async padFrameRate(e, t) {
    let r = this.encodingConfig.transform.frameRate;
    Fe(this.frameRateLastSample);
    let n = Math.round((e - this.frameRateLastTimestamp) * r);
    for (let i = 1; i < n; i++) {
      let o = { stack: [], error: void 0, hasError: !1 };
      try {
        let s = lre(o, this.frameRateLastSample.clone(), !1);
        (s.setTimestamp(this.frameRateLastTimestamp + i / r),
          s.setDuration(1 / r),
          await this.processAndEncode(s, t));
      } catch (s) {
        ((o.error = s), (o.hasError = !0));
      } finally {
        cre(o);
      }
    }
  }
  ensureEncoder(e) {
    this.ensureEncoderPromise = (async () => {
      let t = FP(this.encodingConfig.quality, this.encodingConfig.bitrate);
      Fe(t !== void 0);
      let r = LP({
          ...this.encodingConfig,
          quality: t,
          width: e.codedWidth,
          height: e.codedHeight,
          squarePixelWidth: e.squarePixelWidth,
          squarePixelHeight: e.squarePixelHeight,
          framerate: this.source._connectedTrack?.metadata.frameRate,
        }),
        n = null,
        i;
      for (let s of r) {
        let a = s.config;
        if (
          (this.encodingConfig.onEncoderConfig?.(a),
          (i = DP.find((u) => u.supports(this.encodingConfig.codec, a))),
          i)
        ) {
          n = s;
          break;
        }
        if (typeof VideoEncoder > "u") continue;
        if (((a.alpha = "discard"), this.encodingConfig.alpha === "keep"))
          a.latencyMode = "quality";
        if (
          (a.width % 2 === 1 || a.height % 2 === 1) &&
          (this.encodingConfig.codec === "avc" || this.encodingConfig.codec === "hevc")
        )
          throw Error(
            `The dimensions ${a.width}x${a.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`,
          );
        if ((await VideoEncoder.isConfigSupported(a)).supported) {
          n = s;
          break;
        }
      }
      if (!n) {
        if (typeof VideoEncoder > "u")
          throw Error("VideoEncoder is not supported by this browser.");
        let s = r[0].config,
          a = r.map(({ config: l, quantizer: c }) =>
            c !== null ? `quantizer ${c}` : `${l.bitrate} bps`,
          );
        throw Error(
          `This specific encoder configuration (${s.codec}, ${a.join(" / ")}, ${s.width}x${s.height}, hardware acceleration: ${s.hardwareAcceleration ?? "no-preference"}) is not supported by this browser. Consider using another codec or changing your video parameters.`,
        );
      }
      let o = n.config;
      if (n.quantizer !== null)
        this.defaultEncodeOptions = BP(this.encodingConfig.codec, n.quantizer);
      if (i)
        ((this.customEncoder = new i()),
          (this.customEncoder.codec = this.encodingConfig.codec),
          (this.customEncoder.config = o),
          (this.customEncoder.onPacket = (s, a) => {
            if (!(s instanceof O1))
              throw TypeError("The first argument passed to onPacket must be an EncodedPacket.");
            if (a !== void 0 && (!a || typeof a !== "object"))
              throw TypeError(
                "The second argument passed to onPacket must be an object or undefined.",
              );
            (ik(this.source._connectedTrack, s),
              this.encodingConfig.onEncodedPacket?.(s, a),
              (this.lastMuxerPromise = this.muxer
                .addEncodedVideoPacket(this.source._connectedTrack, s, a)
                .catch((l) => {
                  this.setError(l);
                })));
          }),
          (this.customEncoder.onError = (s) => {
            this.setError(s);
          }),
          await this.customEncoder.init());
      else {
        let s = [],
          a = [],
          l = 0,
          c = 0,
          u = (h, f, p) => {
            let g = {};
            if (f) {
              let b = new Uint8Array(f.byteLength);
              (f.copyTo(b), (g.alpha = b));
            }
            let m = O1.fromEncodedChunk(h, g),
              A = a6(this.preciseTimings, h.timestamp, (b) => b.microsecondTimestamp),
              y = A !== -1 ? this.preciseTimings[A] : null,
              x = null;
            if (this.emittedEncoderPackets === 0 && m.type === "delta" && p?.decoderConfig)
              x = hP(this.encodingConfig.codec, p.decoderConfig, m.data);
            if ((y && y.microsecondTimestamp === h.timestamp) || x !== null)
              m = m.clone({
                timestamp: y?.timestampIsValid ? y.timestamp : void 0,
                duration: y?.durationIsValid ? y.duration : void 0,
                type: x ?? void 0,
              });
            (ik(this.source._connectedTrack, m),
              this.encodingConfig.onEncodedPacket?.(m, p),
              (this.lastMuxerPromise = this.muxer
                .addEncodedVideoPacket(this.source._connectedTrack, m, p)
                .catch((b) => {
                  this.setError(b);
                })),
              this.emittedEncoderPackets++);
          },
          d = Error("Encoding error").stack;
        if (
          ((this.encoder = new VideoEncoder({
            output: (h, f) => {
              if (!this.alphaEncoder) {
                u(h, null, f);
                return;
              }
              let p = this.alphaFrameQueue.shift();
              if ((Fe(p !== void 0), p))
                (this.alphaEncoder.encode(p, {
                  ...this.defaultEncodeOptions,
                  keyFrame: h.type === "key",
                }),
                  c++,
                  p.close(),
                  s.push({ chunk: h, meta: f }));
              else if (c === 0) u(h, null, f);
              else (a.push(l + c), s.push({ chunk: h, meta: f }));
            },
            error: (h) => {
              ((h.stack = d), this.setError(h));
            },
          })),
          this.encoder.configure(o),
          this.encodingConfig.alpha === "keep")
        ) {
          let h = Error("Encoding error").stack;
          ((this.alphaEncoder = new VideoEncoder({
            output: (f, p) => {
              c--;
              let g = s.shift();
              (Fe(g !== void 0), u(g.chunk, f, g.meta), l++);
              while (a.length > 0 && a[0] === l) {
                a.shift();
                let m = s.shift();
                (Fe(m !== void 0), u(m.chunk, null, m.meta));
              }
            },
            error: (f) => {
              ((f.stack = h), this.setError(f));
            },
          })),
            this.alphaEncoder.configure(o));
        }
      }
      (Fe(this.source._connectedTrack),
        (this.muxer = this.source._connectedTrack.output._muxer),
        (this.encoderInitialized = !0));
    })();
  }
  async flushAndClose(e) {
    try {
      if (!e) {
        if ((this.checkForEncoderError(), this.frameRateLastSample)) {
          let t = this.encodingConfig.transform.frameRate,
            r = d6(this.frameRateLastEndTimestamp, t);
          await this.padFrameRate(r);
        }
      }
      if (((this.closed = !0), !e)) {
        if (this.customEncoder)
          this.customEncoderCallSerializer.call(() => this.customEncoder.flush());
        else if (this.encoder)
          (await this.encoder.flush(), await this.alphaEncoder?.flush(), await UN(25));
      }
    } finally {
      if (
        ((this.closed = !0),
        this.frameRateLastSample?.close(),
        (this.frameRateLastSample = null),
        this.customEncoder)
      )
        await this.customEncoderCallSerializer
          .call(() => this.customEncoder.close())
          .catch((t) => this.setError(t));
      else if (this.encoder) {
        if (this.encoder.state !== "closed") this.encoder.close();
        if (this.alphaEncoder && this.alphaEncoder.state !== "closed") this.alphaEncoder.close();
        (this.alphaFrameQueue.forEach((t) => t?.close()),
          (this.alphaFrameQueue.length = 0),
          this.splitter?.close());
      }
    }
    if (!e) this.checkForEncoderError();
  }
  getQueueSize() {
    if (this.customEncoder) return this.customEncoderQueueSize;
    else return this.encoder?.encodeQueueSize ?? 0;
  }
  checkForEncoderError() {
    if (this.errorSet) throw this.error;
  }
}
var N6 = null;
class sk {
  constructor() {
    ((this.worker = null),
      (this.pendingRequests = /*@__PURE__*/ new Map()),
      (this.nextRequestId = 0));
  }
  split(e) {
    if (!this.worker) {
      if (!N6) {
        let n = new Blob([`(${ure.toString()})()`], { type: "application/javascript" });
        N6 = URL.createObjectURL(n);
      }
      ((this.worker = new Worker(N6)),
        this.worker.addEventListener("message", (n) => {
          let i = n.data,
            o = this.pendingRequests.get(i.id);
          if (!o) return;
          if ((this.pendingRequests.delete(i.id), "error" in i)) o.reject(Error(i.error));
          else o.resolve({ colorFrame: i.colorFrame, alphaFrame: i.alphaFrame });
        }),
        this.worker.addEventListener("error", (n) => {
          let i = Error(n.message || "Color/alpha splitter worker error.");
          for (let o of this.pendingRequests.values()) o.reject(i);
          this.pendingRequests.clear();
        }));
    }
    let t = this.nextRequestId++,
      r = E1();
    return (
      this.pendingRequests.set(t, r),
      this.worker.postMessage({ id: t, sourceFrame: e }, { transfer: [e] }),
      r.promise
    );
  }
  close() {
    (this.worker?.terminate(), (this.worker = null));
    let e = Error("Color/alpha splitter closed.");
    for (let t of this.pendingRequests.values()) t.reject(e);
    this.pendingRequests.clear();
  }
}
var ure = () => {
  let e = null,
    t = Promise.resolve();
  self.addEventListener("message", (o) => {
    let { id: s, sourceFrame: a } = o.data;
    t = t.then(async () => {
      try {
        let { colorFrame: l, alphaFrame: c } = await r(a);
        self.postMessage({ id: s, colorFrame: l, alphaFrame: c }, { transfer: [l, c] });
      } catch (l) {
        self.postMessage({ id: s, error: l.message });
      } finally {
        a.close();
      }
    });
  });
  let r = async (o) => {
      let s = o.format;
      if (!s) throw Error("CPU color/alpha splitting requires a known VideoFrame format.");
      let a = o.allocationSize();
      if (!e || e.byteLength !== a) e = new Uint8Array(a);
      if ((await o.copyTo(e), s === "RGBA" || s === "BGRA")) return n(e, s, o);
      else if (
        s === "I420A" ||
        s === "I420AP10" ||
        s === "I420AP12" ||
        s === "I422A" ||
        s === "I422AP10" ||
        s === "I422AP12" ||
        s === "I444A" ||
        s === "I444AP10" ||
        s === "I444AP12"
      )
        return i(e, s, o);
      throw Error(`CPU color/alpha splitting does not support format '${s}'.`);
    },
    n = (o, s, a) => {
      let l = a.visibleRect?.width ?? a.codedWidth,
        c = a.visibleRect?.height ?? a.codedHeight,
        u = l * c,
        d = Math.ceil(l / 2),
        h = Math.ceil(c / 2),
        f = u + d * h * 2,
        p = new Uint8Array(f);
      for (let y = 0, x = 3; y < u; y++, x += 4) p[y] = o[x];
      p.fill(128, u);
      let g = new VideoFrame(o, {
          format: s === "RGBA" ? "RGBX" : "BGRX",
          codedWidth: l,
          codedHeight: c,
          timestamp: a.timestamp,
          duration: a.duration ?? void 0,
        }),
        m = {
          format: "I420",
          codedWidth: l,
          codedHeight: c,
          timestamp: a.timestamp,
          duration: a.duration ?? void 0,
          transfer: [p.buffer],
        },
        A = new VideoFrame(p, m);
      return { colorFrame: g, alphaFrame: A };
    },
    i = (o, s, a) => {
      let l = a.visibleRect?.width ?? a.codedWidth,
        c = a.visibleRect?.height ?? a.codedHeight,
        u = s.includes("P10"),
        d = s.includes("P12"),
        h = u || d ? 2 : 1,
        f,
        p;
      if (s.startsWith("I420")) ((f = Math.ceil(l / 2)), (p = Math.ceil(c / 2)));
      else if (s.startsWith("I422")) ((f = Math.ceil(l / 2)), (p = c));
      else ((f = l), (p = c));
      let g = l * c,
        m = f * p,
        A = g * h,
        y = m * h,
        x = g * h,
        b = A + y * 2,
        v = s.replace("A", ""),
        _ = Math.ceil(l / 2),
        w = Math.ceil(c / 2),
        S = _ * w,
        E = S * h,
        T = x + 2 * E,
        M = new Uint8Array(T),
        C = b;
      M.set(o.subarray(C, C + x), 0);
      let R = x,
        B = u ? 512 : d ? 2048 : 128;
      if (h === 1) M.fill(B, R);
      else new Uint16Array(M.buffer, R, 2 * S).fill(B);
      let L = u ? "I420P10" : d ? "I420P12" : "I420",
        k = new VideoFrame(o.subarray(0, b), {
          format: v,
          codedWidth: l,
          codedHeight: c,
          timestamp: a.timestamp,
          duration: a.duration ?? void 0,
        }),
        z = {
          format: L,
          codedWidth: l,
          codedHeight: c,
          timestamp: a.timestamp,
          duration: a.duration ?? void 0,
          transfer: [M.buffer],
        },
        X = new VideoFrame(M, z);
      return { colorFrame: k, alphaFrame: X };
    };
};
class x_ extends R3 {
  constructor(e, t) {
    if (
      !(typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) &&
      !(typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
    )
      throw TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");
    OP(t);
    super(t.codec);
    ((this._encoder = new ok(this, t)), (this._canvas = e));
  }
  add(e, t = 0, r) {
    if (!Number.isFinite(e) || e < 0) throw TypeError("timestamp must be a non-negative number.");
    if (!Number.isFinite(t) || t < 0) throw TypeError("duration must be a non-negative number.");
    let n = new na(this._canvas, { timestamp: e, duration: t });
    return this._encoder.add(n, !0, r);
  }
  _flushAndClose(e) {
    return this._encoder.flushAndClose(e);
  }
}
class b_ extends I3 {
  constructor(e) {
    super();
    if (((this._connectedTrack = null), !nh.includes(e)))
      throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${nh.join(", ")}.`);
    this._codec = e;
  }
}
class __ extends I3 {
  constructor(e) {
    super();
    if (((this._connectedTrack = null), !Ec.includes(e)))
      throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${Ec.join(", ")}.`);
    this._codec = e;
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ class k1 {
  getSupportedVideoCodecs() {
    return this.getSupportedCodecs().filter((e) => Oa.includes(e));
  }
  getSupportedAudioCodecs() {
    return this.getSupportedCodecs().filter((e) => nh.includes(e));
  }
  getSupportedSubtitleCodecs() {
    return this.getSupportedCodecs().filter((e) => Ec.includes(e));
  }
  _codecUnsupportedHint(e) {
    return "";
  }
}
class O3 extends k1 {
  constructor(e = {}) {
    if (!e || typeof e !== "object") throw TypeError("options must be an object.");
    if (e.fastStart !== void 0 && ![!1, "in-memory", "reserve", "fragmented"].includes(e.fastStart))
      throw TypeError(
        "options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.",
      );
    if (
      e.minimumFragmentDuration !== void 0 &&
      (!Number.isFinite(e.minimumFragmentDuration) || e.minimumFragmentDuration < 0)
    )
      throw TypeError(
        "options.minimumFragmentDuration, when provided, must be a non-negative number.",
      );
    if (e.onFtyp !== void 0 && typeof e.onFtyp !== "function")
      throw TypeError("options.onFtyp, when provided, must be a function.");
    if (e.onMoov !== void 0 && typeof e.onMoov !== "function")
      throw TypeError("options.onMoov, when provided, must be a function.");
    if (e.onMdat !== void 0 && typeof e.onMdat !== "function")
      throw TypeError("options.onMdat, when provided, must be a function.");
    if (e.onMoof !== void 0 && typeof e.onMoof !== "function")
      throw TypeError("options.onMoof, when provided, must be a function.");
    if (e.metadataFormat !== void 0 && !["mdir", "mdta", "udta", "auto"].includes(e.metadataFormat))
      throw TypeError(
        "options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.",
      );
    super();
    this._options = e;
  }
  getSupportedTrackCounts() {
    return {
      video: { min: 0, max: 4294967295 },
      audio: { min: 0, max: 4294967295 },
      subtitle: { min: 0, max: 4294967295 },
      total: { min: 1, max: 4294967295 },
    };
  }
  get supportsVideoRotationMetadata() {
    return !0;
  }
  get supportsTimestampedMediaData() {
    return !0;
  }
  _createMuxer(e) {
    return new F6(e, this);
  }
}
class L3 extends O3 {
  constructor(e) {
    super(e);
  }
  get _name() {
    return "MP4";
  }
  get fileExtension() {
    return ".mp4";
  }
  get mimeType() {
    return "video/mp4";
  }
  getSupportedCodecs() {
    return [
      ...Oa,
      ...b3,
      "pcm-s16",
      "pcm-s16be",
      "pcm-s24",
      "pcm-s24be",
      "pcm-s32",
      "pcm-s32be",
      "pcm-f32",
      "pcm-f32be",
      "pcm-f64",
      "pcm-f64be",
      ...Ec,
    ];
  }
  _codecUnsupportedHint(e) {
    if (new M3().getSupportedCodecs().includes(e))
      return " Switching to MOV will grant support for this codec.";
    return "";
  }
}
class S3 extends O3 {
  constructor(e) {
    super(e);
  }
  get _name() {
    return "CMAF";
  }
  get fileExtension() {
    return ".m4s";
  }
  get mimeType() {
    return "video/mp4";
  }
  getSupportedCodecs() {
    return [
      ...Oa,
      ...b3,
      "pcm-s16",
      "pcm-s16be",
      "pcm-s24",
      "pcm-s24be",
      "pcm-s32",
      "pcm-s32be",
      "pcm-f32",
      "pcm-f32be",
      "pcm-f64",
      "pcm-f64be",
      ...Ec,
    ];
  }
}
class M3 extends O3 {
  constructor(e) {
    super(e);
  }
  get _name() {
    return "MOV";
  }
  get fileExtension() {
    return ".mov";
  }
  get mimeType() {
    return "video/quicktime";
  }
  getSupportedCodecs() {
    return [...Oa, ...nh];
  }
  _codecUnsupportedHint(e) {
    if (new L3().getSupportedCodecs().includes(e))
      return " Switching to MP4 will grant support for this codec.";
    return "";
  }
}
class v_ extends k1 {
  constructor(e = {}) {
    if (!e || typeof e !== "object") throw TypeError("options must be an object.");
    if (e.appendOnly !== void 0 && typeof e.appendOnly !== "boolean")
      throw TypeError("options.appendOnly, when provided, must be a boolean.");
    if (
      e.minimumClusterDuration !== void 0 &&
      (!Number.isFinite(e.minimumClusterDuration) || e.minimumClusterDuration < 0)
    )
      throw TypeError(
        "options.minimumClusterDuration, when provided, must be a non-negative number.",
      );
    if (e.onEbmlHeader !== void 0 && typeof e.onEbmlHeader !== "function")
      throw TypeError("options.onEbmlHeader, when provided, must be a function.");
    if (e.onSegmentHeader !== void 0 && typeof e.onSegmentHeader !== "function")
      throw TypeError("options.onHeader, when provided, must be a function.");
    if (e.onCluster !== void 0 && typeof e.onCluster !== "function")
      throw TypeError("options.onCluster, when provided, must be a function.");
    super();
    this._options = e;
  }
  _createMuxer(e) {
    return new D6(e, this);
  }
  get _name() {
    return "Matroska";
  }
  getSupportedTrackCounts() {
    return {
      video: { min: 0, max: 127 },
      audio: { min: 0, max: 127 },
      subtitle: { min: 0, max: 127 },
      total: { min: 1, max: 127 },
    };
  }
  get fileExtension() {
    return ".mkv";
  }
  get mimeType() {
    return "video/x-matroska";
  }
  getSupportedCodecs() {
    return [
      ...Oa,
      ...b3,
      ...Os.filter((e) => !["pcm-s8", "pcm-f32be", "pcm-f64be", "ulaw", "alaw"].includes(e)),
      ...Ec,
    ];
  }
  get supportsVideoRotationMetadata() {
    return !1;
  }
  get supportsTimestampedMediaData() {
    return !0;
  }
}
class i0 extends v_ {
  constructor(e) {
    super(e);
  }
  getSupportedCodecs() {
    return [
      ...Oa.filter((e) => ["vp8", "vp9", "av1"].includes(e)),
      ...nh.filter((e) => ["opus", "vorbis"].includes(e)),
      ...Ec,
    ];
  }
  get _name() {
    return "WebM";
  }
  get fileExtension() {
    return ".webm";
  }
  get mimeType() {
    return "video/webm";
  }
  _codecUnsupportedHint(e) {
    if (new v_().getSupportedCodecs().includes(e))
      return " Switching to MKV will grant support for this codec.";
    return "";
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var ak = ["video", "audio", "subtitle"];
class H1 {
  constructor(e, t, r, n, i) {
    ((this.id = e), (this.output = t), (this.type = r), (this.source = n), (this.metadata = i));
  }
  isVideoTrack() {
    return this.type === "video";
  }
  isAudioTrack() {
    return this.type === "audio";
  }
  isSubtitleTrack() {
    return this.type === "subtitle";
  }
  canBePairedWith(e) {
    if (!(e instanceof H1)) throw TypeError("other must be an OutputTrack.");
    if (this === e) return !1;
    let t = m6(this.metadata.group),
      r = m6(e.metadata.group);
    for (let n of t) {
      if (this.type !== e.type && r.some((s) => n === s)) return !0;
      if (r.some((s) => n._pairedGroups.has(s))) return !0;
    }
    return !1;
  }
}
class k6 extends H1 {
  constructor(e, t, r, n) {
    super(e, t, "video", r, n);
  }
}
class U6 extends H1 {
  constructor(e, t, r, n) {
    super(e, t, "audio", r, n);
  }
}
class H6 extends H1 {
  constructor(e, t, r, n) {
    super(e, t, "subtitle", r, n);
  }
}
class U1 {
  constructor() {
    this._pairedGroups = /*@__PURE__*/ new Set();
  }
  pairWith(e) {
    if (!(e instanceof U1)) throw TypeError("other must be an OutputTrackGroup.");
    if (this === e) throw TypeError("Cannot pair a group with itself.");
    (this._pairedGroups.add(e), e._pairedGroups.add(this));
  }
}
var P6 = (e) => {
  if (!e || typeof e !== "object") throw TypeError("metadata must be an object.");
  if (e.languageCode !== void 0 && !ON(e.languageCode))
    throw TypeError(
      "metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.",
    );
  if (e.name !== void 0 && typeof e.name !== "string")
    throw TypeError("metadata.name, when provided, must be a string.");
  if (e.disposition !== void 0) zN(e.disposition);
  if (
    e.maximumPacketCount !== void 0 &&
    (!Number.isInteger(e.maximumPacketCount) || e.maximumPacketCount < 0)
  )
    throw TypeError("metadata.maximumPacketCount, when provided, must be a non-negative integer.");
  if (
    e.group !== void 0 &&
    !(e.group instanceof U1) &&
    (!Array.isArray(e.group) || e.group.some((t) => !(t instanceof U1)))
  )
    throw TypeError(
      "metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.",
    );
};
class C_ extends n0 {
  get target() {
    let e =
      "Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.";
    if (this._rootTargetPromise) throw TypeError(e);
    let t = this._getRootTarget();
    if (t instanceof Promise) throw TypeError(e);
    return t;
  }
  constructor(e) {
    super();
    if (
      ((this.state = "pending"),
      (this.defaultTrackGroup = new U1()),
      (this.tracks = []),
      (this._onFinalize = null),
      (this._unfinalizedTargets = /*@__PURE__*/ new Set()),
      (this._rootWriterPromise = null),
      (this._startPromise = null),
      (this._cancelPromise = null),
      (this._finalizePromise = null),
      (this._mutex = new m3()),
      (this._metadataTags = {}),
      (this._rootTarget = null),
      (this._rootTargetPromise = null),
      (this._firstMediaStreamTimestamp = null),
      !e || typeof e !== "object")
    )
      throw TypeError("options must be an object.");
    if (!(e.format instanceof k1)) throw TypeError("options.format must be an OutputFormat.");
    if (!(e.target instanceof fl || e.target instanceof P1))
      throw TypeError("options.target must be a Target or a PathedTarget.");
    if (e.target instanceof fl) this._rememberTarget(e.target);
    if (
      e.initTarget !== void 0 &&
      !(e.initTarget instanceof fl) &&
      typeof e.initTarget !== "function"
    )
      throw Error(
        "options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.",
      );
    if (e.onFinalize !== void 0 && typeof e.onFinalize !== "function")
      throw TypeError("options.onFinalize, when provided, must be a function.");
    if (
      ((this.format = e.format),
      (this._target = e.target),
      (this._onFinalize = e.onFinalize ?? null),
      (this._initTarget = e.initTarget ?? null),
      this._initTarget instanceof fl)
    )
      this._rememberTarget(this._initTarget);
    this._muxer = e.format._createMuxer(this);
  }
  _getTargetValidated(e) {
    Fe(this._target instanceof P1);
    let t = this._target.getTarget(e),
      r = (n) => {
        if (!(n instanceof fl)) throw TypeError("getTarget must return a Target.");
        return n;
      };
    if (t instanceof Promise) return t.then(r);
    else return r(t);
  }
  async _getTarget(e) {
    Fe(this._target instanceof P1);
    let t = await this._getTargetValidated(e);
    if (
      (this._emit("target", { target: t, request: e, isRoot: e.isRoot }), this.state === "canceled")
    )
      await t._close();
    else this._rememberTarget(t);
    return t;
  }
  _rememberTarget(e) {
    (this._unfinalizedTargets.add(e),
      e.on("finalized", () => this._unfinalizedTargets.delete(e), { once: !0 }));
  }
  async _getInitTarget() {
    if ((Fe(this._initTarget !== null), this._initTarget instanceof fl)) return this._initTarget;
    let e = await this._initTarget();
    if (this.state === "canceled") await e._close();
    else this._rememberTarget(e);
    return e;
  }
  _hasInitTarget() {
    return this._initTarget !== null;
  }
  _getRootTarget() {
    if (this._rootTarget) return this._rootTarget;
    if (this._rootTargetPromise) return this._rootTargetPromise;
    if (this._target instanceof fl)
      return (
        this._emit("target", { target: this._target, request: null, isRoot: !0 }),
        (this._rootTarget = this._target),
        this._target
      );
    let e = { path: this._target.rootPath, isRoot: !0, mimeType: this.format.mimeType },
      t = this._getTargetValidated(e),
      r = (n) => {
        if (this.state === "canceled") n._close();
        else this._rememberTarget(n);
        return (
          this._emit("target", { target: n, request: e, isRoot: !0 }),
          (this._rootTarget = n),
          n
        );
      };
    if (t instanceof Promise) return (this._rootTargetPromise = t.then(r));
    else return r(t);
  }
  _getRootWriter(e) {
    return (this._rootWriterPromise ??= (async () => {
      let t = await this._getRootTarget(),
        r = new N1(t, typeof e === "boolean" ? e : e(t));
      return (r.start(), r);
    })());
  }
  addVideoTrack(e, t = {}) {
    if (!(e instanceof R3)) throw TypeError("source must be a VideoSource.");
    if ((P6(t), t.rotation !== void 0 && ![0, 90, 180, 270].includes(t.rotation)))
      throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);
    if (!this.format.supportsVideoRotationMetadata && t.rotation)
      throw Error(`${this.format._name} does not support video rotation metadata.`);
    if (t.frameRate !== void 0 && (!Number.isFinite(t.frameRate) || t.frameRate <= 0))
      throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);
    let r = { ...t };
    return (
      (r.group ??= this.defaultTrackGroup),
      this._addTrack(new k6(this.tracks.length + 1, this, e, r))
    );
  }
  addAudioTrack(e, t = {}) {
    if (!(e instanceof b_)) throw TypeError("source must be an AudioSource.");
    P6(t);
    let r = { ...t };
    return (
      (r.group ??= this.defaultTrackGroup),
      this._addTrack(new U6(this.tracks.length + 1, this, e, r))
    );
  }
  addSubtitleTrack(e, t = {}) {
    if (!(e instanceof __)) throw TypeError("source must be a SubtitleSource.");
    P6(t);
    let r = { ...t };
    return (
      (r.group ??= this.defaultTrackGroup),
      this._addTrack(new H6(this.tracks.length + 1, this, e, r))
    );
  }
  setMetadataTags(e) {
    if ((GN(e), this.state !== "pending"))
      throw Error("Cannot set metadata tags after output has been started or canceled.");
    this._metadataTags = e;
  }
  _addTrack(e) {
    if (this.state !== "pending")
      throw Error("Cannot add track after output has been started or canceled.");
    if (e.source._connectedTrack) throw Error("Source is already used for a track.");
    let t = this.format.getSupportedTrackCounts(),
      r = this.tracks.reduce((o, s) => o + (s.type === e.type ? 1 : 0), 0),
      n = t[e.type].max;
    if (r === n)
      throw Error(
        n === 0
          ? `${this.format._name} does not support ${e.type} tracks.`
          : `${this.format._name} does not support more than ${n} ${e.type} track${n === 1 ? "" : "s"}.`,
      );
    let i = t.total.max;
    if (this.tracks.length === i)
      throw Error(
        `${this.format._name} does not support more than ${i} tracks${i === 1 ? "" : "s"} in total.`,
      );
    if (e.isVideoTrack()) {
      let o = this.format.getSupportedVideoCodecs();
      if (o.length === 0)
        throw Error(
          `${this.format._name} does not support video tracks.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
      else if (!o.includes(e.source._codec))
        throw Error(
          `Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${o.map((s) => `'${s}'`).join(", ")}.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
    } else if (e.isAudioTrack()) {
      let o = this.format.getSupportedAudioCodecs();
      if (o.length === 0)
        throw Error(
          `${this.format._name} does not support audio tracks.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
      else if (!o.includes(e.source._codec))
        throw Error(
          `Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${o.map((s) => `'${s}'`).join(", ")}.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
    } else if (e.isSubtitleTrack()) {
      let o = this.format.getSupportedSubtitleCodecs();
      if (o.length === 0)
        throw Error(
          `${this.format._name} does not support subtitle tracks.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
      else if (!o.includes(e.source._codec))
        throw Error(
          `Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${o.map((s) => `'${s}'`).join(", ")}.` +
            this.format._codecUnsupportedHint(e.source._codec),
        );
    }
    return (this.tracks.push(e), (e.source._connectedTrack = e), e);
  }
  hasEnoughTracks() {
    let e = this.format.getSupportedTrackCounts();
    for (let r of ak) {
      let n = this.tracks.reduce((o, s) => o + (s.type === r ? 1 : 0), 0),
        i = e[r].min;
      if (n < i) return !1;
    }
    let t = e.total.min;
    if (this.tracks.length < t) return !1;
    return !0;
  }
  async start() {
    let e = this.format.getSupportedTrackCounts();
    for (let r of ak) {
      let n = this.tracks.reduce((o, s) => o + (s.type === r ? 1 : 0), 0),
        i = e[r].min;
      if (n < i)
        throw Error(
          i === e[r].max
            ? `${this.format._name} requires exactly ${i} ${r} track${i === 1 ? "" : "s"}.`
            : `${this.format._name} requires at least ${i} ${r} track${i === 1 ? "" : "s"}.`,
        );
    }
    let t = e.total.min;
    if (this.tracks.length < t)
      throw Error(
        t === e.total.max
          ? `${this.format._name} requires exactly ${t} track${t === 1 ? "" : "s"}.`
          : `${this.format._name} requires at least ${t} track${t === 1 ? "" : "s"}.`,
      );
    if (this.state === "canceled") throw Error("Output has been canceled.");
    if (this._startPromise)
      return (Un._warn("Output has already been started."), this._startPromise);
    return (this._startPromise = (async () => {
      this.state = "started";
      let r = this._mutex.acquire();
      try {
        await this._muxer.start();
        let n = this.tracks.map((i) => i.source._start());
        await Promise.all(n);
      } finally {
        (await r)();
      }
    })());
  }
  getMimeType() {
    return this._muxer.getMimeType();
  }
  async cancel() {
    if (this._cancelPromise)
      return (Un._warn("Output has already been canceled."), this._cancelPromise);
    else if (this.state === "finalizing" || this.state === "finalized") {
      if (this.state === "finalized") Un._warn("Output has already been finalized.");
      return;
    }
    return (this._cancelPromise = (async () => {
      this.state = "canceled";
      let e = await this._mutex.acquire();
      try {
        let t = this.tracks.map((r) => r.source._flushOrWaitForOngoingClose(!0));
        (await Promise.all(t),
          await Promise.all([...this._unfinalizedTargets].map((r) => r._close())),
          this._unfinalizedTargets.clear());
      } finally {
        e();
      }
    })());
  }
  async finalize() {
    if (this.state === "pending") throw Error("Cannot finalize before starting.");
    if (this.state === "canceled") throw Error("Cannot finalize after canceling.");
    if (this._finalizePromise)
      return (Un._warn("Output has already been finalized."), this._finalizePromise);
    return (this._finalizePromise = (async () => {
      this.state = "finalizing";
      let e = await this._mutex.acquire();
      try {
        let t = this.tracks.map((r) => r.source._flushOrWaitForOngoingClose(!1));
        if ((await Promise.all(t), await this._muxer.finalize(), this._rootWriterPromise)) {
          let r = await this._rootWriterPromise;
          if (!r.finalized) (await r.flush(), await r.finalize());
        }
        if (this._onFinalize) await this._onFinalize();
        this.state = "finalized";
      } finally {
        (await Promise.all([...this._unfinalizedTargets].map((t) => t._close().catch(() => {}))),
          this._unfinalizedTargets.clear(),
          e());
      }
    })());
  }
}
/*!
 * Copyright (c) 2026-present, Vanilagy and contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */ var lk = Symbol.for("mediabunny loaded");
if (globalThis[lk])
  Un._error(`[WARNING]
Mediabunny was loaded twice. This will likely cause Mediabunny not to work correctly. Check if multiple dependencies are importing different versions of Mediabunny, or if something is being bundled incorrectly.`);
globalThis[lk] = !0;
