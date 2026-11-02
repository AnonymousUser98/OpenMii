// src/app/editor/tabs/hat-tab.js
// Editor tab: Hat.
//
// Defines: hatTab
// Uses from other files:
//   app/ui/components.js: createFeatureSet, COMMON_COLOR_DISPLAY_ORDER, orderItems, separator,
//                         separatorGapThin, separatorGapThinLaptop
//   app/mii/colors.js: FAVORITE_COLORS_INT, COMMON_COLORS_HEX
//   app/items/item-lists.js: HAT_MODEL_INFO, getHatNames
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/util/colors-and-bytes.js: toHexColor

var translate = getTranslator();
function hatTab(e) {
  e.container.append(
    createFeatureSet({
      mii: e.mii,
      onChange: (t, r, n, i) => {
        e.callback(t, r, n, i);
      },
      entries: {
        hatType: {
          label: translate("Hat"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Hat type"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 0,
            },
            separatorGapThin(),
            ...range(HAT_MODEL_INFO.length).map((t) => ({
              type: 0,
              forceRender: !0,
              value: t,
              icon: e.icons.hat[t] ? e.icons.hat[t] : getHatNames()[t],
              part: 0,
            })),
          ],
        },
        hatColor: {
          label: translate("Hat Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Hat color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 0,
              property: ["hatFavoriteColor", "hatCommonColor"],
              selectedCondition: () => e.mii.hatCommonColor === -1 && e.mii.hatFavoriteColor === -1,
            },
            separatorGapThin(),
            ...range(12).map((t) => ({
              type: 0,
              forceRender: !0,
              value: t,
              color: toHexColor(FAVORITE_COLORS_INT[t]),
              part: 0,
              property: "hatFavoriteColor",
              preSelectCallback: (r) => {
                ((r.hatFavoriteColor = t), (r.hatCommonColor = -1));
              },
            })),
            separator(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 0,
                property: "hatCommonColor",
                preSelectCallback: (r) => {
                  ((r.hatFavoriteColor = -1), (r.hatCommonColor = t));
                },
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
        hatColorSecondary: {
          label: translate("Secondary Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Hat secondary color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 0,
              property: ["hatSecondaryColor"],
              selectedCondition: () => e.mii.hatSecondaryColor === -1,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 0,
                property: "hatSecondaryColor",
              })),
              COMMON_COLOR_DISPLAY_ORDER,
              separatorGapThinLaptop,
            ),
          ],
        },
        hatColorTertiary: {
          label: translate("Tertiary Color"),
          header: translate(
            "%1 is exclusive to Mii Creator, and won't transfer to other data formats.",
            translate("Hat tertiary color"),
          ),
          items: [
            {
              type: 0,
              forceRender: !0,
              value: -1,
              icon: `<span class="disable-item">${translate("Disabled")}</span>`,
              part: 0,
              property: ["hatTertiaryColor"],
              selectedCondition: () => e.mii.hatTertiaryColor === -1,
            },
            separatorGapThin(),
            ...orderItems(
              range(100).map((t) => ({
                type: 0,
                value: t,
                color: COMMON_COLORS_HEX[t],
                part: 0,
                property: "hatTertiaryColor",
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
var JSZip = In(Cm(), 1),
  localforage = In(Hs(), 1);
