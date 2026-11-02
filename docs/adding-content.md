# Adding and changing things

Start the server with `node server.js --watch`. Every time you save a file in `src/`, `public/dist/main.js` is rebuilt; reload the page to see the change. Changes to files in `public/` (models, sounds, translations) only need a reload.

If something breaks, open the browser console. `main.js` contains `//#region src/<file>` markers, so a line in an error message is easy to trace back to its source file.

- [Change a shader's look](#change-a-shaders-look)
- [Add a new shader style](#add-a-new-shader-style)
- [Add a hat](#add-a-hat)
- [Add an accessory](#add-an-accessory)
- [Colours and palettes](#colours-and-palettes)
- [Add a language](#add-a-language)
- [Add a setting](#add-a-setting)
- [Editor tabs](#editor-tabs)
- [Music and sound effects](#music-and-sound-effects)
- [Custom face part textures and models](#custom-face-part-textures-and-models)

---

## Change a shader's look

Each shader style is a material class in `src/app/shaders/` with its GLSL in `src/shaders/`:

| Shader (Settings name) | id | Class | GLSL |
|---|---|---|---|
| Switch | `switch` | `SwitchShaderMaterial` (switch-shader.js) | `shaders/switch/` |
| Miitomo | `miitomo` | `MiitomoShaderMaterial` (miitomo-shader.js) | `shaders/miitomo/` |
| Wii U | `wiiu` | `WiiUShaderMaterial` (wiiu-shader.js) | `shaders/wiiu/` |
| Wii U (Bright) | `wiiu_ffliconwithbody` | `WiiUBrightShaderMaterial` (wiiu-variants.js) | uses Wii U |
| Tomodachi Life | `3ds_alt` | `TomodachiLifeShaderMaterial` (3ds-shaders.js) | `shaders/3ds/tomodachi-life.frag.glsl` |
| 3DS | `3ds` | `ThreeDSShaderMaterial` (3ds-shaders.js) | `shaders/3ds/` |
| Toon | `toon` | `ToonShaderMaterial` (toon-shader.js) | `shaders/toon/` |
| No Lighting | `lightDisabled` | `NoLightingShaderMaterial` (no-lighting-shader.js) | `shaders/no-lighting/` |
| Mii Channel, Wii Play, Simple+, Wii Room, Resort, Simple | `wii`, `wii_alt`, `wii_alt_2`, `wii_alt_4`, `wii_alt_5`, `wii_simple` | `WiiShaderMaterial` and its subclasses (wii-shaders.js) | `shaders/wii/` (MatCap) |

For a quick tweak, edit the `.glsl` file. Lighting values such as light directions and colours are set in each class's constructor; the Tomodachi Life lights, for example, are in `TomodachiLifeShaderMaterial`.

The Wii-family shaders differ mainly in which MatCap image they use (`getMatCapTexture(n)`). Those images are loaded by `loadMatCapTextures` in `src/app/assets/models.js`.

## Add a new shader style

The example below adds "My Shader" as a variant of the 3DS shader with its own fragment shader.

**1. GLSL.** Copy `src/shaders/3ds/3ds.frag.glsl` to `src/shaders/my-shader/my-shader.frag.glsl` and change it.

**2. Material class.** Create `src/app/shaders/my-shader.js`:

```js
// src/app/shaders/my-shader.js
// My Shader — shader id "my_shader". A 3DS-style shader with its own fragment shader.

class MyShaderMaterial extends ThreeDSShaderMaterial {
  constructor(params) {
    params.fragment = includeGLSL("my-shader/my-shader.frag.glsl");
    super(params);
  }
}
```

To start from a different style, extend that style's class instead, such as `ToonShaderMaterial` or `WiiShaderMaterial`. `TomodachiLifeShaderMaterial` shows how to also change the lights and lookup texture.

**3. Add it to the build.** In `src/manifest.json`, add an entry after `app/shaders/3ds-shaders.js` and before `app/shaders/shader-registry.js`:

```json
{ "file": "app/shaders/my-shader.js", "description": "My Shader — shader id \"my_shader\"." },
```

**4. Register the id** in `src/app/shaders/shader-registry.js`:

```js
function shaderUsesFFLParams(e = void 0) {
  switch (e || currentShaderType) {
    ...
    case "3ds_alt":
    case "my_shader":          // add: it takes the same parameters as the other custom shaders
    case "lightDisabled":
      return !0;
```

```js
function getShaderMaterialClass(e) {
  switch (e || currentShaderType) {
    ...
    case "3ds_alt":
      return TomodachiLifeShaderMaterial;
    case "my_shader":          // add
      return MyShaderMaterial;
```

In `getLightSetupForShader`, add `case "my_shader":` to the first group (the one that `return`s nothing). Custom shaders do their own lighting; only the built-in three.js materials need scene lights.

**5. Show it in the app.**
- `src/app/settings/settings.js`: add `{ label: () => translate("My Shader"), value: "my_shader" },` to the `choices` of `shaderTypeN` (editor and renders) and, if you like, of `shaderTypeIcon` (library icons).
- `src/app/setup/first-run.js`: add it to `getShaderOptions()` so it appears in the first-run setup.
- Optional: the "alternate default palette" checks list shader ids in `settings.js` (`alternateDefaultPalette` → `condition`) and in `settings-dialog.js` (`updatePaletteForShader`).

To find every place a shader id is used: `grep -rn '"3ds_alt"' src/app`.

## Add a hat

A hat is three things that share an index (`hatType`):

1. **Model:** a `.glb` inside `public/assets/models/hat_models_bundle.zip`.
2. **Entry:** one object in `src/data/hat-model-info.json`. Its `"file"` names the `.glb` in the zip.
3. **Name:** one line in `getHatNames()` in `src/app/items/item-lists.js`.

Steps:

1. Make your `.glb`. Use an existing hat from the zip as the reference for scale and origin. Mesh names matter, because textures are looked up by mesh name.
2. Add it to `hat_models_bundle.zip` under any name, for example `my_hat.glb`.
3. Add an entry at the **end** of `src/data/hat-model-info.json`. If you insert it in the middle, every later hat shifts by one and saved Miis show the wrong hat. The easiest way is to copy the entry of the existing hat most like yours and change `"file"`:

   ```json
   {
     "file": "my_hat.glb",
     "mdlType": 1,
     "texType": 2
   }
   ```

   - `mdlType`: how the hat sits and how hair is trimmed under it. `0`/`1`/`2`/`6` sit at the hat anchor; `1` and `2` hide more hair; `6` swaps in a short hairstyle; `5` sits on top of the head. See `createMiiModel` in `src/app/renderer/mii-model.js`.
   - `texType`: `1` or `2` (texture filtering); `texFiltering` / `texWrap` override the three.js filter and wrap constants.
   - `hatPos` (optional): per-hairstyle position fixes `{ t: [x,y,z], r: [degrees...], s: [scale...] }`, indexed by `hairType`.
4. Add the name at the end of `getHatNames()`.
5. Reload. The zip is cached in the browser, but it's fetched again when the file changes. The new hat appears last in the Hat tab, showing its name until an icon exists for it.

If a `"file"` isn't in the zip, the console says `[hats] … is not in the hat bundle`.

## Add an accessory

Accessories work the same way:

1. **Model:** `public/assets/models/acce_models_bundle.zip`.
2. **Entry:** `src/data/accessory-model-info.json`, where `"file"` names the `.glb`.
3. **Name:** `getAccessoryNames()` in `src/app/items/item-lists.js`.

Add new entries at the end. How each `mdlType` attaches to the body is handled in `createMiiModel` (`mii-model.js`) and in `MiiViewer` (`mii-viewer.js`).

Body models are in `public/assets/models/body_models_bundle.zip` (`miiBodyM_<style>.glb`, `miiBodyF_<style>.glb`). Outfit textures are in `public/assets/images/mii_clothes_textures_bundle.zip`. The outfit lists are in `src/app/items/item-lists.js` (`OUTFIT_CODES` in `src/data/outfit-codes.json`, `getOutfitNames`).

## Colours and palettes

All in `src/app/mii/colors.js`:

| Table | What |
|---|---|
| `COMMON_COLORS_HEX`, `COMMON_COLORS_RGB`, `COMMON_COLORS_SHADOW_HEX` | the 100 Switch "common" colours (hair, eyes, eyebrows, glasses, mouth...) |
| `COMMON_COLOR_DISPLAY_ORDER` (`src/app/ui/components.js`) | the order they're shown in the colour grid |
| `LEGACY_HAIR_COLOR_TO_COMMON`, `LEGACY_EYE_COLOR_TO_COMMON`, ... | which common colour each classic (3DS/Wii U) colour is |
| `COMMON_TO_LEGACY_HAIR_COLOR`, ... | the nearest classic colour for each common colour (used when saving to FFSD) |
| `SKIN_COLORS_HEX`, `SKIN_COLORS_RGB` | skin tones |
| `FAVORITE_COLORS_INT`, `FAVORITE_COLORS_RGB`, `FAVORITE_COLOR_GRADIENTS` | the 12 favourite colours |

The renderer's own copy of the common colours, used for drawing eyes, is `src/data/common-color-table.json`. Keep it in step with `COMMON_COLORS_RGB` if you change colours. Exact colours outside these palettes are stored per Mii by the hex-colour feature (`src/app/mii/hex-colors.js`).

## Add a language

1. Copy `public/dist/lang/es-ES.json` to `public/dist/lang/<code>.json`, for example `de-DE.json`. Each key is the English text and each value is its translation; English has no file, it's the keys themselves. The first entry (`""`) holds the language name and plural rule.
2. In `src/app/settings/settings.js`, add `{ label: () => translate("Deutsch"), value: "de-DE" },` to the `choices` of `languageN`.

Text in the code is translated with `translate("...")` (gettext). New strings show in English until a language file has them.

## Add a setting

Settings are defined in `SETTINGS_SECTIONS` (`src/app/settings/settings.js`). The Settings dialog is built from it automatically. Each item:

```js
myFeature: {
  type: 0,                                   // 0 toggle, 1 choice list, 2 buttons, 3 number slider (min/max), 4 heading
  label: () => translate("My feature"),
  description: () => translate("What it does."),
  default: !1,
  // type 1: choices: [{ label: () => translate("A"), value: "a" }, ...]
  // optional: condition(settings) { return settings.shaderTypeN === "toon"; }   // only show sometimes
},
```

Read it anywhere with `await getSetting("myFeature")`; it's stored as `settings_myFeature`. For things that must react right away when changed, look at how `applySettings` (`settings-dialog.js`) handles the existing ones.

## Editor tabs

The tab bar is built in `MiiEditor` (`src/app/editor/editor.js`, search for `createTabList([`):

```js
{ icon: SVG_ICONS.hair, select: t(TAB_HAIR, hairTab, 0) },
```

Each tab is a function in `src/app/editor/tabs/` that receives `{ container, mii, callback, icons, editor, ... }` and fills `container`. Usually it calls `createFeatureSet({...})`: a list of sections whose items set a field on the Mii (see `noseTab` in `nose-tab.js` for a short one). Tab ids are in `src/app/editor/tab-ids.js`, and icons are in `SVG_ICONS` (`src/app/ui/icons.js`).

To add a tab, write the function in a new file and add it to `src/manifest.json` before `app/editor/editor.js`. Then add a tab id and an entry in the `createTabList` array.

## Music and sound effects

- **Background music:** `MusicPlayer` (`src/app/audio/music.js`) picks songs from `public/assets/audio/` by theme. See `updateTheme`.
- **Sound effects:** `SoundEffects` (`src/app/audio/sound-effects.js`) loads one zip per theme (`miiMakerSwitch2.zip`, `miiMakerWii.zip`, ...) from `public/assets/audio/`.

Replace a file with your own under the same name, or add a theme case in those files.

## Custom face part textures and models

`main.js` has hidden switches that load replacement part assets from `public/`. For example, `useCustomEyes` loads `assets/images/eye2.png`, and `useCustomHair` loads `assets/models/hair.glb`. The full list is in `lib/debug-flags.js`.

A switch turns on by itself when its files exist in `public/`. To keep one off, set it to `false` in `config/debug-flags.json`. Both `server.js` and the GitHub Pages build apply them.
