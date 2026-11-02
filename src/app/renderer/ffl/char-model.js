// src/app/renderer/ffl/char-model.js
// CharModel: builds a Mii head (meshes + mask/faceline textures) from CharInfo.
//
// Defines: ResourceTrackerFFL, CharModel
// Uses from other files:
//   app/assets/models.js: eL, tL, rL, nL, iL, oL, sL, aL, lL, cL, uL, lx, … (+2 more)
//   app/renderer/ffl/face-builder.js: COMMON_COLOR_TABLE, jO, KO, qO, ZO, sg, $O, Bp, JO,
//                                     toFFLCharInfo
//   app/renderer/ffl/part-colors.js: Oo, ColorRGBAExport
//   app/settings/palette-flags.js: isAlternatePaletteEnabled
//   app/mii/mii.js: Mii
//   app/renderer/three-module.js: getTHREE
//   app/renderer/ffl/expression-table.js: FFL_EXPRESSION_TABLE
//   app/shaders/wiiu-shader.js: WiiUShader
//   app/renderer/dispose.js: disposeObject

var THREE = getTHREE();
class ResourceTrackerFFL {
  resources;
  constructor() {
    this.resources = /*@__PURE__*/ new Set();
  }
  track(e) {
    if (!e) return e;
    if (Array.isArray(e)) return (e.forEach((t) => this.track(t)), e);
    if (e.dispose || e instanceof THREE.Object3D) this.resources.add(e);
    if (e instanceof THREE.Object3D)
      (this.track(e.geometry), this.track(e.material), this.track(e.children));
    else if (e instanceof THREE.Material) {
      for (let t of Object.values(e)) if (t instanceof THREE.Texture) this.track(t);
      if (e.uniforms) {
        for (let t of Object.values(e.uniforms))
          if (t) {
            let r = t.value;
            if (r instanceof THREE.Texture || Array.isArray(r)) this.track(r);
          }
      }
    }
    return e;
  }
  untrack(e) {
    this.resources.delete(e);
  }
  dispose() {
    for (let e of this.resources) {
      if (e.dispose) e.dispose();
      if (e instanceof THREE.Material || e instanceof Bp) {
        if (e.map) (e.map.dispose(), (e.map = null));
        e.dispose();
      }
      if (e instanceof THREE.Texture) e.dispose();
      if (e instanceof THREE.Object3D) {
        if (e.parent) e.parent.remove(e);
      }
    }
    this.resources.clear();
  }
}
var THREE = getTHREE();
var tK = () => isAlternatePaletteEnabled();
class CharModel {
  #t;
  #e;
  #n;
  #i;
  #r;
  #o;
  #c;
  #A() {
    return "isWiiShader" in this.#n.prototype;
  }
  #m() {
    let e = this.#A();
    if (tK() && e) return !0;
    return !1;
  }
  #f;
  #s;
  #g;
  get expressions() {
    return this.#g;
  }
  #u;
  #p;
  #a;
  #h;
  charInfo;
  maskTextures;
  meshes;
  faceColor = null;
  facelineColor;
  constructor(e, t, r, n) {
    ((this.#t = e),
      (this.#e = t),
      (this.#i = n.renderer),
      (this.#r = n.camera),
      (this.#o = n.useRenderTargets || !1),
      (this.#c = n.extraMaterialParams),
      (this.#f = n.modelType || 0),
      (this.#g = n.expression || 0),
      (this.#s = n.textureSize),
      (this.#n = r),
      (this.maskTextures = []),
      (this.#u = new THREE.WebGLRenderTarget(this.#s, this.#s, {
        depthBuffer: !1,
        stencilBuffer: !1,
        wrapS: THREE.MirroredRepeatWrapping,
        wrapT: THREE.MirroredRepeatWrapping,
      })),
      (this.#p = []),
      (this.meshes = new THREE.Group()),
      this.generateCharInfo());
  }
  generateCharInfo() {
    this.charInfo = toFFLCharInfo(this.#e);
  }
  #l() {
    return "modulateMode" in this.#n.prototype;
  }
  #y(e, t) {
    if (!e.map) throw Error("convertTexture: map is missing");
    let r = new THREE.Scene(),
      n = new THREE.PlaneGeometry(2, 2);
    r.add(
      new THREE.Mesh(
        n,
        new THREE.MeshBasicMaterial({
          color: e.color.clone(),
          transparent: !0,
          opacity: 0,
          blending: THREE.NoBlending,
        }),
      ),
    );
    let i = e.map,
      o = new Bp({ map: i, modulateMode: t.modulateMode, color: e.color.clone() });
    (Object.assign(o, { transparent: !0, blending: THREE.NoBlending }), r.add(new THREE.Mesh(n, o)));
    let { width: s, height: a } = i.image,
      l = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        wrapS: i.wrapS,
        wrapT: i.wrapT,
        depthBuffer: !1,
        stencilBuffer: !1,
        generateMipmaps: !1,
      },
      u = new (this.#i.isWebGPURenderer === void 0 ? THREE.WebGLRenderTarget : THREE.RenderTarget)(
        s,
        a,
        l,
      ),
      d = this.#i.getRenderTarget();
    return (
      this.#i.setRenderTarget(u),
      this.#i.render(r, this.#t.camera(!1)),
      this.#i.setRenderTarget(d),
      (u.texture._target = u),
      i.dispose(),
      (e.map = u.texture),
      (e.color = new THREE.Color(1, 1, 1)),
      (t.modulateMode = 1),
      u
    );
  }
  async initialize() {
    ((this.#a = new ResourceTrackerFFL()), (this.#h = new ResourceTrackerFFL()));
    let e = this.#b(this.#i, this.#s, this.#e, this.#g, this.#u);
    if (this.#f === 1) return (await e, this.#u.dispose(), this.#h.dispose(), e);
    let t = performance.now(),
      r = await this.#_(this.#e),
      n = performance.now() - t,
      i = performance.now();
    this.#x(r);
    let o = performance.now() - i,
      s = performance.now(),
      a = await this.#v(this.#i, this.#s, r, this.#u),
      l = performance.now() - s,
      c = performance.now();
    await this.#C(
      a.facelineTexture,
      a.glassTexture,
      a.noselineTexture,
      a.capTexture,
      r,
      e,
      this.#n,
    );
    let u = performance.now() - c;
    this.#u.dispose();
    for (let [d, h] of r.meshes) (this.#a.track(h), this.meshes.add(h));
    if (this.#r !== null && this.#r !== void 0) {
      if (this.#r.isCamera) this.#i.compileAsync(this.meshes, this.#r);
    }
  }
  getBodyScale() {
    let e = this.#e.build,
      t = this.#e.height,
      r = { x: 0, y: 0, z: 0 };
    return (
      (r.x = (e * (t * 0.003671875 + 0.4)) / 128 + t * 0.001796875 + 0.4),
      (r.y = t * 0.006015625 + 0.5),
      (r.z = r.x),
      r
    );
  }
  setExpression(e) {
    this.meshes.traverse((t) => {
      let r = t;
      if (!r.isMesh) return;
      if (r.geometry.userData.modulateType !== 6) return;
      r.material.map = this.maskTextures[e];
    });
  }
  async #b(e, t, r, n, i) {
    let o = r.export(),
      s = async (a) => {
        let l = FFL_EXPRESSION_TABLE[a];
        if (!l) l = FFL_EXPRESSION_TABLE[0];
        let c = new Mii(o);
        if (l === void 0) l = FFL_EXPRESSION_TABLE[0];
        c = $O(a, c);
        let u =
            l.eyebrowIndex !== void 0
              ? l.eyebrowIndex !== -1
                ? l.eyebrowIndex
                : c.eyebrowType
              : c.eyebrowType,
          d = l.eyeLIndex === -1 ? c.eyeType : l.eyeLIndex,
          h = l.eyeRIndex === -1 ? c.eyeType : l.eyeRIndex,
          f = l.mouthIndex === -1 ? c.mouthType : l.mouthIndex,
          p = b(!0),
          g = l.eyebrowRotate + (l.eyebrowLeftRotate || 0),
          m = l.eyebrowRotate + (l.eyebrowRightRotate || 0),
          A = l.eyebrowLeftY || 0,
          y = l.eyebrowRightY || 0,
          x = l.mouthRotate || 0;
        function b(T = !0) {
          let M = l.eyeLIndex !== c.eyeType || l.eyeRIndex !== c.eyeType,
            C = c.eyeType,
            R = !1;
          if (l.eyeLIndex >= 0) ((C = l.eyeLIndex), (R = !0));
          if (l.eyeRIndex >= 0) ((C = l.eyeRIndex), (R = !0));
          if (l.eyeRotIndex !== void 0) {
            if (l.eyeRotIndex >= 0) ((C = l.eyeRotIndex), (R = !0));
          }
          let B = T ? l.eyeRotate : l.eyeRotateR;
          if (R && M) {
            let L = sg(c.eyeType),
              k = sg(C);
            if (C < 62) B = B + L - k;
            else B = B - L + k;
          }
          return B;
        }
        let v = this.#t.calcRawMask(c, 512, {
            eyebrowPosAddL: A,
            eyebrowPosAddR: y,
            eyeRotateAddL: p,
            eyeRotateAddR: p,
            eyebrowRotateAddL: g,
            eyebrowRotateAddR: m,
            mouthRotate: x,
          }),
          _ = new THREE.Scene(),
          w = this.#t.camera();
        _.position.set(-1, -1, 0);
        let S = 0.0039065;
        _.scale.set(1 * S, 1 * S, 1 * S);
        for (let T = 0; T < v.length; T++) {
          let X = function (de, oe) {
              switch (de) {
                case 0:
                  return oe.eyeLType === 1;
                case 1:
                  return oe.eyeRType === 1;
                case 4:
                  return oe.mouthType === 1;
                default:
                  return !1;
              }
            },
            M = v[T];
          if (M === void 0) continue;
          let C = "eye",
            R = 0,
            B = new THREE.Color(16711680),
            L = new THREE.Color(65280),
            k = new THREE.Color(255);
          switch (T) {
            case 0:
              if (
                ((C = "eye"),
                (R = d),
                B.set(65535),
                (c.eyeSclera===1||c.eyeSclera===2) && (c.personality === 24 ? !0 : c.eyeColor !== 8))
              )
                L.set(...COMMON_COLOR_TABLE[c.eyeColor]);
              else L.set(16777215);
              k.set(...COMMON_COLOR_TABLE[c.eyeColor]);
              break;
            case 1:
              if (
                ((C = "eye"),
                (R = h),
                B.set(65535),
                (c.eyeSclera===1||c.eyeSclera===3) && (c.personality === 24 ? !0 : c.eyeColor !== 8))
              )
                L.set(...COMMON_COLOR_TABLE[c.eyeRColor === -1 ? c.eyeColor : c.eyeRColor]);
              else L.set(16777215);
              k.set(...COMMON_COLOR_TABLE[c.eyeRColor === -1 ? c.eyeColor : c.eyeRColor]);
              break;
            case 2:
            case 3:
              ((C = "eyebrow"), (R = u), B.set(...COMMON_COLOR_TABLE[c.eyebrowColor]));
              break;
            case 4:
              ((C = "mouth"),
                (R = f),
                B.set(...COMMON_COLOR_TABLE[c.mouthColor]),
                L.set(...jO[c.mouthColor]),
                k.set(16777215));
              break;
            case 5:
            case 6:
              ((C = "mustache"), (R = c.mustacheType), B.set(...COMMON_COLOR_TABLE[c.beardColor]));
              break;
            case 7:
              ((C = "mole"), (R = c.moleType), B.set(...ZO));
              break;
            default:
              break;
          }
          let z = { 8: 9, 5: 9, 6: 9, 4: 10, 2: 11, 3: 11, 0: 12, 1: 12, 7: 13 };
          if (this.#m()) ((B = Oo(B, z[T])), (L = Oo(L, z[T])), (k = Oo(k, z[T])));
          let G = X(T, l) ? 1 : 0,
            Q = await this.#t.drawMaskParam(
              C,
              R,
              G,
              M,
              B,
              L,
              k,
              e,
              this.#l() ? this.#n : void 0,
              this.#e,
            );
          (this.#h.track(Q), _.add(Q));
        }
        return (i.setSize(t, t), { texture: await this.#d(_, w, i, e), expression: a });
      };
    if (Array.isArray(n)) return Promise.all(n.map((a) => s(a)));
    else return s(n);
  }
  async #d(e, t, r, n, i) {
    let { width: o, height: s } = r,
      a = new THREE.Vector2();
    n.getSize(a);
    let l = n.getRenderTarget();
    if ((n.setRenderTarget(r), n.setSize(o, s, !1), i))
      (n.setClearAlpha(i.a), n.setClearColor(i, i.a), n.clear(!0, !0, !0));
    let c = n.getPixelRatio();
    (n.setPixelRatio(1),
      n.render(e, t),
      n.setClearAlpha(0),
      n.setClearColor(0, 0),
      l && l.dispose(),
      n.setPixelRatio(c),
      n.setRenderTarget(l),
      n.setSize(a.x, a.y, !1));
    let u = new Uint8Array(4 * o * s);
    ((u = await n.readRenderTargetPixelsAsync(r, 0, 0, o, s, u)),
      e.traverse((h) => {
        if (h.isMesh) {
          let f = h;
          if ((f.geometry.dispose(), f.material)) {
            if (f.material.map) (f.material.map.dispose(), (f.material.map = null));
            (f.material.dispose(), (f.material = null));
          }
        }
      }));
    let d = new THREE.DataTexture(u, o, s, THREE.RGBAFormat, THREE.UnsignedByteType);
    return (
      n.initTexture(d),
      (u = null),
      (d.wrapS = THREE.MirroredRepeatWrapping),
      (d.wrapT = THREE.MirroredRepeatWrapping),
      (d.minFilter = THREE.LinearFilter),
      (d.magFilter = THREE.LinearFilter),
      (d.generateMipmaps = !1),
      (d.needsUpdate = !0),
      d
    );
  }
  usesCustomGlasses;
  async #_(e) {
    let t = { facelineHeader: {}, hairHeader: {}, meshes: /*@__PURE__*/ new Map(), mii: e },
      r = t.meshes,
      n;
    if (window.useCustomFaceline)
      (await eL(),
        await this.#t.createMesh("faceline", e.facelineType, t.facelineHeader),
        (n = rL()));
    else n = await this.#t.createMesh("faceline", e.facelineType, t.facelineHeader);
    if (e.beardType <= 3 && e.beardType > 0) {
      let _ = await this.#t.createMesh("beard", e.beardType);
      _ && r.set(1, _);
    }
    let i, o;
    if (window.useCustomNose) (await nL(), (i = iL()), (o = oL()));
    else
      ((i = this.#t.createMesh("nose", e.noseType)),
        (o = this.#t.createMesh("noseline", e.noseType)));
    if (!i) throw alert("No Nose found");
    if (!o) throw alert("No Noseline found");
    let s, a, l;
    if (this.#f !== 3) {
      if (window.useCustomHair) (await sL(), (s = lL()), (a = aL()));
      else
        ((s = this.#t.createMesh(this.#f === 2 ? "foreheadCap" : "foreheadNormal", e.hairType)),
          (a = this.#t.createMesh(
            this.#f === 2 ? "hairCap" : "hairNormal",
            e.hairType,
            t.hairHeader,
          )));
      l = this.#t.createMesh(this.#f === 2 ? "hatCap" : "hatNormal", e.hairType);
    } else
      ((s = new Promise((_) => _())), (a = new Promise((_) => _())), (l = new Promise((_) => _())));
    let c;
    if (window.useCustomFaceline) c = tL();
    else c = this.#t.createMesh("mask", e.facelineType);
    let u;
    if (this.#e.glassType > 0)
      if (((this.usesCustomGlasses = !1), window.useCustom3DGlasses))
        try {
          ((u = await dL(this.#e.glassType)), (this.usesCustomGlasses = !0));
        } catch (_) {
          u = this.#t.createMesh("glass", 0);
        }
      else u = this.#t.createMesh("glass", 0);
    else u = void 0;
    let [d, h, f, p, g, m, A, y] = await Promise.all([n, i, s, a, l, c, o, u]);
    function x(_, w) {
      ((_.name = w), (_.geometry.name = w));
    }
    if (d) (r.set(0, d), x(d, "Faceline"));
    if (h) (r.set(2, h), x(h, "Nose"));
    if (this.#f !== 3) {
      if (f) (r.set(3, f), x(f, "Forehead"));
      if (p) (r.set(4, p), x(p, "Hair"));
      if (g) (r.set(5, g), x(g, "Cap"));
    }
    if (m) (r.set(6, m), x(m, "Mask"));
    if (A) (r.set(7, A), x(A, "Noseline"));
    if (e.glassType !== 0) {
      if (y) {
        if ("isSwitchShader" in this.#n.prototype || "isMiitomoShader" in this.#n.prototype) {
          let _ = [1450862538, 1450861622, 1450549194, 1450548278],
            w = [];
          for (let E = 0; E < _.length; E++) {
            let T = JO(_[E]);
            w.push(...T);
          }
          let S = new THREE.BufferAttribute(new Float32Array(w), 3);
          y.geometry.setAttribute("normal", S);
        }
        (r.set(8, y), (y.name = "Glass"));
      }
    }
    let b = !1,
      v = -1;
    if (e.facelineColor > 9) ((b = !0), (v = e.facelineColor - 10));
    if (e.facePaintColor !== -1) ((b = !0), (v = e.facePaintColor));
    if (
      ((this.faceColor = new THREE.Color(...(b ? COMMON_COLOR_TABLE[v % 100] : KO[e.facelineColor % 10]))), this.#m())
    )
      this.faceColor = Oo(this.faceColor, 0);
    return ((this.facelineColor = this.faceColor), t);
  }
  transform;
  partsTransform;
  #x(e) {
    let t = e.facelineHeader.transform,
      r = [],
      n = new THREE.Vector3(t[0], t[1], t[2]);
    if (e.hairHeader) {
      let s;
      if (((s = e.hairHeader.transform), s === void 0))
        s = [
          0, 62.29999923706055, 13.489999771118164, 0.5235987901687622, 0, 0, -20.059999465942383,
          58.08000183105469, 0.1899999976158142, 0, 0, 0.7853981852531433, 0, 64.93000030517578,
          -15.010000228881836, -0.4363323152065277, 0, 0,
        ];
      r = {
        headFrontTranslate: new THREE.Vector3(s[0], s[1], s[2]),
        headFrontRotate: new THREE.Vector3(s[3], s[4], s[5]),
        headSideTranslate: new THREE.Vector3(s[6], s[7], s[8]),
        headSideRotate: new THREE.Vector3(s[9], s[10], s[11]),
        headTopTranslate: new THREE.Vector3(s[12], s[13], s[14]),
        headTopRotate: new THREE.Vector3(s[15], s[16], s[17]),
        hatTranslate: n,
      };
    }
    let i = new THREE.Vector3(t[3], t[4], t[5]),
      o = new THREE.Vector3(t[6], t[7], t[8]);
    ((this.transform = { hairPos: n, faceCenterPos: i, beardPos: o, partsTransform: r }),
      (this.partsTransform = r));
    for (let [s, a] of e.meshes)
      switch (((a.renderOrder = s), s)) {
        case 2:
        case 7:
          (a.scale.setScalar(e.mii.noseScale * 0.175 + 0.4),
            a.position.add(i),
            (a.position.y += (e.mii.noseY - 8) * -1.5));
          break;
        case 1:
          a.position.add(o);
          break;
        case 3:
        case 4:
        case 5:
          if ((a.position.add(n), this.#e.hairFlip === 1)) {
            if (s === 3 || s === 4 || s === 5) a.scale.x = -1;
          }
          break;
        case 8:
          if (this.usesCustomGlasses) a.scale.setScalar((e.mii.glassScale * 0.15 + 0.4) * 24);
          else a.scale.setScalar(e.mii.glassScale * 0.15 + 0.4);
          (a.position.add(i),
            (a.position.y += (e.mii.glassY - 11) * -1.5 + 5),
            (a.position.z += 2));
          break;
      }
  }
  get mii() {
    return this.#e;
  }
  async #v(e, t, r, n) {
    function i(p) {
      let g = new Float32Array([-1, -1, 0, 0, 1, -1, 0, 0, -1, 1, 0, 0, 1, 1, 0, 0]),
        m = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
        A = new THREE.BufferGeometry();
      if (
        (A.setAttribute("position", new THREE.BufferAttribute(g, 4)),
        A.setAttribute("uv", new THREE.BufferAttribute(m, 2)),
        A.setIndex([0, 1, 2, 2, 1, 3]),
        p.texture)
      )
        ((p.texture.minFilter = 1006), (p.texture.magFilter = 1006));
      return new THREE.Mesh(
        A,
        new Bp({
          color: p.color || new THREE.Color(16777215),
          ...(p.color && { opacity: p.color.a }),
          modulateMode: p.modulateMode || 3,
          map: p.texture,
          blending: THREE.CustomBlending,
          blendSrc: THREE.SrcAlphaFactor,
          blendDst: THREE.OneMinusSrcAlphaFactor,
          blendSrcAlpha: THREE.OneFactor,
          blendDstAlpha: THREE.OneFactor,
        }),
      );
    }
    let s = (async () => {
        if (r.mii.facelineMake !== 0 || r.mii.facelineWrinkle !== 0 || r.mii.beardType >= 4) {
          n.setSize(Math.round(t / 2), t);
          let p = new THREE.Scene(),
            g = new THREE.Color(...this.faceColor);
          if (this.#m()) g = Oo(g, 0);
          let m = 1;
          if ("isSwitchShader" in this.#n.prototype) {
            if (r.mii.beardType > 3 || r.mii.facelineMake > 0 || r.mii.facelineWrinkle > 0) m = 0;
          } else if ("isMiitomoShader" in this.#n.prototype && r.mii.personality === 24)
            (g.set(1, 1, 1), (m = 0));
          g = new ColorRGBAExport(g.r, g.g, g.b, m);
          let A = this.#t.camera(),
            y = [];
          if (r.mii.facelineMake > 0)
            y.push({
              texture:
                window.useCustomFaceMake === !0
                  ? await cL()
                  : await this.#t.readTexture("faceMakeup", r.mii.facelineMake, !1, e),
              modulateMode: 1,
            });
          if (r.mii.facelineWrinkle > 0)
            y.push({
              texture:
                window.useCustomFaceWrinkle === !0
                  ? await uL()
                  : await this.#t.readTexture("faceline", r.mii.facelineWrinkle, !1, e),
              modulateMode: 4,
            });
          if (r.mii.beardType > 3) {
            let x = new THREE.Color(...COMMON_COLOR_TABLE[r.mii.beardColor]);
            if (this.#m()) x = Oo(x, 16);
            y.push({
              texture: await this.#t.readTexture("beard", r.mii.beardType - 3, !1, e),
              color: new ColorRGBAExport(x.r, x.g, x.b, 1),
              modulateMode: 3,
            });
          }
          return (
            p.add(...y.filter((x) => x !== null).map((x) => i(x))),
            n.setSize(Math.round(t / 2), t),
            this.#d(p, A, n, e, g)
          );
        }
      })(),
      a = this.#t.readTexture("cap", r.mii.hairType, !1, e),
      l =
        this.usesCustomGlasses === !0
          ? hL()
          : window.useCustomGlasses === !0
            ? await lx()
            : this.#t.readTexture("glass", r.mii.glassType, !1, e),
      c = this.#t.readTexture("noseline", r.mii.noseType, !1, e),
      [u, d, h, f] = await Promise.all([a, l, c, s]);
    if (u) ((u.wrapS = THREE.MirroredRepeatWrapping), (u.wrapT = THREE.MirroredRepeatWrapping));
    if (d) ((d.wrapS = THREE.MirroredRepeatWrapping), (d.wrapT = THREE.MirroredRepeatWrapping));
    return { facelineTexture: f, noselineTexture: h, glassTexture: d, capTexture: u };
  }
  async #C(e, t, r, n, i, o, s = WiiUShader) {
    let a = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 5, 6: 1, 7: 4, 8: 4, 9: 0, 10: 0 };
    for (let [l, c] of i.meshes) {
      let u = new THREE.Color(16777215),
        d = {};
      switch (l) {
        case 0:
        case 3:
        case 2:
          u.set(...this.faceColor);
          break;
        case 1:
          u.set(...COMMON_COLOR_TABLE[i.mii.beardColor]);
          break;
        case 4:
          u.set(...COMMON_COLOR_TABLE[i.mii.hairColor]);
          break;
        case 5:
          u.set(...qO[i.mii.favoriteColor]);
          break;
        case 7:
          u.set(0, 0, 0);
          break;
        case 8:
          u.set(...COMMON_COLOR_TABLE[i.mii.glassColor]);
          break;
      }
      if (this.#m()) u = Oo(u, l);
      let h = a[l];
      if (this.usesCustomGlasses && l === 8) h = 4;
      if (this.#l()) d = { modulateType: l, modulateMode: h };
      if (
        c.geometry.attributes.tangent === void 0 ||
        this.mii.hairType === 34 ||
        this.mii.hairType === 57
      ) {
        if ("useSpecularModeBlinn" in s.prototype) d.useSpecularModeBlinn = !0;
        if ("needsLowResourceFix" in s.prototype) d.lowResourceFix = !0;
      }
      if (
        "isToonShader" in s.prototype ||
        "isSwitchShader" in s.prototype ||
        "isMiitomoShader" in s.prototype ||
        "useHairTip" in s.prototype
      ) {
        if (((d.charInfo = this.charInfo), this.#c.additionalInfo))
          d.additionalInfo = this.#c.additionalInfo;
        else d.additionalInfo = this.#c;
        if (l === 4) c.layers.enable(1);
      }
      if (l === 0) {
        if (i.mii.beardType > 3 || i.mii.facelineMake > 0 || i.mii.facelineWrinkle > 0) h = 1;
      }
      if ("isSwitchShader" in s.prototype || "isMiitomoShader" in this.#n.prototype) {
        if (l === 0) {
          if (
            ((d.modulateType = 0),
            i.mii.beardType > 3 || i.mii.facelineMake > 0 || i.mii.facelineWrinkle > 0)
          )
            d.drawType = 1;
        }
      }
      ((c.material = new s({
        ...d,
        color: u,
        blendAlpha: 0,
        blendColor: new THREE.Color(0),
        blendDst: 205,
        blendEquation: 100,
        blendSrc: 201,
        blending: 1,
      })),
        (c.geometry.userData = { modulateType: l, modulateMode: h, modulateColor: u.toArray() }));
      let f = c.material;
      if (l === 0 && e !== null) {
        if (i.mii.facelineMake > 0 || i.mii.facelineWrinkle > 0 || i.mii.beardType > 3)
          ((f.map = e),
            (f.color =
              "isSwitchShader" in this.#n.prototype
                ? (this.faceColor ?? new THREE.Color(16777215))
                : new THREE.Color(16777215)),
            (c.geometry.userData.modulateColor = f.color.toArray()),
            e.dispose(),
            (f.modulateMode = 1));
      }
      if (l === 5 && n !== null) {
        if (((f.map = n), !this.#l())) (this.#y(f, { modulateMode: a[l] }), n.dispose());
      }
      if (l === 8 && t !== null) {
        if (((f.map = t), !this.#l())) (this.#y(f, { modulateMode: a[l] }), t.dispose());
        f.side = THREE.DoubleSide;
      }
      if (l === 6) {
        let p = await o;
        if (Array.isArray(p))
          (p.forEach((g) => {
            this.maskTextures[g.expression] = g.texture;
          }),
            (f.map = p[0].texture));
        else {
          let g = p.texture;
          (this.maskTextures.push(g), (f.map = g));
        }
        this.#h.dispose();
      }
      if (l === 7 && r !== null) {
        if (((f.map = r), !this.#l())) (this.#y(f, { modulateMode: a[l] }), r.dispose());
        r.dispose();
      }
      if (f.map !== void 0 && f.map !== null) {
        if (l == 7 || l == 6 || l == 8)
          ((f.transparent = !0),
            (f.alphaTest = 0.01),
            (f.map.minFilter = THREE.LinearFilter),
            (f.map.magFilter = THREE.LinearFilter));
      }
    }
    [n, t, r, e].forEach((l) => {
      if (l && l.dispose) l.dispose();
    });
  }
  update(e) {
    let n = ((i) => i.findIndex((o) => this.#e[o] !== e[o]) !== -1)([
      "eyeAspect",
      "eyeColor",
      "eyeRotate",
      "eyeScale",
      "eyeSclera",
      "eyeType",
      "eyeX",
      "eyeY",
      "eyebrowAspect",
      "eyebrowColor",
      "eyebrowRotate",
      "eyebrowScale",
      "eyebrowType",
      "eyebrowX",
      "eyebrowY",
      "mouthAspect",
      "mouthColor",
      "mouthScale",
      "mouthType",
      "mouthY",
      "beardColor",
      "mustacheScale",
      "mustacheType",
      "mustacheY",
      "moleScale",
      "moleType",
      "moleX",
      "moleY",
    ]);
    this.#e = e;
  }
  reusableTextures;
  dispose(e) {
    if (this.meshes)
      this.meshes.traverse((t) => {
        if (t.isMesh) {
          if (t.geometry) t.geometry.dispose();
          if (Array.isArray(t.material))
            t.material.forEach((r) => {
              if (r.map) r.map.dispose();
              r.dispose();
            });
          else if (t.material) {
            if (t.material.map) (t.material.map.dispose(), (t.material.map = null));
            t.material.dispose();
          }
        }
      });
    if (this.maskTextures)
      (this.maskTextures.forEach((t) => t && t.dispose()), (this.maskTextures.length = 0));
    if (this.reusableTextures)
      (this.reusableTextures.forEach((t) => {
        if (!t) return;
        var r = t,
          n = t;
        if (n.baseTex) n.baseTex.dispose();
        if (n.coloredTex) n.coloredTex.dispose();
        if (r.isTexture) r.dispose();
      }),
        this.reusableTextures.clear());
    if (this.#u) this.#u.dispose();
    if (this.#a) this.#a.dispose();
    if (this.#h) this.#h.dispose();
    if (e) {
      if (this.meshes) {
        if (this.meshes.parent) (this.meshes.removeFromParent(), disposeObject(this.meshes));
      }
    }
    for (let t in this) this[t] = null;
  }
}
