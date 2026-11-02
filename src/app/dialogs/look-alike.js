// src/app/dialogs/look-alike.js
// Look-alike picker and NNID lookup.
//
// Defines: openLookAlikeDialog, createLookAlikePreview, loaderElement, Loader, openNNIDLookup
// Uses from other files:
//   app/library/library.js: I_, renderMiiIcon, getRefreshLibrary, libraryApiRequest, openLibrary
//   app/mii/random-mii.js: generateRandomMii, Sk
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/util/colors-and-bytes.js: bytesToBase64
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   app/ui/modal.js: Modal
//   app/config.js: APP_CONFIG
//   app/dialogs/create-mii.js: openCreateMiiDialog
//   app/editor/editor.js: MiiEditor

var translate = getTranslator(),
  openLookAlikeDialog = async () => {
    var e = Modal.modal(
      translate("Choose a look-alike"),
      "",
      "body",
      {
        text: "Cancel",
        callback(a) {
          openCreateMiiDialog();
        },
      },
      { text: translate("Confirm") },
    );
    e.classOn("random-mii-grid");
    let t = e.qs(".modal-body");
    t.qsa("span,.flex-group *").forEach((a) => a.style({ display: "none" }));
    let r = new Html("div").class("random-mii-container").appendTo(t),
      n = t.qs(".flex-group");
    (t.prepend(
      new Html("span")
        .style({
          width: "100%",
          padding: "14px 18px",
          background: "var(--hover)",
          color: "var(--text)",
          border: "1px solid var(--stroke)",
          "border-radius": "6px",
          "flex-shrink": "0",
        })
        .text(
          translate(
            "All of the options here are what Nintendo originally programmed in. Please let me know if you want more options added.",
          ),
        ),
    ),
      new Html("button")
        .class("primary")
        .text(translate("Reroll"))
        .on("click", () => s())
        .appendTo(n));
    let i = {};
    function o(a, l) {
      return new Html("select").appendMany(...l).on("input", (c) => {
        if (((i[a] = parseInt(c.target.value)), i[a] === -1)) delete i[a];
      });
    }
    n.prependMany(
      o("race", [
        new Option(translate("Skin tone"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Black"), "0"),
        new Option(translate("White"), "1"),
        new Option(translate("Asian"), "2"),
      ]),
      o("gender", [
        new Option(translate("Style"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Masculine"), "0"),
        new Option(translate("Feminine"), "1"),
      ]),
      o("hairColor", [
        new Option(translate("Hair color"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Black"), "0"),
        new Option(translate("Brown"), "1"),
        new Option(translate("Auburn"), "2"),
        new Option(translate("Hazel"), "3"),
        new Option(translate("Gray"), "4"),
        new Option(translate("Olive"), "5"),
        new Option(translate("Medium-blonde"), "6"),
        new Option(translate("Light-blonde"), "7"),
      ]),
      o("favoriteColor", [
        new Option(translate("Favorite color"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Red"), "0"),
        new Option(translate("Orange"), "1"),
        new Option(translate("Yellow"), "2"),
        new Option(translate("Lime"), "3"),
        new Option(translate("Green"), "4"),
        new Option(translate("Blue"), "5"),
        new Option(translate("Cyan"), "6"),
        new Option(translate("Pink"), "7"),
        new Option(translate("Purple"), "8"),
        new Option(translate("Brown"), "9"),
        new Option(translate("White"), "10"),
        new Option(translate("Black"), "11"),
      ]),
      o("eyeColor", [
        new Option(translate("Eye color"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Black"), "0"),
        new Option(translate("Gray"), "1"),
        new Option(translate("Brown"), "2"),
        new Option(translate("Hazel"), "3"),
        new Option(translate("Blue"), "4"),
        new Option(translate("Green"), "5"),
      ]),
      o("age", [
        new Option(translate("Age"), "-1", !0, !0),
        new Option(translate("(Random)"), "-1"),
        new Option(translate("Child"), "0"),
        new Option(translate("Adult"), "1"),
        new Option(translate("Elder"), "2"),
      ]),
    );
    function s() {
      r.clear();
      for (let a = 0; a < 24; a++) {
        let l = new Mii(
          "AwEAAAAAAAAAAAAAgP9wmQAAAAAAAAAAAABNAGkAaQAAAAAAAAAAAAAAAAAAAEBAAAAhAQJoRBgmNEYUgRIXaA0AACkAUkhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMNn",
        );
        generateRandomMii(l, i);
        let c = new Html("button")
          .append(
            new Html("img").attr({ src: "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.loading_icon) }),
          )
          .appendTo(r);
        (setTimeout(() => {
          renderMiiIcon(l, "lookalike").then((u) => {
            (I_(), c.qs("img")?.attr({ src: u.url }).on("load", u.dispose));
          });
        }, 0),
          c.on("click", async () => {
            createLookAlikePreview(l, i, e);
          }));
      }
    }
    s();
  };
function createLookAlikePreview(e, t, r) {
  let n = new Html("img")
    .style({ width: "210px", height: "210px" })
    .attr({ src: "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.loading_icon_all_body) });
  (setTimeout(() => {
    renderMiiIcon(e, "lookalike_preview", "all_body_sugar", 210).then((i) => {
      n.attr({ src: i.url }).on("load", i.dispose);
    });
  }, 0),
    Modal.modal(
      translate("Is this OK?"),
      new Html("div").style({ margin: "0 auto" }).append(n),
      "body",
      { text: "Cancel" },
      { text: translate("Close"), type: "danger" },
      {
        text: translate("Revise"),
        callback(i) {
          let o = e,
            s = Modal.modal(
              "Revise",
              new Html("div").appendMany(
                new Html("span").style({ margin: "0 auto" }).text(translate("Click any to reroll")),
                new Html("div")
                  .class("menu")
                  .style({ display: "flex", "flex-direction": "column", gap: "0.5rem" }),
              ),
              "body",
              { text: "Cancel" },
              {
                text: translate("Done"),
                callback(c) {
                  createLookAlikePreview(o, t, r);
                },
              },
            );
          s.qs(".modal-content").style({ height: "max-content", "max-height": "100vh" });
          let a = s.qs(".menu");
          function l() {
            a.clear();
            let c = [];
            for (let d = 0; d < 9; d++) {
              let h = Math.floor(d / 3),
                f = d % 3;
              if (c[h] === void 0) c[h] = [];
              if (d === 4) c[h][f] = o;
              else {
                var u = new Mii(o.export());
                (Sk(u, t), (c[h][f] = u));
              }
            }
            for (let d of c) {
              let h = new Html("div").style({ display: "flex", gap: "0.5rem" }).appendTo(a);
              for (let f of d) {
                let p = new Html("button").style({ padding: "0" }),
                  g = new Html("img")
                    .style({ width: "108px", height: "108px" })
                    .attr({
                      src: "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.loading_icon_head_only),
                    })
                    .appendTo(p);
                (h.append(p),
                  p.on("click", (m) => {
                    (m.preventDefault(),
                      (o = f),
                      requestAnimationFrame(() => {
                        l();
                      }));
                  }),
                  setTimeout(() => {
                    renderMiiIcon(f, "lookalike_regenerate", "fflmakeicon", 108).then((m) => {
                      (I_(), g.attr({ src: m.url }).on("load", m.dispose));
                    });
                  }, 0));
              }
            }
          }
          l();
        },
      },
      {
        text: translate("Done"),
        type: "primary",
        callback(i) {
          let o = bytesToBase64(e.export("miic"));
          if (r) r.qs(".flex-group button")?.elm.click();
          (getRefreshLibrary()(),
            new MiiEditor(
              0,
              async (s, a) => {
                if (a === !0) await libraryApiRequest(1, s);
                openLibrary();
              },
              o,
            ));
        },
      },
    ));
}
var loaderElement,
  Loader = {
    show() {
      if (loaderElement === void 0)
        loaderElement = new Html("div").class("loader", "active").html(SVG_ICONS.loading).appendTo("body");
      else loaderElement.classOn("active");
    },
    hide() {
      if (loaderElement) loaderElement.classOff("active");
    },
  };
var translate = getTranslator(),
  openNNIDLookup = async () => {
    let e = await Modal.input(
      translate("NNID Lookup"),
      translate("Enter NNID of user.."),
      translate("Username"),
      "body",
      !1,
    );
    if (e === !1) return openCreateMiiDialog();
    Loader.show();
    let r = await (await fetch(APP_CONFIG.apis.nnidFetchURL(encodeURIComponent(e)))).json();
    if ((Loader.hide(), r.error !== void 0)) {
      await Modal.alert(translate("Error"), translate("Couldn't get Mii: %1", r.error));
      return;
    }
    (getRefreshLibrary()(),
      new MiiEditor(
        0,
        async (n, i) => {
          if (i === !0) await libraryApiRequest(1, n);
          openLibrary();
        },
        r.data,
      ));
  },
  Ok = async () => {
    let e = await Modal.input(
      translate("Pretendo Network ID"),
      translate("Enter PNID of user.."),
      translate("Username"),
      "body",
      !1,
    );
    if (e === !1) return openCreateMiiDialog();
    Loader.show();
    let t;
    try {
      if (((t = await fetch(APP_CONFIG.apis.pnidFetchURL(encodeURIComponent(e)))), Loader.hide(), !t.ok))
        throw t;
    } catch (r) {
      if (r instanceof Response)
        await Modal.alert(translate("Error"), translate("Couldn't get Mii: %1", await r.text()));
      else
        await Modal.alert(
          translate("Error"),
          translate(`The PNID API may be experiencing issues.
Please try again later.`),
        );
      return;
    }
    if (!t.ok) {
      await Modal.alert(
        translate("Error"),
        translate(`The PNID API may be experiencing issues.
Please try again later.`),
      );
      return;
    }
    (getRefreshLibrary()(),
      new MiiEditor(
        0,
        async (r, n) => {
          if (n === !0) await libraryApiRequest(1, r);
          openLibrary();
        },
        (await t.json()).data,
      ));
  };
