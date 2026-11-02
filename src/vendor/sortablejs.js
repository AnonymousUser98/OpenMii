// src/vendor/sortablejs.js
// SortableJS: drag-to-rearrange in the library.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

function KB(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    if (t)
      n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      });
    r.push.apply(r, n);
  }
  return r;
}
function _c(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    if (t % 2)
      KB(Object(r), !0).forEach(function (n) {
        Qq(e, n, r[n]);
      });
    else if (Object.getOwnPropertyDescriptors)
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(r));
    else
      KB(Object(r)).forEach(function (n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
      });
  }
  return e;
}
function Gx(e) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol")
    Gx = function (t) {
      return typeof t;
    };
  else
    Gx = function (t) {
      return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype
        ? "symbol"
        : typeof t;
    };
  return Gx(e);
}
function Qq(e, t, r) {
  if (t in e)
    Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 });
  else e[t] = r;
  return e;
}
function mu() {
  return (
    (mu =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r) if (Object.prototype.hasOwnProperty.call(r, n)) e[n] = r[n];
        }
        return e;
      }),
    mu.apply(this, arguments)
  );
}
function Yq(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    i,
    o;
  for (o = 0; o < n.length; o++) {
    if (((i = n[o]), t.indexOf(i) >= 0)) continue;
    r[i] = e[i];
  }
  return r;
}
function Xq(e, t) {
  if (e == null) return {};
  var r = Yq(e, t),
    n,
    i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++) {
      if (((n = o[i]), t.indexOf(n) >= 0)) continue;
      if (!Object.prototype.propertyIsEnumerable.call(e, n)) continue;
      r[n] = e[n];
    }
  }
  return r;
}
var jq = "1.15.6";
function pu(e) {
  if (typeof window < "u" && window.navigator)
    return !!(/*@__PURE__*/ navigator.userAgent.match(e));
}
var gu = pu(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
  Vg = pu(/Edge/i),
  qB = pu(/firefox/i),
  kg = pu(/safari/i) && !pu(/chrome/i) && !pu(/android/i),
  B5 = pu(/iP(ad|od|hone)/i),
  iF = pu(/chrome/i) && pu(/android/i),
  oF = { capture: !1, passive: !1 };
function en(e, t, r) {
  e.addEventListener(t, r, !gu && oF);
}
function jr(e, t, r) {
  e.removeEventListener(t, r, !gu && oF);
}
function Yx(e, t) {
  if (!t) return;
  if ((t[0] === ">" && (t = t.substring(1)), e))
    try {
      if (e.matches) return e.matches(t);
      else if (e.msMatchesSelector) return e.msMatchesSelector(t);
      else if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
    } catch (r) {
      return !1;
    }
  return !1;
}
function sF(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function zl(e, t, r, n) {
  if (e) {
    r = r || document;
    do {
      if (
        (t != null && (t[0] === ">" ? e.parentNode === r && Yx(e, t) : Yx(e, t))) ||
        (n && e === r)
      )
        return e;
      if (e === r) break;
    } while ((e = sF(e)));
  }
  return null;
}
var ZB = /\s+/g;
function wa(e, t, r) {
  if (e && t)
    if (e.classList) e.classList[r ? "add" : "remove"](t);
    else {
      var n = (" " + e.className + " ").replace(ZB, " ").replace(" " + t + " ", " ");
      e.className = (n + (r ? " " + t : "")).replace(ZB, " ");
    }
}
function dr(e, t, r) {
  var n = e && e.style;
  if (n)
    if (r === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle)
        r = document.defaultView.getComputedStyle(e, "");
      else if (e.currentStyle) r = e.currentStyle;
      return t === void 0 ? r : r[t];
    } else {
      if (!(t in n) && t.indexOf("webkit") === -1) t = "-webkit-" + t;
      n[t] = r + (typeof r === "string" ? "" : "px");
    }
}
function o1(e, t) {
  var r = "";
  if (typeof e === "string") r = e;
  else
    do {
      var n = dr(e, "transform");
      if (n && n !== "none") r = n + " " + r;
    } while (!t && (e = e.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(r);
}
function aF(e, t, r) {
  if (e) {
    var n = e.getElementsByTagName(t),
      i = 0,
      o = n.length;
    if (r) for (; i < o; i++) r(n[i], i);
    return n;
  }
  return [];
}
function bc() {
  var e = document.scrollingElement;
  if (e) return e;
  else return document.documentElement;
}
function ao(e, t, r, n, i) {
  if (!e.getBoundingClientRect && e !== window) return;
  var o, s, a, l, c, u, d;
  if (e !== window && e.parentNode && e !== bc())
    ((o = e.getBoundingClientRect()),
      (s = o.top),
      (a = o.left),
      (l = o.bottom),
      (c = o.right),
      (u = o.height),
      (d = o.width));
  else
    ((s = 0),
      (a = 0),
      (l = window.innerHeight),
      (c = window.innerWidth),
      (u = window.innerHeight),
      (d = window.innerWidth));
  if ((t || r) && e !== window) {
    if (((i = i || e.parentNode), !gu))
      do
        if (
          i &&
          i.getBoundingClientRect &&
          (dr(i, "transform") !== "none" || (r && dr(i, "position") !== "static"))
        ) {
          var h = i.getBoundingClientRect();
          ((s -= h.top + parseInt(dr(i, "border-top-width"))),
            (a -= h.left + parseInt(dr(i, "border-left-width"))),
            (l = s + o.height),
            (c = a + o.width));
          break;
        }
      while ((i = i.parentNode));
  }
  if (n && e !== window) {
    var f = o1(i || e),
      p = f && f.a,
      g = f && f.d;
    if (f) ((s /= g), (a /= p), (d /= p), (u /= g), (l = s + u), (c = a + d));
  }
  return { top: s, left: a, bottom: l, right: c, width: d, height: u };
}
function $B(e, t, r) {
  var n = Dd(e, !0),
    i = ao(e)[t];
  while (n) {
    var o = ao(n)[r],
      s = void 0;
    if (r === "top" || r === "left") s = i >= o;
    else s = i <= o;
    if (!s) return n;
    if (n === bc()) break;
    n = Dd(n, !1);
  }
  return !1;
}
function s1(e, t, r, n) {
  var i = 0,
    o = 0,
    s = e.children;
  while (o < s.length) {
    if (
      s[o].style.display !== "none" &&
      s[o] !== hr.ghost &&
      (n || s[o] !== hr.dragged) &&
      zl(s[o], r.draggable, e, !1)
    ) {
      if (i === t) return s[o];
      i++;
    }
    o++;
  }
  return null;
}
function F5(e, t) {
  var r = e.lastElementChild;
  while (r && (r === hr.ghost || dr(r, "display") === "none" || (t && !Yx(r, t))))
    r = r.previousElementSibling;
  return r || null;
}
function tl(e, t) {
  var r = 0;
  if (!e || !e.parentNode) return -1;
  while ((e = e.previousElementSibling))
    if (e.nodeName.toUpperCase() !== "TEMPLATE" && e !== hr.clone && (!t || Yx(e, t))) r++;
  return r;
}
function JB(e) {
  var t = 0,
    r = 0,
    n = bc();
  if (e)
    do {
      var i = o1(e),
        { a: o, d: s } = i;
      ((t += e.scrollLeft * o), (r += e.scrollTop * s));
    } while (e !== n && (e = e.parentNode));
  return [t, r];
}
function Kq(e, t) {
  for (var r in e) {
    if (!e.hasOwnProperty(r)) continue;
    for (var n in t) if (t.hasOwnProperty(n) && t[n] === e[r][n]) return Number(r);
  }
  return -1;
}
function Dd(e, t) {
  if (!e || !e.getBoundingClientRect) return bc();
  var r = e,
    n = !1;
  do
    if (r.clientWidth < r.scrollWidth || r.clientHeight < r.scrollHeight) {
      var i = dr(r);
      if (
        (r.clientWidth < r.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll")) ||
        (r.clientHeight < r.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll"))
      ) {
        if (!r.getBoundingClientRect || r === document.body) return bc();
        if (n || t) return r;
        n = !0;
      }
    }
  while ((r = r.parentNode));
  return bc();
}
function qq(e, t) {
  if (e && t) {
    for (var r in t) if (t.hasOwnProperty(r)) e[r] = t[r];
  }
  return e;
}
function b5(e, t) {
  return (
    Math.round(e.top) === Math.round(t.top) &&
    Math.round(e.left) === Math.round(t.left) &&
    Math.round(e.height) === Math.round(t.height) &&
    Math.round(e.width) === Math.round(t.width)
  );
}
var Ug;
function lF(e, t) {
  return function () {
    if (!Ug) {
      var r = arguments,
        n = this;
      if (r.length === 1) e.call(n, r[0]);
      else e.apply(n, r);
      Ug = setTimeout(function () {
        Ug = void 0;
      }, t);
    }
  };
}
function Zq() {
  (clearTimeout(Ug), (Ug = void 0));
}
function cF(e, t, r) {
  ((e.scrollLeft += t), (e.scrollTop += r));
}
function uF(e) {
  var t = window.Polymer,
    r = window.jQuery || window.Zepto;
  if (t && t.dom) return t.dom(e).cloneNode(!0);
  else if (r) return r(e).clone(!0)[0];
  else return e.cloneNode(!0);
}
function dF(e, t, r) {
  var n = {};
  return (
    Array.from(e.children).forEach(function (i) {
      var o, s, a, l;
      if (!zl(i, t.draggable, e, !1) || i.animated || i === r) return;
      var c = ao(i);
      ((n.left = Math.min((o = n.left) !== null && o !== void 0 ? o : 1 / 0, c.left)),
        (n.top = Math.min((s = n.top) !== null && s !== void 0 ? s : 1 / 0, c.top)),
        (n.right = Math.max((a = n.right) !== null && a !== void 0 ? a : -1 / 0, c.right)),
        (n.bottom = Math.max((l = n.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom)));
    }),
    (n.width = n.right - n.left),
    (n.height = n.bottom - n.top),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
var Js = "Sortable" + /*@__PURE__*/ new Date().getTime();
function $q() {
  var e = [],
    t;
  return {
    captureAnimationState: function () {
      if (((e = []), !this.options.animation)) return;
      var n = [].slice.call(this.el.children);
      n.forEach(function (i) {
        if (dr(i, "display") === "none" || i === hr.ghost) return;
        e.push({ target: i, rect: ao(i) });
        var o = _c({}, e[e.length - 1].rect);
        if (i.thisAnimationDuration) {
          var s = o1(i, !0);
          if (s) ((o.top -= s.f), (o.left -= s.e));
        }
        i.fromRect = o;
      });
    },
    addAnimationState: function (n) {
      e.push(n);
    },
    removeAnimationState: function (n) {
      e.splice(Kq(e, { target: n }), 1);
    },
    animateAll: function (n) {
      var i = this;
      if (!this.options.animation) {
        if ((clearTimeout(t), typeof n === "function")) n();
        return;
      }
      var o = !1,
        s = 0;
      if (
        (e.forEach(function (a) {
          var l = 0,
            c = a.target,
            u = c.fromRect,
            d = ao(c),
            { prevFromRect: h, prevToRect: f } = c,
            p = a.rect,
            g = o1(c, !0);
          if (g) ((d.top -= g.f), (d.left -= g.e));
          if (((c.toRect = d), c.thisAnimationDuration)) {
            if (
              b5(h, d) &&
              !b5(u, d) &&
              (p.top - d.top) / (p.left - d.left) === (u.top - d.top) / (u.left - d.left)
            )
              l = eZ(p, h, f, i.options);
          }
          if (!b5(d, u)) {
            if (((c.prevFromRect = u), (c.prevToRect = d), !l)) l = i.options.animation;
            i.animate(c, p, d, l);
          }
          if (l)
            ((o = !0),
              (s = Math.max(s, l)),
              clearTimeout(c.animationResetTimer),
              (c.animationResetTimer = setTimeout(function () {
                ((c.animationTime = 0),
                  (c.prevFromRect = null),
                  (c.fromRect = null),
                  (c.prevToRect = null),
                  (c.thisAnimationDuration = null));
              }, l)),
              (c.thisAnimationDuration = l));
        }),
        clearTimeout(t),
        !o)
      ) {
        if (typeof n === "function") n();
      } else
        t = setTimeout(function () {
          if (typeof n === "function") n();
        }, s);
      e = [];
    },
    animate: function (n, i, o, s) {
      if (s) {
        (dr(n, "transition", ""), dr(n, "transform", ""));
        var a = o1(this.el),
          l = a && a.a,
          c = a && a.d,
          u = (i.left - o.left) / (l || 1),
          d = (i.top - o.top) / (c || 1);
        ((n.animatingX = !!u),
          (n.animatingY = !!d),
          dr(n, "transform", "translate3d(" + u + "px," + d + "px,0)"),
          (this.forRepaintDummy = Jq(n)),
          dr(
            n,
            "transition",
            "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : ""),
          ),
          dr(n, "transform", "translate3d(0,0,0)"),
          typeof n.animated === "number" && clearTimeout(n.animated),
          (n.animated = setTimeout(function () {
            (dr(n, "transition", ""),
              dr(n, "transform", ""),
              (n.animated = !1),
              (n.animatingX = !1),
              (n.animatingY = !1));
          }, s)));
      }
    },
  };
}
function Jq(e) {
  return e.offsetWidth;
}
function eZ(e, t, r, n) {
  return (
    (Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) /
      Math.sqrt(Math.pow(t.top - r.top, 2) + Math.pow(t.left - r.left, 2))) *
    n.animation
  );
}
var t1 = [],
  _5 = { initializeByDefault: !0 },
  Wg = {
    mount: function (t) {
      for (var r in _5) if (_5.hasOwnProperty(r) && !(r in t)) t[r] = _5[r];
      (t1.forEach(function (n) {
        if (n.pluginName === t.pluginName)
          throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
      }),
        t1.push(t));
    },
    pluginEvent: function (t, r, n) {
      var i = this;
      ((this.eventCanceled = !1),
        (n.cancel = function () {
          i.eventCanceled = !0;
        }));
      var o = t + "Global";
      t1.forEach(function (s) {
        if (!r[s.pluginName]) return;
        if (r[s.pluginName][o]) r[s.pluginName][o](_c({ sortable: r }, n));
        if (r.options[s.pluginName] && r[s.pluginName][t])
          r[s.pluginName][t](_c({ sortable: r }, n));
      });
    },
    initializePlugins: function (t, r, n, i) {
      t1.forEach(function (a) {
        var l = a.pluginName;
        if (!t.options[l] && !a.initializeByDefault) return;
        var c = new a(t, r, t.options);
        ((c.sortable = t), (c.options = t.options), (t[l] = c), mu(n, c.defaults));
      });
      for (var o in t.options) {
        if (!t.options.hasOwnProperty(o)) continue;
        var s = this.modifyOption(t, o, t.options[o]);
        if (typeof s < "u") t.options[o] = s;
      }
    },
    getEventProperties: function (t, r) {
      var n = {};
      return (
        t1.forEach(function (i) {
          if (typeof i.eventProperties !== "function") return;
          mu(n, i.eventProperties.call(r[i.pluginName], t));
        }),
        n
      );
    },
    modifyOption: function (t, r, n) {
      var i;
      return (
        t1.forEach(function (o) {
          if (!t[o.pluginName]) return;
          if (o.optionListeners && typeof o.optionListeners[r] === "function")
            i = o.optionListeners[r].call(t[o.pluginName], n);
        }),
        i
      );
    },
  };
function tZ(e) {
  var {
    sortable: t,
    rootEl: r,
    name: n,
    targetEl: i,
    cloneEl: o,
    toEl: s,
    fromEl: a,
    oldIndex: l,
    newIndex: c,
    oldDraggableIndex: u,
    newDraggableIndex: d,
    originalEvent: h,
    putSortable: f,
    extraEventProperties: p,
  } = e;
  if (((t = t || (r && r[Js])), !t)) return;
  var g,
    m = t.options,
    A = "on" + n.charAt(0).toUpperCase() + n.substr(1);
  if (window.CustomEvent && !gu && !Vg) g = new CustomEvent(n, { bubbles: !0, cancelable: !0 });
  else ((g = document.createEvent("Event")), g.initEvent(n, !0, !0));
  ((g.to = s || r),
    (g.from = a || r),
    (g.item = i || r),
    (g.clone = o),
    (g.oldIndex = l),
    (g.newIndex = c),
    (g.oldDraggableIndex = u),
    (g.newDraggableIndex = d),
    (g.originalEvent = h),
    (g.pullMode = f ? f.lastPutMode : void 0));
  var y = _c(_c({}, p), Wg.getEventProperties(n, t));
  for (var x in y) g[x] = y[x];
  if (r) r.dispatchEvent(g);
  if (m[A]) m[A].call(t, g);
}
var rZ = ["evt"],
  $s = function (t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      i = n.evt,
      o = Xq(n, rZ);
    Wg.pluginEvent.bind(hr)(
      t,
      r,
      _c(
        {
          dragEl: gt,
          parentEl: Bi,
          ghostEl: wr,
          rootEl: gi,
          nextEl: Gf,
          lastDownEl: zx,
          cloneEl: xi,
          cloneHidden: Fd,
          dragStarted: Dg,
          putSortable: Go,
          activeSortable: hr.active,
          originalEvent: i,
          oldIndex: i1,
          oldDraggableIndex: Hg,
          newIndex: Ta,
          newDraggableIndex: Bd,
          hideGhostForTarget: mF,
          unhideGhostForTarget: gF,
          cloneNowHidden: function () {
            Fd = !0;
          },
          cloneNowShown: function () {
            Fd = !1;
          },
          dispatchSortableEvent: function (a) {
            Cs({ sortable: r, name: a, originalEvent: i });
          },
        },
        o,
      ),
    );
  };
function Cs(e) {
  tZ(
    _c(
      {
        putSortable: Go,
        cloneEl: xi,
        targetEl: gt,
        rootEl: gi,
        oldIndex: i1,
        oldDraggableIndex: Hg,
        newIndex: Ta,
        newDraggableIndex: Bd,
      },
      e,
    ),
  );
}
var gt,
  Bi,
  wr,
  gi,
  Gf,
  zx,
  xi,
  Fd,
  i1,
  Ta,
  Hg,
  Bd,
  Px,
  Go,
  n1 = !1,
  Xx = !1,
  jx = [],
  Uf,
  Gl,
  v5,
  C5,
  eF,
  tF,
  Dg,
  r1,
  Gg,
  zg = !1,
  kx = !1,
  Vx,
  is,
  w5 = [],
  I5 = !1,
  Kx = [],
  Zx = typeof document < "u",
  Ux = B5,
  rF = Vg || gu ? "cssFloat" : "float",
  nZ = Zx && !iF && !B5 && "draggable" in document.createElement("div"),
  hF = (function () {
    if (!Zx) return;
    if (gu) return !1;
    var e = document.createElement("x");
    return ((e.style.cssText = "pointer-events:auto"), e.style.pointerEvents === "auto");
  })(),
  fF = function (t, r) {
    var n = dr(t),
      i =
        parseInt(n.width) -
        parseInt(n.paddingLeft) -
        parseInt(n.paddingRight) -
        parseInt(n.borderLeftWidth) -
        parseInt(n.borderRightWidth),
      o = s1(t, 0, r),
      s = s1(t, 1, r),
      a = o && dr(o),
      l = s && dr(s),
      c = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + ao(o).width,
      u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ao(s).width;
    if (n.display === "flex")
      return n.flexDirection === "column" || n.flexDirection === "column-reverse"
        ? "vertical"
        : "horizontal";
    if (n.display === "grid")
      return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    if (o && a.float && a.float !== "none") {
      var d = a.float === "left" ? "left" : "right";
      return s && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
    }
    return o &&
      (a.display === "block" ||
        a.display === "flex" ||
        a.display === "table" ||
        a.display === "grid" ||
        (c >= i && n[rF] === "none") ||
        (s && n[rF] === "none" && c + u > i))
      ? "vertical"
      : "horizontal";
  },
  iZ = function (t, r, n) {
    var i = n ? t.left : t.top,
      o = n ? t.right : t.bottom,
      s = n ? t.width : t.height,
      a = n ? r.left : r.top,
      l = n ? r.right : r.bottom,
      c = n ? r.width : r.height;
    return i === a || o === l || i + s / 2 === a + c / 2;
  },
  oZ = function (t, r) {
    var n;
    return (
      jx.some(function (i) {
        var o = i[Js].options.emptyInsertThreshold;
        if (!o || F5(i)) return;
        var s = ao(i),
          a = t >= s.left - o && t <= s.right + o,
          l = r >= s.top - o && r <= s.bottom + o;
        if (a && l) return (n = i);
      }),
      n
    );
  },
  pF = function (t) {
    function r(o, s) {
      return function (a, l, c, u) {
        var d =
          a.options.group.name &&
          l.options.group.name &&
          a.options.group.name === l.options.group.name;
        if (o == null && (s || d)) return !0;
        else if (o == null || o === !1) return !1;
        else if (s && o === "clone") return o;
        else if (typeof o === "function") return r(o(a, l, c, u), s)(a, l, c, u);
        else {
          var h = (s ? a : l).options.group.name;
          return o === !0 || (typeof o === "string" && o === h) || (o.join && o.indexOf(h) > -1);
        }
      };
    }
    var n = {},
      i = t.group;
    if (!i || Gx(i) != "object") i = { name: i };
    ((n.name = i.name),
      (n.checkPull = r(i.pull, !0)),
      (n.checkPut = r(i.put)),
      (n.revertClone = i.revertClone),
      (t.group = n));
  },
  mF = function () {
    if (!hF && wr) dr(wr, "display", "none");
  },
  gF = function () {
    if (!hF && wr) dr(wr, "display", "");
  };
if (Zx && !iF)
  document.addEventListener(
    "click",
    function (e) {
      if (Xx)
        return (
          e.preventDefault(),
          e.stopPropagation && e.stopPropagation(),
          e.stopImmediatePropagation && e.stopImmediatePropagation(),
          (Xx = !1),
          !1
        );
    },
    !0,
  );
var Hf = function (t) {
    if (gt) {
      t = t.touches ? t.touches[0] : t;
      var r = oZ(t.clientX, t.clientY);
      if (r) {
        var n = {};
        for (var i in t) if (t.hasOwnProperty(i)) n[i] = t[i];
        ((n.target = n.rootEl = r),
          (n.preventDefault = void 0),
          (n.stopPropagation = void 0),
          r[Js]._onDragOver(n));
      }
    }
  },
  sZ = function (t) {
    if (gt) gt.parentNode[Js]._isOutsideThisEl(t.target);
  };
function hr(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  ((this.el = e), (this.options = t = mu({}, t)), (e[Js] = this));
  var r = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function () {
      return fF(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function (s, a) {
      s.setData("Text", a.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold:
      (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: { x: 0, y: 0 },
    supportPointer: hr.supportPointer !== !1 && "PointerEvent" in window && (!kg || B5),
    emptyInsertThreshold: 5,
  };
  Wg.initializePlugins(this, e, r);
  for (var n in r) !(n in t) && (t[n] = r[n]);
  pF(t);
  for (var i in this)
    if (i.charAt(0) === "_" && typeof this[i] === "function") this[i] = this[i].bind(this);
  if (((this.nativeDraggable = t.forceFallback ? !1 : nZ), this.nativeDraggable))
    this.options.touchStartThreshold = 1;
  if (t.supportPointer) en(e, "pointerdown", this._onTapStart);
  else (en(e, "mousedown", this._onTapStart), en(e, "touchstart", this._onTapStart));
  if (this.nativeDraggable) (en(e, "dragover", this), en(e, "dragenter", this));
  (jx.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), mu(this, $q()));
}
hr.prototype = {
  constructor: hr,
  _isOutsideThisEl: function (t) {
    if (!this.el.contains(t) && t !== this.el) r1 = null;
  },
  _getDirection: function (t, r) {
    return typeof this.options.direction === "function"
      ? this.options.direction.call(this, t, r, gt)
      : this.options.direction;
  },
  _onTapStart: function (t) {
    if (!t.cancelable) return;
    var r = this,
      n = this.el,
      i = this.options,
      o = i.preventOnFilter,
      s = t.type,
      a = (t.touches && t.touches[0]) || (t.pointerType && t.pointerType === "touch" && t),
      l = (a || t).target,
      c =
        (t.target.shadowRoot &&
          ((t.path && t.path[0]) || (t.composedPath && t.composedPath()[0]))) ||
        l,
      u = i.filter;
    if ((pZ(n), gt)) return;
    if ((/mousedown|pointerdown/.test(s) && t.button !== 0) || i.disabled) return;
    if (c.isContentEditable) return;
    if (!this.nativeDraggable && kg && l && l.tagName.toUpperCase() === "SELECT") return;
    if (((l = zl(l, i.draggable, n, !1)), l && l.animated)) return;
    if (zx === l) return;
    if (((i1 = tl(l)), (Hg = tl(l, i.draggable)), typeof u === "function")) {
      if (u.call(this, t, l, this)) {
        (Cs({ sortable: r, rootEl: c, name: "filter", targetEl: l, toEl: n, fromEl: n }),
          $s("filter", r, { evt: t }),
          o && t.preventDefault());
        return;
      }
    } else if (u) {
      if (
        ((u = u.split(",").some(function (d) {
          if (((d = zl(c, d.trim(), n, !1)), d))
            return (
              Cs({ sortable: r, rootEl: d, name: "filter", targetEl: l, fromEl: n, toEl: n }),
              $s("filter", r, { evt: t }),
              !0
            );
        })),
        u)
      ) {
        o && t.preventDefault();
        return;
      }
    }
    if (i.handle && !zl(c, i.handle, n, !1)) return;
    this._prepareDragStart(t, a, l);
  },
  _prepareDragStart: function (t, r, n) {
    var i = this,
      { el: o, options: s } = i,
      a = o.ownerDocument,
      l;
    if (n && !gt && n.parentNode === o) {
      var c = ao(n);
      if (
        ((gi = o),
        (gt = n),
        (Bi = gt.parentNode),
        (Gf = gt.nextSibling),
        (zx = n),
        (Px = s.group),
        (hr.dragged = gt),
        (Uf = { target: gt, clientX: (r || t).clientX, clientY: (r || t).clientY }),
        (eF = Uf.clientX - c.left),
        (tF = Uf.clientY - c.top),
        (this._lastX = (r || t).clientX),
        (this._lastY = (r || t).clientY),
        (gt.style["will-change"] = "all"),
        (l = function () {
          if (($s("delayEnded", i, { evt: t }), hr.eventCanceled)) {
            i._onDrop();
            return;
          }
          if ((i._disableDelayedDragEvents(), !qB && i.nativeDraggable)) gt.draggable = !0;
          (i._triggerDragStart(t, r),
            Cs({ sortable: i, name: "choose", originalEvent: t }),
            wa(gt, s.chosenClass, !0));
        }),
        s.ignore.split(",").forEach(function (u) {
          aF(gt, u.trim(), T5);
        }),
        en(a, "dragover", Hf),
        en(a, "mousemove", Hf),
        en(a, "touchmove", Hf),
        s.supportPointer)
      )
        (en(a, "pointerup", i._onDrop), !this.nativeDraggable && en(a, "pointercancel", i._onDrop));
      else
        (en(a, "mouseup", i._onDrop),
          en(a, "touchend", i._onDrop),
          en(a, "touchcancel", i._onDrop));
      if (qB && this.nativeDraggable) ((this.options.touchStartThreshold = 4), (gt.draggable = !0));
      if (
        ($s("delayStart", this, { evt: t }),
        s.delay && (!s.delayOnTouchOnly || r) && (!this.nativeDraggable || !(Vg || gu)))
      ) {
        if (hr.eventCanceled) {
          this._onDrop();
          return;
        }
        if (s.supportPointer)
          (en(a, "pointerup", i._disableDelayedDrag),
            en(a, "pointercancel", i._disableDelayedDrag));
        else
          (en(a, "mouseup", i._disableDelayedDrag),
            en(a, "touchend", i._disableDelayedDrag),
            en(a, "touchcancel", i._disableDelayedDrag));
        (en(a, "mousemove", i._delayedDragTouchMoveHandler),
          en(a, "touchmove", i._delayedDragTouchMoveHandler),
          s.supportPointer && en(a, "pointermove", i._delayedDragTouchMoveHandler),
          (i._dragStartTimer = setTimeout(l, s.delay)));
      } else l();
    }
  },
  _delayedDragTouchMoveHandler: function (t) {
    var r = t.touches ? t.touches[0] : t;
    if (
      Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) >=
      Math.floor(
        this.options.touchStartThreshold / ((this.nativeDraggable && window.devicePixelRatio) || 1),
      )
    )
      this._disableDelayedDrag();
  },
  _disableDelayedDrag: function () {
    (gt && T5(gt), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents());
  },
  _disableDelayedDragEvents: function () {
    var t = this.el.ownerDocument;
    (jr(t, "mouseup", this._disableDelayedDrag),
      jr(t, "touchend", this._disableDelayedDrag),
      jr(t, "touchcancel", this._disableDelayedDrag),
      jr(t, "pointerup", this._disableDelayedDrag),
      jr(t, "pointercancel", this._disableDelayedDrag),
      jr(t, "mousemove", this._delayedDragTouchMoveHandler),
      jr(t, "touchmove", this._delayedDragTouchMoveHandler),
      jr(t, "pointermove", this._delayedDragTouchMoveHandler));
  },
  _triggerDragStart: function (t, r) {
    if (((r = r || (t.pointerType == "touch" && t)), !this.nativeDraggable || r))
      if (this.options.supportPointer) en(document, "pointermove", this._onTouchMove);
      else if (r) en(document, "touchmove", this._onTouchMove);
      else en(document, "mousemove", this._onTouchMove);
    else (en(gt, "dragend", this), en(gi, "dragstart", this._onDragStart));
    try {
      if (document.selection)
        Wx(function () {
          document.selection.empty();
        });
      else window.getSelection().removeAllRanges();
    } catch (n) {}
  },
  _dragStarted: function (t, r) {
    if (((n1 = !1), gi && gt)) {
      if (($s("dragStarted", this, { evt: r }), this.nativeDraggable)) en(document, "dragover", sZ);
      var n = this.options;
      (!t && wa(gt, n.dragClass, !1),
        wa(gt, n.ghostClass, !0),
        (hr.active = this),
        t && this._appendGhost(),
        Cs({ sortable: this, name: "start", originalEvent: r }));
    } else this._nulling();
  },
  _emulateDragOver: function () {
    if (Gl) {
      ((this._lastX = Gl.clientX), (this._lastY = Gl.clientY), mF());
      var t = document.elementFromPoint(Gl.clientX, Gl.clientY),
        r = t;
      while (t && t.shadowRoot) {
        if (((t = t.shadowRoot.elementFromPoint(Gl.clientX, Gl.clientY)), t === r)) break;
        r = t;
      }
      if ((gt.parentNode[Js]._isOutsideThisEl(t), r))
        do {
          if (r[Js]) {
            var n = void 0;
            if (
              ((n = r[Js]._onDragOver({
                clientX: Gl.clientX,
                clientY: Gl.clientY,
                target: t,
                rootEl: r,
              })),
              n && !this.options.dragoverBubble)
            )
              break;
          }
          t = r;
        } while ((r = sF(r)));
      gF();
    }
  },
  _onTouchMove: function (t) {
    if (Uf) {
      var r = this.options,
        { fallbackTolerance: n, fallbackOffset: i } = r,
        o = t.touches ? t.touches[0] : t,
        s = wr && o1(wr, !0),
        a = wr && s && s.a,
        l = wr && s && s.d,
        c = Ux && is && JB(is),
        u = (o.clientX - Uf.clientX + i.x) / (a || 1) + (c ? c[0] - w5[0] : 0) / (a || 1),
        d = (o.clientY - Uf.clientY + i.y) / (l || 1) + (c ? c[1] - w5[1] : 0) / (l || 1);
      if (!hr.active && !n1) {
        if (n && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < n)
          return;
        this._onDragStart(t, !0);
      }
      if (wr) {
        if (s) ((s.e += u - (v5 || 0)), (s.f += d - (C5 || 0)));
        else s = { a: 1, b: 0, c: 0, d: 1, e: u, f: d };
        var h = "matrix("
          .concat(s.a, ",")
          .concat(s.b, ",")
          .concat(s.c, ",")
          .concat(s.d, ",")
          .concat(s.e, ",")
          .concat(s.f, ")");
        (dr(wr, "webkitTransform", h),
          dr(wr, "mozTransform", h),
          dr(wr, "msTransform", h),
          dr(wr, "transform", h),
          (v5 = u),
          (C5 = d),
          (Gl = o));
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function () {
    if (!wr) {
      var t = this.options.fallbackOnBody ? document.body : gi,
        r = ao(gt, !0, Ux, !0, t),
        n = this.options;
      if (Ux) {
        is = t;
        while (dr(is, "position") === "static" && dr(is, "transform") === "none" && is !== document)
          is = is.parentNode;
        if (is !== document.body && is !== document.documentElement) {
          if (is === document) is = bc();
          ((r.top += is.scrollTop), (r.left += is.scrollLeft));
        } else is = bc();
        w5 = JB(is);
      }
      ((wr = gt.cloneNode(!0)),
        wa(wr, n.ghostClass, !1),
        wa(wr, n.fallbackClass, !0),
        wa(wr, n.dragClass, !0),
        dr(wr, "transition", ""),
        dr(wr, "transform", ""),
        dr(wr, "box-sizing", "border-box"),
        dr(wr, "margin", 0),
        dr(wr, "top", r.top),
        dr(wr, "left", r.left),
        dr(wr, "width", r.width),
        dr(wr, "height", r.height),
        dr(wr, "opacity", "0.8"),
        dr(wr, "position", Ux ? "absolute" : "fixed"),
        dr(wr, "zIndex", "100000"),
        dr(wr, "pointerEvents", "none"),
        (hr.ghost = wr),
        t.appendChild(wr),
        dr(
          wr,
          "transform-origin",
          (eF / parseInt(wr.style.width)) * 100 +
            "% " +
            (tF / parseInt(wr.style.height)) * 100 +
            "%",
        ));
    }
  },
  _onDragStart: function (t, r) {
    var n = this,
      i = t.dataTransfer,
      o = n.options;
    if (($s("dragStart", this, { evt: t }), hr.eventCanceled)) {
      this._onDrop();
      return;
    }
    if (($s("setupClone", this), !hr.eventCanceled))
      ((xi = uF(gt)),
        xi.removeAttribute("id"),
        (xi.draggable = !1),
        (xi.style["will-change"] = ""),
        this._hideClone(),
        wa(xi, this.options.chosenClass, !1),
        (hr.clone = xi));
    if (
      ((n.cloneId = Wx(function () {
        if (($s("clone", n), hr.eventCanceled)) return;
        if (!n.options.removeCloneOnHide) gi.insertBefore(xi, gt);
        (n._hideClone(), Cs({ sortable: n, name: "clone" }));
      })),
      !r && wa(gt, o.dragClass, !0),
      r)
    )
      ((Xx = !0), (n._loopId = setInterval(n._emulateDragOver, 50)));
    else {
      if (
        (jr(document, "mouseup", n._onDrop),
        jr(document, "touchend", n._onDrop),
        jr(document, "touchcancel", n._onDrop),
        i)
      )
        ((i.effectAllowed = "move"), o.setData && o.setData.call(n, i, gt));
      (en(document, "drop", n), dr(gt, "transform", "translateZ(0)"));
    }
    if (
      ((n1 = !0),
      (n._dragStartId = Wx(n._dragStarted.bind(n, r, t))),
      en(document, "selectstart", n),
      (Dg = !0),
      window.getSelection().removeAllRanges(),
      kg)
    )
      dr(document.body, "user-select", "none");
  },
  _onDragOver: function (t) {
    var r = this.el,
      n = t.target,
      i,
      o,
      s,
      a = this.options,
      l = a.group,
      c = hr.active,
      u = Px === l,
      d = a.sort,
      h = Go || c,
      f,
      p = this,
      g = !1;
    if (I5) return;
    function m(X, G) {
      $s(
        X,
        p,
        _c(
          {
            evt: t,
            isOwner: u,
            axis: f ? "vertical" : "horizontal",
            revert: s,
            dragRect: i,
            targetRect: o,
            canSort: d,
            fromSortable: h,
            target: n,
            completed: y,
            onMove: function (de, oe) {
              return Hx(gi, r, gt, i, de, ao(de), t, oe);
            },
            changed: x,
          },
          G,
        ),
      );
    }
    function A() {
      if ((m("dragOverAnimationCapture"), p.captureAnimationState(), p !== h))
        h.captureAnimationState();
    }
    function y(X) {
      if ((m("dragOverCompleted", { insertion: X }), X)) {
        if (u) c._hideClone();
        else c._showClone(p);
        if (p !== h)
          (wa(gt, Go ? Go.options.ghostClass : c.options.ghostClass, !1), wa(gt, a.ghostClass, !0));
        if (Go !== p && p !== hr.active) Go = p;
        else if (p === hr.active && Go) Go = null;
        if (h === p) p._ignoreWhileAnimating = n;
        if (
          (p.animateAll(function () {
            (m("dragOverAnimationComplete"), (p._ignoreWhileAnimating = null));
          }),
          p !== h)
        )
          (h.animateAll(), (h._ignoreWhileAnimating = null));
      }
      if ((n === gt && !gt.animated) || (n === r && !n.animated)) r1 = null;
      if (!a.dragoverBubble && !t.rootEl && n !== document)
        (gt.parentNode[Js]._isOutsideThisEl(t.target), !X && Hf(t));
      return (!a.dragoverBubble && t.stopPropagation && t.stopPropagation(), (g = !0));
    }
    function x() {
      ((Ta = tl(gt)),
        (Bd = tl(gt, a.draggable)),
        Cs({
          sortable: p,
          name: "change",
          toEl: r,
          newIndex: Ta,
          newDraggableIndex: Bd,
          originalEvent: t,
        }));
    }
    if (t.preventDefault !== void 0) t.cancelable && t.preventDefault();
    if (((n = zl(n, a.draggable, r, !0)), m("dragOver"), hr.eventCanceled)) return g;
    if (
      gt.contains(t.target) ||
      (n.animated && n.animatingX && n.animatingY) ||
      p._ignoreWhileAnimating === n
    )
      return y(!1);
    if (
      ((Xx = !1),
      c &&
        !a.disabled &&
        (u
          ? d || (s = Bi !== gi)
          : Go === this ||
            ((this.lastPutMode = Px.checkPull(this, c, gt, t)) && l.checkPut(this, c, gt, t))))
    ) {
      if (
        ((f = this._getDirection(t, n) === "vertical"),
        (i = ao(gt)),
        m("dragOverValid"),
        hr.eventCanceled)
      )
        return g;
      if (s) {
        if (((Bi = gi), A(), this._hideClone(), m("revert"), !hr.eventCanceled))
          if (Gf) gi.insertBefore(gt, Gf);
          else gi.appendChild(gt);
        return y(!0);
      }
      var b = F5(r, a.draggable);
      if (!b || (uZ(t, f, this) && !b.animated)) {
        if (b === gt) return y(!1);
        if (b && r === t.target) n = b;
        if (n) o = ao(n);
        if (Hx(gi, r, gt, i, n, o, t, !!n) !== !1) {
          if ((A(), b && b.nextSibling)) r.insertBefore(gt, b.nextSibling);
          else r.appendChild(gt);
          return ((Bi = r), x(), y(!0));
        }
      } else if (b && cZ(t, f, this)) {
        var v = s1(r, 0, a, !0);
        if (v === gt) return y(!1);
        if (((n = v), (o = ao(n)), Hx(gi, r, gt, i, n, o, t, !1) !== !1))
          return (A(), r.insertBefore(gt, v), (Bi = r), x(), y(!0));
      } else if (n.parentNode === r) {
        o = ao(n);
        var _ = 0,
          w,
          S = gt.parentNode !== r,
          E = !iZ((gt.animated && gt.toRect) || i, (n.animated && n.toRect) || o, f),
          T = f ? "top" : "left",
          M = $B(n, "top", "top") || $B(gt, "top", "top"),
          C = M ? M.scrollTop : void 0;
        if (r1 !== n) ((w = o[T]), (zg = !1), (kx = (!E && a.invertSwap) || S));
        _ = dZ(
          t,
          n,
          o,
          f,
          E ? 1 : a.swapThreshold,
          a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold,
          kx,
          r1 === n,
        );
        var R;
        if (_ !== 0) {
          var B = tl(gt);
          do ((B -= _), (R = Bi.children[B]));
          while (R && (dr(R, "display") === "none" || R === wr));
        }
        if (_ === 0 || R === n) return y(!1);
        ((r1 = n), (Gg = _));
        var L = n.nextElementSibling,
          k = !1;
        k = _ === 1;
        var z = Hx(gi, r, gt, i, n, o, t, k);
        if (z !== !1) {
          if (z === 1 || z === -1) k = z === 1;
          if (((I5 = !0), setTimeout(lZ, 30), A(), k && !L)) r.appendChild(gt);
          else n.parentNode.insertBefore(gt, k ? L : n);
          if (M) cF(M, 0, C - M.scrollTop);
          if (((Bi = gt.parentNode), w !== void 0 && !kx)) Vx = Math.abs(w - ao(n)[T]);
          return (x(), y(!0));
        }
      }
      if (r.contains(gt)) return y(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function () {
    (jr(document, "mousemove", this._onTouchMove),
      jr(document, "touchmove", this._onTouchMove),
      jr(document, "pointermove", this._onTouchMove),
      jr(document, "dragover", Hf),
      jr(document, "mousemove", Hf),
      jr(document, "touchmove", Hf));
  },
  _offUpEvents: function () {
    var t = this.el.ownerDocument;
    (jr(t, "mouseup", this._onDrop),
      jr(t, "touchend", this._onDrop),
      jr(t, "pointerup", this._onDrop),
      jr(t, "pointercancel", this._onDrop),
      jr(t, "touchcancel", this._onDrop),
      jr(document, "selectstart", this));
  },
  _onDrop: function (t) {
    var r = this.el,
      n = this.options;
    if (
      ((Ta = tl(gt)),
      (Bd = tl(gt, n.draggable)),
      $s("drop", this, { evt: t }),
      (Bi = gt && gt.parentNode),
      (Ta = tl(gt)),
      (Bd = tl(gt, n.draggable)),
      hr.eventCanceled)
    ) {
      this._nulling();
      return;
    }
    if (
      ((n1 = !1),
      (kx = !1),
      (zg = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      R5(this.cloneId),
      R5(this._dragStartId),
      this.nativeDraggable)
    )
      (jr(document, "drop", this), jr(r, "dragstart", this._onDragStart));
    if ((this._offMoveEvents(), this._offUpEvents(), kg)) dr(document.body, "user-select", "");
    if ((dr(gt, "transform", ""), t)) {
      if (Dg) (t.cancelable && t.preventDefault(), !n.dropBubble && t.stopPropagation());
      if (
        (wr && wr.parentNode && wr.parentNode.removeChild(wr),
        gi === Bi || (Go && Go.lastPutMode !== "clone"))
      )
        xi && xi.parentNode && xi.parentNode.removeChild(xi);
      if (gt) {
        if (this.nativeDraggable) jr(gt, "dragend", this);
        if ((T5(gt), (gt.style["will-change"] = ""), Dg && !n1))
          wa(gt, Go ? Go.options.ghostClass : this.options.ghostClass, !1);
        if (
          (wa(gt, this.options.chosenClass, !1),
          Cs({
            sortable: this,
            name: "unchoose",
            toEl: Bi,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: t,
          }),
          gi !== Bi)
        ) {
          if (Ta >= 0)
            (Cs({ rootEl: Bi, name: "add", toEl: Bi, fromEl: gi, originalEvent: t }),
              Cs({ sortable: this, name: "remove", toEl: Bi, originalEvent: t }),
              Cs({ rootEl: Bi, name: "sort", toEl: Bi, fromEl: gi, originalEvent: t }),
              Cs({ sortable: this, name: "sort", toEl: Bi, originalEvent: t }));
          Go && Go.save();
        } else if (Ta !== i1) {
          if (Ta >= 0)
            (Cs({ sortable: this, name: "update", toEl: Bi, originalEvent: t }),
              Cs({ sortable: this, name: "sort", toEl: Bi, originalEvent: t }));
        }
        if (hr.active) {
          if (Ta == null || Ta === -1) ((Ta = i1), (Bd = Hg));
          (Cs({ sortable: this, name: "end", toEl: Bi, originalEvent: t }), this.save());
        }
      }
    }
    this._nulling();
  },
  _nulling: function () {
    ($s("nulling", this),
      (gi =
        gt =
        Bi =
        wr =
        Gf =
        xi =
        zx =
        Fd =
        Uf =
        Gl =
        Dg =
        Ta =
        Bd =
        i1 =
        Hg =
        r1 =
        Gg =
        Go =
        Px =
        hr.dragged =
        hr.ghost =
        hr.clone =
        hr.active =
          null),
      Kx.forEach(function (t) {
        t.checked = !0;
      }),
      (Kx.length = v5 = C5 = 0));
  },
  handleEvent: function (t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        if (gt) (this._onDragOver(t), aZ(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  toArray: function () {
    var t = [],
      r,
      n = this.el.children,
      i = 0,
      o = n.length,
      s = this.options;
    for (; i < o; i++)
      if (((r = n[i]), zl(r, s.draggable, this.el, !1)))
        t.push(r.getAttribute(s.dataIdAttr) || fZ(r));
    return t;
  },
  sort: function (t, r) {
    var n = {},
      i = this.el;
    (this.toArray().forEach(function (o, s) {
      var a = i.children[s];
      if (zl(a, this.options.draggable, i, !1)) n[o] = a;
    }, this),
      r && this.captureAnimationState(),
      t.forEach(function (o) {
        if (n[o]) (i.removeChild(n[o]), i.appendChild(n[o]));
      }),
      r && this.animateAll());
  },
  save: function () {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  closest: function (t, r) {
    return zl(t, r || this.options.draggable, this.el, !1);
  },
  option: function (t, r) {
    var n = this.options;
    if (r === void 0) return n[t];
    else {
      var i = Wg.modifyOption(this, t, r);
      if (typeof i < "u") n[t] = i;
      else n[t] = r;
      if (t === "group") pF(n);
    }
  },
  destroy: function () {
    $s("destroy", this);
    var t = this.el;
    if (
      ((t[Js] = null),
      jr(t, "mousedown", this._onTapStart),
      jr(t, "touchstart", this._onTapStart),
      jr(t, "pointerdown", this._onTapStart),
      this.nativeDraggable)
    )
      (jr(t, "dragover", this), jr(t, "dragenter", this));
    (Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function (r) {
      r.removeAttribute("draggable");
    }),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      jx.splice(jx.indexOf(this.el), 1),
      (this.el = t = null));
  },
  _hideClone: function () {
    if (!Fd) {
      if (($s("hideClone", this), hr.eventCanceled)) return;
      if ((dr(xi, "display", "none"), this.options.removeCloneOnHide && xi.parentNode))
        xi.parentNode.removeChild(xi);
      Fd = !0;
    }
  },
  _showClone: function (t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Fd) {
      if (($s("showClone", this), hr.eventCanceled)) return;
      if (gt.parentNode == gi && !this.options.group.revertClone) gi.insertBefore(xi, gt);
      else if (Gf) gi.insertBefore(xi, Gf);
      else gi.appendChild(xi);
      if (this.options.group.revertClone) this.animate(gt, xi);
      (dr(xi, "display", ""), (Fd = !1));
    }
  },
};
function aZ(e) {
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  e.cancelable && e.preventDefault();
}
function Hx(e, t, r, n, i, o, s, a) {
  var l,
    c = e[Js],
    u = c.options.onMove,
    d;
  if (window.CustomEvent && !gu && !Vg)
    l = new CustomEvent("move", { bubbles: !0, cancelable: !0 });
  else ((l = document.createEvent("Event")), l.initEvent("move", !0, !0));
  if (
    ((l.to = t),
    (l.from = e),
    (l.dragged = r),
    (l.draggedRect = n),
    (l.related = i || t),
    (l.relatedRect = o || ao(t)),
    (l.willInsertAfter = a),
    (l.originalEvent = s),
    e.dispatchEvent(l),
    u)
  )
    d = u.call(c, l, s);
  return d;
}
function T5(e) {
  e.draggable = !1;
}
function lZ() {
  I5 = !1;
}
function cZ(e, t, r) {
  var n = ao(s1(r.el, 0, r.options, !0)),
    i = dF(r.el, r.options, wr),
    o = 10;
  return t
    ? e.clientX < i.left - o || (e.clientY < n.top && e.clientX < n.right)
    : e.clientY < i.top - o || (e.clientY < n.bottom && e.clientX < n.left);
}
function uZ(e, t, r) {
  var n = ao(F5(r.el, r.options.draggable)),
    i = dF(r.el, r.options, wr),
    o = 10;
  return t
    ? e.clientX > i.right + o || (e.clientY > n.bottom && e.clientX > n.left)
    : e.clientY > i.bottom + o || (e.clientX > n.right && e.clientY > n.top);
}
function dZ(e, t, r, n, i, o, s, a) {
  var l = n ? e.clientY : e.clientX,
    c = n ? r.height : r.width,
    u = n ? r.top : r.left,
    d = n ? r.bottom : r.right,
    h = !1;
  if (!s) {
    if (a && Vx < c * i) {
      if (!zg && (Gg === 1 ? l > u + (c * o) / 2 : l < d - (c * o) / 2)) zg = !0;
      if (!zg) {
        if (Gg === 1 ? l < u + Vx : l > d - Vx) return -Gg;
      } else h = !0;
    } else if (l > u + (c * (1 - i)) / 2 && l < d - (c * (1 - i)) / 2) return hZ(t);
  }
  if (((h = h || s), h)) {
    if (l < u + (c * o) / 2 || l > d - (c * o) / 2) return l > u + c / 2 ? 1 : -1;
  }
  return 0;
}
function hZ(e) {
  if (tl(gt) < tl(e)) return 1;
  else return -1;
}
function fZ(e) {
  var t = e.tagName + e.className + e.src + e.href + e.textContent,
    r = t.length,
    n = 0;
  while (r--) n += t.charCodeAt(r);
  return n.toString(36);
}
function pZ(e) {
  Kx.length = 0;
  var t = e.getElementsByTagName("input"),
    r = t.length;
  while (r--) {
    var n = t[r];
    n.checked && Kx.push(n);
  }
}
function Wx(e) {
  return setTimeout(e, 0);
}
function R5(e) {
  return clearTimeout(e);
}
if (Zx)
  en(document, "touchmove", function (e) {
    if ((hr.active || n1) && e.cancelable) e.preventDefault();
  });
hr.utils = {
  on: en,
  off: jr,
  css: dr,
  find: aF,
  is: function (t, r) {
    return !!zl(t, r, t, !1);
  },
  extend: qq,
  throttle: lF,
  closest: zl,
  toggleClass: wa,
  clone: uF,
  index: tl,
  nextTick: Wx,
  cancelNextTick: R5,
  detectDirection: fF,
  getChild: s1,
  expando: Js,
};
hr.get = function (e) {
  return e[Js];
};
hr.mount = function () {
  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  if (t[0].constructor === Array) t = t[0];
  t.forEach(function (n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
        {}.toString.call(n),
      );
    if (n.utils) hr.utils = _c(_c({}, hr.utils), n.utils);
    Wg.mount(n);
  });
};
hr.create = function (e, t) {
  return new hr(e, t);
};
hr.version = jq;
var so = [],
  Ng,
  O5,
  L5 = !1,
  E5,
  S5,
  qx,
  Pg;
function mZ() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0,
    };
    for (var t in this)
      if (t.charAt(0) === "_" && typeof this[t] === "function") this[t] = this[t].bind(this);
  }
  return (
    (e.prototype = {
      dragStarted: function (r) {
        var n = r.originalEvent;
        if (this.sortable.nativeDraggable) en(document, "dragover", this._handleAutoScroll);
        else if (this.options.supportPointer)
          en(document, "pointermove", this._handleFallbackAutoScroll);
        else if (n.touches) en(document, "touchmove", this._handleFallbackAutoScroll);
        else en(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function (r) {
        var n = r.originalEvent;
        if (!this.options.dragOverBubble && !n.rootEl) this._handleAutoScroll(n);
      },
      drop: function () {
        if (this.sortable.nativeDraggable) jr(document, "dragover", this._handleAutoScroll);
        else
          (jr(document, "pointermove", this._handleFallbackAutoScroll),
            jr(document, "touchmove", this._handleFallbackAutoScroll),
            jr(document, "mousemove", this._handleFallbackAutoScroll));
        (nF(), Qx(), Zq());
      },
      nulling: function () {
        ((qx = O5 = Ng = L5 = Pg = E5 = S5 = null), (so.length = 0));
      },
      _handleFallbackAutoScroll: function (r) {
        this._handleAutoScroll(r, !0);
      },
      _handleAutoScroll: function (r, n) {
        var i = this,
          o = (r.touches ? r.touches[0] : r).clientX,
          s = (r.touches ? r.touches[0] : r).clientY,
          a = document.elementFromPoint(o, s);
        if (((qx = r), n || this.options.forceAutoScrollFallback || Vg || gu || kg)) {
          M5(r, this.options, a, n);
          var l = Dd(a, !0);
          if (L5 && (!Pg || o !== E5 || s !== S5))
            (Pg && nF(),
              (Pg = setInterval(function () {
                var c = Dd(document.elementFromPoint(o, s), !0);
                if (c !== l) ((l = c), Qx());
                M5(r, i.options, c, n);
              }, 10)),
              (E5 = o),
              (S5 = s));
        } else {
          if (!this.options.bubbleScroll || Dd(a, !0) === bc()) {
            Qx();
            return;
          }
          M5(r, this.options, Dd(a, !1), !1);
        }
      },
    }),
    mu(e, { pluginName: "scroll", initializeByDefault: !0 })
  );
}
function Qx() {
  (so.forEach(function (e) {
    clearInterval(e.pid);
  }),
    (so = []));
}
function nF() {
  clearInterval(Pg);
}
var M5 = lF(function (e, t, r, n) {
    if (!t.scroll) return;
    var i = (e.touches ? e.touches[0] : e).clientX,
      o = (e.touches ? e.touches[0] : e).clientY,
      { scrollSensitivity: s, scrollSpeed: a } = t,
      l = bc(),
      c = !1,
      u;
    if (O5 !== r) {
      if (((O5 = r), Qx(), (Ng = t.scroll), (u = t.scrollFn), Ng === !0)) Ng = Dd(r, !0);
    }
    var d = 0,
      h = Ng;
    do {
      var f = h,
        p = ao(f),
        { top: g, bottom: m, left: A, right: y, width: x, height: b } = p,
        v = void 0,
        _ = void 0,
        { scrollWidth: w, scrollHeight: S } = f,
        E = dr(f),
        { scrollLeft: T, scrollTop: M } = f;
      if (f === l)
        ((v =
          x < w &&
          (E.overflowX === "auto" || E.overflowX === "scroll" || E.overflowX === "visible")),
          (_ =
            b < S &&
            (E.overflowY === "auto" || E.overflowY === "scroll" || E.overflowY === "visible")));
      else
        ((v = x < w && (E.overflowX === "auto" || E.overflowX === "scroll")),
          (_ = b < S && (E.overflowY === "auto" || E.overflowY === "scroll")));
      var C = v && (Math.abs(y - i) <= s && T + x < w) - (Math.abs(A - i) <= s && !!T),
        R = _ && (Math.abs(m - o) <= s && M + b < S) - (Math.abs(g - o) <= s && !!M);
      if (!so[d]) {
        for (var B = 0; B <= d; B++) if (!so[B]) so[B] = {};
      }
      if (so[d].vx != C || so[d].vy != R || so[d].el !== f) {
        if (
          ((so[d].el = f),
          (so[d].vx = C),
          (so[d].vy = R),
          clearInterval(so[d].pid),
          C != 0 || R != 0)
        )
          ((c = !0),
            (so[d].pid = setInterval(
              function () {
                if (n && this.layer === 0) hr.active._onTouchMove(qx);
                var L = so[this.layer].vy ? so[this.layer].vy * a : 0,
                  k = so[this.layer].vx ? so[this.layer].vx * a : 0;
                if (typeof u === "function") {
                  if (
                    u.call(hr.dragged.parentNode[Js], k, L, e, qx, so[this.layer].el) !== "continue"
                  )
                    return;
                }
                cF(so[this.layer].el, k, L);
              }.bind({ layer: d }),
              24,
            )));
      }
      d++;
    } while (t.bubbleScroll && h !== l && (h = Dd(h, !1)));
    L5 = c;
  }, 30),
  AF = function (t) {
    var {
      originalEvent: r,
      putSortable: n,
      dragEl: i,
      activeSortable: o,
      dispatchSortableEvent: s,
      hideGhostForTarget: a,
      unhideGhostForTarget: l,
    } = t;
    if (!r) return;
    var c = n || o;
    a();
    var u = r.changedTouches && r.changedTouches.length ? r.changedTouches[0] : r,
      d = document.elementFromPoint(u.clientX, u.clientY);
    if ((l(), c && !c.el.contains(d))) (s("spill"), this.onSpill({ dragEl: i, putSortable: n }));
  };
function D5() {}
D5.prototype = {
  startIndex: null,
  dragStart: function (t) {
    var r = t.oldDraggableIndex;
    this.startIndex = r;
  },
  onSpill: function (t) {
    var { dragEl: r, putSortable: n } = t;
    if ((this.sortable.captureAnimationState(), n)) n.captureAnimationState();
    var i = s1(this.sortable.el, this.startIndex, this.options);
    if (i) this.sortable.el.insertBefore(r, i);
    else this.sortable.el.appendChild(r);
    if ((this.sortable.animateAll(), n)) n.animateAll();
  },
  drop: AF,
};
mu(D5, { pluginName: "revertOnSpill" });
function N5() {}
N5.prototype = {
  onSpill: function (t) {
    var { dragEl: r, putSortable: n } = t,
      i = n || this.sortable;
    (i.captureAnimationState(), r.parentNode && r.parentNode.removeChild(r), i.animateAll());
  },
  drop: AF,
};
mu(N5, { pluginName: "removeOnSpill" });
hr.mount(new mZ());
hr.mount(N5, D5);
var yF = hr;
