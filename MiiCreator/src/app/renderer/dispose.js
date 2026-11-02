// src/app/renderer/dispose.js
// ResourceTracker and helpers that free GPU memory.
//
// Defines: ResourceTracker, disposeMesh, TEXTURE_MAP_KEYS, disposeObject
// Uses from other files:
//   app/renderer/three-module.js: getTHREE

class ResourceTracker {
  resources;
  constructor() {
    this.resources = /*@__PURE__*/ new Set();
  }
  track(e) {
    let t = getTHREE();
    if (!e) return e;
    if (Array.isArray(e)) return (e.forEach((r) => this.track(r)), e);
    if (e.dispose || e instanceof t.Object3D) this.resources.add(e);
    if (e instanceof t.Object3D) {
      if (e.geometry) this.track(e.geometry);
      if (e.material) this.track(e.material);
      this.track(e.children);
    } else if (e instanceof t.Material) {
      for (let r of Object.values(e)) if (r instanceof t.Texture) this.track(r);
      if (e.uniforms) {
        for (let r of Object.values(e.uniforms))
          if (r) {
            let n = r.value;
            if (n instanceof t.Texture || Array.isArray(n)) this.track(n);
          }
      }
    }
    return e;
  }
  untrack(e) {
    this.resources.delete(e);
  }
  dispose() {
    let e = getTHREE();
    for (let t of this.resources) {
      if (t.isMesh) disposeMesh(t);
      if (t instanceof e.Object3D) {
        if (t.parent) t.parent.remove(t);
      }
      if (t.dispose) t.dispose();
    }
    this.resources.clear();
  }
}
function disposeMesh(e) {
  e.geometry.dispose();
  let t = Array.isArray(e.material) ? e.material : [e.material];
  for (let r of t) {
    for (let n of [
      "map",
      "normalMap",
      "roughnessMap",
      "metalnessMap",
      "emissiveMap",
      "alphaMap",
      "displacementMap",
    ])
      if (r[n]) r[n].dispose();
    r.dispose();
  }
  if (e.parent) e.parent.remove(e);
  ((e.geometry = null), (e.material = null));
}
var TEXTURE_MAP_KEYS = [
  "map",
  "aoMap",
  "alphaMap",
  "bumpMap",
  "displacementMap",
  "envMap",
  "lightMap",
  "emissiveMap",
  "normalMap",
  "metalnessMap",
  "roughnessMap",
  "anisotropyMap",
  "clearcoatMap",
  "clearcoatNormalMap",
  "clearcoatRoughnessMap",
  "iridescenceMap",
  "iridescenceThicknessMap",
  "sheenColorMap",
  "sheenRoughnessMap",
  "specularMap",
  "specularColorMap",
  "specularIntensityMap",
  "thicknessMap",
  "transmissionMap",
];
function disposeObject(e) {
  if (e == null || e == null) return;
  let t = e;
  if (t.skeleton) {
    if (t.skeleton.boneTexture) t.skeleton.boneTexture.dispose();
  }
  t.traverse(function (r) {
    if (r.isMesh || r.isPoints || r.isLine) {
      if (r.skeleton) {
        if (r.skeleton.boneTexture) r.skeleton.boneTexture.dispose();
      }
      if (r.material)
        if (Array.isArray(r.material))
          r.material.forEach((n) => {
            if (n.uniforms)
              Object.keys(n.uniforms).forEach((i) => {
                if (n.uniforms[i].value) {
                  let o = n.uniforms[i].value;
                  if (Array.isArray(o) && o.length > 0)
                    o.forEach((s) => {
                      if (s.type && s.type === 1009) s.dispose();
                    });
                  else if (o.type && o.type === 1009) o.dispose();
                }
              });
            else
              for (let i in n)
                TEXTURE_MAP_KEYS.forEach((o) => {
                  if (i === o) {
                    if (n[i]) n[i].dispose();
                  }
                });
            n.dispose();
          });
        else {
          if (r.material.uniforms)
            Object.keys(r.material.uniforms).forEach((n) => {
              if (r.material.uniforms[n].value) {
                let i = r.material.uniforms[n].value;
                if (Array.isArray(i) && i.length > 0)
                  i.forEach((o) => {
                    if (o.type && o.type === 1009) o.dispose();
                  });
                else if (i.type && i.type === 1009) i.dispose();
              }
            });
          else
            for (let n in r.material)
              TEXTURE_MAP_KEYS.forEach((i) => {
                if (n === i) {
                  if (r.material[n]) r.material[n].dispose();
                }
              });
          r.material.dispose();
        }
      r.geometry.dispose();
    }
  });
}
