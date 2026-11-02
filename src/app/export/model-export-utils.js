// src/app/export/model-export-utils.js
// Helpers for 3D model export (attributes, expressions, textures).
//
// Defines: YD, BJ, QD, FJ, DJ, NJ, XD
// Uses from other files:
//   app/renderer/ffl-resources.js: l1, waitForFFLResources
//   app/renderer/three-module.js: getTHREE
//   app/renderer/outfits.js: isGhostMii
//   app/renderer/mii-model.js: getAdditionalInfo
//   app/shaders/shader-registry.js: getShaderMaterialClass

var Ma = {
  wii: {
    count: 54,
    expressions: [
      0, 5, 1, 0, 0, 0, 1, 3, 0, 5, 1, 5, 7, 7, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
      10, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  },
  wiiu: { count: 14, expressions: [0, 12, 1, 13, 7, 17, 8, 2, 3, 9, 4, 1, 5, 16] },
  switch: { count: 20, expressions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  miitomo: {
    count: 249,
    expressions: [
      0, 1, 7, 1, 2, 17, 12, 4, 14, 3, 15, 17, 8, 0, 7, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0,
    ],
  },
  streetpass: { count: 9, expressions: [0, 1, 18, 1, 7, 3, 5, 9, 1, 47] },
};
function YD(e) {
  let t = getTHREE();
  if (!e?.attributes) throw Error("Invalid input geometry, attributes missing");
  let { attributes: r } = e;
  Object.entries(r).forEach(([n, i]) => {
    let o = i instanceof t.InterleavedBufferAttribute ? BJ(i) : i,
      { array: s, itemSize: a, count: l } = o,
      c = n.toLowerCase() === "normal" ? 3 : a,
      u,
      d = !1;
    if (s instanceof Float32Array) u = c === a ? s : QD(s, l, a, c);
    else if (s instanceof Uint16Array) {
      let h = DJ(s);
      u = c === a ? h : QD(h, l, a, c);
    } else if (s instanceof Int8Array) u = NJ(s, l, a, c);
    else if (s instanceof Uint8Array) ((u = s), (d = !0));
    else return;
    e.setAttribute(n, new t.BufferAttribute(u, c, d));
  });
}
function BJ(e) {
  let t = getTHREE(),
    { itemSize: r, count: n } = e,
    i = new e.array.constructor(n * r);
  for (let o = 0; o < n; o++) for (let s = 0; s < r; s++) i[o * r + s] = e.getComponent(o, s);
  return new t.BufferAttribute(i, r);
}
function QD(e, t, r, n) {
  let i = new Float32Array(t * n);
  for (let o = 0; o < t; o++) for (let s = 0; s < n; s++) i[o * n + s] = e[o * r + s];
  return i;
}
function FJ(e) {
  let t = (e & 32768) >> 15,
    r = (e & 31744) >> 10,
    n = e & 1023;
  if (r === 0) return (t ? -1 : 1) * Math.pow(2, -14) * (n / Math.pow(2, 10));
  else if (r === 31) return n ? NaN : (t ? -1 : 1) * (1 / 0);
  return (t ? -1 : 1) * Math.pow(2, r - 15) * (1 + n / 1024);
}
function DJ(e) {
  let t = new Float32Array(e.length);
  for (let r = 0; r < e.length; r++) t[r] = FJ(e[r]);
  return t;
}
function NJ(e, t, r, n) {
  let i = new Float32Array(t * n);
  for (let o = 0; o < t; o++) {
    let s = o * r,
      a = o * n;
    if (n === 4 && r === 4) {
      let l = e[s] / 127,
        c = e[s + 1] / 127,
        u = e[s + 2] / 127,
        d = e[s + 3] / 127,
        h = Math.sqrt(l * l + c * c + u * u) || 1;
      ((i[a] = l / h), (i[a + 1] = c / h), (i[a + 2] = u / h), (i[a + 3] = d));
    } else
      for (let l = 0; l < n; l++) {
        let c = e[s + l];
        i[a + l] = c < 0 ? c / 128 : c / 127;
      }
  }
  return i;
}
var JSZip = In(Cm(), 1);
var THREE = getTHREE();
async function XD(e, t, r, n, i) {
  await waitForFFLResources();
  let o = getAdditionalInfo(t),
    s = getShaderMaterialClass(e),
    a;
  try {
    let u = 0;
    switch (n) {
      case "HAT":
        u = 2;
        break;
      case "FACE_ONLY":
        u = 3;
    }
    a = await l1().createFace(t, r, null, i || 512, s, u, 0, !1, {
      ...o,
      ...(isGhostMii(s, o) ? { applyGhost: !0 } : {}),
    });
  } catch (u) {
    throw ((a = null), alert(`Error making Mii head: ${u}`), u);
  }
  let l = {
      extras: {
        partsTransform: {
          hatTranslate: a.transform.hairPos,
          headFrontRotate: a.transform.partsTransform.headFrontRotate,
          headFrontTranslate: a.transform.partsTransform.headFrontTranslate,
          headSideRotate: a.transform.partsTransform.headSideRotate,
          headSideTranslate: a.transform.partsTransform.headSideTranslate,
          headTopRotate: a.transform.partsTransform.headTopRotate,
          headTopTranslate: a.transform.partsTransform.headTopTranslate,
        },
      },
    },
    c = new THREE.Group();
  return (
    c.add(a.meshes),
    {
      animations: [],
      asset: l,
      cameras: [],
      parser: {},
      scene: c,
      scenes: [c],
      userData: {},
      CharModel: a,
    }
  );
}
async function Bb(e, t, r = 0, n = 1024) {
  await waitForFFLResources();
  let i,
    o = getShaderMaterialClass();
  try {
    try {
      i = await l1().createFace(e, t, null, n, o, 1, r);
    } catch (s) {}
  } catch (s) {
    throw ((i = null), alert(`Error making Mii face: ${s}`), s);
  }
  return { img: i.texture };
}
var localforage = In(Hs(), 1);
