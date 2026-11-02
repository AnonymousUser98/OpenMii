// src/vendor/sjcl.js
// SJCL: crypto used for Mii QR codes.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var ge = {
  cipher: {},
  hash: {},
  keyexchange: {},
  mode: {},
  misc: {},
  codec: {},
  exception: {
    corrupt: function (e) {
      ((this.toString = function () {
        return "CORRUPT: " + this.message;
      }),
        (this.message = e));
    },
    invalid: function (e) {
      ((this.toString = function () {
        return "INVALID: " + this.message;
      }),
        (this.message = e));
    },
    bug: function (e) {
      ((this.toString = function () {
        return "BUG: " + this.message;
      }),
        (this.message = e));
    },
    notReady: function (e) {
      ((this.toString = function () {
        return "NOT READY: " + this.message;
      }),
        (this.message = e));
    },
  },
};
ge.cipher.aes = function (e) {
  this.s[0][0][0] || this.O();
  var t,
    r,
    n,
    i,
    o = this.s[0][4],
    s = this.s[1];
  t = e.length;
  var a = 1;
  if (t !== 4 && t !== 6 && t !== 8) throw new ge.exception.invalid("invalid aes key size");
  this.b = [(n = e.slice(0)), (i = [])];
  for (e = t; e < 4 * t + 28; e++) {
    if (((r = n[e - 1]), e % t === 0 || (t === 8 && e % t === 4)))
      ((r =
        (o[r >>> 24] << 24) ^ (o[(r >> 16) & 255] << 16) ^ (o[(r >> 8) & 255] << 8) ^ o[r & 255]),
        e % t === 0 &&
          ((r = (r << 8) ^ (r >>> 24) ^ (a << 24)), (a = (a << 1) ^ (283 * (a >> 7)))));
    n[e] = n[e - t] ^ r;
  }
  for (t = 0; e; t++, e--)
    ((r = n[t & 3 ? e : e - 4]),
      (i[t] =
        4 >= e || 4 > t
          ? r
          : s[0][o[r >>> 24]] ^
            s[1][o[(r >> 16) & 255]] ^
            s[2][o[(r >> 8) & 255]] ^
            s[3][o[r & 255]]));
};
ge.cipher.aes.prototype = {
  encrypt: function (e) {
    return Lk(this, e, 0);
  },
  decrypt: function (e) {
    return Lk(this, e, 1);
  },
  s: [
    [[], [], [], [], []],
    [[], [], [], [], []],
  ],
  O: function () {
    var e = this.s[0],
      t = this.s[1],
      r = e[4],
      n = t[4],
      i,
      o,
      s,
      a = [],
      l = [],
      c,
      u,
      d,
      h;
    for (i = 0; 256 > i; i++) l[(a[i] = (i << 1) ^ (283 * (i >> 7))) ^ i] = i;
    for (o = s = 0; !r[o]; o ^= c || 1, s = l[s] || 1)
      for (
        d = s ^ (s << 1) ^ (s << 2) ^ (s << 3) ^ (s << 4),
          d = (d >> 8) ^ (d & 255) ^ 99,
          r[o] = d,
          n[d] = o,
          u = a[(i = a[(c = a[o])])],
          h = (16843009 * u) ^ (65537 * i) ^ (257 * c) ^ (16843008 * o),
          u = (257 * a[d]) ^ (16843008 * d),
          i = 0;
        4 > i;
        i++
      )
        ((e[i][o] = u = (u << 24) ^ (u >>> 8)), (t[i][d] = h = (h << 24) ^ (h >>> 8)));
    for (i = 0; 5 > i; i++) ((e[i] = e[i].slice(0)), (t[i] = t[i].slice(0)));
  },
};
function Lk(e, t, r) {
  if (t.length !== 4) throw new ge.exception.invalid("invalid aes block size");
  var n = e.b[r],
    i = t[0] ^ n[0],
    o = t[r ? 3 : 1] ^ n[1],
    s = t[2] ^ n[2];
  t = t[r ? 1 : 3] ^ n[3];
  var a,
    l,
    c,
    u = n.length / 4 - 2,
    d,
    h = 4,
    f = [0, 0, 0, 0];
  ((a = e.s[r]), (e = a[0]));
  var p = a[1],
    g = a[2],
    m = a[3],
    A = a[4];
  for (d = 0; d < u; d++)
    ((a = e[i >>> 24] ^ p[(o >> 16) & 255] ^ g[(s >> 8) & 255] ^ m[t & 255] ^ n[h]),
      (l = e[o >>> 24] ^ p[(s >> 16) & 255] ^ g[(t >> 8) & 255] ^ m[i & 255] ^ n[h + 1]),
      (c = e[s >>> 24] ^ p[(t >> 16) & 255] ^ g[(i >> 8) & 255] ^ m[o & 255] ^ n[h + 2]),
      (t = e[t >>> 24] ^ p[(i >> 16) & 255] ^ g[(o >> 8) & 255] ^ m[s & 255] ^ n[h + 3]),
      (h += 4),
      (i = a),
      (o = l),
      (s = c));
  for (d = 0; 4 > d; d++)
    ((f[r ? 3 & -d : d] =
      (A[i >>> 24] << 24) ^
      (A[(o >> 16) & 255] << 16) ^
      (A[(s >> 8) & 255] << 8) ^
      A[t & 255] ^
      n[h++]),
      (a = i),
      (i = o),
      (o = s),
      (s = t),
      (t = a));
  return f;
}
ge.bitArray = {
  bitSlice: function (e, t, r) {
    return (
      (e = ge.bitArray.$(e.slice(t / 32), 32 - (t & 31)).slice(1)),
      r === void 0 ? e : ge.bitArray.clamp(e, r - t)
    );
  },
  extract: function (e, t, r) {
    var n = Math.floor((-t - r) & 31);
    return (
      (((t + r - 1) ^ t) & -32
        ? (e[(t / 32) | 0] << (32 - n)) ^ (e[(t / 32 + 1) | 0] >>> n)
        : e[(t / 32) | 0] >>> n) &
      ((1 << r) - 1)
    );
  },
  concat: function (e, t) {
    if (e.length === 0 || t.length === 0) return e.concat(t);
    var r = e[e.length - 1],
      n = ge.bitArray.getPartial(r);
    return n === 32 ? e.concat(t) : ge.bitArray.$(t, n, r | 0, e.slice(0, e.length - 1));
  },
  bitLength: function (e) {
    var t = e.length;
    return t === 0 ? 0 : 32 * (t - 1) + ge.bitArray.getPartial(e[t - 1]);
  },
  clamp: function (e, t) {
    if (32 * e.length < t) return e;
    e = e.slice(0, Math.ceil(t / 32));
    var r = e.length;
    return (
      (t = t & 31),
      0 < r && t && (e[r - 1] = ge.bitArray.partial(t, e[r - 1] & (2147483648 >> (t - 1)), 1)),
      e
    );
  },
  partial: function (e, t, r) {
    return e === 32 ? t : (r ? t | 0 : t << (32 - e)) + 1099511627776 * e;
  },
  getPartial: function (e) {
    return Math.round(e / 1099511627776) || 32;
  },
  equal: function (e, t) {
    if (ge.bitArray.bitLength(e) !== ge.bitArray.bitLength(t)) return !1;
    var r = 0,
      n;
    for (n = 0; n < e.length; n++) r |= e[n] ^ t[n];
    return r === 0;
  },
  $: function (e, t, r, n) {
    var i = 0;
    for (n === void 0 && (n = []); 32 <= t; t -= 32) (n.push(r), (r = 0));
    if (t === 0) return n.concat(e);
    for (i = 0; i < e.length; i++) (n.push(r | (e[i] >>> t)), (r = e[i] << (32 - t)));
    return (
      (i = e.length ? e[e.length - 1] : 0),
      (e = ge.bitArray.getPartial(i)),
      n.push(ge.bitArray.partial((t + e) & 31, 32 < t + e ? r : n.pop(), 1)),
      n
    );
  },
  i: function (e, t) {
    return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]];
  },
  byteswapM: function (e) {
    var t, r;
    for (t = 0; t < e.length; ++t)
      ((r = e[t]), (e[t] = (r >>> 24) | ((r >>> 8) & 65280) | ((r & 65280) << 8) | (r << 24)));
    return e;
  },
};
ge.codec.utf8String = {
  fromBits: function (e) {
    var t = "",
      r = ge.bitArray.bitLength(e),
      n,
      i;
    for (n = 0; n < r / 8; n++)
      ((n & 3) === 0 && (i = e[n / 4]),
        (t += String.fromCharCode(((i >>> 8) >>> 8) >>> 8)),
        (i <<= 8));
    return decodeURIComponent(escape(t));
  },
  toBits: function (e) {
    e = unescape(encodeURIComponent(e));
    var t = [],
      r,
      n = 0;
    for (r = 0; r < e.length; r++)
      ((n = (n << 8) | e.charCodeAt(r)), (r & 3) === 3 && (t.push(n), (n = 0)));
    return (r & 3 && t.push(ge.bitArray.partial(8 * (r & 3), n)), t);
  },
};
ge.codec.hex = {
  fromBits: function (e) {
    var t = "",
      r;
    for (r = 0; r < e.length; r++) t += ((e[r] | 0) + 263882790666240).toString(16).substr(4);
    return t.substr(0, ge.bitArray.bitLength(e) / 4);
  },
  toBits: function (e) {
    var t,
      r = [],
      n;
    ((e = e.replace(/\s|0x/g, "")), (n = e.length), (e = e + "00000000"));
    for (t = 0; t < e.length; t += 8) r.push(parseInt(e.substr(t, 8), 16) ^ 0);
    return ge.bitArray.clamp(r, 4 * n);
  },
};
ge.codec.base32 = {
  B: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  X: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  BITS: 32,
  BASE: 5,
  REMAINING: 27,
  fromBits: function (e, t, r) {
    var n = ge.codec.base32.BASE,
      i = ge.codec.base32.REMAINING,
      o = "",
      s = 0,
      a = ge.codec.base32.B,
      l = 0,
      c = ge.bitArray.bitLength(e);
    r && (a = ge.codec.base32.X);
    for (r = 0; o.length * n < c; )
      ((o += a.charAt((l ^ (e[r] >>> s)) >>> i)),
        s < n ? ((l = e[r] << (n - s)), (s += i), r++) : ((l <<= n), (s -= n)));
    for (; o.length & 7 && !t; ) o += "=";
    return o;
  },
  toBits: function (e, t) {
    e = e.replace(/\s|=/g, "").toUpperCase();
    var r = ge.codec.base32.BITS,
      n = ge.codec.base32.BASE,
      i = ge.codec.base32.REMAINING,
      o = [],
      s,
      a = 0,
      l = ge.codec.base32.B,
      c = 0,
      u,
      d = "base32";
    t && ((l = ge.codec.base32.X), (d = "base32hex"));
    for (s = 0; s < e.length; s++) {
      if (((u = l.indexOf(e.charAt(s))), 0 > u)) {
        if (!t)
          try {
            return ge.codec.base32hex.toBits(e);
          } catch (h) {}
        throw new ge.exception.invalid("this isn't " + d + "!");
      }
      a > i
        ? ((a -= i), o.push(c ^ (u >>> a)), (c = u << (r - a)))
        : ((a += n), (c ^= u << (r - a)));
    }
    return (a & 56 && o.push(ge.bitArray.partial(a & 56, c, 1)), o);
  },
};
ge.codec.base32hex = {
  fromBits: function (e, t) {
    return ge.codec.base32.fromBits(e, t, 1);
  },
  toBits: function (e) {
    return ge.codec.base32.toBits(e, 1);
  },
};
ge.codec.base64 = {
  B: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  fromBits: function (e, t, r) {
    var n = "",
      i = 0,
      o = ge.codec.base64.B,
      s = 0,
      a = ge.bitArray.bitLength(e);
    r && (o = o.substr(0, 62) + "-_");
    for (r = 0; 6 * n.length < a; )
      ((n += o.charAt((s ^ (e[r] >>> i)) >>> 26)),
        6 > i ? ((s = e[r] << (6 - i)), (i += 26), r++) : ((s <<= 6), (i -= 6)));
    for (; n.length & 3 && !t; ) n += "=";
    return n;
  },
  toBits: function (e, t) {
    e = e.replace(/\s|=/g, "");
    var r = [],
      n,
      i = 0,
      o = ge.codec.base64.B,
      s = 0,
      a;
    t && (o = o.substr(0, 62) + "-_");
    for (n = 0; n < e.length; n++) {
      if (((a = o.indexOf(e.charAt(n))), 0 > a))
        throw new ge.exception.invalid("this isn't base64!");
      26 < i
        ? ((i -= 26), r.push(s ^ (a >>> i)), (s = a << (32 - i)))
        : ((i += 6), (s ^= a << (32 - i)));
    }
    return (i & 56 && r.push(ge.bitArray.partial(i & 56, s, 1)), r);
  },
};
ge.codec.base64url = {
  fromBits: function (e) {
    return ge.codec.base64.fromBits(e, 1, 1);
  },
  toBits: function (e) {
    return ge.codec.base64.toBits(e, 1);
  },
};
ge.hash.sha256 = function (e) {
  (this.b[0] || this.O(),
    e ? ((this.F = e.F.slice(0)), (this.A = e.A.slice(0)), (this.l = e.l)) : this.reset());
};
ge.hash.sha256.hash = function (e) {
  return new ge.hash.sha256().update(e).finalize();
};
ge.hash.sha256.prototype = {
  blockSize: 512,
  reset: function () {
    return ((this.F = this.Y.slice(0)), (this.A = []), (this.l = 0), this);
  },
  update: function (e) {
    typeof e === "string" && (e = ge.codec.utf8String.toBits(e));
    var t,
      r = (this.A = ge.bitArray.concat(this.A, e));
    if (((t = this.l), (e = this.l = t + ge.bitArray.bitLength(e)), 9007199254740991 < e))
      throw new ge.exception.invalid("Cannot hash more than 2^53 - 1 bits");
    if (typeof Uint32Array < "u") {
      var n = new Uint32Array(r),
        i = 0;
      for (t = 512 + t - ((512 + t) & 511); t <= e; t += 512)
        (iS(this, n.subarray(16 * i, 16 * (i + 1))), (i += 1));
      r.splice(0, 16 * i);
    } else for (t = 512 + t - ((512 + t) & 511); t <= e; t += 512) iS(this, r.splice(0, 16));
    return this;
  },
  finalize: function () {
    var e,
      r = this.A,
      t = this.F,
      r = ge.bitArray.concat(r, [ge.bitArray.partial(1, 1)]);
    for (e = r.length + 2; e & 15; e++) r.push(0);
    r.push(Math.floor(this.l / 4294967296));
    for (r.push(this.l | 0); r.length; ) iS(this, r.splice(0, 16));
    return (this.reset(), t);
  },
  Y: [],
  b: [],
  O: function () {
    function e(o) {
      return (4294967296 * (o - Math.floor(o))) | 0;
    }
    for (var t = 0, r = 2, n, i; 64 > t; r++) {
      i = !0;
      for (n = 2; n * n <= r; n++)
        if (r % n === 0) {
          i = !1;
          break;
        }
      i &&
        (8 > t && (this.Y[t] = e(Math.pow(r, 0.5))),
        (this.b[t] = e(Math.pow(r, 0.3333333333333333))),
        t++);
    }
  },
};
function iS(e, t) {
  var r,
    n,
    i,
    { F: o, b: s } = e,
    a = o[0],
    l = o[1],
    c = o[2],
    u = o[3],
    d = o[4],
    h = o[5],
    f = o[6],
    p = o[7];
  for (r = 0; 64 > r; r++)
    (16 > r
      ? (n = t[r])
      : ((n = t[(r + 1) & 15]),
        (i = t[(r + 14) & 15]),
        (n = t[r & 15] =
          (((n >>> 7) ^ (n >>> 18) ^ (n >>> 3) ^ (n << 25) ^ (n << 14)) +
            ((i >>> 17) ^ (i >>> 19) ^ (i >>> 10) ^ (i << 15) ^ (i << 13)) +
            t[r & 15] +
            t[(r + 9) & 15]) |
          0)),
      (n =
        n +
        p +
        ((d >>> 6) ^ (d >>> 11) ^ (d >>> 25) ^ (d << 26) ^ (d << 21) ^ (d << 7)) +
        (f ^ (d & (h ^ f))) +
        s[r]),
      (p = f),
      (f = h),
      (h = d),
      (d = (u + n) | 0),
      (u = c),
      (c = l),
      (l = a),
      (a =
        (n +
          ((l & c) ^ (u & (l ^ c))) +
          ((l >>> 2) ^ (l >>> 13) ^ (l >>> 22) ^ (l << 30) ^ (l << 19) ^ (l << 10))) |
        0));
  ((o[0] = (o[0] + a) | 0),
    (o[1] = (o[1] + l) | 0),
    (o[2] = (o[2] + c) | 0),
    (o[3] = (o[3] + u) | 0),
    (o[4] = (o[4] + d) | 0),
    (o[5] = (o[5] + h) | 0),
    (o[6] = (o[6] + f) | 0),
    (o[7] = (o[7] + p) | 0));
}
ge.mode.ccm = {
  name: "ccm",
  G: [],
  listenProgress: function (e) {
    ge.mode.ccm.G.push(e);
  },
  unListenProgress: function (e) {
    ((e = ge.mode.ccm.G.indexOf(e)), -1 < e && ge.mode.ccm.G.splice(e, 1));
  },
  fa: function (e) {
    var t = ge.mode.ccm.G.slice(),
      r;
    for (r = 0; r < t.length; r += 1) t[r](e);
  },
  encrypt: function (e, t, r, n, i) {
    var o,
      s = t.slice(0),
      a = ge.bitArray,
      l = a.bitLength(r) / 8,
      c = a.bitLength(s) / 8;
    if (((i = i || 64), (n = n || []), 7 > l))
      throw new ge.exception.invalid("ccm: iv must be at least 7 bytes");
    for (o = 2; 4 > o && c >>> (8 * o); o++);
    return (
      o < 15 - l && (o = 15 - l),
      (r = a.clamp(r, 8 * (15 - o))),
      (t = ge.mode.ccm.V(e, t, r, n, i, o)),
      (s = ge.mode.ccm.C(e, s, r, t, i, o)),
      a.concat(s.data, s.tag)
    );
  },
  decrypt: function (e, t, r, n, i) {
    ((i = i || 64), (n = n || []));
    var o = ge.bitArray,
      s = o.bitLength(r) / 8,
      c = o.bitLength(t),
      a = o.clamp(t, c - i),
      l = o.bitSlice(t, c - i),
      c = (c - i) / 8;
    if (7 > s) throw new ge.exception.invalid("ccm: iv must be at least 7 bytes");
    for (t = 2; 4 > t && c >>> (8 * t); t++);
    if (
      (t < 15 - s && (t = 15 - s),
      (r = o.clamp(r, 8 * (15 - t))),
      (a = ge.mode.ccm.C(e, a, r, l, i, t)),
      (e = ge.mode.ccm.V(e, a.data, r, n, i, t)),
      !o.equal(a.tag, e))
    )
      throw new ge.exception.corrupt("ccm: tag doesn't match");
    return a.data;
  },
  na: function (e, t, r, n, i, o) {
    var s = [],
      a = ge.bitArray,
      l = a.i;
    if (
      ((n = [a.partial(8, (t.length ? 64 : 0) | ((n - 2) << 2) | (o - 1))]),
      (n = a.concat(n, r)),
      (n[3] |= i),
      (n = e.encrypt(n)),
      t.length)
    )
      for (
        r = a.bitLength(t) / 8,
          65279 >= r
            ? (s = [a.partial(16, r)])
            : 4294967295 >= r && (s = a.concat([a.partial(16, 65534)], [r])),
          s = a.concat(s, t),
          t = 0;
        t < s.length;
        t += 4
      )
        n = e.encrypt(l(n, s.slice(t, t + 4).concat([0, 0, 0])));
    return n;
  },
  V: function (e, t, r, n, i, o) {
    var s = ge.bitArray,
      a = s.i;
    if (((i /= 8), i % 2 || 4 > i || 16 < i))
      throw new ge.exception.invalid("ccm: invalid tag length");
    if (4294967295 < n.length || 4294967295 < t.length)
      throw new ge.exception.bug("ccm: can't deal with 4GiB or more data");
    r = ge.mode.ccm.na(e, n, r, i, s.bitLength(t) / 8, o);
    for (n = 0; n < t.length; n += 4) r = e.encrypt(a(r, t.slice(n, n + 4).concat([0, 0, 0])));
    return s.clamp(r, 8 * i);
  },
  C: function (e, t, r, n, i, o) {
    var s,
      a = ge.bitArray;
    s = a.i;
    var l = t.length,
      c = a.bitLength(t),
      u = l / 50,
      d = u;
    if (
      ((r = a
        .concat([a.partial(8, o - 1)], r)
        .concat([0, 0, 0])
        .slice(0, 4)),
      (n = a.bitSlice(s(n, e.encrypt(r)), 0, i)),
      !l)
    )
      return { tag: n, data: [] };
    for (s = 0; s < l; s += 4)
      (s > u && (ge.mode.ccm.fa(s / l), (u += d)),
        r[3]++,
        (i = e.encrypt(r)),
        (t[s] ^= i[0]),
        (t[s + 1] ^= i[1]),
        (t[s + 2] ^= i[2]),
        (t[s + 3] ^= i[3]));
    return { tag: n, data: a.clamp(t, c) };
  },
};
ge.mode.ocb2 = {
  name: "ocb2",
  encrypt: function (e, t, r, n, i, o) {
    if (ge.bitArray.bitLength(r) !== 128) throw new ge.exception.invalid("ocb iv must be 128 bits");
    var s,
      a = ge.mode.ocb2.S,
      l = ge.bitArray,
      c = l.i,
      u = [0, 0, 0, 0];
    r = a(e.encrypt(r));
    var d,
      h = [];
    ((n = n || []), (i = i || 64));
    for (s = 0; s + 4 < t.length; s += 4)
      ((d = t.slice(s, s + 4)),
        (u = c(u, d)),
        (h = h.concat(c(r, e.encrypt(c(r, d))))),
        (r = a(r)));
    return (
      (d = t.slice(s)),
      (t = l.bitLength(d)),
      (s = e.encrypt(c(r, [0, 0, 0, t]))),
      (d = l.clamp(c(d.concat([0, 0, 0]), s), t)),
      (u = c(u, c(d.concat([0, 0, 0]), s))),
      (u = e.encrypt(c(u, c(r, a(r))))),
      n.length && (u = c(u, o ? n : ge.mode.ocb2.pmac(e, n))),
      h.concat(l.concat(d, l.clamp(u, i)))
    );
  },
  decrypt: function (e, t, r, n, i, o) {
    if (ge.bitArray.bitLength(r) !== 128) throw new ge.exception.invalid("ocb iv must be 128 bits");
    i = i || 64;
    var s = ge.mode.ocb2.S,
      a = ge.bitArray,
      l = a.i,
      c = [0, 0, 0, 0],
      u = s(e.encrypt(r)),
      d,
      h,
      f = ge.bitArray.bitLength(t) - i,
      p = [];
    n = n || [];
    for (r = 0; r + 4 < f / 32; r += 4)
      ((d = l(u, e.decrypt(l(u, t.slice(r, r + 4))))),
        (c = l(c, d)),
        (p = p.concat(d)),
        (u = s(u)));
    if (
      ((h = f - 32 * r),
      (d = e.encrypt(l(u, [0, 0, 0, h]))),
      (d = l(d, a.clamp(t.slice(r), h).concat([0, 0, 0]))),
      (c = l(c, d)),
      (c = e.encrypt(l(c, l(u, s(u))))),
      n.length && (c = l(c, o ? n : ge.mode.ocb2.pmac(e, n))),
      !a.equal(a.clamp(c, i), a.bitSlice(t, f)))
    )
      throw new ge.exception.corrupt("ocb: tag doesn't match");
    return p.concat(a.clamp(d, h));
  },
  pmac: function (e, t) {
    var r,
      n = ge.mode.ocb2.S,
      i = ge.bitArray,
      o = i.i,
      s = [0, 0, 0, 0],
      a = e.encrypt([0, 0, 0, 0]),
      a = o(a, n(n(a)));
    for (r = 0; r + 4 < t.length; r += 4)
      ((a = n(a)), (s = o(s, e.encrypt(o(a, t.slice(r, r + 4))))));
    return (
      (r = t.slice(r)),
      128 > i.bitLength(r) && ((a = o(a, n(a))), (r = i.concat(r, [-2147483648, 0, 0, 0]))),
      (s = o(s, r)),
      e.encrypt(o(n(o(a, n(a))), s))
    );
  },
  S: function (e) {
    return [
      (e[0] << 1) ^ (e[1] >>> 31),
      (e[1] << 1) ^ (e[2] >>> 31),
      (e[2] << 1) ^ (e[3] >>> 31),
      (e[3] << 1) ^ (135 * (e[0] >>> 31)),
    ];
  },
};
ge.mode.gcm = {
  name: "gcm",
  encrypt: function (e, t, r, n, i) {
    var o = t.slice(0);
    return (
      (t = ge.bitArray),
      (n = n || []),
      (e = ge.mode.gcm.C(!0, e, o, n, r, i || 128)),
      t.concat(e.data, e.tag)
    );
  },
  decrypt: function (e, t, r, n, i) {
    var o = t.slice(0),
      s = ge.bitArray,
      a = s.bitLength(o);
    if (
      ((i = i || 128),
      (n = n || []),
      i <= a ? ((t = s.bitSlice(o, a - i)), (o = s.bitSlice(o, 0, a - i))) : ((t = o), (o = [])),
      (e = ge.mode.gcm.C(!1, e, o, n, r, i)),
      !s.equal(e.tag, t))
    )
      throw new ge.exception.corrupt("gcm: tag doesn't match");
    return e.data;
  },
  ka: function (e, t) {
    var r,
      n,
      i,
      o,
      s,
      a = ge.bitArray.i;
    ((i = [0, 0, 0, 0]), (o = t.slice(0)));
    for (r = 0; 128 > r; r++) {
      ((n = (e[Math.floor(r / 32)] & (1 << (31 - (r % 32)))) !== 0) && (i = a(i, o)),
        (s = (o[3] & 1) !== 0));
      for (n = 3; 0 < n; n--) o[n] = (o[n] >>> 1) | ((o[n - 1] & 1) << 31);
      ((o[0] >>>= 1), s && (o[0] ^= -520093696));
    }
    return i;
  },
  j: function (e, t, r) {
    var n,
      i = r.length;
    t = t.slice(0);
    for (n = 0; n < i; n += 4)
      ((t[0] ^= 4294967295 & r[n]),
        (t[1] ^= 4294967295 & r[n + 1]),
        (t[2] ^= 4294967295 & r[n + 2]),
        (t[3] ^= 4294967295 & r[n + 3]),
        (t = ge.mode.gcm.ka(t, e)));
    return t;
  },
  C: function (e, t, r, n, i, o) {
    var s,
      a,
      l,
      c,
      u,
      d,
      h,
      f,
      p = ge.bitArray;
    ((d = r.length),
      (h = p.bitLength(r)),
      (f = p.bitLength(n)),
      (a = p.bitLength(i)),
      (s = t.encrypt([0, 0, 0, 0])),
      a === 96
        ? ((i = i.slice(0)), (i = p.concat(i, [1])))
        : ((i = ge.mode.gcm.j(s, [0, 0, 0, 0], i)),
          (i = ge.mode.gcm.j(s, i, [0, 0, Math.floor(a / 4294967296), a & 4294967295]))),
      (a = ge.mode.gcm.j(s, [0, 0, 0, 0], n)),
      (u = i.slice(0)),
      (n = a.slice(0)),
      e || (n = ge.mode.gcm.j(s, a, r)));
    for (c = 0; c < d; c += 4)
      (u[3]++,
        (l = t.encrypt(u)),
        (r[c] ^= l[0]),
        (r[c + 1] ^= l[1]),
        (r[c + 2] ^= l[2]),
        (r[c + 3] ^= l[3]));
    return (
      (r = p.clamp(r, h)),
      e && (n = ge.mode.gcm.j(s, a, r)),
      (e = [
        Math.floor(f / 4294967296),
        f & 4294967295,
        Math.floor(h / 4294967296),
        h & 4294967295,
      ]),
      (n = ge.mode.gcm.j(s, n, e)),
      (l = t.encrypt(i)),
      (n[0] ^= l[0]),
      (n[1] ^= l[1]),
      (n[2] ^= l[2]),
      (n[3] ^= l[3]),
      { tag: p.bitSlice(n, 0, o), data: r }
    );
  },
};
ge.misc.hmac = function (e, t) {
  this.W = t = t || ge.hash.sha256;
  var r = [[], []],
    n,
    i = t.prototype.blockSize / 32;
  ((this.w = [new t(), new t()]), e.length > i && (e = t.hash(e)));
  for (n = 0; n < i; n++) ((r[0][n] = e[n] ^ 909522486), (r[1][n] = e[n] ^ 1549556828));
  (this.w[0].update(r[0]), this.w[1].update(r[1]), (this.R = new t(this.w[0])));
};
ge.misc.hmac.prototype.encrypt = ge.misc.hmac.prototype.mac = function (e) {
  if (this.aa) throw new ge.exception.invalid("encrypt on already updated hmac called!");
  return (this.update(e), this.digest(e));
};
ge.misc.hmac.prototype.reset = function () {
  ((this.R = new this.W(this.w[0])), (this.aa = !1));
};
ge.misc.hmac.prototype.update = function (e) {
  ((this.aa = !0), this.R.update(e));
};
ge.misc.hmac.prototype.digest = function () {
  var e = this.R.finalize(),
    e = new this.W(this.w[1]).update(e).finalize();
  return (this.reset(), e);
};
ge.misc.pbkdf2 = function (e, t, r, n, i) {
  if (((r = r || 1e4), 0 > n || 0 > r)) throw new ge.exception.invalid("invalid params to pbkdf2");
  (typeof e === "string" && (e = ge.codec.utf8String.toBits(e)),
    typeof t === "string" && (t = ge.codec.utf8String.toBits(t)),
    (i = i || ge.misc.hmac),
    (e = new i(e)));
  var o,
    s,
    a,
    l,
    c = [],
    u = ge.bitArray;
  for (l = 1; 32 * c.length < (n || 1); l++) {
    i = o = e.encrypt(u.concat(t, [l]));
    for (s = 1; s < r; s++) for (o = e.encrypt(o), a = 0; a < o.length; a++) i[a] ^= o[a];
    c = c.concat(i);
  }
  return (n && (c = u.clamp(c, n)), c);
};
ge.prng = function (e) {
  ((this.c = [new ge.hash.sha256()]),
    (this.m = [0]),
    (this.P = 0),
    (this.H = {}),
    (this.N = 0),
    (this.U = {}),
    (this.Z = this.f = this.o = this.ha = 0),
    (this.b = [0, 0, 0, 0, 0, 0, 0, 0]),
    (this.h = [0, 0, 0, 0]),
    (this.L = void 0),
    (this.M = e),
    (this.D = !1),
    (this.K = { progress: {}, seeded: {} }),
    (this.u = this.ga = 0),
    (this.I = 1),
    (this.J = 2),
    (this.ca = 65536),
    (this.T = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024]),
    (this.da = 30000),
    (this.ba = 80));
};
ge.prng.prototype = {
  randomWords: function (e, t) {
    var r = [],
      n;
    n = this.isReady(t);
    var i;
    if (n === this.u) throw new ge.exception.notReady("generator isn't seeded");
    if (n & this.J) {
      ((n = !(n & this.I)), (i = []));
      var o = 0,
        s;
      this.Z = i[0] = /*@__PURE__*/ new Date().valueOf() + this.da;
      for (s = 0; 16 > s; s++) i.push((4294967296 * Math.random()) | 0);
      for (
        s = 0;
        s < this.c.length &&
        ((i = i.concat(this.c[s].finalize())),
        (o += this.m[s]),
        (this.m[s] = 0),
        n || !(this.P & (1 << s)));
        s++
      );
      (this.P >= 1 << this.c.length && (this.c.push(new ge.hash.sha256()), this.m.push(0)),
        (this.f -= o),
        o > this.o && (this.o = o),
        this.P++,
        (this.b = ge.hash.sha256.hash(this.b.concat(i))),
        (this.L = new ge.cipher.aes(this.b)));
      for (n = 0; 4 > n && ((this.h[n] = (this.h[n] + 1) | 0), !this.h[n]); n++);
    }
    for (n = 0; n < e; n += 4)
      ((n + 1) % this.ca === 0 && Fk(this), (i = oS(this)), r.push(i[0], i[1], i[2], i[3]));
    return (Fk(this), r.slice(0, e));
  },
  setDefaultParanoia: function (e, t) {
    if (e === 0 && t !== "Setting paranoia=0 will ruin your security; use it only for testing")
      throw new ge.exception.invalid(
        "Setting paranoia=0 will ruin your security; use it only for testing",
      );
    this.M = e;
  },
  addEntropy: function (e, t, r) {
    r = r || "user";
    var n,
      i,
      o = /*@__PURE__*/ new Date().valueOf(),
      s = this.H[r],
      a = this.isReady(),
      l = 0;
    switch (
      ((n = this.U[r]),
      n === void 0 && (n = this.U[r] = this.ha++),
      s === void 0 && (s = this.H[r] = 0),
      (this.H[r] = (this.H[r] + 1) % this.c.length),
      typeof e)
    ) {
      case "number":
        (t === void 0 && (t = 1), this.c[s].update([n, this.N++, 1, t, o, 1, e | 0]));
        break;
      case "object":
        if (((r = Object.prototype.toString.call(e)), r === "[object Uint32Array]")) {
          i = [];
          for (r = 0; r < e.length; r++) i.push(e[r]);
          e = i;
        } else
          for (r !== "[object Array]" && (l = 1), r = 0; r < e.length && !l; r++)
            typeof e[r] !== "number" && (l = 1);
        if (!l) {
          if (t === void 0)
            for (r = t = 0; r < e.length; r++) for (i = e[r]; 0 < i; ) (t++, (i = i >>> 1));
          this.c[s].update([n, this.N++, 2, t, o, e.length].concat(e));
        }
        break;
      case "string":
        (t === void 0 && (t = e.length),
          this.c[s].update([n, this.N++, 3, t, o, e.length]),
          this.c[s].update(e));
        break;
      default:
        l = 1;
    }
    if (l)
      throw new ge.exception.bug(
        "random: addEntropy only supports number, array of numbers or string",
      );
    ((this.m[s] += t),
      (this.f += t),
      a === this.u &&
        (this.isReady() !== this.u && Bk("seeded", Math.max(this.o, this.f)),
        Bk("progress", this.getProgress())));
  },
  isReady: function (e) {
    return (
      (e = this.T[e !== void 0 ? e : this.M]),
      this.o && this.o >= e
        ? this.m[0] > this.ba && /*@__PURE__*/ new Date().valueOf() > this.Z
          ? this.J | this.I
          : this.I
        : this.f >= e
          ? this.J | this.u
          : this.u
    );
  },
  getProgress: function (e) {
    return ((e = this.T[e ? e : this.M]), this.o >= e ? 1 : this.f > e ? 1 : this.f / e);
  },
  startCollectors: function () {
    if (!this.D) {
      if (
        ((this.a = {
          loadTimeCollector: G3(this, this.ma),
          mouseCollector: G3(this, this.oa),
          keyboardCollector: G3(this, this.la),
          accelerometerCollector: G3(this, this.ea),
          touchCollector: G3(this, this.qa),
        }),
        window.addEventListener)
      )
        (window.addEventListener("load", this.a.loadTimeCollector, !1),
          window.addEventListener("mousemove", this.a.mouseCollector, !1),
          window.addEventListener("keypress", this.a.keyboardCollector, !1),
          window.addEventListener("devicemotion", this.a.accelerometerCollector, !1),
          window.addEventListener("touchmove", this.a.touchCollector, !1));
      else if (document.attachEvent)
        (document.attachEvent("onload", this.a.loadTimeCollector),
          document.attachEvent("onmousemove", this.a.mouseCollector),
          document.attachEvent("keypress", this.a.keyboardCollector));
      else throw new ge.exception.bug("can't attach event");
      this.D = !0;
    }
  },
  stopCollectors: function () {
    this.D &&
      (window.removeEventListener
        ? (window.removeEventListener("load", this.a.loadTimeCollector, !1),
          window.removeEventListener("mousemove", this.a.mouseCollector, !1),
          window.removeEventListener("keypress", this.a.keyboardCollector, !1),
          window.removeEventListener("devicemotion", this.a.accelerometerCollector, !1),
          window.removeEventListener("touchmove", this.a.touchCollector, !1))
        : document.detachEvent &&
          (document.detachEvent("onload", this.a.loadTimeCollector),
          document.detachEvent("onmousemove", this.a.mouseCollector),
          document.detachEvent("keypress", this.a.keyboardCollector)),
      (this.D = !1));
  },
  addEventListener: function (e, t) {
    this.K[e][this.ga++] = t;
  },
  removeEventListener: function (e, t) {
    var r,
      n,
      i = this.K[e],
      o = [];
    for (n in i) i.hasOwnProperty(n) && i[n] === t && o.push(n);
    for (r = 0; r < o.length; r++) ((n = o[r]), delete i[n]);
  },
  la: function () {
    H3(this, 1);
  },
  oa: function (e) {
    var t, r;
    try {
      ((t = e.x || e.clientX || e.offsetX || 0), (r = e.y || e.clientY || e.offsetY || 0));
    } catch (n) {
      r = t = 0;
    }
    (t != 0 && r != 0 && this.addEntropy([t, r], 2, "mouse"), H3(this, 0));
  },
  qa: function (e) {
    ((e = e.touches[0] || e.changedTouches[0]),
      this.addEntropy([e.pageX || e.clientX, e.pageY || e.clientY], 1, "touch"),
      H3(this, 0));
  },
  ma: function () {
    H3(this, 2);
  },
  ea: function (e) {
    if (
      ((e =
        e.accelerationIncludingGravity.x ||
        e.accelerationIncludingGravity.y ||
        e.accelerationIncludingGravity.z),
      window.orientation)
    ) {
      var t = window.orientation;
      typeof t === "number" && this.addEntropy(t, 1, "accelerometer");
    }
    (e && this.addEntropy(e, 2, "accelerometer"), H3(this, 0));
  },
};
function Bk(e, t) {
  var r,
    n = ge.random.K[e],
    i = [];
  for (r in n) n.hasOwnProperty(r) && i.push(n[r]);
  for (r = 0; r < i.length; r++) i[r](t);
}
function H3(e, t) {
  typeof window < "u" && window.performance && typeof window.performance.now === "function"
    ? e.addEntropy(window.performance.now(), t, "loadtime")
    : e.addEntropy(/*@__PURE__*/ new Date().valueOf(), t, "loadtime");
}
function Fk(e) {
  ((e.b = oS(e).concat(oS(e))), (e.L = new ge.cipher.aes(e.b)));
}
function oS(e) {
  for (var t = 0; 4 > t && ((e.h[t] = (e.h[t] + 1) | 0), !e.h[t]); t++);
  return e.L.encrypt(e.h);
}
function G3(e, t) {
  return function () {
    t.apply(e, arguments);
  };
}
ge.random = new ge.prng(6);
e: try {
  if ((V3 = typeof Dk < "u" && z8e)) {
    try {
      W3 = null;
    } catch (e) {
      W3 = null;
    }
    V3 = z3 = W3;
  }
  if (V3 && z3.randomBytes)
    ((W1 = z3.randomBytes(128)),
      (W1 = new Uint32Array(new Uint8Array(W1).buffer)),
      ge.random.addEntropy(W1, 1024, "crypto['randomBytes']"));
  else if (typeof window < "u" && typeof Uint32Array < "u") {
    if (((Q1 = new Uint32Array(32)), window.crypto && window.crypto.getRandomValues))
      window.crypto.getRandomValues(Q1);
    else if (window.msCrypto && window.msCrypto.getRandomValues)
      window.msCrypto.getRandomValues(Q1);
    else break e;
    ge.random.addEntropy(Q1, 1024, "crypto['getRandomValues']");
  }
} catch (e) {
  typeof window < "u" && window.console;
}
var W1, z3, Q1, V3, W3;
ge.json = {
  defaults: { v: 1, iter: 1e4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" },
  ja: function (e, t, r, n) {
    ((r = r || {}), (n = n || {}));
    var i = ge.json,
      o = i.g({ iv: ge.random.randomWords(4, 0) }, i.defaults),
      s;
    if (
      (i.g(o, r),
      (r = o.adata),
      typeof o.salt === "string" && (o.salt = ge.codec.base64.toBits(o.salt)),
      typeof o.iv === "string" && (o.iv = ge.codec.base64.toBits(o.iv)),
      !ge.mode[o.mode] ||
        !ge.cipher[o.cipher] ||
        (typeof e === "string" && 100 >= o.iter) ||
        (o.ts !== 64 && o.ts !== 96 && o.ts !== 128) ||
        (o.ks !== 128 && o.ks !== 192 && o.ks !== 256) ||
        2 > o.iv.length ||
        4 < o.iv.length)
    )
      throw new ge.exception.invalid("json encrypt: invalid parameters");
    return (
      typeof e === "string"
        ? ((s = ge.misc.cachedPbkdf2(e, o)), (e = s.key.slice(0, o.ks / 32)), (o.salt = s.salt))
        : ge.ecc &&
          e instanceof ge.ecc.elGamal.publicKey &&
          ((s = e.kem()), (o.kemtag = s.tag), (e = s.key.slice(0, o.ks / 32))),
      typeof t === "string" && (t = ge.codec.utf8String.toBits(t)),
      typeof r === "string" && (o.adata = r = ge.codec.utf8String.toBits(r)),
      (s = new ge.cipher[o.cipher](e)),
      i.g(n, o),
      (n.key = e),
      (o.ct =
        o.mode === "ccm" && ge.arrayBuffer && ge.arrayBuffer.ccm && t instanceof ArrayBuffer
          ? ge.arrayBuffer.ccm.encrypt(s, t, o.iv, r, o.ts)
          : ge.mode[o.mode].encrypt(s, t, o.iv, r, o.ts)),
      o
    );
  },
  encrypt: function (e, t, r, n) {
    var i = ge.json,
      o = i.ja.apply(i, arguments);
    return i.encode(o);
  },
  ia: function (e, t, r, n) {
    ((r = r || {}), (n = n || {}));
    var i = ge.json;
    t = i.g(i.g(i.g({}, i.defaults), t), r, !0);
    var o, s;
    if (
      ((o = t.adata),
      typeof t.salt === "string" && (t.salt = ge.codec.base64.toBits(t.salt)),
      typeof t.iv === "string" && (t.iv = ge.codec.base64.toBits(t.iv)),
      !ge.mode[t.mode] ||
        !ge.cipher[t.cipher] ||
        (typeof e === "string" && 100 >= t.iter) ||
        (t.ts !== 64 && t.ts !== 96 && t.ts !== 128) ||
        (t.ks !== 128 && t.ks !== 192 && t.ks !== 256) ||
        !t.iv ||
        2 > t.iv.length ||
        4 < t.iv.length)
    )
      throw new ge.exception.invalid("json decrypt: invalid parameters");
    return (
      typeof e === "string"
        ? ((s = ge.misc.cachedPbkdf2(e, t)), (e = s.key.slice(0, t.ks / 32)), (t.salt = s.salt))
        : ge.ecc &&
          e instanceof ge.ecc.elGamal.secretKey &&
          (e = e.unkem(ge.codec.base64.toBits(t.kemtag)).slice(0, t.ks / 32)),
      typeof o === "string" && (o = ge.codec.utf8String.toBits(o)),
      (s = new ge.cipher[t.cipher](e)),
      (o =
        t.mode === "ccm" && ge.arrayBuffer && ge.arrayBuffer.ccm && t.ct instanceof ArrayBuffer
          ? ge.arrayBuffer.ccm.decrypt(s, t.ct, t.iv, t.tag, o, t.ts)
          : ge.mode[t.mode].decrypt(s, t.ct, t.iv, o, t.ts)),
      i.g(n, t),
      (n.key = e),
      r.raw === 1 ? o : ge.codec.utf8String.fromBits(o)
    );
  },
  decrypt: function (e, t, r, n) {
    var i = ge.json;
    return i.ia(e, i.decode(t), r, n);
  },
  encode: function (e) {
    var t,
      r = "{",
      n = "";
    for (t in e)
      if (e.hasOwnProperty(t)) {
        if (!t.match(/^[a-z0-9]+$/i))
          throw new ge.exception.invalid("json encode: invalid property name");
        switch (((r += n + '"' + t + '":'), (n = ","), typeof e[t])) {
          case "number":
          case "boolean":
            r += e[t];
            break;
          case "string":
            r += '"' + escape(e[t]) + '"';
            break;
          case "object":
            r += '"' + ge.codec.base64.fromBits(e[t], 0) + '"';
            break;
          default:
            throw new ge.exception.bug("json encode: unsupported type");
        }
      }
    return r + "}";
  },
  decode: function (e) {
    if (((e = e.replace(/\s/g, "")), !e.match(/^\{.*\}$/)))
      throw new ge.exception.invalid("json decode: this isn't json!");
    e = e.replace(/^\{|\}$/g, "").split(/,/);
    var t = {},
      r,
      n;
    for (r = 0; r < e.length; r++) {
      if (
        !(n = e[r].match(
          /^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i,
        ))
      )
        throw new ge.exception.invalid("json decode: this isn't json!");
      n[3] != null
        ? (t[n[2]] = parseInt(n[3], 10))
        : n[4] != null
          ? (t[n[2]] = n[2].match(/^(ct|adata|salt|iv)$/)
              ? ge.codec.base64.toBits(n[4])
              : unescape(n[4]))
          : n[5] != null && (t[n[2]] = n[5] === "true");
    }
    return t;
  },
  g: function (e, t, r) {
    if ((e === void 0 && (e = {}), t === void 0)) return e;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        if (r && e[n] !== void 0 && e[n] !== t[n])
          throw new ge.exception.invalid("required parameter overridden");
        e[n] = t[n];
      }
    return e;
  },
  sa: function (e, t) {
    var r = {},
      n;
    for (n in e) e.hasOwnProperty(n) && e[n] !== t[n] && (r[n] = e[n]);
    return r;
  },
  ra: function (e, t) {
    var r = {},
      n;
    for (n = 0; n < t.length; n++) e[t[n]] !== void 0 && (r[t[n]] = e[t[n]]);
    return r;
  },
};
ge.encrypt = ge.json.encrypt;
ge.decrypt = ge.json.decrypt;
ge.misc.pa = {};
ge.misc.cachedPbkdf2 = function (e, t) {
  var r = ge.misc.pa,
    n;
  return (
    (t = t || {}),
    (n = t.iter || 1000),
    (r = r[e] = r[e] || {}),
    (n = r[n] =
      r[n] || {
        firstSalt: t.salt && t.salt.length ? t.salt.slice(0) : ge.random.randomWords(2, 0),
      }),
    (r = t.salt === void 0 ? n.firstSalt : t.salt),
    (n[r] = n[r] || ge.misc.pbkdf2(e, r, t.iter)),
    { key: n[r].slice(0), salt: r.slice(0) }
  );
};
ge.codec.bytes = {
  fromBits: function (e) {
    var t = [],
      r = ge.bitArray.bitLength(e),
      n,
      i;
    for (n = 0; n < r / 8; n++) {
      if ((n & 3) === 0) i = e[n / 4];
      (t.push(i >>> 24), (i <<= 8));
    }
    return t;
  },
  toBits: function (e) {
    var t = [],
      r,
      n = 0;
    for (r = 0; r < e.length; r++) if (((n = (n << 8) | e[r]), (r & 3) === 3)) (t.push(n), (n = 0));
    if (r & 3) t.push(ge.bitArray.partial(8 * (r & 3), n));
    return t;
  },
};
var ls = {
  cipher: { aes: ge.cipher.aes },
  bitArray: {
    bitSlice: ge.bitArray.bitSlice,
    bitLength: ge.bitArray.bitLength,
    clamp: ge.bitArray.clamp,
  },
  mode: { ccm: ge.mode.ccm },
  codec: {
    bytes: ge.codec.bytes,
    utf8String: ge.codec.utf8String,
    hex: ge.codec.hex,
    base32: ge.codec.base32,
    base32hex: ge.codec.base32hex,
    base64: ge.codec.base64,
  },
};
