// src/app/editor/tabs/outfit-tab.js
// Editor tab: Outfit.
//
// Defines: mce, outfitTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, orderItems,
//                         separatorGapThin, separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, vl
//   app/items/item-lists.js: getOutfitVariantNames, getOutfitNames
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/items/accessory-model-info.js: ACCESSORY_MODEL_INFO
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/shaders/shader-registry.js: getRendererSetting
//   app/ui/notify.js: Notify

var translate = getTranslator();
var lG;
function aG(e) {
  return async (t, r) => {
    let n = e,
      i = !1,
      o;
    ((o = await getRendererSetting("bodyModelN")), (lG = o));
    let a = t.outfitType,
      l = o !== "miitomo";
    if (!l && a === -1 && n === 1) ((n = 2), (i = !0));
    let c = "",
      u = "";
    switch (n) {
      case 0:
        ((c = translate("You can't use outfits with this body type")),
          (u = translate('Use the "Miitomo" body to select an outfit.')));
        break;
      case 1:
        ((c = translate("You can't use tertiary color with this body type")),
          (u = translate('Use the "Miitomo" body with an outfit applied to select the tertiary color.')));
        break;
      case 2:
        ((c = translate("You can't use tertiary color without an outfit")),
          (u = translate("Apply an outfit to select the tertiary color.")));
        break;
    }
    if (l || i)
      return (
        r.append(
          new Html("div")
            .class("flex-group", "col")
            .appendMany(
              new Html("h3").text(c),
              new Html("p").style({ "text-align": "center", margin: "0" }).text(u),
            ),
        ),
        !1
      );
    if (
      ((c = translate("Outfit variants cannot be used with this body type")),
      (u = translate('Use the "Miitomo" body to select an outfit variant.')),
      o !== "miitomo")
    )
      setTimeout(() => {
        r.append(
          new Html("div")
            .class("flex-group", "col")
            .appendMany(
              new Html("h3").text(c),
              new Html("p").style({ "text-align": "center", margin: "0" }).text(u),
            ),
        );
      });
    return !0;
  };
}
function mce(e) {
  return async (t, r, n) => {
    let i = lG,
      o = t.outfitType,
      s = i !== "miitomo",
      a = "",
      l = "";
    if (s) return !1;
    let c = Html.from(r.elm.lastChild);
    (c.clear(),
      c.classOn("feature-set-group"),
      (c.elm.style.cssText =
        "display: flex;width: 100%;justify-content: center;flex-direction:column"));
    var u = new Html("div")
      .class("tab-content", "feature-set-group")
      .style({ "flex-direction": "row" });
    c.appendMany(
      new Html("div")
        .class("tab-list-detached")
        .append(new Html("div").class("tab", "tab-rectangle", "active").text("Variants")),
      u,
    );
    let h = getOutfitVariantNames()[o];
    if (!h) return !1;
    if (h.length === 0) return !1;
    if (n) e.editor.mii.outfitVariant = -1;
    let f = [];
    for (let p = 0; p < h.length; p++) {
      let g = p - 1,
        m = new Html("div").class("feature-item").text(h[p]);
      if (
        (f.push(m),
        m.on("mouseenter", () => {
          playSound("hover");
        }),
        m.on("click", () => {
          if (e.editor.mii.outfitVariant === g) {
            playSound("select_already_in_use");
            return;
          } else playSound("select_part");
          if (
            (f.forEach((A) => A.classOff("active")),
            m.classOn("active"),
            e.editor.mii.outfitType === 52 && g === 3 && t.acceType !== -1)
          ) {
            if (!ACCESSORY_MODEL_INFO[e.editor.mii.acceType]) return;
            if (ACCESSORY_MODEL_INFO[e.editor.mii.acceType].mdlType === 1)
              ((e.editor.mii.acceType = -1),
                Notify.show(
                  translate("Accessory was unequipped"),
                  translate("A back accessory cannot be used with the current variant."),
                ),
                e.editor.ui.scene.updateBody(5));
          }
          ((e.editor.mii.outfitVariant = g),
            (e.editor.ui.scene.mii = e.editor.mii),
            (e.editor.ui.scene.needsClothingUpdate = !0),
            e.editor.ui.scene.updateBody(1));
        }),
        e.editor.mii.outfitVariant === g)
      )
        (m.classOn("active"),
          setTimeout(() => {
            m.classOn("active");
          }));
      u.append(m);
    }
    return !0;
  };
}
function outfitTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        outfitType: {
          label: translate("Outfit"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Outfit type"),
          ),
          onBeforeChange: aG(0),
          onItemChange: mce(e),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Default Outfit")}</span>`,
              part: 2,
              bodyUpdateType: 1,
            },
            separatorGapThin(),
            ...range(getOutfitNames().length).map((t) => ({
              type: 0,
              forceRender: !0,
              bodyUpdateType: 1,
              value: t,
              icon: getOutfitNames()[t],
              part: 2,
            })),
            { type: 5, html: new Html("div").style({ width: "100%" }) },
            { type: 5, html: new Html("div") },
          ],
        },
        shirtColor: {
          label: translate("Shirt Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Shirt color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 1,
              property: "shirtColor",
              sound: "select_color",
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                forceRender: !0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 1,
                property: "shirtColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ).filter((t) => !vl.includes(t.value)),
          ],
        },
        pantsColor: {
          label: translate("Pants Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Pants color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !1,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 1,
              property: "pantsColor",
              sound: "select_color",
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                forceRender: !1,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 1,
                property: "pantsColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ).filter((t) => !vl.includes(t.value)),
          ],
        },
        shoesColor: {
          label: translate("Tertiary Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Tertiary color"),
          ),
          onBeforeChange: aG(1),
          items: [
            {
              type: 0,
              forceRender: !1,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 1,
              property: "shoesColor",
              sound: "select_color",
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                forceRender: !1,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 1,
                property: "shoesColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ).filter((t) => !vl.includes(t.value)),
          ],
        },
      },
    }),
  );
}
