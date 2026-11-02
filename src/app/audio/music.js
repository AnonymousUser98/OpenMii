// src/app/audio/music.js
// Background music player.
//
// Defines: getMusicPlayer, MusicPlayer, musicPlayer

var localforage = In(Hs(), 1);
var localforage = In(Hs(), 1),
  getMusicPlayer = () => musicPlayer;
class MusicPlayer {
  SongBufs;
  audioContext;
  gainNode;
  muted;
  previousVolume;
  constructor() {
    ((this.SongBufs = {}),
      (this.audioContext = new (window.AudioContext || window.webkitAudioContext)()),
      (this.gainNode = this.audioContext.createGain()),
      this.gainNode.connect(this.audioContext.destination),
      (this.muted = !1),
      (this.previousVolume = 0.28),
      (this.sources = []),
      (this.volMultiplier = 0.28));
  }
  mainSource;
  editSource;
  mainGainNode;
  editGainNode;
  theme;
  volMultiplier;
  curTheme = "";
  async updateTheme(...e) {
    let t = await localforage.default.getItem("settings_bgmType");
    if (t === "auto") t = await localforage.default.getItem("settings_theme");
    if (this.curTheme !== t) ((this.started = !1), await this.initMusic(...e));
    this.curTheme = t;
  }
  firstTimeInit = !0;
  async initMusic(e = !0, t = !1) {
    this.sources.forEach((n) => n.stop());
    let r = await localforage.default.getItem("settings_bgmType");
    if (r === "auto") r = await localforage.default.getItem("settings_theme");
    if (this.theme === r) return;
    if (((this.theme = r), r === "classic"))
      ((this.volMultiplier = 0.28),
        this.updateVolume(),
        (this.previousVolume = 0.28),
        await this.loadSong("./assets/audio/miimakermusic.opus", "mii_creator_music"));
    else if (r === "space")
      ((this.volMultiplier = 0.28),
        this.updateVolume(),
        (this.previousVolume = 0.28),
        await this.loadSong("./assets/audio/space.opus", "mii_creator_music"));
    else if (r === "sw2") {
      if (e)
        (await this.loadSong("./assets/audio/MiiMakerPitch-Menu.opus", "mii_creator_music"),
          await this.loadSong("./assets/audio/MiiMakerPitch-Edit.opus", "mii_editor_music"));
      else if (t)
        (await this.loadSong("./assets/audio/MiiMakerPitch-Int.opus", "mii_creator_music"),
          await this.loadSong("./assets/audio/MiiMakerPitch-Edit.opus", "mii_editor_music"));
      else await this.loadSong("./assets/audio/MiiMakerPitch-Int.opus", "mii_creator_music");
      ((this.volMultiplier = 1), this.updateVolume(), (this.previousVolume = 1));
    } else if (r === "wiiu") {
      if ((await this.loadSong("./assets/audio/ffl_app_menu.mp3", "mii_creator_music"), e))
        await this.loadSong("./assets/audio/ffl_app_edit.mp3", "mii_editor_music");
      ((this.volMultiplier = 1), this.updateVolume(), (this.previousVolume = 1));
    } else if (r === "wii") {
      if ((await this.loadSong("./assets/audio/channel_song.mp3", "mii_creator_music"), e))
        await this.loadSong("./assets/audio/channel_perc.mp3", "mii_editor_music");
      ((this.volMultiplier = 0.7), this.updateVolume(), (this.previousVolume = 0.7));
    } else if (r === "miitomo") {
      if ((await this.loadSong("./assets/audio/mt_main.mp3", "mii_creator_music"), e))
        await this.loadSong("./assets/audio/mt_edit.mp3", "mii_editor_music");
      ((this.volMultiplier = 1), this.updateVolume(), (this.previousVolume = 1));
    } else {
      if ((await this.loadSong("./assets/audio/MiiMakerPitch-Menu.mp3", "mii_creator_music"), e))
        await this.loadSong("./assets/audio/MiiMakerPitch-Edit.mp3", "mii_editor_music");
      ((this.volMultiplier = 1), this.updateVolume(), (this.previousVolume = 1));
    }
    (this.#t(), await this.initMusicReady());
  }
  async #t() {
    let e = (parseInt(await localforage.default.getItem("settings_bgmVolume")) + 0.001) / 100 || 1;
    this.setVolume(e);
    let t = await localforage.default.getItem("settings_bgm");
    if (t === !0) getMusicPlayer().unmute();
    else if (t === !1) getMusicPlayer().mute();
  }
  initMusicReady(e = !1) {
    if (this.firstTimeInit) ((e = !1), (this.firstTimeInit = !1));
    else e = !0;
    return new Promise(async (t) => {
      let r = !1,
        n = async () => {
          if (r) return;
          if (this.audioContext.state === "suspended")
            this.audioContext.resume().then(async () => {
              if (this.audioContext.state === "running")
                (await this.playMusic(),
                  (this.currentVolume = this.previousVolume),
                  this.updateVolume(),
                  (r = !0),
                  i());
            });
          else
            (await this.playMusic(),
              (this.currentVolume = this.previousVolume),
              this.updateVolume(),
              (r = !0),
              i());
        },
        i = () => {
          (document.removeEventListener("click", n),
            document.removeEventListener("keydown", n),
            document.removeEventListener("touchstart", n),
            t(),
            this.#t());
        };
      if (!e)
        setTimeout(() => {
          if (
            (document.addEventListener("click", n),
            document.addEventListener("keydown", n),
            document.addEventListener("touchstart", n),
            location.hostname === "localhost" || location.hostname === "127.0.0.1")
          )
            n();
        }, 100);
      else n();
    });
  }
  started;
  async playMusic() {
    return new Promise((e) => {
      if (this.started) return e();
      if (this.mainSource) this.mainSource.stop();
      if (this.editSource) this.editSource.stop();
      let t = 0,
        r = 100,
        n = 0,
        i = 100;
      if (this.theme === "space") ((t = 21.367), (r = 128.035));
      if (this.theme === "sw2") ((t = 0), (r = 66.783), (n = 4.173), (i = 104.349));
      if (this.theme === "wiiu") ((t = 0), (r = 84), (n = 0), (i = 72.408));
      if (this.theme === "miitomo") ((t = null), (r = null), (n = null), (i = null));
      if (
        (this.playSong("mii_creator_music", t, r, !0, !0, (o, s) => {
          if (
            ((this.mainSource = o),
            (this.started = !0),
            (this.mainGainNode = s),
            this.theme !== "sw2" && this.theme !== "wiiu" && this.theme !== "wii")
          )
            ((this.editSource = void 0), (this.editGainNode = void 0));
          (s.gain.setValueAtTime(-1, this.audioContext.currentTime),
            s.gain.linearRampToValueAtTime(-0.6, this.audioContext.currentTime + 2),
            e());
        }),
        this.theme === "sw2" ||
          this.theme === "wiiu" ||
          this.theme === "wii" ||
          this.theme === "miitomo")
      )
        this.playSong("mii_editor_music", n, i, !0, !0, (o, s) => {
          ((this.editSource = o),
            (this.editGainNode = s),
            s.gain.setValueAtTime(-1, this.audioContext.currentTime));
        });
    });
  }
  async loadSong(e, t) {
    let n = await (await fetch(e)).arrayBuffer(),
      i = await this.audioContext.decodeAudioData(n);
    this.SongBufs[t] = i;
  }
  sources;
  playSong(e, t = null, r = null, n = !0, i = !0, o) {
    try {
      let s = this.SongBufs[e];
      if (!s) return null;
      let a = this.audioContext.createBufferSource();
      if (((a.buffer = s), a.connect(this.gainNode), n === !0)) a.loop = !0;
      if (t !== null) a.loopStart = t;
      if (r !== null) a.loopEnd = r;
      this.sources.push(a);
      let l = this.audioContext.createGain();
      if ((a.connect(l), l.connect(this.gainNode), o)) o(a, l);
      if (i) a.start();
      return { source: a, gainNode: l };
    } catch (s) {
      return null;
    }
  }
  stopSong() {
    this.audioContext.suspend();
  }
  currentVolume;
  setVolume(e) {
    if (this.muted) {
      this.gainNode.gain.value = 0;
      return;
    }
    ((this.gainNode.gain.value = e * this.volMultiplier), (this.currentVolume = e));
  }
  updateVolume() {
    this.gainNode.gain.value = (this.currentVolume || 1) * this.volMultiplier;
  }
  mute() {
    if (this.muted) this.unmute();
    ((this.previousVolume = this.gainNode.gain.value), this.setVolume(0), (this.muted = !0));
  }
  unmute() {
    if (this.muted === !1) return;
    ((this.muted = !1), this.setVolume(this.previousVolume));
  }
}
var musicPlayer = new MusicPlayer();
window.mm = musicPlayer;
