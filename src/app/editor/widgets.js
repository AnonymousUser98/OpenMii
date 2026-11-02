// src/app/editor/widgets.js
// Editor widgets: validated inputs, item lists, popup menus.
//
// Defines: createValidatedInput, UK, createDropdown
// Uses from other files:
//   app/ui/html.js: Html

function createValidatedInput(e, t, r, n, i, o, s) {
  let a = String(performance.now());
  function l(u) {
    if (o) {
      if (((o.dirty = !0), i)) {
        let d = i(u);
        if (d === !0) {
          if ((c.classOff("invalid"), o)) o.errors.set(t, { valid: !0, reason: "Valid" });
          n(u);
        } else if ((c.classOn("invalid"), o)) o.errors.set(t, { valid: !1, reason: String(d) });
      }
    }
  }
  let c = new Html("input")
    .id(a)
    .attr({ type: "text", value: r })
    .on("input", (u) => {
      let d = u.target;
      l(d.value);
    });
  if (i) l(r);
  return new Html("div").class("input-group").appendMany(new Html("label").attr({ for: a }).text(e), c);
}
function UK(
  e = 0,
  t = 0,
  r = [{ item: "Nothing", select: () => null, selectable: !1 }],
  n = null,
  i = document.body,
  o = !0,
  s = !1,
  a = !1,
  l,
) {
  let c = new Html("div").class("header").text(n),
    u = r
      .filter((p) => p !== null)
      .map((p) => {
        if (typeof p.selectable !== void 0) {
          if (p.selectable === !1)
            return new Html("div").html(p.item).style({ width: "100%", "flex-grow": "1" });
        }
        let g = new Html("div").class("item").on("click", (m) => {
          (h.cleanup(), p.select && p.select());
        });
        if (p.special) g.classOn("selected");
        if (p.highlight) g.classOn("highlight");
        if (s === !0) g.html(p.item);
        else g.text(p.item);
        return g;
      }),
    d = [];
  if (n === null) d = [...u];
  else d = [c, ...u];
  let h = new Html("div")
    .class("ctx-menu", "popup-overlay")
    .styleJs({
      position: o === !0 ? "absolute" : "unset",
      left: e + "px",
      top: t + (n !== null ? -28 : 0) + "px",
      ...(n !== null && { padding: "4px 0" }),
      ...(a && { flexDirection: "column" }),
    })
    .appendMany(...d)
    .on("contextmenu", (p) => {
      p.preventDefault();
    })
    .appendTo(i);
  function f() {
    if (h.elm.parentElement !== document.body) return;
    let p = h.elm.getBoundingClientRect(),
      g = 8,
      m = t,
      A = e - p.width / 2;
    if (!l) {
      let y = Math.min(window.innerWidth - g * 2, window.innerWidth - A - g),
        x = Math.min(window.innerHeight - g * 2, window.innerHeight - m - g);
      h.style({ "max-width": `${y}px`, "max-height": `${x}px`, "overflow-y": "auto" });
    } else h.style({ "max-width": `${l}px` });
    if (m + p.height > window.innerHeight - g) m = Math.max(g, window.innerHeight - p.height - g);
    if (A < g) A = g;
    else if (A + p.width > window.innerWidth - g) A = window.innerWidth - p.width - g;
    (h.style({ top: `${m}px`, left: `${A}px` }), requestAnimationFrame(f));
  }
  return (requestAnimationFrame(f), h);
}
function createDropdown(e, t, r, n, i = "180px", o, s, a = !1, l = void 0) {
  let c = new Html("span").text(o || "Select..."),
    u = new Html("button")
      .attr({ "tab-index": "0" })
      .class("row", "gap")
      .styleJs({ maxWidth: i, background: "var(--container)" })
      .appendMany(
        c,
        new Html("span")
          .style({ width: "17px", height: "17px" })
          .html(
            '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down" style="width: 17px; height: 17px; align-self: flex-end;"><path d="m6 9 6 6 6-6"></path></svg>',
          ),
      ),
    d = null,
    h = n,
    f = t.find((p) => p.id === h);
  if (f !== void 0) c.html(f.item);
  else c.text(o || "Select...");
  if (s !== void 0)
    s((p) => {
      ((h = p.id), c.html(p.item));
    });
  if (
    (u.on("mousedown", () => {
      if (d) (d.cleanup(), (d = null));
    }),
    u.on("click", () => {
      if (d) (d.cleanup(), (d = null));
      else {
        let p = u.elm.getBoundingClientRect();
        d = UK(
          p.left + p.width / 2,
          p.bottom,
          t.map((g) => {
            if (typeof g.id === void 0) return;
            let m = `<span>${g.item}</span>`,
              A = !1;
            if (g.id === h)
              ((m = `<span>${g.item}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check ml-auto" style="width: 1.25em; height: 1.25em;"><path d="M20 6 9 17l-5-5"></path></svg>`),
                (A = !0));
            if (g.type !== void 0)
              if (g.type === "separator") return { item: "<hr>", selectable: !1 };
              else return g;
            return {
              item: m,
              special: A,
              select: () => {
                ((h = g.id), c.html(g.item), r(g.id));
              },
            };
          }),
          null,
          document.body,
          !0,
          !0,
          a,
          l,
        )
          .styleJs({ minWidth: "150px" })
          .appendTo("body");
      }
    }),
    e !== void 0)
  )
    u.appendTo(e);
  return u;
}
