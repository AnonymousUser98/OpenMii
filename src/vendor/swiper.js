// src/vendor/swiper.js
// Swiper: carousels in setup and pickers.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var localforage = In(Hs(), 1);
function hG(e = "") {
  return e
    .trim()
    .split(" ")
    .filter((t) => !!t.trim());
}
function fG(e) {
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function mm(e, t = 0) {
  return setTimeout(e, t);
}
function rc() {
  return Date.now();
}
function Lce(e) {
  return window.getComputedStyle(e, null);
}
function A9(e, t = "x") {
  let r = Lce(e),
    n = r.transform || r.webkitTransform;
  if (!n || n === "none") return 0;
  let i = new DOMMatrixReadOnly(n);
  return t === "x" ? i.m41 : i.m42;
}
function fA(e) {
  return (
    typeof e === "object" &&
    e !== null &&
    !!e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function Bce(e) {
  if (typeof HTMLElement < "u" && e instanceof HTMLElement) return !0;
  return !!e && typeof e === "object" && (e.nodeType === 1 || e.nodeType === 11);
}
function sa(e, ...t) {
  let r = Object(e);
  for (let n = 0; n < t.length; n += 1) {
    let i = t[n];
    if (i === void 0 || i === null || Bce(i)) continue;
    let o = i,
      s = Object.keys(Object(o));
    for (let a = 0, l = s.length; a < l; a += 1) {
      let c = s[a];
      if (c === "__proto__" || c === "constructor" || c === "prototype") continue;
      let u = Object.getOwnPropertyDescriptor(o, c);
      if (!u || !u.enumerable) continue;
      let d = o[c];
      if (fA(r[c]) && fA(d))
        if (d.__swiper__) r[c] = d;
        else sa(r[c], d);
      else if (!fA(r[c]) && fA(d))
        if (((r[c] = {}), d.__swiper__)) r[c] = d;
        else sa(r[c], d);
      else r[c] = d;
    }
  }
  return r;
}
function _h(e, t, r) {
  e.style.setProperty(t, r);
}
function Xo(e, t = "") {
  let r = [...e.children];
  if (e instanceof HTMLSlotElement) r.push(...e.assignedElements());
  return t ? r.filter((n) => n.matches(t)) : r;
}
function Fce(e, t) {
  let r = [t];
  while (r.length > 0) {
    let n = r.shift();
    if (e === n) return !0;
    r.push(
      ...n.children,
      ...(n.shadowRoot ? n.shadowRoot.children : []),
      ...(n.assignedElements ? n.assignedElements() : []),
    );
  }
  return !1;
}
function pG(e, t) {
  let r = t.contains(e);
  if (!r && t instanceof HTMLSlotElement) {
    if (((r = [...t.assignedElements()].includes(e)), !r)) r = Fce(e, t);
  }
  return r;
}
function pA(e) {
  try {
  } catch {}
}
function nc(e, t = []) {
  let r = document.createElement(e);
  return (r.classList.add(...(Array.isArray(t) ? t : hG(t))), r);
}
function mG(e, t) {
  let r = [],
    n = e.previousElementSibling;
  while (n) {
    if (!t || n.matches(t)) r.push(n);
    n = n.previousElementSibling;
  }
  return r;
}
function gG(e, t) {
  let r = [],
    n = e.nextElementSibling;
  while (n) {
    if (!t || n.matches(t)) r.push(n);
    n = n.nextElementSibling;
  }
  return r;
}
function rd(e, t) {
  return window.getComputedStyle(e, null).getPropertyValue(t);
}
function A0(e) {
  if (!e || !e.parentNode) return;
  return [...e.parentNode.children].indexOf(e);
}
function gm(e, t) {
  let r = [],
    n = e.parentElement;
  while (n) {
    if (!t || n.matches(t)) r.push(n);
    n = n.parentElement;
  }
  return r;
}
function Am(e, t) {
  if (!t) return;
  e.addEventListener("transitionend", function r(n) {
    if (n.target !== e) return;
    (e.removeEventListener("transitionend", r), t.call(e, n));
  });
}
function mA(e, t, r) {
  {
    let n = window.getComputedStyle(e, null);
    return (
      e[t === "width" ? "offsetWidth" : "offsetHeight"] +
      parseFloat(n.getPropertyValue(t === "width" ? "margin-right" : "margin-top")) +
      parseFloat(n.getPropertyValue(t === "width" ? "margin-left" : "margin-bottom"))
    );
  }
}
function Gi(e) {
  return (Array.isArray(e) ? e : [e]).filter((t) => !!t);
}
function vh(e, t = "") {
  let r = globalThis.trustedTypes;
  if (typeof r < "u") e.innerHTML = r.createPolicy("html", { createHTML: (n) => n }).createHTML(t);
  else e.innerHTML = t;
}
var y9;
function Dce() {
  if (typeof window > "u") return { touch: !1 };
  return { touch: "ontouchstart" in window || navigator.maxTouchPoints > 0 };
}
function _G() {
  if (!y9) y9 = Dce();
  return y9;
}
var x9;
function Nce({ userAgent: e } = {}) {
  if (typeof window > "u") return { ios: !1, android: !1 };
  let t = _G(),
    r = navigator.platform,
    n = e || navigator.userAgent,
    i = { ios: !1, android: !1 },
    o = /(Android);?[\s/]+([\d.]+)?/.test(n),
    s = /(iPhone\sOS|iOS|iPod)/.test(n),
    a = /iPad/.test(n),
    l = r === "MacIntel" && t.touch && navigator.maxTouchPoints > 1,
    c = a || l;
  if (o && r !== "Win32") ((i.os = "android"), (i.android = !0));
  if (c || s) ((i.os = "ios"), (i.ios = !0));
  return i;
}
function vG(e = {}) {
  if (!x9) x9 = Nce(e);
  return x9;
}
var b9;
function Pce() {
  if (typeof window > "u") return { isSafari: !1, isWebView: !1, need3dFix: !1 };
  let e = vG(),
    t = navigator.userAgent,
    r = t.toLowerCase(),
    n = r.includes("safari") && !r.includes("chrome") && !r.includes("android"),
    i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t),
    o = n || (i && e.ios);
  return { isSafari: n, isWebView: i, need3dFix: o };
}
function CG() {
  if (!b9) b9 = Pce();
  return b9;
}
var C9 = (e, t) => {
    if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
    let r = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      n = t.closest(r());
    if (n) {
      let i = n.querySelector(`.${e.params.lazyPreloaderClass}`);
      if (!i && e.isElement)
        if (n.shadowRoot) i = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
        else
          requestAnimationFrame(() => {
            if (n.shadowRoot) {
              let o = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
              if (o && !o.lazyPreloaderManaged) o.remove();
            }
          });
      if (i && !i.lazyPreloaderManaged) i.remove();
    }
  },
  _9 = (e, t) => {
    if (!e.slides[t]) return;
    let r = e.slides[t].querySelector('[loading="lazy"]');
    if (r) r.removeAttribute("loading");
  },
  wG = (e) => {
    if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
    let t = e.params.lazyPreloadPrevNext,
      r = e.slides.length;
    if (!r || !t || t < 0) return;
    t = Math.min(t, r);
    let n =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      i = e.activeIndex;
    if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
      let s = i,
        a = [s - t];
      (a.push(...Array.from({ length: t }).map((l, c) => s + n + c)),
        e.slides.forEach((l, c) => {
          if (l.column !== void 0 && a.includes(l.column)) _9(e, c);
        }));
      return;
    }
    let o = i + n - 1;
    if (e.params.rewind || e.params.loop)
      for (let s = i - t; s <= o + t; s += 1) {
        let a = ((s % r) + r) % r;
        if (a < i || a > o) _9(e, a);
      }
    else
      for (let s = Math.max(i - t, 0); s <= Math.min(o + t, r - 1); s += 1)
        if (s !== i && (s > o || s < i)) _9(e, s);
  };
function kce(e, t = "window", r) {
  if (!e || (t === "container" && !r)) return;
  let n = !1,
    i = t === "window" ? window.innerHeight : r.clientHeight,
    o = Object.keys(e).map((s) => {
      if (typeof s === "string" && s.indexOf("@") === 0) {
        let a = parseFloat(s.substr(1));
        return { value: i * a, point: s };
      }
      return { value: s, point: s };
    });
  o.sort((s, a) => parseInt(String(s.value), 10) - parseInt(String(a.value), 10));
  for (let s = 0; s < o.length; s += 1) {
    let { point: a, value: l } = o[s];
    if (t === "window") {
      if (window.matchMedia(`(min-width: ${l}px)`).matches) n = a;
    } else if (l <= r.clientWidth) n = a;
  }
  return n || "max";
}
var AG = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
function Uce() {
  let e = this,
    { realIndex: t, initialized: r, params: n, el: i } = e,
    o = n.breakpoints;
  if (!o || (o && Object.keys(o).length === 0)) return;
  let s = n.breakpointsBase === "window" || !n.breakpointsBase ? n.breakpointsBase : "container",
    a =
      ["window", "container"].includes(n.breakpointsBase) || !n.breakpointsBase
        ? e.el
        : document.querySelector(n.breakpointsBase),
    l = e.getBreakpoint(o, s, a);
  if (!l || e.currentBreakpoint === l) return;
  let c = o,
    d = (l in c ? c[l] : void 0) || e.originalParams,
    h = AG(e, n),
    f = AG(e, d),
    p = e.params.grabCursor,
    g = d.grabCursor,
    m = n.enabled;
  if (h && !f)
    (i.classList.remove(
      `${n.containerModifierClass}grid`,
      `${n.containerModifierClass}grid-column`,
    ),
      e.emitContainerClasses());
  else if (!h && f) {
    if (
      (i.classList.add(`${n.containerModifierClass}grid`),
      (d.grid.fill && d.grid.fill === "column") || (!d.grid.fill && n.grid.fill === "column"))
    )
      i.classList.add(`${n.containerModifierClass}grid-column`);
    e.emitContainerClasses();
  }
  if (p && !g) e.unsetGrabCursor();
  else if (!p && g) e.setGrabCursor();
  let A = (w, S) => w[S];
  ["navigation", "pagination", "scrollbar"].forEach((w) => {
    let S = A(d, w);
    if (typeof S > "u") return;
    let E = A(n, w),
      T = typeof E === "object" && E !== null && E.enabled,
      M = typeof S === "object" && S !== null && S.enabled,
      C = e[w];
    if (T && !M) C?.disable?.();
    if (!T && M) C?.enable?.();
  });
  let y = d.direction && d.direction !== n.direction,
    x = n.loop && (d.slidesPerView !== n.slidesPerView || y),
    b = n.loop;
  if (y && r) e.changeDirection();
  sa(e.params, d);
  let v = e.params.enabled,
    _ = e.params.loop;
  if (
    (Object.assign(e, {
      allowTouchMove: e.params.allowTouchMove,
      allowSlideNext: e.params.allowSlideNext,
      allowSlidePrev: e.params.allowSlidePrev,
    }),
    m && !v)
  )
    e.disable();
  else if (!m && v) e.enable();
  if (((e.currentBreakpoint = l), e.emit("_beforeBreakpoint", d), r)) {
    if (x) (e.loopDestroy(), e.updateSlides(), e.loopCreate(t));
    else if (!b && _) (e.updateSlides(), e.loopCreate(t));
    else if (b && !_) e.loopDestroy();
  }
  e.emit("breakpoint", d);
}
var Hce = { setBreakpoint: Uce, getBreakpoint: kce };
function Gce() {
  let e = this,
    { isLocked: t, params: r } = e,
    { slidesOffsetBefore: n } = r;
  if (n) {
    let i = e.slides.length - 1,
      o = e.slidesGrid[i] + e.slidesSizesGrid[i] + n * 2;
    e.isLocked = e.size > o;
  } else e.isLocked = e.snapGrid.length === 1;
  if (r.allowSlideNext === !0) e.allowSlideNext = !e.isLocked;
  if (r.allowSlidePrev === !0) e.allowSlidePrev = !e.isLocked;
  if (t && t !== e.isLocked) e.isEnd = !1;
  if (t !== e.isLocked) e.emit(e.isLocked ? "lock" : "unlock");
}
var zce = { checkOverflow: Gce };
function Vce(e, t) {
  let r = [];
  return (
    e.forEach((n) => {
      if (typeof n === "object")
        Object.keys(n).forEach((i) => {
          if (n[i]) r.push(t + i);
        });
      else if (typeof n === "string") r.push(t + n);
    }),
    r
  );
}
function Wce() {
  let e = this,
    { classNames: t, params: r, rtl: n, el: i, device: o } = e,
    s = Vce(
      [
        "initialized",
        r.direction,
        { "free-mode": e.params.freeMode && r.freeMode.enabled },
        { autoheight: r.autoHeight },
        { rtl: n },
        { grid: r.grid && r.grid.rows > 1 },
        { "grid-column": r.grid && r.grid.rows > 1 && r.grid.fill === "column" },
        { android: o.android },
        { ios: o.ios },
        { "css-mode": r.cssMode },
        { centered: r.cssMode && r.centeredSlides },
        { "watch-progress": r.watchSlidesProgress },
      ],
      r.containerModifierClass,
    );
  (t.push(...s), i.classList.add(...t), e.emitContainerClasses());
}
function Qce() {
  let e = this,
    { el: t, classNames: r } = e;
  if (!t || typeof t === "string") return;
  (t.classList.remove(...r), e.emitContainerClasses());
}
var Yce = { addClasses: Wce, removeClasses: Qce },
  TG = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    snapToSlideEdge: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreload: !0,
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  },
  Xce = {
    on(e, t, r) {
      let n = this;
      if (!n.eventsListeners || n.destroyed) return n;
      if (typeof t !== "function") return n;
      let i = r ? "unshift" : "push";
      return (
        e.split(" ").forEach((o) => {
          if (!n.eventsListeners[o]) n.eventsListeners[o] = [];
          n.eventsListeners[o][i](t);
        }),
        n
      );
    },
    once(e, t, r) {
      let n = this;
      if (!n.eventsListeners || n.destroyed) return n;
      if (typeof t !== "function") return n;
      let i = function (...s) {
        if ((n.off(e, i), i.__emitterProxy)) delete i.__emitterProxy;
        t.apply(n, s);
      };
      return ((i.__emitterProxy = t), n.on(e, i, r));
    },
    onAny(e, t) {
      let r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if (typeof e !== "function") return r;
      let n = t ? "unshift" : "push";
      if (r.eventsAnyListeners.indexOf(e) < 0) r.eventsAnyListeners[n](e);
      return r;
    },
    offAny(e) {
      let t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      let r = t.eventsAnyListeners.indexOf(e);
      if (r >= 0) t.eventsAnyListeners.splice(r, 1);
      return t;
    },
    off(e, t) {
      let r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if (!r.eventsListeners) return r;
      return (
        e.split(" ").forEach((n) => {
          if (typeof t > "u") r.eventsListeners[n] = [];
          else if (r.eventsListeners[n])
            r.eventsListeners[n].forEach((i, o) => {
              if (i === t || (i.__emitterProxy && i.__emitterProxy === t))
                r.eventsListeners[n].splice(o, 1);
            });
        }),
        r
      );
    },
    emit(...e) {
      let t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let r, n, i;
      if (typeof e[0] === "string" || Array.isArray(e[0]))
        ((r = e[0]), (n = e.slice(1, e.length)), (i = t));
      else {
        let s = e[0];
        ((r = s.events), (n = s.data ?? []), (i = s.context || t));
      }
      return (
        n.unshift(i),
        (Array.isArray(r) ? r : r.split(" ")).forEach((s) => {
          if (t.eventsAnyListeners && t.eventsAnyListeners.length)
            t.eventsAnyListeners.forEach((a) => {
              a.apply(i, [s, ...n]);
            });
          if (t.eventsListeners && t.eventsListeners[s])
            t.eventsListeners[s].forEach((a) => {
              a.apply(i, n);
            });
        }),
        t
      );
    },
  };
function jce(e) {
  let t = this;
  if (t.destroyed) return;
  if (!t.enabled) return;
  if (!t.allowClick) {
    if (t.params.preventClicks) e.preventDefault();
    if (t.params.preventClicksPropagation && t.animating)
      (e.stopPropagation(), e.stopImmediatePropagation());
  }
}
function Kce() {
  let e = this;
  if (e.destroyed) return;
  if (e.documentTouchHandlerProceeded) return;
  if (((e.documentTouchHandlerProceeded = !0), e.params.touchReleaseOnEdges))
    e.el.style.touchAction = "auto";
}
function qce(e) {
  let t = this;
  if (t.destroyed) return;
  if (
    (C9(t, e.target),
    e.type === "error" ||
      t.params.cssMode ||
      (t.params.slidesPerView !== "auto" && !t.params.autoHeight))
  )
    return;
  t.update();
}
function Zce() {
  let e = this,
    { params: t, el: r } = e;
  if (r && r.offsetWidth === 0) return;
  if (t.breakpoints) e.setBreakpoint();
  let { allowSlideNext: n, allowSlidePrev: i, snapGrid: o } = e,
    s = e.virtual && e.params.virtual?.enabled;
  ((e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses());
  let a = s && t.loop;
  if (
    (t.slidesPerView === "auto" || t.slidesPerView > 1) &&
    e.isEnd &&
    !e.isBeginning &&
    !e.params.centeredSlides &&
    !a
  ) {
    let l = s ? e.virtual.slides.length : e.slides.length;
    e.slideTo(l - 1, 0, !1, !0);
  } else if (e.params.loop && !s) e.slideToLoop(e.realIndex, 0, !1, !0);
  else e.slideTo(e.activeIndex, 0, !1, !0);
  if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
    let l = e.autoplay;
    (clearTimeout(l.resizeTimeout),
      (l.resizeTimeout = setTimeout(() => {
        if (e.autoplay && e.autoplay.running && e.autoplay.paused) e.autoplay.resume();
      }, 500)));
  }
  if (((e.allowSlidePrev = i), (e.allowSlideNext = n), e.params.watchOverflow && o !== e.snapGrid))
    e.checkOverflow();
}
function $ce() {
  let e = this;
  if (e.destroyed) return;
  let { wrapperEl: t, rtlTranslate: r, enabled: n } = e;
  if (!n) return;
  if (((e.previousTranslate = e.translate), e.isHorizontal())) e.translate = -t.scrollLeft;
  else e.translate = -t.scrollTop;
  if (e.translate === 0) e.translate = 0;
  (e.updateActiveIndex(), e.updateSlidesClasses());
  let i,
    o = e.maxTranslate() - e.minTranslate();
  if (o === 0) i = 0;
  else i = (e.translate - e.minTranslate()) / o;
  if (i !== e.progress) e.updateProgress(r ? -e.translate : e.translate);
  e.emit("setTranslate", e.translate, !1);
}
function Jce(e) {
  let t = this;
  if (t.destroyed) return;
  let r = t.touchEventsData,
    n = e.originalEvent ?? e;
  if (!(n.type === "touchend" || n.type === "touchcancel")) {
    if (r.touchId !== null) return;
    if (n.pointerId !== r.pointerId) return;
  } else {
    let v = [...n.changedTouches].find((_) => _.identifier === r.touchId);
    if (!v || v.identifier !== r.touchId) return;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(n.type)) {
    if (
      !(
        ["pointercancel", "contextmenu"].includes(n.type) &&
        (t.browser.isSafari || t.browser.isWebView)
      )
    )
      return;
  }
  ((r.pointerId = null),
    (r.touchId = null),
    (r.startEventPath = void 0),
    (r.lastMoveEvent = void 0));
  let { params: o, touches: s, rtlTranslate: a, slidesGrid: l, enabled: c } = t;
  if (!c) return;
  if (!o.simulateTouch && n.pointerType === "mouse") return;
  if (r.allowTouchCallbacks) t.emit("touchEnd", n);
  if (((r.allowTouchCallbacks = !1), !r.isTouched)) {
    if (r.isMoved && o.grabCursor) t.setGrabCursor(!1);
    ((r.isMoved = !1), (r.startMoving = !1));
    return;
  }
  if (
    o.grabCursor &&
    r.isMoved &&
    r.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0)
  )
    t.setGrabCursor(!1);
  let u = rc(),
    d = u - r.touchStartTime;
  if (t.allowClick) {
    let b = n.path ?? (n.composedPath && n.composedPath());
    if (
      (t.updateClickedSlide(b && b[0], b),
      t.emit("tap click", n),
      d < 300 && u - r.lastClickTime < 300)
    )
      t.emit("doubleTap doubleClick", n);
  }
  if (
    ((r.lastClickTime = rc()),
    mm(() => {
      if (!t.destroyed) t.allowClick = !0;
    }),
    !r.isTouched ||
      !r.isMoved ||
      !t.swipeDirection ||
      (s.diff === 0 && !r.loopSwapReset) ||
      (r.currentTranslate === r.startTranslate && !r.loopSwapReset))
  ) {
    ((r.isTouched = !1), (r.isMoved = !1), (r.startMoving = !1));
    return;
  }
  ((r.isTouched = !1), (r.isMoved = !1), (r.startMoving = !1));
  let h;
  if (o.followFinger) h = a ? t.translate : -t.translate;
  else h = -(r.currentTranslate ?? 0);
  if (o.cssMode) return;
  if (o.freeMode && o.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: h });
    return;
  }
  let f = h >= -t.maxTranslate() && !t.params.loop,
    p = 0,
    g = t.slidesSizesGrid[0];
  for (let b = 0; b < l.length; b += b < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    let v = b < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    if (typeof l[b + v] < "u") {
      if (f || (h >= l[b] && h < l[b + v])) ((p = b), (g = l[b + v] - l[b]));
    } else if (f || h >= l[b]) ((p = b), (g = l[l.length - 1] - l[l.length - 2]));
  }
  let m = null,
    A = null;
  if (o.rewind) {
    if (t.isBeginning)
      A = o.virtual?.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1;
    else if (t.isEnd) m = 0;
  }
  let y = (h - l[p]) / g,
    x = p < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (d > o.longSwipesMs) {
    if (!o.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    if (t.swipeDirection === "next")
      if (y >= o.longSwipesRatio) t.slideTo(o.rewind && t.isEnd ? m : p + x);
      else t.slideTo(p);
    if (t.swipeDirection === "prev")
      if (y > 1 - o.longSwipesRatio) t.slideTo(p + x);
      else if (A !== null && y < 0 && Math.abs(y) > o.longSwipesRatio) t.slideTo(A);
      else t.slideTo(p);
  } else {
    if (!o.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    if (!(t.navigation && (n.target === t.navigation.nextEl || n.target === t.navigation.prevEl))) {
      if (t.swipeDirection === "next") t.slideTo(m !== null ? m : p + x);
      if (t.swipeDirection === "prev") t.slideTo(A !== null ? A : p);
    } else if (n.target === t.navigation.nextEl) t.slideTo(p + x);
    else t.slideTo(p);
  }
}
function eue(e) {
  let t = this;
  if (t.destroyed) return;
  let r = t.touchEventsData,
    { params: n, touches: i, rtlTranslate: o, enabled: s } = t;
  if (!s) return;
  if (!n.simulateTouch && e.pointerType === "mouse") return;
  let a = e,
    l = a.originalEvent ?? a;
  if (l.type === "pointermove") {
    if (r.touchId !== null) return;
    if (l.pointerId !== r.pointerId) return;
  }
  let c;
  if (l.type === "touchmove") {
    let w = [...l.changedTouches].find((S) => S.identifier === r.touchId);
    if (!w || w.identifier !== r.touchId) return;
    c = w;
  } else c = l;
  if (!r.isTouched) {
    if (r.startMoving && r.isScrolling) t.emit("touchMoveOpposite", l);
    return;
  }
  if (r.lastMoveEvent === l) return;
  r.lastMoveEvent = l;
  for (let _ of r.startEventPath ?? []) {
    if (_ === t.el) break;
    let w = _.swiper;
    if (w && w !== t && !w.destroyed && w.params.nested && w.touchEventsData.isTouched)
      w.onTouchMove(e);
  }
  let u = c.pageX,
    d = c.pageY;
  if (l.preventedByNestedSwiper) {
    ((i.startX = u), (i.startY = d));
    return;
  }
  if (!t.allowTouchMove) {
    if (!l.target.matches(r.focusableElements)) t.allowClick = !1;
    if (r.isTouched)
      (Object.assign(i, { startX: u, startY: d, currentX: u, currentY: d }),
        (r.touchStartTime = rc()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop) {
    if (t.isVertical()) {
      if (
        (d < i.startY && t.translate <= t.maxTranslate()) ||
        (d > i.startY && t.translate >= t.minTranslate())
      ) {
        ((r.isTouched = !1), (r.isMoved = !1));
        return;
      }
    } else if (
      o &&
      ((u > i.startX && -t.translate <= t.maxTranslate()) ||
        (u < i.startX && -t.translate >= t.minTranslate()))
    )
      return;
    else if (
      !o &&
      ((u < i.startX && t.translate <= t.maxTranslate()) ||
        (u > i.startX && t.translate >= t.minTranslate()))
    )
      return;
  }
  if (
    document.activeElement &&
    document.activeElement.matches(r.focusableElements) &&
    document.activeElement !== l.target &&
    l.pointerType !== "mouse"
  )
    document.activeElement.blur();
  if (document.activeElement) {
    if (l.target === document.activeElement && l.target.matches(r.focusableElements)) {
      ((r.isMoved = !0), (t.allowClick = !1));
      return;
    }
  }
  if (r.allowTouchCallbacks) t.emit("touchMove", l);
  ((i.previousX = i.currentX), (i.previousY = i.currentY), (i.currentX = u), (i.currentY = d));
  let h = i.currentX - i.startX,
    f = i.currentY - i.startY;
  if (t.params.threshold && Math.sqrt(h ** 2 + f ** 2) < t.params.threshold) return;
  if (typeof r.isScrolling > "u") {
    let _;
    if (
      (t.isHorizontal() && i.currentY === i.startY) ||
      (t.isVertical() && i.currentX === i.startX)
    )
      r.isScrolling = !1;
    else if (h * h + f * f >= 25)
      ((_ = (Math.atan2(Math.abs(f), Math.abs(h)) * 180) / Math.PI),
        (r.isScrolling = t.isHorizontal() ? _ > n.touchAngle : 90 - _ > n.touchAngle));
  }
  if (r.isScrolling) t.emit("touchMoveOpposite", l);
  if (typeof r.startMoving > "u") {
    if (i.currentX !== i.startX || i.currentY !== i.startY) r.startMoving = !0;
  }
  if (r.isScrolling || (l.type === "touchmove" && r.preventTouchMoveFromPointerMove)) {
    r.isTouched = !1;
    return;
  }
  if (!r.startMoving) return;
  if (((t.allowClick = !1), !n.cssMode && l.cancelable)) l.preventDefault();
  if (n.touchMoveStopPropagation && !n.nested) l.stopPropagation();
  let p = t.isHorizontal() ? h : f,
    g = t.isHorizontal() ? i.currentX - i.previousX : i.currentY - i.previousY;
  if (n.oneWayMovement) ((p = Math.abs(p) * (o ? 1 : -1)), (g = Math.abs(g) * (o ? 1 : -1)));
  if (((i.diff = p), (p *= n.touchRatio), o)) ((p = -p), (g = -g));
  let m = t.touchesDirection;
  ((t.swipeDirection = p > 0 ? "prev" : "next"), (t.touchesDirection = g > 0 ? "prev" : "next"));
  let A = t.params.loop && !n.cssMode,
    y =
      (t.touchesDirection === "next" && t.allowSlideNext) ||
      (t.touchesDirection === "prev" && t.allowSlidePrev);
  if (!r.isMoved) {
    if (A && y) t.loopFix({ direction: t.swipeDirection });
    if (((r.startTranslate = t.getTranslate()), t.setTransition(0), t.animating)) {
      let _ = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(_);
    }
    if (
      ((r.allowMomentumBounce = !1),
      n.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0))
    )
      t.setGrabCursor(!0);
    t.emit("sliderFirstMove", l);
  }
  if (
    (/*@__PURE__*/ new Date().getTime(),
    n._loopSwapReset !== !1 &&
      r.isMoved &&
      r.allowThresholdMove &&
      m !== t.touchesDirection &&
      A &&
      y &&
      Math.abs(p) >= 1)
  ) {
    (Object.assign(i, {
      startX: u,
      startY: d,
      currentX: u,
      currentY: d,
      startTranslate: r.currentTranslate,
    }),
      (r.loopSwapReset = !0),
      (r.startTranslate = r.currentTranslate));
    return;
  }
  (t.emit("sliderMove", l), (r.isMoved = !0));
  let x = r.startTranslate ?? 0;
  r.currentTranslate = p + x;
  let b = !0,
    v = n.resistanceRatio;
  if (n.touchReleaseOnEdges) v = 0;
  if (p > 0) {
    if (
      A &&
      y &&
      !0 &&
      r.allowThresholdMove &&
      r.currentTranslate >
        (n.centeredSlides
          ? t.minTranslate() -
            t.slidesSizesGrid[t.activeIndex + 1] -
            (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2
              ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
              : 0) -
            t.params.spaceBetween
          : t.minTranslate())
    )
      t.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 });
    if (r.currentTranslate > t.minTranslate()) {
      if (((b = !1), n.resistance))
        r.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + x + p) ** v;
    }
  } else if (p < 0) {
    if (
      A &&
      y &&
      !0 &&
      r.allowThresholdMove &&
      r.currentTranslate <
        (n.centeredSlides
          ? t.maxTranslate() +
            t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
            t.params.spaceBetween +
            (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2
              ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween
              : 0)
          : t.maxTranslate())
    )
      t.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex:
          t.slides.length -
          (n.slidesPerView === "auto"
            ? t.slidesPerViewDynamic()
            : Math.ceil(parseFloat(String(n.slidesPerView)))),
      });
    if (r.currentTranslate < t.maxTranslate()) {
      if (((b = !1), n.resistance))
        r.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - x - p) ** v;
    }
  }
  if (b) l.preventedByNestedSwiper = !0;
  if (!t.allowSlideNext && t.swipeDirection === "next" && (r.currentTranslate ?? 0) < x)
    r.currentTranslate = x;
  if (!t.allowSlidePrev && t.swipeDirection === "prev" && (r.currentTranslate ?? 0) > x)
    r.currentTranslate = x;
  if (!t.allowSlidePrev && !t.allowSlideNext) r.currentTranslate = x;
  if (n.threshold > 0)
    if (Math.abs(p) > n.threshold || r.allowThresholdMove) {
      if (!r.allowThresholdMove) {
        ((r.allowThresholdMove = !0),
          (i.startX = i.currentX),
          (i.startY = i.currentY),
          (r.currentTranslate = r.startTranslate),
          (i.diff = t.isHorizontal() ? i.currentX - i.startX : i.currentY - i.startY));
        return;
      }
    } else {
      r.currentTranslate = r.startTranslate;
      return;
    }
  if (!n.followFinger || n.cssMode) return;
  if ((n.freeMode && n.freeMode.enabled && t.freeMode) || n.watchSlidesProgress)
    (t.updateActiveIndex(), t.updateSlidesClasses());
  if (n.freeMode && n.freeMode.enabled && t.freeMode) t.freeMode.onTouchMove();
  (t.updateProgress(r.currentTranslate), t.setTranslate(r.currentTranslate ?? 0));
}
function tue(e, t) {
  function r(n) {
    if (!n || n === document || n === window) return null;
    let i = n;
    if (i.assignedSlot) i = i.assignedSlot;
    let o = i.closest(e);
    if (!o && !i.getRootNode) return null;
    let s = i.getRootNode();
    return o || r(s.host);
  }
  return r(t);
}
function yG(e, t, r) {
  let { params: n } = e,
    { edgeSwipeDetection: i, edgeSwipeThreshold: o } = n;
  if (i && (r <= o || r >= window.innerWidth - o)) {
    if (i === "prevent") return (t.preventDefault(), !0);
    return !1;
  }
  return !0;
}
function rue(e) {
  let t = this;
  if (t.destroyed) return;
  let r = e.originalEvent ?? e,
    n = t.touchEventsData;
  if (r.type === "pointerdown") {
    let y = r;
    if (n.pointerId !== null && n.pointerId !== y.pointerId) return;
    n.pointerId = y.pointerId;
  } else if (r.type === "touchstart" && r.targetTouches.length === 1)
    n.touchId = r.targetTouches[0].identifier;
  if (r.type === "touchstart") {
    yG(t, r, r.targetTouches[0].pageX);
    return;
  }
  let { params: i, touches: o, enabled: s } = t;
  if (!s) return;
  if (!i.simulateTouch && r.pointerType === "mouse") return;
  if (t.animating && i.preventInteractionOnTransition) return;
  if (!t.animating && i.cssMode && i.loop) t.loopFix();
  let a = r.target;
  if (i.touchEventsTarget === "wrapper") {
    if (!pG(a, t.wrapperEl)) return;
  }
  let l = r;
  if (typeof l.which === "number" && l.which === 3) return;
  if (typeof l.button === "number" && l.button > 0) return;
  if (n.isTouched && n.isMoved) return;
  let c = !!i.noSwipingClass && i.noSwipingClass !== "",
    u = r.composedPath ? r.composedPath() : r.path;
  if (c && r.target && r.target.shadowRoot && u) a = u[0];
  let d = i.noSwipingSelector ? i.noSwipingSelector : `.${i.noSwipingClass}`,
    h = !!(r.target && r.target.shadowRoot);
  if (i.noSwiping && (h ? tue(d, a) : a.closest(d))) {
    t.allowClick = !0;
    return;
  }
  if (i.swipeHandler) {
    if (typeof i.swipeHandler === "string" && !a.closest(i.swipeHandler)) return;
  }
  let f = r;
  ((o.currentX = f.pageX), (o.currentY = f.pageY));
  let { currentX: p, currentY: g } = o;
  if (!yG(t, r, p)) return;
  if (
    (Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
    (o.startX = p),
    (o.startY = g),
    (n.touchStartTime = rc()),
    (n.startEventPath = u),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    i.threshold > 0)
  )
    n.allowThresholdMove = !1;
  let m = !0;
  if (a.matches(n.focusableElements)) {
    if (((m = !1), a.nodeName === "SELECT")) n.isTouched = !1;
  }
  if (
    document.activeElement &&
    document.activeElement.matches(n.focusableElements) &&
    document.activeElement !== a &&
    (f.pointerType === "mouse" || (f.pointerType !== "mouse" && !a.matches(n.focusableElements)))
  )
    document.activeElement.blur();
  let A = m && t.allowTouchMove && i.touchStartPreventDefault;
  if ((i.touchStartForcePreventDefault || A) && !a.isContentEditable) r.preventDefault();
  if (i.freeMode && i.freeMode.enabled && t.freeMode && t.animating && !i.cssMode)
    t.freeMode.onTouchStart();
  t.emit("touchStart", r);
}
var EG = (e, t) => {
  let { params: r, el: n, wrapperEl: i, device: o } = e,
    s = !!r.nested,
    a = t === "on" ? "addEventListener" : "removeEventListener",
    l = t;
  if (!n || typeof n === "string") return;
  if (
    (document[a]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: s }),
    n[a]("touchstart", e.onTouchStart, { passive: !1 }),
    n[a]("pointerdown", e.onTouchStart, { passive: !1 }),
    document[a]("touchmove", e.onTouchMove, { passive: !1, capture: s }),
    document[a]("pointermove", e.onTouchMove, { passive: !1, capture: s }),
    document[a]("touchend", e.onTouchEnd, { passive: !0 }),
    document[a]("pointerup", e.onTouchEnd, { passive: !0 }),
    document[a]("pointercancel", e.onTouchEnd, { passive: !0 }),
    document[a]("touchcancel", e.onTouchEnd, { passive: !0 }),
    document[a]("pointerout", e.onTouchEnd, { passive: !0 }),
    document[a]("pointerleave", e.onTouchEnd, { passive: !0 }),
    document[a]("contextmenu", e.onTouchEnd, { passive: !0 }),
    r.preventClicks || r.preventClicksPropagation)
  )
    n[a]("click", e.onClick, !0);
  if (r.cssMode) i[a]("scroll", e.onScroll);
  let c = (u) => {
    e[l](u, Zce, !0);
  };
  if (r.updateOnWindowResize)
    c(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate");
  else c("observerUpdate");
  if (r.lazyPreload)
    (n[a]("load", e.onLoad, { capture: !0 }), n[a]("error", e.onLoad, { capture: !0 }));
};
function nue() {
  let e = this,
    { params: t } = e;
  if (
    ((e.onTouchStart = rue.bind(e)),
    (e.onTouchMove = eue.bind(e)),
    (e.onTouchEnd = Jce.bind(e)),
    (e.onDocumentTouchStart = Kce.bind(e)),
    t.cssMode)
  )
    e.onScroll = $ce.bind(e);
  ((e.onClick = jce.bind(e)), (e.onLoad = qce.bind(e)), EG(e, "on"));
}
function iue() {
  EG(this, "off");
}
var oue = { attachEvents: nue, detachEvents: iue };
function sue(e) {
  let t = this;
  if (!t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode) return;
  let r = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  if (t.isElement) t.__preventObserver__ = !0;
  if (((r.style.cursor = "move"), (r.style.cursor = e ? "grabbing" : "grab"), t.isElement))
    requestAnimationFrame(() => {
      t.__preventObserver__ = !1;
    });
}
function aue() {
  let e = this;
  if ((e.params.watchOverflow && e.isLocked) || e.params.cssMode) return;
  if (e.isElement) e.__preventObserver__ = !0;
  if (
    ((e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = ""),
    e.isElement)
  )
    requestAnimationFrame(() => {
      e.__preventObserver__ = !1;
    });
}
var lue = { setGrabCursor: sue, unsetGrabCursor: aue };
function cue(e, t) {
  let r = this,
    { params: n, slidesEl: i } = r;
  if (!n.loop || (r.virtual && r.params.virtual?.enabled)) return;
  let o = () => {
      Xo(i, `.${n.slideClass}, swiper-slide`).forEach((p, g) => {
        p.setAttribute("data-swiper-slide-index", String(g));
      });
    },
    s = () => {
      let f = Xo(i, `.${n.slideBlankClass}`);
      if (
        (f.forEach((p) => {
          p.remove();
        }),
        f.length > 0)
      )
        (r.recalcSlides(), r.updateSlides());
    },
    a = r.grid && n.grid && n.grid.rows > 1;
  if (n.loopAddBlankSlides && (n.slidesPerGroup > 1 || a)) s();
  let l = n.slidesPerGroup * (a ? n.grid.rows : 1),
    c = r.slides.length % l !== 0,
    u = a && r.slides.length % n.grid.rows !== 0,
    d = (f) => {
      for (let p = 0; p < f; p += 1) {
        let g = r.isElement
          ? nc("swiper-slide", [n.slideBlankClass])
          : nc("div", [n.slideClass, n.slideBlankClass]);
        r.slidesEl.append(g);
      }
    };
  if (c) {
    if (n.loopAddBlankSlides) {
      let f = l - (r.slides.length % l);
      (d(f), r.recalcSlides(), r.updateSlides());
    } else
      pA(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    o();
  } else if (u) {
    if (n.loopAddBlankSlides) {
      let f = n.grid.rows - (r.slides.length % n.grid.rows);
      (d(f), r.recalcSlides(), r.updateSlides());
    } else
      pA(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    o();
  } else o();
  let h = n.centeredSlides || !!n.slidesOffsetBefore || !!n.slidesOffsetAfter;
  r.loopFix({ slideRealIndex: e, direction: h ? void 0 : "next", initial: t });
}
function uue() {
  let e = this,
    { params: t, slidesEl: r } = e;
  if (!t.loop || !r || (e.virtual && e.params.virtual?.enabled)) return;
  e.recalcSlides();
  let n = [];
  (e.slides.forEach((i) => {
    let o = i,
      s =
        typeof o.swiperSlideIndex > "u"
          ? Number(i.getAttribute("data-swiper-slide-index"))
          : o.swiperSlideIndex;
    n[s] = i;
  }),
    e.slides.forEach((i) => {
      i.removeAttribute("data-swiper-slide-index");
    }),
    n.forEach((i) => {
      r.append(i);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0));
}
function due(e = {}) {
  let {
      slideRealIndex: t,
      slideTo: r = !0,
      direction: n,
      setTranslate: i,
      activeSlideIndex: o,
      initial: s,
      byController: a,
      byMousewheel: l,
    } = e,
    c = o,
    u = this;
  if (!u.params.loop) return;
  if (u.params.watchOverflow && u.isLocked) return;
  (u.emit("beforeLoopFix"), (u.__loopFixInProgress__ = !0));
  let { slides: d, allowSlidePrev: h, allowSlideNext: f, slidesEl: p, params: g } = u,
    { centeredSlides: m, slidesOffsetBefore: A, slidesOffsetAfter: y, initialSlide: x } = g,
    b = m || !!A || !!y;
  if (((u.allowSlidePrev = !0), (u.allowSlideNext = !0), u.virtual && g.virtual?.enabled)) {
    if (r) {
      let Z = u.virtual.slides.length,
        F = u.virtual.slidesBefore ?? 0;
      if (!b && u.snapIndex === 0) u.slideTo(Z, 0, !1, !0);
      else if (b && u.snapIndex < g.slidesPerView) u.slideTo(Z + u.snapIndex, 0, !1, !0);
      else if (u.snapIndex === u.snapGrid.length - 1) u.slideTo(F, 0, !1, !0);
    }
    ((u.allowSlidePrev = h),
      (u.allowSlideNext = f),
      (u.__loopFixInProgress__ = !1),
      u.emit("loopFix"));
    return;
  }
  let v = g.slidesPerView;
  if (v === "auto") v = u.slidesPerViewDynamic();
  else if (((v = Math.ceil(parseFloat(String(g.slidesPerView)))), b && v % 2 === 0)) v = v + 1;
  let _ = g.slidesPerGroupAuto ? v : g.slidesPerGroup,
    w = (Z) => (typeof Z === "function" ? Z.call(u) : Z) || 0,
    S =
      u.slidesGrid.length > 1
        ? (u.slidesGrid[u.slidesGrid.length - 1] - u.slidesGrid[0]) / (u.slidesGrid.length - 1)
        : u.size,
    E = S > 0 ? w(A) / S : 0,
    T = S > 0 ? w(y) / S : 0,
    M = b ? Math.max(_, (m ? Math.ceil(v / 2) : 0) + Math.ceil(Math.max(E, T))) : _;
  if (M % _ !== 0) M += _ - (M % _);
  ((M += g.loopAdditionalSlides), (u.loopedSlides = M));
  let C = u.grid && g.grid && g.grid.rows > 1;
  if (d.length < v + M || (u.params.effect === "cards" && d.length < v + M * 2))
    pA(
      "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
    );
  else if (C && g.grid.fill === "row")
    pA("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  let R = [],
    B = [],
    L = C ? Math.ceil(d.length / g.grid.rows) : d.length,
    k = s && L - x < v && !b,
    z = k ? x : u.activeIndex;
  if (typeof c > "u") c = u.getSlideIndex(d.find((Z) => Z.classList.contains(g.slideActiveClass)));
  else z = c;
  let X = n === "next" || !n,
    G = n === "prev" || !n,
    Q = 0,
    de = 0,
    K = (C ? (d[c].column ?? 0) : c) + (b && typeof i > "u" ? (m ? -v / 2 + 0.5 : 0) - E : 0);
  if (K < M) {
    Q = Math.max(M - K, _);
    for (let Z = 0; Z < M - K; Z += 1) {
      let F = Z - Math.floor(Z / L) * L;
      if (C) {
        let te = L - F - 1;
        for (let he = d.length - 1; he >= 0; he -= 1) if (d[he].column === te) R.push(he);
      } else R.push(L - F - 1);
    }
  } else if (K + v > L - M) {
    if (((de = Math.max(K - (L - M * 2), _)), k)) de = Math.max(de, v - L + x + 1);
    for (let Z = 0; Z < de; Z += 1) {
      let F = Z - Math.floor(Z / L) * L;
      if (C)
        d.forEach((te, he) => {
          if (te.column === F) B.push(he);
        });
      else B.push(F);
    }
  }
  if (
    ((u.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      u.__preventObserver__ = !1;
    }),
    u.params.effect === "cards" && d.length < v + M * 2)
  ) {
    if (B.includes(c)) B.splice(B.indexOf(c), 1);
    if (R.includes(c)) R.splice(R.indexOf(c), 1);
  }
  if (G)
    R.forEach((Z) => {
      let F = d[Z];
      ((F.swiperLoopMoveDOM = !0), p.prepend(F), (F.swiperLoopMoveDOM = !1));
    });
  if (X)
    B.forEach((Z) => {
      let F = d[Z];
      ((F.swiperLoopMoveDOM = !0), p.append(F), (F.swiperLoopMoveDOM = !1));
    });
  if ((u.recalcSlides(), g.slidesPerView === "auto")) u.updateSlides();
  else if (C && ((R.length > 0 && G) || (B.length > 0 && X)))
    u.slides.forEach((Z, F) => {
      u.grid.updateSlide(F, Z, u.slides);
    });
  if (g.watchSlidesProgress) u.updateSlidesOffset();
  if (r) {
    if (R.length > 0 && G) {
      if (typeof t > "u") {
        let Z = u.slidesGrid[z],
          te = u.slidesGrid[z + Q] - Z;
        if (l) u.setTranslate(u.translate - te);
        else if ((u.slideTo(z + Math.ceil(Q), 0, !1, !0), i))
          ((u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - te),
            (u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - te));
      } else if (i) {
        let Z = C ? R.length / g.grid.rows : R.length;
        (u.slideTo(u.activeIndex + Z, 0, !1, !0),
          (u.touchEventsData.currentTranslate = u.translate));
      }
    } else if (B.length > 0 && X)
      if (typeof t > "u") {
        let Z = u.slidesGrid[z],
          te = u.slidesGrid[z - de] - Z;
        if (l) u.setTranslate(u.translate - te);
        else if ((u.slideTo(z - de, 0, !1, !0), i))
          ((u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - te),
            (u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - te));
      } else {
        let Z = C ? B.length / g.grid.rows : B.length;
        u.slideTo(u.activeIndex - Z, 0, !1, !0);
      }
  }
  ((u.allowSlidePrev = h), (u.allowSlideNext = f));
  let ae = u.controller?.control;
  if (ae && !a) {
    let Z = {
      slideRealIndex: t,
      direction: n,
      setTranslate: i,
      activeSlideIndex: c,
      byController: !0,
    };
    if (Array.isArray(ae))
      ae.forEach((F) => {
        if (!F.destroyed && F.params.loop)
          F.loopFix({ ...Z, slideTo: F.params.slidesPerView === g.slidesPerView ? r : !1 });
      });
    else if (ae instanceof u.constructor && ae.params.loop)
      ae.loopFix({ ...Z, slideTo: ae.params.slidesPerView === g.slidesPerView ? r : !1 });
  }
  ((u.__loopFixInProgress__ = !1), u.emit("loopFix"));
}
var hue = { loopCreate: cue, loopFix: due, loopDestroy: uue };
function fue(e, t) {
  return function (n = {}) {
    let i = Object.keys(n)[0],
      o = n[i];
    if (typeof o !== "object" || o === null) {
      sa(t, n);
      return;
    }
    if (e[i] === !0) e[i] = { enabled: !0 };
    if (i === "navigation" && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl) e[i].auto = !0;
    if (["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el)
      e[i].auto = !0;
    if (!(i in e && "enabled" in o)) {
      sa(t, n);
      return;
    }
    if (typeof e[i] === "object" && !("enabled" in e[i])) e[i].enabled = !0;
    if (!e[i]) e[i] = { enabled: !1 };
    sa(t, n);
  };
}
var pue = ({ swiper: e, extendParams: t, on: r }) => {
    let n = [],
      i = (a, l = {}) => {
        let c = window.MutationObserver || window.WebkitMutationObserver;
        if (!c) return;
        let u = new c((d) => {
          if (e.__preventObserver__) return;
          if (d.length === 1) {
            e.emit("observerUpdate", d[0]);
            return;
          }
          let h = function () {
            e.emit("observerUpdate", d[0]);
          };
          if (window.requestAnimationFrame) window.requestAnimationFrame(h);
          else window.setTimeout(h, 0);
        });
        (u.observe(a, {
          attributes: typeof l.attributes > "u" ? !0 : l.attributes,
          childList: e.isElement || (typeof l.childList > "u" ? !0 : l.childList),
          characterData: typeof l.characterData > "u" ? !0 : l.characterData,
        }),
          n.push(u));
      },
      o = () => {
        if (!e.params.observer) return;
        if (e.params.observeParents) {
          let a = gm(e.hostEl);
          for (let l = 0; l < a.length; l += 1) i(a[l]);
        }
        (i(e.hostEl, { childList: e.params.observeSlideChildren }),
          i(e.wrapperEl, { attributes: !1 }));
      },
      s = () => {
        (n.forEach((a) => {
          a.disconnect();
        }),
          n.splice(0, n.length));
      };
    (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
      r("init", o),
      r("destroy", s));
  },
  mue = ({ swiper: e, on: t, emit: r }) => {
    let n = null,
      i = null,
      o = () => {
        if (!e || e.destroyed || !e.initialized) return;
        (r("beforeResize"), r("resize"));
      },
      s = () => {
        if (!e || e.destroyed || !e.initialized) return;
        let { width: c, height: u } = e;
        ((n = new ResizeObserver((d) => {
          i = window.requestAnimationFrame(() => {
            let h = c,
              f = u;
            if (
              (d.forEach(({ contentBoxSize: p, contentRect: g, target: m }) => {
                if (m && m !== e.el) return;
                let A = Array.isArray(p) ? p[0] : p;
                ((h = g ? g.width : A.inlineSize), (f = g ? g.height : A.blockSize));
              }),
              h !== c || f !== u)
            )
              ((c = h), (u = f), o());
          });
        })),
          n.observe(e.el));
      },
      a = () => {
        if (i) window.cancelAnimationFrame(i);
        if (n && n.unobserve && e.el) (n.unobserve(e.el), (n = null));
      },
      l = () => {
        if (!e || e.destroyed || !e.initialized) return;
        r("orientationchange");
      };
    (t("init", () => {
      if (e.params.resizeObserver && typeof window.ResizeObserver < "u") {
        s();
        return;
      }
      (window.addEventListener("resize", o), window.addEventListener("orientationchange", l));
    }),
      t("destroy", () => {
        (a(),
          window.removeEventListener("resize", o),
          window.removeEventListener("orientationchange", l));
      }));
  };
function gue(e, t = !0, r) {
  let n = this,
    { enabled: i, params: o, animating: s } = n;
  if (!i || n.destroyed) return n;
  if (typeof e > "u") e = n.params.speed;
  let a = o.slidesPerGroup;
  if (o.slidesPerView === "auto" && o.slidesPerGroup === 1 && o.slidesPerGroupAuto)
    a = Math.max(n.slidesPerViewDynamic("current", !0), 1);
  let l = n.activeIndex < o.slidesPerGroupSkip ? 1 : a,
    c = n.virtual && o.virtual?.enabled;
  if (o.loop) {
    if (s && !c && o.loopPreventsSliding) return !1;
    if (
      (n.loopFix({ direction: "next" }),
      (n._clientLeft = n.wrapperEl.clientLeft),
      n.activeIndex === n.slides.length - 1 && o.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          n.slideTo(n.activeIndex + l, e, t, r);
        }),
        !0
      );
  }
  if (o.rewind && n.isEnd) return n.slideTo(0, e, t, r);
  return n.slideTo(n.activeIndex + l, e, t, r);
}
function Aue(e, t = !0, r) {
  let n = this,
    { params: i, snapGrid: o, slidesGrid: s, rtlTranslate: a, enabled: l, animating: c } = n;
  if (!l || n.destroyed) return n;
  if (typeof e > "u") e = n.params.speed;
  let u = n.virtual && i.virtual?.enabled;
  if (i.loop) {
    if (c && !u && i.loopPreventsSliding) return !1;
    (n.loopFix({ direction: "prev" }), (n._clientLeft = n.wrapperEl.clientLeft));
  }
  let d = a ? n.translate : -n.translate;
  function h(y) {
    if (y < 0) return -Math.floor(Math.abs(y));
    return Math.floor(y);
  }
  let f = h(d),
    p = o.map((y) => h(y)),
    g = i.freeMode && i.freeMode.enabled,
    m = o[p.indexOf(f) - 1];
  if (typeof m > "u" && (i.cssMode || g)) {
    let y;
    if (
      (o.forEach((x, b) => {
        if (f >= x) y = b;
      }),
      typeof y < "u")
    )
      m = g ? o[y] : o[y > 0 ? y - 1 : y];
  }
  let A = 0;
  if (typeof m < "u") {
    if (((A = s.indexOf(m)), A < 0)) A = n.activeIndex - 1;
    if (i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto)
      ((A = A - n.slidesPerViewDynamic("previous", !0) + 1), (A = Math.max(A, 0)));
  }
  if (i.rewind && n.isBeginning) {
    let y =
      n.params.virtual?.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
    return n.slideTo(y, e, t, r);
  } else if (i.loop && n.activeIndex === 0 && i.cssMode)
    return (
      requestAnimationFrame(() => {
        n.slideTo(A, e, t, r);
      }),
      !0
    );
  return n.slideTo(A, e, t, r);
}
function yue(e, t = !0, r) {
  let n = this;
  if (n.destroyed) return;
  if (typeof e > "u") e = n.params.speed;
  return n.slideTo(n.activeIndex, e, t, r);
}
function xue(e = 0, t, r = !0, n, i) {
  if (typeof e === "string") e = parseInt(e, 10);
  let o = this,
    s = e;
  if (s < 0) s = 0;
  let {
    params: a,
    snapGrid: l,
    slidesGrid: c,
    previousIndex: u,
    activeIndex: d,
    rtlTranslate: h,
    wrapperEl: f,
    enabled: p,
  } = o;
  if ((!p && !n && !i) || o.destroyed || (o.animating && a.preventInteractionOnTransition))
    return !1;
  if (typeof t > "u") t = o.params.speed;
  let g = Math.min(o.params.slidesPerGroupSkip, s),
    m = g + Math.floor((s - g) / o.params.slidesPerGroup);
  if (m >= l.length) m = l.length - 1;
  let A = -l[m];
  if (a.normalizeSlideIndex)
    for (let w = 0; w < c.length; w += 1) {
      let S = -Math.floor(A * 100),
        E = Math.floor(c[w] * 100),
        T = Math.floor(c[w + 1] * 100);
      if (typeof c[w + 1] < "u") {
        if (S >= E && S < T - (T - E) / 2) s = w;
        else if (S >= E && S < T) s = w + 1;
      } else if (S >= E) s = w;
    }
  if (o.initialized && s !== d) {
    if (
      !o.allowSlideNext &&
      (h ? A > o.translate && A > o.minTranslate() : A < o.translate && A < o.minTranslate())
    )
      return !1;
    if (!o.allowSlidePrev && A > o.translate && A > o.maxTranslate()) {
      if ((d || 0) !== s) return !1;
    }
  }
  if (s !== (u || 0) && r) o.emit("beforeSlideChangeStart");
  o.updateProgress(A);
  let y;
  if (s > d) y = "next";
  else if (s < d) y = "prev";
  else y = "reset";
  let x = o.virtual && o.params.virtual?.enabled;
  if (!(x && i) && ((h && -A === o.translate) || (!h && A === o.translate))) {
    if ((o.updateActiveIndex(s), a.autoHeight)) o.updateAutoHeight();
    if ((o.updateSlidesClasses(), a.effect !== "slide")) o.setTranslate(A);
    if (y !== "reset") (o.transitionStart(r, y), o.transitionEnd(r, y));
    return !1;
  }
  if (a.cssMode) {
    let w = o.isHorizontal(),
      S = h ? A : -A;
    if (t === 0) {
      if (x) ((o.wrapperEl.style.scrollSnapType = "none"), (o._immediateVirtual = !0));
      if (x && !o._cssModeVirtualInitialSet && (o.params.initialSlide ?? 0) > 0)
        ((o._cssModeVirtualInitialSet = !0),
          requestAnimationFrame(() => {
            f[w ? "scrollLeft" : "scrollTop"] = S;
          }));
      else f[w ? "scrollLeft" : "scrollTop"] = S;
      if (x)
        requestAnimationFrame(() => {
          ((o.wrapperEl.style.scrollSnapType = ""), (o._immediateVirtual = !1));
        });
    } else f.scrollTo({ [w ? "left" : "top"]: S, behavior: "smooth" });
    return !0;
  }
  let _ = CG().isSafari;
  if (x && !i && _ && o.isElement) o.virtual.update(!1, !1, s);
  if (
    (o.setTransition(t),
    o.setTranslate(A),
    o.updateActiveIndex(s),
    o.updateSlidesClasses(),
    o.emit("beforeTransitionStart", t, n),
    o.transitionStart(r, y),
    t === 0)
  )
    o.transitionEnd(r, y);
  else if (!o.animating) {
    if (((o.animating = !0), !o.onSlideToWrapperTransitionEnd))
      o.onSlideToWrapperTransitionEnd = function (S) {
        if (!o || o.destroyed) return;
        if (S.target !== this) return;
        (o.wrapperEl.removeEventListener("transitionend", o.onSlideToWrapperTransitionEnd),
          (o.onSlideToWrapperTransitionEnd = null),
          delete o.onSlideToWrapperTransitionEnd,
          o.transitionEnd(r, y));
      };
    o.wrapperEl.addEventListener("transitionend", o.onSlideToWrapperTransitionEnd);
  }
  return !0;
}
function bue() {
  let e = this;
  if (e.destroyed) return;
  let { params: t, slidesEl: r, clickedSlide: n, clickedIndex: i } = e;
  if (n === void 0 || i === void 0) return;
  let o = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView,
    s = e.getSlideIndexWhenGrid(i),
    a,
    l = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
    c = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (t.loop) {
    if (e.animating) return;
    if (((a = parseInt(n.getAttribute("data-swiper-slide-index"), 10)), t.centeredSlides))
      e.slideToLoop(a);
    else if (s > (c ? (e.slides.length - o) / 2 - (e.params.grid.rows - 1) : e.slides.length - o))
      (e.loopFix(),
        (s = e.getSlideIndex(Xo(r, `${l}[data-swiper-slide-index="${a}"]`)[0])),
        mm(() => {
          e.slideTo(s);
        }));
    else e.slideTo(s);
  } else e.slideTo(s);
}
function _ue(e, t = !0, r, n = 0.5) {
  let i = this;
  if (i.destroyed) return;
  if (typeof e > "u") e = i.params.speed;
  let o = i.activeIndex,
    s = Math.min(i.params.slidesPerGroupSkip, o),
    a = s + Math.floor((o - s) / i.params.slidesPerGroup),
    l = i.rtlTranslate ? i.translate : -i.translate;
  if (l >= i.snapGrid[a]) {
    let c = i.snapGrid[a],
      u = i.snapGrid[a + 1];
    if (l - c > (u - c) * n) o += i.params.slidesPerGroup;
  } else {
    let c = i.snapGrid[a - 1],
      u = i.snapGrid[a];
    if (l - c <= (u - c) * n) o -= i.params.slidesPerGroup;
  }
  return ((o = Math.max(o, 0)), (o = Math.min(o, i.slidesGrid.length - 1)), i.slideTo(o, e, t, r));
}
function vue(e = 0, t, r = !0, n) {
  if (typeof e === "string") e = parseInt(e, 10);
  let i = this;
  if (i.destroyed) return;
  if (typeof t > "u") t = i.params.speed;
  let o = i.grid && i.params.grid && i.params.grid.rows > 1,
    s = e;
  if (i.params.loop)
    if (i.virtual && i.params.virtual?.enabled) s = s + (i.virtual.slidesBefore ?? 0);
    else {
      let a;
      if (o) {
        let g = s * i.params.grid.rows;
        a =
          i.slides.find((A) => Number(A.getAttribute("data-swiper-slide-index")) === g)?.column ??
          0;
      } else a = i.getSlideIndexByData(s);
      let l = o ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length,
        { centeredSlides: c, slidesOffsetBefore: u, slidesOffsetAfter: d } = i.params,
        h = c || !!u || !!d,
        f;
      if (i.params.slidesPerView === "auto") f = i.slidesPerViewDynamic();
      else if (((f = Math.ceil(parseFloat(String(i.params.slidesPerView)))), h && f % 2 === 0))
        f = f + 1;
      let p = l - a < f;
      if (h) p = p || a < Math.ceil(f / 2);
      if (n && h && i.params.slidesPerView !== "auto" && !o) p = !1;
      if (p) {
        let g = h
          ? a < i.activeIndex
            ? "prev"
            : "next"
          : a - i.activeIndex - 1 < i.params.slidesPerView
            ? "next"
            : "prev";
        i.loopFix({
          direction: g,
          slideTo: !0,
          activeSlideIndex: g === "next" ? a + 1 : a - l + 1,
          slideRealIndex: g === "next" ? i.realIndex : void 0,
        });
      }
      if (o) {
        let g = s * i.params.grid.rows;
        s =
          i.slides.find((A) => Number(A.getAttribute("data-swiper-slide-index")) === g)?.column ??
          0;
      } else s = i.getSlideIndexByData(s);
    }
  return (
    requestAnimationFrame(() => {
      i.slideTo(s, t, r, n);
    }),
    i
  );
}
var Cue = {
  slideTo: xue,
  slideToLoop: vue,
  slideNext: gue,
  slidePrev: Aue,
  slideReset: yue,
  slideToClosest: _ue,
  slideToClickedSlide: bue,
};
function wue(e, t) {
  let r = this;
  if (!r.params.cssMode)
    ((r.wrapperEl.style.transitionDuration = `${e}ms`),
      (r.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""));
  r.emit("setTransition", e, t);
}
function SG({ swiper: e, runCallbacks: t, direction: r, step: n }) {
  let { activeIndex: i, previousIndex: o } = e,
    s = r;
  if (!s)
    if (i > o) s = "next";
    else if (i < o) s = "prev";
    else s = "reset";
  if ((e.emit(`transition${n}`), t && s === "reset")) e.emit(`slideResetTransition${n}`);
  else if (t && i !== o)
    if ((e.emit(`slideChangeTransition${n}`), s === "next")) e.emit(`slideNextTransition${n}`);
    else e.emit(`slidePrevTransition${n}`);
}
function Tue(e = !0, t) {
  let r = this,
    { params: n } = r;
  if (((r.animating = !1), n.cssMode)) return;
  (r.setTransition(0), SG({ swiper: r, runCallbacks: e, direction: t, step: "End" }));
}
function Eue(e = !0, t) {
  let r = this,
    { params: n } = r;
  if (n.cssMode) return;
  if (n.autoHeight) r.updateAutoHeight();
  SG({ swiper: r, runCallbacks: e, direction: t, step: "Start" });
}
var Sue = { setTransition: wue, transitionStart: Eue, transitionEnd: Tue };
function Mue(e = this.isHorizontal() ? "x" : "y") {
  let t = this,
    { params: r, rtlTranslate: n, translate: i, wrapperEl: o } = t;
  if (r.virtualTranslate) return n ? -i : i;
  if (r.cssMode) return i;
  let s = A9(o, e);
  if (((s += t.cssOverflowAdjustment()), n)) s = -s;
  return s || 0;
}
function Iue() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Rue() {
  return -this.snapGrid[0];
}
function Oue(e, t) {
  let r = this,
    { rtlTranslate: n, params: i, wrapperEl: o, progress: s } = r,
    a = 0,
    l = 0,
    c = 0;
  if (r.isHorizontal()) a = n ? -e : e;
  else l = e;
  if (i.roundLengths) ((a = Math.floor(a)), (l = Math.floor(l)));
  if (((r.previousTranslate = r.translate), (r.translate = r.isHorizontal() ? a : l), i.cssMode))
    o[r.isHorizontal() ? "scrollLeft" : "scrollTop"] = r.isHorizontal() ? -a : -l;
  else if (!i.virtualTranslate) {
    if (r.isHorizontal()) a -= r.cssOverflowAdjustment();
    else l -= r.cssOverflowAdjustment();
    o.style.transform = `translate3d(${a}px, ${l}px, ${c}px)`;
  }
  let u,
    d = r.maxTranslate() - r.minTranslate();
  if (d === 0) u = 0;
  else u = (e - r.minTranslate()) / d;
  if (u !== s) r.updateProgress(e);
  r.emit("setTranslate", r.translate, t);
}
function Lue(e = 0, t = this.params.speed, r = !0, n = !0, i) {
  let o = this,
    { params: s, wrapperEl: a } = o;
  if (o.animating && s.preventInteractionOnTransition) return !1;
  let l = o.minTranslate(),
    c = o.maxTranslate(),
    u;
  if (n && e > l) u = l;
  else if (n && e < c) u = c;
  else u = e;
  if ((o.updateProgress(u), s.cssMode)) {
    let d = o.isHorizontal();
    if (t === 0) a[d ? "scrollLeft" : "scrollTop"] = -u;
    else a.scrollTo({ [d ? "left" : "top"]: -u, behavior: "smooth" });
    return !0;
  }
  if (t === 0) {
    if ((o.setTransition(0), o.setTranslate(u), r))
      (o.emit("beforeTransitionStart", t, i), o.emit("transitionEnd"));
  } else {
    if ((o.setTransition(t), o.setTranslate(u), r))
      (o.emit("beforeTransitionStart", t, i), o.emit("transitionStart"));
    if (!o.animating) {
      if (((o.animating = !0), !o.onTranslateToWrapperTransitionEnd))
        o.onTranslateToWrapperTransitionEnd = function (h) {
          if (!o || o.destroyed) return;
          if (h.target !== this) return;
          if (
            (o.wrapperEl.removeEventListener("transitionend", o.onTranslateToWrapperTransitionEnd),
            (o.onTranslateToWrapperTransitionEnd = null),
            delete o.onTranslateToWrapperTransitionEnd,
            (o.animating = !1),
            r)
          )
            o.emit("transitionEnd");
        };
      o.wrapperEl.addEventListener("transitionend", o.onTranslateToWrapperTransitionEnd);
    }
  }
  return !0;
}
var Bue = {
  getTranslate: Mue,
  setTranslate: Oue,
  minTranslate: Rue,
  maxTranslate: Iue,
  translateTo: Lue,
};
function Fue(e) {
  let { slidesGrid: t, params: r } = e,
    n = e.rtlTranslate ? e.translate : -e.translate,
    i;
  for (let o = 0; o < t.length; o += 1)
    if (typeof t[o + 1] < "u") {
      if (n >= t[o] && n < t[o + 1] - (t[o + 1] - t[o]) / 2) i = o;
      else if (n >= t[o] && n < t[o + 1]) i = o + 1;
    } else if (n >= t[o]) i = o;
  if (r.normalizeSlideIndex) {
    if (i < 0 || typeof i > "u") i = 0;
  }
  return i;
}
function Due(e) {
  let t = this,
    r = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: n, params: i, activeIndex: o, realIndex: s, snapIndex: a } = t,
    l = e,
    c,
    u = (f) => {
      let p = t.virtual.slides,
        g = f - (t.virtual.slidesBefore ?? 0);
      if (g < 0) g = p.length + g;
      if (g >= p.length) g -= p.length;
      return g;
    };
  if (typeof l > "u") l = Fue(t);
  if (n.indexOf(r) >= 0) c = n.indexOf(r);
  else {
    let f = Math.min(i.slidesPerGroupSkip, l);
    c = f + Math.floor((l - f) / i.slidesPerGroup);
  }
  if (c >= n.length) c = n.length - 1;
  if (l === o && !t.params.loop) {
    if (c !== a) ((t.snapIndex = c), t.emit("snapIndexChange"));
    return;
  }
  if (l === o && t.params.loop && t.virtual && t.params.virtual?.enabled) {
    t.realIndex = u(l);
    return;
  }
  let d = t.grid && i.grid && i.grid.rows > 1,
    h;
  if (t.virtual && i.virtual?.enabled)
    if (i.loop) h = u(l);
    else h = l;
  else if (d) {
    let f = t.slides.find((g) => g.column === l),
      p = parseInt(f.getAttribute("data-swiper-slide-index"), 10);
    if (Number.isNaN(p)) p = Math.max(t.slides.indexOf(f), 0);
    h = Math.floor(p / i.grid.rows);
  } else if (t.slides[l]) {
    let f = t.slides[l].getAttribute("data-swiper-slide-index");
    if (f) h = parseInt(f, 10);
    else h = l;
  } else h = l;
  if (
    (Object.assign(t, {
      previousSnapIndex: a,
      snapIndex: c,
      previousRealIndex: s,
      realIndex: h,
      previousIndex: o,
      activeIndex: l,
    }),
    t.initialized)
  )
    wG(t);
  if (t.__loopFixInProgress__) return;
  if (
    (t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    t.initialized || t.params.runCallbacksOnInit)
  ) {
    if ((t.__lastEmittedRealIndex__ ?? s) !== h) t.emit("realIndexChange");
    t.emit("slideChange");
  }
  t.__lastEmittedRealIndex__ = h;
}
function Nue(e) {
  let t = this,
    r = [],
    n = t.virtual && t.params.virtual?.enabled,
    i = 0,
    o;
  if (typeof e === "number") t.setTransition(e);
  else if (e === !0) t.setTransition(t.params.speed);
  let s = (a) => {
    if (n) return t.slides[t.getSlideIndexByData(a)];
    return t.slides[a];
  };
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        r.push(a);
      });
    else
      for (o = 0; o < Math.ceil(t.params.slidesPerView); o += 1) {
        let a = t.activeIndex + o;
        if (a > t.slides.length && !n) break;
        let l = s(a);
        if (l) r.push(l);
      }
  else {
    let a = s(t.activeIndex);
    if (a) r.push(a);
  }
  for (o = 0; o < r.length; o += 1)
    if (typeof r[o] < "u") {
      let a = r[o].offsetHeight;
      i = a > i ? a : i;
    }
  if (i || i === 0) t.wrapperEl.style.height = `${i}px`;
}
function Pue(e, t) {
  let r = this,
    n = r.params,
    i = e.closest(`.${n.slideClass}, swiper-slide`);
  if (!i && r.isElement && t && t.length > 1 && t.includes(e))
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
      if (!i && a.matches && a.matches(`.${n.slideClass}, swiper-slide`)) i = a;
    });
  let o = !1,
    s;
  if (i) {
    for (let a = 0; a < r.slides.length; a += 1)
      if (r.slides[a] === i) {
        ((o = !0), (s = a));
        break;
      }
  }
  if (i && o)
    if (((r.clickedSlide = i), r.virtual && r.params.virtual?.enabled))
      r.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10);
    else r.clickedIndex = s;
  else {
    ((r.clickedSlide = void 0), (r.clickedIndex = void 0));
    return;
  }
  if (n.slideToClickedSlide && r.clickedIndex !== void 0 && r.clickedIndex !== r.activeIndex)
    r.slideToClickedSlide();
}
function kue(e) {
  let t = this;
  if (typeof e > "u") {
    let u = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * u) || 0;
  }
  let r = t.params,
    n = t.maxTranslate() - t.minTranslate(),
    { progress: i, isBeginning: o, isEnd: s } = t,
    a = t.progressLoop,
    l = o,
    c = s;
  if (n === 0) ((i = 0), (o = !0), (s = !0));
  else {
    i = (e - t.minTranslate()) / n;
    let u = Math.abs(e - t.minTranslate()) < 1,
      d = Math.abs(e - t.maxTranslate()) < 1;
    if (((o = u || i <= 0), (s = d || i >= 1), u)) i = 0;
    if (d) i = 1;
  }
  if (r.loop) {
    let u = t.getSlideIndexByData(0),
      d = t.getSlideIndexByData(t.slides.length - 1),
      h = t.slidesGrid[u],
      f = t.slidesGrid[d],
      p = t.slidesGrid[t.slidesGrid.length - 1],
      g = Math.abs(e);
    if (g >= h) a = (g - h) / p;
    else a = (g + p - f) / p;
    if (a > 1) a -= 1;
  }
  if (
    (Object.assign(t, { progress: i, progressLoop: a, isBeginning: o, isEnd: s }),
    r.watchSlidesProgress || (r.centeredSlides && r.autoHeight))
  )
    t.updateSlidesProgress(e);
  if (o && !l) t.emit("reachBeginning toEdge");
  if (s && !c) t.emit("reachEnd toEdge");
  if ((l && !o) || (c && !s)) t.emit("fromEdge");
  t.emit("progress", i);
}
function Uue() {
  let e = this,
    t,
    r,
    n = e.el;
  if (typeof e.params.width < "u" && e.params.width !== null) t = e.params.width;
  else t = n.clientWidth;
  if (typeof e.params.height < "u" && e.params.height !== null) r = e.params.height;
  else r = n.clientHeight;
  if ((t === 0 && e.isHorizontal()) || (r === 0 && e.isVertical())) return;
  if (
    ((t =
      t - parseInt(rd(n, "padding-left") || "0", 10) - parseInt(rd(n, "padding-right") || "0", 10)),
    (r =
      r - parseInt(rd(n, "padding-top") || "0", 10) - parseInt(rd(n, "padding-bottom") || "0", 10)),
    Number.isNaN(t))
  )
    t = 0;
  if (Number.isNaN(r)) r = 0;
  Object.assign(e, { width: t, height: r, size: e.isHorizontal() ? t : r });
}
function Hue() {
  let e = this;
  function t(M, C) {
    return parseFloat(M.getPropertyValue(e.getDirectionLabel(C)) || "0");
  }
  let r = e.params,
    { wrapperEl: n, slidesEl: i, rtlTranslate: o, wrongRTL: s } = e,
    a = !!(e.virtual && r.virtual?.enabled),
    l = a ? e.virtual.slides.length : e.slides.length,
    c = Xo(i, `.${e.params.slideClass}, swiper-slide`),
    u = a ? e.virtual.slides.length : c.length,
    d = [],
    h = [],
    f = [],
    p = (M) => (typeof M === "function" ? M.call(e) : M),
    g = p(r.slidesOffsetBefore),
    m = p(r.slidesOffsetAfter),
    A = e.snapGrid.length,
    y = e.slidesGrid.length,
    x = e.size - g - m,
    b = r.spaceBetween,
    v = -g,
    _ = 0,
    w = 0;
  if (typeof x > "u") return;
  if (typeof b === "string" && b.indexOf("%") >= 0) b = (parseFloat(b.replace("%", "")) / 100) * x;
  else if (typeof b === "string") b = parseFloat(b);
  if (
    ((e.virtualSize = -b - g - m),
    c.forEach((M) => {
      if (o) M.style.marginLeft = "";
      else M.style.marginRight = "";
      ((M.style.marginBottom = ""), (M.style.marginTop = ""));
    }),
    r.centeredSlides && r.cssMode)
  )
    (_h(n, "--swiper-centered-offset-before", ""), _h(n, "--swiper-centered-offset-after", ""));
  if (r.cssMode)
    (_h(n, "--swiper-slides-offset-before", `${g}px`),
      _h(n, "--swiper-slides-offset-after", `${m}px`));
  let S = r.grid && r.grid.rows > 1 && e.grid;
  if (S) e.grid.initSlides(c);
  else if (e.grid) e.grid.unsetSlides();
  let E = 0,
    T =
      r.slidesPerView === "auto" &&
      r.breakpoints &&
      Object.keys(r.breakpoints).filter((M) => typeof r.breakpoints[M]?.slidesPerView < "u")
        .length > 0;
  for (let M = 0; M < u; M += 1) {
    E = 0;
    let C = c[M];
    if (C) {
      if (S) e.grid.updateSlide(M, C, c);
      if (rd(C, "display") === "none") continue;
    }
    if (a && r.slidesPerView === "auto") {
      if (r.virtual?.slidesPerViewAutoSlideSize) E = r.virtual.slidesPerViewAutoSlideSize;
      if (E && C) {
        if (r.roundLengths) E = Math.floor(E);
        C.style[e.getDirectionLabel("width")] = `${E}px`;
      }
    } else if (r.slidesPerView === "auto") {
      if (T) C.style[e.getDirectionLabel("width")] = "";
      let R = getComputedStyle(C),
        B = C.style.transform,
        L = C.style.webkitTransform;
      if (B) C.style.transform = "none";
      if (L) C.style.webkitTransform = "none";
      if (r.roundLengths) E = e.isHorizontal() ? mA(C, "width") : mA(C, "height");
      else {
        let k = t(R, "width"),
          z = t(R, "padding-left"),
          X = t(R, "padding-right"),
          G = t(R, "margin-left"),
          Q = t(R, "margin-right"),
          de = R.getPropertyValue("box-sizing");
        if (de && de === "border-box") E = k + G + Q;
        else {
          let { clientWidth: oe, offsetWidth: K } = C;
          E = k + z + X + G + Q + (K - oe);
        }
      }
      if (B) C.style.transform = B;
      if (L) C.style.webkitTransform = L;
      if (r.roundLengths) E = Math.floor(E);
    } else {
      if (((E = (x - (r.slidesPerView - 1) * b) / r.slidesPerView), r.roundLengths))
        E = Math.floor(E);
      if (C) C.style[e.getDirectionLabel("width")] = `${E}px`;
    }
    if (C) C.swiperSlideSize = E;
    if ((f.push(E), r.centeredSlides)) {
      if (((v = v + E / 2 + _ / 2 + b), _ === 0 && M !== 0)) v = v - x / 2 - b;
      if (M === 0) v = v - x / 2 - b;
      if (Math.abs(v) < 0.001) v = 0;
      if (r.roundLengths) v = Math.floor(v);
      if (w % r.slidesPerGroup === 0) d.push(v);
      h.push(v);
    } else {
      if (r.roundLengths) v = Math.floor(v);
      if ((w - Math.min(e.params.slidesPerGroupSkip, w)) % e.params.slidesPerGroup === 0) d.push(v);
      (h.push(v), (v = v + E + b));
    }
    ((e.virtualSize += E + b), (_ = E), (w += 1));
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, x) + m),
    o && s && (r.effect === "slide" || r.effect === "coverflow"))
  )
    n.style.width = `${e.virtualSize + b}px`;
  if (r.setWrapperSize) n.style[e.getDirectionLabel("width")] = `${e.virtualSize + b}px`;
  if (S) e.grid.updateWrapperSize(E, d);
  if (!r.centeredSlides) {
    let M = r.slidesPerView !== "auto" && r.slidesPerView % 1 !== 0,
      C = r.snapToSlideEdge && !r.loop && (r.slidesPerView === "auto" || M),
      R = d.length;
    if (C) {
      let L;
      if (r.slidesPerView === "auto") {
        L = 1;
        let k = 0;
        for (let z = f.length - 1; z >= 0; z -= 1)
          if (((k += f[z] + (z < f.length - 1 ? b : 0)), k <= x)) L = f.length - z;
          else break;
      } else L = Math.floor(r.slidesPerView);
      R = Math.max(u - L, 0);
    }
    let B = [];
    for (let L = 0; L < d.length; L += 1) {
      let k = d[L];
      if (r.roundLengths) k = Math.floor(k);
      if (C) {
        if (L <= R) B.push(k);
      } else if (d[L] <= e.virtualSize - x) B.push(k);
    }
    if (((d = B), Math.floor(e.virtualSize - x) - Math.floor(d[d.length - 1]) > 1)) {
      if (!C) d.push(e.virtualSize - x);
    }
  }
  if (a && r.loop) {
    let M = f[0] + b,
      C = e.virtual.slidesBefore ?? 0,
      R = e.virtual.slidesAfter ?? 0,
      B = C + R;
    if (r.slidesPerGroup > 1) {
      let L = Math.ceil(B / r.slidesPerGroup),
        k = M * r.slidesPerGroup;
      for (let z = 0; z < L; z += 1) d.push(d[d.length - 1] + k);
    }
    for (let L = 0; L < B; L += 1) {
      if (r.slidesPerGroup === 1) d.push(d[d.length - 1] + M);
      (h.push(h[h.length - 1] + M), (e.virtualSize += M));
    }
  }
  if (d.length === 0) d = [0];
  if (b !== 0) {
    let M = e.isHorizontal() && o ? "marginLeft" : e.getDirectionLabel("marginRight");
    c.filter((C, R) => {
      if (!r.cssMode || r.loop) return !0;
      if (R === c.length - 1) return !1;
      return !0;
    }).forEach((C) => {
      C.style[M] = `${b}px`;
    });
  }
  if (r.centeredSlides && r.centeredSlidesBounds) {
    let M = 0;
    (f.forEach((R) => {
      M += R + (b || 0);
    }),
      (M -= b));
    let C = M > x ? M - x : 0;
    d = d.map((R) => {
      if (R <= 0) return -g;
      if (R > C) return C + m;
      return R;
    });
  }
  if (r.centerInsufficientSlides) {
    let M = 0;
    if (
      (f.forEach((C) => {
        M += C + (b || 0);
      }),
      (M -= b),
      M < x)
    ) {
      let C = (x - M) / 2;
      (d.forEach((R, B) => {
        d[B] = R - C;
      }),
        h.forEach((R, B) => {
          h[B] = R + C;
        }));
    }
  }
  if (
    (Object.assign(e, { slides: c, snapGrid: d, slidesGrid: h, slidesSizesGrid: f }),
    r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
  ) {
    (_h(n, "--swiper-centered-offset-before", `${-d[0]}px`),
      _h(n, "--swiper-centered-offset-after", `${e.size / 2 - f[f.length - 1] / 2}px`));
    let M = -e.snapGrid[0],
      C = -e.slidesGrid[0];
    ((e.snapGrid = e.snapGrid.map((R) => R + M)), (e.slidesGrid = e.slidesGrid.map((R) => R + C)));
  }
  if (u !== l) e.emit("slidesLengthChange");
  if (d.length !== A) {
    if (e.params.watchOverflow) e.checkOverflow();
    e.emit("snapGridLengthChange");
  }
  if (h.length !== y) e.emit("slidesGridLengthChange");
  if (r.watchSlidesProgress) e.updateSlidesOffset();
  if (
    (e.emit("slidesUpdated"), !a && !r.cssMode && (r.effect === "slide" || r.effect === "fade"))
  ) {
    let M = `${r.containerModifierClass}backface-hidden`,
      C = e.el.classList.contains(M);
    if (u <= r.maxBackfaceHiddenSlides) {
      if (!C) e.el.classList.add(M);
    } else if (C) e.el.classList.remove(M);
  }
}
var v9 = (e, t, r) => {
  if (t && !e.classList.contains(r)) e.classList.add(r);
  else if (!t && e.classList.contains(r)) e.classList.remove(r);
};
function Gue() {
  let e = this,
    { slides: t, params: r, slidesEl: n, activeIndex: i } = e,
    o = !!(e.virtual && r.virtual?.enabled),
    s = e.grid && r.grid && r.grid.rows > 1,
    a = (d) => Xo(n, `.${r.slideClass}${d}, swiper-slide${d}`)[0],
    l,
    c,
    u;
  if (o)
    if (r.loop) {
      let d = e.virtual.slides,
        h = i - (e.virtual.slidesBefore ?? 0);
      if (h < 0) h = d.length + h;
      if (h >= d.length) h -= d.length;
      l = a(`[data-swiper-slide-index="${h}"]`);
    } else l = a(`[data-swiper-slide-index="${i}"]`);
  else if (s)
    ((l = t.find((d) => d.column === i)),
      (u = t.find((d) => d.column === i + 1)),
      (c = t.find((d) => d.column === i - 1)));
  else l = t[i];
  if (l) {
    if (!s) {
      if (((u = gG(l, `.${r.slideClass}, swiper-slide`)[0]), r.loop && !u)) u = t[0];
      if (((c = mG(l, `.${r.slideClass}, swiper-slide`)[0]), r.loop && !c === 0))
        c = t[t.length - 1];
    }
  }
  (t.forEach((d) => {
    (v9(d, d === l, r.slideActiveClass),
      v9(d, d === u, r.slideNextClass),
      v9(d, d === c, r.slidePrevClass));
  }),
    e.emitSlidesClasses());
}
function zue() {
  let e = this,
    t = e.slides,
    r = e.isElement ? (e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop) : 0;
  for (let n = 0; n < t.length; n += 1)
    t[n].swiperSlideOffset =
      (e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop) - r - e.cssOverflowAdjustment();
}
var xG = (e, t, r) => {
  if (t && !e.classList.contains(r)) e.classList.add(r);
  else if (!t && e.classList.contains(r)) e.classList.remove(r);
};
function Vue(e = (this && this.translate) || 0) {
  let t = this,
    r = t.params,
    { slides: n, rtlTranslate: i, snapGrid: o } = t;
  if (n.length === 0) return;
  if (typeof n[0].swiperSlideOffset > "u") t.updateSlidesOffset();
  let s = -e;
  if (i) s = e;
  ((t.visibleSlidesIndexes = []), (t.visibleSlides = []));
  let a = r.spaceBetween;
  if (typeof a === "string" && a.indexOf("%") >= 0)
    a = (parseFloat(a.replace("%", "")) / 100) * t.size;
  else if (typeof a === "string") a = parseFloat(a);
  for (let l = 0; l < n.length; l += 1) {
    let c = n[l],
      u = c.swiperSlideOffset ?? 0;
    if (r.cssMode && r.centeredSlides) u -= n[0].swiperSlideOffset ?? 0;
    let d = c.swiperSlideSize ?? 0,
      h = (s + (r.centeredSlides ? t.minTranslate() : 0) - u) / (d + a),
      f = (s - o[0] + (r.centeredSlides ? t.minTranslate() : 0) - u) / (d + a),
      p = -(s - u),
      g = p + t.slidesSizesGrid[l],
      m = p >= 0 && p <= t.size - t.slidesSizesGrid[l],
      A = (p >= 0 && p < t.size - 1) || (g > 1 && g <= t.size) || (p <= 0 && g >= t.size);
    if (A) (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(l));
    (xG(c, A, r.slideVisibleClass),
      xG(c, m, r.slideFullyVisibleClass),
      (c.progress = i ? -h : h),
      (c.originalProgress = i ? -f : f));
  }
}
var Wue = {
    updateSize: Uue,
    updateSlides: Hue,
    updateAutoHeight: Nue,
    updateSlidesOffset: zue,
    updateSlidesProgress: Vue,
    updateProgress: kue,
    updateSlidesClasses: Gue,
    updateActiveIndex: Due,
    updateClickedSlide: Pue,
  },
  Que = {
    eventsEmitter: Xce,
    update: Wue,
    translate: Bue,
    transition: Sue,
    slide: Cue,
    loop: hue,
    grabCursor: lue,
    events: oue,
    breakpoints: Hce,
    checkOverflow: zce,
    classes: Yce,
  },
  w9 = {};
class jo {
  static extendedDefaults;
  static defaults;
  constructor(...e) {
    let t, r;
    if (
      e.length === 1 &&
      e[0] !== null &&
      typeof e[0] === "object" &&
      Object.prototype.toString.call(e[0]).slice(8, -1) === "Object"
    )
      r = e[0];
    else [t, r] = e;
    if (!r) r = {};
    if (((r = sa({}, r)), t && !r.el)) r.el = t;
    if (
      r.el &&
      typeof r.el === "string" &&
      typeof document < "u" &&
      document.querySelectorAll(r.el).length > 1
    ) {
      let s = [];
      return (
        document.querySelectorAll(r.el).forEach((a) => {
          let l = sa({}, r, { el: a });
          s.push(new jo(l));
        }),
        s
      );
    }
    let n = this;
    if (
      ((n.__swiper__ = !0),
      (n.support = _G()),
      (n.device = vG({ userAgent: r.userAgent ?? void 0 })),
      (n.browser = CG()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...(n.__modules__ || [])]),
      r.modules && Array.isArray(r.modules))
    )
      r.modules.forEach((s) => {
        let a = s;
        if (typeof a === "function" && n.modules.indexOf(a) < 0) n.modules.push(a);
      });
    let i = {};
    n.modules.forEach((s) => {
      s({
        params: r,
        swiper: n,
        extendParams: fue(r, i),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n),
      });
    });
    let o = sa({}, TG, i);
    if (
      ((n.params = sa({}, o, w9, r)),
      (n.originalParams = sa({}, n.params)),
      (n.passedParams = sa({}, r)),
      n.params && n.params.on)
    ) {
      let s = n.params.on;
      Object.keys(s).forEach((a) => {
        let l = s[a];
        if (l) n.on(a, l);
      });
    }
    if (n.params && n.params.onAny) n.onAny(n.params.onAny);
    if (
      (Object.assign(n, {
        enabled: n.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return n.params.direction === "horizontal";
        },
        isVertical() {
          return n.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 8388608) * 8388608;
        },
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      n.emit("_swiper"),
      n.params.init)
    )
      n.init();
    return n;
  }
  getDirectionLabel(e) {
    if (this.isHorizontal()) return e;
    return {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom",
    }[e];
  }
  isHorizontal() {
    return this.params.direction === "horizontal";
  }
  isVertical() {
    return this.params.direction === "vertical";
  }
  cssOverflowAdjustment() {
    return Math.trunc(this.translate / 8388608) * 8388608;
  }
  getSlideIndex(e) {
    let { slidesEl: t, params: r } = this,
      n = Xo(t, `.${r.slideClass}, swiper-slide`),
      i = A0(n[0]);
    return A0(e) - (i ?? 0);
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.find((t) => Number(t.getAttribute("data-swiper-slide-index")) === e),
    );
  }
  getSlideIndexWhenGrid(e) {
    if (this.grid && this.params.grid && this.params.grid.rows > 1) {
      if (this.params.grid.fill === "column") e = Math.floor(e / this.params.grid.rows);
      else if (this.params.grid.fill === "row")
        e = e % Math.ceil(this.slides.length / this.params.grid.rows);
    }
    return e;
  }
  recalcSlides() {
    let { slidesEl: e, params: t } = this;
    this.slides = Xo(e, `.${t.slideClass}, swiper-slide`);
  }
  enable() {
    if (this.enabled) return;
    if (((this.enabled = !0), this.params.grabCursor)) this.setGrabCursor();
    this.emit("enable");
  }
  disable() {
    if (!this.enabled) return;
    if (((this.enabled = !1), this.params.grabCursor)) this.unsetGrabCursor();
    this.emit("disable");
  }
  setProgress(e, t) {
    e = Math.min(Math.max(e, 0), 1);
    let r = this.minTranslate(),
      i = (this.maxTranslate() - r) * e + r;
    (this.translateTo(i, typeof t > "u" ? 0 : t),
      this.updateActiveIndex(),
      this.updateSlidesClasses());
  }
  emitContainerClasses() {
    if (!this.params._emitClasses || !this.el) return;
    let e = this.el.className
      .split(" ")
      .filter(
        (t) => t.indexOf("swiper") === 0 || t.indexOf(this.params.containerModifierClass) === 0,
      );
    this.emit("_containerClasses", e.join(" "));
  }
  getSlideClasses(e) {
    if (this.destroyed) return "";
    return e.className
      .split(" ")
      .filter((t) => t.indexOf("swiper-slide") === 0 || t.indexOf(this.params.slideClass) === 0)
      .join(" ");
  }
  emitSlidesClasses() {
    if (!this.params._emitClasses || !this.el) return;
    let e = [];
    (this.slides.forEach((t) => {
      let r = this.getSlideClasses(t);
      (e.push({ slideEl: t, classNames: r }), this.emit("_slideClass", t, r));
    }),
      this.emit("_slideClasses", e));
  }
  slidesPerViewDynamic(e = "current", t = !1) {
    let { params: r, slides: n, slidesGrid: i, slidesSizesGrid: o, size: s, activeIndex: a } = this,
      l = 1;
    if (typeof r.slidesPerView === "number") return r.slidesPerView;
    if (!s) return l;
    if (r.centeredSlides) {
      let c = n[a] ? Math.ceil(n[a].swiperSlideSize ?? 0) : 0,
        u = !1;
      for (let d = a + 1; d < n.length; d += 1)
        if (n[d] && !u) {
          if (((c += Math.ceil(n[d].swiperSlideSize ?? 0)), (l += 1), c > s)) u = !0;
        }
      for (let d = a - 1; d >= 0; d -= 1)
        if (n[d] && !u) {
          if (((c += n[d].swiperSlideSize ?? 0), (l += 1), c > s)) u = !0;
        }
    } else if (e === "current") {
      for (let c = a + 1; c < n.length; c += 1)
        if (t ? i[c] + o[c] - i[a] < s : i[c] - i[a] < s) l += 1;
    } else for (let c = a - 1; c >= 0; c -= 1) if (i[a] - i[c] < s) l += 1;
    return l;
  }
  update() {
    let e = this;
    if (!e || e.destroyed) return;
    let { snapGrid: t, params: r } = e;
    if (r.breakpoints) e.setBreakpoint();
    if (r.lazyPreload)
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        if (o.complete) C9(e, o);
      });
    (e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses());
    function n() {
      let o = e.rtlTranslate ? e.translate * -1 : e.translate,
        s = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      (e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses());
    }
    let i;
    if (r.freeMode?.enabled && !r.cssMode) {
      if ((n(), r.autoHeight)) e.updateAutoHeight();
    } else {
      if ((r.slidesPerView === "auto" || r.slidesPerView > 1) && e.isEnd && !r.centeredSlides) {
        let o = e.virtual && r.virtual?.enabled ? e.virtual.slides.length : e.slides.length;
        i = e.slideTo(o - 1, 0, !1, !0);
      } else i = e.slideTo(e.activeIndex, 0, !1, !0);
      if (!i) n();
    }
    if (r.watchOverflow && t !== e.snapGrid) e.checkOverflow();
    e.emit("update");
  }
  changeDirection(e, t = !0) {
    let r = this,
      n = r.params.direction;
    if (!e) e = n === "horizontal" ? "vertical" : "horizontal";
    if (e === n || (e !== "horizontal" && e !== "vertical")) return r;
    if (
      (r.el.classList.remove(`${r.params.containerModifierClass}${n}`),
      r.el.classList.add(`${r.params.containerModifierClass}${e}`),
      r.emitContainerClasses(),
      (r.params.direction = e),
      (r.rtlTranslate = e === "horizontal" && r.rtl),
      r.slides.forEach((i) => {
        if (e === "vertical") i.style.width = "";
        else i.style.height = "";
      }),
      r.emit("changeDirection"),
      t)
    )
      r.update();
    return r;
  }
  changeLanguageDirection(e) {
    let t = this;
    if ((t.rtl && e === "rtl") || (!t.rtl && e === "ltr")) return;
    if (
      ((t.rtl = e === "rtl"),
      (t.rtlTranslate = t.params.direction === "horizontal" && t.rtl),
      t.rtl)
    )
      (t.el.classList.add(`${t.params.containerModifierClass}rtl`), (t.el.dir = "rtl"));
    else (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), (t.el.dir = "ltr"));
    t.update();
  }
  mount(e) {
    let t = this;
    if (t.mounted) return !0;
    if (typeof document > "u") return !1;
    let r = e ?? t.params.el,
      n = null;
    if (typeof r === "string") n = document.querySelector(r);
    else if (r instanceof HTMLElement) n = r;
    if (!n) return !1;
    n.swiper = t;
    let i = n.parentNode;
    if (i && i.host && i.host.nodeName === t.params.swiperElementNodeName.toUpperCase())
      t.isElement = !0;
    let o = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`,
      a = (() => {
        if (n && n.shadowRoot) return n.shadowRoot.querySelector(o());
        return Xo(n, o())[0];
      })();
    if (!a && t.params.createElements)
      ((a = nc("div", t.params.wrapperClass)),
        n.append(a),
        Xo(n, `.${t.params.slideClass}`).forEach((c) => {
          a.append(c);
        }));
    let l = t.isElement ? n.parentNode.host : null;
    return (
      Object.assign(t, {
        el: n,
        wrapperEl: a,
        slidesEl: t.isElement && !l.slideSlots ? l : a,
        hostEl: t.isElement ? l : n,
        mounted: !0,
        rtl: n.dir.toLowerCase() === "rtl" || rd(n, "direction") === "rtl",
        rtlTranslate:
          t.params.direction === "horizontal" &&
          (n.dir.toLowerCase() === "rtl" || rd(n, "direction") === "rtl"),
        wrongRTL: rd(a, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    let t = this;
    if (t.initialized) return t;
    if (t.mount(e) === !1) return t;
    if ((t.emit("beforeInit"), t.params.breakpoints)) t.setBreakpoint();
    if ((t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow))
      t.checkOverflow();
    if (t.params.grabCursor && t.enabled) t.setGrabCursor();
    if (t.params.loop && t.virtual && t.params.virtual?.enabled)
      t.slideTo(
        (t.params.initialSlide ?? 0) + (t.virtual.slidesBefore ?? 0),
        0,
        t.params.runCallbacksOnInit,
        !1,
        !0,
      );
    else t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0);
    if (t.params.loop) t.loopCreate(void 0, !0);
    if ((t.attachEvents(), t.params.lazyPreload)) {
      let n = [...t.el.querySelectorAll('[loading="lazy"]')];
      if (t.isElement) n.push(...t.hostEl.querySelectorAll('[loading="lazy"]'));
      n.forEach((i) => {
        if (i.complete) C9(t, i);
      });
    }
    return ((t.initialized = !0), wG(t), t.emit("init"), t.emit("afterInit"), t);
  }
  destroy(e = !0, t = !0) {
    let r = this,
      { params: n, el: i, wrapperEl: o, slides: s } = r;
    if (typeof r.params > "u" || r.destroyed) return null;
    if ((r.emit("beforeDestroy"), (r.initialized = !1), r.detachEvents(), n.loop)) r.loopDestroy();
    if (t) {
      if ((r.removeClasses(), i && typeof i !== "string")) i.removeAttribute("style");
      if (o) o.removeAttribute("style");
      if (s && s.length)
        s.forEach((a) => {
          (a.classList.remove(
            n.slideVisibleClass,
            n.slideFullyVisibleClass,
            n.slideActiveClass,
            n.slideNextClass,
            n.slidePrevClass,
          ),
            a.removeAttribute("style"),
            a.removeAttribute("data-swiper-slide-index"));
        });
    }
    if (
      (r.emit("destroy"),
      Object.keys(r.eventsListeners).forEach((a) => {
        r.off(a);
      }),
      e !== !1)
    ) {
      if (r.el && typeof r.el !== "string") r.el.swiper = null;
      fG(r);
    }
    return ((r.destroyed = !0), null);
  }
  static extendDefaults(e) {
    sa(w9, e);
  }
  static installModule(e) {
    if (!jo.prototype.__modules__) jo.prototype.__modules__ = [];
    let t = jo.prototype.__modules__;
    if (typeof e === "function" && t.indexOf(e) < 0) t.push(e);
  }
  static use(e) {
    if (Array.isArray(e)) return (e.forEach((t) => jo.installModule(t)), jo);
    return (jo.installModule(e), jo);
  }
}
Object.defineProperty(jo, "extendedDefaults", {
  get() {
    return w9;
  },
});
Object.defineProperty(jo, "defaults", {
  get() {
    return TG;
  },
});
var bG = Que,
  Yue = jo.prototype;
Object.keys(bG).forEach((e) => {
  let t = bG[e];
  Object.keys(t).forEach((r) => {
    Yue[r] = t[r];
  });
});
jo.use([mue, pue]);
function gA(e, t, r, n) {
  let i = r ?? {},
    o = t ?? {};
  if (e.params.createElements)
    Object.keys(n).forEach((s) => {
      if (!i[s] && i.auto === !0) {
        let a = Xo(e.el, `.${n[s]}`)[0];
        if (!a) ((a = nc("div", n[s])), (a.className = n[s]), e.el.append(a));
        ((i[s] = a), (o[s] = a));
      }
    });
  return i;
}
var IG =
    '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>',
  T9 = ({ swiper: e, extendParams: t, on: r, emit: n }) => {
    (t({
      navigation: {
        nextEl: null,
        prevEl: null,
        addIcons: !0,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (e.navigation = { nextEl: null, prevEl: null, arrowSvg: IG }));
    function i() {
      return e.params.navigation;
    }
    function o(p) {
      let g;
      if (p && typeof p === "string" && e.isElement) {
        if (((g = e.el.querySelector(p) || e.hostEl.querySelector(p)), g)) return g;
      }
      if (p) {
        if (typeof p === "string") g = [...document.querySelectorAll(p)];
        if (
          e.params.uniqueNavElements &&
          typeof p === "string" &&
          g &&
          g.length > 1 &&
          e.el.querySelectorAll(p).length === 1
        )
          g = e.el.querySelector(p);
        else if (g && g.length === 1) g = g[0];
      }
      if (p && !g) return p;
      return g;
    }
    function s(p, g) {
      let m = i();
      Gi(p).forEach((y) => {
        if (y) {
          if (
            (y.classList[g ? "add" : "remove"](...m.disabledClass.split(" ")),
            y.tagName === "BUTTON")
          )
            y.disabled = g;
          if (e.params.watchOverflow && e.enabled)
            y.classList[e.isLocked ? "add" : "remove"](m.lockClass);
        }
      });
    }
    function a() {
      let { nextEl: p, prevEl: g } = e.navigation;
      if (e.params.loop) {
        (s(g, !1), s(p, !1));
        return;
      }
      (s(g, e.isBeginning && !e.params.rewind), s(p, e.isEnd && !e.params.rewind));
    }
    function l(p) {
      if ((p.preventDefault(), e.isBeginning && !e.params.loop && !e.params.rewind)) return;
      (e.slidePrev(), n("navigationPrev"));
    }
    function c(p) {
      if ((p.preventDefault(), e.isEnd && !e.params.loop && !e.params.rewind)) return;
      (e.slideNext(), n("navigationNext"));
    }
    function u() {
      e.params.navigation = gA(e, e.originalParams.navigation, e.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev",
      });
      let p = i();
      if (!(p.nextEl || p.prevEl)) return;
      let g = o(p.nextEl),
        m = o(p.prevEl);
      Object.assign(e.navigation, { nextEl: g, prevEl: m });
      let A = Gi(g),
        y = Gi(m),
        x = (b, v) => {
          if (b) {
            if (
              p.addIcons &&
              b.matches(".swiper-button-next,.swiper-button-prev") &&
              !b.querySelector("svg")
            ) {
              let _ = document.createElement("div");
              vh(_, IG);
              let w = _.querySelector("svg");
              if (w) b.appendChild(w);
              _.remove();
            }
            b.addEventListener("click", v === "next" ? c : l);
          }
          if (!e.enabled && b) b.classList.add(...p.lockClass.split(" "));
        };
      (A.forEach((b) => x(b, "next")), y.forEach((b) => x(b, "prev")));
    }
    function d() {
      let p = i(),
        { nextEl: g, prevEl: m } = e.navigation,
        A = Gi(g),
        y = Gi(m),
        x = (b, v) => {
          (b.removeEventListener("click", v === "next" ? c : l),
            b.classList.remove(...p.disabledClass.split(" ")));
        };
      (A.forEach((b) => x(b, "next")), y.forEach((b) => x(b, "prev")));
    }
    (r("init", () => {
      if (i().enabled === !1) f();
      else (u(), a());
    }),
      r("toEdge fromEdge lock unlock", () => {
        a();
      }),
      r("destroy", () => {
        d();
      }),
      r("enable disable", () => {
        let p = i(),
          { nextEl: g, prevEl: m } = e.navigation,
          A = Gi(g),
          y = Gi(m);
        if (e.enabled) {
          a();
          return;
        }
        [...A, ...y].filter((x) => !!x).forEach((x) => x.classList.add(p.lockClass));
      }),
      r("click", (p, g) => {
        let m = i(),
          { nextEl: A, prevEl: y } = e.navigation,
          x = Gi(A),
          b = Gi(y),
          v = g.target,
          _ = b.includes(v) || x.includes(v);
        if (e.isElement && !_) {
          let w = g.composedPath ? g.composedPath() : [];
          if (w.length) _ = w.find((S) => x.includes(S) || b.includes(S));
        }
        if (m.hideOnClick && !_) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === v || e.pagination.el.contains(v))
          )
            return;
          let w;
          if (x.length) w = x[0].classList.contains(m.hiddenClass);
          else if (b.length) w = b[0].classList.contains(m.hiddenClass);
          if (w === !0) n("navigationShow");
          else n("navigationHide");
          [...x, ...b].filter((S) => !!S).forEach((S) => S.classList.toggle(m.hiddenClass));
        }
      }));
    let h = () => {
        let p = i();
        (e.el.classList.remove(...p.navigationDisabledClass.split(" ")), u(), a());
      },
      f = () => {
        let p = i();
        (e.el.classList.add(...p.navigationDisabledClass.split(" ")), d());
      };
    Object.assign(e.navigation, { enable: h, disable: f, update: a, init: u, destroy: d });
  };
function Ch(e = "") {
  return `.${e
    .trim()
    .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1")
    .replace(/ /g, ".")}`;
}
var Xue = (e) => !!e.virtual && !!e.params.virtual?.enabled,
  jue = (e) => !!e.params.freeMode?.enabled,
  RG = (e) => {
    if (Xue(e)) return e.virtual.slides.length;
    let t = e.params.grid?.rows;
    if (e.grid && t && t > 1) return e.slides.length / Math.ceil(t);
    return e.slides.length;
  },
  E9 = ({ swiper: e, extendParams: t, on: r, emit: n }) => {
    (t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (y) => y,
        formatFractionTotal: (y) => y,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        modifierClass: "swiper-pagination-",
        currentClass: "swiper-pagination-current",
        totalClass: "swiper-pagination-total",
        hiddenClass: "swiper-pagination-hidden",
        progressbarFillClass: "swiper-pagination-progressbar-fill",
        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
        clickableClass: "swiper-pagination-clickable",
        lockClass: "swiper-pagination-lock",
        horizontalClass: "swiper-pagination-horizontal",
        verticalClass: "swiper-pagination-vertical",
        paginationDisabledClass: "swiper-pagination-disabled",
      },
    }),
      (e.pagination = { el: null, bullets: [] }));
    let o,
      s = 0;
    function a() {
      return e.params.pagination;
    }
    function l() {
      return (
        !a().el ||
        !e.pagination.el ||
        (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
      );
    }
    function c(y, x) {
      let { bulletActiveClass: b } = a();
      if (!y) return;
      let v = y[`${x === "prev" ? "previous" : "next"}ElementSibling`];
      if (v) {
        if (
          (v.classList.add(`${b}-${x}`),
          (v = v[`${x === "prev" ? "previous" : "next"}ElementSibling`]),
          v)
        )
          v.classList.add(`${b}-${x}-${x}`);
      }
    }
    function u(y, x, b) {
      if (((y = y % b), (x = x % b), x === y + 1)) return "next";
      else if (x === y - 1) return "previous";
      return;
    }
    function d(y) {
      let b = y.target.closest(Ch(a().bulletClass));
      if (!b) return;
      y.preventDefault();
      let v = (A0(b) ?? 0) * (e.params.slidesPerGroup ?? 1);
      if (e.params.loop) {
        if (e.realIndex === v) return;
        let _ = u(e.realIndex, v, e.slides.length);
        if (_ === "next") e.slideNext();
        else if (_ === "previous") e.slidePrev();
        else e.slideToLoop(v);
      } else e.slideTo(v);
    }
    function h() {
      let y = e.rtl,
        x = a();
      if (l()) return;
      let b = Gi(e.pagination.el),
        v,
        _,
        w = RG(e),
        S = e.params.loop ? Math.ceil(w / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
      if (e.params.loop)
        ((_ = e.previousRealIndex || 0),
          (v =
            (e.params.slidesPerGroup ?? 1) > 1
              ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1))
              : e.realIndex));
      else if (typeof e.snapIndex < "u") ((v = e.snapIndex), (_ = e.previousSnapIndex));
      else ((_ = e.previousIndex || 0), (v = e.activeIndex || 0));
      if (x.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
        let E = e.pagination.bullets,
          T = 0,
          M = 0,
          C = 0;
        if (x.dynamicBullets) {
          o = mA(E[0], e.isHorizontal() ? "width" : "height");
          let R = e.isHorizontal() ? "width" : "height";
          if (
            (b.forEach((B) => {
              B.style[R] = `${(o ?? 0) * (x.dynamicMainBullets + 4)}px`;
            }),
            x.dynamicMainBullets > 1 && _ !== void 0)
          ) {
            if (((s += v - (_ || 0)), s > x.dynamicMainBullets - 1)) s = x.dynamicMainBullets - 1;
            else if (s < 0) s = 0;
          }
          ((T = Math.max(v - s, 0)),
            (M = T + (Math.min(E.length, x.dynamicMainBullets) - 1)),
            (C = (M + T) / 2));
        }
        if (
          (E.forEach((R) => {
            let B = ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((L) => `${x.bulletActiveClass}${L}`)
              .flatMap((L) => (typeof L === "string" && L.includes(" ") ? L.split(" ") : [L]));
            R.classList.remove(...B);
          }),
          b.length > 1)
        )
          E.forEach((R) => {
            let B = A0(R);
            if (B === v) R.classList.add(...x.bulletActiveClass.split(" "));
            else if (e.isElement) R.setAttribute("part", "bullet");
            if (x.dynamicBullets && B !== void 0) {
              if (B >= T && B <= M) R.classList.add(...`${x.bulletActiveClass}-main`.split(" "));
              if (B === T) c(R, "prev");
              if (B === M) c(R, "next");
            }
          });
        else {
          let R = E[v];
          if (R) R.classList.add(...x.bulletActiveClass.split(" "));
          if (e.isElement)
            E.forEach((B, L) => {
              B.setAttribute("part", L === v ? "bullet-active" : "bullet");
            });
          if (x.dynamicBullets) {
            let B = E[T],
              L = E[M];
            for (let k = T; k <= M; k += 1)
              if (E[k]) E[k].classList.add(...`${x.bulletActiveClass}-main`.split(" "));
            (c(B, "prev"), c(L, "next"));
          }
        }
        if (x.dynamicBullets) {
          let R = Math.min(E.length, x.dynamicMainBullets + 4),
            B = ((o ?? 0) * R - (o ?? 0)) / 2 - C * (o ?? 0),
            L = y ? "right" : "left",
            k = e.isHorizontal() ? L : "top";
          E.forEach((z) => {
            z.style[k] = `${B}px`;
          });
        }
      }
      b.forEach((E, T) => {
        if (x.type === "fraction")
          (E.querySelectorAll(Ch(x.currentClass)).forEach((M) => {
            M.textContent = String(x.formatFractionCurrent(v + 1));
          }),
            E.querySelectorAll(Ch(x.totalClass)).forEach((M) => {
              M.textContent = String(x.formatFractionTotal(S));
            }));
        if (x.type === "progressbar") {
          let M;
          if (x.progressbarOpposite) M = e.isHorizontal() ? "vertical" : "horizontal";
          else M = e.isHorizontal() ? "horizontal" : "vertical";
          let C = (v + 1) / S,
            R = 1,
            B = 1;
          if (M === "horizontal") R = C;
          else B = C;
          E.querySelectorAll(Ch(x.progressbarFillClass)).forEach((L) => {
            ((L.style.transform = `translate3d(0,0,0) scaleX(${R}) scaleY(${B})`),
              (L.style.transitionDuration = `${e.params.speed}ms`));
          });
        }
        if (x.type === "custom" && x.renderCustom) {
          if ((vh(E, x.renderCustom(e, v + 1, S)), T === 0)) n("paginationRender", E);
        } else {
          if (T === 0) n("paginationRender", E);
          n("paginationUpdate", E);
        }
        if (e.params.watchOverflow && e.enabled)
          E.classList[e.isLocked ? "add" : "remove"](x.lockClass);
      });
    }
    function f() {
      let y = a();
      if (l()) return;
      let x = RG(e),
        b = Gi(e.pagination.el),
        v = "";
      if (y.type === "bullets") {
        let _ = e.params.loop ? Math.ceil(x / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
        if (e.params.freeMode && jue(e) && _ > x) _ = x;
        for (let w = 0; w < _; w += 1)
          if (y.renderBullet) v += y.renderBullet.call(e, w, y.bulletClass);
          else
            v += `<${y.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${y.bulletClass}"></${y.bulletElement}>`;
      }
      if (y.type === "fraction")
        if (y.renderFraction) v = y.renderFraction.call(e, y.currentClass, y.totalClass);
        else v = `<span class="${y.currentClass}"></span> / <span class="${y.totalClass}"></span>`;
      if (y.type === "progressbar")
        if (y.renderProgressbar) v = y.renderProgressbar.call(e, y.progressbarFillClass);
        else v = `<span class="${y.progressbarFillClass}"></span>`;
      if (
        ((e.pagination.bullets = []),
        b.forEach((_) => {
          if (y.type !== "custom") vh(_, v || "");
          if (y.type === "bullets")
            e.pagination.bullets.push(...Array.from(_.querySelectorAll(Ch(y.bulletClass))));
        }),
        y.type !== "custom")
      )
        n("paginationRender", b[0]);
    }
    function p() {
      e.params.pagination = gA(e, e.originalParams.pagination, e.params.pagination, {
        el: "swiper-pagination",
      });
      let y = a();
      if (!y.el) return;
      let x;
      if (typeof y.el === "string" && e.isElement) x = e.el.querySelector(y.el);
      if (!x && typeof y.el === "string") x = [...document.querySelectorAll(y.el)];
      if (!x) x = y.el;
      if (!x || (Array.isArray(x) && x.length === 0)) return;
      if (
        e.params.uniqueNavElements &&
        typeof y.el === "string" &&
        Array.isArray(x) &&
        x.length > 1
      ) {
        if (((x = [...e.el.querySelectorAll(y.el)]), x.length > 1)) {
          let v = x.find((_) => {
            if (gm(_, ".swiper")[0] !== e.el) return !1;
            return !0;
          });
          if (v) x = v;
        }
      }
      if (Array.isArray(x) && x.length === 1) x = x[0];
      (Object.assign(e.pagination, { el: x }),
        Gi(x).forEach((v) => {
          if (y.type === "bullets" && y.clickable)
            v.classList.add(...(y.clickableClass || "").split(" "));
          if (
            (v.classList.add(y.modifierClass + y.type),
            v.classList.add(e.isHorizontal() ? y.horizontalClass : y.verticalClass),
            y.type === "bullets" && y.dynamicBullets)
          ) {
            if (
              (v.classList.add(`${y.modifierClass}${y.type}-dynamic`),
              (s = 0),
              y.dynamicMainBullets < 1)
            )
              y.dynamicMainBullets = 1;
          }
          if (y.type === "progressbar" && y.progressbarOpposite)
            v.classList.add(y.progressbarOppositeClass);
          if (y.clickable) v.addEventListener("click", d);
          if (!e.enabled) v.classList.add(y.lockClass);
        }));
    }
    function g() {
      let y = a();
      if (l()) return;
      let x = e.pagination.el;
      if (x)
        Gi(x).forEach((v) => {
          if (
            (v.classList.remove(y.hiddenClass),
            v.classList.remove(y.modifierClass + y.type),
            v.classList.remove(e.isHorizontal() ? y.horizontalClass : y.verticalClass),
            y.clickable)
          )
            (v.classList.remove(...(y.clickableClass || "").split(" ")),
              v.removeEventListener("click", d));
        });
      if (e.pagination.bullets)
        e.pagination.bullets.forEach((b) => b.classList.remove(...y.bulletActiveClass.split(" ")));
    }
    (r("changeDirection", () => {
      if (!e.pagination || !e.pagination.el) return;
      let y = a();
      Gi(e.pagination.el).forEach((b) => {
        (b.classList.remove(y.horizontalClass, y.verticalClass),
          b.classList.add(e.isHorizontal() ? y.horizontalClass : y.verticalClass));
      });
    }),
      r("init", () => {
        if (a().enabled === !1) A();
        else (p(), f(), h());
      }),
      r("activeIndexChange", () => {
        if (typeof e.snapIndex > "u") h();
      }),
      r("snapIndexChange", () => {
        h();
      }),
      r("snapGridLengthChange", () => {
        (f(), h());
      }),
      r("destroy", () => {
        g();
      }),
      r("enable disable", () => {
        let { el: y } = e.pagination;
        if (y) {
          let x = a();
          Gi(y).forEach((v) => v.classList[e.enabled ? "remove" : "add"](x.lockClass));
        }
      }),
      r("lock unlock", () => {
        h();
      }),
      r("click", (y, x) => {
        let b = x.target,
          v = Gi(e.pagination.el),
          _ = a();
        if (_.el && _.hideOnClick && v && v.length > 0 && !b.classList.contains(_.bulletClass)) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && b === e.navigation.nextEl) ||
              (e.navigation.prevEl && b === e.navigation.prevEl))
          )
            return;
          if (v[0].classList.contains(_.hiddenClass) === !0) n("paginationShow");
          else n("paginationHide");
          v.forEach((S) => S.classList.toggle(_.hiddenClass));
        }
      }));
    let m = () => {
        let y = a();
        e.el.classList.remove(y.paginationDisabledClass);
        let { el: x } = e.pagination;
        if (x) Gi(x).forEach((v) => v.classList.remove(y.paginationDisabledClass));
        (p(), f(), h());
      },
      A = () => {
        let y = a();
        e.el.classList.add(y.paginationDisabledClass);
        let { el: x } = e.pagination;
        if (x) Gi(x).forEach((v) => v.classList.add(y.paginationDisabledClass));
        g();
      };
    Object.assign(e.pagination, {
      enable: m,
      disable: A,
      render: f,
      update: h,
      init: p,
      destroy: g,
    });
  };
var S9 = ({ swiper: e, extendParams: t, emit: r, once: n }) => {
  t({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  });
  function i() {
    return e.params.freeMode;
  }
  function o() {
    if (e.params.cssMode) return;
    let l = e.getTranslate();
    (e.setTranslate(l),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate }));
  }
  function s() {
    if (e.params.cssMode) return;
    let { touchEventsData: l, touches: c } = e;
    if (l.velocities.length === 0)
      l.velocities.push({
        position: c[e.isHorizontal() ? "startX" : "startY"],
        time: l.touchStartTime ?? rc(),
      });
    l.velocities.push({ position: c[e.isHorizontal() ? "currentX" : "currentY"], time: rc() });
  }
  function a({ currentPos: l }) {
    if (e.params.cssMode) return;
    let { wrapperEl: c, rtlTranslate: u, snapGrid: d, touchEventsData: h } = e,
      f = e.params,
      p = i(),
      g = rc(),
      m = g - (h.touchStartTime ?? g);
    if (l < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (l > -e.maxTranslate()) {
      if (e.slides.length < d.length) e.slideTo(d.length - 1);
      else e.slideTo(e.slides.length - 1);
      return;
    }
    if (p.momentum) {
      if (h.velocities.length > 1) {
        let S = h.velocities.pop(),
          E = h.velocities.pop(),
          T = S.position - E.position,
          M = S.time - E.time;
        if (((e.velocity = T / M), (e.velocity /= 2), Math.abs(e.velocity) < p.minimumVelocity))
          e.velocity = 0;
        if (M > 150 || rc() - S.time > 300) e.velocity = 0;
      } else e.velocity = 0;
      ((e.velocity *= p.momentumVelocityRatio), (h.velocities.length = 0));
      let A = 1000 * p.momentumRatio,
        y = e.velocity * A,
        x = e.translate + y;
      if (u) x = -x;
      let b = !1,
        v,
        _ = Math.abs(e.velocity) * 20 * p.momentumBounceRatio,
        w = !1;
      if (x < e.maxTranslate()) {
        if (p.momentumBounce) {
          if (x + e.maxTranslate() < -_) x = e.maxTranslate() - _;
          ((v = e.maxTranslate()), (b = !0), (h.allowMomentumBounce = !0));
        } else x = e.maxTranslate();
        if (f.loop && f.centeredSlides) w = !0;
      } else if (x > e.minTranslate()) {
        if (p.momentumBounce) {
          if (x - e.minTranslate() > _) x = e.minTranslate() + _;
          ((v = e.minTranslate()), (b = !0), (h.allowMomentumBounce = !0));
        } else x = e.minTranslate();
        if (f.loop && f.centeredSlides) w = !0;
      } else if (p.sticky) {
        let S = 0;
        for (let E = 0; E < d.length; E += 1)
          if (d[E] > -x) {
            S = E;
            break;
          }
        if (Math.abs(d[S] - x) < Math.abs((d[S - 1] ?? d[S]) - x) || e.swipeDirection === "next")
          x = d[S];
        else x = d[S - 1];
        x = -x;
      }
      if (w)
        n("transitionEnd", () => {
          e.loopFix();
        });
      if (e.velocity !== 0) {
        if (u) A = Math.abs((-x - e.translate) / e.velocity);
        else A = Math.abs((x - e.translate) / e.velocity);
        if (p.sticky) {
          let S = Math.abs((u ? -x : x) - e.translate),
            E = e.slidesSizesGrid[e.activeIndex],
            T = f.speed;
          if (S < E) A = T;
          else if (S < 2 * E) A = T * 1.5;
          else A = T * 2.5;
        }
      } else if (p.sticky) {
        e.slideToClosest();
        return;
      }
      if (p.momentumBounce && b && v !== void 0)
        (e.updateProgress(v),
          e.setTransition(A),
          e.setTranslate(x),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          Am(c, () => {
            if (!e || e.destroyed || !h.allowMomentumBounce) return;
            (r("momentumBounce"),
              e.setTransition(f.speed),
              setTimeout(() => {
                (e.setTranslate(v),
                  Am(c, () => {
                    if (!e || e.destroyed) return;
                    e.transitionEnd();
                  }));
              }, 0));
          }));
      else if (e.velocity) {
        if (
          (r("_freeModeNoMomentumRelease"),
          e.updateProgress(x),
          e.setTransition(A),
          e.setTranslate(x),
          e.transitionStart(!0, e.swipeDirection),
          !e.animating)
        )
          ((e.animating = !0),
            Am(c, () => {
              if (!e || e.destroyed) return;
              e.transitionEnd();
            }));
      } else e.updateProgress(x);
      (e.updateActiveIndex(), e.updateSlidesClasses());
    } else if (p.sticky) {
      e.slideToClosest();
      return;
    } else r("_freeModeNoMomentumRelease");
    if (!p.momentum || m >= f.longSwipesMs)
      (r("_freeModeStaticRelease"),
        e.updateProgress(),
        e.updateActiveIndex(),
        e.updateSlidesClasses());
  }
  e.freeMode = { onTouchStart: o, onTouchMove: s, onTouchEnd: a };
};
