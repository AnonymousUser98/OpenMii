// src/app/setup/first-run.js
// First-run setup (theme, colour, shader, Personal Mii).
//
// Defines: Kue, ensureSetupRoot, LG, skipFirstRunSetup, runFirstRunSetup, finishFirstRunSetup,
//          transitionSetupPage, createNextButton, createBackButton, getThemeOptions,
//          getSpaceColorOptions, getShaderOptions, createSwiperList, renderSetupPage
// Uses from other files:
//   app/library/library.js: renderMiiIcon, libraryApiRequest, iG, openLibrary
//   app/i18n/localization.js: i18n, getTranslator, loadLanguage
//   app/settings/settings.js: getSetting, setSetting
//   app/ui/html.js: Html
//   app/mii/mii.js: Mii
//   app/ui/components.js: addButtonSounds
//   app/ui/modal.js: Modal
//   app/shaders/shader-registry.js: wx
//   app/editor/widgets.js: createDropdown
//   app/ui/notify.js: Notify
//   app/settings/settings-dialog.js: applySettings
//   app/library/selection-menu.js: chooseNewMiiStyle
//   … and 1 more files

var Kue = `url("data:image/svg+xml,%3Csvg width='228' preserveAspectRatio='none' height='228' viewBox='0 0 228 228' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='228' height='228' fill='url(%23paint0_linear_3781_28)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_3781_28' x1='114' y1='0' x2='114' y2='228' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-opacity='0'/%3E%3Cstop offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")`,
  Wn = {},
  kr = {};
function ensureSetupRoot() {
  if (typeof kr.root > "u")
    kr.root = new Html("div")
      .style({
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        "background-image": Kue,
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
        transition: "opacity 0.5s ease",
        opacity: "0",
        display: "grid",
        "place-items": "center",
      })
      .appendTo("body");
  setTimeout(() => {
    kr.root.style({ opacity: "1" });
  }, 500);
}
function LG(e) {
  if (e.target.closest(".popup-overlay") === null)
    Html.qsa(".popup-overlay") !== null && Html.qsa(".popup-overlay").forEach((t) => t.cleanup());
}
async function skipFirstRunSetup() {
  (setSetting("settings_colorScheme", "auto"),
    setSetting("settings_theme", "sw2"),
    (document.documentElement.dataset.theme = "sw2"),
    (document.documentElement.dataset.colorScheme = "auto"),
    document.addEventListener("pointerdown", LG),
    ensureSetupRoot());
  let e = 0,
    t = 6,
    r,
    n = () => {
      if (r) r(1);
    },
    i = (l) => () => {
      if (r) r(l - e);
    },
    o = () => {
      if (r) r(-1);
    },
    s = () => {
      if (r) r(0);
    },
    a = 1;
  while (e < t) {
    await renderSetupPage(e, n, o, s, i, a);
    let l = await new Promise((c) => {
      r = c;
    });
    if (((e += l), (a = l), e < 0)) e = 0;
  }
  (kr.modal.classOn("slideOut"),
    kr.root.style({ opacity: "0" }),
    await new Promise((l) => {
      setTimeout(() => {
        l();
      }, 500);
    }),
    kr.root.cleanup(),
    kr.modal.cleanup(),
    (kr = {}));
}
var mv = 0,
  gv = null;
async function runFirstRunSetup() {
  let e = getTranslator();
  switch (
    (ensureSetupRoot(),
    await new Promise(async (t) => {
      await transitionSetupPage(0);
      let r = await fetch("/api/personal_mii")
        .then((n) => n.json())
        .catch((n) => !1);
      if (!r) r = null;
      if (r.error) r = null;
      if (((gv = r), r)) {
        let n = new Mii(gv.data),
          i = new Html("img").style({ opacity: "0", margin: "-28px auto -32px" });
        (ei(
          new Html("h2")
            .class("full")
            .style({ "text-align": "center" })
            .text(e("You already have a Personal Mii")),
        ),
          ei(i),
          renderMiiIcon(n, "aaa", "all_body_sugar", 384, void 0, void 0, void 0, void 0, !0)
            .then(async (o) => {
              i.attr({ src: o.url }).style({ opacity: "1" }).on("load", o.dispose);
            })
            .catch((o) => {
              Notify.show(e("Notice"), e("Failed to load %1's icon", n.nickname));
            }),
          ei(new Html("label").text(n.nickname)),
          ei(
            new Html("span").text(
              e("Would you like to start from scratch or edit your existing one?"),
            ),
          ),
          ei(
            bm(
              addButtonSounds(
                new Html("button")
                  .class("setup-btn")
                  .text(e("Create New"))
                  .on("click", () => {
                    ((mv = 0), t());
                  }),
              ),
              addButtonSounds(
                new Html("button")
                  .class("setup-btn")
                  .text(e("Edit Existing"))
                  .on("click", () => {
                    ((mv = 1), t());
                  }),
              ),
            ),
          ));
      }
    }),
    kr.modal.classOn("slideOut"),
    kr.root.style({ opacity: "0" }),
    await new Promise((t) => {
      setTimeout(() => {
        t();
      }, 500);
    }),
    kr.root.cleanup(),
    kr.modal.cleanup(),
    (kr = {}),
    mv)
  ) {
    case 0: {
      let t = await chooseNewMiiStyle(!0);
      if (!t.id) return alert("Something went wrong, please try again later");
      await fetch("/api/personal_mii", {
        body: JSON.stringify({ id: t.id }),
        method: "POST",
        headers: { "content-type": "application/json" },
      }).catch(void 0);
      break;
    }
    case 1: {
      await new Promise((t) => {
        new MiiEditor(
          0,
          async (r, n) => {
            if (n === !0) (await libraryApiRequest(2, gv.id, r), t());
          },
          gv.data,
          void 0,
          !1,
        );
      });
      break;
    }
  }
}
async function finishFirstRunSetup() {
  let e = getTranslator();
  (iG(() => {
    (localforage.default.setItem("settings_tutorialClear", !0),
      Modal.alert(
        e("Notice"),
        e(`You have completed the tutorial! Enjoy using Mii Creator!

Please take a look at all the available options, and find new things to mess around with!`),
        "body",
        void 0,
        !0,
      ));
  }),
    Modal.alert(
      e("Notice"),
      e(`Let's get into one of the main features of Mii Creator: creating renders!
Select your Mii and follow the highlighted options to continue.`),
      "body",
      !1,
      !0,
    ),
    openLibrary(void 0, !1, !0),
    document.removeEventListener("pointerdown", LG));
}
async function transitionSetupPage(e) {
  let t;
  if (kr.content) {
    if (((t = kr.content), e !== 0))
      e > 0 ? kr.content.classOn("slideOut") : kr.content.classOn("slideOutBackwards");
    else kr.content.classOn("fadeOut");
    kr.content = null;
  }
  if (!kr.modal)
    kr.modal = new Html("div").class("setup-modal").style({ opacity: "0" }).appendTo(kr.root);
  if (!kr.content) {
    if (((kr.content = new Html("div").class("content").appendTo(kr.modal)), e !== 0))
      e > 0 ? kr.content.classOn("slideInBackwards") : kr.content.classOn("slideIn");
    else kr.content.classOn("fadeIn");
    (setTimeout(() => {
      if (t) t.cleanup();
      if (e !== 0) e > 0 ? kr.content.classOff("slideInBackwards") : kr.content.classOff("slideIn");
      else kr.content.classOff("fadeIn");
    }, 500),
      kr.modal.style({ opacity: "1" }));
  }
}
function ei(e) {
  kr.content.append(e);
}
function createNextButton(e, t = !0) {
  let r = getTranslator();
  return addButtonSounds(
    new Html("button")
      .class("setup-btn", ...(t ? ["primary"] : []))
      .text(r("Next"))
      .on("click", e),
  );
}
function createBackButton(e, t = !1) {
  let r = getTranslator();
  return addButtonSounds(
    new Html("button")
      .class("setup-btn", ...(t ? ["primary"] : []))
      .text(r("Back"))
      .on("click", e),
  );
}
function bm(...e) {
  return new Html("div").class("flex-row").appendMany(...e);
}
var getThemeOptions = () => {
    let e = getTranslator();
    return [
      { name: e("Classic"), id: "classic", hasDarkVariant: !0 },
      { name: e("Switch 2"), id: "sw2", hasDarkVariant: !0, default: !0 },
      { name: e("Space"), id: "space", hasColors: !0 },
      { name: e("Wii"), id: "wii" },
      { name: e("Wii U"), id: "wiiu" },
      { name: e("Miitomo"), id: "miitomo", hasDarkVariant: !0 },
    ];
  },
  getSpaceColorOptions = () => {
    let e = getTranslator();
    return [
      { name: e("Amethyst"), id: "auto", default: !0 },
      { name: e("Sapphire"), id: "sapphire" },
      { name: e("Gold"), id: "gold" },
      { name: e("Emerald"), id: "emerald" },
      { name: e("Azure"), id: "azure" },
      { name: e("Ruby"), id: "ruby" },
      { name: e("Rhodonite"), id: "rhodonite" },
      { name: e("Moon"), id: "moon" },
    ];
  },
  getShaderOptions = () => {
    let e = getTranslator();
    return [
      { name: e("Toon"), id: "toon", theme: "space" },
      { name: e("Switch"), id: "switch", theme: "sw2" },
      { name: e("Miitomo"), id: "miitomo", theme: "miitomo" },
      { name: e("Wii U"), id: "wiiu", theme: "wiiu" },
      { name: e("Tomodachi Life"), id: "3ds_alt" },
      { name: e("Wii Room"), id: "wii_alt_4", theme: "classic" },
      { name: e("3DS"), id: "3ds" },
      { name: e("Simple+"), id: "wii_alt_2" },
      { name: e("Mii Channel"), id: "wii", theme: "wii" },
      { name: e("Resort"), id: "wii_alt_5" },
      { name: e("Wii Play"), id: "wii_alt" },
      { name: e("Wii U (Bright)"), id: "wiiu_ffliconwithbody" },
      { name: e("No Lighting"), id: "lightDisabled" },
      { name: e("Simple"), id: "wii_simple" },
    ];
  },
  y0;
function createSwiperList(e) {
  let {
      items: t,
      initialIndex: r,
      onSelect: n,
      renderSlide: i,
      getTopText: o,
      getBottomText: s,
    } = e,
    a,
    l = new Html("div").class("full-list"),
    c = new Html("div").class("swiper", "swiper-container").appendTo(l),
    u = new Html("div")
      .class("flex-list")
      .style({ height: "50px", "margin-top": "20px", "flex-wrap": "nowrap" })
      .appendTo(l),
    d = new Html("span").style({ "font-size": "1.2em" }).appendTo(u),
    h = new Html("label").style({ "font-size": "0.9em" }).appendTo(u),
    f = new Html("div").class("swiper-button-prev"),
    p = new Html("div").class("swiper-button-next"),
    g = new Html("div").class("swiper-pagination");
  (c.appendMany(f, p), c.append(g));
  let m = new Html("div").class("swiper-wrapper").appendTo(c);
  t.forEach((x) => m.append(new Html("div").class("swiper-slide").append(i(x))));
  let A = (x) => {
      let b = t[x];
      if (!b) return;
      (d.text(o(b)), h.text(s(b)), n(b, x));
    },
    y = new jo(c.elm, {
      modules: [S9, T9, E9],
      centeredSlides: !0,
      normalizeSlideIndex: !1,
      snapToSlideEdge: !0,
      grabCursor: !0,
      resistanceRatio: 0.7,
      loop: !0,
      loopPreventsSliding: !1,
      slidesPerView: e.slidesPerPageMobile ? e.slidesPerPageMobile : 1,
      slideToClickedSlide: !0,
      breakpoints: {
        800: { slidesPerView: e.slidesPerPageDesktop ? e.slidesPerPageDesktop : 1.5 },
      },
      freeMode: { enabled: !0, sticky: !0, momentumRatio: 0.5, momentumVelocityRatio: 0.5 },
      navigation: { nextEl: p.elm, prevEl: f.elm },
      pagination: { el: g.elm },
      lazyPreloadPrevNext: 2,
      watchSlidesProgress: !0,
      initialSlide: r,
      on: {
        realIndexChange: (x) => {
          (clearTimeout(a), (a = setTimeout(() => A(x.realIndex), 200)));
        },
      },
    });
  return (A(r), { element: l, swiper: y });
}
async function renderSetupPage(e, t, r, n, i, o) {
  let s = getTranslator();
  switch (e) {
    case 0: {
      (await transitionSetupPage(o),
        kr.content.style({ overflow: "clip" }),
        ei(new Html("h2").text(s("Welcome to Mii Creator"))),
        ei(new Html("span").text(s("Let's get you set up and ready to go!"))));
      let a = null;
      (ei(
        createNextButton(() => {
          (t(), a && a.cleanup());
        }),
      ),
        ei(
          new Html("img")
            .attr({ src: "./assets/images/setup/charline.webp" })
            .style({
              position: "relative",
              height: "300px",
              "object-fit": "contain",
              "margin-bottom": "-120px",
            }),
        ),
        setTimeout(() => {
          ((a = new Html("button")
            .text(s("Skip"))
            .class("danger")
            .style({ position: "fixed", bottom: "1rem", right: "1rem" })
            .on("click", async () => {
              if (
                await Modal.prompt(
                  s("Notice"),
                  s(`Are you sure you want to skip the tutorial?
You can always view it again in Settings.

The page will reload.`),
                  "body",
                  !0,
                  !0,
                )
              )
                (localforage.default.setItem("settings_tutorialClear", !0), location.reload());
            })),
            ei(a));
        }, 550));
      break;
    }
    case 1: {
      if (!Wn.lang) Wn.lang = "en";
      (await transitionSetupPage(o),
        kr.content.style({ overflow: "auto" }),
        ei(new Html("h2").text(s("Choose a language"))),
        createDropdown(
          kr.content,
          [
            { item: "English", id: "en" },
            { item: "Français", id: "fr-FR" },
            { item: "Español", id: "es-ES" },
            { item: "Nederlands", id: "nl-NL" },
          ],
          (a) => {
            ((Wn.lang = a),
              loadLanguage(a).then(() => {
                if (a == "en") i18n.setLocale("en");
                (setSetting("languageN", a), n());
              }));
          },
          (await getSetting("languageN")) || Wn.lang,
          "180px",
          "?",
          void 0,
          !0,
          200,
        ),
        ei(bm(createBackButton(r), createNextButton(t))));
      break;
    }
    case 2: {
      if ((transitionSetupPage(o), (y0 = getThemeOptions()), Wn.themeIndex === void 0)) Wn.themeIndex = 1;
      let a = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
        l = createSwiperList({
          items: y0,
          initialIndex: Wn.themeIndex,
          getTopText(c) {
            return c.name;
          },
          getBottomText(c) {
            return c.hasColors ? s("(Has additional colors)") : c.default ? s("(Default)") : "";
          },
          renderSlide: (c) => {
            let u = c.hasDarkVariant
              ? `./assets/images/setup/theme/theme-${c.id}-${a}.webp`
              : `./assets/images/setup/theme/theme-${c.id}.webp`;
            return new Html("img").attr({ src: u }).style({ width: "96%", margin: "auto" });
          },
          onSelect: (c, u) => {
            ((Wn.themeIndex = u),
              (Wn.shouldOverrideShader = !0),
              (document.documentElement.dataset.theme = c.id));
          },
        });
      (kr.content.style({ overflow: "auto" }),
        ei(new Html("h2").class("full").text(s("Choose a theme"))),
        ei(l.element),
        ei(
          bm(
            createBackButton(r),
            createNextButton(() => {
              i(y0[Wn.themeIndex].hasColors ? 3 : y0[Wn.themeIndex].hasDarkVariant ? 5 : 5)();
            }),
          ),
        ));
      break;
    }
    case 3: {
      transitionSetupPage(o);
      let a = getSpaceColorOptions();
      if (Wn.spaceColorSchemeIndex === void 0) Wn.spaceColorSchemeIndex = 0;
      let l = createSwiperList({
        items: a,
        initialIndex: Wn.spaceColorSchemeIndex,
        getTopText(c) {
          return c.name;
        },
        getBottomText(c) {
          return c.default ? s("(Default)") : "";
        },
        renderSlide: (c) => {
          let u = `./assets/images/setup/theme/theme-space-${c.id}.webp`;
          return new Html("img").attr({ src: u }).style({ width: "96%", margin: "auto" });
        },
        onSelect: (c, u) => {
          ((Wn.spaceColorSchemeIndex = u),
            (document.documentElement.dataset.theme = "space"),
            (document.documentElement.dataset.colorSchemeSpace = c.id));
        },
      });
      (kr.content.style({ overflow: "auto" }),
        ei(new Html("h2").class("full").text(s("Choose a color scheme"))),
        ei(l.element),
        ei(
          bm(
            createBackButton(r),
            createNextButton(() => {
              i(5)();
            }),
          ),
        ));
      break;
    }
    case 5: {
      await transitionSetupPage(o);
      let a = getShaderOptions(),
        l = y0[Wn.themeIndex].id;
      if (Wn.shaderType === void 0 || Wn.shouldOverrideShader) {
        let d = a.filter((h) => h.theme).find((h) => h.theme == l);
        if (d) Wn.shaderType = d.id;
        else Wn.shaderType = "switch";
      }
      Wn.shouldOverrideShader = !1;
      let c = createSwiperList({
        items: a,
        initialIndex: a.findIndex((d) => d.id == Wn.shaderType),
        getTopText(d) {
          return d.name;
        },
        getBottomText(d) {
          return d.theme === l ? s("(Recommended with your theme)") : "";
        },
        renderSlide: (d) => {
          let h = `./assets/images/setup/shader/${d.id}.webp`;
          return new Html("div")
            .style({ padding: "0px 16px", width: " 100%", height: "100%", display: "flex" })
            .append(
              new Html("img")
                .attr({ src: h })
                .style({
                  width: "100%",
                  height: "80%",
                  "object-fit": "contain",
                  "max-height": "50vh",
                  margin: "auto",
                  display: "flex",
                }),
            );
        },
        onSelect: (d, h) => {
          Wn.shaderType = d.id;
        },
        slidesPerPageDesktop: 4.5,
        slidesPerPageMobile: 1.5,
      });
      if (
        (c.element.style({ height: "100%", margin: "unset" }).class("fs-shd"),
        c.element.qs(".swiper"))
      )
        c.element.qs(".swiper").style({ height: "85%" });
      (kr.content.style({ overflow: "auto" }),
        ei(new Html("h2").class("full").text(s("Choose a shading style"))),
        ei(c.element));
      let u = Wn.themeIndex == 2 ? 3 : y0[Wn.themeIndex].hasDarkVariant ? 2 : 2;
      ei(
        bm(
          createBackButton(i(u)),
          createNextButton(() => {
            (t(),
              setSetting("shaderTypeN", Wn.shaderType),
              setSetting("shaderTypeIcon", Wn.shaderType),
              wx(),
              setSetting("theme", y0[Wn.themeIndex].id),
              applySettings(!0));
          }),
        ),
      );
      break;
    }
    default: {
      (await transitionSetupPage(o),
        ei(new Html("span").text(s("Page %1 isn't complete yet, sorry :(", e + 1))),
        ei(bm(createBackButton(r), createNextButton(t))));
      break;
    }
  }
}
var translate = getTranslator();
