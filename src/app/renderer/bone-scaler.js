// src/app/renderer/bone-scaler.js
// BoneScaler: applies height/build to the body skeleton.
//
// Defines: BoneScaler
// Uses from other files:
//   app/renderer/three-module.js: getTHREE

class BoneScaler {
  constructor(e, { headBoneName: t = "head", sklRootName: r = "skl_root" } = {}, n = "wiiu") {
    ((this._THREE = getTHREE()),
      (this.skinnedMesh = e),
      (this.skeleton = e.skeleton),
      (this.headBoneName = t.toLowerCase()),
      (this.sklRootName = r.toLowerCase()),
      (this.bodyModelName = n),
      (this.boneNameToBone = {}),
      (this.parentNameMap = {}),
      (this.childrenMap = {}),
      (this.bonesInOrder = []),
      (this.lastWorldMatrices = {}),
      this._initMaps());
  }
  _initMaps() {
    (this.skeleton.bones.forEach((n) => {
      let i = (n.name || "").toLowerCase();
      this.boneNameToBone[i] = n;
      let o = n.parent && n.parent.isBone ? n.parent.name.toLowerCase() : null;
      this.parentNameMap[i] = o;
    }),
      Object.keys(this.boneNameToBone).forEach((n) => (this.childrenMap[n] = [])),
      Object.entries(this.parentNameMap).forEach(([n, i]) => {
        if (i) ((this.childrenMap[i] = this.childrenMap[i] || []), this.childrenMap[i].push(n));
      }));
    let t = /*@__PURE__*/ new Set(),
      r = (n) => {
        if (t.has(n)) return;
        (t.add(n), this.bonesInOrder.push(n));
        let i = this.childrenMap[n] || [];
        for (let o of i) r(o);
      };
    (Object.entries(this.parentNameMap).forEach(([n, i]) => {
      if (!i) r(n);
    }),
      Object.keys(this.boneNameToBone).forEach((n) => {
        if (!t.has(n)) r(n);
      }));
  }
  static _getTranslation(e) {
    let t = e.elements;
    return new (getTHREE().Vector3)(t[12], t[13], t[14]);
  }
  static _setTranslation(e, t) {
    ((e.elements[12] = t.x), (e.elements[13] = t.y), (e.elements[14] = t.z));
  }
  _updateScaleForName(e, t, r) {
    if (this.bodyModelName === "stp" && (t === "handlps" || t === "handrps")) {
      e.set(0, 0, 0);
      return;
    }
    switch (t) {
      case "all_root":
      case "nw4f_root":
      case "body":
      case "skl_root":
        e.set(1, 1, 1);
        break;
      case "head":
        switch (this.bodyModelName) {
          case "miitomo":
            e.set(Math.max(r.y, 1), r.x, r.x);
            break;
          default:
            e.set(r.x, Math.max(r.y, 1), r.x);
            break;
        }
        break;
      case "chest":
      case "chest_2":
      case "hip":
      case "foot_l1":
      case "foot_l2":
      case "foot_r1":
      case "foot_r2":
      case "body_scaleps":
      case "mii_bodypg":
      case "bodyps":
        e.set(r.x, r.y, r.z);
        break;
      case "arm_l1":
      case "arm_l2":
      case "elbow_l":
      case "arm_r1":
      case "arm_r2":
      case "elbow_r":
      case "arm_1_l":
      case "arm_2_l":
      case "arm_1_r":
      case "arm_2_r":
      case "waist":
      case "spine_1":
      case "spine_2":
        e.set(r.y, r.x, r.z);
        break;
      case "leg_1_l":
      case "leg_2_l":
      case "leg_1_r":
      case "leg_2_r":
      case "skirt_f_1":
      case "skirt_f_2":
      case "skirt_b_1":
      case "skirt_b_2":
      case "skirt_l_1":
      case "skirt_l_2":
      case "skirt_r_1":
      case "skirt_r_2":
      case "finger_1_l":
      case "finger_2_l":
      case "thumb_1_l":
      case "thumb_2_l":
      case "finger_1_r":
      case "finger_2_r":
      case "thumb_1_r":
      case "thumb_2_r":
        e.set(r.y, r.x, r.z);
        break;
      case "wrist_l":
      case "dummy_wrist_l":
      case "shoulder_l":
      case "wrist_r":
      case "dummy_wrist_r":
      case "shoulder_r":
      case "ankle_l":
      case "knee_l":
      case "ankle_r":
      case "knee_r":
      case "handlpg":
      case "handrpg":
        e.set(r.x, r.x, r.x);
        break;
      default:
        e.set(1, 1, 1);
        break;
    }
  }
  apply(e, t, r = !1) {
    let n = this.bonesInOrder,
      i = this.boneNameToBone,
      o = this.parentNameMap;
    for (let u of Object.keys(i)) i[u].updateMatrix();
    let s = {};
    for (let u of Object.keys(i)) s[u] = i[u].matrix.clone();
    let a = {},
      l = new this._THREE.Vector3(),
      c = new this._THREE.Vector3();
    for (let u of n) {
      let d = o[u],
        h = s[u].clone();
      if (!d) {
        a[u] = h.clone();
        continue;
      }
      this._updateScaleForName(c, d, e);
      let f = BoneScaler._getTranslation(h);
      if (u === this.sklRootName)
        switch (((f.x *= e.y), (f.y *= e.y), (f.z *= e.x), this.bodyModelName)) {
          case "wii":
            f.y += (e.x - e.y) * 10;
            break;
          case "wiiu":
            f.y += (e.x - e.y) * 1;
            break;
          case "switch":
            f.y += (e.x - e.y) * 6.8;
            break;
          case "miitomo":
            f.y += (e.x - e.y) * 0.6;
            break;
          default:
            f.y += (e.x - e.y) * 1;
            break;
        }
      (f.multiply(c), BoneScaler._setTranslation(h, f));
      let p = a[d];
      if (!p) a[u] = s[d].clone().multiply(h);
      else a[u] = p.clone().multiply(h);
    }
    for (let u of n) {
      this._updateScaleForName(c, u, e);
      let d = new this._THREE.Matrix4().makeScale(c.x, c.y, c.z);
      a[u].multiply(d);
    }
    for (let u of n) {
      let d = o[u],
        h = a[u],
        f;
      if (!d) f = h.clone();
      else f = a[d].clone().invert().multiply(h);
      let p = i[u];
      (p.matrix.copy(f), (p.matrixAutoUpdate = !1));
    }
    if (r) for (let u of this.bonesInOrder) this.lastWorldMatrices[u] = a[u].clone();
  }
}
