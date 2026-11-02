// src/app/editor/tabs/mole-tab.js
// Editor tab: Mole.
//
// Defines: moleTab
// Uses from other files:
//   app/i18n/localization.js: getTranslator
//   app/ui/icons.js: SVG_ICONS
//   app/ui/components.js: createFeatureSet

var translate = getTranslator();
function moleTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        mole: {
          label: translate("Mole"),
          items: [
            {
              type: 4,
              items: [
                { icon: translate("Disable"), value: 0 },
                { icon: translate("Enable"), value: 1 },
              ],
              property: "moleType",
              part: 1,
            },
            {
              type: 2,
              property: "moleY",
              iconStart: SVG_ICONS.positionMoveUp,
              iconEnd: SVG_ICONS.positionMoveDown,
              soundStart: "position_down",
              soundEnd: "position_up",
              min: 0,
              max: 30,
              part: 1,
              inverse: !0,
              label: e.useAccessibility ? translate("Position") : void 0,
            },
            {
              type: 2,
              property: "moleX",
              iconStart: SVG_ICONS.positionPushIn,
              iconEnd: SVG_ICONS.positionPushOut,
              soundStart: "move_together",
              soundEnd: "move_apart",
              min: 0,
              max: 16,
              part: 1,
              label: e.useAccessibility ? translate("Spacing") : void 0,
            },
            {
              type: 2,
              property: "moleScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 8,
              part: 1,
              label: e.useAccessibility ? translate("Scale") : void 0,
            },
          ],
        },
      },
    }),
  );
}
