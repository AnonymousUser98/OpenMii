// src/app/renderer/ffl-resources.js
// Loads the FFL resource file and creates the FFL module.
//
// Defines: getFFLModule, fflResourceReader, fflModule, CF, loadFFLResources, fflResourcesPromise,
//          getFFLResourcesPromise, waitForFFLResources
// Uses from other files:
//   app/assets/models.js: aB, loadBodyModels, loadHatModels, loadAccessoryModels, uB,
//                         loadMatCapTextures, hB
//   app/i18n/localization.js: getTranslator
//   app/renderer/ffl/resource-reader.js: FFLResourceReader
//   app/renderer/ffl/face-builder.js: FFLFaceBuilder
//   app/shaders/shader-registry.js: getRendererSetting
//   app/config.js: APP_CONFIG
//   app/ui/notify.js: Notify

var translate = getTranslator(),
  getFFLModule = () => fflModule;
var fflResourceReader = null;
var fflModule = null,
  l1 = () => fflModule,
  CF,
  Pd = () => CF;
async function loadFFLResources(e = !0, t = !0, r = !0, n) {
  fflResourcesPromise = new Promise(async (i) => {
    let o = n || APP_CONFIG.renderer.fflResourcePath[await getRendererSetting("resourceType")],
      s = `ffl_res_${o}`,
      a = aB(),
      l = null;
    try {
      l = await a.getItem(s);
    } catch (u) {}
    if (!l)
      try {
        let u = await fetch(o);
        if (!u.ok) throw Error(`HTTP ${u.status}: ${u.statusText}`);
        ((l = await u.arrayBuffer()), a.setItem(s, l).catch((d) => {}));
      } catch (u) {
        throw (
          Notify.show(
            translate("Error"),
            translate("Failed to fetch FFL resource file: %1", u.message) +
              `

` +
              translate("Make sure your path is correct."),
          ),
          u
        );
      }
    ((fflResourceReader = new FFLResourceReader(l)), (fflModule = new FFLFaceBuilder(fflResourceReader)), await fflModule.initialize());
    let c = await fetch("./dist/icons.json?t=" + Date.now()).catch((u) => {
      throw (Notify.show(translate("Error"), translate("Failed to fetch icon file: %1", u.message)), u);
    });
    try {
      CF = await c.json();
    } catch (u) {
      Notify.show(translate("Error"), translate("Failed to fetch icon file"));
    }
    if (t !== void 0 && typeof t === "string") await loadBodyModels(t);
    if (t === !0) await loadBodyModels();
    if ((await loadHatModels(), await loadAccessoryModels(), r)) (await uB(), await loadMatCapTextures(), await hB());
    i();
  });
}
var fflResourcesPromise = null,
  getFFLResourcesPromise = () => fflResourcesPromise;
function waitForFFLResources() {
  if (fflResourcesPromise) return fflResourcesPromise;
  return Promise.reject(Error("Resources weren't loaded in time for this to appear."));
}
