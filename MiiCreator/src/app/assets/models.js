// src/app/assets/models.js
// Model bundles (body/hat/accessory zips), GLTF loading, texture and MatCap caches.
//
// Defines: MODEL_BUNDLES, loadZipBundle, PUBLIC_ROOT, getPublicRoot, gltfLoader, BK,
//          loadBodyModels, loadHatModels, loadAccessoryModels, FK, textureCache,
//          pendingTextureLoads, DK, NK, PK, loadMatCapTextures, getMatCapTexture, _L, bodyModels,
//          defaultBodyModelName, hatModels, hatTextures, accessoryModels, accessoryTextures,
//          outfitTextureCache, getBodyModels, getHatModels, getHatTextures, getAccessoryModels,
//          getAccessoryTextures, getDefaultBodyModelName, getOutfitTextureCache
// Uses from other files:
//   app/renderer/three-module.js: getTHREE
//   app/renderer/mii-model.js: getKTX2Loader
//   app/shaders/shader-registry.js: getRendererSetting

var MODEL_BUNDLES = {
    body: "assets/models/body_models_bundle.zip",
    hat: "assets/models/hat_models_bundle.zip",
    acce: "assets/models/acce_models_bundle.zip",
    outfit: "assets/images/mii_clothes_textures_bundle.zip",
    env: "assets/images/env.zip",
    shine: "assets/images/eye_shine.zip",
  },
  o5 = localforage.default.createInstance({ name: "localforage", storeName: "miic_assets" }),
  aB = () => o5;
async function loadZipBundle(e) {
  let t = e in MODEL_BUNDLES ? MODEL_BUNDLES[e] : e,
    r = `zip_cache_${t}`,
    n = `${PUBLIC_ROOT}${t}`,
    i = await o5.getItem(r).catch(() => null),
    o = null,
    s = !1;
  try {
    let d = await fetch(n, { method: "HEAD" });
    if (d.ok) {
      if (((o = d.headers.get("ETag") || d.headers.get("Last-Modified")), i && o && i.etag === o))
        s = !0;
    }
  } catch (d) {
    if (i) s = !0;
  }
  if (s && i)
    try {
      return await JSZip.default.loadAsync(i.blob);
    } catch (d) {}
  let a = await fetch(n);
  if (!a.ok) throw Error(`Failed to fetch ZIP from network: ${a.status} ${a.statusText}`);
  let l = await a.blob(),
    c = await JSZip.default.loadAsync(l),
    u = {
      blob: l,
      etag: a.headers.get("ETag") || a.headers.get("Last-Modified") || o,
      updatedAt: Date.now(),
    };
  return (o5.setItem(r, u).catch((d) => {}), c);
} //! NOTE: THIS ASSUMES THE ROOT IS THE PUBLIC FOLDER
var PUBLIC_ROOT = "/";
var getPublicRoot = () => PUBLIC_ROOT,
  gltfLoader = new rg();
gltfLoader.setMeshoptDecoder(tx);
async function BK(e, t, r) {
  let n = await gltfLoader.loadAsync(e);
  if (r === -1) {
    var d = /*@__PURE__*/ new Map();
    for (let g of n.animations) d.set(g.name, g);
    return { model: n, clips: d };
  }
  var i = new (getTHREE().AnimationMixer)(n.scene);
  let o = n.scene;
  var s,
    a,
    l,
    c,
    u = /*@__PURE__*/ new Map(),
    d = /*@__PURE__*/ new Map();
  let h = !1,
    f = [];
  if (bodyModels.has(t)) {
    if (bodyModels.get(t).has(-1)) ((h = !0), f.push("n1"));
  }
  if (n.animations.length > 0) ((h = !0), f.push("me"));
  if (h) {
    ((u = /*@__PURE__*/ new Map()), (d = /*@__PURE__*/ new Map()));
    try {
      let p, g;
      if (f.includes("n1"))
        for (let [m, A] of bodyModels.get(t).get(-1).clips) {
          let y = i.clipAction(A, o);
          (d.set(m, A), u.set(m, y));
        }
      if (f.includes("me"))
        for (let m of n.animations) {
          let A = i.clipAction(m, o);
          (d.set(m.name, m), u.set(m.name, A));
        }
      ((s = (m = "Pose.01", A = 0) => {
        try {
          let y = u.get(m);
          if (!y) y = u.get("Pose.01");
          if (p) (p.stop(), p.reset());
          if ((y.reset(), A > 0)) y.time = A;
          else y.time = 0;
          (y.play(), (y.timeScale = 0), (y.paused = !0), i.update(0), (p = y));
        } catch (y) {}
      }),
        (a = (m = "Finish", A = 0.25, y = !1) => {
          if (y) for (let [x, b] of u) b.reset().stop();
          if (!u.has(m)) return;
          if (u.get(m).isRunning() && !y) return;
          if (g) g.fadeOut(A);
          try {
            let x = u.get(m);
            (x.reset().fadeIn(A).play(), l(1), (x.timeScale = 1), (g = x));
          } catch (x) {}
        }),
        (l = (m) => {
          try {
            for (let [A, y] of u)
              if (y.isRunning()) y.timeScale = m;
              else y.timeScale = 0;
          } catch (A) {}
        }),
        (c = () => {
          i.stopAllAction();
        }),
        s());
    } catch (p) {}
  }
  return {
    model: n,
    unBindPose: c,
    mixer: i,
    setPoseAnimated: a,
    setTimescale: l,
    setPose: s,
    actions: u,
    clips: d,
  };
}
function Dp(e, t, r, n) {
  let i = new (getTHREE().Vector3)(),
    o = new (getTHREE().Vector3)(),
    s = new (getTHREE().Quaternion)(),
    a = new (getTHREE().Vector3)();
  r.updateMatrixWorld(!0);
  let l = r.getObjectByName("head");
  if (l === void 0) l = r.getObjectByName("Head");
  if (!l) return;
  if ((l.updateMatrixWorld(!0), e.getWorldPosition(i), l.matrixWorld.decompose(o, s, a), n))
    if (
      (n.position.copy(o),
      e.worldToLocal(n.position),
      n.setRotationFromQuaternion(s),
      t === "miitomo")
    )
      ((n.rotation.z -= Math.PI / 2), (n.position.y += 0.05));
    else n.position.y += 0.1;
}
async function loadBodyModels(e, t) {
  bodyModels = /*@__PURE__*/ new Map();
  let n = await loadZipBundle(t ? t : "body"),
    i = Object.keys(n.files).sort(),
    o = i.filter((c) => c.includes("Anim")),
    s = i.filter((c) => !c.includes("Anim"));
  async function a(c) {
    let u = await n.files[c].async("blob"),
      d = c.split("_").pop();
    if (!d) return !1;
    d = d.replace(/\.[^/.]+$/, "");
    let h = { M: 0, F: 1, Anim: -1 },
      f = c
        .replace("miiBody", "")
        .replace(d, "")
        .replace("_", "")
        .replace(/\.[^/.]+$/, ""),
      p = c.startsWith("miiBody") ? h[f] : 1,
      g = URL.createObjectURL(u);
    try {
      let m = d;
      if (e !== void 0) {
        if (Array.isArray(e)) {
          if (e.find((y) => m === y) === void 0) return;
        } else if (e !== m) return;
      }
      let A = await BK(g, m, p);
      if (bodyModels.has(m)) bodyModels.get(m).set(p, A);
      else (bodyModels.set(m, /*@__PURE__*/ new Map()), bodyModels.get(m).set(p, A));
    } finally {
      URL.revokeObjectURL(g);
    }
  }
  for (let c of o) await a(c);
  let l = s.map(async (c) => a(c));
  ((window.bodyModels = bodyModels), await Promise.all(l), await jp());
}
async function jp(e = void 0) {
  let t;
  if (!e) t = await getRendererSetting("bodyModelN");
  else t = e;
  (bodyModels.set("default", bodyModels.get(t)), (defaultBodyModelName = t));
}
// Loads every hat listed in HAT_MODEL_INFO (src/data/), by the "file" each entry names.
async function loadHatModels() {
  let e = await loadZipBundle("hat"),
    r = HAT_MODEL_INFO
      .map((info) => info.file)
      .map(async (n, i) => {
        if (!e.files[n]) return console.warn(`[hats] ${n} is not in the hat bundle (${MODEL_BUNDLES.hat})`);
        let o = await e.files[n].async("blob"),
          s = URL.createObjectURL(o);
        try {
          let a = await gltfLoader.loadAsync(s);
          hatModels[i] = a.scene;
          let l = [];
          a.scene.traverse((c) => {
            if (!c.isMesh) return;
            let u = c.material;
            if (u) l.push({ mat: u, name: c.name });
          });
          for (let c of l)
            if (c.mat.map) {
              if (!hatTextures[i]) hatTextures[i] = /*@__PURE__*/ new Map();
              hatTextures[i].set(c.name, c.mat.map);
            }
          for (let c of l) c.mat.map = null;
        } finally {
          URL.revokeObjectURL(s);
        }
      });
  await Promise.all(r);
}
// Loads every accessory listed in ACCESSORY_MODEL_INFO (src/data/), by the "file" each entry names.
async function loadAccessoryModels() {
  let e = await loadZipBundle("acce"),
    r = ACCESSORY_MODEL_INFO
      .map((info) => info.file)
      .map(async (n, i) => {
        if (!e.files[n]) return console.warn(`[accessorys] ${n} is not in the acce bundle (${MODEL_BUNDLES.acce})`);
        let o = await e.files[n].async("blob"),
          s = URL.createObjectURL(o);
        try {
          let a = await gltfLoader.loadAsync(s);
          accessoryModels[i] = a.scene;
          let l = [];
          a.scene.traverse((c) => {
            if (!c.isMesh) return;
            let u = c.material;
            if (u) l.push({ mat: u, name: c.name });
          });
          for (let c of l)
            if (c.mat.map) {
              if (!accessoryTextures[i]) accessoryTextures[i] = /*@__PURE__*/ new Map();
              accessoryTextures[i].set(c.name, c.mat.map);
            }
          for (let c of l) c.mat.map = null;
        } finally {
          URL.revokeObjectURL(s);
        }
      });
  await Promise.all(r);
}
var FK = 60000;
var Ex,
  textureCache = /*@__PURE__*/ new Map(),
  pendingTextureLoads = /*@__PURE__*/ new Map();
window.textureCache = textureCache;
window.pendingLoads = pendingTextureLoads;
async function uB() {
  ((outfitTextureCache = {}), (Ex = (await loadZipBundle("outfit")).files));
  for (let t of Object.keys(Ex)) {
    if (Ex[t].dir) continue;
    let r = t.replace(/\.[^/.]+$/, ""),
      n = t.split(".").pop();
    if (!n) continue;
    outfitTextureCache[r] = [() => DK(r, n), () => NK(r, t, n)];
  }
}
function DK(e, t) {
  let r = performance.now();
  s5();
  let n = textureCache.get(e);
  if (n) return ((n.lastUsed = r), n.texture);
  if (pendingTextureLoads.get(e)) return null;
  return null;
}
async function NK(e, t, r) {
  let n = performance.now(),
    i = textureCache.get(e);
  if (i) return ((i.lastUsed = n), i.texture);
  let o = pendingTextureLoads.get(e);
  if (o) return await o;
  let s = (async () => {
    let a = await Ex[t].async("blob");
    try {
      switch (r) {
        case "ktx2": {
          let l = URL.createObjectURL(a);
          try {
            let c = await getKTX2Loader().loadAsync(l);
            return (
              (c.wrapS = 1002),
              (c.wrapT = 1002),
              (c.name = t),
              textureCache.set(e, { texture: c, lastUsed: n }),
              s5(),
              c
            );
          } finally {
            URL.revokeObjectURL(l);
          }
        }
        default: {
          let l = await createImageBitmap(a),
            c = new (getTHREE().CanvasTexture)(l);
          return (
            (c.needsUpdate = !0),
            (c.name = t),
            (c.wrapS = 1002),
            (c.wrapT = 1002),
            textureCache.set(e, { texture: c, lastUsed: n }),
            s5(),
            c
          );
        }
      }
    } catch (l) {
      return null;
    } finally {
      pendingTextureLoads.delete(e);
    }
  })();
  return (pendingTextureLoads.set(e, s), s);
}
function s5() {
  let e = performance.now();
  for (let [t, r] of textureCache) if (e - r.lastUsed > FK) PK(t, r.texture);
}
function PK(e, t) {
  (t.dispose(), textureCache.delete(e));
}
var Sx;
async function loadMatCapTextures() {
  if (!Sx) Sx = /*@__PURE__*/ new Map();
  let e = /*@__PURE__*/ new Map([
      [0, "channel"],
      [1, "play-mul"],
      [2, "play-add"],
      [3, "party-mul"],
      [4, "party-add"],
      [5, "party-rim"],
      [6, "fit-mul"],
      [7, "fit-add"],
      [10, "wsr-mul"],
      [11, "wsr-add"],
      [8, "room"],
      [9, "simple"],
      [12, "toon"],
      [13, "shine"],
    ]),
    t = await loadZipBundle("env"),
    r = new Map(Array.from(e).map(([i, o]) => [String(o), i])),
    n = Object.keys(t.files).map(async (i) => {
      if (t.files[i].dir) return;
      let s = i.replace(/\.[^/.]+$/, "").replace(/^env-/, ""),
        a = r.get(s);
      if (a === void 0) return;
      let l = await t.files[i].async("blob"),
        c = await new Promise((d, h) => {
          let f = new Image();
          ((f.onload = () => d(f)), (f.onerror = h), (f.src = URL.createObjectURL(l)));
        }),
        u = new (getTHREE().CanvasTexture)(c);
      ((u.wrapS = 1002), (u.wrapT = 1002), (u.name = s), Sx.set(a, u));
    });
  await Promise.all(n);
}
function getMatCapTexture(e) {
  return Sx.get(e);
}
var Mx = [],
  ag = () => Mx;
async function hB() {
  Mx = [];
  let e = await loadZipBundle("shine"),
    t = /*@__PURE__*/ new Map(),
    r = Object.keys(e.files).map(async (i) => {
      let o = e.files[i];
      if (o.dir) return;
      let s = i.match(/^eyeShine_(\d+)\.[a-zA-Z0-9]+$/);
      if (!s) return;
      let a = Number(s[1]),
        l = await o.async("blob"),
        c = await new Promise((d, h) => {
          let f = new Image();
          ((f.onload = () => d(f)), (f.onerror = h), (f.src = URL.createObjectURL(l)));
        });
      ((c.style.mixBlendMode = "lighten"), (c.style.filter = "grayscale(1) brightness(5)"));
      let u = new (getTHREE().CanvasTexture)(c);
      ((u.name = `eyeShine_${a}`), (u.flipY = !1), t.set(a, u));
    });
  await Promise.all(r);
  let n = Math.max(...t.keys());
  Mx = [];
  for (let i = 0; i <= n; i++) if (t.has(i)) Mx.push(t.get(i));
}
var yg,
  xg,
  bg,
  _g,
  vg,
  Cg,
  wg,
  Eg,
  zp,
  Vp,
  Sg,
  Wp,
  Qp,
  Mg,
  Yp,
  Md,
  eL = async () => {
    if (Sg) return;
    Sg = await gltfLoader.loadAsync(PUBLIC_ROOT + "assets/models/face.glb");
    let e, t;
    (Sg.scene.traverse((r) => {
      if (r.isMesh) {
        let n = r;
        if (r.name.toLowerCase() === "faceline")
          ((e = r), (e.geometry.userData.modulateType = 3), (e.geometry.userData.modulateMode = 0));
        if (r.name.toLowerCase() === "mask")
          ((t = r), (t.geometry.userData.modulateType = 4), (t.geometry.userData.modulateMode = 0));
        n.geometry.computeTangents();
      }
    }),
      (Qp = t),
      (Wp = e));
    return;
  },
  tL = async () => {
    if (!Sg) return;
    if (!Wp || !Qp) return;
    return (Qp.position.set(0, 0, 0), Qp.scale.set(1, 1, 1), Qp.clone());
  },
  rL = async () => {
    if (!Sg) return;
    if (!Wp || !Qp) return;
    return (Wp.position.set(0, 0, 0), Wp.scale.set(1, 1, 1), Wp.clone());
  },
  nL = async () => {
    if (Mg) return;
    Mg = await gltfLoader.loadAsync(PUBLIC_ROOT + "assets/models/nose.glb");
    let e, t;
    (Mg.scene.traverse((r) => {
      if (r.isMesh) {
        let n = r;
        if (r.name.toLowerCase() === "nose")
          ((e = r), (e.geometry.userData.modulateType = 3), (e.geometry.userData.modulateMode = 0));
        if (r.name.toLowerCase() === "noseline")
          ((t = r), (t.geometry.userData.modulateType = 7), (t.geometry.userData.modulateMode = 1));
        n.geometry.computeTangents();
      }
    }),
      (Md = t),
      (Yp = e));
    return;
  },
  iL = async () => {
    if (!Mg) return;
    if (!Yp || !Md) return;
    return (Yp.position.set(0, 0, 0), Yp.scale.set(1, 1, 1), Yp);
  },
  oL = async () => {
    if (!Mg) return;
    if (!Yp || !Md) return;
    return (Md.position.set(0, 0, 0), Md.scale.set(1, 1, 1), Md);
  },
  sL = async () => {
    if (Eg) return;
    Eg = await gltfLoader.loadAsync(PUBLIC_ROOT + "assets/models/hair.glb");
    let e, t;
    (Eg.scene.traverse((r) => {
      if (r.isMesh) {
        let n = r;
        if (r.name.toLowerCase() === "forehead")
          ((t = r), (t.geometry.userData.modulateType = 3), (t.geometry.userData.modulateMode = 0));
        if (r.name.toLowerCase() === "hair") {
          if (
            ((e = r),
            (e.geometry.userData.modulateType = 4),
            (e.geometry.userData.modulateMode = 0),
            e.geometry.attributes.color)
          )
            ((e.geometry.attributes._color = e.geometry.attributes.color),
              delete e.geometry.attributes.color);
        }
      }
    }),
      (zp = e),
      (Vp = t));
    return;
  },
  aL = async () => {
    if (!Eg) return;
    if (!zp || !Vp) return;
    return (zp.position.set(0, 0, 0), zp.scale.set(1, 1, 1), zp);
  },
  lL = async () => {
    if (!Eg) return;
    if (!zp || !Vp) return;
    return (Vp.position.set(0, 0, 0), Vp.scale.set(1, 1, 1), Vp);
  },
  yL = async () => {
    if (!Md) return null;
    let e = Md.material;
    if (!e) return null;
    if (!e.map) return null;
    return e.map;
  },
  cL = async () => {
    if (bg) return bg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/faceMake2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((bg = new (getTHREE().CanvasTexture)(t)), (bg.flipY = !1), bg);
  },
  uL = async () => {
    if (_g) return _g;
    let e = await fetch(PUBLIC_ROOT + "assets/images/faceWrinkle2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((_g = new (getTHREE().CanvasTexture)(t)), (_g.flipY = !1), _g);
  },
  xL = async () => {
    if (xg) return xg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/eyebrow2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((xg = new (getTHREE().CanvasTexture)(t)), (xg.flipY = !1), xg);
  },
  bL = async () => {
    if (yg) return yg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/eye2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((yg = new (getTHREE().CanvasTexture)(t)), (yg.flipY = !1), yg);
  },
  _L = async () => {
    if (vg) return vg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/mouth2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((vg = new (getTHREE().CanvasTexture)(t)), (vg.flipY = !1), vg);
  },
  vL = async () => {
    if (Cg) return Cg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/mustache2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((Cg = new (getTHREE().CanvasTexture)(t)), (Cg.flipY = !1), Cg);
  },
  lx = async () => {
    if (wg) return wg;
    let e = await fetch(PUBLIC_ROOT + "assets/images/glass2.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return ((wg = new (getTHREE().CanvasTexture)(t)), (wg.flipY = !1), wg);
  },
  kK = [],
  n5 = [],
  dL = async (e) => {
    if (n5[e]) return n5[e].clone(!0);
    let t = `${PUBLIC_ROOT}assets/models/glass_${e}.glb`,
      r = await new Promise((i, o) => {
        gltfLoader.load(t, i, void 0, o);
      });
    kK[e] = r;
    let n;
    if (
      (r.scene.traverse((i) => {
        if (i.isMesh) n = i;
      }),
      !n)
    )
      return null;
    return ((n5[e] = n), n.clone(!0));
  },
  Bf,
  hL = async () => {
    if (Bf) return Bf;
    let e = await fetch(PUBLIC_ROOT + "assets/images/4x4rgb.png").then((r) => r.blob()),
      t = await new Promise((r, n) => {
        let i = new Image();
        ((i.onload = () => r(i)), (i.onerror = n), (i.src = URL.createObjectURL(e)));
      });
    return (
      (Bf = new (getTHREE().CanvasTexture)(t)),
      (Bf.minFilter = 1003),
      (Bf.magFilter = 1003),
      (Bf.flipY = !1),
      Bf
    );
  },
  bodyModels = /*@__PURE__*/ new Map(),
  defaultBodyModelName = "wiiu",
  hatModels = [],
  hatTextures = [],
  accessoryModels = [],
  accessoryTextures = [],
  outfitTextureCache = {},
  getBodyModels = () => bodyModels,
  getHatModels = () => hatModels,
  getHatTextures = () => hatTextures,
  getAccessoryModels = () => accessoryModels,
  getAccessoryTextures = () => accessoryTextures,
  getDefaultBodyModelName = () => defaultBodyModelName,
  getOutfitTextureCache = () => outfitTextureCache;
