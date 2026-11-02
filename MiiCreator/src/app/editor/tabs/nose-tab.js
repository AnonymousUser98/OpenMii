// src/app/editor/tabs/nose-tab.js
// Editor tab: Nose.
//
// Defines: noseTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, DA, orderItems, separatorGapThinDesktop
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/mii/formats/charinfo.js: WII_MAX_NOSE_TYPE
//   app/ui/icons.js: SVG_ICONS

var translate = getTranslator();
function noseTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        noseType: {
          label: translate("Type"),
          items: [
            ...orderItems(
              range(e.editLimits === "wii" ? WII_MAX_NOSE_TYPE + 1 : 18).map((t) => ({
                type: 0,
                value: t,
                icon: e.icons.nose[t],
                part: 0,
              })),
              DA,
              separatorGapThinDesktop,
            ),
          ],
        },
        nosePosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "noseY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 0,
              max: 18,
              part: 0,
              inverse: !0,
              label: e.useAccessibility ? translate("Position") : void 0,
            },
            {
              type: 2,
              property: "noseScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 8,
              part: 0,
              label: e.useAccessibility ? translate("Scale") : void 0,
            },
          ],
        },
      },
    }),
  );
}
