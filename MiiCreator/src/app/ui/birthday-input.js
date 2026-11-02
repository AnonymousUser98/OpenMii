// src/app/ui/birthday-input.js
// Birthday picker widget.
//
// Defines: getMonthNames, MA, createBirthdayInput
// Uses from other files:
//   app/ui/html.js: Html
//   app/i18n/localization.js: getTranslator
//   app/util/random.js: range

var translate = getTranslator(),
  getMonthNames = () => [
    translate("January"),
    translate("February"),
    translate("March"),
    translate("April"),
    translate("May"),
    translate("June"),
    translate("July"),
    translate("August"),
    translate("September"),
    translate("October"),
    translate("November"),
    translate("December"),
  ],
  MA = () => [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function createBirthdayInput(e, t, { day: r, month: n, year: i }) {
  let o = n,
    s = r,
    a = i;
  function l() {
    t(o, s, a);
  }
  let c = new Html("select")
      .attr({ value: o })
      .appendMany(
        new Html("option").text("?").attr({ value: 0 }),
        ...getMonthNames().map((g, m) => new Option(g, String(m + 1))),
      )
      .on("input", (g) => {
        let m = g.target,
          A = parseInt(m.value);
        if (A > getMonthNames().length || A < 0) return;
        (h(A), (o = A), l());
      }),
    u = new Html("select").attr({ value: s }).on("input", (g) => {
      let m = g.target,
        A = parseInt(m.value);
      if (isNaN(A) || A < 0 || A > MA()[o]) return;
      ((s = A), l());
    }),
    d = new Html("select").attr({ value: a }).on("input", (g) => {
      let m = g.target,
        A = parseInt(m.value);
      if (isNaN(A) || A < 0 || A > /*@__PURE__*/ new Date().getFullYear()) return;
      ((a = A), l());
    });
  function h(g) {
    (u.clear(),
      u.appendMany(
        new Html("option").text("?").attr({ value: 0 }),
        ...range(MA()[g]).map((m) => new Option(String(m + 1), String(m + 1))),
      ));
  }
  function f() {
    d.clear();
    let g = /*@__PURE__*/ new Date().getFullYear();
    d.appendMany(
      new Html("option").text("?").attr({ value: 0 }),
      ...range(g - 1899).map((m) => new Option(String(g - m), String(g - m))),
    );
  }
  let p = new Html("div").class("flex-group").appendMany(c, u, d);
  return (
    h(o),
    f(),
    requestAnimationFrame(() => {
      ((c.elm.value = String(o)), (u.elm.value = String(s)), (d.elm.value = String(a)));
    }),
    new Html("div").class("input-group").appendMany(new Html("label").text(e), p)
  );
}
