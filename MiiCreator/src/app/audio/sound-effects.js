// src/app/audio/sound-effects.js
// UI sound effects (hover/select/press) and sound pack loading.
//
// Defines: getSoundEffects, playSound, SoundEffects, soundEffects, loadSoundPack

var JSZip = In(Cm(), 1),
  localforage = In(Hs(), 1),
  getSoundEffects = () => soundEffects,
  playSound = (e) => getSoundEffects().playSound(e);
class SoundEffects {
  soundBufs;
  audioContext;
  gainNode;
  muted;
  previousVolume;
  volMultiplier;
  constructor() {
    ((this.soundBufs = {}),
      (this.audioContext = new (window.AudioContext || window.webkitAudioContext)()),
      (this.gainNode = this.audioContext.createGain()),
      this.gainNode.connect(this.audioContext.destination),
      (this.muted = !1),
      (this.previousVolume = 0.28),
      (this.queue = /*@__PURE__*/ new Set()),
      (this.volMultiplier = 0.28));
  }
  currentTheme;
  async updateTheme() {
    let e = await localforage.default.getItem("settings_sfxType");
    if (e === "auto") e = await localforage.default.getItem("settings_theme");
    let t = e;
    if (t !== this.currentTheme)
      if (t === "sw2")
        ((this.volMultiplier = 0.75),
          this.updateVolume(),
          loadSoundPack("./assets/audio/miiMakerSwitch2.zip").then(() => {
            ((this.volMultiplier = 0.75), this.updateVolume(), (this.previousVolume = 0.75));
          }),
          (this.volMultiplier = 0.75),
          this.updateVolume(),
          (this.previousVolume = 0.75));
      else if (t === "space")
        ((this.volMultiplier = 1),
          this.updateVolume(),
          loadSoundPack("./assets/audio/miiMakerSpace.zip").then(() => {
            ((this.volMultiplier = 1), this.updateVolume(), (this.previousVolume = 1));
          }),
          (this.volMultiplier = 1),
          this.updateVolume(),
          (this.previousVolume = 1));
      else if (t === "wiiu")
        ((this.volMultiplier = 0.75),
          this.updateVolume(),
          loadSoundPack("./assets/audio/miiMakerU.zip").then(() => {
            ((this.volMultiplier = 0.75), this.updateVolume(), (this.previousVolume = 0.75));
          }),
          (this.volMultiplier = 0.75),
          this.updateVolume(),
          (this.previousVolume = 0.75));
      else if (t === "wii")
        ((this.volMultiplier = 0.75),
          this.updateVolume(),
          loadSoundPack("./assets/audio/miiMakerWii.zip").then(() => {
            ((this.volMultiplier = 0.75), this.updateVolume(), (this.previousVolume = 0.75));
          }),
          (this.volMultiplier = 0.75),
          this.updateVolume(),
          (this.previousVolume = 0.75));
      else if (t === "miitomo")
        ((this.volMultiplier = 0.35),
          this.updateVolume(),
          loadSoundPack("./assets/audio/miiMakerTomo.zip").then(() => {
            ((this.volMultiplier = 0.35), this.updateVolume(), (this.previousVolume = 0.35));
          }),
          (this.volMultiplier = 0.35),
          this.updateVolume(),
          (this.previousVolume = 0.35));
      else
        (loadSoundPack("./assets/audio/miiMakerSwitch.zip"),
          (this.volMultiplier = 0.28),
          this.updateVolume(),
          (this.previousVolume = 0.28));
    this.currentTheme = t;
  }
  async loadSound(e, t) {
    let n = await (await fetch(e)).arrayBuffer(),
      i = await this.audioContext.decodeAudioData(n);
    this.soundBufs[t] = i;
  }
  async loadSoundBuffer(e, t) {
    let r = await this.audioContext.decodeAudioData(e);
    this.soundBufs[t] = r;
  }
  queue;
  playSound(e) {
    let t = this.soundBufs[e];
    if (!t) return;
    if (this.queue.has(e)) return;
    let r = this.audioContext.createBufferSource();
    ((r.buffer = t),
      r.connect(this.gainNode),
      r.start(),
      this.queue.add(e),
      setTimeout(() => {
        this.queue.delete(e);
      }, 50));
  }
  currentVolume;
  setVolume(e) {
    if (this.muted) return;
    ((this.gainNode.gain.value = e * this.volMultiplier), (this.currentVolume = e));
  }
  updateVolume() {
    this.gainNode.gain.value = (this.currentVolume || 1) * (this.volMultiplier || 1);
  }
  mute() {
    if (this.muted) return;
    ((this.previousVolume = this.gainNode.gain.value), this.setVolume(0), (this.muted = !0));
  }
  unmute() {
    if (this.muted === !1) return;
    ((this.muted = !1), this.setVolume(this.previousVolume));
  }
}
var soundEffects = new SoundEffects(),
  loadSoundPack = async (e = "./assets/audio/miiMakerSwitch.zip", t = soundEffects) => {
    let r = await fetch(e).then((a) => a.blob()),
      n = await JSZip.default.loadAsync(r),
      i = [],
      o = Object.keys(n.files);
    for (let a of o) i.push(n.files[a].async("arraybuffer"));
    let s = await Promise.all(i);
    for (let a = 0; a < o.length; a++) {
      let l = o[a].split(".");
      (l.pop(), await t.loadSoundBuffer(s[a], l.join(".")));
    }
  };
