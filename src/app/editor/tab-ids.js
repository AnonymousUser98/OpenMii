// src/app/editor/tab-ids.js
// Editor tab ids (TAB_FACE, TAB_HAIR, ...) and editor state.
//
// Defines: TAB_FACE, TAB_HAIR, TAB_EYEBROWS, TAB_EYES, TAB_NOSE, TAB_MOUTH, TAB_BEARD, TAB_MOLE,
//          TAB_GLASSES, TAB_SCALE, TAB_HAT, TAB_OUTFIT, TAB_ACCESSORY, TAB_PROFILE, editorMii, Rce,
//          Oce
// Uses from other files:
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator

var TAB_FACE = 0,
  TAB_HAIR = 1,
  TAB_EYEBROWS = 2,
  TAB_EYES = 3,
  TAB_NOSE = 4,
  TAB_MOUTH = 5,
  TAB_BEARD = 6,
  TAB_MOLE = 7,
  TAB_GLASSES = 8,
  TAB_SCALE = 9;
var TAB_HAT = 11,
  TAB_OUTFIT = 12,
  TAB_ACCESSORY = 13,
  TAB_PROFILE = 14;
var editorMii;
var g9 = null,
  translate = getTranslator();
function dG(e) {
  if (e.target.closest(".popup-overlay") === null)
    Html.qsa(".popup-overlay") !== null && Html.qsa(".popup-overlay").forEach((t) => t.cleanup());
}
var Rce =
    "0800400308040402020c0301060406020a0000000000000804000a0100214004000214031304170d04000a040109",
  Oce =
    "0800400308030404020c0301060400020a0000000000010804000a01000c4004000214031304170d04000a040109";
