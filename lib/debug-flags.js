/*
 * Hidden main.js switches ("debug properties") that make the app load custom part assets.
 * Each one is turned on only when its files exist in public/ (otherwise that part would fail to
 * render) and it isn't set to false in config/debug-flags.json. Used by server.js and
 * tools/build-static.js, which put them into every HTML page as window.<flag> = true.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// flag -> files it makes main.js load
const FLAG_ASSETS = {
  useCustomEyes: ["assets/images/eye2.png"],
  useCustomEyebrows: ["assets/images/eyebrow2.png"],
  useCustomMouth: ["assets/images/mouth2.png"],
  useCustomMustache: ["assets/images/mustache2.png"],
  useCustomGlasses: ["assets/images/glass2.png"],
  useCustom3DGlasses: ["assets/models/glass_1.glb"],
  useCustomHair: ["assets/models/hair.glb"],
  useCustomNose: ["assets/models/nose.glb"],
  useCustomFaceline: ["assets/models/face.glb"],
  useCustomFaceMake: ["assets/images/faceMake2.png"],
  useCustomFaceWrinkle: ["assets/images/faceWrinkle2.png"],
  eyeScleraHack: [],
};

function enabledFlags(publicDir = path.join(ROOT, "public"), configFile = path.join(ROOT, "config/debug-flags.json")) {
  let config = {};
  try { config = JSON.parse(fs.readFileSync(configFile, "utf8")); } catch {}
  return Object.keys(FLAG_ASSETS).filter((flag) => config[flag] !== false && FLAG_ASSETS[flag].every((f) => fs.existsSync(path.join(publicDir, f))));
}

// Adds <script> tags right after <head>.
function injectIntoHead(html, scripts) {
  const tags = scripts.map((s) => `<script>${s.replace(/<\/script/gi, "<\\/script")}</script>`).join("");
  return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + tags) : tags + html;
}

function flagScript(flags) {
  return flags.length ? `/* debug properties (config/debug-flags.json) */${flags.map((f) => `window.${f}=true;`).join("")}` : null;
}

module.exports = { FLAG_ASSETS, enabledFlags, injectIntoHead, flagScript };
