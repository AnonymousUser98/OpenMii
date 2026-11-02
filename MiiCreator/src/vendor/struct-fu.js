// src/vendor/struct-fu.js
// struct-fu: binary struct definitions for Mii data formats.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var Nc = Dc(function (e7, EA) {
  /*!
   * struct-fu library: https://github.com/natevw/struct-fu
   * forked by ariankordi: https://github.com/ariankordi/struct-fu
   * @author Nathan Vander Wilt <https://github.com/natevw>
   * @license Apache-2.0
   * @license BSD-2-Clause
   */ (function (e, t) {
    if (typeof define === "function" && define.amd) define([], t);
    else if (typeof EA === "object" && EA.exports)
      EA.exports = t(globalThis.TextEncoder, globalThis.TextDecoder);
    else e._ = t(e.TextEncoder, e.TextDecoder);
  })(typeof self < "u" ? self : e7, function (e, t) {
    var r = {};
    if (!("bind" in Function.prototype))
      Function.prototype.bind = function (g) {
        var m = this;
        if (arguments.length <= 1)
          return function () {
            return m.apply(g, arguments);
          };
        var A = Array.prototype.slice.call(arguments, 1);
        return function () {
          return m.apply(
            g,
            arguments.length === 0 ? A : A.concat(Array.prototype.slice.call(arguments)),
          );
        };
      };
    function n(g) {
      return new Uint8Array(new ArrayBuffer(g));
    }
    function i(g) {
      var m = Array.prototype.slice.call(arguments, 1);
      return (
        m.forEach(function (A) {
          Object.keys(A).forEach(function (y) {
            g[y] = A[y];
          });
        }),
        g
      );
    }
    function o(g, m) {
      if ("width" in m && typeof m.width === "number") {
        g.bits = (g.bits || 0) + m.width;
        while ((g.bits || 0) > 7) ((g.bytes += 1), (g.bits -= 8));
      } else if (!g.bits) g.bytes += m.size || 0;
      else throw Error("Improperly aligned bitfield before field: " + (m.name || ""));
      return g;
    }
    function s(g, m) {
      var A =
        typeof m === "number"
          ? i(
              {
                name: g.name,
                field: g,
                unpack: function (y, x) {
                  x || (x = { bytes: 0, bits: 0 });
                  var b = Array(m);
                  for (var v = 0, _ = b.length; v < _; v += 1) b[v] = g.unpack(y, x);
                  return b;
                },
                pack: function (y, x, b) {
                  (y || (y = Array(m)), x || (x = n(this.size)), b || (b = { bytes: 0, bits: 0 }));
                  for (var v = 0, _ = Math.min(y.length, m); v < _; v += 1) g.pack(y[v], x, b);
                  while (v++ < m) o(b, g);
                  return x;
                },
              },
              g.width !== void 0 ? { width: g.width * m } : { size: g.size * m },
            )
          : g;
      return A;
    }
    r.struct = function (g, m, A) {
      var y, x;
      if (typeof g !== "string") ((A = m), (x = g));
      else ((y = g), (x = m));
      var b = { bytes: 0, bits: 0 },
        v = Object.create(null);
      function _(E, T) {
        if ("_padTo" in T) {
          var M = T;
          if (!M._id) M._id = "id" + Math.random().toFixed(20).slice(2);
          var C = M._padTo - b.bytes;
          if (b.bits) {
            var R = 8 * C - b.bits;
            if (R < 0)
              throw Error(
                "Invalid .padTo(" +
                  M._padTo +
                  ") field, struct is already " +
                  b.bytes +
                  " byte(s) and " +
                  b.bits +
                  " bits!",
              );
            ((v[M._id] = { width: R }), (T.width = R));
          } else {
            if (C < 0)
              throw Error(
                "Invalid .padTo(" + M._padTo + ") field, struct is already " + b.bytes + " bytes!",
              );
            ((v[M._id] = { size: C }), (T.size = C));
          }
        }
        if (T._hoistFields) {
          var B = T._hoistFields;
          Object.keys(B).forEach(function (k) {
            var z = Object.create(B[k]);
            if ("width" in z && typeof z.width === "number")
              z.offset = { bytes: z.offset.bytes + b.bytes, bits: z.offset.bits };
            else z.offset = z.offset + b.bytes;
            E[k] = z;
          });
        } else if (T.name) {
          var L = Object.create(T);
          if ("width" in L && typeof L.width === "number")
            L.offset = { bytes: b.bytes, bits: b.bits };
          else L.offset = b.bytes;
          E[T.name] = L;
        }
        return (o(b, T), E);
      }
      var w = x.reduce(_, {});
      if (b.bits) throw Error("Improperly aligned bitfield at end of struct: " + (y || ""));
      var S = {
        unpack: function (E, T) {
          T = T || { bytes: 0, bits: 0 };
          var M = {};
          return (
            x.forEach(function (C) {
              if ("_padTo" in C && C._id !== void 0) {
                o(T, v[C._id]);
                return;
              }
              var R = C.unpack(E, T);
              if (C.name) M[C.name] = R;
              else if (typeof R === "object") i(M, R);
            }),
            M
          );
        },
        pack: function (E, T, M) {
          if (((E = E || {}), !T)) T = n(this.size);
          return (
            (M = M || { bytes: 0, bits: 0 }),
            x.forEach(function (C) {
              if ("_padTo" in C && C._id !== void 0) {
                o(M, v[C._id]);
                return;
              }
              var R = C.name ? E[C.name] : E;
              C.pack(R, T, M);
            }),
            T
          );
        },
        _hoistFields: y ? null : w,
        fields: w,
        size: b.bytes,
        name: y,
      };
      return s(S, A);
    };
    function a(g, m, A) {
      var y = g instanceof ArrayBuffer ? new Uint8Array(g) : g,
        x = y.length - m,
        b = new DataView(y.buffer, y.byteOffset, y.byteLength);
      if (x >= 4) return b.getUint32(m, A);
      else if (x === 3) {
        var v = b.getUint16(m, A),
          _ = b.getUint8(m + 2);
        return A ? ((_ << 16) + v) >>> 0 : (((v << 8) + _) << 8) >>> 0;
      } else if (x === 2) return (b.getUint16(m, A) << (A ? 0 : 16)) >>> 0;
      else if (x === 1) return (b.getUint8(m) << (A ? 0 : 24)) >>> 0;
      return 0;
    }
    function l(g, m, A, y) {
      var x = g instanceof ArrayBuffer ? new Uint8Array(g) : g,
        b = x.length - m,
        v = new DataView(x.buffer, x.byteOffset, x.byteLength);
      if (b >= 4) v.setUint32(m, A, y);
      else if (b === 3)
        if (y) (v.setUint8(m, A & 255), v.setUint16(m + 1, A >>> 8, y));
        else (v.setUint16(m, A >>> 16, y), v.setUint8(m + 2, (A >>> 8) & 255));
      else if (b === 2) v.setUint16(m, y ? A & 65535 : A >>> 16, y);
      else if (b === 1) v.setUint8(m, y ? A & 255 : A >>> 24);
    }
    r.padTo = function (g) {
      var m = {
        _padTo: g,
        size: 0,
        unpack: function () {
          return null;
        },
        pack: function () {
          return n(0);
        },
      };
      return m;
    };
    var c = 4294967295;
    function u(g, m, A) {
      if (m === void 0) m = 1;
      if (m > 24) throw Error("Bitfields support a maximum width of 24 bits.");
      var y = c >>> (32 - m),
        x = this.littleEndian;
      if (x) y >>>= 0;
      var b = this;
      return s(
        {
          unpack: function (v, _) {
            _ = _ || { bytes: 0, bits: 0 };
            var w, S, E;
            if (x) ((S = _.bits || 0), (E = a(v, _.bytes, !0) >>> 0), (w = E >>> S));
            else ((S = (_.bits || 0) + m), (E = a(v, _.bytes, !1) || 0), (w = E >>> (32 - S)));
            return (o(_, this), b.b2v.call(this, w & y));
          },
          pack: function (v, _, w) {
            if (((v = b.v2b.call(this, v || 0)), !_)) _ = n(this.size);
            w = w || { bytes: 0, bits: 0 };
            var S, E, T;
            if (x) {
              S = a(_, w.bytes, !0) >>> 0;
              var M = w.bits || 0;
              ((E = (y << M) >>> 0),
                (S &= ~E),
                (T = (v & y) << M),
                (S = (S | T) >>> 0),
                l(_, w.bytes, S, !0));
            } else {
              var C = (w.bits || 0) + m;
              ((S = a(_, w.bytes, !1) || 0),
                (E = y << (32 - C)),
                (T = (v & y) << (32 - C)),
                (S &= ~E),
                (S = (S | T) >>> 0),
                l(_, w.bytes, S, !1));
            }
            return (o(w, this), new Uint8Array(_));
          },
          width: m,
          size: 0,
          name: g,
        },
        A,
      );
    }
    ((r.bool = function (g, m) {
      return u.call(
        {
          b2v: function (A) {
            return Boolean(A);
          },
          v2b: function (A) {
            return A ? c : 0;
          },
        },
        g,
        1,
        m,
      );
    }),
      (r.ubit = u.bind({
        b2v: function (g) {
          return g;
        },
        v2b: function (g) {
          return Number(g);
        },
      })),
      (r.ubitLE = u.bind({
        b2v: function (g) {
          return g;
        },
        v2b: function (g) {
          return Number(g);
        },
        littleEndian: !0,
      })),
      (r.sbit = u.bind({
        b2v: function (g) {
          var m = 1 << ((this.width || 1) - 1),
            A = g & m;
          return A ? -(g &= ~m) : g;
        },
        v2b: function (g) {
          g = Number(g);
          var m = 1 << ((this.width || 1) - 1),
            A = g < 0;
          return A ? -g | m : g;
        },
      })));
    function d(g, m, A) {
      var y,
        x = 1;
      if (typeof g === "string") {
        if (((y = g), typeof m === "number")) x = m;
      } else ((x = g), (A = m));
      var b = this;
      return s(
        {
          name: y,
          size: x,
          unpack: function (v, _) {
            _ = _ || { bytes: 0, bits: 0 };
            var w = v instanceof ArrayBuffer ? new Uint8Array(v) : v,
              S = w.subarray(_.bytes, _.bytes + this.size);
            return (o(_, this), b.b2v.call(this, S));
          },
          pack: function (v, _, w) {
            if (!_) _ = n(this.size);
            w = w || { bytes: 0, bits: 0 };
            var S = _ instanceof ArrayBuffer ? new Uint8Array(_) : _,
              E = S.subarray(w.bytes, w.bytes + this.size);
            return (b.vTb.call(this, v, E), o(w, this), _);
          },
          b2v: function (v) {
            return v;
          },
          vTb: function (v, _) {
            if (!v) return 0;
            var w = new Uint8Array(v);
            return (_.set(w.subarray(0, _.length)), _.length);
          },
        },
        A,
      );
    }
    function h(g, m) {
      m = m || g;
      var A = g.length;
      for (var y = 1; y < A; y += 2) {
        var x = g[y - 1];
        ((m[y - 1] = g[y]), (m[y] = x));
      }
      return m;
    }
    ((r.byte = d.bind({
      b2v: function (g) {
        return new Uint8Array(g);
      },
      vTb: function (g, m) {
        if (!g) return 0;
        return (m.set(new Uint8Array(g)), g.byteLength);
      },
    })),
      (r.char = d.bind({
        b2v: function (g) {
          var m;
          if (typeof t < "u" && t) m = new t("utf-8");
          else
            m = {
              decode: function (x) {
                var b = new Uint8Array(x),
                  v = "";
                for (var _ = 0; _ < b.length; _++) v += String.fromCharCode(b[_]);
                return v;
              },
            };
          var A = m.decode(g),
            y = A.indexOf("\x00");
          return ~y ? A.slice(0, y) : A;
        },
        vTb: function (g, m) {
          g || (g = "");
          var A;
          if (typeof e < "u" && e) A = new e();
          else
            A = {
              encode: function (b) {
                var v = new Uint8Array(b.length);
                for (var _ = 0; _ < b.length; _++) v[_] = b.charCodeAt(_) & 255;
                return v;
              },
            };
          var y = A.encode(g);
          for (var x = 0; x < y.length && x < m.length; x++) m[x] = y[x];
          return y.length;
        },
      })),
      (r.char16le = d.bind({
        b2v: function (g) {
          var m;
          if (typeof t < "u" && t) m = new t("utf-16le");
          else
            m = {
              decode: function (x) {
                var b = new Uint8Array(x),
                  v = "";
                for (var _ = 0; _ < b.length; _ += 2) {
                  var w = b[_] | (b[_ + 1] << 8);
                  v += String.fromCharCode(w);
                }
                return v;
              },
            };
          var A = m.decode(g),
            y = A.indexOf("\x00");
          return ~y ? A.slice(0, y) : A;
        },
        vTb: function (g, m) {
          g || (g = "");
          var A = 0;
          for (var y = 0; y < g.length && A + 1 < m.length; y++) {
            var x = g.charCodeAt(y);
            ((m[A++] = x & 255), (m[A++] = (x >> 8) & 255));
          }
          return A;
        },
      })),
      (r.char16be = d.bind({
        b2v: function (g) {
          var m = new Uint8Array(g);
          h(m);
          var A;
          if (typeof t < "u" && t) A = new t("utf-16le");
          else
            A = {
              decode: function (b) {
                var v = new Uint8Array(b),
                  _ = "";
                for (var w = 0; w < v.length; w += 2) {
                  var S = v[w] | (v[w + 1] << 8);
                  _ += String.fromCharCode(S);
                }
                return _;
              },
            };
          var y = A.decode(m.buffer),
            x = y.indexOf("\x00");
          return ~x ? y.slice(0, x) : y;
        },
        vTb: function (g, m) {
          g || (g = "");
          var A = new Uint8Array(m.length),
            y = 0;
          for (var x = 0; x < g.length && y + 1 < A.length; x++) {
            var b = g.charCodeAt(x);
            ((A[y++] = b & 255), (A[y++] = (b >> 8) & 255));
          }
          return (h(A, m), y);
        },
      })));
    function f(g, m, A, y) {
      var x = function (b, v) {
        var _;
        if (typeof b === "string") _ = b;
        else v = b;
        return s(
          {
            name: _,
            size: A,
            unpack: function (w, S) {
              S = S || { bytes: 0 };
              var E = w instanceof ArrayBuffer ? new Uint8Array(w) : w,
                T = new DataView(E.buffer, E.byteOffset, E.byteLength),
                M = g.call(T, S.bytes, y);
              return (o(S, this), M);
            },
            pack: function (w, S, E) {
              if (w === void 0 || w === null) w = 0;
              if (!S) S = n(this.size);
              E = E || { bytes: 0 };
              var T = S instanceof ArrayBuffer ? new Uint8Array(S) : S,
                M = new DataView(T.buffer, T.byteOffset, T.byteLength);
              return (m.call(M, E.bytes, w, y), o(E, this), new Uint8Array(S));
            },
          },
          v,
        );
      };
      return x;
    }
    var p = DataView.prototype;
    return (
      (r.uint8 = f(p.getUint8, p.setUint8, 1, !1)),
      (r.uint16 = f(p.getUint16, p.setUint16, 2, !1)),
      (r.uint32 = f(p.getUint32, p.setUint32, 4, !1)),
      (r.uint16le = f(p.getUint16, p.setUint16, 2, !0)),
      (r.uint32le = f(p.getUint32, p.setUint32, 4, !0)),
      (r.int8 = f(p.getInt8, p.setInt8, 1, !1)),
      (r.int16 = f(p.getInt16, p.setInt16, 2, !1)),
      (r.int32 = f(p.getInt32, p.setInt32, 4, !1)),
      (r.int16le = f(p.getInt16, p.setInt16, 2, !0)),
      (r.int32le = f(p.getInt32, p.setInt32, 4, !0)),
      (r.float32 = f(p.getFloat32, p.setFloat32, 4, !1)),
      (r.float64 = f(p.getFloat64, p.setFloat64, 8, !1)),
      (r.float32le = f(p.getFloat32, p.setFloat32, 4, !0)),
      (r.float64le = f(p.getFloat64, p.setFloat64, 8, !0)),
      (r.derive = function (g, m, A) {
        var y = function (x, b) {
          var v = null;
          if (typeof x === "string") v = x;
          else b = x;
          var _ = i(
            {
              unpack: function (w, S) {
                var E = g.unpack(w, S);
                return A(E);
              },
              pack: function (w, S, E) {
                var T = m(w);
                return g.pack(T, S, E);
              },
              name: v,
            },
            "width" in g ? { width: g.width } : { size: g.size },
          );
          return s(_, b);
        };
        return y;
      }),
      r
    );
  });
});
