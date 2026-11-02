// src/vendor/ndarray.js
// ndarray + is-buffer (dependencies of the texture tools).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var pD = Dc(function (Zge, fD) {
  function B$(e) {
    var t = Array(e);
    for (var r = 0; r < e; ++r) t[r] = r;
    return t;
  }
  fD.exports = B$;
});
var AD = Dc(function ($ge, gD) {
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */ gD.exports = function (e) {
    return e != null && (mD(e) || F$(e) || !!e._isBuffer);
  };
  function mD(e) {
    return (
      !!e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e)
    );
  }
  function F$(e) {
    return (
      typeof e.readFloatLE === "function" && typeof e.slice === "function" && mD(e.slice(0, 0))
    );
  }
});
var xD = Dc(function (Jge, yD) {
  var D$ = pD(),
    N$ = AD(),
    P$ = typeof Float64Array < "u";
  function k$(e, t) {
    return e[0] - t[0];
  }
  function U$() {
    var e = this.stride,
      t = Array(e.length),
      r;
    for (r = 0; r < t.length; ++r) t[r] = [Math.abs(e[r]), r];
    t.sort(k$);
    var n = Array(t.length);
    for (r = 0; r < n.length; ++r) n[r] = t[r][1];
    return n;
  }
  function H$(e, t) {
    var r = ["View", t, "d", e].join("");
    if (t < 0) r = "View_Nil" + e;
    var n = e === "generic";
    if (t === -1) {
      var i =
          "function " +
          r +
          "(a){this.data=a;};var proto=" +
          r +
          ".prototype;proto.dtype='" +
          e +
          "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
          r +
          "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" +
          r +
          "(a){return new " +
          r +
          "(a);}",
        g = Function(i);
      return g();
    } else if (t === 0) {
      var i =
          "function " +
          r +
          "(a,d) {this.data = a;this.offset = d};var proto=" +
          r +
          ".prototype;proto.dtype='" +
          e +
          "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
          r +
          "_copy() {return new " +
          r +
          "(this.data,this.offset)};proto.pick=function " +
          r +
          "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " +
          r +
          "_get(){return " +
          (n ? "this.data.get(this.offset)" : "this.data[this.offset]") +
          "};proto.set=function " +
          r +
          "_set(v){return " +
          (n ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") +
          "};return function construct_" +
          r +
          "(a,b,c,d){return new " +
          r +
          "(a,d)}",
        g = Function("TrivialArray", i);
      return g(Sb[e][0]);
    }
    var i = ["'use strict'"],
      o = D$(t),
      s = o.map(function (m) {
        return "i" + m;
      }),
      a =
        "this.offset+" +
        o
          .map(function (m) {
            return "this.stride[" + m + "]*i" + m;
          })
          .join("+"),
      l = o
        .map(function (m) {
          return "b" + m;
        })
        .join(","),
      c = o
        .map(function (m) {
          return "c" + m;
        })
        .join(",");
    if (
      (i.push(
        "function " + r + "(a," + l + "," + c + ",d){this.data=a",
        "this.shape=[" + l + "]",
        "this.stride=[" + c + "]",
        "this.offset=d|0}",
        "var proto=" + r + ".prototype",
        "proto.dtype='" + e + "'",
        "proto.dimension=" + t,
      ),
      i.push(
        "Object.defineProperty(proto,'size',{get:function " +
          r +
          "_size(){return " +
          o
            .map(function (m) {
              return "this.shape[" + m + "]";
            })
            .join("*"),
        "}})",
      ),
      t === 1)
    )
      i.push("proto.order=[0]");
    else if ((i.push("Object.defineProperty(proto,'order',{get:"), t < 4)) {
      if ((i.push("function " + r + "_order(){"), t === 2))
        i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
      else if (t === 3)
        i.push(
          "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})",
        );
    } else i.push("ORDER})");
    if ((i.push("proto.set=function " + r + "_set(" + s.join(",") + ",v){"), n))
      i.push("return this.data.set(" + a + ",v)}");
    else i.push("return this.data[" + a + "]=v}");
    if ((i.push("proto.get=function " + r + "_get(" + s.join(",") + "){"), n))
      i.push("return this.data.get(" + a + ")}");
    else i.push("return this.data[" + a + "]}");
    (i.push("proto.index=function " + r + "_index(", s.join(), "){return " + a + "}"),
      i.push(
        "proto.hi=function " +
          r +
          "_hi(" +
          s.join(",") +
          "){return new " +
          r +
          "(this.data," +
          o
            .map(function (m) {
              return [
                "(typeof i",
                m,
                "!=='number'||i",
                m,
                "<0)?this.shape[",
                m,
                "]:i",
                m,
                "|0",
              ].join("");
            })
            .join(",") +
          "," +
          o
            .map(function (m) {
              return "this.stride[" + m + "]";
            })
            .join(",") +
          ",this.offset)}",
      ));
    var u = o.map(function (m) {
        return "a" + m + "=this.shape[" + m + "]";
      }),
      d = o.map(function (m) {
        return "c" + m + "=this.stride[" + m + "]";
      });
    i.push(
      "proto.lo=function " +
        r +
        "_lo(" +
        s.join(",") +
        "){var b=this.offset,d=0," +
        u.join(",") +
        "," +
        d.join(","),
    );
    for (var h = 0; h < t; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'&&i" +
          h +
          ">=0){d=i" +
          h +
          "|0;b+=c" +
          h +
          "*d;a" +
          h +
          "-=d}",
      );
    (i.push(
      "return new " +
        r +
        "(this.data," +
        o
          .map(function (m) {
            return "a" + m;
          })
          .join(",") +
        "," +
        o
          .map(function (m) {
            return "c" + m;
          })
          .join(",") +
        ",b)}",
    ),
      i.push(
        "proto.step=function " +
          r +
          "_step(" +
          s.join(",") +
          "){var " +
          o
            .map(function (m) {
              return "a" + m + "=this.shape[" + m + "]";
            })
            .join(",") +
          "," +
          o
            .map(function (m) {
              return "b" + m + "=this.stride[" + m + "]";
            })
            .join(",") +
          ",c=this.offset,d=0,ceil=Math.ceil",
      ));
    for (var h = 0; h < t; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'){d=i" +
          h +
          "|0;if(d<0){c+=b" +
          h +
          "*(a" +
          h +
          "-1);a" +
          h +
          "=ceil(-a" +
          h +
          "/d)}else{a" +
          h +
          "=ceil(a" +
          h +
          "/d)}b" +
          h +
          "*=d}",
      );
    i.push(
      "return new " +
        r +
        "(this.data," +
        o
          .map(function (m) {
            return "a" + m;
          })
          .join(",") +
        "," +
        o
          .map(function (m) {
            return "b" + m;
          })
          .join(",") +
        ",c)}",
    );
    var f = Array(t),
      p = Array(t);
    for (var h = 0; h < t; ++h) ((f[h] = "a[i" + h + "]"), (p[h] = "b[i" + h + "]"));
    (i.push(
      "proto.transpose=function " +
        r +
        "_transpose(" +
        s +
        "){" +
        s
          .map(function (m, A) {
            return m + "=(" + m + "===undefined?" + A + ":" + m + "|0)";
          })
          .join(";"),
      "var a=this.shape,b=this.stride;return new " +
        r +
        "(this.data," +
        f.join(",") +
        "," +
        p.join(",") +
        ",this.offset)}",
    ),
      i.push("proto.pick=function " + r + "_pick(" + s + "){var a=[],b=[],c=this.offset"));
    for (var h = 0; h < t; ++h)
      i.push(
        "if(typeof i" +
          h +
          "==='number'&&i" +
          h +
          ">=0){c=(c+this.stride[" +
          h +
          "]*i" +
          h +
          ")|0}else{a.push(this.shape[" +
          h +
          "]);b.push(this.stride[" +
          h +
          "])}",
      );
    (i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),
      i.push(
        "return function construct_" +
          r +
          "(data,shape,stride,offset){return new " +
          r +
          "(data," +
          o
            .map(function (m) {
              return "shape[" + m + "]";
            })
            .join(",") +
          "," +
          o
            .map(function (m) {
              return "stride[" + m + "]";
            })
            .join(",") +
          ",offset)}",
      ));
    var g = Function(
      "CTOR_LIST",
      "ORDER",
      i.join(`
`),
    );
    return g(Sb[e], U$);
  }
  function G$(e) {
    if (N$(e)) return "buffer";
    if (P$)
      switch (Object.prototype.toString.call(e)) {
        case "[object Float64Array]":
          return "float64";
        case "[object Float32Array]":
          return "float32";
        case "[object Int8Array]":
          return "int8";
        case "[object Int16Array]":
          return "int16";
        case "[object Int32Array]":
          return "int32";
        case "[object Uint8Array]":
          return "uint8";
        case "[object Uint16Array]":
          return "uint16";
        case "[object Uint32Array]":
          return "uint32";
        case "[object Uint8ClampedArray]":
          return "uint8_clamped";
        case "[object BigInt64Array]":
          return "bigint64";
        case "[object BigUint64Array]":
          return "biguint64";
      }
    if (Array.isArray(e)) return "array";
    return "generic";
  }
  var Sb = {
    float32: [],
    float64: [],
    int8: [],
    int16: [],
    int32: [],
    uint8: [],
    uint16: [],
    uint32: [],
    array: [],
    uint8_clamped: [],
    bigint64: [],
    biguint64: [],
    buffer: [],
    generic: [],
  };
  function z$(e, t, r, n) {
    if (e === void 0) {
      var c = Sb.array[0];
      return c([]);
    } else if (typeof e === "number") e = [e];
    if (t === void 0) t = [e.length];
    var i = t.length;
    if (r === void 0) {
      r = Array(i);
      for (var o = i - 1, s = 1; o >= 0; --o) ((r[o] = s), (s *= t[o]));
    }
    if (n === void 0) {
      n = 0;
      for (var o = 0; o < i; ++o) if (r[o] < 0) n -= (t[o] - 1) * r[o];
    }
    var a = G$(e),
      l = Sb[a];
    while (l.length <= i + 1) l.push(H$(a, l.length - 1));
    var c = l[i + 1];
    return c(e, t, r, n);
  }
  yD.exports = z$;
});
