// src/vendor/gettext.js
// gettext.js: translation engine.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var Gettext = function (e) {
    ((e = e || {}), this && (this.__version = "2.0.0"));
    var t = {
        domain: "messages",
        locale:
          (typeof document < "u" ? document.documentElement.getAttribute("lang") : !1) || "en",
        plural_func: function (g) {
          return { nplurals: 2, plural: g != 1 ? 1 : 0 };
        },
        ctxt_delimiter: String.fromCharCode(4),
      },
      r = {
        isObject: function (g) {
          var m = typeof g;
          return m === "function" || (m === "object" && !!g);
        },
        isArray: function (g) {
          return toString.call(g) === "[object Array]";
        },
      },
      n = {},
      i = e.locale || t.locale,
      o = e.domain || t.domain,
      s = {},
      a = {},
      l = e.ctxt_delimiter || t.ctxt_delimiter;
    if (e.messages) ((s[o] = {}), (s[o][i] = e.messages));
    if (e.plural_forms) a[i] = e.plural_forms;
    var c = function (g) {
        var m = arguments;
        return g
          .replace(/%%/g, "%% ")
          .replace(/%(\d+)/g, function (A, y) {
            return m[y];
          })
          .replace(/%% /g, "%");
      },
      u = function (g) {
        if (g.indexOf(l) !== -1) {
          var m = g.split(l);
          return m[1];
        }
        return g;
      },
      d = function (g) {
        var m = [g],
          A = g.lastIndexOf("-");
        while (A > 0) ((g = g.slice(0, A)), m.push(g), (A = g.lastIndexOf("-")));
        return m;
      },
      h = function (g) {
        g = g.replace("_", "-");
        var m = g.search(/[.@]/);
        if (m != -1) g = g.slice(0, m);
        return g;
      },
      f = function (g) {
        var m = new RegExp(
            "^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;n0-9_()])+",
          ),
          A = g.match(m);
        if (!A || A[0] !== g) throw Error(c('The plural form "%1" is not valid', g));
        return Function(
          "n",
          "var plural, nplurals; " +
            g +
            " return { nplurals: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };",
        );
      },
      p = function (g, m, A) {
        if (!A.plural_form)
          return c.apply(this, [u(g[0])].concat(Array.prototype.slice.call(arguments, 3)));
        var y;
        if (A.plural_func) y = A.plural_func(m);
        else if (!n[i]) ((n[i] = f(a[i])), (y = n[i](m)));
        else y = n[i](m);
        if (typeof y.plural > "u" || y.plural > y.nplurals || g.length <= y.plural) y.plural = 0;
        return c.apply(this, [u(g[y.plural])].concat(Array.prototype.slice.call(arguments, 3)));
      };
    return {
      strfmt: c,
      expand_locale: d,
      __: function () {
        return this.gettext.apply(this, arguments);
      },
      _n: function () {
        return this.ngettext.apply(this, arguments);
      },
      _p: function () {
        return this.pgettext.apply(this, arguments);
      },
      setMessages: function (g, m, A, y) {
        if (!g || !m || !A) throw Error("You must provide a domain, a locale and messages");
        if (typeof g !== "string" || typeof m !== "string" || !r.isObject(A))
          throw Error("Invalid arguments");
        if (((m = h(m)), y)) a[m] = y;
        if (!s[g]) s[g] = {};
        return ((s[g][m] = A), this);
      },
      loadJSON: function (g, m) {
        if (!r.isObject(g)) g = JSON.parse(g);
        if (!g[""] || !g[""].language || !g[""]["plural-forms"])
          throw Error(
            'Wrong JSON, it must have an empty key ("") with "language" and "plural-forms" information',
          );
        var A = g[""];
        return (delete g[""], this.setMessages(m || t.domain, A.language, g, A["plural-forms"]));
      },
      setLocale: function (g) {
        return ((i = h(g)), this);
      },
      getLocale: function () {
        return i;
      },
      textdomain: function (g) {
        if (!g) return o;
        return ((o = g), this);
      },
      gettext: function (g) {
        return this.dcnpgettext.apply(
          this,
          [void 0, void 0, g, void 0, void 0].concat(Array.prototype.slice.call(arguments, 1)),
        );
      },
      ngettext: function (g, m, A) {
        return this.dcnpgettext.apply(
          this,
          [void 0, void 0, g, m, A].concat(Array.prototype.slice.call(arguments, 3)),
        );
      },
      pgettext: function (g, m) {
        return this.dcnpgettext.apply(
          this,
          [void 0, g, m, void 0, void 0].concat(Array.prototype.slice.call(arguments, 2)),
        );
      },
      dcnpgettext: function (g, m, A, y, x) {
        if (((g = g || o), typeof A !== "string"))
          throw Error(this.strfmt('Msgid "%1" is not a valid translatable string', A));
        var b,
          v = { plural_form: !1 },
          _ = m ? m + l + A : A,
          w,
          S,
          E = d(i);
        for (var T in E) {
          if (((S = E[T]), (w = s[g] && s[g][S] && s[g][S][_]), y))
            w = w && typeof s[g][S][_] !== "string";
          else w = w && typeof s[g][S][_] === "string";
          if (w) break;
        }
        if (!w) ((b = A), (v.plural_func = t.plural_func));
        else b = s[g][S][_];
        if (!y) return p.apply(this, [[b], x, v].concat(Array.prototype.slice.call(arguments, 5)));
        return (
          (v.plural_form = !0),
          p.apply(this, [w ? b : [A, y], x, v].concat(Array.prototype.slice.call(arguments, 5)))
        );
      },
    };
  },
  $9 = Gettext;
