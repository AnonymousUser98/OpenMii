// src/vendor/texture-formats.js
// Texture pixel-format conversion helpers.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var MN = Dc(function (n6) {
  var xN = Object.defineProperty,
    jJ = (e) => xN(e, "__esModule", { value: !0 }),
    KJ = (e, t) => {
      for (var r in t) xN(e, r, { get: t[r], enumerable: !0 });
    };
  jJ(n6);
  KJ(n6, {
    GIFEncoder: () => EN,
    applyPalette: () => iee,
    default: () => pee,
    nearestColor: () => lee,
    nearestColorIndex: () => wN,
    nearestColorIndexWithDistance: () => TN,
    prequantize: () => nee,
    quantize: () => tee,
    snapColorsToPalette: () => aee,
  });
  var qJ = {
    signature: "GIF",
    version: "89a",
    trailer: 59,
    extensionIntroducer: 33,
    applicationExtensionLabel: 255,
    graphicControlExtensionLabel: 249,
    imageSeparator: 44,
    signatureSize: 3,
    versionSize: 3,
    globalColorTableFlagMask: 128,
    colorResolutionMask: 112,
    sortFlagMask: 8,
    globalColorTableSizeMask: 7,
    applicationIdentifierSize: 8,
    applicationAuthCodeSize: 3,
    disposalMethodMask: 28,
    userInputFlagMask: 2,
    transparentColorFlagMask: 1,
    localColorTableFlagMask: 128,
    interlaceFlagMask: 64,
    idSortFlagMask: 32,
    localColorTableSizeMask: 7,
  };
  function bN(e = 256) {
    let t = 0,
      r = new Uint8Array(e);
    return {
      get buffer() {
        return r.buffer;
      },
      reset() {
        t = 0;
      },
      bytesView() {
        return r.subarray(0, t);
      },
      bytes() {
        return r.slice(0, t);
      },
      writeByte(i) {
        (n(t + 1), (r[t] = i), t++);
      },
      writeBytes(i, o = 0, s = i.length) {
        n(t + s);
        for (let a = 0; a < s; a++) r[t++] = i[a + o];
      },
      writeBytesView(i, o = 0, s = i.byteLength) {
        (n(t + s), r.set(i.subarray(o, o + s), t), (t += s));
      },
    };
    function n(i) {
      var o = r.length;
      if (o >= i) return;
      var s = 1048576;
      if (((i = Math.max(i, (o * (o < s ? 2 : 1.125)) >>> 0)), o != 0)) i = Math.max(i, 256);
      let a = r;
      if (((r = new Uint8Array(i)), t > 0)) r.set(a.subarray(0, t), 0);
    }
  }
  var e6 = 12,
    gN = 5003,
    ZJ = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
  function $J(
    e,
    t,
    r,
    n,
    i = bN(512),
    o = new Uint8Array(256),
    s = new Int32Array(gN),
    a = new Int32Array(gN),
  ) {
    let l = s.length,
      c = Math.max(2, n);
    (o.fill(0), a.fill(0), s.fill(-1));
    let u = 0,
      d = 0,
      h = c + 1,
      f = h,
      p = !1,
      g = f,
      m = (1 << g) - 1,
      A = 1 << (h - 1),
      y = A + 1,
      x = A + 2,
      b = 0,
      v = r[0],
      _ = 0;
    for (let E = l; E < 65536; E *= 2) ++_;
    ((_ = 8 - _), i.writeByte(c), S(A));
    let w = r.length;
    for (let E = 1; E < w; E++)
      e: {
        let T = r[E],
          M = (T << e6) + v,
          C = (T << _) ^ v;
        if (s[C] === M) {
          v = a[C];
          break e;
        }
        let R = C === 0 ? 1 : l - C;
        while (s[C] >= 0) {
          if (((C -= R), C < 0)) C += l;
          if (s[C] === M) {
            v = a[C];
            break e;
          }
        }
        if ((S(v), (v = T), x < 1 << e6)) ((a[C] = x++), (s[C] = M));
        else (s.fill(-1), (x = A + 2), (p = !0), S(A));
      }
    return (S(v), S(y), i.writeByte(0), i.bytesView());
    function S(E) {
      if (((u &= ZJ[d]), d > 0)) u |= E << d;
      else u = E;
      d += g;
      while (d >= 8) {
        if (((o[b++] = u & 255), b >= 254)) (i.writeByte(b), i.writeBytesView(o, 0, b), (b = 0));
        ((u >>= 8), (d -= 8));
      }
      if (x > m || p)
        if (p) ((g = f), (m = (1 << g) - 1), (p = !1));
        else (++g, (m = g === e6 ? 1 << g : (1 << g) - 1));
      if (E == y) {
        while (d > 0) {
          if (((o[b++] = u & 255), b >= 254)) (i.writeByte(b), i.writeBytesView(o, 0, b), (b = 0));
          ((u >>= 8), (d -= 8));
        }
        if (b > 0) (i.writeByte(b), i.writeBytesView(o, 0, b), (b = 0));
      }
    }
  }
  var JJ = $J;
  function _N(e, t, r) {
    return ((e << 8) & 63488) | ((t << 2) & 992) | (r >> 3);
  }
  function vN(e, t, r, n) {
    return (e >> 4) | (t & 240) | ((r & 240) << 4) | ((n & 240) << 8);
  }
  function CN(e, t, r) {
    return ((e >> 4) << 8) | (t & 240) | (r >> 4);
  }
  function jb(e, t, r) {
    return e < t ? t : e > r ? r : e;
  }
  function f3(e) {
    return e * e;
  }
  function AN(e, t, r) {
    var n = 0,
      i = 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    let o = e[t],
      { cnt: s, ac: a, rc: l, gc: c, bc: u } = o;
    for (var d = o.fw; d != 0; d = e[d].fw) {
      let f = e[d],
        p = f.cnt,
        g = (s * p) / (s + p);
      if (g >= i) continue;
      var h = 0;
      if (r) {
        if (((h += g * f3(f.ac - a)), h >= i)) continue;
      }
      if (((h += g * f3(f.rc - l)), h >= i)) continue;
      if (((h += g * f3(f.gc - c)), h >= i)) continue;
      if (((h += g * f3(f.bc - u)), h >= i)) continue;
      ((i = h), (n = d));
    }
    ((o.err = i), (o.nn = n));
  }
  function t6() {
    return { ac: 0, rc: 0, gc: 0, bc: 0, cnt: 0, nn: 0, fw: 0, bk: 0, tm: 0, mtm: 0, err: 0 };
  }
  function eee(e, t) {
    let n = Array(t === "rgb444" ? 4096 : 65536),
      i = e.length;
    if (t === "rgba4444")
      for (let o = 0; o < i; ++o) {
        let s = e[o],
          a = (s >> 24) & 255,
          l = (s >> 16) & 255,
          c = (s >> 8) & 255,
          u = s & 255,
          d = vN(u, c, l, a),
          h = d in n ? n[d] : (n[d] = t6());
        ((h.rc += u), (h.gc += c), (h.bc += l), (h.ac += a), h.cnt++);
      }
    else if (t === "rgb444")
      for (let o = 0; o < i; ++o) {
        let s = e[o],
          a = (s >> 16) & 255,
          l = (s >> 8) & 255,
          c = s & 255,
          u = CN(c, l, a),
          d = u in n ? n[u] : (n[u] = t6());
        ((d.rc += c), (d.gc += l), (d.bc += a), d.cnt++);
      }
    else
      for (let o = 0; o < i; ++o) {
        let s = e[o],
          a = (s >> 16) & 255,
          l = (s >> 8) & 255,
          c = s & 255,
          u = _N(c, l, a),
          d = u in n ? n[u] : (n[u] = t6());
        ((d.rc += c), (d.gc += l), (d.bc += a), d.cnt++);
      }
    return n;
  }
  function tee(e, t, r = {}) {
    let {
      format: n = "rgb565",
      clearAlpha: i = !0,
      clearAlphaColor: o = 0,
      clearAlphaThreshold: s = 0,
      oneBitAlpha: a = !1,
    } = r;
    if (!e || !e.buffer) throw Error("quantize() expected RGBA Uint8Array data");
    if (!(e instanceof Uint8Array) && !(e instanceof Uint8ClampedArray))
      throw Error("quantize() expected RGBA Uint8Array data");
    let l = new Uint32Array(e.buffer),
      c = r.useSqrt !== !1,
      u = n === "rgba4444",
      d = eee(l, n),
      h = d.length,
      f = h - 1,
      p = new Uint32Array(h + 1);
    var g = 0;
    for (var A = 0; A < h; ++A) {
      let L = d[A];
      if (L != null) {
        var m = 1 / L.cnt;
        if (u) L.ac *= m;
        ((L.rc *= m), (L.gc *= m), (L.bc *= m), (d[g++] = L));
      }
    }
    if (f3(t) / g < 0.022) c = !1;
    var A = 0;
    for (; A < g - 1; ++A)
      if (((d[A].fw = A + 1), (d[A + 1].bk = A), c)) d[A].cnt = Math.sqrt(d[A].cnt);
    if (c) d[A].cnt = Math.sqrt(d[A].cnt);
    var y, x, b;
    for (A = 0; A < g; ++A) {
      AN(d, A, !1);
      var v = d[A].err;
      for (x = ++p[0]; x > 1; x = b) {
        if (((b = x >> 1), d[(y = p[b])].err <= v)) break;
        p[x] = y;
      }
      p[x] = A;
    }
    var _ = g - t;
    for (A = 0; A < _; ) {
      var w;
      for (;;) {
        var S = p[1];
        if (((w = d[S]), w.tm >= w.mtm && d[w.nn].mtm <= w.tm)) break;
        if (w.mtm == f) S = p[1] = p[p[0]--];
        else (AN(d, S, !1), (w.tm = A));
        var v = d[S].err;
        for (x = 1; (b = x + x) <= p[0]; x = b) {
          if (b < p[0] && d[p[b]].err > d[p[b + 1]].err) b++;
          if (v <= d[(y = p[b])].err) break;
          p[x] = y;
        }
        p[x] = S;
      }
      var E = d[w.nn],
        T = w.cnt,
        M = E.cnt,
        m = 1 / (T + M);
      if (u) w.ac = m * (T * w.ac + M * E.ac);
      ((w.rc = m * (T * w.rc + M * E.rc)),
        (w.gc = m * (T * w.gc + M * E.gc)),
        (w.bc = m * (T * w.bc + M * E.bc)),
        (w.cnt += E.cnt),
        (w.mtm = ++A),
        (d[E.bk].fw = E.fw),
        (d[E.fw].bk = E.bk),
        (E.mtm = f));
    }
    let C = [];
    var R = 0;
    for (A = 0; ; ++R) {
      let B = jb(Math.round(d[A].rc), 0, 255),
        L = jb(Math.round(d[A].gc), 0, 255),
        k = jb(Math.round(d[A].bc), 0, 255),
        z = 255;
      if (u) {
        if (((z = jb(Math.round(d[A].ac), 0, 255)), a))
          z = z <= (typeof a === "number" ? a : 127) ? 0 : 255;
        if (i && z <= s) ((B = L = k = o), (z = 0));
      }
      let X = u ? [B, L, k, z] : [B, L, k];
      if (!ree(C, X)) C.push(X);
      if ((A = d[A].fw) == 0) break;
    }
    return C;
  }
  function ree(e, t) {
    for (let r = 0; r < e.length; r++) {
      let n = e[r],
        i = n[0] === t[0] && n[1] === t[1] && n[2] === t[2],
        o = n.length >= 4 && t.length >= 4 ? n[3] === t[3] : !0;
      if (i && o) return !0;
    }
    return !1;
  }
  function qb(e, t) {
    var r = 0,
      n;
    for (n = 0; n < e.length; n++) {
      let i = e[n] - t[n];
      r += i * i;
    }
    return r;
  }
  function Kb(e, t) {
    return t > 1 ? Math.round(e / t) * t : e;
  }
  function nee(e, { roundRGB: t = 5, roundAlpha: r = 10, oneBitAlpha: n = null } = {}) {
    let i = new Uint32Array(e.buffer);
    for (let o = 0; o < i.length; o++) {
      let s = i[o],
        a = (s >> 24) & 255,
        l = (s >> 16) & 255,
        c = (s >> 8) & 255,
        u = s & 255;
      if (((a = Kb(a, r)), n)) a = a <= (typeof n === "number" ? n : 127) ? 0 : 255;
      ((u = Kb(u, t)),
        (c = Kb(c, t)),
        (l = Kb(l, t)),
        (i[o] = (a << 24) | (l << 16) | (c << 8) | (u << 0)));
    }
  }
  function iee(e, t, r = "rgb565") {
    if (!e || !e.buffer) throw Error("quantize() expected RGBA Uint8Array data");
    if (!(e instanceof Uint8Array) && !(e instanceof Uint8ClampedArray))
      throw Error("quantize() expected RGBA Uint8Array data");
    if (t.length > 256) throw Error("applyPalette() only works with 256 colors or less");
    let n = new Uint32Array(e.buffer),
      i = n.length,
      o = r === "rgb444" ? 4096 : 65536,
      s = new Uint8Array(i),
      a = Array(o),
      l = r === "rgba4444";
    if (r === "rgba4444")
      for (let c = 0; c < i; c++) {
        let u = n[c],
          d = (u >> 24) & 255,
          h = (u >> 16) & 255,
          f = (u >> 8) & 255,
          p = u & 255,
          g = vN(p, f, h, d),
          m = g in a ? a[g] : (a[g] = oee(p, f, h, d, t));
        s[c] = m;
      }
    else {
      let c = r === "rgb444" ? CN : _N;
      for (let u = 0; u < i; u++) {
        let d = n[u],
          h = (d >> 16) & 255,
          f = (d >> 8) & 255,
          p = d & 255,
          g = c(p, f, h),
          m = g in a ? a[g] : (a[g] = see(p, f, h, t));
        s[u] = m;
      }
    }
    return s;
  }
  function oee(e, t, r, n, i) {
    let o = 0,
      s = 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    for (let a = 0; a < i.length; a++) {
      let l = i[a],
        c = l[3],
        u = r0(c - n);
      if (u > s) continue;
      let d = l[0];
      if (((u += r0(d - e)), u > s)) continue;
      let h = l[1];
      if (((u += r0(h - t)), u > s)) continue;
      let f = l[2];
      if (((u += r0(f - r)), u > s)) continue;
      ((s = u), (o = a));
    }
    return o;
  }
  function see(e, t, r, n) {
    let i = 0,
      o = 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    for (let s = 0; s < n.length; s++) {
      let a = n[s],
        l = a[0],
        c = r0(l - e);
      if (c > o) continue;
      let u = a[1];
      if (((c += r0(u - t)), c > o)) continue;
      let d = a[2];
      if (((c += r0(d - r)), c > o)) continue;
      ((o = c), (i = s));
    }
    return i;
  }
  function aee(e, t, r = 5) {
    if (!e.length || !t.length) return;
    let n = e.map((s) => s.slice(0, 3)),
      i = r * r,
      o = e[0].length;
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (a.length < o) a = [a[0], a[1], a[2], 255];
      else if (a.length > o) a = a.slice(0, 3);
      else a = a.slice();
      let l = TN(n, a.slice(0, 3), qb),
        c = l[0],
        u = l[1];
      if (u > 0 && u <= i) e[c] = a;
    }
  }
  function r0(e) {
    return e * e;
  }
  function wN(e, t, r = qb) {
    let n = 1 / 0,
      i = -1;
    for (let o = 0; o < e.length; o++) {
      let s = e[o],
        a = r(t, s);
      if (a < n) ((n = a), (i = o));
    }
    return i;
  }
  function TN(e, t, r = qb) {
    let n = 1 / 0,
      i = -1;
    for (let o = 0; o < e.length; o++) {
      let s = e[o],
        a = r(t, s);
      if (a < n) ((n = a), (i = o));
    }
    return [i, n];
  }
  function lee(e, t, r = qb) {
    return e[wN(e, t, r)];
  }
  function EN(e = {}) {
    let { initialCapacity: t = 4096, auto: r = !0 } = e,
      n = bN(t),
      i = 5003,
      o = new Uint8Array(256),
      s = new Int32Array(5003),
      a = new Int32Array(5003),
      l = !1;
    return {
      reset() {
        (n.reset(), (l = !1));
      },
      finish() {
        n.writeByte(qJ.trailer);
      },
      bytes() {
        return n.bytes();
      },
      bytesView() {
        return n.bytesView();
      },
      get buffer() {
        return n.buffer;
      },
      get stream() {
        return n;
      },
      writeHeader: c,
      writeFrame(u, d, h, f = {}) {
        let {
            transparent: p = !1,
            transparentIndex: g = 0,
            delay: m = 0,
            palette: A = null,
            repeat: y = 0,
            colorDepth: x = 8,
            dispose: b = -1,
          } = f,
          v = !1;
        if (r) {
          if (!l) ((v = !0), c(), (l = !0));
        } else v = Boolean(f.first);
        if (((d = Math.max(0, Math.floor(d))), (h = Math.max(0, Math.floor(h))), v)) {
          if (!A) throw Error("First frame must include a { palette } option");
          if ((uee(n, d, h, A, x), yN(n, A), y >= 0)) dee(n, y);
        }
        let _ = Math.round(m / 10);
        cee(n, b, _, p, g);
        let w = Boolean(A) && !v;
        if ((hee(n, d, h, w ? A : null), w)) yN(n, A);
        fee(n, u, d, h, x, o, s, a);
      },
    };
    function c() {
      SN(n, "GIF89a");
    }
  }
  function cee(e, t, r, n, i) {
    if ((e.writeByte(33), e.writeByte(249), e.writeByte(4), i < 0)) ((i = 0), (n = !1));
    var o, s;
    if (!n) ((o = 0), (s = 0));
    else ((o = 1), (s = 2));
    if (t >= 0) s = t & 7;
    s <<= 2;
    let a = 0;
    (e.writeByte(0 | s | a | o), th(e, r), e.writeByte(i || 0), e.writeByte(0));
  }
  function uee(e, t, r, n, i = 8) {
    let a = r6(n.length) - 1,
      l = 128 | ((i - 1) << 4) | 0 | a,
      c = 0,
      u = 0;
    (th(e, t), th(e, r), e.writeBytes([l, 0, 0]));
  }
  function dee(e, t) {
    (e.writeByte(33),
      e.writeByte(255),
      e.writeByte(11),
      SN(e, "NETSCAPE2.0"),
      e.writeByte(3),
      e.writeByte(1),
      th(e, t),
      e.writeByte(0));
  }
  function yN(e, t) {
    let r = 1 << r6(t.length);
    for (let n = 0; n < r; n++) {
      let i = [0, 0, 0];
      if (n < t.length) i = t[n];
      (e.writeByte(i[0]), e.writeByte(i[1]), e.writeByte(i[2]));
    }
  }
  function hee(e, t, r, n) {
    if ((e.writeByte(44), th(e, 0), th(e, 0), th(e, t), th(e, r), n)) {
      let s = r6(n.length) - 1;
      e.writeByte(128 | s);
    } else e.writeByte(0);
  }
  function fee(e, t, r, n, i = 8, o, s, a) {
    JJ(r, n, t, i, e, o, s, a);
  }
  function th(e, t) {
    (e.writeByte(t & 255), e.writeByte((t >> 8) & 255));
  }
  function SN(e, t) {
    for (var r = 0; r < t.length; r++) e.writeByte(t.charCodeAt(r));
  }
  function r6(e) {
    return Math.max(Math.ceil(Math.log2(e)), 1);
  }
  var pee = EN;
});
