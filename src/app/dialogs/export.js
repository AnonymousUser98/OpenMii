// src/app/dialogs/export.js
// Export dialog: .miic/FFSD/QR/studio formats, render-image export.
//
// Defines: getUnsupportedFFSDFeatures, openExportDialog, BH, exportMiiFile, ece, FH,
//          openRenderImageDialog, tce, openChoiceDialog, PH
// Uses from other files:
//   app/mii/colors.js: wm, COMMON_TO_LEGACY_HAIR_COLOR, COMMON_TO_LEGACY_EYE_COLOR,
//                      COMMON_TO_LEGACY_MOUTH_COLOR, COMMON_TO_LEGACY_GLASS_COLOR,
//                      SKIN_TO_LEGACY_SKIN, vA, LEGACY_HAIR_COLOR_TO_COMMON,
//                      LEGACY_EYE_COLOR_TO_COMMON, LEGACY_MOUTH_COLOR_TO_COMMON,
//                      LEGACY_GLASS_COLOR_TO_COMMON
//   app/mii/formats/charinfo.js: WII_MAX_FACELINE_TYPE, WII_MAX_HAIR_TYPE, WII_MAX_EYE_TYPE,
//                                WII_MAX_GLASS_TYPE, WII_MAX_NOSE_TYPE, WII_MAX_MOUTH_TYPE,
//                                WII_MAX_MUSTACHE_TYPE, WII_MAX_BEARD_TYPE
//   app/ui/components.js: BA, FA, DA, NA, orderItems
//   app/ui/modal.js: defaultModalButtons, closeModal, Modal
//   app/renderer/mii-model.js: getAdditionalInfo, getSharedRenderer, createMiiModel
//   app/util/download.js: downloadURL, downloadBlob
//   app/renderer/ffl-resources.js: getFFLModule, Pd
//   app/qr/mii-qr.js: gH, xH
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/items/item-lists.js: HAT_MODEL_INFO
//   app/util/random.js: range
//   … and 14 more files

var localforage = In(Hs(), 1);
var translate = getTranslator();
async function getUnsupportedFFSDFeatures(e) {
  let t = [];
  if (e.facelineType > WII_MAX_FACELINE_TYPE) t.push("facelineType");
  if (e.hairType > WII_MAX_HAIR_TYPE) t.push("hairType");
  if (e.eyeType > WII_MAX_EYE_TYPE) t.push("eyeType");
  if (e.noseType > WII_MAX_NOSE_TYPE) t.push("noseType");
  if (e.mouthType > WII_MAX_MOUTH_TYPE) t.push("mouthType");
  if (e.mustacheType > WII_MAX_MUSTACHE_TYPE) t.push("mustacheType");
  if (e.beardType > WII_MAX_BEARD_TYPE) t.push("beardType");
  if (e.glassType > WII_MAX_GLASS_TYPE) t.push("glassType");
  return new Promise(async (r) => {
    if (t.length === 0) return r(e);
    let n = Pd(),
      i = await renderMiiIcon(e, "", "fflmakeicon", 164, 0, !0);
    async function o() {
      let x = await renderMiiIcon(s, "", "fflmakeicon", 164, 0, !0);
      g.attr({ src: x.url }).on("load", x.dispose);
    }
    let s = new Mii(e.export("ffsd"));
    ((s.eyebrowAspect = 3), (s.eyeAspect = 3), (s.mouthAspect = 3));
    let a = Modal.modal(
        translate("Replace parts of Mii"),
        translate(
          "This Mii has parts incompatible with the Wii format. Please select replacements below.",
        ),
        "body",
        {
          text: "Cancel",
          callback(x) {
            r(void 0);
          },
        },
      ),
      l = a.qs(".modal-content"),
      c = a.qs(".modal-body");
    (l && l.style({ "max-height": "600px" }),
      c.qs("span") && c.qs("span").style({ "flex-shrink": "0" }),
      c.qs(".flex-group") && c.qs(".flex-group").cleanup());
    let u = new Html("div").class("flex-group").appendTo(c),
      d = new Html("div").class("flex-group", "col").appendTo(u),
      h = new Html("img").appendTo(d),
      f = new Html("div").appendTo(d),
      p = new Html("div").class("flex-group", "col").appendTo(u),
      g = new Html("img").appendTo(p),
      m = new Html("div").appendTo(p);
    (f.text(translate("Before")),
      m.text(translate("After")),
      h.style({ width: "164px", height: "164px" }),
      g.style({ width: "164px", height: "164px" }),
      h.attr({ src: i.url }).on("load", i.dispose),
      o());
    let A = {
      beardType: { key: "goatee", rearrange: null, max: WII_MAX_BEARD_TYPE + 1 },
      eyeType: { key: "eyes", rearrange: BA, max: WII_MAX_EYE_TYPE + 1 },
      facelineType: { key: "face", rearrange: null, max: WII_MAX_FACELINE_TYPE + 1 },
      glassType: { key: "glasses", rearrange: null, max: WII_MAX_GLASS_TYPE + 1 },
      hairType: { key: "hair", rearrange: NA, max: WII_MAX_HAIR_TYPE + 1 },
      mouthType: { key: "mouth", rearrange: FA, max: WII_MAX_MOUTH_TYPE + 1 },
      mustacheType: { key: "mustache", rearrange: null, max: WII_MAX_MUSTACHE_TYPE + 1 },
      noseType: { key: "nose", rearrange: DA, max: WII_MAX_NOSE_TYPE + 1 },
    };
    (translate("Select goatee..."),
      translate("Select eyes..."),
      translate("Select face..."),
      translate("Select glasses..."),
      translate("Select hair..."),
      translate("Select mouth..."),
      translate("Select mustache..."),
      translate("Select nose..."));
    let y = {};
    for (let x = 0; x < t.length; x++) y[A[t[x]].key] = !1;
    (t.forEach((x) => {
      let { key: b, rearrange: v, max: _ } = A[x],
        w = n[b].map((T, M) => ({ id: M, item: T })).slice(0, _);
      function S(T) {
        if (T.target.closest(".popup-overlay") === null)
          Html.qsa(".popup-overlay") !== null && Html.qsa(".popup-overlay").forEach((M) => M.cleanup());
      }
      if ((document.addEventListener("pointerdown", S), v !== null)) w = orderItems(w, v, null);
      var E = createDropdown(
        c,
        w,
        (T) => {
          ((y[b] = !0), (s[x] = parseInt(T)), o());
        },
        "",
        "300",
        translate(`Select ${b}...`),
      );
      E.style({ background: "var(--container)" });
    }),
      Html.from("body").style({
        "--eye-color": "#787880",
        "--icon-lip-color-top": "#780c0c",
        "--icon-lip-color-bottom": "#f00c08",
        "--icon-hair-tie": "#d21e14",
        "--icon-eyebrow-fill": "var(--text)",
        "--icon-hair-fill": "var(--text)",
        "--icon-facial-hair-fill": "#9b9b9b",
        "--icon-hat-fill": "#d21e14",
        "--icon-hat-stroke": "#630e09",
        "--icon-custom-hat-fill": "#d21e14",
        "--icon-custom-hat-stroke": "#630e09",
        "--icon-glasses-fill": "#787880",
        "--icon-glasses-shade": "#78788077",
      }),
      new Html("button")
        .text(translate("Done"))
        .on("click", () => {
          if (!Object.values(y).every((x) => x === !0)) return;
          (closeModal(a), r(s));
        })
        .appendTo(c));
  });
}
var openExportDialog = async (e, t, r) => {
  let n = Zp();
  Modal.modal(
    translate("Export Mii"),
    translate("How would you like to save the Mii?"),
    "body",
    { text: "Cancel" },
    {
      text: translate("Save Mii Creator data"),
      type: "primary",
      async callback() {
        let i = new Blob([t.export()]),
          o = URL.createObjectURL(i),
          s = document.createElement("a");
        ((s.href = o),
          (s.target = "_blank"),
          (s.download = t.nickname + ".miic"),
          document.body.appendChild(s),
          s.click(),
          requestAnimationFrame(() => {
            s.remove();
          }),
          setTimeout(() => {
            URL.revokeObjectURL(o);
          }, 2000));
      },
    },
    {
      text: translate("Download other file types..."),
      callback(i) {
        Modal.modal(
          translate("Other download types"),
          translate("Choose a file type to download"),
          "body",
          {
            text: "Cancel",
            callback(o) {
              openExportDialog(e, t, r);
            },
          },
          {
            text: translate("Download .CharInfo (Switch) file"),
            async callback() {
              let o = new Blob([t.export("switchCharInfo")]),
                s = URL.createObjectURL(o),
                a = document.createElement("a");
              ((a.href = s),
                (a.target = "_blank"),
                (a.download = t.nickname + ".charinfo"),
                document.body.appendChild(a),
                a.click(),
                requestAnimationFrame(() => {
                  a.remove();
                }),
                setTimeout(() => {
                  URL.revokeObjectURL(s);
                }, 2000));
            },
          },
          {
            text: translate("Download .FFSD (3DS/Wii U)"),
            async callback() {
              if (!(await confirmFFSDConversion(t))) return;
              let o = new Blob([t.export("ffsd")]),
                s = URL.createObjectURL(o),
                a = document.createElement("a");
              ((a.href = s),
                (a.target = "_blank"),
                (a.download = t.nickname + ".ffsd"),
                document.body.appendChild(a),
                a.click(),
                requestAnimationFrame(() => {
                  a.remove();
                }),
                setTimeout(() => {
                  URL.revokeObjectURL(s);
                }, 2000));
            },
          },
          {
            text: translate("Download .RCD (Wii)"),
            async callback() {
              let o = await getUnsupportedFFSDFeatures(t);
              if (o === void 0) return;
              let s = new Blob([o.export("rcd")]),
                a = URL.createObjectURL(s),
                l = document.createElement("a");
              ((l.href = a),
                (l.target = "_blank"),
                (l.download = t.nickname + ".rcd"),
                document.body.appendChild(l),
                l.click(),
                requestAnimationFrame(() => {
                  l.remove();
                }),
                setTimeout(() => {
                  URL.revokeObjectURL(a);
                }, 2000));
            },
          },
        );
      },
    },
    {
      text: translate("Download 3D model..."),
      async callback() {
        openModelExportDialog(t);
      },
    },
    {
      text: translate("Show other raw data formats"),
      async callback() {
        let i = Modal.modal(
          translate("Miscellaneous Output Formats"),
          translate("Click inside a code block to select it."),
          "body",
          ...defaultModalButtons(),
        );
        (i.qs(".modal-content span").style({ "flex-shrink": "0" }),
          i.qs(".modal-content").style({ "max-height": "100vh", "max-width": "600px" }),
          i
            .qs(".modal-body")
            .prependMany(
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("CharInfo/Switch data (Hex)")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportHex("switchCharInfo")),
              ),
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("Mii Creator data (Hex)")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportHex("miic")),
              ),
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("Mii Creator data (Base64)")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportBase64("miic")),
              ),
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("FFSD (Base64)")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportBase64("ffsd")),
              ),
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("FFSD (Hex)")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportHex("ffsd")),
              ),
              new Html("div").appendMany(
                new Html("span").class("h4").text(translate("Mii Studio data")),
                new Html("pre").class("pre-wrap", "mb-0").text(t.exportHex("studioData")),
              ),
            ));
      },
    },
  );
};
var BH = In(LH(), 1);
var exportMiiFile = async (e, t = "miic", r = 1) => {
    let n,
      i,
      o = t === "miic" ? e.export("ffsd_append_miic") : [],
      s;
    if (
      ((n = new Mii(e.export()).export("ffsd")),
      (n[12] = e.createId[0]),
      (i = gH(n)),
      (i = new Uint8Array([...i, ...o])),
      t === "switch")
    )
      s = await xH(i, e);
    else s = i;
    let a = BH.default.generatePNG(s, { margin: 0, modulesize: r }),
      l = new Image(431, 431);
    return (
      (l.src = URL.createObjectURL(await (await fetch(a)).blob())),
      new Promise((c) => {
        l.onload = () => c(l);
      })
    );
  },
  ece = async (e) => {
    let t = "";
    if (e === "miic") t = "./assets/images/bg_qr_miic.png";
    else if (e === "switch") t = "./assets/images/bg_qr_sw.png";
    else t = "./assets/images/bg_qr_wiiu.png";
    let r = await (await fetch(t)).blob(),
      n = new Image(1280, 720);
    return (
      (n.src = URL.createObjectURL(r)),
      new Promise((i) => {
        n.onload = () => i(n);
      })
    );
  };
var FH = async (e, t = !0, r) => {
  let n = new Mii(e.export()),
    i =
      n.beardColor === LEGACY_HAIR_COLOR_TO_COMMON[COMMON_TO_LEGACY_HAIR_COLOR[n.beardColor]] &&
      n.eyeColor === LEGACY_EYE_COLOR_TO_COMMON[COMMON_TO_LEGACY_EYE_COLOR[n.eyeColor]] &&
      n.eyebrowColor === LEGACY_HAIR_COLOR_TO_COMMON[COMMON_TO_LEGACY_HAIR_COLOR[n.eyebrowColor]] &&
      n.facelineColor === vA[SKIN_TO_LEGACY_SKIN[n.facelineColor]] &&
      n.glassColor === LEGACY_GLASS_COLOR_TO_COMMON[COMMON_TO_LEGACY_GLASS_COLOR[n.glassColor]] &&
      n.glassType === wm[n.glassType] &&
      n.hairColor === LEGACY_HAIR_COLOR_TO_COMMON[COMMON_TO_LEGACY_HAIR_COLOR[n.hairColor]] &&
      n.mouthColor === LEGACY_MOUTH_COLOR_TO_COMMON[COMMON_TO_LEGACY_MOUTH_COLOR[n.mouthColor]] &&
      n.facePaintColor === -1 &&
      n.hatType === -1 &&
      n.outfitType === -1 &&
      n.shirtColor === -1 &&
      n.pantsColor === -1 &&
      n.shoesColor === -1 &&
      n.eyeSclera === 0 &&
      n.eyeRColor === -1 &&
      n.eyeShine === -1,
    o = (() =>
      n.facePaintColor === -1 &&
      n.hatType === -1 &&
      n.outfitType === -1 &&
      n.shirtColor === -1 &&
      n.pantsColor === -1 &&
      n.eyeSclera === 0 &&
      n.hairTipColor === -1 &&
      n.acceType === -1 &&
      n.personality === -1 &&
      n.eyeRColor === -1 &&
      n.eyeShine === -1)(),
    s = "miic";
  if (o)
    ((s = "switch"), (n.special = 0), (n.favorite = 0), (n.transferred = 0), (n.personality = -1));
  if (i) s = "wiiu";
  let a,
    l = { y: 0, x: 0, width: 0, height: 0 },
    c = await renderMiiIcon(
      n,
      "qr_code",
      "all_body_sugar",
      2160,
      0,
      !0,
      !0,
      void 0,
      !0,
      s !== "miic" ? s : void 0,
      s === "wiiu" ? "wiiu" : s === "switch" ? "switch" : void 0,
    ),
    u = c.url,
    d = new Image(720, 720);
  ((d.src = u),
    (a = await new Promise((v) => {
      d.onload = () => (c.dispose(), v(d));
    })),
    (l = { x: -65, y: -54, width: 952, height: 952 }));
  let h = -64,
    f = await exportMiiFile(n, s),
    p = await ece(s),
    g = void 0,
    m = void 0;
  if (n.favorite === 1 || n.special === 1)
    g = await new Promise((v) => {
      var _ = new Image();
      if (
        ((_.onload = function () {
          v(_);
        }),
        n.favorite === 1)
      )
        _.src = "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.favorite_icon_normal);
      if (n.special === 1)
        _.src = "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.special_icon_normal);
    });
  if (n.creator.trim() !== "")
    m = await new Promise((v) => {
      var _ = new Image();
      ((_.onload = function () {
        v(_);
      }),
        (_.src = "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.pencil)));
    });
  let A = document.createElement("canvas");
  ((A.width = 1280), (A.height = 720));
  let y = A.getContext("2d");
  (y.drawImage(p, 0, 0),
    (y.font = '500 24px "NTLG", sans-serif'),
    (y.textAlign = "left"),
    (y.textBaseline = "top"),
    (y.fillStyle = "#cccccc"),
    y.fillText(`${location.origin}`, 32, 667),
    (y.font = '500 24px "NTLG", sans-serif'),
    (y.textAlign = "right"),
    (y.textBaseline = "top"),
    (y.fillStyle = "#cccccc"),
    y.fillText(`Made with Mii Creator ${APP_CONFIG.version.string()}`, 1248, 667),
    y.drawImage(a, l.x, l.y, l.width, l.height),
    (y.fillStyle = "#ffffff"),
    y.beginPath(),
    y.roundRect(h + 769, 79, 463, 463, [16, 16, 0, 0]),
    y.fill(),
    (y.imageSmoothingEnabled = !1),
    y.drawImage(f, h + 797, 107, 408, 408),
    (y.imageSmoothingEnabled = !0),
    (y.fillStyle = "#707070"),
    y.beginPath(),
    y.roundRect(h + 769, 542, 463, 99, [0, 0, 16, 16]));
  let x = "#ffffff";
  if (r) {
    let v = h + 769,
      _ = 542,
      w = 463,
      S = 99,
      E = y.createLinearGradient(v - 32.88725, 536.0577, v + 463 + 42.13125, 677.4315);
    (E.addColorStop(0, "#F4AD00"),
      E.addColorStop(0.29, "#FADF00"),
      E.addColorStop(0.665, "#FCE200"),
      E.addColorStop(1, "#EC7900"),
      (y.fillStyle = E),
      (y.strokeStyle = "#FC9700"),
      (y.lineWidth = 6),
      y.save(),
      y.clip(),
      (y.lineWidth *= 2),
      y.fill(),
      y.stroke(),
      y.restore(),
      (x = "#000000"));
  } else y.fill();
  if (g) y.drawImage(g, h + 1172, 480, 102, 102);
  if (m)
    ((y.font = '500 24px "NTLG", sans-serif'),
      (y.textAlign = "right"),
      (y.textBaseline = "middle"),
      (y.fillStyle = "#000000"),
      y.fillText(n.creator, h + 1189, 44),
      y.drawImage(m, h + 1197, 24, 28.27, 36.4));
  return (
    (y.fillStyle = x),
    (y.textAlign = "center"),
    (y.textBaseline = "middle"),
    (y.font = '500 38px "NTLG", sans-serif'),
    y.fillText(n.nickname, h + 1005, 591),
    A.toDataURL("png", 100)
  );
};
var translate = getTranslator(),
  openRenderImageDialog = async (e, t) => {
    let r = {
      data: t.export("studioData"),
      module: getFFLModule(),
      renderer: getSharedRenderer(),
      characterYRotate: 0,
      expression: 0,
      modelFlag: 0,
      size: 1440,
      additionalInfo: getAdditionalInfo(t),
    };
    Modal.modal(
      translate("Render options: %1", t.nickname),
      translate("Choose a way to render this Mii"),
      "body",
      {
        text: translate("Focus on head"),
        async callback() {
          let n = await createMiiModel({ ...r, type: ViewType.Face, drawBody: !0 });
          downloadBlob(
            n.result,
            translate("%1_render_headshot_%2.png", t.nickname, /*@__PURE__*/ new Date().toJSON()),
          );
        },
      },
      {
        text: translate("Focus on full body"),
        async callback() {
          let n = await createMiiModel({ ...r, type: ViewType.AllBodySugar, drawBody: !0 });
          downloadBlob(n.result, translate("%1_render_body_%2.png", t.nickname, /*@__PURE__*/ new Date().toJSON()));
        },
      },
      {
        text: translate("Full body with pose"),
        async callback() {
          function n(_) {
            if (_.target.closest(".popup-overlay") === null)
              Html.qsa(".popup-overlay") !== null &&
                Html.qsa(".popup-overlay").forEach((w) => w.cleanup());
          }
          document.addEventListener("pointerdown", n);
          let i = Modal.modal(
              translate("Full body with pose"),
              translate("Loading..."),
              "body",
              {
                text: "Cancel",
                type: "danger",
                callback() {
                  (document.removeEventListener("pointerdown", n), h.forEach((_) => _.dispose()));
                },
              },
              {
                text: translate("Export"),
                type: "primary",
                async callback() {
                  (document.removeEventListener("pointerdown", n), h.forEach((T) => T.dispose()));
                  let _ = await createMiiModel({
                    ...r,
                    type: ViewType.AllBodySugar,
                    expression: p.expression,
                    pose: p.pose,
                    drawBody: !0,
                  });
                  var w = new Image(),
                    S = URL.createObjectURL(_.result);
                  ((w.src = S),
                    await new Promise((T) => {
                      w.onload = () => {
                        T();
                      };
                    }));
                  let E = await $f(w);
                  (URL.revokeObjectURL(S),
                    downloadURL(
                      E,
                      translate(
                        "%1_render_full_body_%2.png",
                        t.nickname,
                        /*@__PURE__*/ new Date().toJSON(),
                      ),
                    ));
                },
              },
            ),
            o = getShaderMaterialClass(),
            s = range(82 - 1),
            a = await getFFLModule()?.createFace(
              t,
              getSharedRenderer(),
              null,
              256,
              o,
              t.hatType > -1 ? (HAT_MODEL_INFO[t.hatType].mdlType === 1 ? 2 : 0) : 0,
              s,
              !1,
              void 0,
            ),
            l = getDefaultBodyModelName(),
            c = [];
          for (let _ = 0; _ < Ma[l].count; _++) {
            let w = "Pose." + (_ + 1).toString().padStart(2, "0"),
              S = await createMiiModel({
                data: t.export("studioData"),
                charModel: a,
                drawBody: !0,
                type: ViewType.AllBodySugar,
                expression: 0,
                pose: w,
                module: getFFLModule(),
                renderer: getSharedRenderer(),
                size: 360,
                additionalInfo: getAdditionalInfo(t),
                preferPromise: !0,
              }),
              E = URL.createObjectURL(S.result);
            var u = new Image(360, 360);
            u.src = E;
            let T = await new Promise((M) => {
              u.onload = async () => {
                M(await $f(u));
              };
            });
            c.push({ url: T, id: w });
          }
          let d = c
              .map((_) => ({
                id: String(_.id),
                item: `<img height=127 src="${_.url}" style="pointer-events:none">`,
              }))
              .filter((_) => _ !== void 0),
            h = [];
          for (let _ in EXPRESSIONS) {
            let w = await createMiiModel({
                data: t.export("studioData"),
                charModel: a,
                drawBody: !1,
                type: ViewType.MakeIcon,
                expression: EXPRESSIONS[_].id,
                module: getFFLModule(),
                renderer: getSharedRenderer(),
                size: 96,
                additionalInfo: getAdditionalInfo(t),
              }),
              S = URL.createObjectURL(w.result);
            h.push({
              url: S,
              dispose() {
                URL.revokeObjectURL(S);
              },
              name: EXPRESSIONS[_].name,
              id: EXPRESSIONS[_].id,
            });
          }
          let f = h
              .map((_) => ({
                id: String(_.id),
                item: `<img width=96 height=96 src="${_.url}" title="${_.name}" style="margin:-10px;pointer-events:none">`,
              }))
              .filter((_) => _ !== void 0),
            p = { expression: 0, pose: "Pose.01", trimImage: !0 };
          i.qs(".modal-content").style({ "max-height": "100vh" });
          let g = i.qs(".modal-body .flex-group").elm,
            m = new Html("div"),
            A = new Html("div").class("col").appendTo(m),
            y = new Html("div").class("input-group").appendTo(A);
          (y.append(new Html("span").text(translate("Pose"))),
            createDropdown(
              y,
              d,
              (_) => {
                p.pose = _;
              },
              String(p.expression),
              "180px",
              "?",
            ));
          let x = new Html("div").class("input-group").appendTo(A);
          (x.append(new Html("span").text(translate("Expression"))),
            createDropdown(
              x,
              f,
              (_) => {
                let w = parseInt(_);
                p.expression = w;
              },
              String(p.expression),
              "180px",
              "?",
            ));
          let b = new Html("div")
              .class("flex-group")
              .style({ "justify-content": "flex-start" })
              .appendTo(A),
            v = Math.random();
          (b.appendMany(
            new Html("input")
              .attr({ type: "checkbox", id: v, ...(p.trimImage && { checked: !0 }) })
              .on("change", (_) => {
                let w = _.target.checked;
                p.trimImage = w;
              }),
            new Html("label").attr({ for: v }).text(translate("Trim image")),
          ),
            A.append(
              new Html("small")
                .style({ margin: "-12px 0 -6px 0" })
                .text(translate("Cut out the transparent area of the render.")),
            ),
            i.qs(".modal-body").elm.insertBefore(m.elm, g),
            i.qs(".modal-body span").text(translate("Choose a pose and expression.")));
        },
      },
      {
        text: translate("Head only"),
        async callback() {
          let n = await createMiiModel({ ...r, type: ViewType.MakeIcon, drawBody: !1 });
          downloadBlob(
            n.result,
            translate("%1_render_head_only_%2.png", t.nickname, /*@__PURE__*/ new Date().toJSON()),
          );
        },
      },
      { text: "Cancel" },
    );
  };
var tce =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>';
async function openChoiceDialog(e, t, r, n = 2) {
  let i = getTranslator(),
    o = [];
  return new Promise((s) => {
    let l = Modal.modal(
        e,
        null,
        "body",
        {
          callback() {
            s([]);
          },
          text: "Cancel",
        },
        {
          callback() {
            let u = [];
            (o.forEach((d, h) => {
              if (!d) return;
              u.push(r[h]);
            }),
              s(u));
          },
          text: i("OK"),
        },
      ).qs(".modal-body"),
      c = new Html("div").class("flex-group").style({ "max-width": "460px" }).prependTo(l);
    new Html("span").prependTo(l).text(t);
    for (let u = 0; u < r.length; u++) {
      let p = function () {
          if (o[d]) (h.classOn("active"), f.style({ display: "flex" }));
          else (h.classOff("active"), f.style({ display: "none" }));
        },
        d = u,
        h = new Html("div").class("chip").text(r[u]),
        f = new Html("span").html(tce).appendTo(h).style({ display: "none" });
      (h.on("click", () => {
        let g = o.filter(Boolean).length;
        if (o[d]) o[d] = !1;
        else {
          if (g >= n) return;
          o[d] = !0;
        }
        p();
      }),
        p(),
        h.appendTo(c));
    }
  });
}
async function PH(e, t, r) {
  let n = {
      data: r.export("studioData"),
      module: getFFLModule(),
      renderer: getSharedRenderer(),
      characterYRotate: 0,
      expression: 0,
      modelFlag: 0,
      size: 1440,
      additionalInfo: getAdditionalInfo(r),
    },
    i = getTranslator();
  return new Promise(async (o) => {
    let s = [];
    function a(_) {
      if (_.target.closest(".popup-overlay") === null)
        Html.qsa(".popup-overlay") !== null && Html.qsa(".popup-overlay").forEach((w) => w.cleanup());
    }
    document.addEventListener("pointerdown", a);
    let l = Modal.modal(
        e,
        i("Loading..."),
        "body",
        {
          text: "Cancel",
          type: "danger",
          callback() {
            (document.removeEventListener("pointerdown", a),
              s.forEach((_) => _.dispose()),
              o(null));
          },
        },
        {
          text: i("Export"),
          type: "primary",
          async callback() {
            (document.removeEventListener("pointerdown", a), s.forEach((T) => T.dispose()));
            let _ = await createMiiModel({
              ...n,
              type: ViewType.SugarTilt,
              expression: m.expression,
              pose: m.pose,
              drawBody: !0,
            });
            var w = new Image(),
              S = URL.createObjectURL(_.result);
            ((w.src = S),
              await new Promise((T) => {
                w.onload = () => {
                  T();
                };
              }));
            let E = await $f(w, !0);
            (URL.revokeObjectURL(S), o(E));
          },
        },
      ),
      c = getShaderMaterialClass(),
      u = range(82 - 1),
      d = await getFFLModule()?.createFace(
        r,
        getSharedRenderer(),
        null,
        256,
        c,
        r.hatType > -1 ? (HAT_MODEL_INFO[r.hatType].mdlType === 1 ? 2 : 0) : 0,
        u,
        !1,
        void 0,
      ),
      h = getDefaultBodyModelName(),
      f = Ma[h]?.count || 1,
      p = range(f + 1)
        .slice(1)
        .map((_) => {
          let w = "Pose." + _.toString().padStart(2, "0");
          return {
            id: w,
            item: `<img height="127" src="./assets/images/poses/${h}/${r.gender}/${w}.webp" style="pointer-events:none">`,
          };
        });
    for (let _ in EXPRESSIONS) {
      let w = await createMiiModel({
          data: r.export("studioData"),
          charModel: d,
          drawBody: !1,
          type: ViewType.MakeIcon,
          expression: EXPRESSIONS[_].id,
          module: getFFLModule(),
          renderer: getSharedRenderer(),
          size: 96,
          additionalInfo: getAdditionalInfo(r),
        }),
        S = URL.createObjectURL(w.result);
      s.push({
        url: S,
        dispose() {
          URL.revokeObjectURL(S);
        },
        name: EXPRESSIONS[_].name,
        id: EXPRESSIONS[_].id,
      });
    }
    let g = s
        .map((_) => ({
          id: String(_.id),
          item: `<img width="96" height="96" src="${_.url}" title="${_.name}" style="margin:-10px;pointer-events:none">`,
        }))
        .filter((_) => _ !== void 0),
      m = { expression: 0, pose: "Pose.01" };
    l.qs(".modal-content").style({ "max-height": "100vh" });
    let A = l.qs(".modal-body .flex-group").elm,
      y = new Html("div"),
      x = new Html("div").class("col").appendTo(y),
      b = new Html("div").class("input-group").appendTo(x);
    (b.append(new Html("span").text(i("Pose"))),
      createDropdown(
        b,
        p,
        (_) => {
          m.pose = _;
        },
        m.pose,
        "180px",
        "?",
      ));
    let v = new Html("div").class("input-group").appendTo(x);
    (v.append(new Html("span").text(i("Expression"))),
      createDropdown(
        v,
        g,
        (_) => {
          let w = Number(_);
          m.expression = w;
        },
        String(m.expression),
        "180px",
        "?",
      ),
      l.qs(".modal-body").elm.insertBefore(y.elm, A),
      l.qs(".modal-body span").text(t));
  });
}
