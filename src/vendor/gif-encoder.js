// src/vendor/gif-encoder.js
// WebAssembly GIF encoder glue.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

function ck(e, t, r, n, i) {
  try {
    let u = pl.__wbindgen_add_to_stack_pointer(-16),
      d = Are(e, pl.__wbindgen_export),
      h = uk;
    pl.gif(u, d, h, t, r, n, i);
    var o = w_().getInt32(u + 0, !0),
      s = w_().getInt32(u + 4, !0),
      a = w_().getInt32(u + 8, !0),
      l = w_().getInt32(u + 12, !0);
    if (l) throw yre(a);
    var c = pre(o, s).slice();
    return (pl.__wbindgen_export2(o, s * 1, 1), c);
  } finally {
    pl.__wbindgen_add_to_stack_pointer(16);
  }
}
function dre() {
  return {
    __proto__: null,
    "./gif_bg.js": {
      __proto__: null,
      __wbindgen_cast_0000000000000001: function (t, r) {
        let n = mre(t, r);
        return hre(n);
      },
    },
  };
}
function hre(e) {
  if (F3 === Wu.length) Wu.push(Wu.length + 1);
  let t = F3;
  return ((F3 = Wu[t]), (Wu[t] = e), t);
}
function fre(e) {
  if (e < 1028) return;
  ((Wu[e] = F3), (F3 = e));
}
function pre(e, t) {
  return ((e = e >>> 0), z6().subarray(e / 1, e / 1 + t));
}
var o0 = null;
function w_() {
  if (
    o0 === null ||
    o0.buffer.detached === !0 ||
    (o0.buffer.detached === void 0 && o0.buffer !== pl.memory.buffer)
  )
    o0 = new DataView(pl.memory.buffer);
  return o0;
}
function mre(e, t) {
  return bre(e >>> 0, t);
}
var B3 = null;
function z6() {
  if (B3 === null || B3.byteLength === 0) B3 = new Uint8Array(pl.memory.buffer);
  return B3;
}
function gre(e) {
  return Wu[e];
}
var Wu = Array(1024).fill(void 0);
Wu.push(void 0, null, !0, !1);
var F3 = Wu.length;
function Are(e, t) {
  let r = t(e.length * 1, 1) >>> 0;
  return (z6().set(e, r / 1), (uk = e.length), r);
}
function yre(e) {
  let t = gre(e);
  return (fre(e), t);
}
var T_ = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
T_.decode();
var xre = 2146435072,
  G6 = 0;
function bre(e, t) {
  if (((G6 += t), G6 >= xre))
    ((T_ = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })), T_.decode(), (G6 = t));
  return T_.decode(z6().subarray(e, e + t));
}
var uk = 0,
  _re,
  vre,
  pl;
function Cre(e, t) {
  return ((vre = e), (pl = e.exports), (_re = t), (o0 = null), (B3 = null), pl);
}
async function wre(e, t) {
  if (typeof Response === "function" && e instanceof Response) {
    if (!e.ok) throw Error(`failed to fetch Wasm: ${e.status} ${e.statusText} fetching '${e.url}'`);
    if (typeof WebAssembly.instantiateStreaming === "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (i) {
        if (r(e.type) && e.headers.get("Content-Type") !== "application/wasm");
        else throw i;
      }
    let n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  } else {
    let n = await WebAssembly.instantiate(e, t);
    if (n instanceof WebAssembly.Instance) return { instance: n, module: e };
    else return n;
  }
  function r(n) {
    switch (n) {
      case "basic":
      case "cors":
      case "default":
        return !0;
    }
    return !1;
  }
}
async function dk(e) {
  if (pl !== void 0) return pl;
  if (e !== void 0) {
    if (Object.getPrototypeOf(e) === Object.prototype) ({ module_or_path: e } = e);
  }
  if (e === void 0) e = new URL("./gif_bg.wasm", import.meta.url);
  let t = dre();
  if (
    typeof e === "string" ||
    (typeof Request === "function" && e instanceof Request) ||
    (typeof URL === "function" && e instanceof URL)
  )
    e = fetch(e);
  let { instance: r, module: n } = await wre(await e, t);
  return Cre(r, n);
}
