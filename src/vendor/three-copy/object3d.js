// src/vendor/three-copy/object3d.js
// Part of the second three.js copy (Matrix4, Euler, Object3D, Scene).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

class Matrix4_2 {
  constructor(e, t, r, n, i, o, s, a, l, c, u, d, h, f, p, g) {
    if (
      ((Matrix4_2.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      e !== void 0)
    )
      this.set(e, t, r, n, i, o, s, a, l, c, u, d, h, f, p, g);
  }
  set(e, t, r, n, i, o, s, a, l, c, u, d, h, f, p, g) {
    let m = this.elements;
    return (
      (m[0] = e),
      (m[4] = t),
      (m[8] = r),
      (m[12] = n),
      (m[1] = i),
      (m[5] = o),
      (m[9] = s),
      (m[13] = a),
      (m[2] = l),
      (m[6] = c),
      (m[10] = u),
      (m[14] = d),
      (m[3] = h),
      (m[7] = f),
      (m[11] = p),
      (m[15] = g),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new Matrix4_2().fromArray(this.elements);
  }
  copy(e) {
    let t = this.elements,
      r = e.elements;
    return (
      (t[0] = r[0]),
      (t[1] = r[1]),
      (t[2] = r[2]),
      (t[3] = r[3]),
      (t[4] = r[4]),
      (t[5] = r[5]),
      (t[6] = r[6]),
      (t[7] = r[7]),
      (t[8] = r[8]),
      (t[9] = r[9]),
      (t[10] = r[10]),
      (t[11] = r[11]),
      (t[12] = r[12]),
      (t[13] = r[13]),
      (t[14] = r[14]),
      (t[15] = r[15]),
      this
    );
  }
  copyPosition(e) {
    let t = this.elements,
      r = e.elements;
    return ((t[12] = r[12]), (t[13] = r[13]), (t[14] = r[14]), this);
  }
  setFromMatrix3(e) {
    let t = e.elements;
    return (
      this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1),
      this
    );
  }
  extractBasis(e, t, r) {
    return (
      e.setFromMatrixColumn(this, 0),
      t.setFromMatrixColumn(this, 1),
      r.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(e, t, r) {
    return (this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1), this);
  }
  extractRotation(e) {
    let t = this.elements,
      r = e.elements,
      n = 1 / _1.setFromMatrixColumn(e, 0).length(),
      i = 1 / _1.setFromMatrixColumn(e, 1).length(),
      o = 1 / _1.setFromMatrixColumn(e, 2).length();
    return (
      (t[0] = r[0] * n),
      (t[1] = r[1] * n),
      (t[2] = r[2] * n),
      (t[3] = 0),
      (t[4] = r[4] * i),
      (t[5] = r[5] * i),
      (t[6] = r[6] * i),
      (t[7] = 0),
      (t[8] = r[8] * o),
      (t[9] = r[9] * o),
      (t[10] = r[10] * o),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromEuler(e) {
    let t = this.elements,
      { x: r, y: n, z: i } = e,
      o = Math.cos(r),
      s = Math.sin(r),
      a = Math.cos(n),
      l = Math.sin(n),
      c = Math.cos(i),
      u = Math.sin(i);
    if (e.order === "XYZ") {
      let d = o * c,
        h = o * u,
        f = s * c,
        p = s * u;
      ((t[0] = a * c),
        (t[4] = -a * u),
        (t[8] = l),
        (t[1] = h + f * l),
        (t[5] = d - p * l),
        (t[9] = -s * a),
        (t[2] = p - d * l),
        (t[6] = f + h * l),
        (t[10] = o * a));
    } else if (e.order === "YXZ") {
      let d = a * c,
        h = a * u,
        f = l * c,
        p = l * u;
      ((t[0] = d + p * s),
        (t[4] = f * s - h),
        (t[8] = o * l),
        (t[1] = o * u),
        (t[5] = o * c),
        (t[9] = -s),
        (t[2] = h * s - f),
        (t[6] = p + d * s),
        (t[10] = o * a));
    } else if (e.order === "ZXY") {
      let d = a * c,
        h = a * u,
        f = l * c,
        p = l * u;
      ((t[0] = d - p * s),
        (t[4] = -o * u),
        (t[8] = f + h * s),
        (t[1] = h + f * s),
        (t[5] = o * c),
        (t[9] = p - d * s),
        (t[2] = -o * l),
        (t[6] = s),
        (t[10] = o * a));
    } else if (e.order === "ZYX") {
      let d = o * c,
        h = o * u,
        f = s * c,
        p = s * u;
      ((t[0] = a * c),
        (t[4] = f * l - h),
        (t[8] = d * l + p),
        (t[1] = a * u),
        (t[5] = p * l + d),
        (t[9] = h * l - f),
        (t[2] = -l),
        (t[6] = s * a),
        (t[10] = o * a));
    } else if (e.order === "YZX") {
      let d = o * a,
        h = o * l,
        f = s * a,
        p = s * l;
      ((t[0] = a * c),
        (t[4] = p - d * u),
        (t[8] = f * u + h),
        (t[1] = u),
        (t[5] = o * c),
        (t[9] = -s * c),
        (t[2] = -l * c),
        (t[6] = h * u + f),
        (t[10] = d - p * u));
    } else if (e.order === "XZY") {
      let d = o * a,
        h = o * l,
        f = s * a,
        p = s * l;
      ((t[0] = a * c),
        (t[4] = -u),
        (t[8] = l * c),
        (t[1] = d * u + p),
        (t[5] = o * c),
        (t[9] = h * u - f),
        (t[2] = f * u - h),
        (t[6] = s * c),
        (t[10] = p * u + d));
    }
    return (
      (t[3] = 0),
      (t[7] = 0),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromQuaternion(e) {
    return this.compose(zJ, e, VJ);
  }
  lookAt(e, t, r) {
    let n = this.elements;
    if ((Ra.subVectors(e, t), Ra.lengthSq() === 0)) Ra.z = 1;
    if ((Ra.normalize(), Jd.crossVectors(r, Ra), Jd.lengthSq() === 0)) {
      if (Math.abs(r.z) === 1) Ra.x += 0.0001;
      else Ra.z += 0.0001;
      (Ra.normalize(), Jd.crossVectors(r, Ra));
    }
    return (
      Jd.normalize(),
      Yb.crossVectors(Ra, Jd),
      (n[0] = Jd.x),
      (n[4] = Yb.x),
      (n[8] = Ra.x),
      (n[1] = Jd.y),
      (n[5] = Yb.y),
      (n[9] = Ra.y),
      (n[2] = Jd.z),
      (n[6] = Yb.z),
      (n[10] = Ra.z),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    let r = e.elements,
      n = t.elements,
      i = this.elements,
      o = r[0],
      s = r[4],
      a = r[8],
      l = r[12],
      c = r[1],
      u = r[5],
      d = r[9],
      h = r[13],
      f = r[2],
      p = r[6],
      g = r[10],
      m = r[14],
      A = r[3],
      y = r[7],
      x = r[11],
      b = r[15],
      v = n[0],
      _ = n[4],
      w = n[8],
      S = n[12],
      E = n[1],
      T = n[5],
      M = n[9],
      C = n[13],
      R = n[2],
      B = n[6],
      L = n[10],
      k = n[14],
      z = n[3],
      X = n[7],
      G = n[11],
      Q = n[15];
    return (
      (i[0] = o * v + s * E + a * R + l * z),
      (i[4] = o * _ + s * T + a * B + l * X),
      (i[8] = o * w + s * M + a * L + l * G),
      (i[12] = o * S + s * C + a * k + l * Q),
      (i[1] = c * v + u * E + d * R + h * z),
      (i[5] = c * _ + u * T + d * B + h * X),
      (i[9] = c * w + u * M + d * L + h * G),
      (i[13] = c * S + u * C + d * k + h * Q),
      (i[2] = f * v + p * E + g * R + m * z),
      (i[6] = f * _ + p * T + g * B + m * X),
      (i[10] = f * w + p * M + g * L + m * G),
      (i[14] = f * S + p * C + g * k + m * Q),
      (i[3] = A * v + y * E + x * R + b * z),
      (i[7] = A * _ + y * T + x * B + b * X),
      (i[11] = A * w + y * M + x * L + b * G),
      (i[15] = A * S + y * C + x * k + b * Q),
      this
    );
  }
  multiplyScalar(e) {
    let t = this.elements;
    return (
      (t[0] *= e),
      (t[4] *= e),
      (t[8] *= e),
      (t[12] *= e),
      (t[1] *= e),
      (t[5] *= e),
      (t[9] *= e),
      (t[13] *= e),
      (t[2] *= e),
      (t[6] *= e),
      (t[10] *= e),
      (t[14] *= e),
      (t[3] *= e),
      (t[7] *= e),
      (t[11] *= e),
      (t[15] *= e),
      this
    );
  }
  determinant() {
    let e = this.elements,
      t = e[0],
      r = e[4],
      n = e[8],
      i = e[12],
      o = e[1],
      s = e[5],
      a = e[9],
      l = e[13],
      c = e[2],
      u = e[6],
      d = e[10],
      h = e[14],
      f = e[3],
      p = e[7],
      g = e[11],
      m = e[15];
    return (
      f * (+i * a * u - n * l * u - i * s * d + r * l * d + n * s * h - r * a * h) +
      p * (+t * a * h - t * l * d + i * o * d - n * o * h + n * l * c - i * a * c) +
      g * (+t * l * u - t * s * h - i * o * u + r * o * h + i * s * c - r * l * c) +
      m * (-n * s * c - t * a * u + t * s * d + n * o * u - r * o * d + r * a * c)
    );
  }
  transpose() {
    let e = this.elements,
      t;
    return (
      (t = e[1]),
      (e[1] = e[4]),
      (e[4] = t),
      (t = e[2]),
      (e[2] = e[8]),
      (e[8] = t),
      (t = e[6]),
      (e[6] = e[9]),
      (e[9] = t),
      (t = e[3]),
      (e[3] = e[12]),
      (e[12] = t),
      (t = e[7]),
      (e[7] = e[13]),
      (e[13] = t),
      (t = e[11]),
      (e[11] = e[14]),
      (e[14] = t),
      this
    );
  }
  setPosition(e, t, r) {
    let n = this.elements;
    if (e.isVector3) ((n[12] = e.x), (n[13] = e.y), (n[14] = e.z));
    else ((n[12] = e), (n[13] = t), (n[14] = r));
    return this;
  }
  invert() {
    let e = this.elements,
      t = e[0],
      r = e[1],
      n = e[2],
      i = e[3],
      o = e[4],
      s = e[5],
      a = e[6],
      l = e[7],
      c = e[8],
      u = e[9],
      d = e[10],
      h = e[11],
      f = e[12],
      p = e[13],
      g = e[14],
      m = e[15],
      A = u * g * l - p * d * l + p * a * h - s * g * h - u * a * m + s * d * m,
      y = f * d * l - c * g * l - f * a * h + o * g * h + c * a * m - o * d * m,
      x = c * p * l - f * u * l + f * s * h - o * p * h - c * s * m + o * u * m,
      b = f * u * a - c * p * a - f * s * d + o * p * d + c * s * g - o * u * g,
      v = t * A + r * y + n * x + i * b;
    if (v === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    let _ = 1 / v;
    return (
      (e[0] = A * _),
      (e[1] = (p * d * i - u * g * i - p * n * h + r * g * h + u * n * m - r * d * m) * _),
      (e[2] = (s * g * i - p * a * i + p * n * l - r * g * l - s * n * m + r * a * m) * _),
      (e[3] = (u * a * i - s * d * i - u * n * l + r * d * l + s * n * h - r * a * h) * _),
      (e[4] = y * _),
      (e[5] = (c * g * i - f * d * i + f * n * h - t * g * h - c * n * m + t * d * m) * _),
      (e[6] = (f * a * i - o * g * i - f * n * l + t * g * l + o * n * m - t * a * m) * _),
      (e[7] = (o * d * i - c * a * i + c * n * l - t * d * l - o * n * h + t * a * h) * _),
      (e[8] = x * _),
      (e[9] = (f * u * i - c * p * i - f * r * h + t * p * h + c * r * m - t * u * m) * _),
      (e[10] = (o * p * i - f * s * i + f * r * l - t * p * l - o * r * m + t * s * m) * _),
      (e[11] = (c * s * i - o * u * i - c * r * l + t * u * l + o * r * h - t * s * h) * _),
      (e[12] = b * _),
      (e[13] = (c * p * n - f * u * n + f * r * d - t * p * d - c * r * g + t * u * g) * _),
      (e[14] = (f * s * n - o * p * n - f * r * a + t * p * a + o * r * g - t * s * g) * _),
      (e[15] = (o * u * n - c * s * n + c * r * a - t * u * a - o * r * d + t * s * d) * _),
      this
    );
  }
  scale(e) {
    let t = this.elements,
      { x: r, y: n, z: i } = e;
    return (
      (t[0] *= r),
      (t[4] *= n),
      (t[8] *= i),
      (t[1] *= r),
      (t[5] *= n),
      (t[9] *= i),
      (t[2] *= r),
      (t[6] *= n),
      (t[10] *= i),
      (t[3] *= r),
      (t[7] *= n),
      (t[11] *= i),
      this
    );
  }
  getMaxScaleOnAxis() {
    let e = this.elements,
      t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
      r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
      n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, r, n));
  }
  makeTranslation(e, t, r) {
    if (e.isVector3) this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1);
    else this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1);
    return this;
  }
  makeRotationX(e) {
    let t = Math.cos(e),
      r = Math.sin(e);
    return (this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this);
  }
  makeRotationY(e) {
    let t = Math.cos(e),
      r = Math.sin(e);
    return (this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ(e) {
    let t = Math.cos(e),
      r = Math.sin(e);
    return (this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis(e, t) {
    let r = Math.cos(t),
      n = Math.sin(t),
      i = 1 - r,
      { x: o, y: s, z: a } = e,
      l = i * o,
      c = i * s;
    return (
      this.set(
        l * o + r,
        l * s - n * a,
        l * a + n * s,
        0,
        l * s + n * a,
        c * s + r,
        c * a - n * o,
        0,
        l * a - n * s,
        c * a + n * o,
        i * a * a + r,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(e, t, r) {
    return (this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this);
  }
  makeShear(e, t, r, n, i, o) {
    return (this.set(1, r, i, 0, e, 1, o, 0, t, n, 1, 0, 0, 0, 0, 1), this);
  }
  compose(e, t, r) {
    let n = this.elements,
      { _x: i, _y: o, _z: s, _w: a } = t,
      l = i + i,
      c = o + o,
      u = s + s,
      d = i * l,
      h = i * c,
      f = i * u,
      p = o * c,
      g = o * u,
      m = s * u,
      A = a * l,
      y = a * c,
      x = a * u,
      { x: b, y: v, z: _ } = r;
    return (
      (n[0] = (1 - (p + m)) * b),
      (n[1] = (h + x) * b),
      (n[2] = (f - y) * b),
      (n[3] = 0),
      (n[4] = (h - x) * v),
      (n[5] = (1 - (d + m)) * v),
      (n[6] = (g + A) * v),
      (n[7] = 0),
      (n[8] = (f + y) * _),
      (n[9] = (g - A) * _),
      (n[10] = (1 - (d + p)) * _),
      (n[11] = 0),
      (n[12] = e.x),
      (n[13] = e.y),
      (n[14] = e.z),
      (n[15] = 1),
      this
    );
  }
  decompose(e, t, r) {
    let n = this.elements,
      i = _1.set(n[0], n[1], n[2]).length(),
      o = _1.set(n[4], n[5], n[6]).length(),
      s = _1.set(n[8], n[9], n[10]).length();
    if (this.determinant() < 0) i = -i;
    ((e.x = n[12]), (e.y = n[13]), (e.z = n[14]), Xl.copy(this));
    let l = 1 / i,
      c = 1 / o,
      u = 1 / s;
    return (
      (Xl.elements[0] *= l),
      (Xl.elements[1] *= l),
      (Xl.elements[2] *= l),
      (Xl.elements[4] *= c),
      (Xl.elements[5] *= c),
      (Xl.elements[6] *= c),
      (Xl.elements[8] *= u),
      (Xl.elements[9] *= u),
      (Xl.elements[10] *= u),
      t.setFromRotationMatrix(Xl),
      (r.x = i),
      (r.y = o),
      (r.z = s),
      this
    );
  }
  makePerspective(e, t, r, n, i, o, s = og) {
    let a = this.elements,
      l = (2 * i) / (t - e),
      c = (2 * i) / (r - n),
      u = (t + e) / (t - e),
      d = (r + n) / (r - n),
      h,
      f;
    if (s === og) ((h = -(o + i) / (o - i)), (f = (-2 * o * i) / (o - i)));
    else if (s === IT) ((h = -o / (o - i)), (f = (-o * i) / (o - i)));
    else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
    return (
      (a[0] = l),
      (a[4] = 0),
      (a[8] = u),
      (a[12] = 0),
      (a[1] = 0),
      (a[5] = c),
      (a[9] = d),
      (a[13] = 0),
      (a[2] = 0),
      (a[6] = 0),
      (a[10] = h),
      (a[14] = f),
      (a[3] = 0),
      (a[7] = 0),
      (a[11] = -1),
      (a[15] = 0),
      this
    );
  }
  makeOrthographic(e, t, r, n, i, o, s = og) {
    let a = this.elements,
      l = 1 / (t - e),
      c = 1 / (r - n),
      u = 1 / (o - i),
      d = (t + e) * l,
      h = (r + n) * c,
      f,
      p;
    if (s === og) ((f = (o + i) * u), (p = -2 * u));
    else if (s === IT) ((f = i * u), (p = -1 * u));
    else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
    return (
      (a[0] = 2 * l),
      (a[4] = 0),
      (a[8] = 0),
      (a[12] = -d),
      (a[1] = 0),
      (a[5] = 2 * c),
      (a[9] = 0),
      (a[13] = -h),
      (a[2] = 0),
      (a[6] = 0),
      (a[10] = p),
      (a[14] = -f),
      (a[3] = 0),
      (a[7] = 0),
      (a[11] = 0),
      (a[15] = 1),
      this
    );
  }
  equals(e) {
    let t = this.elements,
      r = e.elements;
    for (let n = 0; n < 16; n++) if (t[n] !== r[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 16; r++) this.elements[r] = e[r + t];
    return this;
  }
  toArray(e = [], t = 0) {
    let r = this.elements;
    return (
      (e[t] = r[0]),
      (e[t + 1] = r[1]),
      (e[t + 2] = r[2]),
      (e[t + 3] = r[3]),
      (e[t + 4] = r[4]),
      (e[t + 5] = r[5]),
      (e[t + 6] = r[6]),
      (e[t + 7] = r[7]),
      (e[t + 8] = r[8]),
      (e[t + 9] = r[9]),
      (e[t + 10] = r[10]),
      (e[t + 11] = r[11]),
      (e[t + 12] = r[12]),
      (e[t + 13] = r[13]),
      (e[t + 14] = r[14]),
      (e[t + 15] = r[15]),
      e
    );
  }
}
var _1 = /*@__PURE__*/ new Vector3_2(),
  Xl = /*@__PURE__*/ new Matrix4_2(),
  zJ = /*@__PURE__*/ new Vector3_2(0, 0, 0),
  VJ = /*@__PURE__*/ new Vector3_2(1, 1, 1),
  Jd = /*@__PURE__*/ new Vector3_2(),
  Yb = /*@__PURE__*/ new Vector3_2(),
  Ra = /*@__PURE__*/ new Vector3_2();
var lN = /*@__PURE__*/ new Matrix4_2(),
  cN = /*@__PURE__*/ new Quaternion_2();
class Euler_2 {
  constructor(e = 0, t = 0, r = 0, n = Euler_2.DEFAULT_ORDER) {
    ((this.isEuler = !0), (this._x = e), (this._y = t), (this._z = r), (this._order = n));
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order(e) {
    ((this._order = e), this._onChangeCallback());
  }
  set(e, t, r, n = this._order) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = r),
      (this._order = n),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return (
      (this._x = e._x),
      (this._y = e._y),
      (this._z = e._z),
      (this._order = e._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e, t = this._order, r = !0) {
    let n = e.elements,
      i = n[0],
      o = n[4],
      s = n[8],
      a = n[1],
      l = n[5],
      c = n[9],
      u = n[2],
      d = n[6],
      h = n[10];
    switch (t) {
      case "XYZ":
        if (((this._y = Math.asin(Fr(s, -1, 1))), Math.abs(s) < 0.9999999))
          ((this._x = Math.atan2(-c, h)), (this._z = Math.atan2(-o, i)));
        else ((this._x = Math.atan2(d, l)), (this._z = 0));
        break;
      case "YXZ":
        if (((this._x = Math.asin(-Fr(c, -1, 1))), Math.abs(c) < 0.9999999))
          ((this._y = Math.atan2(s, h)), (this._z = Math.atan2(a, l)));
        else ((this._y = Math.atan2(-u, i)), (this._z = 0));
        break;
      case "ZXY":
        if (((this._x = Math.asin(Fr(d, -1, 1))), Math.abs(d) < 0.9999999))
          ((this._y = Math.atan2(-u, h)), (this._z = Math.atan2(-o, l)));
        else ((this._y = 0), (this._z = Math.atan2(a, i)));
        break;
      case "ZYX":
        if (((this._y = Math.asin(-Fr(u, -1, 1))), Math.abs(u) < 0.9999999))
          ((this._x = Math.atan2(d, h)), (this._z = Math.atan2(a, i)));
        else ((this._x = 0), (this._z = Math.atan2(-o, l)));
        break;
      case "YZX":
        if (((this._z = Math.asin(Fr(a, -1, 1))), Math.abs(a) < 0.9999999))
          ((this._x = Math.atan2(-c, l)), (this._y = Math.atan2(-u, i)));
        else ((this._x = 0), (this._y = Math.atan2(s, h)));
        break;
      case "XZY":
        if (((this._z = Math.asin(-Fr(o, -1, 1))), Math.abs(o) < 0.9999999))
          ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(s, i)));
        else ((this._x = Math.atan2(-c, h)), (this._y = 0));
        break;
      default:
    }
    if (((this._order = t), r === !0)) this._onChangeCallback();
    return this;
  }
  setFromQuaternion(e, t, r) {
    return (lN.makeRotationFromQuaternion(e), this.setFromRotationMatrix(lN, t, r));
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return (cN.setFromEuler(this), this.setFromQuaternion(cN, e));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    if (((this._x = e[0]), (this._y = e[1]), (this._z = e[2]), e[3] !== void 0)) this._order = e[3];
    return (this._onChangeCallback(), this);
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x),
      (e[t + 1] = this._y),
      (e[t + 2] = this._z),
      (e[t + 3] = this._order),
      e
    );
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}
Euler_2.DEFAULT_ORDER = "XYZ";
class qE {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = ((1 << e) | 0) >>> 0;
  }
  enable(e) {
    this.mask |= (1 << e) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= (1 << e) | 0;
  }
  disable(e) {
    this.mask &= ~((1 << e) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & ((1 << e) | 0)) !== 0;
  }
}
var WJ = 0,
  uN = /*@__PURE__*/ new Vector3_2(),
  v1 = /*@__PURE__*/ new Quaternion_2(),
  Du = /*@__PURE__*/ new Matrix4_2(),
  Xb = /*@__PURE__*/ new Vector3_2(),
  d3 = /*@__PURE__*/ new Vector3_2(),
  QJ = /*@__PURE__*/ new Vector3_2(),
  YJ = /*@__PURE__*/ new Quaternion_2(),
  dN = /*@__PURE__*/ new Vector3_2(1, 0, 0),
  hN = /*@__PURE__*/ new Vector3_2(0, 1, 0),
  fN = /*@__PURE__*/ new Vector3_2(0, 0, 1),
  pN = { type: "added" },
  XJ = { type: "removed" },
  C1 = { type: "childadded", child: null },
  ZE = { type: "childremoved", child: null };
class Object3D_2 extends du {
  constructor() {
    super();
    ((this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: WJ++ }),
      (this.uuid = vd()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = Object3D_2.DEFAULT_UP.clone()));
    let e = new Vector3_2(),
      t = new Euler_2(),
      r = new Quaternion_2(),
      n = new Vector3_2(1, 1, 1);
    function i() {
      r.setFromEuler(t, !1);
    }
    function o() {
      t.setFromQuaternion(r, void 0, !1);
    }
    (t._onChange(i),
      r._onChange(o),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: e },
        rotation: { configurable: !0, enumerable: !0, value: t },
        quaternion: { configurable: !0, enumerable: !0, value: r },
        scale: { configurable: !0, enumerable: !0, value: n },
        modelViewMatrix: { value: new Matrix4_2() },
        normalMatrix: { value: new Matrix3_2() },
      }),
      (this.matrix = new Matrix4_2()),
      (this.matrixWorld = new Matrix4_2()),
      (this.matrixAutoUpdate = Object3D_2.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = Object3D_2.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new qE()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {}));
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    (this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion(e) {
    return (this.quaternion.premultiply(e), this);
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return (v1.setFromAxisAngle(e, t), this.quaternion.multiply(v1), this);
  }
  rotateOnWorldAxis(e, t) {
    return (v1.setFromAxisAngle(e, t), this.quaternion.premultiply(v1), this);
  }
  rotateX(e) {
    return this.rotateOnAxis(dN, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(hN, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(fN, e);
  }
  translateOnAxis(e, t) {
    return (
      uN.copy(e).applyQuaternion(this.quaternion),
      this.position.add(uN.multiplyScalar(t)),
      this
    );
  }
  translateX(e) {
    return this.translateOnAxis(dN, e);
  }
  translateY(e) {
    return this.translateOnAxis(hN, e);
  }
  translateZ(e) {
    return this.translateOnAxis(fN, e);
  }
  localToWorld(e) {
    return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld));
  }
  worldToLocal(e) {
    return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(Du.copy(this.matrixWorld).invert()));
  }
  lookAt(e, t, r) {
    if (e.isVector3) Xb.copy(e);
    else Xb.set(e, t, r);
    let n = this.parent;
    if (
      (this.updateWorldMatrix(!0, !1),
      d3.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight)
    )
      Du.lookAt(d3, Xb, this.up);
    else Du.lookAt(Xb, d3, this.up);
    if ((this.quaternion.setFromRotationMatrix(Du), n))
      (Du.extractRotation(n.matrixWorld),
        v1.setFromRotationMatrix(Du),
        this.quaternion.premultiply(v1.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
      return this;
    }
    if (e === this) return this;
    if (e && e.isObject3D)
      (e.removeFromParent(),
        (e.parent = this),
        this.children.push(e),
        e.dispatchEvent(pN),
        (C1.child = e),
        this.dispatchEvent(C1),
        (C1.child = null));
    return this;
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let r = 0; r < arguments.length; r++) this.remove(arguments[r]);
      return this;
    }
    let t = this.children.indexOf(e);
    if (t !== -1)
      ((e.parent = null),
        this.children.splice(t, 1),
        e.dispatchEvent(XJ),
        (ZE.child = e),
        this.dispatchEvent(ZE),
        (ZE.child = null));
    return this;
  }
  removeFromParent() {
    let e = this.parent;
    if (e !== null) e.remove(this);
    return this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    if ((this.updateWorldMatrix(!0, !1), Du.copy(this.matrixWorld).invert(), e.parent !== null))
      (e.parent.updateWorldMatrix(!0, !1), Du.multiply(e.parent.matrixWorld));
    return (
      e.applyMatrix4(Du),
      e.removeFromParent(),
      (e.parent = this),
      this.children.push(e),
      e.updateWorldMatrix(!1, !0),
      e.dispatchEvent(pN),
      (C1.child = e),
      this.dispatchEvent(C1),
      (C1.child = null),
      this
    );
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let r = 0, n = this.children.length; r < n; r++) {
      let o = this.children[r].getObjectByProperty(e, t);
      if (o !== void 0) return o;
    }
    return;
  }
  getObjectsByProperty(e, t, r = []) {
    if (this[e] === t) r.push(this);
    let n = this.children;
    for (let i = 0, o = n.length; i < o; i++) n[i].getObjectsByProperty(e, t, r);
    return r;
  }
  getWorldPosition(e) {
    return (this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld));
  }
  getWorldQuaternion(e) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(d3, e, QJ), e);
  }
  getWorldScale(e) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(d3, YJ, e), e);
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    let t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    let t = this.children;
    for (let r = 0, n = t.length; r < n; r++) t[r].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    let t = this.children;
    for (let r = 0, n = t.length; r < n; r++) t[r].traverseVisible(e);
  }
  traverseAncestors(e) {
    let t = this.parent;
    if (t !== null) (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    (this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0));
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || e) {
      if (this.matrixWorldAutoUpdate === !0)
        if (this.parent === null) this.matrixWorld.copy(this.matrix);
        else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      ((this.matrixWorldNeedsUpdate = !1), (e = !0));
    }
    let t = this.children;
    for (let r = 0, n = t.length; r < n; r++) t[r].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    let r = this.parent;
    if (e === !0 && r !== null) r.updateWorldMatrix(!0, !1);
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldAutoUpdate === !0)
      if (this.parent === null) this.matrixWorld.copy(this.matrix);
      else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
    if (t === !0) {
      let n = this.children;
      for (let i = 0, o = n.length; i < o; i++) n[i].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    let t = e === void 0 || typeof e === "string",
      r = {};
    if (t)
      ((e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
        (r.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" }));
    let n = {};
    if (((n.uuid = this.uuid), (n.type = this.type), this.name !== "")) n.name = this.name;
    if (this.castShadow === !0) n.castShadow = !0;
    if (this.receiveShadow === !0) n.receiveShadow = !0;
    if (this.visible === !1) n.visible = !1;
    if (this.frustumCulled === !1) n.frustumCulled = !1;
    if (this.renderOrder !== 0) n.renderOrder = this.renderOrder;
    if (Object.keys(this.userData).length > 0) n.userData = this.userData;
    if (
      ((n.layers = this.layers.mask),
      (n.matrix = this.matrix.toArray()),
      (n.up = this.up.toArray()),
      this.matrixAutoUpdate === !1)
    )
      n.matrixAutoUpdate = !1;
    if (this.isInstancedMesh) {
      if (
        ((n.type = "InstancedMesh"),
        (n.count = this.count),
        (n.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null)
      )
        n.instanceColor = this.instanceColor.toJSON();
    }
    if (this.isBatchedMesh) {
      if (
        ((n.type = "BatchedMesh"),
        (n.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (n.sortObjects = this.sortObjects),
        (n.drawRanges = this._drawRanges),
        (n.reservedRanges = this._reservedRanges),
        (n.visibility = this._visibility),
        (n.active = this._active),
        (n.bounds = this._bounds.map((s) => ({
          boxInitialized: s.boxInitialized,
          boxMin: s.box.min.toArray(),
          boxMax: s.box.max.toArray(),
          sphereInitialized: s.sphereInitialized,
          sphereRadius: s.sphere.radius,
          sphereCenter: s.sphere.center.toArray(),
        }))),
        (n.maxInstanceCount = this._maxInstanceCount),
        (n.maxVertexCount = this._maxVertexCount),
        (n.maxIndexCount = this._maxIndexCount),
        (n.geometryInitialized = this._geometryInitialized),
        (n.geometryCount = this._geometryCount),
        (n.matricesTexture = this._matricesTexture.toJSON(e)),
        this._colorsTexture !== null)
      )
        n.colorsTexture = this._colorsTexture.toJSON(e);
      if (this.boundingSphere !== null)
        n.boundingSphere = {
          center: n.boundingSphere.center.toArray(),
          radius: n.boundingSphere.radius,
        };
      if (this.boundingBox !== null)
        n.boundingBox = { min: n.boundingBox.min.toArray(), max: n.boundingBox.max.toArray() };
    }
    function i(s, a) {
      if (s[a.uuid] === void 0) s[a.uuid] = a.toJSON(e);
      return a.uuid;
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) n.background = this.background.toJSON();
        else if (this.background.isTexture) n.background = this.background.toJSON(e).uuid;
      }
      if (
        this.environment &&
        this.environment.isTexture &&
        this.environment.isRenderTargetTexture !== !0
      )
        n.environment = this.environment.toJSON(e).uuid;
    } else if (this.isMesh || this.isLine || this.isPoints) {
      n.geometry = i(e.geometries, this.geometry);
      let s = this.geometry.parameters;
      if (s !== void 0 && s.shapes !== void 0) {
        let a = s.shapes;
        if (Array.isArray(a))
          for (let l = 0, c = a.length; l < c; l++) {
            let u = a[l];
            i(e.shapes, u);
          }
        else i(e.shapes, a);
      }
    }
    if (this.isSkinnedMesh) {
      if (
        ((n.bindMode = this.bindMode),
        (n.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0)
      )
        (i(e.skeletons, this.skeleton), (n.skeleton = this.skeleton.uuid));
    }
    if (this.material !== void 0)
      if (Array.isArray(this.material)) {
        let s = [];
        for (let a = 0, l = this.material.length; a < l; a++)
          s.push(i(e.materials, this.material[a]));
        n.material = s;
      } else n.material = i(e.materials, this.material);
    if (this.children.length > 0) {
      n.children = [];
      for (let s = 0; s < this.children.length; s++)
        n.children.push(this.children[s].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      n.animations = [];
      for (let s = 0; s < this.animations.length; s++) {
        let a = this.animations[s];
        n.animations.push(i(e.animations, a));
      }
    }
    if (t) {
      let s = o(e.geometries),
        a = o(e.materials),
        l = o(e.textures),
        c = o(e.images),
        u = o(e.shapes),
        d = o(e.skeletons),
        h = o(e.animations),
        f = o(e.nodes);
      if (s.length > 0) r.geometries = s;
      if (a.length > 0) r.materials = a;
      if (l.length > 0) r.textures = l;
      if (c.length > 0) r.images = c;
      if (u.length > 0) r.shapes = u;
      if (d.length > 0) r.skeletons = d;
      if (h.length > 0) r.animations = h;
      if (f.length > 0) r.nodes = f;
    }
    return ((r.object = n), r);
    function o(s) {
      let a = [];
      for (let l in s) {
        let c = s[l];
        (delete c.metadata, a.push(c));
      }
      return a;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (
      ((this.name = e.name),
      this.up.copy(e.up),
      this.position.copy(e.position),
      (this.rotation.order = e.rotation.order),
      this.quaternion.copy(e.quaternion),
      this.scale.copy(e.scale),
      this.matrix.copy(e.matrix),
      this.matrixWorld.copy(e.matrixWorld),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
      (this.layers.mask = e.layers.mask),
      (this.visible = e.visible),
      (this.castShadow = e.castShadow),
      (this.receiveShadow = e.receiveShadow),
      (this.frustumCulled = e.frustumCulled),
      (this.renderOrder = e.renderOrder),
      (this.animations = e.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      t === !0)
    )
      for (let r = 0; r < e.children.length; r++) {
        let n = e.children[r];
        this.add(n.clone());
      }
    return this;
  }
}
Object3D_2.DEFAULT_UP = /*@__PURE__*/ new Vector3_2(0, 1, 0);
Object3D_2.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Object3D_2.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Scene_2 extends Object3D_2 {
  constructor() {
    super();
    if (
      ((this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new Euler_2()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new Euler_2()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u")
    )
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    if ((super.copy(e, t), e.background !== null)) this.background = e.background.clone();
    if (e.environment !== null) this.environment = e.environment.clone();
    if (e.fog !== null) this.fog = e.fog.clone();
    if (
      ((this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      this.backgroundRotation.copy(e.backgroundRotation),
      (this.environmentIntensity = e.environmentIntensity),
      this.environmentRotation.copy(e.environmentRotation),
      e.overrideMaterial !== null)
    )
      this.overrideMaterial = e.overrideMaterial.clone();
    return ((this.matrixAutoUpdate = e.matrixAutoUpdate), this);
  }
  toJSON(e) {
    let t = super.toJSON(e);
    if (this.fog !== null) t.object.fog = this.fog.toJSON();
    if (this.backgroundBlurriness > 0) t.object.backgroundBlurriness = this.backgroundBlurriness;
    if (this.backgroundIntensity !== 1) t.object.backgroundIntensity = this.backgroundIntensity;
    if (
      ((t.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1)
    )
      t.object.environmentIntensity = this.environmentIntensity;
    return ((t.object.environmentRotation = this.environmentRotation.toArray()), t);
  }
}
function cl(e, t) {
  e[t] = null;
}
