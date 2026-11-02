// src/app/ui/modal.js
// Modal dialogs: Modal.modal(), Modal.alert(), Modal.prompt(), Modal.input().
//
// Defines: defaultModalButtons, disableModalInputs, closeModal, Modal
// Uses from other files:
//   app/ui/components.js: addButtonSounds, g7
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/i18n/localization.js: getTranslator

var translate = getTranslator(),
  defaultModalButtons = () => [
    { callback() {}, text: "Cancel" },
    { callback() {}, text: translate("OK") },
  ];
function disableModalInputs(e) {
  e.qs(".modal-body")
    .qsa("*")
    .forEach((t) => t.attr({ disabled: !0, tabindex: "-1" }));
}
function closeModal(e) {
  e.class("closing");
  try {
    disableModalInputs(e);
  } catch (t) {}
  setTimeout(() => {
    e.cleanup();
  }, 250);
}
var Modal = {
  modal: function (e, t, r = "body", ...n) {
    if (document.activeElement) document.activeElement.blur();
    if (t === void 0 && e) ((t = "" + e), (e = translate("Alert")));
    let i = new Html("div").class("modal-content"),
      o = new Html("div").class("modal-header"),
      s = new Html("div").class("modal-body");
    i.appendMany(o, s);
    let a = new Html("div").class("modal").append(i);
    if ((new Html("span").text(e).appendTo(o), t instanceof Html === !1)) {
      if (t !== null) new Html("span").text(t).appendTo(s);
    } else t.appendTo(s);
    if (n.length > 0) new Html("div").class("flex-group").appendTo(s);
    for (let u = 0; u < n.length; u++) {
      let d = n[u];
      if (d === void 0) continue;
      if (d.type) {
        if (d.type === "separator") {
          g7().appendTo(i.elm.querySelector(".flex-group"));
          continue;
        }
      }
      if (((d = d), !d.text)) throw Error("Invalid button configuration");
      if (d.text === "Cancel") {
        let p = !1,
          g = (m) => {
            let A = m.target;
            if (A == null) return;
            if (!A.classList.contains("close-button") && A.closest(".modal-content") !== null)
              return;
            if (p) return;
            if (d.canClose) {
              if (!d.canClose()) {
                if (typeof d.callback === "function") d.callback(m);
                return;
              }
            }
            (playSound("back"),
              (p = !0),
              a.classOn("closing"),
              setTimeout(() => {
                if ((a.cleanup(), typeof d.callback === "function")) d.callback(m);
              }, 150));
          };
        (addButtonSounds(new Html("button").class("close-button").appendTo(o).on("click", g), "hover", "back"),
          a.on("click", (m) => {
            g(m);
          }));
        continue;
      }
      let h = new Html("button").text(d.text);
      if (!d.disabled)
        h.on("click", (p) => {
          (a.class("closing"), l());
          let g = !1;
          if (d.callback && d.preRunCallback) ((g = !0), d.callback(p));
          setTimeout(() => {
            if ((a.cleanup(), !g)) {
              if (typeof d.callback === "function") d.callback(p);
            }
          }, 150);
        });
      else h.attr({ disabled: !0 });
      let f = addButtonSounds(h);
      if (d.type && d.type === "primary") f.class("primary");
      if (d.type && d.type === "danger") f.class("danger");
      f.appendTo(i.elm.querySelector(".flex-group"));
    }
    function l() {
      a.qsa("a,button,div").forEach((u) => u.attr({ disabled: !0, tabindex: "-1" }));
    }
    a.appendTo(r);
    let c;
    return (
      requestAnimationFrame(() => {
        let u = a.elm.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="checkbox"], input[type="radio"], select',
        );
        if (
          ((c = Array.prototype.slice.call(u)),
          c.forEach((d) => {
            d.setAttribute("tabindex", "0");
          }),
          c.length > 0)
        )
          (c[0].addEventListener("keydown", (d) => {
            if (d.key === "Tab" && d.shiftKey) (d.preventDefault(), c[c.length - 1].focus());
          }),
            c[c.length - 1].addEventListener("keydown", (d) => {
              if (d.key === "Tab" && !d.shiftKey) (d.preventDefault(), c[0].focus());
            }));
      }),
      requestAnimationFrame(() => {
        s.elm.querySelector("input") && s.elm.querySelector("input").focus();
      }),
      a
    );
  },
  alert: function (e, t, r = "body", n = !1, i = !1) {
    return new Promise((o, s) => {
      let a = r;
      if (n) (new Html("div").class("modal-selectable").appendTo("body"), (a = ".modal-selectable"));
      let l = this.modal(
        e,
        t,
        a,
        {
          text: translate("OK"),
          callback: (c) => {
            (o(!0), Html.qs(".modal-selectable")?.cleanup());
          },
        },
        i === !1
          ? {
              text: "Cancel",
              callback: (c) => {
                (o(!1), Html.qs(".modal-selectable")?.cleanup());
              },
            }
          : void 0,
      );
      if (i) {
        if (l.qs(".modal-body button")) {
          let c = l.qsa("button");
          for (let u of c) {
            if (!u) continue;
            let d = u.elm;
            ((d.disabled = !0),
              setTimeout(() => {
                d.disabled = !1;
              }, 3000));
          }
        }
      }
    });
  },
  prompt: function (e, t, r = "body", n = !1, i = !1) {
    return new Promise((o, s) => {
      var a = this.modal(
        e,
        t,
        r,
        { text: translate("Yes"), type: n ? "danger" : "primary", callback: (l) => o(!0) },
        { text: translate("No"), callback: (l) => o(!1) },
        { text: "Cancel", callback: (l) => o(!1) },
      );
      if ((a.qs(".modal-body").classOn("flex-group"), i)) {
        if (a.qs(".modal-body button")) {
          let l = a.qsa("button.danger,button.primary");
          if (!l) return;
          for (let c of l) {
            if (!c) continue;
            let u = c.elm;
            ((u.disabled = !0),
              setTimeout(() => {
                u.disabled = !1;
              }, 7000));
          }
        }
      }
    });
  },
  input: function (e, t, r, n = "body", i = !1, o = "", s) {
    return new Promise((a, l) => {
      let c = new Html("div").class("col"),
        u = this.modal(
          e,
          c,
          n,
          {
            text: translate("OK"),
            type: "primary",
            callback: (h) => {
              let f = d.elm.value.trim();
              a(f === "" ? !1 : f);
            },
          },
          { text: "Cancel", callback: (h) => a(!1) },
        );
      new Html("span").text(t).appendTo(c);
      let d = new Html("input")
        .attr({
          placeholder: r,
          value: o,
          type: i === !0 ? "password" : "text",
          ...(s ? { maxlength: s } : {}),
        })
        .on("keyup", (h) => {
          if (h.key === "Enter")
            (u.class("closing"),
              setTimeout(() => {
                (u.cleanup(), a(d.elm.value));
              }, 150));
        })
        .appendTo(c);
    });
  },
};
