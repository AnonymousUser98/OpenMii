// src/app/ui/components.js
// Shared UI building blocks: tab lists, feature sets (item grids), separators.
//
// Defines: addButtonSounds, nanoid, createTabList, playHoverSound, playPressSound,
//          createFeatureSet, BA, FA, DA, NA, COMMON_COLOR_DISPLAY_ORDER, PA, orderItems, separator,
//          separatorGapThin, separatorGapThinDesktop, separatorGapThinLaptop
// Uses from other files:
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/mii/mii.js: Mii
//   app/editor/editor.js: MiiEditor

function addButtonSounds(e, t = "hover", r = "select", n = "press") {
  return (
    e.on("pointerenter", () => {
      playSound(t);
    }),
    e.on("pointerdown", () => {
      playSound(n);
    }),
    e.on("click", () => {
      playSound(r);
    }),
    e
  );
}
var d7 = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9";
var nanoid = (e = 21) => {
  var t = "",
    r = crypto.getRandomValues(new Uint8Array((e |= 0)));
  while (e--) t += d7[r[e] & 63];
  return t;
};
function createTabList(e, t = 0) {
  let r = new Html("div").class("tab-list"),
    n = new Html("div").class("tab-content");
  function i(s, a, l = !0, c) {
    if (c !== void 0) {
      if (c() === !1) return;
    }
    if (l !== !1)
      (r.qsa(".tab").forEach((u) => u?.classOff("active")), s.classOn("active"), n.clear());
    a(n);
  }
  let o = [];
  for (let s of e) {
    if (s === void 0) continue;
    let a = addButtonSounds(
      new Html("div")
        .classOn("tab")
        .html(s.icon)
        .on("click", async () => {
          i(a, s.select, s.update, s.preselect);
        })
        .appendTo(r),
      "hover",
      "select_tab",
    );
    switch (t) {
      case 0:
        a.classOn("tab-square");
        break;
      case 1:
        a.classOn("tab-rectangle");
        break;
    }
    if (typeof s.type < "u") a.classOn(s.type);
    o.push(s);
  }
  return (i(Html.from(r.elm.children[0]), o[0].select), { list: r, content: n, selectTab: i });
}
var playHoverSound = () => playSound("hover"),
  playPressSound = () => playSound("press");
function createFeatureSet(e) {
  let t;
  if (e.mii)
    if (e.miiIsNotMii === void 0 || e.miiIsNotMii === !1) t = new Mii(e.mii.export());
    else t = e.mii;
  else t = {};
  let r = new Html("div").class("feature-set-container"),
    n = [];
  for (let i in e.entries) {
    let o = e.entries[i];
    if (o === void 0) continue;
    let s = i;
    n.push({
      icon: o.label,
      async select(a) {
        if (o.onBeforeChange !== void 0) {
          if ((await o.onBeforeChange(t, a)) === !1) return;
        }
        let l;
        if (e.embeddedSet) l = e.embeddedSet;
        else l = new Html("div").class("feature-set-group").appendTo(a);
        if (o.header) {
          let c = new Html("div").class("feature-set-header");
          if (o.headerIsHtml !== void 0) c.append(o.header);
          else c.text(o.header);
          l.append(c);
        }
        if ("items" in o)
          for (let c of o.items) {
            if (c === void 0) continue;
            let u = nanoid(),
              d = !0,
              h = 0;
            if (c.forceRender !== void 0) {
              if (c.forceRender === !1) d = !1;
            }
            if (c.bodyUpdateType !== void 0) {
              if (c.bodyUpdateType !== 0) h = c.bodyUpdateType;
            }
            let f = () => e.onChange(t, d, c.part || 0, h);
            if (o.onItemChange)
              f = () => {
                let g = s;
                if (c.property)
                  if (Array.isArray(c.property)) g = c.property[0];
                  else g = c.property;
                if (o.onItemChange(t, l, !0, g)) e.onChange(t, d, c.part || 0, h);
              };
            let p = t[s];
            switch (c.type) {
              case 0:
                let g = !1;
                if (c.selectedCondition)
                  if (c.selectedCondition(t) === !0) g = !0;
                  else g = !1;
                if (c.property)
                  if (Array.isArray(c.property)) {
                    let C = t[c.property[0]];
                    if (c.property.map((R) => t[R]).every((R) => R === C)) p = C;
                    else ((p = !1), (g = !1));
                  } else p = t[c.property];
                let m = new Html("div")
                  .class("feature-item")
                  .on("pointerenter", playHoverSound)
                  .on("click", async () => {
                    let C;
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    C = t[s];
                    let R = c.value;
                    if (c.selectedCondition)
                      if (c.selectedCondition(t) === !0) g = !0;
                      else g = !1;
                    if (C === R || g) {
                      playSound("select_already_in_use");
                      return;
                    }
                    let B = { a: !0, b: !0 };
                    if (c.preSelectCallback) {
                      let L = await c.preSelectCallback(t);
                      if (L) {
                        if (typeof L.a < "u") B = L;
                      }
                    }
                    if (B.b) {
                      if (c.sound) playSound(c.sound);
                      else if (c.color) playSound("select_color");
                      else if (c.icon) playSound("select_part");
                    }
                    if (c.property)
                      if (Array.isArray(c.property)) for (let L of c.property) t[L] = R;
                      else t[c.property] = R;
                    else if (c.property === void 0) t[i] = R;
                    if (B.b) f();
                    if ((l.qsa(".feature-item").forEach((L) => L.classOff("active")), B.a))
                      m.classOn("active");
                  })
                  .appendTo(l);
                if (c.icon)
                  if (c.appendIcon) m.append(c.icon);
                  else m.html(c.icon);
                if (c.color) m.classOn("is-color").style({ "--color": c.color });
                if (p === c.value || g) {
                  if (c.property) {
                    if (Array.isArray(c.property)) {
                      if (c.property.map((C) => t[C]).every((C) => C === p) === !1) {
                        debugger;
                        continue;
                      }
                    }
                  }
                  m.classOn("active");
                }
                break;
              case 3:
                if (c.label !== void 0) new Html("span").text(c.label).appendTo(l);
                let A = new Html("div").class("feature-slider").on("pointerenter", playHoverSound).appendTo(l);
                if (c.iconStart) {
                  let C = new Html("span").html(c.iconStart).on("click", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    if (
                      (y.val(Number(y.getValue()) - 1),
                      (t[c.property] = Math.max(c.min, Math.min(c.max, Number(y.getValue())))),
                      c.soundStart)
                    )
                      playSound(c.soundStart);
                    else playSound("select");
                    f();
                  });
                  A.append(C);
                }
                let y = new Html("input")
                  .attr({ type: "range", min: c.min, max: c.max })
                  .id(u)
                  .appendTo(A);
                if (c.iconEnd) {
                  let C = new Html("span").html(c.iconEnd).on("click", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    if (
                      (y.val(Number(y.getValue()) + 1),
                      (t[c.property] = Math.max(c.min, Math.min(c.max, Number(y.getValue())))),
                      c.soundEnd)
                    )
                      playSound(c.soundEnd);
                    else playSound("select");
                    f();
                  });
                  A.append(C);
                }
                (y.val(t[c.property]),
                  y.on("input", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    let C = t[c.property],
                      R = Math.max(c.min, Math.min(c.max, Number(y.getValue())));
                    if (R >= C) playSound("slider_tick");
                    else playSound("slider_tick_down");
                    ((t[c.property] = R), f());
                  }));
                break;
              case 2:
                let x = new Html("div")
                  .class("col")
                  .style({ width: "100%", gap: "0", "align-items": "center" })
                  .appendTo(l);
                if (c.label !== void 0) new Html("span").text(c.label).appendTo(x);
                let b = new Html("div").class("feature-slider").appendTo(x);
                if (c.iconStart) {
                  let C = new Html("span").html(c.iconStart).on("click", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    if (
                      (v.val(Number(v.getValue()) + (c.inverse ? 1 : -1)),
                      (t[c.property] = Math.max(
                        c.min,
                        Math.min(
                          c.inverse ? c.max + c.min - Number(v.getValue()) : Number(v.getValue()),
                        ),
                      )),
                      c.soundStart)
                    )
                      playSound(c.soundStart);
                    else playSound("select");
                    if (c.preSelectCallback) c.preSelectCallback(t);
                    f();
                  });
                  if (c.inverse) b.prepend(C);
                  else b.append(C);
                }
                let v = new Html("input").attr({ type: "range", min: c.min, max: c.max }).id(u);
                if (c.inverse) b.prepend(v);
                else b.append(v);
                if (c.iconEnd) {
                  let C = new Html("span").html(c.iconEnd).on("click", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    if (
                      (v.val(Number(v.getValue()) + (c.inverse ? -1 : 1)),
                      (t[c.property] = Math.max(
                        c.min,
                        Math.min(
                          c.inverse ? c.max + c.min - Number(v.getValue()) : Number(v.getValue()),
                          c.max,
                        ),
                      )),
                      c.soundEnd)
                    )
                      playSound(c.soundEnd);
                    else playSound("select");
                    if (c.preSelectCallback) c.preSelectCallback(t);
                    f();
                  });
                  if (c.inverse) b.prepend(C);
                  else b.append(C);
                }
                (v.val(c.inverse ? c.max - t[c.property] + c.min : t[c.property]),
                  v.on("change", () => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    let C = c.inverse ? c.max + c.min - Number(v.getValue()) : Number(v.getValue()),
                      R = t[c.property];
                    if (c.soundStart !== void 0 && c.soundEnd !== void 0)
                      if (C < R) playSound(c.soundStart);
                      else playSound(c.soundEnd);
                    if (
                      ((t[c.property] = Math.max(c.min, Math.min(c.max, C))), c.preSelectCallback)
                    )
                      c.preSelectCallback(t);
                    f();
                  }));
                let _;
                v.on("input", () => {
                  let C = parseInt(v.getValue());
                  if (!_) _ = C;
                  if (C >= _) playSound("slider_tick");
                  else playSound("slider_tick_down");
                  _ = C;
                });
                break;
              case 4:
                let w = new Html("div").class("feature-switch-group").appendTo(l),
                  S = new Html("div").class("feature-switch").id(u).appendTo(w),
                  E = [],
                  T = t[c.property];
                if (c.initialVal) T = c.initialVal(t);
                for (let C of c.items) {
                  let R = new Html("button").class("feature-switch-item").html(C.icon).appendTo(S);
                  if (
                    (R.on("click", () => {
                      (B(C.value), E.forEach((L) => L.classOff("active")), R.classOn("active"));
                    }),
                    R.on("pointerenter", playHoverSound),
                    R.on("pointerDown", playPressSound),
                    T == C.value)
                  )
                    (E.forEach((L) => L.classOff("active")), R.classOn("active"));
                  else R.classOff("active");
                  let B = (L) => {
                    if (MiiEditor.getCurrentEditor() !== null) t = MiiEditor.getCurrentEditor().mii;
                    let k = L;
                    if (((t[c.property] = k), C.sound)) playSound(C.sound);
                    else playSound("select");
                    f();
                  };
                  E.push(R);
                }
                break;
              case 5:
                let M = c.html.appendTo(l);
                if (c.select) M.on("click", c.select);
                break;
            }
          }
        if (o.onItemChange) o.onItemChange(t, l, !1, s);
      },
    });
  }
  if (Object.keys(e.entries).length === 1) {
    let i = createTabList(n, 1);
    if (!e.embedded) i.list.appendTo(r);
    i.content.appendTo(r);
  } else {
    let i = createTabList(n, 1);
    (i.list.appendTo(r), i.content.appendTo(r));
  }
  return r;
}
var BA = [
    [2, 4, 0, 8, 39, 17, 1, 26, 16, 15, 27, 20],
    [33, 11, 19, 32, 9, 12, 23, 34, 21, 25, 40, 35],
    [5, 41, 13, 36, 37, 6, 24, 30, 31, 18, 28, 46],
    [7, 44, 38, 42, 45, 29, 3, 43, 22, 10, 14, 47],
    [48, 49, 50, 53, 59, 56, 54, 58, 57, 55, 51, 52],
  ],
  p7 = [
    [6, 0, 12, 1, 9, 19, 7, 21, 8, 17, 5, 4],
    [11, 10, 2, 3, 14, 20, 15, 13, 22, 18, 16, 23],
  ],
  FA = [
    [23, 1, 19, 21, 22, 5, 0, 8, 10, 16, 6, 13],
    [7, 9, 2, 17, 3, 4, 15, 11, 20, 18, 14, 12],
    [27, 30, 24, 25, 29, 28, 26, 35, 31, 34, 33, 32],
  ],
  DA = [
    [1, 10, 2, 3, 6, 0, 5, 4, 8, 9, 7, 11],
    [13, 14, 12, 17, 16, 15],
  ],
  NA = [
    [33, 47, 40, 37, 32, 107, 48, 51, 55, 70, 44, 66],
    [52, 50, 38, 49, 43, 31, 56, 68, 62, 115, 76, 119],
    [64, 81, 116, 121, 22, 58, 60, 87, 125, 117, 73, 75],
    [42, 89, 57, 54, 80, 34, 23, 86, 88, 118, 39, 36],
    [45, 67, 59, 65, 41, 30, 12, 16, 10, 82, 128, 129],
    [14, 95, 105, 100, 6, 20, 93, 102, 27, 4, 17, 110],
    [123, 8, 106, 72, 3, 21, 0, 98, 63, 90, 11, 120],
    [5, 74, 108, 94, 124, 25, 99, 69, 35, 13, 122, 113],
    [53, 24, 85, 83, 71, 131, 96, 101, 29, 7, 15, 112],
    [79, 1, 109, 127, 91, 26, 61, 103, 2, 77, 18, 92],
    [84, 9, 19, 130, 97, 104, 46, 78, 28, 114, 126, 111],
  ],
  COMMON_COLOR_DISPLAY_ORDER = [
    [2, 24, 10, 23, 15, 20, 21, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    [48, 16, 49, 12, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 13, 60, 61, 62, 63, 64],
    [65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
    [5, 11, 75, 76, 77, 78, 79, 80, 81, 82],
    [14, 83, 6, 17, 7, 84, 85, 86, 87, 88],
    [1, 3, 89, 19, 90, 91, 22, 92, 93, 94],
    [8, 0, 95, 9, 18, 4, 96, 97, 98, 99],
  ],
  PA = [
    [0, 7, 1, 4, 5],
    [6, 3, 2, 8, 9],
  ],
  sd = [
    -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, -1, -1, 0, -1, 0, -1, -1, 0, -1, 0,
    0, -1, 0, 0, 0, -1, -1, -1, 0, 0, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0,
    0, -1, 0, 0, -1,
  ],
  Lh = [0, 0, -1, 1, 0, 1, 0, 1, -2, 1, 0, 2, -1, -1, 0, 0, 1, 1, 0, 0, -1, 0, 1, 0],
  m7 = [
    0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    0, 1, 1, 1,
  ];
function orderItems(e, t, r = separatorGapThinDesktop) {
  let n = [];
  if (Array.isArray(t) && Array.isArray(t[0]))
    for (let i of t) {
      let o = i.map((s) => e[s]).filter((s) => s !== void 0);
      if (n.length > 0 && o.length > 0) {
        if (r !== null) n.push(r());
      }
      n.push(...o);
    }
  else {
    for (let i in t) {
      let o = t[i];
      n[parseInt(i)] = e[o];
    }
    n = n.filter((i) => i !== void 0);
  }
  return n;
}
var separator = () => ({ type: 5, html: new Html("div").class("separator") });
var separatorGapThin = () => ({ type: 5, html: new Html("div").class("separator-gap-thin") }),
  separatorGapThinDesktop = () => ({ type: 5, html: new Html("div").class("separator-gap-thin-desktop") }),
  separatorGapThinLaptop = () => ({ type: 5, html: new Html("div").class("separator-gap-thin-laptop") }),
  g7 = () => new Html("div").class("separator-gap-thin");
