// src/vendor/umd-helpers.js
// Small UMD library bundled by a dependency.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var LH = Dc(function (OH, uv) {
  (function (e, t, r) {
    typeof define == "function" && define.amd
      ? define([], r)
      : typeof uv == "object" && uv.exports
        ? (uv.exports = r())
        : (e.QRCode = r());
  })(OH, 0, function () {
    for (
      var e = [
          null,
          [[10, 7, 17, 13], [1, 1, 1, 1], []],
          [
            [16, 10, 28, 22],
            [1, 1, 1, 1],
            [4, 16],
          ],
          [
            [26, 15, 22, 18],
            [1, 1, 2, 2],
            [4, 20],
          ],
          [
            [18, 20, 16, 26],
            [2, 1, 4, 2],
            [4, 24],
          ],
          [
            [24, 26, 22, 18],
            [2, 1, 4, 4],
            [4, 28],
          ],
          [
            [16, 18, 28, 24],
            [4, 2, 4, 4],
            [4, 32],
          ],
          [
            [18, 20, 26, 18],
            [4, 2, 5, 6],
            [4, 20, 36],
          ],
          [
            [22, 24, 26, 22],
            [4, 2, 6, 6],
            [4, 22, 40],
          ],
          [
            [22, 30, 24, 20],
            [5, 2, 8, 8],
            [4, 24, 44],
          ],
          [
            [26, 18, 28, 24],
            [5, 4, 8, 8],
            [4, 26, 48],
          ],
          [
            [30, 20, 24, 28],
            [5, 4, 11, 8],
            [4, 28, 52],
          ],
          [
            [22, 24, 28, 26],
            [8, 4, 11, 10],
            [4, 30, 56],
          ],
          [
            [22, 26, 22, 24],
            [9, 4, 16, 12],
            [4, 32, 60],
          ],
          [
            [24, 30, 24, 20],
            [9, 4, 16, 16],
            [4, 24, 44, 64],
          ],
          [
            [24, 22, 24, 30],
            [10, 6, 18, 12],
            [4, 24, 46, 68],
          ],
          [
            [28, 24, 30, 24],
            [10, 6, 16, 17],
            [4, 24, 48, 72],
          ],
          [
            [28, 28, 28, 28],
            [11, 6, 19, 16],
            [4, 28, 52, 76],
          ],
          [
            [26, 30, 28, 28],
            [13, 6, 21, 18],
            [4, 28, 54, 80],
          ],
          [
            [26, 28, 26, 26],
            [14, 7, 25, 21],
            [4, 28, 56, 84],
          ],
          [
            [26, 28, 28, 30],
            [16, 8, 25, 20],
            [4, 32, 60, 88],
          ],
          [
            [26, 28, 30, 28],
            [17, 8, 25, 23],
            [4, 26, 48, 70, 92],
          ],
          [
            [28, 28, 24, 30],
            [17, 9, 34, 23],
            [4, 24, 48, 72, 96],
          ],
          [
            [28, 30, 30, 30],
            [18, 9, 30, 25],
            [4, 28, 52, 76, 100],
          ],
          [
            [28, 30, 30, 30],
            [20, 10, 32, 27],
            [4, 26, 52, 78, 104],
          ],
          [
            [28, 26, 30, 30],
            [21, 12, 35, 29],
            [4, 30, 56, 82, 108],
          ],
          [
            [28, 28, 30, 28],
            [23, 12, 37, 34],
            [4, 28, 56, 84, 112],
          ],
          [
            [28, 30, 30, 30],
            [25, 12, 40, 34],
            [4, 32, 60, 88, 116],
          ],
          [
            [28, 30, 30, 30],
            [26, 13, 42, 35],
            [4, 24, 48, 72, 96, 120],
          ],
          [
            [28, 30, 30, 30],
            [28, 14, 45, 38],
            [4, 28, 52, 76, 100, 124],
          ],
          [
            [28, 30, 30, 30],
            [29, 15, 48, 40],
            [4, 24, 50, 76, 102, 128],
          ],
          [
            [28, 30, 30, 30],
            [31, 16, 51, 43],
            [4, 28, 54, 80, 106, 132],
          ],
          [
            [28, 30, 30, 30],
            [33, 17, 54, 45],
            [4, 32, 58, 84, 110, 136],
          ],
          [
            [28, 30, 30, 30],
            [35, 18, 57, 48],
            [4, 28, 56, 84, 112, 140],
          ],
          [
            [28, 30, 30, 30],
            [37, 19, 60, 51],
            [4, 32, 60, 88, 116, 144],
          ],
          [
            [28, 30, 30, 30],
            [38, 19, 63, 53],
            [4, 28, 52, 76, 100, 124, 148],
          ],
          [
            [28, 30, 30, 30],
            [40, 20, 66, 56],
            [4, 22, 48, 74, 100, 126, 152],
          ],
          [
            [28, 30, 30, 30],
            [43, 21, 70, 59],
            [4, 26, 52, 78, 104, 130, 156],
          ],
          [
            [28, 30, 30, 30],
            [45, 22, 74, 62],
            [4, 30, 56, 82, 108, 134, 160],
          ],
          [
            [28, 30, 30, 30],
            [47, 24, 77, 65],
            [4, 24, 52, 80, 108, 136, 164],
          ],
          [
            [28, 30, 30, 30],
            [49, 25, 81, 68],
            [4, 28, 56, 84, 112, 140, 168],
          ],
        ],
        t = /^\d*$/,
        r = /^[A-Za-z0-9 $%*+\-./:]*$/,
        n = /^[A-Z0-9 $%*+\-./:]*$/,
        i = [],
        o = [-1],
        s = 0,
        a = 1;
      s < 255;
      ++s
    )
      (i.push(a), (o[a] = s), (a = (2 * a) ^ (a >= 128 ? 285 : 0)));
    var l = [[]];
    for (s = 0; s < 30; ++s) {
      for (var c = l[s], u = [], d = 0; d <= s; ++d) {
        var h = d < s ? i[c[d]] : 0,
          f = i[(s + (c[d - 1] || 0)) % 255];
        u.push(o[h ^ f]);
      }
      l.push(u);
    }
    var p = {};
    for (s = 0; s < 45; ++s) p["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(s)] = s;
    var g = [
        function (M, C) {
          return (M + C) % 2 == 0;
        },
        function (M, C) {
          return M % 2 == 0;
        },
        function (M, C) {
          return C % 3 == 0;
        },
        function (M, C) {
          return (M + C) % 3 == 0;
        },
        function (M, C) {
          return (((M / 2) | 0) + ((C / 3) | 0)) % 2 == 0;
        },
        function (M, C) {
          return ((M * C) % 2) + ((M * C) % 3) == 0;
        },
        function (M, C) {
          return (((M * C) % 2) + ((M * C) % 3)) % 2 == 0;
        },
        function (M, C) {
          return (((M + C) % 2) + ((M * C) % 3)) % 2 == 0;
        },
      ],
      m = function (M) {
        return M > 6;
      },
      A = function (M, C) {
        var R =
            -8 &
            (function (L) {
              var k = e[L],
                z = 16 * L * L + 128 * L + 64;
              return (
                m(L) && (z -= 36),
                k[2].length && (z -= 25 * k[2].length * k[2].length - 10 * k[2].length - 55),
                z
              );
            })(M),
          B = e[M];
        return (R -= 8 * B[0][C] * B[1][C]);
      },
      y = function (M, C) {
        switch (C) {
          case 1:
            return M < 10 ? 10 : M < 27 ? 12 : 14;
          case 2:
            return M < 10 ? 9 : M < 27 ? 11 : 13;
          case 4:
            return M < 10 ? 8 : 16;
          case 8:
            return M < 10 ? 8 : M < 27 ? 10 : 12;
        }
      },
      x = function (M, C, R) {
        var B = A(M, R) - 4 - y(M, C);
        switch (C) {
          case 1:
            return 3 * ((B / 10) | 0) + (B % 10 < 4 ? 0 : B % 10 < 7 ? 1 : 2);
          case 2:
            return 2 * ((B / 11) | 0) + (B % 11 < 6 ? 0 : 1);
          case 4:
            return (B / 8) | 0;
          case 8:
            return (B / 13) | 0;
        }
      },
      b = function (M, C) {
        for (var R = M.slice(0), B = M.length, L = C.length, k = 0; k < L; ++k) R.push(0);
        for (k = 0; k < B; ) {
          var z = o[R[k++]];
          if (z >= 0) for (var X = 0; X < L; ++X) R[k + X] ^= i[(z + C[X]) % 255];
        }
        return R.slice(B);
      },
      v = function (M, C, R, B) {
        for (var L = M << B, k = C - 1; k >= 0; --k) (L >> (B + k)) & 1 && (L ^= R << k);
        return (M << B) | L;
      },
      _ = function (M, C, R) {
        for (var B = g[R], L = M.length, k = 0; k < L; ++k)
          for (var z = 0; z < L; ++z) C[k][z] || (M[k][z] ^= B(k, z));
        return M;
      },
      w = function (M, C, R, B) {
        for (var L = M.length, k = 21522 ^ v((R << 3) | B, 5, 1335, 10), z = 0; z < 15; ++z) {
          var X = [L - 1, L - 2, L - 3, L - 4, L - 5, L - 6, L - 7, L - 8, 7, 5, 4, 3, 2, 1, 0][z];
          M[[0, 1, 2, 3, 4, 5, 7, 8, L - 7, L - 6, L - 5, L - 4, L - 3, L - 2, L - 1][z]][8] = M[8][
            X
          ] = (k >> z) & 1;
        }
        return M;
      },
      S = function (M) {
        for (
          var C = function (K) {
              for (var ae = 0, Z = 0; Z < K.length; ++Z) K[Z] >= 5 && (ae += K[Z] - 5 + 3);
              for (Z = 5; Z < K.length; Z += 2) {
                var F = K[Z];
                K[Z - 1] == F &&
                  K[Z - 2] == 3 * F &&
                  K[Z - 3] == F &&
                  K[Z - 4] == F &&
                  (K[Z - 5] >= 4 * F || K[Z + 1] >= 4 * F) &&
                  (ae += 40);
              }
              return ae;
            },
            R = M.length,
            B = 0,
            L = 0,
            k = 0;
          k < R;
          ++k
        ) {
          var z,
            X = M[k];
          z = [0];
          for (var G = 0; G < R; ) {
            for (Q = 0; G < R && X[G]; ++Q) ++G;
            for (z.push(Q), Q = 0; G < R && !X[G]; ++Q) ++G;
            z.push(Q);
          }
          ((B += C(z)), (z = [0]));
          for (G = 0; G < R; ) {
            var Q;
            for (Q = 0; G < R && M[G][k]; ++Q) ++G;
            for (z.push(Q), Q = 0; G < R && !M[G][k]; ++Q) ++G;
            z.push(Q);
          }
          B += C(z);
          var de = M[k + 1] || [];
          L += X[0];
          for (G = 1; G < R; ++G) {
            var oe = X[G];
            ((L += oe), X[G - 1] == oe && de[G] === oe && de[G - 1] === oe && (B += 3));
          }
        }
        return (B += 10 * ((Math.abs(L / R / R - 0.5) / 0.05) | 0));
      },
      E = function (M, C, R, B, L) {
        var k = e[C],
          z = (function (ae, Z, F, te) {
            var he = [],
              re = 0,
              le = 8,
              ue = F.length,
              I = function (P, H) {
                if (H >= le) {
                  for (he.push(re | (P >> (H -= le))); H >= 8; ) he.push((P >> (H -= 8)) & 255);
                  ((re = 0), (le = 8));
                }
                H > 0 && (re |= (P & ((1 << H) - 1)) << (le -= H));
              },
              N = y(ae, Z);
            switch ((I(Z, 4), I(ue, N), Z)) {
              case 1:
                for (var Y = 2; Y < ue; Y += 3) I(parseInt(F.substring(Y - 2, Y + 1), 10), 10);
                I(parseInt(F.substring(Y - 2), 10), [0, 4, 7][ue % 3]);
                break;
              case 2:
                for (Y = 1; Y < ue; Y += 2) I(45 * p[F.charAt(Y - 1)] + p[F.charAt(Y)], 11);
                ue % 2 == 1 && I(p[F.charAt(Y - 1)], 6);
                break;
              case 4:
                for (Y = 0; Y < ue; ++Y) I(F[Y], 8);
            }
            for (I(0, 4), le < 8 && he.push(re); he.length + 1 < te; ) he.push(236, 17);
            return (he.length < te && he.push(236), he);
          })(C, R, M, A(C, B) >> 3);
        z = (function (ae, Z, F) {
          for (
            var te = [], he = (ae.length / Z) | 0, re = 0, le = Z - (ae.length % Z), ue = 0;
            ue < le;
            ++ue
          )
            (te.push(re), (re += he));
          for (ue = le; ue < Z; ++ue) (te.push(re), (re += he + 1));
          te.push(re);
          var I = [];
          for (ue = 0; ue < Z; ++ue) I.push(b(ae.slice(te[ue], te[ue + 1]), F));
          var N = [],
            Y = (ae.length / Z) | 0;
          for (ue = 0; ue < Y; ++ue) for (var P = 0; P < Z; ++P) N.push(ae[te[P] + ue]);
          for (P = le; P < Z; ++P) N.push(ae[te[P + 1] - 1]);
          for (ue = 0; ue < F.length; ++ue) for (P = 0; P < Z; ++P) N.push(I[P][ue]);
          return N;
        })(z, k[1][B], l[k[0][B]]);
        var X = (function (ae) {
            for (
              var Z = e[ae],
                F = (function (W) {
                  return 4 * W + 17;
                })(ae),
                te = [],
                he = [],
                re = 0;
              re < F;
              ++re
            )
              (te.push([]), he.push([]));
            var le = function (W, V, ne, J, U) {
              for (var D = 0; D < ne; ++D)
                for (var ee = 0; ee < J; ++ee)
                  ((te[W + D][V + ee] = (U[D] >> ee) & 1), (he[W + D][V + ee] = 1));
            };
            for (
              le(0, 0, 9, 9, [127, 65, 93, 93, 93, 65, 383, 0, 64]),
                le(F - 8, 0, 8, 9, [256, 127, 65, 93, 93, 93, 65, 127]),
                le(0, F - 8, 9, 8, [254, 130, 186, 186, 186, 130, 254, 0, 0]),
                re = 9;
              re < F - 8;
              ++re
            )
              ((te[6][re] = te[re][6] = 1 & ~re), (he[6][re] = he[re][6] = 1));
            var ue = Z[2],
              I = ue.length;
            for (re = 0; re < I; ++re)
              for (var N = re == 0 ? I - 1 : I, Y = re == 0 || re == I - 1 ? 1 : 0; Y < N; ++Y)
                le(ue[re], ue[Y], 5, 5, [31, 17, 21, 17, 31]);
            if (m(ae)) {
              var P = v(ae, 6, 7973, 12),
                H = 0;
              for (re = 0; re < 6; ++re)
                for (Y = 0; Y < 3; ++Y)
                  ((te[re][F - 11 + Y] = te[F - 11 + Y][re] = (P >> H++) & 1),
                    (he[re][F - 11 + Y] = he[F - 11 + Y][re] = 1));
            }
            return { matrix: te, reserved: he };
          })(C),
          { matrix: G, reserved: Q } = X;
        if (
          ((function (ae, Z, F) {
            for (var te = ae.length, he = 0, re = -1, le = te - 1; le >= 0; le -= 2) {
              le == 6 && --le;
              for (var ue = re < 0 ? te - 1 : 0, I = 0; I < te; ++I) {
                for (var N = le; N > le - 2; --N)
                  Z[ue][N] || ((ae[ue][N] = (F[he >> 3] >> (7 & ~he)) & 1), ++he);
                ue += re;
              }
              re = -re;
            }
          })(G, Q, z),
          L < 0)
        ) {
          (_(G, Q, 0), w(G, 0, B, 0));
          var de = 0,
            oe = S(G);
          for (_(G, Q, 0), L = 1; L < 8; ++L) {
            (_(G, Q, L), w(G, 0, B, L));
            var K = S(G);
            (oe > K && ((oe = K), (de = L)), _(G, Q, L));
          }
          L = de;
        }
        return (_(G, Q, L), w(G, 0, B, L), G);
      },
      T = {
        generate: function (M, C) {
          var R = { numeric: 1, alphanumeric: 2, octet: 4 },
            B = { L: 1, M: 0, Q: 3, H: 2 },
            L = (C = C || {}).version || -1,
            k = B[(C.ecclevel || "L").toUpperCase()],
            z = C.mode ? R[C.mode.toLowerCase()] : -1,
            X = "mask" in C ? C.mask : -1;
          if (z < 0) z = typeof M == "string" ? (M.match(t) ? 1 : M.match(n) ? 2 : 4) : 4;
          else if (z != 1 && z != 2 && z != 4) throw "invalid or unsupported mode";
          if (
            ((M = (function (G, Q) {
              switch (G) {
                case 1:
                  return Q.match(t) ? Q : null;
                case 2:
                  return Q.match(r) ? Q.toUpperCase() : null;
                case 4:
                  if (typeof Q == "string") {
                    for (var de = [], oe = 0; oe < Q.length; ++oe) {
                      var K = Q.charCodeAt(oe);
                      K < 128
                        ? de.push(K)
                        : K < 2048
                          ? de.push(192 | (K >> 6), 128 | (63 & K))
                          : K < 65536
                            ? de.push(224 | (K >> 12), 128 | ((K >> 6) & 63), 128 | (63 & K))
                            : de.push(
                                240 | (K >> 18),
                                128 | ((K >> 12) & 63),
                                128 | ((K >> 6) & 63),
                                128 | (63 & K),
                              );
                    }
                    return de;
                  }
                  return Q;
              }
            })(z, M)),
            M === null)
          )
            throw "invalid data format";
          if (k < 0 || k > 3) throw "invalid ECC level";
          if (L < 0) {
            for (L = 1; L <= 40 && !(M.length <= x(L, z, k)); ++L);
            if (L > 40) throw "too large data";
          } else if (L < 1 || L > 40) throw "invalid version";
          if (X != -1 && (X < 0 || X > 8)) throw "invalid mask";
          return E(M, L, z, k, X);
        },
        generateHTML: function (M, C) {
          C = C || {};
          for (
            var R = T.generate(M, C),
              B = Math.max(C.modulesize || 5, 0.5),
              L = C.unit || "px",
              k = C.ratio || 1,
              z = Math.max(C.margin !== null ? C.margin : 4, 0),
              X = document.createElement("div"),
              G = R.length,
              Q = [
                '<table border="0" cellspacing="0" cellpadding="0" style="border:' +
                  B * z +
                  'px solid #fff;background:#fff">',
              ],
              de = 0;
            de < G;
            ++de
          ) {
            Q.push("<tr>");
            for (var oe = 0; oe < G; ++oe) {
              let K =
                L !== "px"
                  ? "width:" + B * k + L + "; height:" + B * k + L
                  : "width:" + B + "px;height:" + B + "px";
              Q.push(
                '<td style="' +
                  K +
                  (R[de][oe] ? ";background:#000" : "") +
                  '" part="' +
                  (R[de][oe] ? "module-fg" : "module-bg") +
                  '" ></td>',
              );
            }
            Q.push("</tr>");
          }
          return ((X.className = "qrcode"), (X.innerHTML = Q.join("") + "</table>"), X);
        },
        generateSVG: function (M, C) {
          C = C || {};
          var R = T.generate(M, C),
            B = R.length,
            L = Math.max(C.modulesize || 5, 0.5),
            k = Math.max(C.margin !== null ? C.margin : 4, 0),
            z = L * (B + 2 * k),
            X = ' class= "fg" width="' + L + '" height="' + L + '"/>',
            G = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          (G.setAttribute("viewBox", "0 0 " + z + " " + z),
            G.setAttribute("style", "shape-rendering:crispEdges"),
            C.modulesize && (G.setAttribute("width", z), G.setAttribute("height", z)));
          for (
            var Q = [
                "<style scoped>.bg{fill:#FFF}.fg{fill:#000}</style>",
                '<rect class="bg" x="0" y="0"',
                'width="' + z + '" height="' + z + '"/>',
              ],
              de = k * L,
              oe = 0;
            oe < B;
            ++oe
          ) {
            for (var K = k * L, ae = 0; ae < B; ++ae)
              (R[oe][ae] && Q.push('<rect x="' + K + '" y="' + de + '"', X), (K += L));
            de += L;
          }
          return ((G.innerHTML = Q.join("")), G);
        },
        generatePNG: function (M, C) {
          C = C || {};
          var R,
            B = T.generate(M, C),
            L = Math.max(C.modulesize || 5, 0.5),
            k = Math.max(C.margin !== null ? C.margin : 4, 0),
            z = B.length,
            X = L * (z + 2 * k),
            G = document.createElement("canvas");
          if (((G.width = G.height = X), !(R = G.getContext("2d"))))
            throw "canvas support is needed for PNG output";
          ((R.fillStyle = "#fff"), R.fillRect(0, 0, X, X), (R.fillStyle = "#000"));
          for (var Q = 0; Q < z; ++Q)
            for (var de = 0; de < z; ++de) B[Q][de] && R.fillRect(L * (k + de), L * (k + Q), L, L);
          return G.toDataURL();
        },
      };
    return T;
  });
});
