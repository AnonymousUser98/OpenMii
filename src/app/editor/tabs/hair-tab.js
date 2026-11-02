// src/app/editor/tabs/hair-tab.js
// Editor tab: Hair.
//
// Defines: hairTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, NA, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThin, separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_HAIR_COLOR_TO_COMMON
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/mii/formats/charinfo.js: WII_MAX_HAIR_TYPE
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function hairTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: (t, r, n, i) => {
        e.callback(t, r, n, i);
      },
      entries: {
        hairType: {
          label: translate("Type"),
          items: orderItems(
            range(e.editLimits === "wii" ? WII_MAX_HAIR_TYPE + 1 : 132).map((t) => ({
              type: 0,
              value: t,
              icon: e.icons.hair[t],
              part: 0,
            })),
            NA,
            null,
          ),
        },
        hairColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(8).map((t) => ({ type: 0, value: LEGACY_HAIR_COLOR_TO_COMMON[t], color: COMMON_COLORS_HEX[LEGACY_HAIR_COLOR_TO_COMMON[t]], part: 0 })),
            ...(e.editLimits === "switch" || e.editLimits === "miic"
              ? [
                  separator(),
                  ...orderItems(
                    range(100).map((t) => ({ type: 0, value: t, color: COMMON_COLORS_HEX[t], part: 0 })),
                    COMMON_COLOR_DISPLAY_ORDER,
                    separatorGapThinLaptop,
                  ),
                ]
              : []),
          ],
        },
        hairTipColor: {
          label: e.useAccessibility ? translate("Gradient") : SVG_ICONS.subColor,
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Hair gradient"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 2,
              bodyUpdateType: 4,
              property: "hairTipColor",
              selectedCondition: () => e.mii.hairTipColor === -1,
            },
            {
              type: 3,
              forceRender: !0,
              value: -1,
              part: 2,
              bodyUpdateType: 4,
              property: "hairTipX",
              iconStart: SVG_ICONS.hairTipXStart,
              iconEnd: SVG_ICONS.hairTipXEnd,
              min: 1,
              max: 7,
              label: e.useAccessibility ? "Hair Tip X" : void 0,
            },
            {
              type: 3,
              forceRender: !0,
              value: -1,
              part: 2,
              bodyUpdateType: 4,
              property: "hairTipY",
              iconStart: SVG_ICONS.hairTipYStart,
              iconEnd: SVG_ICONS.hairTipYEnd,
              min: 1,
              max: 7,
              label: e.useAccessibility ? "Hair Tip Y" : void 0,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 2,
                bodyUpdateType: 4,
                property: "hairTipColor",
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
