// src/app/dialogs/create-mii.js
// "Create Mii" dialog (blank, random, look-alike, QR, NNID...).
//
// Defines: openCreateMiiDialog
// Uses from other files:
//   app/dialogs/look-alike.js: openLookAlikeDialog, openNNIDLookup, Ok
//   app/library/library.js: getRefreshLibrary, libraryApiRequest, openLibrary
//   app/util/colors-and-bytes.js: bytesToBase64, decodeHexOrBase64
//   app/dialogs/save-and-scan.js: openQRScanner, createRandomNNIDMii
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   app/ui/modal.js: Modal
//   app/library/selection-menu.js: chooseNewMiiStyle

var translate = getTranslator(),
  s9 = !1;
function bh() {
  s9 = !1;
}
var openCreateMiiDialog = () => {
  if (s9) return;
  s9 = !0;
  let e = Modal.modal(
    translate("Create Mii"),
    translate("How would you like to create the Mii?"),
    "body",
    {
      text: translate("From Scratch"),
      type: "primary",
      callback: () => {
        (chooseNewMiiStyle(!1).then((r) => openLibrary()), bh());
      },
    },
    {
      text: translate("QR Code"),
      callback: () => {
        (openQRScanner(), bh());
      },
    },
    {
      text: translate("Mii data file"),
      callback: () => {
        bh();
        let r = Modal.modal(
          translate("Mii data files import"),
          "",
          "body",
          {
            text: "Cancel",
            callback: () => {
              openCreateMiiDialog();
            },
          },
          {
            text: "Confirm",
            callback() {
              openLibrary();
            },
          },
        );
        (r
          .qsa(".modal-body .flex-group,.modal-body span")
          .forEach((n) => n.style({ display: "none" })),
          r.qs(".modal-body").appendMany(
            new Html("span").text(
              translate(
                "Import Mii data file(s) here. Supported formats: .ffsd/.cfsd, .miic, .charinfo, .rsd",
              ),
            ),
            new Html("input")
              .attr({
                type: "file",
                accept:
                  ".ffsd,.cfsd,.charinfo,.rsd,.rcd,.miic,.mii,.miigx,.cfcd,.ufsd,.mnms,.nfcd,",
                multiple: "on",
              })
              .style({ margin: "auto" })
              .on("change", async (n) => {
                let i = n.target,
                  o = new FileReader(),
                  s = 0;
                function a(c) {
                  return new Promise((u) => {
                    (o.readAsArrayBuffer(c),
                      (o.onload = async () => {
                        try {
                          let d = new Uint8Array(o.result),
                            h = new Mii(d),
                            f = bytesToBase64(h.export("miic"));
                          (l.push(f), s++);
                        } catch (d) {
                        } finally {
                          u();
                        }
                      }));
                  });
                }
                let l = [];
                for (let c of Array.from(i.files))
                  try {
                    await a(c).catch((u) => {
                      throw u;
                    });
                  } catch (u) {
                    (Modal.alert(translate("Error"), translate("Invalid Mii data: %1", u)), (i.value = ""));
                    continue;
                  }
                if (s > 0) (getRefreshLibrary()(), r.qs(".modal-body button").elm.click(), await libraryApiRequest(5, l));
              }),
          ));
      },
    },
    {
      text: translate("Raw Mii data"),
      callback: async () => {
        bh();
        let r = await Modal.input(
          translate("Raw Mii data import"),
          translate("Paste raw Mii data here."),
          translate("Hex/Base64 data"),
          "body",
        );
        if (r === !1) return;
        let n = [];
        if (r.includes(",")) {
          let o = r.split(",").filter((s) => s.trim() !== "");
          n.push(...o);
        } else n.push(r);
        let i = [];
        for (let o of n) {
          let s = decodeHexOrBase64(o),
            a = new Mii(s),
            l = bytesToBase64(a.export("miic"));
          i.push(l);
        }
        (await libraryApiRequest(5, i), getRefreshLibrary()(), openLibrary());
      },
    },
    {
      text: translate("Enter NNID/PNID"),
      callback: () => {
        (bh(),
          Modal.modal(
            translate("Enter NNID/PNID"),
            translate("Select a service to look up"),
            "body",
            { text: "Cancel" },
            {
              text: translate("Enter NNID"),
              callback(r) {
                openNNIDLookup();
              },
            },
            {
              text: translate("Enter Pretendo Network ID"),
              callback(r) {
                Ok();
              },
            },
          ));
      },
    },
    {
      text: translate("Choose a look-alike"),
      callback: () => {
        (bh(), openLookAlikeDialog());
      },
    },
    {
      text: translate("Random NNID"),
      callback: () => {
        (bh(), createRandomNNIDMii());
      },
    },
    {
      text: "Cancel",
      callback(r) {
        bh();
      },
    },
  );
  e.qs(".modal-body").styleJs({ maxWidth: "760px" });
  let t = [
    SVG_ICONS.main_menu_create_sm,
    SVG_ICONS.main_menu_qr,
    SVG_ICONS.main_menu_file,
    SVG_ICONS.main_menu_data,
    SVG_ICONS.main_menu_network,
    SVG_ICONS.main_menu_group,
    SVG_ICONS.main_menu_random,
  ];
  e.qsa(".modal-body button").forEach((r, n) => {
    if (r) {
      if (t[n]) r.prepend(new Html("span").style({ display: "inline-flex" }).html(t[n]));
    }
  });
};
