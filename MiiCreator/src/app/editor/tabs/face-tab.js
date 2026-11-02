// src/app/editor/tabs/face-tab.js
// Editor tab: Face (shape, makeup, wrinkles, face paint).
//
// Defines: faceTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, PA, orderItems, separator,
//                         separatorGapThin, separatorGapThinLaptop
//   app/mii/colors.js: SKIN_COLORS_HEX, COMMON_COLORS_HEX, SKIN_COLORS_HEX_2
//   app/mii/formats/charinfo.js: Vs, WII_MAX_FACELINE_TYPE
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function faceTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        facelineType: {
          label: e.useAccessibility ? translate("Shape") : SVG_ICONS.face,
          items: range(e.editLimits === "wii" ? WII_MAX_FACELINE_TYPE + 1 : 12).map((t) => ({
            type: 0,
            value: t,
            icon: e.icons.face[t],
            part: 0,
            bodyUpdateType: 0,
          })),
        },
        facelineMake:
          e.editLimits === "wii"
            ? void 0
            : {
                label: e.useAccessibility ? translate("Makeup") : SVG_ICONS.face_makeup,
                items: range(12).map((t) => ({
                  type: 0,
                  value: t,
                  icon: e.icons.makeup[t],
                  part: 0,
                  bodyUpdateType: 0,
                })),
              },
        facelineWrinkle:
          e.editLimits === "wii"
            ? void 0
            : {
                label: e.useAccessibility ? translate("Wrinkles") : SVG_ICONS.face_wrinkles,
                items: range(12).map((t) => ({
                  type: 0,
                  value: t,
                  icon: e.icons.wrinkles[t],
                  part: 0,
                  bodyUpdateType: 0,
                })),
              },
        facelineTex:
          e.editLimits !== "wii"
            ? void 0
            : {
                label: e.useAccessibility ? translate("Texture") : SVG_ICONS.face_makeup,
                items: range(12).map((t) => ({
                  type: 0,
                  value: Vs[t][0] === 0 ? Vs[t][1] : Vs[t][0],
                  property:
                    t !== 0 ? (Vs[t][0] === 0 ? "facelineWrinkle" : "facelineMake") : "facelineTex",
                  icon: Vs[t][0] === 0 ? e.icons.wrinkles[Vs[t][1]] : e.icons.makeup[Vs[t][0]],
                  part: 0,
                  bodyUpdateType: 0,
                  preSelectCallback(r) {
                    if (t === 0) ((r.facelineMake = 0), (r.facelineWrinkle = 0));
                    if (Vs[t][0] === 0) r.facelineMake = 0;
                    else r.facelineWrinkle = 0;
                  },
                  selectedCondition() {
                    if (t === 0)
                      if (e.mii.facelineMake === 0 && e.mii.facelineWrinkle === 0) return !0;
                      else return !1;
                    if (Vs[t][0] === 0) {
                      if (e.mii.facelineWrinkle === Vs[t][1]) return !0;
                    } else if (e.mii.facelineMake === Vs[t][0]) return !0;
                    return !1;
                  },
                })),
              },
        facelineColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(6).map((t) => ({ type: 0, value: t, color: SKIN_COLORS_HEX[t], part: 0, bodyUpdateType: 1 })),
            ...(e.editLimits === "switch" || e.editLimits === "miic"
              ? [
                  separator(),
                  ...orderItems(
                    range(10).map((t) => ({
                      type: 0,
                      value: t,
                      color: SKIN_COLORS_HEX_2[t],
                      part: 0,
                      bodyUpdateType: 1,
                    })),
                    PA,
                    separatorGapThin,
                  ),
                ]
              : []),
          ],
        },
        facePaintColor:
          e.editLimits !== "miic"
            ? void 0
            : {
                label: e.useAccessibility ? translate("Face Paint") : SVG_ICONS.face_paint,
                header: translate(
                  "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
                  translate("Face paint"),
                ),
                items: [
                  {
                    type: 0,
                    forceRender: !0,
                    value: -1,
                    icon: `<span class="disable-item">${translate("Disabled")}</span>`,
                    part: 0,
                    bodyUpdateType: 1,
                  },
                  separatorGapThin(),
                  ...orderItems(
                    range(100).map((t) => ({
                      type: 0,
                      value: t,
                      color: COMMON_COLORS_HEX[t],
                      part: 0,
                      bodyUpdateType: 1,
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
