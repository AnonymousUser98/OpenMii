// src/app/editor/tabs/mouth-tab.js
// Editor tab: Mouth.
//
// Defines: mouthTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, FA, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThinDesktop, separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_MOUTH_COLOR_TO_COMMON
//   app/mii/formats/charinfo.js: WII_MAX_MOUTH_TYPE, IA
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function mouthTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: (t, r, n, i) => {
        e.callback(t, r, n, i);
      },
      entries: {
        mouthType: {
          label: translate("Type"),
          items: orderItems(
            range(e.editLimits === "wii" ? WII_MAX_MOUTH_TYPE + 1 : 36).map((t) => ({
              type: 0,
              value: t,
              icon: e.icons.mouth[t],
              part: 1,
            })),
            FA,
            separatorGapThinDesktop,
          ),
        },
        mouthColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(e.editLimits === "wii" ? IA + 1 : 5).map((t) => ({
              type: 0,
              value: LEGACY_MOUTH_COLOR_TO_COMMON[t],
              color: COMMON_COLORS_HEX[LEGACY_MOUTH_COLOR_TO_COMMON[t]],
              part: 1,
              property: "mouthColor",
            })),
            ...(e.editLimits === "switch" || e.editLimits === "miic"
              ? [
                  separator(),
                  ...orderItems(
                    range(100).map((t) => ({
                      type: 0,
                      value: t,
                      color: COMMON_COLORS_HEX[t],
                      part: 1,
                      property: "mouthColor",
                    })),
                    COMMON_COLOR_DISPLAY_ORDER,
                    separatorGapThinLaptop,
                  ),
                ]
              : []),
          ],
        },
        mouthPosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "mouthY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 0,
              max: 18,
              part: 1,
              inverse: !0,
              label: e.useAccessibility ? translate("Position") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.mouthAspect = 3;
              },
            },
            {
              type: 2,
              property: "mouthScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 8,
              part: 1,
              label: e.useAccessibility ? translate("Scale") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.mouthAspect = 3;
              },
            },
            e.editLimits === "wii"
              ? void 0
              : {
                  type: 2,
                  property: "mouthAspect",
                  iconStart: SVG_ICONS.positionStretchIn,
                  iconEnd: SVG_ICONS.positionStretchOut,
                  soundStart: "vert_stretch_down",
                  soundEnd: "vert_stretch_up",
                  min: 0,
                  max: 6,
                  part: 1,
                  label: e.useAccessibility ? translate("Stretch") : void 0,
                },
            e.editLimits === "miic"
              ? {
                  type: 5,
                  html: new Html("div")
                    .class("feature-set-header")
                    .text(
                      translate(
                        "Mouth rotation is exclusive to Mii Creator, other data formats will not show it.",
                      ),
                    ),
                }
              : void 0,
            e.editLimits === "miic"
              ? {
                  type: 2,
                  property: "mouthRotate",
                  iconStart: SVG_ICONS.positionRotateCW,
                  iconEnd: SVG_ICONS.positionRotateCCW,
                  soundStart: "rotate_cw",
                  soundEnd: "rotate_ccw",
                  min: 1,
                  max: 7,
                  part: 1,
                  label: e.useAccessibility ? translate("Rotation") : void 0,
                }
              : void 0,
          ],
        },
      },
    }),
  );
}
