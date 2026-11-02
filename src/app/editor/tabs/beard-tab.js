// src/app/editor/tabs/beard-tab.js
// Editor tab: Beard & mustache.
//
// Defines: beardTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_HAIR_COLOR_TO_COMMON
//   app/mii/formats/charinfo.js: WII_MAX_MUSTACHE_TYPE, WII_MAX_BEARD_TYPE
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function beardTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        mustacheType: {
          label: translate("Mustache"),
          items: range(e.editLimits === "wii" ? WII_MAX_MUSTACHE_TYPE + 1 : 6).map((t) => ({
            type: 0,
            value: t,
            icon: e.icons.mustache[t],
            part: 1,
          })),
        },
        mustachePosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "mustacheY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 0,
              max: 16,
              part: 1,
              inverse: !0,
              label: e.useAccessibility ? "Position" : void 0,
            },
            {
              type: 2,
              property: "mustacheScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 8,
              part: 1,
              label: e.useAccessibility ? "Scale" : void 0,
            },
          ],
        },
        beardType: {
          label: translate("Beard"),
          items: range(e.editLimits === "wii" ? WII_MAX_BEARD_TYPE + 1 : 6).map((t) => ({
            type: 0,
            value: t,
            icon: e.icons.goatee[t],
            part: 0,
          })),
        },
        beardColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(8).map((t) => ({
              type: 0,
              value: LEGACY_HAIR_COLOR_TO_COMMON[t],
              color: COMMON_COLORS_HEX[LEGACY_HAIR_COLOR_TO_COMMON[t]],
              part: 0,
              property: "beardColor",
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
                      property: "beardColor",
                    })),
                    COMMON_COLOR_DISPLAY_ORDER,
                    separatorGapThinLaptop,
                  ),
                ]
              : []),
          ],
        },
      },
    }),
  );
}
