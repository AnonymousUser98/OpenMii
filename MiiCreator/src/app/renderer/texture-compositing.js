// src/app/renderer/texture-compositing.js
// Texture compositing (hat/accessory/outfit textures) and accessory attachment.
//
// Defines: createTintMaterial, createRgbLayeredMaterial, createBackgroundFillMaterial,
//          createRgbLayeredOverlayMaterial, applyHatTextureFilter, applyAccessoryTextureFilter, TL,
//          EL, SL, ML, IL, RL, OL
// Uses from other files:
//   app/items/item-lists.js: TA, HAT_MODEL_INFO
//   app/items/accessory-model-info.js: ACCESSORY_MODEL_INFO
//   app/renderer/three-module.js: getTHREE
//   app/renderer/cameras.js: ux

var THREE = getTHREE();
function createTintMaterial(e, t) {
  return new THREE.ShaderMaterial({
    uniforms: { u_texture: { value: e }, u_const1: { value: t } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
uniform sampler2D u_texture;
uniform vec4 u_const1;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(u_texture, vUv);
  gl_FragColor = vec4(texColor.rgb*u_const1.rgb, 1.0);
}
`,
  });
}
function createRgbLayeredMaterial(e, t, r, n, i) {
  return new THREE.ShaderMaterial({
    uniforms: {
      u_texture: { value: e },
      u_const1: { value: t },
      u_const2: { value: r },
      u_const3: { value: n },
      u_const4: { value: i },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: includeGLSL("textures/rgb-layered.frag.glsl"),
  });
}
function createBackgroundFillMaterial(e, t) {
  return new THREE.ShaderMaterial({
    uniforms: { u_texture: { value: e }, u_const4: { value: t } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: includeGLSL("textures/background-fill.frag.glsl"),
  });
}
function createRgbLayeredOverlayMaterial(e, t, r, n, i, o) {
  return new THREE.ShaderMaterial({
    uniforms: {
      u_texture: { value: e },
      u_overlay: { value: t },
      u_const1: { value: r },
      u_const2: { value: n },
      u_const3: { value: i },
      u_const4: { value: o },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: includeGLSL("textures/rgb-layered-overlay.frag.glsl"),
  });
}
function applyHatTextureFilter(e, t) {
  ((t.anisotropy = 0), (t.generateMipmaps = !1));
  let { NearestFilter: r, MirroredRepeatWrapping: n } = THREE;
  if (HAT_MODEL_INFO[e.additionalInfo.hatType].texFiltering) r = HAT_MODEL_INFO[e.additionalInfo.hatType].texFiltering;
  else if (HAT_MODEL_INFO[e.additionalInfo.hatType].texType === 1) r = THREE.LinearFilter;
  if (HAT_MODEL_INFO[e.additionalInfo.hatType].texWrap) n = HAT_MODEL_INFO[e.additionalInfo.hatType].texWrap;
  ((t.minFilter = r), (t.magFilter = r), (t.wrapS = n), (t.wrapT = n));
}
function applyAccessoryTextureFilter(e, t) {
  ((t.anisotropy = 0), (t.generateMipmaps = !1));
  let { LinearFilter: r, MirroredRepeatWrapping: n } = THREE;
  if (ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texFiltering) r = ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texFiltering;
  else if (ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texType === 1) r = THREE.LinearFilter;
  if (ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texWrap) n = ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texWrap;
  ((t.minFilter = r), (t.magFilter = r), (t.wrapS = n), (t.wrapT = n));
}
function TL(e, t = new THREE.Vector4(0, 1, 1, 1), r, n, i) {
  let o = new THREE.Scene(),
    s,
    a;
  if (e instanceof ImageBitmap) ((s = e.width), (a = e.height));
  else ((s = e.image.width), (a = e.image.height));
  if (((e.minFilter = THREE.LinearFilter), (e.magFilter = THREE.LinearFilter), n))
    if (!i) {
      let m = s / a;
      ((s = n), (a = n / m));
    } else ((s = n), (a = i));
  let l = new THREE.WebGLRenderTarget(s, a, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }),
    c = new THREE.OrthographicCamera(s / -2, s / 2, a / 2, a / -2, 0.1, 10);
  c.position.z = 1;
  let u = r;
  if (typeof window < "u") window.camera = c;
  let d = new THREE.PlaneGeometry(s, a),
    h = createTintMaterial(e, t),
    f = new THREE.Mesh(d, h);
  o.add(f);
  let p = new THREE.Color();
  (u.getClearColor(p),
    u.clear(),
    u.setRenderTarget(l),
    u.render(o, c),
    u.setRenderTarget(null),
    u.setClearColor(p, 0));
  let g = ux(l, u, !1, !0);
  if (l.texture === null) throw Error("something broke");
  return (d.dispose(), f.material.dispose(), l.dispose(), g);
}
function cg(
  e,
  t = new THREE.Vector4(0, 1, 1, 1),
  r = new THREE.Vector4(1, 1, 0, 1),
  n = new THREE.Vector4(1, 1, 0, 1),
  i = new THREE.Vector4(1, 1, 0, 1),
  o,
  s,
  a,
  l,
) {
  let c = new THREE.Scene(),
    u,
    d;
  if (e instanceof ImageBitmap) ((u = e.width), (d = e.height));
  else ((u = e.image.width), (d = e.image.height));
  if (((e.minFilter = THREE.LinearFilter), (e.magFilter = THREE.LinearFilter), s))
    if (!a) {
      let b = u / d;
      ((u = s), (d = s / b));
    } else ((u = s), (d = a));
  if (l) {
    if (l.isCanvasTexture) {
      let b = l.source.data.width,
        v = l.source.data.height;
      if (u < b) u = b;
      if (d < v) d = v;
    }
  }
  let h = new THREE.WebGLRenderTarget(u, d, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }),
    f = new THREE.OrthographicCamera(u / -2, u / 2, d / 2, d / -2, 0.1, 10);
  f.position.z = 1;
  let p = o;
  if (typeof window < "u") window.camera = f;
  let g = new THREE.PlaneGeometry(u, d),
    m;
  if (l)
    ((l.minFilter = THREE.LinearFilter), (l.magFilter = THREE.LinearFilter), (m = createRgbLayeredOverlayMaterial(e, l, t, r, n, i)));
  else m = createRgbLayeredMaterial(e, t, r, n, i);
  let A = new THREE.Mesh(g, m);
  c.add(A);
  let y = new THREE.Color();
  (p.getClearColor(y),
    p.clear(),
    p.setRenderTarget(h),
    p.render(c, f),
    p.setRenderTarget(null),
    p.setClearColor(y, 0));
  let x = ux(h, p, !1, !0);
  if (
    ((x.minFilter = THREE.LinearFilter),
    (x.magFilter = THREE.LinearFilter),
    (x.needsUpdate = !0),
    h.texture === null)
  )
    throw Error("something broke");
  return (g.dispose(), A.material.dispose(), h.dispose(), x);
}
function EL(e, t = new THREE.Vector4(1, 1, 0, 1), r, n, i) {
  let o = new THREE.Scene(),
    s,
    a;
  if (e instanceof ImageBitmap) ((s = e.width), (a = e.height));
  else ((s = e.image.width), (a = e.image.height));
  if (((e.minFilter = THREE.LinearFilter), (e.magFilter = THREE.LinearFilter), n))
    if (!i) {
      let m = s / a;
      ((s = n), (a = n / m));
    } else ((s = n), (a = i));
  let l = new THREE.WebGLRenderTarget(s, a, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }),
    c = new THREE.OrthographicCamera(s / -2, s / 2, a / 2, a / -2, 0.1, 10);
  c.position.z = 1;
  let u = r;
  if (typeof window < "u") window.camera = c;
  let d = new THREE.PlaneGeometry(s, a),
    h;
  h = createBackgroundFillMaterial(e, t);
  let f = new THREE.Mesh(d, h);
  o.add(f);
  let p = new THREE.Color();
  (u.getClearColor(p),
    u.clear(),
    u.setRenderTarget(l),
    u.render(o, c),
    u.setRenderTarget(null),
    u.setClearColor(p, 0));
  let g = ux(l, u, !1, !0);
  if (l.texture === null) throw Error("something broke");
  return (d.dispose(), f.material.dispose(), l.dispose(), g);
}
function SL(e, t, r, n, i) {
  let o = t instanceof THREE.Color ? t : new THREE.Color(t.x, t.y, t.z),
    s = r instanceof THREE.Color ? r : new THREE.Color(r.x, r.y, r.z),
    a = 256,
    l = new Uint8Array(1024);
  for (let m = 0; m < 256; m++) {
    let A = m / 255,
      y = new THREE.Color().lerpColors(s, o, A);
    ((l[m * 4] = Math.round(y.r * 255)),
      (l[m * 4 + 1] = Math.round(y.g * 255)),
      (l[m * 4 + 2] = Math.round(y.b * 255)),
      (l[m * 4 + 3] = 255));
  }
  let c = new THREE.DataTexture(l, 256, 1, THREE.RGBAFormat);
  ((c.minFilter = THREE.LinearFilter),
    (c.magFilter = THREE.LinearFilter),
    (c.colorSpace = THREE.SRGBColorSpace),
    (c.needsUpdate = !0));
  let u = e.geometry.clone(),
    d = u.attributes.position,
    h = d.count,
    f = new Float32Array(h * 2),
    p = n.clone().normalize(),
    g = new THREE.Vector3();
  for (let m = 0; m < h; m++) {
    g.fromBufferAttribute(d, m);
    let y = g.dot(p) / i;
    ((y = Math.max(0, Math.min(1, y))), (f[m * 2] = y), (f[m * 2 + 1] = 0.5));
  }
  return (u.setAttribute("uv", new THREE.BufferAttribute(f, 2)), { texture: c, geometryWithUVs: u });
}
function dx(e, t, r) {
  let n = getTHREE(),
    { boneMap: i = {}, nameTag: o = "Accessory" } = r,
    s = !0;
  if (!TA[r.type]?.[r.variant + 1]) s = !1;
  let a = s ? TA[r.type][r.variant + 1] : void 0,
    l = /*@__PURE__*/ new Map();
  e.traverse((d) => {
    if (d.isBone && d.name) l.set(d.name.toLowerCase(), d);
  });
  let c = t.scene ?? t,
    u = Sf(c);
  return (
    (u.name = o),
    u.traverse((d) => {
      if (d.isSkinnedMesh) {
        let h = d;
        if (a) {
          if (!a.includes(d.name)) {
            d.visible = !1;
            return;
          }
          d.visible = !0;
        }
        let f = [],
          p = [];
        for (let m = 0; m < h.skeleton.bones.length; m++) {
          let A = h.skeleton.bones[m],
            y = h.skeleton.boneInverses[m];
          if (!A) continue;
          let b = (i[A.name] ?? A.name).toLowerCase(),
            v = l.get(b);
          if (v) f.push(v);
          else f.push(A);
          p.push(y ? y.clone() : new n.Matrix4());
        }
        let g = new n.Skeleton(f, p);
        (h.bind(g, h.bindMatrix),
          (h.frustumCulled = !1),
          h.computeBoundingBox(),
          h.computeBoundingSphere());
      }
    }),
    e.add(u),
    u
  );
}
function hx(e, t = "Accessory") {
  let r = [];
  e.traverse((n) => {
    if (n.name === t) r.push(n);
  });
  for (let n of r)
    (n.removeFromParent(),
      n.traverse((i) => {
        if (i.isSkinnedMesh) {
          let o = i;
          if (o.skeleton) o.skeleton.dispose();
          if (Array.isArray(o.material)) o.material.forEach((s) => s.dispose());
          else if (o.material) o.material.dispose();
        }
      }));
}
var mK = (e, t, r, n) => {
    let { width: i, height: o } = r.image,
      s = new Uint8Array(i * o * 4);
    t.readRenderTargetPixels(n, 0, 0, i, o, s);
    let a = new e.DataTexture(s, i, o, e.RGBAFormat, e.UnsignedByteType);
    return (
      ["wrapS", "wrapT", "minFilter", "magFilter"].forEach((l) => {
        a[l] = r[l];
      }),
      (a.needsUpdate = !0),
      a
    );
  },
  ML = (e, t) => {
    if (t !== void 0 && !(t instanceof HTMLCanvasElement))
      throw Error("An unknown error occurred.");
    let r = e.domElement,
      n = t || document.createElement("canvas");
    return (([n.width, n.height] = [r.width, r.height]), n.getContext("2d").drawImage(r, 0, 0), n);
  },
  IL = (e) => ({
    target: e.getRenderTarget(),
    colorSpace: e.outputColorSpace,
    size: e.getSize(new (getTHREE().Vector2)()),
  }),
  RL = ({ target: e, colorSpace: t, size: r }, n) => (
    n.setRenderTarget(e),
    (n.outputColorSpace = t),
    n.setSize(r.x, r.y, !1)
  ),
  OL = (e, t) => {
    if (!e?.meshes) throw Error("An unknown error occurred.");
    let r = getTHREE(),
      n = /*@__PURE__*/ new Set();
    (e.meshes.traverse((i) => {
      let o = i?.material?.map;
      if (!(i instanceof r.Mesh) || !o) return;
      if (o.format !== r.RGBAFormat) return;
      let s = o._target;
      if (!s) return;
      (n.add(s), (i.material.map = mK(r, t, o, s)));
    }),
      n.forEach((i) => i.dispose()));
  };
