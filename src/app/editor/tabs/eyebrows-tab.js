// src/app/editor/tabs/eyebrows-tab.js
// Editor tab: Eyebrows.
//
// Defines: eyebrowsTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, p7, COMMON_COLOR_DISPLAY_ORDER, Lh, orderItems,
//                         separator, separatorGapThinDesktop, separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_HAIR_COLOR_TO_COMMON
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function eyebrowsTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        eyebrowType: {
          label: translate("Type"),
          items: orderItems(
            range(24).map((t) => ({
              type: 0,
              value: t,
              icon: e.icons.eyebrows[t],
              part: 1,
              preSelectCallback(r) {
                ((r.eyebrowRotate += Lh[t] - Lh[r.eyebrowType]),
                  (r.eyebrowRotate = Math.max(0, Math.min(11, r.eyebrowRotate))));
              },
            })),
            p7,
            separatorGapThinDesktop,
          ),
        },
        eyebrowColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(8).map((t) => ({ type: 0, value: LEGACY_HAIR_COLOR_TO_COMMON[t], color: COMMON_COLORS_HEX[LEGACY_HAIR_COLOR_TO_COMMON[t]], part: 1 })),
            ...(e.editLimits === "switch" || e.editLimits === "miic"
              ? [
                  separator(),
                  ...orderItems(
                    range(100).map((t) => ({ type: 0, value: t, color: COMMON_COLORS_HEX[t], part: 1 })),
                    COMMON_COLOR_DISPLAY_ORDER,
                    separatorGapThinLaptop,
                  ),
                ]
              : []),
          ],
        },
        eyebrowPosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "eyebrowY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 3,
              max: 18,
              part: 1,
              inverse: !0,
              label: e.useAccessibility ? translate("Position") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyeAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyebrowX",
              iconStart: SVG_ICONS.positionPushIn,
              iconEnd: SVG_ICONS.positionPushOut,
              soundStart: "move_together",
              soundEnd: "move_apart",
              min: 0,
              max: 12,
              part: 1,
              label: e.useAccessibility ? translate("Spacing") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyebrowAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyebrowRotate",
              iconStart: SVG_ICONS.positionRotateCW,
              iconEnd: SVG_ICONS.positionRotateCCW,
              soundStart: "rotate_cw",
              soundEnd: "rotate_ccw",
              min: 0,
              max: 11,
              part: 1,
              label: e.useAccessibility ? translate("Rotation") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyebrowAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyebrowScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 8,
              part: 1,
              label: e.useAccessibility ? translate("Scale") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyebrowAspect = 3;
              },
            },
            e.editLimits === "wii"
              ? void 0
              : {
                  type: 2,
                  property: "eyebrowAspect",
                  iconStart: SVG_ICONS.positionStretchIn,
                  iconEnd: SVG_ICONS.positionStretchOut,
                  soundStart: "vert_stretch_down",
                  soundEnd: "vert_stretch_up",
                  min: 0,
                  max: 6,
                  part: 1,
                  label: e.useAccessibility ? translate("Stretch") : void 0,
                },
          ],
        },
      },
    }),
  );
}
