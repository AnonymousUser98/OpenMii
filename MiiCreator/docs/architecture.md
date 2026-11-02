# How Mii Creator fits together

## The build model

`src/manifest.json` lists every source file. `tools/build.js` joins them, in that order, into one ES module: `public/dist/main.js`. That file is what `public/app/index.html` loads.

**One shared scope.** The files aren't separate modules; together they form one big file. So:

- a top-level `function`, `class` or `var` in any file can be used by name in any other file;
- **order matters for code that runs at load time.** If a file calls something or uses a class right away (`class A extends B`, `var x = makeThing()`), it must come after the file that defines it. Code inside functions runs later, so it can use names from anywhere.
- **don't reuse a top-level name** that already exists in another file. Search first: `grep -rn "function myName\|var myName\|class myName" src/`.

**File headers.** Every app file starts with a header listing what it defines and which other files it uses:

```js
// src/app/shaders/3ds-shaders.js
// 3DS and Tomodachi Life shaders — shader ids "3ds" and "3ds_alt".
//
// Defines: THREE_DS_VERTEX_SHADER, ..., ThreeDSShaderMaterial, TomodachiLifeShaderMaterial
// Uses from other files:
//   app/shaders/shader-registry.js: Cx, applyHairTipSettings
```

The headers were generated when the code was split, so they don't update by themselves. Treat them as a map, and search the code when in doubt.

**Includes.** `includeGLSL("toon/toon.frag.glsl")` becomes the text of `src/shaders/toon/toon.frag.glsl`. `includeJSON("hat-model-info.json")` becomes the contents of `src/data/hat-model-info.json`. The build does this, so the joined file contains plain strings and objects.

**Names you'll see everywhere.** These five shared aliases come from the bundler:

| Name | What it is |
|---|---|
| `THREE` | the three.js namespace (`new THREE.Mesh(...)`) |
| `translate` | the gettext function: `translate("Hat")` returns the text in the user's language |
| `localforage` | `localforage.default.getItem(...)` / `setItem(...)` — settings and caches |
| `JSZip` | `JSZip.default.loadAsync(...)` |
| `structFu` | binary struct definitions for Mii formats |

Classes ending in `_2` (`Vector3_2`, `ShaderMaterial_2`, `Color_2`, ...) come from a second, partial copy of three.js. A dependency bundled it, and the custom shaders build on it. They behave like the normal three.js classes.

## Startup

`public/app/index.html` loads `dist/main.js`. The last lines of the bundle (`src/app/main.js`) call `main()`, which:

1. applies saved settings: theme, sound, palette (`applySettings`, `src/app/settings/settings-dialog.js`);
2. runs the first-run setup if needed (`src/app/setup/first-run.js`);
3. starts loading the FFL resource file in the background (`loadFFLResources`, `src/app/renderer/ffl-resources.js`). This is `public/FFLResHigh.dat`, `FFLResMiddle.dat` or `FFLResLow.dat`, holding every face part, texture and shape;
4. opens the library (`openLibrary`, `src/app/library/library.js`), or goes straight to the editor when the URL asks for it.

The home page (`public/index.html`) is a separate small site: `public/assets/router.js` loads pages from `public/assets/hx/`.

## Data: the Mii

`Mii` (`src/app/mii/mii.js`) is the central class. It has every editable field (`hairType`, `eyeColor`, `hatType`, ...) and converts between formats:

| Format | Where |
|---|---|
| `.miic` — Mii Creator's own format, with hats, outfits, accessories and extended colours | `src/app/mii/formats/ffsd-miic.js` (`MIIC_STRUCT`) |
| FFSD — 3DS / Wii U | `src/app/mii/formats/ffsd-miic.js` (`FFSD_STRUCT`) |
| Switch CharInfo, Mii Studio data | `src/app/mii/formats/charinfo.js`, `studio-and-nx.js` |
| Exact hex colours (the "MCX1" block) | `src/app/mii/hex-colors.js` |
| Tomodachi Life QR / Mii QR codes | `src/app/mii/formats/ffsd-miic.js`, `src/app/qr/mii-qr.js` |

Field limits used for validation are in `MII_FIELD_LIMITS` (ffsd-miic.js). Colour palettes are in `src/app/mii/colors.js`.

## Storage

- **Settings:** `localforage` keys `settings_<name>`, read with `getSetting(name)` and written with `setSetting(name, value)` (`src/app/settings/settings.js`).
- **The library:** `fetch("/api/library")` and the other `/api/*` endpoints, called from `libraryApiRequest` (`src/app/library/library.js`). Locally, `server.js` answers them using `lib/api-core.js` and saves to `data/db.json`. On GitHub Pages, `tools/build-static.js` puts the same `lib/api-core.js` into the page and saves to the browser's `localStorage`.
- **Caches:** model zip bundles and icons are cached in IndexedDB through localforage. A bundle is fetched again when its ETag changes, so a new zip is picked up by itself.

## Rendering a Mii

1. **Head.** `CharModel` (`src/app/renderer/ffl/char-model.js`) builds the head from the Mii's CharInfo. It uses `FFLFaceBuilder` (`face-builder.js`), which reads parts from the FFL resource file through `FFLResourceReader` (`resource-reader.js`), creates the meshes and draws the face mask textures (eyes, mouth, makeup...).
2. **Whole Mii.** `createMiiModel` (`src/app/renderer/mii-model.js`) adds the body, then the hat, accessory and outfit. These are loaded from zip bundles in `public/assets/` by `src/app/assets/models.js`. Height and build go through `BoneScaler`.
3. **Shader.** Every mesh gets the material class of the current shader: `applyShaderMaterial` → `getShaderMaterialClass(shaderId)` (`src/app/shaders/shader-registry.js`). Each style lives in its own file in `src/app/shaders/`, with its GLSL in `src/shaders/`.
4. **Display.** `MiiViewer` (`src/app/renderer/mii-viewer.js`) is the live 3D view in the editor (camera, animations, blinking). `MiiRenderScene` and `renderMiiIcon` produce still images: library icons, renders, cards.

## Screens

| Screen | File |
|---|---|
| Library | `src/app/library/library.js` (`openLibrary`) |
| Editor | `src/app/editor/editor.js` (`MiiEditor`), one file per tab in `src/app/editor/tabs/` |
| Settings | `src/app/settings/settings-dialog.js` (`openSettingsDialog`), definitions in `settings.js` |
| First-run setup | `src/app/setup/first-run.js` |
| Dialogs (create, export, render, share, QR) | `src/app/dialogs/`, `src/app/render/custom-render.js`, `src/app/export/model-export.js` |

UI is built with `Html` (`src/app/ui/html.js`), a small chainable DOM helper:

```js
new Html("button").class("primary").text(translate("Save")).on("click", save).appendTo(container);
```

Modals use `Modal.modal/alert/prompt/input` (`src/app/ui/modal.js`). Item grids in the editor use `createFeatureSet` (`src/app/ui/components.js`).
