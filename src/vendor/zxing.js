// src/vendor/zxing.js
// ZXing: QR code reading/writing.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

function zre(e, t) {
  var r = Object.setPrototypeOf;
  r ? r(e, t) : (e.__proto__ = t);
}
function Vre(e, t) {
  if (t === void 0) t = e.constructor;
  var r = Error.captureStackTrace;
  r && r(e, t);
}
var Wre = (function () {
    var e = function (r, n) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (i, o) {
              i.__proto__ = o;
            }) ||
          function (i, o) {
            for (var s in o) if (Object.prototype.hasOwnProperty.call(o, s)) i[s] = o[s];
          }),
        e(r, n)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Nk = (function (e) {
    Wre(t, e);
    function t(r, n) {
      var i = this.constructor,
        o = e.call(this, r, n) || this;
      return (
        Object.defineProperty(o, "name", { value: i.name, enumerable: !1, configurable: !0 }),
        zre(o, i.prototype),
        Vre(o),
        o
      );
    }
    return t;
  })(Error);
var Qre = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Yre = (function (e) {
    Qre(t, e);
    function t(r) {
      if (r === void 0) r = void 0;
      var n = e.call(this, r) || this;
      return ((n.message = r), n);
    }
    return (
      (t.prototype.getKind = function () {
        var r = this.constructor;
        return r.kind;
      }),
      (t.kind = "Exception"),
      t
    );
  })(Nk),
  Bn = Yre;
var Xre = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  jre = (function (e) {
    Xre(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "ArgumentException"), t);
  })(Bn),
  hi = jre;
var Kre = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  qre = (function (e) {
    Kre(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "IllegalArgumentException"), t);
  })(Bn),
  nt = qre;
var Zre = (function () {
    function e(t) {
      if (((this.binarizer = t), t === null)) throw new nt("Binarizer must be non-null.");
    }
    return (
      (e.prototype.getWidth = function () {
        return this.binarizer.getWidth();
      }),
      (e.prototype.getHeight = function () {
        return this.binarizer.getHeight();
      }),
      (e.prototype.getBlackRow = function (t, r) {
        return this.binarizer.getBlackRow(t, r);
      }),
      (e.prototype.getBlackMatrix = function () {
        if (this.matrix === null || this.matrix === void 0)
          this.matrix = this.binarizer.getBlackMatrix();
        return this.matrix;
      }),
      (e.prototype.isCropSupported = function () {
        return this.binarizer.getLuminanceSource().isCropSupported();
      }),
      (e.prototype.crop = function (t, r, n, i) {
        var o = this.binarizer.getLuminanceSource().crop(t, r, n, i);
        return new e(this.binarizer.createBinarizer(o));
      }),
      (e.prototype.isRotateSupported = function () {
        return this.binarizer.getLuminanceSource().isRotateSupported();
      }),
      (e.prototype.rotateCounterClockwise = function () {
        var t = this.binarizer.getLuminanceSource().rotateCounterClockwise();
        return new e(this.binarizer.createBinarizer(t));
      }),
      (e.prototype.rotateCounterClockwise45 = function () {
        var t = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
        return new e(this.binarizer.createBinarizer(t));
      }),
      (e.prototype.toString = function () {
        try {
          return this.getBlackMatrix().toString();
        } catch (t) {
          return "";
        }
      }),
      e
    );
  })(),
  Y1 = Zre;
var $re = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Jre = (function (e) {
    $re(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.getChecksumInstance = function () {
        return new t();
      }),
      (t.kind = "ChecksumException"),
      t
    );
  })(Bn),
  qr = Jre;
var ene = (function () {
    function e(t) {
      this.source = t;
    }
    return (
      (e.prototype.getLuminanceSource = function () {
        return this.source;
      }),
      (e.prototype.getWidth = function () {
        return this.source.getWidth();
      }),
      (e.prototype.getHeight = function () {
        return this.source.getHeight();
      }),
      e
    );
  })(),
  sS = ene;
var tne = (function () {
    function e() {}
    return (
      (e.arraycopy = function (t, r, n, i, o) {
        if (t === n && r < i) {
          ((i += o - 1), (r += o - 1));
          while (o--) n[i--] = t[r--];
        } else while (o--) n[i++] = t[r++];
      }),
      (e.currentTimeMillis = function () {
        return Date.now();
      }),
      e
    );
  })(),
  pr = tne;
var rne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  nne = (function (e) {
    rne(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "IndexOutOfBoundsException"), t);
  })(Bn),
  X1 = nne;
var ine = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  one = (function (e) {
    ine(t, e);
    function t(r, n) {
      if (r === void 0) r = void 0;
      if (n === void 0) n = void 0;
      var i = e.call(this, n) || this;
      return ((i.index = r), (i.message = n), i);
    }
    return ((t.kind = "ArrayIndexOutOfBoundsException"), t);
  })(X1),
  aS = one;
var sne = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  ane = (function () {
    function e() {}
    return (
      (e.fill = function (t, r) {
        for (var n = 0, i = t.length; n < i; n++) t[n] = r;
      }),
      (e.fillWithin = function (t, r, n, i) {
        e.rangeCheck(t.length, r, n);
        for (var o = r; o < n; o++) t[o] = i;
      }),
      (e.rangeCheck = function (t, r, n) {
        if (r > n) throw new nt("fromIndex(" + r + ") > toIndex(" + n + ")");
        if (r < 0) throw new aS(r);
        if (n > t) throw new aS(n);
      }),
      (e.asList = function () {
        var t = [];
        for (var r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return t;
      }),
      (e.create = function (t, r, n) {
        var i = Array.from({ length: t });
        return i.map(function (o) {
          return Array.from({ length: r }).fill(n);
        });
      }),
      (e.createInt32Array = function (t, r, n) {
        var i = Array.from({ length: t });
        return i.map(function (o) {
          return Int32Array.from({ length: r }).fill(n);
        });
      }),
      (e.equals = function (t, r) {
        if (!t) return !1;
        if (!r) return !1;
        if (!t.length) return !1;
        if (!r.length) return !1;
        if (t.length !== r.length) return !1;
        for (var n = 0, i = t.length; n < i; n++) if (t[n] !== r[n]) return !1;
        return !0;
      }),
      (e.hashCode = function (t) {
        var r, n;
        if (t === null) return 0;
        var i = 1;
        try {
          for (var o = sne(t), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            i = 31 * i + a;
          }
        } catch (l) {
          r = { error: l };
        } finally {
          try {
            if (s && !s.done && (n = o.return)) n.call(o);
          } finally {
            if (r) throw r.error;
          }
        }
        return i;
      }),
      (e.fillUint8Array = function (t, r) {
        for (var n = 0; n !== t.length; n++) t[n] = r;
      }),
      (e.copyOf = function (t, r) {
        return t.slice(0, r);
      }),
      (e.copyOfUint8Array = function (t, r) {
        if (t.length <= r) {
          var n = new Uint8Array(r);
          return (n.set(t), n);
        }
        return t.slice(0, r);
      }),
      (e.copyOfRange = function (t, r, n) {
        var i = n - r,
          o = new Int32Array(i);
        return (pr.arraycopy(t, r, o, 0, i), o);
      }),
      (e.binarySearch = function (t, r, n) {
        if (n === void 0) n = e.numberComparator;
        var i = 0,
          o = t.length - 1;
        while (i <= o) {
          var s = (o + i) >> 1,
            a = n(r, t[s]);
          if (a > 0) i = s + 1;
          else if (a < 0) o = s - 1;
          else return s;
        }
        return -i - 1;
      }),
      (e.numberComparator = function (t, r) {
        return t - r;
      }),
      e
    );
  })(),
  yn = ane;
var lne = (function () {
    function e() {}
    return (
      (e.numberOfTrailingZeros = function (t) {
        var r;
        if (t === 0) return 32;
        var n = 31;
        if (((r = t << 16), r !== 0)) ((n -= 16), (t = r));
        if (((r = t << 8), r !== 0)) ((n -= 8), (t = r));
        if (((r = t << 4), r !== 0)) ((n -= 4), (t = r));
        if (((r = t << 2), r !== 0)) ((n -= 2), (t = r));
        return n - ((t << 1) >>> 31);
      }),
      (e.numberOfLeadingZeros = function (t) {
        if (t === 0) return 32;
        var r = 1;
        if (t >>> 16 === 0) ((r += 16), (t <<= 16));
        if (t >>> 24 === 0) ((r += 8), (t <<= 8));
        if (t >>> 28 === 0) ((r += 4), (t <<= 4));
        if (t >>> 30 === 0) ((r += 2), (t <<= 2));
        return ((r -= t >>> 31), r);
      }),
      (e.toHexString = function (t) {
        return t.toString(16);
      }),
      (e.toBinaryString = function (t) {
        return String(parseInt(String(t), 2));
      }),
      (e.bitCount = function (t) {
        return (
          (t = t - ((t >>> 1) & 1431655765)),
          (t = (t & 858993459) + ((t >>> 2) & 858993459)),
          (t = (t + (t >>> 4)) & 252645135),
          (t = t + (t >>> 8)),
          (t = t + (t >>> 16)),
          t & 63
        );
      }),
      (e.truncDivision = function (t, r) {
        return Math.trunc(t / r);
      }),
      (e.parseInt = function (t, r) {
        if (r === void 0) r = void 0;
        return parseInt(t, r);
      }),
      (e.MIN_VALUE_32_BITS = -2147483648),
      (e.MAX_VALUE = Number.MAX_SAFE_INTEGER),
      e
    );
  })(),
  Ut = lne;
var cne = (function () {
    function e(t, r) {
      if (t === void 0) ((this.size = 0), (this.bits = new Int32Array(1)));
      else if (((this.size = t), r === void 0 || r === null)) this.bits = e.makeArray(t);
      else this.bits = r;
    }
    return (
      (e.prototype.getSize = function () {
        return this.size;
      }),
      (e.prototype.getSizeInBytes = function () {
        return Math.floor((this.size + 7) / 8);
      }),
      (e.prototype.ensureCapacity = function (t) {
        if (t > this.bits.length * 32) {
          var r = e.makeArray(t);
          (pr.arraycopy(this.bits, 0, r, 0, this.bits.length), (this.bits = r));
        }
      }),
      (e.prototype.get = function (t) {
        return (this.bits[Math.floor(t / 32)] & (1 << (t & 31))) !== 0;
      }),
      (e.prototype.set = function (t) {
        this.bits[Math.floor(t / 32)] |= 1 << (t & 31);
      }),
      (e.prototype.flip = function (t) {
        this.bits[Math.floor(t / 32)] ^= 1 << (t & 31);
      }),
      (e.prototype.getNextSet = function (t) {
        var r = this.size;
        if (t >= r) return r;
        var n = this.bits,
          i = Math.floor(t / 32),
          o = n[i];
        o &= ~((1 << (t & 31)) - 1);
        var s = n.length;
        while (o === 0) {
          if (++i === s) return r;
          o = n[i];
        }
        var a = i * 32 + Ut.numberOfTrailingZeros(o);
        return a > r ? r : a;
      }),
      (e.prototype.getNextUnset = function (t) {
        var r = this.size;
        if (t >= r) return r;
        var n = this.bits,
          i = Math.floor(t / 32),
          o = ~n[i];
        o &= ~((1 << (t & 31)) - 1);
        var s = n.length;
        while (o === 0) {
          if (++i === s) return r;
          o = ~n[i];
        }
        var a = i * 32 + Ut.numberOfTrailingZeros(o);
        return a > r ? r : a;
      }),
      (e.prototype.setBulk = function (t, r) {
        this.bits[Math.floor(t / 32)] = r;
      }),
      (e.prototype.setRange = function (t, r) {
        if (r < t || t < 0 || r > this.size) throw new nt();
        if (r === t) return;
        r--;
        var n = Math.floor(t / 32),
          i = Math.floor(r / 32),
          o = this.bits;
        for (var s = n; s <= i; s++) {
          var a = s > n ? 0 : t & 31,
            l = s < i ? 31 : r & 31,
            c = (2 << l) - (1 << a);
          o[s] |= c;
        }
      }),
      (e.prototype.clear = function () {
        var t = this.bits.length,
          r = this.bits;
        for (var n = 0; n < t; n++) r[n] = 0;
      }),
      (e.prototype.isRange = function (t, r, n) {
        if (r < t || t < 0 || r > this.size) throw new nt();
        if (r === t) return !0;
        r--;
        var i = Math.floor(t / 32),
          o = Math.floor(r / 32),
          s = this.bits;
        for (var a = i; a <= o; a++) {
          var l = a > i ? 0 : t & 31,
            c = a < o ? 31 : r & 31,
            u = ((2 << c) - (1 << l)) & 4294967295;
          if ((s[a] & u) !== (n ? u : 0)) return !1;
        }
        return !0;
      }),
      (e.prototype.appendBit = function (t) {
        if ((this.ensureCapacity(this.size + 1), t))
          this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 31);
        this.size++;
      }),
      (e.prototype.appendBits = function (t, r) {
        if (r < 0 || r > 32) throw new nt("Num bits must be between 0 and 32");
        this.ensureCapacity(this.size + r);
        for (var n = r; n > 0; n--) this.appendBit(((t >> (n - 1)) & 1) === 1);
      }),
      (e.prototype.appendBitArray = function (t) {
        var r = t.size;
        this.ensureCapacity(this.size + r);
        for (var n = 0; n < r; n++) this.appendBit(t.get(n));
      }),
      (e.prototype.xor = function (t) {
        if (this.size !== t.size) throw new nt("Sizes don't match");
        var r = this.bits;
        for (var n = 0, i = r.length; n < i; n++) r[n] ^= t.bits[n];
      }),
      (e.prototype.toBytes = function (t, r, n, i) {
        for (var o = 0; o < i; o++) {
          var s = 0;
          for (var a = 0; a < 8; a++) {
            if (this.get(t)) s |= 1 << (7 - a);
            t++;
          }
          r[n + o] = s;
        }
      }),
      (e.prototype.getBitArray = function () {
        return this.bits;
      }),
      (e.prototype.reverse = function () {
        var t = new Int32Array(this.bits.length),
          r = Math.floor((this.size - 1) / 32),
          n = r + 1,
          i = this.bits;
        for (var o = 0; o < n; o++) {
          var s = i[o];
          ((s = ((s >> 1) & 1431655765) | ((s & 1431655765) << 1)),
            (s = ((s >> 2) & 858993459) | ((s & 858993459) << 2)),
            (s = ((s >> 4) & 252645135) | ((s & 252645135) << 4)),
            (s = ((s >> 8) & 16711935) | ((s & 16711935) << 8)),
            (s = ((s >> 16) & 65535) | ((s & 65535) << 16)),
            (t[r - o] = s));
        }
        if (this.size !== n * 32) {
          var a = n * 32 - this.size,
            l = t[0] >>> a;
          for (var o = 1; o < n; o++) {
            var c = t[o];
            ((l |= c << (32 - a)), (t[o - 1] = l), (l = c >>> a));
          }
          t[n - 1] = l;
        }
        this.bits = t;
      }),
      (e.makeArray = function (t) {
        return new Int32Array(Math.floor((t + 31) / 32));
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.size === r.size && yn.equals(this.bits, r.bits);
      }),
      (e.prototype.hashCode = function () {
        return 31 * this.size + yn.hashCode(this.bits);
      }),
      (e.prototype.toString = function () {
        var t = "";
        for (var r = 0, n = this.size; r < n; r++) {
          if ((r & 7) === 0) t += " ";
          t += this.get(r) ? "X" : ".";
        }
        return t;
      }),
      (e.prototype.clone = function () {
        return new e(this.size, this.bits.slice());
      }),
      (e.prototype.toArray = function () {
        var t = [];
        for (var r = 0, n = this.size; r < n; r++) t.push(this.get(r));
        return t;
      }),
      e
    );
  })(),
  $n = cne;
var lS;
(function (e) {
  ((e[(e.OTHER = 0)] = "OTHER"),
    (e[(e.PURE_BARCODE = 1)] = "PURE_BARCODE"),
    (e[(e.POSSIBLE_FORMATS = 2)] = "POSSIBLE_FORMATS"),
    (e[(e.TRY_HARDER = 3)] = "TRY_HARDER"),
    (e[(e.CHARACTER_SET = 4)] = "CHARACTER_SET"),
    (e[(e.ALLOWED_LENGTHS = 5)] = "ALLOWED_LENGTHS"),
    (e[(e.ASSUME_CODE_39_CHECK_DIGIT = 6)] = "ASSUME_CODE_39_CHECK_DIGIT"),
    (e[(e.ENABLE_CODE_39_EXTENDED_MODE = 7)] = "ENABLE_CODE_39_EXTENDED_MODE"),
    (e[(e.ASSUME_GS1 = 8)] = "ASSUME_GS1"),
    (e[(e.RETURN_CODABAR_START_END = 9)] = "RETURN_CODABAR_START_END"),
    (e[(e.NEED_RESULT_POINT_CALLBACK = 10)] = "NEED_RESULT_POINT_CALLBACK"),
    (e[(e.ALLOWED_EAN_EXTENSIONS = 11)] = "ALLOWED_EAN_EXTENSIONS"));
})(lS || (lS = {}));
var nr = lS;
var une = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  dne = (function (e) {
    une(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.getFormatInstance = function () {
        return new t();
      }),
      (t.kind = "FormatException"),
      t
    );
  })(Bn),
  De = dne;
var hne = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Fn;
(function (e) {
  ((e[(e.Cp437 = 0)] = "Cp437"),
    (e[(e.ISO8859_1 = 1)] = "ISO8859_1"),
    (e[(e.ISO8859_2 = 2)] = "ISO8859_2"),
    (e[(e.ISO8859_3 = 3)] = "ISO8859_3"),
    (e[(e.ISO8859_4 = 4)] = "ISO8859_4"),
    (e[(e.ISO8859_5 = 5)] = "ISO8859_5"),
    (e[(e.ISO8859_6 = 6)] = "ISO8859_6"),
    (e[(e.ISO8859_7 = 7)] = "ISO8859_7"),
    (e[(e.ISO8859_8 = 8)] = "ISO8859_8"),
    (e[(e.ISO8859_9 = 9)] = "ISO8859_9"),
    (e[(e.ISO8859_10 = 10)] = "ISO8859_10"),
    (e[(e.ISO8859_11 = 11)] = "ISO8859_11"),
    (e[(e.ISO8859_13 = 12)] = "ISO8859_13"),
    (e[(e.ISO8859_14 = 13)] = "ISO8859_14"),
    (e[(e.ISO8859_15 = 14)] = "ISO8859_15"),
    (e[(e.ISO8859_16 = 15)] = "ISO8859_16"),
    (e[(e.SJIS = 16)] = "SJIS"),
    (e[(e.Cp1250 = 17)] = "Cp1250"),
    (e[(e.Cp1251 = 18)] = "Cp1251"),
    (e[(e.Cp1252 = 19)] = "Cp1252"),
    (e[(e.Cp1256 = 20)] = "Cp1256"),
    (e[(e.UnicodeBigUnmarked = 21)] = "UnicodeBigUnmarked"),
    (e[(e.UTF8 = 22)] = "UTF8"),
    (e[(e.ASCII = 23)] = "ASCII"),
    (e[(e.Big5 = 24)] = "Big5"),
    (e[(e.GB18030 = 25)] = "GB18030"),
    (e[(e.EUC_KR = 26)] = "EUC_KR"));
})(Fn || (Fn = {}));
var fne = (function () {
    function e(t, r, n) {
      var i,
        o,
        s = [];
      for (var a = 3; a < arguments.length; a++) s[a - 3] = arguments[a];
      if (((this.valueIdentifier = t), (this.name = n), typeof r === "number"))
        this.values = Int32Array.from([r]);
      else this.values = r;
      ((this.otherEncodingNames = s),
        e.VALUE_IDENTIFIER_TO_ECI.set(t, this),
        e.NAME_TO_ECI.set(n, this));
      var l = this.values;
      for (var c = 0, u = l.length; c !== u; c++) {
        var d = l[c];
        e.VALUES_TO_ECI.set(d, this);
      }
      try {
        for (var h = hne(s), f = h.next(); !f.done; f = h.next()) {
          var p = f.value;
          e.NAME_TO_ECI.set(p, this);
        }
      } catch (g) {
        i = { error: g };
      } finally {
        try {
          if (f && !f.done && (o = h.return)) o.call(h);
        } finally {
          if (i) throw i.error;
        }
      }
    }
    return (
      (e.prototype.getValueIdentifier = function () {
        return this.valueIdentifier;
      }),
      (e.prototype.getName = function () {
        return this.name;
      }),
      (e.prototype.getValue = function () {
        return this.values[0];
      }),
      (e.getCharacterSetECIByValue = function (t) {
        if (t < 0 || t >= 900) throw new De("incorect value");
        var r = e.VALUES_TO_ECI.get(t);
        if (r === void 0) throw new De("incorect value");
        return r;
      }),
      (e.getCharacterSetECIByName = function (t) {
        var r = e.NAME_TO_ECI.get(t);
        if (r === void 0) throw new De("incorect value");
        return r;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.getName() === r.getName();
      }),
      (e.VALUE_IDENTIFIER_TO_ECI = /*@__PURE__*/ new Map()),
      (e.VALUES_TO_ECI = /*@__PURE__*/ new Map()),
      (e.NAME_TO_ECI = /*@__PURE__*/ new Map()),
      (e.Cp437 = new e(Fn.Cp437, Int32Array.from([0, 2]), "Cp437")),
      (e.ISO8859_1 = new e(
        Fn.ISO8859_1,
        Int32Array.from([1, 3]),
        "ISO-8859-1",
        "ISO88591",
        "ISO8859_1",
      )),
      (e.ISO8859_2 = new e(Fn.ISO8859_2, 4, "ISO-8859-2", "ISO88592", "ISO8859_2")),
      (e.ISO8859_3 = new e(Fn.ISO8859_3, 5, "ISO-8859-3", "ISO88593", "ISO8859_3")),
      (e.ISO8859_4 = new e(Fn.ISO8859_4, 6, "ISO-8859-4", "ISO88594", "ISO8859_4")),
      (e.ISO8859_5 = new e(Fn.ISO8859_5, 7, "ISO-8859-5", "ISO88595", "ISO8859_5")),
      (e.ISO8859_6 = new e(Fn.ISO8859_6, 8, "ISO-8859-6", "ISO88596", "ISO8859_6")),
      (e.ISO8859_7 = new e(Fn.ISO8859_7, 9, "ISO-8859-7", "ISO88597", "ISO8859_7")),
      (e.ISO8859_8 = new e(Fn.ISO8859_8, 10, "ISO-8859-8", "ISO88598", "ISO8859_8")),
      (e.ISO8859_9 = new e(Fn.ISO8859_9, 11, "ISO-8859-9", "ISO88599", "ISO8859_9")),
      (e.ISO8859_10 = new e(Fn.ISO8859_10, 12, "ISO-8859-10", "ISO885910", "ISO8859_10")),
      (e.ISO8859_11 = new e(Fn.ISO8859_11, 13, "ISO-8859-11", "ISO885911", "ISO8859_11")),
      (e.ISO8859_13 = new e(Fn.ISO8859_13, 15, "ISO-8859-13", "ISO885913", "ISO8859_13")),
      (e.ISO8859_14 = new e(Fn.ISO8859_14, 16, "ISO-8859-14", "ISO885914", "ISO8859_14")),
      (e.ISO8859_15 = new e(Fn.ISO8859_15, 17, "ISO-8859-15", "ISO885915", "ISO8859_15")),
      (e.ISO8859_16 = new e(Fn.ISO8859_16, 18, "ISO-8859-16", "ISO885916", "ISO8859_16")),
      (e.SJIS = new e(Fn.SJIS, 20, "SJIS", "Shift_JIS")),
      (e.Cp1250 = new e(Fn.Cp1250, 21, "Cp1250", "windows-1250")),
      (e.Cp1251 = new e(Fn.Cp1251, 22, "Cp1251", "windows-1251")),
      (e.Cp1252 = new e(Fn.Cp1252, 23, "Cp1252", "windows-1252")),
      (e.Cp1256 = new e(Fn.Cp1256, 24, "Cp1256", "windows-1256")),
      (e.UnicodeBigUnmarked = new e(
        Fn.UnicodeBigUnmarked,
        25,
        "UnicodeBigUnmarked",
        "UTF-16BE",
        "UnicodeBig",
      )),
      (e.UTF8 = new e(Fn.UTF8, 26, "UTF8", "UTF-8")),
      (e.ASCII = new e(Fn.ASCII, Int32Array.from([27, 170]), "ASCII", "US-ASCII")),
      (e.Big5 = new e(Fn.Big5, 28, "Big5")),
      (e.GB18030 = new e(Fn.GB18030, 29, "GB18030", "GB2312", "EUC_CN", "GBK")),
      (e.EUC_KR = new e(Fn.EUC_KR, 30, "EUC_KR", "EUC-KR")),
      e
    );
  })(),
  Jn = fne;
var pne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  mne = (function (e) {
    pne(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "UnsupportedOperationException"), t);
  })(Bn),
  l0 = mne;
var gne = (function () {
    function e() {}
    return (
      (e.decode = function (t, r) {
        var n = this.encodingName(r);
        if (this.customDecoder) return this.customDecoder(t, n);
        if (typeof TextDecoder > "u" || this.shouldDecodeOnFallback(n))
          return this.decodeFallback(t, n);
        return new TextDecoder(n).decode(t);
      }),
      (e.shouldDecodeOnFallback = function (t) {
        return !1;
      }),
      (e.encode = function (t, r) {
        var n = this.encodingName(r);
        if (this.customEncoder) return this.customEncoder(t, n);
        if (typeof TextEncoder > "u") return this.encodeFallback(t);
        return /*@__PURE__*/ new TextEncoder().encode(t);
      }),
      (e.isBrowser = function () {
        return typeof window < "u" && {}.toString.call(window) === "[object Window]";
      }),
      (e.encodingName = function (t) {
        return typeof t === "string" ? t : t.getName();
      }),
      (e.encodingCharacterSet = function (t) {
        if (t instanceof Jn) return t;
        return Jn.getCharacterSetECIByName(t);
      }),
      (e.decodeFallback = function (t, r) {
        var n = this.encodingCharacterSet(r);
        if (e.isDecodeFallbackSupported(n)) {
          var i = "";
          for (var o = 0, s = t.length; o < s; o++) {
            var a = t[o].toString(16);
            if (a.length < 2) a = "0" + a;
            i += "%" + a;
          }
          return decodeURIComponent(i);
        }
        if (n.equals(Jn.UnicodeBigUnmarked))
          return String.fromCharCode.apply(null, Array.from(new Uint16Array(t.buffer)));
        throw new l0("Encoding ".concat(this.encodingName(r), " not supported by fallback."));
      }),
      (e.isDecodeFallbackSupported = function (t) {
        return t.equals(Jn.UTF8) || t.equals(Jn.ISO8859_1) || t.equals(Jn.ASCII);
      }),
      (e.encodeFallback = function (t) {
        var r = btoa(unescape(encodeURIComponent(t))),
          n = r.split(""),
          i = [];
        for (var o = 0; o < n.length; o++) i.push(n[o].charCodeAt(0));
        return new Uint8Array(i);
      }),
      e
    );
  })(),
  ki = gne;
var Ane = (function () {
    function e() {}
    return (
      (e.castAsNonUtf8Char = function (t, r) {
        if (r === void 0) r = null;
        var n = r ? r.getName() : this.ISO88591;
        return ki.decode(new Uint8Array([t]), n);
      }),
      (e.guessEncoding = function (t, r) {
        if (r !== null && r !== void 0 && r.get(nr.CHARACTER_SET) !== void 0)
          return r.get(nr.CHARACTER_SET).toString();
        var n = t.length,
          i = !0,
          o = !0,
          s = !0,
          a = 0,
          l = 0,
          c = 0,
          u = 0,
          d = 0,
          h = 0,
          f = 0,
          p = 0,
          g = 0,
          m = 0,
          A = 0,
          y = t.length > 3 && t[0] === 239 && t[1] === 187 && t[2] === 191;
        for (var x = 0; x < n && (i || o || s); x++) {
          var b = t[x] & 255;
          if (s) {
            if (a > 0)
              if ((b & 128) === 0) s = !1;
              else a--;
            else if ((b & 128) !== 0)
              if ((b & 64) === 0) s = !1;
              else if ((a++, (b & 32) === 0)) l++;
              else if ((a++, (b & 16) === 0)) c++;
              else if ((a++, (b & 8) === 0)) u++;
              else s = !1;
          }
          if (i) {
            if (b > 127 && b < 160) i = !1;
            else if (b > 159) {
              if (b < 192 || b === 215 || b === 247) A++;
            }
          }
          if (o)
            if (d > 0)
              if (b < 64 || b === 127 || b > 252) o = !1;
              else d--;
            else if (b === 128 || b === 160 || b > 239) o = !1;
            else if (b > 160 && b < 224) {
              if ((h++, (p = 0), f++, f > g)) g = f;
            } else if (b > 127) {
              if ((d++, (f = 0), p++, p > m)) m = p;
            } else ((f = 0), (p = 0));
        }
        if (s && a > 0) s = !1;
        if (o && d > 0) o = !1;
        if (s && (y || l + c + u > 0)) return e.UTF8;
        if (o && (e.ASSUME_SHIFT_JIS || g >= 3 || m >= 3)) return e.SHIFT_JIS;
        if (i && o) return (g === 2 && h === 2) || A * 10 >= n ? e.SHIFT_JIS : e.ISO88591;
        if (i) return e.ISO88591;
        if (o) return e.SHIFT_JIS;
        if (s) return e.UTF8;
        return e.PLATFORM_DEFAULT_ENCODING;
      }),
      (e.format = function (t) {
        var r = [];
        for (var n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
        var i = -1;
        function o(a, l, c, u, d, h) {
          if (a === "%%") return "%";
          if (r[++i] === void 0) return;
          a = u ? parseInt(u.substr(1)) : void 0;
          var f = d ? parseInt(d.substr(1)) : void 0,
            p;
          switch (h) {
            case "s":
              p = r[i];
              break;
            case "c":
              p = r[i][0];
              break;
            case "f":
              p = parseFloat(r[i]).toFixed(a);
              break;
            case "p":
              p = parseFloat(r[i]).toPrecision(a);
              break;
            case "e":
              p = parseFloat(r[i]).toExponential(a);
              break;
            case "x":
              p = parseInt(r[i]).toString(f ? f : 16);
              break;
            case "d":
              p = parseFloat(parseInt(r[i], f ? f : 10).toPrecision(a)).toFixed(0);
              break;
          }
          p = typeof p === "object" ? JSON.stringify(p) : (+p).toString(f);
          var g = parseInt(c),
            m = c && c[0] + "" === "0" ? "0" : " ";
          while (p.length < g) p = l !== void 0 ? p + m : m + p;
          return p;
        }
        var s = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
        return t.replace(s, o);
      }),
      (e.getBytes = function (t, r) {
        return ki.encode(t, r);
      }),
      (e.getCharCode = function (t, r) {
        if (r === void 0) r = 0;
        return t.charCodeAt(r);
      }),
      (e.getCharAt = function (t) {
        return String.fromCharCode(t);
      }),
      (e.SHIFT_JIS = Jn.SJIS.getName()),
      (e.GB2312 = "GB2312"),
      (e.ISO88591 = Jn.ISO8859_1.getName()),
      (e.EUC_JP = "EUC_JP"),
      (e.UTF8 = Jn.UTF8.getName()),
      (e.PLATFORM_DEFAULT_ENCODING = e.UTF8),
      (e.ASSUME_SHIFT_JIS = !1),
      e
    );
  })(),
  er = Ane;
var yne = (function () {
    function e(t) {
      if (t === void 0) t = "";
      this.value = t;
    }
    return (
      (e.prototype.enableDecoding = function (t) {
        return ((this.encoding = t), this);
      }),
      (e.prototype.append = function (t) {
        if (typeof t === "string") this.value += t.toString();
        else if (this.encoding) this.value += er.castAsNonUtf8Char(t, this.encoding);
        else this.value += String.fromCharCode(t);
        return this;
      }),
      (e.prototype.appendChars = function (t, r, n) {
        for (var i = r; r < r + n; i++) this.append(t[i]);
        return this;
      }),
      (e.prototype.length = function () {
        return this.value.length;
      }),
      (e.prototype.charAt = function (t) {
        return this.value.charAt(t);
      }),
      (e.prototype.deleteCharAt = function (t) {
        this.value = this.value.substr(0, t) + this.value.substring(t + 1);
      }),
      (e.prototype.setCharAt = function (t, r) {
        this.value = this.value.substr(0, t) + r + this.value.substr(t + 1);
      }),
      (e.prototype.substring = function (t, r) {
        return this.value.substring(t, r);
      }),
      (e.prototype.setLengthToZero = function () {
        this.value = "";
      }),
      (e.prototype.toString = function () {
        return this.value;
      }),
      (e.prototype.insert = function (t, r) {
        this.value = this.value.substring(0, t) + r + this.value.substring(t);
      }),
      e
    );
  })(),
  Ot = yne;
var xne = (function () {
    function e(t, r, n, i) {
      if (
        ((this.width = t),
        (this.height = r),
        (this.rowSize = n),
        (this.bits = i),
        r === void 0 || r === null)
      )
        r = t;
      if (((this.height = r), t < 1 || r < 1))
        throw new nt("Both dimensions must be greater than 0");
      if (n === void 0 || n === null) n = (t + 31) >> 5;
      if (((this.rowSize = n), i === void 0 || i === null))
        this.bits = new Int32Array(this.rowSize * this.height);
    }
    return (
      (e.parseFromBooleanArray = function (t) {
        var r = t.length,
          n = t[0].length,
          i = new e(n, r);
        for (var o = 0; o < r; o++) {
          var s = t[o];
          for (var a = 0; a < n; a++) if (s[a]) i.set(a, o);
        }
        return i;
      }),
      (e.parseFromString = function (t, r, n) {
        if (t === null) throw new nt("stringRepresentation cannot be null");
        var i = Array(t.length),
          o = 0,
          s = 0,
          a = -1,
          l = 0,
          c = 0;
        while (c < t.length)
          if (
            t.charAt(c) ===
              `
` ||
            t.charAt(c) === "\r"
          ) {
            if (o > s) {
              if (a === -1) a = o - s;
              else if (o - s !== a) throw new nt("row lengths do not match");
              ((s = o), l++);
            }
            c++;
          } else if (t.substring(c, c + r.length) === r) ((c += r.length), (i[o] = !0), o++);
          else if (t.substring(c, c + n.length) === n) ((c += n.length), (i[o] = !1), o++);
          else throw new nt("illegal character encountered: " + t.substring(c));
        if (o > s) {
          if (a === -1) a = o - s;
          else if (o - s !== a) throw new nt("row lengths do not match");
          l++;
        }
        var u = new e(a, l);
        for (var d = 0; d < o; d++) if (i[d]) u.set(Math.floor(d % a), Math.floor(d / a));
        return u;
      }),
      (e.prototype.get = function (t, r) {
        var n = r * this.rowSize + (t >> 5);
        return ((this.bits[n] >>> (t & 31)) & 1) !== 0;
      }),
      (e.prototype.set = function (t, r) {
        var n = r * this.rowSize + (t >> 5);
        this.bits[n] |= (1 << (t & 31)) & 4294967295;
      }),
      (e.prototype.unset = function (t, r) {
        var n = r * this.rowSize + (t >> 5);
        this.bits[n] &= ~((1 << (t & 31)) & 4294967295);
      }),
      (e.prototype.flip = function (t, r) {
        var n = r * this.rowSize + (t >> 5);
        this.bits[n] ^= (1 << (t & 31)) & 4294967295;
      }),
      (e.prototype.xor = function (t) {
        if (
          this.width !== t.getWidth() ||
          this.height !== t.getHeight() ||
          this.rowSize !== t.getRowSize()
        )
          throw new nt("input matrix dimensions do not match");
        var r = new $n((this.width >> 5) + 1),
          n = this.rowSize,
          i = this.bits;
        for (var o = 0, s = this.height; o < s; o++) {
          var a = o * n,
            l = t.getRow(o, r).getBitArray();
          for (var c = 0; c < n; c++) i[a + c] ^= l[c];
        }
      }),
      (e.prototype.clear = function () {
        this.bits.fill(0);
      }),
      (e.prototype.setRegion = function (t, r, n, i) {
        if (r < 0 || t < 0) throw new nt("Left and top must be nonnegative");
        if (i < 1 || n < 1) throw new nt("Height and width must be at least 1");
        var o = t + n,
          s = r + i;
        if (s > this.height || o > this.width)
          throw new nt("The region must fit inside the matrix");
        var a = this.rowSize,
          l = this.bits;
        for (var c = r; c < s; c++) {
          var u = c * a;
          for (var d = t; d < o; d++) l[u + (d >> 5)] |= (1 << (d & 31)) & 4294967295;
        }
      }),
      (e.prototype.getRow = function (t, r) {
        if (r === null || r === void 0 || r.getSize() < this.width) r = new $n(this.width);
        else r.clear();
        var n = this.rowSize,
          i = this.bits,
          o = t * n;
        for (var s = 0; s < n; s++) r.setBulk(s * 32, i[o + s]);
        return r;
      }),
      (e.prototype.setRow = function (t, r) {
        pr.arraycopy(r.getBitArray(), 0, this.bits, t * this.rowSize, this.rowSize);
      }),
      (e.prototype.rotate180 = function () {
        var t = this.getWidth(),
          r = this.getHeight(),
          n = new $n(t),
          i = new $n(t);
        for (var o = 0, s = Math.floor((r + 1) / 2); o < s; o++)
          ((n = this.getRow(o, n)),
            (i = this.getRow(r - 1 - o, i)),
            n.reverse(),
            i.reverse(),
            this.setRow(o, i),
            this.setRow(r - 1 - o, n));
      }),
      (e.prototype.getEnclosingRectangle = function () {
        var t = this.width,
          r = this.height,
          n = this.rowSize,
          i = this.bits,
          o = t,
          s = r,
          a = -1,
          l = -1;
        for (var c = 0; c < r; c++)
          for (var u = 0; u < n; u++) {
            var d = i[c * n + u];
            if (d !== 0) {
              if (c < s) s = c;
              if (c > l) l = c;
              if (u * 32 < o) {
                var h = 0;
                while (((d << (31 - h)) & 4294967295) === 0) h++;
                if (u * 32 + h < o) o = u * 32 + h;
              }
              if (u * 32 + 31 > a) {
                var h = 31;
                while (d >>> h === 0) h--;
                if (u * 32 + h > a) a = u * 32 + h;
              }
            }
          }
        if (a < o || l < s) return null;
        return Int32Array.from([o, s, a - o + 1, l - s + 1]);
      }),
      (e.prototype.getTopLeftOnBit = function () {
        var t = this.rowSize,
          r = this.bits,
          n = 0;
        while (n < r.length && r[n] === 0) n++;
        if (n === r.length) return null;
        var i = n / t,
          o = (n % t) * 32,
          s = r[n],
          a = 0;
        while (((s << (31 - a)) & 4294967295) === 0) a++;
        return ((o += a), Int32Array.from([o, i]));
      }),
      (e.prototype.getBottomRightOnBit = function () {
        var t = this.rowSize,
          r = this.bits,
          n = r.length - 1;
        while (n >= 0 && r[n] === 0) n--;
        if (n < 0) return null;
        var i = Math.floor(n / t),
          o = Math.floor(n % t) * 32,
          s = r[n],
          a = 31;
        while (s >>> a === 0) a--;
        return ((o += a), Int32Array.from([o, i]));
      }),
      (e.prototype.getWidth = function () {
        return this.width;
      }),
      (e.prototype.getHeight = function () {
        return this.height;
      }),
      (e.prototype.getRowSize = function () {
        return this.rowSize;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return (
          this.width === r.width &&
          this.height === r.height &&
          this.rowSize === r.rowSize &&
          yn.equals(this.bits, r.bits)
        );
      }),
      (e.prototype.hashCode = function () {
        var t = this.width;
        return (
          (t = 31 * t + this.width),
          (t = 31 * t + this.height),
          (t = 31 * t + this.rowSize),
          (t = 31 * t + yn.hashCode(this.bits)),
          t
        );
      }),
      (e.prototype.toString = function (t, r, n) {
        if (t === void 0) t = "X ";
        if (r === void 0) r = "  ";
        if (n === void 0)
          n = `
`;
        return this.buildToString(t, r, n);
      }),
      (e.prototype.buildToString = function (t, r, n) {
        var i = new Ot();
        for (var o = 0, s = this.height; o < s; o++) {
          for (var a = 0, l = this.width; a < l; a++) i.append(this.get(a, o) ? t : r);
          i.append(n);
        }
        return i.toString();
      }),
      (e.prototype.clone = function () {
        return new e(this.width, this.height, this.rowSize, this.bits.slice());
      }),
      e
    );
  })(),
  bn = xne;
var bne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  _ne = (function (e) {
    bne(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.getNotFoundInstance = function () {
        return new t();
      }),
      (t.kind = "NotFoundException"),
      t
    );
  })(Bn),
  Ce = _ne;
var vne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Cne = (function (e) {
    vne(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.luminances = t.EMPTY), (n.buckets = new Int32Array(t.LUMINANCE_BUCKETS)), n);
    }
    return (
      (t.prototype.getBlackRow = function (r, n) {
        var i = this.getLuminanceSource(),
          o = i.getWidth();
        if (n === void 0 || n === null || n.getSize() < o) n = new $n(o);
        else n.clear();
        this.initArrays(o);
        var s = i.getRow(r, this.luminances),
          a = this.buckets;
        for (var l = 0; l < o; l++) a[(s[l] & 255) >> t.LUMINANCE_SHIFT]++;
        var c = t.estimateBlackPoint(a);
        if (o < 3) {
          for (var l = 0; l < o; l++) if ((s[l] & 255) < c) n.set(l);
        } else {
          var u = s[0] & 255,
            d = s[1] & 255;
          for (var l = 1; l < o - 1; l++) {
            var h = s[l + 1] & 255;
            if ((d * 4 - u - h) / 2 < c) n.set(l);
            ((u = d), (d = h));
          }
        }
        return n;
      }),
      (t.prototype.getBlackMatrix = function () {
        var r = this.getLuminanceSource(),
          n = r.getWidth(),
          i = r.getHeight(),
          o = new bn(n, i);
        this.initArrays(n);
        var s = this.buckets;
        for (var a = 1; a < 5; a++) {
          var l = Math.floor((i * a) / 5),
            c = r.getRow(l, this.luminances),
            u = Math.floor((n * 4) / 5);
          for (var d = Math.floor(n / 5); d < u; d++) {
            var h = c[d] & 255;
            s[h >> t.LUMINANCE_SHIFT]++;
          }
        }
        var f = t.estimateBlackPoint(s),
          p = r.getMatrix();
        for (var a = 0; a < i; a++) {
          var g = a * n;
          for (var d = 0; d < n; d++) {
            var h = p[g + d] & 255;
            if (h < f) o.set(d, a);
          }
        }
        return o;
      }),
      (t.prototype.createBinarizer = function (r) {
        return new t(r);
      }),
      (t.prototype.initArrays = function (r) {
        if (this.luminances.length < r) this.luminances = new Uint8ClampedArray(r);
        this.buckets.fill(0);
      }),
      (t.estimateBlackPoint = function (r) {
        var n = r.length,
          i = 0,
          o = 0,
          s = 0;
        for (var a = 0; a < n; a++) {
          if (r[a] > s) ((o = a), (s = r[a]));
          if (r[a] > i) i = r[a];
        }
        var l = 0,
          c = 0;
        for (var a = 0; a < n; a++) {
          var u = a - o,
            d = r[a] * u * u;
          if (d > c) ((l = a), (c = d));
        }
        if (o > l) {
          var h = o;
          ((o = l), (l = h));
        }
        if (l - o <= n / 16) throw new Ce();
        var f = l - 1,
          p = -1;
        for (var a = l - 1; a > o; a--) {
          var g = a - o,
            d = g * g * (l - a) * (i - r[a]);
          if (d > p) ((f = a), (p = d));
        }
        return f << t.LUMINANCE_SHIFT;
      }),
      (t.LUMINANCE_BITS = 5),
      (t.LUMINANCE_SHIFT = 8 - t.LUMINANCE_BITS),
      (t.LUMINANCE_BUCKETS = 1 << t.LUMINANCE_BITS),
      (t.EMPTY = Uint8ClampedArray.from([0])),
      t
    );
  })(sS),
  Q3 = Cne;
var wne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Tne = (function (e) {
    wne(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.matrix = null), n);
    }
    return (
      (t.prototype.getBlackMatrix = function () {
        if (this.matrix !== null) return this.matrix;
        var r = this.getLuminanceSource(),
          n = r.getWidth(),
          i = r.getHeight();
        if (n >= t.MINIMUM_DIMENSION && i >= t.MINIMUM_DIMENSION) {
          var o = r.getMatrix(),
            s = n >> t.BLOCK_SIZE_POWER;
          if ((n & t.BLOCK_SIZE_MASK) !== 0) s++;
          var a = i >> t.BLOCK_SIZE_POWER;
          if ((i & t.BLOCK_SIZE_MASK) !== 0) a++;
          var l = t.calculateBlackPoints(o, s, a, n, i),
            c = new bn(n, i);
          (t.calculateThresholdForBlock(o, s, a, n, i, l, c), (this.matrix = c));
        } else this.matrix = e.prototype.getBlackMatrix.call(this);
        return this.matrix;
      }),
      (t.prototype.createBinarizer = function (r) {
        return new t(r);
      }),
      (t.calculateThresholdForBlock = function (r, n, i, o, s, a, l) {
        var c = s - t.BLOCK_SIZE,
          u = o - t.BLOCK_SIZE;
        for (var d = 0; d < i; d++) {
          var h = d << t.BLOCK_SIZE_POWER;
          if (h > c) h = c;
          var f = t.cap(d, 2, i - 3);
          for (var p = 0; p < n; p++) {
            var g = p << t.BLOCK_SIZE_POWER;
            if (g > u) g = u;
            var m = t.cap(p, 2, n - 3),
              A = 0;
            for (var y = -2; y <= 2; y++) {
              var x = a[f + y];
              A += x[m - 2] + x[m - 1] + x[m] + x[m + 1] + x[m + 2];
            }
            var b = A / 25;
            t.thresholdBlock(r, g, h, b, o, l);
          }
        }
      }),
      (t.cap = function (r, n, i) {
        return r < n ? n : r > i ? i : r;
      }),
      (t.thresholdBlock = function (r, n, i, o, s, a) {
        for (var l = 0, c = i * s + n; l < t.BLOCK_SIZE; l++, c += s)
          for (var u = 0; u < t.BLOCK_SIZE; u++) if ((r[c + u] & 255) <= o) a.set(n + u, i + l);
      }),
      (t.calculateBlackPoints = function (r, n, i, o, s) {
        var a = s - t.BLOCK_SIZE,
          l = o - t.BLOCK_SIZE,
          c = Array(i);
        for (var u = 0; u < i; u++) {
          c[u] = new Int32Array(n);
          var d = u << t.BLOCK_SIZE_POWER;
          if (d > a) d = a;
          for (var h = 0; h < n; h++) {
            var f = h << t.BLOCK_SIZE_POWER;
            if (f > l) f = l;
            var p = 0,
              g = 255,
              m = 0;
            for (var A = 0, y = d * o + f; A < t.BLOCK_SIZE; A++, y += o) {
              for (var x = 0; x < t.BLOCK_SIZE; x++) {
                var b = r[y + x] & 255;
                if (((p += b), b < g)) g = b;
                if (b > m) m = b;
              }
              if (m - g > t.MIN_DYNAMIC_RANGE)
                for (A++, y += o; A < t.BLOCK_SIZE; A++, y += o)
                  for (var x = 0; x < t.BLOCK_SIZE; x++) p += r[y + x] & 255;
            }
            var v = p >> (t.BLOCK_SIZE_POWER * 2);
            if (m - g <= t.MIN_DYNAMIC_RANGE) {
              if (((v = g / 2), u > 0 && h > 0)) {
                var _ = (c[u - 1][h] + 2 * c[u][h - 1] + c[u - 1][h - 1]) / 4;
                if (g < _) v = _;
              }
            }
            c[u][h] = v;
          }
        }
        return c;
      }),
      (t.BLOCK_SIZE_POWER = 3),
      (t.BLOCK_SIZE = 1 << t.BLOCK_SIZE_POWER),
      (t.BLOCK_SIZE_MASK = t.BLOCK_SIZE - 1),
      (t.MINIMUM_DIMENSION = t.BLOCK_SIZE * 5),
      (t.MIN_DYNAMIC_RANGE = 24),
      t
    );
  })(Q3),
  Y3 = Tne;
var Ene = (function () {
    function e(t, r) {
      ((this.width = t), (this.height = r));
    }
    return (
      (e.prototype.getWidth = function () {
        return this.width;
      }),
      (e.prototype.getHeight = function () {
        return this.height;
      }),
      (e.prototype.isCropSupported = function () {
        return !1;
      }),
      (e.prototype.crop = function (t, r, n, i) {
        throw new l0("This luminance source does not support cropping.");
      }),
      (e.prototype.isRotateSupported = function () {
        return !1;
      }),
      (e.prototype.rotateCounterClockwise = function () {
        throw new l0("This luminance source does not support rotation by 90 degrees.");
      }),
      (e.prototype.rotateCounterClockwise45 = function () {
        throw new l0("This luminance source does not support rotation by 45 degrees.");
      }),
      (e.prototype.toString = function () {
        var t = new Uint8ClampedArray(this.width),
          r = new Ot();
        for (var n = 0; n < this.height; n++) {
          var i = this.getRow(n, t);
          for (var o = 0; o < this.width; o++) {
            var s = i[o] & 255,
              a = void 0;
            if (s < 64) a = "#";
            else if (s < 128) a = "+";
            else if (s < 192) a = ".";
            else a = " ";
            r.append(a);
          }
          r.append(`
`);
        }
        return r.toString();
      }),
      e
    );
  })(),
  $l = Ene;
var Sne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Mne = (function (e) {
    Sne(t, e);
    function t(r) {
      var n = e.call(this, r.getWidth(), r.getHeight()) || this;
      return ((n.delegate = r), n);
    }
    return (
      (t.prototype.getRow = function (r, n) {
        var i = this.delegate.getRow(r, n),
          o = this.getWidth();
        for (var s = 0; s < o; s++) i[s] = 255 - (i[s] & 255);
        return i;
      }),
      (t.prototype.getMatrix = function () {
        var r = this.delegate.getMatrix(),
          n = this.getWidth() * this.getHeight(),
          i = new Uint8ClampedArray(n);
        for (var o = 0; o < n; o++) i[o] = 255 - (r[o] & 255);
        return i;
      }),
      (t.prototype.isCropSupported = function () {
        return this.delegate.isCropSupported();
      }),
      (t.prototype.crop = function (r, n, i, o) {
        return new t(this.delegate.crop(r, n, i, o));
      }),
      (t.prototype.isRotateSupported = function () {
        return this.delegate.isRotateSupported();
      }),
      (t.prototype.invert = function () {
        return this.delegate;
      }),
      (t.prototype.rotateCounterClockwise = function () {
        return new t(this.delegate.rotateCounterClockwise());
      }),
      (t.prototype.rotateCounterClockwise45 = function () {
        return new t(this.delegate.rotateCounterClockwise45());
      }),
      t
    );
  })($l),
  Yu = Mne;
var Ine = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  cS = (function (e) {
    Ine(t, e);
    function t(r, n, i) {
      if (n === void 0) n = !1;
      var o = e.call(this, r.width, r.height) || this;
      return (
        (o.canvas = r),
        (o.tempCanvasElement = null),
        (o.buffer = t.makeBufferFromCanvasImageData(r, n, i)),
        o
      );
    }
    return (
      (t.makeBufferFromCanvasImageData = function (r, n, i) {
        if (n === void 0) n = !1;
        var o = r.getContext("2d").getImageData(0, 0, r.width, r.height);
        return t.toGrayscaleBuffer(o.data, r.width, r.height, n, i);
      }),
      (t.toGrayscaleBuffer = function (r, n, i, o, s) {
        if (o === void 0) o = !1;
        var a = n * i,
          l = s && s.length >= a ? s : new Uint8ClampedArray(a);
        t.FRAME_INDEX = !t.FRAME_INDEX;
        var c = !t.FRAME_INDEX && o ? 255 : 0;
        for (var u = 0, d = 0, h = r.length; u < h; u += 4, d++) {
          var f = void 0,
            p = r[u + 3];
          if (p === 0) f = 255;
          else {
            var g = r[u],
              m = r[u + 1],
              A = r[u + 2];
            f = (306 * g + 601 * m + 117 * A + 512) >> 10;
          }
          l[d] = f ^ c;
        }
        return l;
      }),
      (t.prototype.getRow = function (r, n) {
        if (r < 0 || r >= this.getHeight())
          throw new nt("Requested row is outside the image: " + r);
        var i = this.getWidth(),
          o = r * i;
        if (n === null) n = this.buffer.slice(o, o + i);
        else {
          if (n.length < i) n = new Uint8ClampedArray(i);
          n.set(this.buffer.subarray(o, o + i));
        }
        return n;
      }),
      (t.prototype.getMatrix = function () {
        return this.buffer;
      }),
      (t.prototype.isCropSupported = function () {
        return !0;
      }),
      (t.prototype.crop = function (r, n, i, o) {
        return (e.prototype.crop.call(this, r, n, i, o), this);
      }),
      (t.prototype.isRotateSupported = function () {
        return !0;
      }),
      (t.prototype.rotateCounterClockwise = function () {
        return (this.rotate(-90), this);
      }),
      (t.prototype.rotateCounterClockwise45 = function () {
        return (this.rotate(-45), this);
      }),
      (t.prototype.getTempCanvasElement = function () {
        if (this.tempCanvasElement === null) {
          var r = this.canvas.ownerDocument.createElement("canvas");
          ((r.width = this.canvas.width),
            (r.height = this.canvas.height),
            (this.tempCanvasElement = r));
        }
        return this.tempCanvasElement;
      }),
      (t.prototype.rotate = function (r) {
        var n = this.getTempCanvasElement(),
          i = n.getContext("2d"),
          o = r * t.DEGREE_TO_RADIANS,
          s = this.canvas.width,
          a = this.canvas.height,
          l = Math.ceil(Math.abs(Math.cos(o)) * s + Math.abs(Math.sin(o)) * a),
          c = Math.ceil(Math.abs(Math.sin(o)) * s + Math.abs(Math.cos(o)) * a);
        return (
          (n.width = l),
          (n.height = c),
          i.translate(l / 2, c / 2),
          i.rotate(o),
          i.drawImage(this.canvas, s / -2, a / -2),
          (this.buffer = t.makeBufferFromCanvasImageData(n)),
          this
        );
      }),
      (t.prototype.invert = function () {
        return new Yu(this);
      }),
      (t.DEGREE_TO_RADIANS = Math.PI / 180),
      (t.FRAME_INDEX = !0),
      t
    );
  })($l);
var Pk = (function () {
  function e(t, r, n) {
    ((this.deviceId = t),
      (this.label = r),
      (this.kind = "videoinput"),
      (this.groupId = n || void 0));
  }
  return (
    (e.prototype.toJSON = function () {
      return { kind: this.kind, groupId: this.groupId, deviceId: this.deviceId, label: this.label };
    }),
    e
  );
})();
var Ls = function (e, t, r, n) {
    function i(o) {
      return o instanceof r
        ? o
        : new r(function (s) {
            s(o);
          });
    }
    return new (r || (r = Promise))(function (o, s) {
      function a(u) {
        try {
          c(n.next(u));
        } catch (d) {
          s(d);
        }
      }
      function l(u) {
        try {
          c(n.throw(u));
        } catch (d) {
          s(d);
        }
      }
      function c(u) {
        u.done ? o(u.value) : i(u.value).then(a, l);
      }
      c((n = n.apply(e, t || [])).next());
    });
  },
  Bs = function (e, t) {
    var r = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      },
      n,
      i,
      o,
      s = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return (
      (s.next = a(0)),
      (s.throw = a(1)),
      (s.return = a(2)),
      typeof Symbol === "function" &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function a(c) {
      return function (u) {
        return l([c, u]);
      };
    }
    function l(c) {
      if (n) throw TypeError("Generator is already executing.");
      while ((s && ((s = 0), c[0] && (r = 0)), r))
        try {
          if (
            ((n = 1),
            i &&
              (o =
                c[0] & 2
                  ? i.return
                  : c[0]
                    ? i.throw || ((o = i.return) && o.call(i), 0)
                    : i.next) &&
              !(o = o.call(i, c[1])).done)
          )
            return o;
          if (((i = 0), o)) c = [c[0] & 2, o.value];
          switch (c[0]) {
            case 0:
            case 1:
              o = c;
              break;
            case 4:
              return (r.label++, { value: c[1], done: !1 });
            case 5:
              (r.label++, (i = c[1]), (c = [0]));
              continue;
            case 7:
              ((c = r.ops.pop()), r.trys.pop());
              continue;
            default:
              if (
                ((o = r.trys), !(o = o.length > 0 && o[o.length - 1])) &&
                (c[0] === 6 || c[0] === 2)
              ) {
                r = 0;
                continue;
              }
              if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                r.label = c[1];
                break;
              }
              if (c[0] === 6 && r.label < o[1]) {
                ((r.label = o[1]), (o = c));
                break;
              }
              if (o && r.label < o[2]) {
                ((r.label = o[2]), r.ops.push(c));
                break;
              }
              if (o[2]) r.ops.pop();
              r.trys.pop();
              continue;
          }
          c = t.call(e, r);
        } catch (u) {
          ((c = [6, u]), (i = 0));
        } finally {
          n = o = 0;
        }
      if (c[0] & 5) throw c[1];
      return { value: c[0] ? c[1] : void 0, done: !0 };
    }
  },
  Rne = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  gl = (function () {
    function e(t, r, n) {
      if (r === void 0) r = 500;
      ((this.reader = t),
        (this.timeBetweenScansMillis = r),
        (this._hints = n),
        (this._stopContinuousDecode = !1),
        (this._stopAsyncDecode = !1),
        (this._timeBetweenDecodingAttempts = 0));
    }
    return (
      Object.defineProperty(e.prototype, "hasNavigator", {
        get: function () {
          return typeof navigator < "u";
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "isMediaDevicesSuported", {
        get: function () {
          return this.hasNavigator && !!navigator.mediaDevices;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "canEnumerateDevices", {
        get: function () {
          return !!(this.isMediaDevicesSuported && navigator.mediaDevices.enumerateDevices);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "timeBetweenDecodingAttempts", {
        get: function () {
          return this._timeBetweenDecodingAttempts;
        },
        set: function (t) {
          this._timeBetweenDecodingAttempts = t < 0 ? 0 : t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "hints", {
        get: function () {
          return this._hints;
        },
        set: function (t) {
          this._hints = t || null;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.listVideoInputDevices = function () {
        return Ls(this, void 0, void 0, function () {
          var t, r, n, i, o, s, a, l, c, u, d, h;
          return Bs(this, function (f) {
            switch (f.label) {
              case 0:
                if (!this.hasNavigator)
                  throw Error("Can't enumerate devices, navigator is not present.");
                if (!this.canEnumerateDevices)
                  throw Error("Can't enumerate devices, method not supported.");
                return [4, navigator.mediaDevices.enumerateDevices()];
              case 1:
                ((t = f.sent()), (r = []));
                try {
                  for (n = Rne(t), i = n.next(); !i.done; i = n.next()) {
                    if (
                      ((o = i.value),
                      (s = o.kind === "video" ? "videoinput" : o.kind),
                      s !== "videoinput")
                    )
                      continue;
                    ((a = o.deviceId || o.id),
                      (l = o.label || "Video device ".concat(r.length + 1)),
                      (c = o.groupId),
                      (u = { deviceId: a, label: l, kind: s, groupId: c }),
                      r.push(u));
                  }
                } catch (p) {
                  d = { error: p };
                } finally {
                  try {
                    if (i && !i.done && (h = n.return)) h.call(n);
                  } finally {
                    if (d) throw d.error;
                  }
                }
                return [2, r];
            }
          });
        });
      }),
      (e.prototype.getVideoInputDevices = function () {
        return Ls(this, void 0, void 0, function () {
          var t;
          return Bs(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.listVideoInputDevices()];
              case 1:
                return (
                  (t = r.sent()),
                  [
                    2,
                    t.map(function (n) {
                      return new Pk(n.deviceId, n.label);
                    }),
                  ]
                );
            }
          });
        });
      }),
      (e.prototype.findDeviceById = function (t) {
        return Ls(this, void 0, void 0, function () {
          var r;
          return Bs(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.listVideoInputDevices()];
              case 1:
                if (((r = n.sent()), !r)) return [2, null];
                return [
                  2,
                  r.find(function (i) {
                    return i.deviceId === t;
                  }),
                ];
            }
          });
        });
      }),
      (e.prototype.decodeFromInputVideoDevice = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          return Bs(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.decodeOnceFromVideoDevice(t, r)];
              case 1:
                return [2, n.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromVideoDevice = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          var n, i;
          return Bs(this, function (o) {
            switch (o.label) {
              case 0:
                if ((this.reset(), !t)) n = { facingMode: "environment" };
                else n = { deviceId: { exact: t } };
                return ((i = { video: n }), [4, this.decodeOnceFromConstraints(i, r)]);
              case 1:
                return [2, o.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromConstraints = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          var n;
          return Bs(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, navigator.mediaDevices.getUserMedia(t)];
              case 1:
                return ((n = i.sent()), [4, this.decodeOnceFromStream(n, r)]);
              case 2:
                return [2, i.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromStream = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          var n, i;
          return Bs(this, function (o) {
            switch (o.label) {
              case 0:
                return (this.reset(), [4, this.attachStreamToVideo(t, r)]);
              case 1:
                return ((n = o.sent()), [4, this.decodeOnce(n)]);
              case 2:
                return ((i = o.sent()), [2, i]);
            }
          });
        });
      }),
      (e.prototype.decodeFromInputVideoDeviceContinuously = function (t, r, n) {
        return Ls(this, void 0, void 0, function () {
          return Bs(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.decodeFromVideoDevice(t, r, n)];
              case 1:
                return [2, i.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeFromVideoDevice = function (t, r, n) {
        return Ls(this, void 0, void 0, function () {
          var i, o;
          return Bs(this, function (s) {
            switch (s.label) {
              case 0:
                if (!t) i = { facingMode: "environment" };
                else i = { deviceId: { exact: t } };
                return ((o = { video: i }), [4, this.decodeFromConstraints(o, r, n)]);
              case 1:
                return [2, s.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeFromConstraints = function (t, r, n) {
        return Ls(this, void 0, void 0, function () {
          var i;
          return Bs(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, navigator.mediaDevices.getUserMedia(t)];
              case 1:
                return ((i = o.sent()), [4, this.decodeFromStream(i, r, n)]);
              case 2:
                return [2, o.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeFromStream = function (t, r, n) {
        return Ls(this, void 0, void 0, function () {
          var i;
          return Bs(this, function (o) {
            switch (o.label) {
              case 0:
                return (this.reset(), [4, this.attachStreamToVideo(t, r)]);
              case 1:
                return ((i = o.sent()), [4, this.decodeContinuously(i, n)]);
              case 2:
                return [2, o.sent()];
            }
          });
        });
      }),
      (e.prototype.stopAsyncDecode = function () {
        this._stopAsyncDecode = !0;
      }),
      (e.prototype.stopContinuousDecode = function () {
        this._stopContinuousDecode = !0;
      }),
      (e.prototype.attachStreamToVideo = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          var n;
          return Bs(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (n = this.prepareVideoElement(r)),
                  this.addVideoSource(n, t),
                  (this.videoElement = n),
                  (this.stream = t),
                  [4, this.playVideoOnLoadAsync(n)]
                );
              case 1:
                return (i.sent(), [2, n]);
            }
          });
        });
      }),
      (e.prototype.playVideoOnLoadAsync = function (t) {
        var r = this;
        return new Promise(function (n, i) {
          return r.playVideoOnLoad(t, function () {
            return n();
          });
        });
      }),
      (e.prototype.playVideoOnLoad = function (t, r) {
        var n = this;
        ((this.videoEndedListener = function () {
          return n.stopStreams();
        }),
          (this.videoCanPlayListener = function () {
            return n.tryPlayVideo(t);
          }),
          t.addEventListener("ended", this.videoEndedListener),
          t.addEventListener("canplay", this.videoCanPlayListener),
          t.addEventListener("playing", r),
          this.tryPlayVideo(t));
      }),
      (e.prototype.isVideoPlaying = function (t) {
        return t.currentTime > 0 && !t.paused && !t.ended && t.readyState > 2;
      }),
      (e.prototype.tryPlayVideo = function (t) {
        return Ls(this, void 0, void 0, function () {
          var r;
          return Bs(this, function (n) {
            switch (n.label) {
              case 0:
                if (this.isVideoPlaying(t)) return [2];
                n.label = 1;
              case 1:
                return (n.trys.push([1, 3, , 4]), [4, t.play()]);
              case 2:
                return (n.sent(), [3, 4]);
              case 3:
                return ((r = n.sent()), [3, 4]);
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.prototype.getMediaElement = function (t, r) {
        var n = document.getElementById(t);
        if (!n) throw new hi("element with id '".concat(t, "' not found"));
        if (n.nodeName.toLowerCase() !== r.toLowerCase())
          throw new hi("element with id '".concat(t, "' must be an ").concat(r, " element"));
        return n;
      }),
      (e.prototype.decodeFromImage = function (t, r) {
        if (!t && !r) throw new hi("either imageElement with a src set or an url must be provided");
        if (r && !t) return this.decodeFromImageUrl(r);
        return this.decodeFromImageElement(t);
      }),
      (e.prototype.decodeFromVideo = function (t, r) {
        if (!t && !r) throw new hi("Either an element with a src set or an URL must be provided");
        if (r && !t) return this.decodeFromVideoUrl(r);
        return this.decodeFromVideoElement(t);
      }),
      (e.prototype.decodeFromVideoContinuously = function (t, r, n) {
        if (t === void 0 && r === void 0)
          throw new hi("Either an element with a src set or an URL must be provided");
        if (r && !t) return this.decodeFromVideoUrlContinuously(r, n);
        return this.decodeFromVideoElementContinuously(t, n);
      }),
      (e.prototype.decodeFromImageElement = function (t) {
        if (!t) throw new hi("An image element must be provided.");
        this.reset();
        var r = this.prepareImageElement(t);
        this.imageElement = r;
        var n;
        if (this.isImageLoaded(r)) n = this.decodeOnce(r, !1, !0);
        else n = this._decodeOnLoadImage(r);
        return n;
      }),
      (e.prototype.decodeFromVideoElement = function (t) {
        var r = this._decodeFromVideoElementSetup(t);
        return this._decodeOnLoadVideo(r);
      }),
      (e.prototype.decodeFromVideoElementContinuously = function (t, r) {
        var n = this._decodeFromVideoElementSetup(t);
        return this._decodeOnLoadVideoContinuously(n, r);
      }),
      (e.prototype._decodeFromVideoElementSetup = function (t) {
        if (!t) throw new hi("A video element must be provided.");
        this.reset();
        var r = this.prepareVideoElement(t);
        return ((this.videoElement = r), r);
      }),
      (e.prototype.decodeFromImageUrl = function (t) {
        if (!t) throw new hi("An URL must be provided.");
        this.reset();
        var r = this.prepareImageElement();
        this.imageElement = r;
        var n = this._decodeOnLoadImage(r);
        return ((r.src = t), n);
      }),
      (e.prototype.decodeFromVideoUrl = function (t) {
        if (!t) throw new hi("An URL must be provided.");
        this.reset();
        var r = this.prepareVideoElement(),
          n = this.decodeFromVideoElement(r);
        return ((r.src = t), n);
      }),
      (e.prototype.decodeFromVideoUrlContinuously = function (t, r) {
        if (!t) throw new hi("An URL must be provided.");
        this.reset();
        var n = this.prepareVideoElement(),
          i = this.decodeFromVideoElementContinuously(n, r);
        return ((n.src = t), i);
      }),
      (e.prototype._decodeOnLoadImage = function (t) {
        var r = this;
        return new Promise(function (n, i) {
          ((r.imageLoadedListener = function () {
            return r.decodeOnce(t, !1, !0).then(n, i);
          }),
            t.addEventListener("load", r.imageLoadedListener));
        });
      }),
      (e.prototype._decodeOnLoadVideo = function (t) {
        return Ls(this, void 0, void 0, function () {
          return Bs(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, this.playVideoOnLoadAsync(t)];
              case 1:
                return (r.sent(), [4, this.decodeOnce(t)]);
              case 2:
                return [2, r.sent()];
            }
          });
        });
      }),
      (e.prototype._decodeOnLoadVideoContinuously = function (t, r) {
        return Ls(this, void 0, void 0, function () {
          return Bs(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this.playVideoOnLoadAsync(t)];
              case 1:
                return (n.sent(), this.decodeContinuously(t, r), [2]);
            }
          });
        });
      }),
      (e.prototype.isImageLoaded = function (t) {
        if (!t.complete) return !1;
        if (t.naturalWidth === 0) return !1;
        return !0;
      }),
      (e.prototype.prepareImageElement = function (t) {
        var r;
        if (typeof t > "u")
          ((r = document.createElement("img")), (r.width = 200), (r.height = 200));
        if (typeof t === "string") r = this.getMediaElement(t, "img");
        if (t instanceof HTMLImageElement) r = t;
        return r;
      }),
      (e.prototype.prepareVideoElement = function (t) {
        var r;
        if (!t && typeof document < "u")
          ((r = document.createElement("video")), (r.width = 200), (r.height = 200));
        if (typeof t === "string") r = this.getMediaElement(t, "video");
        if (t instanceof HTMLVideoElement) r = t;
        return (
          r.setAttribute("autoplay", "true"),
          r.setAttribute("muted", "true"),
          r.setAttribute("playsinline", "true"),
          r
        );
      }),
      (e.prototype.decodeOnce = function (t, r, n) {
        var i = this;
        if (r === void 0) r = !0;
        if (n === void 0) n = !0;
        this._stopAsyncDecode = !1;
        var o = function (s, a) {
          if (i._stopAsyncDecode) {
            (a(new Ce("Video stream has ended before any code could be detected.")),
              (i._stopAsyncDecode = void 0));
            return;
          }
          try {
            var l = i.decode(t);
            s(l);
          } catch (h) {
            var c = r && h instanceof Ce,
              u = h instanceof qr || h instanceof De,
              d = u && n;
            if (c || d) return setTimeout(o, i._timeBetweenDecodingAttempts, s, a);
            a(h);
          }
        };
        return new Promise(function (s, a) {
          return o(s, a);
        });
      }),
      (e.prototype.decodeContinuously = function (t, r) {
        var n = this;
        this._stopContinuousDecode = !1;
        var i = function () {
          if (n._stopContinuousDecode) {
            n._stopContinuousDecode = void 0;
            return;
          }
          try {
            var o = n.decode(t);
            (r(o, null), setTimeout(i, n.timeBetweenScansMillis));
          } catch (l) {
            r(null, l);
            var s = l instanceof qr || l instanceof De,
              a = l instanceof Ce;
            if (s || a) setTimeout(i, n._timeBetweenDecodingAttempts);
          }
        };
        i();
      }),
      (e.prototype.decode = function (t) {
        var r = this.createBinaryBitmap(t);
        try {
          return this.decodeBitmap(r);
        } catch (a) {
          if (a instanceof Ce) {
            var n = this.getCaptureCanvas(t),
              i = new cS(n, !1),
              o = new Q3(i),
              s = new Y1(o);
            return this.decodeBitmap(s);
          }
          throw a;
        }
      }),
      (e.prototype.createBinaryBitmap = function (t) {
        var r = this.getCaptureCanvasContext(t),
          n = !1;
        if (t instanceof HTMLVideoElement) (this.drawFrameOnCanvas(t), (n = !0));
        else this.drawImageOnCanvas(t);
        var i = this.getCaptureCanvas(t),
          o = new cS(i, n, this._grayscaleBuffer);
        this._grayscaleBuffer = o.getMatrix();
        var s = new Y3(o);
        return new Y1(s);
      }),
      (e.prototype.getCaptureCanvasContext = function (t) {
        if (!this.captureCanvasContext) {
          var r = this.getCaptureCanvas(t),
            n = void 0;
          try {
            n = r.getContext("2d", { willReadFrequently: !0 });
          } catch (i) {
            n = r.getContext("2d");
          }
          this.captureCanvasContext = n;
        }
        return this.captureCanvasContext;
      }),
      (e.prototype.getCaptureCanvas = function (t) {
        if (!this.captureCanvas) {
          var r = this.createCaptureCanvas(t);
          this.captureCanvas = r;
        }
        return this.captureCanvas;
      }),
      (e.prototype.drawFrameOnCanvas = function (t, r, n) {
        if (r === void 0)
          r = {
            sx: 0,
            sy: 0,
            sWidth: t.videoWidth,
            sHeight: t.videoHeight,
            dx: 0,
            dy: 0,
            dWidth: t.videoWidth,
            dHeight: t.videoHeight,
          };
        if (n === void 0) n = this.captureCanvasContext;
        n.drawImage(t, r.sx, r.sy, r.sWidth, r.sHeight, r.dx, r.dy, r.dWidth, r.dHeight);
      }),
      (e.prototype.drawImageOnCanvas = function (t, r, n) {
        if (r === void 0)
          r = {
            sx: 0,
            sy: 0,
            sWidth: t.naturalWidth,
            sHeight: t.naturalHeight,
            dx: 0,
            dy: 0,
            dWidth: t.naturalWidth,
            dHeight: t.naturalHeight,
          };
        if (n === void 0) n = this.captureCanvasContext;
        n.drawImage(t, r.sx, r.sy, r.sWidth, r.sHeight, r.dx, r.dy, r.dWidth, r.dHeight);
      }),
      (e.prototype.decodeBitmap = function (t) {
        try {
          return this.reader.decode(t, this._hints);
        } finally {
          this.reader.reset();
        }
      }),
      (e.prototype.createCaptureCanvas = function (t) {
        if (typeof document > "u") return (this._destroyCaptureCanvas(), null);
        var r = document.createElement("canvas"),
          n,
          i;
        if (typeof t < "u") {
          if (t instanceof HTMLVideoElement) ((n = t.videoWidth), (i = t.videoHeight));
          else if (t instanceof HTMLImageElement)
            ((n = t.naturalWidth || t.width), (i = t.naturalHeight || t.height));
        }
        return (
          (r.style.width = n + "px"),
          (r.style.height = i + "px"),
          (r.width = n),
          (r.height = i),
          r
        );
      }),
      (e.prototype.stopStreams = function () {
        if (this.stream)
          (this.stream.getVideoTracks().forEach(function (t) {
            return t.stop();
          }),
            (this.stream = void 0));
        if (this._stopAsyncDecode === !1) this.stopAsyncDecode();
        if (this._stopContinuousDecode === !1) this.stopContinuousDecode();
      }),
      (e.prototype.reset = function () {
        (this.stopStreams(),
          this._destroyVideoElement(),
          this._destroyImageElement(),
          this._destroyCaptureCanvas());
      }),
      (e.prototype._destroyVideoElement = function () {
        if (!this.videoElement) return;
        if (typeof this.videoEndedListener < "u")
          this.videoElement.removeEventListener("ended", this.videoEndedListener);
        if (typeof this.videoPlayingEventListener < "u")
          this.videoElement.removeEventListener("playing", this.videoPlayingEventListener);
        if (typeof this.videoCanPlayListener < "u")
          this.videoElement.removeEventListener("loadedmetadata", this.videoCanPlayListener);
        (this.cleanVideoSource(this.videoElement), (this.videoElement = void 0));
      }),
      (e.prototype._destroyImageElement = function () {
        if (!this.imageElement) return;
        if (this.imageLoadedListener !== void 0)
          this.imageElement.removeEventListener("load", this.imageLoadedListener);
        ((this.imageElement.src = void 0),
          this.imageElement.removeAttribute("src"),
          (this.imageElement = void 0));
      }),
      (e.prototype._destroyCaptureCanvas = function () {
        ((this.captureCanvasContext = void 0), (this.captureCanvas = void 0));
      }),
      (e.prototype.addVideoSource = function (t, r) {
        try {
          t.srcObject = r;
        } catch (n) {
          t.src = URL.createObjectURL(r);
        }
      }),
      (e.prototype.cleanVideoSource = function (t) {
        try {
          t.srcObject = null;
        } catch (r) {
          t.src = "";
        }
        this.videoElement.removeAttribute("src");
      }),
      e
    );
  })();
var One = (function () {
    function e(t, r, n, i, o, s) {
      if (n === void 0) n = r == null ? 0 : 8 * r.length;
      if (s === void 0) s = pr.currentTimeMillis();
      if (
        ((this.text = t),
        (this.rawBytes = r),
        (this.numBits = n),
        (this.resultPoints = i),
        (this.format = o),
        (this.timestamp = s),
        (this.text = t),
        (this.rawBytes = r),
        n === void 0 || n === null)
      )
        this.numBits = r === null || r === void 0 ? 0 : 8 * r.length;
      else this.numBits = n;
      if (
        ((this.resultPoints = i),
        (this.format = o),
        (this.resultMetadata = null),
        s === void 0 || s === null)
      )
        this.timestamp = pr.currentTimeMillis();
      else this.timestamp = s;
    }
    return (
      (e.prototype.getText = function () {
        return this.text;
      }),
      (e.prototype.getRawBytes = function () {
        return this.rawBytes;
      }),
      (e.prototype.getNumBits = function () {
        return this.numBits;
      }),
      (e.prototype.getResultPoints = function () {
        return this.resultPoints;
      }),
      (e.prototype.getBarcodeFormat = function () {
        return this.format;
      }),
      (e.prototype.getResultMetadata = function () {
        return this.resultMetadata;
      }),
      (e.prototype.putMetadata = function (t, r) {
        if (this.resultMetadata === null) this.resultMetadata = /*@__PURE__*/ new Map();
        this.resultMetadata.set(t, r);
      }),
      (e.prototype.putAllMetadata = function (t) {
        if (t !== null)
          if (this.resultMetadata === null) this.resultMetadata = t;
          else this.resultMetadata = new Map(t);
      }),
      (e.prototype.addResultPoints = function (t) {
        var r = this.resultPoints;
        if (r === null) this.resultPoints = t;
        else if (t !== null && t.length > 0) {
          var n = Array(r.length + t.length);
          (pr.arraycopy(r, 0, n, 0, r.length),
            pr.arraycopy(t, 0, n, r.length, t.length),
            (this.resultPoints = n));
        }
      }),
      (e.prototype.getTimestamp = function () {
        return this.timestamp;
      }),
      (e.prototype.toString = function () {
        return this.text;
      }),
      e
    );
  })(),
  Xr = One;
var uS;
(function (e) {
  ((e[(e.AZTEC = 0)] = "AZTEC"),
    (e[(e.CODABAR = 1)] = "CODABAR"),
    (e[(e.CODE_39 = 2)] = "CODE_39"),
    (e[(e.CODE_93 = 3)] = "CODE_93"),
    (e[(e.CODE_128 = 4)] = "CODE_128"),
    (e[(e.DATA_MATRIX = 5)] = "DATA_MATRIX"),
    (e[(e.EAN_8 = 6)] = "EAN_8"),
    (e[(e.EAN_13 = 7)] = "EAN_13"),
    (e[(e.ITF = 8)] = "ITF"),
    (e[(e.MAXICODE = 9)] = "MAXICODE"),
    (e[(e.PDF_417 = 10)] = "PDF_417"),
    (e[(e.QR_CODE = 11)] = "QR_CODE"),
    (e[(e.RSS_14 = 12)] = "RSS_14"),
    (e[(e.RSS_EXPANDED = 13)] = "RSS_EXPANDED"),
    (e[(e.UPC_A = 14)] = "UPC_A"),
    (e[(e.UPC_E = 15)] = "UPC_E"),
    (e[(e.UPC_EAN_EXTENSION = 16)] = "UPC_EAN_EXTENSION"),
    (e[(e.MICRO_QR_CODE = 17)] = "MICRO_QR_CODE"));
})(uS || (uS = {}));
var at = uS;
var dS;
(function (e) {
  ((e[(e.OTHER = 0)] = "OTHER"),
    (e[(e.ORIENTATION = 1)] = "ORIENTATION"),
    (e[(e.BYTE_SEGMENTS = 2)] = "BYTE_SEGMENTS"),
    (e[(e.ERROR_CORRECTION_LEVEL = 3)] = "ERROR_CORRECTION_LEVEL"),
    (e[(e.ISSUE_NUMBER = 4)] = "ISSUE_NUMBER"),
    (e[(e.SUGGESTED_PRICE = 5)] = "SUGGESTED_PRICE"),
    (e[(e.POSSIBLE_COUNTRY = 6)] = "POSSIBLE_COUNTRY"),
    (e[(e.UPC_EAN_EXTENSION = 7)] = "UPC_EAN_EXTENSION"),
    (e[(e.PDF417_EXTRA_METADATA = 8)] = "PDF417_EXTRA_METADATA"),
    (e[(e.STRUCTURED_APPEND_SEQUENCE = 9)] = "STRUCTURED_APPEND_SEQUENCE"),
    (e[(e.STRUCTURED_APPEND_PARITY = 10)] = "STRUCTURED_APPEND_PARITY"),
    (e[(e.ERRORS_CORRECTED = 11)] = "ERRORS_CORRECTED"));
})(dS || (dS = {}));
var hn = dS;
var Lne = (function () {
    function e(t, r, n, i, o, s) {
      if (o === void 0) o = -1;
      if (s === void 0) s = -1;
      ((this.rawBytes = t),
        (this.text = r),
        (this.byteSegments = n),
        (this.ecLevel = i),
        (this.structuredAppendSequenceNumber = o),
        (this.structuredAppendParity = s),
        (this.numBits = t === void 0 || t === null ? 0 : 8 * t.length));
    }
    return (
      (e.prototype.getRawBytes = function () {
        return this.rawBytes;
      }),
      (e.prototype.getNumBits = function () {
        return this.numBits;
      }),
      (e.prototype.setNumBits = function (t) {
        this.numBits = t;
      }),
      (e.prototype.getText = function () {
        return this.text;
      }),
      (e.prototype.getByteSegments = function () {
        return this.byteSegments;
      }),
      (e.prototype.getECLevel = function () {
        return this.ecLevel;
      }),
      (e.prototype.getErrorsCorrected = function () {
        return this.errorsCorrected;
      }),
      (e.prototype.setErrorsCorrected = function (t) {
        this.errorsCorrected = t;
      }),
      (e.prototype.getErasures = function () {
        return this.erasures;
      }),
      (e.prototype.setErasures = function (t) {
        this.erasures = t;
      }),
      (e.prototype.getOther = function () {
        return this.other;
      }),
      (e.prototype.setOther = function (t) {
        this.other = t;
      }),
      (e.prototype.hasStructuredAppend = function () {
        return this.structuredAppendParity >= 0 && this.structuredAppendSequenceNumber >= 0;
      }),
      (e.prototype.getStructuredAppendParity = function () {
        return this.structuredAppendParity;
      }),
      (e.prototype.getStructuredAppendSequenceNumber = function () {
        return this.structuredAppendSequenceNumber;
      }),
      e
    );
  })(),
  La = Lne;
var Bne = (function () {
    function e() {}
    return (
      (e.prototype.exp = function (t) {
        return this.expTable[t];
      }),
      (e.prototype.log = function (t) {
        if (t === 0) throw new nt();
        return this.logTable[t];
      }),
      (e.addOrSubtract = function (t, r) {
        return t ^ r;
      }),
      e
    );
  })(),
  c0 = Bne;
var Fne = (function () {
    function e(t, r) {
      if (r.length === 0) throw new nt();
      this.field = t;
      var n = r.length;
      if (n > 1 && r[0] === 0) {
        var i = 1;
        while (i < n && r[i] === 0) i++;
        if (i === n) this.coefficients = Int32Array.from([0]);
        else
          ((this.coefficients = new Int32Array(n - i)),
            pr.arraycopy(r, i, this.coefficients, 0, this.coefficients.length));
      } else this.coefficients = r;
    }
    return (
      (e.prototype.getCoefficients = function () {
        return this.coefficients;
      }),
      (e.prototype.getDegree = function () {
        return this.coefficients.length - 1;
      }),
      (e.prototype.isZero = function () {
        return this.coefficients[0] === 0;
      }),
      (e.prototype.getCoefficient = function (t) {
        return this.coefficients[this.coefficients.length - 1 - t];
      }),
      (e.prototype.evaluateAt = function (t) {
        if (t === 0) return this.getCoefficient(0);
        var r = this.coefficients,
          n;
        if (t === 1) {
          n = 0;
          for (var i = 0, o = r.length; i !== o; i++) {
            var s = r[i];
            n = c0.addOrSubtract(n, s);
          }
          return n;
        }
        n = r[0];
        var a = r.length,
          l = this.field;
        for (var i = 1; i < a; i++) n = c0.addOrSubtract(l.multiply(t, n), r[i]);
        return n;
      }),
      (e.prototype.addOrSubtract = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("GenericGFPolys do not have same GenericGF field");
        if (this.isZero()) return t;
        if (t.isZero()) return this;
        var r = this.coefficients,
          n = t.coefficients;
        if (r.length > n.length) {
          var i = r;
          ((r = n), (n = i));
        }
        var o = new Int32Array(n.length),
          s = n.length - r.length;
        pr.arraycopy(n, 0, o, 0, s);
        for (var a = s; a < n.length; a++) o[a] = c0.addOrSubtract(r[a - s], n[a]);
        return new e(this.field, o);
      }),
      (e.prototype.multiply = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("GenericGFPolys do not have same GenericGF field");
        if (this.isZero() || t.isZero()) return this.field.getZero();
        var r = this.coefficients,
          n = r.length,
          i = t.coefficients,
          o = i.length,
          s = new Int32Array(n + o - 1),
          a = this.field;
        for (var l = 0; l < n; l++) {
          var c = r[l];
          for (var u = 0; u < o; u++) s[l + u] = c0.addOrSubtract(s[l + u], a.multiply(c, i[u]));
        }
        return new e(a, s);
      }),
      (e.prototype.multiplyScalar = function (t) {
        if (t === 0) return this.field.getZero();
        if (t === 1) return this;
        var r = this.coefficients.length,
          n = this.field,
          i = new Int32Array(r),
          o = this.coefficients;
        for (var s = 0; s < r; s++) i[s] = n.multiply(o[s], t);
        return new e(n, i);
      }),
      (e.prototype.multiplyByMonomial = function (t, r) {
        if (t < 0) throw new nt();
        if (r === 0) return this.field.getZero();
        var n = this.coefficients,
          i = n.length,
          o = new Int32Array(i + t),
          s = this.field;
        for (var a = 0; a < i; a++) o[a] = s.multiply(n[a], r);
        return new e(s, o);
      }),
      (e.prototype.divide = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("GenericGFPolys do not have same GenericGF field");
        if (t.isZero()) throw new nt("Divide by 0");
        var r = this.field,
          n = r.getZero(),
          i = this,
          o = t.getCoefficient(t.getDegree()),
          s = r.inverse(o);
        while (i.getDegree() >= t.getDegree() && !i.isZero()) {
          var a = i.getDegree() - t.getDegree(),
            l = r.multiply(i.getCoefficient(i.getDegree()), s),
            c = t.multiplyByMonomial(a, l),
            u = r.buildMonomial(a, l);
          ((n = n.addOrSubtract(u)), (i = i.addOrSubtract(c)));
        }
        return [n, i];
      }),
      (e.prototype.toString = function () {
        var t = "";
        for (var r = this.getDegree(); r >= 0; r--) {
          var n = this.getCoefficient(r);
          if (n !== 0) {
            if (n < 0) ((t += " - "), (n = -n));
            else if (t.length > 0) t += " + ";
            if (r === 0 || n !== 1) {
              var i = this.field.log(n);
              if (i === 0) t += "1";
              else if (i === 1) t += "a";
              else ((t += "a^"), (t += i));
            }
            if (r !== 0)
              if (r === 1) t += "x";
              else ((t += "x^"), (t += r));
          }
        }
        return t;
      }),
      e
    );
  })(),
  Al = Fne;
var Dne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Nne = (function (e) {
    Dne(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "ArithmeticException"), t);
  })(Bn),
  X3 = Nne;
var Pne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  kne = (function (e) {
    Pne(t, e);
    function t(r, n, i) {
      var o = e.call(this) || this;
      ((o.primitive = r), (o.size = n), (o.generatorBase = i));
      var s = new Int32Array(n),
        a = 1;
      for (var l = 0; l < n; l++) if (((s[l] = a), (a *= 2), a >= n)) ((a ^= r), (a &= n - 1));
      o.expTable = s;
      var c = new Int32Array(n);
      for (var l = 0; l < n - 1; l++) c[s[l]] = l;
      return (
        (o.logTable = c),
        (o.zero = new Al(o, Int32Array.from([0]))),
        (o.one = new Al(o, Int32Array.from([1]))),
        o
      );
    }
    return (
      (t.prototype.getZero = function () {
        return this.zero;
      }),
      (t.prototype.getOne = function () {
        return this.one;
      }),
      (t.prototype.buildMonomial = function (r, n) {
        if (r < 0) throw new nt();
        if (n === 0) return this.zero;
        var i = new Int32Array(r + 1);
        return ((i[0] = n), new Al(this, i));
      }),
      (t.prototype.inverse = function (r) {
        if (r === 0) throw new X3();
        return this.expTable[this.size - this.logTable[r] - 1];
      }),
      (t.prototype.multiply = function (r, n) {
        if (r === 0 || n === 0) return 0;
        return this.expTable[(this.logTable[r] + this.logTable[n]) % (this.size - 1)];
      }),
      (t.prototype.getSize = function () {
        return this.size;
      }),
      (t.prototype.getGeneratorBase = function () {
        return this.generatorBase;
      }),
      (t.prototype.toString = function () {
        return "GF(0x" + Ut.toHexString(this.primitive) + "," + this.size + ")";
      }),
      (t.prototype.equals = function (r) {
        return r === this;
      }),
      (t.AZTEC_DATA_12 = new t(4201, 4096, 1)),
      (t.AZTEC_DATA_10 = new t(1033, 1024, 1)),
      (t.AZTEC_DATA_6 = new t(67, 64, 1)),
      (t.AZTEC_PARAM = new t(19, 16, 1)),
      (t.QR_CODE_FIELD_256 = new t(285, 256, 0)),
      (t.DATA_MATRIX_FIELD_256 = new t(301, 256, 1)),
      (t.AZTEC_DATA_8 = t.DATA_MATRIX_FIELD_256),
      (t.MAXICODE_FIELD_64 = t.AZTEC_DATA_6),
      t
    );
  })(c0),
  si = kne;
var Une = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Hne = (function (e) {
    Une(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "ReedSolomonException"), t);
  })(Bn),
  ch = Hne;
var Gne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  zne = (function (e) {
    Gne(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "IllegalStateException"), t);
  })(Bn),
  Xi = zne;
var Vne = (function () {
    function e(t) {
      this.field = t;
    }
    return (
      (e.prototype.decode = function (t, r) {
        this.decodeWithECCount(t, r);
      }),
      (e.prototype.decodeWithECCount = function (t, r) {
        var n = this.field,
          i = new Al(n, t),
          o = new Int32Array(r),
          s = !0;
        for (var a = 0; a < r; a++) {
          var l = i.evaluateAt(n.exp(a + n.getGeneratorBase()));
          if (((o[o.length - 1 - a] = l), l !== 0)) s = !1;
        }
        if (s) return 0;
        var c = new Al(n, o),
          u = this.runEuclideanAlgorithm(n.buildMonomial(r, 1), c, r),
          d = u[0],
          h = u[1],
          f = this.findErrorLocations(d),
          p = this.findErrorMagnitudes(h, f);
        for (var a = 0; a < f.length; a++) {
          var g = t.length - 1 - n.log(f[a]);
          if (g < 0) throw new ch("Bad error location");
          t[g] = si.addOrSubtract(t[g], p[a]);
        }
        return f.length;
      }),
      (e.prototype.runEuclideanAlgorithm = function (t, r, n) {
        if (t.getDegree() < r.getDegree()) {
          var i = t;
          ((t = r), (r = i));
        }
        var o = this.field,
          s = t,
          a = r,
          l = o.getZero(),
          c = o.getOne();
        while (a.getDegree() >= ((n / 2) | 0)) {
          var u = s,
            d = l;
          if (((s = a), (l = c), s.isZero())) throw new ch("r_{i-1} was zero");
          a = u;
          var h = o.getZero(),
            f = s.getCoefficient(s.getDegree()),
            p = o.inverse(f);
          while (a.getDegree() >= s.getDegree() && !a.isZero()) {
            var g = a.getDegree() - s.getDegree(),
              m = o.multiply(a.getCoefficient(a.getDegree()), p);
            ((h = h.addOrSubtract(o.buildMonomial(g, m))),
              (a = a.addOrSubtract(s.multiplyByMonomial(g, m))));
          }
          if (((c = h.multiply(l).addOrSubtract(d)), a.getDegree() >= s.getDegree()))
            throw new Xi("Division algorithm failed to reduce polynomial?");
        }
        var A = c.getCoefficient(0);
        if (A === 0) throw new ch("sigmaTilde(0) was zero");
        var y = o.inverse(A),
          x = c.multiplyScalar(y),
          b = a.multiplyScalar(y);
        return [x, b];
      }),
      (e.prototype.findErrorLocations = function (t) {
        var r = t.getDegree();
        if (r === 1) return Int32Array.from([t.getCoefficient(1)]);
        var n = new Int32Array(r),
          i = 0,
          o = this.field;
        for (var s = 1; s < o.getSize() && i < r; s++)
          if (t.evaluateAt(s) === 0) ((n[i] = o.inverse(s)), i++);
        if (i !== r) throw new ch("Error locator degree does not match number of roots");
        return n;
      }),
      (e.prototype.findErrorMagnitudes = function (t, r) {
        var n = r.length,
          i = new Int32Array(n),
          o = this.field;
        for (var s = 0; s < n; s++) {
          var a = o.inverse(r[s]),
            l = 1;
          for (var c = 0; c < n; c++)
            if (s !== c) {
              var u = o.multiply(r[c], a),
                d = (u & 1) === 0 ? u | 1 : u & -2;
              l = o.multiply(l, d);
            }
          if (((i[s] = o.multiply(t.evaluateAt(a), o.inverse(l))), o.getGeneratorBase() !== 0))
            i[s] = o.multiply(i[s], a);
        }
        return i;
      }),
      e
    );
  })(),
  Ba = Vne;
var Yo;
(function (e) {
  ((e[(e.UPPER = 0)] = "UPPER"),
    (e[(e.LOWER = 1)] = "LOWER"),
    (e[(e.MIXED = 2)] = "MIXED"),
    (e[(e.DIGIT = 3)] = "DIGIT"),
    (e[(e.PUNCT = 4)] = "PUNCT"),
    (e[(e.BINARY = 5)] = "BINARY"));
})(Yo || (Yo = {}));
var Wne = (function () {
    function e() {}
    return (
      (e.prototype.decode = function (t) {
        this.ddata = t;
        var r = t.getBits(),
          n = this.extractBits(r),
          i = this.correctBits(n),
          o = e.convertBoolArrayToByteArray(i),
          s = e.getEncodedData(i),
          a = new La(o, s, null, null);
        return (a.setNumBits(i.length), a);
      }),
      (e.highLevelDecode = function (t) {
        return this.getEncodedData(t);
      }),
      (e.getEncodedData = function (t) {
        var r = t.length,
          n = Yo.UPPER,
          i = Yo.UPPER,
          o = "",
          s = 0;
        while (s < r)
          if (i === Yo.BINARY) {
            if (r - s < 5) break;
            var a = e.readCode(t, s, 5);
            if (((s += 5), a === 0)) {
              if (r - s < 11) break;
              ((a = e.readCode(t, s, 11) + 31), (s += 11));
            }
            for (var l = 0; l < a; l++) {
              if (r - s < 8) {
                s = r;
                break;
              }
              var c = e.readCode(t, s, 8);
              ((o += er.castAsNonUtf8Char(c)), (s += 8));
            }
            i = n;
          } else {
            var u = i === Yo.DIGIT ? 4 : 5;
            if (r - s < u) break;
            var c = e.readCode(t, s, u);
            s += u;
            var d = e.getCharacter(i, c);
            if (d.startsWith("CTRL_")) {
              if (((n = i), (i = e.getTable(d.charAt(5))), d.charAt(6) === "L")) n = i;
            } else ((o += d), (i = n));
          }
        return o;
      }),
      (e.getTable = function (t) {
        switch (t) {
          case "L":
            return Yo.LOWER;
          case "P":
            return Yo.PUNCT;
          case "M":
            return Yo.MIXED;
          case "D":
            return Yo.DIGIT;
          case "B":
            return Yo.BINARY;
          case "U":
          default:
            return Yo.UPPER;
        }
      }),
      (e.getCharacter = function (t, r) {
        switch (t) {
          case Yo.UPPER:
            return e.UPPER_TABLE[r];
          case Yo.LOWER:
            return e.LOWER_TABLE[r];
          case Yo.MIXED:
            return e.MIXED_TABLE[r];
          case Yo.PUNCT:
            return e.PUNCT_TABLE[r];
          case Yo.DIGIT:
            return e.DIGIT_TABLE[r];
          default:
            throw new Xi("Bad table");
        }
      }),
      (e.prototype.correctBits = function (t) {
        var r, n;
        if (this.ddata.getNbLayers() <= 2) ((n = 6), (r = si.AZTEC_DATA_6));
        else if (this.ddata.getNbLayers() <= 8) ((n = 8), (r = si.AZTEC_DATA_8));
        else if (this.ddata.getNbLayers() <= 22) ((n = 10), (r = si.AZTEC_DATA_10));
        else ((n = 12), (r = si.AZTEC_DATA_12));
        var i = this.ddata.getNbDatablocks(),
          o = t.length / n;
        if (o < i) throw new De();
        var s = t.length % n,
          a = new Int32Array(o);
        for (var l = 0; l < o; l++, s += n) a[l] = e.readCode(t, s, n);
        try {
          var c = new Ba(r);
          c.decode(a, o - i);
        } catch (m) {
          throw new De(m);
        }
        var u = (1 << n) - 1,
          d = 0;
        for (var l = 0; l < i; l++) {
          var h = a[l];
          if (h === 0 || h === u) throw new De();
          else if (h === 1 || h === u - 1) d++;
        }
        var f = Array(i * n - d),
          p = 0;
        for (var l = 0; l < i; l++) {
          var h = a[l];
          if (h === 1 || h === u - 1) (f.fill(h > 1, p, p + n - 1), (p += n - 1));
          else for (var g = n - 1; g >= 0; --g) f[p++] = (h & (1 << g)) !== 0;
        }
        return f;
      }),
      (e.prototype.extractBits = function (t) {
        var r = this.ddata.isCompact(),
          n = this.ddata.getNbLayers(),
          i = (r ? 11 : 14) + n * 4,
          o = new Int32Array(i),
          s = Array(this.totalBitsInLayer(n, r));
        if (r) for (var a = 0; a < o.length; a++) o[a] = a;
        else {
          var l = i + 1 + 2 * Ut.truncDivision(Ut.truncDivision(i, 2) - 1, 15),
            c = i / 2,
            u = Ut.truncDivision(l, 2);
          for (var a = 0; a < c; a++) {
            var d = a + Ut.truncDivision(a, 15);
            ((o[c - a - 1] = u - d - 1), (o[c + a] = u + d + 1));
          }
        }
        for (var a = 0, h = 0; a < n; a++) {
          var f = (n - a) * 4 + (r ? 9 : 12),
            p = a * 2,
            g = i - 1 - p;
          for (var m = 0; m < f; m++) {
            var A = m * 2;
            for (var y = 0; y < 2; y++)
              ((s[h + A + y] = t.get(o[p + y], o[p + m])),
                (s[h + 2 * f + A + y] = t.get(o[p + m], o[g - y])),
                (s[h + 4 * f + A + y] = t.get(o[g - y], o[g - m])),
                (s[h + 6 * f + A + y] = t.get(o[g - m], o[p + y])));
          }
          h += f * 8;
        }
        return s;
      }),
      (e.readCode = function (t, r, n) {
        var i = 0;
        for (var o = r; o < r + n; o++) if (((i <<= 1), t[o])) i |= 1;
        return i;
      }),
      (e.readByte = function (t, r) {
        var n = t.length - r;
        if (n >= 8) return e.readCode(t, r, 8);
        return e.readCode(t, r, n) << (8 - n);
      }),
      (e.convertBoolArrayToByteArray = function (t) {
        var r = new Uint8Array((t.length + 7) / 8);
        for (var n = 0; n < r.length; n++) r[n] = e.readByte(t, 8 * n);
        return r;
      }),
      (e.prototype.totalBitsInLayer = function (t, r) {
        return ((r ? 88 : 112) + 16 * t) * t;
      }),
      (e.UPPER_TABLE = [
        "CTRL_PS",
        " ",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "CTRL_LL",
        "CTRL_ML",
        "CTRL_DL",
        "CTRL_BS",
      ]),
      (e.LOWER_TABLE = [
        "CTRL_PS",
        " ",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "CTRL_US",
        "CTRL_ML",
        "CTRL_DL",
        "CTRL_BS",
      ]),
      (e.MIXED_TABLE = [
        "CTRL_PS",
        " ",
        "\x01",
        "\x02",
        "\x03",
        "\x04",
        "\x05",
        "\x06",
        "\x07",
        "\b",
        "\t",
        `
`,
        "\v",
        "\f",
        "\r",
        "\x1B",
        "\x1C",
        "\x1D",
        "\x1E",
        "\x1F",
        "@",
        "\\",
        "^",
        "_",
        "`",
        "|",
        "~",
        "",
        "CTRL_LL",
        "CTRL_UL",
        "CTRL_PL",
        "CTRL_BS",
      ]),
      (e.PUNCT_TABLE = [
        "",
        "\r",
        `\r
`,
        ". ",
        ", ",
        ": ",
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "[",
        "]",
        "{",
        "}",
        "CTRL_UL",
      ]),
      (e.DIGIT_TABLE = [
        "CTRL_PS",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ",",
        ".",
        "CTRL_UL",
        "CTRL_US",
      ]),
      e
    );
  })(),
  R_ = Wne;
var Qne = (function () {
    function e() {}
    return (
      (e.round = function (t) {
        if (isNaN(t)) return 0;
        if (t <= Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
        if (t >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
        return (t + (t < 0 ? -0.5 : 0.5)) | 0;
      }),
      (e.distance = function (t, r, n, i) {
        var o = t - n,
          s = r - i;
        return Math.sqrt(o * o + s * s);
      }),
      (e.sum = function (t) {
        var r = 0;
        for (var n = 0, i = t.length; n !== i; n++) {
          var o = t[n];
          r += o;
        }
        return r;
      }),
      e
    );
  })(),
  Sr = Qne;
var Yne = (function () {
    function e() {}
    return (
      (e.floatToIntBits = function (t) {
        return t;
      }),
      (e.MAX_VALUE = Number.MAX_SAFE_INTEGER),
      e
    );
  })(),
  j3 = Yne;
var Xne = (function () {
    function e(t, r) {
      ((this.x = t), (this.y = r));
    }
    return (
      (e.prototype.getX = function () {
        return this.x;
      }),
      (e.prototype.getY = function () {
        return this.y;
      }),
      (e.prototype.equals = function (t) {
        if (t instanceof e) {
          var r = t;
          return this.x === r.x && this.y === r.y;
        }
        return !1;
      }),
      (e.prototype.hashCode = function () {
        return 31 * j3.floatToIntBits(this.x) + j3.floatToIntBits(this.y);
      }),
      (e.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
      }),
      (e.orderBestPatterns = function (t) {
        var r = this.distance(t[0], t[1]),
          n = this.distance(t[1], t[2]),
          i = this.distance(t[0], t[2]),
          o,
          s,
          a;
        if (n >= r && n >= i) ((s = t[0]), (o = t[1]), (a = t[2]));
        else if (i >= n && i >= r) ((s = t[1]), (o = t[0]), (a = t[2]));
        else ((s = t[2]), (o = t[0]), (a = t[1]));
        if (this.crossProductZ(o, s, a) < 0) {
          var l = o;
          ((o = a), (a = l));
        }
        ((t[0] = o), (t[1] = s), (t[2] = a));
      }),
      (e.distance = function (t, r) {
        return Sr.distance(t.x, t.y, r.x, r.y);
      }),
      (e.crossProductZ = function (t, r, n) {
        var { x: i, y: o } = r;
        return (n.x - i) * (t.y - o) - (n.y - o) * (t.x - i);
      }),
      e
    );
  })(),
  ct = Xne;
var jne = (function () {
    function e(t, r) {
      ((this.bits = t), (this.points = r));
    }
    return (
      (e.prototype.getBits = function () {
        return this.bits;
      }),
      (e.prototype.getPoints = function () {
        return this.points;
      }),
      e
    );
  })(),
  Xu = jne;
var Kne = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  qne = (function (e) {
    Kne(t, e);
    function t(r, n, i, o, s) {
      var a = e.call(this, r, n) || this;
      return ((a.compact = i), (a.nbDatablocks = o), (a.nbLayers = s), a);
    }
    return (
      (t.prototype.getNbLayers = function () {
        return this.nbLayers;
      }),
      (t.prototype.getNbDatablocks = function () {
        return this.nbDatablocks;
      }),
      (t.prototype.isCompact = function () {
        return this.compact;
      }),
      t
    );
  })(Xu),
  hS = qne;
var Zne = (function () {
    function e(t, r, n, i) {
      if (
        ((this.image = t),
        (this.height = t.getHeight()),
        (this.width = t.getWidth()),
        r === void 0 || r === null)
      )
        r = e.INIT_SIZE;
      if (n === void 0 || n === null) n = (t.getWidth() / 2) | 0;
      if (i === void 0 || i === null) i = (t.getHeight() / 2) | 0;
      var o = (r / 2) | 0;
      if (
        ((this.leftInit = n - o),
        (this.rightInit = n + o),
        (this.upInit = i - o),
        (this.downInit = i + o),
        this.upInit < 0 ||
          this.leftInit < 0 ||
          this.downInit >= this.height ||
          this.rightInit >= this.width)
      )
        throw new Ce();
    }
    return (
      (e.prototype.detect = function () {
        var t = this.leftInit,
          r = this.rightInit,
          n = this.upInit,
          i = this.downInit,
          o = !1,
          s = !0,
          a = !1,
          l = !1,
          c = !1,
          u = !1,
          d = !1,
          h = this.width,
          f = this.height;
        while (s) {
          s = !1;
          var p = !0;
          while ((p || !l) && r < h)
            if (((p = this.containsBlackPoint(n, i, r, !1)), p)) (r++, (s = !0), (l = !0));
            else if (!l) r++;
          if (r >= h) {
            o = !0;
            break;
          }
          var g = !0;
          while ((g || !c) && i < f)
            if (((g = this.containsBlackPoint(t, r, i, !0)), g)) (i++, (s = !0), (c = !0));
            else if (!c) i++;
          if (i >= f) {
            o = !0;
            break;
          }
          var m = !0;
          while ((m || !u) && t >= 0)
            if (((m = this.containsBlackPoint(n, i, t, !1)), m)) (t--, (s = !0), (u = !0));
            else if (!u) t--;
          if (t < 0) {
            o = !0;
            break;
          }
          var A = !0;
          while ((A || !d) && n >= 0)
            if (((A = this.containsBlackPoint(t, r, n, !0)), A)) (n--, (s = !0), (d = !0));
            else if (!d) n--;
          if (n < 0) {
            o = !0;
            break;
          }
          if (s) a = !0;
        }
        if (!o && a) {
          var y = r - t,
            x = null;
          for (var b = 1; x === null && b < y; b++)
            x = this.getBlackPointOnSegment(t, i - b, t + b, i);
          if (x == null) throw new Ce();
          var v = null;
          for (var b = 1; v === null && b < y; b++)
            v = this.getBlackPointOnSegment(t, n + b, t + b, n);
          if (v == null) throw new Ce();
          var _ = null;
          for (var b = 1; _ === null && b < y; b++)
            _ = this.getBlackPointOnSegment(r, n + b, r - b, n);
          if (_ == null) throw new Ce();
          var w = null;
          for (var b = 1; w === null && b < y; b++)
            w = this.getBlackPointOnSegment(r, i - b, r - b, i);
          if (w == null) throw new Ce();
          return this.centerEdges(w, x, _, v);
        } else throw new Ce();
      }),
      (e.prototype.getBlackPointOnSegment = function (t, r, n, i) {
        var o = Sr.round(Sr.distance(t, r, n, i)),
          s = (n - t) / o,
          a = (i - r) / o,
          l = this.image;
        for (var c = 0; c < o; c++) {
          var u = Sr.round(t + c * s),
            d = Sr.round(r + c * a);
          if (l.get(u, d)) return new ct(u, d);
        }
        return null;
      }),
      (e.prototype.centerEdges = function (t, r, n, i) {
        var o = t.getX(),
          s = t.getY(),
          a = r.getX(),
          l = r.getY(),
          c = n.getX(),
          u = n.getY(),
          d = i.getX(),
          h = i.getY(),
          f = e.CORR;
        if (o < this.width / 2)
          return [
            new ct(d - f, h + f),
            new ct(a + f, l + f),
            new ct(c - f, u - f),
            new ct(o + f, s - f),
          ];
        else
          return [
            new ct(d + f, h + f),
            new ct(a + f, l - f),
            new ct(c - f, u + f),
            new ct(o - f, s - f),
          ];
      }),
      (e.prototype.containsBlackPoint = function (t, r, n, i) {
        var o = this.image;
        if (i) {
          for (var s = t; s <= r; s++) if (o.get(s, n)) return !0;
        } else for (var a = t; a <= r; a++) if (o.get(n, a)) return !0;
        return !1;
      }),
      (e.INIT_SIZE = 10),
      (e.CORR = 1),
      e
    );
  })(),
  j1 = Zne;
var $ne = (function () {
    function e() {}
    return (
      (e.checkAndNudgePoints = function (t, r) {
        var n = t.getWidth(),
          i = t.getHeight(),
          o = !0;
        for (var s = 0; s < r.length && o; s += 2) {
          var a = Math.floor(r[s]),
            l = Math.floor(r[s + 1]);
          if (a < -1 || a > n || l < -1 || l > i) throw new Ce();
          if (((o = !1), a === -1)) ((r[s] = 0), (o = !0));
          else if (a === n) ((r[s] = n - 1), (o = !0));
          if (l === -1) ((r[s + 1] = 0), (o = !0));
          else if (l === i) ((r[s + 1] = i - 1), (o = !0));
        }
        o = !0;
        for (var s = r.length - 2; s >= 0 && o; s -= 2) {
          var a = Math.floor(r[s]),
            l = Math.floor(r[s + 1]);
          if (a < -1 || a > n || l < -1 || l > i) throw new Ce();
          if (((o = !1), a === -1)) ((r[s] = 0), (o = !0));
          else if (a === n) ((r[s] = n - 1), (o = !0));
          if (l === -1) ((r[s + 1] = 0), (o = !0));
          else if (l === i) ((r[s + 1] = i - 1), (o = !0));
        }
      }),
      e
    );
  })(),
  O_ = $ne;
var Jne = (function () {
    function e(t, r, n, i, o, s, a, l, c) {
      ((this.a11 = t),
        (this.a21 = r),
        (this.a31 = n),
        (this.a12 = i),
        (this.a22 = o),
        (this.a32 = s),
        (this.a13 = a),
        (this.a23 = l),
        (this.a33 = c));
    }
    return (
      (e.quadrilateralToQuadrilateral = function (t, r, n, i, o, s, a, l, c, u, d, h, f, p, g, m) {
        var A = e.quadrilateralToSquare(t, r, n, i, o, s, a, l),
          y = e.squareToQuadrilateral(c, u, d, h, f, p, g, m);
        return y.times(A);
      }),
      (e.prototype.transformPoints = function (t) {
        var r = t.length,
          n = this.a11,
          i = this.a12,
          o = this.a13,
          s = this.a21,
          a = this.a22,
          l = this.a23,
          c = this.a31,
          u = this.a32,
          d = this.a33;
        for (var h = 0; h < r; h += 2) {
          var f = t[h],
            p = t[h + 1],
            g = o * f + l * p + d;
          ((t[h] = (n * f + s * p + c) / g), (t[h + 1] = (i * f + a * p + u) / g));
        }
      }),
      (e.prototype.transformPointsWithValues = function (t, r) {
        var n = this.a11,
          i = this.a12,
          o = this.a13,
          s = this.a21,
          a = this.a22,
          l = this.a23,
          c = this.a31,
          u = this.a32,
          d = this.a33,
          h = t.length;
        for (var f = 0; f < h; f++) {
          var p = t[f],
            g = r[f],
            m = o * p + l * g + d;
          ((t[f] = (n * p + s * g + c) / m), (r[f] = (i * p + a * g + u) / m));
        }
      }),
      (e.squareToQuadrilateral = function (t, r, n, i, o, s, a, l) {
        var c = t - n + o - a,
          u = r - i + s - l;
        if (c === 0 && u === 0) return new e(n - t, o - n, t, i - r, s - i, r, 0, 0, 1);
        else {
          var d = n - o,
            h = a - o,
            f = i - s,
            p = l - s,
            g = d * p - h * f,
            m = (c * p - h * u) / g,
            A = (d * u - c * f) / g;
          return new e(n - t + m * n, a - t + A * a, t, i - r + m * i, l - r + A * l, r, m, A, 1);
        }
      }),
      (e.quadrilateralToSquare = function (t, r, n, i, o, s, a, l) {
        return e.squareToQuadrilateral(t, r, n, i, o, s, a, l).buildAdjoint();
      }),
      (e.prototype.buildAdjoint = function () {
        return new e(
          this.a22 * this.a33 - this.a23 * this.a32,
          this.a23 * this.a31 - this.a21 * this.a33,
          this.a21 * this.a32 - this.a22 * this.a31,
          this.a13 * this.a32 - this.a12 * this.a33,
          this.a11 * this.a33 - this.a13 * this.a31,
          this.a12 * this.a31 - this.a11 * this.a32,
          this.a12 * this.a23 - this.a13 * this.a22,
          this.a13 * this.a21 - this.a11 * this.a23,
          this.a11 * this.a22 - this.a12 * this.a21,
        );
      }),
      (e.prototype.times = function (t) {
        return new e(
          this.a11 * t.a11 + this.a21 * t.a12 + this.a31 * t.a13,
          this.a11 * t.a21 + this.a21 * t.a22 + this.a31 * t.a23,
          this.a11 * t.a31 + this.a21 * t.a32 + this.a31 * t.a33,
          this.a12 * t.a11 + this.a22 * t.a12 + this.a32 * t.a13,
          this.a12 * t.a21 + this.a22 * t.a22 + this.a32 * t.a23,
          this.a12 * t.a31 + this.a22 * t.a32 + this.a32 * t.a33,
          this.a13 * t.a11 + this.a23 * t.a12 + this.a33 * t.a13,
          this.a13 * t.a21 + this.a23 * t.a22 + this.a33 * t.a23,
          this.a13 * t.a31 + this.a23 * t.a32 + this.a33 * t.a33,
        );
      }),
      e
    );
  })(),
  u0 = Jne;
var eie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  tie = (function (e) {
    eie(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.sampleGrid = function (r, n, i, o, s, a, l, c, u, d, h, f, p, g, m, A, y, x, b) {
        var v = u0.quadrilateralToQuadrilateral(o, s, a, l, c, u, d, h, f, p, g, m, A, y, x, b);
        return this.sampleGridWithTransform(r, n, i, v);
      }),
      (t.prototype.sampleGridWithTransform = function (r, n, i, o) {
        if (n <= 0 || i <= 0) throw new Ce();
        var s = new bn(n, i),
          a = new Float32Array(2 * n);
        for (var l = 0; l < i; l++) {
          var c = a.length,
            u = l + 0.5;
          for (var d = 0; d < c; d += 2) ((a[d] = d / 2 + 0.5), (a[d + 1] = u));
          (o.transformPoints(a), O_.checkAndNudgePoints(r, a));
          try {
            for (var d = 0; d < c; d += 2) if (r.get(a[d] | 0, a[d + 1] | 0)) s.set(d / 2, l);
          } catch (h) {
            throw new Ce();
          }
        }
        return s;
      }),
      t
    );
  })(O_),
  fS = tie;
var rie = (function () {
    function e() {}
    return (
      (e.setGridSampler = function (t) {
        e.gridSampler = t;
      }),
      (e.getInstance = function () {
        return e.gridSampler;
      }),
      (e.gridSampler = new fS()),
      e
    );
  })(),
  ju = rie;
var Fs = (function () {
  function e(t, r) {
    ((this.x = t), (this.y = r));
  }
  return (
    (e.prototype.toResultPoint = function () {
      return new ct(this.getX(), this.getY());
    }),
    (e.prototype.getX = function () {
      return this.x;
    }),
    (e.prototype.getY = function () {
      return this.y;
    }),
    e
  );
})();
var nie = (function () {
    function e(t) {
      ((this.EXPECTED_CORNER_BITS = new Int32Array([3808, 476, 2107, 1799])), (this.image = t));
    }
    return (
      (e.prototype.detect = function () {
        return this.detectMirror(!1);
      }),
      (e.prototype.detectMirror = function (t) {
        var r = this.getMatrixCenter(),
          n = this.getBullsEyeCorners(r);
        if (t) {
          var i = n[0];
          ((n[0] = n[2]), (n[2] = i));
        }
        this.extractParameters(n);
        var o = this.sampleGrid(
            this.image,
            n[this.shift % 4],
            n[(this.shift + 1) % 4],
            n[(this.shift + 2) % 4],
            n[(this.shift + 3) % 4],
          ),
          s = this.getMatrixCornerPoints(n);
        return new hS(o, s, this.compact, this.nbDataBlocks, this.nbLayers);
      }),
      (e.prototype.extractParameters = function (t) {
        if (
          !this.isValidPoint(t[0]) ||
          !this.isValidPoint(t[1]) ||
          !this.isValidPoint(t[2]) ||
          !this.isValidPoint(t[3])
        )
          throw new Ce();
        var r = 2 * this.nbCenterLayers,
          n = new Int32Array([
            this.sampleLine(t[0], t[1], r),
            this.sampleLine(t[1], t[2], r),
            this.sampleLine(t[2], t[3], r),
            this.sampleLine(t[3], t[0], r),
          ]);
        this.shift = this.getRotation(n, r);
        var i = 0;
        for (var o = 0; o < 4; o++) {
          var s = n[(this.shift + o) % 4];
          if (this.compact) ((i <<= 7), (i += (s >> 1) & 127));
          else ((i <<= 10), (i += ((s >> 2) & 992) + ((s >> 1) & 31)));
        }
        var a = this.getCorrectedParameterData(i, this.compact);
        if (this.compact) ((this.nbLayers = (a >> 6) + 1), (this.nbDataBlocks = (a & 63) + 1));
        else ((this.nbLayers = (a >> 11) + 1), (this.nbDataBlocks = (a & 2047) + 1));
      }),
      (e.prototype.getRotation = function (t, r) {
        var n = 0;
        (t.forEach(function (o, s, a) {
          var l = ((o >> (r - 2)) << 1) + (o & 1);
          n = (n << 3) + l;
        }),
          (n = ((n & 1) << 11) + (n >> 1)));
        for (var i = 0; i < 4; i++)
          if (Ut.bitCount(n ^ this.EXPECTED_CORNER_BITS[i]) <= 2) return i;
        throw new Ce();
      }),
      (e.prototype.getCorrectedParameterData = function (t, r) {
        var n, i;
        if (r) ((n = 7), (i = 2));
        else ((n = 10), (i = 4));
        var o = n - i,
          s = new Int32Array(n);
        for (var a = n - 1; a >= 0; --a) ((s[a] = t & 15), (t >>= 4));
        try {
          var l = new Ba(si.AZTEC_PARAM);
          l.decode(s, o);
        } catch (u) {
          throw new Ce();
        }
        var c = 0;
        for (var a = 0; a < i; a++) c = (c << 4) + s[a];
        return c;
      }),
      (e.prototype.getBullsEyeCorners = function (t) {
        var r = t,
          n = t,
          i = t,
          o = t,
          s = !0;
        for (this.nbCenterLayers = 1; this.nbCenterLayers < 9; this.nbCenterLayers++) {
          var a = this.getFirstDifferent(r, s, 1, -1),
            l = this.getFirstDifferent(n, s, 1, 1),
            c = this.getFirstDifferent(i, s, -1, 1),
            u = this.getFirstDifferent(o, s, -1, -1);
          if (this.nbCenterLayers > 2) {
            var d =
              (this.distancePoint(u, a) * this.nbCenterLayers) /
              (this.distancePoint(o, r) * (this.nbCenterLayers + 2));
            if (d < 0.75 || d > 1.25 || !this.isWhiteOrBlackRectangle(a, l, c, u)) break;
          }
          ((r = a), (n = l), (i = c), (o = u), (s = !s));
        }
        if (this.nbCenterLayers !== 5 && this.nbCenterLayers !== 7) throw new Ce();
        this.compact = this.nbCenterLayers === 5;
        var h = new ct(r.getX() + 0.5, r.getY() - 0.5),
          f = new ct(n.getX() + 0.5, n.getY() + 0.5),
          p = new ct(i.getX() - 0.5, i.getY() + 0.5),
          g = new ct(o.getX() - 0.5, o.getY() - 0.5);
        return this.expandSquare(
          [h, f, p, g],
          2 * this.nbCenterLayers - 3,
          2 * this.nbCenterLayers,
        );
      }),
      (e.prototype.getMatrixCenter = function () {
        var t, r, n, i;
        try {
          var o = new j1(this.image).detect();
          ((t = o[0]), (r = o[1]), (n = o[2]), (i = o[3]));
        } catch (u) {
          var s = this.image.getWidth() / 2,
            a = this.image.getHeight() / 2;
          ((t = this.getFirstDifferent(new Fs(s + 7, a - 7), !1, 1, -1).toResultPoint()),
            (r = this.getFirstDifferent(new Fs(s + 7, a + 7), !1, 1, 1).toResultPoint()),
            (n = this.getFirstDifferent(new Fs(s - 7, a + 7), !1, -1, 1).toResultPoint()),
            (i = this.getFirstDifferent(new Fs(s - 7, a - 7), !1, -1, -1).toResultPoint()));
        }
        var l = Sr.round((t.getX() + i.getX() + r.getX() + n.getX()) / 4),
          c = Sr.round((t.getY() + i.getY() + r.getY() + n.getY()) / 4);
        try {
          var o = new j1(this.image, 15, l, c).detect();
          ((t = o[0]), (r = o[1]), (n = o[2]), (i = o[3]));
        } catch (u) {
          ((t = this.getFirstDifferent(new Fs(l + 7, c - 7), !1, 1, -1).toResultPoint()),
            (r = this.getFirstDifferent(new Fs(l + 7, c + 7), !1, 1, 1).toResultPoint()),
            (n = this.getFirstDifferent(new Fs(l - 7, c + 7), !1, -1, 1).toResultPoint()),
            (i = this.getFirstDifferent(new Fs(l - 7, c - 7), !1, -1, -1).toResultPoint()));
        }
        return (
          (l = Sr.round((t.getX() + i.getX() + r.getX() + n.getX()) / 4)),
          (c = Sr.round((t.getY() + i.getY() + r.getY() + n.getY()) / 4)),
          new Fs(l, c)
        );
      }),
      (e.prototype.getMatrixCornerPoints = function (t) {
        return this.expandSquare(t, 2 * this.nbCenterLayers, this.getDimension());
      }),
      (e.prototype.sampleGrid = function (t, r, n, i, o) {
        var s = ju.getInstance(),
          a = this.getDimension(),
          l = a / 2 - this.nbCenterLayers,
          c = a / 2 + this.nbCenterLayers;
        return s.sampleGrid(
          t,
          a,
          a,
          l,
          l,
          c,
          l,
          c,
          c,
          l,
          c,
          r.getX(),
          r.getY(),
          n.getX(),
          n.getY(),
          i.getX(),
          i.getY(),
          o.getX(),
          o.getY(),
        );
      }),
      (e.prototype.sampleLine = function (t, r, n) {
        var i = 0,
          o = this.distanceResultPoint(t, r),
          s = o / n,
          a = t.getX(),
          l = t.getY(),
          c = (s * (r.getX() - t.getX())) / o,
          u = (s * (r.getY() - t.getY())) / o;
        for (var d = 0; d < n; d++)
          if (this.image.get(Sr.round(a + d * c), Sr.round(l + d * u))) i |= 1 << (n - d - 1);
        return i;
      }),
      (e.prototype.isWhiteOrBlackRectangle = function (t, r, n, i) {
        var o = 3;
        ((t = new Fs(t.getX() - o, t.getY() + o)),
          (r = new Fs(r.getX() - o, r.getY() - o)),
          (n = new Fs(n.getX() + o, n.getY() - o)),
          (i = new Fs(i.getX() + o, i.getY() + o)));
        var s = this.getColor(i, t);
        if (s === 0) return !1;
        var a = this.getColor(t, r);
        if (a !== s) return !1;
        if (((a = this.getColor(r, n)), a !== s)) return !1;
        return ((a = this.getColor(n, i)), a === s);
      }),
      (e.prototype.getColor = function (t, r) {
        var n = this.distancePoint(t, r),
          i = (r.getX() - t.getX()) / n,
          o = (r.getY() - t.getY()) / n,
          s = 0,
          a = t.getX(),
          l = t.getY(),
          c = this.image.get(t.getX(), t.getY()),
          u = Math.ceil(n);
        for (var d = 0; d < u; d++)
          if (((a += i), (l += o), this.image.get(Sr.round(a), Sr.round(l)) !== c)) s++;
        var h = s / n;
        if (h > 0.1 && h < 0.9) return 0;
        return h <= 0.1 === c ? 1 : -1;
      }),
      (e.prototype.getFirstDifferent = function (t, r, n, i) {
        var o = t.getX() + n,
          s = t.getY() + i;
        while (this.isValid(o, s) && this.image.get(o, s) === r) ((o += n), (s += i));
        ((o -= n), (s -= i));
        while (this.isValid(o, s) && this.image.get(o, s) === r) o += n;
        o -= n;
        while (this.isValid(o, s) && this.image.get(o, s) === r) s += i;
        return ((s -= i), new Fs(o, s));
      }),
      (e.prototype.expandSquare = function (t, r, n) {
        var i = n / (2 * r),
          o = t[0].getX() - t[2].getX(),
          s = t[0].getY() - t[2].getY(),
          a = (t[0].getX() + t[2].getX()) / 2,
          l = (t[0].getY() + t[2].getY()) / 2,
          c = new ct(a + i * o, l + i * s),
          u = new ct(a - i * o, l - i * s);
        ((o = t[1].getX() - t[3].getX()),
          (s = t[1].getY() - t[3].getY()),
          (a = (t[1].getX() + t[3].getX()) / 2),
          (l = (t[1].getY() + t[3].getY()) / 2));
        var d = new ct(a + i * o, l + i * s),
          h = new ct(a - i * o, l - i * s),
          f = [c, d, u, h];
        return f;
      }),
      (e.prototype.isValid = function (t, r) {
        return t >= 0 && t < this.image.getWidth() && r > 0 && r < this.image.getHeight();
      }),
      (e.prototype.isValidPoint = function (t) {
        var r = Sr.round(t.getX()),
          n = Sr.round(t.getY());
        return this.isValid(r, n);
      }),
      (e.prototype.distancePoint = function (t, r) {
        return Sr.distance(t.getX(), t.getY(), r.getX(), r.getY());
      }),
      (e.prototype.distanceResultPoint = function (t, r) {
        return Sr.distance(t.getX(), t.getY(), r.getX(), r.getY());
      }),
      (e.prototype.getDimension = function () {
        if (this.compact) return 4 * this.nbLayers + 11;
        if (this.nbLayers <= 4) return 4 * this.nbLayers + 15;
        return 4 * this.nbLayers + 2 * (Ut.truncDivision(this.nbLayers - 4, 8) + 1) + 15;
      }),
      e
    );
  })(),
  pS = nie;
var iie = (function () {
    function e() {}
    return (
      (e.prototype.decode = function (t, r) {
        if (r === void 0) r = null;
        var n = null,
          i = new pS(t.getBlackMatrix()),
          o = null,
          s = null;
        try {
          var a = i.detectMirror(!1);
          ((o = a.getPoints()), this.reportFoundResultPoints(r, o), (s = new R_().decode(a)));
        } catch (d) {
          n = d;
        }
        if (s == null)
          try {
            var a = i.detectMirror(!0);
            ((o = a.getPoints()), this.reportFoundResultPoints(r, o), (s = new R_().decode(a)));
          } catch (d) {
            if (n != null) throw n;
            throw d;
          }
        var l = new Xr(
            s.getText(),
            s.getRawBytes(),
            s.getNumBits(),
            o,
            at.AZTEC,
            pr.currentTimeMillis(),
          ),
          c = s.getByteSegments();
        if (c != null) l.putMetadata(hn.BYTE_SEGMENTS, c);
        var u = s.getECLevel();
        if (u != null) l.putMetadata(hn.ERROR_CORRECTION_LEVEL, u);
        return l;
      }),
      (e.prototype.reportFoundResultPoints = function (t, r) {
        if (t != null) {
          var n = t.get(nr.NEED_RESULT_POINT_CALLBACK);
          if (n != null)
            r.forEach(function (i, o, s) {
              n.foundPossibleResultPoint(i);
            });
        }
      }),
      (e.prototype.reset = function () {}),
      e
    );
  })(),
  uh = iie;
var oie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  k5e = (function (e) {
    oie(t, e);
    function t(r) {
      if (r === void 0) r = 500;
      return e.call(this, new uh(), r) || this;
    }
    return t;
  })(gl);
var sie = (function () {
    function e() {}
    return (
      (e.prototype.decode = function (t, r) {
        try {
          return this.doDecode(t, r);
        } catch (d) {
          var n = r && r.get(nr.TRY_HARDER) === !0;
          if (n && t.isRotateSupported()) {
            var i = t.rotateCounterClockwise(),
              o = this.doDecode(i, r),
              s = o.getResultMetadata(),
              a = 270;
            if (s !== null && s.get(hn.ORIENTATION) === !0) a = a + (s.get(hn.ORIENTATION) % 360);
            o.putMetadata(hn.ORIENTATION, a);
            var l = o.getResultPoints();
            if (l !== null) {
              var c = i.getHeight();
              for (var u = 0; u < l.length; u++) l[u] = new ct(c - l[u].getY() - 1, l[u].getX());
            }
            return o;
          } else throw new Ce();
        }
      }),
      (e.prototype.reset = function () {}),
      (e.prototype.doDecode = function (t, r) {
        var n = t.getWidth(),
          i = t.getHeight(),
          o = new $n(n),
          s = r && r.get(nr.TRY_HARDER) === !0,
          a = Math.max(1, i >> (s ? 8 : 5)),
          l;
        if (s) l = i;
        else l = 25;
        var c = Math.trunc(i / 2);
        for (var u = 0; u < l; u++) {
          var d = Math.trunc((u + 1) / 2),
            h = (u & 1) === 0,
            f = c + a * (h ? d : -d);
          if (f < 0 || f >= i) break;
          try {
            o = t.getBlackRow(f, o);
          } catch (y) {
            continue;
          }
          var p = function (y) {
              if (y === 1) {
                if ((o.reverse(), r && r.get(nr.NEED_RESULT_POINT_CALLBACK) === !0)) {
                  var x = /*@__PURE__*/ new Map();
                  (r.forEach(function (_, w) {
                    return x.set(w, _);
                  }),
                    x.delete(nr.NEED_RESULT_POINT_CALLBACK),
                    (r = x));
                }
              }
              try {
                var b = g.decodeRow(f, o, r);
                if (y === 1) {
                  b.putMetadata(hn.ORIENTATION, 180);
                  var v = b.getResultPoints();
                  if (v !== null)
                    ((v[0] = new ct(n - v[0].getX() - 1, v[0].getY())),
                      (v[1] = new ct(n - v[1].getX() - 1, v[1].getY())));
                }
                return { value: b };
              } catch (_) {}
            },
            g = this;
          for (var m = 0; m < 2; m++) {
            var A = p(m);
            if (typeof A === "object") return A.value;
          }
        }
        throw new Ce();
      }),
      (e.recordPattern = function (t, r, n) {
        var i = n.length;
        for (var o = 0; o < i; o++) n[o] = 0;
        var s = t.getSize();
        if (r >= s) throw new Ce();
        var a = !t.get(r),
          l = 0,
          c = r;
        while (c < s) {
          if (t.get(c) !== a) n[l]++;
          else if (++l === i) break;
          else ((n[l] = 1), (a = !a));
          c++;
        }
        if (!(l === i || (l === i - 1 && c === s))) throw new Ce();
      }),
      (e.recordPatternInReverse = function (t, r, n) {
        var i = n.length,
          o = t.get(r);
        while (r > 0 && i >= 0) if (t.get(--r) !== o) (i--, (o = !o));
        if (i >= 0) throw new Ce();
        e.recordPattern(t, r + 1, n);
      }),
      (e.patternMatchVariance = function (t, r, n) {
        var i = t.length,
          o = 0,
          s = 0;
        for (var a = 0; a < i; a++) ((o += t[a]), (s += r[a]));
        if (o < s) return Number.POSITIVE_INFINITY;
        var l = o / s;
        n *= l;
        var c = 0;
        for (var u = 0; u < i; u++) {
          var d = t[u],
            h = r[u] * l,
            f = d > h ? d - h : h - d;
          if (f > n) return Number.POSITIVE_INFINITY;
          c += f;
        }
        return c / o;
      }),
      e
    );
  })(),
  En = sie;
var aie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  lie = (function (e) {
    aie(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.findStartPattern = function (r) {
        var n = r.getSize(),
          i = r.getNextSet(0),
          o = 0,
          s = Int32Array.from([0, 0, 0, 0, 0, 0]),
          a = i,
          l = !1,
          c = 6;
        for (var u = i; u < n; u++)
          if (r.get(u) !== l) s[o]++;
          else {
            if (o === c - 1) {
              var d = t.MAX_AVG_VARIANCE,
                h = -1;
              for (var f = t.CODE_START_A; f <= t.CODE_START_C; f++) {
                var p = En.patternMatchVariance(s, t.CODE_PATTERNS[f], t.MAX_INDIVIDUAL_VARIANCE);
                if (p < d) ((d = p), (h = f));
              }
              if (h >= 0 && r.isRange(Math.max(0, a - (u - a) / 2), a, !1))
                return Int32Array.from([a, u, h]);
              ((a += s[0] + s[1]), (s = s.slice(2, s.length)), (s[o - 1] = 0), (s[o] = 0), o--);
            } else o++;
            ((s[o] = 1), (l = !l));
          }
        throw new Ce();
      }),
      (t.decodeCode = function (r, n, i) {
        En.recordPattern(r, i, n);
        var o = t.MAX_AVG_VARIANCE,
          s = -1;
        for (var a = 0; a < t.CODE_PATTERNS.length; a++) {
          var l = t.CODE_PATTERNS[a],
            c = this.patternMatchVariance(n, l, t.MAX_INDIVIDUAL_VARIANCE);
          if (c < o) ((o = c), (s = a));
        }
        if (s >= 0) return s;
        else throw new Ce();
      }),
      (t.prototype.decodeRow = function (r, n, i) {
        var o = i && i.get(nr.ASSUME_GS1) === !0,
          s = t.findStartPattern(n),
          a = s[2],
          l = 0,
          c = new Uint8Array(20);
        c[l++] = a;
        var u;
        switch (a) {
          case t.CODE_START_A:
            u = t.CODE_CODE_A;
            break;
          case t.CODE_START_B:
            u = t.CODE_CODE_B;
            break;
          case t.CODE_START_C:
            u = t.CODE_CODE_C;
            break;
          default:
            throw new De();
        }
        var d = !1,
          h = !1,
          f = "",
          p = s[0],
          g = s[1],
          m = Int32Array.from([0, 0, 0, 0, 0, 0]),
          A = 0,
          y = 0,
          x = a,
          b = 0,
          v = !0,
          _ = !1,
          w = !1;
        while (!d) {
          var S = h;
          if (((h = !1), (A = y), (y = t.decodeCode(n, m, g)), (c[l++] = y), y !== t.CODE_STOP))
            v = !0;
          if (y !== t.CODE_STOP) (b++, (x += b * y));
          switch (
            ((p = g),
            (g += m.reduce(function (z, X) {
              return z + X;
            }, 0)),
            y)
          ) {
            case t.CODE_START_A:
            case t.CODE_START_B:
            case t.CODE_START_C:
              throw new De();
          }
          switch (u) {
            case t.CODE_CODE_A:
              if (y < 64) {
                if (w === _) f += String.fromCharCode(32 + y);
                else f += String.fromCharCode(32 + y + 128);
                w = !1;
              } else if (y < 96) {
                if (w === _) f += String.fromCharCode(y - 64);
                else f += String.fromCharCode(y + 64);
                w = !1;
              } else {
                if (y !== t.CODE_STOP) v = !1;
                switch (y) {
                  case t.CODE_FNC_1:
                    if (o)
                      if (f.length === 0) f += "]C1";
                      else f += String.fromCharCode(29);
                    break;
                  case t.CODE_FNC_2:
                  case t.CODE_FNC_3:
                    break;
                  case t.CODE_FNC_4_A:
                    if (!_ && w) ((_ = !0), (w = !1));
                    else if (_ && w) ((_ = !1), (w = !1));
                    else w = !0;
                    break;
                  case t.CODE_SHIFT:
                    ((h = !0), (u = t.CODE_CODE_B));
                    break;
                  case t.CODE_CODE_B:
                    u = t.CODE_CODE_B;
                    break;
                  case t.CODE_CODE_C:
                    u = t.CODE_CODE_C;
                    break;
                  case t.CODE_STOP:
                    d = !0;
                    break;
                }
              }
              break;
            case t.CODE_CODE_B:
              if (y < 96) {
                if (w === _) f += String.fromCharCode(32 + y);
                else f += String.fromCharCode(32 + y + 128);
                w = !1;
              } else {
                if (y !== t.CODE_STOP) v = !1;
                switch (y) {
                  case t.CODE_FNC_1:
                    if (o)
                      if (f.length === 0) f += "]C1";
                      else f += String.fromCharCode(29);
                    break;
                  case t.CODE_FNC_2:
                  case t.CODE_FNC_3:
                    break;
                  case t.CODE_FNC_4_B:
                    if (!_ && w) ((_ = !0), (w = !1));
                    else if (_ && w) ((_ = !1), (w = !1));
                    else w = !0;
                    break;
                  case t.CODE_SHIFT:
                    ((h = !0), (u = t.CODE_CODE_A));
                    break;
                  case t.CODE_CODE_A:
                    u = t.CODE_CODE_A;
                    break;
                  case t.CODE_CODE_C:
                    u = t.CODE_CODE_C;
                    break;
                  case t.CODE_STOP:
                    d = !0;
                    break;
                }
              }
              break;
            case t.CODE_CODE_C:
              if (y < 100) {
                if (y < 10) f += "0";
                f += y;
              } else {
                if (y !== t.CODE_STOP) v = !1;
                switch (y) {
                  case t.CODE_FNC_1:
                    if (o)
                      if (f.length === 0) f += "]C1";
                      else f += String.fromCharCode(29);
                    break;
                  case t.CODE_CODE_A:
                    u = t.CODE_CODE_A;
                    break;
                  case t.CODE_CODE_B:
                    u = t.CODE_CODE_B;
                    break;
                  case t.CODE_STOP:
                    d = !0;
                    break;
                }
              }
              break;
          }
          if (S) u = u === t.CODE_CODE_A ? t.CODE_CODE_B : t.CODE_CODE_A;
        }
        var E = g - p;
        if (((g = n.getNextUnset(g)), !n.isRange(g, Math.min(n.getSize(), g + (g - p) / 2), !1)))
          throw new Ce();
        if (((x -= b * A), x % 103 !== A)) throw new qr();
        var T = f.length;
        if (T === 0) throw new Ce();
        if (T > 0 && v)
          if (u === t.CODE_CODE_C) f = f.substring(0, T - 2);
          else f = f.substring(0, T - 1);
        var M = (s[1] + s[0]) / 2,
          C = p + E / 2,
          R = c.length,
          B = new Uint8Array(R);
        for (var L = 0; L < R; L++) B[L] = c[L];
        var k = [new ct(M, r), new ct(C, r)];
        return new Xr(f, B, 0, k, at.CODE_128, /*@__PURE__*/ new Date().getTime());
      }),
      (t.CODE_PATTERNS = [
        Int32Array.from([2, 1, 2, 2, 2, 2]),
        Int32Array.from([2, 2, 2, 1, 2, 2]),
        Int32Array.from([2, 2, 2, 2, 2, 1]),
        Int32Array.from([1, 2, 1, 2, 2, 3]),
        Int32Array.from([1, 2, 1, 3, 2, 2]),
        Int32Array.from([1, 3, 1, 2, 2, 2]),
        Int32Array.from([1, 2, 2, 2, 1, 3]),
        Int32Array.from([1, 2, 2, 3, 1, 2]),
        Int32Array.from([1, 3, 2, 2, 1, 2]),
        Int32Array.from([2, 2, 1, 2, 1, 3]),
        Int32Array.from([2, 2, 1, 3, 1, 2]),
        Int32Array.from([2, 3, 1, 2, 1, 2]),
        Int32Array.from([1, 1, 2, 2, 3, 2]),
        Int32Array.from([1, 2, 2, 1, 3, 2]),
        Int32Array.from([1, 2, 2, 2, 3, 1]),
        Int32Array.from([1, 1, 3, 2, 2, 2]),
        Int32Array.from([1, 2, 3, 1, 2, 2]),
        Int32Array.from([1, 2, 3, 2, 2, 1]),
        Int32Array.from([2, 2, 3, 2, 1, 1]),
        Int32Array.from([2, 2, 1, 1, 3, 2]),
        Int32Array.from([2, 2, 1, 2, 3, 1]),
        Int32Array.from([2, 1, 3, 2, 1, 2]),
        Int32Array.from([2, 2, 3, 1, 1, 2]),
        Int32Array.from([3, 1, 2, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 2, 2, 2]),
        Int32Array.from([3, 2, 1, 1, 2, 2]),
        Int32Array.from([3, 2, 1, 2, 2, 1]),
        Int32Array.from([3, 1, 2, 2, 1, 2]),
        Int32Array.from([3, 2, 2, 1, 1, 2]),
        Int32Array.from([3, 2, 2, 2, 1, 1]),
        Int32Array.from([2, 1, 2, 1, 2, 3]),
        Int32Array.from([2, 1, 2, 3, 2, 1]),
        Int32Array.from([2, 3, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 1, 3, 2, 3]),
        Int32Array.from([1, 3, 1, 1, 2, 3]),
        Int32Array.from([1, 3, 1, 3, 2, 1]),
        Int32Array.from([1, 1, 2, 3, 1, 3]),
        Int32Array.from([1, 3, 2, 1, 1, 3]),
        Int32Array.from([1, 3, 2, 3, 1, 1]),
        Int32Array.from([2, 1, 1, 3, 1, 3]),
        Int32Array.from([2, 3, 1, 1, 1, 3]),
        Int32Array.from([2, 3, 1, 3, 1, 1]),
        Int32Array.from([1, 1, 2, 1, 3, 3]),
        Int32Array.from([1, 1, 2, 3, 3, 1]),
        Int32Array.from([1, 3, 2, 1, 3, 1]),
        Int32Array.from([1, 1, 3, 1, 2, 3]),
        Int32Array.from([1, 1, 3, 3, 2, 1]),
        Int32Array.from([1, 3, 3, 1, 2, 1]),
        Int32Array.from([3, 1, 3, 1, 2, 1]),
        Int32Array.from([2, 1, 1, 3, 3, 1]),
        Int32Array.from([2, 3, 1, 1, 3, 1]),
        Int32Array.from([2, 1, 3, 1, 1, 3]),
        Int32Array.from([2, 1, 3, 3, 1, 1]),
        Int32Array.from([2, 1, 3, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 2, 3]),
        Int32Array.from([3, 1, 1, 3, 2, 1]),
        Int32Array.from([3, 3, 1, 1, 2, 1]),
        Int32Array.from([3, 1, 2, 1, 1, 3]),
        Int32Array.from([3, 1, 2, 3, 1, 1]),
        Int32Array.from([3, 3, 2, 1, 1, 1]),
        Int32Array.from([3, 1, 4, 1, 1, 1]),
        Int32Array.from([2, 2, 1, 4, 1, 1]),
        Int32Array.from([4, 3, 1, 1, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 2, 4]),
        Int32Array.from([1, 1, 1, 4, 2, 2]),
        Int32Array.from([1, 2, 1, 1, 2, 4]),
        Int32Array.from([1, 2, 1, 4, 2, 1]),
        Int32Array.from([1, 4, 1, 1, 2, 2]),
        Int32Array.from([1, 4, 1, 2, 2, 1]),
        Int32Array.from([1, 1, 2, 2, 1, 4]),
        Int32Array.from([1, 1, 2, 4, 1, 2]),
        Int32Array.from([1, 2, 2, 1, 1, 4]),
        Int32Array.from([1, 2, 2, 4, 1, 1]),
        Int32Array.from([1, 4, 2, 1, 1, 2]),
        Int32Array.from([1, 4, 2, 2, 1, 1]),
        Int32Array.from([2, 4, 1, 2, 1, 1]),
        Int32Array.from([2, 2, 1, 1, 1, 4]),
        Int32Array.from([4, 1, 3, 1, 1, 1]),
        Int32Array.from([2, 4, 1, 1, 1, 2]),
        Int32Array.from([1, 3, 4, 1, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 4, 2]),
        Int32Array.from([1, 2, 1, 1, 4, 2]),
        Int32Array.from([1, 2, 1, 2, 4, 1]),
        Int32Array.from([1, 1, 4, 2, 1, 2]),
        Int32Array.from([1, 2, 4, 1, 1, 2]),
        Int32Array.from([1, 2, 4, 2, 1, 1]),
        Int32Array.from([4, 1, 1, 2, 1, 2]),
        Int32Array.from([4, 2, 1, 1, 1, 2]),
        Int32Array.from([4, 2, 1, 2, 1, 1]),
        Int32Array.from([2, 1, 2, 1, 4, 1]),
        Int32Array.from([2, 1, 4, 1, 2, 1]),
        Int32Array.from([4, 1, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 1, 1, 4, 3]),
        Int32Array.from([1, 1, 1, 3, 4, 1]),
        Int32Array.from([1, 3, 1, 1, 4, 1]),
        Int32Array.from([1, 1, 4, 1, 1, 3]),
        Int32Array.from([1, 1, 4, 3, 1, 1]),
        Int32Array.from([4, 1, 1, 1, 1, 3]),
        Int32Array.from([4, 1, 1, 3, 1, 1]),
        Int32Array.from([1, 1, 3, 1, 4, 1]),
        Int32Array.from([1, 1, 4, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 4, 1]),
        Int32Array.from([4, 1, 1, 1, 3, 1]),
        Int32Array.from([2, 1, 1, 4, 1, 2]),
        Int32Array.from([2, 1, 1, 2, 1, 4]),
        Int32Array.from([2, 1, 1, 2, 3, 2]),
        Int32Array.from([2, 3, 3, 1, 1, 1, 2]),
      ]),
      (t.MAX_AVG_VARIANCE = 0.25),
      (t.MAX_INDIVIDUAL_VARIANCE = 0.7),
      (t.CODE_SHIFT = 98),
      (t.CODE_CODE_C = 99),
      (t.CODE_CODE_B = 100),
      (t.CODE_CODE_A = 101),
      (t.CODE_FNC_1 = 102),
      (t.CODE_FNC_2 = 97),
      (t.CODE_FNC_3 = 96),
      (t.CODE_FNC_4_A = 101),
      (t.CODE_FNC_4_B = 100),
      (t.CODE_START_A = 103),
      (t.CODE_START_B = 104),
      (t.CODE_START_C = 105),
      (t.CODE_STOP = 106),
      t
    );
  })(En),
  L_ = lie;
var cie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  mS = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  uie = (function (e) {
    cie(t, e);
    function t(r, n) {
      if (r === void 0) r = !1;
      if (n === void 0) n = !1;
      var i = e.call(this) || this;
      return (
        (i.usingCheckDigit = r),
        (i.extendedMode = n),
        (i.decodeRowResult = ""),
        (i.counters = new Int32Array(9)),
        i
      );
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o,
          s,
          a,
          l,
          c = this.counters;
        (c.fill(0), (this.decodeRowResult = ""));
        var u = t.findAsteriskPattern(n, c),
          d = n.getNextSet(u[1]),
          h = n.getSize(),
          f,
          p;
        do {
          t.recordPattern(n, d, c);
          var g = t.toNarrowWidePattern(c);
          if (g < 0) throw new Ce();
          ((f = t.patternToChar(g)), (this.decodeRowResult += f), (p = d));
          try {
            for (var m = ((o = void 0), mS(c)), A = m.next(); !A.done; A = m.next()) {
              var y = A.value;
              d += y;
            }
          } catch (R) {
            o = { error: R };
          } finally {
            try {
              if (A && !A.done && (s = m.return)) s.call(m);
            } finally {
              if (o) throw o.error;
            }
          }
          d = n.getNextSet(d);
        } while (f !== "*");
        this.decodeRowResult = this.decodeRowResult.substring(0, this.decodeRowResult.length - 1);
        var x = 0;
        try {
          for (var b = mS(c), v = b.next(); !v.done; v = b.next()) {
            var y = v.value;
            x += y;
          }
        } catch (R) {
          a = { error: R };
        } finally {
          try {
            if (v && !v.done && (l = b.return)) l.call(b);
          } finally {
            if (a) throw a.error;
          }
        }
        var _ = d - p - x;
        if (d !== h && _ * 2 < x) throw new Ce();
        if (this.usingCheckDigit) {
          var w = this.decodeRowResult.length - 1,
            S = 0;
          for (var E = 0; E < w; E++)
            S += t.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(E));
          if (this.decodeRowResult.charAt(w) !== t.ALPHABET_STRING.charAt(S % 43)) throw new qr();
          this.decodeRowResult = this.decodeRowResult.substring(0, w);
        }
        if (this.decodeRowResult.length === 0) throw new Ce();
        var T;
        if (this.extendedMode) T = t.decodeExtended(this.decodeRowResult);
        else T = this.decodeRowResult;
        var M = (u[1] + u[0]) / 2,
          C = p + x / 2;
        return new Xr(
          T,
          null,
          0,
          [new ct(M, r), new ct(C, r)],
          at.CODE_39,
          /*@__PURE__*/ new Date().getTime(),
        );
      }),
      (t.findAsteriskPattern = function (r, n) {
        var i = r.getSize(),
          o = r.getNextSet(0),
          s = 0,
          a = o,
          l = !1,
          c = n.length;
        for (var u = o; u < i; u++)
          if (r.get(u) !== l) n[s]++;
          else {
            if (s === c - 1) {
              if (
                this.toNarrowWidePattern(n) === t.ASTERISK_ENCODING &&
                r.isRange(Math.max(0, a - Math.floor((u - a) / 2)), a, !1)
              )
                return [a, u];
              ((a += n[0] + n[1]), n.copyWithin(0, 2, 2 + s - 1), (n[s - 1] = 0), (n[s] = 0), s--);
            } else s++;
            ((n[s] = 1), (l = !l));
          }
        throw new Ce();
      }),
      (t.toNarrowWidePattern = function (r) {
        var n,
          i,
          o = r.length,
          s = 0,
          a;
        do {
          var l = 2147483647;
          try {
            for (var c = ((n = void 0), mS(r)), u = c.next(); !u.done; u = c.next()) {
              var d = u.value;
              if (d < l && d > s) l = d;
            }
          } catch (g) {
            n = { error: g };
          } finally {
            try {
              if (u && !u.done && (i = c.return)) i.call(c);
            } finally {
              if (n) throw n.error;
            }
          }
          ((s = l), (a = 0));
          var h = 0,
            f = 0;
          for (var p = 0; p < o; p++) {
            var d = r[p];
            if (d > s) ((f |= 1 << (o - 1 - p)), a++, (h += d));
          }
          if (a === 3) {
            for (var p = 0; p < o && a > 0; p++) {
              var d = r[p];
              if (d > s) {
                if ((a--, d * 2 >= h)) return -1;
              }
            }
            return f;
          }
        } while (a > 3);
        return -1;
      }),
      (t.patternToChar = function (r) {
        for (var n = 0; n < t.CHARACTER_ENCODINGS.length; n++)
          if (t.CHARACTER_ENCODINGS[n] === r) return t.ALPHABET_STRING.charAt(n);
        if (r === t.ASTERISK_ENCODING) return "*";
        throw new Ce();
      }),
      (t.decodeExtended = function (r) {
        var n = r.length,
          i = "";
        for (var o = 0; o < n; o++) {
          var s = r.charAt(o);
          if (s === "+" || s === "$" || s === "%" || s === "/") {
            var a = r.charAt(o + 1),
              l = "\x00";
            switch (s) {
              case "+":
                if (a >= "A" && a <= "Z") l = String.fromCharCode(a.charCodeAt(0) + 32);
                else throw new De();
                break;
              case "$":
                if (a >= "A" && a <= "Z") l = String.fromCharCode(a.charCodeAt(0) - 64);
                else throw new De();
                break;
              case "%":
                if (a >= "A" && a <= "E") l = String.fromCharCode(a.charCodeAt(0) - 38);
                else if (a >= "F" && a <= "J") l = String.fromCharCode(a.charCodeAt(0) - 11);
                else if (a >= "K" && a <= "O") l = String.fromCharCode(a.charCodeAt(0) + 16);
                else if (a >= "P" && a <= "T") l = String.fromCharCode(a.charCodeAt(0) + 43);
                else if (a === "U") l = "\x00";
                else if (a === "V") l = "@";
                else if (a === "W") l = "`";
                else if (a === "X" || a === "Y" || a === "Z") l = "";
                else throw new De();
                break;
              case "/":
                if (a >= "A" && a <= "O") l = String.fromCharCode(a.charCodeAt(0) - 32);
                else if (a === "Z") l = ":";
                else throw new De();
                break;
            }
            ((i += l), o++);
          } else i += s;
        }
        return i;
      }),
      (t.ALPHABET_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%"),
      (t.CHARACTER_ENCODINGS = [
        52, 289, 97, 352, 49, 304, 112, 37, 292, 100, 265, 73, 328, 25, 280, 88, 13, 268, 76, 28,
        259, 67, 322, 19, 274, 82, 7, 262, 70, 22, 385, 193, 448, 145, 400, 208, 133, 388, 196, 168,
        162, 138, 42,
      ]),
      (t.ASTERISK_ENCODING = 148),
      t
    );
  })(En),
  B_ = uie;
var die = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  gS = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  hie = (function (e) {
    die(t, e);
    function t() {
      var r = e.call(this) || this;
      return ((r.decodeRowResult = ""), (r.counters = new Int32Array(6)), r);
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o,
          s,
          a,
          l,
          c = this.findAsteriskPattern(n),
          u = n.getNextSet(c[1]),
          d = n.getSize(),
          h = this.counters;
        (h.fill(0), (this.decodeRowResult = ""));
        var f, p;
        do {
          t.recordPattern(n, u, h);
          var g = this.toPattern(h);
          if (g < 0) throw new Ce();
          ((f = this.patternToChar(g)), (this.decodeRowResult += f), (p = u));
          try {
            for (var m = ((o = void 0), gS(h)), A = m.next(); !A.done; A = m.next()) {
              var y = A.value;
              u += y;
            }
          } catch (E) {
            o = { error: E };
          } finally {
            try {
              if (A && !A.done && (s = m.return)) s.call(m);
            } finally {
              if (o) throw o.error;
            }
          }
          u = n.getNextSet(u);
        } while (f !== "*");
        this.decodeRowResult = this.decodeRowResult.substring(0, this.decodeRowResult.length - 1);
        var x = 0;
        try {
          for (var b = gS(h), v = b.next(); !v.done; v = b.next()) {
            var y = v.value;
            x += y;
          }
        } catch (E) {
          a = { error: E };
        } finally {
          try {
            if (v && !v.done && (l = b.return)) l.call(b);
          } finally {
            if (a) throw a.error;
          }
        }
        if (u === d || !n.get(u)) throw new Ce();
        if (this.decodeRowResult.length < 2) throw new Ce();
        (this.checkChecksums(this.decodeRowResult),
          (this.decodeRowResult = this.decodeRowResult.substring(
            0,
            this.decodeRowResult.length - 2,
          )));
        var _ = this.decodeExtended(this.decodeRowResult),
          w = (c[1] + c[0]) / 2,
          S = p + x / 2;
        return new Xr(
          _,
          null,
          0,
          [new ct(w, r), new ct(S, r)],
          at.CODE_93,
          /*@__PURE__*/ new Date().getTime(),
        );
      }),
      (t.prototype.findAsteriskPattern = function (r) {
        var n = r.getSize(),
          i = r.getNextSet(0);
        this.counters.fill(0);
        var o = this.counters,
          s = i,
          a = !1,
          l = o.length,
          c = 0;
        for (var u = i; u < n; u++)
          if (r.get(u) !== a) o[c]++;
          else {
            if (c === l - 1) {
              if (this.toPattern(o) === t.ASTERISK_ENCODING) return new Int32Array([s, u]);
              ((s += o[0] + o[1]), o.copyWithin(0, 2, 2 + c - 1), (o[c - 1] = 0), (o[c] = 0), c--);
            } else c++;
            ((o[c] = 1), (a = !a));
          }
        throw new Ce();
      }),
      (t.prototype.toPattern = function (r) {
        var n,
          i,
          o = 0;
        try {
          for (var s = gS(r), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            o += l;
          }
        } catch (p) {
          n = { error: p };
        } finally {
          try {
            if (a && !a.done && (i = s.return)) i.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
        var c = 0,
          u = r.length;
        for (var d = 0; d < u; d++) {
          var h = Math.round((r[d] * 9) / o);
          if (h < 1 || h > 4) return -1;
          if ((d & 1) === 0) for (var f = 0; f < h; f++) c = (c << 1) | 1;
          else c <<= h;
        }
        return c;
      }),
      (t.prototype.patternToChar = function (r) {
        for (var n = 0; n < t.CHARACTER_ENCODINGS.length; n++)
          if (t.CHARACTER_ENCODINGS[n] === r) return t.ALPHABET_STRING.charAt(n);
        throw new Ce();
      }),
      (t.prototype.decodeExtended = function (r) {
        var n = r.length,
          i = "";
        for (var o = 0; o < n; o++) {
          var s = r.charAt(o);
          if (s >= "a" && s <= "d") {
            if (o >= n - 1) throw new De();
            var a = r.charAt(o + 1),
              l = "\x00";
            switch (s) {
              case "d":
                if (a >= "A" && a <= "Z") l = String.fromCharCode(a.charCodeAt(0) + 32);
                else throw new De();
                break;
              case "a":
                if (a >= "A" && a <= "Z") l = String.fromCharCode(a.charCodeAt(0) - 64);
                else throw new De();
                break;
              case "b":
                if (a >= "A" && a <= "E") l = String.fromCharCode(a.charCodeAt(0) - 38);
                else if (a >= "F" && a <= "J") l = String.fromCharCode(a.charCodeAt(0) - 11);
                else if (a >= "K" && a <= "O") l = String.fromCharCode(a.charCodeAt(0) + 16);
                else if (a >= "P" && a <= "T") l = String.fromCharCode(a.charCodeAt(0) + 43);
                else if (a === "U") l = "\x00";
                else if (a === "V") l = "@";
                else if (a === "W") l = "`";
                else if (a >= "X" && a <= "Z") l = String.fromCharCode(127);
                else throw new De();
                break;
              case "c":
                if (a >= "A" && a <= "O") l = String.fromCharCode(a.charCodeAt(0) - 32);
                else if (a === "Z") l = ":";
                else throw new De();
                break;
            }
            ((i += l), o++);
          } else i += s;
        }
        return i;
      }),
      (t.prototype.checkChecksums = function (r) {
        var n = r.length;
        (this.checkOneChecksum(r, n - 2, 20), this.checkOneChecksum(r, n - 1, 15));
      }),
      (t.prototype.checkOneChecksum = function (r, n, i) {
        var o = 1,
          s = 0;
        for (var a = n - 1; a >= 0; a--)
          if (((s += o * t.ALPHABET_STRING.indexOf(r.charAt(a))), ++o > i)) o = 1;
        if (r.charAt(n) !== t.ALPHABET_STRING[s % 47]) throw new qr();
      }),
      (t.ALPHABET_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*"),
      (t.CHARACTER_ENCODINGS = [
        276, 328, 324, 322, 296, 292, 290, 336, 274, 266, 424, 420, 418, 404, 402, 394, 360, 356,
        354, 308, 282, 344, 332, 326, 300, 278, 436, 434, 428, 422, 406, 410, 364, 358, 310, 314,
        302, 468, 466, 458, 366, 374, 430, 294, 474, 470, 306, 350,
      ]),
      (t.ASTERISK_ENCODING = t.CHARACTER_ENCODINGS[47]),
      t
    );
  })(En),
  F_ = hie;
var fie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  pie = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  mie = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  gie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Aie = (function (e) {
    fie(t, e);
    function t() {
      var r = e.apply(this, mie([], pie(arguments), !1)) || this;
      return ((r.narrowLineWidth = -1), r);
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o,
          s,
          a = this.decodeStart(n),
          l = this.decodeEnd(n),
          c = new Ot();
        t.decodeMiddle(n, a[1], l[0], c);
        var u = c.toString(),
          d = null;
        if (i != null) d = i.get(nr.ALLOWED_LENGTHS);
        if (d == null) d = t.DEFAULT_ALLOWED_LENGTHS;
        var h = u.length,
          f = !1,
          p = 0;
        try {
          for (var g = gie(d), m = g.next(); !m.done; m = g.next()) {
            var A = m.value;
            if (h === A) {
              f = !0;
              break;
            }
            if (A > p) p = A;
          }
        } catch (b) {
          o = { error: b };
        } finally {
          try {
            if (m && !m.done && (s = g.return)) s.call(g);
          } finally {
            if (o) throw o.error;
          }
        }
        if (!f && h > p) f = !0;
        if (!f) throw new De();
        var y = [new ct(a[1], r), new ct(l[0], r)],
          x = new Xr(u, null, 0, y, at.ITF, /*@__PURE__*/ new Date().getTime());
        return x;
      }),
      (t.decodeMiddle = function (r, n, i, o) {
        var s = new Int32Array(10),
          a = new Int32Array(5),
          l = new Int32Array(5);
        (s.fill(0), a.fill(0), l.fill(0));
        while (n < i) {
          En.recordPattern(r, n, s);
          for (var c = 0; c < 5; c++) {
            var u = 2 * c;
            ((a[c] = s[u]), (l[c] = s[u + 1]));
          }
          var d = t.decodeDigit(a);
          (o.append(d.toString()),
            (d = this.decodeDigit(l)),
            o.append(d.toString()),
            s.forEach(function (h) {
              n += h;
            }));
        }
      }),
      (t.prototype.decodeStart = function (r) {
        var n = t.skipWhiteSpace(r),
          i = t.findGuardPattern(r, n, t.START_PATTERN);
        return ((this.narrowLineWidth = (i[1] - i[0]) / 4), this.validateQuietZone(r, i[0]), i);
      }),
      (t.prototype.validateQuietZone = function (r, n) {
        var i = this.narrowLineWidth * 10;
        i = i < n ? i : n;
        for (var o = n - 1; i > 0 && o >= 0; o--) {
          if (r.get(o)) break;
          i--;
        }
        if (i !== 0) throw new Ce();
      }),
      (t.skipWhiteSpace = function (r) {
        var n = r.getSize(),
          i = r.getNextSet(0);
        if (i === n) throw new Ce();
        return i;
      }),
      (t.prototype.decodeEnd = function (r) {
        r.reverse();
        try {
          var n = t.skipWhiteSpace(r),
            i = void 0;
          try {
            i = t.findGuardPattern(r, n, t.END_PATTERN_REVERSED[0]);
          } catch (s) {
            if (s instanceof Ce) i = t.findGuardPattern(r, n, t.END_PATTERN_REVERSED[1]);
          }
          this.validateQuietZone(r, i[0]);
          var o = i[0];
          return ((i[0] = r.getSize() - i[1]), (i[1] = r.getSize() - o), i);
        } finally {
          r.reverse();
        }
      }),
      (t.findGuardPattern = function (r, n, i) {
        var o = i.length,
          s = new Int32Array(o),
          a = r.getSize(),
          l = !1,
          c = 0,
          u = n;
        s.fill(0);
        for (var d = n; d < a; d++)
          if (r.get(d) !== l) s[c]++;
          else {
            if (c === o - 1) {
              if (En.patternMatchVariance(s, i, t.MAX_INDIVIDUAL_VARIANCE) < t.MAX_AVG_VARIANCE)
                return [u, d];
              ((u += s[0] + s[1]),
                pr.arraycopy(s, 2, s, 0, c - 1),
                (s[c - 1] = 0),
                (s[c] = 0),
                c--);
            } else c++;
            ((s[c] = 1), (l = !l));
          }
        throw new Ce();
      }),
      (t.decodeDigit = function (r) {
        var n = t.MAX_AVG_VARIANCE,
          i = -1,
          o = t.PATTERNS.length;
        for (var s = 0; s < o; s++) {
          var a = t.PATTERNS[s],
            l = En.patternMatchVariance(r, a, t.MAX_INDIVIDUAL_VARIANCE);
          if (l < n) ((n = l), (i = s));
          else if (l === n) i = -1;
        }
        if (i >= 0) return i % 10;
        else throw new Ce();
      }),
      (t.PATTERNS = [
        Int32Array.from([1, 1, 2, 2, 1]),
        Int32Array.from([2, 1, 1, 1, 2]),
        Int32Array.from([1, 2, 1, 1, 2]),
        Int32Array.from([2, 2, 1, 1, 1]),
        Int32Array.from([1, 1, 2, 1, 2]),
        Int32Array.from([2, 1, 2, 1, 1]),
        Int32Array.from([1, 2, 2, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 2]),
        Int32Array.from([2, 1, 1, 2, 1]),
        Int32Array.from([1, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 3, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 3]),
        Int32Array.from([1, 3, 1, 1, 3]),
        Int32Array.from([3, 3, 1, 1, 1]),
        Int32Array.from([1, 1, 3, 1, 3]),
        Int32Array.from([3, 1, 3, 1, 1]),
        Int32Array.from([1, 3, 3, 1, 1]),
        Int32Array.from([1, 1, 1, 3, 3]),
        Int32Array.from([3, 1, 1, 3, 1]),
        Int32Array.from([1, 3, 1, 3, 1]),
      ]),
      (t.MAX_AVG_VARIANCE = 0.38),
      (t.MAX_INDIVIDUAL_VARIANCE = 0.5),
      (t.DEFAULT_ALLOWED_LENGTHS = [6, 8, 10, 12, 14]),
      (t.START_PATTERN = Int32Array.from([1, 1, 1, 1])),
      (t.END_PATTERN_REVERSED = [Int32Array.from([1, 1, 2]), Int32Array.from([1, 1, 3])]),
      t
    );
  })(En),
  D_ = Aie;
var yie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  xie = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  bie = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  _ie = (function (e) {
    yie(t, e);
    function t() {
      var r = e.apply(this, bie([], xie(arguments), !1)) || this;
      return ((r.decodeRowStringBuffer = ""), r);
    }
    return (
      (t.findStartGuardPattern = function (r) {
        var n = !1,
          i,
          o = 0,
          s = Int32Array.from([0, 0, 0]);
        while (!n) {
          ((s = Int32Array.from([0, 0, 0])),
            (i = t.findGuardPattern(r, o, !1, this.START_END_PATTERN, s)));
          var a = i[0];
          o = i[1];
          var l = a - (o - a);
          if (l >= 0) n = r.isRange(l, a, !1);
        }
        return i;
      }),
      (t.checkChecksum = function (r) {
        return t.checkStandardUPCEANChecksum(r);
      }),
      (t.checkStandardUPCEANChecksum = function (r) {
        var n = r.length;
        if (n === 0) return !1;
        var i = parseInt(r.charAt(n - 1), 10);
        return t.getStandardUPCEANChecksum(r.substring(0, n - 1)) === i;
      }),
      (t.getStandardUPCEANChecksum = function (r) {
        var n = r.length,
          i = 0;
        for (var o = n - 1; o >= 0; o -= 2) {
          var s = r.charAt(o).charCodeAt(0) - 48;
          if (s < 0 || s > 9) throw new De();
          i += s;
        }
        i *= 3;
        for (var o = n - 2; o >= 0; o -= 2) {
          var s = r.charAt(o).charCodeAt(0) - 48;
          if (s < 0 || s > 9) throw new De();
          i += s;
        }
        return (1000 - i) % 10;
      }),
      (t.decodeEnd = function (r, n) {
        return t.findGuardPattern(
          r,
          n,
          !1,
          t.START_END_PATTERN,
          new Int32Array(t.START_END_PATTERN.length).fill(0),
        );
      }),
      (t.findGuardPatternWithoutCounters = function (r, n, i, o) {
        return this.findGuardPattern(r, n, i, o, new Int32Array(o.length));
      }),
      (t.findGuardPattern = function (r, n, i, o, s) {
        var a = r.getSize();
        n = i ? r.getNextUnset(n) : r.getNextSet(n);
        var l = 0,
          c = n,
          u = o.length,
          d = i;
        for (var h = n; h < a; h++)
          if (r.get(h) !== d) s[l]++;
          else {
            if (l === u - 1) {
              if (En.patternMatchVariance(s, o, t.MAX_INDIVIDUAL_VARIANCE) < t.MAX_AVG_VARIANCE)
                return Int32Array.from([c, h]);
              c += s[0] + s[1];
              var f = s.slice(2, s.length);
              for (var p = 0; p < l - 1; p++) s[p] = f[p];
              ((s[l - 1] = 0), (s[l] = 0), l--);
            } else l++;
            ((s[l] = 1), (d = !d));
          }
        throw new Ce();
      }),
      (t.decodeDigit = function (r, n, i, o) {
        this.recordPattern(r, i, n);
        var s = this.MAX_AVG_VARIANCE,
          a = -1,
          l = o.length;
        for (var c = 0; c < l; c++) {
          var u = o[c],
            d = En.patternMatchVariance(n, u, t.MAX_INDIVIDUAL_VARIANCE);
          if (d < s) ((s = d), (a = c));
        }
        if (a >= 0) return a;
        else throw new Ce();
      }),
      (t.MAX_AVG_VARIANCE = 0.48),
      (t.MAX_INDIVIDUAL_VARIANCE = 0.7),
      (t.START_END_PATTERN = Int32Array.from([1, 1, 1])),
      (t.MIDDLE_PATTERN = Int32Array.from([1, 1, 1, 1, 1])),
      (t.END_PATTERN = Int32Array.from([1, 1, 1, 1, 1, 1])),
      (t.L_PATTERNS = [
        Int32Array.from([3, 2, 1, 1]),
        Int32Array.from([2, 2, 2, 1]),
        Int32Array.from([2, 1, 2, 2]),
        Int32Array.from([1, 4, 1, 1]),
        Int32Array.from([1, 1, 3, 2]),
        Int32Array.from([1, 2, 3, 1]),
        Int32Array.from([1, 1, 1, 4]),
        Int32Array.from([1, 3, 1, 2]),
        Int32Array.from([1, 2, 1, 3]),
        Int32Array.from([3, 1, 1, 2]),
      ]),
      t
    );
  })(En),
  Oc = _ie;
var vie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Cie = (function () {
    function e() {
      ((this.CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5]),
        (this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0])),
        (this.decodeRowStringBuffer = ""));
    }
    return (
      (e.prototype.decodeRow = function (t, r, n) {
        var i = this.decodeRowStringBuffer,
          o = this.decodeMiddle(r, n, i),
          s = i.toString(),
          a = e.parseExtensionString(s),
          l = [new ct((n[0] + n[1]) / 2, t), new ct(o, t)],
          c = new Xr(s, null, 0, l, at.UPC_EAN_EXTENSION, /*@__PURE__*/ new Date().getTime());
        if (a != null) c.putAllMetadata(a);
        return c;
      }),
      (e.prototype.decodeMiddle = function (t, r, n) {
        var i,
          o,
          s = this.decodeMiddleCounters;
        ((s[0] = 0), (s[1] = 0), (s[2] = 0), (s[3] = 0));
        var a = t.getSize(),
          l = r[1],
          c = 0;
        for (var u = 0; u < 5 && l < a; u++) {
          var d = Oc.decodeDigit(t, s, l, Oc.L_AND_G_PATTERNS);
          n += String.fromCharCode(48 + (d % 10));
          try {
            for (var h = ((i = void 0), vie(s)), f = h.next(); !f.done; f = h.next()) {
              var p = f.value;
              l += p;
            }
          } catch (m) {
            i = { error: m };
          } finally {
            try {
              if (f && !f.done && (o = h.return)) o.call(h);
            } finally {
              if (i) throw i.error;
            }
          }
          if (d >= 10) c |= 1 << (4 - u);
          if (u !== 4) ((l = t.getNextSet(l)), (l = t.getNextUnset(l)));
        }
        if (n.length !== 5) throw new Ce();
        var g = this.determineCheckDigit(c);
        if (e.extensionChecksum(n.toString()) !== g) throw new Ce();
        return l;
      }),
      (e.extensionChecksum = function (t) {
        var r = t.length,
          n = 0;
        for (var i = r - 2; i >= 0; i -= 2) n += t.charAt(i).charCodeAt(0) - 48;
        n *= 3;
        for (var i = r - 1; i >= 0; i -= 2) n += t.charAt(i).charCodeAt(0) - 48;
        return ((n *= 3), n % 10);
      }),
      (e.prototype.determineCheckDigit = function (t) {
        for (var r = 0; r < 10; r++) if (t === this.CHECK_DIGIT_ENCODINGS[r]) return r;
        throw new Ce();
      }),
      (e.parseExtensionString = function (t) {
        if (t.length !== 5) return null;
        var r = e.parseExtension5String(t);
        if (r == null) return null;
        return /*@__PURE__*/ new Map([[hn.SUGGESTED_PRICE, r]]);
      }),
      (e.parseExtension5String = function (t) {
        var r;
        switch (t.charAt(0)) {
          case "0":
            r = "£";
            break;
          case "5":
            r = "$";
            break;
          case "9":
            switch (t) {
              case "90000":
                return null;
              case "99991":
                return "0.00";
              case "99990":
                return "Used";
            }
            r = "";
            break;
          default:
            r = "";
            break;
        }
        var n = parseInt(t.substring(1)),
          i = (n / 100).toString(),
          o = n % 100,
          s = o < 10 ? "0" + o : o.toString();
        return r + i + "." + s;
      }),
      e
    );
  })(),
  kk = Cie;
var wie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Tie = (function () {
    function e() {
      ((this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0])),
        (this.decodeRowStringBuffer = ""));
    }
    return (
      (e.prototype.decodeRow = function (t, r, n) {
        var i = this.decodeRowStringBuffer,
          o = this.decodeMiddle(r, n, i),
          s = i.toString(),
          a = e.parseExtensionString(s),
          l = [new ct((n[0] + n[1]) / 2, t), new ct(o, t)],
          c = new Xr(s, null, 0, l, at.UPC_EAN_EXTENSION, /*@__PURE__*/ new Date().getTime());
        if (a != null) c.putAllMetadata(a);
        return c;
      }),
      (e.prototype.decodeMiddle = function (t, r, n) {
        var i,
          o,
          s = this.decodeMiddleCounters;
        ((s[0] = 0), (s[1] = 0), (s[2] = 0), (s[3] = 0));
        var a = t.getSize(),
          l = r[1],
          c = 0;
        for (var u = 0; u < 2 && l < a; u++) {
          var d = Oc.decodeDigit(t, s, l, Oc.L_AND_G_PATTERNS);
          n += String.fromCharCode(48 + (d % 10));
          try {
            for (var h = ((i = void 0), wie(s)), f = h.next(); !f.done; f = h.next()) {
              var p = f.value;
              l += p;
            }
          } catch (g) {
            i = { error: g };
          } finally {
            try {
              if (f && !f.done && (o = h.return)) o.call(h);
            } finally {
              if (i) throw i.error;
            }
          }
          if (d >= 10) c |= 1 << (1 - u);
          if (u !== 1) ((l = t.getNextSet(l)), (l = t.getNextUnset(l)));
        }
        if (n.length !== 2) throw new Ce();
        if (parseInt(n.toString()) % 4 !== c) throw new Ce();
        return l;
      }),
      (e.parseExtensionString = function (t) {
        if (t.length !== 2) return null;
        return /*@__PURE__*/ new Map([[hn.ISSUE_NUMBER, parseInt(t)]]);
      }),
      e
    );
  })(),
  Uk = Tie;
var Eie = (function () {
    function e() {}
    return (
      (e.decodeRow = function (t, r, n) {
        var i = Oc.findGuardPattern(
          r,
          n,
          !1,
          this.EXTENSION_START_PATTERN,
          new Int32Array(this.EXTENSION_START_PATTERN.length).fill(0),
        );
        try {
          var o = new kk();
          return o.decodeRow(t, r, i);
        } catch (a) {
          var s = new Uk();
          return s.decodeRow(t, r, i);
        }
      }),
      (e.EXTENSION_START_PATTERN = Int32Array.from([1, 1, 2])),
      e
    );
  })(),
  Hk = Eie;
var Sie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Mie = (function (e) {
    Sie(t, e);
    function t() {
      var r = e.call(this) || this;
      ((r.decodeRowStringBuffer = ""),
        (t.L_AND_G_PATTERNS = t.L_PATTERNS.map(function (a) {
          return Int32Array.from(a);
        })));
      for (var n = 10; n < 20; n++) {
        var i = t.L_PATTERNS[n - 10],
          o = new Int32Array(i.length);
        for (var s = 0; s < i.length; s++) o[s] = i[i.length - s - 1];
        t.L_AND_G_PATTERNS[n] = o;
      }
      return r;
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o = t.findStartGuardPattern(n),
          s = i == null ? null : i.get(nr.NEED_RESULT_POINT_CALLBACK);
        if (s != null) {
          var a = new ct((o[0] + o[1]) / 2, r);
          s.foundPossibleResultPoint(a);
        }
        var l = this.decodeMiddle(n, o, this.decodeRowStringBuffer),
          { rowOffset: c, resultString: u } = l;
        if (s != null) {
          var d = new ct(c, r);
          s.foundPossibleResultPoint(d);
        }
        var h = t.decodeEnd(n, c);
        if (s != null) {
          var f = new ct((h[0] + h[1]) / 2, r);
          s.foundPossibleResultPoint(f);
        }
        var p = h[1],
          g = p + (p - h[0]);
        if (g >= n.getSize() || !n.isRange(p, g, !1)) throw new Ce();
        var m = u.toString();
        if (m.length < 8) throw new De();
        if (!t.checkChecksum(m)) throw new qr();
        var A = (o[1] + o[0]) / 2,
          y = (h[1] + h[0]) / 2,
          x = this.getBarcodeFormat(),
          b = [new ct(A, r), new ct(y, r)],
          v = new Xr(m, null, 0, b, x, /*@__PURE__*/ new Date().getTime()),
          _ = 0;
        try {
          var w = Hk.decodeRow(r, n, h[1]);
          (v.putMetadata(hn.UPC_EAN_EXTENSION, w.getText()),
            v.putAllMetadata(w.getResultMetadata()),
            v.addResultPoints(w.getResultPoints()),
            (_ = w.getText().length));
        } catch (M) {}
        var S = i == null ? null : i.get(nr.ALLOWED_EAN_EXTENSIONS);
        if (S != null) {
          var E = !1;
          for (var T in S)
            if (_.toString() === T) {
              E = !0;
              break;
            }
          if (!E) throw new Ce();
        }
        if (x === at.EAN_13 || x === at.UPC_A);
        return v;
      }),
      (t.checkChecksum = function (r) {
        return t.checkStandardUPCEANChecksum(r);
      }),
      (t.checkStandardUPCEANChecksum = function (r) {
        var n = r.length;
        if (n === 0) return !1;
        var i = parseInt(r.charAt(n - 1), 10);
        return t.getStandardUPCEANChecksum(r.substring(0, n - 1)) === i;
      }),
      (t.getStandardUPCEANChecksum = function (r) {
        var n = r.length,
          i = 0;
        for (var o = n - 1; o >= 0; o -= 2) {
          var s = r.charAt(o).charCodeAt(0) - 48;
          if (s < 0 || s > 9) throw new De();
          i += s;
        }
        i *= 3;
        for (var o = n - 2; o >= 0; o -= 2) {
          var s = r.charAt(o).charCodeAt(0) - 48;
          if (s < 0 || s > 9) throw new De();
          i += s;
        }
        return (1000 - i) % 10;
      }),
      (t.decodeEnd = function (r, n) {
        return t.findGuardPattern(
          r,
          n,
          !1,
          t.START_END_PATTERN,
          new Int32Array(t.START_END_PATTERN.length).fill(0),
        );
      }),
      t
    );
  })(Oc),
  wi = Mie;
var Iie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Gk = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Rie = (function (e) {
    Iie(t, e);
    function t() {
      var r = e.call(this) || this;
      return ((r.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0])), r);
    }
    return (
      (t.prototype.decodeMiddle = function (r, n, i) {
        var o,
          s,
          a,
          l,
          c = this.decodeMiddleCounters;
        ((c[0] = 0), (c[1] = 0), (c[2] = 0), (c[3] = 0));
        var u = r.getSize(),
          d = n[1],
          h = 0;
        for (var f = 0; f < 6 && d < u; f++) {
          var p = wi.decodeDigit(r, c, d, wi.L_AND_G_PATTERNS);
          i += String.fromCharCode(48 + (p % 10));
          try {
            for (var g = ((o = void 0), Gk(c)), m = g.next(); !m.done; m = g.next()) {
              var A = m.value;
              d += A;
            }
          } catch (v) {
            o = { error: v };
          } finally {
            try {
              if (m && !m.done && (s = g.return)) s.call(g);
            } finally {
              if (o) throw o.error;
            }
          }
          if (p >= 10) h |= 1 << (5 - f);
        }
        i = t.determineFirstDigit(i, h);
        var y = wi.findGuardPattern(
          r,
          d,
          !0,
          wi.MIDDLE_PATTERN,
          new Int32Array(wi.MIDDLE_PATTERN.length).fill(0),
        );
        d = y[1];
        for (var f = 0; f < 6 && d < u; f++) {
          var p = wi.decodeDigit(r, c, d, wi.L_PATTERNS);
          i += String.fromCharCode(48 + p);
          try {
            for (var x = ((a = void 0), Gk(c)), b = x.next(); !b.done; b = x.next()) {
              var A = b.value;
              d += A;
            }
          } catch (w) {
            a = { error: w };
          } finally {
            try {
              if (b && !b.done && (l = x.return)) l.call(x);
            } finally {
              if (a) throw a.error;
            }
          }
        }
        return { rowOffset: d, resultString: i };
      }),
      (t.prototype.getBarcodeFormat = function () {
        return at.EAN_13;
      }),
      (t.determineFirstDigit = function (r, n) {
        for (var i = 0; i < 10; i++)
          if (n === this.FIRST_DIGIT_ENCODINGS[i])
            return ((r = String.fromCharCode(48 + i) + r), r);
        throw new Ce();
      }),
      (t.FIRST_DIGIT_ENCODINGS = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26]),
      t
    );
  })(wi),
  K1 = Rie;
var Oie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  zk = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Lie = (function (e) {
    Oie(t, e);
    function t() {
      var r = e.call(this) || this;
      return ((r.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0])), r);
    }
    return (
      (t.prototype.decodeMiddle = function (r, n, i) {
        var o,
          s,
          a,
          l,
          c = this.decodeMiddleCounters;
        ((c[0] = 0), (c[1] = 0), (c[2] = 0), (c[3] = 0));
        var u = r.getSize(),
          d = n[1];
        for (var h = 0; h < 4 && d < u; h++) {
          var f = wi.decodeDigit(r, c, d, wi.L_PATTERNS);
          i += String.fromCharCode(48 + f);
          try {
            for (var p = ((o = void 0), zk(c)), g = p.next(); !g.done; g = p.next()) {
              var m = g.value;
              d += m;
            }
          } catch (b) {
            o = { error: b };
          } finally {
            try {
              if (g && !g.done && (s = p.return)) s.call(p);
            } finally {
              if (o) throw o.error;
            }
          }
        }
        var A = wi.findGuardPattern(
          r,
          d,
          !0,
          wi.MIDDLE_PATTERN,
          new Int32Array(wi.MIDDLE_PATTERN.length).fill(0),
        );
        d = A[1];
        for (var h = 0; h < 4 && d < u; h++) {
          var f = wi.decodeDigit(r, c, d, wi.L_PATTERNS);
          i += String.fromCharCode(48 + f);
          try {
            for (var y = ((a = void 0), zk(c)), x = y.next(); !x.done; x = y.next()) {
              var m = x.value;
              d += m;
            }
          } catch (_) {
            a = { error: _ };
          } finally {
            try {
              if (x && !x.done && (l = y.return)) l.call(y);
            } finally {
              if (a) throw a.error;
            }
          }
        }
        return { rowOffset: d, resultString: i };
      }),
      (t.prototype.getBarcodeFormat = function () {
        return at.EAN_8;
      }),
      t
    );
  })(wi),
  AS = Lie;
var Bie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Fie = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Die = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  Nie = (function (e) {
    Bie(t, e);
    function t() {
      var r = e.apply(this, Die([], Fie(arguments), !1)) || this;
      return ((r.ean13Reader = new K1()), r);
    }
    return (
      (t.prototype.getBarcodeFormat = function () {
        return at.UPC_A;
      }),
      (t.prototype.decode = function (r, n) {
        return this.maybeReturnResult(this.ean13Reader.decode(r));
      }),
      (t.prototype.decodeRow = function (r, n, i) {
        return this.maybeReturnResult(this.ean13Reader.decodeRow(r, n, i));
      }),
      (t.prototype.decodeMiddle = function (r, n, i) {
        return this.ean13Reader.decodeMiddle(r, n, i);
      }),
      (t.prototype.maybeReturnResult = function (r) {
        var n = r.getText();
        if (n.charAt(0) === "0") {
          var i = new Xr(n.substring(1), null, null, r.getResultPoints(), at.UPC_A);
          if (r.getResultMetadata() != null) i.putAllMetadata(r.getResultMetadata());
          return i;
        } else throw new Ce();
      }),
      (t.prototype.reset = function () {
        this.ean13Reader.reset();
      }),
      t
    );
  })(wi),
  yS = Nie;
var Pie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  kie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Uie = (function (e) {
    Pie(t, e);
    function t() {
      var r = e.call(this) || this;
      return ((r.decodeMiddleCounters = new Int32Array(4)), r);
    }
    return (
      (t.prototype.decodeMiddle = function (r, n, i) {
        var o,
          s,
          a = this.decodeMiddleCounters.map(function (m) {
            return m;
          });
        ((a[0] = 0), (a[1] = 0), (a[2] = 0), (a[3] = 0));
        var l = r.getSize(),
          c = n[1],
          u = 0;
        for (var d = 0; d < 6 && c < l; d++) {
          var h = t.decodeDigit(r, a, c, t.L_AND_G_PATTERNS);
          i += String.fromCharCode(48 + (h % 10));
          try {
            for (var f = ((o = void 0), kie(a)), p = f.next(); !p.done; p = f.next()) {
              var g = p.value;
              c += g;
            }
          } catch (m) {
            o = { error: m };
          } finally {
            try {
              if (p && !p.done && (s = f.return)) s.call(f);
            } finally {
              if (o) throw o.error;
            }
          }
          if (h >= 10) u |= 1 << (5 - d);
        }
        return (t.determineNumSysAndCheckDigit(new Ot(i), u), c);
      }),
      (t.prototype.decodeEnd = function (r, n) {
        return t.findGuardPatternWithoutCounters(r, n, !0, t.MIDDLE_END_PATTERN);
      }),
      (t.prototype.checkChecksum = function (r) {
        return wi.checkChecksum(t.convertUPCEtoUPCA(r));
      }),
      (t.determineNumSysAndCheckDigit = function (r, n) {
        for (var i = 0; i <= 1; i++)
          for (var o = 0; o < 10; o++)
            if (n === this.NUMSYS_AND_CHECK_DIGIT_PATTERNS[i][o]) {
              (r.insert(0, "0" + i), r.append("0" + o));
              return;
            }
        throw Ce.getNotFoundInstance();
      }),
      (t.prototype.getBarcodeFormat = function () {
        return at.UPC_E;
      }),
      (t.convertUPCEtoUPCA = function (r) {
        var n = r
            .slice(1, 7)
            .split("")
            .map(function (s) {
              return s.charCodeAt(0);
            }),
          i = new Ot();
        i.append(r.charAt(0));
        var o = n[5];
        switch (o) {
          case 0:
          case 1:
          case 2:
            (i.appendChars(n, 0, 2), i.append(o), i.append("0000"), i.appendChars(n, 2, 3));
            break;
          case 3:
            (i.appendChars(n, 0, 3), i.append("00000"), i.appendChars(n, 3, 2));
            break;
          case 4:
            (i.appendChars(n, 0, 4), i.append("00000"), i.append(n[4]));
            break;
          default:
            (i.appendChars(n, 0, 5), i.append("0000"), i.append(o));
            break;
        }
        if (r.length >= 8) i.append(r.charAt(7));
        return i.toString();
      }),
      (t.MIDDLE_END_PATTERN = Int32Array.from([1, 1, 1, 1, 1, 1])),
      (t.NUMSYS_AND_CHECK_DIGIT_PATTERNS = [
        Int32Array.from([56, 52, 50, 49, 44, 38, 35, 42, 41, 37]),
        Int32Array.from([7, 11, 13, 14, 19, 25, 28, 21, 22, 1]),
      ]),
      t
    );
  })(wi),
  xS = Uie;
var Hie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Vk = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Gie = (function (e) {
    Hie(t, e);
    function t(r) {
      var n = e.call(this) || this,
        i = r == null ? null : r.get(nr.POSSIBLE_FORMATS),
        o = [];
      if (i != null) {
        if (i.indexOf(at.EAN_13) > -1) o.push(new K1());
        if (i.indexOf(at.UPC_A) > -1) o.push(new yS());
        if (i.indexOf(at.EAN_8) > -1) o.push(new AS());
        if (i.indexOf(at.UPC_E) > -1) o.push(new xS());
      }
      if (o.length === 0) (o.push(new K1()), o.push(new yS()), o.push(new AS()), o.push(new xS()));
      return ((n.readers = o), n);
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o, s;
        try {
          for (var a = Vk(this.readers), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            try {
              var u = c.decodeRow(r, n, i),
                d = u.getBarcodeFormat() === at.EAN_13 && u.getText().charAt(0) === "0",
                h = i == null ? null : i.get(nr.POSSIBLE_FORMATS),
                f = h == null || h.includes(at.UPC_A);
              if (d && f) {
                var p = u.getRawBytes(),
                  g = new Xr(
                    u.getText().substring(1),
                    p,
                    p ? p.length : null,
                    u.getResultPoints(),
                    at.UPC_A,
                  );
                return (g.putAllMetadata(u.getResultMetadata()), g);
              }
              return u;
            } catch (m) {}
          }
        } catch (m) {
          o = { error: m };
        } finally {
          try {
            if (l && !l.done && (s = a.return)) s.call(a);
          } finally {
            if (o) throw o.error;
          }
        }
        throw new Ce();
      }),
      (t.prototype.reset = function () {
        var r, n;
        try {
          for (var i = Vk(this.readers), o = i.next(); !o.done; o = i.next()) {
            var s = o.value;
            s.reset();
          }
        } catch (a) {
          r = { error: a };
        } finally {
          try {
            if (o && !o.done && (n = i.return)) n.call(i);
          } finally {
            if (r) throw r.error;
          }
        }
      }),
      t
    );
  })(En),
  N_ = Gie;
var zie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Vie = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Wie = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  Qie = (function (e) {
    zie(t, e);
    function t() {
      var r = e.apply(this, Wie([], Vie(arguments), !1)) || this;
      return (
        (r.CODA_BAR_CHAR_SET = {
          nnnnnww: "0",
          nnnnwwn: "1",
          nnnwnnw: "2",
          wwnnnnn: "3",
          nnwnnwn: "4",
          wnnnnwn: "5",
          nwnnnnw: "6",
          nwnnwnn: "7",
          nwwnnnn: "8",
          wnnwnnn: "9",
          nnnwwnn: "-",
          nnwwnnn: "$",
          wnnnwnw: ":",
          wnwnnnw: "/",
          wnwnwnn: ".",
          nnwwwww: "+",
          nnwwnwn: "A",
          nwnwnnw: "B",
          nnnwnww: "C",
          nnnwwwn: "D",
        }),
        r
      );
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o = this.getValidRowData(n);
        if (!o) throw new Ce();
        var s = this.codaBarDecodeRow(o.row);
        if (!s) throw new Ce();
        return new Xr(
          s,
          null,
          0,
          [new ct(o.left, r), new ct(o.right, r)],
          at.CODABAR,
          /*@__PURE__*/ new Date().getTime(),
        );
      }),
      (t.prototype.getValidRowData = function (r) {
        var n = r.toArray(),
          i = n.indexOf(!0);
        if (i === -1) return null;
        var o = n.lastIndexOf(!0);
        if (o <= i) return null;
        n = n.slice(i, o + 1);
        var s = [],
          a = n[0],
          l = 1;
        for (var c = 1; c < n.length; c++)
          if (n[c] === a) l++;
          else ((a = n[c]), s.push(l), (l = 1));
        if ((s.push(l), s.length < 23 && (s.length + 1) % 8 !== 0)) return null;
        return { row: s, left: i, right: o };
      }),
      (t.prototype.codaBarDecodeRow = function (r) {
        var n = [],
          i = Math.ceil(
            r.reduce(function (l, c) {
              return (l + c) / 2;
            }, 0),
          );
        while (r.length > 0) {
          var o = r.splice(0, 8).splice(0, 7),
            s = o
              .map(function (l) {
                return l < i ? "n" : "w";
              })
              .join("");
          if (this.CODA_BAR_CHAR_SET[s] === void 0) return null;
          n.push(this.CODA_BAR_CHAR_SET[s]);
        }
        var a = n.join("");
        if (this.validCodaBarString(a)) return a;
        return null;
      }),
      (t.prototype.validCodaBarString = function (r) {
        var n = /^[A-D].{1,}[A-D]$/;
        return n.test(r);
      }),
      t
    );
  })(En),
  bS = Qie;
var Yie = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Xie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  jie = (function (e) {
    Yie(t, e);
    function t() {
      var r = e.call(this) || this;
      return (
        (r.decodeFinderCounters = new Int32Array(4)),
        (r.dataCharacterCounters = new Int32Array(8)),
        (r.oddRoundingErrors = [, , , ,]),
        (r.evenRoundingErrors = [, , , ,]),
        (r.oddCounts = Array(Math.trunc(r.dataCharacterCounters.length / 2))),
        (r.evenCounts = Array(Math.trunc(r.dataCharacterCounters.length / 2))),
        r
      );
    }
    return (
      (t.prototype.getDecodeFinderCounters = function () {
        return this.decodeFinderCounters;
      }),
      (t.prototype.getDataCharacterCounters = function () {
        return this.dataCharacterCounters;
      }),
      (t.prototype.getOddRoundingErrors = function () {
        return this.oddRoundingErrors;
      }),
      (t.prototype.getEvenRoundingErrors = function () {
        return this.evenRoundingErrors;
      }),
      (t.prototype.getOddCounts = function () {
        return this.oddCounts;
      }),
      (t.prototype.getEvenCounts = function () {
        return this.evenCounts;
      }),
      (t.prototype.parseFinderValue = function (r, n) {
        for (var i = 0; i < n.length; i++)
          if (En.patternMatchVariance(r, n[i], t.MAX_INDIVIDUAL_VARIANCE) < t.MAX_AVG_VARIANCE)
            return i;
        throw new Ce();
      }),
      (t.count = function (r) {
        return Sr.sum(new Int32Array(r));
      }),
      (t.increment = function (r, n) {
        var i = 0,
          o = n[0];
        for (var s = 1; s < r.length; s++) if (n[s] > o) ((o = n[s]), (i = s));
        r[i]++;
      }),
      (t.decrement = function (r, n) {
        var i = 0,
          o = n[0];
        for (var s = 1; s < r.length; s++) if (n[s] < o) ((o = n[s]), (i = s));
        r[i]--;
      }),
      (t.isFinderPattern = function (r) {
        var n,
          i,
          o = r[0] + r[1],
          s = o + r[2] + r[3],
          a = o / s;
        if (a >= t.MIN_FINDER_PATTERN_RATIO && a <= t.MAX_FINDER_PATTERN_RATIO) {
          var { MAX_SAFE_INTEGER: l, MIN_SAFE_INTEGER: c } = Number;
          try {
            for (var u = Xie(r), d = u.next(); !d.done; d = u.next()) {
              var h = d.value;
              if (h > c) c = h;
              if (h < l) l = h;
            }
          } catch (f) {
            n = { error: f };
          } finally {
            try {
              if (d && !d.done && (i = u.return)) i.call(u);
            } finally {
              if (n) throw n.error;
            }
          }
          return c < 10 * l;
        }
        return !1;
      }),
      (t.MAX_AVG_VARIANCE = 0.2),
      (t.MAX_INDIVIDUAL_VARIANCE = 0.45),
      (t.MIN_FINDER_PATTERN_RATIO = 0.7916666666666666),
      (t.MAX_FINDER_PATTERN_RATIO = 0.8928571428571429),
      t
    );
  })(En),
  Ku = jie;
var Kie = (function () {
    function e(t, r) {
      ((this.value = t), (this.checksumPortion = r));
    }
    return (
      (e.prototype.getValue = function () {
        return this.value;
      }),
      (e.prototype.getChecksumPortion = function () {
        return this.checksumPortion;
      }),
      (e.prototype.toString = function () {
        return this.value + "(" + this.checksumPortion + ")";
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.value === r.value && this.checksumPortion === r.checksumPortion;
      }),
      (e.prototype.hashCode = function () {
        return this.value ^ this.checksumPortion;
      }),
      e
    );
  })(),
  d0 = Kie;
var qie = (function () {
    function e(t, r, n, i, o) {
      ((this.value = t),
        (this.startEnd = r),
        (this.resultPoints = []),
        this.resultPoints.push(new ct(n, o)),
        this.resultPoints.push(new ct(i, o)));
    }
    return (
      (e.prototype.getValue = function () {
        return this.value;
      }),
      (e.prototype.getStartEnd = function () {
        return this.startEnd;
      }),
      (e.prototype.getResultPoints = function () {
        return this.resultPoints;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.value === r.value;
      }),
      (e.prototype.hashCode = function () {
        return this.value;
      }),
      e
    );
  })(),
  K3 = qie;
var Zie = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  $ie = (function () {
    function e() {}
    return (
      (e.getRSSvalue = function (t, r, n) {
        var i,
          o,
          s = 0;
        try {
          for (var a = Zie(t), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            s += c;
          }
        } catch (y) {
          i = { error: y };
        } finally {
          try {
            if (l && !l.done && (o = a.return)) o.call(a);
          } finally {
            if (i) throw i.error;
          }
        }
        var u = 0,
          d = 0,
          h = t.length;
        for (var f = 0; f < h - 1; f++) {
          var p = void 0;
          for (p = 1, d |= 1 << f; p < t[f]; p++, d &= ~(1 << f)) {
            var g = e.combins(s - p - 1, h - f - 2);
            if (n && d === 0 && s - p - (h - f - 1) >= h - f - 1)
              g -= e.combins(s - p - (h - f), h - f - 2);
            if (h - f - 1 > 1) {
              var m = 0;
              for (var A = s - p - (h - f - 2); A > r; A--)
                m += e.combins(s - p - A - 1, h - f - 3);
              g -= m * (h - 1 - f);
            } else if (s - p > r) g--;
            u += g;
          }
          s -= p;
        }
        return u;
      }),
      (e.combins = function (t, r) {
        var n = 0,
          i = 0;
        if (t - r > r) ((i = r), (n = t - r));
        else ((i = t - r), (n = r));
        var o = 1,
          s = 1;
        for (var a = t; a > n; a--) if (((o *= a), s <= i)) ((o = Math.trunc(o / s)), s++);
        while (s <= i) ((o = Math.trunc(o / s)), s++);
        return o;
      }),
      e
    );
  })(),
  dh = $ie;
var Jie = (function () {
    function e() {}
    return (
      (e.buildBitArray = function (t) {
        var r = t.length * 2 - 1;
        if (t[t.length - 1].getRightChar() === null) r -= 1;
        var n = 12 * r,
          i = new $n(n),
          o = 0,
          s = t[0],
          a = s.getRightChar().getValue();
        for (var l = 11; l >= 0; --l) {
          if ((a & (1 << l)) !== 0) i.set(o);
          o++;
        }
        for (var l = 1; l < t.length; ++l) {
          var c = t[l],
            u = c.getLeftChar().getValue();
          for (var d = 11; d >= 0; --d) {
            if ((u & (1 << d)) !== 0) i.set(o);
            o++;
          }
          if (c.getRightChar() !== null) {
            var h = c.getRightChar().getValue();
            for (var d = 11; d >= 0; --d) {
              if ((h & (1 << d)) !== 0) i.set(o);
              o++;
            }
          }
        }
        return i;
      }),
      e
    );
  })(),
  Wk = Jie;
var eoe = (function () {
    function e(t, r) {
      ((this.decodedInformation = t ? t : null), (this.finished = !!r));
    }
    return (
      (e.prototype.getDecodedInformation = function () {
        return this.decodedInformation;
      }),
      (e.prototype.isFinished = function () {
        return this.finished;
      }),
      e
    );
  })(),
  hh = eoe;
var qu;
(function (e) {
  ((e[(e.NUMERIC = 0)] = "NUMERIC"),
    (e[(e.ALPHA = 1)] = "ALPHA"),
    (e[(e.ISO_IEC_646 = 2)] = "ISO_IEC_646"));
})(qu || (qu = {}));
var toe = (function () {
    function e() {
      ((this.position = 0), (this.encoding = qu.NUMERIC));
    }
    return (
      (e.prototype.getPosition = function () {
        return this.position;
      }),
      (e.prototype.setPosition = function (t) {
        this.position = t;
      }),
      (e.prototype.incrementPosition = function (t) {
        this.position += t;
      }),
      (e.prototype.isAlpha = function () {
        return this.encoding === qu.ALPHA;
      }),
      (e.prototype.isNumeric = function () {
        return this.encoding === qu.NUMERIC;
      }),
      (e.prototype.isIsoIec646 = function () {
        return this.encoding === qu.ISO_IEC_646;
      }),
      (e.prototype.setNumeric = function () {
        this.encoding = qu.NUMERIC;
      }),
      (e.prototype.setAlpha = function () {
        this.encoding = qu.ALPHA;
      }),
      (e.prototype.setIsoIec646 = function () {
        this.encoding = qu.ISO_IEC_646;
      }),
      e
    );
  })(),
  Qk = toe;
var roe = (function () {
    function e(t) {
      this.newPosition = t;
    }
    return (
      (e.prototype.getNewPosition = function () {
        return this.newPosition;
      }),
      e
    );
  })(),
  q1 = roe;
var noe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  ioe = (function (e) {
    noe(t, e);
    function t(r, n) {
      var i = e.call(this, r) || this;
      return ((i.value = n), i);
    }
    return (
      (t.prototype.getValue = function () {
        return this.value;
      }),
      (t.prototype.isFNC1 = function () {
        return this.value === t.FNC1;
      }),
      (t.FNC1 = "$"),
      t
    );
  })(q1),
  yl = ioe;
var ooe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  soe = (function (e) {
    ooe(t, e);
    function t(r, n, i) {
      var o = e.call(this, r) || this;
      if (((o.newString = n), i === void 0)) ((o.remaining = !1), (o.remainingValue = 0));
      else ((o.remaining = !0), (o.remainingValue = i));
      return o;
    }
    return (
      (t.prototype.getNewString = function () {
        return this.newString;
      }),
      (t.prototype.isRemaining = function () {
        return this.remaining;
      }),
      (t.prototype.getRemainingValue = function () {
        return this.remainingValue;
      }),
      t
    );
  })(q1),
  fh = soe;
var aoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  loe = (function (e) {
    aoe(t, e);
    function t(r, n, i) {
      var o = e.call(this, r) || this;
      if (n < 0 || n > 10 || i < 0 || i > 10) throw new De();
      return ((o.firstDigit = n), (o.secondDigit = i), o);
    }
    return (
      (t.prototype.getFirstDigit = function () {
        return this.firstDigit;
      }),
      (t.prototype.getSecondDigit = function () {
        return this.secondDigit;
      }),
      (t.prototype.getValue = function () {
        return this.firstDigit * 10 + this.secondDigit;
      }),
      (t.prototype.isFirstDigitFNC1 = function () {
        return this.firstDigit === t.FNC1;
      }),
      (t.prototype.isSecondDigitFNC1 = function () {
        return this.secondDigit === t.FNC1;
      }),
      (t.FNC1 = 10),
      t
    );
  })(q1),
  h0 = loe;
var coe = (function () {
    function e() {}
    return (
      (e.fixed = function (t, r) {
        return function (n) {
          return e.processFixedAI(t, r, n);
        };
      }),
      (e.variable = function (t, r) {
        return function (n) {
          return e.processVariableAI(t, r, n);
        };
      }),
      (e.parseFieldsInGeneralPurpose = function (t) {
        if (!t) return null;
        if (t.length < 2) throw new Ce();
        var r = t.substring(0, 2),
          n = this.TWO_DIGIT_DATA_LENGTH.get(r);
        if (n) return n(t);
        if (t.length < 3) throw new Ce();
        var i = t.substring(0, 3),
          o = this.THREE_DIGIT_DATA_LENGTH.get(i);
        if (o) return o(t);
        var s = this.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH.get(i);
        if (s) return s(t);
        if (t.length < 4) throw new Ce();
        var a = t.substring(0, 4),
          l = this.FOUR_DIGIT_DATA_LENGTH.get(a);
        if (l) return l(t);
        throw new Ce();
      }),
      (e.processFixedAI = function (t, r, n) {
        if (n.length < t) throw new Ce();
        var i = n.substring(0, t);
        if (n.length < t + r) throw new Ce();
        var o = n.substring(t, t + r),
          s = n.substring(t + r),
          a = "(" + i + ")" + o,
          l = e.parseFieldsInGeneralPurpose(s);
        return l === null ? a : a + l;
      }),
      (e.processVariableAI = function (t, r, n) {
        var i = n.substring(0, t),
          o;
        if (n.length < t + r) o = n.length;
        else o = t + r;
        var s = n.substring(t, o),
          a = n.substring(o),
          l = "(" + i + ")" + s,
          c = e.parseFieldsInGeneralPurpose(a);
        return c === null ? l : l + c;
      }),
      (e.TWO_DIGIT_DATA_LENGTH = (function () {
        var t = /*@__PURE__*/ new Map();
        (t.set("00", e.fixed(2, 18)),
          t.set("01", e.fixed(2, 14)),
          t.set("02", e.fixed(2, 14)),
          t.set("10", e.variable(2, 20)),
          t.set("11", e.fixed(2, 6)),
          t.set("12", e.fixed(2, 6)),
          t.set("13", e.fixed(2, 6)),
          t.set("15", e.fixed(2, 6)),
          t.set("16", e.fixed(2, 6)),
          t.set("17", e.fixed(2, 6)),
          t.set("20", e.fixed(2, 2)),
          t.set("21", e.variable(2, 20)),
          t.set("22", e.variable(2, 29)),
          t.set("30", e.variable(2, 8)),
          t.set("37", e.variable(2, 8)));
        for (var r = 90; r <= 99; r++) t.set(String(r), e.variable(2, 30));
        return t;
      })()),
      (e.THREE_DIGIT_DATA_LENGTH = /*@__PURE__*/ new Map([
        ["235", e.variable(3, 28)],
        ["240", e.variable(3, 30)],
        ["241", e.variable(3, 30)],
        ["242", e.variable(3, 6)],
        ["243", e.variable(3, 20)],
        ["250", e.variable(3, 30)],
        ["251", e.variable(3, 30)],
        ["253", e.variable(3, 30)],
        ["254", e.variable(3, 20)],
        ["255", e.variable(3, 25)],
        ["400", e.variable(3, 30)],
        ["401", e.variable(3, 30)],
        ["402", e.fixed(3, 17)],
        ["403", e.variable(3, 30)],
        ["410", e.fixed(3, 13)],
        ["411", e.fixed(3, 13)],
        ["412", e.fixed(3, 13)],
        ["413", e.fixed(3, 13)],
        ["414", e.fixed(3, 13)],
        ["415", e.fixed(3, 13)],
        ["416", e.fixed(3, 13)],
        ["417", e.fixed(3, 13)],
        ["420", e.variable(3, 20)],
        ["421", e.variable(3, 15)],
        ["422", e.fixed(3, 3)],
        ["423", e.variable(3, 15)],
        ["424", e.fixed(3, 3)],
        ["425", e.variable(3, 15)],
        ["426", e.fixed(3, 3)],
        ["427", e.variable(3, 3)],
        ["710", e.variable(3, 20)],
        ["711", e.variable(3, 20)],
        ["712", e.variable(3, 20)],
        ["713", e.variable(3, 20)],
        ["714", e.variable(3, 20)],
        ["715", e.variable(3, 20)],
      ])),
      (e.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH = (function () {
        var t = /*@__PURE__*/ new Map();
        for (var r = 310; r <= 316; r++) t.set(String(r), e.fixed(4, 6));
        for (var r = 320; r <= 337; r++) t.set(String(r), e.fixed(4, 6));
        for (var r = 340; r <= 357; r++) t.set(String(r), e.fixed(4, 6));
        for (var r = 360; r <= 369; r++) t.set(String(r), e.fixed(4, 6));
        return (
          t.set("390", e.variable(4, 15)),
          t.set("391", e.variable(4, 18)),
          t.set("392", e.variable(4, 15)),
          t.set("393", e.variable(4, 18)),
          t.set("394", e.fixed(4, 4)),
          t.set("395", e.fixed(4, 6)),
          t.set("703", e.variable(4, 30)),
          t.set("723", e.variable(4, 30)),
          t
        );
      })()),
      (e.FOUR_DIGIT_DATA_LENGTH = (function () {
        var t = /*@__PURE__*/ new Map();
        return (
          t.set("4300", e.variable(4, 35)),
          t.set("4301", e.variable(4, 35)),
          t.set("4302", e.variable(4, 70)),
          t.set("4303", e.variable(4, 70)),
          t.set("4304", e.variable(4, 70)),
          t.set("4305", e.variable(4, 70)),
          t.set("4306", e.variable(4, 70)),
          t.set("4307", e.fixed(4, 2)),
          t.set("4308", e.variable(4, 30)),
          t.set("4309", e.fixed(4, 20)),
          t.set("4310", e.variable(4, 35)),
          t.set("4311", e.variable(4, 35)),
          t.set("4312", e.variable(4, 70)),
          t.set("4313", e.variable(4, 70)),
          t.set("4314", e.variable(4, 70)),
          t.set("4315", e.variable(4, 70)),
          t.set("4316", e.variable(4, 70)),
          t.set("4317", e.fixed(4, 2)),
          t.set("4318", e.variable(4, 20)),
          t.set("4319", e.variable(4, 30)),
          t.set("4320", e.variable(4, 35)),
          t.set("4321", e.fixed(4, 1)),
          t.set("4322", e.fixed(4, 1)),
          t.set("4323", e.fixed(4, 1)),
          t.set("4324", e.fixed(4, 10)),
          t.set("4325", e.fixed(4, 10)),
          t.set("4326", e.fixed(4, 6)),
          t.set("7001", e.fixed(4, 13)),
          t.set("7002", e.variable(4, 30)),
          t.set("7003", e.fixed(4, 10)),
          t.set("7004", e.variable(4, 4)),
          t.set("7005", e.variable(4, 12)),
          t.set("7006", e.fixed(4, 6)),
          t.set("7007", e.variable(4, 12)),
          t.set("7008", e.variable(4, 3)),
          t.set("7009", e.variable(4, 10)),
          t.set("7010", e.variable(4, 2)),
          t.set("7011", e.variable(4, 10)),
          t.set("7020", e.variable(4, 20)),
          t.set("7021", e.variable(4, 20)),
          t.set("7022", e.variable(4, 20)),
          t.set("7023", e.variable(4, 30)),
          t.set("7040", e.fixed(4, 4)),
          t.set("7240", e.variable(4, 20)),
          t.set("8001", e.fixed(4, 14)),
          t.set("8002", e.variable(4, 20)),
          t.set("8003", e.variable(4, 30)),
          t.set("8004", e.variable(4, 30)),
          t.set("8005", e.fixed(4, 6)),
          t.set("8006", e.fixed(4, 18)),
          t.set("8007", e.variable(4, 34)),
          t.set("8008", e.variable(4, 12)),
          t.set("8009", e.variable(4, 50)),
          t.set("8010", e.variable(4, 30)),
          t.set("8011", e.variable(4, 12)),
          t.set("8012", e.variable(4, 20)),
          t.set("8013", e.variable(4, 25)),
          t.set("8017", e.fixed(4, 18)),
          t.set("8018", e.fixed(4, 18)),
          t.set("8019", e.variable(4, 10)),
          t.set("8020", e.variable(4, 25)),
          t.set("8026", e.fixed(4, 18)),
          t.set("8100", e.fixed(4, 6)),
          t.set("8101", e.fixed(4, 10)),
          t.set("8102", e.fixed(4, 2)),
          t.set("8110", e.variable(4, 70)),
          t.set("8111", e.fixed(4, 4)),
          t.set("8112", e.variable(4, 70)),
          t.set("8200", e.variable(4, 70)),
          t
        );
      })()),
      e
    );
  })(),
  Yk = coe;
var uoe = (function () {
    function e(t) {
      ((this.current = new Qk()), (this.buffer = new Ot()), (this.information = t));
    }
    return (
      (e.prototype.decodeAllCodes = function (t, r) {
        var n = r,
          i = null;
        do {
          var o = this.decodeGeneralPurposeField(n, i),
            s = Yk.parseFieldsInGeneralPurpose(o.getNewString());
          if (s !== null) t.append(s);
          if (o.isRemaining()) i = "" + o.getRemainingValue();
          else i = null;
          if (n === o.getNewPosition()) break;
          n = o.getNewPosition();
        } while (!0);
        return t.toString();
      }),
      (e.prototype.isStillNumeric = function (t) {
        if (t + 7 > this.information.getSize()) return t + 4 <= this.information.getSize();
        for (var r = t; r < t + 3; ++r) if (this.information.get(r)) return !0;
        return this.information.get(t + 3);
      }),
      (e.prototype.decodeNumeric = function (t) {
        if (t + 7 > this.information.getSize()) {
          var r = this.extractNumericValueFromBitArray(t, 4);
          if (r === 0) return new h0(this.information.getSize(), h0.FNC1, h0.FNC1);
          return new h0(this.information.getSize(), r - 1, h0.FNC1);
        }
        var n = this.extractNumericValueFromBitArray(t, 7),
          i = Math.trunc((n - 8) / 11),
          o = (n - 8) % 11;
        return new h0(t + 7, i, o);
      }),
      (e.prototype.extractNumericValueFromBitArray = function (t, r) {
        return e.extractNumericValueFromBitArray(this.information, t, r);
      }),
      (e.extractNumericValueFromBitArray = function (t, r, n) {
        var i = 0;
        for (var o = 0; o < n; ++o) if (t.get(r + o)) i |= 1 << (n - o - 1);
        return i;
      }),
      (e.prototype.decodeGeneralPurposeField = function (t, r) {
        if ((this.buffer.setLengthToZero(), r !== null)) this.buffer.append(r);
        this.current.setPosition(t);
        var n = this.parseBlocks();
        if (n !== null && n.isRemaining())
          return new fh(this.current.getPosition(), this.buffer.toString(), n.getRemainingValue());
        return new fh(this.current.getPosition(), this.buffer.toString());
      }),
      (e.prototype.parseBlocks = function () {
        var t = !1,
          r;
        do {
          var n = this.current.getPosition();
          if (this.current.isAlpha()) ((r = this.parseAlphaBlock()), (t = r.isFinished()));
          else if (this.current.isIsoIec646())
            ((r = this.parseIsoIec646Block()), (t = r.isFinished()));
          else ((r = this.parseNumericBlock()), (t = r.isFinished()));
          var i = n !== this.current.getPosition();
          if (!i && !t) break;
        } while (!t);
        return r.getDecodedInformation();
      }),
      (e.prototype.parseNumericBlock = function () {
        while (this.isStillNumeric(this.current.getPosition())) {
          var t = this.decodeNumeric(this.current.getPosition());
          if ((this.current.setPosition(t.getNewPosition()), t.isFirstDigitFNC1())) {
            var r = void 0;
            if (t.isSecondDigitFNC1())
              r = new fh(this.current.getPosition(), this.buffer.toString());
            else r = new fh(this.current.getPosition(), this.buffer.toString(), t.getSecondDigit());
            return new hh(r, !0);
          }
          if ((this.buffer.append("" + t.getFirstDigit()), t.isSecondDigitFNC1())) {
            var r = new fh(this.current.getPosition(), this.buffer.toString());
            return new hh(r, !0);
          }
          this.buffer.append("" + t.getSecondDigit());
        }
        if (this.isNumericToAlphaNumericLatch(this.current.getPosition()))
          (this.current.setAlpha(), this.current.incrementPosition(4));
        return new hh();
      }),
      (e.prototype.parseIsoIec646Block = function () {
        while (this.isStillIsoIec646(this.current.getPosition())) {
          var t = this.decodeIsoIec646(this.current.getPosition());
          if ((this.current.setPosition(t.getNewPosition()), t.isFNC1())) {
            var r = new fh(this.current.getPosition(), this.buffer.toString());
            return new hh(r, !0);
          }
          this.buffer.append(t.getValue());
        }
        if (this.isAlphaOr646ToNumericLatch(this.current.getPosition()))
          (this.current.incrementPosition(3), this.current.setNumeric());
        else if (this.isAlphaTo646ToAlphaLatch(this.current.getPosition())) {
          if (this.current.getPosition() + 5 < this.information.getSize())
            this.current.incrementPosition(5);
          else this.current.setPosition(this.information.getSize());
          this.current.setAlpha();
        }
        return new hh();
      }),
      (e.prototype.parseAlphaBlock = function () {
        while (this.isStillAlpha(this.current.getPosition())) {
          var t = this.decodeAlphanumeric(this.current.getPosition());
          if ((this.current.setPosition(t.getNewPosition()), t.isFNC1())) {
            var r = new fh(this.current.getPosition(), this.buffer.toString());
            return new hh(r, !0);
          }
          this.buffer.append(t.getValue());
        }
        if (this.isAlphaOr646ToNumericLatch(this.current.getPosition()))
          (this.current.incrementPosition(3), this.current.setNumeric());
        else if (this.isAlphaTo646ToAlphaLatch(this.current.getPosition())) {
          if (this.current.getPosition() + 5 < this.information.getSize())
            this.current.incrementPosition(5);
          else this.current.setPosition(this.information.getSize());
          this.current.setIsoIec646();
        }
        return new hh();
      }),
      (e.prototype.isStillIsoIec646 = function (t) {
        if (t + 5 > this.information.getSize()) return !1;
        var r = this.extractNumericValueFromBitArray(t, 5);
        if (r >= 5 && r < 16) return !0;
        if (t + 7 > this.information.getSize()) return !1;
        var n = this.extractNumericValueFromBitArray(t, 7);
        if (n >= 64 && n < 116) return !0;
        if (t + 8 > this.information.getSize()) return !1;
        var i = this.extractNumericValueFromBitArray(t, 8);
        return i >= 232 && i < 253;
      }),
      (e.prototype.decodeIsoIec646 = function (t) {
        var r = this.extractNumericValueFromBitArray(t, 5);
        if (r === 15) return new yl(t + 5, yl.FNC1);
        if (r >= 5 && r < 15) return new yl(t + 5, String.fromCharCode(48 + r - 5));
        var n = this.extractNumericValueFromBitArray(t, 7);
        if (n >= 64 && n < 90) return new yl(t + 7, String.fromCharCode(n + 1));
        if (n >= 90 && n < 116) return new yl(t + 7, String.fromCharCode(n + 7));
        var i = this.extractNumericValueFromBitArray(t, 8),
          o;
        switch (i) {
          case 232:
            o = "!";
            break;
          case 233:
            o = '"';
            break;
          case 234:
            o = "%";
            break;
          case 235:
            o = "&";
            break;
          case 236:
            o = "'";
            break;
          case 237:
            o = "(";
            break;
          case 238:
            o = ")";
            break;
          case 239:
            o = "*";
            break;
          case 240:
            o = "+";
            break;
          case 241:
            o = ",";
            break;
          case 242:
            o = "-";
            break;
          case 243:
            o = ".";
            break;
          case 244:
            o = "/";
            break;
          case 245:
            o = ":";
            break;
          case 246:
            o = ";";
            break;
          case 247:
            o = "<";
            break;
          case 248:
            o = "=";
            break;
          case 249:
            o = ">";
            break;
          case 250:
            o = "?";
            break;
          case 251:
            o = "_";
            break;
          case 252:
            o = " ";
            break;
          default:
            throw new De();
        }
        return new yl(t + 8, o);
      }),
      (e.prototype.isStillAlpha = function (t) {
        if (t + 5 > this.information.getSize()) return !1;
        var r = this.extractNumericValueFromBitArray(t, 5);
        if (r >= 5 && r < 16) return !0;
        if (t + 6 > this.information.getSize()) return !1;
        var n = this.extractNumericValueFromBitArray(t, 6);
        return n >= 16 && n < 63;
      }),
      (e.prototype.decodeAlphanumeric = function (t) {
        var r = this.extractNumericValueFromBitArray(t, 5);
        if (r === 15) return new yl(t + 5, yl.FNC1);
        if (r >= 5 && r < 15) return new yl(t + 5, String.fromCharCode(48 + r - 5));
        var n = this.extractNumericValueFromBitArray(t, 6);
        if (n >= 32 && n < 58) return new yl(t + 6, String.fromCharCode(n + 33));
        var i;
        switch (n) {
          case 58:
            i = "*";
            break;
          case 59:
            i = ",";
            break;
          case 60:
            i = "-";
            break;
          case 61:
            i = ".";
            break;
          case 62:
            i = "/";
            break;
          default:
            throw new Xi("Decoding invalid alphanumeric value: " + n);
        }
        return new yl(t + 6, i);
      }),
      (e.prototype.isAlphaTo646ToAlphaLatch = function (t) {
        if (t + 1 > this.information.getSize()) return !1;
        for (var r = 0; r < 5 && r + t < this.information.getSize(); ++r)
          if (r === 2) {
            if (!this.information.get(t + 2)) return !1;
          } else if (this.information.get(t + r)) return !1;
        return !0;
      }),
      (e.prototype.isAlphaOr646ToNumericLatch = function (t) {
        if (t + 3 > this.information.getSize()) return !1;
        for (var r = t; r < t + 3; ++r) if (this.information.get(r)) return !1;
        return !0;
      }),
      (e.prototype.isNumericToAlphaNumericLatch = function (t) {
        if (t + 1 > this.information.getSize()) return !1;
        for (var r = 0; r < 4 && r + t < this.information.getSize(); ++r)
          if (this.information.get(t + r)) return !1;
        return !0;
      }),
      e
    );
  })(),
  Z1 = uoe;
var doe = (function () {
    function e(t) {
      ((this.information = t), (this.generalDecoder = new Z1(t)));
    }
    return (
      (e.prototype.getInformation = function () {
        return this.information;
      }),
      (e.prototype.getGeneralDecoder = function () {
        return this.generalDecoder;
      }),
      e
    );
  })(),
  q3 = doe;
var hoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  foe = (function (e) {
    hoe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.encodeCompressedGtin = function (r, n) {
        r.append("(01)");
        var i = r.length();
        (r.append("9"), this.encodeCompressedGtinWithoutAI(r, n, i));
      }),
      (t.prototype.encodeCompressedGtinWithoutAI = function (r, n, i) {
        for (var o = 0; o < 4; ++o) {
          var s = this.getGeneralDecoder().extractNumericValueFromBitArray(n + 10 * o, 10);
          if (s < 100) r.append("0");
          if (s < 10) r.append("0");
          r.append("" + s);
        }
        t.appendCheckDigit(r, i);
      }),
      (t.appendCheckDigit = function (r, n) {
        var i = 0;
        for (var o = 0; o < 13; o++) {
          var s = r.charAt(o + n).charCodeAt(0) - 48;
          i += (o & 1) === 0 ? 3 * s : s;
        }
        if (((i = 10 - (i % 10)), i === 10)) i = 0;
        r.append("" + i);
      }),
      (t.GTIN_SIZE = 40),
      t
    );
  })(q3),
  Ds = foe;
var poe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  moe = (function (e) {
    poe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.parseInformation = function () {
        var r = new Ot();
        r.append("(01)");
        var n = r.length(),
          i = this.getGeneralDecoder().extractNumericValueFromBitArray(t.HEADER_SIZE, 4);
        return (
          r.append("" + i),
          this.encodeCompressedGtinWithoutAI(r, t.HEADER_SIZE + 4, n),
          this.getGeneralDecoder().decodeAllCodes(r, t.HEADER_SIZE + 44)
        );
      }),
      (t.HEADER_SIZE = 4),
      t
    );
  })(Ds),
  Xk = moe;
var goe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Aoe = (function (e) {
    goe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.parseInformation = function () {
        var r = new Ot();
        return this.getGeneralDecoder().decodeAllCodes(r, t.HEADER_SIZE);
      }),
      (t.HEADER_SIZE = 5),
      t
    );
  })(q3),
  jk = Aoe;
var yoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  xoe = (function (e) {
    yoe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.encodeCompressedWeight = function (r, n, i) {
        var o = this.getGeneralDecoder().extractNumericValueFromBitArray(n, i);
        this.addWeightCode(r, o);
        var s = this.checkWeight(o),
          a = 1e5;
        for (var l = 0; l < 5; ++l) {
          if (s < a) r.append("0");
          a = Math.trunc(a / 10);
        }
        r.append("" + s);
      }),
      t
    );
  })(Ds),
  $1 = xoe;
var boe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  _oe = (function (e) {
    boe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.parseInformation = function () {
        if (this.getInformation().getSize() !== t.HEADER_SIZE + $1.GTIN_SIZE + t.WEIGHT_SIZE)
          throw new Ce();
        var r = new Ot();
        return (
          this.encodeCompressedGtin(r, t.HEADER_SIZE),
          this.encodeCompressedWeight(r, t.HEADER_SIZE + $1.GTIN_SIZE, t.WEIGHT_SIZE),
          r.toString()
        );
      }),
      (t.HEADER_SIZE = 5),
      (t.WEIGHT_SIZE = 15),
      t
    );
  })($1),
  P_ = _oe;
var voe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Coe = (function (e) {
    voe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.addWeightCode = function (r, n) {
        r.append("(3103)");
      }),
      (t.prototype.checkWeight = function (r) {
        return r;
      }),
      t
    );
  })(P_),
  Kk = Coe;
var woe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Toe = (function (e) {
    woe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.addWeightCode = function (r, n) {
        if (n < 1e4) r.append("(3202)");
        else r.append("(3203)");
      }),
      (t.prototype.checkWeight = function (r) {
        if (r < 1e4) return r;
        return r - 1e4;
      }),
      t
    );
  })(P_),
  qk = Toe;
var Eoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Soe = (function (e) {
    Eoe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.parseInformation = function () {
        if (this.getInformation().getSize() < t.HEADER_SIZE + Ds.GTIN_SIZE) throw new Ce();
        var r = new Ot();
        this.encodeCompressedGtin(r, t.HEADER_SIZE);
        var n = this.getGeneralDecoder().extractNumericValueFromBitArray(
          t.HEADER_SIZE + Ds.GTIN_SIZE,
          t.LAST_DIGIT_SIZE,
        );
        (r.append("(392"), r.append("" + n), r.append(")"));
        var i = this.getGeneralDecoder().decodeGeneralPurposeField(
          t.HEADER_SIZE + Ds.GTIN_SIZE + t.LAST_DIGIT_SIZE,
          null,
        );
        return (r.append(i.getNewString()), r.toString());
      }),
      (t.HEADER_SIZE = 8),
      (t.LAST_DIGIT_SIZE = 2),
      t
    );
  })(Ds),
  Zk = Soe;
var Moe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Ioe = (function (e) {
    Moe(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.parseInformation = function () {
        if (this.getInformation().getSize() < t.HEADER_SIZE + Ds.GTIN_SIZE) throw new Ce();
        var r = new Ot();
        this.encodeCompressedGtin(r, t.HEADER_SIZE);
        var n = this.getGeneralDecoder().extractNumericValueFromBitArray(
          t.HEADER_SIZE + Ds.GTIN_SIZE,
          t.LAST_DIGIT_SIZE,
        );
        (r.append("(393"), r.append("" + n), r.append(")"));
        var i = this.getGeneralDecoder().extractNumericValueFromBitArray(
          t.HEADER_SIZE + Ds.GTIN_SIZE + t.LAST_DIGIT_SIZE,
          t.FIRST_THREE_DIGITS_SIZE,
        );
        if (i < 100) r.append("0");
        if (i < 10) r.append("0");
        r.append("" + i);
        var o = this.getGeneralDecoder().decodeGeneralPurposeField(
          t.HEADER_SIZE + Ds.GTIN_SIZE + t.LAST_DIGIT_SIZE + t.FIRST_THREE_DIGITS_SIZE,
          null,
        );
        return (r.append(o.getNewString()), r.toString());
      }),
      (t.HEADER_SIZE = 8),
      (t.LAST_DIGIT_SIZE = 2),
      (t.FIRST_THREE_DIGITS_SIZE = 10),
      t
    );
  })(Ds),
  $k = Ioe;
var Roe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Ooe = (function (e) {
    Roe(t, e);
    function t(r, n, i) {
      var o = e.call(this, r) || this;
      return ((o.dateCode = i), (o.firstAIdigits = n), o);
    }
    return (
      (t.prototype.parseInformation = function () {
        if (
          this.getInformation().getSize() !==
          t.HEADER_SIZE + t.GTIN_SIZE + t.WEIGHT_SIZE + t.DATE_SIZE
        )
          throw new Ce();
        var r = new Ot();
        return (
          this.encodeCompressedGtin(r, t.HEADER_SIZE),
          this.encodeCompressedWeight(r, t.HEADER_SIZE + t.GTIN_SIZE, t.WEIGHT_SIZE),
          this.encodeCompressedDate(r, t.HEADER_SIZE + t.GTIN_SIZE + t.WEIGHT_SIZE),
          r.toString()
        );
      }),
      (t.prototype.encodeCompressedDate = function (r, n) {
        var i = this.getGeneralDecoder().extractNumericValueFromBitArray(n, t.DATE_SIZE);
        if (i === 38400) return;
        (r.append("("), r.append(this.dateCode), r.append(")"));
        var o = i % 32;
        i = Math.trunc(i / 32);
        var s = (i % 12) + 1;
        i = Math.trunc(i / 12);
        var a = i;
        if (a < 10) r.append("0");
        if ((r.append("" + a), s < 10)) r.append("0");
        if ((r.append("" + s), o < 10)) r.append("0");
        r.append("" + o);
      }),
      (t.prototype.addWeightCode = function (r, n) {
        (r.append("("),
          r.append(this.firstAIdigits),
          r.append("" + Math.trunc(n / 1e5)),
          r.append(")"));
      }),
      (t.prototype.checkWeight = function (r) {
        return r % 1e5;
      }),
      (t.HEADER_SIZE = 8),
      (t.WEIGHT_SIZE = 20),
      (t.DATE_SIZE = 16),
      t
    );
  })($1),
  Zu = Ooe;
function _S(e) {
  if (e.get(1)) return new Xk(e);
  if (!e.get(2)) return new jk(e);
  var t = Z1.extractNumericValueFromBitArray(e, 1, 4);
  switch (t) {
    case 4:
      return new Kk(e);
    case 5:
      return new qk(e);
  }
  var r = Z1.extractNumericValueFromBitArray(e, 1, 5);
  switch (r) {
    case 12:
      return new Zk(e);
    case 13:
      return new $k(e);
  }
  var n = Z1.extractNumericValueFromBitArray(e, 1, 7);
  switch (n) {
    case 56:
      return new Zu(e, "310", "11");
    case 57:
      return new Zu(e, "320", "11");
    case 58:
      return new Zu(e, "310", "13");
    case 59:
      return new Zu(e, "320", "13");
    case 60:
      return new Zu(e, "310", "15");
    case 61:
      return new Zu(e, "320", "15");
    case 62:
      return new Zu(e, "310", "17");
    case 63:
      return new Zu(e, "320", "17");
  }
  throw new Xi("unknown decoder: " + e);
}
var Loe = (function () {
    function e(t, r, n) {
      ((this.leftChar = t), (this.rightChar = r), (this.finderPattern = n));
    }
    return (
      (e.prototype.getLeftChar = function () {
        return this.leftChar;
      }),
      (e.prototype.getRightChar = function () {
        return this.rightChar;
      }),
      (e.prototype.getFinderPattern = function () {
        return this.finderPattern;
      }),
      (e.prototype.mustBeLast = function () {
        return this.rightChar === null;
      }),
      (e.prototype.toString = function () {
        return (
          "[ " +
          this.leftChar +
          ", " +
          this.rightChar +
          " : " +
          (this.finderPattern === null ? "null" : this.finderPattern.getValue()) +
          " ]"
        );
      }),
      (e.equals = function (t, r) {
        if (r === null) return t === null;
        if (!(r instanceof e)) return !1;
        return (
          (t.leftChar === null ? r.leftChar === null : t.leftChar.equals(r.leftChar)) &&
          (t.rightChar === null ? r.rightChar === null : t.rightChar.equals(r.rightChar)) &&
          (t.finderPattern === null
            ? r.finderPattern === null
            : t.finderPattern.equals(r.finderPattern))
        );
      }),
      (e.prototype.hashCode = function () {
        return (
          e.hashNotNull(this.leftChar) ^
          e.hashNotNull(this.rightChar) ^
          e.hashNotNull(this.finderPattern)
        );
      }),
      (e.hashNotNull = function (t) {
        return t === null ? 0 : t.hashCode();
      }),
      e
    );
  })(),
  J1 = Loe;
var Boe = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Foe = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  Doe = (function () {
    function e(t, r) {
      ((this.pairs = Foe([], Boe(t), !1)), (this.rowNumber = r));
    }
    return (
      (e.prototype.getPairs = function () {
        return this.pairs;
      }),
      (e.prototype.getRowNumber = function () {
        return this.rowNumber;
      }),
      (e.prototype.isEquivalent = function (t) {
        return e.listEquals(this.getPairs(), t);
      }),
      (e.prototype.toString = function () {
        return "{ " + this.pairs + " }";
      }),
      (e.equals = function (t, r) {
        if (t === null) return r === null;
        if (!(r instanceof e)) return !1;
        return e.listEquals(t.pairs, r.getPairs());
      }),
      (e.listEquals = function (t, r) {
        if (t.length !== r.length) return !1;
        return t.every(function (n, i) {
          var o = r[i];
          return J1.equals(n, o);
        });
      }),
      e
    );
  })(),
  Jk = Doe;
var Noe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  eU = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  tU = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  em = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Poe = (function (e) {
    Noe(t, e);
    function t() {
      var r = e.apply(this, tU([], eU(arguments), !1)) || this;
      return (
        (r.pairs = Array(t.MAX_PAIRS)),
        (r.rows = []),
        (r.startEnd = [0, 0]),
        (r.startFromEven = !1),
        r
      );
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        this.startFromEven = !1;
        try {
          return t.constructResult(this.decodeRow2pairs(r, n));
        } catch (o) {
          if (o instanceof Ce);
          else throw o;
        }
        return ((this.startFromEven = !0), t.constructResult(this.decodeRow2pairs(r, n)));
      }),
      (t.prototype.reset = function () {
        ((this.pairs.length = 0), (this.rows.length = 0));
      }),
      (t.prototype.decodeRow2pairs = function (r, n) {
        this.pairs.length = 0;
        var i = !1;
        while (!i)
          try {
            this.pairs.push(this.retrieveNextPair(n, this.pairs, r));
          } catch (a) {
            if (a instanceof Ce) {
              if (this.pairs.length === 0) throw a;
              i = !0;
            } else throw a;
          }
        if (this.checkChecksum() && t.isValidSequence(this.pairs, !0)) return this.pairs;
        var o = this.rows.length > 0;
        if ((this.storeRow(r), o)) {
          var s = this.checkRowsBoolean(!1);
          if (s !== null) return s;
          if (((s = this.checkRowsBoolean(!0)), s !== null)) return s;
        }
        throw new Ce();
      }),
      (t.prototype.checkRowsBoolean = function (r) {
        if (this.rows.length > 25) return ((this.rows.length = 0), null);
        if (((this.pairs.length = 0), r)) this.rows.reverse();
        var n = null;
        try {
          n = this.checkRows([], 0);
        } catch (i) {
          if (i instanceof Ce);
          else throw i;
        }
        if (r) this.rows.reverse();
        return n;
      }),
      (t.prototype.checkRows = function (r, n) {
        var i;
        for (var o = n; o < this.rows.length; o++) {
          var s = this.rows[o];
          (i = this.pairs).push.apply(i, tU([], eU(s.getPairs()), !1));
          var a = s.getPairs().length;
          if (t.isValidSequence(this.pairs, !1)) {
            if (this.checkChecksum()) return this.pairs;
            r.push(s);
            try {
              return this.checkRows(r, o + 1);
            } catch (l) {
              if (l instanceof Ce) (r.pop(), this.pairs.splice(this.pairs.length - a, a));
              else throw l;
            }
          } else this.pairs.splice(this.pairs.length - a, a);
        }
        throw new Ce();
      }),
      (t.isValidSequence = function (r, n) {
        var i, o;
        try {
          for (var s = em(t.FINDER_PATTERN_SEQUENCES), a = s.next(); !a.done; a = s.next()) {
            var l = a.value,
              c = n ? r.length === l.length : r.length <= l.length;
            if (c) {
              var u = !0;
              for (var d = 0; d < r.length; d++)
                if (r[d].getFinderPattern().getValue() !== l[d]) {
                  u = !1;
                  break;
                }
              if (u) return !0;
            }
          }
        } catch (h) {
          i = { error: h };
        } finally {
          try {
            if (a && !a.done && (o = s.return)) o.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return !1;
      }),
      (t.mayFollow = function (r, n) {
        var i, o;
        if (r.length === 0) return !0;
        try {
          for (var s = em(this.FINDER_PATTERN_SEQUENCES), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            if (r.length + 1 <= l.length) {
              for (var c = r.length; c < l.length; c++)
                if (l[c] === n) {
                  var u = !0;
                  for (var d = 0; d < r.length; d++) {
                    var h = l[c - d - 1],
                      f = r[r.length - d - 1].getFinderPattern().getValue();
                    if (h !== f) {
                      u = !1;
                      break;
                    }
                  }
                  if (u) return !0;
                }
            }
          }
        } catch (p) {
          i = { error: p };
        } finally {
          try {
            if (a && !a.done && (o = s.return)) o.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return !1;
      }),
      (t.prototype.storeRow = function (r) {
        var n = 0,
          i = !1,
          o = !1;
        while (n < this.rows.length) {
          var s = this.rows[n];
          if (s.getRowNumber() > r) {
            o = s.isEquivalent(this.pairs);
            break;
          }
          ((i = s.isEquivalent(this.pairs)), n++);
        }
        if (o || i) return;
        if (t.isPartialRow(this.pairs, this.rows)) return;
        (this.rows.splice(n, 0, new Jk(this.pairs, r)),
          this.removePartialRows(this.pairs, this.rows));
      }),
      (t.prototype.removePartialRows = function (r, n) {
        var i, o;
        for (var s = n.length - 1; s >= 0; s--) {
          var a = n[s];
          if (a.getPairs().length !== r.length) {
            var l = !0,
              c = function (p) {
                if (
                  !r.some(function (g) {
                    return J1.equals(p, g);
                  })
                )
                  return ((l = !1), "break");
              };
            try {
              for (var u = ((i = void 0), em(a.getPairs())), d = u.next(); !d.done; d = u.next()) {
                var h = d.value,
                  f = c(h);
                if (f === "break") break;
              }
            } catch (p) {
              i = { error: p };
            } finally {
              try {
                if (d && !d.done && (o = u.return)) o.call(u);
              } finally {
                if (i) throw i.error;
              }
            }
            if (l) n.splice(s, 1);
          }
        }
      }),
      (t.isPartialRow = function (r, n) {
        var i, o, s, a, l, c;
        try {
          for (var u = em(n), d = u.next(); !d.done; d = u.next()) {
            var h = d.value,
              f = !0;
            try {
              for (var p = ((s = void 0), em(r)), g = p.next(); !g.done; g = p.next()) {
                var m = g.value,
                  A = !1;
                try {
                  for (
                    var y = ((l = void 0), em(h.getPairs())), x = y.next();
                    !x.done;
                    x = y.next()
                  ) {
                    var b = x.value;
                    if (J1.equals(m, b)) {
                      A = !0;
                      break;
                    }
                  }
                } catch (v) {
                  l = { error: v };
                } finally {
                  try {
                    if (x && !x.done && (c = y.return)) c.call(y);
                  } finally {
                    if (l) throw l.error;
                  }
                }
                if (!A) {
                  f = !1;
                  break;
                }
              }
            } catch (v) {
              s = { error: v };
            } finally {
              try {
                if (g && !g.done && (a = p.return)) a.call(p);
              } finally {
                if (s) throw s.error;
              }
            }
            if (f) return !0;
          }
        } catch (v) {
          i = { error: v };
        } finally {
          try {
            if (d && !d.done && (o = u.return)) o.call(u);
          } finally {
            if (i) throw i.error;
          }
        }
        return !1;
      }),
      (t.prototype.getRows = function () {
        return this.rows;
      }),
      (t.constructResult = function (r) {
        var n = Wk.buildBitArray(r),
          i = _S(n),
          o = i.parseInformation(),
          s = r[0].getFinderPattern().getResultPoints(),
          a = r[r.length - 1].getFinderPattern().getResultPoints(),
          l = [s[0], s[1], a[0], a[1]];
        return new Xr(o, null, null, l, at.RSS_EXPANDED, null);
      }),
      (t.prototype.checkChecksum = function () {
        var r = this.pairs[0],
          n = r.getLeftChar(),
          i = r.getRightChar();
        if (i === null) return !1;
        var o = i.getChecksumPortion(),
          s = 2;
        for (var a = 1; a < this.pairs.length; ++a) {
          var l = this.pairs[a];
          ((o += l.getLeftChar().getChecksumPortion()), s++);
          var c = l.getRightChar();
          if (c !== null) ((o += c.getChecksumPortion()), s++);
        }
        o %= 211;
        var u = 211 * (s - 4) + o;
        return u === n.getValue();
      }),
      (t.getNextSecondBar = function (r, n) {
        var i = 0;
        if (r.get(n)) ((i = r.getNextUnset(n)), (i = r.getNextSet(i)));
        else ((i = r.getNextSet(n)), (i = r.getNextUnset(i)));
        return i;
      }),
      (t.prototype.retrieveNextPair = function (r, n, i) {
        var o = n.length % 2 === 0;
        if (this.startFromEven) o = !o;
        var s = null,
          a = null,
          l = !0,
          c = -1;
        do
          if (
            (this.findNextPair(r, n, c), (s = this.parseFoundFinderPattern(r, i, o, n)), s === null)
          )
            c = t.getNextSecondBar(r, this.startEnd[0]);
          else
            try {
              ((a = this.decodeDataCharacter(r, s, o, !0)), (l = !1));
            } catch (d) {
              if (d instanceof Ce) c = t.getNextSecondBar(r, this.startEnd[0]);
              else throw d;
            }
        while (l);
        if (n.length > 0 && n[n.length - 1].mustBeLast()) throw new Ce();
        var u = null;
        try {
          u = this.decodeDataCharacter(r, s, o, !1);
        } catch (d) {
          if (d instanceof Ce) u = null;
          else throw d;
        }
        return new J1(a, u, s);
      }),
      (t.prototype.findNextPair = function (r, n, i) {
        var o = this.getDecodeFinderCounters();
        ((o[0] = 0), (o[1] = 0), (o[2] = 0), (o[3] = 0));
        var s = r.getSize(),
          a = 0;
        if (i >= 0) a = i;
        else if (n.length === 0) a = 0;
        else {
          var l = n[n.length - 1];
          a = l.getFinderPattern().getStartEnd()[1];
        }
        var c = n.length % 2 !== 0;
        if (this.startFromEven) c = !c;
        var u = !1;
        while (a < s) {
          if (((u = !r.get(a)), !u)) break;
          a++;
        }
        var d = 0,
          h = a;
        for (var f = a; f < s; f++)
          if (r.get(f) !== u) o[d]++;
          else {
            if (d === 3) {
              if (c) t.reverseCounters(o);
              if (t.isFinderPattern(o)) {
                ((this.startEnd[0] = h), (this.startEnd[1] = f));
                return;
              }
              if (c) t.reverseCounters(o);
              ((h += o[0] + o[1]), (o[0] = o[2]), (o[1] = o[3]), (o[2] = 0), (o[3] = 0), d--);
            } else d++;
            ((o[d] = 1), (u = !u));
          }
        throw new Ce();
      }),
      (t.reverseCounters = function (r) {
        var n = r.length;
        for (var i = 0; i < Math.trunc(n / 2); ++i) {
          var o = r[i];
          ((r[i] = r[n - i - 1]), (r[n - i - 1] = o));
        }
      }),
      (t.prototype.parseFoundFinderPattern = function (r, n, i, o) {
        var s = 0,
          a = 0,
          l = 0;
        if (i) {
          var c = this.startEnd[0] - 1;
          while (c >= 0 && !r.get(c)) c--;
          (c++, (s = this.startEnd[0] - c), (a = c), (l = this.startEnd[1]));
        } else
          ((a = this.startEnd[0]),
            (l = r.getNextUnset(this.startEnd[1] + 1)),
            (s = l - this.startEnd[1]));
        var u = this.getDecodeFinderCounters();
        (pr.arraycopy(u, 0, u, 1, u.length - 1), (u[0] = s));
        var d = 0;
        try {
          d = this.parseFinderValue(u, t.FINDER_PATTERNS);
        } catch (x) {
          if (x instanceof Ce) return null;
          else throw x;
        }
        if (!t.mayFollow(o, d)) return null;
        if (o.length > 0) {
          var h = o[o.length - 1],
            f = h.getFinderPattern().getStartEnd()[0],
            p = h.getFinderPattern().getStartEnd()[1],
            g = p - f,
            m = (g / t.FINDER_PATTERN_MODULES) * t.DATA_CHARACTER_MODULES,
            A = p + 2 * m * (1 - t.MAX_FINDER_PATTERN_DISTANCE_VARIANCE),
            y = p + 2 * m * (1 + t.MAX_FINDER_PATTERN_DISTANCE_VARIANCE);
          if (a < A || a > y) return null;
        }
        return new K3(d, [a, l], a, l, n);
      }),
      (t.prototype.decodeDataCharacter = function (r, n, i, o) {
        var s = this.getDataCharacterCounters();
        for (var a = 0; a < s.length; a++) s[a] = 0;
        if (o) t.recordPatternInReverse(r, n.getStartEnd()[0], s);
        else {
          t.recordPattern(r, n.getStartEnd()[1], s);
          for (var l = 0, c = s.length - 1; l < c; l++, c--) {
            var u = s[l];
            ((s[l] = s[c]), (s[c] = u));
          }
        }
        var d = 17,
          h = Sr.sum(new Int32Array(s)) / d,
          f = (n.getStartEnd()[1] - n.getStartEnd()[0]) / 15;
        if (Math.abs(h - f) / f > 0.3) throw new Ce();
        var p = this.getOddCounts(),
          g = this.getEvenCounts(),
          m = this.getOddRoundingErrors(),
          A = this.getEvenRoundingErrors();
        for (var l = 0; l < s.length; l++) {
          var y = (1 * s[l]) / h,
            x = Math.trunc(y + 0.5);
          if (x < 1) {
            if (y < 0.3) throw new Ce();
            x = 1;
          } else if (x > 8) {
            if (y > 8.7) throw new Ce();
            x = 8;
          }
          var b = Math.trunc(l / 2);
          if ((l & 1) === 0) ((p[b] = x), (m[b] = y - x));
          else ((g[b] = x), (A[b] = y - x));
        }
        this.adjustOddEvenCounts(d);
        var v = 4 * n.getValue() + (i ? 0 : 2) + (o ? 0 : 1) - 1,
          _ = 0,
          w = 0;
        for (var l = p.length - 1; l >= 0; l--) {
          if (t.isNotA1left(n, i, o)) {
            var S = t.WEIGHTS[v][2 * l];
            w += p[l] * S;
          }
          _ += p[l];
        }
        var E = 0;
        for (var l = g.length - 1; l >= 0; l--)
          if (t.isNotA1left(n, i, o)) {
            var S = t.WEIGHTS[v][2 * l + 1];
            E += g[l] * S;
          }
        var T = w + E;
        if ((_ & 1) !== 0 || _ > 13 || _ < 4) throw new Ce();
        var M = Math.trunc((13 - _) / 2),
          C = t.SYMBOL_WIDEST[M],
          R = 9 - C,
          B = dh.getRSSvalue(p, C, !0),
          L = dh.getRSSvalue(g, R, !1),
          k = t.EVEN_TOTAL_SUBSET[M],
          z = t.GSUM[M],
          X = B * k + L + z;
        return new d0(X, T);
      }),
      (t.isNotA1left = function (r, n, i) {
        return !(r.getValue() === 0 && n && i);
      }),
      (t.prototype.adjustOddEvenCounts = function (r) {
        var n = Sr.sum(new Int32Array(this.getOddCounts())),
          i = Sr.sum(new Int32Array(this.getEvenCounts())),
          o = !1,
          s = !1;
        if (n > 13) s = !0;
        else if (n < 4) o = !0;
        var a = !1,
          l = !1;
        if (i > 13) l = !0;
        else if (i < 4) a = !0;
        var c = n + i - r,
          u = (n & 1) === 1,
          d = (i & 1) === 0;
        if (c === 1)
          if (u) {
            if (d) throw new Ce();
            s = !0;
          } else {
            if (!d) throw new Ce();
            l = !0;
          }
        else if (c === -1)
          if (u) {
            if (d) throw new Ce();
            o = !0;
          } else {
            if (!d) throw new Ce();
            a = !0;
          }
        else if (c === 0) {
          if (u) {
            if (!d) throw new Ce();
            if (n < i) ((o = !0), (l = !0));
            else ((s = !0), (a = !0));
          } else if (d) throw new Ce();
        } else throw new Ce();
        if (o) {
          if (s) throw new Ce();
          t.increment(this.getOddCounts(), this.getOddRoundingErrors());
        }
        if (s) t.decrement(this.getOddCounts(), this.getOddRoundingErrors());
        if (a) {
          if (l) throw new Ce();
          t.increment(this.getEvenCounts(), this.getOddRoundingErrors());
        }
        if (l) t.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
      }),
      (t.SYMBOL_WIDEST = [7, 5, 4, 3, 1]),
      (t.EVEN_TOTAL_SUBSET = [4, 20, 52, 104, 204]),
      (t.GSUM = [0, 348, 1388, 2948, 3988]),
      (t.FINDER_PATTERNS = [
        Int32Array.from([1, 8, 4, 1]),
        Int32Array.from([3, 6, 4, 1]),
        Int32Array.from([3, 4, 6, 1]),
        Int32Array.from([3, 2, 8, 1]),
        Int32Array.from([2, 6, 5, 1]),
        Int32Array.from([2, 2, 9, 1]),
      ]),
      (t.WEIGHTS = [
        [1, 3, 9, 27, 81, 32, 96, 77],
        [20, 60, 180, 118, 143, 7, 21, 63],
        [189, 145, 13, 39, 117, 140, 209, 205],
        [193, 157, 49, 147, 19, 57, 171, 91],
        [62, 186, 136, 197, 169, 85, 44, 132],
        [185, 133, 188, 142, 4, 12, 36, 108],
        [113, 128, 173, 97, 80, 29, 87, 50],
        [150, 28, 84, 41, 123, 158, 52, 156],
        [46, 138, 203, 187, 139, 206, 196, 166],
        [76, 17, 51, 153, 37, 111, 122, 155],
        [43, 129, 176, 106, 107, 110, 119, 146],
        [16, 48, 144, 10, 30, 90, 59, 177],
        [109, 116, 137, 200, 178, 112, 125, 164],
        [70, 210, 208, 202, 184, 130, 179, 115],
        [134, 191, 151, 31, 93, 68, 204, 190],
        [148, 22, 66, 198, 172, 94, 71, 2],
        [6, 18, 54, 162, 64, 192, 154, 40],
        [120, 149, 25, 75, 14, 42, 126, 167],
        [79, 26, 78, 23, 69, 207, 199, 175],
        [103, 98, 83, 38, 114, 131, 182, 124],
        [161, 61, 183, 127, 170, 88, 53, 159],
        [55, 165, 73, 8, 24, 72, 5, 15],
        [45, 135, 194, 160, 58, 174, 100, 89],
      ]),
      (t.FINDER_PAT_A = 0),
      (t.FINDER_PAT_B = 1),
      (t.FINDER_PAT_C = 2),
      (t.FINDER_PAT_D = 3),
      (t.FINDER_PAT_E = 4),
      (t.FINDER_PAT_F = 5),
      (t.FINDER_PATTERN_SEQUENCES = [
        [t.FINDER_PAT_A, t.FINDER_PAT_A],
        [t.FINDER_PAT_A, t.FINDER_PAT_B, t.FINDER_PAT_B],
        [t.FINDER_PAT_A, t.FINDER_PAT_C, t.FINDER_PAT_B, t.FINDER_PAT_D],
        [t.FINDER_PAT_A, t.FINDER_PAT_E, t.FINDER_PAT_B, t.FINDER_PAT_D, t.FINDER_PAT_C],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_E,
          t.FINDER_PAT_B,
          t.FINDER_PAT_D,
          t.FINDER_PAT_D,
          t.FINDER_PAT_F,
        ],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_E,
          t.FINDER_PAT_B,
          t.FINDER_PAT_D,
          t.FINDER_PAT_E,
          t.FINDER_PAT_F,
          t.FINDER_PAT_F,
        ],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_A,
          t.FINDER_PAT_B,
          t.FINDER_PAT_B,
          t.FINDER_PAT_C,
          t.FINDER_PAT_C,
          t.FINDER_PAT_D,
          t.FINDER_PAT_D,
        ],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_A,
          t.FINDER_PAT_B,
          t.FINDER_PAT_B,
          t.FINDER_PAT_C,
          t.FINDER_PAT_C,
          t.FINDER_PAT_D,
          t.FINDER_PAT_E,
          t.FINDER_PAT_E,
        ],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_A,
          t.FINDER_PAT_B,
          t.FINDER_PAT_B,
          t.FINDER_PAT_C,
          t.FINDER_PAT_C,
          t.FINDER_PAT_D,
          t.FINDER_PAT_E,
          t.FINDER_PAT_F,
          t.FINDER_PAT_F,
        ],
        [
          t.FINDER_PAT_A,
          t.FINDER_PAT_A,
          t.FINDER_PAT_B,
          t.FINDER_PAT_B,
          t.FINDER_PAT_C,
          t.FINDER_PAT_D,
          t.FINDER_PAT_D,
          t.FINDER_PAT_E,
          t.FINDER_PAT_E,
          t.FINDER_PAT_F,
          t.FINDER_PAT_F,
        ],
      ]),
      (t.MAX_PAIRS = 11),
      (t.FINDER_PATTERN_MODULES = 15),
      (t.DATA_CHARACTER_MODULES = 17),
      (t.MAX_FINDER_PATTERN_DISTANCE_VARIANCE = 0.1),
      t
    );
  })(Ku),
  k_ = Poe;
var koe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Uoe = (function (e) {
    koe(t, e);
    function t(r, n, i) {
      var o = e.call(this, r, n) || this;
      return ((o.count = 0), (o.finderPattern = i), o);
    }
    return (
      (t.prototype.getFinderPattern = function () {
        return this.finderPattern;
      }),
      (t.prototype.getCount = function () {
        return this.count;
      }),
      (t.prototype.incrementCount = function () {
        this.count++;
      }),
      t
    );
  })(d0),
  rU = Uoe;
var Hoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Goe = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  zoe = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  vS = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Voe = (function (e) {
    Hoe(t, e);
    function t() {
      var r = e.apply(this, zoe([], Goe(arguments), !1)) || this;
      return ((r.possibleLeftPairs = []), (r.possibleRightPairs = []), r);
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        var o,
          s,
          a,
          l,
          c = this.decodePair(n, !1, r, i);
        (t.addOrTally(this.possibleLeftPairs, c), n.reverse());
        var u = this.decodePair(n, !0, r, i);
        (t.addOrTally(this.possibleRightPairs, u), n.reverse());
        try {
          for (var d = vS(this.possibleLeftPairs), h = d.next(); !h.done; h = d.next()) {
            var f = h.value;
            if (f.getCount() > 1)
              try {
                for (
                  var p = ((a = void 0), vS(this.possibleRightPairs)), g = p.next();
                  !g.done;
                  g = p.next()
                ) {
                  var m = g.value;
                  if (m.getCount() > 1 && t.checkChecksum(f, m)) return t.constructResult(f, m);
                }
              } catch (A) {
                a = { error: A };
              } finally {
                try {
                  if (g && !g.done && (l = p.return)) l.call(p);
                } finally {
                  if (a) throw a.error;
                }
              }
          }
        } catch (A) {
          o = { error: A };
        } finally {
          try {
            if (h && !h.done && (s = d.return)) s.call(d);
          } finally {
            if (o) throw o.error;
          }
        }
        throw new Ce();
      }),
      (t.addOrTally = function (r, n) {
        var i, o;
        if (n === null) return;
        var s = !1;
        try {
          for (var a = vS(r), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            if (c.getValue() === n.getValue()) {
              (c.incrementCount(), (s = !0));
              break;
            }
          }
        } catch (u) {
          i = { error: u };
        } finally {
          try {
            if (l && !l.done && (o = a.return)) o.call(a);
          } finally {
            if (i) throw i.error;
          }
        }
        if (!s) r.push(n);
      }),
      (t.prototype.reset = function () {
        ((this.possibleLeftPairs.length = 0), (this.possibleRightPairs.length = 0));
      }),
      (t.constructResult = function (r, n) {
        var i = 4537077 * r.getValue() + n.getValue(),
          o = String(i),
          s = new Ot();
        for (var a = 13 - o.length; a > 0; a--) s.append("0");
        s.append(o);
        var l = 0;
        for (var a = 0; a < 13; a++) {
          var c = s.charAt(a).charCodeAt(0) - 48;
          l += (a & 1) === 0 ? 3 * c : c;
        }
        if (((l = 10 - (l % 10)), l === 10)) l = 0;
        s.append(l.toString());
        var u = r.getFinderPattern().getResultPoints(),
          d = n.getFinderPattern().getResultPoints();
        return new Xr(
          s.toString(),
          null,
          0,
          [u[0], u[1], d[0], d[1]],
          at.RSS_14,
          /*@__PURE__*/ new Date().getTime(),
        );
      }),
      (t.checkChecksum = function (r, n) {
        var i = (r.getChecksumPortion() + 16 * n.getChecksumPortion()) % 79,
          o = 9 * r.getFinderPattern().getValue() + n.getFinderPattern().getValue();
        if (o > 72) o--;
        if (o > 8) o--;
        return i === o;
      }),
      (t.prototype.decodePair = function (r, n, i, o) {
        try {
          var s = this.findFinderPattern(r, n),
            a = this.parseFoundFinderPattern(r, i, n, s),
            l = o == null ? null : o.get(nr.NEED_RESULT_POINT_CALLBACK);
          if (l != null) {
            var c = (s[0] + s[1] - 1) / 2;
            if (n) c = r.getSize() - 1 - c;
            l.foundPossibleResultPoint(new ct(c, i));
          }
          var u = this.decodeDataCharacter(r, a, !0),
            d = this.decodeDataCharacter(r, a, !1);
          return new rU(
            1597 * u.getValue() + d.getValue(),
            u.getChecksumPortion() + 4 * d.getChecksumPortion(),
            a,
          );
        } catch (h) {
          if (h instanceof Ce) return null;
          else throw h;
        }
      }),
      (t.prototype.decodeDataCharacter = function (r, n, i) {
        var o = this.getDataCharacterCounters();
        for (var s = 0; s < o.length; s++) o[s] = 0;
        if (i) En.recordPatternInReverse(r, n.getStartEnd()[0], o);
        else {
          En.recordPattern(r, n.getStartEnd()[1], o);
          for (var a = 0, l = o.length - 1; a < l; a++, l--) {
            var c = o[a];
            ((o[a] = o[l]), (o[l] = c));
          }
        }
        var u = i ? 16 : 15,
          d = Sr.sum(new Int32Array(o)) / u,
          h = this.getOddCounts(),
          f = this.getEvenCounts(),
          p = this.getOddRoundingErrors(),
          g = this.getEvenRoundingErrors();
        for (var a = 0; a < o.length; a++) {
          var m = o[a] / d,
            A = Math.floor(m + 0.5);
          if (A < 1) A = 1;
          else if (A > 8) A = 8;
          var y = Math.floor(a / 2);
          if ((a & 1) === 0) ((h[y] = A), (p[y] = m - A));
          else ((f[y] = A), (g[y] = m - A));
        }
        this.adjustOddEvenCounts(i, u);
        var x = 0,
          b = 0;
        for (var a = h.length - 1; a >= 0; a--) ((b *= 9), (b += h[a]), (x += h[a]));
        var v = 0,
          _ = 0;
        for (var a = f.length - 1; a >= 0; a--) ((v *= 9), (v += f[a]), (_ += f[a]));
        var w = b + 3 * v;
        if (i) {
          if ((x & 1) !== 0 || x > 12 || x < 4) throw new Ce();
          var S = (12 - x) / 2,
            E = t.OUTSIDE_ODD_WIDEST[S],
            T = 9 - E,
            M = dh.getRSSvalue(h, E, !1),
            C = dh.getRSSvalue(f, T, !0),
            R = t.OUTSIDE_EVEN_TOTAL_SUBSET[S],
            B = t.OUTSIDE_GSUM[S];
          return new d0(M * R + C + B, w);
        } else {
          if ((_ & 1) !== 0 || _ > 10 || _ < 4) throw new Ce();
          var S = (10 - _) / 2,
            E = t.INSIDE_ODD_WIDEST[S],
            T = 9 - E,
            M = dh.getRSSvalue(h, E, !0),
            C = dh.getRSSvalue(f, T, !1),
            L = t.INSIDE_ODD_TOTAL_SUBSET[S],
            B = t.INSIDE_GSUM[S];
          return new d0(C * L + M + B, w);
        }
      }),
      (t.prototype.findFinderPattern = function (r, n) {
        var i = this.getDecodeFinderCounters();
        ((i[0] = 0), (i[1] = 0), (i[2] = 0), (i[3] = 0));
        var o = r.getSize(),
          s = !1,
          a = 0;
        while (a < o) {
          if (((s = !r.get(a)), n === s)) break;
          a++;
        }
        var l = 0,
          c = a;
        for (var u = a; u < o; u++)
          if (r.get(u) !== s) i[l]++;
          else {
            if (l === 3) {
              if (Ku.isFinderPattern(i)) return [c, u];
              ((c += i[0] + i[1]), (i[0] = i[2]), (i[1] = i[3]), (i[2] = 0), (i[3] = 0), l--);
            } else l++;
            ((i[l] = 1), (s = !s));
          }
        throw new Ce();
      }),
      (t.prototype.parseFoundFinderPattern = function (r, n, i, o) {
        var s = r.get(o[0]),
          a = o[0] - 1;
        while (a >= 0 && s !== r.get(a)) a--;
        a++;
        var l = o[0] - a,
          c = this.getDecodeFinderCounters(),
          u = new Int32Array(c.length);
        (pr.arraycopy(c, 0, u, 1, c.length - 1), (u[0] = l));
        var d = this.parseFinderValue(u, t.FINDER_PATTERNS),
          h = a,
          f = o[1];
        if (i) ((h = r.getSize() - 1 - h), (f = r.getSize() - 1 - f));
        return new K3(d, [a, o[1]], h, f, n);
      }),
      (t.prototype.adjustOddEvenCounts = function (r, n) {
        var i = Sr.sum(new Int32Array(this.getOddCounts())),
          o = Sr.sum(new Int32Array(this.getEvenCounts())),
          s = !1,
          a = !1,
          l = !1,
          c = !1;
        if (r) {
          if (i > 12) a = !0;
          else if (i < 4) s = !0;
          if (o > 12) c = !0;
          else if (o < 4) l = !0;
        } else {
          if (i > 11) a = !0;
          else if (i < 5) s = !0;
          if (o > 10) c = !0;
          else if (o < 4) l = !0;
        }
        var u = i + o - n,
          d = (i & 1) === (r ? 1 : 0),
          h = (o & 1) === 1;
        if (u === 1)
          if (d) {
            if (h) throw new Ce();
            a = !0;
          } else {
            if (!h) throw new Ce();
            c = !0;
          }
        else if (u === -1)
          if (d) {
            if (h) throw new Ce();
            s = !0;
          } else {
            if (!h) throw new Ce();
            l = !0;
          }
        else if (u === 0) {
          if (d) {
            if (!h) throw new Ce();
            if (i < o) ((s = !0), (c = !0));
            else ((a = !0), (l = !0));
          } else if (h) throw new Ce();
        } else throw new Ce();
        if (s) {
          if (a) throw new Ce();
          Ku.increment(this.getOddCounts(), this.getOddRoundingErrors());
        }
        if (a) Ku.decrement(this.getOddCounts(), this.getOddRoundingErrors());
        if (l) {
          if (c) throw new Ce();
          Ku.increment(this.getEvenCounts(), this.getOddRoundingErrors());
        }
        if (c) Ku.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
      }),
      (t.OUTSIDE_EVEN_TOTAL_SUBSET = [1, 10, 34, 70, 126]),
      (t.INSIDE_ODD_TOTAL_SUBSET = [4, 20, 48, 81]),
      (t.OUTSIDE_GSUM = [0, 161, 961, 2015, 2715]),
      (t.INSIDE_GSUM = [0, 336, 1036, 1516]),
      (t.OUTSIDE_ODD_WIDEST = [8, 6, 4, 3, 1]),
      (t.INSIDE_ODD_WIDEST = [2, 4, 6, 8]),
      (t.FINDER_PATTERNS = [
        Int32Array.from([3, 8, 2, 1]),
        Int32Array.from([3, 5, 5, 1]),
        Int32Array.from([3, 3, 7, 1]),
        Int32Array.from([3, 1, 9, 1]),
        Int32Array.from([2, 7, 4, 1]),
        Int32Array.from([2, 5, 6, 1]),
        Int32Array.from([2, 3, 8, 1]),
        Int32Array.from([1, 5, 7, 1]),
        Int32Array.from([1, 3, 9, 1]),
      ]),
      t
    );
  })(Ku),
  U_ = Voe;
var Woe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Qoe = (function (e) {
    Woe(t, e);
    function t(r) {
      var n = e.call(this) || this;
      n.readers = [];
      var i = !r ? null : r.get(nr.POSSIBLE_FORMATS),
        o = r && r.get(nr.ASSUME_CODE_39_CHECK_DIGIT) !== void 0,
        s = r && r.get(nr.ENABLE_CODE_39_EXTENDED_MODE) !== void 0;
      if (i) {
        if (
          i.includes(at.EAN_13) ||
          i.includes(at.UPC_A) ||
          i.includes(at.EAN_8) ||
          i.includes(at.UPC_E)
        )
          n.readers.push(new N_(r));
        if (i.includes(at.CODE_39)) n.readers.push(new B_(o, s));
        if (i.includes(at.CODE_93)) n.readers.push(new F_());
        if (i.includes(at.CODE_128)) n.readers.push(new L_());
        if (i.includes(at.ITF)) n.readers.push(new D_());
        if (i.includes(at.CODABAR)) n.readers.push(new bS());
        if (i.includes(at.RSS_14)) n.readers.push(new U_());
        if (i.includes(at.RSS_EXPANDED)) n.readers.push(new k_());
      }
      if (n.readers.length === 0)
        (n.readers.push(new N_(r)),
          n.readers.push(new B_()),
          n.readers.push(new F_()),
          n.readers.push(new N_(r)),
          n.readers.push(new L_()),
          n.readers.push(new D_()),
          n.readers.push(new U_()),
          n.readers.push(new k_()));
      return n;
    }
    return (
      (t.prototype.decodeRow = function (r, n, i) {
        for (var o = 0; o < this.readers.length; o++)
          try {
            return this.readers[o].decodeRow(r, n, i);
          } catch (s) {}
        throw new Ce();
      }),
      (t.prototype.reset = function () {
        this.readers.forEach(function (r) {
          return r.reset();
        });
      }),
      t
    );
  })(En),
  Lc = Qoe;
var Yoe = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  t7e = (function (e) {
    Yoe(t, e);
    function t(r, n) {
      if (r === void 0) r = 500;
      return e.call(this, new Lc(n), r, n) || this;
    }
    return t;
  })(gl);
var nU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Sn = (function () {
    function e(t, r, n) {
      ((this.ecCodewords = t), (this.ecBlocks = [r]), n && this.ecBlocks.push(n));
    }
    return (
      (e.prototype.getECCodewords = function () {
        return this.ecCodewords;
      }),
      (e.prototype.getECBlocks = function () {
        return this.ecBlocks;
      }),
      e
    );
  })();
var _n = (function () {
  function e(t, r) {
    ((this.count = t), (this.dataCodewords = r));
  }
  return (
    (e.prototype.getCount = function () {
      return this.count;
    }),
    (e.prototype.getDataCodewords = function () {
      return this.dataCodewords;
    }),
    e
  );
})();
var Xoe = (function () {
    function e(t, r, n, i, o, s) {
      var a, l;
      ((this.versionNumber = t),
        (this.symbolSizeRows = r),
        (this.symbolSizeColumns = n),
        (this.dataRegionSizeRows = i),
        (this.dataRegionSizeColumns = o),
        (this.ecBlocks = s));
      var c = 0,
        u = s.getECCodewords(),
        d = s.getECBlocks();
      try {
        for (var h = nU(d), f = h.next(); !f.done; f = h.next()) {
          var p = f.value;
          c += p.getCount() * (p.getDataCodewords() + u);
        }
      } catch (g) {
        a = { error: g };
      } finally {
        try {
          if (f && !f.done && (l = h.return)) l.call(h);
        } finally {
          if (a) throw a.error;
        }
      }
      this.totalCodewords = c;
    }
    return (
      (e.prototype.getVersionNumber = function () {
        return this.versionNumber;
      }),
      (e.prototype.getSymbolSizeRows = function () {
        return this.symbolSizeRows;
      }),
      (e.prototype.getSymbolSizeColumns = function () {
        return this.symbolSizeColumns;
      }),
      (e.prototype.getDataRegionSizeRows = function () {
        return this.dataRegionSizeRows;
      }),
      (e.prototype.getDataRegionSizeColumns = function () {
        return this.dataRegionSizeColumns;
      }),
      (e.prototype.getTotalCodewords = function () {
        return this.totalCodewords;
      }),
      (e.prototype.getECBlocks = function () {
        return this.ecBlocks;
      }),
      (e.getVersionForDimensions = function (t, r) {
        var n, i;
        if ((t & 1) !== 0 || (r & 1) !== 0) throw new De();
        try {
          for (var o = nU(e.VERSIONS), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            if (a.symbolSizeRows === t && a.symbolSizeColumns === r) return a;
          }
        } catch (l) {
          n = { error: l };
        } finally {
          try {
            if (s && !s.done && (i = o.return)) i.call(o);
          } finally {
            if (n) throw n.error;
          }
        }
        throw new De();
      }),
      (e.prototype.toString = function () {
        return "" + this.versionNumber;
      }),
      (e.buildVersions = function () {
        return [
          new e(1, 10, 10, 8, 8, new Sn(5, new _n(1, 3))),
          new e(2, 12, 12, 10, 10, new Sn(7, new _n(1, 5))),
          new e(3, 14, 14, 12, 12, new Sn(10, new _n(1, 8))),
          new e(4, 16, 16, 14, 14, new Sn(12, new _n(1, 12))),
          new e(5, 18, 18, 16, 16, new Sn(14, new _n(1, 18))),
          new e(6, 20, 20, 18, 18, new Sn(18, new _n(1, 22))),
          new e(7, 22, 22, 20, 20, new Sn(20, new _n(1, 30))),
          new e(8, 24, 24, 22, 22, new Sn(24, new _n(1, 36))),
          new e(9, 26, 26, 24, 24, new Sn(28, new _n(1, 44))),
          new e(10, 32, 32, 14, 14, new Sn(36, new _n(1, 62))),
          new e(11, 36, 36, 16, 16, new Sn(42, new _n(1, 86))),
          new e(12, 40, 40, 18, 18, new Sn(48, new _n(1, 114))),
          new e(13, 44, 44, 20, 20, new Sn(56, new _n(1, 144))),
          new e(14, 48, 48, 22, 22, new Sn(68, new _n(1, 174))),
          new e(15, 52, 52, 24, 24, new Sn(42, new _n(2, 102))),
          new e(16, 64, 64, 14, 14, new Sn(56, new _n(2, 140))),
          new e(17, 72, 72, 16, 16, new Sn(36, new _n(4, 92))),
          new e(18, 80, 80, 18, 18, new Sn(48, new _n(4, 114))),
          new e(19, 88, 88, 20, 20, new Sn(56, new _n(4, 144))),
          new e(20, 96, 96, 22, 22, new Sn(68, new _n(4, 174))),
          new e(21, 104, 104, 24, 24, new Sn(56, new _n(6, 136))),
          new e(22, 120, 120, 18, 18, new Sn(68, new _n(6, 175))),
          new e(23, 132, 132, 20, 20, new Sn(62, new _n(8, 163))),
          new e(24, 144, 144, 22, 22, new Sn(62, new _n(8, 156), new _n(2, 155))),
          new e(25, 8, 18, 6, 16, new Sn(7, new _n(1, 5))),
          new e(26, 8, 32, 6, 14, new Sn(11, new _n(1, 10))),
          new e(27, 12, 26, 10, 24, new Sn(14, new _n(1, 16))),
          new e(28, 12, 36, 10, 16, new Sn(18, new _n(1, 22))),
          new e(29, 16, 36, 14, 16, new Sn(24, new _n(1, 32))),
          new e(30, 16, 48, 14, 22, new Sn(28, new _n(1, 49))),
        ];
      }),
      (e.VERSIONS = e.buildVersions()),
      e
    );
  })(),
  iU = Xoe;
var joe = (function () {
    function e(t) {
      var r = t.getHeight();
      if (r < 8 || r > 144 || (r & 1) !== 0) throw new De();
      ((this.version = e.readVersion(t)),
        (this.mappingBitMatrix = this.extractDataRegion(t)),
        (this.readMappingMatrix = new bn(
          this.mappingBitMatrix.getWidth(),
          this.mappingBitMatrix.getHeight(),
        )));
    }
    return (
      (e.prototype.getVersion = function () {
        return this.version;
      }),
      (e.readVersion = function (t) {
        var r = t.getHeight(),
          n = t.getWidth();
        return iU.getVersionForDimensions(r, n);
      }),
      (e.prototype.readCodewords = function () {
        var t = new Int8Array(this.version.getTotalCodewords()),
          r = 0,
          n = 4,
          i = 0,
          o = this.mappingBitMatrix.getHeight(),
          s = this.mappingBitMatrix.getWidth(),
          a = !1,
          l = !1,
          c = !1,
          u = !1;
        do
          if (n === o && i === 0 && !a)
            ((t[r++] = this.readCorner1(o, s) & 255), (n -= 2), (i += 2), (a = !0));
          else if (n === o - 2 && i === 0 && (s & 3) !== 0 && !l)
            ((t[r++] = this.readCorner2(o, s) & 255), (n -= 2), (i += 2), (l = !0));
          else if (n === o + 4 && i === 2 && (s & 7) === 0 && !c)
            ((t[r++] = this.readCorner3(o, s) & 255), (n -= 2), (i += 2), (c = !0));
          else if (n === o - 2 && i === 0 && (s & 7) === 4 && !u)
            ((t[r++] = this.readCorner4(o, s) & 255), (n -= 2), (i += 2), (u = !0));
          else {
            do {
              if (n < o && i >= 0 && !this.readMappingMatrix.get(i, n))
                t[r++] = this.readUtah(n, i, o, s) & 255;
              ((n -= 2), (i += 2));
            } while (n >= 0 && i < s);
            ((n += 1), (i += 3));
            do {
              if (n >= 0 && i < s && !this.readMappingMatrix.get(i, n))
                t[r++] = this.readUtah(n, i, o, s) & 255;
              ((n += 2), (i -= 2));
            } while (n < o && i >= 0);
            ((n += 3), (i += 1));
          }
        while (n < o || i < s);
        if (r !== this.version.getTotalCodewords()) throw new De();
        return t;
      }),
      (e.prototype.readModule = function (t, r, n, i) {
        if (t < 0) ((t += n), (r += 4 - ((n + 4) & 7)));
        if (r < 0) ((r += i), (t += 4 - ((i + 4) & 7)));
        return (this.readMappingMatrix.set(r, t), this.mappingBitMatrix.get(r, t));
      }),
      (e.prototype.readUtah = function (t, r, n, i) {
        var o = 0;
        if (this.readModule(t - 2, r - 2, n, i)) o |= 1;
        if (((o <<= 1), this.readModule(t - 2, r - 1, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t - 1, r - 2, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t - 1, r - 1, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t - 1, r, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t, r - 2, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t, r - 1, n, i))) o |= 1;
        if (((o <<= 1), this.readModule(t, r, n, i))) o |= 1;
        return o;
      }),
      (e.prototype.readCorner1 = function (t, r) {
        var n = 0;
        if (this.readModule(t - 1, 0, t, r)) n |= 1;
        if (((n <<= 1), this.readModule(t - 1, 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(t - 1, 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(2, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(3, r - 1, t, r))) n |= 1;
        return n;
      }),
      (e.prototype.readCorner2 = function (t, r) {
        var n = 0;
        if (this.readModule(t - 3, 0, t, r)) n |= 1;
        if (((n <<= 1), this.readModule(t - 2, 0, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(t - 1, 0, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 4, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 3, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 1, t, r))) n |= 1;
        return n;
      }),
      (e.prototype.readCorner3 = function (t, r) {
        var n = 0;
        if (this.readModule(t - 1, 0, t, r)) n |= 1;
        if (((n <<= 1), this.readModule(t - 1, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 3, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 3, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 1, t, r))) n |= 1;
        return n;
      }),
      (e.prototype.readCorner4 = function (t, r) {
        var n = 0;
        if (this.readModule(t - 3, 0, t, r)) n |= 1;
        if (((n <<= 1), this.readModule(t - 2, 0, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(t - 1, 0, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 2, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(0, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(1, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(2, r - 1, t, r))) n |= 1;
        if (((n <<= 1), this.readModule(3, r - 1, t, r))) n |= 1;
        return n;
      }),
      (e.prototype.extractDataRegion = function (t) {
        var r = this.version.getSymbolSizeRows(),
          n = this.version.getSymbolSizeColumns();
        if (t.getHeight() !== r) throw new nt("Dimension of bitMatrix must match the version size");
        var i = this.version.getDataRegionSizeRows(),
          o = this.version.getDataRegionSizeColumns(),
          s = (r / i) | 0,
          a = (n / o) | 0,
          l = s * i,
          c = a * o,
          u = new bn(c, l);
        for (var d = 0; d < s; ++d) {
          var h = d * i;
          for (var f = 0; f < a; ++f) {
            var p = f * o;
            for (var g = 0; g < i; ++g) {
              var m = d * (i + 2) + 1 + g,
                A = h + g;
              for (var y = 0; y < o; ++y) {
                var x = f * (o + 2) + 1 + y;
                if (t.get(x, m)) {
                  var b = p + y;
                  u.set(b, A);
                }
              }
            }
          }
        }
        return u;
      }),
      e
    );
  })(),
  oU = joe;
var sU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Koe = (function () {
    function e(t, r) {
      ((this.numDataCodewords = t), (this.codewords = r));
    }
    return (
      (e.getDataBlocks = function (t, r) {
        var n,
          i,
          o,
          s,
          a = r.getECBlocks(),
          l = 0,
          c = a.getECBlocks();
        try {
          for (var u = sU(c), d = u.next(); !d.done; d = u.next()) {
            var h = d.value;
            l += h.getCount();
          }
        } catch (B) {
          n = { error: B };
        } finally {
          try {
            if (d && !d.done && (i = u.return)) i.call(u);
          } finally {
            if (n) throw n.error;
          }
        }
        var f = Array(l),
          p = 0;
        try {
          for (var g = sU(c), m = g.next(); !m.done; m = g.next()) {
            var h = m.value;
            for (var A = 0; A < h.getCount(); A++) {
              var y = h.getDataCodewords(),
                x = a.getECCodewords() + y;
              f[p++] = new e(y, new Uint8Array(x));
            }
          }
        } catch (B) {
          o = { error: B };
        } finally {
          try {
            if (m && !m.done && (s = g.return)) s.call(g);
          } finally {
            if (o) throw o.error;
          }
        }
        var b = f[0].codewords.length,
          v = b - a.getECCodewords(),
          _ = v - 1,
          w = 0;
        for (var A = 0; A < _; A++) for (var S = 0; S < p; S++) f[S].codewords[A] = t[w++];
        var E = r.getVersionNumber() === 24,
          T = E ? 8 : p;
        for (var S = 0; S < T; S++) f[S].codewords[v - 1] = t[w++];
        var M = f[0].codewords.length;
        for (var A = v; A < M; A++)
          for (var S = 0; S < p; S++) {
            var C = E ? (S + 8) % p : S,
              R = E && C > 7 ? A - 1 : A;
            f[C].codewords[R] = t[w++];
          }
        if (w !== t.length) throw new nt();
        return f;
      }),
      (e.prototype.getNumDataCodewords = function () {
        return this.numDataCodewords;
      }),
      (e.prototype.getCodewords = function () {
        return this.codewords;
      }),
      e
    );
  })(),
  aU = Koe;
var qoe = (function () {
    function e(t) {
      ((this.bytes = t), (this.byteOffset = 0), (this.bitOffset = 0));
    }
    return (
      (e.prototype.getBitOffset = function () {
        return this.bitOffset;
      }),
      (e.prototype.getByteOffset = function () {
        return this.byteOffset;
      }),
      (e.prototype.readBits = function (t) {
        if (t < 1 || t > 32 || t > this.available()) throw new nt("" + t);
        var r = 0,
          n = this.bitOffset,
          i = this.byteOffset,
          o = this.bytes;
        if (n > 0) {
          var s = 8 - n,
            a = t < s ? t : s,
            l = s - a,
            c = (255 >> (8 - a)) << l;
          if (((r = (o[i] & c) >> l), (t -= a), (n += a), n === 8)) ((n = 0), i++);
        }
        if (t > 0) {
          while (t >= 8) ((r = (r << 8) | (o[i] & 255)), i++, (t -= 8));
          if (t > 0) {
            var l = 8 - t,
              c = (255 >> l) << l;
            ((r = (r << t) | ((o[i] & c) >> l)), (n += t));
          }
        }
        return ((this.bitOffset = n), (this.byteOffset = i), r);
      }),
      (e.prototype.available = function () {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
      }),
      e
    );
  })(),
  f0 = qoe;
var wo;
(function (e) {
  ((e[(e.PAD_ENCODE = 0)] = "PAD_ENCODE"),
    (e[(e.ASCII_ENCODE = 1)] = "ASCII_ENCODE"),
    (e[(e.C40_ENCODE = 2)] = "C40_ENCODE"),
    (e[(e.TEXT_ENCODE = 3)] = "TEXT_ENCODE"),
    (e[(e.ANSIX12_ENCODE = 4)] = "ANSIX12_ENCODE"),
    (e[(e.EDIFACT_ENCODE = 5)] = "EDIFACT_ENCODE"),
    (e[(e.BASE256_ENCODE = 6)] = "BASE256_ENCODE"));
})(wo || (wo = {}));
var Zoe = (function () {
    function e() {}
    return (
      (e.decode = function (t) {
        var r = new f0(t),
          n = new Ot(),
          i = new Ot(),
          o = [],
          s = wo.ASCII_ENCODE;
        do
          if (s === wo.ASCII_ENCODE) s = this.decodeAsciiSegment(r, n, i);
          else {
            switch (s) {
              case wo.C40_ENCODE:
                this.decodeC40Segment(r, n);
                break;
              case wo.TEXT_ENCODE:
                this.decodeTextSegment(r, n);
                break;
              case wo.ANSIX12_ENCODE:
                this.decodeAnsiX12Segment(r, n);
                break;
              case wo.EDIFACT_ENCODE:
                this.decodeEdifactSegment(r, n);
                break;
              case wo.BASE256_ENCODE:
                this.decodeBase256Segment(r, n, o);
                break;
              default:
                throw new De();
            }
            s = wo.ASCII_ENCODE;
          }
        while (s !== wo.PAD_ENCODE && r.available() > 0);
        if (i.length() > 0) n.append(i.toString());
        return new La(t, n.toString(), o.length === 0 ? null : o, null);
      }),
      (e.decodeAsciiSegment = function (t, r, n) {
        var i = !1;
        do {
          var o = t.readBits(8);
          if (o === 0) throw new De();
          else if (o <= 128) {
            if (i) o += 128;
            return (r.append(String.fromCharCode(o - 1)), wo.ASCII_ENCODE);
          } else if (o === 129) return wo.PAD_ENCODE;
          else if (o <= 229) {
            var s = o - 130;
            if (s < 10) r.append("0");
            r.append("" + s);
          } else
            switch (o) {
              case 230:
                return wo.C40_ENCODE;
              case 231:
                return wo.BASE256_ENCODE;
              case 232:
                r.append(String.fromCharCode(29));
                break;
              case 233:
              case 234:
                break;
              case 235:
                i = !0;
                break;
              case 236:
                (r.append("[)>\x1E05\x1D"), n.insert(0, "\x1E\x04"));
                break;
              case 237:
                (r.append("[)>\x1E06\x1D"), n.insert(0, "\x1E\x04"));
                break;
              case 238:
                return wo.ANSIX12_ENCODE;
              case 239:
                return wo.TEXT_ENCODE;
              case 240:
                return wo.EDIFACT_ENCODE;
              case 241:
                break;
              default:
                if (o !== 254 || t.available() !== 0) throw new De();
                break;
            }
        } while (t.available() > 0);
        return wo.ASCII_ENCODE;
      }),
      (e.decodeC40Segment = function (t, r) {
        var n = !1,
          i = [],
          o = 0;
        do {
          if (t.available() === 8) return;
          var s = t.readBits(8);
          if (s === 254) return;
          this.parseTwoBytes(s, t.readBits(8), i);
          for (var a = 0; a < 3; a++) {
            var l = i[a];
            switch (o) {
              case 0:
                if (l < 3) o = l + 1;
                else if (l < this.C40_BASIC_SET_CHARS.length) {
                  var c = this.C40_BASIC_SET_CHARS[l];
                  if (n) (r.append(String.fromCharCode(c.charCodeAt(0) + 128)), (n = !1));
                  else r.append(c);
                } else throw new De();
                break;
              case 1:
                if (n) (r.append(String.fromCharCode(l + 128)), (n = !1));
                else r.append(String.fromCharCode(l));
                o = 0;
                break;
              case 2:
                if (l < this.C40_SHIFT2_SET_CHARS.length) {
                  var c = this.C40_SHIFT2_SET_CHARS[l];
                  if (n) (r.append(String.fromCharCode(c.charCodeAt(0) + 128)), (n = !1));
                  else r.append(c);
                } else
                  switch (l) {
                    case 27:
                      r.append(String.fromCharCode(29));
                      break;
                    case 30:
                      n = !0;
                      break;
                    default:
                      throw new De();
                  }
                o = 0;
                break;
              case 3:
                if (n) (r.append(String.fromCharCode(l + 224)), (n = !1));
                else r.append(String.fromCharCode(l + 96));
                o = 0;
                break;
              default:
                throw new De();
            }
          }
        } while (t.available() > 0);
      }),
      (e.decodeTextSegment = function (t, r) {
        var n = !1,
          i = [],
          o = 0;
        do {
          if (t.available() === 8) return;
          var s = t.readBits(8);
          if (s === 254) return;
          this.parseTwoBytes(s, t.readBits(8), i);
          for (var a = 0; a < 3; a++) {
            var l = i[a];
            switch (o) {
              case 0:
                if (l < 3) o = l + 1;
                else if (l < this.TEXT_BASIC_SET_CHARS.length) {
                  var c = this.TEXT_BASIC_SET_CHARS[l];
                  if (n) (r.append(String.fromCharCode(c.charCodeAt(0) + 128)), (n = !1));
                  else r.append(c);
                } else throw new De();
                break;
              case 1:
                if (n) (r.append(String.fromCharCode(l + 128)), (n = !1));
                else r.append(String.fromCharCode(l));
                o = 0;
                break;
              case 2:
                if (l < this.TEXT_SHIFT2_SET_CHARS.length) {
                  var c = this.TEXT_SHIFT2_SET_CHARS[l];
                  if (n) (r.append(String.fromCharCode(c.charCodeAt(0) + 128)), (n = !1));
                  else r.append(c);
                } else
                  switch (l) {
                    case 27:
                      r.append(String.fromCharCode(29));
                      break;
                    case 30:
                      n = !0;
                      break;
                    default:
                      throw new De();
                  }
                o = 0;
                break;
              case 3:
                if (l < this.TEXT_SHIFT3_SET_CHARS.length) {
                  var c = this.TEXT_SHIFT3_SET_CHARS[l];
                  if (n) (r.append(String.fromCharCode(c.charCodeAt(0) + 128)), (n = !1));
                  else r.append(c);
                  o = 0;
                } else throw new De();
                break;
              default:
                throw new De();
            }
          }
        } while (t.available() > 0);
      }),
      (e.decodeAnsiX12Segment = function (t, r) {
        var n = [];
        do {
          if (t.available() === 8) return;
          var i = t.readBits(8);
          if (i === 254) return;
          this.parseTwoBytes(i, t.readBits(8), n);
          for (var o = 0; o < 3; o++) {
            var s = n[o];
            switch (s) {
              case 0:
                r.append("\r");
                break;
              case 1:
                r.append("*");
                break;
              case 2:
                r.append(">");
                break;
              case 3:
                r.append(" ");
                break;
              default:
                if (s < 14) r.append(String.fromCharCode(s + 44));
                else if (s < 40) r.append(String.fromCharCode(s + 51));
                else throw new De();
                break;
            }
          }
        } while (t.available() > 0);
      }),
      (e.parseTwoBytes = function (t, r, n) {
        var i = (t << 8) + r - 1,
          o = Math.floor(i / 1600);
        ((n[0] = o), (i -= o * 1600), (o = Math.floor(i / 40)), (n[1] = o), (n[2] = i - o * 40));
      }),
      (e.decodeEdifactSegment = function (t, r) {
        do {
          if (t.available() <= 16) return;
          for (var n = 0; n < 4; n++) {
            var i = t.readBits(6);
            if (i === 31) {
              var o = 8 - t.getBitOffset();
              if (o !== 8) t.readBits(o);
              return;
            }
            if ((i & 32) === 0) i |= 64;
            r.append(String.fromCharCode(i));
          }
        } while (t.available() > 0);
      }),
      (e.decodeBase256Segment = function (t, r, n) {
        var i = 1 + t.getByteOffset(),
          o = this.unrandomize255State(t.readBits(8), i++),
          s;
        if (o === 0) s = (t.available() / 8) | 0;
        else if (o < 250) s = o;
        else s = 250 * (o - 249) + this.unrandomize255State(t.readBits(8), i++);
        if (s < 0) throw new De();
        var a = new Uint8Array(s);
        for (var l = 0; l < s; l++) {
          if (t.available() < 8) throw new De();
          a[l] = this.unrandomize255State(t.readBits(8), i++);
        }
        n.push(a);
        try {
          r.append(ki.decode(a, er.ISO88591));
        } catch (c) {
          throw new Xi("Platform does not support required encoding: " + c.message);
        }
      }),
      (e.unrandomize255State = function (t, r) {
        var n = ((149 * r) % 255) + 1,
          i = t - n;
        return i >= 0 ? i : i + 256;
      }),
      (e.C40_BASIC_SET_CHARS = [
        "*",
        "*",
        "*",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ]),
      (e.C40_SHIFT2_SET_CHARS = [
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "\\",
        "]",
        "^",
        "_",
      ]),
      (e.TEXT_BASIC_SET_CHARS = [
        "*",
        "*",
        "*",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]),
      (e.TEXT_SHIFT2_SET_CHARS = e.C40_SHIFT2_SET_CHARS),
      (e.TEXT_SHIFT3_SET_CHARS = [
        "`",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "{",
        "|",
        "}",
        "~",
        String.fromCharCode(127),
      ]),
      e
    );
  })(),
  CS = Zoe;
var $oe = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Joe = (function () {
    function e() {
      this.rsDecoder = new Ba(si.DATA_MATRIX_FIELD_256);
    }
    return (
      (e.prototype.decode = function (t) {
        var r,
          n,
          i = new oU(t),
          o = i.getVersion(),
          s = i.readCodewords(),
          a = aU.getDataBlocks(s, o),
          l = 0;
        try {
          for (var c = $oe(a), u = c.next(); !u.done; u = c.next()) {
            var d = u.value;
            l += d.getNumDataCodewords();
          }
        } catch (x) {
          r = { error: x };
        } finally {
          try {
            if (u && !u.done && (n = c.return)) n.call(c);
          } finally {
            if (r) throw r.error;
          }
        }
        var h = new Uint8Array(l),
          f = a.length;
        for (var p = 0; p < f; p++) {
          var g = a[p],
            m = g.getCodewords(),
            A = g.getNumDataCodewords();
          this.correctErrors(m, A);
          for (var y = 0; y < A; y++) h[y * f + p] = m[y];
        }
        return CS.decode(h);
      }),
      (e.prototype.correctErrors = function (t, r) {
        var n = new Int32Array(t);
        try {
          this.rsDecoder.decode(n, t.length - r);
        } catch (o) {
          throw new qr();
        }
        for (var i = 0; i < r; i++) t[i] = n[i];
      }),
      e
    );
  })(),
  lU = Joe;
var ese = (function () {
    function e(t) {
      ((this.image = t), (this.rectangleDetector = new j1(this.image)));
    }
    return (
      (e.prototype.detect = function () {
        var t = this.rectangleDetector.detect(),
          r = this.detectSolid1(t);
        if (((r = this.detectSolid2(r)), (r[3] = this.correctTopRight(r)), !r[3])) throw new Ce();
        r = this.shiftToModuleCenter(r);
        var n = r[0],
          i = r[1],
          o = r[2],
          s = r[3],
          a = this.transitionsBetween(n, s) + 1,
          l = this.transitionsBetween(o, s) + 1;
        if ((a & 1) === 1) a += 1;
        if ((l & 1) === 1) l += 1;
        if (4 * a < 7 * l && 4 * l < 7 * a) a = l = Math.max(a, l);
        var c = e.sampleGrid(this.image, n, i, o, s, a, l);
        return new Xu(c, [n, i, o, s]);
      }),
      (e.shiftPoint = function (t, r, n) {
        var i = (r.getX() - t.getX()) / (n + 1),
          o = (r.getY() - t.getY()) / (n + 1);
        return new ct(t.getX() + i, t.getY() + o);
      }),
      (e.moveAway = function (t, r, n) {
        var i = t.getX(),
          o = t.getY();
        if (i < r) i -= 1;
        else i += 1;
        if (o < n) o -= 1;
        else o += 1;
        return new ct(i, o);
      }),
      (e.prototype.detectSolid1 = function (t) {
        var r = t[0],
          n = t[1],
          i = t[3],
          o = t[2],
          s = this.transitionsBetween(r, n),
          a = this.transitionsBetween(n, i),
          l = this.transitionsBetween(i, o),
          c = this.transitionsBetween(o, r),
          u = s,
          d = [o, r, n, i];
        if (u > a) ((u = a), (d[0] = r), (d[1] = n), (d[2] = i), (d[3] = o));
        if (u > l) ((u = l), (d[0] = n), (d[1] = i), (d[2] = o), (d[3] = r));
        if (u > c) ((d[0] = i), (d[1] = o), (d[2] = r), (d[3] = n));
        return d;
      }),
      (e.prototype.detectSolid2 = function (t) {
        var r = t[0],
          n = t[1],
          i = t[2],
          o = t[3],
          s = this.transitionsBetween(r, o),
          a = e.shiftPoint(n, i, (s + 1) * 4),
          l = e.shiftPoint(i, n, (s + 1) * 4),
          c = this.transitionsBetween(a, r),
          u = this.transitionsBetween(l, o);
        if (c < u) ((t[0] = r), (t[1] = n), (t[2] = i), (t[3] = o));
        else ((t[0] = n), (t[1] = i), (t[2] = o), (t[3] = r));
        return t;
      }),
      (e.prototype.correctTopRight = function (t) {
        var r = t[0],
          n = t[1],
          i = t[2],
          o = t[3],
          s = this.transitionsBetween(r, o),
          a = this.transitionsBetween(n, o),
          l = e.shiftPoint(r, n, (a + 1) * 4),
          c = e.shiftPoint(i, n, (s + 1) * 4);
        ((s = this.transitionsBetween(l, o)), (a = this.transitionsBetween(c, o)));
        var u = new ct(
            o.getX() + (i.getX() - n.getX()) / (s + 1),
            o.getY() + (i.getY() - n.getY()) / (s + 1),
          ),
          d = new ct(
            o.getX() + (r.getX() - n.getX()) / (a + 1),
            o.getY() + (r.getY() - n.getY()) / (a + 1),
          );
        if (!this.isValid(u)) {
          if (this.isValid(d)) return d;
          return null;
        }
        if (!this.isValid(d)) return u;
        var h = this.transitionsBetween(l, u) + this.transitionsBetween(c, u),
          f = this.transitionsBetween(l, d) + this.transitionsBetween(c, d);
        if (h > f) return u;
        else return d;
      }),
      (e.prototype.shiftToModuleCenter = function (t) {
        var r = t[0],
          n = t[1],
          i = t[2],
          o = t[3],
          s = this.transitionsBetween(r, o) + 1,
          a = this.transitionsBetween(i, o) + 1,
          l = e.shiftPoint(r, n, a * 4),
          c = e.shiftPoint(i, n, s * 4);
        if (
          ((s = this.transitionsBetween(l, o) + 1),
          (a = this.transitionsBetween(c, o) + 1),
          (s & 1) === 1)
        )
          s += 1;
        if ((a & 1) === 1) a += 1;
        var u = (r.getX() + n.getX() + i.getX() + o.getX()) / 4,
          d = (r.getY() + n.getY() + i.getY() + o.getY()) / 4;
        ((r = e.moveAway(r, u, d)),
          (n = e.moveAway(n, u, d)),
          (i = e.moveAway(i, u, d)),
          (o = e.moveAway(o, u, d)));
        var h, f;
        return (
          (l = e.shiftPoint(r, n, a * 4)),
          (l = e.shiftPoint(l, o, s * 4)),
          (h = e.shiftPoint(n, r, a * 4)),
          (h = e.shiftPoint(h, i, s * 4)),
          (c = e.shiftPoint(i, o, a * 4)),
          (c = e.shiftPoint(c, n, s * 4)),
          (f = e.shiftPoint(o, i, a * 4)),
          (f = e.shiftPoint(f, r, s * 4)),
          [l, h, c, f]
        );
      }),
      (e.prototype.isValid = function (t) {
        return (
          t.getX() >= 0 &&
          t.getX() < this.image.getWidth() &&
          t.getY() > 0 &&
          t.getY() < this.image.getHeight()
        );
      }),
      (e.sampleGrid = function (t, r, n, i, o, s, a) {
        var l = ju.getInstance();
        return l.sampleGrid(
          t,
          s,
          a,
          0.5,
          0.5,
          s - 0.5,
          0.5,
          s - 0.5,
          a - 0.5,
          0.5,
          a - 0.5,
          r.getX(),
          r.getY(),
          o.getX(),
          o.getY(),
          i.getX(),
          i.getY(),
          n.getX(),
          n.getY(),
        );
      }),
      (e.prototype.transitionsBetween = function (t, r) {
        var n = Math.trunc(t.getX()),
          i = Math.trunc(t.getY()),
          o = Math.trunc(r.getX()),
          s = Math.trunc(r.getY()),
          a = Math.abs(s - i) > Math.abs(o - n);
        if (a) {
          var l = n;
          ((n = i), (i = l), (l = o), (o = s), (s = l));
        }
        var c = Math.abs(o - n),
          u = Math.abs(s - i),
          d = -c / 2,
          h = i < s ? 1 : -1,
          f = n < o ? 1 : -1,
          p = 0,
          g = this.image.get(a ? i : n, a ? n : i);
        for (var m = n, A = i; m !== o; m += f) {
          var y = this.image.get(a ? A : m, a ? m : A);
          if (y !== g) (p++, (g = y));
          if (((d += u), d > 0)) {
            if (A === s) break;
            ((A += h), (d -= c));
          }
        }
        return p;
      }),
      e
    );
  })(),
  cU = ese;
var tse = (function () {
    function e() {
      this.decoder = new lU();
    }
    return (
      (e.prototype.decode = function (t, r) {
        if (r === void 0) r = null;
        var n, i;
        if (r != null && r.has(nr.PURE_BARCODE)) {
          var o = e.extractPureBits(t.getBlackMatrix());
          ((n = this.decoder.decode(o)), (i = e.NO_POINTS));
        } else {
          var s = new cU(t.getBlackMatrix()).detect();
          ((n = this.decoder.decode(s.getBits())), (i = s.getPoints()));
        }
        var a = n.getRawBytes(),
          l = new Xr(n.getText(), a, 8 * a.length, i, at.DATA_MATRIX, pr.currentTimeMillis()),
          c = n.getByteSegments();
        if (c != null) l.putMetadata(hn.BYTE_SEGMENTS, c);
        var u = n.getECLevel();
        if (u != null) l.putMetadata(hn.ERROR_CORRECTION_LEVEL, u);
        return l;
      }),
      (e.prototype.reset = function () {}),
      (e.extractPureBits = function (t) {
        var r = t.getTopLeftOnBit(),
          n = t.getBottomRightOnBit();
        if (r == null || n == null) throw new Ce();
        var i = this.moduleSize(r, t),
          o = r[1],
          s = n[1],
          a = r[0],
          l = n[0],
          c = (l - a + 1) / i,
          u = (s - o + 1) / i;
        if (c <= 0 || u <= 0) throw new Ce();
        var d = i / 2;
        ((o += d), (a += d));
        var h = new bn(c, u);
        for (var f = 0; f < u; f++) {
          var p = o + f * i;
          for (var g = 0; g < c; g++) if (t.get(a + g * i, p)) h.set(g, f);
        }
        return h;
      }),
      (e.moduleSize = function (t, r) {
        var n = r.getWidth(),
          i = t[0],
          o = t[1];
        while (i < n && r.get(i, o)) i++;
        if (i === n) throw new Ce();
        var s = i - t[0];
        if (s === 0) throw new Ce();
        return s;
      }),
      (e.NO_POINTS = []),
      e
    );
  })(),
  ph = tse;
var rse = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  X7e = (function (e) {
    rse(t, e);
    function t(r) {
      if (r === void 0) r = 500;
      return e.call(this, new ph(), r) || this;
    }
    return t;
  })(gl);
var tm;
(function (e) {
  ((e[(e.L = 0)] = "L"), (e[(e.M = 1)] = "M"), (e[(e.Q = 2)] = "Q"), (e[(e.H = 3)] = "H"));
})(tm || (tm = {}));
var nse = (function () {
    function e(t, r, n) {
      ((this.value = t),
        (this.stringValue = r),
        (this.bits = n),
        e.FOR_BITS.set(n, this),
        e.FOR_VALUE.set(t, this));
    }
    return (
      (e.prototype.getValue = function () {
        return this.value;
      }),
      (e.prototype.getBits = function () {
        return this.bits;
      }),
      (e.fromString = function (t) {
        switch (t) {
          case "L":
            return e.L;
          case "M":
            return e.M;
          case "Q":
            return e.Q;
          case "H":
            return e.H;
          default:
            throw new hi(t + "not available");
        }
      }),
      (e.prototype.toString = function () {
        return this.stringValue;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.value === r.value;
      }),
      (e.forBits = function (t) {
        if (t < 0 || t >= e.FOR_BITS.size) throw new nt();
        return e.FOR_BITS.get(t);
      }),
      (e.FOR_BITS = /*@__PURE__*/ new Map()),
      (e.FOR_VALUE = /*@__PURE__*/ new Map()),
      (e.L = new e(tm.L, "L", 1)),
      (e.M = new e(tm.M, "M", 0)),
      (e.Q = new e(tm.Q, "Q", 3)),
      (e.H = new e(tm.H, "H", 2)),
      e
    );
  })(),
  Ns = nse;
var ise = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  ose = (function () {
    function e(t) {
      ((this.errorCorrectionLevel = Ns.forBits((t >> 3) & 3)), (this.dataMask = t & 7));
    }
    return (
      (e.numBitsDiffering = function (t, r) {
        return Ut.bitCount(t ^ r);
      }),
      (e.decodeFormatInformation = function (t, r) {
        var n = e.doDecodeFormatInformation(t, r);
        if (n !== null) return n;
        return e.doDecodeFormatInformation(t ^ e.FORMAT_INFO_MASK_QR, r ^ e.FORMAT_INFO_MASK_QR);
      }),
      (e.doDecodeFormatInformation = function (t, r) {
        var n,
          i,
          o = Number.MAX_SAFE_INTEGER,
          s = 0;
        try {
          for (var a = ise(e.FORMAT_INFO_DECODE_LOOKUP), l = a.next(); !l.done; l = a.next()) {
            var c = l.value,
              u = c[0];
            if (u === t || u === r) return new e(c[1]);
            var d = e.numBitsDiffering(t, u);
            if (d < o) ((s = c[1]), (o = d));
            if (t !== r) {
              if (((d = e.numBitsDiffering(r, u)), d < o)) ((s = c[1]), (o = d));
            }
          }
        } catch (h) {
          n = { error: h };
        } finally {
          try {
            if (l && !l.done && (i = a.return)) i.call(a);
          } finally {
            if (n) throw n.error;
          }
        }
        if (o <= 3) return new e(s);
        return null;
      }),
      (e.prototype.getErrorCorrectionLevel = function () {
        return this.errorCorrectionLevel;
      }),
      (e.prototype.getDataMask = function () {
        return this.dataMask;
      }),
      (e.prototype.hashCode = function () {
        return (this.errorCorrectionLevel.getBits() << 3) | this.dataMask;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.errorCorrectionLevel === r.errorCorrectionLevel && this.dataMask === r.dataMask;
      }),
      (e.FORMAT_INFO_MASK_QR = 21522),
      (e.FORMAT_INFO_DECODE_LOOKUP = [
        Int32Array.from([21522, 0]),
        Int32Array.from([20773, 1]),
        Int32Array.from([24188, 2]),
        Int32Array.from([23371, 3]),
        Int32Array.from([17913, 4]),
        Int32Array.from([16590, 5]),
        Int32Array.from([20375, 6]),
        Int32Array.from([19104, 7]),
        Int32Array.from([30660, 8]),
        Int32Array.from([29427, 9]),
        Int32Array.from([32170, 10]),
        Int32Array.from([30877, 11]),
        Int32Array.from([26159, 12]),
        Int32Array.from([25368, 13]),
        Int32Array.from([27713, 14]),
        Int32Array.from([26998, 15]),
        Int32Array.from([5769, 16]),
        Int32Array.from([5054, 17]),
        Int32Array.from([7399, 18]),
        Int32Array.from([6608, 19]),
        Int32Array.from([1890, 20]),
        Int32Array.from([597, 21]),
        Int32Array.from([3340, 22]),
        Int32Array.from([2107, 23]),
        Int32Array.from([13663, 24]),
        Int32Array.from([12392, 25]),
        Int32Array.from([16177, 26]),
        Int32Array.from([14854, 27]),
        Int32Array.from([9396, 28]),
        Int32Array.from([8579, 29]),
        Int32Array.from([11994, 30]),
        Int32Array.from([11245, 31]),
      ]),
      e
    );
  })(),
  Z3 = ose;
var sse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  ase = (function () {
    function e(t) {
      var r = [];
      for (var n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
      ((this.ecCodewordsPerBlock = t), (this.ecBlocks = r));
    }
    return (
      (e.prototype.getECCodewordsPerBlock = function () {
        return this.ecCodewordsPerBlock;
      }),
      (e.prototype.getNumBlocks = function () {
        var t,
          r,
          n = 0,
          i = this.ecBlocks;
        try {
          for (var o = sse(i), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            n += a.getCount();
          }
        } catch (l) {
          t = { error: l };
        } finally {
          try {
            if (s && !s.done && (r = o.return)) r.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
        return n;
      }),
      (e.prototype.getTotalECCodewords = function () {
        return this.ecCodewordsPerBlock * this.getNumBlocks();
      }),
      (e.prototype.getECBlocks = function () {
        return this.ecBlocks;
      }),
      e
    );
  })(),
  Me = ase;
var lse = (function () {
    function e(t, r) {
      ((this.count = t), (this.dataCodewords = r));
    }
    return (
      (e.prototype.getCount = function () {
        return this.count;
      }),
      (e.prototype.getDataCodewords = function () {
        return this.dataCodewords;
      }),
      e
    );
  })(),
  ie = lse;
var cse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  use = (function () {
    function e(t, r) {
      var n,
        i,
        o = [];
      for (var s = 2; s < arguments.length; s++) o[s - 2] = arguments[s];
      ((this.versionNumber = t), (this.alignmentPatternCenters = r), (this.ecBlocks = o));
      var a = 0,
        l = o[0].getECCodewordsPerBlock(),
        c = o[0].getECBlocks();
      try {
        for (var u = cse(c), d = u.next(); !d.done; d = u.next()) {
          var h = d.value;
          a += h.getCount() * (h.getDataCodewords() + l);
        }
      } catch (f) {
        n = { error: f };
      } finally {
        try {
          if (d && !d.done && (i = u.return)) i.call(u);
        } finally {
          if (n) throw n.error;
        }
      }
      this.totalCodewords = a;
    }
    return (
      (e.prototype.getVersionNumber = function () {
        return this.versionNumber;
      }),
      (e.prototype.getAlignmentPatternCenters = function () {
        return this.alignmentPatternCenters;
      }),
      (e.prototype.getTotalCodewords = function () {
        return this.totalCodewords;
      }),
      (e.prototype.getDimensionForVersion = function () {
        return 17 + 4 * this.versionNumber;
      }),
      (e.prototype.getECBlocksForLevel = function (t) {
        return this.ecBlocks[t.getValue()];
      }),
      (e.getProvisionalVersionForDimension = function (t) {
        if (t % 4 !== 1) throw new De();
        try {
          return this.getVersionForNumber((t - 17) / 4);
        } catch (r) {
          throw new De();
        }
      }),
      (e.getVersionForNumber = function (t) {
        if (t < 1 || t > 40) throw new nt();
        return e.VERSIONS[t - 1];
      }),
      (e.decodeVersionInformation = function (t) {
        var r = Number.MAX_SAFE_INTEGER,
          n = 0;
        for (var i = 0; i < e.VERSION_DECODE_INFO.length; i++) {
          var o = e.VERSION_DECODE_INFO[i];
          if (o === t) return e.getVersionForNumber(i + 7);
          var s = Z3.numBitsDiffering(t, o);
          if (s < r) ((n = i + 7), (r = s));
        }
        if (r <= 3) return e.getVersionForNumber(n);
        return null;
      }),
      (e.prototype.buildFunctionPattern = function () {
        var t = this.getDimensionForVersion(),
          r = new bn(t);
        (r.setRegion(0, 0, 9, 9), r.setRegion(t - 8, 0, 8, 9), r.setRegion(0, t - 8, 9, 8));
        var n = this.alignmentPatternCenters.length;
        for (var i = 0; i < n; i++) {
          var o = this.alignmentPatternCenters[i] - 2;
          for (var s = 0; s < n; s++) {
            if ((i === 0 && (s === 0 || s === n - 1)) || (i === n - 1 && s === 0)) continue;
            r.setRegion(this.alignmentPatternCenters[s] - 2, o, 5, 5);
          }
        }
        if ((r.setRegion(6, 9, 1, t - 17), r.setRegion(9, 6, t - 17, 1), this.versionNumber > 6))
          (r.setRegion(t - 11, 0, 3, 6), r.setRegion(0, t - 11, 6, 3));
        return r;
      }),
      (e.prototype.toString = function () {
        return "" + this.versionNumber;
      }),
      (e.VERSION_DECODE_INFO = Int32Array.from([
        31892, 34236, 39577, 42195, 48118, 51042, 55367, 58893, 63784, 68472, 70749, 76311, 79154,
        84390, 87683, 92361, 96236, 102084, 102881, 110507, 110734, 117786, 119615, 126325, 127568,
        133589, 136944, 141498, 145311, 150283, 152622, 158308, 161089, 167017,
      ])),
      (e.VERSIONS = [
        new e(
          1,
          new Int32Array(0),
          new Me(7, new ie(1, 19)),
          new Me(10, new ie(1, 16)),
          new Me(13, new ie(1, 13)),
          new Me(17, new ie(1, 9)),
        ),
        new e(
          2,
          Int32Array.from([6, 18]),
          new Me(10, new ie(1, 34)),
          new Me(16, new ie(1, 28)),
          new Me(22, new ie(1, 22)),
          new Me(28, new ie(1, 16)),
        ),
        new e(
          3,
          Int32Array.from([6, 22]),
          new Me(15, new ie(1, 55)),
          new Me(26, new ie(1, 44)),
          new Me(18, new ie(2, 17)),
          new Me(22, new ie(2, 13)),
        ),
        new e(
          4,
          Int32Array.from([6, 26]),
          new Me(20, new ie(1, 80)),
          new Me(18, new ie(2, 32)),
          new Me(26, new ie(2, 24)),
          new Me(16, new ie(4, 9)),
        ),
        new e(
          5,
          Int32Array.from([6, 30]),
          new Me(26, new ie(1, 108)),
          new Me(24, new ie(2, 43)),
          new Me(18, new ie(2, 15), new ie(2, 16)),
          new Me(22, new ie(2, 11), new ie(2, 12)),
        ),
        new e(
          6,
          Int32Array.from([6, 34]),
          new Me(18, new ie(2, 68)),
          new Me(16, new ie(4, 27)),
          new Me(24, new ie(4, 19)),
          new Me(28, new ie(4, 15)),
        ),
        new e(
          7,
          Int32Array.from([6, 22, 38]),
          new Me(20, new ie(2, 78)),
          new Me(18, new ie(4, 31)),
          new Me(18, new ie(2, 14), new ie(4, 15)),
          new Me(26, new ie(4, 13), new ie(1, 14)),
        ),
        new e(
          8,
          Int32Array.from([6, 24, 42]),
          new Me(24, new ie(2, 97)),
          new Me(22, new ie(2, 38), new ie(2, 39)),
          new Me(22, new ie(4, 18), new ie(2, 19)),
          new Me(26, new ie(4, 14), new ie(2, 15)),
        ),
        new e(
          9,
          Int32Array.from([6, 26, 46]),
          new Me(30, new ie(2, 116)),
          new Me(22, new ie(3, 36), new ie(2, 37)),
          new Me(20, new ie(4, 16), new ie(4, 17)),
          new Me(24, new ie(4, 12), new ie(4, 13)),
        ),
        new e(
          10,
          Int32Array.from([6, 28, 50]),
          new Me(18, new ie(2, 68), new ie(2, 69)),
          new Me(26, new ie(4, 43), new ie(1, 44)),
          new Me(24, new ie(6, 19), new ie(2, 20)),
          new Me(28, new ie(6, 15), new ie(2, 16)),
        ),
        new e(
          11,
          Int32Array.from([6, 30, 54]),
          new Me(20, new ie(4, 81)),
          new Me(30, new ie(1, 50), new ie(4, 51)),
          new Me(28, new ie(4, 22), new ie(4, 23)),
          new Me(24, new ie(3, 12), new ie(8, 13)),
        ),
        new e(
          12,
          Int32Array.from([6, 32, 58]),
          new Me(24, new ie(2, 92), new ie(2, 93)),
          new Me(22, new ie(6, 36), new ie(2, 37)),
          new Me(26, new ie(4, 20), new ie(6, 21)),
          new Me(28, new ie(7, 14), new ie(4, 15)),
        ),
        new e(
          13,
          Int32Array.from([6, 34, 62]),
          new Me(26, new ie(4, 107)),
          new Me(22, new ie(8, 37), new ie(1, 38)),
          new Me(24, new ie(8, 20), new ie(4, 21)),
          new Me(22, new ie(12, 11), new ie(4, 12)),
        ),
        new e(
          14,
          Int32Array.from([6, 26, 46, 66]),
          new Me(30, new ie(3, 115), new ie(1, 116)),
          new Me(24, new ie(4, 40), new ie(5, 41)),
          new Me(20, new ie(11, 16), new ie(5, 17)),
          new Me(24, new ie(11, 12), new ie(5, 13)),
        ),
        new e(
          15,
          Int32Array.from([6, 26, 48, 70]),
          new Me(22, new ie(5, 87), new ie(1, 88)),
          new Me(24, new ie(5, 41), new ie(5, 42)),
          new Me(30, new ie(5, 24), new ie(7, 25)),
          new Me(24, new ie(11, 12), new ie(7, 13)),
        ),
        new e(
          16,
          Int32Array.from([6, 26, 50, 74]),
          new Me(24, new ie(5, 98), new ie(1, 99)),
          new Me(28, new ie(7, 45), new ie(3, 46)),
          new Me(24, new ie(15, 19), new ie(2, 20)),
          new Me(30, new ie(3, 15), new ie(13, 16)),
        ),
        new e(
          17,
          Int32Array.from([6, 30, 54, 78]),
          new Me(28, new ie(1, 107), new ie(5, 108)),
          new Me(28, new ie(10, 46), new ie(1, 47)),
          new Me(28, new ie(1, 22), new ie(15, 23)),
          new Me(28, new ie(2, 14), new ie(17, 15)),
        ),
        new e(
          18,
          Int32Array.from([6, 30, 56, 82]),
          new Me(30, new ie(5, 120), new ie(1, 121)),
          new Me(26, new ie(9, 43), new ie(4, 44)),
          new Me(28, new ie(17, 22), new ie(1, 23)),
          new Me(28, new ie(2, 14), new ie(19, 15)),
        ),
        new e(
          19,
          Int32Array.from([6, 30, 58, 86]),
          new Me(28, new ie(3, 113), new ie(4, 114)),
          new Me(26, new ie(3, 44), new ie(11, 45)),
          new Me(26, new ie(17, 21), new ie(4, 22)),
          new Me(26, new ie(9, 13), new ie(16, 14)),
        ),
        new e(
          20,
          Int32Array.from([6, 34, 62, 90]),
          new Me(28, new ie(3, 107), new ie(5, 108)),
          new Me(26, new ie(3, 41), new ie(13, 42)),
          new Me(30, new ie(15, 24), new ie(5, 25)),
          new Me(28, new ie(15, 15), new ie(10, 16)),
        ),
        new e(
          21,
          Int32Array.from([6, 28, 50, 72, 94]),
          new Me(28, new ie(4, 116), new ie(4, 117)),
          new Me(26, new ie(17, 42)),
          new Me(28, new ie(17, 22), new ie(6, 23)),
          new Me(30, new ie(19, 16), new ie(6, 17)),
        ),
        new e(
          22,
          Int32Array.from([6, 26, 50, 74, 98]),
          new Me(28, new ie(2, 111), new ie(7, 112)),
          new Me(28, new ie(17, 46)),
          new Me(30, new ie(7, 24), new ie(16, 25)),
          new Me(24, new ie(34, 13)),
        ),
        new e(
          23,
          Int32Array.from([6, 30, 54, 78, 102]),
          new Me(30, new ie(4, 121), new ie(5, 122)),
          new Me(28, new ie(4, 47), new ie(14, 48)),
          new Me(30, new ie(11, 24), new ie(14, 25)),
          new Me(30, new ie(16, 15), new ie(14, 16)),
        ),
        new e(
          24,
          Int32Array.from([6, 28, 54, 80, 106]),
          new Me(30, new ie(6, 117), new ie(4, 118)),
          new Me(28, new ie(6, 45), new ie(14, 46)),
          new Me(30, new ie(11, 24), new ie(16, 25)),
          new Me(30, new ie(30, 16), new ie(2, 17)),
        ),
        new e(
          25,
          Int32Array.from([6, 32, 58, 84, 110]),
          new Me(26, new ie(8, 106), new ie(4, 107)),
          new Me(28, new ie(8, 47), new ie(13, 48)),
          new Me(30, new ie(7, 24), new ie(22, 25)),
          new Me(30, new ie(22, 15), new ie(13, 16)),
        ),
        new e(
          26,
          Int32Array.from([6, 30, 58, 86, 114]),
          new Me(28, new ie(10, 114), new ie(2, 115)),
          new Me(28, new ie(19, 46), new ie(4, 47)),
          new Me(28, new ie(28, 22), new ie(6, 23)),
          new Me(30, new ie(33, 16), new ie(4, 17)),
        ),
        new e(
          27,
          Int32Array.from([6, 34, 62, 90, 118]),
          new Me(30, new ie(8, 122), new ie(4, 123)),
          new Me(28, new ie(22, 45), new ie(3, 46)),
          new Me(30, new ie(8, 23), new ie(26, 24)),
          new Me(30, new ie(12, 15), new ie(28, 16)),
        ),
        new e(
          28,
          Int32Array.from([6, 26, 50, 74, 98, 122]),
          new Me(30, new ie(3, 117), new ie(10, 118)),
          new Me(28, new ie(3, 45), new ie(23, 46)),
          new Me(30, new ie(4, 24), new ie(31, 25)),
          new Me(30, new ie(11, 15), new ie(31, 16)),
        ),
        new e(
          29,
          Int32Array.from([6, 30, 54, 78, 102, 126]),
          new Me(30, new ie(7, 116), new ie(7, 117)),
          new Me(28, new ie(21, 45), new ie(7, 46)),
          new Me(30, new ie(1, 23), new ie(37, 24)),
          new Me(30, new ie(19, 15), new ie(26, 16)),
        ),
        new e(
          30,
          Int32Array.from([6, 26, 52, 78, 104, 130]),
          new Me(30, new ie(5, 115), new ie(10, 116)),
          new Me(28, new ie(19, 47), new ie(10, 48)),
          new Me(30, new ie(15, 24), new ie(25, 25)),
          new Me(30, new ie(23, 15), new ie(25, 16)),
        ),
        new e(
          31,
          Int32Array.from([6, 30, 56, 82, 108, 134]),
          new Me(30, new ie(13, 115), new ie(3, 116)),
          new Me(28, new ie(2, 46), new ie(29, 47)),
          new Me(30, new ie(42, 24), new ie(1, 25)),
          new Me(30, new ie(23, 15), new ie(28, 16)),
        ),
        new e(
          32,
          Int32Array.from([6, 34, 60, 86, 112, 138]),
          new Me(30, new ie(17, 115)),
          new Me(28, new ie(10, 46), new ie(23, 47)),
          new Me(30, new ie(10, 24), new ie(35, 25)),
          new Me(30, new ie(19, 15), new ie(35, 16)),
        ),
        new e(
          33,
          Int32Array.from([6, 30, 58, 86, 114, 142]),
          new Me(30, new ie(17, 115), new ie(1, 116)),
          new Me(28, new ie(14, 46), new ie(21, 47)),
          new Me(30, new ie(29, 24), new ie(19, 25)),
          new Me(30, new ie(11, 15), new ie(46, 16)),
        ),
        new e(
          34,
          Int32Array.from([6, 34, 62, 90, 118, 146]),
          new Me(30, new ie(13, 115), new ie(6, 116)),
          new Me(28, new ie(14, 46), new ie(23, 47)),
          new Me(30, new ie(44, 24), new ie(7, 25)),
          new Me(30, new ie(59, 16), new ie(1, 17)),
        ),
        new e(
          35,
          Int32Array.from([6, 30, 54, 78, 102, 126, 150]),
          new Me(30, new ie(12, 121), new ie(7, 122)),
          new Me(28, new ie(12, 47), new ie(26, 48)),
          new Me(30, new ie(39, 24), new ie(14, 25)),
          new Me(30, new ie(22, 15), new ie(41, 16)),
        ),
        new e(
          36,
          Int32Array.from([6, 24, 50, 76, 102, 128, 154]),
          new Me(30, new ie(6, 121), new ie(14, 122)),
          new Me(28, new ie(6, 47), new ie(34, 48)),
          new Me(30, new ie(46, 24), new ie(10, 25)),
          new Me(30, new ie(2, 15), new ie(64, 16)),
        ),
        new e(
          37,
          Int32Array.from([6, 28, 54, 80, 106, 132, 158]),
          new Me(30, new ie(17, 122), new ie(4, 123)),
          new Me(28, new ie(29, 46), new ie(14, 47)),
          new Me(30, new ie(49, 24), new ie(10, 25)),
          new Me(30, new ie(24, 15), new ie(46, 16)),
        ),
        new e(
          38,
          Int32Array.from([6, 32, 58, 84, 110, 136, 162]),
          new Me(30, new ie(4, 122), new ie(18, 123)),
          new Me(28, new ie(13, 46), new ie(32, 47)),
          new Me(30, new ie(48, 24), new ie(14, 25)),
          new Me(30, new ie(42, 15), new ie(32, 16)),
        ),
        new e(
          39,
          Int32Array.from([6, 26, 54, 82, 110, 138, 166]),
          new Me(30, new ie(20, 117), new ie(4, 118)),
          new Me(28, new ie(40, 47), new ie(7, 48)),
          new Me(30, new ie(43, 24), new ie(22, 25)),
          new Me(30, new ie(10, 15), new ie(67, 16)),
        ),
        new e(
          40,
          Int32Array.from([6, 30, 58, 86, 114, 142, 170]),
          new Me(30, new ie(19, 118), new ie(6, 119)),
          new Me(28, new ie(18, 47), new ie(31, 48)),
          new Me(30, new ie(34, 24), new ie(34, 25)),
          new Me(30, new ie(20, 15), new ie(61, 16)),
        ),
      ]),
      e
    );
  })(),
  Jl = use;
var No;
(function (e) {
  ((e[(e.DATA_MASK_000 = 0)] = "DATA_MASK_000"),
    (e[(e.DATA_MASK_001 = 1)] = "DATA_MASK_001"),
    (e[(e.DATA_MASK_010 = 2)] = "DATA_MASK_010"),
    (e[(e.DATA_MASK_011 = 3)] = "DATA_MASK_011"),
    (e[(e.DATA_MASK_100 = 4)] = "DATA_MASK_100"),
    (e[(e.DATA_MASK_101 = 5)] = "DATA_MASK_101"),
    (e[(e.DATA_MASK_110 = 6)] = "DATA_MASK_110"),
    (e[(e.DATA_MASK_111 = 7)] = "DATA_MASK_111"));
})(No || (No = {}));
var dse = (function () {
    function e(t, r) {
      ((this.value = t), (this.isMasked = r));
    }
    return (
      (e.prototype.unmaskBitMatrix = function (t, r) {
        for (var n = 0; n < r; n++)
          for (var i = 0; i < r; i++) if (this.isMasked(n, i)) t.flip(i, n);
      }),
      (e.values = /*@__PURE__*/ new Map([
        [
          No.DATA_MASK_000,
          new e(No.DATA_MASK_000, function (t, r) {
            return ((t + r) & 1) === 0;
          }),
        ],
        [
          No.DATA_MASK_001,
          new e(No.DATA_MASK_001, function (t, r) {
            return (t & 1) === 0;
          }),
        ],
        [
          No.DATA_MASK_010,
          new e(No.DATA_MASK_010, function (t, r) {
            return r % 3 === 0;
          }),
        ],
        [
          No.DATA_MASK_011,
          new e(No.DATA_MASK_011, function (t, r) {
            return (t + r) % 3 === 0;
          }),
        ],
        [
          No.DATA_MASK_100,
          new e(No.DATA_MASK_100, function (t, r) {
            return ((Math.floor(t / 2) + Math.floor(r / 3)) & 1) === 0;
          }),
        ],
        [
          No.DATA_MASK_101,
          new e(No.DATA_MASK_101, function (t, r) {
            return (t * r) % 6 === 0;
          }),
        ],
        [
          No.DATA_MASK_110,
          new e(No.DATA_MASK_110, function (t, r) {
            return (t * r) % 6 < 3;
          }),
        ],
        [
          No.DATA_MASK_111,
          new e(No.DATA_MASK_111, function (t, r) {
            return ((t + r + ((t * r) % 3)) & 1) === 0;
          }),
        ],
      ])),
      e
    );
  })(),
  H_ = dse;
var hse = (function () {
    function e(t) {
      var r = t.getHeight();
      if (r < 21 || (r & 3) !== 1) throw new De();
      this.bitMatrix = t;
    }
    return (
      (e.prototype.readFormatInformation = function () {
        if (this.parsedFormatInfo !== null && this.parsedFormatInfo !== void 0)
          return this.parsedFormatInfo;
        var t = 0;
        for (var r = 0; r < 6; r++) t = this.copyBit(r, 8, t);
        ((t = this.copyBit(7, 8, t)), (t = this.copyBit(8, 8, t)), (t = this.copyBit(8, 7, t)));
        for (var n = 5; n >= 0; n--) t = this.copyBit(8, n, t);
        var i = this.bitMatrix.getHeight(),
          o = 0,
          s = i - 7;
        for (var n = i - 1; n >= s; n--) o = this.copyBit(8, n, o);
        for (var r = i - 8; r < i; r++) o = this.copyBit(r, 8, o);
        if (
          ((this.parsedFormatInfo = Z3.decodeFormatInformation(t, o)),
          this.parsedFormatInfo !== null)
        )
          return this.parsedFormatInfo;
        throw new De();
      }),
      (e.prototype.readVersion = function () {
        if (this.parsedVersion !== null && this.parsedVersion !== void 0) return this.parsedVersion;
        var t = this.bitMatrix.getHeight(),
          r = Math.floor((t - 17) / 4);
        if (r <= 6) return Jl.getVersionForNumber(r);
        var n = 0,
          i = t - 11;
        for (var o = 5; o >= 0; o--) for (var s = t - 9; s >= i; s--) n = this.copyBit(s, o, n);
        var a = Jl.decodeVersionInformation(n);
        if (a !== null && a.getDimensionForVersion() === t) return ((this.parsedVersion = a), a);
        n = 0;
        for (var s = 5; s >= 0; s--) for (var o = t - 9; o >= i; o--) n = this.copyBit(s, o, n);
        if (((a = Jl.decodeVersionInformation(n)), a !== null && a.getDimensionForVersion() === t))
          return ((this.parsedVersion = a), a);
        throw new De();
      }),
      (e.prototype.copyBit = function (t, r, n) {
        var i = this.isMirror ? this.bitMatrix.get(r, t) : this.bitMatrix.get(t, r);
        return i ? (n << 1) | 1 : n << 1;
      }),
      (e.prototype.readCodewords = function () {
        var t = this.readFormatInformation(),
          r = this.readVersion(),
          n = H_.values.get(t.getDataMask()),
          i = this.bitMatrix.getHeight();
        n.unmaskBitMatrix(this.bitMatrix, i);
        var o = r.buildFunctionPattern(),
          s = !0,
          a = new Uint8Array(r.getTotalCodewords()),
          l = 0,
          c = 0,
          u = 0;
        for (var d = i - 1; d > 0; d -= 2) {
          if (d === 6) d--;
          for (var h = 0; h < i; h++) {
            var f = s ? i - 1 - h : h;
            for (var p = 0; p < 2; p++)
              if (!o.get(d - p, f)) {
                if ((u++, (c <<= 1), this.bitMatrix.get(d - p, f))) c |= 1;
                if (u === 8) ((a[l++] = c), (u = 0), (c = 0));
              }
          }
          s = !s;
        }
        if (l !== r.getTotalCodewords()) throw new De();
        return a;
      }),
      (e.prototype.remask = function () {
        if (this.parsedFormatInfo === null) return;
        var t = H_.values.get(this.parsedFormatInfo.getDataMask()),
          r = this.bitMatrix.getHeight();
        t.unmaskBitMatrix(this.bitMatrix, r);
      }),
      (e.prototype.setMirror = function (t) {
        ((this.parsedVersion = null), (this.parsedFormatInfo = null), (this.isMirror = t));
      }),
      (e.prototype.mirror = function () {
        var t = this.bitMatrix;
        for (var r = 0, n = t.getWidth(); r < n; r++)
          for (var i = r + 1, o = t.getHeight(); i < o; i++)
            if (t.get(r, i) !== t.get(i, r)) (t.flip(i, r), t.flip(r, i));
      }),
      e
    );
  })(),
  uU = hse;
var dU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  fse = (function () {
    function e(t, r) {
      ((this.numDataCodewords = t), (this.codewords = r));
    }
    return (
      (e.getDataBlocks = function (t, r, n) {
        var i, o, s, a;
        if (t.length !== r.getTotalCodewords()) throw new nt();
        var l = r.getECBlocksForLevel(n),
          c = 0,
          u = l.getECBlocks();
        try {
          for (var d = dU(u), h = d.next(); !h.done; h = d.next()) {
            var f = h.value;
            c += f.getCount();
          }
        } catch (R) {
          i = { error: R };
        } finally {
          try {
            if (h && !h.done && (o = d.return)) o.call(d);
          } finally {
            if (i) throw i.error;
          }
        }
        var p = Array(c),
          g = 0;
        try {
          for (var m = dU(u), A = m.next(); !A.done; A = m.next()) {
            var f = A.value;
            for (var y = 0; y < f.getCount(); y++) {
              var x = f.getDataCodewords(),
                b = l.getECCodewordsPerBlock() + x;
              p[g++] = new e(x, new Uint8Array(b));
            }
          }
        } catch (R) {
          s = { error: R };
        } finally {
          try {
            if (A && !A.done && (a = m.return)) a.call(m);
          } finally {
            if (s) throw s.error;
          }
        }
        var v = p[0].codewords.length,
          _ = p.length - 1;
        while (_ >= 0) {
          var w = p[_].codewords.length;
          if (w === v) break;
          _--;
        }
        _++;
        var S = v - l.getECCodewordsPerBlock(),
          E = 0;
        for (var y = 0; y < S; y++) for (var T = 0; T < g; T++) p[T].codewords[y] = t[E++];
        for (var T = _; T < g; T++) p[T].codewords[S] = t[E++];
        var M = p[0].codewords.length;
        for (var y = S; y < M; y++)
          for (var T = 0; T < g; T++) {
            var C = T < _ ? y : y + 1;
            p[T].codewords[C] = t[E++];
          }
        return p;
      }),
      (e.prototype.getNumDataCodewords = function () {
        return this.numDataCodewords;
      }),
      (e.prototype.getCodewords = function () {
        return this.codewords;
      }),
      e
    );
  })(),
  hU = fse;
var xl;
(function (e) {
  ((e[(e.TERMINATOR = 0)] = "TERMINATOR"),
    (e[(e.NUMERIC = 1)] = "NUMERIC"),
    (e[(e.ALPHANUMERIC = 2)] = "ALPHANUMERIC"),
    (e[(e.STRUCTURED_APPEND = 3)] = "STRUCTURED_APPEND"),
    (e[(e.BYTE = 4)] = "BYTE"),
    (e[(e.ECI = 5)] = "ECI"),
    (e[(e.KANJI = 6)] = "KANJI"),
    (e[(e.FNC1_FIRST_POSITION = 7)] = "FNC1_FIRST_POSITION"),
    (e[(e.FNC1_SECOND_POSITION = 8)] = "FNC1_SECOND_POSITION"),
    (e[(e.HANZI = 9)] = "HANZI"));
})(xl || (xl = {}));
var pse = (function () {
    function e(t, r, n, i) {
      ((this.value = t),
        (this.stringValue = r),
        (this.characterCountBitsForVersions = n),
        (this.bits = i),
        e.FOR_BITS.set(i, this),
        e.FOR_VALUE.set(t, this));
    }
    return (
      (e.forBits = function (t) {
        var r = e.FOR_BITS.get(t);
        if (r === void 0) throw new nt();
        return r;
      }),
      (e.prototype.getCharacterCountBits = function (t) {
        var r = t.getVersionNumber(),
          n;
        if (r <= 9) n = 0;
        else if (r <= 26) n = 1;
        else n = 2;
        return this.characterCountBitsForVersions[n];
      }),
      (e.prototype.getValue = function () {
        return this.value;
      }),
      (e.prototype.getBits = function () {
        return this.bits;
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        return this.value === r.value;
      }),
      (e.prototype.toString = function () {
        return this.stringValue;
      }),
      (e.FOR_BITS = /*@__PURE__*/ new Map()),
      (e.FOR_VALUE = /*@__PURE__*/ new Map()),
      (e.TERMINATOR = new e(xl.TERMINATOR, "TERMINATOR", Int32Array.from([0, 0, 0]), 0)),
      (e.NUMERIC = new e(xl.NUMERIC, "NUMERIC", Int32Array.from([10, 12, 14]), 1)),
      (e.ALPHANUMERIC = new e(xl.ALPHANUMERIC, "ALPHANUMERIC", Int32Array.from([9, 11, 13]), 2)),
      (e.STRUCTURED_APPEND = new e(
        xl.STRUCTURED_APPEND,
        "STRUCTURED_APPEND",
        Int32Array.from([0, 0, 0]),
        3,
      )),
      (e.BYTE = new e(xl.BYTE, "BYTE", Int32Array.from([8, 16, 16]), 4)),
      (e.ECI = new e(xl.ECI, "ECI", Int32Array.from([0, 0, 0]), 7)),
      (e.KANJI = new e(xl.KANJI, "KANJI", Int32Array.from([8, 10, 12]), 8)),
      (e.FNC1_FIRST_POSITION = new e(
        xl.FNC1_FIRST_POSITION,
        "FNC1_FIRST_POSITION",
        Int32Array.from([0, 0, 0]),
        5,
      )),
      (e.FNC1_SECOND_POSITION = new e(
        xl.FNC1_SECOND_POSITION,
        "FNC1_SECOND_POSITION",
        Int32Array.from([0, 0, 0]),
        9,
      )),
      (e.HANZI = new e(xl.HANZI, "HANZI", Int32Array.from([8, 10, 12]), 13)),
      e
    );
  })(),
  Gn = pse;
var mse = (function () {
    function e() {}
    return (
      (e.decode = function (t, r, n, i) {
        var o = new f0(t),
          s = new Ot(),
          a = [],
          l = -1,
          c = -1;
        try {
          var u = null,
            d = !1,
            h = void 0;
          do {
            if (o.available() < 4) h = Gn.TERMINATOR;
            else {
              var f = o.readBits(4);
              h = Gn.forBits(f);
            }
            switch (h) {
              case Gn.TERMINATOR:
                break;
              case Gn.FNC1_FIRST_POSITION:
              case Gn.FNC1_SECOND_POSITION:
                d = !0;
                break;
              case Gn.STRUCTURED_APPEND:
                if (o.available() < 16) throw new De();
                ((l = o.readBits(8)), (c = o.readBits(8)));
                break;
              case Gn.ECI:
                var p = e.parseECIValue(o);
                if (((u = Jn.getCharacterSetECIByValue(p)), u === null)) throw new De();
                break;
              case Gn.HANZI:
                var g = o.readBits(4),
                  m = o.readBits(h.getCharacterCountBits(r));
                if (g === e.GB2312_SUBSET) e.decodeHanziSegment(o, s, m);
                break;
              default:
                var A = o.readBits(h.getCharacterCountBits(r));
                switch (h) {
                  case Gn.NUMERIC:
                    e.decodeNumericSegment(o, s, A);
                    break;
                  case Gn.ALPHANUMERIC:
                    e.decodeAlphanumericSegment(o, s, A, d);
                    break;
                  case Gn.BYTE:
                    e.decodeByteSegment(o, s, A, u, a, i);
                    break;
                  case Gn.KANJI:
                    e.decodeKanjiSegment(o, s, A);
                    break;
                  default:
                    throw new De();
                }
                break;
            }
          } while (h !== Gn.TERMINATOR);
        } catch (y) {
          throw new De();
        }
        return new La(
          t,
          s.toString(),
          a.length === 0 ? null : a,
          n === null ? null : n.toString(),
          l,
          c,
        );
      }),
      (e.decodeHanziSegment = function (t, r, n) {
        if (n * 13 > t.available()) throw new De();
        var i = new Uint8Array(2 * n),
          o = 0;
        while (n > 0) {
          var s = t.readBits(13),
            a = (((s / 96) << 8) & 4294967295) | (s % 96);
          if (a < 959) a += 41377;
          else a += 42657;
          ((i[o] = (a >> 8) & 255), (i[o + 1] = a & 255), (o += 2), n--);
        }
        try {
          r.append(ki.decode(i, er.GB2312));
        } catch (l) {
          throw new De(l);
        }
      }),
      (e.decodeKanjiSegment = function (t, r, n) {
        if (n * 13 > t.available()) throw new De();
        var i = new Uint8Array(2 * n),
          o = 0;
        while (n > 0) {
          var s = t.readBits(13),
            a = (((s / 192) << 8) & 4294967295) | (s % 192);
          if (a < 7936) a += 33088;
          else a += 49472;
          ((i[o] = a >> 8), (i[o + 1] = a), (o += 2), n--);
        }
        try {
          r.append(ki.decode(i, er.SHIFT_JIS));
        } catch (l) {
          throw new De(l);
        }
      }),
      (e.decodeByteSegment = function (t, r, n, i, o, s) {
        if (8 * n > t.available()) throw new De();
        var a = new Uint8Array(n);
        for (var l = 0; l < n; l++) a[l] = t.readBits(8);
        var c;
        if (i === null) c = er.guessEncoding(a, s);
        else c = i.getName();
        try {
          r.append(ki.decode(a, c));
        } catch (u) {
          throw new De(u);
        }
        o.push(a);
      }),
      (e.toAlphaNumericChar = function (t) {
        if (t >= e.ALPHANUMERIC_CHARS.length) throw new De();
        return e.ALPHANUMERIC_CHARS[t];
      }),
      (e.decodeAlphanumericSegment = function (t, r, n, i) {
        var o = r.length();
        while (n > 1) {
          if (t.available() < 11) throw new De();
          var s = t.readBits(11);
          (r.append(e.toAlphaNumericChar(Math.floor(s / 45))),
            r.append(e.toAlphaNumericChar(s % 45)),
            (n -= 2));
        }
        if (n === 1) {
          if (t.available() < 6) throw new De();
          r.append(e.toAlphaNumericChar(t.readBits(6)));
        }
        if (i) {
          for (var a = o; a < r.length(); a++)
            if (r.charAt(a) === "%")
              if (a < r.length() - 1 && r.charAt(a + 1) === "%") r.deleteCharAt(a + 1);
              else r.setCharAt(a, String.fromCharCode(29));
        }
      }),
      (e.decodeNumericSegment = function (t, r, n) {
        while (n >= 3) {
          if (t.available() < 10) throw new De();
          var i = t.readBits(10);
          if (i >= 1000) throw new De();
          (r.append(e.toAlphaNumericChar(Math.floor(i / 100))),
            r.append(e.toAlphaNumericChar(Math.floor(i / 10) % 10)),
            r.append(e.toAlphaNumericChar(i % 10)),
            (n -= 3));
        }
        if (n === 2) {
          if (t.available() < 7) throw new De();
          var o = t.readBits(7);
          if (o >= 100) throw new De();
          (r.append(e.toAlphaNumericChar(Math.floor(o / 10))),
            r.append(e.toAlphaNumericChar(o % 10)));
        } else if (n === 1) {
          if (t.available() < 4) throw new De();
          var s = t.readBits(4);
          if (s >= 10) throw new De();
          r.append(e.toAlphaNumericChar(s));
        }
      }),
      (e.parseECIValue = function (t) {
        var r = t.readBits(8);
        if ((r & 128) === 0) return r & 127;
        if ((r & 192) === 128) {
          var n = t.readBits(8);
          return (((r & 63) << 8) & 4294967295) | n;
        }
        if ((r & 224) === 192) {
          var i = t.readBits(16);
          return (((r & 31) << 16) & 4294967295) | i;
        }
        throw new De();
      }),
      (e.ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"),
      (e.GB2312_SUBSET = 1),
      e
    );
  })(),
  wS = mse;
var gse = (function () {
    function e(t) {
      this.mirrored = t;
    }
    return (
      (e.prototype.isMirrored = function () {
        return this.mirrored;
      }),
      (e.prototype.applyMirroredCorrection = function (t) {
        if (!this.mirrored || t === null || t.length < 3) return;
        var r = t[0];
        ((t[0] = t[2]), (t[2] = r));
      }),
      e
    );
  })(),
  G_ = gse;
var fU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Ase = (function () {
    function e() {
      this.rsDecoder = new Ba(si.QR_CODE_FIELD_256);
    }
    return (
      (e.prototype.decodeBooleanArray = function (t, r) {
        return this.decodeBitMatrix(bn.parseFromBooleanArray(t), r);
      }),
      (e.prototype.decodeBitMatrix = function (t, r) {
        var n = new uU(t),
          i = null;
        try {
          return this.decodeBitMatrixParser(n, r);
        } catch (s) {
          i = s;
        }
        try {
          (n.remask(), n.setMirror(!0), n.readVersion(), n.readFormatInformation(), n.mirror());
          var o = this.decodeBitMatrixParser(n, r);
          return (o.setOther(new G_(!0)), o);
        } catch (s) {
          if (i !== null) throw i;
          throw s;
        }
      }),
      (e.prototype.decodeBitMatrixParser = function (t, r) {
        var n,
          i,
          o,
          s,
          a = t.readVersion(),
          l = t.readFormatInformation().getErrorCorrectionLevel(),
          c = t.readCodewords(),
          u = hU.getDataBlocks(c, a, l),
          d = 0;
        try {
          for (var h = fU(u), f = h.next(); !f.done; f = h.next()) {
            var p = f.value;
            d += p.getNumDataCodewords();
          }
        } catch (_) {
          n = { error: _ };
        } finally {
          try {
            if (f && !f.done && (i = h.return)) i.call(h);
          } finally {
            if (n) throw n.error;
          }
        }
        var g = new Uint8Array(d),
          m = 0;
        try {
          for (var A = fU(u), y = A.next(); !y.done; y = A.next()) {
            var p = y.value,
              x = p.getCodewords(),
              b = p.getNumDataCodewords();
            this.correctErrors(x, b);
            for (var v = 0; v < b; v++) g[m++] = x[v];
          }
        } catch (_) {
          o = { error: _ };
        } finally {
          try {
            if (y && !y.done && (s = A.return)) s.call(A);
          } finally {
            if (o) throw o.error;
          }
        }
        return wS.decode(g, a, l, r);
      }),
      (e.prototype.correctErrors = function (t, r) {
        var n = new Int32Array(t);
        try {
          this.rsDecoder.decode(n, t.length - r);
        } catch (o) {
          throw new qr();
        }
        for (var i = 0; i < r; i++) t[i] = n[i];
      }),
      e
    );
  })(),
  pU = Ase;
var yse = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  xse = (function (e) {
    yse(t, e);
    function t(r, n, i) {
      var o = e.call(this, r, n) || this;
      return ((o.estimatedModuleSize = i), o);
    }
    return (
      (t.prototype.aboutEquals = function (r, n, i) {
        if (Math.abs(n - this.getY()) <= r && Math.abs(i - this.getX()) <= r) {
          var o = Math.abs(r - this.estimatedModuleSize);
          return o <= 1 || o <= this.estimatedModuleSize;
        }
        return !1;
      }),
      (t.prototype.combineEstimate = function (r, n, i) {
        var o = (this.getX() + n) / 2,
          s = (this.getY() + r) / 2,
          a = (this.estimatedModuleSize + i) / 2;
        return new t(o, s, a);
      }),
      t
    );
  })(ct),
  mU = xse;
var bse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  _se = (function () {
    function e(t, r, n, i, o, s, a) {
      ((this.image = t),
        (this.startX = r),
        (this.startY = n),
        (this.width = i),
        (this.height = o),
        (this.moduleSize = s),
        (this.resultPointCallback = a),
        (this.possibleCenters = []),
        (this.crossCheckStateCount = new Int32Array(3)));
    }
    return (
      (e.prototype.find = function () {
        var t = this.startX,
          r = this.height,
          n = this.width,
          i = t + n,
          o = this.startY + r / 2,
          s = new Int32Array(3),
          a = this.image;
        for (var l = 0; l < r; l++) {
          var c = o + ((l & 1) === 0 ? Math.floor((l + 1) / 2) : -Math.floor((l + 1) / 2));
          ((s[0] = 0), (s[1] = 0), (s[2] = 0));
          var u = t;
          while (u < i && !a.get(u, c)) u++;
          var d = 0;
          while (u < i) {
            if (a.get(u, c))
              if (d === 1) s[1]++;
              else if (d === 2) {
                if (this.foundPatternCross(s)) {
                  var h = this.handlePossibleCenter(s, c, u);
                  if (h !== null) return h;
                }
                ((s[0] = s[2]), (s[1] = 1), (s[2] = 0), (d = 1));
              } else s[++d]++;
            else {
              if (d === 1) d++;
              s[d]++;
            }
            u++;
          }
          if (this.foundPatternCross(s)) {
            var h = this.handlePossibleCenter(s, c, i);
            if (h !== null) return h;
          }
        }
        if (this.possibleCenters.length !== 0) return this.possibleCenters[0];
        throw new Ce();
      }),
      (e.centerFromEnd = function (t, r) {
        return r - t[2] - t[1] / 2;
      }),
      (e.prototype.foundPatternCross = function (t) {
        var r = this.moduleSize,
          n = r / 2;
        for (var i = 0; i < 3; i++) if (Math.abs(r - t[i]) >= n) return !1;
        return !0;
      }),
      (e.prototype.crossCheckVertical = function (t, r, n, i) {
        var o = this.image,
          s = o.getHeight(),
          a = this.crossCheckStateCount;
        ((a[0] = 0), (a[1] = 0), (a[2] = 0));
        var l = t;
        while (l >= 0 && o.get(r, l) && a[1] <= n) (a[1]++, l--);
        if (l < 0 || a[1] > n) return NaN;
        while (l >= 0 && !o.get(r, l) && a[0] <= n) (a[0]++, l--);
        if (a[0] > n) return NaN;
        l = t + 1;
        while (l < s && o.get(r, l) && a[1] <= n) (a[1]++, l++);
        if (l === s || a[1] > n) return NaN;
        while (l < s && !o.get(r, l) && a[2] <= n) (a[2]++, l++);
        if (a[2] > n) return NaN;
        var c = a[0] + a[1] + a[2];
        if (5 * Math.abs(c - i) >= 2 * i) return NaN;
        return this.foundPatternCross(a) ? e.centerFromEnd(a, l) : NaN;
      }),
      (e.prototype.handlePossibleCenter = function (t, r, n) {
        var i,
          o,
          s = t[0] + t[1] + t[2],
          a = e.centerFromEnd(t, n),
          l = this.crossCheckVertical(r, a, 2 * t[1], s);
        if (!isNaN(l)) {
          var c = (t[0] + t[1] + t[2]) / 3;
          try {
            for (var u = bse(this.possibleCenters), d = u.next(); !d.done; d = u.next()) {
              var h = d.value;
              if (h.aboutEquals(c, l, a)) return h.combineEstimate(l, a, c);
            }
          } catch (p) {
            i = { error: p };
          } finally {
            try {
              if (d && !d.done && (o = u.return)) o.call(u);
            } finally {
              if (i) throw i.error;
            }
          }
          var f = new mU(a, l, c);
          if (
            (this.possibleCenters.push(f),
            this.resultPointCallback !== null && this.resultPointCallback !== void 0)
          )
            this.resultPointCallback.foundPossibleResultPoint(f);
        }
        return null;
      }),
      e
    );
  })(),
  gU = _se;
var vse = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Cse = (function (e) {
    vse(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n) || this;
      if (((s.estimatedModuleSize = i), (s.count = o), o === void 0)) s.count = 1;
      return s;
    }
    return (
      (t.prototype.getEstimatedModuleSize = function () {
        return this.estimatedModuleSize;
      }),
      (t.prototype.getCount = function () {
        return this.count;
      }),
      (t.prototype.aboutEquals = function (r, n, i) {
        if (Math.abs(n - this.getY()) <= r && Math.abs(i - this.getX()) <= r) {
          var o = Math.abs(r - this.estimatedModuleSize);
          return o <= 1 || o <= this.estimatedModuleSize;
        }
        return !1;
      }),
      (t.prototype.combineEstimate = function (r, n, i) {
        var o = this.count + 1,
          s = (this.count * this.getX() + n) / o,
          a = (this.count * this.getY() + r) / o,
          l = (this.count * this.estimatedModuleSize + i) / o;
        return new t(s, a, l, o);
      }),
      t
    );
  })(ct),
  AU = Cse;
var wse = (function () {
    function e(t) {
      ((this.bottomLeft = t[0]), (this.topLeft = t[1]), (this.topRight = t[2]));
    }
    return (
      (e.prototype.getBottomLeft = function () {
        return this.bottomLeft;
      }),
      (e.prototype.getTopLeft = function () {
        return this.topLeft;
      }),
      (e.prototype.getTopRight = function () {
        return this.topRight;
      }),
      e
    );
  })(),
  yU = wse;
var $3 = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Tse = (function () {
    function e(t, r) {
      ((this.image = t),
        (this.resultPointCallback = r),
        (this.possibleCenters = []),
        (this.crossCheckStateCount = new Int32Array(5)),
        (this.resultPointCallback = r));
    }
    return (
      (e.prototype.getImage = function () {
        return this.image;
      }),
      (e.prototype.getPossibleCenters = function () {
        return this.possibleCenters;
      }),
      (e.prototype.find = function (t) {
        var r = t !== null && t !== void 0 && t.get(nr.TRY_HARDER) !== void 0,
          n = t !== null && t !== void 0 && t.get(nr.PURE_BARCODE) !== void 0,
          i = this.image,
          o = i.getHeight(),
          s = i.getWidth(),
          a = Math.floor((3 * o) / (4 * e.MAX_MODULES));
        if (a < e.MIN_SKIP || r) a = e.MIN_SKIP;
        var l = !1,
          c = new Int32Array(5);
        for (var u = a - 1; u < o && !l; u += a) {
          c.fill(0);
          var d = 0;
          for (var h = 0; h < s; h++)
            if (i.get(h, u)) {
              if ((d & 1) === 1) d++;
              c[d]++;
            } else if ((d & 1) === 0)
              if (d === 4)
                if (e.foundPatternCross(c)) {
                  var f = this.handlePossibleCenter(c, u, h, n);
                  if (f === !0)
                    if (((a = 2), this.hasSkipped === !0)) l = this.haveMultiplyConfirmedCenters();
                    else {
                      var p = this.findRowSkip();
                      if (p > c[2]) ((u += p - c[2] - a), (h = s - 1));
                    }
                  else {
                    ((c[0] = c[2]), (c[1] = c[3]), (c[2] = c[4]), (c[3] = 1), (c[4] = 0), (d = 3));
                    continue;
                  }
                  ((d = 0), c.fill(0));
                } else
                  ((c[0] = c[2]), (c[1] = c[3]), (c[2] = c[4]), (c[3] = 1), (c[4] = 0), (d = 3));
              else c[++d]++;
            else c[d]++;
          if (e.foundPatternCross(c)) {
            var f = this.handlePossibleCenter(c, u, s, n);
            if (f === !0) {
              if (((a = c[0]), this.hasSkipped)) l = this.haveMultiplyConfirmedCenters();
            }
          }
        }
        var g = this.selectBestPatterns();
        return (ct.orderBestPatterns(g), new yU(g));
      }),
      (e.centerFromEnd = function (t, r) {
        return r - t[4] - t[3] - t[2] / 2;
      }),
      (e.foundPatternCross = function (t) {
        var r = 0;
        for (var n = 0; n < 5; n++) {
          var i = t[n];
          if (i === 0) return !1;
          r += i;
        }
        if (r < 7) return !1;
        var o = r / 7,
          s = o / 2;
        return (
          Math.abs(o - t[0]) < s &&
          Math.abs(o - t[1]) < s &&
          Math.abs(3 * o - t[2]) < 3 * s &&
          Math.abs(o - t[3]) < s &&
          Math.abs(o - t[4]) < s
        );
      }),
      (e.prototype.getCrossCheckStateCount = function () {
        return (this.crossCheckStateCount.fill(0), this.crossCheckStateCount);
      }),
      (e.prototype.crossCheckDiagonal = function (t, r, n, i) {
        var o = this.getCrossCheckStateCount(),
          s = 0,
          a = this.image;
        while (t >= s && r >= s && a.get(r - s, t - s)) (o[2]++, s++);
        if (t < s || r < s) return !1;
        while (t >= s && r >= s && !a.get(r - s, t - s) && o[1] <= n) (o[1]++, s++);
        if (t < s || r < s || o[1] > n) return !1;
        while (t >= s && r >= s && a.get(r - s, t - s) && o[0] <= n) (o[0]++, s++);
        if (o[0] > n) return !1;
        var l = a.getHeight(),
          c = a.getWidth();
        s = 1;
        while (t + s < l && r + s < c && a.get(r + s, t + s)) (o[2]++, s++);
        if (t + s >= l || r + s >= c) return !1;
        while (t + s < l && r + s < c && !a.get(r + s, t + s) && o[3] < n) (o[3]++, s++);
        if (t + s >= l || r + s >= c || o[3] >= n) return !1;
        while (t + s < l && r + s < c && a.get(r + s, t + s) && o[4] < n) (o[4]++, s++);
        if (o[4] >= n) return !1;
        var u = o[0] + o[1] + o[2] + o[3] + o[4];
        return Math.abs(u - i) < 2 * i && e.foundPatternCross(o);
      }),
      (e.prototype.crossCheckVertical = function (t, r, n, i) {
        var o = this.image,
          s = o.getHeight(),
          a = this.getCrossCheckStateCount(),
          l = t;
        while (l >= 0 && o.get(r, l)) (a[2]++, l--);
        if (l < 0) return NaN;
        while (l >= 0 && !o.get(r, l) && a[1] <= n) (a[1]++, l--);
        if (l < 0 || a[1] > n) return NaN;
        while (l >= 0 && o.get(r, l) && a[0] <= n) (a[0]++, l--);
        if (a[0] > n) return NaN;
        l = t + 1;
        while (l < s && o.get(r, l)) (a[2]++, l++);
        if (l === s) return NaN;
        while (l < s && !o.get(r, l) && a[3] < n) (a[3]++, l++);
        if (l === s || a[3] >= n) return NaN;
        while (l < s && o.get(r, l) && a[4] < n) (a[4]++, l++);
        if (a[4] >= n) return NaN;
        var c = a[0] + a[1] + a[2] + a[3] + a[4];
        if (5 * Math.abs(c - i) >= 2 * i) return NaN;
        return e.foundPatternCross(a) ? e.centerFromEnd(a, l) : NaN;
      }),
      (e.prototype.crossCheckHorizontal = function (t, r, n, i) {
        var o = this.image,
          s = o.getWidth(),
          a = this.getCrossCheckStateCount(),
          l = t;
        while (l >= 0 && o.get(l, r)) (a[2]++, l--);
        if (l < 0) return NaN;
        while (l >= 0 && !o.get(l, r) && a[1] <= n) (a[1]++, l--);
        if (l < 0 || a[1] > n) return NaN;
        while (l >= 0 && o.get(l, r) && a[0] <= n) (a[0]++, l--);
        if (a[0] > n) return NaN;
        l = t + 1;
        while (l < s && o.get(l, r)) (a[2]++, l++);
        if (l === s) return NaN;
        while (l < s && !o.get(l, r) && a[3] < n) (a[3]++, l++);
        if (l === s || a[3] >= n) return NaN;
        while (l < s && o.get(l, r) && a[4] < n) (a[4]++, l++);
        if (a[4] >= n) return NaN;
        var c = a[0] + a[1] + a[2] + a[3] + a[4];
        if (5 * Math.abs(c - i) >= i) return NaN;
        return e.foundPatternCross(a) ? e.centerFromEnd(a, l) : NaN;
      }),
      (e.prototype.handlePossibleCenter = function (t, r, n, i) {
        var o = t[0] + t[1] + t[2] + t[3] + t[4],
          s = e.centerFromEnd(t, n),
          a = this.crossCheckVertical(r, Math.floor(s), t[2], o);
        if (!isNaN(a)) {
          if (
            ((s = this.crossCheckHorizontal(Math.floor(s), Math.floor(a), t[2], o)),
            !isNaN(s) && (!i || this.crossCheckDiagonal(Math.floor(a), Math.floor(s), t[2], o)))
          ) {
            var l = o / 7,
              c = !1,
              u = this.possibleCenters;
            for (var d = 0, h = u.length; d < h; d++) {
              var f = u[d];
              if (f.aboutEquals(l, a, s)) {
                ((u[d] = f.combineEstimate(a, s, l)), (c = !0));
                break;
              }
            }
            if (!c) {
              var p = new AU(s, a, l);
              if (
                (u.push(p),
                this.resultPointCallback !== null && this.resultPointCallback !== void 0)
              )
                this.resultPointCallback.foundPossibleResultPoint(p);
            }
            return !0;
          }
        }
        return !1;
      }),
      (e.prototype.findRowSkip = function () {
        var t,
          r,
          n = this.possibleCenters.length;
        if (n <= 1) return 0;
        var i = null;
        try {
          for (var o = $3(this.possibleCenters), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            if (a.getCount() >= e.CENTER_QUORUM)
              if (i == null) i = a;
              else
                return (
                  (this.hasSkipped = !0),
                  Math.floor((Math.abs(i.getX() - a.getX()) - Math.abs(i.getY() - a.getY())) / 2)
                );
          }
        } catch (l) {
          t = { error: l };
        } finally {
          try {
            if (s && !s.done && (r = o.return)) r.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
        return 0;
      }),
      (e.prototype.haveMultiplyConfirmedCenters = function () {
        var t,
          r,
          n,
          i,
          o = 0,
          s = 0,
          a = this.possibleCenters.length;
        try {
          for (var l = $3(this.possibleCenters), c = l.next(); !c.done; c = l.next()) {
            var u = c.value;
            if (u.getCount() >= e.CENTER_QUORUM) (o++, (s += u.getEstimatedModuleSize()));
          }
        } catch (g) {
          t = { error: g };
        } finally {
          try {
            if (c && !c.done && (r = l.return)) r.call(l);
          } finally {
            if (t) throw t.error;
          }
        }
        if (o < 3) return !1;
        var d = s / a,
          h = 0;
        try {
          for (var f = $3(this.possibleCenters), p = f.next(); !p.done; p = f.next()) {
            var u = p.value;
            h += Math.abs(u.getEstimatedModuleSize() - d);
          }
        } catch (g) {
          n = { error: g };
        } finally {
          try {
            if (p && !p.done && (i = f.return)) i.call(f);
          } finally {
            if (n) throw n.error;
          }
        }
        return h <= 0.05 * s;
      }),
      (e.prototype.selectBestPatterns = function () {
        var t,
          r,
          n,
          i,
          o = this.possibleCenters.length;
        if (o < 3) throw new Ce();
        var s = this.possibleCenters,
          a;
        if (o > 3) {
          var l = 0,
            c = 0;
          try {
            for (var u = $3(this.possibleCenters), d = u.next(); !d.done; d = u.next()) {
              var h = d.value,
                f = h.getEstimatedModuleSize();
              ((l += f), (c += f * f));
            }
          } catch (v) {
            t = { error: v };
          } finally {
            try {
              if (d && !d.done && (r = u.return)) r.call(u);
            } finally {
              if (t) throw t.error;
            }
          }
          a = l / o;
          var p = Math.sqrt(c / o - a * a);
          s.sort(function (v, _) {
            var w = Math.abs(_.getEstimatedModuleSize() - a),
              S = Math.abs(v.getEstimatedModuleSize() - a);
            return w < S ? -1 : w > S ? 1 : 0;
          });
          var g = Math.max(0.2 * a, p);
          for (var m = 0; m < s.length && s.length > 3; m++) {
            var A = s[m];
            if (Math.abs(A.getEstimatedModuleSize() - a) > g) (s.splice(m, 1), m--);
          }
        }
        if (s.length > 3) {
          var l = 0;
          try {
            for (var y = $3(s), x = y.next(); !x.done; x = y.next()) {
              var b = x.value;
              l += b.getEstimatedModuleSize();
            }
          } catch (_) {
            n = { error: _ };
          } finally {
            try {
              if (x && !x.done && (i = y.return)) i.call(y);
            } finally {
              if (n) throw n.error;
            }
          }
          ((a = l / s.length),
            s.sort(function (_, w) {
              if (w.getCount() === _.getCount()) {
                var S = Math.abs(w.getEstimatedModuleSize() - a),
                  E = Math.abs(_.getEstimatedModuleSize() - a);
                return S < E ? 1 : S > E ? -1 : 0;
              } else return w.getCount() - _.getCount();
            }),
            s.splice(3));
        }
        return [s[0], s[1], s[2]];
      }),
      (e.CENTER_QUORUM = 2),
      (e.MIN_SKIP = 3),
      (e.MAX_MODULES = 57),
      e
    );
  })(),
  xU = Tse;
var Ese = (function () {
    function e(t) {
      this.image = t;
    }
    return (
      (e.prototype.getImage = function () {
        return this.image;
      }),
      (e.prototype.getResultPointCallback = function () {
        return this.resultPointCallback;
      }),
      (e.prototype.detect = function (t) {
        this.resultPointCallback =
          t === null || t === void 0 ? null : t.get(nr.NEED_RESULT_POINT_CALLBACK);
        var r = new xU(this.image, this.resultPointCallback),
          n = r.find(t);
        return this.processFinderPatternInfo(n);
      }),
      (e.prototype.processFinderPatternInfo = function (t) {
        var r = t.getTopLeft(),
          n = t.getTopRight(),
          i = t.getBottomLeft(),
          o = this.calculateModuleSize(r, n, i);
        if (o < 1) throw new Ce("No pattern found in proccess finder.");
        var s = e.computeDimension(r, n, i, o),
          a = Jl.getProvisionalVersionForDimension(s),
          l = a.getDimensionForVersion() - 7,
          c = null;
        if (a.getAlignmentPatternCenters().length > 0) {
          var u = n.getX() - r.getX() + i.getX(),
            d = n.getY() - r.getY() + i.getY(),
            h = 1 - 3 / l,
            f = Math.floor(r.getX() + h * (u - r.getX())),
            p = Math.floor(r.getY() + h * (d - r.getY()));
          for (var g = 4; g <= 16; g <<= 1)
            try {
              c = this.findAlignmentInRegion(o, f, p, g);
              break;
            } catch (x) {
              if (!(x instanceof Ce)) throw x;
            }
        }
        var m = e.createTransform(r, n, i, c, s),
          A = e.sampleGrid(this.image, m, s),
          y;
        if (c === null) y = [i, r, n];
        else y = [i, r, n, c];
        return new Xu(A, y);
      }),
      (e.createTransform = function (t, r, n, i, o) {
        var s = o - 3.5,
          a,
          l,
          c,
          u;
        if (i !== null) ((a = i.getX()), (l = i.getY()), (c = s - 3), (u = c));
        else
          ((a = r.getX() - t.getX() + n.getX()),
            (l = r.getY() - t.getY() + n.getY()),
            (c = s),
            (u = s));
        return u0.quadrilateralToQuadrilateral(
          3.5,
          3.5,
          s,
          3.5,
          c,
          u,
          3.5,
          s,
          t.getX(),
          t.getY(),
          r.getX(),
          r.getY(),
          a,
          l,
          n.getX(),
          n.getY(),
        );
      }),
      (e.sampleGrid = function (t, r, n) {
        var i = ju.getInstance();
        return i.sampleGridWithTransform(t, n, n, r);
      }),
      (e.computeDimension = function (t, r, n, i) {
        var o = Sr.round(ct.distance(t, r) / i),
          s = Sr.round(ct.distance(t, n) / i),
          a = Math.floor((o + s) / 2) + 7;
        switch (a & 3) {
          case 0:
            a++;
            break;
          case 2:
            a--;
            break;
          case 3:
            throw new Ce("Dimensions could be not found.");
        }
        return a;
      }),
      (e.prototype.calculateModuleSize = function (t, r, n) {
        return (this.calculateModuleSizeOneWay(t, r) + this.calculateModuleSizeOneWay(t, n)) / 2;
      }),
      (e.prototype.calculateModuleSizeOneWay = function (t, r) {
        var n = this.sizeOfBlackWhiteBlackRunBothWays(
            Math.floor(t.getX()),
            Math.floor(t.getY()),
            Math.floor(r.getX()),
            Math.floor(r.getY()),
          ),
          i = this.sizeOfBlackWhiteBlackRunBothWays(
            Math.floor(r.getX()),
            Math.floor(r.getY()),
            Math.floor(t.getX()),
            Math.floor(t.getY()),
          );
        if (isNaN(n)) return i / 7;
        if (isNaN(i)) return n / 7;
        return (n + i) / 14;
      }),
      (e.prototype.sizeOfBlackWhiteBlackRunBothWays = function (t, r, n, i) {
        var o = this.sizeOfBlackWhiteBlackRun(t, r, n, i),
          s = 1,
          a = t - (n - t);
        if (a < 0) ((s = t / (t - a)), (a = 0));
        else if (a >= this.image.getWidth())
          ((s = (this.image.getWidth() - 1 - t) / (a - t)), (a = this.image.getWidth() - 1));
        var l = Math.floor(r - (i - r) * s);
        if (((s = 1), l < 0)) ((s = r / (r - l)), (l = 0));
        else if (l >= this.image.getHeight())
          ((s = (this.image.getHeight() - 1 - r) / (l - r)), (l = this.image.getHeight() - 1));
        return (
          (a = Math.floor(t + (a - t) * s)),
          (o += this.sizeOfBlackWhiteBlackRun(t, r, a, l)),
          o - 1
        );
      }),
      (e.prototype.sizeOfBlackWhiteBlackRun = function (t, r, n, i) {
        var o = Math.abs(i - r) > Math.abs(n - t);
        if (o) {
          var s = t;
          ((t = r), (r = s), (s = n), (n = i), (i = s));
        }
        var a = Math.abs(n - t),
          l = Math.abs(i - r),
          c = -a / 2,
          u = t < n ? 1 : -1,
          d = r < i ? 1 : -1,
          h = 0,
          f = n + u;
        for (var p = t, g = r; p !== f; p += u) {
          var m = o ? g : p,
            A = o ? p : g;
          if ((h === 1) === this.image.get(m, A)) {
            if (h === 2) return Sr.distance(p, g, t, r);
            h++;
          }
          if (((c += l), c > 0)) {
            if (g === i) break;
            ((g += d), (c -= a));
          }
        }
        if (h === 2) return Sr.distance(n + u, i, t, r);
        return NaN;
      }),
      (e.prototype.findAlignmentInRegion = function (t, r, n, i) {
        var o = Math.floor(i * t),
          s = Math.max(0, r - o),
          a = Math.min(this.image.getWidth() - 1, r + o);
        if (a - s < t * 3) throw new Ce("Alignment top exceeds estimated module size.");
        var l = Math.max(0, n - o),
          c = Math.min(this.image.getHeight() - 1, n + o);
        if (c - l < t * 3) throw new Ce("Alignment bottom exceeds estimated module size.");
        var u = new gU(this.image, s, l, a - s, c - l, t, this.resultPointCallback);
        return u.find();
      }),
      e
    );
  })(),
  bU = Ese;
var Sse = (function () {
    function e() {
      this.decoder = new pU();
    }
    return (
      (e.prototype.getDecoder = function () {
        return this.decoder;
      }),
      (e.prototype.decode = function (t, r) {
        var n, i;
        if (r !== void 0 && r !== null && r.get(nr.PURE_BARCODE) !== void 0) {
          var o = e.extractPureBits(t.getBlackMatrix());
          ((n = this.decoder.decodeBitMatrix(o, r)), (i = e.NO_POINTS));
        } else {
          var s = new bU(t.getBlackMatrix()).detect(r);
          ((n = this.decoder.decodeBitMatrix(s.getBits(), r)), (i = s.getPoints()));
        }
        if (n.getOther() instanceof G_) n.getOther().applyMirroredCorrection(i);
        var a = new Xr(n.getText(), n.getRawBytes(), void 0, i, at.QR_CODE, void 0),
          l = n.getByteSegments();
        if (l !== null) a.putMetadata(hn.BYTE_SEGMENTS, l);
        var c = n.getECLevel();
        if (c !== null) a.putMetadata(hn.ERROR_CORRECTION_LEVEL, c);
        if (n.hasStructuredAppend())
          (a.putMetadata(hn.STRUCTURED_APPEND_SEQUENCE, n.getStructuredAppendSequenceNumber()),
            a.putMetadata(hn.STRUCTURED_APPEND_PARITY, n.getStructuredAppendParity()));
        return a;
      }),
      (e.prototype.reset = function () {}),
      (e.extractPureBits = function (t) {
        var r = t.getTopLeftOnBit(),
          n = t.getBottomRightOnBit();
        if (r === null || n === null) throw new Ce();
        var i = this.moduleSize(r, t),
          o = r[1],
          s = n[1],
          a = r[0],
          l = n[0];
        if (a >= l || o >= s) throw new Ce();
        if (s - o !== l - a) {
          if (((l = a + (s - o)), l >= t.getWidth())) throw new Ce();
        }
        var c = Math.round((l - a + 1) / i),
          u = Math.round((s - o + 1) / i);
        if (c <= 0 || u <= 0) throw new Ce();
        if (u !== c) throw new Ce();
        var d = Math.floor(i / 2);
        ((o += d), (a += d));
        var h = a + Math.floor((c - 1) * i) - l;
        if (h > 0) {
          if (h > d) throw new Ce();
          a -= h;
        }
        var f = o + Math.floor((u - 1) * i) - s;
        if (f > 0) {
          if (f > d) throw new Ce();
          o -= f;
        }
        var p = new bn(c, u);
        for (var g = 0; g < u; g++) {
          var m = o + Math.floor(g * i);
          for (var A = 0; A < c; A++) if (t.get(a + Math.floor(A * i), m)) p.set(A, g);
        }
        return p;
      }),
      (e.moduleSize = function (t, r) {
        var n = r.getHeight(),
          i = r.getWidth(),
          o = t[0],
          s = t[1],
          a = !0,
          l = 0;
        while (o < i && s < n) {
          if (a !== r.get(o, s)) {
            if (++l === 5) break;
            a = !a;
          }
          (o++, s++);
        }
        if (o === i || s === n) throw new Ce();
        return (o - t[0]) / 7;
      }),
      (e.NO_POINTS = []),
      e
    );
  })(),
  mh = Sse;
var _U = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  vU = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Mse = (function () {
    function e(t) {
      ((this.versionIndicator = (t >> 2) & 7), (this.dataMask = t & 3));
    }
    return (
      (e.computeBCHFormatWord = function (t) {
        var r = t << 10;
        for (var n = 4; n >= 0; n--) if ((r >> (n + 10)) & 1) r ^= e.BCH_GENERATOR << n;
        return (t << 10) | (r & 1023);
      }),
      (e.buildLookupTable = function () {
        var t = [];
        for (var r = 0; r < 32; r++) {
          var n = e.computeBCHFormatWord(r),
            i = n ^ e.FORMAT_INFO_MASK_MICRO_QR;
          t.push([i, r]);
        }
        return t;
      }),
      (e.numBitsDiffering = function (t, r) {
        return Ut.bitCount(t ^ r);
      }),
      (e.decodeFormatInformation = function (t) {
        var r, n, i, o;
        try {
          for (var s = _U(e.FORMAT_INFO_DECODE_LOOKUP), a = s.next(); !a.done; a = s.next()) {
            var l = vU(a.value, 2),
              c = l[0],
              u = l[1];
            if (c === t) return new e(u);
          }
        } catch (A) {
          r = { error: A };
        } finally {
          try {
            if (a && !a.done && (n = s.return)) n.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
        var d = Number.MAX_SAFE_INTEGER,
          h = 0;
        try {
          for (var f = _U(e.FORMAT_INFO_DECODE_LOOKUP), p = f.next(); !p.done; p = f.next()) {
            var g = vU(p.value, 2),
              c = g[0],
              u = g[1],
              m = e.numBitsDiffering(t, c);
            if (m < d) ((d = m), (h = u));
          }
        } catch (A) {
          i = { error: A };
        } finally {
          try {
            if (p && !p.done && (o = f.return)) o.call(f);
          } finally {
            if (i) throw i.error;
          }
        }
        if (d <= 3) return new e(h);
        return null;
      }),
      (e.prototype.getVersionIndicator = function () {
        return this.versionIndicator;
      }),
      (e.prototype.getDataMask = function () {
        return this.dataMask;
      }),
      (e.prototype.getMicroQRVersionNumber = function () {
        if (this.versionIndicator === 0) return 1;
        if (this.versionIndicator <= 2) return 2;
        if (this.versionIndicator <= 4) return 3;
        return 4;
      }),
      (e.prototype.getECLevelLabel = function () {
        switch (this.versionIndicator) {
          case 0:
            return null;
          case 1:
          case 3:
          case 5:
            return "L";
          case 2:
          case 4:
          case 6:
            return "M";
          case 7:
            return "Q";
          default:
            return null;
        }
      }),
      (e.FORMAT_INFO_MASK_MICRO_QR = 17477),
      (e.BCH_GENERATOR = 1335),
      (e.FORMAT_INFO_DECODE_LOOKUP = e.buildLookupTable()),
      e
    );
  })(),
  TS = Mse;
var Ise = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  Rse = (function () {
    function e(t, r, n) {
      ((this.versionNumber = t), (this.versionIndicator = r), (this.ecBlocks = n));
      var i = n,
        o = i.getECBlocks()[0];
      this.totalCodewords = o.getCount() * (o.getDataCodewords() + i.getECCodewordsPerBlock());
    }
    return (
      (e.prototype.getVersionNumber = function () {
        return this.versionNumber;
      }),
      (e.prototype.getVersionIndicator = function () {
        return this.versionIndicator;
      }),
      (e.prototype.getDimensionForVersion = function () {
        return 9 + 2 * this.versionNumber;
      }),
      (e.prototype.getTotalCodewords = function () {
        return this.totalCodewords;
      }),
      (e.prototype.getNumDataCodewords = function () {
        return this.ecBlocks.getECBlocks()[0].getDataCodewords();
      }),
      (e.prototype.getNumECCodewords = function () {
        return this.totalCodewords - this.getNumDataCodewords();
      }),
      (e.prototype.getECBlocks = function () {
        return this.ecBlocks;
      }),
      (e.prototype.getECLevelLabel = function () {
        return e.VERSION_INFO[this.versionIndicator][1];
      }),
      (e.prototype.getModeIndicatorBits = function () {
        return e.MODE_INDICATOR_BITS[this.versionNumber - 1];
      }),
      (e.prototype.buildFunctionPattern = function () {
        var t = this.getDimensionForVersion(),
          r = new bn(t);
        if ((r.setRegion(0, 0, 9, 9), t > 9))
          (r.setRegion(9, 0, t - 9, 1), r.setRegion(0, 9, 1, t - 9));
        return r;
      }),
      (e.getVersionForIndicator = function (t) {
        if (t < 0 || t > 7) throw new De();
        var r = Ise(e.VERSION_INFO[t], 1),
          n = r[0];
        return new e(n, t, e.EC_BLOCKS[t]);
      }),
      (e.getVersionForDimension = function (t) {
        switch (t) {
          case 11:
            return e.getVersionForIndicator(0);
          case 13:
            return e.getVersionForIndicator(1);
          case 15:
            return e.getVersionForIndicator(3);
          case 17:
            return e.getVersionForIndicator(5);
          default:
            throw new De();
        }
      }),
      (e.prototype.toString = function () {
        return "M" + this.versionNumber;
      }),
      (e.VERSION_INFO = [
        [1, null],
        [2, "L"],
        [2, "M"],
        [3, "L"],
        [3, "M"],
        [4, "L"],
        [4, "M"],
        [4, "Q"],
      ]),
      (e.EC_BLOCKS = [
        new Me(2, new ie(1, 3)),
        new Me(5, new ie(1, 5)),
        new Me(6, new ie(1, 4)),
        new Me(6, new ie(1, 11)),
        new Me(8, new ie(1, 9)),
        new Me(8, new ie(1, 16)),
        new Me(10, new ie(1, 14)),
        new Me(14, new ie(1, 10)),
      ]),
      (e.MODE_INDICATOR_BITS = [0, 1, 2, 3]),
      e
    );
  })(),
  J3 = Rse;
var Ose = (function () {
    function e(t, r) {
      ((this.maskIndex = t), (this.isMasked = r));
    }
    return (
      (e.forIndex = function (t) {
        if (t < 0 || t >= e.MASKS.length) throw Error("Invalid Micro QR mask index: " + t);
        return e.MASKS[t];
      }),
      (e.prototype.unmaskBitMatrix = function (t, r) {
        for (var n = 0; n < r; n++)
          for (var i = 0; i < r; i++) if (this.isMasked(n, i)) t.flip(i, n);
      }),
      (e.MASKS = [
        new e(0, function (t, r) {
          return (t & 1) === 0;
        }),
        new e(1, function (t, r) {
          return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 === 0;
        }),
        new e(2, function (t, r) {
          var n = t * r;
          return ((n & 1) + (n % 3)) % 2 === 0;
        }),
        new e(3, function (t, r) {
          return (((t + r) & 1) + ((t * r) % 3)) % 2 === 0;
        }),
      ]),
      e
    );
  })(),
  CU = Ose;
var Lse = (function () {
    function e(t) {
      ((this.bitMatrix = t), (this.parsedFormatInfo = null), (this.parsedVersion = null));
      var r = t.getHeight();
      if (r < 11 || r > 17 || r % 2 !== 1) throw new De();
    }
    return (
      (e.prototype.readFormatInformation = function () {
        if (this.parsedFormatInfo !== null) return this.parsedFormatInfo;
        var t = 0;
        for (var r = 1; r <= 8; r++) t = this.copyBit(r, 8, t);
        for (var n = 7; n >= 1; n--) t = this.copyBit(8, n, t);
        var i = TS.decodeFormatInformation(t);
        if (i !== null)
          return (
            (this.parsedFormatInfo = i),
            (this.parsedVersion = J3.getVersionForIndicator(i.getVersionIndicator())),
            i
          );
        throw new De();
      }),
      (e.prototype.copyBit = function (t, r, n) {
        return this.bitMatrix.get(t, r) ? (n << 1) | 1 : n << 1;
      }),
      (e.prototype.readCodewords = function () {
        var t = this.readFormatInformation(),
          r = this.parsedVersion,
          n = CU.forIndex(t.getDataMask()),
          i = this.bitMatrix.getHeight();
        n.unmaskBitMatrix(this.bitMatrix, i);
        var o = r.buildFunctionPattern(),
          s = r.getNumDataCodewords(),
          a = r.getVersionNumber() === 1 || r.getVersionNumber() === 3,
          l = !0,
          c = new Uint8Array(r.getTotalCodewords()),
          u = 0,
          d = 0,
          h = 0;
        for (var f = i - 1; f > 0; f -= 2) {
          for (var p = 0; p < i; p++) {
            var g = l ? i - 1 - p : p;
            for (var m = 0; m < 2; m++) {
              var A = f - m;
              if (!o.get(A, g)) {
                if ((h++, (d <<= 1), this.bitMatrix.get(A, g))) d |= 1;
                var y = a && u === s - 1,
                  x = y ? 4 : 8;
                if (h === x) ((c[u++] = y ? (d << 4) & 255 : d & 255), (h = 0), (d = 0));
              }
            }
          }
          l = !l;
        }
        if (u !== r.getTotalCodewords()) throw new De();
        return c;
      }),
      e
    );
  })(),
  wU = Lse;
var Bse = (function () {
    function e() {}
    return (
      (e.decode = function (t, r, n) {
        var i = new f0(t),
          o = new Ot(),
          s = [],
          a = r.getVersionNumber(),
          l = r.getModeIndicatorBits();
        try {
          while (!0) {
            var c = void 0;
            if (l === 0) c = e.MODE_NUMERIC;
            else {
              if (i.available() < l) break;
              var u = i.readBits(l);
              c = e.decodeMode(u, a);
            }
            var d = e.charCountBits(c, a);
            if (i.available() < d) break;
            var h = i.readBits(d);
            if (h === 0) break;
            switch (c) {
              case e.MODE_NUMERIC:
                e.decodeNumeric(i, o, h);
                break;
              case e.MODE_ALPHA:
                e.decodeAlphanumeric(i, o, h);
                break;
              case e.MODE_BYTE:
                e.decodeByte(i, o, s, h, n);
                break;
              case e.MODE_KANJI:
                e.decodeKanji(i, o, h);
                break;
              default:
                throw new De();
            }
          }
        } catch (f) {
          if (f instanceof De) throw f;
          throw new De();
        }
        return new La(t, o.toString(), s.length === 0 ? null : s, r.getECLevelLabel(), -1, -1);
      }),
      (e.decodeMode = function (t, r) {
        switch (r) {
          case 2:
            return t === 0 ? e.MODE_NUMERIC : e.MODE_ALPHA;
          case 3:
            switch (t) {
              case 0:
                return e.MODE_NUMERIC;
              case 1:
                return e.MODE_ALPHA;
              case 2:
                return e.MODE_BYTE;
              case 3:
                return e.MODE_KANJI;
            }
            break;
          case 4:
            switch (t) {
              case 0:
                return e.MODE_NUMERIC;
              case 1:
                return e.MODE_ALPHA;
              case 2:
                return e.MODE_BYTE;
              case 4:
                return e.MODE_KANJI;
            }
            break;
        }
        throw new De();
      }),
      (e.charCountBits = function (t, r) {
        switch (t) {
          case e.MODE_NUMERIC:
            return r + 2;
          case e.MODE_ALPHA:
            return r + 1;
          case e.MODE_BYTE:
            return r + 1;
          case e.MODE_KANJI:
            return r;
          default:
            throw new De();
        }
      }),
      (e.decodeNumeric = function (t, r, n) {
        var i = n;
        while (i >= 3) {
          if (t.available() < 10) throw new De();
          var o = t.readBits(10);
          if (o >= 1000) throw new De();
          (r.append(e.toChar(Math.floor(o / 100))),
            r.append(e.toChar(Math.floor(o / 10) % 10)),
            r.append(e.toChar(o % 10)),
            (i -= 3));
        }
        if (i === 2) {
          if (t.available() < 7) throw new De();
          var s = t.readBits(7);
          if (s >= 100) throw new De();
          (r.append(e.toChar(Math.floor(s / 10))), r.append(e.toChar(s % 10)));
        } else if (i === 1) {
          if (t.available() < 4) throw new De();
          var a = t.readBits(4);
          if (a >= 10) throw new De();
          r.append(e.toChar(a));
        }
      }),
      (e.decodeAlphanumeric = function (t, r, n) {
        var i = n;
        while (i > 1) {
          if (t.available() < 11) throw new De();
          var o = t.readBits(11);
          (r.append(e.toAlphaNum(Math.floor(o / 45))), r.append(e.toAlphaNum(o % 45)), (i -= 2));
        }
        if (i === 1) {
          if (t.available() < 6) throw new De();
          r.append(e.toAlphaNum(t.readBits(6)));
        }
      }),
      (e.decodeByte = function (t, r, n, i, o) {
        if (8 * i > t.available()) throw new De();
        var s = new Uint8Array(i);
        for (var a = 0; a < i; a++) s[a] = t.readBits(8) & 255;
        var l = er.guessEncoding(s, o);
        try {
          r.append(ki.decode(s, l));
        } catch (c) {
          throw new De();
        }
        n.push(s);
      }),
      (e.decodeKanji = function (t, r, n) {
        if (13 * n > t.available()) throw new De();
        var i = new Uint8Array(2 * n),
          o = 0;
        for (var s = 0; s < n; s++) {
          var a = t.readBits(13),
            l = (Math.floor(a / 192) << 8) | (a % 192);
          ((l += l < 7936 ? 33088 : 49472), (i[o++] = (l >> 8) & 255), (i[o++] = l & 255));
        }
        try {
          r.append(ki.decode(i, er.SHIFT_JIS));
        } catch (c) {
          throw new De();
        }
      }),
      (e.toChar = function (t) {
        if (t >= e.ALPHANUMERIC_CHARS.length) throw new De();
        return e.ALPHANUMERIC_CHARS[t];
      }),
      (e.toAlphaNum = function (t) {
        if (t >= e.ALPHANUMERIC_CHARS.length) throw new De();
        return e.ALPHANUMERIC_CHARS[t];
      }),
      (e.ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"),
      (e.MODE_NUMERIC = 0),
      (e.MODE_ALPHA = 1),
      (e.MODE_BYTE = 2),
      (e.MODE_KANJI = 3),
      e
    );
  })(),
  ES = Bse;
var Fse = (function () {
    function e() {
      this.rsDecoder = new Ba(si.QR_CODE_FIELD_256);
    }
    return (
      (e.prototype.decodeBitMatrix = function (t, r) {
        var n = new wU(t),
          i = n.readFormatInformation(),
          o = J3.getVersionForIndicator(i.getVersionIndicator()),
          s = n.readCodewords(),
          a = o.getNumDataCodewords(),
          l = o.getNumECCodewords();
        if (o.getVersionNumber() === 1)
          return ES.decode(s.subarray(0, a), o, r !== null && r !== void 0 ? r : null);
        return (
          this.correctErrors(s, a),
          ES.decode(s.subarray(0, a), o, r !== null && r !== void 0 ? r : null)
        );
      }),
      (e.prototype.correctErrors = function (t, r) {
        var n = new Int32Array(t);
        try {
          this.rsDecoder.decode(n, t.length - r);
        } catch (o) {
          throw new qr();
        }
        for (var i = 0; i < r; i++) t[i] = n[i] & 255;
      }),
      e
    );
  })(),
  TU = Fse;
var Dse = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Nse = (function (e) {
    Dse(t, e);
    function t(r, n, i, o) {
      if (o === void 0) o = 1;
      var s = e.call(this, r, n) || this;
      return ((s.estimatedModuleSize = i), (s.count = o), s);
    }
    return (
      (t.prototype.getEstimatedModuleSize = function () {
        return this.estimatedModuleSize;
      }),
      (t.prototype.getCount = function () {
        return this.count;
      }),
      (t.prototype.aboutEquals = function (r, n, i) {
        if (Math.abs(n - this.getY()) <= r && Math.abs(i - this.getX()) <= r) {
          var o = Math.abs(r - this.estimatedModuleSize);
          return o <= 1 || o <= this.estimatedModuleSize;
        }
        return !1;
      }),
      (t.prototype.combineEstimate = function (r, n, i) {
        var o = this.count + 1,
          s = (this.count * this.getX() + n) / o,
          a = (this.count * this.getY() + r) / o,
          l = (this.count * this.estimatedModuleSize + i) / o;
        return new t(s, a, l, o);
      }),
      t
    );
  })(ct),
  EU = Nse;
var Pse = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  kse = (function () {
    function e(t) {
      this.image = t;
    }
    return (
      (e.prototype.detect = function (t) {
        var r;
        this.resultPointCallback =
          t != null
            ? (r = t.get(nr.NEED_RESULT_POINT_CALLBACK)) !== null && r !== void 0
              ? r
              : null
            : null;
        var n = this.findFinderPattern(t);
        return this.processFinderPattern(n);
      }),
      (e.prototype.findFinderPattern = function (t) {
        var r = this.image,
          n = r.getHeight(),
          i = r.getWidth(),
          o = t != null && t.get(nr.TRY_HARDER) !== void 0,
          s = o ? 1 : Math.max(1, Math.floor(n / 64)),
          a = new Int32Array(5),
          l = [];
        for (var c = s - 1; c < n; c += s) {
          a.fill(0);
          var u = 0;
          for (var d = 0; d < i; d++)
            if (r.get(d, c)) {
              if ((u & 1) === 1) u++;
              a[u]++;
            } else if ((u & 1) === 0)
              if (u === 4) {
                if (this.foundPatternCross(a)) {
                  var h = this.handlePossibleCenter(a, c, d, l);
                  if (h) {
                    (a.fill(0), (u = 0));
                    continue;
                  }
                }
                ((a[0] = a[2]), (a[1] = a[3]), (a[2] = a[4]), (a[3] = 1), (a[4] = 0), (u = 3));
                continue;
              } else a[++u]++;
            else a[u]++;
          if (this.foundPatternCross(a)) this.handlePossibleCenter(a, c, i, l);
        }
        if (l.length === 0) throw new Ce("No Micro QR finder pattern found.");
        return (
          l.sort(function (f, p) {
            return p.getCount() - f.getCount();
          }),
          l[0]
        );
      }),
      (e.prototype.foundPatternCross = function (t) {
        var r = 0;
        for (var n = 0; n < 5; n++) {
          var i = t[n];
          if (i === 0) return !1;
          r += i;
        }
        if (r < 7) return !1;
        var o = r / 7,
          s = o / 2;
        return (
          Math.abs(o - t[0]) < s &&
          Math.abs(o - t[1]) < s &&
          Math.abs(3 * o - t[2]) < 3 * s &&
          Math.abs(o - t[3]) < s &&
          Math.abs(o - t[4]) < s
        );
      }),
      (e.prototype.handlePossibleCenter = function (t, r, n, i) {
        var o = t[0] + t[1] + t[2] + t[3] + t[4],
          s = this.centerFromEnd(t, n),
          a = this.crossCheckVertical(r, Math.floor(s), t[2], o);
        if (isNaN(a)) return !1;
        var l = (t[0] + t[1] + t[2] + t[3] + t[4]) / 7;
        for (var c = 0; c < i.length; c++) {
          var u = i[c];
          if (u.aboutEquals(l, a, s)) return ((i[c] = u.combineEstimate(a, s, l)), !0);
        }
        if ((i.push(new EU(s, a, l)), this.resultPointCallback !== null))
          this.resultPointCallback.foundPossibleResultPoint(i[i.length - 1]);
        return !1;
      }),
      (e.prototype.centerFromEnd = function (t, r) {
        return r - t[4] - t[3] - t[2] / 2;
      }),
      (e.prototype.crossCheckVertical = function (t, r, n, i) {
        var o = this.image,
          s = o.getHeight(),
          a = new Int32Array(5),
          l = t;
        while (l >= 0 && o.get(r, l)) (a[2]++, l--);
        if (l < 0) return NaN;
        while (l >= 0 && !o.get(r, l) && a[1] <= i) (a[1]++, l--);
        if (l < 0 || a[1] > i) return NaN;
        while (l >= 0 && o.get(r, l) && a[0] <= i) (a[0]++, l--);
        if (a[0] > i) return NaN;
        l = t + 1;
        while (l < s && o.get(r, l)) (a[2]++, l++);
        if (l === s) return NaN;
        while (l < s && !o.get(r, l) && a[3] < i) (a[3]++, l++);
        if (l === s || a[3] >= i) return NaN;
        while (l < s && o.get(r, l) && a[4] < i) (a[4]++, l++);
        if (a[4] >= i) return NaN;
        var c = a[0] + a[1] + a[2] + a[3] + a[4];
        if (5 * Math.abs(c - i) >= 2 * i) return NaN;
        return this.foundPatternCross(a) ? this.centerFromEnd(a, l) : NaN;
      }),
      (e.prototype.processFinderPattern = function (t) {
        var r = t.getX(),
          n = t.getY(),
          i = t.getEstimatedModuleSize();
        if (i < 1) throw new Ce("Module size too small.");
        var o = this.determineDimension(r, n, i);
        if (o === null) throw new Ce("Cannot determine Micro QR symbol dimension.");
        var { dim: s, orientation: a } = o,
          l = (s - 7) * i,
          c = [l, 0, -l, 0][a],
          u = [0, l, 0, -l][a],
          d = [0, -l, 0, l][a],
          h = [l, 0, -l, 0][a],
          f = r + c,
          p = n + u,
          g = r + d,
          m = n + h,
          A = e.createTransform(r, n, f, p, g, m, s),
          y = e.sampleGrid(this.image, A, s),
          x = [new ct(r, n), new ct(f, p), new ct(g, m)];
        return new Xu(y, x);
      }),
      (e.prototype.determineDimension = function (t, r, n) {
        var i = [
            [5, -3, 1, 0, -3, 5, 0, 1],
            [3, 5, 0, 1, -5, -3, -1, 0],
            [-5, 3, -1, 0, 3, -5, 0, -1],
            [-3, -5, 0, -1, 5, 3, 1, 0],
          ],
          o = null;
        for (var s = 0; s < 4; s++) {
          var a = Pse(i[s], 8),
            l = a[0],
            c = a[1],
            u = a[2],
            d = a[3],
            h = a[4],
            f = a[5],
            p = a[6],
            g = a[7],
            m = this.probeTimingLine(t + l * n, r + c * n, u, d, n),
            A = this.probeTimingLine(t + h * n, r + f * n, p, g, n);
          if (m !== null && A !== null) {
            var y = this.snapDimension(m, A);
            if (y !== null) return { dim: y, orientation: s };
          } else if (o === null && (m !== null || A !== null)) {
            var y = this.snapDimension(m, A);
            if (y !== null) o = { dim: y, orientation: s };
          }
        }
        return o;
      }),
      (e.prototype.snapDimension = function (t, r) {
        if (t === null) return r;
        if (r === null) return t;
        if (t === r) return t;
        var n = Math.round((t + r) / 2),
          i = [11, 13, 15, 17].reduce(function (o, s) {
            return Math.abs(s - n) < Math.abs(o - n) ? s : o;
          });
        return i;
      }),
      (e.prototype.probeTimingLine = function (t, r, n, i, o) {
        var s = 0;
        for (var a = 0; a < 10; a++) {
          var l = 8 + a,
            c = Math.round(t + n * a * o),
            u = Math.round(r + i * a * o);
          if (c < 0 || c >= this.image.getWidth() || u < 0 || u >= this.image.getHeight()) break;
          var d = this.image.get(c, u),
            h = l % 2 === 0;
          if (d !== h) break;
          if (h) s++;
        }
        if (s < 2) return null;
        var f = 8 + 2 * s - 1;
        if (f === 11 || f === 13 || f === 15 || f === 17) return f;
        var p = [11, 13, 15, 17].reduce(function (g, m) {
          return Math.abs(m - f) < Math.abs(g - f) ? m : g;
        });
        return Math.abs(p - f) <= 2 ? p : null;
      }),
      (e.createTransform = function (t, r, n, i, o, s, a) {
        var l = a - 3.5;
        return u0.quadrilateralToQuadrilateral(
          3.5,
          3.5,
          l,
          3.5,
          3.5,
          l,
          l,
          l,
          t,
          r,
          n,
          i,
          o,
          s,
          n + (o - t),
          i + (s - r),
        );
      }),
      (e.sampleGrid = function (t, r, n) {
        var i = ju.getInstance();
        return i.sampleGridWithTransform(t, n, n, r);
      }),
      e
    );
  })(),
  SS = kse;
var Use = (function () {
    function e() {
      this.decoder = new TU();
    }
    return (
      (e.prototype.decode = function (t, r) {
        var n, i;
        if (r != null && r.get(nr.PURE_BARCODE) !== void 0) {
          var o = t.getBlackMatrix();
          ((n = this.decoder.decodeBitMatrix(o, r !== null && r !== void 0 ? r : void 0)),
            (i = []));
        } else {
          var s = new SS(t.getBlackMatrix()),
            a = s.detect(r !== null && r !== void 0 ? r : void 0);
          ((i = a.getPoints()),
            (n = this.decoder.decodeBitMatrix(
              a.getBits(),
              r !== null && r !== void 0 ? r : void 0,
            )));
        }
        var l = new Xr(
            n.getText(),
            n.getRawBytes(),
            n.getNumBits(),
            i,
            at.MICRO_QR_CODE,
            pr.currentTimeMillis(),
          ),
          c = n.getByteSegments();
        if (c !== null) l.putMetadata(hn.BYTE_SEGMENTS, c);
        var u = n.getECLevel();
        if (u !== null) l.putMetadata(hn.ERROR_CORRECTION_LEVEL, u);
        return l;
      }),
      (e.prototype.reset = function () {}),
      e
    );
  })(),
  z_ = Use;
var Hse = (function () {
    function e(t) {
      this.bitMatrix = t;
    }
    return (
      (e.prototype.readCodewords = function () {
        var t = new Uint8Array(144),
          r = this.bitMatrix.getHeight(),
          n = this.bitMatrix.getWidth();
        for (var i = 0; i < r; i++) {
          var o = e.BITNR[i];
          for (var s = 0; s < n; s++) {
            var a = o[s];
            if (a >= 0 && this.bitMatrix.get(s, i)) t[Math.floor(a / 6)] |= 1 << (5 - (a % 6));
          }
        }
        return t;
      }),
      (e.BITNR = [
        [
          121, 120, 127, 126, 133, 132, 139, 138, 145, 144, 151, 150, 157, 156, 163, 162, 169, 168,
          175, 174, 181, 180, 187, 186, 193, 192, 199, 198, -2, -2,
        ],
        [
          123, 122, 129, 128, 135, 134, 141, 140, 147, 146, 153, 152, 159, 158, 165, 164, 171, 170,
          177, 176, 183, 182, 189, 188, 195, 194, 201, 200, 816, -3,
        ],
        [
          125, 124, 131, 130, 137, 136, 143, 142, 149, 148, 155, 154, 161, 160, 167, 166, 173, 172,
          179, 178, 185, 184, 191, 190, 197, 196, 203, 202, 818, 817,
        ],
        [
          283, 282, 277, 276, 271, 270, 265, 264, 259, 258, 253, 252, 247, 246, 241, 240, 235, 234,
          229, 228, 223, 222, 217, 216, 211, 210, 205, 204, 819, -3,
        ],
        [
          285, 284, 279, 278, 273, 272, 267, 266, 261, 260, 255, 254, 249, 248, 243, 242, 237, 236,
          231, 230, 225, 224, 219, 218, 213, 212, 207, 206, 821, 820,
        ],
        [
          287, 286, 281, 280, 275, 274, 269, 268, 263, 262, 257, 256, 251, 250, 245, 244, 239, 238,
          233, 232, 227, 226, 221, 220, 215, 214, 209, 208, 822, -3,
        ],
        [
          289, 288, 295, 294, 301, 300, 307, 306, 313, 312, 319, 318, 325, 324, 331, 330, 337, 336,
          343, 342, 349, 348, 355, 354, 361, 360, 367, 366, 824, 823,
        ],
        [
          291, 290, 297, 296, 303, 302, 309, 308, 315, 314, 321, 320, 327, 326, 333, 332, 339, 338,
          345, 344, 351, 350, 357, 356, 363, 362, 369, 368, 825, -3,
        ],
        [
          293, 292, 299, 298, 305, 304, 311, 310, 317, 316, 323, 322, 329, 328, 335, 334, 341, 340,
          347, 346, 353, 352, 359, 358, 365, 364, 371, 370, 827, 826,
        ],
        [
          409, 408, 403, 402, 397, 396, 391, 390, 79, 78, -2, -2, 13, 12, 37, 36, 2, -1, 44, 43,
          109, 108, 385, 384, 379, 378, 373, 372, 828, -3,
        ],
        [
          411, 410, 405, 404, 399, 398, 393, 392, 81, 80, 40, -2, 15, 14, 39, 38, 3, -1, -1, 45,
          111, 110, 387, 386, 381, 380, 375, 374, 830, 829,
        ],
        [
          413, 412, 407, 406, 401, 400, 395, 394, 83, 82, 41, -3, -3, -3, -3, -3, 5, 4, 47, 46, 113,
          112, 389, 388, 383, 382, 377, 376, 831, -3,
        ],
        [
          415, 414, 421, 420, 427, 426, 103, 102, 55, 54, 16, -3, -3, -3, -3, -3, -3, -3, 20, 19,
          85, 84, 433, 432, 439, 438, 445, 444, 833, 832,
        ],
        [
          417, 416, 423, 422, 429, 428, 105, 104, 57, 56, -3, -3, -3, -3, -3, -3, -3, -3, 22, 21,
          87, 86, 435, 434, 441, 440, 447, 446, 834, -3,
        ],
        [
          419, 418, 425, 424, 431, 430, 107, 106, 59, 58, -3, -3, -3, -3, -3, -3, -3, -3, -3, 23,
          89, 88, 437, 436, 443, 442, 449, 448, 836, 835,
        ],
        [
          481, 480, 475, 474, 469, 468, 48, -2, 30, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, 0, 53,
          52, 463, 462, 457, 456, 451, 450, 837, -3,
        ],
        [
          483, 482, 477, 476, 471, 470, 49, -1, -2, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -2,
          -1, 465, 464, 459, 458, 453, 452, 839, 838,
        ],
        [
          485, 484, 479, 478, 473, 472, 51, 50, 31, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, 1, -2,
          42, 467, 466, 461, 460, 455, 454, 840, -3,
        ],
        [
          487, 486, 493, 492, 499, 498, 97, 96, 61, 60, -3, -3, -3, -3, -3, -3, -3, -3, -3, 26, 91,
          90, 505, 504, 511, 510, 517, 516, 842, 841,
        ],
        [
          489, 488, 495, 494, 501, 500, 99, 98, 63, 62, -3, -3, -3, -3, -3, -3, -3, -3, 28, 27, 93,
          92, 507, 506, 513, 512, 519, 518, 843, -3,
        ],
        [
          491, 490, 497, 496, 503, 502, 101, 100, 65, 64, 17, -3, -3, -3, -3, -3, -3, -3, 18, 29,
          95, 94, 509, 508, 515, 514, 521, 520, 845, 844,
        ],
        [
          559, 558, 553, 552, 547, 546, 541, 540, 73, 72, 32, -3, -3, -3, -3, -3, -3, 10, 67, 66,
          115, 114, 535, 534, 529, 528, 523, 522, 846, -3,
        ],
        [
          561, 560, 555, 554, 549, 548, 543, 542, 75, 74, -2, -1, 7, 6, 35, 34, 11, -2, 69, 68, 117,
          116, 537, 536, 531, 530, 525, 524, 848, 847,
        ],
        [
          563, 562, 557, 556, 551, 550, 545, 544, 77, 76, -2, 33, 9, 8, 25, 24, -1, -2, 71, 70, 119,
          118, 539, 538, 533, 532, 527, 526, 849, -3,
        ],
        [
          565, 564, 571, 570, 577, 576, 583, 582, 589, 588, 595, 594, 601, 600, 607, 606, 613, 612,
          619, 618, 625, 624, 631, 630, 637, 636, 643, 642, 851, 850,
        ],
        [
          567, 566, 573, 572, 579, 578, 585, 584, 591, 590, 597, 596, 603, 602, 609, 608, 615, 614,
          621, 620, 627, 626, 633, 632, 639, 638, 645, 644, 852, -3,
        ],
        [
          569, 568, 575, 574, 581, 580, 587, 586, 593, 592, 599, 598, 605, 604, 611, 610, 617, 616,
          623, 622, 629, 628, 635, 634, 641, 640, 647, 646, 854, 853,
        ],
        [
          727, 726, 721, 720, 715, 714, 709, 708, 703, 702, 697, 696, 691, 690, 685, 684, 679, 678,
          673, 672, 667, 666, 661, 660, 655, 654, 649, 648, 855, -3,
        ],
        [
          729, 728, 723, 722, 717, 716, 711, 710, 705, 704, 699, 698, 693, 692, 687, 686, 681, 680,
          675, 674, 669, 668, 663, 662, 657, 656, 651, 650, 857, 856,
        ],
        [
          731, 730, 725, 724, 719, 718, 713, 712, 707, 706, 701, 700, 695, 694, 689, 688, 683, 682,
          677, 676, 671, 670, 665, 664, 659, 658, 653, 652, 858, -3,
        ],
        [
          733, 732, 739, 738, 745, 744, 751, 750, 757, 756, 763, 762, 769, 768, 775, 774, 781, 780,
          787, 786, 793, 792, 799, 798, 805, 804, 811, 810, 860, 859,
        ],
        [
          735, 734, 741, 740, 747, 746, 753, 752, 759, 758, 765, 764, 771, 770, 777, 776, 783, 782,
          789, 788, 795, 794, 801, 800, 807, 806, 813, 812, 861, -3,
        ],
        [
          737, 736, 743, 742, 749, 748, 755, 754, 761, 760, 767, 766, 773, 772, 779, 778, 785, 784,
          791, 790, 797, 796, 803, 802, 809, 808, 815, 814, 863, 862,
        ],
      ]),
      e
    );
  })(),
  SU = Hse;
var Gse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  zse = (function () {
    function e() {}
    return (
      (e.decode = function (t, r) {
        var n = [];
        switch (r) {
          case 2:
          case 3: {
            var i = void 0;
            if (r === 2) {
              var o = e.getPostCode2(t),
                s = e.getPostCode2Length(t);
              if (s > 10) throw De.getFormatInstance();
              i = String(o).padStart(s, "0");
            } else i = e.getPostCode3(t);
            var a = String(e.getCountry(t)).padStart(3, "0"),
              l = String(e.getServiceClass(t)).padStart(3, "0"),
              c = e.getMessage(t, 10, 84);
            if ((n.push(c), n.join("").startsWith("[)>" + e.RS + "01" + e.GS)))
              (n.splice(0, n.length),
                n.push(c.substring(0, 9)),
                n.push(i + e.GS + a + e.GS + l + e.GS),
                n.push(c.substring(9)));
            else (n.splice(0, n.length), n.push(i + e.GS + a + e.GS + l + e.GS), n.push(c));
            break;
          }
          case 4:
            n.push(e.getMessage(t, 1, 93));
            break;
          case 5:
            n.push(e.getMessage(t, 1, 77));
            break;
        }
        return new La(t, n.join(""), null, String(r));
      }),
      (e.getBit = function (t, r) {
        return (t--, (r[Math.floor(t / 6)] & (1 << (5 - (t % 6)))) === 0 ? 0 : 1);
      }),
      (e.getInt = function (t, r) {
        var n = 0;
        for (var i = 0; i < r.length; i++) n += e.getBit(r[i], t) << (r.length - i - 1);
        return n;
      }),
      (e.getCountry = function (t) {
        return e.getInt(t, e.COUNTRY_BYTES);
      }),
      (e.getServiceClass = function (t) {
        return e.getInt(t, e.SERVICE_CLASS_BYTES);
      }),
      (e.getPostCode2Length = function (t) {
        return e.getInt(t, e.POSTCODE_2_LENGTH_BYTES);
      }),
      (e.getPostCode2 = function (t) {
        return e.getInt(t, e.POSTCODE_2_BYTES);
      }),
      (e.getPostCode3 = function (t) {
        var r,
          n,
          i = [];
        try {
          for (var o = Gse(e.POSTCODE_3_BYTES), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            i.push(e.SETS[0].charAt(e.getInt(t, a)));
          }
        } catch (l) {
          r = { error: l };
        } finally {
          try {
            if (s && !s.done && (n = o.return)) n.call(o);
          } finally {
            if (r) throw r.error;
          }
        }
        return i.join("");
      }),
      (e.getMessage = function (t, r, n) {
        var i = [],
          o = -1,
          s = 0,
          a = 0;
        for (var l = r; l < r + n; l++) {
          var c = e.SETS[s].charAt(t[l]);
          switch (c) {
            case e.LATCHA:
              ((s = 0), (o = -1));
              break;
            case e.LATCHB:
              ((s = 1), (o = -1));
              break;
            case e.SHIFTA:
            case e.SHIFTB:
            case e.SHIFTC:
            case e.SHIFTD:
            case e.SHIFTE:
              ((a = s), (s = c.charCodeAt(0) - e.SHIFTA.charCodeAt(0)), (o = 1));
              break;
            case e.TWOSHIFTA:
              ((a = s), (s = 0), (o = 2));
              break;
            case e.THREESHIFTA:
              ((a = s), (s = 0), (o = 3));
              break;
            case e.NS: {
              var u = (t[++l] << 24) + (t[++l] << 18) + (t[++l] << 12) + (t[++l] << 6) + t[++l];
              i.push(String(u).padStart(9, "0"));
              break;
            }
            case e.LOCK:
              o = -1;
              break;
            default:
              i.push(c);
          }
          if (o-- === 0) s = a;
        }
        while (i.length > 0 && i[i.length - 1] === e.PAD) i.pop();
        return i.join("");
      }),
      (e.SHIFTA = "￰"),
      (e.SHIFTB = "￱"),
      (e.SHIFTC = "￲"),
      (e.SHIFTD = "￳"),
      (e.SHIFTE = "￴"),
      (e.TWOSHIFTA = "￵"),
      (e.THREESHIFTA = "￶"),
      (e.LATCHA = "￷"),
      (e.LATCHB = "￸"),
      (e.LOCK = "￹"),
      (e.ECI = "￺"),
      (e.NS = "￻"),
      (e.PAD = "￼"),
      (e.FS = "\x1C"),
      (e.GS = "\x1D"),
      (e.RS = "\x1E"),
      (e.COUNTRY_BYTES = [53, 54, 43, 44, 45, 46, 47, 48, 37, 38]),
      (e.SERVICE_CLASS_BYTES = [55, 56, 57, 58, 59, 60, 49, 50, 51, 52]),
      (e.POSTCODE_2_LENGTH_BYTES = [39, 40, 41, 42, 31, 32]),
      (e.POSTCODE_2_BYTES = [
        33, 34, 35, 36, 25, 26, 27, 28, 29, 30, 19, 20, 21, 22, 23, 24, 13, 14, 15, 16, 17, 18, 7,
        8, 9, 10, 11, 12, 1, 2,
      ]),
      (e.POSTCODE_3_BYTES = [
        [39, 40, 41, 42, 31, 32],
        [33, 34, 35, 36, 25, 26],
        [27, 28, 29, 30, 19, 20],
        [21, 22, 23, 24, 13, 14],
        [15, 16, 17, 18, 7, 8],
        [9, 10, 11, 12, 1, 2],
      ]),
      (e.SETS = [
        "\rABCDEFGHIJKLMNOPQRSTUVWXYZ" +
          e.ECI +
          e.FS +
          e.GS +
          e.RS +
          e.NS +
          " " +
          e.PAD +
          `"#$%&'()*+,-./0123456789:` +
          e.SHIFTB +
          e.SHIFTC +
          e.SHIFTD +
          e.SHIFTE +
          e.LATCHB,
        "`abcdefghijklmnopqrstuvwxyz" +
          e.ECI +
          e.FS +
          e.GS +
          e.RS +
          e.NS +
          "{" +
          e.PAD +
          "}~;<=>?[\\]^_ ,./:@!|" +
          e.PAD +
          e.TWOSHIFTA +
          e.THREESHIFTA +
          e.PAD +
          e.SHIFTA +
          e.SHIFTC +
          e.SHIFTD +
          e.SHIFTE +
          e.LATCHA,
        "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚ" +
          e.ECI +
          e.FS +
          e.GS +
          e.RS +
          e.NS +
          "ÛÜÝÞßª¬±²³µ¹º¼½¾" +
          e.LATCHA +
          " " +
          e.LOCK +
          e.SHIFTD +
          e.SHIFTE +
          e.LATCHB,
        "àáâãäåæçèéêëìíîïðñòóôõö÷øùú" +
          e.ECI +
          e.FS +
          e.GS +
          e.RS +
          e.NS +
          "ûüýþÿ¡¨«¯°´·¸»¿" +
          e.LATCHA +
          " " +
          e.SHIFTC +
          e.LOCK +
          e.SHIFTE +
          e.LATCHB,
        `\x00\x01\x02\x03\x04\x05\x06\x07\b	
\v\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A` +
          e.ECI +
          e.PAD +
          e.PAD +
          "\x1B" +
          e.NS +
          e.FS +
          e.GS +
          e.RS +
          "\x1F ¢£¤¥¦§©­®¶" +
          e.LATCHA +
          " " +
          e.SHIFTC +
          e.SHIFTD +
          e.LOCK +
          e.LATCHB,
      ]),
      e
    );
  })(),
  MS = zse;
var Vse = (function () {
    function e() {
      this.rsDecoder = new Ba(si.MAXICODE_FIELD_64);
    }
    return (
      (e.prototype.decode = function (t, r) {
        var n = new SU(t),
          i = n.readCodewords(),
          o = this.correctErrors(i, 0, 10, 10, e.ALL),
          s = i[0] & 15,
          a;
        switch (s) {
          case 2:
          case 3:
          case 4:
            ((o += this.correctErrors(i, 20, 84, 40, e.EVEN)),
              (o += this.correctErrors(i, 20, 84, 40, e.ODD)),
              (a = new Uint8Array(94)));
            break;
          case 5:
            ((o += this.correctErrors(i, 20, 68, 56, e.EVEN)),
              (o += this.correctErrors(i, 20, 68, 56, e.ODD)),
              (a = new Uint8Array(78)));
            break;
          default:
            throw De.getFormatInstance();
        }
        for (var l = 0; l < 10; l++) a[l] = i[l];
        for (var l = 0; l < a.length - 10; l++) a[l + 10] = i[l + 20];
        var c = MS.decode(a, s);
        return (c.setErrorsCorrected(o), c);
      }),
      (e.prototype.correctErrors = function (t, r, n, i, o) {
        var s = n + i,
          a = o === e.ALL ? 1 : 2,
          l = new Int32Array(Math.floor(s / a));
        for (var c = 0; c < s; c++)
          if (o === e.ALL || c % 2 === o - 1) l[Math.floor(c / a)] = t[c + r] & 255;
        var u = 0;
        try {
          u = this.rsDecoder.decodeWithECCount(l, Math.floor(i / a));
        } catch (d) {
          if (d instanceof ch) throw qr.getChecksumInstance();
          throw d;
        }
        for (var c = 0; c < n; c++)
          if (o === e.ALL || c % 2 === o - 1) t[c + r] = l[Math.floor(c / a)];
        return u;
      }),
      (e.ALL = 0),
      (e.EVEN = 1),
      (e.ODD = 2),
      e
    );
  })(),
  IS = Vse;
var Wse = (function () {
    function e() {
      this.decoder = new IS();
    }
    return (
      (e.prototype.decode = function (t, r) {
        if (r === void 0) r = null;
        var n = e.extractPureBits(t.getBlackMatrix()),
          i = this.decoder.decode(n, r),
          o = new Xr(
            i.getText(),
            i.getRawBytes(),
            8 * i.getRawBytes().length,
            e.NO_POINTS,
            at.MAXICODE,
            pr.currentTimeMillis(),
          );
        o.putMetadata(hn.ERRORS_CORRECTED, i.getErrorsCorrected());
        var s = i.getECLevel();
        if (s != null) o.putMetadata(hn.ERROR_CORRECTION_LEVEL, s);
        return o;
      }),
      (e.prototype.reset = function () {}),
      (e.extractPureBits = function (t) {
        var r = t.getEnclosingRectangle();
        if (r == null) throw new Ce();
        var n = r[0],
          i = r[1],
          o = r[2],
          s = r[3],
          a = new bn(e.MATRIX_WIDTH, e.MATRIX_HEIGHT);
        for (var l = 0; l < e.MATRIX_HEIGHT; l++) {
          var c = i + Math.min(Math.floor((l * s + s / 2) / e.MATRIX_HEIGHT), s - 1);
          for (var u = 0; u < e.MATRIX_WIDTH; u++) {
            var d =
              n +
              Math.min(
                Math.floor((u * o + o / 2 + (l & 1) * Math.floor(o / 2)) / e.MATRIX_WIDTH),
                o - 1,
              );
            if (t.get(d, c)) a.set(u, l);
          }
        }
        return a;
      }),
      (e.NO_POINTS = []),
      (e.MATRIX_WIDTH = 30),
      (e.MATRIX_HEIGHT = 33),
      e
    );
  })(),
  V_ = Wse;
var Qse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Yse = (function () {
    function e() {}
    return (
      (e.prototype.PDF417Common = function () {}),
      (e.getBitCountSum = function (t) {
        return Sr.sum(t);
      }),
      (e.toIntArray = function (t) {
        var r, n;
        if (t == null || !t.length) return e.EMPTY_INT_ARRAY;
        var i = new Int32Array(t.length),
          o = 0;
        try {
          for (var s = Qse(t), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            i[o++] = l;
          }
        } catch (c) {
          r = { error: c };
        } finally {
          try {
            if (a && !a.done && (n = s.return)) n.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
        return i;
      }),
      (e.getCodeword = function (t) {
        var r = yn.binarySearch(e.SYMBOL_TABLE, t & 262143);
        if (r < 0) return -1;
        return (e.CODEWORD_TABLE[r] - 1) % e.NUMBER_OF_CODEWORDS;
      }),
      (e.NUMBER_OF_CODEWORDS = 929),
      (e.MAX_CODEWORDS_IN_BARCODE = e.NUMBER_OF_CODEWORDS - 1),
      (e.MIN_ROWS_IN_BARCODE = 3),
      (e.MAX_ROWS_IN_BARCODE = 90),
      (e.MODULES_IN_CODEWORD = 17),
      (e.MODULES_IN_STOP_PATTERN = 18),
      (e.BARS_IN_MODULE = 8),
      (e.EMPTY_INT_ARRAY = new Int32Array([])),
      (e.SYMBOL_TABLE = Int32Array.from([
        66142, 66170, 66206, 66236, 66290, 66292, 66350, 66382, 66396, 66454, 66470, 66476, 66594,
        66600, 66614, 66626, 66628, 66632, 66640, 66654, 66662, 66668, 66682, 66690, 66718, 66720,
        66748, 66758, 66776, 66798, 66802, 66804, 66820, 66824, 66832, 66846, 66848, 66876, 66880,
        66936, 66950, 66956, 66968, 66992, 67006, 67022, 67036, 67042, 67044, 67048, 67062, 67118,
        67150, 67164, 67214, 67228, 67256, 67294, 67322, 67350, 67366, 67372, 67398, 67404, 67416,
        67438, 67474, 67476, 67490, 67492, 67496, 67510, 67618, 67624, 67650, 67656, 67664, 67678,
        67686, 67692, 67706, 67714, 67716, 67728, 67742, 67744, 67772, 67782, 67788, 67800, 67822,
        67826, 67828, 67842, 67848, 67870, 67872, 67900, 67904, 67960, 67974, 67992, 68016, 68030,
        68046, 68060, 68066, 68068, 68072, 68086, 68104, 68112, 68126, 68128, 68156, 68160, 68216,
        68336, 68358, 68364, 68376, 68400, 68414, 68448, 68476, 68494, 68508, 68536, 68546, 68548,
        68552, 68560, 68574, 68582, 68588, 68654, 68686, 68700, 68706, 68708, 68712, 68726, 68750,
        68764, 68792, 68802, 68804, 68808, 68816, 68830, 68838, 68844, 68858, 68878, 68892, 68920,
        68976, 68990, 68994, 68996, 69000, 69008, 69022, 69024, 69052, 69062, 69068, 69080, 69102,
        69106, 69108, 69142, 69158, 69164, 69190, 69208, 69230, 69254, 69260, 69272, 69296, 69310,
        69326, 69340, 69386, 69394, 69396, 69410, 69416, 69430, 69442, 69444, 69448, 69456, 69470,
        69478, 69484, 69554, 69556, 69666, 69672, 69698, 69704, 69712, 69726, 69754, 69762, 69764,
        69776, 69790, 69792, 69820, 69830, 69836, 69848, 69870, 69874, 69876, 69890, 69918, 69920,
        69948, 69952, 70008, 70022, 70040, 70064, 70078, 70094, 70108, 70114, 70116, 70120, 70134,
        70152, 70174, 70176, 70264, 70384, 70412, 70448, 70462, 70496, 70524, 70542, 70556, 70584,
        70594, 70600, 70608, 70622, 70630, 70636, 70664, 70672, 70686, 70688, 70716, 70720, 70776,
        70896, 71136, 71180, 71192, 71216, 71230, 71264, 71292, 71360, 71416, 71452, 71480, 71536,
        71550, 71554, 71556, 71560, 71568, 71582, 71584, 71612, 71622, 71628, 71640, 71662, 71726,
        71732, 71758, 71772, 71778, 71780, 71784, 71798, 71822, 71836, 71864, 71874, 71880, 71888,
        71902, 71910, 71916, 71930, 71950, 71964, 71992, 72048, 72062, 72066, 72068, 72080, 72094,
        72096, 72124, 72134, 72140, 72152, 72174, 72178, 72180, 72206, 72220, 72248, 72304, 72318,
        72416, 72444, 72456, 72464, 72478, 72480, 72508, 72512, 72568, 72588, 72600, 72624, 72638,
        72654, 72668, 72674, 72676, 72680, 72694, 72726, 72742, 72748, 72774, 72780, 72792, 72814,
        72838, 72856, 72880, 72894, 72910, 72924, 72930, 72932, 72936, 72950, 72966, 72972, 72984,
        73008, 73022, 73056, 73084, 73102, 73116, 73144, 73156, 73160, 73168, 73182, 73190, 73196,
        73210, 73226, 73234, 73236, 73250, 73252, 73256, 73270, 73282, 73284, 73296, 73310, 73318,
        73324, 73346, 73348, 73352, 73360, 73374, 73376, 73404, 73414, 73420, 73432, 73454, 73498,
        73518, 73522, 73524, 73550, 73564, 73570, 73572, 73576, 73590, 73800, 73822, 73858, 73860,
        73872, 73886, 73888, 73916, 73944, 73970, 73972, 73992, 74014, 74016, 74044, 74048, 74104,
        74118, 74136, 74160, 74174, 74210, 74212, 74216, 74230, 74244, 74256, 74270, 74272, 74360,
        74480, 74502, 74508, 74544, 74558, 74592, 74620, 74638, 74652, 74680, 74690, 74696, 74704,
        74726, 74732, 74782, 74784, 74812, 74992, 75232, 75288, 75326, 75360, 75388, 75456, 75512,
        75576, 75632, 75646, 75650, 75652, 75664, 75678, 75680, 75708, 75718, 75724, 75736, 75758,
        75808, 75836, 75840, 75896, 76016, 76256, 76736, 76824, 76848, 76862, 76896, 76924, 76992,
        77048, 77296, 77340, 77368, 77424, 77438, 77536, 77564, 77572, 77576, 77584, 77600, 77628,
        77632, 77688, 77702, 77708, 77720, 77744, 77758, 77774, 77788, 77870, 77902, 77916, 77922,
        77928, 77966, 77980, 78008, 78018, 78024, 78032, 78046, 78060, 78074, 78094, 78136, 78192,
        78206, 78210, 78212, 78224, 78238, 78240, 78268, 78278, 78284, 78296, 78322, 78324, 78350,
        78364, 78448, 78462, 78560, 78588, 78600, 78622, 78624, 78652, 78656, 78712, 78726, 78744,
        78768, 78782, 78798, 78812, 78818, 78820, 78824, 78838, 78862, 78876, 78904, 78960, 78974,
        79072, 79100, 79296, 79352, 79368, 79376, 79390, 79392, 79420, 79424, 79480, 79600, 79628,
        79640, 79664, 79678, 79712, 79740, 79772, 79800, 79810, 79812, 79816, 79824, 79838, 79846,
        79852, 79894, 79910, 79916, 79942, 79948, 79960, 79982, 79988, 80006, 80024, 80048, 80062,
        80078, 80092, 80098, 80100, 80104, 80134, 80140, 80176, 80190, 80224, 80252, 80270, 80284,
        80312, 80328, 80336, 80350, 80358, 80364, 80378, 80390, 80396, 80408, 80432, 80446, 80480,
        80508, 80576, 80632, 80654, 80668, 80696, 80752, 80766, 80776, 80784, 80798, 80800, 80828,
        80844, 80856, 80878, 80882, 80884, 80914, 80916, 80930, 80932, 80936, 80950, 80962, 80968,
        80976, 80990, 80998, 81004, 81026, 81028, 81040, 81054, 81056, 81084, 81094, 81100, 81112,
        81134, 81154, 81156, 81160, 81168, 81182, 81184, 81212, 81216, 81272, 81286, 81292, 81304,
        81328, 81342, 81358, 81372, 81380, 81384, 81398, 81434, 81454, 81458, 81460, 81486, 81500,
        81506, 81508, 81512, 81526, 81550, 81564, 81592, 81602, 81604, 81608, 81616, 81630, 81638,
        81644, 81702, 81708, 81722, 81734, 81740, 81752, 81774, 81778, 81780, 82050, 82078, 82080,
        82108, 82180, 82184, 82192, 82206, 82208, 82236, 82240, 82296, 82316, 82328, 82352, 82366,
        82402, 82404, 82408, 82440, 82448, 82462, 82464, 82492, 82496, 82552, 82672, 82694, 82700,
        82712, 82736, 82750, 82784, 82812, 82830, 82882, 82884, 82888, 82896, 82918, 82924, 82952,
        82960, 82974, 82976, 83004, 83008, 83064, 83184, 83424, 83468, 83480, 83504, 83518, 83552,
        83580, 83648, 83704, 83740, 83768, 83824, 83838, 83842, 83844, 83848, 83856, 83872, 83900,
        83910, 83916, 83928, 83950, 83984, 84000, 84028, 84032, 84088, 84208, 84448, 84928, 85040,
        85054, 85088, 85116, 85184, 85240, 85488, 85560, 85616, 85630, 85728, 85756, 85764, 85768,
        85776, 85790, 85792, 85820, 85824, 85880, 85894, 85900, 85912, 85936, 85966, 85980, 86048,
        86080, 86136, 86256, 86496, 86976, 88160, 88188, 88256, 88312, 88560, 89056, 89200, 89214,
        89312, 89340, 89536, 89592, 89608, 89616, 89632, 89664, 89720, 89840, 89868, 89880, 89904,
        89952, 89980, 89998, 90012, 90040, 90190, 90204, 90254, 90268, 90296, 90306, 90308, 90312,
        90334, 90382, 90396, 90424, 90480, 90494, 90500, 90504, 90512, 90526, 90528, 90556, 90566,
        90572, 90584, 90610, 90612, 90638, 90652, 90680, 90736, 90750, 90848, 90876, 90884, 90888,
        90896, 90910, 90912, 90940, 90944, 91000, 91014, 91020, 91032, 91056, 91070, 91086, 91100,
        91106, 91108, 91112, 91126, 91150, 91164, 91192, 91248, 91262, 91360, 91388, 91584, 91640,
        91664, 91678, 91680, 91708, 91712, 91768, 91888, 91928, 91952, 91966, 92000, 92028, 92046,
        92060, 92088, 92098, 92100, 92104, 92112, 92126, 92134, 92140, 92188, 92216, 92272, 92384,
        92412, 92608, 92664, 93168, 93200, 93214, 93216, 93244, 93248, 93304, 93424, 93664, 93720,
        93744, 93758, 93792, 93820, 93888, 93944, 93980, 94008, 94064, 94078, 94084, 94088, 94096,
        94110, 94112, 94140, 94150, 94156, 94168, 94246, 94252, 94278, 94284, 94296, 94318, 94342,
        94348, 94360, 94384, 94398, 94414, 94428, 94440, 94470, 94476, 94488, 94512, 94526, 94560,
        94588, 94606, 94620, 94648, 94658, 94660, 94664, 94672, 94686, 94694, 94700, 94714, 94726,
        94732, 94744, 94768, 94782, 94816, 94844, 94912, 94968, 94990, 95004, 95032, 95088, 95102,
        95112, 95120, 95134, 95136, 95164, 95180, 95192, 95214, 95218, 95220, 95244, 95256, 95280,
        95294, 95328, 95356, 95424, 95480, 95728, 95758, 95772, 95800, 95856, 95870, 95968, 95996,
        96008, 96016, 96030, 96032, 96060, 96064, 96120, 96152, 96176, 96190, 96220, 96226, 96228,
        96232, 96290, 96292, 96296, 96310, 96322, 96324, 96328, 96336, 96350, 96358, 96364, 96386,
        96388, 96392, 96400, 96414, 96416, 96444, 96454, 96460, 96472, 96494, 96498, 96500, 96514,
        96516, 96520, 96528, 96542, 96544, 96572, 96576, 96632, 96646, 96652, 96664, 96688, 96702,
        96718, 96732, 96738, 96740, 96744, 96758, 96772, 96776, 96784, 96798, 96800, 96828, 96832,
        96888, 97008, 97030, 97036, 97048, 97072, 97086, 97120, 97148, 97166, 97180, 97208, 97220,
        97224, 97232, 97246, 97254, 97260, 97326, 97330, 97332, 97358, 97372, 97378, 97380, 97384,
        97398, 97422, 97436, 97464, 97474, 97476, 97480, 97488, 97502, 97510, 97516, 97550, 97564,
        97592, 97648, 97666, 97668, 97672, 97680, 97694, 97696, 97724, 97734, 97740, 97752, 97774,
        97830, 97836, 97850, 97862, 97868, 97880, 97902, 97906, 97908, 97926, 97932, 97944, 97968,
        97998, 98012, 98018, 98020, 98024, 98038, 98618, 98674, 98676, 98838, 98854, 98874, 98892,
        98904, 98926, 98930, 98932, 98968, 99006, 99042, 99044, 99048, 99062, 99166, 99194, 99246,
        99286, 99350, 99366, 99372, 99386, 99398, 99416, 99438, 99442, 99444, 99462, 99504, 99518,
        99534, 99548, 99554, 99556, 99560, 99574, 99590, 99596, 99608, 99632, 99646, 99680, 99708,
        99726, 99740, 99768, 99778, 99780, 99784, 99792, 99806, 99814, 99820, 99834, 99858, 99860,
        99874, 99880, 99894, 99906, 99920, 99934, 99962, 99970, 99972, 99976, 99984, 99998, 1e5,
        100028, 100038, 100044, 100056, 100078, 100082, 100084, 100142, 100174, 100188, 100246,
        100262, 100268, 100306, 100308, 100390, 100396, 100410, 100422, 100428, 100440, 100462,
        100466, 100468, 100486, 100504, 100528, 100542, 100558, 100572, 100578, 100580, 100584,
        100598, 100620, 100656, 100670, 100704, 100732, 100750, 100792, 100802, 100808, 100816,
        100830, 100838, 100844, 100858, 100888, 100912, 100926, 100960, 100988, 101056, 101112,
        101148, 101176, 101232, 101246, 101250, 101252, 101256, 101264, 101278, 101280, 101308,
        101318, 101324, 101336, 101358, 101362, 101364, 101410, 101412, 101416, 101430, 101442,
        101448, 101456, 101470, 101478, 101498, 101506, 101508, 101520, 101534, 101536, 101564,
        101580, 101618, 101620, 101636, 101640, 101648, 101662, 101664, 101692, 101696, 101752,
        101766, 101784, 101838, 101858, 101860, 101864, 101934, 101938, 101940, 101966, 101980,
        101986, 101988, 101992, 102030, 102044, 102072, 102082, 102084, 102088, 102096, 102138,
        102166, 102182, 102188, 102214, 102220, 102232, 102254, 102282, 102290, 102292, 102306,
        102308, 102312, 102326, 102444, 102458, 102470, 102476, 102488, 102514, 102516, 102534,
        102552, 102576, 102590, 102606, 102620, 102626, 102632, 102646, 102662, 102668, 102704,
        102718, 102752, 102780, 102798, 102812, 102840, 102850, 102856, 102864, 102878, 102886,
        102892, 102906, 102936, 102974, 103008, 103036, 103104, 103160, 103224, 103280, 103294,
        103298, 103300, 103312, 103326, 103328, 103356, 103366, 103372, 103384, 103406, 103410,
        103412, 103472, 103486, 103520, 103548, 103616, 103672, 103920, 103992, 104048, 104062,
        104160, 104188, 104194, 104196, 104200, 104208, 104224, 104252, 104256, 104312, 104326,
        104332, 104344, 104368, 104382, 104398, 104412, 104418, 104420, 104424, 104482, 104484,
        104514, 104520, 104528, 104542, 104550, 104570, 104578, 104580, 104592, 104606, 104608,
        104636, 104652, 104690, 104692, 104706, 104712, 104734, 104736, 104764, 104768, 104824,
        104838, 104856, 104910, 104930, 104932, 104936, 104968, 104976, 104990, 104992, 105020,
        105024, 105080, 105200, 105240, 105278, 105312, 105372, 105410, 105412, 105416, 105424,
        105446, 105518, 105524, 105550, 105564, 105570, 105572, 105576, 105614, 105628, 105656,
        105666, 105672, 105680, 105702, 105722, 105742, 105756, 105784, 105840, 105854, 105858,
        105860, 105864, 105872, 105888, 105932, 105970, 105972, 106006, 106022, 106028, 106054,
        106060, 106072, 106100, 106118, 106124, 106136, 106160, 106174, 106190, 106210, 106212,
        106216, 106250, 106258, 106260, 106274, 106276, 106280, 106306, 106308, 106312, 106320,
        106334, 106348, 106394, 106414, 106418, 106420, 106566, 106572, 106610, 106612, 106630,
        106636, 106648, 106672, 106686, 106722, 106724, 106728, 106742, 106758, 106764, 106776,
        106800, 106814, 106848, 106876, 106894, 106908, 106936, 106946, 106948, 106952, 106960,
        106974, 106982, 106988, 107032, 107056, 107070, 107104, 107132, 107200, 107256, 107292,
        107320, 107376, 107390, 107394, 107396, 107400, 107408, 107422, 107424, 107452, 107462,
        107468, 107480, 107502, 107506, 107508, 107544, 107568, 107582, 107616, 107644, 107712,
        107768, 108016, 108060, 108088, 108144, 108158, 108256, 108284, 108290, 108292, 108296,
        108304, 108318, 108320, 108348, 108352, 108408, 108422, 108428, 108440, 108464, 108478,
        108494, 108508, 108514, 108516, 108520, 108592, 108640, 108668, 108736, 108792, 109040,
        109536, 109680, 109694, 109792, 109820, 110016, 110072, 110084, 110088, 110096, 110112,
        110140, 110144, 110200, 110320, 110342, 110348, 110360, 110384, 110398, 110432, 110460,
        110478, 110492, 110520, 110532, 110536, 110544, 110558, 110658, 110686, 110714, 110722,
        110724, 110728, 110736, 110750, 110752, 110780, 110796, 110834, 110836, 110850, 110852,
        110856, 110864, 110878, 110880, 110908, 110912, 110968, 110982, 111000, 111054, 111074,
        111076, 111080, 111108, 111112, 111120, 111134, 111136, 111164, 111168, 111224, 111344,
        111372, 111422, 111456, 111516, 111554, 111556, 111560, 111568, 111590, 111632, 111646,
        111648, 111676, 111680, 111736, 111856, 112096, 112152, 112224, 112252, 112320, 112440,
        112514, 112516, 112520, 112528, 112542, 112544, 112588, 112686, 112718, 112732, 112782,
        112796, 112824, 112834, 112836, 112840, 112848, 112870, 112890, 112910, 112924, 112952,
        113008, 113022, 113026, 113028, 113032, 113040, 113054, 113056, 113100, 113138, 113140,
        113166, 113180, 113208, 113264, 113278, 113376, 113404, 113416, 113424, 113440, 113468,
        113472, 113560, 113614, 113634, 113636, 113640, 113686, 113702, 113708, 113734, 113740,
        113752, 113778, 113780, 113798, 113804, 113816, 113840, 113854, 113870, 113890, 113892,
        113896, 113926, 113932, 113944, 113968, 113982, 114016, 114044, 114076, 114114, 114116,
        114120, 114128, 114150, 114170, 114194, 114196, 114210, 114212, 114216, 114242, 114244,
        114248, 114256, 114270, 114278, 114306, 114308, 114312, 114320, 114334, 114336, 114364,
        114380, 114420, 114458, 114478, 114482, 114484, 114510, 114524, 114530, 114532, 114536,
        114842, 114866, 114868, 114970, 114994, 114996, 115042, 115044, 115048, 115062, 115130,
        115226, 115250, 115252, 115278, 115292, 115298, 115300, 115304, 115318, 115342, 115394,
        115396, 115400, 115408, 115422, 115430, 115436, 115450, 115478, 115494, 115514, 115526,
        115532, 115570, 115572, 115738, 115758, 115762, 115764, 115790, 115804, 115810, 115812,
        115816, 115830, 115854, 115868, 115896, 115906, 115912, 115920, 115934, 115942, 115948,
        115962, 115996, 116024, 116080, 116094, 116098, 116100, 116104, 116112, 116126, 116128,
        116156, 116166, 116172, 116184, 116206, 116210, 116212, 116246, 116262, 116268, 116282,
        116294, 116300, 116312, 116334, 116338, 116340, 116358, 116364, 116376, 116400, 116414,
        116430, 116444, 116450, 116452, 116456, 116498, 116500, 116514, 116520, 116534, 116546,
        116548, 116552, 116560, 116574, 116582, 116588, 116602, 116654, 116694, 116714, 116762,
        116782, 116786, 116788, 116814, 116828, 116834, 116836, 116840, 116854, 116878, 116892,
        116920, 116930, 116936, 116944, 116958, 116966, 116972, 116986, 117006, 117048, 117104,
        117118, 117122, 117124, 117136, 117150, 117152, 117180, 117190, 117196, 117208, 117230,
        117234, 117236, 117304, 117360, 117374, 117472, 117500, 117506, 117508, 117512, 117520,
        117536, 117564, 117568, 117624, 117638, 117644, 117656, 117680, 117694, 117710, 117724,
        117730, 117732, 117736, 117750, 117782, 117798, 117804, 117818, 117830, 117848, 117874,
        117876, 117894, 117936, 117950, 117966, 117986, 117988, 117992, 118022, 118028, 118040,
        118064, 118078, 118112, 118140, 118172, 118210, 118212, 118216, 118224, 118238, 118246,
        118266, 118306, 118312, 118338, 118352, 118366, 118374, 118394, 118402, 118404, 118408,
        118416, 118430, 118432, 118460, 118476, 118514, 118516, 118574, 118578, 118580, 118606,
        118620, 118626, 118628, 118632, 118678, 118694, 118700, 118730, 118738, 118740, 118830,
        118834, 118836, 118862, 118876, 118882, 118884, 118888, 118902, 118926, 118940, 118968,
        118978, 118980, 118984, 118992, 119006, 119014, 119020, 119034, 119068, 119096, 119152,
        119166, 119170, 119172, 119176, 119184, 119198, 119200, 119228, 119238, 119244, 119256,
        119278, 119282, 119284, 119324, 119352, 119408, 119422, 119520, 119548, 119554, 119556,
        119560, 119568, 119582, 119584, 119612, 119616, 119672, 119686, 119692, 119704, 119728,
        119742, 119758, 119772, 119778, 119780, 119784, 119798, 119920, 119934, 120032, 120060,
        120256, 120312, 120324, 120328, 120336, 120352, 120384, 120440, 120560, 120582, 120588,
        120600, 120624, 120638, 120672, 120700, 120718, 120732, 120760, 120770, 120772, 120776,
        120784, 120798, 120806, 120812, 120870, 120876, 120890, 120902, 120908, 120920, 120946,
        120948, 120966, 120972, 120984, 121008, 121022, 121038, 121058, 121060, 121064, 121078,
        121100, 121112, 121136, 121150, 121184, 121212, 121244, 121282, 121284, 121288, 121296,
        121318, 121338, 121356, 121368, 121392, 121406, 121440, 121468, 121536, 121592, 121656,
        121730, 121732, 121736, 121744, 121758, 121760, 121804, 121842, 121844, 121890, 121922,
        121924, 121928, 121936, 121950, 121958, 121978, 121986, 121988, 121992, 122000, 122014,
        122016, 122044, 122060, 122098, 122100, 122116, 122120, 122128, 122142, 122144, 122172,
        122176, 122232, 122246, 122264, 122318, 122338, 122340, 122344, 122414, 122418, 122420,
        122446, 122460, 122466, 122468, 122472, 122510, 122524, 122552, 122562, 122564, 122568,
        122576, 122598, 122618, 122646, 122662, 122668, 122694, 122700, 122712, 122738, 122740,
        122762, 122770, 122772, 122786, 122788, 122792, 123018, 123026, 123028, 123042, 123044,
        123048, 123062, 123098, 123146, 123154, 123156, 123170, 123172, 123176, 123190, 123202,
        123204, 123208, 123216, 123238, 123244, 123258, 123290, 123314, 123316, 123402, 123410,
        123412, 123426, 123428, 123432, 123446, 123458, 123464, 123472, 123486, 123494, 123500,
        123514, 123522, 123524, 123528, 123536, 123552, 123580, 123590, 123596, 123608, 123630,
        123634, 123636, 123674, 123698, 123700, 123740, 123746, 123748, 123752, 123834, 123914,
        123922, 123924, 123938, 123944, 123958, 123970, 123976, 123984, 123998, 124006, 124012,
        124026, 124034, 124036, 124048, 124062, 124064, 124092, 124102, 124108, 124120, 124142,
        124146, 124148, 124162, 124164, 124168, 124176, 124190, 124192, 124220, 124224, 124280,
        124294, 124300, 124312, 124336, 124350, 124366, 124380, 124386, 124388, 124392, 124406,
        124442, 124462, 124466, 124468, 124494, 124508, 124514, 124520, 124558, 124572, 124600,
        124610, 124612, 124616, 124624, 124646, 124666, 124694, 124710, 124716, 124730, 124742,
        124748, 124760, 124786, 124788, 124818, 124820, 124834, 124836, 124840, 124854, 124946,
        124948, 124962, 124964, 124968, 124982, 124994, 124996, 125000, 125008, 125022, 125030,
        125036, 125050, 125058, 125060, 125064, 125072, 125086, 125088, 125116, 125126, 125132,
        125144, 125166, 125170, 125172, 125186, 125188, 125192, 125200, 125216, 125244, 125248,
        125304, 125318, 125324, 125336, 125360, 125374, 125390, 125404, 125410, 125412, 125416,
        125430, 125444, 125448, 125456, 125472, 125504, 125560, 125680, 125702, 125708, 125720,
        125744, 125758, 125792, 125820, 125838, 125852, 125880, 125890, 125892, 125896, 125904,
        125918, 125926, 125932, 125978, 125998, 126002, 126004, 126030, 126044, 126050, 126052,
        126056, 126094, 126108, 126136, 126146, 126148, 126152, 126160, 126182, 126202, 126222,
        126236, 126264, 126320, 126334, 126338, 126340, 126344, 126352, 126366, 126368, 126412,
        126450, 126452, 126486, 126502, 126508, 126522, 126534, 126540, 126552, 126574, 126578,
        126580, 126598, 126604, 126616, 126640, 126654, 126670, 126684, 126690, 126692, 126696,
        126738, 126754, 126756, 126760, 126774, 126786, 126788, 126792, 126800, 126814, 126822,
        126828, 126842, 126894, 126898, 126900, 126934, 127126, 127142, 127148, 127162, 127178,
        127186, 127188, 127254, 127270, 127276, 127290, 127302, 127308, 127320, 127342, 127346,
        127348, 127370, 127378, 127380, 127394, 127396, 127400, 127450, 127510, 127526, 127532,
        127546, 127558, 127576, 127598, 127602, 127604, 127622, 127628, 127640, 127664, 127678,
        127694, 127708, 127714, 127716, 127720, 127734, 127754, 127762, 127764, 127778, 127784,
        127810, 127812, 127816, 127824, 127838, 127846, 127866, 127898, 127918, 127922, 127924,
        128022, 128038, 128044, 128058, 128070, 128076, 128088, 128110, 128114, 128116, 128134,
        128140, 128152, 128176, 128190, 128206, 128220, 128226, 128228, 128232, 128246, 128262,
        128268, 128280, 128304, 128318, 128352, 128380, 128398, 128412, 128440, 128450, 128452,
        128456, 128464, 128478, 128486, 128492, 128506, 128522, 128530, 128532, 128546, 128548,
        128552, 128566, 128578, 128580, 128584, 128592, 128606, 128614, 128634, 128642, 128644,
        128648, 128656, 128670, 128672, 128700, 128716, 128754, 128756, 128794, 128814, 128818,
        128820, 128846, 128860, 128866, 128868, 128872, 128886, 128918, 128934, 128940, 128954,
        128978, 128980, 129178, 129198, 129202, 129204, 129238, 129258, 129306, 129326, 129330,
        129332, 129358, 129372, 129378, 129380, 129384, 129398, 129430, 129446, 129452, 129466,
        129482, 129490, 129492, 129562, 129582, 129586, 129588, 129614, 129628, 129634, 129636,
        129640, 129654, 129678, 129692, 129720, 129730, 129732, 129736, 129744, 129758, 129766,
        129772, 129814, 129830, 129836, 129850, 129862, 129868, 129880, 129902, 129906, 129908,
        129930, 129938, 129940, 129954, 129956, 129960, 129974, 130010,
      ])),
      (e.CODEWORD_TABLE = Int32Array.from([
        2627, 1819, 2622, 2621, 1813, 1812, 2729, 2724, 2723, 2779, 2774, 2773, 902, 896, 908, 868,
        865, 861, 859, 2511, 873, 871, 1780, 835, 2493, 825, 2491, 842, 837, 844, 1764, 1762, 811,
        810, 809, 2483, 807, 2482, 806, 2480, 815, 814, 813, 812, 2484, 817, 816, 1745, 1744, 1742,
        1746, 2655, 2637, 2635, 2626, 2625, 2623, 2628, 1820, 2752, 2739, 2737, 2728, 2727, 2725,
        2730, 2785, 2783, 2778, 2777, 2775, 2780, 787, 781, 747, 739, 736, 2413, 754, 752, 1719,
        692, 689, 681, 2371, 678, 2369, 700, 697, 694, 703, 1688, 1686, 642, 638, 2343, 631, 2341,
        627, 2338, 651, 646, 643, 2345, 654, 652, 1652, 1650, 1647, 1654, 601, 599, 2322, 596, 2321,
        594, 2319, 2317, 611, 610, 608, 606, 2324, 603, 2323, 615, 614, 612, 1617, 1616, 1614, 1612,
        616, 1619, 1618, 2575, 2538, 2536, 905, 901, 898, 909, 2509, 2507, 2504, 870, 867, 864, 860,
        2512, 875, 872, 1781, 2490, 2489, 2487, 2485, 1748, 836, 834, 832, 830, 2494, 827, 2492,
        843, 841, 839, 845, 1765, 1763, 2701, 2676, 2674, 2653, 2648, 2656, 2634, 2633, 2631, 2629,
        1821, 2638, 2636, 2770, 2763, 2761, 2750, 2745, 2753, 2736, 2735, 2733, 2731, 1848, 2740,
        2738, 2786, 2784, 591, 588, 576, 569, 566, 2296, 1590, 537, 534, 526, 2276, 522, 2274, 545,
        542, 539, 548, 1572, 1570, 481, 2245, 466, 2242, 462, 2239, 492, 485, 482, 2249, 496, 494,
        1534, 1531, 1528, 1538, 413, 2196, 406, 2191, 2188, 425, 419, 2202, 415, 2199, 432, 430,
        427, 1472, 1467, 1464, 433, 1476, 1474, 368, 367, 2160, 365, 2159, 362, 2157, 2155, 2152,
        378, 377, 375, 2166, 372, 2165, 369, 2162, 383, 381, 379, 2168, 1419, 1418, 1416, 1414, 385,
        1411, 384, 1423, 1422, 1420, 1424, 2461, 802, 2441, 2439, 790, 786, 783, 794, 2409, 2406,
        2403, 750, 742, 738, 2414, 756, 753, 1720, 2367, 2365, 2362, 2359, 1663, 693, 691, 684,
        2373, 680, 2370, 702, 699, 696, 704, 1690, 1687, 2337, 2336, 2334, 2332, 1624, 2329, 1622,
        640, 637, 2344, 634, 2342, 630, 2340, 650, 648, 645, 2346, 655, 653, 1653, 1651, 1649, 1655,
        2612, 2597, 2595, 2571, 2568, 2565, 2576, 2534, 2529, 2526, 1787, 2540, 2537, 907, 904, 900,
        910, 2503, 2502, 2500, 2498, 1768, 2495, 1767, 2510, 2508, 2506, 869, 866, 863, 2513, 876,
        874, 1782, 2720, 2713, 2711, 2697, 2694, 2691, 2702, 2672, 2670, 2664, 1828, 2678, 2675,
        2647, 2646, 2644, 2642, 1823, 2639, 1822, 2654, 2652, 2650, 2657, 2771, 1855, 2765, 2762,
        1850, 1849, 2751, 2749, 2747, 2754, 353, 2148, 344, 342, 336, 2142, 332, 2140, 345, 1375,
        1373, 306, 2130, 299, 2128, 295, 2125, 319, 314, 311, 2132, 1354, 1352, 1349, 1356, 262,
        257, 2101, 253, 2096, 2093, 274, 273, 267, 2107, 263, 2104, 280, 278, 275, 1316, 1311, 1308,
        1320, 1318, 2052, 202, 2050, 2044, 2040, 219, 2063, 212, 2060, 208, 2055, 224, 221, 2066,
        1260, 1258, 1252, 231, 1248, 229, 1266, 1264, 1261, 1268, 155, 1998, 153, 1996, 1994, 1991,
        1988, 165, 164, 2007, 162, 2006, 159, 2003, 2000, 172, 171, 169, 2012, 166, 2010, 1186,
        1184, 1182, 1179, 175, 1176, 173, 1192, 1191, 1189, 1187, 176, 1194, 1193, 2313, 2307, 2305,
        592, 589, 2294, 2292, 2289, 578, 572, 568, 2297, 580, 1591, 2272, 2267, 2264, 1547, 538,
        536, 529, 2278, 525, 2275, 547, 544, 541, 1574, 1571, 2237, 2235, 2229, 1493, 2225, 1489,
        478, 2247, 470, 2244, 465, 2241, 493, 488, 484, 2250, 498, 495, 1536, 1533, 1530, 1539,
        2187, 2186, 2184, 2182, 1432, 2179, 1430, 2176, 1427, 414, 412, 2197, 409, 2195, 405, 2193,
        2190, 426, 424, 421, 2203, 418, 2201, 431, 429, 1473, 1471, 1469, 1466, 434, 1477, 1475,
        2478, 2472, 2470, 2459, 2457, 2454, 2462, 803, 2437, 2432, 2429, 1726, 2443, 2440, 792, 789,
        785, 2401, 2399, 2393, 1702, 2389, 1699, 2411, 2408, 2405, 745, 741, 2415, 758, 755, 1721,
        2358, 2357, 2355, 2353, 1661, 2350, 1660, 2347, 1657, 2368, 2366, 2364, 2361, 1666, 690,
        687, 2374, 683, 2372, 701, 698, 705, 1691, 1689, 2619, 2617, 2610, 2608, 2605, 2613, 2593,
        2588, 2585, 1803, 2599, 2596, 2563, 2561, 2555, 1797, 2551, 1795, 2573, 2570, 2567, 2577,
        2525, 2524, 2522, 2520, 1786, 2517, 1785, 2514, 1783, 2535, 2533, 2531, 2528, 1788, 2541,
        2539, 906, 903, 911, 2721, 1844, 2715, 2712, 1838, 1836, 2699, 2696, 2693, 2703, 1827, 1826,
        1824, 2673, 2671, 2669, 2666, 1829, 2679, 2677, 1858, 1857, 2772, 1854, 1853, 1851, 1856,
        2766, 2764, 143, 1987, 139, 1986, 135, 133, 131, 1984, 128, 1983, 125, 1981, 138, 137, 136,
        1985, 1133, 1132, 1130, 112, 110, 1974, 107, 1973, 104, 1971, 1969, 122, 121, 119, 117,
        1977, 114, 1976, 124, 1115, 1114, 1112, 1110, 1117, 1116, 84, 83, 1953, 81, 1952, 78, 1950,
        1948, 1945, 94, 93, 91, 1959, 88, 1958, 85, 1955, 99, 97, 95, 1961, 1086, 1085, 1083, 1081,
        1078, 100, 1090, 1089, 1087, 1091, 49, 47, 1917, 44, 1915, 1913, 1910, 1907, 59, 1926, 56,
        1925, 53, 1922, 1919, 66, 64, 1931, 61, 1929, 1042, 1040, 1038, 71, 1035, 70, 1032, 68,
        1048, 1047, 1045, 1043, 1050, 1049, 12, 10, 1869, 1867, 1864, 1861, 21, 1880, 19, 1877,
        1874, 1871, 28, 1888, 25, 1886, 22, 1883, 982, 980, 977, 974, 32, 30, 991, 989, 987, 984,
        34, 995, 994, 992, 2151, 2150, 2147, 2146, 2144, 356, 355, 354, 2149, 2139, 2138, 2136,
        2134, 1359, 343, 341, 338, 2143, 335, 2141, 348, 347, 346, 1376, 1374, 2124, 2123, 2121,
        2119, 1326, 2116, 1324, 310, 308, 305, 2131, 302, 2129, 298, 2127, 320, 318, 316, 313, 2133,
        322, 321, 1355, 1353, 1351, 1357, 2092, 2091, 2089, 2087, 1276, 2084, 1274, 2081, 1271, 259,
        2102, 256, 2100, 252, 2098, 2095, 272, 269, 2108, 266, 2106, 281, 279, 277, 1317, 1315,
        1313, 1310, 282, 1321, 1319, 2039, 2037, 2035, 2032, 1203, 2029, 1200, 1197, 207, 2053, 205,
        2051, 201, 2049, 2046, 2043, 220, 218, 2064, 215, 2062, 211, 2059, 228, 226, 223, 2069,
        1259, 1257, 1254, 232, 1251, 230, 1267, 1265, 1263, 2316, 2315, 2312, 2311, 2309, 2314,
        2304, 2303, 2301, 2299, 1593, 2308, 2306, 590, 2288, 2287, 2285, 2283, 1578, 2280, 1577,
        2295, 2293, 2291, 579, 577, 574, 571, 2298, 582, 581, 1592, 2263, 2262, 2260, 2258, 1545,
        2255, 1544, 2252, 1541, 2273, 2271, 2269, 2266, 1550, 535, 532, 2279, 528, 2277, 546, 543,
        549, 1575, 1573, 2224, 2222, 2220, 1486, 2217, 1485, 2214, 1482, 1479, 2238, 2236, 2234,
        2231, 1496, 2228, 1492, 480, 477, 2248, 473, 2246, 469, 2243, 490, 487, 2251, 497, 1537,
        1535, 1532, 2477, 2476, 2474, 2479, 2469, 2468, 2466, 2464, 1730, 2473, 2471, 2453, 2452,
        2450, 2448, 1729, 2445, 1728, 2460, 2458, 2456, 2463, 805, 804, 2428, 2427, 2425, 2423,
        1725, 2420, 1724, 2417, 1722, 2438, 2436, 2434, 2431, 1727, 2444, 2442, 793, 791, 788, 795,
        2388, 2386, 2384, 1697, 2381, 1696, 2378, 1694, 1692, 2402, 2400, 2398, 2395, 1703, 2392,
        1701, 2412, 2410, 2407, 751, 748, 744, 2416, 759, 757, 1807, 2620, 2618, 1806, 1805, 2611,
        2609, 2607, 2614, 1802, 1801, 1799, 2594, 2592, 2590, 2587, 1804, 2600, 2598, 1794, 1793,
        1791, 1789, 2564, 2562, 2560, 2557, 1798, 2554, 1796, 2574, 2572, 2569, 2578, 1847, 1846,
        2722, 1843, 1842, 1840, 1845, 2716, 2714, 1835, 1834, 1832, 1830, 1839, 1837, 2700, 2698,
        2695, 2704, 1817, 1811, 1810, 897, 862, 1777, 829, 826, 838, 1760, 1758, 808, 2481, 1741,
        1740, 1738, 1743, 2624, 1818, 2726, 2776, 782, 740, 737, 1715, 686, 679, 695, 1682, 1680,
        639, 628, 2339, 647, 644, 1645, 1643, 1640, 1648, 602, 600, 597, 595, 2320, 593, 2318, 609,
        607, 604, 1611, 1610, 1608, 1606, 613, 1615, 1613, 2328, 926, 924, 892, 886, 899, 857, 850,
        2505, 1778, 824, 823, 821, 819, 2488, 818, 2486, 833, 831, 828, 840, 1761, 1759, 2649, 2632,
        2630, 2746, 2734, 2732, 2782, 2781, 570, 567, 1587, 531, 527, 523, 540, 1566, 1564, 476,
        467, 463, 2240, 486, 483, 1524, 1521, 1518, 1529, 411, 403, 2192, 399, 2189, 423, 416, 1462,
        1457, 1454, 428, 1468, 1465, 2210, 366, 363, 2158, 360, 2156, 357, 2153, 376, 373, 370,
        2163, 1410, 1409, 1407, 1405, 382, 1402, 380, 1417, 1415, 1412, 1421, 2175, 2174, 777, 774,
        771, 784, 732, 725, 722, 2404, 743, 1716, 676, 674, 668, 2363, 665, 2360, 685, 1684, 1681,
        626, 624, 622, 2335, 620, 2333, 617, 2330, 641, 635, 649, 1646, 1644, 1642, 2566, 928, 925,
        2530, 2527, 894, 891, 888, 2501, 2499, 2496, 858, 856, 854, 851, 1779, 2692, 2668, 2665,
        2645, 2643, 2640, 2651, 2768, 2759, 2757, 2744, 2743, 2741, 2748, 352, 1382, 340, 337, 333,
        1371, 1369, 307, 300, 296, 2126, 315, 312, 1347, 1342, 1350, 261, 258, 250, 2097, 246, 2094,
        271, 268, 264, 1306, 1301, 1298, 276, 1312, 1309, 2115, 203, 2048, 195, 2045, 191, 2041,
        213, 209, 2056, 1246, 1244, 1238, 225, 1234, 222, 1256, 1253, 1249, 1262, 2080, 2079, 154,
        1997, 150, 1995, 147, 1992, 1989, 163, 160, 2004, 156, 2001, 1175, 1174, 1172, 1170, 1167,
        170, 1164, 167, 1185, 1183, 1180, 1177, 174, 1190, 1188, 2025, 2024, 2022, 587, 586, 564,
        559, 556, 2290, 573, 1588, 520, 518, 512, 2268, 508, 2265, 530, 1568, 1565, 461, 457, 2233,
        450, 2230, 446, 2226, 479, 471, 489, 1526, 1523, 1520, 397, 395, 2185, 392, 2183, 389, 2180,
        2177, 410, 2194, 402, 422, 1463, 1461, 1459, 1456, 1470, 2455, 799, 2433, 2430, 779, 776,
        773, 2397, 2394, 2390, 734, 728, 724, 746, 1717, 2356, 2354, 2351, 2348, 1658, 677, 675,
        673, 670, 667, 688, 1685, 1683, 2606, 2589, 2586, 2559, 2556, 2552, 927, 2523, 2521, 2518,
        2515, 1784, 2532, 895, 893, 890, 2718, 2709, 2707, 2689, 2687, 2684, 2663, 2662, 2660, 2658,
        1825, 2667, 2769, 1852, 2760, 2758, 142, 141, 1139, 1138, 134, 132, 129, 126, 1982, 1129,
        1128, 1126, 1131, 113, 111, 108, 105, 1972, 101, 1970, 120, 118, 115, 1109, 1108, 1106,
        1104, 123, 1113, 1111, 82, 79, 1951, 75, 1949, 72, 1946, 92, 89, 86, 1956, 1077, 1076, 1074,
        1072, 98, 1069, 96, 1084, 1082, 1079, 1088, 1968, 1967, 48, 45, 1916, 42, 1914, 39, 1911,
        1908, 60, 57, 54, 1923, 50, 1920, 1031, 1030, 1028, 1026, 67, 1023, 65, 1020, 62, 1041,
        1039, 1036, 1033, 69, 1046, 1044, 1944, 1943, 1941, 11, 9, 1868, 7, 1865, 1862, 1859, 20,
        1878, 16, 1875, 13, 1872, 970, 968, 966, 963, 29, 960, 26, 23, 983, 981, 978, 975, 33, 971,
        31, 990, 988, 985, 1906, 1904, 1902, 993, 351, 2145, 1383, 331, 330, 328, 326, 2137, 323,
        2135, 339, 1372, 1370, 294, 293, 291, 289, 2122, 286, 2120, 283, 2117, 309, 303, 317, 1348,
        1346, 1344, 245, 244, 242, 2090, 239, 2088, 236, 2085, 2082, 260, 2099, 249, 270, 1307,
        1305, 1303, 1300, 1314, 189, 2038, 186, 2036, 183, 2033, 2030, 2026, 206, 198, 2047, 194,
        216, 1247, 1245, 1243, 1240, 227, 1237, 1255, 2310, 2302, 2300, 2286, 2284, 2281, 565, 563,
        561, 558, 575, 1589, 2261, 2259, 2256, 2253, 1542, 521, 519, 517, 514, 2270, 511, 533, 1569,
        1567, 2223, 2221, 2218, 2215, 1483, 2211, 1480, 459, 456, 453, 2232, 449, 474, 491, 1527,
        1525, 1522, 2475, 2467, 2465, 2451, 2449, 2446, 801, 800, 2426, 2424, 2421, 2418, 1723,
        2435, 780, 778, 775, 2387, 2385, 2382, 2379, 1695, 2375, 1693, 2396, 735, 733, 730, 727,
        749, 1718, 2616, 2615, 2604, 2603, 2601, 2584, 2583, 2581, 2579, 1800, 2591, 2550, 2549,
        2547, 2545, 1792, 2542, 1790, 2558, 929, 2719, 1841, 2710, 2708, 1833, 1831, 2690, 2688,
        2686, 1815, 1809, 1808, 1774, 1756, 1754, 1737, 1736, 1734, 1739, 1816, 1711, 1676, 1674,
        633, 629, 1638, 1636, 1633, 1641, 598, 1605, 1604, 1602, 1600, 605, 1609, 1607, 2327, 887,
        853, 1775, 822, 820, 1757, 1755, 1584, 524, 1560, 1558, 468, 464, 1514, 1511, 1508, 1519,
        408, 404, 400, 1452, 1447, 1444, 417, 1458, 1455, 2208, 364, 361, 358, 2154, 1401, 1400,
        1398, 1396, 374, 1393, 371, 1408, 1406, 1403, 1413, 2173, 2172, 772, 726, 723, 1712, 672,
        669, 666, 682, 1678, 1675, 625, 623, 621, 618, 2331, 636, 632, 1639, 1637, 1635, 920, 918,
        884, 880, 889, 849, 848, 847, 846, 2497, 855, 852, 1776, 2641, 2742, 2787, 1380, 334, 1367,
        1365, 301, 297, 1340, 1338, 1335, 1343, 255, 251, 247, 1296, 1291, 1288, 265, 1302, 1299,
        2113, 204, 196, 192, 2042, 1232, 1230, 1224, 214, 1220, 210, 1242, 1239, 1235, 1250, 2077,
        2075, 151, 148, 1993, 144, 1990, 1163, 1162, 1160, 1158, 1155, 161, 1152, 157, 1173, 1171,
        1168, 1165, 168, 1181, 1178, 2021, 2020, 2018, 2023, 585, 560, 557, 1585, 516, 509, 1562,
        1559, 458, 447, 2227, 472, 1516, 1513, 1510, 398, 396, 393, 390, 2181, 386, 2178, 407, 1453,
        1451, 1449, 1446, 420, 1460, 2209, 769, 764, 720, 712, 2391, 729, 1713, 664, 663, 661, 659,
        2352, 656, 2349, 671, 1679, 1677, 2553, 922, 919, 2519, 2516, 885, 883, 881, 2685, 2661,
        2659, 2767, 2756, 2755, 140, 1137, 1136, 130, 127, 1125, 1124, 1122, 1127, 109, 106, 102,
        1103, 1102, 1100, 1098, 116, 1107, 1105, 1980, 80, 76, 73, 1947, 1068, 1067, 1065, 1063, 90,
        1060, 87, 1075, 1073, 1070, 1080, 1966, 1965, 46, 43, 40, 1912, 36, 1909, 1019, 1018, 1016,
        1014, 58, 1011, 55, 1008, 51, 1029, 1027, 1024, 1021, 63, 1037, 1034, 1940, 1939, 1937,
        1942, 8, 1866, 4, 1863, 1, 1860, 956, 954, 952, 949, 946, 17, 14, 969, 967, 964, 961, 27,
        957, 24, 979, 976, 972, 1901, 1900, 1898, 1896, 986, 1905, 1903, 350, 349, 1381, 329, 327,
        324, 1368, 1366, 292, 290, 287, 284, 2118, 304, 1341, 1339, 1337, 1345, 243, 240, 237, 2086,
        233, 2083, 254, 1297, 1295, 1293, 1290, 1304, 2114, 190, 187, 184, 2034, 180, 2031, 177,
        2027, 199, 1233, 1231, 1229, 1226, 217, 1223, 1241, 2078, 2076, 584, 555, 554, 552, 550,
        2282, 562, 1586, 507, 506, 504, 502, 2257, 499, 2254, 515, 1563, 1561, 445, 443, 441, 2219,
        438, 2216, 435, 2212, 460, 454, 475, 1517, 1515, 1512, 2447, 798, 797, 2422, 2419, 770, 768,
        766, 2383, 2380, 2376, 721, 719, 717, 714, 731, 1714, 2602, 2582, 2580, 2548, 2546, 2543,
        923, 921, 2717, 2706, 2705, 2683, 2682, 2680, 1771, 1752, 1750, 1733, 1732, 1731, 1735,
        1814, 1707, 1670, 1668, 1631, 1629, 1626, 1634, 1599, 1598, 1596, 1594, 1603, 1601, 2326,
        1772, 1753, 1751, 1581, 1554, 1552, 1504, 1501, 1498, 1509, 1442, 1437, 1434, 401, 1448,
        1445, 2206, 1392, 1391, 1389, 1387, 1384, 359, 1399, 1397, 1394, 1404, 2171, 2170, 1708,
        1672, 1669, 619, 1632, 1630, 1628, 1773, 1378, 1363, 1361, 1333, 1328, 1336, 1286, 1281,
        1278, 248, 1292, 1289, 2111, 1218, 1216, 1210, 197, 1206, 193, 1228, 1225, 1221, 1236, 2073,
        2071, 1151, 1150, 1148, 1146, 152, 1143, 149, 1140, 145, 1161, 1159, 1156, 1153, 158, 1169,
        1166, 2017, 2016, 2014, 2019, 1582, 510, 1556, 1553, 452, 448, 1506, 1500, 394, 391, 387,
        1443, 1441, 1439, 1436, 1450, 2207, 765, 716, 713, 1709, 662, 660, 657, 1673, 1671, 916,
        914, 879, 878, 877, 882, 1135, 1134, 1121, 1120, 1118, 1123, 1097, 1096, 1094, 1092, 103,
        1101, 1099, 1979, 1059, 1058, 1056, 1054, 77, 1051, 74, 1066, 1064, 1061, 1071, 1964, 1963,
        1007, 1006, 1004, 1002, 999, 41, 996, 37, 1017, 1015, 1012, 1009, 52, 1025, 1022, 1936,
        1935, 1933, 1938, 942, 940, 938, 935, 932, 5, 2, 955, 953, 950, 947, 18, 943, 15, 965, 962,
        958, 1895, 1894, 1892, 1890, 973, 1899, 1897, 1379, 325, 1364, 1362, 288, 285, 1334, 1332,
        1330, 241, 238, 234, 1287, 1285, 1283, 1280, 1294, 2112, 188, 185, 181, 178, 2028, 1219,
        1217, 1215, 1212, 200, 1209, 1227, 2074, 2072, 583, 553, 551, 1583, 505, 503, 500, 513,
        1557, 1555, 444, 442, 439, 436, 2213, 455, 451, 1507, 1505, 1502, 796, 763, 762, 760, 767,
        711, 710, 708, 706, 2377, 718, 715, 1710, 2544, 917, 915, 2681, 1627, 1597, 1595, 2325,
        1769, 1749, 1747, 1499, 1438, 1435, 2204, 1390, 1388, 1385, 1395, 2169, 2167, 1704, 1665,
        1662, 1625, 1623, 1620, 1770, 1329, 1282, 1279, 2109, 1214, 1207, 1222, 2068, 2065, 1149,
        1147, 1144, 1141, 146, 1157, 1154, 2013, 2011, 2008, 2015, 1579, 1549, 1546, 1495, 1487,
        1433, 1431, 1428, 1425, 388, 1440, 2205, 1705, 658, 1667, 1664, 1119, 1095, 1093, 1978,
        1057, 1055, 1052, 1062, 1962, 1960, 1005, 1003, 1000, 997, 38, 1013, 1010, 1932, 1930, 1927,
        1934, 941, 939, 936, 933, 6, 930, 3, 951, 948, 944, 1889, 1887, 1884, 1881, 959, 1893, 1891,
        35, 1377, 1360, 1358, 1327, 1325, 1322, 1331, 1277, 1275, 1272, 1269, 235, 1284, 2110, 1205,
        1204, 1201, 1198, 182, 1195, 179, 1213, 2070, 2067, 1580, 501, 1551, 1548, 440, 437, 1497,
        1494, 1490, 1503, 761, 709, 707, 1706, 913, 912, 2198, 1386, 2164, 2161, 1621, 1766, 2103,
        1208, 2058, 2054, 1145, 1142, 2005, 2002, 1999, 2009, 1488, 1429, 1426, 2200, 1698, 1659,
        1656, 1975, 1053, 1957, 1954, 1001, 998, 1924, 1921, 1918, 1928, 937, 934, 931, 1879, 1876,
        1873, 1870, 945, 1885, 1882, 1323, 1273, 1270, 2105, 1202, 1199, 1196, 1211, 2061, 2057,
        1576, 1543, 1540, 1484, 1481, 1478, 1491, 1700,
      ])),
      e
    );
  })(),
  Pr = Yse;
var Xse = (function () {
    function e(t, r) {
      ((this.bits = t), (this.points = r));
    }
    return (
      (e.prototype.getBits = function () {
        return this.bits;
      }),
      (e.prototype.getPoints = function () {
        return this.points;
      }),
      e
    );
  })(),
  MU = Xse;
var jse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Kse = (function () {
    function e() {}
    return (
      (e.detectMultiple = function (t, r, n) {
        var i = t.getBlackMatrix(),
          o = e.detect(n, i);
        if (!o.length) ((i = i.clone()), i.rotate180(), (o = e.detect(n, i)));
        return new MU(i, o);
      }),
      (e.detect = function (t, r) {
        var n,
          i,
          o = [],
          s = 0,
          a = 0,
          l = !1;
        while (s < r.getHeight()) {
          var c = e.findVertices(r, s, a);
          if (c[0] == null && c[3] == null) {
            if (!l) break;
            ((l = !1), (a = 0));
            try {
              for (var u = ((n = void 0), jse(o)), d = u.next(); !d.done; d = u.next()) {
                var h = d.value;
                if (h[1] != null) s = Math.trunc(Math.max(s, h[1].getY()));
                if (h[3] != null) s = Math.max(s, Math.trunc(h[3].getY()));
              }
            } catch (f) {
              n = { error: f };
            } finally {
              try {
                if (d && !d.done && (i = u.return)) i.call(u);
              } finally {
                if (n) throw n.error;
              }
            }
            s += e.ROW_STEP;
            continue;
          }
          if (((l = !0), o.push(c), !t)) break;
          if (c[2] != null) ((a = Math.trunc(c[2].getX())), (s = Math.trunc(c[2].getY())));
          else ((a = Math.trunc(c[4].getX())), (s = Math.trunc(c[4].getY())));
        }
        return o;
      }),
      (e.findVertices = function (t, r, n) {
        var i = t.getHeight(),
          o = t.getWidth(),
          s = [, , , , , , , ,];
        if (
          (e.copyToResult(
            s,
            e.findRowsWithPattern(t, i, o, r, n, e.START_PATTERN),
            e.INDEXES_START_PATTERN,
          ),
          s[4] != null)
        )
          ((n = Math.trunc(s[4].getX())), (r = Math.trunc(s[4].getY())));
        return (
          e.copyToResult(
            s,
            e.findRowsWithPattern(t, i, o, r, n, e.STOP_PATTERN),
            e.INDEXES_STOP_PATTERN,
          ),
          s
        );
      }),
      (e.copyToResult = function (t, r, n) {
        for (var i = 0; i < n.length; i++) t[n[i]] = r[i];
      }),
      (e.findRowsWithPattern = function (t, r, n, i, o, s) {
        var a = [, , , ,],
          l = !1,
          c = new Int32Array(s.length);
        for (; i < r; i += e.ROW_STEP) {
          var u = e.findGuardPattern(t, o, i, n, !1, s, c);
          if (u != null) {
            while (i > 0) {
              var d = e.findGuardPattern(t, o, --i, n, !1, s, c);
              if (d != null) u = d;
              else {
                i++;
                break;
              }
            }
            ((a[0] = new ct(u[0], i)), (a[1] = new ct(u[1], i)), (l = !0));
            break;
          }
        }
        var h = i + 1;
        if (l) {
          var f = 0,
            d = Int32Array.from([Math.trunc(a[0].getX()), Math.trunc(a[1].getX())]);
          for (; h < r; h++) {
            var u = e.findGuardPattern(t, d[0], h, n, !1, s, c);
            if (
              u != null &&
              Math.abs(d[0] - u[0]) < e.MAX_PATTERN_DRIFT &&
              Math.abs(d[1] - u[1]) < e.MAX_PATTERN_DRIFT
            )
              ((d = u), (f = 0));
            else if (f > e.SKIPPED_ROW_COUNT_MAX) break;
            else f++;
          }
          ((h -= f + 1), (a[2] = new ct(d[0], h)), (a[3] = new ct(d[1], h)));
        }
        if (h - i < e.BARCODE_MIN_HEIGHT) yn.fill(a, null);
        return a;
      }),
      (e.findGuardPattern = function (t, r, n, i, o, s, a) {
        yn.fillWithin(a, 0, a.length, 0);
        var l = r,
          c = 0;
        while (t.get(l, n) && l > 0 && c++ < e.MAX_PIXEL_DRIFT) l--;
        var u = l,
          d = 0,
          h = s.length;
        for (var f = o; u < i; u++) {
          var p = t.get(u, n);
          if (p !== f) a[d]++;
          else {
            if (d === h - 1) {
              if (e.patternMatchVariance(a, s, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE)
                return new Int32Array([l, u]);
              ((l += a[0] + a[1]),
                pr.arraycopy(a, 2, a, 0, d - 1),
                (a[d - 1] = 0),
                (a[d] = 0),
                d--);
            } else d++;
            ((a[d] = 1), (f = !f));
          }
        }
        if (
          d === h - 1 &&
          e.patternMatchVariance(a, s, e.MAX_INDIVIDUAL_VARIANCE) < e.MAX_AVG_VARIANCE
        )
          return new Int32Array([l, u - 1]);
        return null;
      }),
      (e.patternMatchVariance = function (t, r, n) {
        var i = t.length,
          o = 0,
          s = 0;
        for (var a = 0; a < i; a++) ((o += t[a]), (s += r[a]));
        if (o < s) return 1 / 0;
        var l = o / s;
        n *= l;
        var c = 0;
        for (var u = 0; u < i; u++) {
          var d = t[u],
            h = r[u] * l,
            f = d > h ? d - h : h - d;
          if (f > n) return 1 / 0;
          c += f;
        }
        return c / o;
      }),
      (e.INDEXES_START_PATTERN = Int32Array.from([0, 4, 1, 5])),
      (e.INDEXES_STOP_PATTERN = Int32Array.from([6, 2, 7, 3])),
      (e.MAX_AVG_VARIANCE = 0.42),
      (e.MAX_INDIVIDUAL_VARIANCE = 0.8),
      (e.START_PATTERN = Int32Array.from([8, 1, 1, 1, 1, 1, 1, 3])),
      (e.STOP_PATTERN = Int32Array.from([7, 1, 1, 3, 1, 1, 1, 2, 1])),
      (e.MAX_PIXEL_DRIFT = 3),
      (e.MAX_PATTERN_DRIFT = 5),
      (e.SKIPPED_ROW_COUNT_MAX = 25),
      (e.ROW_STEP = 5),
      (e.BARCODE_MIN_HEIGHT = 10),
      e
    );
  })(),
  IU = Kse;
var qse = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Zse = (function () {
    function e(t, r) {
      if (r.length === 0) throw new nt();
      this.field = t;
      var n = r.length;
      if (n > 1 && r[0] === 0) {
        var i = 1;
        while (i < n && r[i] === 0) i++;
        if (i === n) this.coefficients = new Int32Array([0]);
        else
          ((this.coefficients = new Int32Array(n - i)),
            pr.arraycopy(r, i, this.coefficients, 0, this.coefficients.length));
      } else this.coefficients = r;
    }
    return (
      (e.prototype.getCoefficients = function () {
        return this.coefficients;
      }),
      (e.prototype.getDegree = function () {
        return this.coefficients.length - 1;
      }),
      (e.prototype.isZero = function () {
        return this.coefficients[0] === 0;
      }),
      (e.prototype.getCoefficient = function (t) {
        return this.coefficients[this.coefficients.length - 1 - t];
      }),
      (e.prototype.evaluateAt = function (t) {
        var r, n;
        if (t === 0) return this.getCoefficient(0);
        if (t === 1) {
          var i = 0;
          try {
            for (var o = qse(this.coefficients), s = o.next(); !s.done; s = o.next()) {
              var a = s.value;
              i = this.field.add(i, a);
            }
          } catch (d) {
            r = { error: d };
          } finally {
            try {
              if (s && !s.done && (n = o.return)) n.call(o);
            } finally {
              if (r) throw r.error;
            }
          }
          return i;
        }
        var l = this.coefficients[0],
          c = this.coefficients.length;
        for (var u = 1; u < c; u++)
          l = this.field.add(this.field.multiply(t, l), this.coefficients[u]);
        return l;
      }),
      (e.prototype.add = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("ModulusPolys do not have same ModulusGF field");
        if (this.isZero()) return t;
        if (t.isZero()) return this;
        var r = this.coefficients,
          n = t.coefficients;
        if (r.length > n.length) {
          var i = r;
          ((r = n), (n = i));
        }
        var o = new Int32Array(n.length),
          s = n.length - r.length;
        pr.arraycopy(n, 0, o, 0, s);
        for (var a = s; a < n.length; a++) o[a] = this.field.add(r[a - s], n[a]);
        return new e(this.field, o);
      }),
      (e.prototype.subtract = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("ModulusPolys do not have same ModulusGF field");
        if (t.isZero()) return this;
        return this.add(t.negative());
      }),
      (e.prototype.multiply = function (t) {
        if (t instanceof e) return this.multiplyOther(t);
        return this.multiplyScalar(t);
      }),
      (e.prototype.multiplyOther = function (t) {
        if (!this.field.equals(t.field))
          throw new nt("ModulusPolys do not have same ModulusGF field");
        if (this.isZero() || t.isZero()) return new e(this.field, new Int32Array([0]));
        var r = this.coefficients,
          n = r.length,
          i = t.coefficients,
          o = i.length,
          s = new Int32Array(n + o - 1);
        for (var a = 0; a < n; a++) {
          var l = r[a];
          for (var c = 0; c < o; c++)
            s[a + c] = this.field.add(s[a + c], this.field.multiply(l, i[c]));
        }
        return new e(this.field, s);
      }),
      (e.prototype.negative = function () {
        var t = this.coefficients.length,
          r = new Int32Array(t);
        for (var n = 0; n < t; n++) r[n] = this.field.subtract(0, this.coefficients[n]);
        return new e(this.field, r);
      }),
      (e.prototype.multiplyScalar = function (t) {
        if (t === 0) return new e(this.field, new Int32Array([0]));
        if (t === 1) return this;
        var r = this.coefficients.length,
          n = new Int32Array(r);
        for (var i = 0; i < r; i++) n[i] = this.field.multiply(this.coefficients[i], t);
        return new e(this.field, n);
      }),
      (e.prototype.multiplyByMonomial = function (t, r) {
        if (t < 0) throw new nt();
        if (r === 0) return new e(this.field, new Int32Array([0]));
        var n = this.coefficients.length,
          i = new Int32Array(n + t);
        for (var o = 0; o < n; o++) i[o] = this.field.multiply(this.coefficients[o], r);
        return new e(this.field, i);
      }),
      (e.prototype.toString = function () {
        var t = new Ot();
        for (var r = this.getDegree(); r >= 0; r--) {
          var n = this.getCoefficient(r);
          if (n !== 0) {
            if (n < 0) (t.append(" - "), (n = -n));
            else if (t.length() > 0) t.append(" + ");
            if (r === 0 || n !== 1) t.append(n);
            if (r !== 0)
              if (r === 1) t.append("x");
              else (t.append("x^"), t.append(r));
          }
        }
        return t.toString();
      }),
      e
    );
  })(),
  $u = Zse;
var $se = (function () {
    function e() {}
    return (
      (e.prototype.add = function (t, r) {
        return (t + r) % this.modulus;
      }),
      (e.prototype.subtract = function (t, r) {
        return (this.modulus + t - r) % this.modulus;
      }),
      (e.prototype.exp = function (t) {
        return this.expTable[t];
      }),
      (e.prototype.log = function (t) {
        if (t === 0) throw new nt();
        return this.logTable[t];
      }),
      (e.prototype.inverse = function (t) {
        if (t === 0) throw new X3();
        return this.expTable[this.modulus - this.logTable[t] - 1];
      }),
      (e.prototype.multiply = function (t, r) {
        if (t === 0 || r === 0) return 0;
        return this.expTable[(this.logTable[t] + this.logTable[r]) % (this.modulus - 1)];
      }),
      (e.prototype.getSize = function () {
        return this.modulus;
      }),
      (e.prototype.equals = function (t) {
        return t === this;
      }),
      e
    );
  })(),
  RU = $se;
var Jse = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  eae = (function (e) {
    Jse(t, e);
    function t(r, n) {
      var i = e.call(this) || this;
      ((i.modulus = r), (i.expTable = new Int32Array(r)), (i.logTable = new Int32Array(r)));
      var o = 1;
      for (var s = 0; s < r; s++) ((i.expTable[s] = o), (o = (o * n) % r));
      for (var s = 0; s < r - 1; s++) i.logTable[i.expTable[s]] = s;
      return (
        (i.zero = new $u(i, new Int32Array([0]))),
        (i.one = new $u(i, new Int32Array([1]))),
        i
      );
    }
    return (
      (t.prototype.getZero = function () {
        return this.zero;
      }),
      (t.prototype.getOne = function () {
        return this.one;
      }),
      (t.prototype.buildMonomial = function (r, n) {
        if (r < 0) throw new nt();
        if (n === 0) return this.zero;
        var i = new Int32Array(r + 1);
        return ((i[0] = n), new $u(this, i));
      }),
      (t.PDF417_GF = new t(Pr.NUMBER_OF_CODEWORDS, 3)),
      t
    );
  })(RU),
  OU = eae;
var tae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  rae = (function () {
    function e() {
      this.field = OU.PDF417_GF;
    }
    return (
      (e.prototype.decode = function (t, r, n) {
        var i,
          o,
          s = new $u(this.field, t),
          a = new Int32Array(r),
          l = !1;
        for (var c = r; c > 0; c--) {
          var u = s.evaluateAt(this.field.exp(c));
          if (((a[r - c] = u), u !== 0)) l = !0;
        }
        if (!l) return 0;
        var d = this.field.getOne();
        if (n != null)
          try {
            for (var h = tae(n), f = h.next(); !f.done; f = h.next()) {
              var p = f.value,
                g = this.field.exp(t.length - 1 - p),
                m = new $u(this.field, new Int32Array([this.field.subtract(0, g), 1]));
              d = d.multiply(m);
            }
          } catch (S) {
            i = { error: S };
          } finally {
            try {
              if (f && !f.done && (o = h.return)) o.call(h);
            } finally {
              if (i) throw i.error;
            }
          }
        var A = new $u(this.field, a),
          y = this.runEuclideanAlgorithm(this.field.buildMonomial(r, 1), A, r),
          x = y[0],
          b = y[1],
          v = this.findErrorLocations(x),
          _ = this.findErrorMagnitudes(b, x, v);
        for (var c = 0; c < v.length; c++) {
          var w = t.length - 1 - this.field.log(v[c]);
          if (w < 0) throw qr.getChecksumInstance();
          t[w] = this.field.subtract(t[w], _[c]);
        }
        return v.length;
      }),
      (e.prototype.runEuclideanAlgorithm = function (t, r, n) {
        if (t.getDegree() < r.getDegree()) {
          var i = t;
          ((t = r), (r = i));
        }
        var o = t,
          s = r,
          a = this.field.getZero(),
          l = this.field.getOne();
        while (s.getDegree() >= Math.round(n / 2)) {
          var c = o,
            u = a;
          if (((o = s), (a = l), o.isZero())) throw qr.getChecksumInstance();
          s = c;
          var d = this.field.getZero(),
            h = o.getCoefficient(o.getDegree()),
            f = this.field.inverse(h);
          while (s.getDegree() >= o.getDegree() && !s.isZero()) {
            var p = s.getDegree() - o.getDegree(),
              g = this.field.multiply(s.getCoefficient(s.getDegree()), f);
            ((d = d.add(this.field.buildMonomial(p, g))),
              (s = s.subtract(o.multiplyByMonomial(p, g))));
          }
          l = d.multiply(a).subtract(u).negative();
        }
        var m = l.getCoefficient(0);
        if (m === 0) throw qr.getChecksumInstance();
        var A = this.field.inverse(m),
          y = l.multiply(A),
          x = s.multiply(A);
        return [y, x];
      }),
      (e.prototype.findErrorLocations = function (t) {
        var r = t.getDegree(),
          n = new Int32Array(r),
          i = 0;
        for (var o = 1; o < this.field.getSize() && i < r; o++)
          if (t.evaluateAt(o) === 0) ((n[i] = this.field.inverse(o)), i++);
        if (i !== r) throw qr.getChecksumInstance();
        return n;
      }),
      (e.prototype.findErrorMagnitudes = function (t, r, n) {
        var i = r.getDegree(),
          o = new Int32Array(i);
        for (var s = 1; s <= i; s++) o[i - s] = this.field.multiply(s, r.getCoefficient(s));
        var a = new $u(this.field, o),
          l = n.length,
          c = new Int32Array(l);
        for (var s = 0; s < l; s++) {
          var u = this.field.inverse(n[s]),
            d = this.field.subtract(0, t.evaluateAt(u)),
            h = this.field.inverse(a.evaluateAt(u));
          c[s] = this.field.multiply(d, h);
        }
        return c;
      }),
      e
    );
  })(),
  RS = rae;
var nae = (function () {
    function e(t, r, n, i, o) {
      if (t instanceof e) this.constructor_2(t);
      else this.constructor_1(t, r, n, i, o);
    }
    return (
      (e.prototype.constructor_1 = function (t, r, n, i, o) {
        var s = r == null || n == null,
          a = i == null || o == null;
        if (s && a) throw new Ce();
        if (s) ((r = new ct(0, i.getY())), (n = new ct(0, o.getY())));
        else if (a)
          ((i = new ct(t.getWidth() - 1, r.getY())), (o = new ct(t.getWidth() - 1, n.getY())));
        ((this.image = t),
          (this.topLeft = r),
          (this.bottomLeft = n),
          (this.topRight = i),
          (this.bottomRight = o),
          (this.minX = Math.trunc(Math.min(r.getX(), n.getX()))),
          (this.maxX = Math.trunc(Math.max(i.getX(), o.getX()))),
          (this.minY = Math.trunc(Math.min(r.getY(), i.getY()))),
          (this.maxY = Math.trunc(Math.max(n.getY(), o.getY()))));
      }),
      (e.prototype.constructor_2 = function (t) {
        ((this.image = t.image),
          (this.topLeft = t.getTopLeft()),
          (this.bottomLeft = t.getBottomLeft()),
          (this.topRight = t.getTopRight()),
          (this.bottomRight = t.getBottomRight()),
          (this.minX = t.getMinX()),
          (this.maxX = t.getMaxX()),
          (this.minY = t.getMinY()),
          (this.maxY = t.getMaxY()));
      }),
      (e.merge = function (t, r) {
        if (t == null) return r;
        if (r == null) return t;
        return new e(t.image, t.topLeft, t.bottomLeft, r.topRight, r.bottomRight);
      }),
      (e.prototype.addMissingRows = function (t, r, n) {
        var i = this.topLeft,
          o = this.bottomLeft,
          s = this.topRight,
          a = this.bottomRight;
        if (t > 0) {
          var l = n ? this.topLeft : this.topRight,
            c = Math.trunc(l.getY() - t);
          if (c < 0) c = 0;
          var u = new ct(l.getX(), c);
          if (n) i = u;
          else s = u;
        }
        if (r > 0) {
          var d = n ? this.bottomLeft : this.bottomRight,
            h = Math.trunc(d.getY() + r);
          if (h >= this.image.getHeight()) h = this.image.getHeight() - 1;
          var f = new ct(d.getX(), h);
          if (n) o = f;
          else a = f;
        }
        return new e(this.image, i, o, s, a);
      }),
      (e.prototype.getMinX = function () {
        return this.minX;
      }),
      (e.prototype.getMaxX = function () {
        return this.maxX;
      }),
      (e.prototype.getMinY = function () {
        return this.minY;
      }),
      (e.prototype.getMaxY = function () {
        return this.maxY;
      }),
      (e.prototype.getTopLeft = function () {
        return this.topLeft;
      }),
      (e.prototype.getTopRight = function () {
        return this.topRight;
      }),
      (e.prototype.getBottomLeft = function () {
        return this.bottomLeft;
      }),
      (e.prototype.getBottomRight = function () {
        return this.bottomRight;
      }),
      e
    );
  })(),
  eA = nae;
var iae = (function () {
    function e(t, r, n, i) {
      ((this.columnCount = t),
        (this.errorCorrectionLevel = i),
        (this.rowCountUpperPart = r),
        (this.rowCountLowerPart = n),
        (this.rowCount = r + n));
    }
    return (
      (e.prototype.getColumnCount = function () {
        return this.columnCount;
      }),
      (e.prototype.getErrorCorrectionLevel = function () {
        return this.errorCorrectionLevel;
      }),
      (e.prototype.getRowCount = function () {
        return this.rowCount;
      }),
      (e.prototype.getRowCountUpperPart = function () {
        return this.rowCountUpperPart;
      }),
      (e.prototype.getRowCountLowerPart = function () {
        return this.rowCountLowerPart;
      }),
      e
    );
  })(),
  LU = iae;
var oae = (function () {
    function e() {
      this.buffer = "";
    }
    return (
      (e.form = function (t, r) {
        var n = -1;
        function i(s, a, l, c, u, d) {
          if (s === "%%") return "%";
          if (r[++n] === void 0) return;
          s = c ? parseInt(c.substr(1)) : void 0;
          var h = u ? parseInt(u.substr(1)) : void 0,
            f;
          switch (d) {
            case "s":
              f = r[n];
              break;
            case "c":
              f = r[n][0];
              break;
            case "f":
              f = parseFloat(r[n]).toFixed(s);
              break;
            case "p":
              f = parseFloat(r[n]).toPrecision(s);
              break;
            case "e":
              f = parseFloat(r[n]).toExponential(s);
              break;
            case "x":
              f = parseInt(r[n]).toString(h ? h : 16);
              break;
            case "d":
              f = parseFloat(parseInt(r[n], h ? h : 10).toPrecision(s)).toFixed(0);
              break;
          }
          f = typeof f === "object" ? JSON.stringify(f) : (+f).toString(h);
          var p = parseInt(l),
            g = l && l[0] + "" === "0" ? "0" : " ";
          while (f.length < p) f = a !== void 0 ? f + g : g + f;
          return f;
        }
        var o = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
        return t.replace(o, i);
      }),
      (e.prototype.format = function (t) {
        var r = [];
        for (var n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
        this.buffer += e.form(t, r);
      }),
      (e.prototype.toString = function () {
        return this.buffer;
      }),
      e
    );
  })(),
  rm = oae;
var sae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  aae = (function () {
    function e(t) {
      ((this.boundingBox = new eA(t)), (this.codewords = Array(t.getMaxY() - t.getMinY() + 1)));
    }
    return (
      (e.prototype.getCodewordNearby = function (t) {
        var r = this.getCodeword(t);
        if (r != null) return r;
        for (var n = 1; n < e.MAX_NEARBY_DISTANCE; n++) {
          var i = this.imageRowToCodewordIndex(t) - n;
          if (i >= 0) {
            if (((r = this.codewords[i]), r != null)) return r;
          }
          if (((i = this.imageRowToCodewordIndex(t) + n), i < this.codewords.length)) {
            if (((r = this.codewords[i]), r != null)) return r;
          }
        }
        return null;
      }),
      (e.prototype.imageRowToCodewordIndex = function (t) {
        return t - this.boundingBox.getMinY();
      }),
      (e.prototype.setCodeword = function (t, r) {
        this.codewords[this.imageRowToCodewordIndex(t)] = r;
      }),
      (e.prototype.getCodeword = function (t) {
        return this.codewords[this.imageRowToCodewordIndex(t)];
      }),
      (e.prototype.getBoundingBox = function () {
        return this.boundingBox;
      }),
      (e.prototype.getCodewords = function () {
        return this.codewords;
      }),
      (e.prototype.toString = function () {
        var t,
          r,
          n = new rm(),
          i = 0;
        try {
          for (var o = sae(this.codewords), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            if (a == null) {
              n.format("%3d:    |   %n", i++);
              continue;
            }
            n.format("%3d: %3d|%3d%n", i++, a.getRowNumber(), a.getValue());
          }
        } catch (l) {
          t = { error: l };
        } finally {
          try {
            if (s && !s.done && (r = o.return)) r.call(o);
          } finally {
            if (t) throw t.error;
          }
        }
        return n.toString();
      }),
      (e.MAX_NEARBY_DISTANCE = 5),
      e
    );
  })(),
  W_ = aae;
var lae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  cae = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  uae = (function () {
    function e() {
      this.values = /*@__PURE__*/ new Map();
    }
    return (
      (e.prototype.setValue = function (t) {
        t = Math.trunc(t);
        var r = this.values.get(t);
        if (r == null) r = 0;
        (r++, this.values.set(t, r));
      }),
      (e.prototype.getValue = function () {
        var t,
          r,
          n = -1,
          i = [],
          o = function (d, h) {
            var f = {
              getKey: function () {
                return d;
              },
              getValue: function () {
                return h;
              },
            };
            if (f.getValue() > n) ((n = f.getValue()), (i = []), i.push(f.getKey()));
            else if (f.getValue() === n) i.push(f.getKey());
          };
        try {
          for (var s = lae(this.values.entries()), a = s.next(); !a.done; a = s.next()) {
            var l = cae(a.value, 2),
              c = l[0],
              u = l[1];
            o(c, u);
          }
        } catch (d) {
          t = { error: d };
        } finally {
          try {
            if (a && !a.done && (r = s.return)) r.call(s);
          } finally {
            if (t) throw t.error;
          }
        }
        return Pr.toIntArray(i);
      }),
      (e.prototype.getConfidence = function (t) {
        return this.values.get(t);
      }),
      e
    );
  })(),
  p0 = uae;
var dae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  OS = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  hae = (function (e) {
    dae(t, e);
    function t(r, n) {
      var i = e.call(this, r) || this;
      return ((i._isLeft = n), i);
    }
    return (
      (t.prototype.setRowNumbers = function () {
        var r, n;
        try {
          for (var i = OS(this.getCodewords()), o = i.next(); !o.done; o = i.next()) {
            var s = o.value;
            if (s != null) s.setRowNumberAsRowIndicatorColumn();
          }
        } catch (a) {
          r = { error: a };
        } finally {
          try {
            if (o && !o.done && (n = i.return)) n.call(i);
          } finally {
            if (r) throw r.error;
          }
        }
      }),
      (t.prototype.adjustCompleteIndicatorColumnRowNumbers = function (r) {
        var n = this.getCodewords();
        (this.setRowNumbers(), this.removeIncorrectCodewords(n, r));
        var i = this.getBoundingBox(),
          o = this._isLeft ? i.getTopLeft() : i.getTopRight(),
          s = this._isLeft ? i.getBottomLeft() : i.getBottomRight(),
          a = this.imageRowToCodewordIndex(Math.trunc(o.getY())),
          l = this.imageRowToCodewordIndex(Math.trunc(s.getY())),
          c = -1,
          u = 1,
          d = 0;
        for (var h = a; h < l; h++) {
          if (n[h] == null) continue;
          var f = n[h],
            p = f.getRowNumber() - c;
          if (p === 0) d++;
          else if (p === 1) ((u = Math.max(u, d)), (d = 1), (c = f.getRowNumber()));
          else if (p < 0 || f.getRowNumber() >= r.getRowCount() || p > h) n[h] = null;
          else {
            var g = void 0;
            if (u > 2) g = (u - 2) * p;
            else g = p;
            var m = g >= h;
            for (var A = 1; A <= g && !m; A++) m = n[h - A] != null;
            if (m) n[h] = null;
            else ((c = f.getRowNumber()), (d = 1));
          }
        }
      }),
      (t.prototype.getRowHeights = function () {
        var r,
          n,
          i = this.getBarcodeMetadata();
        if (i == null) return null;
        this.adjustIncompleteIndicatorColumnRowNumbers(i);
        var o = new Int32Array(i.getRowCount());
        try {
          for (var s = OS(this.getCodewords()), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            if (l != null) {
              var c = l.getRowNumber();
              if (c >= o.length) continue;
              o[c]++;
            }
          }
        } catch (u) {
          r = { error: u };
        } finally {
          try {
            if (a && !a.done && (n = s.return)) n.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
        return o;
      }),
      (t.prototype.adjustIncompleteIndicatorColumnRowNumbers = function (r) {
        var n = this.getBoundingBox(),
          i = this._isLeft ? n.getTopLeft() : n.getTopRight(),
          o = this._isLeft ? n.getBottomLeft() : n.getBottomRight(),
          s = this.imageRowToCodewordIndex(Math.trunc(i.getY())),
          a = this.imageRowToCodewordIndex(Math.trunc(o.getY())),
          l = this.getCodewords(),
          c = -1,
          u = 1,
          d = 0;
        for (var h = s; h < a; h++) {
          if (l[h] == null) continue;
          var f = l[h];
          f.setRowNumberAsRowIndicatorColumn();
          var p = f.getRowNumber() - c;
          if (p === 0) d++;
          else if (p === 1) ((u = Math.max(u, d)), (d = 1), (c = f.getRowNumber()));
          else if (f.getRowNumber() >= r.getRowCount()) l[h] = null;
          else ((c = f.getRowNumber()), (d = 1));
        }
      }),
      (t.prototype.getBarcodeMetadata = function () {
        var r,
          n,
          i = this.getCodewords(),
          o = new p0(),
          s = new p0(),
          a = new p0(),
          l = new p0();
        try {
          for (var c = OS(i), u = c.next(); !u.done; u = c.next()) {
            var d = u.value;
            if (d == null) continue;
            d.setRowNumberAsRowIndicatorColumn();
            var h = d.getValue() % 30,
              f = d.getRowNumber();
            if (!this._isLeft) f += 2;
            switch (f % 3) {
              case 0:
                s.setValue(h * 3 + 1);
                break;
              case 1:
                (l.setValue(h / 3), a.setValue(h % 3));
                break;
              case 2:
                o.setValue(h + 1);
                break;
            }
          }
        } catch (g) {
          r = { error: g };
        } finally {
          try {
            if (u && !u.done && (n = c.return)) n.call(c);
          } finally {
            if (r) throw r.error;
          }
        }
        if (
          o.getValue().length === 0 ||
          s.getValue().length === 0 ||
          a.getValue().length === 0 ||
          l.getValue().length === 0 ||
          o.getValue()[0] < 1 ||
          s.getValue()[0] + a.getValue()[0] < Pr.MIN_ROWS_IN_BARCODE ||
          s.getValue()[0] + a.getValue()[0] > Pr.MAX_ROWS_IN_BARCODE
        )
          return null;
        var p = new LU(o.getValue()[0], s.getValue()[0], a.getValue()[0], l.getValue()[0]);
        return (this.removeIncorrectCodewords(i, p), p);
      }),
      (t.prototype.removeIncorrectCodewords = function (r, n) {
        for (var i = 0; i < r.length; i++) {
          var o = r[i];
          if (r[i] == null) continue;
          var s = o.getValue() % 30,
            a = o.getRowNumber();
          if (a > n.getRowCount()) {
            r[i] = null;
            continue;
          }
          if (!this._isLeft) a += 2;
          switch (a % 3) {
            case 0:
              if (s * 3 + 1 !== n.getRowCountUpperPart()) r[i] = null;
              break;
            case 1:
              if (
                Math.trunc(s / 3) !== n.getErrorCorrectionLevel() ||
                s % 3 !== n.getRowCountLowerPart()
              )
                r[i] = null;
              break;
            case 2:
              if (s + 1 !== n.getColumnCount()) r[i] = null;
              break;
          }
        }
      }),
      (t.prototype.isLeft = function () {
        return this._isLeft;
      }),
      (t.prototype.toString = function () {
        return (
          "IsLeft: " +
          this._isLeft +
          `
` +
          e.prototype.toString.call(this)
        );
      }),
      t
    );
  })(W_),
  LS = hae;
var fae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  pae = (function () {
    function e(t, r) {
      ((this.ADJUST_ROW_NUMBER_SKIP = 2),
        (this.barcodeMetadata = t),
        (this.barcodeColumnCount = t.getColumnCount()),
        (this.boundingBox = r),
        (this.detectionResultColumns = Array(this.barcodeColumnCount + 2)));
    }
    return (
      (e.prototype.getDetectionResultColumns = function () {
        (this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]),
          this.adjustIndicatorColumnRowNumbers(
            this.detectionResultColumns[this.barcodeColumnCount + 1],
          ));
        var t = Pr.MAX_CODEWORDS_IN_BARCODE,
          r;
        do ((r = t), (t = this.adjustRowNumbersAndGetCount()));
        while (t > 0 && t < r);
        return this.detectionResultColumns;
      }),
      (e.prototype.adjustIndicatorColumnRowNumbers = function (t) {
        if (t != null) t.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata);
      }),
      (e.prototype.adjustRowNumbersAndGetCount = function () {
        var t = this.adjustRowNumbersByRow();
        if (t === 0) return 0;
        for (var r = 1; r < this.barcodeColumnCount + 1; r++) {
          var n = this.detectionResultColumns[r].getCodewords();
          for (var i = 0; i < n.length; i++) {
            if (n[i] == null) continue;
            if (!n[i].hasValidRowNumber()) this.adjustRowNumbers(r, i, n);
          }
        }
        return t;
      }),
      (e.prototype.adjustRowNumbersByRow = function () {
        this.adjustRowNumbersFromBothRI();
        var t = this.adjustRowNumbersFromLRI();
        return t + this.adjustRowNumbersFromRRI();
      }),
      (e.prototype.adjustRowNumbersFromBothRI = function () {
        if (
          this.detectionResultColumns[0] == null ||
          this.detectionResultColumns[this.barcodeColumnCount + 1] == null
        )
          return;
        var t = this.detectionResultColumns[0].getCodewords(),
          r = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords();
        for (var n = 0; n < t.length; n++)
          if (t[n] != null && r[n] != null && t[n].getRowNumber() === r[n].getRowNumber())
            for (var i = 1; i <= this.barcodeColumnCount; i++) {
              var o = this.detectionResultColumns[i].getCodewords()[n];
              if (o == null) continue;
              if ((o.setRowNumber(t[n].getRowNumber()), !o.hasValidRowNumber()))
                this.detectionResultColumns[i].getCodewords()[n] = null;
            }
      }),
      (e.prototype.adjustRowNumbersFromRRI = function () {
        if (this.detectionResultColumns[this.barcodeColumnCount + 1] == null) return 0;
        var t = 0,
          r = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords();
        for (var n = 0; n < r.length; n++) {
          if (r[n] == null) continue;
          var i = r[n].getRowNumber(),
            o = 0;
          for (var s = this.barcodeColumnCount + 1; s > 0 && o < this.ADJUST_ROW_NUMBER_SKIP; s--) {
            var a = this.detectionResultColumns[s].getCodewords()[n];
            if (a != null) {
              if (((o = e.adjustRowNumberIfValid(i, o, a)), !a.hasValidRowNumber())) t++;
            }
          }
        }
        return t;
      }),
      (e.prototype.adjustRowNumbersFromLRI = function () {
        if (this.detectionResultColumns[0] == null) return 0;
        var t = 0,
          r = this.detectionResultColumns[0].getCodewords();
        for (var n = 0; n < r.length; n++) {
          if (r[n] == null) continue;
          var i = r[n].getRowNumber(),
            o = 0;
          for (var s = 1; s < this.barcodeColumnCount + 1 && o < this.ADJUST_ROW_NUMBER_SKIP; s++) {
            var a = this.detectionResultColumns[s].getCodewords()[n];
            if (a != null) {
              if (((o = e.adjustRowNumberIfValid(i, o, a)), !a.hasValidRowNumber())) t++;
            }
          }
        }
        return t;
      }),
      (e.adjustRowNumberIfValid = function (t, r, n) {
        if (n == null) return r;
        if (!n.hasValidRowNumber())
          if (n.isValidRowNumber(t)) (n.setRowNumber(t), (r = 0));
          else ++r;
        return r;
      }),
      (e.prototype.adjustRowNumbers = function (t, r, n) {
        var i, o;
        if (this.detectionResultColumns[t - 1] == null) return;
        var s = n[r],
          a = this.detectionResultColumns[t - 1].getCodewords(),
          l = a;
        if (this.detectionResultColumns[t + 1] != null)
          l = this.detectionResultColumns[t + 1].getCodewords();
        var c = Array(14);
        if (((c[2] = a[r]), (c[3] = l[r]), r > 0))
          ((c[0] = n[r - 1]), (c[4] = a[r - 1]), (c[5] = l[r - 1]));
        if (r > 1) ((c[8] = n[r - 2]), (c[10] = a[r - 2]), (c[11] = l[r - 2]));
        if (r < n.length - 1) ((c[1] = n[r + 1]), (c[6] = a[r + 1]), (c[7] = l[r + 1]));
        if (r < n.length - 2) ((c[9] = n[r + 2]), (c[12] = a[r + 2]), (c[13] = l[r + 2]));
        try {
          for (var u = fae(c), d = u.next(); !d.done; d = u.next()) {
            var h = d.value;
            if (e.adjustRowNumber(s, h)) return;
          }
        } catch (f) {
          i = { error: f };
        } finally {
          try {
            if (d && !d.done && (o = u.return)) o.call(u);
          } finally {
            if (i) throw i.error;
          }
        }
      }),
      (e.adjustRowNumber = function (t, r) {
        if (r == null) return !1;
        if (r.hasValidRowNumber() && r.getBucket() === t.getBucket())
          return (t.setRowNumber(r.getRowNumber()), !0);
        return !1;
      }),
      (e.prototype.getBarcodeColumnCount = function () {
        return this.barcodeColumnCount;
      }),
      (e.prototype.getBarcodeRowCount = function () {
        return this.barcodeMetadata.getRowCount();
      }),
      (e.prototype.getBarcodeECLevel = function () {
        return this.barcodeMetadata.getErrorCorrectionLevel();
      }),
      (e.prototype.setBoundingBox = function (t) {
        this.boundingBox = t;
      }),
      (e.prototype.getBoundingBox = function () {
        return this.boundingBox;
      }),
      (e.prototype.setDetectionResultColumn = function (t, r) {
        this.detectionResultColumns[t] = r;
      }),
      (e.prototype.getDetectionResultColumn = function (t) {
        return this.detectionResultColumns[t];
      }),
      (e.prototype.toString = function () {
        var t = this.detectionResultColumns[0];
        if (t == null) t = this.detectionResultColumns[this.barcodeColumnCount + 1];
        var r = new rm();
        for (var n = 0; n < t.getCodewords().length; n++) {
          r.format("CW %3d:", n);
          for (var i = 0; i < this.barcodeColumnCount + 2; i++) {
            if (this.detectionResultColumns[i] == null) {
              r.format("    |   ");
              continue;
            }
            var o = this.detectionResultColumns[i].getCodewords()[n];
            if (o == null) {
              r.format("    |   ");
              continue;
            }
            r.format(" %3d|%3d", o.getRowNumber(), o.getValue());
          }
          r.format("%n");
        }
        return r.toString();
      }),
      e
    );
  })(),
  BU = pae;
var mae = (function () {
    function e(t, r, n, i) {
      ((this.rowNumber = e.BARCODE_ROW_UNKNOWN),
        (this.startX = Math.trunc(t)),
        (this.endX = Math.trunc(r)),
        (this.bucket = Math.trunc(n)),
        (this.value = Math.trunc(i)));
    }
    return (
      (e.prototype.hasValidRowNumber = function () {
        return this.isValidRowNumber(this.rowNumber);
      }),
      (e.prototype.isValidRowNumber = function (t) {
        return t !== e.BARCODE_ROW_UNKNOWN && this.bucket === (t % 3) * 3;
      }),
      (e.prototype.setRowNumberAsRowIndicatorColumn = function () {
        this.rowNumber = Math.trunc(Math.trunc(this.value / 30) * 3 + Math.trunc(this.bucket / 3));
      }),
      (e.prototype.getWidth = function () {
        return this.endX - this.startX;
      }),
      (e.prototype.getStartX = function () {
        return this.startX;
      }),
      (e.prototype.getEndX = function () {
        return this.endX;
      }),
      (e.prototype.getBucket = function () {
        return this.bucket;
      }),
      (e.prototype.getValue = function () {
        return this.value;
      }),
      (e.prototype.getRowNumber = function () {
        return this.rowNumber;
      }),
      (e.prototype.setRowNumber = function (t) {
        this.rowNumber = t;
      }),
      (e.prototype.toString = function () {
        return this.rowNumber + "|" + this.value;
      }),
      (e.BARCODE_ROW_UNKNOWN = -1),
      e
    );
  })(),
  FU = mae;
var gae = (function () {
    function e() {}
    return (
      (e.initialize = function () {
        for (var t = 0; t < Pr.SYMBOL_TABLE.length; t++) {
          var r = Pr.SYMBOL_TABLE[t],
            n = r & 1;
          for (var i = 0; i < Pr.BARS_IN_MODULE; i++) {
            var o = 0;
            while ((r & 1) === n) ((o += 1), (r >>= 1));
            if (((n = r & 1), !e.RATIOS_TABLE[t])) e.RATIOS_TABLE[t] = Array(Pr.BARS_IN_MODULE);
            e.RATIOS_TABLE[t][Pr.BARS_IN_MODULE - i - 1] = Math.fround(o / Pr.MODULES_IN_CODEWORD);
          }
        }
        this.bSymbolTableReady = !0;
      }),
      (e.getDecodedValue = function (t) {
        var r = e.getDecodedCodewordValue(e.sampleBitCounts(t));
        if (r !== -1) return r;
        return e.getClosestDecodedValue(t);
      }),
      (e.sampleBitCounts = function (t) {
        var r = Sr.sum(t),
          n = new Int32Array(Pr.BARS_IN_MODULE),
          i = 0,
          o = 0;
        for (var s = 0; s < Pr.MODULES_IN_CODEWORD; s++) {
          var a = r / (2 * Pr.MODULES_IN_CODEWORD) + (s * r) / Pr.MODULES_IN_CODEWORD;
          if (o + t[i] <= a) ((o += t[i]), i++);
          n[i]++;
        }
        return n;
      }),
      (e.getDecodedCodewordValue = function (t) {
        var r = e.getBitValue(t);
        return Pr.getCodeword(r) === -1 ? -1 : r;
      }),
      (e.getBitValue = function (t) {
        var r = 0;
        for (var n = 0; n < t.length; n++)
          for (var i = 0; i < t[n]; i++) r = (r << 1) | (n % 2 === 0 ? 1 : 0);
        return Math.trunc(r);
      }),
      (e.getClosestDecodedValue = function (t) {
        var r = Sr.sum(t),
          n = Array(Pr.BARS_IN_MODULE);
        if (r > 1) for (var i = 0; i < n.length; i++) n[i] = Math.fround(t[i] / r);
        var o = j3.MAX_VALUE,
          s = -1;
        if (!this.bSymbolTableReady) e.initialize();
        for (var a = 0; a < e.RATIOS_TABLE.length; a++) {
          var l = 0,
            c = e.RATIOS_TABLE[a];
          for (var u = 0; u < Pr.BARS_IN_MODULE; u++) {
            var d = Math.fround(c[u] - n[u]);
            if (((l += Math.fround(d * d)), l >= o)) break;
          }
          if (l < o) ((o = l), (s = Pr.SYMBOL_TABLE[a]));
        }
        return s;
      }),
      (e.bSymbolTableReady = !1),
      (e.RATIOS_TABLE = Array(Pr.SYMBOL_TABLE.length).map(function (t) {
        return (t = Array(Pr.BARS_IN_MODULE));
      })),
      e
    );
  })(),
  DU = gae;
var Aae = (function () {
    function e() {
      ((this.segmentCount = -1), (this.fileSize = -1), (this.timestamp = -1), (this.checksum = -1));
    }
    return (
      (e.prototype.getSegmentIndex = function () {
        return this.segmentIndex;
      }),
      (e.prototype.setSegmentIndex = function (t) {
        this.segmentIndex = t;
      }),
      (e.prototype.getFileId = function () {
        return this.fileId;
      }),
      (e.prototype.setFileId = function (t) {
        this.fileId = t;
      }),
      (e.prototype.getOptionalData = function () {
        return this.optionalData;
      }),
      (e.prototype.setOptionalData = function (t) {
        this.optionalData = t;
      }),
      (e.prototype.isLastSegment = function () {
        return this.lastSegment;
      }),
      (e.prototype.setLastSegment = function (t) {
        this.lastSegment = t;
      }),
      (e.prototype.getSegmentCount = function () {
        return this.segmentCount;
      }),
      (e.prototype.setSegmentCount = function (t) {
        this.segmentCount = t;
      }),
      (e.prototype.getSender = function () {
        return this.sender || null;
      }),
      (e.prototype.setSender = function (t) {
        this.sender = t;
      }),
      (e.prototype.getAddressee = function () {
        return this.addressee || null;
      }),
      (e.prototype.setAddressee = function (t) {
        this.addressee = t;
      }),
      (e.prototype.getFileName = function () {
        return this.fileName;
      }),
      (e.prototype.setFileName = function (t) {
        this.fileName = t;
      }),
      (e.prototype.getFileSize = function () {
        return this.fileSize;
      }),
      (e.prototype.setFileSize = function (t) {
        this.fileSize = t;
      }),
      (e.prototype.getChecksum = function () {
        return this.checksum;
      }),
      (e.prototype.setChecksum = function (t) {
        this.checksum = t;
      }),
      (e.prototype.getTimestamp = function () {
        return this.timestamp;
      }),
      (e.prototype.setTimestamp = function (t) {
        this.timestamp = t;
      }),
      e
    );
  })(),
  BS = Aae;
var yae = (function () {
    function e() {}
    return (
      (e.parseLong = function (t, r) {
        if (r === void 0) r = void 0;
        return parseInt(t, r);
      }),
      e
    );
  })(),
  FS = yae;
var xae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  bae = (function (e) {
    xae(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "NullPointerException"), t);
  })(Bn),
  NU = bae;
var _ae = (function () {
    function e() {}
    return (
      (e.prototype.writeBytes = function (t) {
        this.writeBytesOffset(t, 0, t.length);
      }),
      (e.prototype.writeBytesOffset = function (t, r, n) {
        if (t == null) throw new NU();
        else if (r < 0 || r > t.length || n < 0 || r + n > t.length || r + n < 0) throw new X1();
        else if (n === 0) return;
        for (var i = 0; i < n; i++) this.write(t[r + i]);
      }),
      (e.prototype.flush = function () {}),
      (e.prototype.close = function () {}),
      e
    );
  })(),
  PU = _ae;
var vae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Cae = (function (e) {
    vae(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return t;
  })(Bn),
  kU = Cae;
var wae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Tae = (function (e) {
    wae(t, e);
    function t(r) {
      if (r === void 0) r = 32;
      var n = e.call(this) || this;
      if (((n.count = 0), r < 0)) throw new nt("Negative initial size: " + r);
      return ((n.buf = new Uint8Array(r)), n);
    }
    return (
      (t.prototype.ensureCapacity = function (r) {
        if (r - this.buf.length > 0) this.grow(r);
      }),
      (t.prototype.grow = function (r) {
        var n = this.buf.length,
          i = n << 1;
        if (i - r < 0) i = r;
        if (i < 0) {
          if (r < 0) throw new kU();
          i = Ut.MAX_VALUE;
        }
        this.buf = yn.copyOfUint8Array(this.buf, i);
      }),
      (t.prototype.write = function (r) {
        (this.ensureCapacity(this.count + 1), (this.buf[this.count] = r), (this.count += 1));
      }),
      (t.prototype.writeBytesOffset = function (r, n, i) {
        if (n < 0 || n > r.length || i < 0 || n + i - r.length > 0) throw new X1();
        (this.ensureCapacity(this.count + i),
          pr.arraycopy(r, n, this.buf, this.count, i),
          (this.count += i));
      }),
      (t.prototype.writeTo = function (r) {
        r.writeBytesOffset(this.buf, 0, this.count);
      }),
      (t.prototype.reset = function () {
        this.count = 0;
      }),
      (t.prototype.toByteArray = function () {
        return yn.copyOfUint8Array(this.buf, this.count);
      }),
      (t.prototype.size = function () {
        return this.count;
      }),
      (t.prototype.toString = function (r) {
        if (!r) return this.toString_void();
        if (typeof r === "string") return this.toString_string(r);
        return this.toString_number(r);
      }),
      (t.prototype.toString_void = function () {
        return new String(this.buf).toString();
      }),
      (t.prototype.toString_string = function (r) {
        return new String(this.buf).toString();
      }),
      (t.prototype.toString_number = function (r) {
        return new String(this.buf).toString();
      }),
      (t.prototype.close = function () {}),
      t
    );
  })(PU),
  UU = Tae;
var zn;
(function (e) {
  ((e[(e.ALPHA = 0)] = "ALPHA"),
    (e[(e.LOWER = 1)] = "LOWER"),
    (e[(e.MIXED = 2)] = "MIXED"),
    (e[(e.PUNCT = 3)] = "PUNCT"),
    (e[(e.ALPHA_SHIFT = 4)] = "ALPHA_SHIFT"),
    (e[(e.PUNCT_SHIFT = 5)] = "PUNCT_SHIFT"));
})(zn || (zn = {}));
function HU() {
  if (typeof window < "u") return window.BigInt || null;
  if (typeof globalThis < "u") return globalThis.BigInt || null;
  if (typeof self < "u") return self.BigInt || null;
  throw Error("Can't search globals for BigInt!");
}
var Q_;
function gh(e) {
  if (typeof Q_ > "u") Q_ = HU();
  if (Q_ === null) throw Error("BigInt is not supported!");
  return Q_(e);
}
function Eae() {
  var e = [];
  e[0] = gh(1);
  var t = gh(900);
  e[1] = t;
  for (var r = 2; r < 16; r++) e[r] = e[r - 1] * t;
  return e;
}
var Sae = (function () {
    function e() {}
    return (
      (e.decode = function (t, r) {
        var n = new Ot(""),
          i = Jn.ISO8859_1;
        n.enableDecoding(i);
        var o = 1,
          s = t[o++],
          a = new BS();
        while (o < t[0]) {
          switch (s) {
            case e.TEXT_COMPACTION_MODE_LATCH:
              o = e.textCompaction(t, o, n);
              break;
            case e.BYTE_COMPACTION_MODE_LATCH:
            case e.BYTE_COMPACTION_MODE_LATCH_6:
              o = e.byteCompaction(s, t, i, o, n);
              break;
            case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
              n.append(t[o++]);
              break;
            case e.NUMERIC_COMPACTION_MODE_LATCH:
              o = e.numericCompaction(t, o, n);
              break;
            case e.ECI_CHARSET:
              var l = Jn.getCharacterSetECIByValue(t[o++]);
              break;
            case e.ECI_GENERAL_PURPOSE:
              o += 2;
              break;
            case e.ECI_USER_DEFINED:
              o++;
              break;
            case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
              o = e.decodeMacroBlock(t, o, a);
              break;
            case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
            case e.MACRO_PDF417_TERMINATOR:
              throw new De();
            default:
              (o--, (o = e.textCompaction(t, o, n)));
              break;
          }
          if (o < t.length) s = t[o++];
          else throw De.getFormatInstance();
        }
        if (n.length() === 0) throw De.getFormatInstance();
        var c = new La(null, n.toString(), null, r);
        return (c.setOther(a), c);
      }),
      (e.decodeMacroBlock = function (t, r, n) {
        if (r + e.NUMBER_OF_SEQUENCE_CODEWORDS > t[0]) throw De.getFormatInstance();
        var i = new Int32Array(e.NUMBER_OF_SEQUENCE_CODEWORDS);
        for (var o = 0; o < e.NUMBER_OF_SEQUENCE_CODEWORDS; o++, r++) i[o] = t[r];
        n.setSegmentIndex(Ut.parseInt(e.decodeBase900toBase10(i, e.NUMBER_OF_SEQUENCE_CODEWORDS)));
        var s = new Ot();
        ((r = e.textCompaction(t, r, s)), n.setFileId(s.toString()));
        var a = -1;
        if (t[r] === e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD) a = r + 1;
        while (r < t[0])
          switch (t[r]) {
            case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
              switch ((r++, t[r])) {
                case e.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:
                  var l = new Ot();
                  ((r = e.textCompaction(t, r + 1, l)), n.setFileName(l.toString()));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_SENDER:
                  var c = new Ot();
                  ((r = e.textCompaction(t, r + 1, c)), n.setSender(c.toString()));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:
                  var u = new Ot();
                  ((r = e.textCompaction(t, r + 1, u)), n.setAddressee(u.toString()));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:
                  var d = new Ot();
                  ((r = e.numericCompaction(t, r + 1, d)),
                    n.setSegmentCount(Ut.parseInt(d.toString())));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:
                  var h = new Ot();
                  ((r = e.numericCompaction(t, r + 1, h)),
                    n.setTimestamp(FS.parseLong(h.toString())));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:
                  var f = new Ot();
                  ((r = e.numericCompaction(t, r + 1, f)),
                    n.setChecksum(Ut.parseInt(f.toString())));
                  break;
                case e.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:
                  var p = new Ot();
                  ((r = e.numericCompaction(t, r + 1, p)),
                    n.setFileSize(FS.parseLong(p.toString())));
                  break;
                default:
                  throw De.getFormatInstance();
              }
              break;
            case e.MACRO_PDF417_TERMINATOR:
              (r++, n.setLastSegment(!0));
              break;
            default:
              throw De.getFormatInstance();
          }
        if (a !== -1) {
          var g = r - a;
          if (n.isLastSegment()) g--;
          n.setOptionalData(yn.copyOfRange(t, a, a + g));
        }
        return r;
      }),
      (e.textCompaction = function (t, r, n) {
        var i = new Int32Array((t[0] - r) * 2),
          o = new Int32Array((t[0] - r) * 2),
          s = 0,
          a = !1;
        while (r < t[0] && !a) {
          var l = t[r++];
          if (l < e.TEXT_COMPACTION_MODE_LATCH) ((i[s] = l / 30), (i[s + 1] = l % 30), (s += 2));
          else
            switch (l) {
              case e.TEXT_COMPACTION_MODE_LATCH:
                i[s++] = e.TEXT_COMPACTION_MODE_LATCH;
                break;
              case e.BYTE_COMPACTION_MODE_LATCH:
              case e.BYTE_COMPACTION_MODE_LATCH_6:
              case e.NUMERIC_COMPACTION_MODE_LATCH:
              case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
              case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
              case e.MACRO_PDF417_TERMINATOR:
                (r--, (a = !0));
                break;
              case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                ((i[s] = e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE), (l = t[r++]), (o[s] = l), s++);
                break;
            }
        }
        return (e.decodeTextCompaction(i, o, s, n), r);
      }),
      (e.decodeTextCompaction = function (t, r, n, i) {
        var o = zn.ALPHA,
          s = zn.ALPHA,
          a = 0;
        while (a < n) {
          var l = t[a],
            c = "";
          switch (o) {
            case zn.ALPHA:
              if (l < 26) c = String.fromCharCode(65 + l);
              else
                switch (l) {
                  case 26:
                    c = " ";
                    break;
                  case e.LL:
                    o = zn.LOWER;
                    break;
                  case e.ML:
                    o = zn.MIXED;
                    break;
                  case e.PS:
                    ((s = o), (o = zn.PUNCT_SHIFT));
                    break;
                  case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                    i.append(r[a]);
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
            case zn.LOWER:
              if (l < 26) c = String.fromCharCode(97 + l);
              else
                switch (l) {
                  case 26:
                    c = " ";
                    break;
                  case e.AS:
                    ((s = o), (o = zn.ALPHA_SHIFT));
                    break;
                  case e.ML:
                    o = zn.MIXED;
                    break;
                  case e.PS:
                    ((s = o), (o = zn.PUNCT_SHIFT));
                    break;
                  case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                    i.append(r[a]);
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
            case zn.MIXED:
              if (l < e.PL) c = e.MIXED_CHARS[l];
              else
                switch (l) {
                  case e.PL:
                    o = zn.PUNCT;
                    break;
                  case 26:
                    c = " ";
                    break;
                  case e.LL:
                    o = zn.LOWER;
                    break;
                  case e.AL:
                    o = zn.ALPHA;
                    break;
                  case e.PS:
                    ((s = o), (o = zn.PUNCT_SHIFT));
                    break;
                  case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                    i.append(r[a]);
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
            case zn.PUNCT:
              if (l < e.PAL) c = e.PUNCT_CHARS[l];
              else
                switch (l) {
                  case e.PAL:
                    o = zn.ALPHA;
                    break;
                  case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                    i.append(r[a]);
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
            case zn.ALPHA_SHIFT:
              if (((o = s), l < 26)) c = String.fromCharCode(65 + l);
              else
                switch (l) {
                  case 26:
                    c = " ";
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
            case zn.PUNCT_SHIFT:
              if (((o = s), l < e.PAL)) c = e.PUNCT_CHARS[l];
              else
                switch (l) {
                  case e.PAL:
                    o = zn.ALPHA;
                    break;
                  case e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                    i.append(r[a]);
                    break;
                  case e.TEXT_COMPACTION_MODE_LATCH:
                    o = zn.ALPHA;
                    break;
                }
              break;
          }
          if (c !== "") i.append(c);
          a++;
        }
      }),
      (e.byteCompaction = function (t, r, n, i, o) {
        var s = new UU(),
          a = 0,
          l = 0,
          c = !1;
        switch (t) {
          case e.BYTE_COMPACTION_MODE_LATCH:
            var u = new Int32Array(6),
              d = r[i++];
            while (i < r[0] && !c)
              switch (((u[a++] = d), (l = 900 * l + d), (d = r[i++]), d)) {
                case e.TEXT_COMPACTION_MODE_LATCH:
                case e.BYTE_COMPACTION_MODE_LATCH:
                case e.NUMERIC_COMPACTION_MODE_LATCH:
                case e.BYTE_COMPACTION_MODE_LATCH_6:
                case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                case e.MACRO_PDF417_TERMINATOR:
                  (i--, (c = !0));
                  break;
                default:
                  if (a % 5 === 0 && a > 0) {
                    for (var h = 0; h < 6; ++h) s.write(Number(gh(l) >> gh(8 * (5 - h))));
                    ((l = 0), (a = 0));
                  }
                  break;
              }
            if (i === r[0] && d < e.TEXT_COMPACTION_MODE_LATCH) u[a++] = d;
            for (var f = 0; f < a; f++) s.write(u[f]);
            break;
          case e.BYTE_COMPACTION_MODE_LATCH_6:
            while (i < r[0] && !c) {
              var p = r[i++];
              if (p < e.TEXT_COMPACTION_MODE_LATCH) (a++, (l = 900 * l + p));
              else
                switch (p) {
                  case e.TEXT_COMPACTION_MODE_LATCH:
                  case e.BYTE_COMPACTION_MODE_LATCH:
                  case e.NUMERIC_COMPACTION_MODE_LATCH:
                  case e.BYTE_COMPACTION_MODE_LATCH_6:
                  case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                  case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                  case e.MACRO_PDF417_TERMINATOR:
                    (i--, (c = !0));
                    break;
                }
              if (a % 5 === 0 && a > 0) {
                for (var h = 0; h < 6; ++h) s.write(Number(gh(l) >> gh(8 * (5 - h))));
                ((l = 0), (a = 0));
              }
            }
            break;
        }
        return (o.append(ki.decode(s.toByteArray(), n)), i);
      }),
      (e.numericCompaction = function (t, r, n) {
        var i = 0,
          o = !1,
          s = new Int32Array(e.MAX_NUMERIC_CODEWORDS);
        while (r < t[0] && !o) {
          var a = t[r++];
          if (r === t[0]) o = !0;
          if (a < e.TEXT_COMPACTION_MODE_LATCH) ((s[i] = a), i++);
          else
            switch (a) {
              case e.TEXT_COMPACTION_MODE_LATCH:
              case e.BYTE_COMPACTION_MODE_LATCH:
              case e.BYTE_COMPACTION_MODE_LATCH_6:
              case e.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
              case e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
              case e.MACRO_PDF417_TERMINATOR:
                (r--, (o = !0));
                break;
            }
          if (
            (i % e.MAX_NUMERIC_CODEWORDS === 0 || a === e.NUMERIC_COMPACTION_MODE_LATCH || o) &&
            i > 0
          )
            (n.append(e.decodeBase900toBase10(s, i)), (i = 0));
        }
        return r;
      }),
      (e.decodeBase900toBase10 = function (t, r) {
        var n = gh(0);
        for (var i = 0; i < r; i++) n += e.EXP900[r - i - 1] * gh(t[i]);
        var o = n.toString();
        if (o.charAt(0) !== "1") throw new De();
        return o.substring(1);
      }),
      (e.TEXT_COMPACTION_MODE_LATCH = 900),
      (e.BYTE_COMPACTION_MODE_LATCH = 901),
      (e.NUMERIC_COMPACTION_MODE_LATCH = 902),
      (e.BYTE_COMPACTION_MODE_LATCH_6 = 924),
      (e.ECI_USER_DEFINED = 925),
      (e.ECI_GENERAL_PURPOSE = 926),
      (e.ECI_CHARSET = 927),
      (e.BEGIN_MACRO_PDF417_CONTROL_BLOCK = 928),
      (e.BEGIN_MACRO_PDF417_OPTIONAL_FIELD = 923),
      (e.MACRO_PDF417_TERMINATOR = 922),
      (e.MODE_SHIFT_TO_BYTE_COMPACTION_MODE = 913),
      (e.MAX_NUMERIC_CODEWORDS = 15),
      (e.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME = 0),
      (e.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT = 1),
      (e.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP = 2),
      (e.MACRO_PDF417_OPTIONAL_FIELD_SENDER = 3),
      (e.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE = 4),
      (e.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE = 5),
      (e.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM = 6),
      (e.PL = 25),
      (e.LL = 27),
      (e.AS = 27),
      (e.ML = 28),
      (e.AL = 28),
      (e.PS = 29),
      (e.PAL = 29),
      (e.PUNCT_CHARS = `;<>@[\\]_\`~!\r	,:
-.$/"|*()?{}'`),
      (e.MIXED_CHARS = "0123456789&\r\t,:#-.$/+%*=^"),
      (e.EXP900 = HU() ? Eae() : []),
      (e.NUMBER_OF_SEQUENCE_CODEWORDS = 2),
      e
    );
  })(),
  DS = Sae;
var tA = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Mae = (function () {
    function e() {}
    return (
      (e.decode = function (t, r, n, i, o, s, a) {
        var l = new eA(t, r, n, i, o),
          c = null,
          u = null,
          d;
        for (var h = !0; ; h = !1) {
          if (r != null) c = e.getRowIndicatorColumn(t, l, r, !0, s, a);
          if (i != null) u = e.getRowIndicatorColumn(t, l, i, !1, s, a);
          if (((d = e.merge(c, u)), d == null)) throw Ce.getNotFoundInstance();
          var f = d.getBoundingBox();
          if (h && f != null && (f.getMinY() < l.getMinY() || f.getMaxY() > l.getMaxY())) l = f;
          else break;
        }
        d.setBoundingBox(l);
        var p = d.getBarcodeColumnCount() + 1;
        (d.setDetectionResultColumn(0, c), d.setDetectionResultColumn(p, u));
        var g = c != null;
        for (var m = 1; m <= p; m++) {
          var A = g ? m : p - m;
          if (d.getDetectionResultColumn(A) !== void 0) continue;
          var y = void 0;
          if (A === 0 || A === p) y = new LS(l, A === 0);
          else y = new W_(l);
          d.setDetectionResultColumn(A, y);
          var x = -1,
            b = x;
          for (var v = l.getMinY(); v <= l.getMaxY(); v++) {
            if (((x = e.getStartColumn(d, A, v, g)), x < 0 || x > l.getMaxX())) {
              if (b === -1) continue;
              x = b;
            }
            var _ = e.detectCodeword(t, l.getMinX(), l.getMaxX(), g, x, v, s, a);
            if (_ != null)
              (y.setCodeword(v, _),
                (b = x),
                (s = Math.min(s, _.getWidth())),
                (a = Math.max(a, _.getWidth())));
          }
        }
        return e.createDecoderResult(d);
      }),
      (e.merge = function (t, r) {
        if (t == null && r == null) return null;
        var n = e.getBarcodeMetadata(t, r);
        if (n == null) return null;
        var i = eA.merge(e.adjustBoundingBox(t), e.adjustBoundingBox(r));
        return new BU(n, i);
      }),
      (e.adjustBoundingBox = function (t) {
        var r, n;
        if (t == null) return null;
        var i = t.getRowHeights();
        if (i == null) return null;
        var o = e.getMax(i),
          s = 0;
        try {
          for (var a = tA(i), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            if (((s += o - c), c > 0)) break;
          }
        } catch (f) {
          r = { error: f };
        } finally {
          try {
            if (l && !l.done && (n = a.return)) n.call(a);
          } finally {
            if (r) throw r.error;
          }
        }
        var u = t.getCodewords();
        for (var d = 0; s > 0 && u[d] == null; d++) s--;
        var h = 0;
        for (var d = i.length - 1; d >= 0; d--) if (((h += o - i[d]), i[d] > 0)) break;
        for (var d = u.length - 1; h > 0 && u[d] == null; d--) h--;
        return t.getBoundingBox().addMissingRows(s, h, t.isLeft());
      }),
      (e.getMax = function (t) {
        var r,
          n,
          i = -1;
        try {
          for (var o = tA(t), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            i = Math.max(i, a);
          }
        } catch (l) {
          r = { error: l };
        } finally {
          try {
            if (s && !s.done && (n = o.return)) n.call(o);
          } finally {
            if (r) throw r.error;
          }
        }
        return i;
      }),
      (e.getBarcodeMetadata = function (t, r) {
        var n;
        if (t == null || (n = t.getBarcodeMetadata()) == null)
          return r == null ? null : r.getBarcodeMetadata();
        var i;
        if (r == null || (i = r.getBarcodeMetadata()) == null) return n;
        if (
          n.getColumnCount() !== i.getColumnCount() &&
          n.getErrorCorrectionLevel() !== i.getErrorCorrectionLevel() &&
          n.getRowCount() !== i.getRowCount()
        )
          return null;
        return n;
      }),
      (e.getRowIndicatorColumn = function (t, r, n, i, o, s) {
        var a = new LS(r, i);
        for (var l = 0; l < 2; l++) {
          var c = l === 0 ? 1 : -1,
            u = Math.trunc(Math.trunc(n.getX()));
          for (
            var d = Math.trunc(Math.trunc(n.getY()));
            d <= r.getMaxY() && d >= r.getMinY();
            d += c
          ) {
            var h = e.detectCodeword(t, 0, t.getWidth(), i, u, d, o, s);
            if (h != null)
              if ((a.setCodeword(d, h), i)) u = h.getStartX();
              else u = h.getEndX();
          }
        }
        return a;
      }),
      (e.adjustCodewordCount = function (t, r) {
        var n = r[0][1],
          i = n.getValue(),
          o =
            t.getBarcodeColumnCount() * t.getBarcodeRowCount() -
            e.getNumberOfECCodeWords(t.getBarcodeECLevel());
        if (i.length === 0) {
          if (o < 1 || o > Pr.MAX_CODEWORDS_IN_BARCODE) throw Ce.getNotFoundInstance();
          n.setValue(o);
        } else if (i[0] !== o) n.setValue(o);
      }),
      (e.createDecoderResult = function (t) {
        var r = e.createBarcodeMatrix(t);
        e.adjustCodewordCount(t, r);
        var n = [],
          i = new Int32Array(t.getBarcodeRowCount() * t.getBarcodeColumnCount()),
          o = [],
          s = [];
        for (var a = 0; a < t.getBarcodeRowCount(); a++)
          for (var l = 0; l < t.getBarcodeColumnCount(); l++) {
            var c = r[a][l + 1].getValue(),
              u = a * t.getBarcodeColumnCount() + l;
            if (c.length === 0) n.push(u);
            else if (c.length === 1) i[u] = c[0];
            else (s.push(u), o.push(c));
          }
        var d = Array(o.length);
        for (var h = 0; h < d.length; h++) d[h] = o[h];
        return e.createDecoderResultFromAmbiguousValues(
          t.getBarcodeECLevel(),
          i,
          Pr.toIntArray(n),
          Pr.toIntArray(s),
          d,
        );
      }),
      (e.createDecoderResultFromAmbiguousValues = function (t, r, n, i, o) {
        var s = new Int32Array(i.length),
          a = 100;
        while (a-- > 0) {
          for (var l = 0; l < s.length; l++) r[i[l]] = o[l][s[l]];
          try {
            return e.decodeCodewords(r, t, n);
          } catch (u) {
            var c = u instanceof qr;
            if (!c) throw u;
          }
          if (s.length === 0) throw qr.getChecksumInstance();
          for (var l = 0; l < s.length; l++)
            if (s[l] < o[l].length - 1) {
              s[l]++;
              break;
            } else if (((s[l] = 0), l === s.length - 1)) throw qr.getChecksumInstance();
        }
        throw qr.getChecksumInstance();
      }),
      (e.createBarcodeMatrix = function (t) {
        var r,
          n,
          i,
          o,
          s = Array.from({ length: t.getBarcodeRowCount() }, function () {
            return Array(t.getBarcodeColumnCount() + 2);
          });
        for (var a = 0; a < s.length; a++) for (var l = 0; l < s[a].length; l++) s[a][l] = new p0();
        var c = 0;
        try {
          for (var u = tA(t.getDetectionResultColumns()), d = u.next(); !d.done; d = u.next()) {
            var h = d.value;
            if (h != null)
              try {
                for (
                  var f = ((i = void 0), tA(h.getCodewords())), p = f.next();
                  !p.done;
                  p = f.next()
                ) {
                  var g = p.value;
                  if (g != null) {
                    var m = g.getRowNumber();
                    if (m >= 0) {
                      if (m >= s.length) continue;
                      s[m][c].setValue(g.getValue());
                    }
                  }
                }
              } catch (A) {
                i = { error: A };
              } finally {
                try {
                  if (p && !p.done && (o = f.return)) o.call(f);
                } finally {
                  if (i) throw i.error;
                }
              }
            c++;
          }
        } catch (A) {
          r = { error: A };
        } finally {
          try {
            if (d && !d.done && (n = u.return)) n.call(u);
          } finally {
            if (r) throw r.error;
          }
        }
        return s;
      }),
      (e.isValidBarcodeColumn = function (t, r) {
        return r >= 0 && r <= t.getBarcodeColumnCount() + 1;
      }),
      (e.getStartColumn = function (t, r, n, i) {
        var o,
          s,
          a = i ? 1 : -1,
          l = null;
        if (e.isValidBarcodeColumn(t, r - a)) l = t.getDetectionResultColumn(r - a).getCodeword(n);
        if (l != null) return i ? l.getEndX() : l.getStartX();
        if (((l = t.getDetectionResultColumn(r).getCodewordNearby(n)), l != null))
          return i ? l.getStartX() : l.getEndX();
        if (e.isValidBarcodeColumn(t, r - a))
          l = t.getDetectionResultColumn(r - a).getCodewordNearby(n);
        if (l != null) return i ? l.getEndX() : l.getStartX();
        var c = 0;
        while (e.isValidBarcodeColumn(t, r - a)) {
          r -= a;
          try {
            for (
              var u = ((o = void 0), tA(t.getDetectionResultColumn(r).getCodewords())),
                d = u.next();
              !d.done;
              d = u.next()
            ) {
              var h = d.value;
              if (h != null)
                return (i ? h.getEndX() : h.getStartX()) + a * c * (h.getEndX() - h.getStartX());
            }
          } catch (f) {
            o = { error: f };
          } finally {
            try {
              if (d && !d.done && (s = u.return)) s.call(u);
            } finally {
              if (o) throw o.error;
            }
          }
          c++;
        }
        return i ? t.getBoundingBox().getMinX() : t.getBoundingBox().getMaxX();
      }),
      (e.detectCodeword = function (t, r, n, i, o, s, a, l) {
        o = e.adjustCodewordStartColumn(t, r, n, i, o, s);
        var c = e.getModuleBitCount(t, r, n, i, o, s);
        if (c == null) return null;
        var u,
          d = Sr.sum(c);
        if (i) u = o + d;
        else {
          for (var h = 0; h < c.length / 2; h++) {
            var f = c[h];
            ((c[h] = c[c.length - 1 - h]), (c[c.length - 1 - h] = f));
          }
          ((u = o), (o = u - d));
        }
        if (!e.checkCodewordSkew(d, a, l)) return null;
        var p = DU.getDecodedValue(c),
          g = Pr.getCodeword(p);
        if (g === -1) return null;
        return new FU(o, u, e.getCodewordBucketNumber(p), g);
      }),
      (e.getModuleBitCount = function (t, r, n, i, o, s) {
        var a = o,
          l = new Int32Array(8),
          c = 0,
          u = i ? 1 : -1,
          d = i;
        while ((i ? a < n : a >= r) && c < l.length)
          if (t.get(a, s) === d) (l[c]++, (a += u));
          else (c++, (d = !d));
        if (c === l.length || (a === (i ? n : r) && c === l.length - 1)) return l;
        return null;
      }),
      (e.getNumberOfECCodeWords = function (t) {
        return 2 << t;
      }),
      (e.adjustCodewordStartColumn = function (t, r, n, i, o, s) {
        var a = o,
          l = i ? -1 : 1;
        for (var c = 0; c < 2; c++) {
          while ((i ? a >= r : a < n) && i === t.get(a, s)) {
            if (Math.abs(o - a) > e.CODEWORD_SKEW_SIZE) return o;
            a += l;
          }
          ((l = -l), (i = !i));
        }
        return a;
      }),
      (e.checkCodewordSkew = function (t, r, n) {
        return r - e.CODEWORD_SKEW_SIZE <= t && t <= n + e.CODEWORD_SKEW_SIZE;
      }),
      (e.decodeCodewords = function (t, r, n) {
        if (t.length === 0) throw De.getFormatInstance();
        var i = 1 << (r + 1),
          o = e.correctErrors(t, n, i);
        e.verifyCodewordCount(t, i);
        var s = DS.decode(t, "" + r);
        return (s.setErrorsCorrected(o), s.setErasures(n.length), s);
      }),
      (e.correctErrors = function (t, r, n) {
        if ((r != null && r.length > n / 2 + e.MAX_ERRORS) || n < 0 || n > e.MAX_EC_CODEWORDS)
          throw qr.getChecksumInstance();
        return e.errorCorrection.decode(t, n, r);
      }),
      (e.verifyCodewordCount = function (t, r) {
        if (t.length < 4) throw De.getFormatInstance();
        var n = t[0];
        if (n > t.length) throw De.getFormatInstance();
        if (n === 0)
          if (r < t.length) t[0] = t.length - r;
          else throw De.getFormatInstance();
      }),
      (e.getBitCountForCodeword = function (t) {
        var r = new Int32Array(8),
          n = 0,
          i = r.length - 1;
        while (!0) {
          if ((t & 1) !== n) {
            if (((n = t & 1), i--, i < 0)) break;
          }
          (r[i]++, (t >>= 1));
        }
        return r;
      }),
      (e.getCodewordBucketNumber = function (t) {
        if (t instanceof Int32Array) return this.getCodewordBucketNumber_Int32Array(t);
        return this.getCodewordBucketNumber_number(t);
      }),
      (e.getCodewordBucketNumber_number = function (t) {
        return e.getCodewordBucketNumber(e.getBitCountForCodeword(t));
      }),
      (e.getCodewordBucketNumber_Int32Array = function (t) {
        return (t[0] - t[2] + t[4] - t[6] + 9) % 9;
      }),
      (e.toString = function (t) {
        var r = new rm();
        for (var n = 0; n < t.length; n++) {
          r.format("Row %2d: ", n);
          for (var i = 0; i < t[n].length; i++) {
            var o = t[n][i];
            if (o.getValue().length === 0) r.format("        ", null);
            else r.format("%4d(%2d)", o.getValue()[0], o.getConfidence(o.getValue()[0]));
          }
          r.format("%n");
        }
        return r.toString();
      }),
      (e.CODEWORD_SKEW_SIZE = 2),
      (e.MAX_ERRORS = 3),
      (e.MAX_EC_CODEWORDS = 512),
      (e.errorCorrection = new RS()),
      e
    );
  })(),
  GU = Mae;
var Iae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Rae = (function () {
    function e() {}
    return (
      (e.prototype.decode = function (t, r) {
        if (r === void 0) r = null;
        var n = e.decode(t, r, !1);
        if (n == null || n.length === 0 || n[0] == null) throw Ce.getNotFoundInstance();
        return n[0];
      }),
      (e.prototype.decodeMultiple = function (t, r) {
        if (r === void 0) r = null;
        try {
          return e.decode(t, r, !0);
        } catch (n) {
          if (n instanceof De || n instanceof qr) throw Ce.getNotFoundInstance();
          throw n;
        }
      }),
      (e.decode = function (t, r, n) {
        var i,
          o,
          s = [],
          a = IU.detectMultiple(t, r, n);
        try {
          for (var l = Iae(a.getPoints()), c = l.next(); !c.done; c = l.next()) {
            var u = c.value,
              d = GU.decode(
                a.getBits(),
                u[4],
                u[5],
                u[6],
                u[7],
                e.getMinCodewordWidth(u),
                e.getMaxCodewordWidth(u),
              ),
              h = new Xr(d.getText(), d.getRawBytes(), void 0, u, at.PDF_417);
            h.putMetadata(hn.ERROR_CORRECTION_LEVEL, d.getECLevel());
            var f = d.getOther();
            if (f != null) h.putMetadata(hn.PDF417_EXTRA_METADATA, f);
            s.push(h);
          }
        } catch (p) {
          i = { error: p };
        } finally {
          try {
            if (c && !c.done && (o = l.return)) o.call(l);
          } finally {
            if (i) throw i.error;
          }
        }
        return s.map(function (p) {
          return p;
        });
      }),
      (e.getMaxWidth = function (t, r) {
        if (t == null || r == null) return 0;
        return Math.trunc(Math.abs(t.getX() - r.getX()));
      }),
      (e.getMinWidth = function (t, r) {
        if (t == null || r == null) return Ut.MAX_VALUE;
        return Math.trunc(Math.abs(t.getX() - r.getX()));
      }),
      (e.getMaxCodewordWidth = function (t) {
        return Math.floor(
          Math.max(
            Math.max(
              e.getMaxWidth(t[0], t[4]),
              (e.getMaxWidth(t[6], t[2]) * Pr.MODULES_IN_CODEWORD) / Pr.MODULES_IN_STOP_PATTERN,
            ),
            Math.max(
              e.getMaxWidth(t[1], t[5]),
              (e.getMaxWidth(t[7], t[3]) * Pr.MODULES_IN_CODEWORD) / Pr.MODULES_IN_STOP_PATTERN,
            ),
          ),
        );
      }),
      (e.getMinCodewordWidth = function (t) {
        return Math.floor(
          Math.min(
            Math.min(
              e.getMinWidth(t[0], t[4]),
              (e.getMinWidth(t[6], t[2]) * Pr.MODULES_IN_CODEWORD) / Pr.MODULES_IN_STOP_PATTERN,
            ),
            Math.min(
              e.getMinWidth(t[1], t[5]),
              (e.getMinWidth(t[7], t[3]) * Pr.MODULES_IN_CODEWORD) / Pr.MODULES_IN_STOP_PATTERN,
            ),
          ),
        );
      }),
      (e.prototype.reset = function () {}),
      e
    );
  })(),
  Ah = Rae;
var Oae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Lae = (function (e) {
    Oae(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "ReaderException"), t);
  })(Bn),
  Y_ = Lae;
var zU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Bae = (function () {
    function e() {}
    return (
      (e.prototype.decode = function (t, r) {
        if (this.hints !== r) this.setHints(r);
        return this.decodeInternal(t);
      }),
      (e.prototype.decodeWithState = function (t) {
        if (this.readers === null || this.readers === void 0) this.setHints(null);
        return this.decodeInternal(t);
      }),
      (e.prototype.setHints = function (t) {
        this.hints = t;
        var r = t !== null && t !== void 0 && t.get(nr.TRY_HARDER) !== void 0,
          n = t === null || t === void 0 ? null : t.get(nr.POSSIBLE_FORMATS),
          i = [];
        if (n !== null && n !== void 0) {
          var o = n.some(function (s) {
            return (
              s === at.UPC_A ||
              s === at.UPC_E ||
              s === at.EAN_13 ||
              s === at.EAN_8 ||
              s === at.CODABAR ||
              s === at.CODE_39 ||
              s === at.CODE_93 ||
              s === at.CODE_128 ||
              s === at.ITF ||
              s === at.RSS_14 ||
              s === at.RSS_EXPANDED
            );
          });
          if (o && !r) i.push(new Lc(t));
          if (n.includes(at.QR_CODE)) i.push(new mh());
          if (n.includes(at.MICRO_QR_CODE)) i.push(new z_());
          if (n.includes(at.DATA_MATRIX)) i.push(new ph());
          if (n.includes(at.AZTEC)) i.push(new uh());
          if (n.includes(at.PDF_417)) i.push(new Ah());
          if (n.includes(at.MAXICODE)) i.push(new V_());
          if (o && r) i.push(new Lc(t));
        }
        if (i.length === 0) {
          if (!r) i.push(new Lc(t));
          if (
            (i.push(new mh()),
            i.push(new z_()),
            i.push(new ph()),
            i.push(new uh()),
            i.push(new Ah()),
            i.push(new V_()),
            r)
          )
            i.push(new Lc(t));
        }
        this.readers = i;
      }),
      (e.prototype.reset = function () {
        var t, r;
        if (this.readers !== null)
          try {
            for (var n = zU(this.readers), i = n.next(); !i.done; i = n.next()) {
              var o = i.value;
              o.reset();
            }
          } catch (s) {
            t = { error: s };
          } finally {
            try {
              if (i && !i.done && (r = n.return)) r.call(n);
            } finally {
              if (t) throw t.error;
            }
          }
      }),
      (e.prototype.decodeInternal = function (t) {
        var r, n;
        if (this.readers === null) throw new Y_("No readers where selected, nothing can be read.");
        try {
          for (var i = zU(this.readers), o = i.next(); !o.done; o = i.next()) {
            var s = o.value;
            try {
              return s.decode(t, this.hints);
            } catch (a) {
              if (a instanceof Y_) continue;
              continue;
            }
          }
        } catch (a) {
          r = { error: a };
        } finally {
          try {
            if (o && !o.done && (n = i.return)) n.call(i);
          } finally {
            if (r) throw r.error;
          }
        }
        throw new Ce("No MultiFormat Readers were able to detect the code.");
      }),
      e
    );
  })(),
  rA = Bae;
var Fae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  zLe = (function (e) {
    Fae(t, e);
    function t(r, n) {
      if (r === void 0) r = null;
      if (n === void 0) n = 500;
      var i = new rA();
      return (i.setHints(r), e.call(this, i, n) || this);
    }
    return (
      Object.defineProperty(t.prototype, "hints", {
        set: function (r) {
          ((this._hints = r || null), this.reader.setHints(r));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.decodeBitmap = function (r) {
        try {
          return this.reader.decodeWithState(r);
        } finally {
          this.reader.reset();
        }
      }),
      t
    );
  })(gl);
var Dae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  YLe = (function (e) {
    Dae(t, e);
    function t(r) {
      if (r === void 0) r = 500;
      return e.call(this, new Ah(), r) || this;
    }
    return t;
  })(gl);
var Nae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  qLe = (function (e) {
    Nae(t, e);
    function t(r) {
      if (r === void 0) r = 500;
      return e.call(this, new mh(), r) || this;
    }
    return t;
  })(gl);
var NS;
(function (e) {
  ((e[(e.ERROR_CORRECTION = 0)] = "ERROR_CORRECTION"),
    (e[(e.CHARACTER_SET = 1)] = "CHARACTER_SET"),
    (e[(e.DATA_MATRIX_SHAPE = 2)] = "DATA_MATRIX_SHAPE"),
    (e[(e.DATA_MATRIX_COMPACT = 3)] = "DATA_MATRIX_COMPACT"),
    (e[(e.MIN_SIZE = 4)] = "MIN_SIZE"),
    (e[(e.MAX_SIZE = 5)] = "MAX_SIZE"),
    (e[(e.MARGIN = 6)] = "MARGIN"),
    (e[(e.PDF417_COMPACT = 7)] = "PDF417_COMPACT"),
    (e[(e.PDF417_COMPACTION = 8)] = "PDF417_COMPACTION"),
    (e[(e.PDF417_DIMENSIONS = 9)] = "PDF417_DIMENSIONS"),
    (e[(e.AZTEC_LAYERS = 10)] = "AZTEC_LAYERS"),
    (e[(e.QR_VERSION = 11)] = "QR_VERSION"),
    (e[(e.GS1_FORMAT = 12)] = "GS1_FORMAT"),
    (e[(e.FORCE_C40 = 13)] = "FORCE_C40"));
})(NS || (NS = {}));
var br = NS;
var Pae = (function () {
    function e(t) {
      ((this.field = t),
        (this.cachedGenerators = []),
        this.cachedGenerators.push(new Al(t, Int32Array.from([1]))));
    }
    return (
      (e.prototype.buildGenerator = function (t) {
        var r = this.cachedGenerators;
        if (t >= r.length) {
          var n = r[r.length - 1],
            i = this.field;
          for (var o = r.length; o <= t; o++) {
            var s = n.multiply(
              new Al(i, Int32Array.from([1, i.exp(o - 1 + i.getGeneratorBase())])),
            );
            (r.push(s), (n = s));
          }
        }
        return r[t];
      }),
      (e.prototype.encode = function (t, r) {
        if (r === 0) throw new nt("No error correction bytes");
        var n = t.length - r;
        if (n <= 0) throw new nt("No data bytes provided");
        var i = this.buildGenerator(r),
          o = new Int32Array(n);
        pr.arraycopy(t, 0, o, 0, n);
        var s = new Al(this.field, o);
        s = s.multiplyByMonomial(r, 1);
        var a = s.divide(i)[1],
          l = a.getCoefficients(),
          c = r - l.length;
        for (var u = 0; u < c; u++) t[n + u] = 0;
        pr.arraycopy(l, 0, t, n + c, l.length);
      }),
      e
    );
  })(),
  nA = Pae;
var kae = (function () {
    function e() {}
    return (
      (e.applyMaskPenaltyRule1 = function (t) {
        return e.applyMaskPenaltyRule1Internal(t, !0) + e.applyMaskPenaltyRule1Internal(t, !1);
      }),
      (e.applyMaskPenaltyRule2 = function (t) {
        var r = 0,
          n = t.getArray(),
          i = t.getWidth(),
          o = t.getHeight();
        for (var s = 0; s < o - 1; s++) {
          var a = n[s];
          for (var l = 0; l < i - 1; l++) {
            var c = a[l];
            if (c === a[l + 1] && c === n[s + 1][l] && c === n[s + 1][l + 1]) r++;
          }
        }
        return e.N2 * r;
      }),
      (e.applyMaskPenaltyRule3 = function (t) {
        var r = 0,
          n = t.getArray(),
          i = t.getWidth(),
          o = t.getHeight();
        for (var s = 0; s < o; s++)
          for (var a = 0; a < i; a++) {
            var l = n[s];
            if (
              a + 6 < i &&
              l[a] === 1 &&
              l[a + 1] === 0 &&
              l[a + 2] === 1 &&
              l[a + 3] === 1 &&
              l[a + 4] === 1 &&
              l[a + 5] === 0 &&
              l[a + 6] === 1 &&
              (e.isWhiteHorizontal(l, a - 4, a) || e.isWhiteHorizontal(l, a + 7, a + 11))
            )
              r++;
            if (
              s + 6 < o &&
              n[s][a] === 1 &&
              n[s + 1][a] === 0 &&
              n[s + 2][a] === 1 &&
              n[s + 3][a] === 1 &&
              n[s + 4][a] === 1 &&
              n[s + 5][a] === 0 &&
              n[s + 6][a] === 1 &&
              (e.isWhiteVertical(n, a, s - 4, s) || e.isWhiteVertical(n, a, s + 7, s + 11))
            )
              r++;
          }
        return r * e.N3;
      }),
      (e.isWhiteHorizontal = function (t, r, n) {
        ((r = Math.max(r, 0)), (n = Math.min(n, t.length)));
        for (var i = r; i < n; i++) if (t[i] === 1) return !1;
        return !0;
      }),
      (e.isWhiteVertical = function (t, r, n, i) {
        ((n = Math.max(n, 0)), (i = Math.min(i, t.length)));
        for (var o = n; o < i; o++) if (t[o][r] === 1) return !1;
        return !0;
      }),
      (e.applyMaskPenaltyRule4 = function (t) {
        var r = 0,
          n = t.getArray(),
          i = t.getWidth(),
          o = t.getHeight();
        for (var s = 0; s < o; s++) {
          var a = n[s];
          for (var l = 0; l < i; l++) if (a[l] === 1) r++;
        }
        var c = t.getHeight() * t.getWidth(),
          u = Math.floor((Math.abs(r * 2 - c) * 10) / c);
        return u * e.N4;
      }),
      (e.getDataMaskBit = function (t, r, n) {
        var i, o;
        switch (t) {
          case 0:
            i = (n + r) & 1;
            break;
          case 1:
            i = n & 1;
            break;
          case 2:
            i = r % 3;
            break;
          case 3:
            i = (n + r) % 3;
            break;
          case 4:
            i = (Math.floor(n / 2) + Math.floor(r / 3)) & 1;
            break;
          case 5:
            ((o = n * r), (i = (o & 1) + (o % 3)));
            break;
          case 6:
            ((o = n * r), (i = ((o & 1) + (o % 3)) & 1));
            break;
          case 7:
            ((o = n * r), (i = ((o % 3) + ((n + r) & 1)) & 1));
            break;
          default:
            throw new nt("Invalid mask pattern: " + t);
        }
        return i === 0;
      }),
      (e.applyMaskPenaltyRule1Internal = function (t, r) {
        var n = 0,
          i = r ? t.getHeight() : t.getWidth(),
          o = r ? t.getWidth() : t.getHeight(),
          s = t.getArray();
        for (var a = 0; a < i; a++) {
          var l = 0,
            c = -1;
          for (var u = 0; u < o; u++) {
            var d = r ? s[a][u] : s[u][a];
            if (d === c) l++;
            else {
              if (l >= 5) n += e.N1 + (l - 5);
              ((l = 1), (c = d));
            }
          }
          if (l >= 5) n += e.N1 + (l - 5);
        }
        return n;
      }),
      (e.N1 = 3),
      (e.N2 = 3),
      (e.N3 = 40),
      (e.N4 = 10),
      e
    );
  })(),
  yh = kae;
var Uae = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Hae = (function () {
    function e(t, r) {
      ((this.width = t), (this.height = r));
      var n = Array(r);
      for (var i = 0; i !== r; i++) n[i] = new Uint8Array(t);
      this.bytes = n;
    }
    return (
      (e.prototype.getHeight = function () {
        return this.height;
      }),
      (e.prototype.getWidth = function () {
        return this.width;
      }),
      (e.prototype.get = function (t, r) {
        return this.bytes[r][t];
      }),
      (e.prototype.getArray = function () {
        return this.bytes;
      }),
      (e.prototype.setNumber = function (t, r, n) {
        this.bytes[r][t] = n;
      }),
      (e.prototype.setBoolean = function (t, r, n) {
        this.bytes[r][t] = n ? 1 : 0;
      }),
      (e.prototype.clear = function (t) {
        var r, n;
        try {
          for (var i = Uae(this.bytes), o = i.next(); !o.done; o = i.next()) {
            var s = o.value;
            yn.fill(s, t);
          }
        } catch (a) {
          r = { error: a };
        } finally {
          try {
            if (o && !o.done && (n = i.return)) n.call(i);
          } finally {
            if (r) throw r.error;
          }
        }
      }),
      (e.prototype.equals = function (t) {
        if (!(t instanceof e)) return !1;
        var r = t;
        if (this.width !== r.width) return !1;
        if (this.height !== r.height) return !1;
        for (var n = 0, i = this.height; n < i; ++n) {
          var o = this.bytes[n],
            s = r.bytes[n];
          for (var a = 0, l = this.width; a < l; ++a) if (o[a] !== s[a]) return !1;
        }
        return !0;
      }),
      (e.prototype.toString = function () {
        var t = new Ot();
        for (var r = 0, n = this.height; r < n; ++r) {
          var i = this.bytes[r];
          for (var o = 0, s = this.width; o < s; ++o)
            switch (i[o]) {
              case 0:
                t.append(" 0");
                break;
              case 1:
                t.append(" 1");
                break;
              default:
                t.append("  ");
                break;
            }
          t.append(`
`);
        }
        return t.toString();
      }),
      e
    );
  })(),
  iA = Hae;
var Gae = (function () {
    function e() {
      this.maskPattern = -1;
    }
    return (
      (e.prototype.getMode = function () {
        return this.mode;
      }),
      (e.prototype.getECLevel = function () {
        return this.ecLevel;
      }),
      (e.prototype.getVersion = function () {
        return this.version;
      }),
      (e.prototype.getMaskPattern = function () {
        return this.maskPattern;
      }),
      (e.prototype.getMatrix = function () {
        return this.matrix;
      }),
      (e.prototype.toString = function () {
        var t = new Ot();
        if (
          (t.append(`<<
`),
          t.append(" mode: "),
          t.append(this.mode ? this.mode.toString() : "null"),
          t.append(`
 ecLevel: `),
          t.append(this.ecLevel ? this.ecLevel.toString() : "null"),
          t.append(`
 version: `),
          t.append(this.version ? this.version.toString() : "null"),
          t.append(`
 maskPattern: `),
          t.append(this.maskPattern.toString()),
          this.matrix)
        )
          (t.append(`
 matrix:
`),
            t.append(this.matrix.toString()));
        else
          t.append(`
 matrix: null
`);
        return (
          t.append(`>>
`),
          t.toString()
        );
      }),
      (e.prototype.setMode = function (t) {
        this.mode = t;
      }),
      (e.prototype.setECLevel = function (t) {
        this.ecLevel = t;
      }),
      (e.prototype.setVersion = function (t) {
        this.version = t;
      }),
      (e.prototype.setMaskPattern = function (t) {
        this.maskPattern = t;
      }),
      (e.prototype.setMatrix = function (t) {
        this.matrix = t;
      }),
      (e.isValidMaskPattern = function (t) {
        return t >= 0 && t < e.NUM_MASK_PATTERNS;
      }),
      (e.NUM_MASK_PATTERNS = 8),
      e
    );
  })(),
  nm = Gae;
var zae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Vae = (function (e) {
    zae(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return ((t.kind = "WriterException"), t);
  })(Bn),
  Vn = Vae;
var Wae = (function () {
    function e() {}
    return (
      (e.clearMatrix = function (t) {
        t.clear(255);
      }),
      (e.buildMatrix = function (t, r, n, i, o) {
        (e.clearMatrix(o),
          e.embedBasicPatterns(n, o),
          e.embedTypeInfo(r, i, o),
          e.maybeEmbedVersionInfo(n, o),
          e.embedDataBits(t, i, o));
      }),
      (e.embedBasicPatterns = function (t, r) {
        (e.embedPositionDetectionPatternsAndSeparators(r),
          e.embedDarkDotAtLeftBottomCorner(r),
          e.maybeEmbedPositionAdjustmentPatterns(t, r),
          e.embedTimingPatterns(r));
      }),
      (e.embedTypeInfo = function (t, r, n) {
        var i = new $n();
        e.makeTypeInfoBits(t, r, i);
        for (var o = 0, s = i.getSize(); o < s; ++o) {
          var a = i.get(i.getSize() - 1 - o),
            l = e.TYPE_INFO_COORDINATES[o],
            c = l[0],
            u = l[1];
          if ((n.setBoolean(c, u, a), o < 8)) {
            var d = n.getWidth() - o - 1,
              h = 8;
            n.setBoolean(d, h, a);
          } else {
            var d = 8,
              h = n.getHeight() - 7 + (o - 8);
            n.setBoolean(d, h, a);
          }
        }
      }),
      (e.maybeEmbedVersionInfo = function (t, r) {
        if (t.getVersionNumber() < 7) return;
        var n = new $n();
        e.makeVersionInfoBits(t, n);
        var i = 17;
        for (var o = 0; o < 6; ++o)
          for (var s = 0; s < 3; ++s) {
            var a = n.get(i);
            (i--,
              r.setBoolean(o, r.getHeight() - 11 + s, a),
              r.setBoolean(r.getHeight() - 11 + s, o, a));
          }
      }),
      (e.embedDataBits = function (t, r, n) {
        var i = 0,
          o = -1,
          s = n.getWidth() - 1,
          a = n.getHeight() - 1;
        while (s > 0) {
          if (s === 6) s -= 1;
          while (a >= 0 && a < n.getHeight()) {
            for (var l = 0; l < 2; ++l) {
              var c = s - l;
              if (!e.isEmpty(n.get(c, a))) continue;
              var u = void 0;
              if (i < t.getSize()) ((u = t.get(i)), ++i);
              else u = !1;
              if (r !== 255 && yh.getDataMaskBit(r, c, a)) u = !u;
              n.setBoolean(c, a, u);
            }
            a += o;
          }
          ((o = -o), (a += o), (s -= 2));
        }
        if (i !== t.getSize()) throw new Vn("Not all bits consumed: " + i + "/" + t.getSize());
      }),
      (e.findMSBSet = function (t) {
        return 32 - Ut.numberOfLeadingZeros(t);
      }),
      (e.calculateBCHCode = function (t, r) {
        if (r === 0) throw new nt("0 polynomial");
        var n = e.findMSBSet(r);
        t <<= n - 1;
        while (e.findMSBSet(t) >= n) t ^= r << (e.findMSBSet(t) - n);
        return t;
      }),
      (e.makeTypeInfoBits = function (t, r, n) {
        if (!nm.isValidMaskPattern(r)) throw new Vn("Invalid mask pattern");
        var i = (t.getBits() << 3) | r;
        n.appendBits(i, 5);
        var o = e.calculateBCHCode(i, e.TYPE_INFO_POLY);
        n.appendBits(o, 10);
        var s = new $n();
        if ((s.appendBits(e.TYPE_INFO_MASK_PATTERN, 15), n.xor(s), n.getSize() !== 15))
          throw new Vn("should not happen but we got: " + n.getSize());
      }),
      (e.makeVersionInfoBits = function (t, r) {
        r.appendBits(t.getVersionNumber(), 6);
        var n = e.calculateBCHCode(t.getVersionNumber(), e.VERSION_INFO_POLY);
        if ((r.appendBits(n, 12), r.getSize() !== 18))
          throw new Vn("should not happen but we got: " + r.getSize());
      }),
      (e.isEmpty = function (t) {
        return t === 255;
      }),
      (e.embedTimingPatterns = function (t) {
        for (var r = 8; r < t.getWidth() - 8; ++r) {
          var n = (r + 1) % 2;
          if (e.isEmpty(t.get(r, 6))) t.setNumber(r, 6, n);
          if (e.isEmpty(t.get(6, r))) t.setNumber(6, r, n);
        }
      }),
      (e.embedDarkDotAtLeftBottomCorner = function (t) {
        if (t.get(8, t.getHeight() - 8) === 0) throw new Vn();
        t.setNumber(8, t.getHeight() - 8, 1);
      }),
      (e.embedHorizontalSeparationPattern = function (t, r, n) {
        for (var i = 0; i < 8; ++i) {
          if (!e.isEmpty(n.get(t + i, r))) throw new Vn();
          n.setNumber(t + i, r, 0);
        }
      }),
      (e.embedVerticalSeparationPattern = function (t, r, n) {
        for (var i = 0; i < 7; ++i) {
          if (!e.isEmpty(n.get(t, r + i))) throw new Vn();
          n.setNumber(t, r + i, 0);
        }
      }),
      (e.embedPositionAdjustmentPattern = function (t, r, n) {
        for (var i = 0; i < 5; ++i) {
          var o = e.POSITION_ADJUSTMENT_PATTERN[i];
          for (var s = 0; s < 5; ++s) n.setNumber(t + s, r + i, o[s]);
        }
      }),
      (e.embedPositionDetectionPattern = function (t, r, n) {
        for (var i = 0; i < 7; ++i) {
          var o = e.POSITION_DETECTION_PATTERN[i];
          for (var s = 0; s < 7; ++s) n.setNumber(t + s, r + i, o[s]);
        }
      }),
      (e.embedPositionDetectionPatternsAndSeparators = function (t) {
        var r = e.POSITION_DETECTION_PATTERN[0].length;
        (e.embedPositionDetectionPattern(0, 0, t),
          e.embedPositionDetectionPattern(t.getWidth() - r, 0, t),
          e.embedPositionDetectionPattern(0, t.getWidth() - r, t));
        var n = 8;
        (e.embedHorizontalSeparationPattern(0, n - 1, t),
          e.embedHorizontalSeparationPattern(t.getWidth() - n, n - 1, t),
          e.embedHorizontalSeparationPattern(0, t.getWidth() - n, t));
        var i = 7;
        (e.embedVerticalSeparationPattern(i, 0, t),
          e.embedVerticalSeparationPattern(t.getHeight() - i - 1, 0, t),
          e.embedVerticalSeparationPattern(i, t.getHeight() - i, t));
      }),
      (e.maybeEmbedPositionAdjustmentPatterns = function (t, r) {
        if (t.getVersionNumber() < 2) return;
        var n = t.getVersionNumber() - 1,
          i = e.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[n];
        for (var o = 0, s = i.length; o !== s; o++) {
          var a = i[o];
          if (a >= 0)
            for (var l = 0; l !== s; l++) {
              var c = i[l];
              if (c >= 0 && e.isEmpty(r.get(c, a)))
                e.embedPositionAdjustmentPattern(c - 2, a - 2, r);
            }
        }
      }),
      (e.POSITION_DETECTION_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
      ])),
      (e.POSITION_ADJUSTMENT_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1]),
      ])),
      (e.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE = Array.from([
        Int32Array.from([-1, -1, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 18, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 26, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 30, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 34, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, 38, -1, -1, -1, -1]),
        Int32Array.from([6, 24, 42, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, -1, -1, -1, -1]),
        Int32Array.from([6, 28, 50, -1, -1, -1, -1]),
        Int32Array.from([6, 30, 54, -1, -1, -1, -1]),
        Int32Array.from([6, 32, 58, -1, -1, -1, -1]),
        Int32Array.from([6, 34, 62, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, 66, -1, -1, -1]),
        Int32Array.from([6, 26, 48, 70, -1, -1, -1]),
        Int32Array.from([6, 26, 50, 74, -1, -1, -1]),
        Int32Array.from([6, 30, 54, 78, -1, -1, -1]),
        Int32Array.from([6, 30, 56, 82, -1, -1, -1]),
        Int32Array.from([6, 30, 58, 86, -1, -1, -1]),
        Int32Array.from([6, 34, 62, 90, -1, -1, -1]),
        Int32Array.from([6, 28, 50, 72, 94, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, -1, -1]),
        Int32Array.from([6, 30, 54, 78, 102, -1, -1]),
        Int32Array.from([6, 28, 54, 80, 106, -1, -1]),
        Int32Array.from([6, 32, 58, 84, 110, -1, -1]),
        Int32Array.from([6, 30, 58, 86, 114, -1, -1]),
        Int32Array.from([6, 34, 62, 90, 118, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, 122, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, -1]),
        Int32Array.from([6, 26, 52, 78, 104, 130, -1]),
        Int32Array.from([6, 30, 56, 82, 108, 134, -1]),
        Int32Array.from([6, 34, 60, 86, 112, 138, -1]),
        Int32Array.from([6, 30, 58, 86, 114, 142, -1]),
        Int32Array.from([6, 34, 62, 90, 118, 146, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, 150]),
        Int32Array.from([6, 24, 50, 76, 102, 128, 154]),
        Int32Array.from([6, 28, 54, 80, 106, 132, 158]),
        Int32Array.from([6, 32, 58, 84, 110, 136, 162]),
        Int32Array.from([6, 26, 54, 82, 110, 138, 166]),
        Int32Array.from([6, 30, 58, 86, 114, 142, 170]),
      ])),
      (e.TYPE_INFO_COORDINATES = Array.from([
        Int32Array.from([8, 0]),
        Int32Array.from([8, 1]),
        Int32Array.from([8, 2]),
        Int32Array.from([8, 3]),
        Int32Array.from([8, 4]),
        Int32Array.from([8, 5]),
        Int32Array.from([8, 7]),
        Int32Array.from([8, 8]),
        Int32Array.from([7, 8]),
        Int32Array.from([5, 8]),
        Int32Array.from([4, 8]),
        Int32Array.from([3, 8]),
        Int32Array.from([2, 8]),
        Int32Array.from([1, 8]),
        Int32Array.from([0, 8]),
      ])),
      (e.VERSION_INFO_POLY = 7973),
      (e.TYPE_INFO_POLY = 1335),
      (e.TYPE_INFO_MASK_PATTERN = 21522),
      e
    );
  })(),
  X_ = Wae;
var Qae = (function () {
    function e(t, r) {
      ((this.dataBytes = t), (this.errorCorrectionBytes = r));
    }
    return (
      (e.prototype.getDataBytes = function () {
        return this.dataBytes;
      }),
      (e.prototype.getErrorCorrectionBytes = function () {
        return this.errorCorrectionBytes;
      }),
      e
    );
  })(),
  VU = Qae;
var WU = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Yae = (function () {
    function e() {}
    return (
      (e.calculateMaskPenalty = function (t) {
        return (
          yh.applyMaskPenaltyRule1(t) +
          yh.applyMaskPenaltyRule2(t) +
          yh.applyMaskPenaltyRule3(t) +
          yh.applyMaskPenaltyRule4(t)
        );
      }),
      (e.encode = function (t, r, n) {
        if (n === void 0) n = null;
        var i = e.DEFAULT_BYTE_MODE_ENCODING,
          o = n !== null && n.get(br.CHARACTER_SET) !== void 0;
        if (o) i = n.get(br.CHARACTER_SET).toString();
        var s = this.chooseMode(t, i),
          a = new $n();
        if (s === Gn.BYTE && (o || e.DEFAULT_BYTE_MODE_ENCODING !== i)) {
          var l = Jn.getCharacterSetECIByName(i);
          if (l !== void 0) this.appendECI(l, a);
        }
        this.appendModeInfo(s, a);
        var c = new $n();
        this.appendBytes(t, s, c, i);
        var u;
        if (n !== null && n.get(br.QR_VERSION) !== void 0) {
          var d = Number.parseInt(n.get(br.QR_VERSION).toString(), 10);
          u = Jl.getVersionForNumber(d);
          var h = this.calculateBitsNeeded(s, a, c, u);
          if (!this.willFit(h, u, r)) throw new Vn("Data too big for requested version");
        } else u = this.recommendVersion(r, s, a, c);
        var f = new $n();
        f.appendBitArray(a);
        var p = s === Gn.BYTE ? c.getSizeInBytes() : t.length;
        (this.appendLengthInfo(p, u, s, f), f.appendBitArray(c));
        var g = u.getECBlocksForLevel(r),
          m = u.getTotalCodewords() - g.getTotalECCodewords();
        this.terminateBits(m, f);
        var A = this.interleaveWithECBytes(f, u.getTotalCodewords(), m, g.getNumBlocks()),
          y = new nm();
        (y.setECLevel(r), y.setMode(s), y.setVersion(u));
        var x = u.getDimensionForVersion(),
          b = new iA(x, x),
          v = this.chooseMaskPattern(A, r, u, b);
        return (y.setMaskPattern(v), X_.buildMatrix(A, r, u, v, b), y.setMatrix(b), y);
      }),
      (e.recommendVersion = function (t, r, n, i) {
        var o = this.calculateBitsNeeded(r, n, i, Jl.getVersionForNumber(1)),
          s = this.chooseVersion(o, t),
          a = this.calculateBitsNeeded(r, n, i, s);
        return this.chooseVersion(a, t);
      }),
      (e.calculateBitsNeeded = function (t, r, n, i) {
        return r.getSize() + t.getCharacterCountBits(i) + n.getSize();
      }),
      (e.getAlphanumericCode = function (t) {
        if (t < e.ALPHANUMERIC_TABLE.length) return e.ALPHANUMERIC_TABLE[t];
        return -1;
      }),
      (e.chooseMode = function (t, r) {
        if (r === void 0) r = null;
        if (Jn.SJIS.getName() === r && this.isOnlyDoubleByteKanji(t)) return Gn.KANJI;
        var n = !1,
          i = !1;
        for (var o = 0, s = t.length; o < s; ++o) {
          var a = t.charAt(o);
          if (e.isDigit(a)) n = !0;
          else if (this.getAlphanumericCode(a.charCodeAt(0)) !== -1) i = !0;
          else return Gn.BYTE;
        }
        if (i) return Gn.ALPHANUMERIC;
        if (n) return Gn.NUMERIC;
        return Gn.BYTE;
      }),
      (e.isOnlyDoubleByteKanji = function (t) {
        var r;
        try {
          r = ki.encode(t, Jn.SJIS);
        } catch (s) {
          return !1;
        }
        var n = r.length;
        if (n % 2 !== 0) return !1;
        for (var i = 0; i < n; i += 2) {
          var o = r[i] & 255;
          if ((o < 129 || o > 159) && (o < 224 || o > 235)) return !1;
        }
        return !0;
      }),
      (e.chooseMaskPattern = function (t, r, n, i) {
        var o = Number.MAX_SAFE_INTEGER,
          s = -1;
        for (var a = 0; a < nm.NUM_MASK_PATTERNS; a++) {
          X_.buildMatrix(t, r, n, a, i);
          var l = this.calculateMaskPenalty(i);
          if (l < o) ((o = l), (s = a));
        }
        return s;
      }),
      (e.chooseVersion = function (t, r) {
        for (var n = 1; n <= 40; n++) {
          var i = Jl.getVersionForNumber(n);
          if (e.willFit(t, i, r)) return i;
        }
        throw new Vn("Data too big");
      }),
      (e.willFit = function (t, r, n) {
        var i = r.getTotalCodewords(),
          o = r.getECBlocksForLevel(n),
          s = o.getTotalECCodewords(),
          a = i - s,
          l = (t + 7) / 8;
        return a >= l;
      }),
      (e.terminateBits = function (t, r) {
        var n = t * 8;
        if (r.getSize() > n)
          throw new Vn("data bits cannot fit in the QR Code" + r.getSize() + " > " + n);
        for (var i = 0; i < 4 && r.getSize() < n; ++i) r.appendBit(!1);
        var o = r.getSize() & 7;
        if (o > 0) for (var i = o; i < 8; i++) r.appendBit(!1);
        var s = t - r.getSizeInBytes();
        for (var i = 0; i < s; ++i) r.appendBits((i & 1) === 0 ? 236 : 17, 8);
        if (r.getSize() !== n) throw new Vn("Bits size does not equal capacity");
      }),
      (e.getNumDataBytesAndNumECBytesForBlockID = function (t, r, n, i, o, s) {
        if (i >= n) throw new Vn("Block ID too large");
        var a = t % n,
          l = n - a,
          c = Math.floor(t / n),
          u = c + 1,
          d = Math.floor(r / n),
          h = d + 1,
          f = c - d,
          p = u - h;
        if (f !== p) throw new Vn("EC bytes mismatch");
        if (n !== l + a) throw new Vn("RS blocks mismatch");
        if (t !== (d + f) * l + (h + p) * a) throw new Vn("Total bytes mismatch");
        if (i < l) ((o[0] = d), (s[0] = f));
        else ((o[0] = h), (s[0] = p));
      }),
      (e.interleaveWithECBytes = function (t, r, n, i) {
        var o, s, a, l;
        if (t.getSizeInBytes() !== n) throw new Vn("Number of bits and data bytes does not match");
        var c = 0,
          u = 0,
          d = 0,
          h = [];
        for (var f = 0; f < i; ++f) {
          var p = new Int32Array(1),
            g = new Int32Array(1);
          e.getNumDataBytesAndNumECBytesForBlockID(r, n, i, f, p, g);
          var m = p[0],
            A = new Uint8Array(m);
          t.toBytes(8 * c, A, 0, m);
          var y = e.generateECBytes(A, g[0]);
          (h.push(new VU(A, y)), (u = Math.max(u, m)), (d = Math.max(d, y.length)), (c += p[0]));
        }
        if (n !== c) throw new Vn("Data bytes does not match offset");
        var x = new $n();
        for (var f = 0; f < u; ++f)
          try {
            for (var b = ((o = void 0), WU(h)), v = b.next(); !v.done; v = b.next()) {
              var _ = v.value,
                A = _.getDataBytes();
              if (f < A.length) x.appendBits(A[f], 8);
            }
          } catch (T) {
            o = { error: T };
          } finally {
            try {
              if (v && !v.done && (s = b.return)) s.call(b);
            } finally {
              if (o) throw o.error;
            }
          }
        for (var f = 0; f < d; ++f)
          try {
            for (var w = ((a = void 0), WU(h)), S = w.next(); !S.done; S = w.next()) {
              var _ = S.value,
                y = _.getErrorCorrectionBytes();
              if (f < y.length) x.appendBits(y[f], 8);
            }
          } catch (T) {
            a = { error: T };
          } finally {
            try {
              if (S && !S.done && (l = w.return)) l.call(w);
            } finally {
              if (a) throw a.error;
            }
          }
        if (r !== x.getSizeInBytes())
          throw new Vn("Interleaving error: " + r + " and " + x.getSizeInBytes() + " differ.");
        return x;
      }),
      (e.generateECBytes = function (t, r) {
        var n = t.length,
          i = new Int32Array(n + r);
        for (var o = 0; o < n; o++) i[o] = t[o] & 255;
        new nA(si.QR_CODE_FIELD_256).encode(i, r);
        var s = new Uint8Array(r);
        for (var o = 0; o < r; o++) s[o] = i[n + o];
        return s;
      }),
      (e.appendModeInfo = function (t, r) {
        r.appendBits(t.getBits(), 4);
      }),
      (e.appendLengthInfo = function (t, r, n, i) {
        var o = n.getCharacterCountBits(r);
        if (t >= 1 << o) throw new Vn(t + " is bigger than " + ((1 << o) - 1));
        i.appendBits(t, o);
      }),
      (e.appendBytes = function (t, r, n, i) {
        switch (r) {
          case Gn.NUMERIC:
            e.appendNumericBytes(t, n);
            break;
          case Gn.ALPHANUMERIC:
            e.appendAlphanumericBytes(t, n);
            break;
          case Gn.BYTE:
            e.append8BitBytes(t, n, i);
            break;
          case Gn.KANJI:
            e.appendKanjiBytes(t, n);
            break;
          default:
            throw new Vn("Invalid mode: " + r);
        }
      }),
      (e.getDigit = function (t) {
        return t.charCodeAt(0) - 48;
      }),
      (e.isDigit = function (t) {
        var r = e.getDigit(t);
        return r >= 0 && r <= 9;
      }),
      (e.appendNumericBytes = function (t, r) {
        var n = t.length,
          i = 0;
        while (i < n) {
          var o = e.getDigit(t.charAt(i));
          if (i + 2 < n) {
            var s = e.getDigit(t.charAt(i + 1)),
              a = e.getDigit(t.charAt(i + 2));
            (r.appendBits(o * 100 + s * 10 + a, 10), (i += 3));
          } else if (i + 1 < n) {
            var s = e.getDigit(t.charAt(i + 1));
            (r.appendBits(o * 10 + s, 7), (i += 2));
          } else (r.appendBits(o, 4), i++);
        }
      }),
      (e.appendAlphanumericBytes = function (t, r) {
        var n = t.length,
          i = 0;
        while (i < n) {
          var o = e.getAlphanumericCode(t.charCodeAt(i));
          if (o === -1) throw new Vn();
          if (i + 1 < n) {
            var s = e.getAlphanumericCode(t.charCodeAt(i + 1));
            if (s === -1) throw new Vn();
            (r.appendBits(o * 45 + s, 11), (i += 2));
          } else (r.appendBits(o, 6), i++);
        }
      }),
      (e.append8BitBytes = function (t, r, n) {
        var i;
        try {
          i = ki.encode(t, n);
        } catch (l) {
          throw new Vn(l);
        }
        for (var o = 0, s = i.length; o !== s; o++) {
          var a = i[o];
          r.appendBits(a, 8);
        }
      }),
      (e.appendKanjiBytes = function (t, r) {
        var n;
        try {
          n = ki.encode(t, Jn.SJIS);
        } catch (d) {
          throw new Vn(d);
        }
        var i = n.length;
        for (var o = 0; o < i; o += 2) {
          var s = n[o] & 255,
            a = n[o + 1] & 255,
            l = ((s << 8) & 4294967295) | a,
            c = -1;
          if (l >= 33088 && l <= 40956) c = l - 33088;
          else if (l >= 57408 && l <= 60351) c = l - 49472;
          if (c === -1) throw new Vn("Invalid byte sequence");
          var u = (c >> 8) * 192 + (c & 255);
          r.appendBits(u, 13);
        }
      }),
      (e.appendECI = function (t, r) {
        (r.appendBits(Gn.ECI.getBits(), 4), r.appendBits(t.getValue(), 8));
      }),
      (e.ALPHANUMERIC_TABLE = Int32Array.from([
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, 36, -1, -1, -1, 37, 38, -1, -1, -1, -1, 39, 40, -1, 41,
        42, 43, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 44, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1,
        -1, -1,
      ])),
      (e.DEFAULT_BYTE_MODE_ENCODING = Jn.UTF8.getName()),
      e
    );
  })(),
  Ju = Yae;
var HBe = (function () {
  function e() {}
  return (
    (e.prototype.write = function (t, r, n, i) {
      if (i === void 0) i = null;
      if (t.length === 0) throw new nt("Found empty contents");
      if (r < 0 || n < 0) throw new nt("Requested dimensions are too small: " + r + "x" + n);
      var o = Ns.L,
        s = e.QUIET_ZONE_SIZE;
      if (i !== null) {
        if (i.get(br.ERROR_CORRECTION) !== void 0)
          o = Ns.fromString(i.get(br.ERROR_CORRECTION).toString());
        if (i.get(br.MARGIN) !== void 0) s = Number.parseInt(i.get(br.MARGIN).toString(), 10);
      }
      var a = Ju.encode(t, o, i);
      return this.renderResult(a, r, n, s);
    }),
    (e.prototype.writeToDom = function (t, r, n, i, o) {
      if (o === void 0) o = null;
      if (typeof t === "string") t = document.querySelector(t);
      var s = this.write(r, n, i, o);
      if (t) t.appendChild(s);
    }),
    (e.prototype.renderResult = function (t, r, n, i) {
      var o = t.getMatrix();
      if (o === null) throw new Xi();
      var s = o.getWidth(),
        a = o.getHeight(),
        l = s + i * 2,
        c = a + i * 2,
        u = Math.max(r, l),
        d = Math.max(n, c),
        h = Math.min(Math.floor(u / l), Math.floor(d / c)),
        f = Math.floor((u - s * h) / 2),
        p = Math.floor((d - a * h) / 2),
        g = this.createSVGElement(u, d);
      for (var m = 0, A = p; m < a; m++, A += h)
        for (var y = 0, x = f; y < s; y++, x += h)
          if (o.get(y, m) === 1) {
            var b = this.createSvgRectElement(x, A, h, h);
            g.appendChild(b);
          }
      return g;
    }),
    (e.prototype.createSVGElement = function (t, r) {
      var n = document.createElementNS(e.SVG_NS, "svg");
      return (
        n.setAttributeNS(null, "height", t.toString()),
        n.setAttributeNS(null, "width", r.toString()),
        n
      );
    }),
    (e.prototype.createSvgRectElement = function (t, r, n, i) {
      var o = document.createElementNS(e.SVG_NS, "rect");
      return (
        o.setAttributeNS(null, "x", t.toString()),
        o.setAttributeNS(null, "y", r.toString()),
        o.setAttributeNS(null, "height", n.toString()),
        o.setAttributeNS(null, "width", i.toString()),
        o.setAttributeNS(null, "fill", "#000000"),
        o
      );
    }),
    (e.QUIET_ZONE_SIZE = 4),
    (e.SVG_NS = "http://www.w3.org/2000/svg"),
    e
  );
})();
var Xae = (function () {
    function e() {}
    return (
      (e.prototype.encode = function (t, r, n, i, o) {
        if (t.length === 0) throw new nt("Found empty contents");
        if (r !== at.QR_CODE) throw new nt("Can only encode QR_CODE, but got " + r);
        if (n < 0 || i < 0)
          throw new nt("Requested dimensions are too small: ".concat(n, "x").concat(i));
        var s = Ns.L,
          a = e.QUIET_ZONE_SIZE;
        if (o !== null) {
          if (o.get(br.ERROR_CORRECTION) !== void 0)
            s = Ns.fromString(o.get(br.ERROR_CORRECTION).toString());
          if (o.get(br.MARGIN) !== void 0) a = Number.parseInt(o.get(br.MARGIN).toString(), 10);
        }
        var l = Ju.encode(t, s, o);
        return e.renderResult(l, n, i, a);
      }),
      (e.renderResult = function (t, r, n, i) {
        var o = t.getMatrix();
        if (o === null) throw new Xi();
        var s = o.getWidth(),
          a = o.getHeight(),
          l = s + i * 2,
          c = a + i * 2,
          u = Math.max(r, l),
          d = Math.max(n, c),
          h = Math.min(Math.floor(u / l), Math.floor(d / c)),
          f = Math.floor((u - s * h) / 2),
          p = Math.floor((d - a * h) / 2),
          g = new bn(u, d);
        for (var m = 0, A = p; m < a; m++, A += h)
          for (var y = 0, x = f; y < s; y++, x += h) if (o.get(y, m) === 1) g.setRegion(x, A, h, h);
        return g;
      }),
      (e.QUIET_ZONE_SIZE = 4),
      e
    );
  })(),
  PS = Xae;
var hFe = (function () {
  function e() {}
  return (
    (e.prototype.encode = function (t, r, n, i, o) {
      var s;
      switch (r) {
        case at.QR_CODE:
          s = new PS();
          break;
        default:
          throw new nt("No encoder available for format " + r);
      }
      return s.encode(t, r, n, i, o);
    }),
    e
  );
})();
var jae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  yFe = (function (e) {
    jae(t, e);
    function t(r, n, i, o, s, a, l, c) {
      var u = e.call(this, a, l) || this;
      if (
        ((u.yuvData = r),
        (u.dataWidth = n),
        (u.dataHeight = i),
        (u.left = o),
        (u.top = s),
        o + a > n || s + l > i)
      )
        throw new nt("Crop rectangle does not fit within image data.");
      if (c) u.reverseHorizontal(a, l);
      return u;
    }
    return (
      (t.prototype.getRow = function (r, n) {
        if (r < 0 || r >= this.getHeight())
          throw new nt("Requested row is outside the image: " + r);
        var i = this.getWidth();
        if (n === null || n === void 0 || n.length < i) n = new Uint8ClampedArray(i);
        var o = (r + this.top) * this.dataWidth + this.left;
        return (pr.arraycopy(this.yuvData, o, n, 0, i), n);
      }),
      (t.prototype.getMatrix = function () {
        var r = this.getWidth(),
          n = this.getHeight();
        if (r === this.dataWidth && n === this.dataHeight) return this.yuvData;
        var i = r * n,
          o = new Uint8ClampedArray(i),
          s = this.top * this.dataWidth + this.left;
        if (r === this.dataWidth) return (pr.arraycopy(this.yuvData, s, o, 0, i), o);
        for (var a = 0; a < n; a++) {
          var l = a * r;
          (pr.arraycopy(this.yuvData, s, o, l, r), (s += this.dataWidth));
        }
        return o;
      }),
      (t.prototype.isCropSupported = function () {
        return !0;
      }),
      (t.prototype.crop = function (r, n, i, o) {
        return new t(
          this.yuvData,
          this.dataWidth,
          this.dataHeight,
          this.left + r,
          this.top + n,
          i,
          o,
          !1,
        );
      }),
      (t.prototype.renderThumbnail = function () {
        var r = this.getWidth() / t.THUMBNAIL_SCALE_FACTOR,
          n = this.getHeight() / t.THUMBNAIL_SCALE_FACTOR,
          i = new Int32Array(r * n),
          o = this.yuvData,
          s = this.top * this.dataWidth + this.left;
        for (var a = 0; a < n; a++) {
          var l = a * r;
          for (var c = 0; c < r; c++) {
            var u = o[s + c * t.THUMBNAIL_SCALE_FACTOR] & 255;
            i[l + c] = 4278190080 | (u * 65793);
          }
          s += this.dataWidth * t.THUMBNAIL_SCALE_FACTOR;
        }
        return i;
      }),
      (t.prototype.getThumbnailWidth = function () {
        return this.getWidth() / t.THUMBNAIL_SCALE_FACTOR;
      }),
      (t.prototype.getThumbnailHeight = function () {
        return this.getHeight() / t.THUMBNAIL_SCALE_FACTOR;
      }),
      (t.prototype.reverseHorizontal = function (r, n) {
        var i = this.yuvData;
        for (
          var o = 0, s = this.top * this.dataWidth + this.left;
          o < n;
          o++, s += this.dataWidth
        ) {
          var a = s + r / 2;
          for (var l = s, c = s + r - 1; l < a; l++, c--) {
            var u = i[l];
            ((i[l] = i[c]), (i[c] = u));
          }
        }
      }),
      (t.prototype.invert = function () {
        return new Yu(this);
      }),
      (t.THUMBNAIL_SCALE_FACTOR = 2),
      t
    );
  })($l);
var Kae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  TFe = (function (e) {
    Kae(t, e);
    function t(r, n, i, o, s, a, l) {
      var c = e.call(this, n, i) || this;
      if (
        ((c.dataWidth = o),
        (c.dataHeight = s),
        (c.left = a),
        (c.top = l),
        r.BYTES_PER_ELEMENT === 4)
      ) {
        var u = n * i,
          d = new Uint8ClampedArray(u);
        for (var h = 0; h < u; h++) {
          var f = r[h],
            p = (f >> 16) & 255,
            g = (f >> 7) & 510,
            m = f & 255;
          d[h] = ((p + g + m) / 4) & 255;
        }
        c.luminances = d;
      } else c.luminances = r;
      if (o === void 0) c.dataWidth = n;
      if (s === void 0) c.dataHeight = i;
      if (a === void 0) c.left = 0;
      if (l === void 0) c.top = 0;
      if (c.left + n > c.dataWidth || c.top + i > c.dataHeight)
        throw new nt("Crop rectangle does not fit within image data.");
      return c;
    }
    return (
      (t.prototype.getRow = function (r, n) {
        if (r < 0 || r >= this.getHeight())
          throw new nt("Requested row is outside the image: " + r);
        var i = this.getWidth();
        if (n === null || n === void 0 || n.length < i) n = new Uint8ClampedArray(i);
        var o = (r + this.top) * this.dataWidth + this.left;
        return (pr.arraycopy(this.luminances, o, n, 0, i), n);
      }),
      (t.prototype.getMatrix = function () {
        var r = this.getWidth(),
          n = this.getHeight();
        if (r === this.dataWidth && n === this.dataHeight) return this.luminances;
        var i = r * n,
          o = new Uint8ClampedArray(i),
          s = this.top * this.dataWidth + this.left;
        if (r === this.dataWidth) return (pr.arraycopy(this.luminances, s, o, 0, i), o);
        for (var a = 0; a < n; a++) {
          var l = a * r;
          (pr.arraycopy(this.luminances, s, o, l, r), (s += this.dataWidth));
        }
        return o;
      }),
      (t.prototype.isCropSupported = function () {
        return !0;
      }),
      (t.prototype.crop = function (r, n, i, o) {
        return new t(
          this.luminances,
          i,
          o,
          this.dataWidth,
          this.dataHeight,
          this.left + r,
          this.top + n,
        );
      }),
      (t.prototype.invert = function () {
        return new Yu(this);
      }),
      t
    );
  })($l);
var qae = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Zae = (function (e) {
    qae(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.forName = function (r) {
        return this.getCharacterSetECIByName(r);
      }),
      t
    );
  })(Jn),
  m0 = Zae;
var $ae = (function () {
    function e() {}
    return ((e.ISO_8859_1 = Jn.ISO8859_1), e);
  })(),
  oA = $ae;
var Jae = (function () {
    function e(t, r, n) {
      ((this.codewords = t),
        (this.numcols = r),
        (this.numrows = n),
        (this.bits = new Uint8Array(r * n)),
        yn.fill(this.bits, 2));
    }
    return (
      (e.prototype.getNumrows = function () {
        return this.numrows;
      }),
      (e.prototype.getNumcols = function () {
        return this.numcols;
      }),
      (e.prototype.getBits = function () {
        return this.bits;
      }),
      (e.prototype.getBit = function (t, r) {
        return this.bits[r * this.numcols + t] === 1;
      }),
      (e.prototype.setBit = function (t, r, n) {
        this.bits[r * this.numcols + t] = n ? 1 : 0;
      }),
      (e.prototype.noBit = function (t, r) {
        return this.bits[r * this.numcols + t] === 2;
      }),
      (e.prototype.place = function () {
        var t = 0,
          r = 4,
          n = 0;
        do {
          if (r === this.numrows && n === 0) this.corner1(t++);
          if (r === this.numrows - 2 && n === 0 && this.numcols % 4 !== 0) this.corner2(t++);
          if (r === this.numrows - 2 && n === 0 && this.numcols % 8 === 4) this.corner3(t++);
          if (r === this.numrows + 4 && n === 2 && this.numcols % 8 === 0) this.corner4(t++);
          do {
            if (r < this.numrows && n >= 0 && this.noBit(n, r)) this.utah(r, n, t++);
            ((r -= 2), (n += 2));
          } while (r >= 0 && n < this.numcols);
          (r++, (n += 3));
          do {
            if (r >= 0 && n < this.numcols && this.noBit(n, r)) this.utah(r, n, t++);
            ((r += 2), (n -= 2));
          } while (r < this.numrows && n >= 0);
          ((r += 3), n++);
        } while (r < this.numrows || n < this.numcols);
        if (this.noBit(this.numcols - 1, this.numrows - 1))
          (this.setBit(this.numcols - 1, this.numrows - 1, !0),
            this.setBit(this.numcols - 2, this.numrows - 2, !0));
      }),
      (e.prototype.module = function (t, r, n, i) {
        if (t < 0) ((t += this.numrows), (r += 4 - ((this.numrows + 4) % 8)));
        if (r < 0) ((r += this.numcols), (t += 4 - ((this.numcols + 4) % 8)));
        var o = this.codewords.charCodeAt(n);
        ((o &= 1 << (8 - i)), this.setBit(r, t, o !== 0));
      }),
      (e.prototype.utah = function (t, r, n) {
        (this.module(t - 2, r - 2, n, 1),
          this.module(t - 2, r - 1, n, 2),
          this.module(t - 1, r - 2, n, 3),
          this.module(t - 1, r - 1, n, 4),
          this.module(t - 1, r, n, 5),
          this.module(t, r - 2, n, 6),
          this.module(t, r - 1, n, 7),
          this.module(t, r, n, 8));
      }),
      (e.prototype.corner1 = function (t) {
        (this.module(this.numrows - 1, 0, t, 1),
          this.module(this.numrows - 1, 1, t, 2),
          this.module(this.numrows - 1, 2, t, 3),
          this.module(0, this.numcols - 2, t, 4),
          this.module(0, this.numcols - 1, t, 5),
          this.module(1, this.numcols - 1, t, 6),
          this.module(2, this.numcols - 1, t, 7),
          this.module(3, this.numcols - 1, t, 8));
      }),
      (e.prototype.corner2 = function (t) {
        (this.module(this.numrows - 3, 0, t, 1),
          this.module(this.numrows - 2, 0, t, 2),
          this.module(this.numrows - 1, 0, t, 3),
          this.module(0, this.numcols - 4, t, 4),
          this.module(0, this.numcols - 3, t, 5),
          this.module(0, this.numcols - 2, t, 6),
          this.module(0, this.numcols - 1, t, 7),
          this.module(1, this.numcols - 1, t, 8));
      }),
      (e.prototype.corner3 = function (t) {
        (this.module(this.numrows - 3, 0, t, 1),
          this.module(this.numrows - 2, 0, t, 2),
          this.module(this.numrows - 1, 0, t, 3),
          this.module(0, this.numcols - 2, t, 4),
          this.module(0, this.numcols - 1, t, 5),
          this.module(1, this.numcols - 1, t, 6),
          this.module(2, this.numcols - 1, t, 7),
          this.module(3, this.numcols - 1, t, 8));
      }),
      (e.prototype.corner4 = function (t) {
        (this.module(this.numrows - 1, 0, t, 1),
          this.module(this.numrows - 1, this.numcols - 1, t, 2),
          this.module(0, this.numcols - 3, t, 3),
          this.module(0, this.numcols - 2, t, 4),
          this.module(0, this.numcols - 1, t, 5),
          this.module(1, this.numcols - 3, t, 6),
          this.module(1, this.numcols - 2, t, 7),
          this.module(1, this.numcols - 1, t, 8));
      }),
      e
    );
  })(),
  j_ = Jae;
var kS,
  HS = [5, 7, 10, 11, 12, 14, 18, 20, 24, 28, 36, 42, 48, 56, 62, 68],
  QU = [
    [228, 48, 15, 111, 62],
    [23, 68, 144, 134, 240, 92, 254],
    [28, 24, 185, 166, 223, 248, 116, 255, 110, 61],
    [175, 138, 205, 12, 194, 168, 39, 245, 60, 97, 120],
    [41, 153, 158, 91, 61, 42, 142, 213, 97, 178, 100, 242],
    [156, 97, 192, 252, 95, 9, 157, 119, 138, 45, 18, 186, 83, 185],
    [83, 195, 100, 39, 188, 75, 66, 61, 241, 213, 109, 129, 94, 254, 225, 48, 90, 188],
    [15, 195, 244, 9, 233, 71, 168, 2, 188, 160, 153, 145, 253, 79, 108, 82, 27, 174, 186, 172],
    [
      52, 190, 88, 205, 109, 39, 176, 21, 155, 197, 251, 223, 155, 21, 5, 172, 254, 124, 12, 181,
      184, 96, 50, 193,
    ],
    [
      211, 231, 43, 97, 71, 96, 103, 174, 37, 151, 170, 53, 75, 34, 249, 121, 17, 138, 110, 213,
      141, 136, 120, 151, 233, 168, 93, 255,
    ],
    [
      245, 127, 242, 218, 130, 250, 162, 181, 102, 120, 84, 179, 220, 251, 80, 182, 229, 18, 2, 4,
      68, 33, 101, 137, 95, 119, 115, 44, 175, 184, 59, 25, 225, 98, 81, 112,
    ],
    [
      77, 193, 137, 31, 19, 38, 22, 153, 247, 105, 122, 2, 245, 133, 242, 8, 175, 95, 100, 9, 167,
      105, 214, 111, 57, 121, 21, 1, 253, 57, 54, 101, 248, 202, 69, 50, 150, 177, 226, 5, 9, 5,
    ],
    [
      245, 132, 172, 223, 96, 32, 117, 22, 238, 133, 238, 231, 205, 188, 237, 87, 191, 106, 16, 147,
      118, 23, 37, 90, 170, 205, 131, 88, 120, 100, 66, 138, 186, 240, 82, 44, 176, 87, 187, 147,
      160, 175, 69, 213, 92, 253, 225, 19,
    ],
    [
      175, 9, 223, 238, 12, 17, 220, 208, 100, 29, 175, 170, 230, 192, 215, 235, 150, 159, 36, 223,
      38, 200, 132, 54, 228, 146, 218, 234, 117, 203, 29, 232, 144, 238, 22, 150, 201, 117, 62, 207,
      164, 13, 137, 245, 127, 67, 247, 28, 155, 43, 203, 107, 233, 53, 143, 46,
    ],
    [
      242, 93, 169, 50, 144, 210, 39, 118, 202, 188, 201, 189, 143, 108, 196, 37, 185, 112, 134,
      230, 245, 63, 197, 190, 250, 106, 185, 221, 175, 64, 114, 71, 161, 44, 147, 6, 27, 218, 51,
      63, 87, 10, 40, 130, 188, 17, 163, 31, 176, 170, 4, 107, 232, 7, 94, 166, 224, 124, 86, 47,
      11, 204,
    ],
    [
      220, 228, 173, 89, 251, 149, 159, 56, 89, 33, 147, 244, 154, 36, 73, 127, 213, 136, 248, 180,
      234, 197, 158, 177, 68, 122, 93, 213, 15, 160, 227, 236, 66, 139, 153, 185, 202, 167, 179, 25,
      220, 232, 96, 210, 231, 136, 223, 239, 181, 241, 59, 52, 172, 25, 49, 232, 211, 189, 64, 54,
      108, 153, 132, 63, 96, 103, 82, 186,
    ],
  ],
  ele = 301,
  tle = function (e, t) {
    var r = 1;
    for (var n = 0; n < 255; n++) if (((t[n] = r), (e[r] = n), (r *= 2), r >= 256)) r ^= ele;
    return { LOG: e, ALOG: t };
  },
  sA = ((kS = tle([], [])), kS.LOG),
  GS = kS.ALOG,
  US;
(function (e) {
  ((e[(e.FORCE_NONE = 0)] = "FORCE_NONE"),
    (e[(e.FORCE_SQUARE = 1)] = "FORCE_SQUARE"),
    (e[(e.FORCE_RECTANGLE = 2)] = "FORCE_RECTANGLE"));
})(US || (US = {}));
var zS = 129,
  K_ = 230,
  YU = 231,
  XU = 235,
  jU = 236,
  KU = 237,
  qU = 238,
  ZU = 239,
  $U = 240,
  q_ = 254,
  JU = 254,
  im = "[)>\x1E05\x1D",
  om = "[)>\x1E06\x1D",
  sm = "\x1E\x04",
  rn = 0,
  lo = 1,
  Po = 2,
  Ui = 3,
  ji = 4,
  To = 5;
var rle = (function () {
    function e() {}
    return (
      (e.encodeECC200 = function (t, r) {
        if (t.length !== r.getDataCapacity())
          throw Error("The number of codewords does not match the selected symbol");
        var n = new Ot();
        n.append(t);
        var i = r.getInterleavedBlockCount();
        if (i === 1) {
          var o = this.createECCBlock(t, r.getErrorCodewords());
          n.append(o);
        } else {
          var s = [],
            a = [];
          for (var l = 0; l < i; l++)
            ((s[l] = r.getDataLengthForInterleavedBlock(l + 1)),
              (a[l] = r.getErrorLengthForInterleavedBlock(l + 1)));
          for (var c = 0; c < i; c++) {
            var u = new Ot();
            for (var d = c; d < r.getDataCapacity(); d += i) u.append(t.charAt(d));
            var o = this.createECCBlock(u.toString(), a[c]),
              h = 0;
            for (var f = c; f < a[c] * i; f += i)
              n.setCharAt(r.getDataCapacity() + f, o.charAt(h++));
          }
        }
        return n.toString();
      }),
      (e.createECCBlock = function (t, r) {
        var n = -1;
        for (var i = 0; i < HS.length; i++)
          if (HS[i] === r) {
            n = i;
            break;
          }
        if (n < 0) throw Error("Illegal number of error correction codewords specified: " + r);
        var o = QU[n],
          s = [];
        for (var i = 0; i < r; i++) s[i] = 0;
        for (var i = 0; i < t.length; i++) {
          var a = s[r - 1] ^ t.charAt(i).charCodeAt(0);
          for (var l = r - 1; l > 0; l--)
            if (a !== 0 && o[l] !== 0) s[l] = s[l - 1] ^ GS[(sA[a] + sA[o[l]]) % 255];
            else s[l] = s[l - 1];
          if (a !== 0 && o[0] !== 0) s[0] = GS[(sA[a] + sA[o[0]]) % 255];
          else s[0] = 0;
        }
        var c = [];
        for (var i = 0; i < r; i++) c[i] = s[r - i - 1];
        return c
          .map(function (u) {
            return String.fromCharCode(u);
          })
          .join("");
      }),
      e
    );
  })(),
  Z_ = rle;
var VS = (function () {
  function e() {}
  return (
    (e.prototype.getEncodingMode = function () {
      return rn;
    }),
    (e.prototype.encode = function (t) {
      var r = yr.determineConsecutiveDigitCount(t.getMessage(), t.pos);
      if (r >= 2)
        (t.writeCodeword(
          this.encodeASCIIDigits(
            t.getMessage().charCodeAt(t.pos),
            t.getMessage().charCodeAt(t.pos + 1),
          ),
        ),
          (t.pos += 2));
      else {
        var n = t.getCurrentChar(),
          i = yr.lookAheadTest(t.getMessage(), t.pos, this.getEncodingMode());
        if (i !== this.getEncodingMode())
          switch (i) {
            case To:
              (t.writeCodeword(YU), t.signalEncoderChange(To));
              return;
            case lo:
              (t.writeCodeword(K_), t.signalEncoderChange(lo));
              return;
            case Ui:
              (t.writeCodeword(qU), t.signalEncoderChange(Ui));
              break;
            case Po:
              (t.writeCodeword(ZU), t.signalEncoderChange(Po));
              break;
            case ji:
              (t.writeCodeword($U), t.signalEncoderChange(ji));
              break;
            default:
              throw Error("Illegal mode: " + i);
          }
        else if (yr.isExtendedASCII(n))
          (t.writeCodeword(XU), t.writeCodeword(n - 128 + 1), t.pos++);
        else (t.writeCodeword(n + 1), t.pos++);
      }
    }),
    (e.prototype.encodeASCIIDigits = function (t, r) {
      if (yr.isDigit(t) && yr.isDigit(r)) {
        var n = (t - 48) * 10 + (r - 48);
        return n + 130;
      }
      throw Error("not digits: " + t + r);
    }),
    e
  );
})();
var WS = (function () {
  function e() {}
  return (
    (e.prototype.getEncodingMode = function () {
      return To;
    }),
    (e.prototype.encode = function (t) {
      var r = new Ot();
      r.append(0);
      while (t.hasMoreCharacters()) {
        var n = t.getCurrentChar();
        (r.append(n), t.pos++);
        var i = yr.lookAheadTest(t.getMessage(), t.pos, this.getEncodingMode());
        if (i !== this.getEncodingMode()) {
          t.signalEncoderChange(rn);
          break;
        }
      }
      var o = r.length() - 1,
        s = 1,
        a = t.getCodewordCount() + o + s;
      t.updateSymbolInfo(a);
      var l = t.getSymbolInfo().getDataCapacity() - a > 0;
      if (t.hasMoreCharacters() || l)
        if (o <= 249) r.setCharAt(0, er.getCharAt(o));
        else if (o <= 1555)
          (r.setCharAt(0, er.getCharAt(Math.floor(o / 250) + 249)),
            r.insert(1, er.getCharAt(o % 250)));
        else throw Error("Message length not in valid ranges: " + o);
      for (var c = 0, n = r.length(); c < n; c++)
        t.writeCodeword(
          this.randomize255State(r.charAt(c).charCodeAt(0), t.getCodewordCount() + 1),
        );
    }),
    (e.prototype.randomize255State = function (t, r) {
      var n = ((149 * r) % 255) + 1,
        i = t + n;
      if (i <= 255) return i;
      else return i - 256;
    }),
    e
  );
})();
var g0 = (function () {
  function e() {}
  return (
    (e.prototype.getEncodingMode = function () {
      return lo;
    }),
    (e.prototype.encodeMaximal = function (t) {
      var r = new Ot(),
        n = 0,
        i = t.pos,
        o = 0;
      while (t.hasMoreCharacters()) {
        var s = t.getCurrentChar();
        if ((t.pos++, (n = this.encodeChar(s, r)), r.length() % 3 === 0))
          ((i = t.pos), (o = r.length()));
      }
      if (o !== r.length()) {
        var a = Math.floor((r.length() / 3) * 2),
          l = Math.floor(t.getCodewordCount() + a + 1);
        t.updateSymbolInfo(l);
        var c = t.getSymbolInfo().getDataCapacity() - l,
          u = Math.floor(r.length() % 3);
        if ((u === 2 && c !== 2) || (u === 1 && (n > 3 || c !== 1))) t.pos = i;
      }
      if (r.length() > 0) t.writeCodeword(K_);
      this.handleEOD(t, r);
    }),
    (e.prototype.encode = function (t) {
      var r = new Ot();
      while (t.hasMoreCharacters()) {
        var n = t.getCurrentChar();
        t.pos++;
        var i = this.encodeChar(n, r),
          o = Math.floor(r.length() / 3) * 2,
          s = t.getCodewordCount() + o;
        t.updateSymbolInfo(s);
        var a = t.getSymbolInfo().getDataCapacity() - s;
        if (!t.hasMoreCharacters()) {
          var l = new Ot();
          if (r.length() % 3 === 2 && a !== 2) i = this.backtrackOneCharacter(t, r, l, i);
          while (r.length() % 3 === 1 && (i > 3 || a !== 1))
            i = this.backtrackOneCharacter(t, r, l, i);
          break;
        }
        var c = r.length();
        if (c % 3 === 0) {
          var u = yr.lookAheadTest(t.getMessage(), t.pos, this.getEncodingMode());
          if (u !== this.getEncodingMode()) {
            t.signalEncoderChange(rn);
            break;
          }
        }
      }
      this.handleEOD(t, r);
    }),
    (e.prototype.backtrackOneCharacter = function (t, r, n, i) {
      var o = r.length(),
        s = r.toString().substring(0, o - i);
      (r.setLengthToZero(), r.append(s), t.pos--);
      var a = t.getCurrentChar();
      return ((i = this.encodeChar(a, n)), t.resetSymbolInfo(), i);
    }),
    (e.prototype.writeNextTriplet = function (t, r) {
      t.writeCodewords(this.encodeToCodewords(r.toString()));
      var n = r.toString().substring(3);
      (r.setLengthToZero(), r.append(n));
    }),
    (e.prototype.handleEOD = function (t, r) {
      var n = Math.floor((r.length() / 3) * 2),
        i = r.length() % 3,
        o = t.getCodewordCount() + n;
      t.updateSymbolInfo(o);
      var s = t.getSymbolInfo().getDataCapacity() - o;
      if (i === 2) {
        r.append("\x00");
        while (r.length() >= 3) this.writeNextTriplet(t, r);
        if (t.hasMoreCharacters()) t.writeCodeword(q_);
      } else if (s === 1 && i === 1) {
        while (r.length() >= 3) this.writeNextTriplet(t, r);
        if (t.hasMoreCharacters()) t.writeCodeword(q_);
        t.pos--;
      } else if (i === 0) {
        while (r.length() >= 3) this.writeNextTriplet(t, r);
        if (s > 0 || t.hasMoreCharacters()) t.writeCodeword(q_);
      } else throw Error("Unexpected case. Please report!");
      t.signalEncoderChange(rn);
    }),
    (e.prototype.encodeChar = function (t, r) {
      if (t === 32) return (r.append(3), 1);
      if (t >= 48 && t <= 57) return (r.append(t - 48 + 4), 1);
      if (t >= 65 && t <= 90) return (r.append(t - 65 + 14), 1);
      if (t < 32) return (r.append(0), r.append(t), 2);
      if (t <= 47) return (r.append(1), r.append(t - 33), 2);
      if (t <= 64) return (r.append(1), r.append(t - 58 + 15), 2);
      if (t <= 95) return (r.append(1), r.append(t - 91 + 22), 2);
      if (t <= 127) return (r.append(2), r.append(t - 96), 2);
      r.append("".concat(1, "\x1E"));
      var n = 2;
      return ((n += this.encodeChar(t - 128, r)), n);
    }),
    (e.prototype.encodeToCodewords = function (t) {
      var r = 1600 * t.charCodeAt(0) + 40 * t.charCodeAt(1) + t.charCodeAt(2) + 1,
        n = r / 256,
        i = r % 256,
        o = new Ot();
      return (o.append(n), o.append(i), o.toString());
    }),
    e
  );
})();
var QS = (function () {
  function e() {}
  return (
    (e.prototype.getEncodingMode = function () {
      return ji;
    }),
    (e.prototype.encode = function (t) {
      var r = new Ot();
      while (t.hasMoreCharacters()) {
        var n = t.getCurrentChar();
        (this.encodeChar(n, r), t.pos++);
        var i = r.length();
        if (i >= 4) {
          t.writeCodewords(this.encodeToCodewords(r.toString()));
          var o = r.toString().substring(4);
          (r.setLengthToZero(), r.append(o));
          var s = yr.lookAheadTest(t.getMessage(), t.pos, this.getEncodingMode());
          if (s !== this.getEncodingMode()) {
            t.signalEncoderChange(rn);
            break;
          }
        }
      }
      (r.append(er.getCharAt(31)), this.handleEOD(t, r));
    }),
    (e.prototype.handleEOD = function (t, r) {
      try {
        var n = r.length();
        if (n === 0) return;
        if (n === 1) {
          t.updateSymbolInfo();
          var i = t.getSymbolInfo().getDataCapacity() - t.getCodewordCount(),
            o = t.getRemainingCharacters();
          if (o > i)
            (t.updateSymbolInfo(t.getCodewordCount() + 1),
              (i = t.getSymbolInfo().getDataCapacity() - t.getCodewordCount()));
          if (o <= i && i <= 2) return;
        }
        if (n > 4) throw Error("Count must not exceed 4");
        var s = n - 1,
          a = this.encodeToCodewords(r.toString()),
          l = !t.hasMoreCharacters(),
          c = l && s <= 2;
        if (s <= 2) {
          t.updateSymbolInfo(t.getCodewordCount() + s);
          var i = t.getSymbolInfo().getDataCapacity() - t.getCodewordCount();
          if (i >= 3) ((c = !1), t.updateSymbolInfo(t.getCodewordCount() + a.length));
        }
        if (c) (t.resetSymbolInfo(), (t.pos -= s));
        else t.writeCodewords(a);
      } finally {
        t.signalEncoderChange(rn);
      }
    }),
    (e.prototype.encodeChar = function (t, r) {
      if (t >= 32 && t <= 63) r.append(t);
      else if (t >= 64 && t <= 94) r.append(er.getCharAt(t - 64));
      else yr.illegalCharacter(er.getCharAt(t));
    }),
    (e.prototype.encodeToCodewords = function (t) {
      var r = t.length;
      if (r === 0) throw Error("StringBuilder must not be empty");
      var n = t.charAt(0).charCodeAt(0),
        i = r >= 2 ? t.charAt(1).charCodeAt(0) : 0,
        o = r >= 3 ? t.charAt(2).charCodeAt(0) : 0,
        s = r >= 4 ? t.charAt(3).charCodeAt(0) : 0,
        a = (n << 18) + (i << 12) + (o << 6) + s,
        l = (a >> 16) & 255,
        c = (a >> 8) & 255,
        u = a & 255,
        d = new Ot();
      if ((d.append(l), r >= 2)) d.append(c);
      if (r >= 3) d.append(u);
      return d.toString();
    }),
    e
  );
})();
var nle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  ile = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  vn = (function () {
    function e(t, r, n, i, o, s, a, l) {
      if (a === void 0) a = 0;
      if (l === void 0) l = 0;
      ((this.rectangular = t),
        (this.dataCapacity = r),
        (this.errorCodewords = n),
        (this.matrixWidth = i),
        (this.matrixHeight = o),
        (this.dataRegions = s),
        (this.rsBlockData = a),
        (this.rsBlockError = l));
    }
    return (
      (e.lookup = function (t, r, n, i, o) {
        var s, a;
        if (r === void 0) r = 0;
        if (n === void 0) n = null;
        if (i === void 0) i = null;
        if (o === void 0) o = !0;
        try {
          for (var l = ile(sle), c = l.next(); !c.done; c = l.next()) {
            var u = c.value;
            if (r === 1 && u.rectangular) continue;
            if (r === 2 && !u.rectangular) continue;
            if (
              n != null &&
              (u.getSymbolWidth() < n.getWidth() || u.getSymbolHeight() < n.getHeight())
            )
              continue;
            if (
              i != null &&
              (u.getSymbolWidth() > i.getWidth() || u.getSymbolHeight() > i.getHeight())
            )
              continue;
            if (t <= u.dataCapacity) return u;
          }
        } catch (d) {
          s = { error: d };
        } finally {
          try {
            if (c && !c.done && (a = l.return)) a.call(l);
          } finally {
            if (s) throw s.error;
          }
        }
        if (o)
          throw Error(
            "Can't find a symbol arrangement that matches the message. Data codewords: " + t,
          );
        return null;
      }),
      (e.prototype.getHorizontalDataRegions = function () {
        switch (this.dataRegions) {
          case 1:
            return 1;
          case 2:
          case 4:
            return 2;
          case 16:
            return 4;
          case 36:
            return 6;
          default:
            throw Error("Cannot handle this number of data regions");
        }
      }),
      (e.prototype.getVerticalDataRegions = function () {
        switch (this.dataRegions) {
          case 1:
          case 2:
            return 1;
          case 4:
            return 2;
          case 16:
            return 4;
          case 36:
            return 6;
          default:
            throw Error("Cannot handle this number of data regions");
        }
      }),
      (e.prototype.getSymbolDataWidth = function () {
        return this.getHorizontalDataRegions() * this.matrixWidth;
      }),
      (e.prototype.getSymbolDataHeight = function () {
        return this.getVerticalDataRegions() * this.matrixHeight;
      }),
      (e.prototype.getSymbolWidth = function () {
        return this.getSymbolDataWidth() + this.getHorizontalDataRegions() * 2;
      }),
      (e.prototype.getSymbolHeight = function () {
        return this.getSymbolDataHeight() + this.getVerticalDataRegions() * 2;
      }),
      (e.prototype.getCodewordCount = function () {
        return this.dataCapacity + this.errorCodewords;
      }),
      (e.prototype.getInterleavedBlockCount = function () {
        if (!this.rsBlockData) return 1;
        return this.dataCapacity / this.rsBlockData;
      }),
      (e.prototype.getDataCapacity = function () {
        return this.dataCapacity;
      }),
      (e.prototype.getErrorCodewords = function () {
        return this.errorCodewords;
      }),
      (e.prototype.getDataLengthForInterleavedBlock = function (t) {
        return this.rsBlockData;
      }),
      (e.prototype.getErrorLengthForInterleavedBlock = function (t) {
        return this.rsBlockError;
      }),
      e
    );
  })(),
  am = vn,
  ole = (function (e) {
    nle(t, e);
    function t() {
      return e.call(this, !1, 1558, 620, 22, 22, 36, -1, 62) || this;
    }
    return (
      (t.prototype.getInterleavedBlockCount = function () {
        return 10;
      }),
      (t.prototype.getDataLengthForInterleavedBlock = function (r) {
        return r <= 8 ? 156 : 155;
      }),
      t
    );
  })(vn),
  sle = [
    new vn(!1, 3, 5, 8, 8, 1),
    new vn(!1, 5, 7, 10, 10, 1),
    new vn(!0, 5, 7, 16, 6, 1),
    new vn(!1, 8, 10, 12, 12, 1),
    new vn(!0, 10, 11, 14, 6, 2),
    new vn(!1, 12, 12, 14, 14, 1),
    new vn(!0, 16, 14, 24, 10, 1),
    new vn(!1, 18, 14, 16, 16, 1),
    new vn(!1, 22, 18, 18, 18, 1),
    new vn(!0, 22, 18, 16, 10, 2),
    new vn(!1, 30, 20, 20, 20, 1),
    new vn(!0, 32, 24, 16, 14, 2),
    new vn(!1, 36, 24, 22, 22, 1),
    new vn(!1, 44, 28, 24, 24, 1),
    new vn(!0, 49, 28, 22, 14, 2),
    new vn(!1, 62, 36, 14, 14, 4),
    new vn(!1, 86, 42, 16, 16, 4),
    new vn(!1, 114, 48, 18, 18, 4),
    new vn(!1, 144, 56, 20, 20, 4),
    new vn(!1, 174, 68, 22, 22, 4),
    new vn(!1, 204, 84, 24, 24, 4, 102, 42),
    new vn(!1, 280, 112, 14, 14, 16, 140, 56),
    new vn(!1, 368, 144, 16, 16, 16, 92, 36),
    new vn(!1, 456, 192, 18, 18, 16, 114, 48),
    new vn(!1, 576, 224, 20, 20, 16, 144, 56),
    new vn(!1, 696, 272, 22, 22, 16, 174, 68),
    new vn(!1, 816, 336, 24, 24, 16, 136, 56),
    new vn(!1, 1050, 408, 18, 18, 36, 175, 68),
    new vn(!1, 1304, 496, 20, 20, 36, 163, 62),
    new ole(),
  ];
var YS = (function () {
  function e(t) {
    ((this.msg = t), (this.pos = 0), (this.skipAtEnd = 0));
    var r = t.split("").map(function (a) {
        return a.charCodeAt(0);
      }),
      n = new Ot();
    for (var i = 0, o = r.length; i < o; i++) {
      var s = String.fromCharCode(r[i] & 255);
      if (s === "?" && t.charAt(i) !== "?")
        throw Error("Message contains characters outside ISO-8859-1 encoding.");
      n.append(s);
    }
    ((this.msg = n.toString()),
      (this.shape = 0),
      (this.codewords = new Ot()),
      (this.newEncoding = -1));
  }
  return (
    (e.prototype.setSymbolShape = function (t) {
      this.shape = t;
    }),
    (e.prototype.setSizeConstraints = function (t, r) {
      ((this.minSize = t), (this.maxSize = r));
    }),
    (e.prototype.getMessage = function () {
      return this.msg;
    }),
    (e.prototype.setSkipAtEnd = function (t) {
      this.skipAtEnd = t;
    }),
    (e.prototype.getCurrentChar = function () {
      return this.msg.charCodeAt(this.pos);
    }),
    (e.prototype.getCurrent = function () {
      return this.msg.charCodeAt(this.pos);
    }),
    (e.prototype.getCodewords = function () {
      return this.codewords;
    }),
    (e.prototype.writeCodewords = function (t) {
      this.codewords.append(t);
    }),
    (e.prototype.writeCodeword = function (t) {
      this.codewords.append(t);
    }),
    (e.prototype.getCodewordCount = function () {
      return this.codewords.length();
    }),
    (e.prototype.getNewEncoding = function () {
      return this.newEncoding;
    }),
    (e.prototype.signalEncoderChange = function (t) {
      this.newEncoding = t;
    }),
    (e.prototype.resetEncoderSignal = function () {
      this.newEncoding = -1;
    }),
    (e.prototype.hasMoreCharacters = function () {
      return this.pos < this.getTotalMessageCharCount();
    }),
    (e.prototype.getTotalMessageCharCount = function () {
      return this.msg.length - this.skipAtEnd;
    }),
    (e.prototype.getRemainingCharacters = function () {
      return this.getTotalMessageCharCount() - this.pos;
    }),
    (e.prototype.getSymbolInfo = function () {
      return this.symbolInfo;
    }),
    (e.prototype.updateSymbolInfo = function (t) {
      if (t === void 0) t = this.getCodewordCount();
      if (this.symbolInfo == null || t > this.symbolInfo.getDataCapacity())
        this.symbolInfo = am.lookup(t, this.shape, this.minSize, this.maxSize, !0);
    }),
    (e.prototype.resetSymbolInfo = function () {
      this.symbolInfo = null;
    }),
    e
  );
})();
var ale = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  XS = (function (e) {
    ale(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.getEncodingMode = function () {
        return Ui;
      }),
      (t.prototype.encode = function (r) {
        var n = new Ot();
        while (r.hasMoreCharacters()) {
          var i = r.getCurrentChar();
          (r.pos++, this.encodeChar(i, n));
          var o = n.length();
          if (o % 3 === 0) {
            this.writeNextTriplet(r, n);
            var s = yr.lookAheadTest(r.getMessage(), r.pos, this.getEncodingMode());
            if (s !== this.getEncodingMode()) {
              r.signalEncoderChange(rn);
              break;
            }
          }
        }
        this.handleEOD(r, n);
      }),
      (t.prototype.encodeChar = function (r, n) {
        switch (r) {
          case 13:
            n.append(0);
            break;
          case 42:
            n.append(1);
            break;
          case 62:
            n.append(2);
            break;
          case 32:
            n.append(3);
            break;
          default:
            if (r >= 48 && r <= 57) n.append(r - 48 + 4);
            else if (r >= 65 && r <= 90) n.append(r - 65 + 14);
            else yr.illegalCharacter(er.getCharAt(r));
            break;
        }
        return 1;
      }),
      (t.prototype.handleEOD = function (r, n) {
        r.updateSymbolInfo();
        var i = r.getSymbolInfo().getDataCapacity() - r.getCodewordCount(),
          o = n.length();
        if (
          ((r.pos -= o),
          r.getRemainingCharacters() > 1 || i > 1 || r.getRemainingCharacters() !== i)
        )
          r.writeCodeword(JU);
        if (r.getNewEncoding() < 0) r.signalEncoderChange(rn);
      }),
      t
    );
  })(g0);
var lle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  jS = (function (e) {
    lle(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.getEncodingMode = function () {
        return Po;
      }),
      (t.prototype.encodeChar = function (r, n) {
        if (r === 32) return (n.append(3), 1);
        if (r >= 48 && r <= 57) return (n.append(r - 48 + 4), 1);
        if (r >= 97 && r <= 122) return (n.append(r - 97 + 14), 1);
        if (r < 32) return (n.append(0), n.append(r), 2);
        if (r <= 47) return (n.append(1), n.append(r - 33), 2);
        if (r <= 64) return (n.append(1), n.append(r - 58 + 15), 2);
        if (r >= 91 && r <= 95) return (n.append(1), n.append(r - 91 + 22), 2);
        if (r === 96) return (n.append(2), n.append(0), 2);
        if (r <= 90) return (n.append(2), n.append(r - 65 + 1), 2);
        if (r <= 127) return (n.append(2), n.append(r - 123 + 27), 2);
        n.append("".concat(1, "\x1E"));
        var i = 2;
        return ((i += this.encodeChar(r - 128, n)), i);
      }),
      t
    );
  })(g0);
var cle = (function () {
    function e() {}
    return (
      (e.randomize253State = function (t) {
        var r = ((149 * t) % 253) + 1,
          n = zS + r;
        return n <= 254 ? n : n - 254;
      }),
      (e.encodeHighLevel = function (t, r, n, i, o) {
        if (r === void 0) r = 0;
        if (n === void 0) n = null;
        if (i === void 0) i = null;
        if (o === void 0) o = !1;
        var s = new g0(),
          a = [new VS(), s, new jS(), new XS(), new QS(), new WS()],
          l = new YS(t);
        if ((l.setSymbolShape(r), l.setSizeConstraints(n, i), t.startsWith(im) && t.endsWith(sm)))
          (l.writeCodeword(jU), l.setSkipAtEnd(2), (l.pos += im.length));
        else if (t.startsWith(om) && t.endsWith(sm))
          (l.writeCodeword(KU), l.setSkipAtEnd(2), (l.pos += om.length));
        var c = rn;
        if (o) (s.encodeMaximal(l), (c = l.getNewEncoding()), l.resetEncoderSignal());
        while (l.hasMoreCharacters())
          if ((a[c].encode(l), l.getNewEncoding() >= 0))
            ((c = l.getNewEncoding()), l.resetEncoderSignal());
        var u = l.getCodewordCount();
        l.updateSymbolInfo();
        var d = l.getSymbolInfo().getDataCapacity();
        if (u < d && c !== rn && c !== To && c !== ji) l.writeCodeword("þ");
        var h = l.getCodewords();
        if (h.length() < d) h.append(zS);
        while (h.length() < d) h.append(this.randomize253State(h.length() + 1));
        return l.getCodewords().toString();
      }),
      (e.lookAheadTest = function (t, r, n) {
        var i = this.lookAheadTestIntern(t, r, n);
        if (n === Ui && i === Ui) {
          var o = Math.min(r + 3, t.length);
          for (var s = r; s < o; s++) if (!this.isNativeX12(t.charCodeAt(s))) return rn;
        } else if (n === ji && i === ji) {
          var o = Math.min(r + 4, t.length);
          for (var s = r; s < o; s++) if (!this.isNativeEDIFACT(t.charCodeAt(s))) return rn;
        }
        return i;
      }),
      (e.lookAheadTestIntern = function (t, r, n) {
        if (r >= t.length) return n;
        var i;
        if (n === rn) i = [0, 1, 1, 1, 1, 1.25];
        else ((i = [1, 2, 2, 2, 2, 2.25]), (i[n] = 0));
        var o = 0,
          s = new Uint8Array(6),
          a = [];
        while (!0) {
          if (r + o === t.length) {
            (yn.fill(s, 0), yn.fill(a, 0));
            var l = this.findMinimums(i, a, Ut.MAX_VALUE, s),
              c = this.getMinimumCount(s);
            if (a[rn] === l) return rn;
            if (c === 1) {
              if (s[To] > 0) return To;
              if (s[ji] > 0) return ji;
              if (s[Po] > 0) return Po;
              if (s[Ui] > 0) return Ui;
            }
            return lo;
          }
          var u = t.charCodeAt(r + o);
          if ((o++, this.isDigit(u))) i[rn] += 0.5;
          else if (this.isExtendedASCII(u)) ((i[rn] = Math.ceil(i[rn])), (i[rn] += 2));
          else ((i[rn] = Math.ceil(i[rn])), i[rn]++);
          if (this.isNativeC40(u)) i[lo] += 0.6666666666666666;
          else if (this.isExtendedASCII(u)) i[lo] += 2.6666666666666665;
          else i[lo] += 1.3333333333333333;
          if (this.isNativeText(u)) i[Po] += 0.6666666666666666;
          else if (this.isExtendedASCII(u)) i[Po] += 2.6666666666666665;
          else i[Po] += 1.3333333333333333;
          if (this.isNativeX12(u)) i[Ui] += 0.6666666666666666;
          else if (this.isExtendedASCII(u)) i[Ui] += 4.333333333333333;
          else i[Ui] += 3.3333333333333335;
          if (this.isNativeEDIFACT(u)) i[ji] += 0.75;
          else if (this.isExtendedASCII(u)) i[ji] += 4.25;
          else i[ji] += 3.25;
          if (this.isSpecialB256(u)) i[To] += 4;
          else i[To]++;
          if (o >= 4) {
            if (
              (yn.fill(s, 0),
              yn.fill(a, 0),
              this.findMinimums(i, a, Ut.MAX_VALUE, s),
              a[rn] < this.min(a[To], a[lo], a[Po], a[Ui], a[ji]))
            )
              return rn;
            if (a[To] < a[rn] || a[To] + 1 < this.min(a[lo], a[Po], a[Ui], a[ji])) return To;
            if (a[ji] + 1 < this.min(a[To], a[lo], a[Po], a[Ui], a[rn])) return ji;
            if (a[Po] + 1 < this.min(a[To], a[lo], a[ji], a[Ui], a[rn])) return Po;
            if (a[Ui] + 1 < this.min(a[To], a[lo], a[ji], a[Po], a[rn])) return Ui;
            if (a[lo] + 1 < this.min(a[rn], a[To], a[ji], a[Po])) {
              if (a[lo] < a[Ui]) return lo;
              if (a[lo] === a[Ui]) {
                var d = r + o + 1;
                while (d < t.length) {
                  var h = t.charCodeAt(d);
                  if (this.isX12TermSep(h)) return Ui;
                  if (!this.isNativeX12(h)) break;
                  d++;
                }
                return lo;
              }
            }
          }
        }
      }),
      (e.min = function (t, r, n, i, o) {
        var s = Math.min(t, Math.min(r, Math.min(n, i)));
        if (o === void 0) return s;
        else return Math.min(s, o);
      }),
      (e.findMinimums = function (t, r, n, i) {
        for (var o = 0; o < 6; o++) {
          var s = (r[o] = Math.ceil(t[o]));
          if (n > s) ((n = s), yn.fill(i, 0));
          if (n === s) i[o] = i[o] + 1;
        }
        return n;
      }),
      (e.getMinimumCount = function (t) {
        var r = 0;
        for (var n = 0; n < 6; n++) r += t[n];
        return r || 0;
      }),
      (e.isDigit = function (t) {
        return t >= 48 && t <= 57;
      }),
      (e.isExtendedASCII = function (t) {
        return t >= 128 && t <= 255;
      }),
      (e.isNativeC40 = function (t) {
        return t === 32 || (t >= 48 && t <= 57) || (t >= 65 && t <= 90);
      }),
      (e.isNativeText = function (t) {
        return t === 32 || (t >= 48 && t <= 57) || (t >= 97 && t <= 122);
      }),
      (e.isNativeX12 = function (t) {
        return this.isX12TermSep(t) || t === 32 || (t >= 48 && t <= 57) || (t >= 65 && t <= 90);
      }),
      (e.isX12TermSep = function (t) {
        return t === 13 || t === 42 || t === 62;
      }),
      (e.isNativeEDIFACT = function (t) {
        return t >= 32 && t <= 94;
      }),
      (e.isSpecialB256 = function (t) {
        return !1;
      }),
      (e.determineConsecutiveDigitCount = function (t, r) {
        if (r === void 0) r = 0;
        var n = t.length,
          i = r;
        while (i < n && this.isDigit(t.charCodeAt(i))) i++;
        return i - r;
      }),
      (e.illegalCharacter = function (t) {
        var r = Ut.toHexString(t.charCodeAt(0));
        throw (
          (r = "0000".substring(0, 4 - r.length) + r),
          Error("Illegal character: " + t + " (0x" + r + ")")
        );
      }),
      e
    );
  })(),
  yr = cle;
var KS = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  eH = (function () {
    function e(t) {
      ((this.charset = t), (this.name = t.name));
    }
    return (
      (e.prototype.canEncode = function (t) {
        try {
          return ki.encode(t, this.charset) != null;
        } catch (r) {
          return !1;
        }
      }),
      e
    );
  })(),
  tH = (function () {
    function e(t, r, n) {
      var i, o, s, a, l, c;
      ((this.ENCODERS = [
        "IBM437",
        "ISO-8859-2",
        "ISO-8859-3",
        "ISO-8859-4",
        "ISO-8859-5",
        "ISO-8859-6",
        "ISO-8859-7",
        "ISO-8859-8",
        "ISO-8859-9",
        "ISO-8859-10",
        "ISO-8859-11",
        "ISO-8859-13",
        "ISO-8859-14",
        "ISO-8859-15",
        "ISO-8859-16",
        "windows-1250",
        "windows-1251",
        "windows-1252",
        "windows-1256",
        "Shift_JIS",
      ].map(function (E) {
        return new eH(m0.forName(E));
      })),
        (this.encoders = []));
      var u = [];
      u.push(new eH(oA.ISO_8859_1));
      var d = r != null && r.name.startsWith("UTF");
      for (var h = 0; h < t.length; h++) {
        var f = !1;
        try {
          for (var p = ((i = void 0), KS(u)), g = p.next(); !g.done; g = p.next()) {
            var m = g.value,
              A = t.charAt(h),
              y = A.charCodeAt(0);
            if (y === n || m.canEncode(A)) {
              f = !0;
              break;
            }
          }
        } catch (E) {
          i = { error: E };
        } finally {
          try {
            if (g && !g.done && (o = p.return)) o.call(p);
          } finally {
            if (i) throw i.error;
          }
        }
        if (!f)
          try {
            for (var x = ((s = void 0), KS(this.ENCODERS)), b = x.next(); !b.done; b = x.next()) {
              var m = b.value;
              if (m.canEncode(t.charAt(h))) {
                (u.push(m), (f = !0));
                break;
              }
            }
          } catch (E) {
            s = { error: E };
          } finally {
            try {
              if (b && !b.done && (a = x.return)) a.call(x);
            } finally {
              if (s) throw s.error;
            }
          }
        if (!f) d = !0;
      }
      if (u.length === 1 && !d) this.encoders = [u[0]];
      else {
        this.encoders = [];
        var v = 0;
        try {
          for (var _ = KS(u), w = _.next(); !w.done; w = _.next()) {
            var m = w.value;
            this.encoders[v++] = m;
          }
        } catch (E) {
          l = { error: E };
        } finally {
          try {
            if (w && !w.done && (c = _.return)) c.call(_);
          } finally {
            if (l) throw l.error;
          }
        }
      }
      var S = -1;
      if (r != null) {
        for (var h = 0; h < this.encoders.length; h++)
          if (this.encoders[h] != null && r.name === this.encoders[h].name) {
            S = h;
            break;
          }
      }
      this.priorityEncoderIndex = S;
    }
    return (
      (e.prototype.length = function () {
        return this.encoders.length;
      }),
      (e.prototype.getCharsetName = function (t) {
        if (!(t < this.length())) throw Error("index must be less than length");
        return this.encoders[t].name;
      }),
      (e.prototype.getCharset = function (t) {
        if (!(t < this.length())) throw Error("index must be less than length");
        return this.encoders[t].charset;
      }),
      (e.prototype.getECIValue = function (t) {
        return this.encoders[t].charset.getValueIdentifier();
      }),
      (e.prototype.getPriorityEncoderIndex = function () {
        return this.priorityEncoderIndex;
      }),
      (e.prototype.canEncode = function (t, r) {
        if (!(r < this.length())) throw Error("index must be less than length");
        return !0;
      }),
      (e.prototype.encode = function (t, r) {
        if (!(r < this.length())) throw Error("index must be less than length");
        return ki.encode(er.getCharAt(t), this.encoders[r].name);
      }),
      e
    );
  })();
var ule = 3,
  nH = (function () {
    function e(t, r, n) {
      this.fnc1 = n;
      var i = new tH(t, r, n);
      if (i.length() === 1)
        for (var o = 0; o < this.bytes.length; o++) {
          var s = t.charAt(o).charCodeAt(0);
          this.bytes[o] = s === n ? 1000 : s;
        }
      else this.bytes = this.encodeMinimally(t, i, n);
    }
    return (
      (e.prototype.getFNC1Character = function () {
        return this.fnc1;
      }),
      (e.prototype.length = function () {
        return this.bytes.length;
      }),
      (e.prototype.haveNCharacters = function (t, r) {
        if (t + r - 1 >= this.bytes.length) return !1;
        for (var n = 0; n < r; n++) if (this.isECI(t + n)) return !1;
        return !0;
      }),
      (e.prototype.charAt = function (t) {
        if (t < 0 || t >= this.length()) throw Error("" + t);
        if (this.isECI(t)) throw Error("value at " + t + " is not a character but an ECI");
        return this.isFNC1(t) ? this.fnc1 : this.bytes[t];
      }),
      (e.prototype.subSequence = function (t, r) {
        if (t < 0 || t > r || r > this.length()) throw Error("" + t);
        var n = new Ot();
        for (var i = t; i < r; i++) {
          if (this.isECI(i)) throw Error("value at " + i + " is not a character but an ECI");
          n.append(this.charAt(i));
        }
        return n.toString();
      }),
      (e.prototype.isECI = function (t) {
        if (t < 0 || t >= this.length()) throw Error("" + t);
        return this.bytes[t] > 255 && this.bytes[t] <= 999;
      }),
      (e.prototype.isFNC1 = function (t) {
        if (t < 0 || t >= this.length()) throw Error("" + t);
        return this.bytes[t] === 1000;
      }),
      (e.prototype.getECIValue = function (t) {
        if (t < 0 || t >= this.length()) throw Error("" + t);
        if (!this.isECI(t)) throw Error("value at " + t + " is not an ECI but a character");
        return this.bytes[t] - 256;
      }),
      (e.prototype.addEdge = function (t, r, n) {
        if (
          t[r][n.encoderIndex] == null ||
          t[r][n.encoderIndex].cachedTotalSize > n.cachedTotalSize
        )
          t[r][n.encoderIndex] = n;
      }),
      (e.prototype.addEdges = function (t, r, n, i, o, s) {
        var a = t.charAt(i).charCodeAt(0),
          l = 0,
          c = r.length();
        if (
          r.getPriorityEncoderIndex() >= 0 &&
          (a === s || r.canEncode(a, r.getPriorityEncoderIndex()))
        )
          ((l = r.getPriorityEncoderIndex()), (c = l + 1));
        for (var u = l; u < c; u++)
          if (a === s || r.canEncode(a, u)) this.addEdge(n, i + 1, new rH(a, r, u, o, s));
      }),
      (e.prototype.encodeMinimally = function (t, r, n) {
        var i = t.length,
          o = new rH[i + 1][r.length()]();
        this.addEdges(t, r, o, 0, null, n);
        for (var s = 1; s <= i; s++) {
          for (var a = 0; a < r.length(); a++)
            if (o[s][a] != null && s < i) this.addEdges(t, r, o, s, o[s][a], n);
          for (var a = 0; a < r.length(); a++) o[s - 1][a] = null;
        }
        var l = -1,
          c = Ut.MAX_VALUE;
        for (var a = 0; a < r.length(); a++)
          if (o[i][a] != null) {
            var u = o[i][a];
            if (u.cachedTotalSize < c) ((c = u.cachedTotalSize), (l = a));
          }
        if (l < 0) throw Error('Failed to encode "' + t + '"');
        var d = [],
          h = o[i][l];
        while (h != null) {
          if (h.isFNC1()) d.unshift(1000);
          else {
            var f = r.encode(h.c, h.encoderIndex);
            for (var s = f.length - 1; s >= 0; s--) d.unshift(f[s] & 255);
          }
          var p = h.previous === null ? 0 : h.previous.encoderIndex;
          if (p !== h.encoderIndex) d.unshift(256 + r.getECIValue(h.encoderIndex));
          h = h.previous;
        }
        var g = [];
        for (var s = 0; s < g.length; s++) g[s] = d[s];
        return g;
      }),
      e
    );
  })();
var rH = (function () {
  function e(t, r, n, i, o) {
    ((this.c = t),
      (this.encoderSet = r),
      (this.encoderIndex = n),
      (this.previous = i),
      (this.fnc1 = o),
      (this.c = t === o ? 1000 : t));
    var s = this.isFNC1() ? 1 : r.encode(t, n).length,
      a = i === null ? 0 : i.encoderIndex;
    if (a !== n) s += ule;
    if (i != null) s += i.cachedTotalSize;
    this.cachedTotalSize = s;
  }
  return (
    (e.prototype.isFNC1 = function () {
      return this.c === 1000;
    }),
    e
  );
})();
var dle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  aA = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  hle = function (e, t) {
    var r = typeof Symbol === "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e),
      i,
      o = [],
      s;
    try {
      while ((t === void 0 || t-- > 0) && !(i = n.next()).done) o.push(i.value);
    } catch (a) {
      s = { error: a };
    } finally {
      try {
        if (i && !i.done && (r = n.return)) r.call(n);
      } finally {
        if (s) throw s.error;
      }
    }
    return o;
  },
  fle = function (e, t, r) {
    if (r || arguments.length === 2) {
      for (var n = 0, i = t.length, o; n < i; n++)
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
    }
    return e.concat(o || Array.prototype.slice.call(t));
  },
  bt;
(function (e) {
  ((e[(e.ASCII = 0)] = "ASCII"),
    (e[(e.C40 = 1)] = "C40"),
    (e[(e.TEXT = 2)] = "TEXT"),
    (e[(e.X12 = 3)] = "X12"),
    (e[(e.EDF = 4)] = "EDF"),
    (e[(e.B256 = 5)] = "B256"));
})(bt || (bt = {}));
var ple = [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
  ],
  cs = (function () {
    function e() {}
    return (
      (e.isExtendedASCII = function (t, r) {
        return t !== r && t >= 128 && t <= 255;
      }),
      (e.isInC40Shift1Set = function (t) {
        return t <= 31;
      }),
      (e.isInC40Shift2Set = function (t, r) {
        var n, i;
        try {
          for (var o = aA(ple), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            if (a.charCodeAt(0) === t) return !0;
          }
        } catch (l) {
          n = { error: l };
        } finally {
          try {
            if (s && !s.done && (i = o.return)) i.call(o);
          } finally {
            if (n) throw n.error;
          }
        }
        return t === r;
      }),
      (e.isInTextShift1Set = function (t) {
        return this.isInC40Shift1Set(t);
      }),
      (e.isInTextShift2Set = function (t, r) {
        return this.isInC40Shift2Set(t, r);
      }),
      (e.encodeHighLevel = function (t, r, n, i) {
        if (r === void 0) r = null;
        if (n === void 0) n = -1;
        if (i === void 0) i = 0;
        var o = 0;
        if (t.startsWith(im) && t.endsWith(sm))
          ((o = 5), (t = t.substring(im.length, t.length - 2)));
        else if (t.startsWith(om) && t.endsWith(sm))
          ((o = 6), (t = t.substring(om.length, t.length - 2)));
        return decodeURIComponent(
          escape(String.fromCharCode.apply(String, fle([], hle(this.encode(t, r, n, i, o)), !1))),
        );
      }),
      (e.encode = function (t, r, n, i, o) {
        return this.encodeMinimally(new gle(t, r, n, i, o)).getBytes();
      }),
      (e.addEdge = function (t, r) {
        var n = r.fromPosition + r.characterLength;
        if (
          t[n][r.getEndMode()] === null ||
          t[n][r.getEndMode()].cachedTotalSize > r.cachedTotalSize
        )
          t[n][r.getEndMode()] = r;
      }),
      (e.getNumberOfC40Words = function (t, r, n, i) {
        var o = 0;
        for (var s = r; s < t.length(); s++) {
          if (t.isECI(s)) return ((i[0] = 0), 0);
          var a = t.charAt(s);
          if ((n && yr.isNativeC40(a)) || (!n && yr.isNativeText(a))) o++;
          else if (!e.isExtendedASCII(a, t.getFNC1Character())) o += 2;
          else {
            var l = a & 255;
            if (l >= 128 && ((n && yr.isNativeC40(l - 128)) || (!n && yr.isNativeText(l - 128))))
              o += 3;
            else o += 4;
          }
          if (o % 3 === 0 || ((o - 2) % 3 === 0 && s + 1 === t.length()))
            return ((i[0] = s - r + 1), Math.ceil(o / 3));
        }
        return ((i[0] = 0), 0);
      }),
      (e.addEdges = function (t, r, n, i) {
        var o, s;
        if (t.isECI(n)) {
          this.addEdge(r, new bl(t, bt.ASCII, n, 1, i));
          return;
        }
        var a = t.charAt(n);
        if (i === null || i.getEndMode() !== bt.EDF) {
          if (yr.isDigit(a) && t.haveNCharacters(n, 2) && yr.isDigit(t.charAt(n + 1)))
            this.addEdge(r, new bl(t, bt.ASCII, n, 2, i));
          else this.addEdge(r, new bl(t, bt.ASCII, n, 1, i));
          var l = [bt.C40, bt.TEXT];
          try {
            for (var c = aA(l), u = c.next(); !u.done; u = c.next()) {
              var d = u.value,
                h = [];
              if (e.getNumberOfC40Words(t, n, d === bt.C40, h) > 0)
                this.addEdge(r, new bl(t, d, n, h[0], i));
            }
          } catch (g) {
            o = { error: g };
          } finally {
            try {
              if (u && !u.done && (s = c.return)) s.call(c);
            } finally {
              if (o) throw o.error;
            }
          }
          if (
            t.haveNCharacters(n, 3) &&
            yr.isNativeX12(t.charAt(n)) &&
            yr.isNativeX12(t.charAt(n + 1)) &&
            yr.isNativeX12(t.charAt(n + 2))
          )
            this.addEdge(r, new bl(t, bt.X12, n, 3, i));
          this.addEdge(r, new bl(t, bt.B256, n, 1, i));
        }
        var f;
        for (f = 0; f < 3; f++) {
          var p = n + f;
          if (t.haveNCharacters(p, 1) && yr.isNativeEDIFACT(t.charAt(p)))
            this.addEdge(r, new bl(t, bt.EDF, n, f + 1, i));
          else break;
        }
        if (f === 3 && t.haveNCharacters(n, 4) && yr.isNativeEDIFACT(t.charAt(n + 3)))
          this.addEdge(r, new bl(t, bt.EDF, n, 4, i));
      }),
      (e.encodeMinimally = function (t) {
        var r = t.length(),
          n = Array(r + 1)
            .fill(null)
            .map(function () {
              return Array(6).fill(0);
            });
        this.addEdges(t, n, 0, null);
        for (var i = 1; i <= r; i++) {
          for (var o = 0; o < 6; o++)
            if (n[i][o] !== null && i < r) this.addEdges(t, n, i, n[i][o]);
          for (var o = 0; o < 6; o++) n[i - 1][o] = null;
        }
        var s = -1,
          a = Ut.MAX_VALUE;
        for (var o = 0; o < 6; o++)
          if (n[r][o] !== null) {
            var l = n[r][o],
              c = o >= 1 && o <= 3 ? l.cachedTotalSize + 1 : l.cachedTotalSize;
            if (c < a) ((a = c), (s = o));
          }
        if (s < 0) throw Error('Failed to encode "' + t + '"');
        return new mle(n[r][s]);
      }),
      e
    );
  })();
var mle = (function () {
    function e(t) {
      var r = t.input,
        n = 0,
        i = [],
        o = [],
        s = [];
      if (
        (t.mode === bt.C40 || t.mode === bt.TEXT || t.mode === bt.X12) &&
        t.getEndMode() !== bt.ASCII
      )
        n += this.prepend(bl.getBytes(254), i);
      var a = t;
      while (a !== null) {
        if (
          ((n += this.prepend(a.getDataBytes(), i)),
          a.previous === null || a.getPreviousStartMode() !== a.getMode())
        ) {
          if (a.getMode() === bt.B256) {
            if (n <= 249) (i.unshift(n), n++);
            else (i.unshift(n % 250), i.unshift(n / 250 + 249), (n += 2));
            (o.push(i.length), s.push(n));
          }
          (this.prepend(a.getLatchBytes(), i), (n = 0));
        }
        a = a.previous;
      }
      if (r.getMacroId() === 5) n += this.prepend(bl.getBytes(236), i);
      else if (r.getMacroId() === 6) n += this.prepend(bl.getBytes(237), i);
      if (r.getFNC1Character() > 0) n += this.prepend(bl.getBytes(232), i);
      for (var l = 0; l < o.length; l++) this.applyRandomPattern(i, i.length - o[l], s[l]);
      var c = t.getMinSymbolSize(i.length);
      if (i.length < c) i.push(129);
      while (i.length < c) i.push(this.randomize253State(i.length + 1));
      this.bytes = new Uint8Array(i.length);
      for (var l = 0; l < this.bytes.length; l++) this.bytes[l] = i[l];
    }
    return (
      (e.prototype.prepend = function (t, r) {
        for (var n = t.length - 1; n >= 0; n--) r.unshift(t[n]);
        return t.length;
      }),
      (e.prototype.randomize253State = function (t) {
        var r = ((149 * t) % 253) + 1,
          n = 129 + r;
        return n <= 254 ? n : n - 254;
      }),
      (e.prototype.applyRandomPattern = function (t, r, n) {
        for (var i = 0; i < n; i++) {
          var o = r + i,
            s = t[o] & 255,
            a = ((149 * (o + 1)) % 255) + 1,
            l = s + a;
          t[o] = l <= 255 ? l : l - 256;
        }
      }),
      (e.prototype.getBytes = function () {
        return this.bytes;
      }),
      e
    );
  })(),
  bl = (function () {
    function e(t, r, n, i, o) {
      if (
        ((this.input = t),
        (this.mode = r),
        (this.fromPosition = n),
        (this.characterLength = i),
        (this.previous = o),
        (this.allCodewordCapacities = [
          3, 5, 8, 10, 12, 16, 18, 22, 30, 32, 36, 44, 49, 62, 86, 114, 144, 174, 204, 280, 368,
          456, 576, 696, 816, 1050, 1304, 1558,
        ]),
        (this.squareCodewordCapacities = [
          3, 5, 8, 12, 18, 22, 30, 36, 44, 62, 86, 114, 144, 174, 204, 280, 368, 456, 576, 696, 816,
          1050, 1304, 1558,
        ]),
        (this.rectangularCodewordCapacities = [5, 10, 16, 33, 32, 49]),
        !(n + i <= t.length()))
      )
        throw Error("Invalid edge");
      var s = o !== null ? o.cachedTotalSize : 0,
        a = this.getPreviousMode();
      switch (r) {
        case bt.ASCII:
          if ((s++, t.isECI(n) || cs.isExtendedASCII(t.charAt(n), t.getFNC1Character()))) s++;
          if (a === bt.C40 || a === bt.TEXT || a === bt.X12) s++;
          break;
        case bt.B256:
          if ((s++, a !== bt.B256)) s++;
          else if (this.getB256Size() === 250) s++;
          if (a === bt.ASCII) s++;
          else if (a === bt.C40 || a === bt.TEXT || a === bt.X12) s += 2;
          break;
        case bt.C40:
        case bt.TEXT:
        case bt.X12:
          if (r === bt.X12) s += 2;
          else {
            var l = [];
            s += cs.getNumberOfC40Words(t, n, r === bt.C40, l) * 2;
          }
          if (a === bt.ASCII || a === bt.B256) s++;
          else if (a !== r && (a === bt.C40 || a === bt.TEXT || a === bt.X12)) s += 2;
          break;
        case bt.EDF:
          if (((s += 3), a === bt.ASCII || a === bt.B256)) s++;
          else if (a === bt.C40 || a === bt.TEXT || a === bt.X12) s += 2;
          break;
      }
      this.cachedTotalSize = s;
    }
    return (
      (e.prototype.getB256Size = function () {
        var t = 0,
          r = this;
        while (r !== null && r.mode === bt.B256 && t <= 250) (t++, (r = r.previous));
        return t;
      }),
      (e.prototype.getPreviousStartMode = function () {
        return this.previous === null ? bt.ASCII : this.previous.mode;
      }),
      (e.prototype.getPreviousMode = function () {
        return this.previous === null ? bt.ASCII : this.previous.getEndMode();
      }),
      (e.prototype.getEndMode = function () {
        if (this.mode === bt.EDF) {
          if (this.characterLength < 4) return bt.ASCII;
          var t = this.getLastASCII();
          if (t > 0 && this.getCodewordsRemaining(this.cachedTotalSize + t) <= 2 - t)
            return bt.ASCII;
        }
        if (this.mode === bt.C40 || this.mode === bt.TEXT || this.mode === bt.X12) {
          if (
            this.fromPosition + this.characterLength >= this.input.length() &&
            this.getCodewordsRemaining(this.cachedTotalSize) === 0
          )
            return bt.ASCII;
          var t = this.getLastASCII();
          if (t === 1 && this.getCodewordsRemaining(this.cachedTotalSize + 1) === 0)
            return bt.ASCII;
        }
        return this.mode;
      }),
      (e.prototype.getMode = function () {
        return this.mode;
      }),
      (e.prototype.getLastASCII = function () {
        var t = this.input.length(),
          r = this.fromPosition + this.characterLength;
        if (t - r > 4 || r >= t) return 0;
        if (t - r === 1) {
          if (cs.isExtendedASCII(this.input.charAt(r), this.input.getFNC1Character())) return 0;
          return 1;
        }
        if (t - r === 2) {
          if (
            cs.isExtendedASCII(this.input.charAt(r), this.input.getFNC1Character()) ||
            cs.isExtendedASCII(this.input.charAt(r + 1), this.input.getFNC1Character())
          )
            return 0;
          if (yr.isDigit(this.input.charAt(r)) && yr.isDigit(this.input.charAt(r + 1))) return 1;
          return 2;
        }
        if (t - r === 3) {
          if (
            yr.isDigit(this.input.charAt(r)) &&
            yr.isDigit(this.input.charAt(r + 1)) &&
            !cs.isExtendedASCII(this.input.charAt(r + 2), this.input.getFNC1Character())
          )
            return 2;
          if (
            yr.isDigit(this.input.charAt(r + 1)) &&
            yr.isDigit(this.input.charAt(r + 2)) &&
            !cs.isExtendedASCII(this.input.charAt(r), this.input.getFNC1Character())
          )
            return 2;
          return 0;
        }
        if (
          yr.isDigit(this.input.charAt(r)) &&
          yr.isDigit(this.input.charAt(r + 1)) &&
          yr.isDigit(this.input.charAt(r + 2)) &&
          yr.isDigit(this.input.charAt(r + 3))
        )
          return 2;
        return 0;
      }),
      (e.prototype.getMinSymbolSize = function (t) {
        var r, n, i, o, s, a;
        switch (this.input.getShapeHint()) {
          case 1:
            try {
              for (var l = aA(this.squareCodewordCapacities), c = l.next(); !c.done; c = l.next()) {
                var u = c.value;
                if (u >= t) return u;
              }
            } catch (g) {
              r = { error: g };
            } finally {
              try {
                if (c && !c.done && (n = l.return)) n.call(l);
              } finally {
                if (r) throw r.error;
              }
            }
            break;
          case 2:
            try {
              for (
                var d = aA(this.rectangularCodewordCapacities), h = d.next();
                !h.done;
                h = d.next()
              ) {
                var u = h.value;
                if (u >= t) return u;
              }
            } catch (g) {
              i = { error: g };
            } finally {
              try {
                if (h && !h.done && (o = d.return)) o.call(d);
              } finally {
                if (i) throw i.error;
              }
            }
            break;
        }
        try {
          for (var f = aA(this.allCodewordCapacities), p = f.next(); !p.done; p = f.next()) {
            var u = p.value;
            if (u >= t) return u;
          }
        } catch (g) {
          s = { error: g };
        } finally {
          try {
            if (p && !p.done && (a = f.return)) a.call(f);
          } finally {
            if (s) throw s.error;
          }
        }
        return this.allCodewordCapacities[this.allCodewordCapacities.length - 1];
      }),
      (e.prototype.getCodewordsRemaining = function (t) {
        return this.getMinSymbolSize(t) - t;
      }),
      (e.getBytes = function (t, r) {
        var n = new Uint8Array(r ? 2 : 1);
        if (((n[0] = t), r)) n[1] = r;
        return n;
      }),
      (e.prototype.setC40Word = function (t, r, n, i, o) {
        var s = 1600 * (n & 255) + 40 * (i & 255) + (o & 255) + 1;
        ((t[r] = s / 256), (t[r + 1] = s % 256));
      }),
      (e.prototype.getX12Value = function (t) {
        return t === 13
          ? 0
          : t === 42
            ? 1
            : t === 62
              ? 2
              : t === 32
                ? 3
                : t >= 48 && t <= 57
                  ? t - 44
                  : t >= 65 && t <= 90
                    ? t - 51
                    : t;
      }),
      (e.prototype.getX12Words = function () {
        if (this.characterLength % 3 !== 0) throw Error("X12 words must be a multiple of 3");
        var t = new Uint8Array((this.characterLength / 3) * 2);
        for (var r = 0; r < t.length; r += 2)
          this.setC40Word(
            t,
            r,
            this.getX12Value(this.input.charAt(this.fromPosition + (r / 2) * 3)),
            this.getX12Value(this.input.charAt(this.fromPosition + (r / 2) * 3 + 1)),
            this.getX12Value(this.input.charAt(this.fromPosition + (r / 2) * 3 + 2)),
          );
        return t;
      }),
      (e.prototype.getShiftValue = function (t, r, n) {
        return (r && cs.isInC40Shift1Set(t)) || (!r && cs.isInTextShift1Set(t))
          ? 0
          : (r && cs.isInC40Shift2Set(t, n)) || (!r && cs.isInTextShift2Set(t, n))
            ? 1
            : 2;
      }),
      (e.prototype.getC40Value = function (t, r, n, i) {
        if (n === i) {
          if (r !== 2) throw Error("FNC1 cannot be used in C40 shift 2");
          return 27;
        }
        if (t)
          return n <= 31
            ? n
            : n === 32
              ? 3
              : n <= 47
                ? n - 33
                : n <= 57
                  ? n - 44
                  : n <= 64
                    ? n - 43
                    : n <= 90
                      ? n - 51
                      : n <= 95
                        ? n - 69
                        : n <= 127
                          ? n - 96
                          : n;
        else
          return n === 0
            ? 0
            : r === 0 && n <= 3
              ? n - 1
              : r === 1 && n <= 31
                ? n
                : n === 32
                  ? 3
                  : n >= 33 && n <= 47
                    ? n - 33
                    : n >= 48 && n <= 57
                      ? n - 44
                      : n >= 58 && n <= 64
                        ? n - 43
                        : n >= 65 && n <= 90
                          ? n - 64
                          : n >= 91 && n <= 95
                            ? n - 69
                            : n === 96
                              ? 0
                              : n >= 97 && n <= 122
                                ? n - 83
                                : n >= 123 && n <= 127
                                  ? n - 96
                                  : n;
      }),
      (e.prototype.getC40Words = function (t, r) {
        var n = [];
        for (var i = 0; i < this.characterLength; i++) {
          var o = this.input.charAt(this.fromPosition + i);
          if ((t && yr.isNativeC40(o)) || (!t && yr.isNativeText(o)))
            n.push(this.getC40Value(t, 0, o, r));
          else if (!cs.isExtendedASCII(o, r)) {
            var s = this.getShiftValue(o, t, r);
            (n.push(s), n.push(this.getC40Value(t, s, o, r)));
          } else {
            var a = (o & 255) - 128;
            if ((t && yr.isNativeC40(a)) || (!t && yr.isNativeText(a)))
              (n.push(1), n.push(30), n.push(this.getC40Value(t, 0, a, r)));
            else {
              (n.push(1), n.push(30));
              var s = this.getShiftValue(a, t, r);
              (n.push(s), n.push(this.getC40Value(t, s, a, r)));
            }
          }
        }
        if (n.length % 3 !== 0) {
          if (
            !(
              (n.length - 2) % 3 === 0 &&
              this.fromPosition + this.characterLength === this.input.length()
            )
          )
            throw Error("C40 words must be a multiple of 3");
          n.push(0);
        }
        var l = new Uint8Array((n.length / 3) * 2),
          c = 0;
        for (var i = 0; i < n.length; i += 3)
          (this.setC40Word(l, c, n[i] & 255, n[i + 1] & 255, n[i + 2] & 255), (c += 2));
        return l;
      }),
      (e.prototype.getEDFBytes = function () {
        var t = Math.ceil(this.characterLength / 4),
          r = new Uint8Array(t * 3),
          n = this.fromPosition,
          i = Math.min(this.fromPosition + this.characterLength - 1, this.input.length() - 1);
        for (var o = 0; o < t; o += 3) {
          var s = [];
          for (var a = 0; a < 4; a++)
            if (n <= i) s[a] = this.input.charAt(n++) & 63;
            else s[a] = n === i + 1 ? 31 : 0;
          var l = s[0] << 18;
          ((l |= s[1] << 12),
            (l |= s[2] << 6),
            (l |= s[3]),
            (r[o] = (l >> 16) & 255),
            (r[o + 1] = (l >> 8) & 255),
            (r[o + 2] = l & 255));
        }
        return r;
      }),
      (e.prototype.getLatchBytes = function () {
        switch (this.getPreviousMode()) {
          case bt.ASCII:
          case bt.B256:
            switch (this.mode) {
              case bt.B256:
                return e.getBytes(231);
              case bt.C40:
                return e.getBytes(230);
              case bt.TEXT:
                return e.getBytes(239);
              case bt.X12:
                return e.getBytes(238);
              case bt.EDF:
                return e.getBytes(240);
            }
            break;
          case bt.C40:
          case bt.TEXT:
          case bt.X12:
            if (this.mode !== this.getPreviousMode())
              switch (this.mode) {
                case bt.ASCII:
                  return e.getBytes(254);
                case bt.B256:
                  return e.getBytes(254, 231);
                case bt.C40:
                  return e.getBytes(254, 230);
                case bt.TEXT:
                  return e.getBytes(254, 239);
                case bt.X12:
                  return e.getBytes(254, 238);
                case bt.EDF:
                  return e.getBytes(254, 240);
              }
            break;
          case bt.EDF:
            if (this.mode !== bt.EDF) throw Error("Cannot switch from EDF to " + this.mode);
            break;
        }
        return new Uint8Array(0);
      }),
      (e.prototype.getDataBytes = function () {
        switch (this.mode) {
          case bt.ASCII:
            if (this.input.isECI(this.fromPosition))
              return e.getBytes(241, this.input.getECIValue(this.fromPosition) + 1);
            else if (
              cs.isExtendedASCII(
                this.input.charAt(this.fromPosition),
                this.input.getFNC1Character(),
              )
            )
              return e.getBytes(235, this.input.charAt(this.fromPosition) - 127);
            else if (this.characterLength === 2)
              return e.getBytes(
                this.input.charAt(this.fromPosition) * 10 +
                  this.input.charAt(this.fromPosition + 1) +
                  130,
              );
            else if (this.input.isFNC1(this.fromPosition)) return e.getBytes(232);
            else return e.getBytes(this.input.charAt(this.fromPosition) + 1);
          case bt.B256:
            return e.getBytes(this.input.charAt(this.fromPosition));
          case bt.C40:
            return this.getC40Words(!0, this.input.getFNC1Character());
          case bt.TEXT:
            return this.getC40Words(!1, this.input.getFNC1Character());
          case bt.X12:
            return this.getX12Words();
          case bt.EDF:
            return this.getEDFBytes();
        }
      }),
      e
    );
  })(),
  gle = (function (e) {
    dle(t, e);
    function t(r, n, i, o, s) {
      var a = e.call(this, r, n, i) || this;
      return ((a.shape = o), (a.macroId = s), a);
    }
    return (
      (t.prototype.getMacroId = function () {
        return this.macroId;
      }),
      (t.prototype.getShapeHint = function () {
        return this.shape;
      }),
      t
    );
  })(nH);
var nNe = (function () {
  function e() {}
  return (
    (e.prototype.encode = function (t, r, n, i, o) {
      if (o === void 0) o = null;
      if (t.trim() === "") throw Error("Found empty contents");
      if (r !== at.DATA_MATRIX) throw Error("Can only encode DATA_MATRIX, but got " + r);
      if (n < 0 || i < 0) throw Error("Requested dimensions can't be negative: " + n + "x" + i);
      var s = 0,
        a = null,
        l = null;
      if (o != null) {
        var c = o.get(br.DATA_MATRIX_SHAPE);
        if (c != null) s = c;
        var u = o.get(br.MIN_SIZE);
        if (u != null) a = u;
        var d = o.get(br.MAX_SIZE);
        if (d != null) l = d;
      }
      var h,
        f =
          o != null &&
          o.has(br.DATA_MATRIX_COMPACT) &&
          Boolean(o.get(br.DATA_MATRIX_COMPACT).toString());
      if (f) {
        var p = o.has(br.GS1_FORMAT) && Boolean(o.get(br.GS1_FORMAT).toString()),
          g = null,
          m = o.has(br.CHARACTER_SET);
        if (m) g = m0.forName(o.get(br.CHARACTER_SET).toString());
        h = cs.encodeHighLevel(t, g, p ? 29 : -1, s);
      } else {
        var A = o != null && o.has(br.FORCE_C40) && Boolean(o.get(br.FORCE_C40).toString());
        h = yr.encodeHighLevel(t, s, a, l, A);
      }
      var y = am.lookup(h.length, s, a, l, !0),
        x = Z_.encodeECC200(h, y),
        b = new j_(x, y.getSymbolDataWidth(), y.getSymbolDataHeight());
      return (b.place(), this.encodeLowLevel(b, y, n, i));
    }),
    (e.prototype.encodeLowLevel = function (t, r, n, i) {
      var o = r.getSymbolDataWidth(),
        s = r.getSymbolDataHeight(),
        a = new iA(r.getSymbolWidth(), r.getSymbolHeight()),
        l = 0;
      for (var c = 0; c < s; c++) {
        var u = void 0;
        if (c % r.matrixHeight === 0) {
          u = 0;
          for (var d = 0; d < r.getSymbolWidth(); d++) (a.setBoolean(u, l, d % 2 === 0), u++);
          l++;
        }
        u = 0;
        for (var d = 0; d < o; d++) {
          if (d % r.matrixWidth === 0) (a.setBoolean(u, l, !0), u++);
          if ((a.setBoolean(u, l, t.getBit(d, c)), u++, d % r.matrixWidth === r.matrixWidth - 1))
            (a.setBoolean(u, l, c % 2 === 0), u++);
        }
        if ((l++, c % r.matrixHeight === r.matrixHeight - 1)) {
          u = 0;
          for (var d = 0; d < r.getSymbolWidth(); d++) (a.setBoolean(u, l, !0), u++);
          l++;
        }
      }
      return this.convertByteMatrixToBitMatrix(a, n, i);
    }),
    (e.prototype.convertByteMatrixToBitMatrix = function (t, r, n) {
      var i = t.getWidth(),
        o = t.getHeight(),
        s = Math.max(r, i),
        a = Math.max(n, o),
        l = Math.min(s / i, a / o),
        c = (s - i * l) / 2,
        u = (a - o * l) / 2,
        d;
      if (n < o || r < i) ((c = 0), (u = 0), (d = new bn(i, o)));
      else d = new bn(r, n);
      d.clear();
      for (var h = 0, f = u; h < o; h++, f += l)
        for (var p = 0, g = c; p < i; p++, g += l) if (t.get(p, h) === 1) d.setRegion(g, f, l, l);
      return d;
    }),
    e
  );
})();
var Ale = (function () {
    function e() {}
    return (
      (e.prototype.isCompact = function () {
        return this.compact;
      }),
      (e.prototype.setCompact = function (t) {
        this.compact = t;
      }),
      (e.prototype.getSize = function () {
        return this.size;
      }),
      (e.prototype.setSize = function (t) {
        this.size = t;
      }),
      (e.prototype.getLayers = function () {
        return this.layers;
      }),
      (e.prototype.setLayers = function (t) {
        this.layers = t;
      }),
      (e.prototype.getCodeWords = function () {
        return this.codeWords;
      }),
      (e.prototype.setCodeWords = function (t) {
        this.codeWords = t;
      }),
      (e.prototype.getMatrix = function () {
        return this.matrix;
      }),
      (e.prototype.setMatrix = function (t) {
        this.matrix = t;
      }),
      e
    );
  })(),
  qS = Ale;
var yle = (function () {
    function e() {}
    return (
      (e.singletonList = function (t) {
        return [t];
      }),
      (e.min = function (t, r) {
        return t.sort(r)[0];
      }),
      e
    );
  })(),
  ZS = yle;
var xle = (function () {
    function e(t) {
      this.previous = t;
    }
    return (
      (e.prototype.getPrevious = function () {
        return this.previous;
      }),
      e
    );
  })(),
  iH = xle;
var ble = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  _le = (function (e) {
    ble(t, e);
    function t(r, n, i) {
      var o = e.call(this, r) || this;
      return ((o.value = n), (o.bitCount = i), o);
    }
    return (
      (t.prototype.appendTo = function (r, n) {
        r.appendBits(this.value, this.bitCount);
      }),
      (t.prototype.add = function (r, n) {
        return new t(this, r, n);
      }),
      (t.prototype.addBinaryShift = function (r, n) {
        return new t(this, r, n);
      }),
      (t.prototype.toString = function () {
        var r = this.value & ((1 << this.bitCount) - 1);
        return (
          (r |= 1 << this.bitCount),
          "<" + Ut.toBinaryString(r | (1 << this.bitCount)).substring(1) + ">"
        );
      }),
      t
    );
  })(iH),
  lm = _le;
var vle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  Cle = (function (e) {
    vle(t, e);
    function t(r, n, i) {
      var o = e.call(this, r, 0, 0) || this;
      return ((o.binaryShiftStart = n), (o.binaryShiftByteCount = i), o);
    }
    return (
      (t.prototype.appendTo = function (r, n) {
        for (var i = 0; i < this.binaryShiftByteCount; i++) {
          if (i === 0 || (i === 31 && this.binaryShiftByteCount <= 62))
            if ((r.appendBits(31, 5), this.binaryShiftByteCount > 62))
              r.appendBits(this.binaryShiftByteCount - 31, 16);
            else if (i === 0) r.appendBits(Math.min(this.binaryShiftByteCount, 31), 5);
            else r.appendBits(this.binaryShiftByteCount - 31, 5);
          r.appendBits(n[this.binaryShiftStart + i], 8);
        }
      }),
      (t.prototype.addBinaryShift = function (r, n) {
        return new t(this, r, n);
      }),
      (t.prototype.toString = function () {
        return (
          "<" +
          this.binaryShiftStart +
          "::" +
          (this.binaryShiftStart + this.binaryShiftByteCount - 1) +
          ">"
        );
      }),
      t
    );
  })(lm),
  oH = Cle;
function sH(e, t, r) {
  return new oH(e, t, r);
}
function cm(e, t, r) {
  return new lm(e, t, r);
}
var aH = ["UPPER", "LOWER", "DIGIT", "MIXED", "PUNCT"],
  ec = 0,
  um = 1,
  us = 2,
  $_ = 3,
  oa = 4,
  lH = new lm(null, 0, 0);
var ev = [
  Int32Array.from([0, 327708, 327710, 327709, 656318]),
  Int32Array.from([590318, 0, 327710, 327709, 656318]),
  Int32Array.from([262158, 590300, 0, 590301, 932798]),
  Int32Array.from([327709, 327708, 656318, 0, 327710]),
  Int32Array.from([327711, 656380, 656382, 656381, 0]),
];
var Ele = function (e) {
  var t = typeof Symbol === "function" && Symbol.iterator,
    r = t && e[t],
    n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length === "number")
    return {
      next: function () {
        if (e && n >= e.length) e = void 0;
        return { value: e && e[n++], done: !e };
      },
    };
  throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function Sle(e) {
  var t, r;
  try {
    for (var n = Ele(e), i = n.next(); !i.done; i = n.next()) {
      var o = i.value;
      yn.fill(o, -1);
    }
  } catch (s) {
    t = { error: s };
  } finally {
    try {
      if (i && !i.done && (r = n.return)) r.call(n);
    } finally {
      if (t) throw t.error;
    }
  }
  return (
    (e[ec][oa] = 0),
    (e[um][oa] = 0),
    (e[um][ec] = 28),
    (e[$_][oa] = 0),
    (e[us][oa] = 0),
    (e[us][ec] = 15),
    e
  );
}
var tv = Sle(yn.createInt32Array(6, 6));
var Mle = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Ile = (function () {
    function e(t, r, n, i) {
      ((this.token = t), (this.mode = r), (this.binaryShiftByteCount = n), (this.bitCount = i));
    }
    return (
      (e.prototype.getMode = function () {
        return this.mode;
      }),
      (e.prototype.getToken = function () {
        return this.token;
      }),
      (e.prototype.getBinaryShiftByteCount = function () {
        return this.binaryShiftByteCount;
      }),
      (e.prototype.getBitCount = function () {
        return this.bitCount;
      }),
      (e.prototype.latchAndAppend = function (t, r) {
        var n = this.bitCount,
          i = this.token;
        if (t !== this.mode) {
          var o = ev[this.mode][t];
          ((i = cm(i, o & 65535, o >> 16)), (n += o >> 16));
        }
        var s = t === us ? 4 : 5;
        return ((i = cm(i, r, s)), new e(i, t, 0, n + s));
      }),
      (e.prototype.shiftAndAppend = function (t, r) {
        var n = this.token,
          i = this.mode === us ? 4 : 5;
        return (
          (n = cm(n, tv[this.mode][t], i)),
          (n = cm(n, r, 5)),
          new e(n, this.mode, 0, this.bitCount + i + 5)
        );
      }),
      (e.prototype.addBinaryShiftChar = function (t) {
        var r = this.token,
          n = this.mode,
          i = this.bitCount;
        if (this.mode === oa || this.mode === us) {
          var o = ev[n][ec];
          ((r = cm(r, o & 65535, o >> 16)), (i += o >> 16), (n = ec));
        }
        var s =
            this.binaryShiftByteCount === 0 || this.binaryShiftByteCount === 31
              ? 18
              : this.binaryShiftByteCount === 62
                ? 9
                : 8,
          a = new e(r, n, this.binaryShiftByteCount + 1, i + s);
        if (a.binaryShiftByteCount === 2078) a = a.endBinaryShift(t + 1);
        return a;
      }),
      (e.prototype.endBinaryShift = function (t) {
        if (this.binaryShiftByteCount === 0) return this;
        var r = this.token;
        return (
          (r = sH(r, t - this.binaryShiftByteCount, this.binaryShiftByteCount)),
          new e(r, this.mode, 0, this.bitCount)
        );
      }),
      (e.prototype.isBetterThanOrEqualTo = function (t) {
        var r = this.bitCount + (ev[this.mode][t.mode] >> 16);
        if (this.binaryShiftByteCount < t.binaryShiftByteCount)
          r += e.calculateBinaryShiftCost(t) - e.calculateBinaryShiftCost(this);
        else if (this.binaryShiftByteCount > t.binaryShiftByteCount && t.binaryShiftByteCount > 0)
          r += 10;
        return r <= t.bitCount;
      }),
      (e.prototype.toBitArray = function (t) {
        var r,
          n,
          i = [];
        for (var o = this.endBinaryShift(t.length).token; o !== null; o = o.getPrevious())
          i.unshift(o);
        var s = new $n();
        try {
          for (var a = Mle(i), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            c.appendTo(s, t);
          }
        } catch (u) {
          r = { error: u };
        } finally {
          try {
            if (l && !l.done && (n = a.return)) n.call(a);
          } finally {
            if (r) throw r.error;
          }
        }
        return s;
      }),
      (e.prototype.toString = function () {
        return er.format(
          "%s bits=%d bytes=%d",
          aH[this.mode],
          this.bitCount,
          this.binaryShiftByteCount,
        );
      }),
      (e.calculateBinaryShiftCost = function (t) {
        if (t.binaryShiftByteCount > 62) return 21;
        if (t.binaryShiftByteCount > 31) return 20;
        if (t.binaryShiftByteCount > 0) return 10;
        return 0;
      }),
      (e.INITIAL_STATE = new e(lH, ec, 0, 0)),
      e
    );
  })(),
  uH = Ile;
function Rle(e) {
  var t = er.getCharCode(" "),
    r = er.getCharCode("."),
    n = er.getCharCode(",");
  e[ec][t] = 1;
  var i = er.getCharCode("Z"),
    o = er.getCharCode("A");
  for (var s = o; s <= i; s++) e[ec][s] = s - o + 2;
  e[um][t] = 1;
  var a = er.getCharCode("z"),
    l = er.getCharCode("a");
  for (var s = l; s <= a; s++) e[um][s] = s - l + 2;
  e[us][t] = 1;
  var c = er.getCharCode("9"),
    u = er.getCharCode("0");
  for (var s = u; s <= c; s++) e[us][s] = s - u + 2;
  ((e[us][n] = 12), (e[us][r] = 13));
  var d = [
    "\x00",
    " ",
    "\x01",
    "\x02",
    "\x03",
    "\x04",
    "\x05",
    "\x06",
    "\x07",
    "\b",
    "\t",
    `
`,
    "\v",
    "\f",
    "\r",
    "\x1B",
    "\x1C",
    "\x1D",
    "\x1E",
    "\x1F",
    "@",
    "\\",
    "^",
    "_",
    "`",
    "|",
    "~",
    "",
  ];
  for (var h = 0; h < d.length; h++) e[$_][er.getCharCode(d[h])] = h;
  var f = [
    "\x00",
    "\r",
    "\x00",
    "\x00",
    "\x00",
    "\x00",
    "!",
    "'",
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "[",
    "]",
    "{",
    "}",
  ];
  for (var h = 0; h < f.length; h++) if (er.getCharCode(f[h]) > 0) e[oa][er.getCharCode(f[h])] = h;
  return e;
}
var rv = Rle(yn.createInt32Array(5, 256));
var nv = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Lle = (function () {
    function e(t) {
      this.text = t;
    }
    return (
      (e.prototype.encode = function () {
        var t = er.getCharCode(" "),
          r = er.getCharCode(`
`),
          n = ZS.singletonList(uH.INITIAL_STATE);
        for (var i = 0; i < this.text.length; i++) {
          var o = void 0,
            s = i + 1 < this.text.length ? this.text[i + 1] : 0;
          switch (this.text[i]) {
            case er.getCharCode("\r"):
              o = s === r ? 2 : 0;
              break;
            case er.getCharCode("."):
              o = s === t ? 3 : 0;
              break;
            case er.getCharCode(","):
              o = s === t ? 4 : 0;
              break;
            case er.getCharCode(":"):
              o = s === t ? 5 : 0;
              break;
            default:
              o = 0;
          }
          if (o > 0) ((n = e.updateStateListForPair(n, i, o)), i++);
          else n = this.updateStateListForChar(n, i);
        }
        var a = ZS.min(n, function (l, c) {
          return l.getBitCount() - c.getBitCount();
        });
        return a.toBitArray(this.text);
      }),
      (e.prototype.updateStateListForChar = function (t, r) {
        var n,
          i,
          o = [];
        try {
          for (var s = nv(t), a = s.next(); !a.done; a = s.next()) {
            var l = a.value;
            this.updateStateForChar(l, r, o);
          }
        } catch (c) {
          n = { error: c };
        } finally {
          try {
            if (a && !a.done && (i = s.return)) i.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
        return e.simplifyStates(o);
      }),
      (e.prototype.updateStateForChar = function (t, r, n) {
        var i = this.text[r] & 255,
          o = rv[t.getMode()][i] > 0,
          s = null;
        for (var a = 0; a <= oa; a++) {
          var l = rv[a][i];
          if (l > 0) {
            if (s == null) s = t.endBinaryShift(r);
            if (!o || a === t.getMode() || a === us) {
              var c = s.latchAndAppend(a, l);
              n.push(c);
            }
            if (!o && tv[t.getMode()][a] >= 0) {
              var u = s.shiftAndAppend(a, l);
              n.push(u);
            }
          }
        }
        if (t.getBinaryShiftByteCount() > 0 || rv[t.getMode()][i] === 0) {
          var d = t.addBinaryShiftChar(r);
          n.push(d);
        }
      }),
      (e.updateStateListForPair = function (t, r, n) {
        var i,
          o,
          s = [];
        try {
          for (var a = nv(t), l = a.next(); !l.done; l = a.next()) {
            var c = l.value;
            this.updateStateForPair(c, r, n, s);
          }
        } catch (u) {
          i = { error: u };
        } finally {
          try {
            if (l && !l.done && (o = a.return)) o.call(a);
          } finally {
            if (i) throw i.error;
          }
        }
        return this.simplifyStates(s);
      }),
      (e.updateStateForPair = function (t, r, n, i) {
        var o = t.endBinaryShift(r);
        if ((i.push(o.latchAndAppend(oa, n)), t.getMode() !== oa)) i.push(o.shiftAndAppend(oa, n));
        if (n === 3 || n === 4) {
          var s = o.latchAndAppend(us, 16 - n).latchAndAppend(us, 1);
          i.push(s);
        }
        if (t.getBinaryShiftByteCount() > 0) {
          var a = t.addBinaryShiftChar(r).addBinaryShiftChar(r + 1);
          i.push(a);
        }
      }),
      (e.simplifyStates = function (t) {
        var r,
          n,
          i,
          o,
          s = [];
        try {
          for (var a = nv(t), l = a.next(); !l.done; l = a.next()) {
            var c = l.value,
              u = !0,
              d = function (m) {
                if (m.isBetterThanOrEqualTo(c)) return ((u = !1), "break");
                if (c.isBetterThanOrEqualTo(m))
                  s = s.filter(function (A) {
                    return A !== m;
                  });
              };
            try {
              for (var h = ((i = void 0), nv(s)), f = h.next(); !f.done; f = h.next()) {
                var p = f.value,
                  g = d(p);
                if (g === "break") break;
              }
            } catch (m) {
              i = { error: m };
            } finally {
              try {
                if (f && !f.done && (o = h.return)) o.call(h);
              } finally {
                if (i) throw i.error;
              }
            }
            if (u) s.push(c);
          }
        } catch (m) {
          r = { error: m };
        } finally {
          try {
            if (l && !l.done && (n = a.return)) n.call(a);
          } finally {
            if (r) throw r.error;
          }
        }
        return s;
      }),
      e
    );
  })(),
  $S = Lle;
var Ble = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Fle = (function () {
    function e() {}
    return (
      (e.encodeBytes = function (t) {
        return e.encode(t, e.DEFAULT_EC_PERCENT, e.DEFAULT_AZTEC_LAYERS);
      }),
      (e.encode = function (t, r, n) {
        var i = new $S(t).encode(),
          o = Ut.truncDivision(i.getSize() * r, 100) + 11,
          s = i.getSize() + o,
          a,
          l,
          c,
          u,
          d;
        if (n !== e.DEFAULT_AZTEC_LAYERS) {
          if (((a = n < 0), (l = Math.abs(n)), l > (a ? e.MAX_NB_BITS_COMPACT : e.MAX_NB_BITS)))
            throw new nt(er.format("Illegal value %s for layers", n));
          ((c = e.totalBitsInLayer(l, a)), (u = e.WORD_SIZE[l]));
          var h = c - (c % u);
          if (((d = e.stuffBits(i, u)), d.getSize() + o > h))
            throw new nt("Data to large for user specified layer");
          if (a && d.getSize() > u * 64) throw new nt("Data to large for user specified layer");
        } else {
          ((u = 0), (d = null));
          for (var f = 0; ; f++) {
            if (f > e.MAX_NB_BITS) throw new nt("Data too large for an Aztec code");
            if (((a = f <= 3), (l = a ? f + 1 : f), (c = e.totalBitsInLayer(l, a)), s > c))
              continue;
            if (d == null || u !== e.WORD_SIZE[l]) ((u = e.WORD_SIZE[l]), (d = e.stuffBits(i, u)));
            var h = c - (c % u);
            if (a && d.getSize() > u * 64) continue;
            if (d.getSize() + o <= h) break;
          }
        }
        var p = e.generateCheckWords(d, c, u),
          g = d.getSize() / u,
          m = e.generateModeMessage(a, l, g),
          A = (a ? 11 : 14) + l * 4,
          y = new Int32Array(A),
          x;
        if (a) {
          x = A;
          for (var f = 0; f < y.length; f++) y[f] = f;
        } else {
          x = A + 1 + 2 * Ut.truncDivision(Ut.truncDivision(A, 2) - 1, 15);
          var b = Ut.truncDivision(A, 2),
            v = Ut.truncDivision(x, 2);
          for (var f = 0; f < b; f++) {
            var _ = f + Ut.truncDivision(f, 15);
            ((y[b - f - 1] = v - _ - 1), (y[b + f] = v + _ + 1));
          }
        }
        var w = new bn(x);
        for (var f = 0, S = 0; f < l; f++) {
          var E = (l - f) * 4 + (a ? 9 : 12);
          for (var T = 0; T < E; T++) {
            var M = T * 2;
            for (var C = 0; C < 2; C++) {
              if (p.get(S + M + C)) w.set(y[f * 2 + C], y[f * 2 + T]);
              if (p.get(S + E * 2 + M + C)) w.set(y[f * 2 + T], y[A - 1 - f * 2 - C]);
              if (p.get(S + E * 4 + M + C)) w.set(y[A - 1 - f * 2 - C], y[A - 1 - f * 2 - T]);
              if (p.get(S + E * 6 + M + C)) w.set(y[A - 1 - f * 2 - T], y[f * 2 + C]);
            }
          }
          S += E * 8;
        }
        if ((e.drawModeMessage(w, a, x, m), a)) e.drawBullsEye(w, Ut.truncDivision(x, 2), 5);
        else {
          e.drawBullsEye(w, Ut.truncDivision(x, 2), 7);
          for (var f = 0, T = 0; f < Ut.truncDivision(A, 2) - 1; f += 15, T += 16)
            for (var C = Ut.truncDivision(x, 2) & 1; C < x; C += 2)
              (w.set(Ut.truncDivision(x, 2) - T, C),
                w.set(Ut.truncDivision(x, 2) + T, C),
                w.set(C, Ut.truncDivision(x, 2) - T),
                w.set(C, Ut.truncDivision(x, 2) + T));
        }
        var R = new qS();
        return (
          R.setCompact(a),
          R.setSize(x),
          R.setLayers(l),
          R.setCodeWords(g),
          R.setMatrix(w),
          R
        );
      }),
      (e.drawBullsEye = function (t, r, n) {
        for (var i = 0; i < n; i += 2)
          for (var o = r - i; o <= r + i; o++)
            (t.set(o, r - i), t.set(o, r + i), t.set(r - i, o), t.set(r + i, o));
        (t.set(r - n, r - n),
          t.set(r - n + 1, r - n),
          t.set(r - n, r - n + 1),
          t.set(r + n, r - n),
          t.set(r + n, r - n + 1),
          t.set(r + n, r + n - 1));
      }),
      (e.generateModeMessage = function (t, r, n) {
        var i = new $n();
        if (t)
          (i.appendBits(r - 1, 2), i.appendBits(n - 1, 6), (i = e.generateCheckWords(i, 28, 4)));
        else
          (i.appendBits(r - 1, 5), i.appendBits(n - 1, 11), (i = e.generateCheckWords(i, 40, 4)));
        return i;
      }),
      (e.drawModeMessage = function (t, r, n, i) {
        var o = Ut.truncDivision(n, 2);
        if (r)
          for (var s = 0; s < 7; s++) {
            var a = o - 3 + s;
            if (i.get(s)) t.set(a, o - 5);
            if (i.get(s + 7)) t.set(o + 5, a);
            if (i.get(20 - s)) t.set(a, o + 5);
            if (i.get(27 - s)) t.set(o - 5, a);
          }
        else
          for (var s = 0; s < 10; s++) {
            var a = o - 5 + s + Ut.truncDivision(s, 5);
            if (i.get(s)) t.set(a, o - 7);
            if (i.get(s + 10)) t.set(o + 7, a);
            if (i.get(29 - s)) t.set(a, o + 7);
            if (i.get(39 - s)) t.set(o - 7, a);
          }
      }),
      (e.generateCheckWords = function (t, r, n) {
        var i,
          o,
          s = t.getSize() / n,
          a = new nA(e.getGF(n)),
          l = Ut.truncDivision(r, n),
          c = e.bitsToWords(t, n, l);
        a.encode(c, l - s);
        var u = r % n,
          d = new $n();
        d.appendBits(0, u);
        try {
          for (var h = Ble(Array.from(c)), f = h.next(); !f.done; f = h.next()) {
            var p = f.value;
            d.appendBits(p, n);
          }
        } catch (g) {
          i = { error: g };
        } finally {
          try {
            if (f && !f.done && (o = h.return)) o.call(h);
          } finally {
            if (i) throw i.error;
          }
        }
        return d;
      }),
      (e.bitsToWords = function (t, r, n) {
        var i = new Int32Array(n),
          o,
          s;
        for (o = 0, s = t.getSize() / r; o < s; o++) {
          var a = 0;
          for (var l = 0; l < r; l++) a |= t.get(o * r + l) ? 1 << (r - l - 1) : 0;
          i[o] = a;
        }
        return i;
      }),
      (e.getGF = function (t) {
        switch (t) {
          case 4:
            return si.AZTEC_PARAM;
          case 6:
            return si.AZTEC_DATA_6;
          case 8:
            return si.AZTEC_DATA_8;
          case 10:
            return si.AZTEC_DATA_10;
          case 12:
            return si.AZTEC_DATA_12;
          default:
            throw new nt("Unsupported word size " + t);
        }
      }),
      (e.stuffBits = function (t, r) {
        var n = new $n(),
          i = t.getSize(),
          o = (1 << r) - 2;
        for (var s = 0; s < i; s += r) {
          var a = 0;
          for (var l = 0; l < r; l++) if (s + l >= i || t.get(s + l)) a |= 1 << (r - 1 - l);
          if ((a & o) === o) (n.appendBits(a & o, r), s--);
          else if ((a & o) === 0) (n.appendBits(a | 1, r), s--);
          else n.appendBits(a, r);
        }
        return n;
      }),
      (e.totalBitsInLayer = function (t, r) {
        return ((r ? 88 : 112) + 16 * t) * t;
      }),
      (e.DEFAULT_EC_PERCENT = 33),
      (e.DEFAULT_AZTEC_LAYERS = 0),
      (e.MAX_NB_BITS = 32),
      (e.MAX_NB_BITS_COMPACT = 4),
      (e.WORD_SIZE = Int32Array.from([
        4, 6, 6, 8, 8, 8, 8, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12,
      ])),
      e
    );
  })(),
  lA = Fle;
var YNe = (function () {
  function e() {}
  return (
    (e.prototype.encode = function (t, r, n, i) {
      return this.encodeWithHints(t, r, n, i, null);
    }),
    (e.prototype.encodeWithHints = function (t, r, n, i, o) {
      var s = oA.ISO_8859_1,
        a = lA.DEFAULT_EC_PERCENT,
        l = lA.DEFAULT_AZTEC_LAYERS;
      if (o != null) {
        if (o.has(br.CHARACTER_SET)) s = m0.forName(o.get(br.CHARACTER_SET).toString());
        if (o.has(br.ERROR_CORRECTION)) a = Ut.parseInt(o.get(br.ERROR_CORRECTION).toString());
        if (o.has(br.AZTEC_LAYERS)) l = Ut.parseInt(o.get(br.AZTEC_LAYERS).toString());
      }
      return e.encodeLayers(t, r, n, i, s, a, l);
    }),
    (e.encodeLayers = function (t, r, n, i, o, s, a) {
      if (r !== at.AZTEC) throw new nt("Can only encode AZTEC, but got " + r);
      var l = lA.encode(er.getBytes(t, o), s, a);
      return e.renderResult(l, n, i);
    }),
    (e.renderResult = function (t, r, n) {
      var i = t.getMatrix();
      if (i == null) throw new Xi();
      var o = i.getWidth(),
        s = i.getHeight(),
        a = Math.max(r, o),
        l = Math.max(n, s),
        c = Math.min(a / o, l / s),
        u = (a - o * c) / 2,
        d = (l - s * c) / 2,
        h = new bn(a, l);
      for (var f = 0, p = d; f < s; f++, p += c)
        for (var g = 0, m = u; g < o; g++, m += c) if (i.get(g, f)) h.setRegion(m, p, c, c);
      return h;
    }),
    e
  );
})();
var Dle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  dH = (function (e) {
    Dle(t, e);
    function t(r) {
      var n = e.call(this, r.width, r.height) || this;
      return ((n.canvas = r), (n.buffer = t.makeBufferFromCanvasImageData(r)), n);
    }
    return (
      (t.makeBufferFromCanvasImageData = function (r) {
        var n;
        try {
          n = r.getContext("2d", { willReadFrequently: !0 });
        } catch (o) {
          n = r.getContext("2d");
        }
        if (!n) throw Error("Couldn't get canvas context.");
        var i = n.getImageData(0, 0, r.width, r.height);
        return t.toGrayscaleBuffer(i.data, r.width, r.height);
      }),
      (t.toGrayscaleBuffer = function (r, n, i) {
        var o = new Uint8ClampedArray(n * i);
        for (var s = 0, a = 0, l = r.length; s < l; s += 4, a++) {
          var c = void 0,
            u = r[s + 3];
          if (u === 0) c = 255;
          else {
            var d = r[s],
              h = r[s + 1],
              f = r[s + 2];
            c = (306 * d + 601 * h + 117 * f + 512) >> 10;
          }
          o[a] = c;
        }
        return o;
      }),
      (t.prototype.getRow = function (r, n) {
        if (r < 0 || r >= this.getHeight())
          throw new nt("Requested row is outside the image: " + r);
        var i = this.getWidth(),
          o = r * i;
        if (n === null) n = this.buffer.slice(o, o + i);
        else {
          if (n.length < i) n = new Uint8ClampedArray(i);
          n.set(this.buffer.slice(o, o + i));
        }
        return n;
      }),
      (t.prototype.getMatrix = function () {
        return this.buffer;
      }),
      (t.prototype.isCropSupported = function () {
        return !0;
      }),
      (t.prototype.crop = function (r, n, i, o) {
        return (e.prototype.crop.call(this, r, n, i, o), this);
      }),
      (t.prototype.isRotateSupported = function () {
        return !0;
      }),
      (t.prototype.rotateCounterClockwise = function () {
        return (this.rotate(-90), this);
      }),
      (t.prototype.rotateCounterClockwise45 = function () {
        return (this.rotate(-45), this);
      }),
      (t.prototype.invert = function () {
        return new Yu(this);
      }),
      (t.prototype.getTempCanvasElement = function () {
        if (this.tempCanvasElement === null) {
          var r = this.canvas.ownerDocument.createElement("canvas");
          ((r.width = this.canvas.width),
            (r.height = this.canvas.height),
            (this.tempCanvasElement = r));
        }
        return this.tempCanvasElement;
      }),
      (t.prototype.rotate = function (r) {
        var n = this.getTempCanvasElement();
        if (!n) throw Error("Could not create a Canvas element.");
        var i = r * t.DEGREE_TO_RADIANS,
          o = this.canvas.width,
          s = this.canvas.height,
          a = Math.ceil(Math.abs(Math.cos(i)) * o + Math.abs(Math.sin(i)) * s),
          l = Math.ceil(Math.abs(Math.sin(i)) * o + Math.abs(Math.cos(i)) * s);
        ((n.width = a), (n.height = l));
        var c = n.getContext("2d");
        if (!c) throw Error("Could not create a Canvas Context element.");
        return (
          c.translate(a / 2, l / 2),
          c.rotate(i),
          c.drawImage(this.canvas, o / -2, s / -2),
          (this.buffer = t.makeBufferFromCanvasImageData(n)),
          this
        );
      }),
      (t.DEGREE_TO_RADIANS = Math.PI / 180),
      t
    );
  })($l);
function JS() {
  return typeof navigator < "u";
}
function Nle() {
  return JS() && !!navigator.mediaDevices;
}
function hH() {
  return !!(Nle() && navigator.mediaDevices.enumerateDevices);
}
var dm = function () {
    return (
      (dm =
        Object.assign ||
        function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++) {
            t = arguments[r];
            for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) e[i] = t[i];
          }
          return e;
        }),
      dm.apply(this, arguments)
    );
  },
  Ti = function (e, t, r, n) {
    function i(o) {
      return o instanceof r
        ? o
        : new r(function (s) {
            s(o);
          });
    }
    return new (r || (r = Promise))(function (o, s) {
      function a(u) {
        try {
          c(n.next(u));
        } catch (d) {
          s(d);
        }
      }
      function l(u) {
        try {
          c(n.throw(u));
        } catch (d) {
          s(d);
        }
      }
      function c(u) {
        u.done ? o(u.value) : i(u.value).then(a, l);
      }
      c((n = n.apply(e, t || [])).next());
    });
  },
  Ei = function (e, t) {
    var r = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      },
      n,
      i,
      o,
      s = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return (
      (s.next = a(0)),
      (s.throw = a(1)),
      (s.return = a(2)),
      typeof Symbol === "function" &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function a(c) {
      return function (u) {
        return l([c, u]);
      };
    }
    function l(c) {
      if (n) throw TypeError("Generator is already executing.");
      while ((s && ((s = 0), c[0] && (r = 0)), r))
        try {
          if (
            ((n = 1),
            i &&
              (o =
                c[0] & 2
                  ? i.return
                  : c[0]
                    ? i.throw || ((o = i.return) && o.call(i), 0)
                    : i.next) &&
              !(o = o.call(i, c[1])).done)
          )
            return o;
          if (((i = 0), o)) c = [c[0] & 2, o.value];
          switch (c[0]) {
            case 0:
            case 1:
              o = c;
              break;
            case 4:
              return (r.label++, { value: c[1], done: !1 });
            case 5:
              (r.label++, (i = c[1]), (c = [0]));
              continue;
            case 7:
              ((c = r.ops.pop()), r.trys.pop());
              continue;
            default:
              if (
                ((o = r.trys), !(o = o.length > 0 && o[o.length - 1])) &&
                (c[0] === 6 || c[0] === 2)
              ) {
                r = 0;
                continue;
              }
              if (c[0] === 3 && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                r.label = c[1];
                break;
              }
              if (c[0] === 6 && r.label < o[1]) {
                ((r.label = o[1]), (o = c));
                break;
              }
              if (o && r.label < o[2]) {
                ((r.label = o[2]), r.ops.push(c));
                break;
              }
              if (o[2]) r.ops.pop();
              r.trys.pop();
              continue;
          }
          c = t.call(e, r);
        } catch (u) {
          ((c = [6, u]), (i = 0));
        } finally {
          n = o = 0;
        }
      if (c[0] & 5) throw c[1];
      return { value: c[0] ? c[1] : void 0, done: !0 };
    }
  },
  e9 = function (e) {
    var t = typeof Symbol === "function" && Symbol.iterator,
      r = t && e[t],
      n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length === "number")
      return {
        next: function () {
          if (e && n >= e.length) e = void 0;
          return { value: e && e[n++], done: !e };
        },
      };
    throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  },
  Ple = { delayBetweenScanAttempts: 500, delayBetweenScanSuccess: 500, tryPlayVideoTimeout: 5000 },
  _l = (function () {
    function e(t, r, n) {
      if (r === void 0) r = /*@__PURE__*/ new Map();
      if (n === void 0) n = {};
      ((this.reader = t), (this.hints = r), (this.options = dm(dm({}, Ple), n)));
    }
    return (
      Object.defineProperty(e.prototype, "possibleFormats", {
        set: function (t) {
          this.hints.set(nr.POSSIBLE_FORMATS, t);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.addVideoSource = function (t, r) {
        try {
          t.srcObject = r;
        } catch (n) {}
      }),
      (e.mediaStreamSetTorch = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                return [
                  4,
                  t.applyConstraints({
                    advanced: [{ fillLightMode: r ? "flash" : "off", torch: r }],
                  }),
                ];
              case 1:
                return (n.sent(), [2]);
            }
          });
        });
      }),
      (e.mediaStreamIsTorchCompatible = function (t) {
        var r,
          n,
          i = t.getVideoTracks();
        try {
          for (var o = e9(i), s = o.next(); !s.done; s = o.next()) {
            var a = s.value;
            if (e.mediaStreamIsTorchCompatibleTrack(a)) return !0;
          }
        } catch (l) {
          r = { error: l };
        } finally {
          try {
            if (s && !s.done && (n = o.return)) n.call(o);
          } finally {
            if (r) throw r.error;
          }
        }
        return !1;
      }),
      (e.mediaStreamIsTorchCompatibleTrack = function (t) {
        try {
          var r = t.getCapabilities();
          return "torch" in r;
        } catch (n) {
          return !1;
        }
      }),
      (e.isVideoPlaying = function (t) {
        return t.currentTime > 0 && !t.paused && t.readyState > 2;
      }),
      (e.getMediaElement = function (t, r) {
        var n = document.getElementById(t);
        if (!n) throw new hi("element with id '".concat(t, "' not found"));
        if (n.nodeName.toLowerCase() !== r.toLowerCase())
          throw new hi("element with id '".concat(t, "' must be an ").concat(r, " element"));
        return n;
      }),
      (e.createVideoElement = function (t) {
        if (t instanceof HTMLVideoElement) return t;
        if (typeof t === "string") return e.getMediaElement(t, "video");
        if (!t && typeof document < "u") {
          var r = document.createElement("video");
          return ((r.width = 200), (r.height = 200), r);
        }
        throw Error("Couldn't get videoElement from videoSource!");
      }),
      (e.prepareImageElement = function (t) {
        if (t instanceof HTMLImageElement) return t;
        if (typeof t === "string") return e.getMediaElement(t, "img");
        if (typeof t > "u") {
          var r = document.createElement("img");
          return ((r.width = 200), (r.height = 200), r);
        }
        throw Error("Couldn't get imageElement from imageSource!");
      }),
      (e.prepareVideoElement = function (t) {
        var r = e.createVideoElement(t);
        return (
          r.setAttribute("autoplay", "true"),
          r.setAttribute("muted", "true"),
          r.setAttribute("playsinline", "true"),
          r
        );
      }),
      (e.isImageLoaded = function (t) {
        if (!t.complete) return !1;
        if (t.naturalWidth === 0) return !1;
        return !0;
      }),
      (e.createBinaryBitmapFromCanvas = function (t) {
        var r = new dH(t),
          n = new Y3(r);
        return new Y1(n);
      }),
      (e.drawImageOnCanvas = function (t, r) {
        t.drawImage(r, 0, 0);
      }),
      (e.getMediaElementDimensions = function (t) {
        if (t instanceof HTMLVideoElement) return { height: t.videoHeight, width: t.videoWidth };
        if (t instanceof HTMLImageElement)
          return { height: t.naturalHeight || t.height, width: t.naturalWidth || t.width };
        throw Error("Couldn't find the Source's dimensions!");
      }),
      (e.createCaptureCanvas = function (t) {
        if (!t) throw new hi("Cannot create a capture canvas without a media element.");
        if (typeof document > "u")
          throw Error(`The page "Document" is undefined, make sure you're running in a browser.`);
        var r = document.createElement("canvas"),
          n = e.getMediaElementDimensions(t),
          { width: i, height: o } = n;
        return (
          (r.style.width = i + "px"),
          (r.style.height = o + "px"),
          (r.width = i),
          (r.height = o),
          r
        );
      }),
      (e.tryPlayVideo = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                if (t === null || t === void 0 ? void 0 : t.ended) return [2, !1];
                if (e.isVideoPlaying(t)) return [2, !0];
                n.label = 1;
              case 1:
                return (n.trys.push([1, 3, , 4]), [4, t.play()]);
              case 2:
                return (n.sent(), [2, !0]);
              case 3:
                return ((r = n.sent()), [2, !1]);
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.createCanvasFromMediaElement = function (t) {
        var r = e.createCaptureCanvas(t),
          n = r.getContext("2d");
        if (!n) throw Error("Couldn't find Canvas 2D Context.");
        return (e.drawImageOnCanvas(n, t), r);
      }),
      (e.createBinaryBitmapFromMediaElem = function (t) {
        var r = e.createCanvasFromMediaElement(t);
        return e.createBinaryBitmapFromCanvas(r);
      }),
      (e.destroyImageElement = function (t) {
        ((t.src = ""), t.removeAttribute("src"));
      }),
      (e.listVideoInputDevices = function () {
        return Ti(this, void 0, void 0, function () {
          var t, r, n, i, o, s, a, l, c, u, d, h;
          return Ei(this, function (f) {
            switch (f.label) {
              case 0:
                if (!JS()) throw Error("Can't enumerate devices, navigator is not present.");
                if (!hH()) throw Error("Can't enumerate devices, method not supported.");
                return [4, navigator.mediaDevices.enumerateDevices()];
              case 1:
                ((t = f.sent()), (r = []));
                try {
                  for (n = e9(t), i = n.next(); !i.done; i = n.next()) {
                    if (
                      ((o = i.value),
                      (s = o.kind === "video" ? "videoinput" : o.kind),
                      s !== "videoinput")
                    )
                      continue;
                    ((a = o.deviceId || o.id),
                      (l = o.label || "Video device ".concat(r.length + 1)),
                      (c = o.groupId),
                      (u = { deviceId: a, label: l, kind: s, groupId: c }),
                      r.push(u));
                  }
                } catch (p) {
                  d = { error: p };
                } finally {
                  try {
                    if (i && !i.done && (h = n.return)) h.call(n);
                  } finally {
                    if (d) throw d.error;
                  }
                }
                return [2, r];
            }
          });
        });
      }),
      (e.findDeviceById = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, e.listVideoInputDevices()];
              case 1:
                if (((r = n.sent()), !r)) return [2];
                return [
                  2,
                  r.find(function (i) {
                    return i.deviceId === t;
                  }),
                ];
            }
          });
        });
      }),
      (e.cleanVideoSource = function (t) {
        if (!t) return;
        try {
          t.srcObject = null;
        } catch (r) {
          t.src = "";
        }
        if (t) t.removeAttribute("src");
      }),
      (e.releaseAllStreams = function () {
        if (e.streamTracker.length !== 0)
          e.streamTracker.forEach(function (t) {
            t.getTracks().forEach(function (r) {
              return r.stop();
            });
          });
        e.streamTracker = [];
      }),
      (e.playVideoOnLoadAsync = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n;
          return Ei(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, e.tryPlayVideo(t)];
              case 1:
                if (((n = i.sent()), n)) return [2, !0];
                return [
                  2,
                  new Promise(function (o, s) {
                    var a = setTimeout(function () {
                        if (e.isVideoPlaying(t)) return;
                        (s(!1), t.removeEventListener("canplay", l));
                      }, r),
                      l = function () {
                        e.tryPlayVideo(t).then(function (c) {
                          (clearTimeout(a), t.removeEventListener("canplay", l), o(c));
                        });
                      };
                    t.addEventListener("canplay", l);
                  }),
                ];
            }
          });
        });
      }),
      (e.attachStreamToVideo = function (t, r) {
        return Ti(this, arguments, void 0, function (n, i, o) {
          var s;
          if (o === void 0) o = 5000;
          return Ei(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (s = e.prepareVideoElement(i)),
                  e.addVideoSource(s, n),
                  [4, e.playVideoOnLoadAsync(s, o)]
                );
              case 1:
                return (a.sent(), [2, s]);
            }
          });
        });
      }),
      (e._waitImageLoad = function (t) {
        return new Promise(function (r, n) {
          var i = 1e4,
            o = setTimeout(function () {
              if (e.isImageLoaded(t)) return;
              (t.removeEventListener("load", s), n());
            }, i),
            s = function () {
              (clearTimeout(o), t.removeEventListener("load", s), r());
            };
          t.addEventListener("load", s);
        });
      }),
      (e.checkCallbackFnOrThrow = function (t) {
        if (!t)
          throw new hi(
            "`callbackFn` is a required parameter, you cannot capture results without it.",
          );
      }),
      (e.disposeMediaStream = function (t) {
        t.getVideoTracks().forEach(function (r) {
          return r.stop();
        });
      }),
      (e.prototype.decode = function (t) {
        var r = e.createCanvasFromMediaElement(t);
        return this.decodeFromCanvas(r);
      }),
      (e.prototype.decodeBitmap = function (t) {
        return this.reader.decode(t, this.hints);
      }),
      (e.prototype.decodeFromCanvas = function (t) {
        var r = e.createBinaryBitmapFromCanvas(t);
        return this.decodeBitmap(r);
      }),
      (e.prototype.decodeFromImageElement = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                if (!t) throw new hi("An image element must be provided.");
                return ((r = e.prepareImageElement(t)), [4, this._decodeOnLoadImage(r)]);
              case 1:
                return [2, n.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeFromImageUrl = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                if (!t) throw new hi("An URL must be provided.");
                ((r = e.prepareImageElement()), (r.src = t), (n.label = 1));
              case 1:
                return (n.trys.push([1, , 3, 4]), [4, this.decodeFromImageElement(r)]);
              case 2:
                return [2, n.sent()];
              case 3:
                return (e.destroyImageElement(r), [7]);
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.prototype.decodeFromConstraints = function (t, r, n) {
        return Ti(this, void 0, void 0, function () {
          var i, o;
          return Ei(this, function (s) {
            switch (s.label) {
              case 0:
                return (e.checkCallbackFnOrThrow(n), [4, this.getUserMedia(t)]);
              case 1:
                ((i = s.sent()), (s.label = 2));
              case 2:
                return (s.trys.push([2, 4, , 5]), [4, this.decodeFromStream(i, r, n)]);
              case 3:
                return [2, s.sent()];
              case 4:
                throw ((o = s.sent()), e.disposeMediaStream(i), o);
              case 5:
                return [2];
            }
          });
        });
      }),
      (e.prototype.decodeFromStream = function (t, r, n) {
        return Ti(this, void 0, void 0, function () {
          var i,
            o,
            s,
            a,
            l,
            c,
            u,
            d,
            h,
            f = this;
          return Ei(this, function (p) {
            switch (p.label) {
              case 0:
                return (
                  e.checkCallbackFnOrThrow(n),
                  (i = this.options.tryPlayVideoTimeout),
                  [4, e.attachStreamToVideo(t, r, i)]
                );
              case 1:
                if (
                  ((o = p.sent()),
                  (s = function () {
                    (e.disposeMediaStream(t), e.cleanVideoSource(o));
                  }),
                  (a = this.scan(o, n, s)),
                  (l = t.getVideoTracks()),
                  (c = dm(dm({}, a), {
                    stop: function () {
                      a.stop();
                    },
                    streamVideoConstraintsApply: function (g, m) {
                      return Ti(this, void 0, void 0, function () {
                        var A, y, x, b, v, _, w;
                        return Ei(this, function (S) {
                          switch (S.label) {
                            case 0:
                              ((A = m ? l.filter(m) : l), (S.label = 1));
                            case 1:
                              (S.trys.push([1, 6, 7, 8]),
                                (y = e9(A)),
                                (x = y.next()),
                                (S.label = 2));
                            case 2:
                              if (x.done) return [3, 5];
                              return ((b = x.value), [4, b.applyConstraints(g)]);
                            case 3:
                              (S.sent(), (S.label = 4));
                            case 4:
                              return ((x = y.next()), [3, 2]);
                            case 5:
                              return [3, 8];
                            case 6:
                              return ((v = S.sent()), (_ = { error: v }), [3, 8]);
                            case 7:
                              try {
                                if (x && !x.done && (w = y.return)) w.call(y);
                              } finally {
                                if (_) throw _.error;
                              }
                              return [7];
                            case 8:
                              return [2];
                          }
                        });
                      });
                    },
                    streamVideoConstraintsGet: function (g) {
                      return l.find(g).getConstraints();
                    },
                    streamVideoSettingsGet: function (g) {
                      return l.find(g).getSettings();
                    },
                    streamVideoCapabilitiesGet: function (g) {
                      return l.find(g).getCapabilities();
                    },
                  })),
                  (u = e.mediaStreamIsTorchCompatible(t)),
                  u)
                )
                  ((d =
                    l === null || l === void 0
                      ? void 0
                      : l.find(function (g) {
                          return e.mediaStreamIsTorchCompatibleTrack(g);
                        })),
                    (h = function (g) {
                      return Ti(f, void 0, void 0, function () {
                        return Ei(this, function (m) {
                          switch (m.label) {
                            case 0:
                              return [4, e.mediaStreamSetTorch(d, g)];
                            case 1:
                              return (m.sent(), [2]);
                          }
                        });
                      });
                    }),
                    (c.switchTorch = h),
                    (c.stop = function () {
                      return Ti(f, void 0, void 0, function () {
                        return Ei(this, function (g) {
                          switch (g.label) {
                            case 0:
                              return (a.stop(), [4, h(!1)]);
                            case 1:
                              return (g.sent(), [2]);
                          }
                        });
                      });
                    }));
                return [2, c];
            }
          });
        });
      }),
      (e.prototype.decodeFromVideoDevice = function (t, r, n) {
        return Ti(this, void 0, void 0, function () {
          var i, o;
          return Ei(this, function (s) {
            switch (s.label) {
              case 0:
                if ((e.checkCallbackFnOrThrow(n), !t)) i = { facingMode: "environment" };
                else i = { deviceId: { exact: t } };
                return ((o = { video: i }), [4, this.decodeFromConstraints(o, r, n)]);
              case 1:
                return [2, s.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeFromVideoElement = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n, i;
          return Ei(this, function (o) {
            switch (o.label) {
              case 0:
                if ((e.checkCallbackFnOrThrow(r), !t))
                  throw new hi("A video element must be provided.");
                return (
                  (n = e.prepareVideoElement(t)),
                  (i = this.options.tryPlayVideoTimeout),
                  [4, e.playVideoOnLoadAsync(n, i)]
                );
              case 1:
                return (o.sent(), [2, this.scan(n, r)]);
            }
          });
        });
      }),
      (e.prototype.decodeFromVideoUrl = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n, i, o, s;
          return Ei(this, function (a) {
            switch (a.label) {
              case 0:
                if ((e.checkCallbackFnOrThrow(r), !t)) throw new hi("An URL must be provided.");
                return (
                  (n = e.prepareVideoElement()),
                  (n.src = t),
                  (i = function () {
                    e.cleanVideoSource(n);
                  }),
                  (o = this.options.tryPlayVideoTimeout),
                  [4, e.playVideoOnLoadAsync(n, o)]
                );
              case 1:
                return (a.sent(), (s = this.scan(n, r, i)), [2, s]);
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromConstraints = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n;
          return Ei(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.getUserMedia(t)];
              case 1:
                return ((n = i.sent()), [4, this.decodeOnceFromStream(n, r)]);
              case 2:
                return [2, i.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromStream = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n, i, o;
          return Ei(this, function (s) {
            switch (s.label) {
              case 0:
                return ((n = Boolean(r)), [4, e.attachStreamToVideo(t, r)]);
              case 1:
                ((i = s.sent()), (s.label = 2));
              case 2:
                return (s.trys.push([2, , 4, 5]), [4, this.scanOneResult(i)]);
              case 3:
                return ((o = s.sent()), [2, o]);
              case 4:
                if (!n) e.cleanVideoSource(i);
                return [7];
              case 5:
                return [2];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromVideoDevice = function (t, r) {
        return Ti(this, void 0, void 0, function () {
          var n, i;
          return Ei(this, function (o) {
            switch (o.label) {
              case 0:
                if (!t) n = { facingMode: "environment" };
                else n = { deviceId: { exact: t } };
                return ((i = { video: n }), [4, this.decodeOnceFromConstraints(i, r)]);
              case 1:
                return [2, o.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromVideoElement = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r, n;
          return Ei(this, function (i) {
            switch (i.label) {
              case 0:
                if (!t) throw new hi("A video element must be provided.");
                return (
                  (r = e.prepareVideoElement(t)),
                  (n = this.options.tryPlayVideoTimeout),
                  [4, e.playVideoOnLoadAsync(r, n)]
                );
              case 1:
                return (i.sent(), [4, this.scanOneResult(r)]);
              case 2:
                return [2, i.sent()];
            }
          });
        });
      }),
      (e.prototype.decodeOnceFromVideoUrl = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r, n;
          return Ei(this, function (i) {
            switch (i.label) {
              case 0:
                if (!t) throw new hi("An URL must be provided.");
                ((r = e.prepareVideoElement()),
                  (r.src = t),
                  (n = this.decodeOnceFromVideoElement(r)),
                  (i.label = 1));
              case 1:
                return (i.trys.push([1, , 3, 4]), [4, n]);
              case 2:
                return [2, i.sent()];
              case 3:
                return (e.cleanVideoSource(r), [7]);
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.prototype.scanOneResult = function (t, r, n, i) {
        var o = this;
        if (r === void 0) r = !0;
        if (n === void 0) n = !0;
        if (i === void 0) i = !0;
        return new Promise(function (s, a) {
          o.scan(t, function (l, c, u) {
            if (l) {
              (s(l), u.stop());
              return;
            }
            if (c) {
              if (c instanceof Ce && r) return;
              if (c instanceof qr && n) return;
              if (c instanceof De && i) return;
              (u.stop(), a(c));
            }
          });
        });
      }),
      (e.prototype.scan = function (t, r, n) {
        var i = this;
        e.checkCallbackFnOrThrow(r);
        var o = e.createCaptureCanvas(t),
          s;
        try {
          s = o.getContext("2d", { willReadFrequently: !0 });
        } catch (f) {
          s = o.getContext("2d");
        }
        if (!s) throw Error("Couldn't create canvas for visual element scan.");
        var a = function () {
            ((s = void 0), (o = void 0));
          },
          l = !1,
          c,
          u = function () {
            if (((l = !0), clearTimeout(c), a(), n)) n();
          },
          d = { stop: u },
          h = function () {
            if (l) return;
            try {
              e.drawImageOnCanvas(s, t);
              var f = i.decodeFromCanvas(o);
              (r(f, void 0, d), (c = setTimeout(h, i.options.delayBetweenScanSuccess)));
            } catch (A) {
              r(void 0, A, d);
              var p = A instanceof qr,
                g = A instanceof De,
                m = A instanceof Ce;
              if (p || g || m) {
                c = setTimeout(h, i.options.delayBetweenScanAttempts);
                return;
              }
              if ((a(), n)) n(A);
            }
          };
        return (h(), d);
      }),
      (e.prototype._decodeOnLoadImage = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                if (((r = e.isImageLoaded(t)), r)) return [3, 2];
                return [4, e._waitImageLoad(t)];
              case 1:
                (n.sent(), (n.label = 2));
              case 2:
                return [2, this.decode(t)];
            }
          });
        });
      }),
      (e.prototype.getUserMedia = function (t) {
        return Ti(this, void 0, void 0, function () {
          var r;
          return Ei(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, navigator.mediaDevices.getUserMedia(t)];
              case 1:
                return ((r = n.sent()), e.streamTracker.push(r), [2, r]);
            }
          });
        });
      }),
      (e.streamTracker = []),
      e
    );
  })();
var kle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  lUe = (function (e) {
    kle(t, e);
    function t(r, n) {
      return e.call(this, new uh(), r, n) || this;
    }
    return t;
  })(_l);
var Ule = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  hUe = (function (e) {
    Ule(t, e);
    function t(r, n) {
      return e.call(this, new Lc(r), r, n) || this;
    }
    return t;
  })(_l);
var Hle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  gUe = (function (e) {
    Hle(t, e);
    function t(r, n) {
      return e.call(this, new ph(), r, n) || this;
    }
    return t;
  })(_l);
var Gle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  bUe = (function (e) {
    Gle(t, e);
    function t(r, n) {
      var i = this,
        o = new rA();
      return (o.setHints(r), (i = e.call(this, o, r, n) || this), (i.reader = o), i);
    }
    return (
      Object.defineProperty(t.prototype, "possibleFormats", {
        set: function (r) {
          (this.hints.set(nr.POSSIBLE_FORMATS, r), this.reader.setHints(this.hints));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.decodeBitmap = function (r) {
        return this.reader.decodeWithState(r);
      }),
      (t.prototype.setHints = function (r) {
        ((this.hints = r), this.reader.setHints(this.hints));
      }),
      t
    );
  })(_l);
var zle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  wUe = (function (e) {
    zle(t, e);
    function t(r, n) {
      return e.call(this, new Ah(), r, n) || this;
    }
    return t;
  })(_l);
var Vle = (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, i) {
              n.__proto__ = i;
            }) ||
          function (n, i) {
            for (var o in i) if (Object.prototype.hasOwnProperty.call(i, o)) n[o] = i[o];
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      if (typeof r !== "function" && r !== null)
        throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })(),
  iv = (function (e) {
    Vle(t, e);
    function t(r, n) {
      return e.call(this, new mh(), r, n) || this;
    }
    return t;
  })(_l);
var ed = "http://www.w3.org/2000/svg",
  RUe = (function () {
    function e(t) {
      if (typeof t === "string") {
        var r = document.getElementById(t);
        if (!r) throw Error("Could not find a Container element with '".concat(t, "'."));
        this.containerElement = r;
      } else this.containerElement = t;
    }
    return (
      (e.prototype.write = function (t, r, n, i) {
        if (t.length === 0) throw new nt("Found empty contents");
        if (r < 0 || n < 0) throw new nt("Requested dimensions are too small: " + r + "x" + n);
        var o =
            i && i.get(br.MARGIN) !== void 0
              ? Number.parseInt(i.get(br.MARGIN).toString(), 10)
              : e.QUIET_ZONE_SIZE,
          s = this.encode(i, t);
        return this.renderResult(s, r, n, o);
      }),
      (e.prototype.createSVGElement = function (t, r) {
        var n = document.createElementNS(e.SVG_NS, "svg");
        return (
          n.setAttributeNS(ed, "width", r.toString()),
          n.setAttributeNS(ed, "height", t.toString()),
          n
        );
      }),
      (e.prototype.createSvgPathPlaceholderElement = function (t, r) {
        var n = document.createElementNS(e.SVG_NS, "path");
        return (
          n.setAttributeNS(ed, "d", "M0 0h".concat(t, "v").concat(r, "H0z")),
          n.setAttributeNS(ed, "fill", "none"),
          n
        );
      }),
      (e.prototype.createSvgRectElement = function (t, r, n, i) {
        var o = document.createElementNS(e.SVG_NS, "rect");
        return (
          o.setAttributeNS(ed, "x", t.toString()),
          o.setAttributeNS(ed, "y", r.toString()),
          o.setAttributeNS(ed, "height", n.toString()),
          o.setAttributeNS(ed, "width", i.toString()),
          o.setAttributeNS(ed, "fill", "#000000"),
          o
        );
      }),
      (e.prototype.encode = function (t, r) {
        var n = Ns.L;
        if (t && t.get(br.ERROR_CORRECTION) !== void 0) {
          var i = t.get(br.ERROR_CORRECTION).toString();
          n = Ns.fromString(i);
        }
        var o = Ju.encode(r, n, t);
        return o;
      }),
      (e.prototype.renderResult = function (t, r, n, i) {
        var o = t.getMatrix();
        if (o === null) throw new Xi();
        var s = o.getWidth(),
          a = o.getHeight(),
          l = s + i * 2,
          c = a + i * 2,
          u = Math.max(r, l),
          d = Math.max(n, c),
          h = Math.min(Math.floor(u / l), Math.floor(d / c)),
          f = Math.floor((u - s * h) / 2),
          p = Math.floor((d - a * h) / 2),
          g = this.createSVGElement(u, d),
          m = this.createSvgPathPlaceholderElement(r, n);
        (g.appendChild(m), this.containerElement.appendChild(g));
        for (var A = 0, y = p; A < a; A++, y += h)
          for (var x = 0, b = f; x < s; x++, b += h)
            if (o.get(x, A) === 1) {
              var v = this.createSvgRectElement(b, y, h, h);
              g.appendChild(v);
            }
        return g;
      }),
      (e.QUIET_ZONE_SIZE = 4),
      (e.SVG_NS = "http://www.w3.org/2000/svg"),
      e
    );
  })();
var fH = "http://www.w3.org/2000/svg",
  BUe = (function () {
    function e() {}
    return (
      (e.prototype.write = function (t, r, n, i) {
        if (t.length === 0) throw new nt("Found empty contents");
        if (r < 0 || n < 0) throw new nt("Requested dimensions are too small: " + r + "x" + n);
        var o = Ns.L,
          s = e.QUIET_ZONE_SIZE;
        if (i) {
          if (i.get(br.ERROR_CORRECTION) !== void 0) {
            var a = i.get(br.ERROR_CORRECTION).toString();
            o = Ns.fromString(a);
          }
          if (i.get(br.MARGIN) !== void 0) s = Number.parseInt(i.get(br.MARGIN).toString(), 10);
        }
        var l = Ju.encode(t, o, i);
        return this.renderResult(l, r, n, s);
      }),
      (e.prototype.writeToDom = function (t, r, n, i, o) {
        if (typeof t === "string") {
          var s = document.querySelector(t);
          if (!s) throw Error("Could no find the target HTML element.");
          t = s;
        }
        var a = this.write(r, n, i, o);
        if (t instanceof HTMLElement) t.appendChild(a);
      }),
      (e.prototype.renderResult = function (t, r, n, i) {
        var o = t.getMatrix();
        if (o === null) throw new Xi();
        var s = o.getWidth(),
          a = o.getHeight(),
          l = s + i * 2,
          c = a + i * 2,
          u = Math.max(r, l),
          d = Math.max(n, c),
          h = Math.min(Math.floor(u / l), Math.floor(d / c)),
          f = Math.floor((u - s * h) / 2),
          p = Math.floor((d - a * h) / 2),
          g = this.createSVGElement(u, d);
        for (var m = 0, A = p; m < a; m++, A += h)
          for (var y = 0, x = f; y < s; y++, x += h)
            if (o.get(y, m) === 1) {
              var b = this.createSvgRectElement(x, A, h, h);
              g.appendChild(b);
            }
        return g;
      }),
      (e.prototype.createSVGElement = function (t, r) {
        var n = document.createElementNS(fH, "svg"),
          i = t.toString(),
          o = r.toString();
        return (
          n.setAttribute("height", o),
          n.setAttribute("width", i),
          n.setAttribute("viewBox", "0 0 " + i + " " + o),
          n
        );
      }),
      (e.prototype.createSvgRectElement = function (t, r, n, i) {
        var o = document.createElementNS(fH, "rect");
        return (
          o.setAttribute("x", t.toString()),
          o.setAttribute("y", r.toString()),
          o.setAttribute("height", n.toString()),
          o.setAttribute("width", i.toString()),
          o.setAttribute("fill", "#000000"),
          o
        );
      }),
      (e.QUIET_ZONE_SIZE = 4),
      e
    );
  })();
