// src/app/editor/tabs/scale-tab.js
// Editor tab: Scale (height, build) and compare mode.
//
// Defines: hce, exitCompareMode, scaleTab
// Uses from other files:
//   app/renderer/mii-model.js: getAdditionalInfo, createMiiModel
//   app/library/library.js: openMiiPicker, fetchLibrary
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   app/ui/components.js: createFeatureSet
//   app/ui/modal.js: closeModal
//   app/renderer/dispose.js: disposeObject
//   app/renderer/ffl-resources.js: getFFLModule

var translate = getTranslator(),
  fv = [];
function hA(e, t) {
  e[t] = null;
}
function hce(e, t, r) {
  return new Promise((n) => {
    if (r) closeModal(r);
    n(t.data);
  });
}
function exitCompareMode(e) {
  (e.exitCompareMode(),
    (fv = fv.filter(Boolean)),
    fv.forEach((t) => {
      (disposeObject(t.bodyModel),
        disposeObject(t.bodyModelBody),
        disposeObject(t.bodyModelLegs),
        disposeObject(t.headModel),
        disposeObject(t.miiGroup),
        hA(t, "bodyModel"),
        hA(t, "bodyModelBody"),
        hA(t, "bodyModelLegs"),
        hA(t, "headModel"),
        hA(t, "miiGroup"));
    }),
    setTimeout(() => {
      e.focusCamera(e.currentPosition, !0, !0);
    }));
}
async function scaleTab(e) {
  e.editor.onChangeTab.set("s", () => {
    (e.editor.ui.scene.exitCompareMode(), e.editor.onChangeTab.delete("s"), exitCompareMode(e.editor.ui.scene));
  });
  let t = !1,
    r = new Html("button").text(translate("Compare")),
    n = new Html("button").text(translate("Stop comparing")),
    i = new Html("div").class("flex-group").appendMany(r, n),
    o = new Html("input")
      .attr({ type: "range", value: "64", min: "0", max: "127", disabled: "true" })
      .style({ margin: "0 74px" }),
    s = new Html("input")
      .attr({ type: "range", value: "64", min: "0", max: "127", disabled: "true" })
      .style({ margin: "0 74px" });
  async function a(h) {
    let f = new Mii(h);
    if (e.mii.gender !== f.gender) e.editor.ui.scene.bodyModels.get(f.gender).setPose("Wait");
    (o.attr({ max: e.mii.personality === 24 ? 255 : 127, value: f.height }),
      s.attr({ max: e.mii.personality === 24 ? 255 : 127, value: f.build }));
    let p = {
        data: f.export("studioData"),
        additionalInfo: getAdditionalInfo(f),
        drawBody: !0,
        expression: [0, 1],
        module: getFFLModule(),
        renderer: e.editor.ui.scene.getRenderer(),
        type: 0,
        isTemporary: !1,
      },
      g = await createMiiModel(p);
    (fv.push(g), e.editor.ui.scene.enterCompareMode(f.gender, g, e.mii.personality === 24));
  }
  function l() {
    if (t)
      (o.style({ display: "flex" }), s.style({ display: "flex" }), n.style({ display: "flex" }));
    else (o.style({ display: "none" }), s.style({ display: "none" }), n.style({ display: "none" }));
  }
  (l(),
    r.on("click", async () => {
      if (!t) t = !0;
      (l(), d());
      let h = await fetchLibrary(),
        f = [];
      if (h === null) ((h = []), (f = await fetchLibrary()));
      else f = h;
      exitCompareMode(e.editor.ui.scene);
      let p = await openMiiPicker(f, !0, translate("Choose a Mii to compare scales with."), hce, !0, !0);
      if (!p) {
        ((t = !1), l(), u(), exitCompareMode(e.editor.ui.scene));
        return;
      }
      (u(), a(p));
    }),
    n.on("click", () => {
      ((t = !1), l(), u(), exitCompareMode(e.editor.ui.scene));
    }));
  let c = e.editor.ui.scene;
  function u() {
    ((c.stopAnimating = !1),
      (c.animateAction = c.animate.bind(c)),
      (c.animateRef = []),
      c.animateRef.push(requestAnimationFrame(c.animateAction)));
  }
  function d() {
    c.stopAnimating = !0;
  }
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        bodySize: {
          label: translate("Scale"),
          items: [
            {
              type: 3,
              property: "height",
              iconStart: SVG_ICONS.scaleShort,
              iconEnd: SVG_ICONS.scaleTall,
              min: 0,
              max: e.mii.personality === 24 ? 255 : 127,
              forceRender: !1,
              part: 2,
              bodyUpdateType: 0,
              soundStart: "vert_stretch_down",
              soundEnd: "vert_stretch_up",
              label: e.useAccessibility ? translate("Height") : void 0,
            },
            { html: o, type: 5 },
            {
              type: 3,
              property: "build",
              iconStart: SVG_ICONS.scaleThin,
              iconEnd: SVG_ICONS.scaleFat,
              min: 0,
              max: e.mii.personality === 24 ? 255 : 127,
              forceRender: !1,
              part: 2,
              bodyUpdateType: 0,
              soundStart: "vert_stretch_down",
              soundEnd: "vert_stretch_up",
              label: e.useAccessibility ? translate("Build") : void 0,
            },
            { html: s, type: 5 },
            { html: i, type: 5 },
          ],
        },
      },
    }),
  );
}
