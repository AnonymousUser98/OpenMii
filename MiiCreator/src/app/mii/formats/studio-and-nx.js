// src/app/mii/formats/studio-and-nx.js
// Mii Studio data and Switch CharInfo structs.
//
// Defines: OA, SWITCH_CHARINFO_STRUCT, STUDIO_DATA_STRUCT
// Uses from other files:
//   app/mii/colors.js: LEGACY_HAIR_COLOR_TO_COMMON, LEGACY_EYE_COLOR_TO_COMMON,
//                      LEGACY_MOUTH_COLOR_TO_COMMON, LEGACY_GLASS_COLOR_TO_COMMON
//   app/mii/formats/ffsd-miic.js: CREATE_ID_STRUCT, FFSD_STRUCT, createDefaultMiicFields

var structFu = In(Nc(), 1);
var M0 = structFu.default.struct([
  structFu.default.struct([FFSD_STRUCT]),
  structFu.default.uint8("ext_faceline_color"),
  structFu.default.uint8("ext_hair_color"),
  structFu.default.uint8("ext_eye_color"),
  structFu.default.uint8("ext_eyebrow_color"),
  structFu.default.uint8("ext_mouth_color"),
  structFu.default.uint8("ext_beard_color"),
  structFu.default.uint8("ext_glass_color"),
  structFu.default.uint8("ext_glass_type"),
  structFu.default.uint8("ext_hat_type"),
  structFu.default.uint8("ext_hat_color"),
  structFu.default.uint8("ext_face_paint_color"),
  structFu.default.uint8("ext_shirt_color"),
]);
function OA(e) {
  let t = createDefaultMiicFields();
  switch (e.birth_platform) {
    case 0:
      t.originPlatform = 0;
      break;
    case 1:
      t.originPlatform = 1;
      break;
    case 2:
      t.originPlatform = 2;
      break;
    case 3:
      t.originPlatform = 3;
      break;
  }
  if (
    e.ext_beard_color ||
    e.ext_eye_color ||
    e.ext_eyebrow_color ||
    e.ext_face_paint_color ||
    e.ext_faceline_color ||
    e.ext_glass_color ||
    e.ext_glass_type ||
    e.ext_hair_color ||
    e.ext_hat_color ||
    e.ext_hat_type ||
    e.ext_mouth_color ||
    e.ext_shirt_color
  )
    t.originPlatform = 5;
  if (
    ((t.authorId = e.author_id.data),
    (t.beardColor = e.ext_beard_color || LEGACY_HAIR_COLOR_TO_COMMON[e.beard_color]),
    (t.beardType = e.beard_type),
    (t.birthDay = e.birth_day),
    (t.birthMonth = e.birth_month),
    (t.build = e.build),
    (t.createId = CREATE_ID_STRUCT.pack(e.create_id)),
    (t.creator = e.creator),
    (t.eyeAspect = e.eye_aspect),
    (t.eyebrowAspect = e.eyebrow_aspect),
    (t.eyebrowColor = e.ext_eyebrow_color || LEGACY_HAIR_COLOR_TO_COMMON[e.eyebrow_color]),
    (t.eyebrowRotate = e.eyebrow_rotate),
    (t.eyebrowScale = e.eyebrow_scale),
    (t.eyebrowType = e.eyebrow_type),
    (t.eyebrowX = e.eyebrow_x),
    (t.eyebrowY = e.eyebrow_y),
    (t.eyeColor = e.ext_eye_color || LEGACY_EYE_COLOR_TO_COMMON[e.eye_color]),
    (t.eyeRotate = e.eye_rotate),
    (t.eyeScale = e.eye_scale),
    (t.eyeType = e.eye_type),
    (t.eyeX = e.eye_x),
    (t.eyeY = e.eye_y),
    (t.facelineColor = e.face_color),
    (t.facelineMake = e.face_make),
    (t.facelineType = e.face_type),
    (t.facelineWrinkle = e.face_tex),
    (t.facePaintColor = e.ext_face_paint_color - 1 || -1),
    (t.favorite = e.favorite),
    (t.favoriteColor = e.favorite_color),
    (t.fontRegion = e.font_region),
    (t.gender = e.gender),
    (t.glassColor = e.ext_glass_color || LEGACY_GLASS_COLOR_TO_COMMON[e.glasses_color]),
    (t.glassScale = e.glasses_scale),
    (t.glassType = e.ext_glass_type || e.glasses_type),
    (t.glassY = e.glass_y),
    (t.hairColor = e.ext_hair_color || LEGACY_HAIR_COLOR_TO_COMMON[e.hair_color]),
    (t.hairFlip = e.hair_flip),
    (t.hairType = e.hair_type),
    (t.hatFavoriteColor = e.ext_hat_color !== 0 ? e.ext_hat_color - 1 : -1),
    (t.hatType = e.ext_hat_type !== 0 ? e.ext_hat_type - 1 : -1),
    (t.height = e.height),
    (t.moleScale = e.mole_scale),
    (t.moleType = e.mole_type),
    (t.moleX = e.mole_x),
    (t.moleY = e.mole_y),
    (t.mouthAspect = e.mouth_aspect),
    (t.mouthColor = e.ext_mouth_color || LEGACY_MOUTH_COLOR_TO_COMMON[e.mouth_color]),
    (t.mouthScale = e.mouth_scale),
    (t.mouthType = e.mouth_type),
    (t.mouthY = e.mouth_y),
    (t.mustacheScale = e.beard_scale),
    (t.mustacheType = e.mustache_type),
    (t.mustacheY = e.beard_y),
    (t.nickname = e.name),
    (t.noseScale = e.nose_scale),
    (t.noseType = e.nose_type),
    (t.noseY = e.nose_y),
    (t.regionMove = e.region_move),
    e.create_id.flag_temporary !== 0)
  )
    t.special = Number(!e.create_id.flag_normal);
  return ((t.transferred = Number(e.create_id.flag_temporary)), t);
}
var structFu = In(Nc(), 1),
  SWITCH_CHARINFO_STRUCT = structFu.default.struct([
    structFu.default.byte("createId", 16),
    structFu.default.char16le("nickname", 22),
    structFu.default.uint8("fontRegion"),
    structFu.default.uint8("favoriteColor"),
    structFu.default.uint8("gender"),
    structFu.default.uint8("height"),
    structFu.default.uint8("build"),
    structFu.default.uint8("type"),
    structFu.default.uint8("regionMove"),
    structFu.default.uint8("facelineType"),
    structFu.default.uint8("facelineColor"),
    structFu.default.uint8("facelineWrinkle"),
    structFu.default.uint8("facelineMake"),
    structFu.default.uint8("hairType"),
    structFu.default.uint8("hairColor"),
    structFu.default.uint8("hairFlip"),
    structFu.default.uint8("eyeType"),
    structFu.default.uint8("eyeColor"),
    structFu.default.uint8("eyeScale"),
    structFu.default.uint8("eyeAspect"),
    structFu.default.uint8("eyeRotate"),
    structFu.default.uint8("eyeX"),
    structFu.default.uint8("eyeY"),
    structFu.default.uint8("eyebrowType"),
    structFu.default.uint8("eyebrowColor"),
    structFu.default.uint8("eyebrowScale"),
    structFu.default.uint8("eyebrowAspect"),
    structFu.default.uint8("eyebrowRotate"),
    structFu.default.uint8("eyebrowX"),
    structFu.default.uint8("eyebrowY"),
    structFu.default.uint8("noseType"),
    structFu.default.uint8("noseScale"),
    structFu.default.uint8("noseY"),
    structFu.default.uint8("mouthType"),
    structFu.default.uint8("mouthColor"),
    structFu.default.uint8("mouthScale"),
    structFu.default.uint8("mouthAspect"),
    structFu.default.uint8("mouthY"),
    structFu.default.uint8("beardColor"),
    structFu.default.uint8("beardType"),
    structFu.default.uint8("mustacheType"),
    structFu.default.uint8("mustacheScale"),
    structFu.default.uint8("mustacheY"),
    structFu.default.uint8("glassType"),
    structFu.default.uint8("glassColor"),
    structFu.default.uint8("glassScale"),
    structFu.default.uint8("glassY"),
    structFu.default.uint8("moleType"),
    structFu.default.uint8("moleScale"),
    structFu.default.uint8("moleX"),
    structFu.default.uint8("moleY"),
    structFu.default.uint8("reserved"),
  ]);
function u7(e) {
  let t = SWITCH_CHARINFO_STRUCT.unpack(SWITCH_CHARINFO_STRUCT.pack(e));
  for (let r = 0; r < 16; r++) {
    let n = t.createId[r];
    if (r == 8) ((n &= 63), (n |= 128));
    t.createId[r] = n;
  }
  return SWITCH_CHARINFO_STRUCT.pack(t);
}
var structFu = In(Nc(), 1),
  STUDIO_DATA_STRUCT = structFu.default.struct([
    structFu.default.uint8("beardColor"),
    structFu.default.uint8("beardType"),
    structFu.default.uint8("build"),
    structFu.default.uint8("eyeAspect"),
    structFu.default.uint8("eyeColor"),
    structFu.default.uint8("eyeRotate"),
    structFu.default.uint8("eyeScale"),
    structFu.default.uint8("eyeType"),
    structFu.default.uint8("eyeX"),
    structFu.default.uint8("eyeY"),
    structFu.default.uint8("eyebrowAspect"),
    structFu.default.uint8("eyebrowColor"),
    structFu.default.uint8("eyebrowRotate"),
    structFu.default.uint8("eyebrowScale"),
    structFu.default.uint8("eyebrowType"),
    structFu.default.uint8("eyebrowX"),
    structFu.default.uint8("eyebrowY"),
    structFu.default.uint8("facelineColor"),
    structFu.default.uint8("facelineMake"),
    structFu.default.uint8("facelineType"),
    structFu.default.uint8("facelineWrinkle"),
    structFu.default.uint8("favoriteColor"),
    structFu.default.uint8("gender"),
    structFu.default.uint8("glassColor"),
    structFu.default.uint8("glassScale"),
    structFu.default.uint8("glassType"),
    structFu.default.uint8("glassY"),
    structFu.default.uint8("hairColor"),
    structFu.default.uint8("hairFlip"),
    structFu.default.uint8("hairType"),
    structFu.default.uint8("height"),
    structFu.default.uint8("moleScale"),
    structFu.default.uint8("moleType"),
    structFu.default.uint8("moleX"),
    structFu.default.uint8("moleY"),
    structFu.default.uint8("mouthAspect"),
    structFu.default.uint8("mouthColor"),
    structFu.default.uint8("mouthScale"),
    structFu.default.uint8("mouthType"),
    structFu.default.uint8("mouthY"),
    structFu.default.uint8("mustacheScale"),
    structFu.default.uint8("mustacheType"),
    structFu.default.uint8("mustacheY"),
    structFu.default.uint8("noseScale"),
    structFu.default.uint8("noseType"),
    structFu.default.uint8("noseY"),
  ]);
