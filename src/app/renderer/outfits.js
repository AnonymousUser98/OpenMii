// src/app/renderer/outfits.js
// Outfit textures and materials.
//
// Defines: loadOutfitTextures, isGhostMii
// Uses from other files:
//   app/items/item-lists.js: w0, J9, Im, Rm
//   app/renderer/texture-compositing.js: cg, EL
//   app/renderer/three-module.js: getTHREE
//   app/renderer/ffl/part-colors.js: Oo
//   app/shaders/shader-registry.js: shaderUsesFFLParams

async function loadOutfitTextures({ gender: e, outfitType: t, outfitVariant: r, bodyType: n, clothesTextures: i }) {
  switch (n) {
    case "wiiu":
      return null;
    case "miitomo": {
      if (!w0[t]) return null;
      if (r != null && r >= 0 && !Im[t]) return null;
      let o = w0[t],
        a = (r != null && r >= 0 ? Im[t][r] : void 0) ?? o,
        l = Object.values(a),
        c = [];
      for (let u of l)
        if (Array.isArray(u))
          for (let d of u) {
            let h = d.replace("!", "");
            if (!i[h]) continue;
            c.push(i[h][1]());
          }
        else {
          let d = u.replace("!", "");
          if (!i[d]) continue;
          c.push(i[d][1]());
        }
      await Promise.all(c);
      break;
    }
  }
  return !0;
}
function px({
  gender: e,
  outfitType: t,
  outfitVariant: r,
  renderer: n,
  bodyModel: i,
  shirtColor: o,
  pantsColor: s,
  shoesColor: a,
  facelineColor: l,
  clothesTextures: c,
  nBody: u,
  nLegs: d,
  bodyGroup: h,
  originalMaterial: f,
  originalMaterialName: p,
  texResolution: g,
  charInfo: m,
  reusableTextures: A,
  additionalInfo: y,
  forceModulate: x,
  allowGhost: b,
  bake: v,
  groupName: _,
}) {
  let w = getTHREE(),
    S = t,
    E = Oo(new w.Color(...o), 5, f),
    T = new w.Color(...a),
    M = new w.Color(...s),
    C = Oo(new w.Color(l ? l : 16777215), 0, f);
  function R(ae, Z, F) {
    if (!c[ae]) return { baseTex: null, coloredTex: null, overlayTex: null };
    let te = null,
      he = null,
      re = F && c[F] ? c[F][0]() : void 0;
    if (re) re.premultiplyAlpha = !1;
    switch (Z === void 0 ? Rm[S] : Z) {
      case 2: {
        let le = new w.Vector4(E.r, E.g, E.b, 1),
          ue = new w.Vector4(T.r, T.g, T.b, 1),
          I = new w.Vector4(M.r, M.g, M.b, 1);
        if (ae in c) he = c[ae][0]();
        if (!he) return { baseTex: null, coloredTex: null, overlayTex: null };
        if (v)
          ((te = cg(he, le, ue, I, new w.Vector4(...C.toArray()), n, g, g, re ?? void 0)),
            (te.minFilter = 1008),
            (te.magFilter = 1006),
            (te.needsUpdate = !0));
        else te = he;
        ((te.wrapS = w.MirroredRepeatWrapping),
          (te.wrapT = w.MirroredRepeatWrapping),
          (te.minFilter = 1008),
          (te.magFilter = 1006),
          (te.needsUpdate = !0));
        break;
      }
      case 0: {
        let le = Oo(new w.Color(l ? l : 16777215), 0, f);
        ((te = null),
          (he = c[ae][0]()),
          (te = EL(he, new w.Vector4(...le.toArray()), n, g, g)),
          (te.wrapS = w.MirroredRepeatWrapping),
          (te.wrapT = w.MirroredRepeatWrapping));
        break;
      }
      default:
        return { coloredTex: null, baseTex: null, overlayTex: null };
    }
    return { coloredTex: te, baseTex: he, overlayTex: re !== void 0 ? re : null };
  }
  let B = u ? u.material : void 0,
    L = d ? d.material : void 0,
    k = shaderUsesFFLParams(p || ""),
    z = {
      ...((k || x) && { modulateType: 9, modulateMode: 0 }),
      color: new w.Color(...o),
      side: 2,
    },
    X = {
      ...((k || x) && { modulateType: 10, modulateMode: 0 }),
      color: new w.Color(...s),
      side: 2,
    },
    G = { modulateType: 9, modulateMode: 6, color: [E, T, M, C] };
  if (v) G = { modulateType: 9, modulateMode: 1, color: new w.Color(16777215) };
  let Q = { ...((k || x) && G), side: J9.includes(t) ? 2 : 0 };
  function de() {
    if ("canGhost" in f.prototype && y.personality === 24 && b !== !1) return !0;
    return !1;
  }
  let oe = { modulateType: -1, modulateMode: -1, color: new w.Color(16777215) };
  function K(ae, Z, F, te) {
    if (!F) return;
    if (A) {
      if (!A.has(F.name)) A.set(F.name, Z);
    }
    if ("isSwitchShader" in f.prototype) {
      if (((oe.charInfo = m), Z && Z.coloredTex)) oe.ignoreMatColor = !0;
      else oe.ignoreMatColor = !1;
      if (((oe.additionalInfo = y), Z && Z.coloredTex)) oe.maskMap = Z.baseTex;
    }
    if ("isMiitomoShader" in f.prototype) {
      if (Z && Z.coloredTex) oe.maskMap = Z.baseTex;
      ((oe.charInfo = m), (oe.additionalInfo = y));
    }
    if (!oe.map && Z) oe.map = Z.baseTex;
    if (oe.map) ((oe.map.minFilter = 1006), (oe.map.magFilter = 1006));
    if (F)
      if (ae) {
        if (te !== void 0) {
          if (te.includes("body")) {
            if ("isSwitchShader" in f.prototype && y.shirtColor > -1) oe.ignoreMatColor = !0;
            oe = { ...oe, ...z, ...(de() ? { applyGhost: !0 } : {}) };
          } else if (te.includes("legs")) {
            if ("isSwitchShader" in f.prototype && y.pantsColor > -1) oe.ignoreMatColor = !0;
            oe = { ...oe, ...X, ...(de() ? { applyGhost: !0 } : {}) };
          }
        }
        if (oe.overlayMap) oe.modulateMode = 7;
        let he = new f(oe);
        ((F.material = he), he.polygonOffset);
      } else {
        if (((oe = { ...oe, ...(!Z ? z : Q), ...(de() ? { applyGhost: !0 } : {}) }), oe.overlayMap))
          oe.modulateMode = 7;
        let he = new f(oe);
        F.material = he;
      }
  }
  if (i === "miitomo") {
    if (t === -1) {
      h.traverse((he) => {
        if (_) {
          if (_.trim() !== "") {
            if (he.name.toLowerCase().includes(_)) {
              he.visible = !0;
              return;
            }
          }
        }
        if (he.isMesh !== !0) return;
        let re = he,
          le = e === 1 ? "f" : "m";
        if (re.name === `body_${le}` || re.name === `legs_${le}`)
          if (((re.visible = !0), (oe = { ...z }), de())) K(!1, void 0, re, re.name);
          else K(!0, void 0, re, re.name);
        else re.visible = !1;
      });
      return;
    }
    if (!w0[S]) throw Error("No clothing entry for index " + S);
    let ae = {},
      Z = w0[S];
    ae = (r != null && r >= 0 ? Im[S]?.[r] : void 0) ?? Z;
    let te = Object.keys(ae);
    h.traverse((he) => {
      if (he.isMesh !== !0) return;
      let re = he;
      if (_) {
        if (_.trim() !== "") {
          if (re.name.toLowerCase().includes(_)) {
            re.visible = !0;
            return;
          }
        }
      }
      let le = te.findIndex(
        (W) => he.name === `clothes_${e === 1 ? "f" : "m"}_` + W || he.name === "clothes_" + W,
      );
      if (le === -1) {
        re.visible = !1;
        return;
      } else re.visible = !0;
      if (A) {
        if (A.has(re.name)) {
          let W = A.get(re.name);
          ((oe = { ...Q, map: W.coloredTex, overlayMap: W.overlayTex }), K(!1, W, re));
          return;
        }
      }
      let ue = te[le],
        I = S <= Rm.length ? Rm[S] : 2,
        N = ae[ue],
        Y = void 0;
      if (Array.isArray(N)) [N, Y] = N;
      let P = N;
      if (P.endsWith("!")) ((I = 0), (P = P.slice(0, -1)));
      let H = R(P, I, Y);
      if (H.baseTex === null) return;
      ((oe = { ...Q, map: H.coloredTex, overlayMap: H.overlayTex }), K(!1, H, re));
    });
  }
  (B && B.dispose(), L && L.dispose());
}
function isGhostMii(e, t) {
  if (t.personality === 24) return !0;
  return !1;
}
