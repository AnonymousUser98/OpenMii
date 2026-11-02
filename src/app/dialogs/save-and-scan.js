// src/app/dialogs/save-and-scan.js
// "Save this Mii?" prompt, QR scanner dialog, random NNID Mii.
//
// Defines: openQRScanner, createRandomNNIDMii
// Uses from other files:
//   app/qr/mii-qr.js: n9, CH, listQRCameras, setupQRCamera, hm
//   app/library/library.js: renderMiiIcon, getRefreshLibrary, libraryApiRequest, openLibrary
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/mii/mii.js: Mii
//   app/ui/modal.js: Modal
//   app/shaders/shader-registry.js: getRendererSetting
//   app/config.js: APP_CONFIG
//   app/settings/settings.js: getSetting
//   app/renderer/render-scene.js: MiiRenderScene
//   app/dialogs/look-alike.js: Loader
//   app/dialogs/create-mii.js: openCreateMiiDialog
//   … and 1 more files

var translate = getTranslator();
async function cv(e, t, r, n = !1, i = !1, o = !1) {
  return new Promise(async (s) => {
    var a = Modal.modal(
      r,
      "",
      "body",
      {
        text: "Cancel",
        callback(g) {
          if (p) p.shutdown();
          s(!1);
        },
      },
      {
        text: translate("Don't Save"),
        callback(g) {
          if (p) p.shutdown();
          s(!1);
        },
      },
      {
        text: translate("Save"),
        async callback(g) {
          let m = null;
          if (!i) {
            if (((m = await libraryApiRequest(1, e.exportBase64("miic"))), m === null || m === void 0)) return;
          }
          if (n !== !0)
            if ((getRefreshLibrary()(), m)) openLibrary(m.id);
            else openLibrary();
          if (p) p.shutdown();
          ((p = null), s(!0));
        },
      },
    );
    (a.qs(".modal-content").styleJs({ maxWidth: "100%", maxHeight: "100%" }),
      a.qs(".modal-body span").cleanup());
    let l = a.qs(".modal-body .flex-group"),
      c = new Html("div").class("sparkle-container").style({ "--size": "20px" });
    (a.qs(".modal-body").append(c), a.qs(".modal-body").style({ position: "relative" }));
    let u = await getRendererSetting("cutsceneSkipN"),
      d,
      h;
    if (u)
      ((d = await renderMiiIcon(
        e,
        "import",
        "all_body_sugar",
        260,
        void 0,
        void 0,
        void 0,
        void 0,
        !0,
        o ? "switch" : void 0,
      )),
        (h = new Html("img")
          .attr({ src: d.url })
          .on("load", (await d).dispose)
          .style({
            width: "260px",
            height: "260px",
            "object-fit": "contain",
            margin: "-16px -18px",
          })));
    else
      h = new Html("div")
        .class("cutscene-holder")
        .style({ width: "260px", height: "260px", "object-fit": "contain", margin: "-16px -18px" });
    let f = new Html("div")
      .class("flex-list", "col")
      .appendMany(
        new Html("span").style({ "font-size": "20px" }).text(translate("%1 has arrived!", e.nickname)),
        new Html("small").style({ margin: "0" }).text(t),
        new Html("span").text(translate("Do you want to save this Mii?")),
        l,
      );
    if (!u) f.style({ "align-items": "center", opacity: "0", transition: "opacity 0.5s linear" });
    else f.style({ "align-items": "center" });
    a.qs(".modal-body").style({ "align-items": "center", gap: "1.5rem" }).prependMany(f, h);
    let p;
    if (!u) {
      let g = a.qs(".cutscene-holder");
      ((p = new MiiRenderScene(e, 1, o ? "switch" : void 0)),
        await p.perform(g),
        hm(c.elm, 7),
        f.style({ opacity: "1" }));
    }
  });
}
var translate = getTranslator(),
  openQRScanner = async () => {
    let e = !0,
      t = Modal.modal(translate("Scan QR Code"), "", "body", {
        text: "Cancel",
        callback: () => {
          if ((t.qs("#stop-camera").elm.click(), e)) openCreateMiiDialog();
        },
      }),
      r = t.qs(".modal-body");
    if (
      (t
        .qs(".modal-body")
        .qsa("*")
        .forEach((i) => i.cleanup()),
      t.qs(".modal-content")?.styleJs({ maxHeight: "100%", maxWidth: "600px" }),
      r.appendMany(
        new Html("div")
          .classOn("col")
          .appendMany(
            new Html("span").attr({ for: "cam-list" }).text(translate("Select camera:")),
            new Html("select")
              .id("cam-list")
              .appendMany(
                new Html("option")
                  .attr({ value: "environment", selected: "yes" })
                  .text(translate("Back Camera (default)")),
                new Html("option").attr({ value: "user" }).text(translate("User/Front Facing Camera")),
                new Html("option")
                  .attr({ value: "device-camera", disabled: !0 })
                  .text(translate("(Open the camera for more options)")),
              ),
            new Html("div")
              .class("flex-group")
              .appendMany(
                new Html("button").id("start-camera").text(translate("Start camera")),
                new Html("button").id("stop-camera").text(translate("Stop camera")),
              ),
            new Html("video").id("qr-video").styleJs({ maxWidth: "100%" }),
            new Html("span").id("file-upload").text(translate("Or upload an image:")),
            new Html("input").attr({ type: "file", id: "file-input", accept: "image/*" }),
          ),
      ),
      listQRCameras(r.qs("#cam-list").elm),
      setupQRCamera(
        r.qs("#cam-list").elm,
        r.qs("#start-camera").elm,
        r.qs("#stop-camera").elm,
        r.qs("#file-input").elm,
      ),
      (await getSetting("allowQrCamera")) === !1)
    )
      (r
        .qsa('span[for="cam-list"], #cam-list, .flex-group, video')
        .forEach((i) => i.style({ display: "none" })),
        r.qs("video").style({ position: "fixed" }),
        r.qs("span#file-upload").text(
          translate(`Camera is disabled in settings.

Upload an image:`),
        ));
    async function n(i, o, s, a = !0) {
      if (await getSetting("autoCloseQrScan")) ((e = !1), t.qs(".modal-header button")?.elm.click());
      return await cv(i, o, s || translate("Mii QR Scanned"), !0, !0, a);
    }
    CH(async (i) => {
      if (!i || i.length === 0) return;
      let o = [];
      for (let { data: s, type: a } of i)
        try {
          let l,
            c = !1;
          switch (a) {
            case 0:
              if (((l = new Mii(s)), (c = await n(l, translate("3DS/Wii U QR Code"), void 0)), c))
                o.push(l.exportBase64("miic"));
              break;
            case 1:
              if (((l = new Mii(s)), (c = await n(l, translate("Tomodachi Life QR Code"), void 0)), c))
                o.push(l.exportBase64("miic"));
              break;
            case 2:
              if (((l = new Mii(s)), (c = await n(l, translate("Mii Creator QR Code"), void 0)), c))
                o.push(l.exportBase64("miic"));
              break;
            case 3:
              if (((l = new Mii(s)), (c = await n(l, translate("Switch 2 QR Code"), void 0)), c))
                o.push(l.exportBase64("miic"));
              break;
          }
        } catch (l) {
          n9(
            translate(`An error occurred when reading the data.
Please check the console for more information.`),
          );
        }
      if (o.length > 0) {
        try {
          await libraryApiRequest(5, o);
        } catch (s) {}
        (await getRefreshLibrary()(), openLibrary());
      }
    });
  };
var createRandomNNIDMii = async () => {
  Loader.show();
  let e = await fetch(APP_CONFIG.apis.nnidRandomURL).then((t) => t.json());
  (Loader.hide(),
    getRefreshLibrary()(),
    new MiiEditor(
      0,
      async (t, r) => {
        if (r === !0) await libraryApiRequest(1, t);
        openLibrary();
      },
      e.data,
    ));
};
