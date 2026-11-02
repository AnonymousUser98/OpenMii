// src/vendor/localforage.js
// localForage: IndexedDB/localStorage wrapper used for settings and caches.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var Hs = Dc(function (D9, bv) {
  /*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ (function (e) {
    if (typeof D9 === "object" && typeof bv < "u") bv.exports = e();
    else if (typeof define === "function" && define.amd) define([], e);
    else {
      var t;
      if (typeof window < "u") t = window;
      else if (typeof global < "u") t = global;
      else if (typeof self < "u") t = self;
      else t = this;
      t.localforage = e();
    }
  })(function () {
    var e, t, r;
    return (function n(i, o, s) {
      function a(u, d) {
        if (!o[u]) {
          if (!i[u]) {
            var h = b0;
            if (!d && h) return h(u, !0);
            if (l) return l(u, !0);
            var f = Error("Cannot find module '" + u + "'");
            throw ((f.code = "MODULE_NOT_FOUND"), f);
          }
          var p = (o[u] = { exports: {} });
          i[u][0].call(
            p.exports,
            function (g) {
              var m = i[u][1][g];
              return a(m ? m : g);
            },
            p,
            p.exports,
            n,
            i,
            o,
            s,
          );
        }
        return o[u].exports;
      }
      var l = b0;
      for (var c = 0; c < s.length; c++) a(s[c]);
      return a;
    })(
      {
        1: [
          function (n, i, o) {
            (function (s) {
              var a = s.MutationObserver || s.WebKitMutationObserver,
                l;
              if (a) {
                var c = 0,
                  u = new a(g),
                  d = s.document.createTextNode("");
                (u.observe(d, { characterData: !0 }),
                  (l = function () {
                    d.data = c = ++c % 2;
                  }));
              } else if (!s.setImmediate && typeof s.MessageChannel < "u") {
                var h = new s.MessageChannel();
                ((h.port1.onmessage = g),
                  (l = function () {
                    h.port2.postMessage(0);
                  }));
              } else if (
                "document" in s &&
                "onreadystatechange" in s.document.createElement("script")
              )
                l = function () {
                  var A = s.document.createElement("script");
                  ((A.onreadystatechange = function () {
                    (g(), (A.onreadystatechange = null), A.parentNode.removeChild(A), (A = null));
                  }),
                    s.document.documentElement.appendChild(A));
                };
              else
                l = function () {
                  setTimeout(g, 0);
                };
              var f,
                p = [];
              function g() {
                f = !0;
                var A,
                  y,
                  x = p.length;
                while (x) {
                  ((y = p), (p = []), (A = -1));
                  while (++A < x) y[A]();
                  x = p.length;
                }
                f = !1;
              }
              i.exports = m;
              function m(A) {
                if (p.push(A) === 1 && !f) l();
              }
            }).call(
              this,
              typeof global < "u"
                ? global
                : typeof self < "u"
                  ? self
                  : typeof window < "u"
                    ? window
                    : {},
            );
          },
          {},
        ],
        2: [
          function (n, i, o) {
            var s = n(1);
            function a() {}
            var l = {},
              c = ["REJECTED"],
              u = ["FULFILLED"],
              d = ["PENDING"];
            i.exports = h;
            function h(_) {
              if (typeof _ !== "function") throw TypeError("resolver must be a function");
              if (((this.state = d), (this.queue = []), (this.outcome = void 0), _ !== a))
                m(this, _);
            }
            ((h.prototype.catch = function (_) {
              return this.then(null, _);
            }),
              (h.prototype.then = function (_, w) {
                if (
                  (typeof _ !== "function" && this.state === u) ||
                  (typeof w !== "function" && this.state === c)
                )
                  return this;
                var S = new this.constructor(a);
                if (this.state !== d) {
                  var E = this.state === u ? _ : w;
                  p(S, E, this.outcome);
                } else this.queue.push(new f(S, _, w));
                return S;
              }));
            function f(_, w, S) {
              if (((this.promise = _), typeof w === "function"))
                ((this.onFulfilled = w), (this.callFulfilled = this.otherCallFulfilled));
              if (typeof S === "function")
                ((this.onRejected = S), (this.callRejected = this.otherCallRejected));
            }
            ((f.prototype.callFulfilled = function (_) {
              l.resolve(this.promise, _);
            }),
              (f.prototype.otherCallFulfilled = function (_) {
                p(this.promise, this.onFulfilled, _);
              }),
              (f.prototype.callRejected = function (_) {
                l.reject(this.promise, _);
              }),
              (f.prototype.otherCallRejected = function (_) {
                p(this.promise, this.onRejected, _);
              }));
            function p(_, w, S) {
              s(function () {
                var E;
                try {
                  E = w(S);
                } catch (T) {
                  return l.reject(_, T);
                }
                if (E === _) l.reject(_, TypeError("Cannot resolve promise with itself"));
                else l.resolve(_, E);
              });
            }
            ((l.resolve = function (_, w) {
              var S = A(g, w);
              if (S.status === "error") return l.reject(_, S.value);
              var E = S.value;
              if (E) m(_, E);
              else {
                ((_.state = u), (_.outcome = w));
                var T = -1,
                  M = _.queue.length;
                while (++T < M) _.queue[T].callFulfilled(w);
              }
              return _;
            }),
              (l.reject = function (_, w) {
                ((_.state = c), (_.outcome = w));
                var S = -1,
                  E = _.queue.length;
                while (++S < E) _.queue[S].callRejected(w);
                return _;
              }));
            function g(_) {
              var w = _ && _.then;
              if (
                _ &&
                (typeof _ === "object" || typeof _ === "function") &&
                typeof w === "function"
              )
                return function () {
                  w.apply(_, arguments);
                };
            }
            function m(_, w) {
              var S = !1;
              function E(R) {
                if (S) return;
                ((S = !0), l.reject(_, R));
              }
              function T(R) {
                if (S) return;
                ((S = !0), l.resolve(_, R));
              }
              function M() {
                w(T, E);
              }
              var C = A(M);
              if (C.status === "error") E(C.value);
            }
            function A(_, w) {
              var S = {};
              try {
                ((S.value = _(w)), (S.status = "success"));
              } catch (E) {
                ((S.status = "error"), (S.value = E));
              }
              return S;
            }
            h.resolve = y;
            function y(_) {
              if (_ instanceof this) return _;
              return l.resolve(new this(a), _);
            }
            h.reject = x;
            function x(_) {
              var w = new this(a);
              return l.reject(w, _);
            }
            h.all = b;
            function b(_) {
              var w = this;
              if (Object.prototype.toString.call(_) !== "[object Array]")
                return this.reject(TypeError("must be an array"));
              var S = _.length,
                E = !1;
              if (!S) return this.resolve([]);
              var T = Array(S),
                M = 0,
                C = -1,
                R = new this(a);
              while (++C < S) B(_[C], C);
              return R;
              function B(L, k) {
                w.resolve(L).then(z, function (X) {
                  if (!E) ((E = !0), l.reject(R, X));
                });
                function z(X) {
                  if (((T[k] = X), ++M === S && !E)) ((E = !0), l.resolve(R, T));
                }
              }
            }
            h.race = v;
            function v(_) {
              var w = this;
              if (Object.prototype.toString.call(_) !== "[object Array]")
                return this.reject(TypeError("must be an array"));
              var S = _.length,
                E = !1;
              if (!S) return this.resolve([]);
              var T = -1,
                M = new this(a);
              while (++T < S) C(_[T]);
              return M;
              function C(R) {
                w.resolve(R).then(
                  function (B) {
                    if (!E) ((E = !0), l.resolve(M, B));
                  },
                  function (B) {
                    if (!E) ((E = !0), l.reject(M, B));
                  },
                );
              }
            }
          },
          { 1: 1 },
        ],
        3: [
          function (n, i, o) {
            (function (s) {
              if (typeof s.Promise !== "function") s.Promise = n(2);
            }).call(
              this,
              typeof global < "u"
                ? global
                : typeof self < "u"
                  ? self
                  : typeof window < "u"
                    ? window
                    : {},
            );
          },
          { 2: 2 },
        ],
        4: [
          function (n, i, o) {
            var s =
              typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function (j) {
                    return typeof j;
                  }
                : function (j) {
                    return j &&
                      typeof Symbol === "function" &&
                      j.constructor === Symbol &&
                      j !== Symbol.prototype
                      ? "symbol"
                      : typeof j;
                  };
            function a(j, fe) {
              if (!(j instanceof fe)) throw TypeError("Cannot call a class as a function");
            }
            function l() {
              try {
                if (typeof indexedDB < "u") return indexedDB;
                if (typeof webkitIndexedDB < "u") return webkitIndexedDB;
                if (typeof mozIndexedDB < "u") return mozIndexedDB;
                if (typeof OIndexedDB < "u") return OIndexedDB;
                if (typeof msIndexedDB < "u") return msIndexedDB;
              } catch (j) {
                return;
              }
            }
            var c = l();
            function u() {
              try {
                if (!c || !c.open) return !1;
                var j =
                    typeof openDatabase < "u" &&
                    /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
                    !/Chrome/.test(navigator.userAgent) &&
                    !/BlackBerry/.test(navigator.platform),
                  fe =
                    typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
                return (!j || fe) && typeof indexedDB < "u" && typeof IDBKeyRange < "u";
              } catch (se) {
                return !1;
              }
            }
            function d(j, fe) {
              ((j = j || []), (fe = fe || {}));
              try {
                return new Blob(j, fe);
              } catch (ye) {
                if (ye.name !== "TypeError") throw ye;
                var se =
                    typeof BlobBuilder < "u"
                      ? BlobBuilder
                      : typeof MSBlobBuilder < "u"
                        ? MSBlobBuilder
                        : typeof MozBlobBuilder < "u"
                          ? MozBlobBuilder
                          : WebKitBlobBuilder,
                  me = new se();
                for (var ve = 0; ve < j.length; ve += 1) me.append(j[ve]);
                return me.getBlob(fe.type);
              }
            }
            if (typeof Promise > "u") n(3);
            var h = Promise;
            function f(j, fe) {
              if (fe)
                j.then(
                  function (se) {
                    fe(null, se);
                  },
                  function (se) {
                    fe(se);
                  },
                );
            }
            function p(j, fe, se) {
              if (typeof fe === "function") j.then(fe);
              if (typeof se === "function") j.catch(se);
            }
            function g(j) {
              if (typeof j !== "string") j = String(j);
              return j;
            }
            function m() {
              if (arguments.length && typeof arguments[arguments.length - 1] === "function")
                return arguments[arguments.length - 1];
            }
            var A = "local-forage-detect-blob-support",
              y = void 0,
              x = {},
              b = Object.prototype.toString,
              v = "readonly",
              _ = "readwrite";
            function w(j) {
              var fe = j.length,
                se = new ArrayBuffer(fe),
                me = new Uint8Array(se);
              for (var ve = 0; ve < fe; ve++) me[ve] = j.charCodeAt(ve);
              return se;
            }
            function S(j) {
              return new h(function (fe) {
                var se = j.transaction(A, _),
                  me = d([""]);
                (se.objectStore(A).put(me, "key"),
                  (se.onabort = function (ve) {
                    (ve.preventDefault(), ve.stopPropagation(), fe(!1));
                  }),
                  (se.oncomplete = function () {
                    var ve = navigator.userAgent.match(/Chrome\/(\d+)/),
                      ye = navigator.userAgent.match(/Edge\//);
                    fe(ye || !ve || parseInt(ve[1], 10) >= 43);
                  }));
              }).catch(function () {
                return !1;
              });
            }
            function E(j) {
              if (typeof y === "boolean") return h.resolve(y);
              return S(j).then(function (fe) {
                return ((y = fe), y);
              });
            }
            function T(j) {
              var fe = x[j.name],
                se = {};
              if (
                ((se.promise = new h(function (me, ve) {
                  ((se.resolve = me), (se.reject = ve));
                })),
                fe.deferredOperations.push(se),
                !fe.dbReady)
              )
                fe.dbReady = se.promise;
              else
                fe.dbReady = fe.dbReady.then(function () {
                  return se.promise;
                });
            }
            function M(j) {
              var fe = x[j.name],
                se = fe.deferredOperations.pop();
              if (se) return (se.resolve(), se.promise);
            }
            function C(j, fe) {
              var se = x[j.name],
                me = se.deferredOperations.pop();
              if (me) return (me.reject(fe), me.promise);
            }
            function R(j, fe) {
              return new h(function (se, me) {
                if (((x[j.name] = x[j.name] || K()), j.db))
                  if (fe) (T(j), j.db.close());
                  else return se(j.db);
                var ve = [j.name];
                if (fe) ve.push(j.version);
                var ye = c.open.apply(c, ve);
                if (fe)
                  ye.onupgradeneeded = function (Pe) {
                    var qe = ye.result;
                    try {
                      if ((qe.createObjectStore(j.storeName), Pe.oldVersion <= 1))
                        qe.createObjectStore(A);
                    } catch (Ve) {
                      if (Ve.name === "ConstraintError");
                      else throw Ve;
                    }
                  };
                ((ye.onerror = function (Pe) {
                  (Pe.preventDefault(), me(ye.error));
                }),
                  (ye.onsuccess = function () {
                    var Pe = ye.result;
                    ((Pe.onversionchange = function (qe) {
                      qe.target.close();
                    }),
                      se(Pe),
                      M(j));
                  }));
              });
            }
            function B(j) {
              return R(j, !1);
            }
            function L(j) {
              return R(j, !0);
            }
            function k(j, fe) {
              if (!j.db) return !0;
              var se = !j.db.objectStoreNames.contains(j.storeName),
                me = j.version < j.db.version,
                ve = j.version > j.db.version;
              if (me) {
                if (j.version !== fe);
                j.version = j.db.version;
              }
              if (ve || se) {
                if (se) {
                  var ye = j.db.version + 1;
                  if (ye > j.version) j.version = ye;
                }
                return !0;
              }
              return !1;
            }
            function z(j) {
              return new h(function (fe, se) {
                var me = new FileReader();
                ((me.onerror = se),
                  (me.onloadend = function (ve) {
                    var ye = btoa(ve.target.result || "");
                    fe({ __local_forage_encoded_blob: !0, data: ye, type: j.type });
                  }),
                  me.readAsBinaryString(j));
              });
            }
            function X(j) {
              var fe = w(atob(j.data));
              return d([fe], { type: j.type });
            }
            function G(j) {
              return j && j.__local_forage_encoded_blob;
            }
            function Q(j) {
              var fe = this,
                se = fe._initReady().then(function () {
                  var me = x[fe._dbInfo.name];
                  if (me && me.dbReady) return me.dbReady;
                });
              return (p(se, j, j), se);
            }
            function de(j) {
              T(j);
              var fe = x[j.name],
                se = fe.forages;
              for (var me = 0; me < se.length; me++) {
                var ve = se[me];
                if (ve._dbInfo.db) (ve._dbInfo.db.close(), (ve._dbInfo.db = null));
              }
              return (
                (j.db = null),
                B(j)
                  .then(function (ye) {
                    if (((j.db = ye), k(j))) return L(j);
                    return ye;
                  })
                  .then(function (ye) {
                    j.db = fe.db = ye;
                    for (var Pe = 0; Pe < se.length; Pe++) se[Pe]._dbInfo.db = ye;
                  })
                  .catch(function (ye) {
                    throw (C(j, ye), ye);
                  })
              );
            }
            function oe(j, fe, se, me) {
              if (me === void 0) me = 1;
              try {
                var ve = j.db.transaction(j.storeName, fe);
                se(null, ve);
              } catch (ye) {
                if (
                  me > 0 &&
                  (!j.db || ye.name === "InvalidStateError" || ye.name === "NotFoundError")
                )
                  return h
                    .resolve()
                    .then(function () {
                      if (
                        !j.db ||
                        (ye.name === "NotFoundError" &&
                          !j.db.objectStoreNames.contains(j.storeName) &&
                          j.version <= j.db.version)
                      ) {
                        if (j.db) j.version = j.db.version + 1;
                        return L(j);
                      }
                    })
                    .then(function () {
                      return de(j).then(function () {
                        oe(j, fe, se, me - 1);
                      });
                    })
                    .catch(se);
                se(ye);
              }
            }
            function K() {
              return { forages: [], db: null, dbReady: null, deferredOperations: [] };
            }
            function ae(j) {
              var fe = this,
                se = { db: null };
              if (j) for (var me in j) se[me] = j[me];
              var ve = x[se.name];
              if (!ve) ((ve = K()), (x[se.name] = ve));
              if ((ve.forages.push(fe), !fe._initReady))
                ((fe._initReady = fe.ready), (fe.ready = Q));
              var ye = [];
              function Pe() {
                return h.resolve();
              }
              for (var qe = 0; qe < ve.forages.length; qe++) {
                var Ve = ve.forages[qe];
                if (Ve !== fe) ye.push(Ve._initReady().catch(Pe));
              }
              var Ze = ve.forages.slice(0);
              return h
                .all(ye)
                .then(function () {
                  return ((se.db = ve.db), B(se));
                })
                .then(function (it) {
                  if (((se.db = it), k(se, fe._defaultConfig.version))) return L(se);
                  return it;
                })
                .then(function (it) {
                  ((se.db = ve.db = it), (fe._dbInfo = se));
                  for (var _t = 0; _t < Ze.length; _t++) {
                    var qt = Ze[_t];
                    if (qt !== fe) ((qt._dbInfo.db = se.db), (qt._dbInfo.version = se.version));
                  }
                });
            }
            function Z(j, fe) {
              var se = this;
              j = g(j);
              var me = new h(function (ve, ye) {
                se.ready()
                  .then(function () {
                    oe(se._dbInfo, v, function (Pe, qe) {
                      if (Pe) return ye(Pe);
                      try {
                        var Ve = qe.objectStore(se._dbInfo.storeName),
                          Ze = Ve.get(j);
                        ((Ze.onsuccess = function () {
                          var it = Ze.result;
                          if (it === void 0) it = null;
                          if (G(it)) it = X(it);
                          ve(it);
                        }),
                          (Ze.onerror = function () {
                            ye(Ze.error);
                          }));
                      } catch (it) {
                        ye(it);
                      }
                    });
                  })
                  .catch(ye);
              });
              return (f(me, fe), me);
            }
            function F(j, fe) {
              var se = this,
                me = new h(function (ve, ye) {
                  se.ready()
                    .then(function () {
                      oe(se._dbInfo, v, function (Pe, qe) {
                        if (Pe) return ye(Pe);
                        try {
                          var Ve = qe.objectStore(se._dbInfo.storeName),
                            Ze = Ve.openCursor(),
                            it = 1;
                          ((Ze.onsuccess = function () {
                            var _t = Ze.result;
                            if (_t) {
                              var qt = _t.value;
                              if (G(qt)) qt = X(qt);
                              var sn = j(qt, _t.key, it++);
                              if (sn !== void 0) ve(sn);
                              else _t.continue();
                            } else ve();
                          }),
                            (Ze.onerror = function () {
                              ye(Ze.error);
                            }));
                        } catch (_t) {
                          ye(_t);
                        }
                      });
                    })
                    .catch(ye);
                });
              return (f(me, fe), me);
            }
            function te(j, fe, se) {
              var me = this;
              j = g(j);
              var ve = new h(function (ye, Pe) {
                var qe;
                me.ready()
                  .then(function () {
                    if (((qe = me._dbInfo), b.call(fe) === "[object Blob]"))
                      return E(qe.db).then(function (Ve) {
                        if (Ve) return fe;
                        return z(fe);
                      });
                    return fe;
                  })
                  .then(function (Ve) {
                    oe(me._dbInfo, _, function (Ze, it) {
                      if (Ze) return Pe(Ze);
                      try {
                        var _t = it.objectStore(me._dbInfo.storeName);
                        if (Ve === null) Ve = void 0;
                        var qt = _t.put(Ve, j);
                        ((it.oncomplete = function () {
                          if (Ve === void 0) Ve = null;
                          ye(Ve);
                        }),
                          (it.onabort = it.onerror =
                            function () {
                              var sn = qt.error ? qt.error : qt.transaction.error;
                              Pe(sn);
                            }));
                      } catch (sn) {
                        Pe(sn);
                      }
                    });
                  })
                  .catch(Pe);
              });
              return (f(ve, se), ve);
            }
            function he(j, fe) {
              var se = this;
              j = g(j);
              var me = new h(function (ve, ye) {
                se.ready()
                  .then(function () {
                    oe(se._dbInfo, _, function (Pe, qe) {
                      if (Pe) return ye(Pe);
                      try {
                        var Ve = qe.objectStore(se._dbInfo.storeName),
                          Ze = Ve.delete(j);
                        ((qe.oncomplete = function () {
                          ve();
                        }),
                          (qe.onerror = function () {
                            ye(Ze.error);
                          }),
                          (qe.onabort = function () {
                            var it = Ze.error ? Ze.error : Ze.transaction.error;
                            ye(it);
                          }));
                      } catch (it) {
                        ye(it);
                      }
                    });
                  })
                  .catch(ye);
              });
              return (f(me, fe), me);
            }
            function re(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      oe(fe._dbInfo, _, function (ye, Pe) {
                        if (ye) return ve(ye);
                        try {
                          var qe = Pe.objectStore(fe._dbInfo.storeName),
                            Ve = qe.clear();
                          ((Pe.oncomplete = function () {
                            me();
                          }),
                            (Pe.onabort = Pe.onerror =
                              function () {
                                var Ze = Ve.error ? Ve.error : Ve.transaction.error;
                                ve(Ze);
                              }));
                        } catch (Ze) {
                          ve(Ze);
                        }
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function le(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      oe(fe._dbInfo, v, function (ye, Pe) {
                        if (ye) return ve(ye);
                        try {
                          var qe = Pe.objectStore(fe._dbInfo.storeName),
                            Ve = qe.count();
                          ((Ve.onsuccess = function () {
                            me(Ve.result);
                          }),
                            (Ve.onerror = function () {
                              ve(Ve.error);
                            }));
                        } catch (Ze) {
                          ve(Ze);
                        }
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function ue(j, fe) {
              var se = this,
                me = new h(function (ve, ye) {
                  if (j < 0) {
                    ve(null);
                    return;
                  }
                  se.ready()
                    .then(function () {
                      oe(se._dbInfo, v, function (Pe, qe) {
                        if (Pe) return ye(Pe);
                        try {
                          var Ve = qe.objectStore(se._dbInfo.storeName),
                            Ze = !1,
                            it = Ve.openKeyCursor();
                          ((it.onsuccess = function () {
                            var _t = it.result;
                            if (!_t) {
                              ve(null);
                              return;
                            }
                            if (j === 0) ve(_t.key);
                            else if (!Ze) ((Ze = !0), _t.advance(j));
                            else ve(_t.key);
                          }),
                            (it.onerror = function () {
                              ye(it.error);
                            }));
                        } catch (_t) {
                          ye(_t);
                        }
                      });
                    })
                    .catch(ye);
                });
              return (f(me, fe), me);
            }
            function I(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      oe(fe._dbInfo, v, function (ye, Pe) {
                        if (ye) return ve(ye);
                        try {
                          var qe = Pe.objectStore(fe._dbInfo.storeName),
                            Ve = qe.openKeyCursor(),
                            Ze = [];
                          ((Ve.onsuccess = function () {
                            var it = Ve.result;
                            if (!it) {
                              me(Ze);
                              return;
                            }
                            (Ze.push(it.key), it.continue());
                          }),
                            (Ve.onerror = function () {
                              ve(Ve.error);
                            }));
                        } catch (it) {
                          ve(it);
                        }
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function N(j, fe) {
              fe = m.apply(this, arguments);
              var se = this.config();
              if (((j = (typeof j !== "function" && j) || {}), !j.name))
                ((j.name = j.name || se.name), (j.storeName = j.storeName || se.storeName));
              var me = this,
                ve;
              if (!j.name) ve = h.reject("Invalid arguments");
              else {
                var ye = j.name === se.name && me._dbInfo.db,
                  Pe = ye
                    ? h.resolve(me._dbInfo.db)
                    : B(j).then(function (qe) {
                        var Ve = x[j.name],
                          Ze = Ve.forages;
                        Ve.db = qe;
                        for (var it = 0; it < Ze.length; it++) Ze[it]._dbInfo.db = qe;
                        return qe;
                      });
                if (!j.storeName)
                  ve = Pe.then(function (qe) {
                    T(j);
                    var Ve = x[j.name],
                      Ze = Ve.forages;
                    qe.close();
                    for (var it = 0; it < Ze.length; it++) {
                      var _t = Ze[it];
                      _t._dbInfo.db = null;
                    }
                    var qt = new h(function (sn, Hr) {
                      var Zi = c.deleteDatabase(j.name);
                      ((Zi.onerror = function () {
                        var Vi = Zi.result;
                        if (Vi) Vi.close();
                        Hr(Zi.error);
                      }),
                        (Zi.onblocked = function () {}),
                        (Zi.onsuccess = function () {
                          var Vi = Zi.result;
                          if (Vi) Vi.close();
                          sn(Vi);
                        }));
                    });
                    return qt
                      .then(function (sn) {
                        Ve.db = sn;
                        for (var Hr = 0; Hr < Ze.length; Hr++) {
                          var Zi = Ze[Hr];
                          M(Zi._dbInfo);
                        }
                      })
                      .catch(function (sn) {
                        throw ((C(j, sn) || h.resolve()).catch(function () {}), sn);
                      });
                  });
                else
                  ve = Pe.then(function (qe) {
                    if (!qe.objectStoreNames.contains(j.storeName)) return;
                    var Ve = qe.version + 1;
                    T(j);
                    var Ze = x[j.name],
                      it = Ze.forages;
                    qe.close();
                    for (var _t = 0; _t < it.length; _t++) {
                      var qt = it[_t];
                      ((qt._dbInfo.db = null), (qt._dbInfo.version = Ve));
                    }
                    var sn = new h(function (Hr, Zi) {
                      var Vi = c.open(j.name, Ve);
                      ((Vi.onerror = function (Pa) {
                        var vm = Vi.result;
                        (vm.close(), Zi(Pa));
                      }),
                        (Vi.onupgradeneeded = function () {
                          var Pa = Vi.result;
                          Pa.deleteObjectStore(j.storeName);
                        }),
                        (Vi.onsuccess = function () {
                          var Pa = Vi.result;
                          (Pa.close(), Hr(Pa));
                        }));
                    });
                    return sn
                      .then(function (Hr) {
                        Ze.db = Hr;
                        for (var Zi = 0; Zi < it.length; Zi++) {
                          var Vi = it[Zi];
                          ((Vi._dbInfo.db = Hr), M(Vi._dbInfo));
                        }
                      })
                      .catch(function (Hr) {
                        throw ((C(j, Hr) || h.resolve()).catch(function () {}), Hr);
                      });
                  });
              }
              return (f(ve, fe), ve);
            }
            var Y = {
              _driver: "asyncStorage",
              _initStorage: ae,
              _support: u(),
              iterate: F,
              getItem: Z,
              setItem: te,
              removeItem: he,
              clear: re,
              length: le,
              key: ue,
              keys: I,
              dropInstance: N,
            };
            function P() {
              return typeof openDatabase === "function";
            }
            var H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              W = "~~local_forage_type~",
              V = /^~~local_forage_type~([^~]+)~/,
              ne = "__lfsc__:",
              J = ne.length,
              U = "arbf",
              D = "blob",
              ee = "si08",
              Ae = "ui08",
              Re = "uic8",
              _e = "si16",
              ot = "si32",
              tt = "ur16",
              Qe = "ui32",
              pt = "fl32",
              He = "fl64",
              je = J + U.length,
              Bt = Object.prototype.toString;
            function ut(j) {
              var fe = j.length * 0.75,
                se = j.length,
                me,
                ve = 0,
                ye,
                Pe,
                qe,
                Ve;
              if (j[j.length - 1] === "=") {
                if ((fe--, j[j.length - 2] === "=")) fe--;
              }
              var Ze = new ArrayBuffer(fe),
                it = new Uint8Array(Ze);
              for (me = 0; me < se; me += 4)
                ((ye = H.indexOf(j[me])),
                  (Pe = H.indexOf(j[me + 1])),
                  (qe = H.indexOf(j[me + 2])),
                  (Ve = H.indexOf(j[me + 3])),
                  (it[ve++] = (ye << 2) | (Pe >> 4)),
                  (it[ve++] = ((Pe & 15) << 4) | (qe >> 2)),
                  (it[ve++] = ((qe & 3) << 6) | (Ve & 63)));
              return Ze;
            }
            function et(j) {
              var fe = new Uint8Array(j),
                se = "",
                me;
              for (me = 0; me < fe.length; me += 3)
                ((se += H[fe[me] >> 2]),
                  (se += H[((fe[me] & 3) << 4) | (fe[me + 1] >> 4)]),
                  (se += H[((fe[me + 1] & 15) << 2) | (fe[me + 2] >> 6)]),
                  (se += H[fe[me + 2] & 63]));
              if (fe.length % 3 === 2) se = se.substring(0, se.length - 1) + "=";
              else if (fe.length % 3 === 1) se = se.substring(0, se.length - 2) + "==";
              return se;
            }
            function It(j, fe) {
              var se = "";
              if (j) se = Bt.call(j);
              if (
                j &&
                (se === "[object ArrayBuffer]" ||
                  (j.buffer && Bt.call(j.buffer) === "[object ArrayBuffer]"))
              ) {
                var me,
                  ve = ne;
                if (j instanceof ArrayBuffer) ((me = j), (ve += U));
                else if (((me = j.buffer), se === "[object Int8Array]")) ve += ee;
                else if (se === "[object Uint8Array]") ve += Ae;
                else if (se === "[object Uint8ClampedArray]") ve += Re;
                else if (se === "[object Int16Array]") ve += _e;
                else if (se === "[object Uint16Array]") ve += tt;
                else if (se === "[object Int32Array]") ve += ot;
                else if (se === "[object Uint32Array]") ve += Qe;
                else if (se === "[object Float32Array]") ve += pt;
                else if (se === "[object Float64Array]") ve += He;
                else fe(Error("Failed to get type for BinaryArray"));
                fe(ve + et(me));
              } else if (se === "[object Blob]") {
                var ye = new FileReader();
                ((ye.onload = function () {
                  var Pe = W + j.type + "~" + et(this.result);
                  fe(ne + D + Pe);
                }),
                  ye.readAsArrayBuffer(j));
              } else
                try {
                  fe(JSON.stringify(j));
                } catch (Pe) {
                  fe(null, Pe);
                }
            }
            function Xt(j) {
              if (j.substring(0, J) !== ne) return JSON.parse(j);
              var fe = j.substring(je),
                se = j.substring(J, je),
                me;
              if (se === D && V.test(fe)) {
                var ve = fe.match(V);
                ((me = ve[1]), (fe = fe.substring(ve[0].length)));
              }
              var ye = ut(fe);
              switch (se) {
                case U:
                  return ye;
                case D:
                  return d([ye], { type: me });
                case ee:
                  return new Int8Array(ye);
                case Ae:
                  return new Uint8Array(ye);
                case Re:
                  return new Uint8ClampedArray(ye);
                case _e:
                  return new Int16Array(ye);
                case tt:
                  return new Uint16Array(ye);
                case ot:
                  return new Int32Array(ye);
                case Qe:
                  return new Uint32Array(ye);
                case pt:
                  return new Float32Array(ye);
                case He:
                  return new Float64Array(ye);
                default:
                  throw Error("Unkown type: " + se);
              }
            }
            var Mr = { serialize: It, deserialize: Xt, stringToBuffer: ut, bufferToString: et };
            function Te(j, fe, se, me) {
              j.executeSql(
                "CREATE TABLE IF NOT EXISTS " +
                  fe.storeName +
                  " (id INTEGER PRIMARY KEY, key unique, value)",
                [],
                se,
                me,
              );
            }
            function Ke(j) {
              var fe = this,
                se = { db: null };
              if (j)
                for (var me in j) se[me] = typeof j[me] !== "string" ? j[me].toString() : j[me];
              var ve = new h(function (ye, Pe) {
                try {
                  se.db = openDatabase(se.name, String(se.version), se.description, se.size);
                } catch (qe) {
                  return Pe(qe);
                }
                se.db.transaction(function (qe) {
                  Te(
                    qe,
                    se,
                    function () {
                      ((fe._dbInfo = se), ye());
                    },
                    function (Ve, Ze) {
                      Pe(Ze);
                    },
                  );
                }, Pe);
              });
              return ((se.serializer = Mr), ve);
            }
            function Ne(j, fe, se, me, ve, ye) {
              j.executeSql(
                se,
                me,
                ve,
                function (Pe, qe) {
                  if (qe.code === qe.SYNTAX_ERR)
                    Pe.executeSql(
                      "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                      [fe.storeName],
                      function (Ve, Ze) {
                        if (!Ze.rows.length)
                          Te(
                            Ve,
                            fe,
                            function () {
                              Ve.executeSql(se, me, ve, ye);
                            },
                            ye,
                          );
                        else ye(Ve, qe);
                      },
                      ye,
                    );
                  else ye(Pe, qe);
                },
                ye,
              );
            }
            function ze(j, fe) {
              var se = this;
              j = g(j);
              var me = new h(function (ve, ye) {
                se.ready()
                  .then(function () {
                    var Pe = se._dbInfo;
                    Pe.db.transaction(function (qe) {
                      Ne(
                        qe,
                        Pe,
                        "SELECT * FROM " + Pe.storeName + " WHERE key = ? LIMIT 1",
                        [j],
                        function (Ve, Ze) {
                          var it = Ze.rows.length ? Ze.rows.item(0).value : null;
                          if (it) it = Pe.serializer.deserialize(it);
                          ve(it);
                        },
                        function (Ve, Ze) {
                          ye(Ze);
                        },
                      );
                    });
                  })
                  .catch(ye);
              });
              return (f(me, fe), me);
            }
            function xe(j, fe) {
              var se = this,
                me = new h(function (ve, ye) {
                  se.ready()
                    .then(function () {
                      var Pe = se._dbInfo;
                      Pe.db.transaction(function (qe) {
                        Ne(
                          qe,
                          Pe,
                          "SELECT * FROM " + Pe.storeName,
                          [],
                          function (Ve, Ze) {
                            var it = Ze.rows,
                              _t = it.length;
                            for (var qt = 0; qt < _t; qt++) {
                              var sn = it.item(qt),
                                Hr = sn.value;
                              if (Hr) Hr = Pe.serializer.deserialize(Hr);
                              if (((Hr = j(Hr, sn.key, qt + 1)), Hr !== void 0)) {
                                ve(Hr);
                                return;
                              }
                            }
                            ve();
                          },
                          function (Ve, Ze) {
                            ye(Ze);
                          },
                        );
                      });
                    })
                    .catch(ye);
                });
              return (f(me, fe), me);
            }
            function pe(j, fe, se, me) {
              var ve = this;
              j = g(j);
              var ye = new h(function (Pe, qe) {
                ve.ready()
                  .then(function () {
                    if (fe === void 0) fe = null;
                    var Ve = fe,
                      Ze = ve._dbInfo;
                    Ze.serializer.serialize(fe, function (it, _t) {
                      if (_t) qe(_t);
                      else
                        Ze.db.transaction(
                          function (qt) {
                            Ne(
                              qt,
                              Ze,
                              "INSERT OR REPLACE INTO " +
                                Ze.storeName +
                                " (key, value) VALUES (?, ?)",
                              [j, it],
                              function () {
                                Pe(Ve);
                              },
                              function (sn, Hr) {
                                qe(Hr);
                              },
                            );
                          },
                          function (qt) {
                            if (qt.code === qt.QUOTA_ERR) {
                              if (me > 0) {
                                Pe(pe.apply(ve, [j, Ve, se, me - 1]));
                                return;
                              }
                              qe(qt);
                            }
                          },
                        );
                    });
                  })
                  .catch(qe);
              });
              return (f(ye, se), ye);
            }
            function Ue(j, fe, se) {
              return pe.apply(this, [j, fe, se, 1]);
            }
            function mt(j, fe) {
              var se = this;
              j = g(j);
              var me = new h(function (ve, ye) {
                se.ready()
                  .then(function () {
                    var Pe = se._dbInfo;
                    Pe.db.transaction(function (qe) {
                      Ne(
                        qe,
                        Pe,
                        "DELETE FROM " + Pe.storeName + " WHERE key = ?",
                        [j],
                        function () {
                          ve();
                        },
                        function (Ve, Ze) {
                          ye(Ze);
                        },
                      );
                    });
                  })
                  .catch(ye);
              });
              return (f(me, fe), me);
            }
            function wt(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      var ye = fe._dbInfo;
                      ye.db.transaction(function (Pe) {
                        Ne(
                          Pe,
                          ye,
                          "DELETE FROM " + ye.storeName,
                          [],
                          function () {
                            me();
                          },
                          function (qe, Ve) {
                            ve(Ve);
                          },
                        );
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function yt(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      var ye = fe._dbInfo;
                      ye.db.transaction(function (Pe) {
                        Ne(
                          Pe,
                          ye,
                          "SELECT COUNT(key) as c FROM " + ye.storeName,
                          [],
                          function (qe, Ve) {
                            var Ze = Ve.rows.item(0).c;
                            me(Ze);
                          },
                          function (qe, Ve) {
                            ve(Ve);
                          },
                        );
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function tr(j, fe) {
              var se = this,
                me = new h(function (ve, ye) {
                  se.ready()
                    .then(function () {
                      var Pe = se._dbInfo;
                      Pe.db.transaction(function (qe) {
                        Ne(
                          qe,
                          Pe,
                          "SELECT key FROM " + Pe.storeName + " WHERE id = ? LIMIT 1",
                          [j + 1],
                          function (Ve, Ze) {
                            var it = Ze.rows.length ? Ze.rows.item(0).key : null;
                            ve(it);
                          },
                          function (Ve, Ze) {
                            ye(Ze);
                          },
                        );
                      });
                    })
                    .catch(ye);
                });
              return (f(me, fe), me);
            }
            function nn(j) {
              var fe = this,
                se = new h(function (me, ve) {
                  fe.ready()
                    .then(function () {
                      var ye = fe._dbInfo;
                      ye.db.transaction(function (Pe) {
                        Ne(
                          Pe,
                          ye,
                          "SELECT key FROM " + ye.storeName,
                          [],
                          function (qe, Ve) {
                            var Ze = [];
                            for (var it = 0; it < Ve.rows.length; it++)
                              Ze.push(Ve.rows.item(it).key);
                            me(Ze);
                          },
                          function (qe, Ve) {
                            ve(Ve);
                          },
                        );
                      });
                    })
                    .catch(ve);
                });
              return (f(se, j), se);
            }
            function Zr(j) {
              return new h(function (fe, se) {
                j.transaction(
                  function (me) {
                    me.executeSql(
                      "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                      [],
                      function (ve, ye) {
                        var Pe = [];
                        for (var qe = 0; qe < ye.rows.length; qe++) Pe.push(ye.rows.item(qe).name);
                        fe({ db: j, storeNames: Pe });
                      },
                      function (ve, ye) {
                        se(ye);
                      },
                    );
                  },
                  function (me) {
                    se(me);
                  },
                );
              });
            }
            function Qn(j, fe) {
              fe = m.apply(this, arguments);
              var se = this.config();
              if (((j = (typeof j !== "function" && j) || {}), !j.name))
                ((j.name = j.name || se.name), (j.storeName = j.storeName || se.storeName));
              var me = this,
                ve;
              if (!j.name) ve = h.reject("Invalid arguments");
              else
                ve = new h(function (ye) {
                  var Pe;
                  if (j.name === se.name) Pe = me._dbInfo.db;
                  else Pe = openDatabase(j.name, "", "", 0);
                  if (!j.storeName) ye(Zr(Pe));
                  else ye({ db: Pe, storeNames: [j.storeName] });
                }).then(function (ye) {
                  return new h(function (Pe, qe) {
                    ye.db.transaction(
                      function (Ve) {
                        function Ze(sn) {
                          return new h(function (Hr, Zi) {
                            Ve.executeSql(
                              "DROP TABLE IF EXISTS " + sn,
                              [],
                              function () {
                                Hr();
                              },
                              function (Vi, Pa) {
                                Zi(Pa);
                              },
                            );
                          });
                        }
                        var it = [];
                        for (var _t = 0, qt = ye.storeNames.length; _t < qt; _t++)
                          it.push(Ze(ye.storeNames[_t]));
                        h.all(it)
                          .then(function () {
                            Pe();
                          })
                          .catch(function (sn) {
                            qe(sn);
                          });
                      },
                      function (Ve) {
                        qe(Ve);
                      },
                    );
                  });
                });
              return (f(ve, fe), ve);
            }
            var uo = {
              _driver: "webSQLStorage",
              _initStorage: Ke,
              _support: P(),
              iterate: xe,
              getItem: ze,
              setItem: Ue,
              removeItem: mt,
              clear: wt,
              length: yt,
              key: tr,
              keys: nn,
              dropInstance: Qn,
            };
            function Us() {
              try {
                return (
                  typeof localStorage < "u" && "setItem" in localStorage && !!localStorage.setItem
                );
              } catch (j) {
                return !1;
              }
            }
            function ho(j, fe) {
              var se = j.name + "/";
              if (j.storeName !== fe.storeName) se += j.storeName + "/";
              return se;
            }
            function Eo() {
              var j = "_localforage_support_test";
              try {
                return (localStorage.setItem(j, !0), localStorage.removeItem(j), !1);
              } catch (fe) {
                return !0;
              }
            }
            function hs() {
              return !Eo() || localStorage.length > 0;
            }
            function Da(j) {
              var fe = this,
                se = {};
              if (j) for (var me in j) se[me] = j[me];
              if (((se.keyPrefix = ho(j, fe._defaultConfig)), !hs())) return h.reject();
              return ((fe._dbInfo = se), (se.serializer = Mr), h.resolve());
            }
            function Na(j) {
              var fe = this,
                se = fe.ready().then(function () {
                  var me = fe._dbInfo.keyPrefix;
                  for (var ve = localStorage.length - 1; ve >= 0; ve--) {
                    var ye = localStorage.key(ve);
                    if (ye.indexOf(me) === 0) localStorage.removeItem(ye);
                  }
                });
              return (f(se, j), se);
            }
            function Ur(j, fe) {
              var se = this;
              j = g(j);
              var me = se.ready().then(function () {
                var ve = se._dbInfo,
                  ye = localStorage.getItem(ve.keyPrefix + j);
                if (ye) ye = ve.serializer.deserialize(ye);
                return ye;
              });
              return (f(me, fe), me);
            }
            function qi(j, fe) {
              var se = this,
                me = se.ready().then(function () {
                  var ve = se._dbInfo,
                    ye = ve.keyPrefix,
                    Pe = ye.length,
                    qe = localStorage.length,
                    Ve = 1;
                  for (var Ze = 0; Ze < qe; Ze++) {
                    var it = localStorage.key(Ze);
                    if (it.indexOf(ye) !== 0) continue;
                    var _t = localStorage.getItem(it);
                    if (_t) _t = ve.serializer.deserialize(_t);
                    if (((_t = j(_t, it.substring(Pe), Ve++)), _t !== void 0)) return _t;
                  }
                });
              return (f(me, fe), me);
            }
            function fo(j, fe) {
              var se = this,
                me = se.ready().then(function () {
                  var ve = se._dbInfo,
                    ye;
                  try {
                    ye = localStorage.key(j);
                  } catch (Pe) {
                    ye = null;
                  }
                  if (ye) ye = ye.substring(ve.keyPrefix.length);
                  return ye;
                });
              return (f(me, fe), me);
            }
            function Ko(j) {
              var fe = this,
                se = fe.ready().then(function () {
                  var me = fe._dbInfo,
                    ve = localStorage.length,
                    ye = [];
                  for (var Pe = 0; Pe < ve; Pe++) {
                    var qe = localStorage.key(Pe);
                    if (qe.indexOf(me.keyPrefix) === 0) ye.push(qe.substring(me.keyPrefix.length));
                  }
                  return ye;
                });
              return (f(se, j), se);
            }
            function Mn(j) {
              var fe = this,
                se = fe.keys().then(function (me) {
                  return me.length;
                });
              return (f(se, j), se);
            }
            function ti(j, fe) {
              var se = this;
              j = g(j);
              var me = se.ready().then(function () {
                var ve = se._dbInfo;
                localStorage.removeItem(ve.keyPrefix + j);
              });
              return (f(me, fe), me);
            }
            function zi(j, fe, se) {
              var me = this;
              j = g(j);
              var ve = me.ready().then(function () {
                if (fe === void 0) fe = null;
                var ye = fe;
                return new h(function (Pe, qe) {
                  var Ve = me._dbInfo;
                  Ve.serializer.serialize(fe, function (Ze, it) {
                    if (it) qe(it);
                    else
                      try {
                        (localStorage.setItem(Ve.keyPrefix + j, Ze), Pe(ye));
                      } catch (_t) {
                        if (
                          _t.name === "QuotaExceededError" ||
                          _t.name === "NS_ERROR_DOM_QUOTA_REACHED"
                        )
                          qe(_t);
                        qe(_t);
                      }
                  });
                });
              });
              return (f(ve, se), ve);
            }
            function q(j, fe) {
              if (
                ((fe = m.apply(this, arguments)),
                (j = (typeof j !== "function" && j) || {}),
                !j.name)
              ) {
                var se = this.config();
                ((j.name = j.name || se.name), (j.storeName = j.storeName || se.storeName));
              }
              var me = this,
                ve;
              if (!j.name) ve = h.reject("Invalid arguments");
              else
                ve = new h(function (ye) {
                  if (!j.storeName) ye(j.name + "/");
                  else ye(ho(j, me._defaultConfig));
                }).then(function (ye) {
                  for (var Pe = localStorage.length - 1; Pe >= 0; Pe--) {
                    var qe = localStorage.key(Pe);
                    if (qe.indexOf(ye) === 0) localStorage.removeItem(qe);
                  }
                });
              return (f(ve, fe), ve);
            }
            var be = {
                _driver: "localStorageWrapper",
                _initStorage: Da,
                _support: Us(),
                iterate: qi,
                getItem: Ur,
                setItem: zi,
                removeItem: ti,
                clear: Na,
                length: Mn,
                key: fo,
                keys: Ko,
                dropInstance: q,
              },
              Oe = function (fe, se) {
                return (
                  fe === se ||
                  (typeof fe === "number" && typeof se === "number" && isNaN(fe) && isNaN(se))
                );
              },
              Le = function (fe, se) {
                var me = fe.length,
                  ve = 0;
                while (ve < me) {
                  if (Oe(fe[ve], se)) return !0;
                  ve++;
                }
                return !1;
              },
              Ee =
                Array.isArray ||
                function (j) {
                  return Object.prototype.toString.call(j) === "[object Array]";
                },
              Je = {},
              lt = {},
              xt = { INDEXEDDB: Y, WEBSQL: uo, LOCALSTORAGE: be },
              Rt = [xt.INDEXEDDB._driver, xt.WEBSQL._driver, xt.LOCALSTORAGE._driver],
              $t = ["dropInstance"],
              ir = [
                "clear",
                "getItem",
                "iterate",
                "key",
                "keys",
                "length",
                "removeItem",
                "setItem",
              ].concat($t),
              jt = {
                description: "",
                driver: Rt.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1,
              };
            function $r(j, fe) {
              j[fe] = function () {
                var se = arguments;
                return j.ready().then(function () {
                  return j[fe].apply(j, se);
                });
              };
            }
            function on() {
              for (var j = 1; j < arguments.length; j++) {
                var fe = arguments[j];
                if (fe) {
                  for (var se in fe)
                    if (fe.hasOwnProperty(se))
                      if (Ee(fe[se])) arguments[0][se] = fe[se].slice();
                      else arguments[0][se] = fe[se];
                }
              }
              return arguments[0];
            }
            var Si = (function () {
                function j(fe) {
                  a(this, j);
                  for (var se in xt)
                    if (xt.hasOwnProperty(se)) {
                      var me = xt[se],
                        ve = me._driver;
                      if (((this[se] = ve), !Je[ve])) this.defineDriver(me);
                    }
                  ((this._defaultConfig = on({}, jt)),
                    (this._config = on({}, this._defaultConfig, fe)),
                    (this._driverSet = null),
                    (this._initDriver = null),
                    (this._ready = !1),
                    (this._dbInfo = null),
                    this._wrapLibraryMethodsWithReady(),
                    this.setDriver(this._config.driver).catch(function () {}));
                }
                return (
                  (j.prototype.config = function (se) {
                    if ((typeof se > "u" ? "undefined" : s(se)) === "object") {
                      if (this._ready)
                        return Error("Can't call config() after localforage has been used.");
                      for (var me in se) {
                        if (me === "storeName") se[me] = se[me].replace(/\W/g, "_");
                        if (me === "version" && typeof se[me] !== "number")
                          return Error("Database version must be a number.");
                        this._config[me] = se[me];
                      }
                      if ("driver" in se && se.driver) return this.setDriver(this._config.driver);
                      return !0;
                    } else if (typeof se === "string") return this._config[se];
                    else return this._config;
                  }),
                  (j.prototype.defineDriver = function (se, me, ve) {
                    var ye = new h(function (Pe, qe) {
                      try {
                        var Ve = se._driver,
                          Ze = Error(
                            "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver",
                          );
                        if (!se._driver) {
                          qe(Ze);
                          return;
                        }
                        var it = ir.concat("_initStorage");
                        for (var _t = 0, qt = it.length; _t < qt; _t++) {
                          var sn = it[_t],
                            Hr = !Le($t, sn);
                          if ((Hr || se[sn]) && typeof se[sn] !== "function") {
                            qe(Ze);
                            return;
                          }
                        }
                        var Zi = function () {
                          var vm = function (HG) {
                            return function () {
                              var GG = Error(
                                  "Method " + HG + " is not implemented by the current driver",
                                ),
                                B9 = h.reject(GG);
                              return (f(B9, arguments[arguments.length - 1]), B9);
                            };
                          };
                          for (var Av = 0, UG = $t.length; Av < UG; Av++) {
                            var yv = $t[Av];
                            if (!se[yv]) se[yv] = vm(yv);
                          }
                        };
                        Zi();
                        var Vi = function (vm) {
                          if (Je[Ve]);
                          ((Je[Ve] = se), (lt[Ve] = vm), Pe());
                        };
                        if ("_support" in se)
                          if (se._support && typeof se._support === "function")
                            se._support().then(Vi, qe);
                          else Vi(!!se._support);
                        else Vi(!0);
                      } catch (Pa) {
                        qe(Pa);
                      }
                    });
                    return (p(ye, me, ve), ye);
                  }),
                  (j.prototype.driver = function () {
                    return this._driver || null;
                  }),
                  (j.prototype.getDriver = function (se, me, ve) {
                    var ye = Je[se] ? h.resolve(Je[se]) : h.reject(Error("Driver not found."));
                    return (p(ye, me, ve), ye);
                  }),
                  (j.prototype.getSerializer = function (se) {
                    var me = h.resolve(Mr);
                    return (p(me, se), me);
                  }),
                  (j.prototype.ready = function (se) {
                    var me = this,
                      ve = me._driverSet.then(function () {
                        if (me._ready === null) me._ready = me._initDriver();
                        return me._ready;
                      });
                    return (p(ve, se, se), ve);
                  }),
                  (j.prototype.setDriver = function (se, me, ve) {
                    var ye = this;
                    if (!Ee(se)) se = [se];
                    var Pe = this._getSupportedDrivers(se);
                    function qe() {
                      ye._config.driver = ye.driver();
                    }
                    function Ve(_t) {
                      return (
                        ye._extend(_t),
                        qe(),
                        (ye._ready = ye._initStorage(ye._config)),
                        ye._ready
                      );
                    }
                    function Ze(_t) {
                      return function () {
                        var qt = 0;
                        function sn() {
                          while (qt < _t.length) {
                            var Hr = _t[qt];
                            return (
                              qt++,
                              (ye._dbInfo = null),
                              (ye._ready = null),
                              ye.getDriver(Hr).then(Ve).catch(sn)
                            );
                          }
                          qe();
                          var Zi = Error("No available storage method found.");
                          return ((ye._driverSet = h.reject(Zi)), ye._driverSet);
                        }
                        return sn();
                      };
                    }
                    var it =
                      this._driverSet !== null
                        ? this._driverSet.catch(function () {
                            return h.resolve();
                          })
                        : h.resolve();
                    return (
                      (this._driverSet = it
                        .then(function () {
                          var _t = Pe[0];
                          return (
                            (ye._dbInfo = null),
                            (ye._ready = null),
                            ye.getDriver(_t).then(function (qt) {
                              ((ye._driver = qt._driver),
                                qe(),
                                ye._wrapLibraryMethodsWithReady(),
                                (ye._initDriver = Ze(Pe)));
                            })
                          );
                        })
                        .catch(function () {
                          qe();
                          var _t = Error("No available storage method found.");
                          return ((ye._driverSet = h.reject(_t)), ye._driverSet);
                        })),
                      p(this._driverSet, me, ve),
                      this._driverSet
                    );
                  }),
                  (j.prototype.supports = function (se) {
                    return !!lt[se];
                  }),
                  (j.prototype._extend = function (se) {
                    on(this, se);
                  }),
                  (j.prototype._getSupportedDrivers = function (se) {
                    var me = [];
                    for (var ve = 0, ye = se.length; ve < ye; ve++) {
                      var Pe = se[ve];
                      if (this.supports(Pe)) me.push(Pe);
                    }
                    return me;
                  }),
                  (j.prototype._wrapLibraryMethodsWithReady = function () {
                    for (var se = 0, me = ir.length; se < me; se++) $r(this, ir[se]);
                  }),
                  (j.prototype.createInstance = function (se) {
                    return new j(se);
                  }),
                  j
                );
              })(),
              fi = new Si();
            i.exports = fi;
          },
          { 3: 3 },
        ],
      },
      {},
      [4],
    )(4);
  });
});
