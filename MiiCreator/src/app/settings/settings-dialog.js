// src/app/settings/settings-dialog.js
// The Settings dialog.
//
// Defines: HE, updatePaletteForShader, applySettings, settingsCache, SETTINGS_KEY_PREFIX,
//          loadMissingSettings, loadAllSettings, UE, openSettingsDialog
// Uses from other files:
//   app/i18n/localization.js: i18n, getTranslator, loadLanguage
//   app/settings/settings.js: SETTINGS_SECTIONS, getSetting, setSetting
//   app/audio/sound-effects.js: getSoundEffects, playSound
//   app/settings/palette-flags.js: setAlternatePaletteEnabled, setAlternatePaletteSetting
//   app/ui/components.js: addButtonSounds, createTabList
//   app/ui/modal.js: closeModal, Modal
//   app/shaders/shader-registry.js: wx, nB
//   app/library/library.js: getRefreshLibrary, openLibrary
//   app/ui/html.js: Html
//   app/audio/music.js: getMusicPlayer
//   app/assets/models.js: jp
//   app/config.js: APP_CONFIG
//   … and 1 more files

var translate = getTranslator(),
  jD = !1,
  HE = !1,
  updatePaletteForShader = async (e) => {
    let t = await localforage.default.getItem("settings_alternateDefaultPalette");
    if (
      (setAlternatePaletteSetting(Boolean(t)),
      t === !0 &&
        (e === "lightDisabled" ||
          e === "wii" ||
          e === "wii_alt" ||
          e === "wii_alt_2" ||
          e === "wii_alt_3" ||
          e === "wii_alt_4" ||
          e === "wii_alt_5" ||
          e === "wii_simple" ||
          e === "three_toon"))
    )
      setAlternatePaletteEnabled(!0);
    else setAlternatePaletteEnabled(!1);
  },
  applySettings = async (e = !1) => {
    (await loadMissingSettings(), wx(), nB());
    let t = await localforage.default.getItem("settings_bgm");
    if (t === !0) getMusicPlayer().unmute();
    else if (t === !1) getMusicPlayer().mute();
    let r = await localforage.default.getItem("settings_sfx");
    if (r === !0) getSoundEffects().unmute();
    else if (r === !1) getSoundEffects().mute();
    function n(g, m) {
      for (let A of m) {
        let y = g.find((x) => x.toLowerCase() === A.toLowerCase());
        if (y) return y;
      }
      for (let A of m)
        try {
          let y = new Intl.Locale(A).language,
            x = g.find((b) => new Intl.Locale(b).language === y);
          if (x) return x;
        } catch {}
      return;
    }
    let i = await localforage.default.getItem("settings_languageN");
    if (!i) {
      let m =
          SETTINGS_SECTIONS
            .flatMap((x) => Object.entries(x.items))
            .find(([x]) => x === "languageN")?.[1]
            ?.choices?.map((x) => x.value) ?? [],
        A = navigator.languages || [navigator.language || "en-US"],
        y = n(m, A);
      if (y) (setSetting("languageN", y), await loadLanguage(y));
    } else if (i !== i18n.getLocale()) {
      if (i === "en") i18n.setLocale("en");
      else await loadLanguage(i);
      HE = !0;
    }
    let o = await localforage.default.getItem("settings_shaderTypeN");
    if ((await updatePaletteForShader(o), await localforage.default.getItem("settings_wiiu")))
      (await localforage.default.removeItem("settings_wiiu"),
        await localforage.default.setItem("settings_theme", "wiiu"));
    if ((await localforage.default.getItem("settings_theme")) === null) await setSetting("theme", "sw2");
    if ((await localforage.default.getItem("settings_bgmType")) === null) await setSetting("bgmType", "auto");
    if ((await localforage.default.getItem("settings_bgm")) === null) await setSetting("bgm", !0);
    if ((await localforage.default.getItem("settings_colorScheme")) === null)
      await setSetting("colorScheme", "auto");
    if ((await localforage.default.getItem("settings_theme")) === "default")
      await localforage.default.setItem("settings_theme", "sw2");
    ((document.documentElement.dataset.theme = String(await localforage.default.getItem("settings_theme"))),
      (document.documentElement.dataset.colorScheme = String(
        await localforage.default.getItem("settings_colorScheme"),
      )),
      (document.documentElement.dataset.colorSchemeSpace = String(
        await localforage.default.getItem("settings_colorSchemeSpace"),
      )));
    let h = await localforage.default.getItem("settings_useExperimentalGradient");
    if (
      ((document.documentElement.dataset.useExperimentalGradient = String(h !== null ? h : "true")),
      settingsCache.theme !== (await localforage.default.getItem("settings_theme")) ||
        settingsCache.bgmType !== (await localforage.default.getItem("settings_bgmType")) ||
        settingsCache.sfxType !== (await localforage.default.getItem("settings_bgmType")) ||
        e)
    )
      (getMusicPlayer().updateTheme(), getSoundEffects().updateTheme());
    let f = (parseInt(await localforage.default.getItem("settings_bgmVolume")) + 0.001) / 100 || 1,
      p = (parseInt(await localforage.default.getItem("settings_sfxVolume")) + 0.001) / 100 || 1;
    if (
      (getSoundEffects().setVolume(p),
      getMusicPlayer().setVolume(f),
      setTimeout(async () => {
        let g = (parseInt(await localforage.default.getItem("settings_bgmVolume")) + 0.001) / 100 || 1,
          m = (parseInt(await localforage.default.getItem("settings_sfxVolume")) + 0.001) / 100 || 1;
        (getSoundEffects().setVolume(m), getMusicPlayer().setVolume(g));
      }, 2000),
      settingsCache.resourceType !== (await localforage.default.getItem("settings_resourceType")))
    )
      jD = !0;
    if (settingsCache.shaderTypeN !== o) {
      if ((await getSetting("shaderTypeN")) === "switch") setSetting("tempOptInToCustomMiiRenderer", !0);
    }
    if ((await localforage.default.getItem("settings_bodyModel")) == "");
    if (settingsCache.bodyModel !== (await localforage.default.getItem("settings_bodyModel"))) {
      let g = await getSetting("bodyModelN");
      jp(g);
    }
    await loadAllSettings();
  },
  settingsCache = {},
  SETTINGS_KEY_PREFIX = "settings_";
async function loadMissingSettings() {
  for (let e in SETTINGS_SECTIONS)
    for (let t in SETTINGS_SECTIONS[e].items) {
      let r = SETTINGS_KEY_PREFIX + t;
      if (settingsCache[t] === void 0) settingsCache[t] = await localforage.default.getItem(r);
    }
}
async function loadAllSettings() {
  for (let e in SETTINGS_SECTIONS)
    for (let t in SETTINGS_SECTIONS[e].items) {
      let r = SETTINGS_KEY_PREFIX + t;
      settingsCache[t] = await localforage.default.getItem(r);
    }
}
await loadAllSettings();
var UE = null;
async function openSettingsDialog() {
  let e = [],
    t = Modal.modal(translate("Settings"), "", "body", {
      text: "Cancel",
      callback(c) {
        if (jD)
          Notify.show(
            translate("Notice"),
            translate("A refresh is required to load in the new resource file."),
            () => {
              location.reload();
            },
            translate("Reload"),
          );
        if (HE) {
          HE = !1;
          let u = Modal.modal(translate("Notice"), translate("Changing language, please wait."), "body");
          setTimeout(async () => {
            (await getRefreshLibrary()(),
              openLibrary(),
              setTimeout(() => {
                closeModal(u);
              }, 500));
          }, 500);
        }
      },
    }),
    r = t.qs(".modal-body").clear(),
    n = t.qs(".modal-content");
  (n.classOn("settings"),
    r.elm.style.setProperty("gap", "0", "important"),
    r.elm.style.setProperty("max-width", "722px"),
    n.elm.style.setProperty("max-height", "90vh"));
  let i = [],
    o = [];
  for (let c in SETTINGS_SECTIONS)
    ((o[c] = []),
      i.push({
        icon: SETTINGS_SECTIONS[c].name(),
        select(u) {
          o[c].forEach((d) => {
            u.append(d);
          });
        },
      }));
  async function s() {
    let c = [...a],
      u = {};
    for (let d in SETTINGS_SECTIONS) for (let h in SETTINGS_SECTIONS[d].items) u[h] = await getSetting(h);
    for (let [d, h] of c)
      for (let f in SETTINGS_SECTIONS)
        if (SETTINGS_SECTIONS[f].items[d]) {
          if (SETTINGS_SECTIONS[f].items[d].type === 4) continue;
          if (SETTINGS_SECTIONS[f].items[d].condition)
            if (SETTINGS_SECTIONS[f].items[d].condition(u) === !0) h.style.display = "flex";
            else h.style.display = "none";
        }
  }
  let a = /*@__PURE__*/ new Map();
  for (let c in SETTINGS_SECTIONS)
    for (let u in SETTINGS_SECTIONS[c].items) {
      let d = SETTINGS_KEY_PREFIX + u;
      if ((await localforage.default.getItem(d)) === null)
        await localforage.default.setItem(d, SETTINGS_SECTIONS[c].items[u].default);
      switch (((settingsCache[u] = await localforage.default.getItem(d)), SETTINGS_SECTIONS[c].items[u].type)) {
        case 0:
          let h = new Html("div").class("col").appendMany(
            new Html("div")
              .class("flex-group")
              .style({ "justify-content": "flex-start" })
              .appendMany(
                addButtonSounds(
                  new Html("input")
                    .attr({
                      id: d,
                      type: "checkbox",
                      checked: (await localforage.default.getItem(d)) === !0 ? !0 : void 0,
                    })
                    .on("input", async (b) => {
                      ((settingsCache[u] = await localforage.default.getItem(d)),
                        await localforage.default.setItem(d, b.target.checked),
                        applySettings(),
                        s());
                    }),
                  "hover",
                  "select_misc",
                ),
                new Html("label").attr({ for: d }).text(SETTINGS_SECTIONS[c].items[u].label()),
              ),
            new Html("small").text(SETTINGS_SECTIONS[c].items[u].description()),
          );
          (a.set(u, h.elm), o[c].push(h));
          break;
        case 3:
          let f = SETTINGS_SECTIONS[c].items[u],
            p = new Html("div").class("col").appendMany(
              new Html("div")
                .class("flex-group")
                .style({ "justify-content": "flex-start" })
                .append(new Html("label").attr({ for: d }).text(SETTINGS_SECTIONS[c].items[u].label())),
              addButtonSounds(
                new Html("input")
                  .attr({
                    id: d,
                    type: "range",
                    min: f.min,
                    max: f.max,
                    value: (await localforage.default.getItem(d)) || f.default,
                  })
                  .on("input", async (b) => {
                    (playSound("slider_tick"),
                      (settingsCache[u] = await localforage.default.getItem(d)),
                      await localforage.default.setItem(
                        d,
                        String(Math.max(f.min, Math.min(f.max, parseInt(b.target.value)))),
                      ),
                      applySettings());
                  }),
                "hover",
                "select_misc",
              ),
              new Html("small").text(SETTINGS_SECTIONS[c].items[u].description()),
            );
          (a.set(u, p.elm), o[c].push(p));
          break;
        case 1:
          let g = await localforage.default.getItem(d),
            m = await Promise.all(
              SETTINGS_SECTIONS[c].items[u].choices.map(async (b) => {
                let v = void 0,
                  _ = !1;
                if (typeof b.isColor < "u") {
                  ((v = new Html("span").style({
                    width: "1.2em",
                    height: "1.2em",
                    "border-radius": "6px",
                  })),
                    v.style({
                      "background-color": "var(--hover)",
                      border: "1px solid var(--stroke)",
                    }));
                  let E = await localforage.default.getItem(d);
                  if (typeof E === "string") {
                    if (E.startsWith("#")) (v.style({ "background-color": E }), (_ = !0));
                  }
                }
                let w = new Html("button")
                  .class(b.value === g || _ ? "selected-setting" : void 0)
                  .attr({ "data-setting": d });
                if (b.headerIcon !== void 0)
                  w.prepend(new Html("span").style({ display: "flex" }).html(b.headerIcon));
                if (
                  (w.append(
                    new Html("span").text(
                      SETTINGS_SECTIONS[c].items[u].default === b.value
                        ? `${b.label()} ${translate("(Default)")}`
                        : b.label(),
                    ),
                  ),
                  v !== void 0)
                )
                  v.prependTo(w);
                let S = addButtonSounds(w, "hover", "select_misc");
                if (b.disabled) S.attr({ disabled: !0 });
                else
                  w.on("click", async (E) => {
                    settingsCache[u] = String(await localforage.default.getItem(d));
                    let T = !1;
                    if (typeof b.isColor < "u") {
                      let C = new Html("input")
                        .attr({ type: "color" })
                        .style({ position: "fixed", opacity: "0" })
                        .appendTo("body");
                      if (settingsCache[u].startsWith("#")) (C.val(settingsCache[u]), (T = !0));
                      (C.elm.click(),
                        C.on("change", (R) => {
                          if ((localforage.default.setItem(d, C.getValue()), v))
                            v.style({ "background-color": C.getValue() });
                          (C.cleanup(), (T = !0));
                        }));
                    } else await localforage.default.setItem(d, b.value);
                    (applySettings(), s());
                    let M = E.target;
                    if (
                      (M.parentElement.querySelectorAll(`[data-setting="${d}"]`).forEach((C) => {
                        C.classList.remove("selected-setting");
                      }),
                      b.isColor !== void 0)
                    ) {
                      if (T) M.classList.add("selected-setting");
                      let C = String(await localforage.default.getItem(d));
                      if (v) v.style({ "background-color": C });
                    } else M.classList.add("selected-setting");
                  });
                return S;
              }),
            ),
            A = new Html("div").class("col").appendMany(
              new Html("label").text(SETTINGS_SECTIONS[c].items[u].label()),
              new Html("small").text(SETTINGS_SECTIONS[c].items[u].description()),
              new Html("div")
                .class("flex-group")
                .style({ "justify-content": "flex-start" })
                .appendMany(...m),
            );
          if (SETTINGS_SECTIONS[c].items[u].render)
            e.push((b) => {
              if (SETTINGS_SECTIONS[c].items[u].type !== 4) SETTINGS_SECTIONS[c].items[u].render(A, b);
            });
          (a.set(u, A.elm), o[c].push(A));
          break;
        case 2:
          let y = new Html("div").class("col").appendMany(
            new Html("label").text(SETTINGS_SECTIONS[c].items[u].label()),
            new Html("small").text(SETTINGS_SECTIONS[c].items[u].description()),
            new Html("div")
              .class("flex-group")
              .style({ "justify-content": "flex-start" })
              .appendMany(
                ...SETTINGS_SECTIONS[c].items[u].choices.map((b) => {
                  let v = addButtonSounds(
                    new Html("button")
                      .attr({ disabled: b.disabled })
                      .class(b.type)
                      .text(b.label())
                      .on("click", async (_) => {
                        b.select();
                      }),
                    "hover",
                    "select_misc",
                  );
                  if (b.disabled) v.attr({ disabled: !0 });
                  return v;
                }),
              ),
          );
          if (SETTINGS_SECTIONS[c].items[u].render)
            e.push((b) => {
              if (SETTINGS_SECTIONS[c].items[u].type !== 4) SETTINGS_SECTIONS[c].items[u].render(y, b);
            });
          (a.set(u, y.elm), o[c].push(y));
          break;
        case 4:
          let x = new Html("div")
            .style({
              "font-size": "14px",
              display: "flex",
              "align-items": "center",
              width: "100%",
              color: "var(--label)",
              gap: "8px",
            })
            .appendMany(
              new Html("span").text(SETTINGS_SECTIONS[c].items[u].heading),
              new Html("div").style({ height: "2px", "flex-grow": "1", background: "var(--stroke)" }),
            );
          o[c].push(x);
          break;
      }
    }
  let l = createTabList(i, 1);
  (l.list.style({ overflow: "auto" }),
    l.list.qsa(".tab-rectangle").forEach((c) => c.style({ "flex-shrink": "0" })),
    r.style({ padding: "0", gap: "0" }),
    l.list.style({ "flex-shrink": "0" }),
    l.content.style({
      "align-items": "flex-start",
      padding: "16px 18px",
      gap: "16px",
      "overflow-y": "auto",
      flex: "1",
    }),
    n.style({ height: "100%", "max-height": "unset" }),
    r.appendMany(l.list, l.content),
    await s(),
    (async () => {
      try {
        let c = await fetch("/api/personal_mii").catch(void 0);
        if (c.ok) ((UE = await c.json()), e.forEach((u) => u(UE)));
      } catch (c) {}
      if (!UE) e.forEach((c) => c(null));
    })());
}
async function qD() {
  await setSetting(`has-seen-${APP_CONFIG.version.string}`, !1);
}
