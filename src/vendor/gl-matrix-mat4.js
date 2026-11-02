// src/vendor/gl-matrix-mat4.js
// gl-matrix mat4 helpers.
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var V6 = typeof Float32Array < "u" ? Float32Array : Array;
var nCe = Math.PI / 180,
  iCe = 180 / Math.PI;
function V1() {
  var e = new V6(16);
  if (V6 != Float32Array)
    ((e[1] = 0),
      (e[2] = 0),
      (e[3] = 0),
      (e[4] = 0),
      (e[6] = 0),
      (e[7] = 0),
      (e[8] = 0),
      (e[9] = 0),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0));
  return ((e[0] = 1), (e[5] = 1), (e[10] = 1), (e[15] = 1), e);
}
function Ore(e, t) {
  if (e === t) {
    var r = t[1],
      n = t[2],
      i = t[3],
      o = t[6],
      s = t[7],
      a = t[11];
    ((e[1] = t[4]),
      (e[2] = t[8]),
      (e[3] = t[12]),
      (e[4] = r),
      (e[6] = t[9]),
      (e[7] = t[13]),
      (e[8] = n),
      (e[9] = o),
      (e[11] = t[14]),
      (e[12] = i),
      (e[13] = s),
      (e[14] = a));
  } else
    ((e[0] = t[0]),
      (e[1] = t[4]),
      (e[2] = t[8]),
      (e[3] = t[12]),
      (e[4] = t[1]),
      (e[5] = t[5]),
      (e[6] = t[9]),
      (e[7] = t[13]),
      (e[8] = t[2]),
      (e[9] = t[6]),
      (e[10] = t[10]),
      (e[11] = t[14]),
      (e[12] = t[3]),
      (e[13] = t[7]),
      (e[14] = t[11]),
      (e[15] = t[15]));
  return e;
}
function Lre(e, t) {
  var r = t[0],
    n = t[1],
    i = t[2],
    o = t[3],
    s = t[4],
    a = t[5],
    l = t[6],
    c = t[7],
    u = t[8],
    d = t[9],
    h = t[10],
    f = t[11],
    p = t[12],
    g = t[13],
    m = t[14],
    A = t[15],
    y = r * a - n * s,
    x = r * l - i * s,
    b = r * c - o * s,
    v = n * l - i * a,
    _ = n * c - o * a,
    w = i * c - o * l,
    S = u * g - d * p,
    E = u * m - h * p,
    T = u * A - f * p,
    M = d * m - h * g,
    C = d * A - f * g,
    R = h * A - f * m,
    B = y * R - x * C + b * M + v * T - _ * E + w * S;
  if (!B) return null;
  return (
    (B = 1 / B),
    (e[0] = (a * R - l * C + c * M) * B),
    (e[1] = (i * C - n * R - o * M) * B),
    (e[2] = (g * w - m * _ + A * v) * B),
    (e[3] = (h * _ - d * w - f * v) * B),
    (e[4] = (l * T - s * R - c * E) * B),
    (e[5] = (r * R - i * T + o * E) * B),
    (e[6] = (m * b - p * w - A * x) * B),
    (e[7] = (u * w - h * b + f * x) * B),
    (e[8] = (s * C - a * T + c * S) * B),
    (e[9] = (n * T - r * C - o * S) * B),
    (e[10] = (p * _ - g * b + A * y) * B),
    (e[11] = (d * b - u * _ - f * y) * B),
    (e[12] = (a * E - s * M - l * S) * B),
    (e[13] = (r * M - n * E + i * S) * B),
    (e[14] = (g * x - p * v - m * y) * B),
    (e[15] = (u * v - d * x + h * y) * B),
    e
  );
}
function Bre(e, t, r) {
  var n = t[0],
    i = t[1],
    o = t[2],
    s = t[3],
    a = t[4],
    l = t[5],
    c = t[6],
    u = t[7],
    d = t[8],
    h = t[9],
    f = t[10],
    p = t[11],
    g = t[12],
    m = t[13],
    A = t[14],
    y = t[15],
    x = r[0],
    b = r[1],
    v = r[2],
    _ = r[3];
  return (
    (e[0] = x * n + b * a + v * d + _ * g),
    (e[1] = x * i + b * l + v * h + _ * m),
    (e[2] = x * o + b * c + v * f + _ * A),
    (e[3] = x * s + b * u + v * p + _ * y),
    (x = r[4]),
    (b = r[5]),
    (v = r[6]),
    (_ = r[7]),
    (e[4] = x * n + b * a + v * d + _ * g),
    (e[5] = x * i + b * l + v * h + _ * m),
    (e[6] = x * o + b * c + v * f + _ * A),
    (e[7] = x * s + b * u + v * p + _ * y),
    (x = r[8]),
    (b = r[9]),
    (v = r[10]),
    (_ = r[11]),
    (e[8] = x * n + b * a + v * d + _ * g),
    (e[9] = x * i + b * l + v * h + _ * m),
    (e[10] = x * o + b * c + v * f + _ * A),
    (e[11] = x * s + b * u + v * p + _ * y),
    (x = r[12]),
    (b = r[13]),
    (v = r[14]),
    (_ = r[15]),
    (e[12] = x * n + b * a + v * d + _ * g),
    (e[13] = x * i + b * l + v * h + _ * m),
    (e[14] = x * o + b * c + v * f + _ * A),
    (e[15] = x * s + b * u + v * p + _ * y),
    e
  );
}
