// src/app/mii/mii.js
// Mii: the main Mii data class (every editable field, import/export to all formats).
//
// Defines: Mii
// Uses from other files:
//   app/mii/colors.js: FAVORITE_COLORS_RGB, COMMON_COLORS_RGB, vl, CA, j9, K9, q9, v0
//   app/mii/formats/ffsd-miic.js: CREATE_ID_STRUCT, FFSD_STRUCT, MIIC_STRUCT,
//                                 createDefaultMiicFields, Ov, Lv, validateMiiFields
//   app/util/colors-and-bytes.js: id, od, bytesToBase64, bytesToHex, decodeHexOrBase64
//   app/mii/formats/studio-and-nx.js: M0, OA, SWITCH_CHARINFO_STRUCT, u7, STUDIO_DATA_STRUCT
//   app/mii/formats/charinfo.js: Fm, a7, getAlternatePaletteRGB
//   app/settings/palette-flags.js: isAlternatePaletteEnabled
//   app/util/random.js: Om
//   app/renderer/ffl/face-builder.js: COMMON_COLOR_TABLE

class Mii {
  authorId;
  beardColor;
  beardType;
  birthDay;
  birthMonth;
  birthYear;
  acceType;
  build;
  createId;
  creator;
  eyeAspect;
  eyebrowAspect;
  eyebrowColor;
  eyebrowRotate;
  eyebrowScale;
  eyebrowType;
  eyebrowX;
  eyebrowY;
  eyeColor;
  eyeRColor;
  eyeRotate;
  eyeScale;
  eyeSclera;
  eyeShine;
  eyeType;
  eyeX;
  eyeY;
  facelineColor;
  facelineMake;
  facelineType;
  facelineWrinkle;
  facePaintColor;
  favorite;
  favoriteColor;
  fontRegion;
  gender;
  glassColor;
  glassScale;
  glassType;
  glassY;
  hairColor;
  hairFlip;
  hairTipColor;
  hairTipX;
  hairTipY;
  hairType;
  hatCommonColor;
  hatFavoriteColor;
  hatSecondaryColor;
  hatTertiaryColor;
  hatType;
  height;
  miicVersion;
  moleScale;
  moleType;
  moleX;
  moleY;
  mouthAspect;
  mouthColor;
  mouthRotate;
  mouthScale;
  mouthType;
  mouthY;
  mustacheScale;
  mustacheType;
  mustacheY;
  nickname;
  noseScale;
  noseType;
  noseY;
  originPlatform;
  outfitType;
  outfitVariant;
  pantsColor;
  personality;
  regionMove;
  shirtColor;
  shoesColor;
  special;
  transferred;
  accePrimaryColor;
  acceSecondaryColor;
  acceTertiaryColor;
  acceVariant;
  reserved_1;
  valid;
  #t;
  #e;
  constructor(e, t) {
    let r;
    if (typeof e === "string") r = decodeHexOrBase64(e);
    else r = e;
    if (((this.#t = r), t !== void 0)) this.#e = t;
    else this.#e = 0;
    this.import(Mii.parseData(r));
  }
  static parseData(e){var __mx=globalThis.__miicHex.split(e);e=__mx.base;
    let t = createDefaultMiicFields(),
      r;
    switch (e.length) {
      case 46:
      case 47:
        ((r = od(48, e)),
          (t = { ...createDefaultMiicFields(), ...STUDIO_DATA_STRUCT.unpack(r) }),
          (t.originPlatform = 5),
          (t.nickname = "Mii"),
          (t.creator = ""));
        break;
      case 74:
      case 76:
        ((r = od(96, e)), (t = a7(Fm.unpack(r))));
        break;
      case 87:
      case 88:
        r = od(88, e);
        let i = SWITCH_CHARINFO_STRUCT.unpack(r);
        var n = new Uint8Array(10);
        (n.set(i.createId.slice(0, 10), 0),
          (i.createId = n),
          (t = { ...t, ...i }),
          t.createId.set(i.createId.slice(0, 10), 0),
          t.authorId.set(i.createId.slice(10), 0),
          (t.creator = ""),
          (t.originPlatform = 4));
        break;
      case 92:
      case 94:
      case 96:
        ((r = od(108, e)), (t = OA(M0.unpack(M0.pack(FFSD_STRUCT.unpack(r))))));
        break;
      case 104:
      case 106:
      case 108:
        ((r = od(108, e)), (t = OA(M0.unpack(r))));
        break;
      case 114:
        ((r = od(123, e)), (t = OA(M0.unpack(M0.pack(FFSD_STRUCT.unpack(r))))));
        break;
      case 122:
      case 123:
      case 124:
      case 125:
      case 126:
      case 128:
      case 132:
      case 134:
      case 135:
      case 138:
      case 140:
        if (((r = od(140, e)), (t = MIIC_STRUCT.unpack(r)), e.length < 140))
          ((t.acceVariant = -1), (t.reserved_1 = -1));
        if (e.length < 138)
          ((t.acceType = -1),
            (t.accePrimaryColor = -1),
            (t.acceSecondaryColor = -1),
            (t.acceTertiaryColor = -1));
        if (e.length < 135 || t.hairTipX == 0 || t.hairTipY == 0)
          ((t.hairTipX = 4), (t.hairTipY = 4));
        if (e.length < 134) t.outfitVariant = -1;
        if (e.length < 130)
          ((t.mouthRotate = 4), (t.hairTipColor = -1), (t.eyeRColor = -1), (t.eyeShine = -1));
        if (e.length < 128) ((t.hatSecondaryColor = -1), (t.hatTertiaryColor = -1));
        if (e.length < 126) t.shoesColor = -1;
        if (e.length < 125) t.outfitType = -1;
        break;
      default:
        throw Error(`Mii data type not supported (${e.length} bytes):

${e.toHex()}`);
    }
    if (t.facePaintColor === 255) t.facePaintColor = -1;
    if (t.hatCommonColor === 255) t.hatCommonColor = -1;
    if (t.hatFavoriteColor === 255) t.hatFavoriteColor = -1;
    if (t.hatType === 255) t.hatType = -1;
    if (t.pantsColor === 255) t.pantsColor = -1;
    if (t.personality === 255) t.personality = -1;
    if (t.shirtColor === 255) t.shirtColor = -1;
    if (t.acceType === 255) t.acceType = -1;
    if (t.acceVariant === 255) t.acceVariant = -1;
    if (t.outfitType === 255) t.outfitType = -1;
    if (t.shoesColor === 255) t.shoesColor = -1;
    if (t.hatSecondaryColor === 255) t.hatSecondaryColor = -1;
    if (t.hatTertiaryColor === 255) t.hatTertiaryColor = -1;
    if (t.hairTipColor === 255) t.hairTipColor = -1;
    if (t.eyeRColor === 255) t.eyeRColor = -1;
    if (t.eyeShine === 255) t.eyeShine = -1;
    if (t.outfitVariant === 255) t.outfitVariant = -1;
    if (t.accePrimaryColor === 255) t.accePrimaryColor = -1;
    if (t.acceSecondaryColor === 255) t.acceSecondaryColor = -1;
    if (t.acceTertiaryColor===255)t.acceTertiaryColor=-1;globalThis.__miicHex.apply(t,__mx.ext,COMMON_COLOR_TABLE,COMMON_COLORS_RGB);return t}
  static parseDataBinary(e) {
    let t = Mii.parseData(e);
    return MIIC_STRUCT.pack(t);
  }
  revert() {
    this.import(Mii.parseData(this.#t));
  }
  #n(e = null) {
    return {
      miicVersion: this.miicVersion,
      originPlatform: this.originPlatform,
      authorId: this.authorId,
      createId: this.createId,
      creator: this.creator,
      nickname: this.nickname,
      beardColor: this.beardColor,
      beardType: this.beardType,
      birthDay: this.birthDay,
      birthMonth: this.birthMonth,
      birthYear: this.birthYear,
      build: this.build,
      outfitType: this.outfitType,
      outfitVariant: this.outfitVariant,
      eyeAspect: this.eyeAspect,
      eyebrowAspect: this.eyebrowAspect,
      eyebrowColor: this.eyebrowColor,
      eyebrowRotate: this.eyebrowRotate,
      eyebrowScale: this.eyebrowScale,
      eyebrowType: this.eyebrowType,
      eyebrowX: this.eyebrowX,
      eyebrowY: this.eyebrowY,
      eyeColor: this.eyeColor,
      eyeRColor: this.eyeRColor,
      eyeRotate: this.eyeRotate,
      eyeScale: this.eyeScale,
      eyeSclera: this.eyeSclera,
      eyeShine: this.eyeShine,
      eyeType: this.eyeType,
      eyeX: this.eyeX,
      eyeY: this.eyeY,
      facelineColor: this.facelineColor,
      facelineMake: this.facelineMake,
      facelineType: this.facelineType,
      facelineWrinkle: this.facelineWrinkle,
      facePaintColor: this.facePaintColor,
      favorite: this.favorite,
      favoriteColor: this.favoriteColor,
      fontRegion: this.fontRegion,
      gender: this.gender,
      glassColor: this.glassColor,
      glassScale: this.glassScale,
      glassType: this.glassType,
      glassY: this.glassY,
      hairColor: this.hairColor,
      hairFlip: this.hairFlip,
      hairTipColor: this.hairTipColor,
      hairTipX: this.hairTipX,
      hairTipY: this.hairTipY,
      hairType: this.hairType,
      hatCommonColor: this.hatCommonColor,
      hatFavoriteColor: this.hatFavoriteColor,
      hatType: this.hatType,
      height: this.height,
      acceType: this.acceType,
      moleScale: this.moleScale,
      moleType: this.moleType,
      moleX: this.moleX,
      moleY: this.moleY,
      mouthAspect: this.mouthAspect,
      mouthColor: this.mouthColor,
      mouthScale: this.mouthScale,
      mouthRotate: this.mouthRotate,
      mouthType: this.mouthType,
      mouthY: this.mouthY,
      mustacheScale: this.mustacheScale,
      mustacheType: this.mustacheType,
      mustacheY: this.mustacheY,
      transferred: this.transferred,
      noseScale: this.noseScale,
      noseType: this.noseType,
      noseY: this.noseY,
      pantsColor: this.pantsColor,
      personality: this.personality,
      regionMove: this.regionMove,
      shirtColor: this.shirtColor,
      shoesColor: this.shoesColor,
      special: this.special,
      hatSecondaryColor: this.hatSecondaryColor,
      hatTertiaryColor: this.hatTertiaryColor,
      accePrimaryColor: this.accePrimaryColor,
      acceSecondaryColor: this.acceSecondaryColor,
      acceTertiaryColor: this.acceTertiaryColor,
      acceVariant: this.acceVariant,
      reserved_1: this.reserved_1,
      ...e,
    };
  }
  #i() {
    if (this.nickname.trim() !== "") return this.nickname;
    else return "A Mii";
  }
  verify() {
    return validateMiiFields(this.#n(), this.#e);
  }
  validate() {
    let e = this.verify();
    if (e.valid === !0) this.valid = !0;
    else
      throw (
        (this.valid = !1),
        Error(`Mii data for ${this.nickname} is not valid: ${e.reasons.join(", ")}`)
      );
  }
  import(e) {
    if (
      ((this.miicVersion = e.miicVersion),
      (this.originPlatform = e.originPlatform),
      (this.authorId = e.authorId),
      (this.createId = e.createId),
      (this.creator = e.creator),
      (this.nickname = e.nickname),
      (this.beardColor = e.beardColor),
      (this.beardType = e.beardType),
      (this.birthDay = e.birthDay),
      (this.birthMonth = e.birthMonth),
      (this.birthYear = e.birthYear),
      (this.build = e.build),
      (this.outfitType = e.outfitType),
      (this.outfitVariant = e.outfitVariant),
      (this.eyeAspect = e.eyeAspect),
      (this.eyebrowAspect = e.eyebrowAspect),
      (this.eyebrowColor = e.eyebrowColor),
      (this.eyebrowRotate = e.eyebrowRotate),
      (this.eyebrowScale = e.eyebrowScale),
      (this.eyebrowType = e.eyebrowType),
      (this.eyebrowX = e.eyebrowX),
      (this.eyebrowY = e.eyebrowY),
      (this.eyeColor = e.eyeColor),
      (this.eyeRotate = e.eyeRotate),
      (this.eyeScale = e.eyeScale),
      (this.eyeSclera = e.eyeSclera),
      (this.eyeType = e.eyeType),
      (this.eyeX = e.eyeX),
      (this.eyeY = e.eyeY),
      (this.facelineColor = e.facelineColor),
      (this.facelineMake = e.facelineMake),
      (this.facelineType = e.facelineType),
      (this.facelineWrinkle = e.facelineWrinkle),
      (this.facePaintColor = e.facePaintColor),
      e.facelineColor > 9)
    )
      ((this.facelineColor = 0), (this.facePaintColor = e.facelineColor - 10));
    if (
      ((this.favorite = e.favorite),
      (this.favoriteColor = e.favoriteColor),
      (this.fontRegion = e.fontRegion),
      (this.gender = e.gender),
      (this.glassColor = e.glassColor),
      (this.glassScale = e.glassScale),
      (this.glassType = e.glassType),
      (this.glassY = e.glassY),
      (this.hairColor = e.hairColor),
      (this.hairFlip = e.hairFlip),
      (this.hairType = e.hairType),
      (this.hatFavoriteColor = e.hatFavoriteColor),
      (this.hatCommonColor = e.hatCommonColor),
      (this.hatType = e.hatType),
      (this.height = e.height),
      (this.acceType = e.acceType),
      (this.moleScale = e.moleScale),
      (this.moleType = e.moleType),
      (this.moleX = e.moleX),
      (this.moleY = e.moleY),
      (this.mouthAspect = e.mouthAspect),
      (this.mouthColor = e.mouthColor),
      (this.mouthScale = e.mouthScale),
      (this.mouthType = e.mouthType),
      (this.mouthY = e.mouthY),
      (this.mustacheScale = e.mustacheScale),
      (this.mustacheType = e.mustacheType),
      (this.mustacheY = e.mustacheY),
      (this.noseScale = e.noseScale),
      (this.noseType = e.noseType),
      (this.noseY = e.noseY),
      (this.pantsColor = e.pantsColor),
      (this.personality = e.personality),
      (this.regionMove = e.regionMove),
      (this.shirtColor = e.shirtColor),
      (this.special = e.special),
      (this.shoesColor = e.shoesColor),
      (this.transferred = e.transferred),
      (this.hatSecondaryColor = e.hatSecondaryColor),
      (this.hatTertiaryColor = e.hatTertiaryColor),
      (this.mouthRotate = e.mouthRotate),
      (this.hairTipColor = e.hairTipColor),
      (this.eyeRColor = e.eyeRColor),
      (this.eyeShine = e.eyeShine),
      (this.hairTipX = e.hairTipX),
      (this.hairTipY = e.hairTipY),
      (this.accePrimaryColor = e.accePrimaryColor),
      (this.acceSecondaryColor = e.acceSecondaryColor),
      (this.acceTertiaryColor = e.acceTertiaryColor),
      (this.acceVariant = e.acceVariant),
      (this.reserved_1 = e.reserved_1),
      this.originPlatform === 2 || this.originPlatform === 3)
    ) {
      let t = CREATE_ID_STRUCT.unpack(this.createId);
      if (!t.flag_normal) this.special = 1;
      if (t.flag_temporary) ((this.special = 0), (this.transferred = 1));
    }
    this.fixInternalIDs();
  }
  export(e = "miic") {
    this.fixInternalIDs();
    var t = null;
    if (e == "studioData")
      t = {
        facelineColor: this.facePaintColor !== -1 ? this.facePaintColor + 10 : this.facelineColor,
        gender: this.gender > 1 ? 0 : this.gender,
      };
    var r = this.#n(t);if(e!=="miic")globalThis.__miicHex.fallback(r,COMMON_COLOR_TABLE,COMMON_COLORS_RGB);
    if (e !== "miic") {
      if (this.mouthType > 35) r.mouthType = 23;
      if (this.eyeType > 59) r.mouthType = 23;
      if (this.height > 127) this.height = 127;
      if (this.build > 127) this.build = 127;
    }
    switch (e) {
      case "rcd":
        return Lv(r, !0).subarray(0, 74);
      case "rsd":
        return Lv(r, !0);
      default:
      case "miic":
        return globalThis.__miicHex.pack(MIIC_STRUCT.pack(r),r,COMMON_COLOR_TABLE,COMMON_COLORS_RGB);
      case "studioData":
        return STUDIO_DATA_STRUCT.pack(r);
      case "switchCharInfo":
        return u7(r);
      case "ffsd":
        return Ov(r, !0);
      case "ffsd_append_miic":
        return Ov(r, !0, !0);
    }
  }
  exportHex(e) {
    let t = this.export(e);
    return bytesToHex(t);
  }
  exportBase64(e) {
    let t = this.export(e);
    return bytesToBase64(t);
  }
  hasExtendedColors() {
    return !1;
  }
  fixInternalIDs() {
    let e = CREATE_ID_STRUCT.unpack(this.createId),
      t = this.authorId,
      r = Array.from(e.base).every((n) => n === 0);
    if (r)
      ((e.base = Om(e.base)),
        (this.createId = CREATE_ID_STRUCT.pack(e)),
        (this.createId[0] = (this.createId[0] & 15) | 208),
        (e = CREATE_ID_STRUCT.unpack(this.createId)));
    if (Array.from(t).every((n) => n === 0)) this.authorId = Om(t);
    if (!r) ((this.createId[0] &= -33), (e = CREATE_ID_STRUCT.unpack(this.createId)));
    this.createId = CREATE_ID_STRUCT.pack(e);
  }
  getShirtColor() {
    return !vl.includes(this.shirtColor)
      ? this.shirtColor !== -1 && this.shirtColor < COMMON_COLORS_RGB.length
        ? COMMON_COLORS_RGB[this.shirtColor]
        : (isAlternatePaletteEnabled() ? getAlternatePaletteRGB() : v0)[this.favoriteColor]
      : v0[this.favoriteColor];
  }
  getShoesColor() {
    return this.shoesColor !== -1 && this.shoesColor < COMMON_COLORS_RGB.length ? COMMON_COLORS_RGB[this.shoesColor] : [1, 1, 1];
  }
  getPantsColor() {
    if (this.pantsColor !== -1 && this.pantsColor < COMMON_COLORS_RGB.length && !vl.includes(this.pantsColor))
      return COMMON_COLORS_RGB[this.pantsColor];
    if (this.outfitType === 53) return [1, 1, 1];
    if (this.special) return q9;
    if (this.transferred) return K9;
    if (this.favorite) return j9;
    return CA;
  }
  getHatPrimaryColor() {
    return this.hatCommonColor !== -1 && this.hatCommonColor < COMMON_COLORS_RGB.length
      ? COMMON_COLORS_RGB[this.hatCommonColor]
      : (isAlternatePaletteEnabled() === !0 ? getAlternatePaletteRGB() : FAVORITE_COLORS_RGB)[
          this.hatFavoriteColor !== -1 ? this.hatFavoriteColor : this.favoriteColor
        ];
  }
  getHatSecondaryColor(e = !1) {
    let t =
      this.hatSecondaryColor !== -1 && this.hatSecondaryColor < COMMON_COLORS_RGB.length
        ? COMMON_COLORS_RGB[this.hatSecondaryColor]
        : id(this.favoriteColor, this.hatFavoriteColor, this.hatCommonColor)[0];
    if (!e) {
      if (
        (this.hatType === 52 ||
          this.hatType === 25 ||
          this.hatType === 29 ||
          this.hatType === 50) &&
        this.hatSecondaryColor === -1
      )
        return [1, 1, 1];
    }
    return t;
  }
  getHatTertiaryColor(e = !1) {
    let t =
      this.hatTertiaryColor !== -1 && this.hatTertiaryColor < COMMON_COLORS_RGB.length
        ? COMMON_COLORS_RGB[this.hatTertiaryColor]
        : id(this.favoriteColor, this.hatFavoriteColor, this.hatCommonColor)[1];
    if (!e) {
      if (this.hatType === 52 && this.hatTertiaryColor === -1) return [0.33, 0.21, 0];
    }
    return t;
  }
  getAccePrimaryColor() {
    return this.accePrimaryColor !== -1 && this.accePrimaryColor > 11
      ? COMMON_COLORS_RGB[this.accePrimaryColor - 11]
      : (isAlternatePaletteEnabled() === !0 ? getAlternatePaletteRGB() : FAVORITE_COLORS_RGB)[
          this.accePrimaryColor !== -1 ? this.accePrimaryColor : this.favoriteColor
        ];
  }
  getAcceSecondaryColor(e = !1) {
    let t = this.accePrimaryColor >= 0 && this.accePrimaryColor <= 11 ? this.accePrimaryColor : -1,
      r = this.accePrimaryColor > 11 ? this.accePrimaryColor - 11 : -1,
      n =
        this.acceSecondaryColor !== -1 && this.acceSecondaryColor < COMMON_COLORS_RGB.length
          ? COMMON_COLORS_RGB[this.acceSecondaryColor]
          : id(this.favoriteColor, t, r)[0];
    if (
      !e &&
      (this.acceType === 8 || this.acceType === 6 || this.acceType === 2 || this.acceType === 1) &&
      this.acceSecondaryColor === -1
    )
      return [1, 1, 1];
    return n;
  }
  getAcceTertiaryColor(e = !1) {
    let t = this.accePrimaryColor >= 0 && this.accePrimaryColor <= 11 ? this.accePrimaryColor : -1,
      r = this.accePrimaryColor > 11 ? this.accePrimaryColor - 11 : -1;
    if (!e && this.acceType === 2 && this.acceTertiaryColor === -1)
      return [0.8627451, 0.8431373, 0.8039216];
    if (!e && this.acceType === 6 && this.acceTertiaryColor === -1) return [0.05, 0.05, 0.05];
    return this.acceTertiaryColor !== -1 && this.acceTertiaryColor < COMMON_COLORS_RGB.length
      ? COMMON_COLORS_RGB[this.acceTertiaryColor]
      : id(this.favoriteColor, t, r)[1];
  }
}
