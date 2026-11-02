// src/app/shaders/shader-registry.js
// Shader registry: shader id -> material class, lighting setup, material conversion.
//
// Defines: getRendererSetting, currentShaderType, FL, applyShaderMaterial, shaderUsesFFLParams,
//          getShaderMaterialClass, getCurrentShaderType, addPhongLights, addDefaultLights,
//          addToonLights, getLightSetupForShader, removeLights, applyHairTipSettings
// Uses from other files:
//   app/shaders/wii-shaders.js: WiiShaderMaterial, WiiPlayShaderMaterial, SimplePlusShaderMaterial,
//                               WiiAlt3ShaderMaterial, WiiRoomShaderMaterial, ResortShaderMaterial,
//                               SimpleShaderMaterial
//   app/shaders/wiiu-variants.js: WiiUBlinnShaderMaterial, WiiUBrightShaderMaterial
//   app/shaders/3ds-shaders.js: ThreeDSShaderMaterial, TomodachiLifeShaderMaterial
//   app/renderer/three-module.js: getTHREE
//   app/shaders/wiiu-shader.js: WiiUShader
//   app/renderer/ffl/face-builder.js: COMMON_COLOR_TABLE
//   app/renderer/outfits.js: isGhostMii
//   app/renderer/mii-model.js: getAdditionalInfo
//   app/shaders/miitomo-shader.js: MiitomoShader
//   app/shaders/switch-shader.js: SwitchShader
//   app/shaders/toon-shader.js: ToonShaderMaterial
//   app/shaders/no-lighting-shader.js: NoLightingShaderMaterial

var THREE = getTHREE(),
  getRendererSetting = async (e) => {
    let t = await localforage.default.getItem("settings_" + e);
    if (t == null && e === "shaderTypeIcon") return "switch";
    if (t == null && e === "shaderTypeN") return "switch";
    if (t == null && e === "colorScheme") return "auto";
    if (t == null && e === "colorSchemeSpace") return "auto";
    if (t == null && e === "bodyModelN") return "miitomo";
    if (t == null && e === "resourceType") return 2;
    return t;
  },
  currentShaderType = "three_standard",
  wx = async () => {
    currentShaderType = await getRendererSetting("shaderTypeN");
  },
  rB = !1,
  nB = async () => {
    rB = await getRendererSetting("alternateHairShadow");
  },
  Cx = () => rB;
function FL(e, t, r, n) {
  e.traverse((i) => {
    let o = i;
    if (!o.visible) return;
    if (o.isMesh) {
      if (o.material) {
        if (!o.material.visible) return;
      }
      applyShaderMaterial(o, t, r, n);
    }
  });
}
async function applyShaderMaterial(e, t, r, n) {
  let i = t || (await getRendererSetting("shaderTypeN")),
    o = e.material,
    s = getAdditionalInfo(n),
    a = e.geometry.userData;
  if (a.ignore !== void 0) {
    if (a.ignore === 1) return;
  }
  let l = a.modulateType;
  if (a.modulateType === void 0);
  let c = l > 5 ? !1 : !0,
    u =
      l !== void 0
        ? l && l < 9
          ? WiiUShader.materialParams[l]
          : WiiUShader.materialParams[0]
        : WiiUShader.materialParams[0],
    d = a.modulateMode === void 0 ? 0 : a.modulateMode,
    h,
    f = a.modulateColor;
  if (!f) h = new THREE.Color(1, 0, 0);
  else if (Array.isArray(f[0])) h = f.map((v) => new THREE.Color(...v));
  else h = new THREE.Color(...f);
  THREE.ColorManagement.enabled = !1;
  let p = {};
  if (o.map) ((p.USE_MAP = ""), (o.map.colorSpace = THREE.LinearSRGBColorSpace), (o.needsUpdate = !0));
  let g = o.side;
  if (a.cullMode !== void 0)
    switch (a.cullMode) {
      case 0:
        g = THREE.DoubleSide;
        break;
      case 1:
        g = THREE.FrontSide;
        break;
      case 2:
        g = THREE.BackSide;
        break;
    }
  let m,
    A = getShaderMaterialClass(i),
    x = shaderUsesFFLParams(i)
      ? { modulateMode: d, modulateType: l, lightEnable: i === "lightDisabled" ? !1 : !0 }
      : {};
  if (r)
    ((x.charInfo = r.charInfo),
      (x.additionalInfo = s),
      Object.assign(x, isGhostMii(A, s) ? { applyGhost: !0 } : {}));
  if (d > 0 && l !== 5) x.transparent = !0;
  let b = { color: h, ...x, map: o.map || null, side: g };
  if (n.personality) {
    if (n.personality === 24) b.transparent = !0;
  }
  ((m = new A(b)), (e.material = m));
}
function shaderUsesFFLParams(e = void 0) {
  switch (e || currentShaderType) {
    case "wiiu":
    case "wiiu_blinn":
    case "wiiu_ffliconwithbody":
    case "switch":
    case "miitomo":
    case "miitomo_alt":
    case "wii":
    case "wii_simple":
    case "wii_alt":
    case "wii_alt_2":
    case "wii_alt_3":
    case "wii_alt_4":
    case "wii_alt_5":
    case "toon":
    case "3ds":
    case "3ds_alt":
    case "lightDisabled":
      return !0;
    case "three_toon":
    case "three_phong":
    case "three_standard":
      return !1;
  }
}
function getShaderMaterialClass(e) {
  switch (e || currentShaderType) {
    case "wiiu":
      return WiiUShader;
    case "lightDisabled":
      return NoLightingShaderMaterial;
    case "wiiu_blinn":
      return WiiUBlinnShaderMaterial;
    case "wiiu_ffliconwithbody":
      return WiiUBrightShaderMaterial;
    case "switch":
      return SwitchShader;
    case "miitomo":
      return MiitomoShader;
    case "three_phong":
      return THREE.MeshPhongMaterial;
    case "three_standard":
      return THREE.MeshStandardMaterial;
    case "wii":
      return WiiShaderMaterial;
    case "wii_simple":
      return SimpleShaderMaterial;
    case "wii_alt":
      return WiiPlayShaderMaterial;
    case "wii_alt_2":
      return SimplePlusShaderMaterial;
    case "wii_alt_3":
      return WiiAlt3ShaderMaterial;
    case "wii_alt_4":
      return WiiRoomShaderMaterial;
    case "wii_alt_5":
      return ResortShaderMaterial;
    case "3ds":
      return ThreeDSShaderMaterial;
    case "3ds_alt":
      return TomodachiLifeShaderMaterial;
    case "toon":
      return ToonShaderMaterial;
    default:
      return THREE.MeshStandardMaterial;
  }
}
function getCurrentShaderType() {
  return currentShaderType;
}
var addPhongLights = (e) => {
    let t = Number(THREE.REVISION) >= 155 ? Math.PI : 1,
      r = new THREE.AmbientLight(new THREE.Color(0.73, 0.73, 0.73), t),
      n = new THREE.DirectionalLight(new THREE.Color(0.6, 0.6, 0.6), t);
    (n.position.set(-0.455, 0.348, 0.5),
      (r.name = "ambientLight"),
      (n.name = "directionalLight"),
      e.add(r, n));
  },
  addDefaultLights = (e) => {
    let r = new THREE.AmbientLight(new THREE.Color(0.73, 0.73, 0.73), 3.14),
      n = new THREE.DirectionalLight(new THREE.Color(0.6, 0.6, 0.6), 3.14);
    (n.position.set(-0.2, 0.348, 1),
      (r.name = "ambientLight"),
      (n.name = "directionalLight"),
      e.add(r, n));
  },
  addToonLights = (e) => {
    let r = new THREE.AmbientLight(new THREE.Color(0.73, 0.73, 0.73), 2.5),
      n = new THREE.DirectionalLight(new THREE.Color(0.6, 0.6, 0.6), 2.5);
    (n.position.set(-0.255, 0.348, 0.5),
      (r.name = "ambientLight"),
      (n.name = "directionalLight"),
      e.add(r, n));
  };
function getLightSetupForShader(e) {
  switch (e || currentShaderType) {
    case "wiiu":
    case "wiiu_blinn":
    case "wiiu_ffliconwithbody":
    case "switch":
    case "miitomo":
    case "miitomo_alt":
    case "wii":
    case "wii_simple":
    case "wii_alt":
    case "wii_alt_2":
    case "wii_alt_3":
    case "wii_alt_4":
    case "3ds":
    case "toon":
      return;
    case "lightDisabled":
    case "three_phong":
      return addPhongLights;
    case "three_toon":
      return addToonLights;
    default:
      return addDefaultLights;
  }
}
function removeLights(e) {
  let t = e.getObjectByName("ambientLight"),
    r = e.getObjectByName("directionalLight");
  if (t) e.remove(t);
  if (r) e.remove(r);
}
function applyHairTipSettings(e, t = {}) {
  let r = t.additionalInfo;
  if (!r) return;
  if (!t.charInfo) return;
  if (((e.additionalInfo = r), t.modulateType === 4)) {
    if (t.charInfo.hair) {
      if (t.charInfo.hair.flip !== void 0) e.hairTipFlip = t.charInfo.hair.flip;
    }
    if (r.hairTipColor !== void 0 && r.hairTipColor !== -1)
      e.hairTipColor = new THREE.Vector3(...COMMON_COLOR_TABLE[r.hairTipColor]);
    if (r.hairTipX !== void 0) e.hairTipX = r.hairTipX;
    if (r.hairTipY !== void 0) e.hairTipY = r.hairTipY;
  }
}
