// src/app/editor/ffsd-warning.js
// Warning shown before converting a Mii with extended features to FFSD.
//
// Defines: confirmFFSDConversion
// Uses from other files:
//   app/ui/modal.js: Modal

var confirmFFSDConversion = async (e) => {
  if (e.hasExtendedColors() === !0) {
    if (
      (await Modal.prompt(
        translate("Warning"),
        translate(`This Mii is using extended Switch colors and/or Mii Creator features, but those features will be lost when converting to FFSD.
Use "Save Mii Creator data" if you want to keep the data.
Is this OK?`),
        "body",
        !1,
      )) === !1
    )
      return !1;
  }
  return !0;
};
