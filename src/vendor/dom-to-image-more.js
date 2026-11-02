// src/vendor/dom-to-image-more.js
// dom-to-image-more: renders DOM elements to images (cards, reference sheets).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var kH = Dc(function (c9, u9) {
  /*! dom-to-image-more v3.11.0 2026-09-24 23:01:12 UTC */ ((e) => {
    let t = (() => {
        let ae = 0;
        return {
          escape: function (V) {
            return V.replace(/([.*+?^${}()|[\]/\\])/g, "\\$1");
          },
          isDataUrl: function (V) {
            return V.search(/^(data:)/) !== -1;
          },
          canvasToBlob: function (V) {
            return V.toBlob
              ? new Promise(function (J) {
                  V.toBlob(J);
                })
              : ((ne = V),
                new Promise(function (J) {
                  var U = y(ne.toDataURL().split(",")[1]),
                    D = U.length,
                    ee = new Uint8Array(D);
                  for (let Ae = 0; Ae < D; Ae++) ee[Ae] = U.charCodeAt(Ae);
                  J(new Blob([ee], { type: "image/png" }));
                }));
            var ne;
          },
          resolveUrl: function (V, ne) {
            var J = document.implementation.createHTMLDocument(),
              U = J.createElement("base"),
              D = (J.head.appendChild(U), J.createElement("a"));
            return (
              Object.assign(D.style, a),
              J.body.appendChild(D),
              (U.href = ne),
              (D.href = V),
              D.href
            );
          },
          getSameDocumentFragmentId: ue,
          rewriteFragmentUrls: function (V, ne) {
            let J = /url\(\s*(["']?)((?:\\.|[^\\)])+)\1\s*\)/g,
              U = "",
              D = 0,
              ee;
            for (; (ee = J.exec(V)) !== null; ) {
              var Ae = ue(ee[2].replace(/\\(.)/g, "$1"));
              Ae !== null &&
                (ne(Ae),
                (U = (U += V.slice(D, ee.index)) + `url("#${Ae.replace(/["\\]/g, "\\$&")}")`),
                (D = J.lastIndex));
            }
            return U + V.slice(D);
          },
          parseFontFamilies: function (V) {
            let ne = [],
              J = "",
              U = "";
            for (let ee = 0; ee < (V || "").length; ee += 1) {
              var D = V.charAt(ee);
              D === "\\" && ee + 1 < V.length
                ? ((J += V.charAt(ee + 1)), (ee += 1))
                : U
                  ? D === U
                    ? (U = "")
                    : (J += D)
                  : D === '"' || D === "'"
                    ? (U = D)
                    : D === ","
                      ? (ne.push(J), (J = ""))
                      : (J += D);
            }
            return (
              ne.push(J),
              ne
                .map(function (ee) {
                  return ee.trim().replace(/\s+/g, " ").toLowerCase();
                })
                .filter(Boolean)
            );
          },
          getAndEncode: function (V, ne) {
            return P(V, ne, !0).then(I);
          },
          getResourceText: function (V, ne, J) {
            return P(V, ne, J).then(N);
          },
          uid: function () {
            return (
              "u" +
              ("0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4) +
              ae++
            );
          },
          asArray: function (V) {
            return Array.from(V);
          },
          escapeXhtml: function (V) {
            return V.replace(/%/g, "%25").replace(/#/g, "%23").replace(/\n/g, "%0A");
          },
          makeImage: function (V) {
            return V !== "data:,"
              ? new Promise(function (ne, J) {
                  let U = document.createElementNS(l, "svg"),
                    D = new Image();
                  (p.impl.options.useCredentials && (D.crossOrigin = "use-credentials"),
                    (D.onload = function () {
                      function ee() {
                        window && window.requestAnimationFrame
                          ? window.requestAnimationFrame(function () {
                              ne(D);
                            })
                          : ne(D);
                      }
                      (U.remove(), typeof D.decode == "function" ? D.decode().then(ee, ee) : ee());
                    }),
                    (D.onerror = (ee) => {
                      U.remove();
                      var Ae = String(V).split(",", 1)[0],
                        Ae = Error(
                          "dom-to-image-more: failed to rasterize the generated image (" +
                            Ae +
                            ", " +
                            String(V).length +
                            " bytes). The source may contain malformed markup, an unsupported element, or a tainted/cross-origin resource.",
                        );
                      ((Ae.cause = ee), J(Ae));
                    }),
                    U.appendChild(D),
                    Object.assign(U.style, a),
                    (D.src = V),
                    document.body.appendChild(U));
                })
              : Promise.resolve();
          },
          width: function (V) {
            var ne,
              J,
              U = W(V, "width");
            return isNaN(U)
              ? (ne = H(V))
                ? ne.width
                : ((ne = W(V, "border-left-width")),
                  (J = W(V, "border-right-width")),
                  V.scrollWidth + ne + J)
              : U;
          },
          height: function (V) {
            var ne,
              J,
              U = W(V, "height");
            return isNaN(U)
              ? (ne = H(V))
                ? ne.height
                : ((ne = W(V, "border-top-width")),
                  (J = W(V, "border-bottom-width")),
                  V.scrollHeight + ne + J)
              : U;
          },
          getWindow: Z,
          isElement: le,
          isElementHostForOpenShadowRoot: function (V) {
            return le(V) && V.shadowRoot !== null;
          },
          isShadowRoot: he,
          isInShadowRoot: re,
          isHTMLElement: function (V) {
            return F(V, "HTMLElement");
          },
          isHTMLCanvasElement: function (V) {
            return F(V, "HTMLCanvasElement");
          },
          isHTMLInputElement: function (V) {
            return F(V, "HTMLInputElement");
          },
          isHTMLImageElement: function (V) {
            return F(V, "HTMLImageElement");
          },
          isHTMLLinkElement: function (V) {
            return F(V, "HTMLLinkElement");
          },
          isHTMLScriptElement: function (V) {
            return F(V, "HTMLScriptElement");
          },
          isHTMLStyleElement: function (V) {
            return F(V, "HTMLStyleElement");
          },
          isHTMLTextAreaElement: function (V) {
            return F(V, "HTMLTextAreaElement");
          },
          isShadowSlotElement: function (V) {
            return re(V) && F(V, "HTMLSlotElement");
          },
          isSVGElement: function (V) {
            return F(V, "SVGElement");
          },
          isSVGImageElement: function (V) {
            return F(V, "SVGImageElement");
          },
          isSVGSVGElement: function (V) {
            return F(V, "SVGSVGElement");
          },
          isSVGRectElement: function (V) {
            return F(V, "SVGRectElement");
          },
          isSVGUseElement: function (V) {
            return F(V, "SVGUseElement");
          },
          isDimensionMissing: function (V) {
            return isNaN(V) || V <= 0;
          },
          isInstanceOf: F,
        };
        function Z(V) {
          return (
            (V = V ? V.ownerDocument : void 0),
            (V ? V.defaultView : void 0) ||
              (typeof window < "u" ? window : void 0) ||
              (e !== void 0 ? e : void 0) ||
              globalThis
          );
        }
        function F(V, ne) {
          var J = Z(V);
          return te(V, J, ne) || te(V, J && J.parent, ne);
        }
        function te(V, ne, J) {
          try {
            var U = ne && ne[J];
            return typeof U == "function" && V instanceof U;
          } catch (D) {
            return !1;
          }
        }
        function he(V) {
          return F(V, "ShadowRoot");
        }
        function re(V) {
          return V != null && V.getRootNode !== void 0 && he(V.getRootNode());
        }
        function le(V) {
          return F(V, "Element");
        }
        function ue(V) {
          var ne = V.indexOf("#");
          if (ne === -1 || ne === V.length - 1) return null;
          if (0 < ne) {
            var J = V.slice(0, ne);
            if (J !== U(document.URL) && J !== U(document.baseURI)) return null;
          }
          J = V.slice(ne + 1);
          try {
            return decodeURIComponent(J);
          } catch (D) {
            return J;
          }
          function U(D) {
            var ee = (D || "").indexOf("#");
            return ee === -1 ? D : D.slice(0, ee);
          }
        }
        function I(V) {
          return V == null || V === "" ? "" : typeof V == "string" ? V : Y(V, "readAsDataURL", "");
        }
        function N(V) {
          if (V == null || V === "") return null;
          if (typeof V != "string") return Y(V, "readAsText", null);
          {
            var ne = V.indexOf(",");
            if (ne === -1) return "";
            var J = V.slice(0, ne),
              V = V.slice(ne + 1);
            if (!/;base64/i.test(J)) return decodeURIComponent(V);
            let D = y(V),
              ee = "";
            for (let Ae = 0; Ae < D.length; Ae += 1)
              ee += "%" + ("00" + D.charCodeAt(Ae).toString(16)).slice(-2);
            return decodeURIComponent(ee);
          }
        }
        function Y(V, ne, J) {
          return new Promise(function (U) {
            let D = new FileReader();
            ((D.onloadend = function () {
              U(D.result);
            }),
              (D.onerror = function () {
                U(J);
              }));
            try {
              D[ne](V);
            } catch (ee) {
              U(J);
            }
          });
        }
        function P(V, ne, J) {
          let U = p.impl.urlCache.find(function (D) {
            return D.url === V;
          });
          if (
            (U || ((U = { url: V, promise: null }), p.impl.urlCache.push(U)), U.promise === null)
          ) {
            let D = function (Re) {
                var _e = p.impl.options.requestInterceptor;
                if (typeof _e == "function")
                  try {
                    return _e(V, { type: ne, status: Re });
                  } catch (ot) {
                    v("requestInterceptor threw:", ot);
                  }
              },
              ee = function (Re) {
                return Re != null;
              },
              Ae = D(void 0);
            if (ee(Ae)) return ((U.promise = Promise.resolve(Ae)), U.promise);
            if (J === !1) return ((U.promise = Promise.resolve(null)), U.promise);
            (p.impl.options.cacheBust &&
              (V += (/\?/.test(V) ? "&" : "?") + /*@__PURE__*/ new Date().getTime()),
              (U.promise = new Promise(function (Re) {
                let _e = new XMLHttpRequest();
                function ot(je) {
                  (pt(je, !1), Re(null));
                }
                function tt() {
                  Qe("Status:" + _e.status + " while fetching resource: " + V);
                }
                function Qe(je) {
                  var Bt = D(_e.status);
                  ee(Bt)
                    ? Promise.resolve(Bt).then(
                        function (ut) {
                          (pt(je, !0), Re(ut));
                        },
                        function () {
                          (v(je), ot(je));
                        },
                      )
                    : (Bt =
                          ne === f.IMAGE || ne === f.CSS_IMAGE
                            ? p.impl.options.imagePlaceholder
                            : void 0)
                      ? (pt(je, !0), Re(Bt))
                      : (v(je), ot(je));
                }
                function pt(je, Bt) {
                  var ut = p.impl.options.onImageError;
                  if (typeof ut == "function")
                    try {
                      ut({ url: V, message: je, status: _e.status, willUsePlaceholder: Bt });
                    } catch (et) {
                      v("onImageError handler threw:", et);
                    }
                }
                if (
                  ((_e.timeout = p.impl.options.httpTimeout),
                  (_e.onerror = tt),
                  (_e.ontimeout = tt),
                  (_e.onloadend = function () {
                    var je;
                    _e.readyState === XMLHttpRequest.DONE &&
                      (((je = _e.status) === 0 && V.toLowerCase().startsWith("file://")) ||
                      (200 <= je && je <= 300 && _e.response !== null)
                        ? (je = _e.response) instanceof Blob
                          ? Re(je)
                          : Qe(
                              "Response was not a Blob (got " +
                                typeof je +
                                ") while fetching resource: " +
                                V,
                            )
                        : tt());
                  }),
                  0 < p.impl.options.useCredentialsFilters.length &&
                    (p.impl.options.useCredentials =
                      0 <
                      p.impl.options.useCredentialsFilters.filter((je) => 0 <= V.search(je))
                        .length),
                  p.impl.options.useCredentials && (_e.withCredentials = !0),
                  p.impl.options.corsImg &&
                    V.indexOf("http") === 0 &&
                    V.indexOf(window.location.origin) === -1)
                ) {
                  var He =
                    (p.impl.options.corsImg.method || "GET").toUpperCase() === "POST"
                      ? "POST"
                      : "GET";
                  _e.open(He, (p.impl.options.corsImg.url || "").replace("#{cors}", V), !0);
                  let je = !1,
                    Bt = p.impl.options.corsImg.headers || {},
                    ut =
                      (Object.keys(Bt).forEach(function (et) {
                        (Bt[et].indexOf("application/json") !== -1 && (je = !0),
                          _e.setRequestHeader(et, Bt[et]));
                      }),
                      ((et) => {
                        try {
                          return JSON.parse(JSON.stringify(et));
                        } catch (It) {
                          (v("corsImg.data is missing or invalid", It),
                            ot("corsImg.data is missing or invalid"));
                        }
                      })(p.impl.options.corsImg.data || ""));
                  (Object.keys(ut).forEach(function (et) {
                    typeof ut[et] == "string" && (ut[et] = ut[et].replace("#{cors}", V));
                  }),
                    (_e.responseType = "blob"),
                    _e.send(je ? JSON.stringify(ut) : ut));
                } else (_e.open("GET", V, !0), (_e.responseType = "blob"), _e.send());
              })));
          }
          return U.promise;
        }
        function H(V) {
          if (V.nodeType !== m || typeof V.getBBox != "function") return null;
          try {
            var ne = V.getBBox();
            return ne && (ne.width || ne.height) ? ne : null;
          } catch (J) {
            return null;
          }
        }
        function W(V, ne) {
          if (V.nodeType === m) {
            let J = A(V).getPropertyValue(ne);
            if (J.slice(-2) === "px") return ((J = J.slice(0, -2)), parseFloat(J));
          }
          return NaN;
        }
      })(),
      r = (() => {
        let ae = /url\(\s*(["']?)((?:\\.|[^\\)])+)\1\s*\)/gm;
        return {
          inlineAll: function (re, le, ue, I) {
            return Z(re)
              ? Promise.resolve(re)
                  .then(F)
                  .then(function (N) {
                    return p.impl.options.filterUrls
                      ? N.filter(function (Y) {
                          return p.impl.options.filterUrls(Y, le);
                        })
                      : N;
                  })
                  .then(function (N) {
                    let Y = Promise.resolve(re);
                    return (
                      N.forEach(function (P) {
                        Y = Y.then(function (H) {
                          return he(H, P, le, ue, I);
                        });
                      }),
                      Y
                    );
                  })
              : Promise.resolve(re);
          },
          shouldProcess: Z,
          impl: { readUrls: F, inline: he, urlAsRegex: te },
        };
        function Z(re) {
          return re.search(ae) !== -1;
        }
        function F(re) {
          for (var le, ue = []; (le = ae.exec(re)) !== null; ) ue.push(le[2]);
          return ue.filter(function (I) {
            return (
              !t.isDataUrl(I) && I.charAt(0) !== "#" && t.getSameDocumentFragmentId(I) === null
            );
          });
        }
        function te(re) {
          return new RegExp(`url\\((["']?)(${t.escape(re)})\\1\\)`, "gm");
        }
        function he(re, le, ue, I, N) {
          return Promise.resolve(le)
            .then(function (Y) {
              return ue ? t.resolveUrl(Y, ue) : Y;
            })
            .then(function (Y) {
              return (N || t.getAndEncode)(Y, I);
            })
            .then(function (Y) {
              var P = te(le);
              return re.replace(P, `url($1${Y}$1)`);
            });
        }
      })(),
      n = {
        resolveAll: function (ae, Z) {
          return i()
            .then(function (F) {
              if (ae) {
                let ue = function (Y) {
                  t.parseFontFamilies(Y).forEach(function (P) {
                    N.add(P);
                  });
                };
                var le = ue,
                  te = F,
                  he = ae,
                  re = Z;
                let I = p.impl.options,
                  N = new Set(M);
                return (
                  [he].concat(t.asArray(he.querySelectorAll("*"))).forEach(function (Y) {
                    if (
                      (Y.style && ue(Y.style.getPropertyValue("font-family")),
                      t.isHTMLStyleElement(Y))
                    )
                      for (
                        var P, H = /font-family\s*:\s*([^;}]+)/gi;
                        (P = H.exec(Y.textContent)) !== null;
                      )
                        ue(P[1].replace(/\s*!important\s*$/i, ""));
                  }),
                  re && ue(re.fontFamily || re["font-family"]),
                  te.filter(function (Y) {
                    if (
                      ((Y = Y.descriptor()),
                      (Y.used = N.has(Y.family)),
                      typeof I.filterFonts == "function")
                    ) {
                      var P = I.filterFonts(Y);
                      if (P === !0 || P === !1) return P;
                    }
                    return Y.used;
                  })
                );
              }
              return F;
            })
            .then(function (F) {
              return Promise.all(
                F.map(function (te) {
                  return te.resolve();
                }),
              );
            })
            .then(function (F) {
              return F.join(`
`);
            });
        },
        impl: { readAll: i },
      };
    function i() {
      return Promise.resolve(t.asArray(document.styleSheets))
        .then(function (Z) {
          let F = typeof p.impl.options.requestInterceptor == "function",
            te = {};
          return Promise.all(
            Z.map(function (he) {
              let re = he.href;
              if (!re || te[re]) return he;
              te[re] = !0;
              var le =
                ((ue) => {
                  try {
                    return !ue.cssRules;
                  } catch (I) {
                    return !0;
                  }
                })(he) &&
                ((ue) => {
                  var I = p.impl.options.loadExternalStyleSheet;
                  if (typeof I == "function")
                    try {
                      return I(ue) === !0;
                    } catch (N) {
                      return (v("domtoimage: loadExternalStyleSheet predicate threw:", N), !1);
                    }
                  return I === !0;
                })(re);
              return F || le
                ? t.getResourceText(re, f.STYLESHEET, le).then(function (ue) {
                    return (
                      (ue &&
                        ((I, N) => {
                          try {
                            var Y = document.implementation.createHTMLDocument(""),
                              P = Y.createElement("style");
                            return (
                              P.appendChild(
                                document.createTextNode(
                                  ((H = N),
                                  I.replace(/url\((['"]?)([^'")]+)\1\)/g, function (W, V, ne) {
                                    return (
                                      (ne = ne.trim()),
                                      t.isDataUrl(ne) || /^[a-z][a-z0-9+.-]*:/i.test(ne)
                                        ? W
                                        : `url(${V}${t.resolveUrl(ne, H)}${V})`
                                    );
                                  })),
                                ),
                              ),
                              Y.body.appendChild(P),
                              P.sheet
                            );
                          } catch (W) {
                            return null;
                          }
                          var H;
                        })(ue, re)) ||
                      he
                    );
                  })
                : he;
            }),
          );
        })
        .then(function (Z) {
          let F = [];
          return (
            Z.forEach(function (te) {
              var he = Object.getPrototypeOf(te);
              if (Object.prototype.hasOwnProperty.call(he, "cssRules"))
                try {
                  t.asArray(te.cssRules || []).forEach(F.push.bind(F));
                } catch (re) {
                  p.impl.options.ignoreCSSRuleErrors ||
                    v("domtoimage: Error while reading CSS rules from: " + te.href, re);
                }
            }),
            F
          );
        })
        .then(function (Z) {
          return Z.filter(function (F) {
            return F.type === CSSRule.FONT_FACE_RULE;
          }).filter(function (F) {
            return r.shouldProcess(F.style.getPropertyValue("src"));
          });
        })
        .then(function (Z) {
          return Z.map(ae);
        });
      function ae(Z) {
        return {
          resolve: function () {
            var F = (Z.parentStyleSheet || {}).href;
            return r.inlineAll(Z.cssText, F, f.FONT);
          },
          src: function () {
            return Z.style.getPropertyValue("src");
          },
          descriptor: function () {
            var F = Z.style;
            return {
              family: t.parseFontFamilies(F.getPropertyValue("font-family"))[0] || "",
              style: F.getPropertyValue("font-style"),
              weight: F.getPropertyValue("font-weight"),
              stretch: F.getPropertyValue("font-stretch"),
              unicodeRange: F.getPropertyValue("unicode-range"),
              src: F.getPropertyValue("src"),
              rule: Z,
            };
          },
        };
      }
    }
    let o = {
      inlineAll: function ae(Z) {
        return t.isElement(Z)
          ? ((F = Z).style
              ? ((te = [
                  "background",
                  "background-image",
                  "mask",
                  "mask-image",
                  "-webkit-mask",
                  "-webkit-mask-image",
                ].map(function (he) {
                  let re = F.style.getPropertyValue(he),
                    le = F.style.getPropertyPriority(he);
                  return re
                    ? r.inlineAll(re, void 0, f.CSS_IMAGE).then(function (ue) {
                        F.style.setProperty(he, ue, le);
                      })
                    : Promise.resolve();
                })),
                Promise.all(te).then(function () {
                  return F;
                }))
              : Promise.resolve(F)
            ).then(function () {
              return t.isHTMLImageElement(Z)
                ? s(Z).inline()
                : t.isSVGImageElement(Z)
                  ? !(re =
                      (he = Z).getAttribute("href") ||
                      he.getAttributeNS(c, "href") ||
                      he.getAttribute("xlink:href")) || t.isDataUrl(re)
                    ? Promise.resolve(he)
                    : Promise.resolve(re)
                        .then(function (le) {
                          return (0, t.getAndEncode)(le, f.IMAGE);
                        })
                        .then(function (le) {
                          return (
                            le &&
                              (he.setAttributeNS(c, "xlink:href", le), he.setAttribute("href", le)),
                            he
                          );
                        })
                  : Promise.all(t.asArray(Z.childNodes).map(ae));
              var he, re;
            })
          : Promise.resolve(Z);
        var F, te;
      },
      impl: { newImage: s },
    };
    function s(ae) {
      return {
        inline: function (Z) {
          return t.isDataUrl(ae.src)
            ? Promise.resolve()
            : Promise.resolve(ae.src)
                .then(function (F) {
                  return (Z || t.getAndEncode)(F, f.IMAGE);
                })
                .then(function (F) {
                  return new Promise(function (te) {
                    ((ae.onload = te), (ae.onerror = te), (ae.src = F));
                  });
                });
        },
      };
    }
    let a = { position: "fixed", left: "-9999px", visibility: "hidden" },
      l = "http://www.w3.org/2000/svg",
      c = "http://www.w3.org/1999/xlink",
      u = "data:image/svg+xml;charset=utf-8,",
      d = { warn: function (...ae) {}, error: function (...ae) {} },
      h = {
        copyDefaultStyles: !0,
        imagePlaceholder: void 0,
        cacheBust: !1,
        useCredentials: !1,
        useCredentialsFilters: [],
        httpTimeout: 30000,
        styleCaching: "strict",
        corsImg: void 0,
        adjustClonedNode: void 0,
        filterStyles: void 0,
        filterUrls: void 0,
        filterFonts: void 0,
        adjustPseudoElement: void 0,
        onImageError: void 0,
        ensureShown: !1,
        pixelRatio: 1,
        preserveScroll: !1,
        ignoreCSSRuleErrors: !1,
        requestInterceptor: void 0,
        loadExternalStyleSheet: !1,
        logger: d,
      },
      f = Object.freeze({
        IMAGE: "image",
        CSS_IMAGE: "css-image",
        FONT: "font",
        STYLESHEET: "stylesheet",
      }),
      p = {
        toSvg: w,
        toPng: function (ae, Z) {
          return S(ae, Z).then(function (F) {
            return F.toDataURL();
          });
        },
        toJpeg: function (ae, Z) {
          return S(ae, Z).then(function (F) {
            return F.toDataURL("image/jpeg", (Z ? Z.quality : void 0) || 1);
          });
        },
        toBlob: function (ae, Z) {
          return S(ae, Z).then(t.canvasToBlob);
        },
        toPixelData: function (ae, Z) {
          return S(ae, Z).then(function (F) {
            return F.getContext("2d").getImageData(0, 0, t.width(ae), t.height(ae)).data;
          });
        },
        toCanvas: S,
        ResourceType: f,
        impl: {
          fontFaces: n,
          images: o,
          util: t,
          inliner: r,
          urlCache: [],
          options: {},
          copyOptions: function (ae) {
            Object.keys(h).forEach(function (Z) {
              p.impl.options[Z] = (ae[Z] === void 0 ? h : ae)[Z];
            });
          },
          resetUrlCache: g,
        },
      };
    function g() {
      p.impl.urlCache = [];
    }
    typeof c9 == "object" && typeof u9 == "object" ? (u9.exports = p) : (e.domtoimage = p);
    let m = (typeof Node < "u" ? Node.ELEMENT_NODE : void 0) || 1,
      A = x("getComputedStyle"),
      y = x("atob");
    function x(ae) {
      return (
        (e !== void 0 ? e[ae] : void 0) ||
        (typeof window < "u" ? window[ae] : void 0) ||
        globalThis[ae]
      );
    }
    function b(...ae) {
      _("warn", ae);
    }
    function v(...ae) {
      _("error", ae);
    }
    function _(te, Z) {
      var F = p.impl.options.logger || d,
        te = F[te];
      typeof te == "function" && te.apply(F, Z);
    }
    function w(ae, Z) {
      let F = p.impl.util.getWindow(ae),
        te = ((Z = Z || {}), p.impl.copyOptions(Z), []);
      return (
        (T = []),
        (M = /*@__PURE__*/ new Set()),
        F && F.document
          ? (() => {
              var le = F.document;
              if (!le.fonts || !le.fonts.ready) return Promise.resolve();
              let ue = p.impl.options.httpTimeout || 30000,
                I,
                N = Promise.resolve(le.fonts.ready).then(
                  function () {
                    return !1;
                  },
                  function () {
                    return !1;
                  },
                ),
                Y = new Promise(function (P) {
                  I = F.setTimeout(function () {
                    P(!0);
                  }, ue);
                });
              return Promise.race([N, Y]).then(function (P) {
                (F.clearTimeout(I),
                  P &&
                    b(
                      "dom-to-image-more: timed out after " +
                        ue +
                        "ms waiting for document fonts to finish loading (document.fonts.ready); rendering anyway — the output may have missing glyphs or fallback-font metrics.",
                    ));
              });
            })()
              .then(function () {
                var le = ae;
                if (le.nodeType === m) return le;
                var ue,
                  I = le,
                  N = le.parentNode;
                if (N)
                  return (
                    (ue = document.createElement("span")),
                    N.replaceChild(ue, I),
                    ue.append(le),
                    te.push({ parent: N, child: I, wrapper: ue }),
                    ue
                  );
                throw Error(
                  "Cannot render a non-element node that is not attached to a parent; wrap it in an element or attach it to the document first.",
                );
              })
              .then(function (le) {
                return (function ue(I, N, Y, P) {
                  var H = N.filter;
                  return I === E ||
                    t.isHTMLScriptElement(I) ||
                    t.isHTMLStyleElement(I) ||
                    t.isHTMLLinkElement(I) ||
                    (Y !== null && H && !H(I))
                    ? Promise.resolve()
                    : Promise.resolve(I)
                        .then(function (W) {
                          return t.isHTMLCanvasElement(W)
                            ? t.makeImage(W.toDataURL())
                            : W.cloneNode(!1);
                        })
                        .then(function (W) {
                          return (
                            N.adjustClonedNode && N.adjustClonedNode(I, W, !1),
                            Promise.resolve(W)
                          );
                        })
                        .then(function (W) {
                          {
                            var V = W,
                              W = ((W = I), t.isElementHostForOpenShadowRoot(W) ? W.shadowRoot : W);
                            let J = ((D) => {
                                if (t.isShadowSlotElement(D)) {
                                  var ee = D.assignedNodes();
                                  if (ee && 0 < ee.length) return ee;
                                }
                                return D.childNodes;
                              })(W),
                              U = Promise.resolve();
                            if (J.length !== 0) {
                              let D = A(((W = W), t.isShadowRoot(W) ? W.host : W));
                              t.asArray(J).forEach(function (ee) {
                                U = U.then(function () {
                                  return ue(ee, N, D, P).then(function (Ae) {
                                    Ae && V.appendChild(Ae);
                                  });
                                });
                              });
                            }
                            return U.then(function () {
                              return V;
                            });
                          }
                        })
                        .then(function (W) {
                          return (
                            N.adjustClonedNode && N.adjustClonedNode(I, W, !0),
                            Promise.resolve(W)
                          );
                        })
                        .then(function (W) {
                          return (
                            (V = W),
                            (ne = I),
                            !t.isElement(V) || t.isShadowSlotElement(ne)
                              ? Promise.resolve(V)
                              : Promise.resolve()
                                  .then(function () {
                                    if (
                                      t.isHTMLImageElement(ne) &&
                                      typeof ne.decode == "function" &&
                                      !(
                                        (ne.complete && 0 < ne.naturalWidth) ||
                                        ((J) => {
                                          if (J.loading === "lazy") {
                                            let D = J;
                                            for (; D && D.nodeType === 1; ) {
                                              if (A(D).getPropertyValue("display") === "none")
                                                return 1;
                                              var U;
                                              D =
                                                D.parentElement ||
                                                ((U =
                                                  typeof D.getRootNode == "function"
                                                    ? D.getRootNode()
                                                    : null) && U.host
                                                  ? U.host
                                                  : null);
                                            }
                                          }
                                        })(ne)
                                      )
                                    )
                                      return ne.decode().catch(function () {});
                                  })
                                  .then(function () {
                                    if (V.style) {
                                      var J = ne,
                                        U = V,
                                        D,
                                        ee,
                                        Ae = A(J);
                                      if (Ae.cssText)
                                        ((U.style.cssText = Ae.cssText),
                                          ((Qe = U.style).font = (pt = Ae).font),
                                          (Qe.fontFamily = pt.fontFamily),
                                          (Qe.fontFeatureSettings = pt.fontFeatureSettings),
                                          (Qe.fontKerning = pt.fontKerning),
                                          (Qe.fontSize = pt.fontSize),
                                          (Qe.fontStretch = pt.fontStretch),
                                          (Qe.fontStyle = pt.fontStyle),
                                          (Qe.fontVariant = pt.fontVariant),
                                          (Qe.fontVariantCaps = pt.fontVariantCaps),
                                          (Qe.fontVariantEastAsian = pt.fontVariantEastAsian),
                                          (Qe.fontVariantLigatures = pt.fontVariantLigatures),
                                          (Qe.fontVariantNumeric = pt.fontVariantNumeric),
                                          (Qe.fontVariationSettings = pt.fontVariationSettings),
                                          (Qe.fontWeight = pt.fontWeight));
                                      else {
                                        {
                                          var Re = N,
                                            _e = J,
                                            ot = Ae,
                                            tt = Y,
                                            Qe = U;
                                          let He = p.impl.options.copyDefaultStyles
                                              ? ((Xt, ut) => {
                                                  var et,
                                                    It = ((xe) => {
                                                      var pe = [];
                                                      do
                                                        if (xe.nodeType === m) {
                                                          var Ue = xe.tagName;
                                                          if ((pe.push(Ue), oe.includes(Ue))) break;
                                                        }
                                                      while ((xe = xe.parentNode));
                                                      return pe;
                                                    })(ut),
                                                    Xt =
                                                      (Xt.styleCaching !== "relaxed"
                                                        ? It
                                                        : It.filter(
                                                            (xe, pe, Ue) =>
                                                              pe === 0 || pe === Ue.length - 1,
                                                          )
                                                      ).join(">") +
                                                      ((et = ut) && et.hasAttribute
                                                        ? K.filter(function (xe) {
                                                            return et.hasAttribute(xe);
                                                          })
                                                            .map(function (xe) {
                                                              return `[${xe}]`;
                                                            })
                                                            .join("")
                                                        : "");
                                                  if (de[Xt]) return de[Xt];
                                                  var Mr,
                                                    Te = (It = ((xe, pe) => {
                                                      let Ue = xe.body;
                                                      do
                                                        var mt = pe.pop(),
                                                          mt = xe.createElement(mt);
                                                      while (
                                                        (Ue.appendChild(mt),
                                                        (Ue = mt),
                                                        0 < pe.length)
                                                      );
                                                      return ((Ue.textContent = "​"), Ue);
                                                    })(
                                                      (Mr = (() => {
                                                        if (E) return E.contentWindow;
                                                        ((pe = document.characterSet || "UTF-8"),
                                                          (xe = (xe = document.doctype)
                                                            ? (
                                                                `<!DOCTYPE ${nn(xe.name)} ${nn(xe.publicId)} ` +
                                                                nn(xe.systemId)
                                                              ).trim() + ">"
                                                            : ""),
                                                          ((E =
                                                            document.createElement("iframe")).id =
                                                            "domtoimage-sandbox-" + t.uid()),
                                                          Object.assign(E.style, a),
                                                          document.body.appendChild(E));
                                                        var xe,
                                                          pe,
                                                          Ue = E,
                                                          mt = "domtoimage-sandbox";
                                                        try {
                                                          return (
                                                            Ue.contentWindow.document.write(
                                                              xe +
                                                                `<html><head><meta charset='${pe}'><title>${mt}</title></head><body></body></html>`,
                                                            ),
                                                            Ue.contentWindow
                                                          );
                                                        } catch (Zr) {}
                                                        var wt = document.createElement("meta");
                                                        wt.setAttribute("charset", pe);
                                                        try {
                                                          var yt =
                                                              document.implementation.createHTMLDocument(
                                                                mt,
                                                              ),
                                                            tr =
                                                              (yt.head.appendChild(wt),
                                                              xe + yt.documentElement.outerHTML);
                                                          return (
                                                            Ue.setAttribute("srcdoc", tr),
                                                            Ue.contentWindow
                                                          );
                                                        } catch (Zr) {}
                                                        return (
                                                          Ue.contentDocument.head.appendChild(wt),
                                                          (Ue.contentDocument.title = mt),
                                                          Ue.contentWindow
                                                        );
                                                        function nn(Zr) {
                                                          var Qn;
                                                          return Zr
                                                            ? (((Qn =
                                                                document.createElement(
                                                                  "div",
                                                                )).innerText = Zr),
                                                              Qn.innerHTML)
                                                            : "";
                                                        }
                                                      })()).document,
                                                      It,
                                                    )),
                                                    Ke = ut,
                                                    Ne =
                                                      (Ke &&
                                                        Ke.hasAttribute &&
                                                        K.forEach(function (xe) {
                                                          Ke.hasAttribute(xe) &&
                                                            Te.setAttribute(
                                                              xe,
                                                              Ke.getAttribute(xe),
                                                            );
                                                        }),
                                                      (ut = ((xe, pe) => {
                                                        let Ue = {},
                                                          mt = xe.getComputedStyle(pe),
                                                          wt =
                                                            (t.asArray(mt).forEach(function (tr) {
                                                              Ue[tr] =
                                                                tr === "width" || tr === "height"
                                                                  ? "auto"
                                                                  : mt.getPropertyValue(tr);
                                                            }),
                                                            pe.parentElement),
                                                          yt;
                                                        return (
                                                          wt &&
                                                            ((yt = xe
                                                              .getComputedStyle(wt)
                                                              .getPropertyValue("font-size")),
                                                            (Ue[G] = Ue["font-size"] !== yt)),
                                                          Ue
                                                        );
                                                      })(Mr, It)),
                                                      It);
                                                  do var ze = Ne.parentElement;
                                                  while (
                                                    (ze !== null && ze.removeChild(Ne),
                                                    (Ne = ze) && Ne.tagName !== "BODY")
                                                  );
                                                  return (de[Xt] = ut);
                                                })(Re, _e)
                                              : {},
                                            je = Qe.style;
                                          (t.asArray(ot).forEach(function (Bt) {
                                            var ut, et, It;
                                            (Re.filterStyles && !Re.filterStyles(_e, Bt)) ||
                                              ((ut = ot.getPropertyValue(Bt)),
                                              (It = He[Bt]),
                                              (et = tt ? tt.getPropertyValue(Bt) : void 0),
                                              je.getPropertyValue(Bt)) ||
                                              ((ut !== It ||
                                                (tt && ut !== et) ||
                                                (Bt === "font-size" && He[G])) &&
                                                ((It = ot.getPropertyPriority(Bt)),
                                                X(je, Bt, ut, It)));
                                          }),
                                            (D = ot),
                                            (ee = je),
                                            ["top", "right", "bottom", "left"].forEach(
                                              function (It) {
                                                var ut,
                                                  et = `border-${It}-width`,
                                                  It = D.getPropertyValue(`border-${It}-style`);
                                                It &&
                                                  It !== "none" &&
                                                  !ee.getPropertyValue(et) &&
                                                  (It = D.getPropertyValue(et)) &&
                                                  ((ut = D.getPropertyPriority(et)),
                                                  X(ee, et, It, ut));
                                              },
                                            ));
                                        }
                                        Y === null &&
                                          ([
                                            "inset-block",
                                            "inset-block-start",
                                            "inset-block-end",
                                          ].forEach((He) => U.style.removeProperty(He)),
                                          ["left", "right", "top", "bottom"].forEach((He) => {
                                            U.style.getPropertyValue(He) &&
                                              U.style.setProperty(He, "0px");
                                          }));
                                      }
                                      ((pt = A(ne).getPropertyValue("visibility")),
                                        Y === null
                                          ? pt !== "visible" &&
                                            V.style.setProperty("visibility", "visible")
                                          : pt === Y.getPropertyValue("visibility") &&
                                            V.style.removeProperty("visibility"),
                                        k(A(ne).getPropertyValue("font-family")));
                                    }
                                    var pt;
                                  })
                                  .then(function () {
                                    let J = t.uid();
                                    return Promise.all(
                                      [":before", ":after"].map(function (U) {
                                        let D = A(ne, U),
                                          ee = D.getPropertyValue("content");
                                        if (ee !== "" && ee !== "none") {
                                          let Re;
                                          if (N.adjustPseudoElement) {
                                            var Ae = N.adjustPseudoElement(ne, U, D);
                                            if (Ae === !1) return;
                                            Ae && typeof Ae == "object" && (Re = Ae);
                                          }
                                          (k(D.getPropertyValue("font-family")),
                                            Re && Re["font-family"] && k(Re["font-family"]));
                                          let _e = V.getAttribute("class") || "",
                                            ot =
                                              (V.setAttribute("class", _e + " " + J), `.${J}:` + U),
                                            tt = D.cssText
                                              ? D.cssText + ` content: ${ee};`
                                              : t
                                                  .asArray(D)
                                                  .map(function (Qe) {
                                                    return (
                                                      Qe +
                                                      ": " +
                                                      D.getPropertyValue(Qe) +
                                                      (D.getPropertyPriority(Qe)
                                                        ? " !important"
                                                        : "")
                                                    );
                                                  })
                                                  .join("; ") + ";";
                                          return (
                                            Re &&
                                              (tt += Object.keys(Re)
                                                .map(function (Qe) {
                                                  return ` ${Qe}: ${Re[Qe]};`;
                                                })
                                                .join("")),
                                            r
                                              .inlineAll(tt, void 0, f.CSS_IMAGE)
                                              .then(function (Qe) {
                                                var pt = document.createElement("style");
                                                (pt.appendChild(
                                                  document.createTextNode(ot + `{${Qe}}`),
                                                ),
                                                  V.appendChild(pt));
                                              })
                                          );
                                        }
                                      }),
                                    );
                                  })
                                  .then(function () {
                                    (t.isHTMLTextAreaElement(ne) && (V.innerHTML = ne.value),
                                      t.isHTMLInputElement(ne) &&
                                        V.setAttribute("value", ne.value));
                                  })
                                  .then(function () {
                                    if (V.attributes && V.removeAttribute) {
                                      var J = [];
                                      for (let D = 0; D < V.attributes.length; D += 1) {
                                        var U = V.attributes[D].name;
                                        /["'=<>/\s]/.test(U) && J.push(U);
                                      }
                                      J.forEach(function (D) {
                                        V.removeAttribute(D);
                                      });
                                    }
                                  })
                                  .then(function () {
                                    if (N.preserveScroll && V.style) {
                                      var J = ne.scrollLeft || 0,
                                        U = ne.scrollTop || 0;
                                      if (J !== 0 || U !== 0) {
                                        V.style.overflow = "hidden";
                                        let D = `translate(${-J}px, ${-U}px)`;
                                        t.asArray(V.children).forEach(function (ee) {
                                          var Ae;
                                          ee.style &&
                                            ((Ae =
                                              ee.style.transform && ee.style.transform !== "none"
                                                ? " " + ee.style.transform
                                                : ""),
                                            (ee.style.transform = D + Ae));
                                        });
                                      }
                                    }
                                  })
                                  .then(function () {
                                    t.isSVGElement(V) &&
                                      (V.setAttribute("xmlns", l),
                                      t.isSVGRectElement(V) &&
                                        ["width", "height"].forEach(function (J) {
                                          var U = V.getAttribute(J);
                                          U && V.style.setProperty(J, U);
                                        }),
                                      t.isSVGUseElement(V)) &&
                                      B(ne, ne);
                                  })
                                  .then(function () {
                                    (V.style &&
                                      C.forEach(function (J) {
                                        var U,
                                          D = V.style.getPropertyValue(J);
                                        D &&
                                          D.indexOf("url(") !== -1 &&
                                          (U = t.rewriteFragmentUrls(D, function (ee) {
                                            L(ne, ee);
                                          })) !== D &&
                                          V.style.setProperty(J, U, V.style.getPropertyPriority(J));
                                      }),
                                      t.isSVGElement(ne) &&
                                        R.forEach(function (J) {
                                          ((J = ne.getAttribute(J)),
                                            J &&
                                              t.rewriteFragmentUrls(J, function (U) {
                                                L(ne, U);
                                              }));
                                        }));
                                  })
                                  .then(function () {
                                    var J;
                                    t.isElement(V) &&
                                      (() => {
                                        var U = ne.children || [];
                                        for (let D = 0; D < U.length; D += 1)
                                          if (U[D].tagName === "CAPTION") return 1;
                                      })() &&
                                      (((J = A(ne).getPropertyValue("display")) !== "table" &&
                                        J !== "inline-table") ||
                                        (V.style.removeProperty("height"),
                                        V.style.removeProperty("block-size")));
                                  })
                                  .then(function () {
                                    t.isHTMLImageElement(V) &&
                                      (V.removeAttribute("loading"), ne.srcset || ne.sizes) &&
                                      (V.removeAttribute("srcset"),
                                      V.removeAttribute("sizes"),
                                      (V.src = ne.currentSrc || ne.src));
                                  })
                                  .then(function () {
                                    return V;
                                  })
                          );
                          var V, ne;
                        });
                })(le, Z, null, F);
              })
              .then(function (le) {
                if (T.length !== 0) {
                  var ue = document.createElementNS(l, "svg");
                  (ue.setAttribute("xmlns", l),
                    ue.setAttribute("width", "0"),
                    ue.setAttribute("height", "0"),
                    ue.style.setProperty("position", "absolute"),
                    ue.style.setProperty("width", "0"),
                    ue.style.setProperty("height", "0"),
                    ue.style.setProperty("overflow", "hidden"));
                  let I = document.createElementNS(l, "defs"),
                    N = (ue.appendChild(I), /*@__PURE__*/ new Set()),
                    Y =
                      (le.getAttribute("id") && N.add(le.getAttribute("id")),
                      le.querySelectorAll("[id]").forEach(function (P) {
                        N.add(P.getAttribute("id"));
                      }),
                      0);
                  (T.forEach(function (P) {
                    N.has(P.id) || (I.appendChild(P.node), (Y += 1));
                  }),
                    0 < Y && le.insertBefore(ue, le.firstChild));
                }
                return le;
              })
              .then(function (le) {
                return Z.disableEmbedFonts
                  ? le
                  : ((ue = le),
                    (le = Z.style),
                    n.resolveAll(ue, le).then(function (I) {
                      var N;
                      return (
                        I !== "" &&
                          ((N = document.createElement("style")),
                          ue.appendChild(N),
                          N.appendChild(document.createTextNode(I))),
                        ue
                      );
                    }));
                var ue;
              })
              .then(Z.disableInlineImages ? Promise.resolve(ae) : z)
              .then(function (le) {
                (le.style && (le.style.margin = "0"),
                  Z.bgcolor && (le.style.backgroundColor = Z.bgcolor),
                  Z.width && (le.style.width = Z.width + "px"),
                  Z.height && (le.style.height = Z.height + "px"),
                  Z.style && Object.assign(le.style, Z.style));
                let ue = null;
                return (
                  typeof Z.onclone == "function" && (ue = Z.onclone(le)),
                  Promise.resolve(ue).then(function () {
                    return le;
                  })
                );
              })
              .then(function (le) {
                if (t.isSVGElement(ae) && !t.isSVGSVGElement(ae)) {
                  let ue = le,
                    I = re(ue),
                    N;
                  try {
                    N = ae.getBBox();
                  } catch (H) {
                    N = { x: 0, y: 0, width: 0, height: 0 };
                  } finally {
                    I();
                  }
                  (ue.removeAttribute("transform"), ue.style.removeProperty("transform"));
                  let Y = Z.width || N.width,
                    P = Z.height || N.height;
                  return Promise.resolve(ue)
                    .then(function (H) {
                      return (H.setAttribute("xmlns", l), new XMLSerializer().serializeToString(H));
                    })
                    .then(he)
                    .then(t.escapeXhtml)
                    .then(function (H) {
                      var W =
                          (t.isDimensionMissing(Y) ? "" : ` width="${Y}"`) +
                          (t.isDimensionMissing(P) ? "" : ` height="${P}"`),
                        V = `${N.x} ${N.y} ${N.width} ` + N.height;
                      return `<svg xmlns="${l}"${W} viewBox="${V}">${H}</svg>`;
                    })
                    .then(function (H) {
                      return u + H;
                    });
                }
                {
                  let ue = re(le),
                    I,
                    N;
                  try {
                    ((I = Z.width || t.width(ae)), (N = Z.height || t.height(ae)));
                  } finally {
                    ue();
                  }
                  return Promise.resolve(le)
                    .then(function (Y) {
                      return (
                        Y.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"),
                        new XMLSerializer().serializeToString(Y)
                      );
                    })
                    .then(he)
                    .then(t.escapeXhtml)
                    .then(function (Y) {
                      var P =
                          (t.isDimensionMissing(I) ? ' width="100%"' : ` width="${I}"`) +
                          (t.isDimensionMissing(N) ? ' height="100%"' : ` height="${N}"`),
                        H =
                          (t.isDimensionMissing(I) ? "" : ` width="${I}"`) +
                          (t.isDimensionMissing(N) ? "" : ` height="${N}"`);
                      return `<svg xmlns="${l}"${H}><foreignObject${P}>${Y}</foreignObject></svg>`;
                    })
                    .then(function (Y) {
                      return u + Y;
                    });
                }
              })
              .finally(function () {
                for (; 0 < te.length; ) {
                  var le = te.pop();
                  try {
                    le.parent.replaceChild(le.child, le.wrapper);
                  } catch (ue) {
                    v("domtoimage: failed to restore wrapped node", ue);
                  }
                }
                (g(),
                  (T = []),
                  (M = /*@__PURE__*/ new Set()),
                  E && (E.remove(), (E = null)),
                  Q && clearTimeout(Q),
                  (Q = setTimeout(() => {
                    ((Q = null), (de = {}));
                  }, 20000)));
              })
          : Promise.reject(Error("dom-to-image-more: a browser DOM is required (SSR)"))
      );
      function he(le) {
        return le.replace(/url\(&quot;([^]*?)&quot;\)/g, function (ue, I) {
          return 0 <= I.indexOf("'") ? ue : `url('${I}')`;
        });
      }
      function re(le) {
        function ue() {}
        if (!Z.ensureShown) return ue;
        var I = A(ae);
        if (
          (I.getPropertyValue("opacity") === "0" && le.style.setProperty("opacity", "1"),
          I.getPropertyValue("display") !== "none")
        )
          return ue;
        let N = ae.style.getPropertyValue("display"),
          Y = ae.style.getPropertyPriority("display");
        return (
          ae.style.removeProperty("display"),
          A(ae).getPropertyValue("display") === "none" &&
            ((I = N && N !== "none" ? N : "revert"),
            ae.style.setProperty("display", I, "important")),
          function () {
            var P = A(ae).getPropertyValue("display");
            (le.style.setProperty("display", P === "none" ? "block" : P),
              N ? ae.style.setProperty("display", N, Y) : ae.style.removeProperty("display"));
          }
        );
      }
    }
    function S(ae, Z) {
      return w(ae, (Z = Z || {}))
        .then(t.makeImage)
        .then(function (F) {
          var te = ((P) => {
              let I = Z.width || t.width(P),
                N = Z.height || t.height(P);
              (t.isDimensionMissing(I) && (I = t.isDimensionMissing(N) ? 300 : 2 * N),
                t.isDimensionMissing(N) && (N = I / 2));
              var Y,
                P =
                  (typeof Z.scale == "number" ? Z.scale : 1) *
                  (typeof Z.pixelRatio == "number" ? Z.pixelRatio : 1),
                H =
                  ((H = I),
                  (W = N),
                  (P = P),
                  !(0 < H && 0 < W && 0 < P) ||
                  P <= (Y = Math.min(16384 / H, 16384 / W, Math.sqrt(268435456 / (H * W))))
                    ? P
                    : (b(
                        "dom-to-image-more: the requested " +
                          Math.round(H * P) +
                          "×" +
                          Math.round(W * P) +
                          " canvas exceeds the browser limit; clamping the effective scale from " +
                          P +
                          " to " +
                          Y +
                          ". Capture detail may be reduced — render a smaller region or lower scale/pixelRatio.",
                      ),
                      Y)),
                W = document.createElement("canvas");
              return (
                (W.width = I * H),
                (W.height = N * H),
                Z.bgcolor &&
                  (((P = W.getContext("2d")).fillStyle = Z.bgcolor),
                  P.fillRect(0, 0, W.width, W.height)),
                { canvas: W, scale: H, width: I, height: N }
              );
            })(ae),
            { canvas: he, scale: re } = te,
            le = he.getContext("2d");
          return (
            (le.msImageSmoothingEnabled = !1),
            (le.imageSmoothingEnabled = !1),
            F && (le.scale(re, re), le.drawImage(F, 0, 0, te.width, te.height)),
            he
          );
        });
    }
    let E = null,
      T = [],
      M = /*@__PURE__*/ new Set(),
      C = [
        "clip-path",
        "mask",
        "mask-image",
        "-webkit-mask",
        "-webkit-mask-image",
        "filter",
        "fill",
        "stroke",
        "marker-start",
        "marker-mid",
        "marker-end",
      ],
      R = [
        "clip-path",
        "mask",
        "filter",
        "fill",
        "stroke",
        "marker-start",
        "marker-mid",
        "marker-end",
      ];
    function B(ae, Z) {
      ((ae =
        ae.getAttribute("href") || ae.getAttributeNS(c, "href") || ae.getAttribute("xlink:href")),
        ae && ae.charAt(0) === "#" && 1 < ae.length && L(Z, ae.slice(1)));
    }
    function L(ae, Z) {
      var F, te;
      T.some((he) => he.id === Z) ||
        ((F =
          ((F = typeof ae.getRootNode == "function" ? ae.getRootNode() : null) &&
          typeof F.getElementById == "function"
            ? F.getElementById(Z)
            : null) || ae.ownerDocument.getElementById(Z)) &&
          ((te = F.cloneNode(!0)).setAttribute("xmlns", l),
          T.push({ id: Z, node: te }),
          [F].concat(t.asArray(F.querySelectorAll("*"))).forEach(function (he) {
            (B(he, ae),
              R.concat(["style"]).forEach(function (re) {
                ((re = he.getAttribute(re)),
                  re &&
                    t.rewriteFragmentUrls(re, function (le) {
                      L(ae, le);
                    }));
              }));
          })));
    }
    function k(ae) {
      t.parseFontFamilies(ae).forEach(function (Z) {
        M.add(Z);
      });
    }
    function z(ae) {
      return o.inlineAll(ae).then(function () {
        return ae;
      });
    }
    function X(ae, Z, F, te) {
      var he = 0 <= ["background-clip"].indexOf(Z);
      te
        ? (ae.setProperty(Z, F, te), he && ae.setProperty("-webkit-" + Z, F, te))
        : (ae.setProperty(Z, F), he && ae.setProperty("-webkit-" + Z, F));
    }
    let G = Symbol("dtim-ua-relative-font-size"),
      Q = null,
      de = {},
      oe = [
        "ADDRESS",
        "ARTICLE",
        "ASIDE",
        "BLOCKQUOTE",
        "DETAILS",
        "DIALOG",
        "DD",
        "DIV",
        "DL",
        "DT",
        "FIELDSET",
        "FIGCAPTION",
        "FIGURE",
        "FOOTER",
        "FORM",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "HEADER",
        "HGROUP",
        "HR",
        "LI",
        "MAIN",
        "NAV",
        "OL",
        "P",
        "PRE",
        "SECTION",
        "SVG",
        "TABLE",
        "UL",
        "math",
        "svg",
        "BODY",
        "HEAD",
        "HTML",
      ],
      K = ["href"];
  })(c9);
});
