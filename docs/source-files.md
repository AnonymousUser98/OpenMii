# Source files

Every file in `src/`, grouped by folder. The build order is set by `src/manifest.json`; this page is generated from it.

## src/app/about

| File | Lines | What it is |
|---|---|---|
| [`app/about/third-party-notices.js`](../src/app/about/third-party-notices.js) | 1999 | Licence notices for every bundled library (shown in the app). |
| [`app/about/credits.js`](../src/app/about/credits.js) | 136 | Credits text. |

## src/app/assets

| File | Lines | What it is |
|---|---|---|
| [`app/assets/models.js`](../src/app/assets/models.js) | 631 | Model bundles (body/hat/accessory zips), GLTF loading, texture and MatCap caches. |

## src/app/audio

| File | Lines | What it is |
|---|---|---|
| [`app/audio/music.js`](../src/app/audio/music.js) | 219 | Background music player. |
| [`app/audio/sound-effects.js`](../src/app/audio/sound-effects.js) | 138 | UI sound effects (hover/select/press) and sound pack loading. |

## src/app/config

| File | Lines | What it is |
|---|---|---|
| [`app/config.js`](../src/app/config.js) | 21 | APP_CONFIG: version, FFL resource files, external APIs. |

## src/app/dialogs

| File | Lines | What it is |
|---|---|---|
| [`app/dialogs/look-alike.js`](../src/app/dialogs/look-alike.js) | 328 | Look-alike picker and NNID lookup. |
| [`app/dialogs/save-and-scan.js`](../src/app/dialogs/save-and-scan.js) | 229 | "Save this Mii?" prompt, QR scanner dialog, random NNID Mii. |
| [`app/dialogs/create-mii.js`](../src/app/dialogs/create-mii.js) | 200 | "Create Mii" dialog (blank, random, look-alike, QR, NNID...). |
| [`app/dialogs/export.js`](../src/app/dialogs/export.js) | 904 | Export dialog: .miic/FFSD/QR/studio formats, render-image export. |
| [`app/dialogs/mii-card.js`](../src/app/dialogs/mii-card.js) | 1394 | Mii info card and reference sheet images, share dialog. |
| [`app/dialogs/render-and-save.js`](../src/app/dialogs/render-and-save.js) | 493 | Render menu and the editor's save handler. |

## src/app/editor

| File | Lines | What it is |
|---|---|---|
| [`app/editor/tabs/hat-tab.js`](../src/app/editor/tabs/hat-tab.js) | 158 | Editor tab: Hat. |
| [`app/editor/tabs/eyes-tab.js`](../src/app/editor/tabs/eyes-tab.js) | 231 | Editor tab: Eyes. |
| [`app/editor/tabs/eyebrows-tab.js`](../src/app/editor/tabs/eyebrows-tab.js) | 137 | Editor tab: Eyebrows. |
| [`app/editor/tabs/beard-tab.js`](../src/app/editor/tabs/beard-tab.js) | 101 | Editor tab: Beard & mustache. |
| [`app/editor/tabs/glasses-tab.js`](../src/app/editor/tabs/glasses-tab.js) | 95 | Editor tab: Glasses. |
| [`app/editor/tabs/hair-tab.js`](../src/app/editor/tabs/hair-tab.js) | 114 | Editor tab: Hair. |
| [`app/editor/tabs/face-tab.js`](../src/app/editor/tabs/face-tab.js) | 144 | Editor tab: Face (shape, makeup, wrinkles, face paint). |
| [`app/editor/widgets.js`](../src/app/editor/widgets.js) | 162 | Editor widgets: validated inputs, item lists, popup menus. |
| [`app/editor/tabs/profile-tab.js`](../src/app/editor/tabs/profile-tab.js) | 222 | Editor tab: Profile (name, favourite colour, birthday...). |
| [`app/editor/tabs/mole-tab.js`](../src/app/editor/tabs/mole-tab.js) | 72 | Editor tab: Mole. |
| [`app/editor/tabs/mouth-tab.js`](../src/app/editor/tabs/mouth-tab.js) | 145 | Editor tab: Mouth. |
| [`app/editor/tabs/nose-tab.js`](../src/app/editor/tabs/nose-tab.js) | 68 | Editor tab: Nose. |
| [`app/editor/ffsd-warning.js`](../src/app/editor/ffsd-warning.js) | 24 | Warning shown before converting a Mii with extended features to FFSD. |
| [`app/editor/tabs/scale-tab.js`](../src/app/editor/tabs/scale-tab.js) | 158 | Editor tab: Scale (height, build) and compare mode. |
| [`app/editor/tabs/accessory-tab.js`](../src/app/editor/tabs/accessory-tab.js) | 278 | Editor tab: Accessory. |
| [`app/editor/tabs/outfit-tab.js`](../src/app/editor/tabs/outfit-tab.js) | 285 | Editor tab: Outfit. |
| [`app/editor/tab-ids.js`](../src/app/editor/tab-ids.js) | 36 | Editor tab ids (TAB_FACE, TAB_HAIR, ...) and editor state. |
| [`app/editor/editor.js`](../src/app/editor/editor.js) | 588 | MiiEditor: the editor screen. |

## src/app/export

| File | Lines | What it is |
|---|---|---|
| [`app/export/model-export-utils.js`](../src/app/export/model-export-utils.js) | 162 | Helpers for 3D model export (attributes, expressions, textures). |
| [`app/export/model-export.js`](../src/app/export/model-export.js) | 1294 | 3D model export dialog and exporter. |

## src/app/i18n

| File | Lines | What it is |
|---|---|---|
| [`app/i18n/localization.js`](../src/app/i18n/localization.js) | 20 | Translation setup: i18n instance, getTranslator(), loadLanguage(). |

## src/app/items

| File | Lines | What it is |
|---|---|---|
| [`app/items/accessory-model-info.js`](../src/app/items/accessory-model-info.js) | 7 | Model/texture type for each accessory (index = acceType). |
| [`app/items/item-lists.js`](../src/app/items/item-lists.js) | 842 | Names and model info for accessories, hats and outfits. |

## src/app/library

| File | Lines | What it is |
|---|---|---|
| [`app/library/icon-cache.js`](../src/app/library/icon-cache.js) | 51 | IconCache: cached library icons. |
| [`app/library/selection-menu.js`](../src/app/library/selection-menu.js) | 176 | Library multi-select actions and new-Mii style picker. |
| [`app/library/library.js`](../src/app/library/library.js) | 1122 | The library screen: icons, /api/library requests, Mii pickers, Personal Mii. |

## src/app/main

| File | Lines | What it is |
|---|---|---|
| [`app/main.js`](../src/app/main.js) | 338 | Entry point: main() starts the app. |

## src/app/mii

| File | Lines | What it is |
|---|---|---|
| [`app/mii/hex-colors.js`](../src/app/mii/hex-colors.js) | 75 | Exact hex colours: the .miic "MCX1" block that stores colours outside the standard palettes. |
| [`app/mii/colors.js`](../src/app/mii/colors.js) | 447 | Colour palettes (hair, eye, skin, favourite colours...) and index tables. |
| [`app/mii/formats/ffsd-miic.js`](../src/app/mii/formats/ffsd-miic.js) | 625 | FFSD (3DS/Wii U) and .miic formats: structs, conversion, validation limits. |
| [`app/mii/modulate-type.js`](../src/app/mii/modulate-type.js) | 27 | ModulateType: which face/head part a mesh or texture is. |
| [`app/mii/formats/charinfo.js`](../src/app/mii/formats/charinfo.js) | 199 | Switch CharInfo conversion and Wii feature limits. |
| [`app/mii/formats/studio-and-nx.js`](../src/app/mii/formats/studio-and-nx.js) | 234 | Mii Studio data and Switch CharInfo structs. |
| [`app/mii/mii.js`](../src/app/mii/mii.js) | 562 | Mii: the main Mii data class (every editable field, import/export to all formats). |
| [`app/mii/random-mii.js`](../src/app/mii/random-mii.js) | 886 | Random Mii generator (FFLiDatabaseRandom). |

## src/app/qr

| File | Lines | What it is |
|---|---|---|
| [`app/qr/mii-qr.js`](../src/app/qr/mii-qr.js) | 484 | Mii QR code encryption/decryption and camera scanning. |

## src/app/render

| File | Lines | What it is |
|---|---|---|
| [`app/render/custom-render.js`](../src/app/render/custom-render.js) | 1363 | Expressions list and the Custom Render dialog. |

## src/app/renderer

| File | Lines | What it is |
|---|---|---|
| [`app/renderer/three-module.js`](../src/app/renderer/three-module.js) | 10 | Gets the THREE namespace used by the renderer (getTHREE()). |
| [`app/renderer/ffl/expression-table.js`](../src/app/renderer/ffl/expression-table.js) | 7 | Per-expression eye/mouth/eyebrow adjustments. |
| [`app/renderer/dispose.js`](../src/app/renderer/dispose.js) | 153 | ResourceTracker and helpers that free GPU memory. |
| [`app/renderer/ffl/part-colors.js`](../src/app/renderer/ffl/part-colors.js) | 142 | Default colours per part, ColorRGBA. |
| [`app/renderer/ffl/char-model.js`](../src/app/renderer/ffl/char-model.js) | 819 | CharModel: builds a Mii head (meshes + mask/faceline textures) from CharInfo. |
| [`app/renderer/ffl/resource-reader.js`](../src/app/renderer/ffl/resource-reader.js) | 178 | FFLResourceReader: reads FFLResHigh/Middle/Low.dat (parts, textures, shapes). |
| [`app/renderer/ffl/face-builder.js`](../src/app/renderer/ffl/face-builder.js) | 1114 | FFLFaceBuilder: creates part meshes and draws the face mask textures. |
| [`app/renderer/cameras.js`](../src/app/renderer/cameras.js) | 152 | View types, cameras and render-target helpers. |
| [`app/renderer/texture-compositing.js`](../src/app/renderer/texture-compositing.js) | 375 | Texture compositing (hat/accessory/outfit textures) and accessory attachment. |
| [`app/renderer/bone-scaler.js`](../src/app/renderer/bone-scaler.js) | 204 | BoneScaler: applies height/build to the body skeleton. |
| [`app/renderer/outfits.js`](../src/app/renderer/outfits.js) | 239 | Outfit textures and materials. |
| [`app/renderer/mii-model.js`](../src/app/renderer/mii-model.js) | 708 | createMiiModel(): builds the full 3D Mii (head + body + hat + accessory). |
| [`app/renderer/ffl-resources.js`](../src/app/renderer/ffl-resources.js) | 71 | Loads the FFL resource file and creates the FFL module. |
| [`app/renderer/animation-controller.js`](../src/app/renderer/animation-controller.js) | 36 | AnimationController: plays body animations. |
| [`app/renderer/render-scene.js`](../src/app/renderer/render-scene.js) | 252 | MiiRenderScene: offscreen scenes for renders and icons. |
| [`app/renderer/mii-viewer.js`](../src/app/renderer/mii-viewer.js) | 1359 | MiiViewer: the live 3D view in the editor (camera, animation, body). |

## src/app/settings

| File | Lines | What it is |
|---|---|---|
| [`app/settings/palette-flags.js`](../src/app/settings/palette-flags.js) | 17 | Runtime flags for the alternate default palette. |
| [`app/settings/settings.js`](../src/app/settings/settings.js) | 794 | SETTINGS_SECTIONS (everything in Settings), getSetting(), setSetting(). |
| [`app/settings/settings-dialog.js`](../src/app/settings/settings-dialog.js) | 432 | The Settings dialog. |

## src/app/setup

| File | Lines | What it is |
|---|---|---|
| [`app/setup/first-run.js`](../src/app/setup/first-run.js) | 617 | First-run setup (theme, colour, shader, Personal Mii). |

## src/app/shaders

| File | Lines | What it is |
|---|---|---|
| [`app/shaders/wiiu-shader.js`](../src/app/shaders/wiiu-shader.js) | 270 | Wii U shader (FFL SampleShader) — shader id "wiiu". |
| [`app/shaders/miitomo-shader.js`](../src/app/shaders/miitomo-shader.js) | 380 | Miitomo shader — shader id "miitomo". |
| [`app/shaders/switch-shader-params.js`](../src/app/shaders/switch-shader-params.js) | 2905 | Switch shader material parameters per part. |
| [`app/shaders/switch-shader.js`](../src/app/shaders/switch-shader.js) | 409 | Switch shader — shader id "switch". |
| [`app/shaders/wiiu-variants.js`](../src/app/shaders/wiiu-variants.js) | 40 | Wii U variants — "wiiu_blinn" and "wiiu_ffliconwithbody" (Wii U (Bright)). |
| [`app/shaders/wii-shaders.js`](../src/app/shaders/wii-shaders.js) | 230 | MatCap shaders: Mii Channel, Wii Play, Simple+, Wii Room, Resort, Simple. |
| [`app/shaders/toon-shader.js`](../src/app/shaders/toon-shader.js) | 157 | Toon shader — shader id "toon". |
| [`app/shaders/no-lighting-shader.js`](../src/app/shaders/no-lighting-shader.js) | 135 | No Lighting shader — shader id "lightDisabled". |
| [`app/shaders/3ds-shaders.js`](../src/app/shaders/3ds-shaders.js) | 271 | 3DS and Tomodachi Life shaders — shader ids "3ds" and "3ds_alt". |
| [`app/shaders/shader-registry.js`](../src/app/shaders/shader-registry.js) | 252 | Shader registry: shader id -> material class, lighting setup, material conversion. |

## src/app/ui

| File | Lines | What it is |
|---|---|---|
| [`app/ui/html.js`](../src/app/ui/html.js) | 144 | Html: the tiny DOM helper every UI file uses (new Html("div").class(...).text(...)). |
| [`app/ui/birthday-input.js`](../src/app/ui/birthday-input.js) | 82 | Birthday picker widget. |
| [`app/ui/icons.js`](../src/app/ui/icons.js) | 275 | SVG icons used across the UI. |
| [`app/ui/components.js`](../src/app/ui/components.js) | 442 | Shared UI building blocks: tab lists, feature sets (item grids), separators. |
| [`app/ui/modal.js`](../src/app/ui/modal.js) | 228 | Modal dialogs: Modal.modal(), Modal.alert(), Modal.prompt(), Modal.input(). |
| [`app/ui/notify.js`](../src/app/ui/notify.js) | 33 | Notify: toast notifications. |

## src/app/util

| File | Lines | What it is |
|---|---|---|
| [`app/util/random.js`](../src/app/util/random.js) | 25 | range(), randomInt() and random byte helpers. |
| [`app/util/colors-and-bytes.js`](../src/app/util/colors-and-bytes.js) | 115 | Colour maths (RGB/HSL) and byte/base64/hex helpers. |
| [`app/util/platform.js`](../src/app/util/platform.js) | 12 | Platform flags. |
| [`app/util/download.js`](../src/app/util/download.js) | 55 | Downloads and clipboard helpers. |
| [`app/util/image.js`](../src/app/util/image.js) | 75 | Image helpers (scratch canvas, trimming). |

## Third-party (src/vendor/)

| File | Lines | What it is |
|---|---|---|
| [`vendor/bundler-runtime.js`](../src/vendor/bundler-runtime.js) | 49 | Small helpers the bundler (Bun) adds for CommonJS interop and lazy modules. |
| [`vendor/localforage.js`](../src/vendor/localforage.js) | 1978 | localForage: IndexedDB/localStorage wrapper used for settings and caches. |
| [`vendor/jszip.js`](../src/vendor/jszip.js) | 5572 | JSZip: reads the zipped model/sound bundles. |
| [`vendor/struct-fu.js`](../src/vendor/struct-fu.js) | 526 | struct-fu: binary struct definitions for Mii data formats. |
| [`vendor/ndarray.js`](../src/vendor/ndarray.js) | 435 | ndarray + is-buffer (dependencies of the texture tools). |
| [`vendor/texture-formats.js`](../src/vendor/texture-formats.js) | 583 | Texture pixel-format conversion helpers. |
| [`vendor/umd-helpers.js`](../src/vendor/umd-helpers.js) | 632 | Small UMD library bundled by a dependency. |
| [`vendor/dom-to-image-more.js`](../src/vendor/dom-to-image-more.js) | 1687 | dom-to-image-more: renders DOM elements to images (cards, reference sheets). |
| [`vendor/gettext.js`](../src/vendor/gettext.js) | 168 | gettext.js: translation engine. |
| [`vendor/three/three.module.js`](../src/vendor/three/three.module.js) | 30571 | three.js (r173) core, bundled. Exported names are restored (Vector3, Mesh, WebGLRenderer, ...). |
| [`vendor/three/addons/GLTFExporter.js`](../src/vendor/three/addons/GLTFExporter.js) | 1411 | three.js GLTFExporter (3D model export). |
| [`vendor/ktx-parse.js`](../src/vendor/ktx-parse.js) | 267 | ktx-parse: KTX2 container reader. |
| [`vendor/three/addons/GLTFLoader.js`](../src/vendor/three/addons/GLTFLoader.js) | 2019 | three.js GLTFLoader (loads every .glb model). |
| [`vendor/three/addons/KTX2Loader.js`](../src/vendor/three/addons/KTX2Loader.js) | 674 | three.js KTX2Loader + Basis/Zstd workers (compressed textures). |
| [`vendor/meshopt-decoder.js`](../src/vendor/meshopt-decoder.js) | 135 | meshoptimizer decoder (compressed glTF meshes). |
| [`vendor/three-copy/math-and-color.js`](../src/vendor/three-copy/math-and-color.js) | 1110 | A second, partial copy of three.js maths (Matrix3, Color, ColorManagement) pulled in by the renderer. |
| [`vendor/three-copy/materials.js`](../src/vendor/three-copy/materials.js) | 2013 | A second, partial copy of three.js (Material, ShaderMaterial, vectors, Texture) used as the base of the custom shaders. |
| [`vendor/marked.js`](../src/vendor/marked.js) | 2315 | marked: Markdown renderer (credits, notices). |
| [`vendor/sortablejs.js`](../src/vendor/sortablejs.js) | 1920 | SortableJS: drag-to-rearrange in the library. |
| [`vendor/gltf-transform.js`](../src/vendor/gltf-transform.js) | 7599 | glTF-Transform (+ gl-matrix parts): optimises exported 3D models. |
| [`vendor/three-copy/box3-render-target.js`](../src/vendor/three-copy/box3-render-target.js) | 376 | Part of the second three.js copy (Box3, RenderTarget). |
| [`vendor/camera-controls.js`](../src/vendor/camera-controls.js) | 1766 | camera-controls by yomotsu (editor camera). |
| [`vendor/three-copy/object3d.js`](../src/vendor/three-copy/object3d.js) | 1351 | Part of the second three.js copy (Matrix4, Euler, Object3D, Scene). |
| [`vendor/mediabunny.js`](../src/vendor/mediabunny.js) | 7943 | Mediabunny: video/GIF encoding for animated renders. |
| [`vendor/gif-encoder.js`](../src/vendor/gif-encoder.js) | 138 | WebAssembly GIF encoder glue. |
| [`vendor/gl-matrix-mat4.js`](../src/vendor/gl-matrix-mat4.js) | 170 | gl-matrix mat4 helpers. |
| [`vendor/sjcl.js`](../src/vendor/sjcl.js) | 1290 | SJCL: crypto used for Mii QR codes. |
| [`vendor/zxing.js`](../src/vendor/zxing.js) | 23906 | ZXing: QR code reading/writing. |
| [`vendor/swiper.js`](../src/vendor/swiper.js) | 3637 | Swiper: carousels in setup and pickers. |

## Shaders (src/shaders/)

Pasted into the code with `includeGLSL("<path>")`.

- [`3ds/3ds.frag.glsl`](../src/shaders/3ds/3ds.frag.glsl)
- [`3ds/3ds.vert.glsl`](../src/shaders/3ds/3ds.vert.glsl)
- [`3ds/tomodachi-life.frag.glsl`](../src/shaders/3ds/tomodachi-life.frag.glsl)
- [`miitomo/miitomo.frag.glsl`](../src/shaders/miitomo/miitomo.frag.glsl)
- [`miitomo/miitomo.vert.glsl`](../src/shaders/miitomo/miitomo.vert.glsl)
- [`no-lighting/no-lighting.frag.glsl`](../src/shaders/no-lighting/no-lighting.frag.glsl)
- [`no-lighting/no-lighting.vert.glsl`](../src/shaders/no-lighting/no-lighting.vert.glsl)
- [`switch/switch.frag.glsl`](../src/shaders/switch/switch.frag.glsl)
- [`switch/switch.vert.glsl`](../src/shaders/switch/switch.vert.glsl)
- [`textures/background-fill.frag.glsl`](../src/shaders/textures/background-fill.frag.glsl)
- [`textures/rgb-layered-overlay.frag.glsl`](../src/shaders/textures/rgb-layered-overlay.frag.glsl)
- [`textures/rgb-layered.frag.glsl`](../src/shaders/textures/rgb-layered.frag.glsl)
- [`toon/toon.frag.glsl`](../src/shaders/toon/toon.frag.glsl)
- [`toon/toon.vert.glsl`](../src/shaders/toon/toon.vert.glsl)
- [`wii/matcap.frag.glsl`](../src/shaders/wii/matcap.frag.glsl)
- [`wii/matcap.vert.glsl`](../src/shaders/wii/matcap.vert.glsl)
- [`wiiu/wiiu.frag.glsl`](../src/shaders/wiiu/wiiu.frag.glsl)
- [`wiiu/wiiu.vert.glsl`](../src/shaders/wiiu/wiiu.vert.glsl)

## Data (src/data/)

Pasted into the code with `includeJSON("<file>")`.

- [`accessory-model-info.json`](../src/data/accessory-model-info.json)
- [`common-color-table.json`](../src/data/common-color-table.json)
- [`ffl-expression-table.json`](../src/data/ffl-expression-table.json)
- [`hat-model-info.json`](../src/data/hat-model-info.json)
- [`outfit-codes.json`](../src/data/outfit-codes.json)
- [`random-faceline-types.json`](../src/data/random-faceline-types.json)
