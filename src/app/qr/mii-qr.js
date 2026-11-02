// src/app/qr/mii-qr.js
// Mii QR code encryption/decryption and camera scanning.
//
// Defines: AesCcm, Wle, AH, Qle, Yle, Xle, jle, decodeMiiQRHeader, aesCtrDecrypt, _H, CH,
//          listQRCameras, startQRScan, setupQRCamera, TH, Zle, $le, Jle, decodeMiiQRCode
// Uses from other files:
//   app/mii/formats/ffsd-miic.js: TOMODACHI_QR_STRUCT, MIIC_STRUCT, Rv, n7
//   app/ui/html.js: Html
//   app/mii/mii.js: Mii
//   app/ui/icons.js: SVG_ICONS
//   app/ui/modal.js: Modal
//   app/ui/notify.js: Notify
//   app/settings/settings.js: getSetting

var ov = globalThis.crypto.subtle;
class AesCcm {
  static BlockLength = 16;
  constructor(e) {
    ((this._ctrKey = ov.importKey("raw", e, { name: "AES-CTR" }, !1, ["encrypt"])),
      (this._cbcKey = ov.importKey("raw", e, { name: "AES-CBC" }, !1, ["encrypt"])));
  }
  static _makeCounterBlock(e, t) {
    let r = new Uint8Array(AesCcm.BlockLength);
    return (
      (r[0] = AesCcm.BlockLength - 1 - e.length - 1),
      r.set(e, 1),
      (r[AesCcm.BlockLength - 1] = t),
      r
    );
  }
  async _ctr(e, t, r) {
    let n = AesCcm.BlockLength - 1 - t.length;
    return new Uint8Array(
      await ov.encrypt(
        { name: "AES-CTR", counter: AesCcm._makeCounterBlock(t, r), length: 8 * n },
        await this._ctrKey,
        e,
      ),
    );
  }
  async _computeCbcMac(e, t, r) {
    let n = AesCcm.BlockLength,
      i = n - 1 - t.length,
      o = Math.ceil(e.length / n) * n,
      s = new Uint8Array(n + o);
    ((s[0] = (((r - 2) / 2) << 3) | (i - 1)), s.set(t, 1));
    let a = e.length;
    for (let c = n - 1; c > t.length; c--) ((s[c] = a % 256), (a = Math.floor(a / 256)));
    return (
      s.set(e, n),
      new Uint8Array(
        await ov.encrypt({ name: "AES-CBC", iv: new Uint8Array(n) }, await this._cbcKey, s),
      ).slice(s.length - n, s.length)
    );
  }
  async encrypt(e, t, r) {
    let n = AesCcm.BlockLength,
      i = await this._computeCbcMac(e, t, r),
      o = new Uint8Array(n + e.length);
    (o.set(i), o.set(e, n));
    let s = await this._ctr(o, t, 0),
      a = new Uint8Array(e.length + r);
    return (a.set(s.subarray(n)), a.set(s.subarray(0, r), e.length), a);
  }
  decryptSkipTag = (e, t) => this._ctr(e, t, 1);
  async decrypt(e, t, r) {
    if (e.length < r) return null;
    let n = e.length - r,
      i = await this.decryptSkipTag(e.subarray(0, n), t),
      o = await this.encrypt(i, t, r),
      s = 0;
    for (let a = 0; a < r; a++) s |= o[n + a] ^ e[n + a];
    return s === 0 ? i : null;
  }
}
var mH = AesCcm,
  pH = /*@__PURE__*/ new Uint8Array([
    169, 60, 177, 46, 148, 134, 26, 193, 208, 116, 187, 96, 25, 253, 14, 146,
  ]),
  Bc = 112;
class xh {
  static StoreDataLength = 96;
  static IdOffset = 12;
  static IdLength = 8;
  static NonceLength = 12;
  static TagLength = 16;
  static CipherTextLength = xh.StoreDataLength - xh.IdLength;
  constructor(e) {
    this._cipher = e;
  }
  static _makeNonce(e) {
    let t = new Uint8Array(xh.NonceLength);
    return (t.set(e), t);
  }
  async decrypt(e, t) {
    let { IdOffset: r, IdLength: n, TagLength: i, StoreDataLength: o } = xh;
    if (t.length < Bc) throw Error(`Input size is ${t.length}, expected ${Bc} or longer.`);
    let s = t.subarray(0, n),
      a = t.subarray(n, o),
      l = t.subarray(o, Bc),
      c = xh._makeNonce(s),
      u = await this._cipher.decryptSkipTag(a, c),
      d = 0;
    {
      let h = new Uint8Array(o);
      h.set(u);
      let f = await this._cipher.encrypt(h, c, i);
      for (let p = 0; p < i; p++) d |= f[o + p] ^ l[p];
    }
    if (d !== 0) return !1;
    return (e.set(u.subarray(0, r)), e.set(s, r), e.set(u.subarray(r), r + n), !0);
  }
  async encrypt(e, t) {
    let { IdOffset: r, IdLength: n, TagLength: i, StoreDataLength: o, CipherTextLength: s } = xh;
    if (t.length !== o)
      throw Error(`Input size is ${t.length}, expected ${o} / 3DS/Wii U format Mii StoreData.`);
    let a = r + n,
      l = t.subarray(r, a),
      c = new Uint8Array(o);
    (c.set(t.subarray(0, r)), c.set(t.subarray(a), r));
    let u = xh._makeNonce(l),
      d = await this._cipher.encrypt(c, u, i);
    (e.set(l), e.set(d.subarray(0, s), n), e.set(d.subarray(o), o));
  }
}
class tc {
  static StructLength = 10;
  static EncryptedStructOffset = 1;
  static PlaintextLength = 15;
  static TagLength = 16;
  static EncodedLength = 1 + tc.PlaintextLength + tc.TagLength;
  static IdLength = 8;
  static NonceLength = 12;
  constructor(e) {
    this._cipher = e;
  }
  static _makeNonce(e) {
    let t = new Uint8Array(tc.NonceLength);
    return (t.set(e.subarray(0, tc.IdLength)), t);
  }
  async encryptToWrappedData(e, t) {
    let {
      StructLength: r,
      EncryptedStructOffset: n,
      PlaintextLength: i,
      TagLength: o,
      EncodedLength: s,
    } = tc;
    if (t.length !== r)
      throw Error(`Ounce extra data must be exactly ${r} bytes, got ${t.length}.`);
    if (e.length < Bc + s)
      throw Error(`QR code buffer is ${e.length} bytes, expected ${Bc + s} or more.`);
    let a = new Uint8Array(i);
    a.set(t.subarray(n));
    let l = await this._cipher.encrypt(a, tc._makeNonce(e), o);
    (e.set(t.subarray(0, n), Bc), e.set(l, Bc + n));
  }
  async decryptFromWrappedData(e) {
    let { StructLength: t, EncryptedStructOffset: r, TagLength: n, EncodedLength: i } = tc;
    if (e.length !== Bc + i) return null;
    let o = Bc + r,
      s = await this._cipher.decrypt(e.subarray(o), tc._makeNonce(e), n);
    if (!s) return null;
    let a = t - r,
      l = new Uint8Array(t);
    return (l.set(e.subarray(Bc, o)), l.set(s.subarray(0, a), r), l);
  }
}
var Wle = function (t) {
    let r = 0,
      n = r >> 8,
      i = r & 255;
    for (let o = 0; o < t.length; o++) {
      let a = t[o] ^ n;
      ((a ^= a >> 4), (n = (i ^ (a >> 3) ^ (a << 4)) & 255), (i = (a ^ (a << 5)) & 255));
    }
    return ((r = (n << 8) + i), r);
  },
  gH = (e) => {
    let t = e.slice(12, 20),
      r = [...e.slice(0, 12), ...e.slice(20)],
      n = [...e.slice(0, 12), ...t, ...e.slice(20, -2)],
      i = Wle(new Uint8Array(n)),
      o = [(i >> 8) & 255, i & 255];
    r = [...r.slice(0, -2), ...o];
    let s = new ls.cipher.aes([1509720446, 1682369121, -1875608800, -373436846]),
      a = new Uint8Array([...r, ...[, , , , , , , ,].fill(0)]),
      l = ls.codec.bytes.toBits(Array.from(a)),
      c = ls.codec.bytes.toBits([...t, 0, 0, 0, 0]),
      u = ls.mode.ccm.encrypt(s, l, c, [], 128),
      d = ls.codec.bytes.fromBits(u),
      h = d.length - 8 - 16,
      f = d.slice(0, h),
      p = d.slice(d.length - 16);
    return [...t, ...f, ...p];
  },
  AH = new tc(new mH(pH)),
  yH = () => AH,
  xH = async (e, t) => {
    let r = new Uint8Array(144);
    for (let i = 0; i < 112; i++) if (e[i]) r[i] = e[i];
    let n = new Uint8Array(10);
    return (
      (n[0] = 17),
      (n[1] = 1),
      (n[2] = t.facelineColor),
      (n[3] = t.hairColor),
      (n[4] = t.eyeColor),
      (n[5] = t.eyebrowColor),
      (n[6] = t.mouthColor),
      (n[7] = t.beardColor),
      (n[8] = t.glassColor),
      (n[9] = t.glassType),
      await AH.encryptToWrappedData(r, n),
      r
    );
  };
var Qle = "59FC817E6446EA6190347B20E9BDCE52",
  Yle = new Uint8Array([48, 129, 159, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 1]),
  Xle = ls.codec.hex.toBits(Qle),
  jle = window.crypto,
  bH = jle.subtle;
function n9(e) {
  if (e === "Camera not found.")
    e += `
Check your browser settings and make sure it isn't disabled.
If you don't have a camera, you can disable the option in Mii Creator settings.`;
  var t = Modal.modal("QR Scanner Error", e, "body", { text: "Cancel" }, { text: "OK" });
  t.qs(".modal-content").styleJs({ minWidth: "360px" });
}
function decodeMiiQRHeader(e) {
  if (e.length < 112)
    throw Error("Mii QR codes should be 112 or more bytes long, yours is " + e.length);
  let t = e.slice(0, 8),
    r = e.slice(8),
    n = new ls.cipher.aes(Xle),
    i = ls.codec.bytes.toBits(Array.from(r)),
    o = ls.codec.bytes.toBits([...t, 0, 0, 0, 0]),
    s = 128,
    a = ls.bitArray.clamp(i, ls.bitArray.bitLength(i) - s),
    c = (ls.mode.ccm._ctrMode || ls.mode.ccm.C)(n, a, o, [], s, 3),
    u = ls.codec.bytes.fromBits(c.data),
    d = new Uint8Array(u).slice(0, 88);
  return new Uint8Array([...d.slice(0, 12), ...t, ...d.slice(12)]);
}
async function aesCtrDecrypt(e, t) {
  let r = await bH.importKey("raw", Yle, { name: "AES-CTR" }, !1, ["decrypt"]),
    n = await bH.decrypt({ name: "AES-CTR", counter: t, length: 128 }, r, e);
  return new Uint8Array(n);
}
var _H = /*@__PURE__*/ new Map();
_H.set(nr.TRY_HARDER, !0);
_H.set(nr.POSSIBLE_FORMATS, [at.QR_CODE]);
var vH = new iv(),
  av = null,
  Fc = null,
  cA;
function CH(e) {
  cA = e;
}
function t9() {
  if (av) (av.stop(), (av = null));
}
async function listQRCameras(e) {
  if (!(await getSetting("allowQrCamera"))) return;
  try {
    (await navigator.mediaDevices.getUserMedia({ video: !0 })).getTracks().forEach((o) => o.stop());
    let n = await iv.listVideoInputDevices();
    ((e.innerHTML = ""),
      n.forEach((o, s) => {
        let a = document.createElement("option");
        ((a.value = o.deviceId), (a.text = o.label || `Camera ${s + 1}`), e.appendChild(a));
      }));
    let i = n.find((o) => /back|rear|environment/i.test(o.label));
    if (((Fc = Fc || i?.deviceId || n[0]?.deviceId), Fc)) ((e.value = Fc), await startQRScan(Fc));
  } catch (r) {
    n9(r);
  }
}
async function startQRScan(e) {
  t9();
  let t = document.getElementById("qr-video");
  if (!t) return;
  try {
    av = await vH.decodeFromVideoDevice(e, t, async (r, n) => {
      if (r) {
        let i = TH(r);
        if (!i || i.length === 0) return;
        t9();
        let o = await decodeMiiQRCode(i);
        if (o && cA) cA([o]);
      }
    });
  } catch (r) {}
}
async function setupQRCamera(e, t, r, n) {
  let i = await getSetting("allowQrCamera"),
    o = () => {
      ((e.style.display = "none"), (t.style.display = "none"), (r.style.display = "none"));
    };
  if (!i) o();
  else
    try {
      if ((await iv.listVideoInputDevices()).length === 0) o();
    } catch {
      o();
    }
  (e.addEventListener("change", (s) => {
    if (((Fc = s.target.value), Fc)) startQRScan(Fc);
  }),
    t.addEventListener("click", () => {
      if (Fc) startQRScan(Fc);
      else listQRCameras(e);
    }),
    r.addEventListener("click", () => {
      t9();
    }),
    n.setAttribute("multiple", "true"),
    n.addEventListener("change", async (s) => {
      let a = s.target.files;
      if (!a || a.length === 0) return;
      let l = [];
      for (let c of Array.from(a))
        try {
          let u = URL.createObjectURL(c),
            d = document.createElement("img");
          ((d.src = u),
            await new Promise((f) => {
              d.onload = f;
            }));
          let h = await vH.decodeFromImageElement(d);
          if ((URL.revokeObjectURL(u), h)) {
            let f = TH(h),
              p = await decodeMiiQRCode(f);
            if (p) l.push(p);
          }
        } catch (u) {}
      if (l.length > 0 && cA) cA(l);
      else
        Notify.show(
          "Scan Failed",
          "Could not detect or decode a valid QR code in the selected file(s).",
        );
      n.value = "";
    }));
}
function TH(e) {
  let t = e.getResultMetadata(),
    r = t ? t.get(hn.BYTE_SEGMENTS) : null;
  if (r && r.length > 0) {
    let n = r.reduce((s, a) => s + a.length, 0),
      i = new Uint8Array(n),
      o = 0;
    for (let s of r) (i.set(s, o), (o += s.length));
    return i;
  }
  return e.getRawBytes();
}
var Zle = 79764919,
  $le = new Uint32Array(256);
function Jle() {
  for (let e = 0; e < 256; e++) {
    let t = e << 24;
    for (let r = 0; r < 8; r++)
      if (t & 2147483648) t = (t << 1) ^ Zle;
      else t = t << 1;
    $le[e] = t >>> 0;
  }
}
Jle();
var sv = [
  55, 51, 50, 12, 16, 12, 67, 61, 51, 64, 69, 66, 65, 86, 85, 93, 92, 19, 20, 20, 15, 32, 35, 26,
  38, 41, 43, 18, 95, 97, 97, 99,
];
async function decodeMiiQRCode(e) {
  try {
    let t = decodeMiiQRHeader(e.slice(0, 112));
    if (e.length > 112) {
      let r = e.slice(112, 128),
        n = e.slice(128, -4);
      if (e.length === 144 && e[112] == 17) {
        let i = await yH().decryptFromWrappedData(e);
        if (!i) throw "Bad Switch 2 QR data";
        let o = new Mii(t);
        return (
          (o.facelineColor = i[2]),
          (o.hairColor = i[3]),
          (o.eyeColor = i[4]),
          (o.eyebrowColor = i[5]),
          (o.mouthColor = i[6]),
          (o.beardColor = i[7]),
          (o.glassColor = i[8]),
          (o.glassType = i[9]),
          { data: o.export(), type: 3 }
        );
      }
      try {
        let i = await aesCtrDecrypt(n, r);
        if (i.byteLength === 240) {
          let o = i,
            s = TOMODACHI_QR_STRUCT.unpack(o),
            a = new Mii(t);
          switch (s.hairDyeType) {
            case 1: {
              a.hairColor = sv[s.hairDye % sv.length];
              break;
            }
            case 2: {
              let l = sv[s.hairDye % sv.length];
              ((a.hairColor = l), (a.eyebrowColor = l), (a.beardColor = l));
              break;
            }
          }
          return { data: a.export(), type: 1 };
        }
        throw "Unsupported QR extra data format.";
      } catch (i) {
        let o = new Uint8Array(e.slice(112));
        if (o.length === 10 || o.length === 12) {
          let s = new Uint8Array(t.length + o.length);
          return (s.set(t), s.set(o, t.length), { data: s, type: 2 });
        } else if (o[0] === 77 && o[1] === 73 && o[2] === 73 && o[3] === 67) {
          let s = new Mii(t),
            a = new Uint8Array(n7);
          if ((a.set(o, 0), o.length < 44))
            ((a[37] = -1),
              (a[38] = 4),
              (a[39] = 4),
              (a[40] = -1),
              (a[41] = -1),
              (a[42] = -1),
              (a[43] = -1),
              (a[44] = -1));
          if (o.length < 37) ((a[33] = 4), (a[34] = -1), (a[35] = -1), (a[36] = -1));
          let l = Rv.unpack(a);
          return { data: MIIC_STRUCT.pack({ ...s, ...l }), type: 2 };
        } else return { data: t, type: 0 };
      }
    } else return { data: t, type: 0 };
  } catch (t) {
    return (
      Notify.show(
        "Something went wrong",
        "Mii Creator couldn't read all of this QR Code's data, so some info will be lost.",
      ),
      { data: e.slice(0, 112), type: 0 }
    );
  }
}
var o9;
function hm(e, t = 4) {
  let r = e;
  if (!r) return;
  let n = r.getBoundingClientRect(),
    i = n.width / 2,
    o = n.height / 2;
  for (let a = 0; a < t + Math.floor(Math.random() * 3); a++) {
    var s = new Html("img")
      .class("sparkle")
      .attr({ src: "data:image/svg+xml," + encodeURIComponent(SVG_ICONS.sparkle_new) });
    s.appendTo(r);
    let l = Math.random() * (n.width * 0.5) + n.width / 6,
      c = Math.random() * (n.height * 0.5) + n.height / 6,
      u = l - i,
      d = c - o,
      h = 0.1,
      f = l + u * h,
      p = c + d * h;
    if (
      (s.style({
        "--old-x": `${l}px`,
        "--old-y": `${c}px`,
        "--new-x": `${f}px`,
        "--new-y": `${p}px`,
      }),
      o9)
    )
      clearTimeout(o9);
    o9 = setTimeout(() => {
      (s.cleanup(), (r.innerHTML = ""));
    }, 500);
  }
}
