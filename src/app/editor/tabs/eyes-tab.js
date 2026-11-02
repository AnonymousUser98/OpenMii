// src/app/editor/tabs/eyes-tab.js
// Editor tab: Eyes.
//
// Defines: eyesTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, BA, COMMON_COLOR_DISPLAY_ORDER, sd, orderItems,
//                         separator, separatorGapThin, separatorGapThinDesktop,
//                         separatorGapThinLaptop
//   app/mii/colors.js: COMMON_COLORS_HEX, LEGACY_EYE_COLOR_TO_COMMON
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/mii/formats/ffsd-miic.js: MII_FIELD_LIMITS
//   app/mii/formats/charinfo.js: WII_MAX_EYE_TYPE
//   app/ui/icons.js: SVG_ICONS
//   app/ui/modal.js: Modal
//   app/assets/models.js: ag

var translate = getTranslator();
function eyesTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        eyeType: {
          label: translate("Type"),
          items: orderItems(
            range(e.editLimits === "wii" ? WII_MAX_EYE_TYPE + 1 : 60).map((t) => ({
              type: 0,
              value: t,
              icon: e.icons.eyes[t],
              part: 1,
              preSelectCallback(r) {
                ((r.eyeRotate += sd[t] - sd[r.eyeType]),
                  (r.eyeRotate = Math.max(0, Math.min(7, r.eyeRotate))));
              },
            })),
            BA,
            separatorGapThinDesktop,
          ),
        },
        eyeColor: {
          label: e.useAccessibility ? translate("Color") : SVG_ICONS.color,
          items: [
            ...range(6).map((t) => ({ type: 0, value: LEGACY_EYE_COLOR_TO_COMMON[t], color: COMMON_COLORS_HEX[LEGACY_EYE_COLOR_TO_COMMON[t]], part: 1 })),
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
        eyeRColor: {
          label: e.useAccessibility ? translate("Alternate color") : SVG_ICONS.subColor,
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Alternate eye color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 1,
              property: "eyeRColor",
              selectedCondition: () => e.mii.eyeRColor === -1,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 1,
                property: "eyeRColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
        ...(e.editor.shaderType === "toon" && {
          eyeShine: {
            label: e.useAccessibility ? translate("Eye shine") : SVG_ICONS.eyeShine,
            header: translate(
              "%1 is exclusive to Mii Creator's toon shader, and won't transfer to other data formats.",
              translate("Eye shine "),
            ),
            items: [
              {
                type: 0,
                forceRender: !0,
                value: -1,
                icon: `<span class="disable-item">${translate("Default")}</span>`,
                part: 1,
                property: "eyeShine",
                selectedCondition: () => e.mii.eyeShine === -1,
              },
              separatorGapThin(),
              ...ag().map((t, r) => ({
                type: 0,
                value: r,
                ...(r === 0 ? { icon: translate("Disabled") } : { icon: t.source.data, appendIcon: !0 }),
                part: 1,
                property: "eyeShine",
              })),
              separatorGapThin(),
            ],
          },
        }),
        eyePosition: {
          label: translate("Position"),
          items: [
            {
              type: 2,
              property: "eyeY",
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
                if (e.editLimits === "wii") t.eyeAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyeX",
              iconStart: SVG_ICONS.positionPushIn,
              iconEnd: SVG_ICONS.positionPushOut,
              soundStart: "move_together",
              soundEnd: "move_apart",
              min: 0,
              max: 12,
              part: 1,
              label: e.useAccessibility ? translate("Spacing") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyeAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyeRotate",
              iconStart: SVG_ICONS.positionRotateCW,
              iconEnd: SVG_ICONS.positionRotateCCW,
              soundStart: "rotate_cw",
              soundEnd: "rotate_ccw",
              min: 0,
              max: 7,
              part: 1,
              label: e.useAccessibility ? translate("Rotation") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyeAspect = 3;
              },
            },
            {
              type: 2,
              property: "eyeScale",
              iconStart: SVG_ICONS.positionSizeDown,
              iconEnd: SVG_ICONS.positionSizeUp,
              soundStart: "scale_down",
              soundEnd: "scale_up",
              min: 0,
              max: 7,
              part: 1,
              label: e.useAccessibility ? translate("Scale") : void 0,
              preSelectCallback(t) {
                if (e.editLimits === "wii") t.eyeAspect = 3;
              },
            },
            e.editLimits === "wii"
              ? void 0
              : {
                  type: 2,
                  property: "eyeAspect",
                  iconStart: SVG_ICONS.positionStretchIn,
                  iconEnd: SVG_ICONS.positionStretchOut,
                  soundStart: "vert_stretch_down",
                  soundEnd: "vert_stretch_up",
                  min: 0,
                  max: 6,
                  part: 1,
                  label: e.useAccessibility ? translate("Stretch") : void 0,
                },
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Reset")}</span>`,
              part: 1,
              property: null,
              sound: "undo",
              selectedCondition: () => !1,
              preSelectCallback: async (t) => {
                if (
                  !(await Modal.prompt(
                    translate("Confirm"),
                    translate("Are you sure you want to reset eye positions?"),
                  ))
                )
                  return { a: !1, b: !1 };
                let r = MII_FIELD_LIMITS;
                return (
                  (t.eyeRotate = r.eyeRotate.default),
                  (t.eyeRotate += sd[t.eyeType]),
                  (t.eyeRotate = Math.max(0, Math.min(7, t.eyeRotate))),
                  (t.eyeAspect = r.eyeAspect.default),
                  (t.eyeX = r.eyeX.default),
                  (t.eyeY = r.eyeY.default),
                  (t.eyeScale = r.eyeScale.default),
                  { a: !1, b: !0 }
                );
              },
            },
          ],
        },
      },
    }),
  );
}
