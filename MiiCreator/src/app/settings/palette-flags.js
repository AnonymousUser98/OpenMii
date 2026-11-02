// src/app/settings/palette-flags.js
// Runtime flags for the alternate default palette.
//
// Defines: alternatePaletteEnabled, alternatePaletteSetting, isAlternatePaletteEnabled,
//          getAlternatePaletteSetting, setAlternatePaletteEnabled, setAlternatePaletteSetting

var alternatePaletteEnabled = !1,
  alternatePaletteSetting = !1;
var isAlternatePaletteEnabled = () => alternatePaletteEnabled,
  getAlternatePaletteSetting = () => alternatePaletteSetting,
  setAlternatePaletteEnabled = (e) => {
    alternatePaletteEnabled = e;
  },
  setAlternatePaletteSetting = (e) => {
    alternatePaletteSetting = e;
  };
