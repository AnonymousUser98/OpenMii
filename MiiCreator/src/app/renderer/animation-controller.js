// src/app/renderer/animation-controller.js
// AnimationController: plays body animations.
//
// Defines: AnimationController

class AnimationController {
  mi;
  mixer;
  actions;
  clips;
  constructor(e, t) {
    ((this.mi = e),
      (this.mixer = new AnimationMixer(t)),
      (this.actions = /*@__PURE__*/ new Map()),
      (this.clips = /*@__PURE__*/ new Map()),
      e.clips.forEach((r, n) => {
        let i = n;
        if (isNaN(n)) i = r.name;
        (this.clips.set(n, r), this.actions.set(n, this.mixer.clipAction(r)));
      }));
  }
  update(e) {
    this.mixer.update(e);
  }
  cleanup() {
    this.mixer.stopAllAction();
    for (let [e, t] of this.clips) (this.mixer.uncacheAction(t), this.mixer.uncacheClip(t));
    (this.mixer.uncacheRoot(this.mixer.getRoot()),
      (this.mixer = null),
      this.clips.clear(),
      (this.clips = null),
      this.actions.clear(),
      (this.actions = null));
  }
}
