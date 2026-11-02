// src/app/renderer/mii-model.js
// createMiiModel(): builds the full 3D Mii (head + body + hat + accessory).
//
// Defines: getAdditionalInfo, sharedRenderer, ktx2Loader, getSharedRenderer, getKTX2Loader,
//          createMiiModel
// Uses from other files:
//   app/renderer/texture-compositing.js: applyHatTextureFilter, applyAccessoryTextureFilter, TL,
//                                        cg, dx, hx, ML, IL, RL
//   app/assets/models.js: Dp, getBodyModels, getHatModels, getHatTextures, getAccessoryModels,
//                         getAccessoryTextures, getDefaultBodyModelName, getOutfitTextureCache
//   app/renderer/cameras.js: PT, ViewType, getCameraForViewType, UT, HT
//   app/shaders/shader-registry.js: FL, shaderUsesFFLParams, getShaderMaterialClass,
//                                   getLightSetupForShader
//   app/mii/colors.js: FAVORITE_COLORS_RGB, COMMON_COLORS_RGB, vl
//   app/renderer/outfits.js: loadOutfitTextures, px, isGhostMii
//   app/items/item-lists.js: HAT_MODEL_INFO, OUTFIT_CODES
//   app/settings/palette-flags.js: isAlternatePaletteEnabled
//   app/items/accessory-model-info.js: ACCESSORY_MODEL_INFO
//   app/mii/formats/charinfo.js: S0
//   app/util/colors-and-bytes.js: decodeHexOrBase64
//   app/mii/mii.js: Mii
//   … and 5 more files

var getAdditionalInfo = (e) => ({
    outfitType: e.outfitType,
    eyeSclera: e.eyeSclera,
    favorite: e.favorite,
    gender: e.gender,
    hatCommonColor: e.hatCommonColor,
    hatFavoriteColor: e.hatFavoriteColor,
    hatSecondaryColor: e.hatSecondaryColor,
    hatTertiaryColor: e.hatTertiaryColor,
    hatType: e.hatType,
    pantsColor: e.pantsColor,
    shirtColor: e.shirtColor,
    shoesColor: e.shoesColor,
    special: e.special,
    transferred: e.transferred,
    facePaintColor: e.facePaintColor,
    bodyType: -1,
    personality: e.personality,
    favoriteColor: e.favoriteColor,
    hairTipColor: e.hairTipColor,
    eyeRColor: e.eyeRColor,
    mouthRotate: e.mouthRotate,
    eyeShine: e.eyeShine,
    outfitVariant: e.outfitVariant,
    hairTipX: e.hairTipX,
    hairTipY: e.hairTipY,
    hairColor: e.hairColor,
    hairType: e.hairType,
    acceType: e.acceType,
    accePrimaryColor: e.accePrimaryColor,
    acceSecondaryColor: e.acceSecondaryColor,
    acceTertiaryColor: e.acceTertiaryColor,
    acceVariant: e.acceVariant,
  }),
  THREE = getTHREE(),
  sharedRenderer = new THREE.WebGLRenderer({ alpha: !0, antialias: !1, stencil: !1 }),
  ktx2Loader = new ba();
ktx2Loader.setTranscoderPath("/dist/");
ktx2Loader.detectSupport(sharedRenderer);
var getSharedRenderer = () => sharedRenderer,
  getKTX2Loader = () => ktx2Loader;
async function createMiiModel(e) {
  let t;
  if (typeof e.data === "string") t = decodeHexOrBase64(e.data);
  else t = e.data;
  let r = new THREE.Scene(),
    n = e.isTemporary !== !1,
    i = new Mii(t),
    o = nanoid();
  try {
    if (e.additionalInfo) {
      for (let F in e.additionalInfo) if (F in i) i[F] = e.additionalInfo[F];
    }
  } catch (F) {}
  if (e.additionalInfo) {
    if (e.drawBody) {
      if (Object.keys(getOutfitTextureCache()).length !== 0)
        await loadOutfitTextures({
          bodyType: getDefaultBodyModelName(),
          clothesTextures: getOutfitTextureCache(),
          gender: i.gender,
          outfitType: e.additionalInfo.outfitType,
          outfitVariant: e.additionalInfo.outfitVariant,
        });
    }
  }
  let s = 0;
  if (e.additionalInfo.hatType !== -1)
    switch (HAT_MODEL_INFO[e.additionalInfo.hatType].mdlType) {
      case 1:
        s = 2;
        break;
      case 2:
        s = 3;
        break;
      case 6:
        ((i.hairType = 30), (t = i.export("studioData")));
        break;
      case 5:
        break;
    }
  let a = e.additionalInfo.personality === 24 ? "miitomo" : e.shaderType,
    l = getShaderMaterialClass(a),
    c = e.forceModulate !== void 0 || shaderUsesFFLParams(e.shaderType),
    u = getLightSetupForShader(e.shaderType);
  if (u) u(r);
  let d = e.texResolution || 512,
    h = 512,
    f = 512;
  if (e.size) {
    if (e.size > 512) d = 1024;
    else if (e.size > 1024) d = 2048;
    ((h = e.size), (f = e.size));
  }
  if (e.width) h = e.width;
  if (e.height) f = e.height;
  let p = [];
  if (Array.isArray(e.expression)) p.push(...e.expression);
  else p.push(isNaN(e.expression) ? 0 : e.expression);
  let g = {};
  if (
    "isToonShader" in l.prototype ||
    "isSwitchShader" in l.prototype ||
    "isMiitomoShader" in l.prototype ||
    "useHairTip" in l.prototype
  )
    g.additionalInfo = e.additionalInfo;
  let m = { ...g },
    A = () => (isGhostMii(l, e.additionalInfo) ? { applyGhost: !0 } : {});
  if (e.for3DExport === void 0) {
    if (e.additionalInfo.personality === 24)
      ((m = { ...m, ...A() }), (m.additionalInfo.applyGhost = A().applyGhost));
  }
  let y;
  if (
    ((y =
      e.charModel ||
      (await e.module.createFace(i, e.renderer, null, d || 512, l, s, e.expression, !1, m))),
    e.charModel !== void 0)
  ) {
    if (!y.reusableTextures) y.reusableTextures = /*@__PURE__*/ new Map();
    if (!Array.isArray(e.expression) && Array.isArray(e.charModel.expressions)) {
      if (e.charModel.expressions.includes(e.expression) || e.expression === 0) {
        if (typeof y.setExpression < "u") y.setExpression(e.expression);
        switch (e.expression) {
          case 49:
          case 51:
            y.meshes.traverse((F) => {
              if (F.isMesh !== !0) return;
              let te = F,
                he = te.geometry.userData.modulateType;
              if (he === 2 || he === 7) te.visible = !1;
              else te.visible = !0;
            });
            break;
          case 61:
            y.meshes.traverse((F) => {
              if (F.isMesh !== !0) return;
              let te = F,
                he = te.geometry.userData.modulateType;
              if (he === 6 || he === 2 || he === 7) te.visible = !1;
              else te.visible = !0;
            });
            break;
          default:
            y.meshes.traverse((F) => {
              if (F.isMesh !== !0) return;
              let te = F;
              te.visible = !0;
            });
            break;
        }
      }
    }
    if (e.forceUpdateShaderMaterials) FL(y.meshes, e.shaderType || "wiiu", y, e.data);
  }
  self.eyeScleraHack = !1;
  let x, b;
  if (n) ((x = r), (b = new THREE.Group()), x.add(b));
  else ((x = new THREE.Group()), (b = new THREE.Group()));
  b.name = "headModel";
  let v = e.additionalInfo.gender,
    _ = y.getBodyScale(),
    w = null;
  if (e.additionalInfo.hatType !== -1) {
    let F = [0, 0, 0];
    if (n) w = getHatModels()[e.additionalInfo.hatType];
    else w = getHatModels()[e.additionalInfo.hatType].clone(!0);
    if (
      ((F = FAVORITE_COLORS_RGB[i.favoriteColor % Object.keys(FAVORITE_COLORS_RGB).length]), e.additionalInfo.hatFavoriteColor !== -1)
    )
      F = FAVORITE_COLORS_RGB[e.additionalInfo.hatFavoriteColor];
    if (e.additionalInfo.hatCommonColor !== -1) F = COMMON_COLORS_RGB[e.additionalInfo.hatCommonColor];
    w.traverse((he) => {
      let re = he;
      if (re.isMesh) {
        let le = getHatTextures()[e.additionalInfo.hatType].get(he.name);
        if (!le) return;
        let ue = HAT_MODEL_INFO[e.additionalInfo.hatType].texType,
          I = c ? { modulateType: 5, modulateMode: S0(ue) } : {};
        if (
          ((re.geometry.userData.doNotDequantize = 1),
          (re.geometry.userData.modulateType = 5),
          (re.geometry.userData.modulateMode = S0(ue)),
          "isSwitchShader" in l.prototype || "isMiitomoShader" in l.prototype)
        ) {
          if (
            ((I.charInfo = y.charInfo),
            (I.additionalInfo = e.additionalInfo),
            e.for3DExport === void 0)
          )
            Object.assign(I, A());
        }
        let N = re.name === "HairColor";
        if (!N)
          switch (ue) {
            case 0:
            case 1: {
              let Y = Oo(new THREE.Color(...F), 5, l),
                P = le,
                H = !1;
              if (e.textureBake)
                ((P = TL(le, new THREE.Vector4(Y.r, Y.g, Y.b, 1), e.textureRenderer || e.renderer)),
                  (H = !0));
              (applyHatTextureFilter(e, P),
                (he.material = new l({ ...I, color: H ? 16777215 : Y, opacity: 1, map: P })),
                (he.geometry.userData.modulateColor = Y.toArray()));
              break;
            }
            case 2: {
              ((i.hatFavoriteColor = e.additionalInfo.hatFavoriteColor),
                (i.hatCommonColor = e.additionalInfo.hatCommonColor),
                (i.hatSecondaryColor = e.additionalInfo.hatSecondaryColor),
                (i.hatTertiaryColor = e.additionalInfo.hatTertiaryColor));
              let Y = le,
                P = !1,
                H = new THREE.Color(...i.getHatPrimaryColor()),
                W = new THREE.Color(...i.getHatSecondaryColor()),
                V = new THREE.Color(...i.getHatTertiaryColor());
              if (e.textureBake)
                ((Y = cg(
                  le,
                  new THREE.Vector4(...i.getHatPrimaryColor(), 1),
                  new THREE.Vector4(...i.getHatSecondaryColor(), 1),
                  new THREE.Vector4(...i.getHatTertiaryColor(), 1),
                  new THREE.Vector4(0, 0, 0, 1),
                  e.textureRenderer || e.renderer,
                )),
                  (P = !0));
              (applyHatTextureFilter(e, Y),
                (he.material = new l({
                  ...I,
                  modulateMode: 2,
                  color: P ? 16777215 : [H, W, V],
                  opacity: 1,
                  map: Y,
                })),
                (he.geometry.userData.modulateColor = [1, 1, 1, 1]));
              break;
            }
          }
        if (HAT_MODEL_INFO[e.additionalInfo.hatType].hatPos?.[e.additionalInfo.hairType]) {
          let Y = HAT_MODEL_INFO[e.additionalInfo.hatType].hatPos[e.additionalInfo.hairType];
          (he.position.set(Y.t[0], Y.t[1], Y.t[2]),
            he.rotation.set(
              Y.r[0] * THREE.MathUtils.DEG2RAD,
              Y.r[1] * THREE.MathUtils.DEG2RAD,
              Y.r[2] * THREE.MathUtils.DEG2RAD,
            ),
            he.scale.set(Y.s[0], Y.s[1], Y.s[2]));
        }
        if (N) {
          let Y;
          if (i.hairType !== 30) {
            if (
              ((re.geometry.userData.modulateType = 4),
              (re.geometry.userData.modulateMode = 0),
              (re.geometry.userData.modulateColor = [...COMMON_COLOR_TABLE[e.additionalInfo.hairColor], 1]),
              (I.modulateType = 4),
              (I.modulateMode = 0),
              (Y = new THREE.Color(...COMMON_COLOR_TABLE[e.additionalInfo.hairColor])),
              isAlternatePaletteEnabled())
            )
              Y = Oo(Y, 4);
          } else if (
            ((Y = y.facelineColor),
            (re.geometry.userData.modulateType = 0),
            (re.geometry.userData.modulateMode = 0),
            (re.geometry.userData.modulateColor = [Y.r, Y.g, Y.b, 1]),
            (I.modulateType = 0),
            (I.modulateMode = 0),
            isAlternatePaletteEnabled())
          )
            Y = Oo(Y, 0);
          he.material = new l({
            ...I,
            color: Y,
            opacity: 1,
            map: le,
            additionalInfo: e.additionalInfo,
            charInfo: y.charInfo,
          });
          let P = he.material;
          if (e.additionalInfo.hairTipColor !== -1) {
            let H = e.additionalInfo.hairTipColor,
              W = new THREE.Vector3(...COMMON_COLOR_TABLE[H]);
            if (((W.w = H), (P.hairTipColor = W), P.uniforms)) {
              if (!P.uniforms.u_useHairTip) P.uniforms.u_useHairTip = { value: !0 };
              P.uniforms.u_useHairTip.value = !0;
            }
            ((P.hairTipX = e.additionalInfo.hairTipX), (P.hairTipY = e.additionalInfo.hairTipY));
          } else if (i.hairType === 30)
            ((P.modulateType = 0), (P.modulateMode = 0), (P.color = y.facelineColor));
          if (HAT_MODEL_INFO[e.additionalInfo.hatType].hcFix && e.additionalInfo.hairType === 30)
            he.material.visible = !1;
        }
      }
    });
    let te = y.partsTransform.hatTranslate;
    if ((w.position.setScalar(0), w.scale.setScalar(1), i.hairFlip)) w.scale.set(-1, 1, 1);
    switch (HAT_MODEL_INFO[e.additionalInfo.hatType].mdlType) {
      case 1:
      case 0:
      case 2:
      case 6: {
        w.position.add(te);
        break;
      }
      case 5: {
        let he = y.partsTransform.headTopTranslate;
        ((w.position.y += he.y), w.position.add(te));
        break;
      }
    }
  }
  let S;
  if (!n) S = y.meshes.clone();
  else S = y.meshes;
  if ((b.add(S), w)) b.add(w);
  let E;
  if (n)
    if (e.getCamera) E = e.getCamera();
    else E = getCameraForViewType(e.type, e.width, e.height, _.y);
  if (e.splitMode !== void 0 && e.splitMode !== 0) {
    if (((E = getCameraForViewType(ViewType.MakeIcon)), e.splitMode === 1)) E.far = 600;
    else if (e.splitMode === 2) E.near = 600;
    if (e.splitNear !== void 0) E.near = e.splitNear;
    if (e.splitFar !== void 0) E.far = e.splitFar;
    E.updateProjectionMatrix();
  }
  if (e.drawTypeOnly !== void 0)
    S.traverse((F) => {
      if (!F.isMesh) return;
      let te = F;
      if (te.geometry.userData.modulateType !== e.drawTypeOnly) te.visible = !1;
    });
  let T, M, C, R, B, L, k, z;
  if (b !== void 0) x.add(b);
  let X = "default";
  if (e.additionalInfo.bodyType !== void 0) {
    if (((X = PT[e.additionalInfo.bodyType === -1 ? 0 : e.additionalInfo.bodyType]), !getBodyModels().has(X)))
      X = "default";
  }
  if (e.bodyModelType !== void 0) {
    if (((X = e.bodyModelType), !getBodyModels().has(X))) X = "default";
  }
  let G = X === "default" ? getDefaultBodyModelName() : X,
    Q;
  if (getBodyModels().get(G)) {
    if (e.drawBody && getBodyModels().get(G).has(0) !== null) {
      switch (v) {
        case 0: {
          if (n) T = getBodyModels().get(G).get(0).model.scene;
          else if (e.for3DExportClone) T = Sf(getBodyModels().get(G).get(0).model.scene.clone());
          else T = Sf(getBodyModels().get(G).get(0).model.scene);
          if (T === null) throw "Tried to make an icon before body models were loaded.";
          if (
            ((M = T.getObjectByName("body_m")),
            (C = T.getObjectByName("hands_m")),
            (R = T.getObjectByName("legs_m")),
            !n)
          )
            B = getBodyModels().get(X).has(-1)
              ? getBodyModels().get(X).get(-1).model.animations
              : getBodyModels().get(X).get(0).model.animations;
          ((L = getBodyModels().get(X).get(0).setPose), (k = getBodyModels().get(X).get(0).unBindPose));
          break;
        }
        case 1: {
          if (n) T = getBodyModels().get(X).get(1).model.scene;
          else if (e.for3DExportClone) T = Sf(getBodyModels().get(X).get(1).model.scene);
          else T = Sf(getBodyModels().get(X).get(1).model.scene);
          if (T === null) throw "Tried to make an icon before body models were loaded.";
          if (
            ((M = T.getObjectByName("body_f")),
            (C = T.getObjectByName("hands_f")),
            (R = T.getObjectByName("legs_f")),
            !n)
          )
            B = getBodyModels().get(X).has(-1)
              ? getBodyModels().get(X).get(-1).model.animations
              : getBodyModels().get(X).get(1).model.animations;
          ((L = getBodyModels().get(X).get(1).setPose), (k = getBodyModels().get(X).get(1).unBindPose));
          break;
        }
        default:
          throw Error(`Gender ${v} is outside range 0-1`);
      }
      if (((T.visible = !0), T.material)) T.material.visible = !0;
      if (e.pose !== void 0) {
        if (e.pose === "t") k();
        else if (L) L(e.pose);
      } else {
        let re = "Pose.01",
          le = 0;
        if (G === "miitomo") {
          if (e.additionalInfo) {
            if (e.additionalInfo.personality) {
              if (e.additionalInfo.personality === 24) ((re = "GWait"), (le = 0.83));
            }
          }
        }
        if (L) L(re, le);
      }
      let F = typeof e.ignoreBodyScale < "u",
        te = !0;
      if (F) {
        if (e.ignoreBodyScale) te = !1;
      }
      (T.position.set(0, 0, 0), x.add(T));
      var oe = i.getShirtColor();
      if (e.additionalInfo.shirtColor !== -1 && !vl.includes(e.additionalInfo.shirtColor))
        oe = COMMON_COLORS_RGB[e.additionalInfo.shirtColor];
      let he = c ? { modulateType: 9, modulateMode: 0 } : {};
      if ("isSwitchShader" in l.prototype || "isMiitomoShader" in l.prototype) {
        if (
          ((he.charInfo = y.charInfo),
          (he.additionalInfo = e.additionalInfo),
          e.for3DExport === void 0)
        )
          Object.assign(he, A());
      }
      if (((M.material = new l({ ...he, color: new THREE.Color(...oe), opacity: 1 })), C))
        C.material = M.material;
      for (let re in e.additionalInfo) i[re] = e.additionalInfo[re];
      var K = i.getPantsColor(),
        ae = i.getShoesColor();
      if (e.additionalInfo.pantsColor !== -1 && !vl.includes(e.additionalInfo.pantsColor))
        K = COMMON_COLORS_RGB[e.additionalInfo.pantsColor];
      if (e.additionalInfo.shoesColor !== -1 && !vl.includes(e.additionalInfo.shoesColor))
        ae = COMMON_COLORS_RGB[e.additionalInfo.shoesColor];
      if (
        ((he = c ? { modulateType: 10, modulateMode: 0 } : {}),
        "isSwitchShader" in l.prototype || "isMiitomoShader" in l.prototype)
      ) {
        if (
          ((he.charInfo = y.charInfo),
          (he.additionalInfo = e.additionalInfo),
          e.for3DExport === void 0)
        )
          Object.assign(he, A());
      }
      if (R) R.material = new l({ ...he, color: new THREE.Color(...K), opacity: 1 });
      if (
        ((THREE.ColorManagement.enabled = !1),
        e.additionalInfo.outfitType !== void 0 &&
          e.additionalInfo.outfitType !== -1 &&
          e.lowQuality !== !0 &&
          G === "miitomo" &&
          e.additionalInfo.outfitType < OUTFIT_CODES.length)
      )
        (T.traverse((re) => {
          let le = re;
          if (le.isMesh !== !0) return;
          le.geometry.userData.modulateType = 10;
        }),
          px({
            gender: i.gender,
            outfitType: e.additionalInfo.outfitType,
            outfitVariant:
              e.additionalInfo.outfitVariant !== void 0 ? e.additionalInfo.outfitVariant : -1,
            renderer: e.textureRenderer || e.renderer,
            bodyModel: G,
            shirtColor: oe,
            pantsColor: K,
            shoesColor: ae,
            facelineColor: y.facelineColor,
            clothesTextures: getOutfitTextureCache(),
            nBody: M,
            nLegs: R,
            bodyGroup: T,
            originalMaterial: l,
            originalMaterialName: a,
            texResolution: d,
            charInfo: y.charInfo,
            reusableTextures: y.reusableTextures !== void 0 ? y.reusableTextures : void 0,
            additionalInfo: e.additionalInfo,
            forceModulate: e.forceModulate,
            allowGhost: e.for3DExport === void 0,
            bake: typeof e.textureBake > "u" ? !1 : !0,
            groupName: o,
          }));
      else {
        if (
          (T.traverse((re) => {
            if (re.isMesh !== !0) return;
            re.visible = !1;
          }),
          M)
        )
          M.visible = !0;
        if (R) R.visible = !0;
      }
      if (
        (T.traverse((re) => {
          re.frustumCulled = !1;
        }),
        e.bodyModelType !== void 0 ||
          G === "switch" ||
          G === "miitomo" ||
          G === "wiiu" ||
          G === "wii" ||
          G === "streetpass")
      ) {
        if (
          ((Q = new BoneScaler(
            M,
            { headBoneName: "head", sklRootName: "skl_root" },
            e.lowQuality !== void 0 ? "stp" : e.bodyModelTypeOverride || e.bodyModelType || G,
          )),
          te)
        )
          Q.apply(_, { x: 1, y: 1, z: 1 }, e.for3DExport !== void 0);
        else Q.apply({ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 1 }, e.for3DExport !== void 0);
        T.scale.setScalar(7);
      } else
        ((Q = new BoneScaler(M, { headBoneName: "head", sklRootName: "skl_root" })),
          Q.apply({ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 1 }),
          T.scale.set(_.x * 7, _.y * 7, _.z * 7));
      if (e.lowQuality !== !0) Dp(x, X === "default" ? getDefaultBodyModelName() : X, T, b);
      else b.position.set(0, _.y * 75, 0);
      if (e.for3DExport && X === "miitomo") {
        if (e.lowQuality !== !0) {
          if (e.additionalInfo.acceType > -1) {
            let re = getAccessoryModels()[e.additionalInfo.acceType];
            z = dx(T, re, {
              type: e.additionalInfo.acceType,
              variant: e.additionalInfo.acceVariant,
              bodyType: X,
              nameTag: o,
            });
            let le = 0;
            switch (ACCESSORY_MODEL_INFO[e.additionalInfo.acceType].texType) {
              case 0:
                le = 1;
                break;
              case 1:
                le = 5;
                break;
              case 2:
                le = 2;
                break;
            }
            let ue = new (getTHREE().Color)(...i.getAccePrimaryColor()),
              I = new (getTHREE().Color)(...i.getAcceSecondaryColor()),
              N = new (getTHREE().Color)(...i.getAcceTertiaryColor());
            if (
              (z.traverse((Y) => {
                if (Y.isMesh) {
                  if (!getAccessoryTextures()[e.additionalInfo.acceType]) return;
                  let H = getAccessoryTextures()[e.additionalInfo.acceType].get(Y.name),
                    W = !1;
                  if (e.textureBake)
                    ((H = cg(
                      H,
                      new THREE.Vector4(...i.getAccePrimaryColor(), 1),
                      new THREE.Vector4(...i.getAcceSecondaryColor(), 1),
                      new THREE.Vector4(...i.getAcceTertiaryColor(), 1),
                      new THREE.Vector4(0, 0, 0, 1),
                      e.textureRenderer || e.renderer,
                    )),
                      (W = !0));
                  (applyAccessoryTextureFilter(e, H),
                    (Y.material = new l({
                      modulateMode: le,
                      modulateType: 10,
                      color: W ? 16777215 : [ue, I, N],
                      map: H,
                      additionalInfo: e.additionalInfo,
                      charInfo: y.charInfo,
                    })),
                    (Y.geometry.userData.modulateColor = [1, 1, 1, 1]));
                }
              }),
              T.updateMatrixWorld(!0),
              z.traverse((Y) => {
                if (Y.isSkinnedMesh && Y.skeleton) Y.skeleton.update();
              }),
              Q)
            )
              if (te) Q.apply(_, { x: 1, y: 1, z: 1 }, e.for3DExport !== void 0);
              else Q.apply({ x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: 1 }, e.for3DExport !== void 0);
          }
        }
      }
      if (n)
        switch (e.type) {
          case ViewType.Face:
          case ViewType.MakeIcon:
          case ViewType.IconFovy45:
          case ViewType.CreditIcon:
          case ViewType.VariableIconBody:
            E.position.y += _.y * 76;
        }
      if (e.lowQuality === !0)
        if (C) C.visible = !1;
        else
          (T.getObjectByName("handLPs").scale.setScalar(3),
            T.getObjectByName("handRPs").scale.setScalar(3));
    }
  }
  if (((sharedRenderer.outputColorSpace = THREE.LinearSRGBColorSpace), n)) {
    let F = function (le) {
        if (le) le.dispose();
        if (e.charModel === void 0) y.dispose();
        if (e.drawBody) {
          if (M) M.material.dispose();
          if (R) R.material.dispose();
          hx(T, o);
        }
        if (w)
          w.traverse((ue) => {
            if (!ue.isMesh) return;
            if ((ue.geometry.dispose(), ue.material.dispose(), ue.material.map))
              ue.material.map.dispose();
          });
      },
      re = function () {
        if (e.for3DExport === void 0) {
          if (e.pose !== void 0 && e.drawBody === !0) {
            if (L) L("Pose.01");
          }
        }
      },
      te = "blob";
    if (e.responseType) te = e.responseType;
    let he;
    switch (te) {
      case "blob": {
        (e.renderer.setClearColor(0), e.renderer.setClearAlpha(0), e.renderer.clear());
        var Z = UT(x, E, e.renderer, h, f);
        he = () => {
          let le = HT(Z, e.renderer);
          return (re(), e.renderer.clear(), F(Z), le);
        };
        break;
      }
      case "dataURL": {
        (e.renderer.setClearColor(0), e.renderer.setClearAlpha(0), e.renderer.clear());
        var Z = UT(x, E, e.renderer, h, f);
        he = () => {
          let ue = HT(Z, e.renderer, !1, !1);
          return (re(), e.renderer.clear(), F(Z), ue);
        };
        break;
      }
      case "canvas": {
        if (e.canvas === void 0)
          throw Error("Canvas response type specified, but no canvas given.");
        he = () => {
          let le = IL(sharedRenderer);
          (sharedRenderer.setRenderTarget(null), sharedRenderer.setSize(h, f, !1), sharedRenderer.render(x, E), re());
          let ue = e.canvas;
          return ((ue = ML(sharedRenderer, e.canvas)), F(), RL(le, sharedRenderer), ue);
        };
        break;
      }
      default:
        throw Error("Response type specified but is invalid.");
    }
    if (e.preferPromise !== void 0 && e.preferPromise === !0)
      return new Promise((le) => {
        setTimeout(() => {
          le(he());
        }, 0);
      });
    return he();
  } else
    return {
      bodyModel: T,
      bodyModelBody: M,
      bodyModelHands: C,
      bodyModelLegs: R,
      charModel: y,
      headModel: b,
      hatModel: w,
      miiGroup: x,
      boneScaler: Q,
      bodyScale: _,
      bodyModelAnimations: B,
      bodyModelSetPose: L,
      bodyModelUnBindPose: k,
    };
}
