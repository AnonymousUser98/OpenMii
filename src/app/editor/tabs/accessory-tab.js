// src/app/editor/tabs/accessory-tab.js
// Editor tab: Accessory.
//
// Defines: fce, pce, accessoryTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThin, separatorGapThinLaptop
//   app/mii/colors.js: FAVORITE_COLORS_INT, COMMON_COLORS_HEX
//   app/items/item-lists.js: getAccessoryVariantNames, getAccessoryNames
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/items/accessory-model-info.js: ACCESSORY_MODEL_INFO
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/util/colors-and-bytes.js: toHexColor
//   app/shaders/shader-registry.js: getRendererSetting
//   app/assets/models.js: getDefaultBodyModelName
//   app/ui/notify.js: Notify
//   … and 1 more files

var translate = getTranslator();
function fce(e) {
  return async (t, r, n) => {
    let i = t.acceType,
      o = Html.from(r.elm.lastChild);
    (o.clear(),
      o.classOn("feature-set-group"),
      (o.elm.style.cssText =
        "display: flex;width: 100%;justify-content: center;flex-direction:column"));
    var s = new Html("div")
      .class("tab-content", "feature-set-group")
      .style({ "flex-direction": "row" });
    o.appendMany(
      new Html("div")
        .class("tab-list-detached")
        .append(new Html("div").class("tab", "tab-rectangle", "active").text("Variants")),
      s,
    );
    let l = getAccessoryVariantNames()[i];
    if (!l) return !1;
    if (l.length === 0) return !1;
    if (n) e.editor.mii.acceVariant = -1;
    let c = [];
    for (let u = 0; u < l.length; u++) {
      let d = u - 1,
        h = new Html("div").class("feature-item").text(l[u]);
      if (
        (c.push(h),
        h.on("mouseenter", () => {
          playSound("hover");
        }),
        h.on("click", () => {
          if (e.editor.mii.acceVariant === d) {
            playSound("select_already_in_use");
            return;
          } else playSound("select_part");
          (c.forEach((f) => f.classOff("active")),
            h.classOn("active"),
            (e.editor.mii.acceVariant = d),
            (e.editor.ui.scene.mii = e.editor.mii),
            e.editor.ui.scene.updateBody(5));
        }),
        e.editor.mii.acceVariant === d)
      )
        (h.classOn("active"),
          setTimeout(() => {
            h.classOn("active");
          }));
      s.append(h);
    }
    return !0;
  };
}
function pce(e) {
  if (!ACCESSORY_MODEL_INFO[e.acceType]) return !1;
  let t = ACCESSORY_MODEL_INFO[e.acceType].mdlType;
  if (t === 1) {
    if (e.outfitType === 52 && e.outfitVariant === 3) {
      if (
        ((e.acceType = -1),
        Notify.show(
          translate("Can't equip accessory"),
          translate("A back accessory cannot be used with the current outfit."),
        ),
        MiiEditor.getCurrentEditor())
      )
        MiiEditor.getCurrentEditor().callTab(12);
      return !1;
    }
  }
  if (t === 3) {
    if (getDefaultBodyModelName() === "streetpass") {
      if (
        ((e.acceType = -1),
        Notify.show(
          translate("Can't equip accessory"),
          translate("An arm accessory cannot be used with the current body model."),
        ),
        MiiEditor.getCurrentEditor())
      )
        MiiEditor.getCurrentEditor().callTab(12);
      return !1;
    }
  }
  return !0;
}
function accessoryTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: (t, r, n, i) => {
        (pce(t), e.callback(t, r, n, i));
      },
      entries: {
        acceType: {
          label: translate("Accessory"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Accessory type"),
          ),
          async onBeforeChange(t, r, n) {
            let i;
            i = await getRendererSetting("bodyModelN");
            let s = i !== "miitomo",
              a = "",
              l = "";
            if (s)
              return (
                (a = translate("You can't use accessories with this body type")),
                (l = translate('Use the "Miitomo" body to equip an accessory.')),
                r.append(
                  new Html("div")
                    .class("flex-group", "col")
                    .appendMany(
                      new Html("h3").text(a),
                      new Html("p").style({ "text-align": "center", margin: "0" }).text(l),
                    ),
                ),
                !1
              );
            return !0;
          },
          onItemChange: fce(e),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 5,
            },
            separatorGapThin(),
            ...range(ACCESSORY_MODEL_INFO.length).map((t) => ({
              type: 0,
              forceRender: !0,
              value: t,
              icon: e.icons.acce && e.icons.acce[t] ? e.icons.acce[t] : getAccessoryNames()[t],
              part: 2,
              bodyUpdateType: 5,
            })),
            { type: 5, html: new Html("div") },
          ],
        },
        AcceColor: {
          label: translate("Accessory Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Accessory color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 6,
              property: "accePrimaryColor",
              selectedCondition: () => e.mii.accePrimaryColor === -1,
            },
            separatorGapThin(),
            ...range(12).map((t) => ({
              type: 0,
              forceRender: !0,
              value: t,
              color: toHexColor(FAVORITE_COLORS_INT[t]),
              part: 2,
              bodyUpdateType: 6,
              property: "accePrimaryColor",
              preSelectCallback: (r) => {
                r.accePrimaryColor = t;
              },
            })),
            separator(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t + 11,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 6,
                property: "accePrimaryColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
        AcceColorSecondary: {
          label: translate("Secondary Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Accessory secondary color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 6,
              property: ["acceSecondaryColor"],
              selectedCondition: () => e.mii.acceSecondaryColor === -1,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 6,
                property: "acceSecondaryColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
        AcceColorTertiary: {
          label: translate("Tertiary Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Accessory tertiary color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 6,
              property: ["acceTertiaryColor"],
              selectedCondition: () => e.mii.acceTertiaryColor === -1,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 6,
                property: "acceTertiaryColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
      },
    }),
  );
}
