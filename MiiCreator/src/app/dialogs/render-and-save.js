// src/app/dialogs/render-and-save.js
// Render menu and the editor's save handler.
//
// Defines: openRenderMenu, createSaveHandler
// Uses from other files:
//   app/library/library.js: renderMiiIcon, getRefreshLibrary, libraryApiRequest, openLibrary
//   app/renderer/mii-model.js: getAdditionalInfo, getSharedRenderer, createMiiModel
//   app/dialogs/export.js: openExportDialog, FH, openRenderImageDialog
//   app/ui/modal.js: closeModal, Modal
//   app/shaders/shader-registry.js: getRendererSetting, getShaderMaterialClass
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/i18n/localization.js: getTranslator
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/util/colors-and-bytes.js: bytesToBase64
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   … and 10 more files

var translate = getTranslator(),
  openRenderMenu = (e, t, r, n = !1) => {
    Modal.modal(
      translate("Render Mii"),
      translate("What would you like to do?"),
      "body",
      {
        text: translate("Save Mii as QR Code"),
        async callback() {
          let i =
              t.facePaintColor === -1 &&
              t.hatType === -1 &&
              t.outfitType === -1 &&
              t.shirtColor === -1 &&
              t.pantsColor === -1 &&
              t.eyeSclera === 0 &&
              t.hairTipColor === -1 &&
              t.acceType === -1 &&
              t.personality === -1 &&
              t.eyeRColor === -1 &&
              t.eyeShine === -1,
            o = new Mii(t.export()),
            s = !1,
            a = !0;
          if (!i)
            await new Promise(async (u) => {
              ((o.facePaintColor = -1),
                (o.hatType = -1),
                (o.outfitType = -1),
                (o.shirtColor = -1),
                (o.pantsColor = -1),
                (o.eyeSclera = 0),
                (o.hairTipColor = -1),
                (o.acceType = -1),
                (o.personality = -1),
                (o.special = 0),
                (o.favorite = 0),
                (o.transferred = 0),
                (o.eyeRColor = -1),
                (o.eyeShine = -1));
              let d = Modal.modal(
                  translate("Choose QR export type"),
                  translate(`This Mii has custom features.
You can choose to export either as a Mii Creator-compatible QR code,
or a Switch 2-compatible QR code for console support.`),
                  "body",
                  {
                    text: "Cancel",
                    callback(E) {
                      ((a = !1), u(void 0));
                    },
                  },
                ),
                h = d.qs(".modal-content"),
                f = d.qs(".modal-body");
              (h && h.style({ "max-height": "600px" }),
                f.qs("span") && f.qs("span").style({ "flex-shrink": "0" }),
                f.qs(".flex-group") && f.qs(".flex-group").cleanup());
              let p = new Html("div").class("flex-group").appendTo(f),
                g = new Html("div")
                  .class("flex-group", "col")
                  .style({ "min-width": "240px" })
                  .appendTo(p),
                m = new Html("img").appendTo(g),
                A = new Html("div").appendTo(g),
                y = new Html("small").appendTo(g),
                x = new Html("button").text(translate("Choose")).appendTo(g),
                b = new Html("div")
                  .class("flex-group", "col")
                  .style({ "min-width": "240px" })
                  .appendTo(p),
                v = new Html("img").appendTo(b),
                _ = new Html("div").appendTo(b),
                w = new Html("small").appendTo(b),
                S = new Html("button").text(translate("Choose")).appendTo(b);
              (x.on("click", () => {
                ((o = t), closeModal(d), u());
              }),
                S.on("click", () => {
                  ((s = !0), closeModal(d), u());
                }),
                A.text(translate("Mii Creator")),
                _.text(translate("Switch 2")),
                y.style({ "white-space": "pre-wrap", "text-align": "center" }).text(
                  translate(`Custom features and data,
but colors only work on Mii Creator`),
                ),
                w.style({ "white-space": "pre-wrap", "text-align": "center" }).text(
                  translate(`Custom colors only,
but works on console`),
                ),
                m.style({
                  width: "160px",
                  height: "280px",
                  margin: "0px -24px",
                  "object-fit": "cover",
                }),
                v.style({
                  width: "160px",
                  height: "280px",
                  margin: "0px -24px",
                  "object-fit": "cover",
                }),
                renderMiiIcon(t, "", "all_body_sugar", 384, 0, !0, !0, void 0, !0, void 0).then((E) => {
                  m.attr({ src: E.url }).on("load", E.dispose);
                }),
                renderMiiIcon(o, "", "all_body_sugar", 384, 0, !0, !0, void 0, !0, "switch", "switch").then(
                  (E) => {
                    v.attr({ src: E.url }).on("load", E.dispose);
                  },
                ));
            });
          if (!a) return;
          if (!(await getRendererSetting("cutsceneSkipN"))) {
            let u = new Html("div")
              .class("cutscene-holder")
              .style({
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                "object-fit": "contain",
                background: "#0007",
                "backdrop-filter": "blur(8px) saturate(1.3)",
                opacity: "0",
                transition: "opacity 0.5s linear",
              })
              .appendTo("body");
            u.style({ opacity: "1" });
            let d = new Html("div").class("sparkle-container").appendTo(u),
              h = new MiiRenderScene(o, 0);
            (await h.perform(u),
              u.style({ opacity: "0" }),
              setTimeout(() => {
                (hm(d.elm, 7), h.shutdown(), (h = null), u.cleanup(), (u = null));
              }, 500));
          }
          let c = await FH(o, o.hasExtendedColors(), s ? !1 : r);
          downloadURL(c, translate("%1_QR_Code_%2.png", o.nickname, Date.now()));
        },
        disabled: n,
      },
      {
        text: translate("Get Mii instructions"),
        async callback() {
          jH(t);
        },
        disabled: n,
      },
      {
        text: translate("Render presets"),
        async callback() {
          openRenderImageDialog(e, t);
        },
        disabled: n,
      },
      {
        text: translate("Custom render"),
        async callback() {
          if ((await getRefreshLibrary()(), n))
            openCustomRenderDialog(t, void 0, n).then((i) => {
              if (i) openLibrary();
            });
          else
            openCustomRenderDialog(t).then((i) => {
              if (i) openLibrary();
            });
        },
      },
      { text: "Cancel" },
    );
  };
var translate = getTranslator(),
  createSaveHandler =
    (e, t, r, n, i = !1) =>
    async () => {
      try {
        t.validate();
      } catch (m) {
        return Modal.alert(translate("Warning"), translate("This Mii might be corrupted."), "body");
      }
      function o() {
        Modal.modal(
          translate("Notice"),
          translate(
            "If you edit %1, a copy will be made and won't be marked as special. Is this OK?",
            t.nickname,
          ),
          "body",
          { text: "Cancel" },
          {
            text: translate("Yes"),
            type: "primary",
            async callback(m) {
              (await getRefreshLibrary()(),
                new MiiEditor(
                  0,
                  async (A, y) => {
                    if (y === !0) await libraryApiRequest(1, A);
                    openLibrary();
                  },
                  e.data,
                ));
            },
          },
          { text: translate("No") },
        );
      }
      async function s() {
        if (n) o();
        else
          (await getRefreshLibrary()(),
            new MiiEditor(
              0,
              async (m, A) => {
                if (A === !0) await libraryApiRequest(2, e.id, m);
                openLibrary();
              },
              e.data,
            ));
      }
      async function a() {
        if (n) {
          o();
          return;
        }
        let m = bytesToBase64(t.export("miic"));
        getRefreshLibrary()();
        let A = await getSetting("cutsceneSkipN"),
          y = 0;
        if (!A) {
          y = 1;
          let x = new Html("div")
            .class("cutscene-holder")
            .style({
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              "object-fit": "contain",
              background: "#0007",
              "backdrop-filter": "blur(8px) saturate(1.3)",
              opacity: "0",
              transition: "opacity 0.5s linear",
            })
            .appendTo("body");
          (x.style({ opacity: "1" }), document.dispatchEvent(new CustomEvent("editor-launch")));
          let b = new Html("div").class("sparkle-container").appendTo(x),
            v = new MiiRenderScene(t, 0);
          (await v.perform(x),
            x.style({ opacity: "0" }),
            setTimeout(() => {
              (hm(b.elm, 7), v.shutdown(), (v = null), x.cleanup(), (x = null));
            }, 500));
        }
        new MiiEditor(
          0,
          async (x, b) => {
            if (b === !0) {
              let v = await libraryApiRequest(1, x);
              if (v === null || v === void 0) return;
            }
            openLibrary();
          },
          m,
          y,
        );
      }
      async function l() {
        try {
          let x = function (z) {
              return new Promise((X) => {
                createMiiModel({
                  data: t.export("studioData"),
                  charModel: y,
                  drawBody: !0,
                  type: 0,
                  expression: z,
                  module: getFFLModule(),
                  renderer: getSharedRenderer(),
                  size: 256,
                  texResolution: 256,
                  additionalInfo: getAdditionalInfo(t),
                  preferPromise: !0,
                }).then(async (G) => {
                  let Q,
                    de,
                    oe = G.result;
                  return (
                    (Q = URL.createObjectURL(oe)),
                    (de = () => URL.revokeObjectURL(Q)),
                    X({ url: Q, blob: oe, dispose: de })
                  );
                });
              });
            },
            T = function () {
              (w.dispose(), S.dispose(), E.dispose(), C(), k.classOn("rotateAndCry"));
            },
            M = function () {
              B.qs(".modal-body")
                .qsa("*")
                .forEach((z) => z.attr({ disabled: !0, tabindex: "-1" }));
            },
            C = function () {
              M();
            },
            R = function () {
              (B.class("closing"),
                M(),
                setTimeout(() => {
                  B.cleanup();
                }, 250));
            },
            m = getShaderMaterialClass(t.personality === 24 ? "miitomo" : void 0),
            A = {};
          if (t.personality === 24)
            A = { applyGhost: !0, additionalInfo: { ...getAdditionalInfo(t), applyGhost: !0 } };
          A.charInfo = toFFLCharInfo(t);
          let y = await getFFLModule().createFace(
              t,
              getSharedRenderer(),
              null,
              256,
              m,
              t.hatType > -1 ? (HAT_MODEL_INFO[t.hatType].mdlType === 1 ? 2 : 0) : 0,
              [1, 10, 30],
              !1,
              A,
            ),
            b = x(10),
            v = x(30),
            _ = x(1),
            [w, S, E] = await Promise.all([b, v, _]),
            B = Modal.modal(
              translate("Warning"),
              translate("Are you sure you want to delete %1?", t.nickname),
              "body",
            ),
            L = new Html("button").class("danger").text(translate("Yes"));
          ((L.elm.disabled = !0),
            setTimeout(() => {
              ((L.elm.disabled = !1),
                L.on("click", () => {
                  (playSound("delete"),
                    T(),
                    k.attr({ src: S.url }),
                    setTimeout(async () => {
                      (R(), await libraryApiRequest(3, e.id), r.cleanup());
                    }, 500));
                }));
            }, 1500),
            B.qs(".modal-body").append(
              new Html("div").class("flex-group").appendMany(
                addButtonSounds(L),
                addButtonSounds(
                  new Html("button").text(translate("No")).on("click", () => {
                    R();
                  }),
                ),
              ),
            ),
            B.qs(".modal-body").classOn("flex-group"));
          let k = new Html("img")
            .attr({ src: w.url })
            .style({ width: "180px", margin: "-18px auto 0 auto" });
          (B.qs(".modal-body").prepend(k),
            B.qsa("button").forEach((z) => {
              let X = z?.elm.classList.contains("danger");
              (z.on("pointerenter", () => {
                if (X) k.attr({ src: S.url });
                else k.attr({ src: E.url });
              }),
                z.on("pointerleave", () => {
                  k.attr({ src: w.url });
                }));
            }));
        } catch (m) {
          Modal.modal(
            translate("Warning"),
            translate("Are you sure you want to delete %1?", t.nickname),
            "body",
            {
              text: translate("Yes"),
              type: "danger",
              async callback(A) {
                (playSound("delete"), await localforage.default.removeItem(e.id), await libraryApiRequest(3, e.id), r.cleanup());
              },
            },
            { text: translate("No") },
          );
        }
      }
      let c = Modal.modal(
        t.nickname,
        translate("What would you like to do?"),
        "body",
        { text: translate("Edit"), callback: s, type: "primary", disabled: i },
        { text: translate("Make a Copy"), callback: a, disabled: i },
        { text: translate("Delete"), callback: l, type: "danger", preRunCallback: !0, disabled: i },
        {
          text: translate("Export/Download Data"),
          async callback() {
            openExportDialog(e, t, n);
          },
          disabled: i,
        },
        {
          text: translate("Render"),
          async callback() {
            openRenderMenu(e, t, n, i);
          },
        },
        { text: "Cancel" },
      );
      c.qs(".modal-content").style({ "max-height": "100%" });
      let d = new Html("img").style({
        "object-fit": "cover",
        width: "240px",
        height: "240px",
        margin: "-26px auto -16px",
        transition: "opacity 0.3s ease",
        opacity: "0",
      });
      renderMiiIcon(t, "preview", "all_body_sugar", 480, 0, !0, !0, void 0, !0).then((m) => {
        d.attr({ src: m.url }).style({ opacity: "1" }).on("load", m.dispose);
      });
      function h() {
        if (p) return;
        ((p = new Html("div").style({
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          gap: "6px",
        })),
          c.qs(".modal-body")?.prepend(p));
      }
      function f(m) {
        if (p.elm.children.length > 0) p.append(new Html("span").text("•").style({ margin: "0 2px" }));
        p.append(m);
      }
      let p,
        g = t.creator.trim();
      if (g != "") {
        h();
        let m = new Html("div").style({
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            gap: "6px",
            color: "var(--label)",
          }),
          A = new Html("span")
            .style({ width: "24px", height: "24px", display: "block" })
            .html(SVG_ICONS.pencil);
        (m.appendMany(A, new Html("span").text(g)), f(m));
      }
      if (n)
        (h(),
          f(
            new Html("span")
              .style({
                color: "black",
                padding: "4px 8px",
                "background-image": SVG_ICONS.bg_special,
                "background-size": "100% 100%",
              })
              .text(translate("Mii Creator Special Mii")),
          ));
      c.qs(".modal-body")?.prepend(d);
    };
