// src/app/mii/hex-colors.js
// Exact hex colours: the .miic "MCX1" block that stores colours outside the standard palettes.

globalThis.__miicHex = globalThis.__miicHex || (function () {
  var FIELDS = ["eyeColor","eyeRColor","hairColor","hairTipColor","eyebrowColor","mouthColor","beardColor","glassColor","shirtColor","pantsColor","shoesColor","hatCommonColor","hatSecondaryColor","hatTertiaryColor","acceSecondaryColor","acceTertiaryColor"];
  var CLOTH = ["shirtColor","pantsColor","shoesColor","hatCommonColor","hatSecondaryColor","hatTertiaryColor","acceSecondaryColor","acceTertiaryColor"];
  var OFF = {"eyeColor":75,"eyeRColor":130,"hairColor":94,"hairTipColor":129,"eyebrowColor":69,"mouthColor":107,"beardColor":60,"glassColor":90,"shirtColor":120,"pantsColor":117,"shoesColor":125,"hatCommonColor":98,"hatSecondaryColor":126,"hatTertiaryColor":127,"acceSecondaryColor":136,"acceTertiaryColor":137};
  var BASE = 140, MAGIC = [0x4d, 0x43, 0x58, 0x01];
  function isCloth(f) { return CLOTH.indexOf(f) !== -1; }
  function palFor(f, face, cloth) { return isCloth(f) ? cloth : face; }
  function split(e) {
    if (!e || e.length <= BASE + 5) return { base: e, ext: [] };
    for (var i = 0; i < 4; i++) if (e[BASE + i] !== MAGIC[i]) return { base: e, ext: [] };
    var n = e[BASE + 4], ext = [];
    for (var k = 0; k < n; k++) {
      var p = BASE + 5 + k * 4;
      if (p + 3 >= e.length) break;
      var f = FIELDS[e[p]];
      if (f) ext.push({ field: f, rgb: [e[p + 1], e[p + 2], e[p + 3]] });
    }
    return { base: e.slice(0, BASE), ext: ext };
  }
  function register(pal, rgb) {
    if (!pal || pal.length < 100) return -1;
    var c = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
    for (var i = 100; i < pal.length; i++) {
      var q = pal[i];
      if (q && q.__miicHex && q[0] === c[0] && q[1] === c[1] && q[2] === c[2]) return i;
    }
    if (pal.length >= 255) return -1;
    Object.defineProperty(c, "__miicHex", { value: true });
    pal.push(c);
    return pal.length - 1;
  }
  function apply(t, ext, face, cloth) {
    if (!ext || !ext.length) return t;
    ext.forEach(function (x) { var i = register(palFor(x.field, face, cloth), x.rgb); if (i >= 0) t[x.field] = i; });
    return t;
  }
  function nearest(pal, c, field) {
    var best = 0, bd = Infinity;
    for (var i = 0; i < 100 && i < pal.length; i++) {
      if (i === 8 && (field === "eyeColor" || field === "eyeRColor")) continue; // 8 = "default eye colour"
      var p = pal[i], d = (p[0] - c[0]) * (p[0] - c[0]) * 0.3 + (p[1] - c[1]) * (p[1] - c[1]) * 0.59 + (p[2] - c[2]) * (p[2] - c[2]) * 0.11;
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }
  function fallback(r, face, cloth) {
    FIELDS.forEach(function (f) {
      var v = r[f], pal = palFor(f, face, cloth);
      if (typeof v === "number" && v >= 100 && pal && pal[v]) r[f] = nearest(pal, pal[v], f);
    });
    return r;
  }
  function pack(bytes, r, face, cloth) {
    var entries = [];
    FIELDS.forEach(function (f, id) {
      var v = r[f], pal = palFor(f, face, cloth);
      if (typeof v !== "number" || v < 100 || !pal || !pal[v]) return;
      var c = pal[v];
      entries.push([id, Math.round(c[0] * 255), Math.round(c[1] * 255), Math.round(c[2] * 255)]);
      bytes[OFF[f]] = nearest(pal, c, f);
    });
    if (!entries.length) return bytes;
    var out = new Uint8Array(BASE + 5 + entries.length * 4);
    out.set(bytes.subarray(0, BASE), 0);
    out.set(MAGIC, BASE);
    out[BASE + 4] = entries.length;
    entries.forEach(function (e, k) { out.set(e, BASE + 5 + k * 4); });
    return out;
  }
  return { split: split, apply: apply, pack: pack, fallback: fallback, FIELDS: FIELDS };
})();
