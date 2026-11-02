// src/vendor/bundler-runtime.js
// Small helpers the bundler (Bun) adds for CommonJS interop and lazy modules.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var zG = Object.create;
var { getPrototypeOf: VG, defineProperty: xv, getOwnPropertyNames: WG } = Object;
var F9 = Object.prototype.hasOwnProperty;
function QG(e) {
  return this[e];
}
var YG,
  XG,
  In = (e, t, r) => {
    var n = e != null && typeof e === "object";
    if (n) {
      var i = t ? (YG ??= /*@__PURE__*/ new WeakMap()) : (XG ??= /*@__PURE__*/ new WeakMap()),
        o = i.get(e);
      if (o) return o;
    }
    r = e != null ? zG(VG(e)) : {};
    let s =
      t || !e || !e.__esModule || !F9.call(e, "default")
        ? xv(r, "default", { value: e, enumerable: !0 })
        : r;
    if ((e && typeof e === "object") || typeof e === "function") {
      for (let a of WG(e)) if (!F9.call(s, a)) xv(s, a, { get: QG.bind(e, a), enumerable: !0 });
    }
    if (n) i.set(e, s);
    return s;
  };
var Dc = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var jG = (e) => e;
function KG(e, t) {
  this[e] = jG.bind(null, t);
}
var qG = (e, t) => {
  for (var r in t) xv(e, r, { get: t[r], enumerable: !0, configurable: !0, set: KG.bind(t, r) });
};
var b0 = /*@__PURE__*/ ((e) =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
      ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] })
      : e)(function (e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
