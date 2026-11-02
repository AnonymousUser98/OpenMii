// src/app/renderer/three-module.js
// Gets the THREE namespace used by the renderer (getTHREE()).
//
// Defines: THREE_MODULE, getTHREE

var THREE_MODULE;
if (globalThis.THREE) THREE_MODULE = globalThis.THREE;
else THREE_MODULE = (await import(new URL(import.meta.url).origin + "/dist/three.js")).default;
var getTHREE = () => THREE_MODULE;
