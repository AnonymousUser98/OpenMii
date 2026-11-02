// src/app/editor/tabs/glasses-tab.js
// Editor tab: Glasses.
//
// Defines: glassesTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_GLASS_COLOR_TO_COMMON
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/mii/formats/charinfo.js: WII_MAX_GLASS_TYPE
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function glassesTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: (t, r, n, i) => {
        e.callback(t, r, n, i);
      },
      entries: {
        glassType: {
          label: translate("Type"),
          items: range(
            e.editLimits === "wii"
              ? WII_MAX_GLASS_TYPE + 1
              : e.editLimits === "switch" || e.editLimits === "miic"
                ? 20
                : 9,
          ).map((t) => ({ type: 0, value: t, icon: e.icons.glasses[t], part: 0 })),
        },
        glassesColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(6).map((t) => ({
              type: 0,
              value: LEGACY_GLASS_COLOR_TO_COMMON[t],
              color: COMMON_COLORS_HEX[LEGACY_GLASS_COLOR_TO_COMMON[t]],
              part: 0,
              property: "glassColor",
            })),
            ...(e.editLimits === "switch" || e.editLimits === "miic"
              ? [
                  separator(),
                  ...orderItems(
                    range(100).map((t) => ({
                      type: 0,
                      value: t,
                      color: COMMON_COLORS_HEX[t],
                      part: 0,
                      property: "glassColor",
                    })),
                    COMMON_COLOR_DISPLAY_ORDER,
                    separatorGapThinLaptop,
                  ),
                ]
              : []),
          ],
        },
        glassesPosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "glassY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 0,
              max: 20,
              part: 0,
              inverse: !0,
              label: e.useAccessibility ? translate("Position") : void 0,
            },
            {
              type: 2,
              property: "glassScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 7,
              part: 0,
              label: e.useAccessibility ? translate("Scale") : void 0,
            },
          ],
        },
      },
    }),
  );
}
