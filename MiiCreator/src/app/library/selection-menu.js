// src/app/library/selection-menu.js
// Library multi-select actions and new-Mii style picker.
//
// Defines: openSelectionActionsMenu, chooseNewMiiStyle
// Uses from other files:
//   app/library/library.js: renderMiiIcon, getRefreshLibrary, libraryApiRequest
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/mii/mii.js: Mii
//   app/ui/modal.js: Modal
//   app/shaders/shader-registry.js: getRendererSetting
//   app/export/model-export.js: openModelExportDialog
//   app/dialogs/create-mii.js: openCreateMiiDialog
//   app/editor/editor.js: MiiEditor

function openSelectionActionsMenu(e, t) {
  let r = getTranslator(),
    n = r("What do you want to do?"),
    i = !1;
  for (let o of e.values()) if (o.isGroup) i = !0;
  if (i)
    n = r(`What do you want to do?
Some actions are unavailable when selecting groups.`);
  Modal.modal(
    r("%1 selected...", e.size),
    n,
    "body",
    { text: "Cancel" },
    { text: r("Stop selecting") },
    ...(!i
      ? [
          {
            text: r("Batch 3D export"),
            callback(o) {
              let s = Array.from(e.values()).map((l) => new Mii(l.data)),
                a = s.shift();
              openModelExportDialog(a, s);
            },
          },
          {
            text: r("Delete"),
            async callback(o) {
              if (
                !(await Modal.prompt(
                  r("Warning"),
                  r(
                    "Are you sure you want to delete this selection of Miis? This action is IRREVERSIBLE!",
                  ),
                  "body",
                  !0,
                ))
              )
                return;
              let a = [];
              for (let l of e.values()) (a.push(l.id), l.html.cleanup());
              await libraryApiRequest(6, a);
            },
          },
        ]
      : []),
  );
}
var translate = getTranslator(),
  chooseNewMiiStyle = (e = !1) =>
    new Promise(async (t) => {
      function r(d) {
        return () => {
          (getRefreshLibrary()(),
            new MiiEditor(
              d,
              async (h, f) => {
                if (f === !0)
                  libraryApiRequest(1, h)
                    .then((p) => {
                      t(p);
                    })
                    .catch((p) => {
                      t(void 0);
                    });
                else t(void 0);
              },
              void 0,
              void 0,
              !e,
            ));
        };
      }
      let n = await getRendererSetting("bodyModelN"),
        i = "Pose.01";
      if (n === "miitomo") i = "Pose.237";
      let o = "Pose.01";
      if (n === "miitomo") o = "Pose.230";
      let s = await renderMiiIcon(
          new Mii(
            "0800400308040402020c0301060406020a0000000000000804000a0100214004000214031304170d04000a040109",
          ),
          "",
          "all_body_sugar",
          480,
          0,
          !0,
          !0,
          i,
          !0,
        ),
        a = await renderMiiIcon(
          new Mii(
            "0800400308030404020c0301060400020a0000000000010804000a01000c4004000214031304170d04000a040109",
          ),
          "",
          "all_body_sugar",
          480,
          0,
          !0,
          !0,
          o,
          !0,
        );
      var l = Modal.modal(
        translate("Create Mii"),
        translate("Select a style for your Mii."),
        "body",
        { text: translate("Male"), callback: r(0) },
        { text: translate("Female"), callback: r(1) },
        ...(!e
          ? [
              {
                text: "Cancel",
                callback: () => {
                  openCreateMiiDialog();
                },
              },
            ]
          : []),
      );
      let c = l.qs(".modal-body button:nth-child(1)"),
        u = l.qs(".modal-body button:nth-child(2)");
      if (c)
        (c.text(""),
          c.classOn("style-select-btn"),
          c.style({ overflow: "clip" }),
          c.append(
            new Html("img")
              .attr({ src: s.url })
              .style({
                width: "240px",
                height: "240px",
                margin: "-35px -75px -15px -75px",
                "pointer-events": "none",
              })
              .on("load", () => {
                s.dispose();
              }),
          ));
      if (u)
        (u.text(""),
          u.classOn("style-select-btn"),
          u.style({ overflow: "clip" }),
          u.append(
            new Html("img")
              .attr({ src: a.url })
              .style({
                width: "240px",
                height: "240px",
                margin: "-35px -75px -15px -75px",
                "pointer-events": "none",
              })
              .on("load", () => {
                a.dispose();
              }),
          ));
      new Html("span")
        .text(translate("Some apps may use style as a gender indicator."))
        .appendTo(l.qs(".modal-body"));
    });
