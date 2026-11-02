// src/vendor/three-copy/box3-render-target.js
// Part of the second three.js copy (Box3, RenderTarget).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var localforage = In(Hs(), 1);
class Box3_2 {
  constructor(e = new Vector3_2(1 / 0, 1 / 0, 1 / 0), t = new Vector3_2(-1 / 0, -1 / 0, -1 / 0)) {
    ((this.isBox3 = !0), (this.min = e), (this.max = t));
  }
  set(e, t) {
    return (this.min.copy(e), this.max.copy(t), this);
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t += 3) this.expandByPoint(Ql.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, r = e.count; t < r; t++) this.expandByPoint(Ql.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    let r = Ql.copy(t).multiplyScalar(0.5);
    return (this.min.copy(e).sub(r), this.max.copy(e).add(r), this);
  }
  setFromObject(e, t = !1) {
    return (this.makeEmpty(), this.expandByObject(e, t));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.min.copy(e.min), this.max.copy(e.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return (this.min.min(e), this.max.max(e), this);
  }
  expandByVector(e) {
    return (this.min.sub(e), this.max.add(e), this);
  }
  expandByScalar(e) {
    return (this.min.addScalar(-e), this.max.addScalar(e), this);
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    let r = e.geometry;
    if (r !== void 0) {
      let i = r.getAttribute("position");
      if (t === !0 && i !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, s = i.count; o < s; o++) {
          if (e.isMesh === !0) e.getVertexPosition(o, Ql);
          else Ql.fromBufferAttribute(i, o);
          (Ql.applyMatrix4(e.matrixWorld), this.expandByPoint(Ql));
        }
      else {
        if (e.boundingBox !== void 0) {
          if (e.boundingBox === null) e.computeBoundingBox();
          Nb.copy(e.boundingBox);
        } else {
          if (r.boundingBox === null) r.computeBoundingBox();
          Nb.copy(r.boundingBox);
        }
        (Nb.applyMatrix4(e.matrixWorld), this.union(Nb));
      }
    }
    let n = e.children;
    for (let i = 0, o = n.length; i < o; i++) this.expandByObject(n[i], t);
    return this;
  }
  containsPoint(e) {
    return (
      e.x >= this.min.x &&
      e.x <= this.max.x &&
      e.y >= this.min.y &&
      e.y <= this.max.y &&
      e.z >= this.min.z &&
      e.z <= this.max.z
    );
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y &&
      this.min.z <= e.min.z &&
      e.max.z <= this.max.z
    );
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(e) {
    return (
      e.max.x >= this.min.x &&
      e.min.x <= this.max.x &&
      e.max.y >= this.min.y &&
      e.min.y <= this.max.y &&
      e.max.z >= this.min.z &&
      e.min.z <= this.max.z
    );
  }
  intersectsSphere(e) {
    return (this.clampPoint(e.center, Ql), Ql.distanceToSquared(e.center) <= e.radius * e.radius);
  }
  intersectsPlane(e) {
    let t, r;
    if (e.normal.x > 0) ((t = e.normal.x * this.min.x), (r = e.normal.x * this.max.x));
    else ((t = e.normal.x * this.max.x), (r = e.normal.x * this.min.x));
    if (e.normal.y > 0) ((t += e.normal.y * this.min.y), (r += e.normal.y * this.max.y));
    else ((t += e.normal.y * this.max.y), (r += e.normal.y * this.min.y));
    if (e.normal.z > 0) ((t += e.normal.z * this.min.z), (r += e.normal.z * this.max.z));
    else ((t += e.normal.z * this.max.z), (r += e.normal.z * this.min.z));
    return t <= -e.constant && r >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    (this.getCenter(s3),
      Pb.subVectors(this.max, s3),
      p1.subVectors(e.a, s3),
      m1.subVectors(e.b, s3),
      g1.subVectors(e.c, s3),
      Kd.subVectors(m1, p1),
      qd.subVectors(g1, m1),
      qf.subVectors(p1, g1));
    let t = [
      0,
      -Kd.z,
      Kd.y,
      0,
      -qd.z,
      qd.y,
      0,
      -qf.z,
      qf.y,
      Kd.z,
      0,
      -Kd.x,
      qd.z,
      0,
      -qd.x,
      qf.z,
      0,
      -qf.x,
      -Kd.y,
      Kd.x,
      0,
      -qd.y,
      qd.x,
      0,
      -qf.y,
      qf.x,
      0,
    ];
    if (!zE(t, p1, m1, g1, Pb)) return !1;
    if (((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !zE(t, p1, m1, g1, Pb))) return !1;
    return (kb.crossVectors(Kd, qd), (t = [kb.x, kb.y, kb.z]), zE(t, p1, m1, g1, Pb));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Ql).distanceTo(e);
  }
  getBoundingSphere(e) {
    if (this.isEmpty()) e.makeEmpty();
    else (this.getCenter(e.center), (e.radius = this.getSize(Ql).length() * 0.5));
    return e;
  }
  intersect(e) {
    if ((this.min.max(e.min), this.max.min(e.max), this.isEmpty())) this.makeEmpty();
    return this;
  }
  union(e) {
    return (this.min.min(e.min), this.max.max(e.max), this);
  }
  applyMatrix4(e) {
    if (this.isEmpty()) return this;
    return (
      Fu[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
      Fu[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
      Fu[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
      Fu[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
      Fu[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
      Fu[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
      Fu[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
      Fu[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
      this.setFromPoints(Fu),
      this
    );
  }
  translate(e) {
    return (this.min.add(e), this.max.add(e), this);
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
var Fu = [
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
    /*@__PURE__*/ new Vector3_2(),
  ],
  Ql = /*@__PURE__*/ new Vector3_2(),
  Nb = /*@__PURE__*/ new Box3_2(),
  p1 = /*@__PURE__*/ new Vector3_2(),
  m1 = /*@__PURE__*/ new Vector3_2(),
  g1 = /*@__PURE__*/ new Vector3_2(),
  Kd = /*@__PURE__*/ new Vector3_2(),
  qd = /*@__PURE__*/ new Vector3_2(),
  qf = /*@__PURE__*/ new Vector3_2(),
  s3 = /*@__PURE__*/ new Vector3_2(),
  Pb = /*@__PURE__*/ new Vector3_2(),
  kb = /*@__PURE__*/ new Vector3_2(),
  Zf = /*@__PURE__*/ new Vector3_2();
function zE(e, t, r, n, i) {
  for (let o = 0, s = e.length - 3; o <= s; o += 3) {
    Zf.fromArray(e, o);
    let a = i.x * Math.abs(Zf.x) + i.y * Math.abs(Zf.y) + i.z * Math.abs(Zf.z),
      l = t.dot(Zf),
      c = r.dot(Zf),
      u = n.dot(Zf);
    if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > a) return !1;
  }
  return !0;
}
class RenderTarget_2 extends du {
  constructor(e = 1, t = 1, r = {}) {
    super();
    ((this.isRenderTarget = !0),
      (this.width = e),
      (this.height = t),
      (this.depth = 1),
      (this.scissor = new Vector4_2(0, 0, e, t)),
      (this.scissorTest = !1),
      (this.viewport = new Vector4_2(0, 0, e, t)));
    let n = { width: e, height: t, depth: 1 };
    r = Object.assign(
      {
        generateMipmaps: !1,
        internalFormat: null,
        minFilter: nx,
        depthBuffer: !0,
        stencilBuffer: !1,
        resolveDepthBuffer: !0,
        resolveStencilBuffer: !0,
        depthTexture: null,
        samples: 0,
        count: 1,
      },
      r,
    );
    let i = new Texture_2(
      n,
      r.mapping,
      r.wrapS,
      r.wrapT,
      r.magFilter,
      r.minFilter,
      r.format,
      r.type,
      r.anisotropy,
      r.colorSpace,
    );
    ((i.flipY = !1),
      (i.generateMipmaps = r.generateMipmaps),
      (i.internalFormat = r.internalFormat),
      (this.textures = []));
    let o = r.count;
    for (let s = 0; s < o; s++)
      ((this.textures[s] = i.clone()),
        (this.textures[s].isRenderTargetTexture = !0),
        (this.textures[s].renderTarget = this));
    ((this.depthBuffer = r.depthBuffer),
      (this.stencilBuffer = r.stencilBuffer),
      (this.resolveDepthBuffer = r.resolveDepthBuffer),
      (this.resolveStencilBuffer = r.resolveStencilBuffer),
      (this._depthTexture = null),
      (this.depthTexture = r.depthTexture),
      (this.samples = r.samples));
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    if (this._depthTexture !== null) this._depthTexture.renderTarget = null;
    if (e !== null) e.renderTarget = this;
    this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, r = 1) {
    if (this.width !== e || this.height !== t || this.depth !== r) {
      ((this.width = e), (this.height = t), (this.depth = r));
      for (let n = 0, i = this.textures.length; n < i; n++)
        ((this.textures[n].image.width = e),
          (this.textures[n].image.height = t),
          (this.textures[n].image.depth = r));
      this.dispose();
    }
    (this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.width = e.width),
      (this.height = e.height),
      (this.depth = e.depth),
      this.scissor.copy(e.scissor),
      (this.scissorTest = e.scissorTest),
      this.viewport.copy(e.viewport),
      (this.textures.length = 0));
    for (let r = 0, n = e.textures.length; r < n; r++)
      ((this.textures[r] = e.textures[r].clone()),
        (this.textures[r].isRenderTargetTexture = !0),
        (this.textures[r].renderTarget = this));
    let t = Object.assign({}, e.texture.image);
    if (
      ((this.texture.source = new Source_2(t)),
      (this.depthBuffer = e.depthBuffer),
      (this.stencilBuffer = e.stencilBuffer),
      (this.resolveDepthBuffer = e.resolveDepthBuffer),
      (this.resolveStencilBuffer = e.resolveStencilBuffer),
      e.depthTexture !== null)
    )
      this.depthTexture = e.depthTexture.clone();
    return ((this.samples = e.samples), this);
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class WebGLRenderTarget_2 extends RenderTarget_2 {
  constructor(e = 1, t = 1, r = {}) {
    super(e, t, r);
    this.isWebGLRenderTarget = !0;
  }
}
