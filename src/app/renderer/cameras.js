// src/app/renderer/cameras.js
// View types, cameras and render-target helpers.
//
// Defines: PT, ViewType, getCameraForViewType, CL, UT, HT
// Uses from other files:
//   app/i18n/localization.js: getTranslator
//   app/renderer/three-module.js: getTHREE

var translate = getTranslator();
var PT;
((s) => {
  s[(s.default = 0)] = "default";
  s[(s.wiiu = 1)] = "wiiu";
  s[(s.miitomo = 2)] = "miitomo";
  s[(s.wii = 3)] = "wii";
  s[(s.switch = 4)] = "switch";
  s[(s.streetpass = 5)] = "streetpass";
})((PT ||= {}));
var THREE = getTHREE(),
  ViewType = {
    Face: 0,
    MakeIcon: 1,
    IconFovy45: 2,
    AllBody: 3,
    AllBodySugar: 4,
    CreditIcon: 5,
    VariableIconBody: 6,
    SugarRight: 7,
    SugarBack: 8,
    SugarLeft: 9,
    SugarTilt: 10,
  };
function lg(e, t, r, n, i) {
  let s = new THREE.PerspectiveCamera(15, t, 50, 15000),
    a = (e - 0.5) / 0.764,
    l = new THREE.Vector3(0, 65, 0),
    c = new THREE.Vector3(0, 88, 0),
    u = new THREE.Vector3().lerpVectors(l, c, a),
    d = n + a * (i - n),
    h = 65,
    f = 75,
    p = 65 + a * 10,
    g = u.x + Math.sin(r) * d,
    m = u.z + Math.cos(r) * d,
    A = new THREE.Vector3(g, p, m);
  return (s.position.copy(A), s.lookAt(u), s);
}
var cK = Math.PI / 180;
function getCameraForViewType(e, t = 1, r = 1, n = 1) {
  let i = t / r;
  switch (e) {
    case ViewType.Face: {
      let s = new THREE.PerspectiveCamera(15, i, 300, 450);
      return (s.position.set(0, 34.5, 380), s.lookAt(0, 34.3, 0), s);
    }
    case ViewType.MakeIcon: {
      let s = new THREE.PerspectiveCamera(9.8762, i, 500, 1000);
      return (s.position.set(0, 34.5, 600), s.lookAt(0, 34.5, 0), s);
    }
    case ViewType.IconFovy45: {
      let o = new THREE.PerspectiveCamera(45, i, 50, 1000);
      return (o.position.set(0, 34, 110), o.lookAt(0, 34, 0), o);
    }
    case ViewType.AllBody: {
      let s = new THREE.PerspectiveCamera(15, i, 50, 1500);
      return (s.position.set(0, 50, 900), s.lookAt(0, 105, 0), s);
    }
    case ViewType.CreditIcon: {
      let s = new THREE.PerspectiveCamera(15, i, 0.1, 1000);
      return (s.position.set(-60, 34.5, 380), s.lookAt(0, 34.3, 0), s);
    }
    case ViewType.VariableIconBody: {
      let s = new THREE.PerspectiveCamera(15, i, 20, 1400);
      return (s.position.set(0, 37, 380), s.lookAt(0, 37, 0), s);
    }
    case ViewType.AllBodySugar:
      return lg(n, i, 0, 550, 850);
    case ViewType.SugarRight:
      return lg(n, i, Math.PI / 2, 550, 850);
    case ViewType.SugarBack:
      return lg(n, i, Math.PI, 550, 850);
    case ViewType.SugarLeft:
      return lg(n, i, (3 * Math.PI) / 2, 550, 850);
    case ViewType.SugarTilt:
      return lg(n, i, 25 * cK, 550, 850);
    default:
      throw Error("getCameraForViewType: not implemented");
  }
}
var THREE = getTHREE();
function uK(e = !1) {
  let t = new THREE.OrthographicCamera(-1, 1, e ? -1 : 1, e ? 1 : -1, 0.1, 10);
  return ((t.position.z = 1), t);
}
var CL = !1;
if (typeof window > "u") CL = !0;
function UT(e, t, r, n, i, o = {}) {
  let s = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, ...o },
    a =
      r.isWebGPURenderer === void 0
        ? new THREE.WebGLRenderTarget(n, i, s)
        : new THREE.RenderTarget(n, i, s),
    l = r.getRenderTarget();
  return (r.setRenderTarget(a), r.render(e, t), r.setRenderTarget(l), a);
}
function HT(e, t, r = !1, n = !0) {
  return new Promise((i) => {
    let o = new THREE.Scene();
    o.background = null;
    let s = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: e.texture, transparent: !0 }),
      a = new THREE.PlaneGeometry(2, 2),
      l = new THREE.Mesh(a, s);
    o.add(l);
    let c = uK(r),
      u = t.getRenderTarget(),
      d = t.outputColorSpace,
      h = new THREE.Vector2();
    (t.getSize(h),
      t.setRenderTarget(null),
      (t.outputColorSpace = THREE.ColorManagement ? THREE.ColorManagement.workingColorSpace : null),
      t.setSize(e.width, e.height, !1),
      t.render(o, c));
    function f() {
      (s.dispose(),
        a.dispose(),
        o.remove(l),
        (t.outputColorSpace = d),
        t.setSize(h.x, h.y, !1),
        t.setRenderTarget(u));
    }
    if (n) {
      let p = (g) => {
        (i({ type: "blob", result: g }), f());
      };
      if (CL) t.domElement.convertToBlob({ type: "image/png" }).then(p);
      else t.domElement.toBlob(p);
    } else {
      let p = t.domElement.toDataURL("image/png");
      (i({ type: "dataURL", result: p }), f());
    }
  });
}
function ux(e, t, r = !1, n = !0) {
  let { width: i, height: o } = e,
    s = new Uint8Array(i * o * 4);
  t.readRenderTargetPixels(e, 0, 0, i, o, s);
  let a = new THREE.DataTexture(s, i, o, THREE.RGBAFormat, THREE.UnsignedByteType);
  if (((a.needsUpdate = !0), r)) a.flipY = !0;
  if (n) ((a.minFilter = THREE.LinearFilter), (a.magFilter = THREE.LinearFilter));
  return a;
}
