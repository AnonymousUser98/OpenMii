// src/app/util/colors-and-bytes.js
// Colour maths (RGB/HSL) and byte/base64/hex helpers.
//
// Defines: rgbToHsl, hslToRgb, adjustLightness, bytesToBase64, bytesToHex, toHexColor,
//          decodeHexOrBase64, removeWhitespace, hexToBytes, base64ToBytes
// Uses from other files:
//   app/mii/colors.js: FAVORITE_COLORS_RGB, COMMON_COLORS_RGB
//   app/settings/palette-flags.js: isAlternatePaletteEnabled
//   app/mii/formats/charinfo.js: getAlternatePaletteRGB

function rgbToHsl([e, t, r]) {
  let n = Math.max(e, t, r),
    i = Math.min(e, t, r),
    o = 0,
    s = 0,
    a = (n + i) / 2;
  if (n !== i) {
    let l = n - i;
    switch (((s = a > 0.5 ? l / (2 - n - i) : l / (n + i)), n)) {
      case e:
        o = (t - r) / l + (t < r ? 6 : 0);
        break;
      case t:
        o = (r - e) / l + 2;
        break;
      case r:
        o = (e - t) / l + 4;
        break;
    }
    o *= 60;
  }
  return [o, s, a];
}
function hslToRgb([e, t, r]) {
  let n = (1 - Math.abs(2 * r - 1)) * t,
    i = e / 60,
    o = n * (1 - Math.abs((i % 2) - 1)),
    [s, a, l] = [0, 0, 0];
  if (i >= 0 && i < 1) [s, a, l] = [n, o, 0];
  else if (i >= 1 && i < 2) [s, a, l] = [o, n, 0];
  else if (i >= 2 && i < 3) [s, a, l] = [0, n, o];
  else if (i >= 3 && i < 4) [s, a, l] = [0, o, n];
  else if (i >= 4 && i < 5) [s, a, l] = [o, 0, n];
  else [s, a, l] = [n, 0, o];
  let c = r - n / 2;
  return [s + c, a + c, l + c];
}
function adjustLightness(e, t) {
  let [r, n, i] = rgbToHsl(e),
    o = Math.min(1, Math.max(0, i + t));
  return hslToRgb([r, n, o]);
}
function id(e, t, r) {
  let n = [0, 1, 1];
  if (t === -1 && r === -1) n = (isAlternatePaletteEnabled() === !0 ? getAlternatePaletteRGB() : FAVORITE_COLORS_RGB)[e];
  else if (r !== -1) n = COMMON_COLORS_RGB[r];
  else if (t !== -1) n = (isAlternatePaletteEnabled() === !0 ? getAlternatePaletteRGB() : FAVORITE_COLORS_RGB)[t];
  return [adjustLightness(n, -0.15), adjustLightness(n, 0.15)];
}
function od(e, t) {
  if (t.length > e) throw RangeError(`Tried to fill ${t.length} bytes into a ${e}-byte array`);
  let r = new Uint8Array(e);
  for (var n = 0; n < t.length; n++) r[n] = t[n];
  return r;
}
function bytesToBase64(e) {
  return btoa(String.fromCharCode.apply(null, e));
}
function bytesToHex(e) {
  return Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
function Dv(e) {
  let t = new ArrayBuffer(e.length * 2),
    r = new DataView(t);
  for (let n = 0; n < e.length; n++) r.setUint16(n * 2, e.charCodeAt(n), !0);
  return new Uint8Array(t);
}
function Nv(e) {
  let t = new DataView(e.buffer, e.byteOffset, e.byteLength),
    r = "";
  for (let n = 0; n < t.byteLength; n += 2) r += String.fromCharCode(t.getUint16(n, !0));
  return r;
}
var toHexColor = (e) => "#" + e.toString(16).padStart(6, "0");
function decodeHexOrBase64(e) {
  let t,
    r = removeWhitespace(e);
  if (/^[0-9a-fA-F]+$/.test(r)) t = hexToBytes(r);
  else t = base64ToBytes(r);
  return t;
}
function removeWhitespace(e) {
  return e.replace(/\s+/g, "");
}
function hexToBytes(e) {
  let t = e.match(/.{1,2}/g),
    r = (t ? t : []).map(function (n) {
      return parseInt(n, 16);
    });
  return new Uint8Array(r);
}
function base64ToBytes(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  function r(a) {
    while (a.length % 4 !== 0) a += "=";
    return a;
  }
  let n = r(t),
    i = atob(n),
    o = i.length,
    s = new Uint8Array(o);
  for (let a = 0; a < o; a++) s[a] = i.charCodeAt(a);
  return s;
}
