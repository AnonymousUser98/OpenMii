// src/app/editor/tabs/profile-tab.js
// Editor tab: Profile (name, favourite colour, birthday...).
//
// Defines: HK, profileTab
// Uses from other files:
//   app/util/colors-and-bytes.js: Dv, Nv
//   app/editor/widgets.js: createValidatedInput, createDropdown
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/mii/colors.js: FAVORITE_COLOR_GRADIENTS
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range
//   app/ui/birthday-input.js: createBirthdayInput
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   app/ui/components.js: createFeatureSet
//   app/editor/editor.js: MiiEditor

var translate = getTranslator();
function HK(e) {
  return {
    id: `${e}`,
    item: `<span style='display:block;border:2px solid var(--stroke);border-radius:6px;width:26px;height:26px;background-color:${FAVORITE_COLOR_GRADIENTS[e].top}'></span>`,
  };
}
function profileTab(e) {
  let t = new Mii(e.mii.export()),
    r = (f, p, g = !1) => {
      if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
      if (((t[f] = p), g)) (e.callback(t, !1, 2, 1), e.callback(t, !0, 0, 7), playSound("select_color"));
      else e.callback(t, !1, 0, 0);
      return !0;
    },
    n = (f) => {
      if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
      return t[f];
    },
    i = new Html("div").style({
      padding: "1rem",
      display: "flex",
      "flex-direction": "column",
      gap: "1rem",
      width: "520px",
      margin: "0px auto",
      "max-width": "100%",
    }),
    o = new Html("div").class("feature-set-group").style({ padding: "0" }),
    s = new Html("div").class("feature-set-group").style({ padding: "0" }),
    a = new Html("div")
      .class("input-group")
      .style({ padding: "0" })
      .append(new Html("label").text(translate("Favorite Color")));
  function l(f) {
    return new Html("div")
      .style({
        display: "flex",
        "align-items": "center",
        width: "100%",
        color: "var(--stroke)",
        gap: "8px",
        "text-transform": "uppercase",
      })
      .appendMany(
        new Html("span").text(f).style({ "-webkit-text-stroke": "0.05em", "letter-spacing": ".15em" }),
        new Html("div").style({ height: "3px", "flex-grow": "1", background: "var(--stroke)" }),
      );
  }
  (e.container.appendMany(
    i.appendMany(
      l(translate("Details")),
      createValidatedInput(
        translate("Name"),
        "Name",
        e.mii.nickname,
        (f) => r("nickname", f.trim()),
        (f) => {
          let p = Dv(f);
          if (Nv(p).trim() === "") return translate("Name is empty");
          if (p.length > 20) return translate("Name is too long");
          if (p.length === 0) return translate("Name is too short");
          return !0;
        },
        e.editor,
        10,
      ),
      createValidatedInput(
        translate("Creator"),
        "Creator",
        e.mii.creator,
        (f) => r("creator", f.trim()),
        (f) => {
          let p = Dv(f),
            g = Nv(p);
          if (g.length === 0) return !0;
          if (g.trim() === "") return translate("Creator name is empty");
          if (p.length > 20) return translate("Creator name is too long");
          return !0;
        },
        e.editor,
        10,
      ),
      createBirthdayInput(
        translate("Birthday"),
        (f, p, g) => {
          (r("birthMonth", f), r("birthDay", p), r("birthYear", g));
        },
        { month: n("birthMonth"), day: n("birthDay"), year: n("birthYear") },
      ),
      l(translate("Appearance")),
      a,
      new Html("div").class("input-group").appendMany(new Html("label").text("Priority"), o),
      new Html("div").class("input-group").appendMany(new Html("label").text("Style"), s),
    ),
  ),
    createDropdown(
      a,
      range(12).map((f) => HK(f)),
      (f) => {
        r("favoriteColor", f, !0);
      },
      String(e.mii.favoriteColor),
      "180px",
      "?",
      void 0,
      !1,
      200,
    ).style({ background: "var(--root)" }),
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      embeddedSet: o,
      entries: {
        favorite: {
          label: translate("Priority"),
          items: [
            {
              type: 4,
              items: [
                { icon: SVG_ICONS.pants_normal, value: 0, sound: "select_color" },
                { icon: SVG_ICONS.pants_favorite, value: 1, sound: "select_color" },
                { icon: SVG_ICONS.pants_special, value: 2, sound: "select_color" },
                { icon: SVG_ICONS.pants_transferred, value: 3, sound: "select_color" },
              ],
              property: "favorite",
              forceRender: !1,
              part: 2,
              bodyUpdateType: 1,
              initialVal(f) {
                if (f.special) return 2;
                if (f.transferred) return 3;
                if (f.favorite) return 1;
                return 0;
              },
            },
          ],
          onItemChange(f, p, g, m) {
            if (!g) return !1;
            switch (f.favorite) {
              case 0:
                ((f.favorite = 0), (f.special = 0), (f.transferred = 0));
                break;
              case 1:
                ((f.favorite = 1), (f.special = 0), (f.transferred = 0));
                break;
              case 2:
                ((f.favorite = 0), (f.special = 1), (f.transferred = 0));
                break;
              case 3:
                ((f.favorite = 0), (f.special = 0), (f.transferred = 1));
                break;
            }
            return !0;
          },
        },
      },
      embedded: !0,
    }),
    createFeatureSet({
      mii: e.mii,
      onChange: e.callback,
      entries: {
        gender: {
          label: translate("Style"),
          items: [
            {
              type: 4,
              items: [
                {
                  icon: e.useAccessibility ? translate("Shirt") : SVG_ICONS.genderMaleLg,
                  sound: "select_style",
                  value: 0,
                },
                {
                  icon: e.useAccessibility ? translate("Dress") : SVG_ICONS.genderFemaleLg,
                  sound: "select_style",
                  value: 1,
                },
              ],
              property: "gender",
              forceRender: !0,
              part: 2,
              bodyUpdateType: 1,
            },
          ],
        },
      },
      embedded: !0,
      embeddedSet: s,
    }));
  function u(f) {
    if (f.length > 0)
      f.forEach((p) => {
        if (p) p.style({ padding: "0", background: "var(--root)" });
      });
  }
  (o.style({ width: "max-content" }), s.style({ width: "max-content" }));
  let d = o.qsa(".feature-switch-item");
  if (d) u(d);
  let h = s.qsa(".feature-switch-item");
  if (h) u(h);
}
