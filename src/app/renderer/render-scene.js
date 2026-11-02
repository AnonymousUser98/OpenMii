// src/app/renderer/render-scene.js
// MiiRenderScene: offscreen scenes for renders and icons.
//
// Defines: MiiRenderScene, JE
// Uses from other files:
//   app/renderer/mii-model.js: getAdditionalInfo, getSharedRenderer, createMiiModel
//   app/assets/models.js: Dp, getBodyModels, getDefaultBodyModelName
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound
//   app/renderer/three-module.js: getTHREE
//   app/renderer/dispose.js: disposeObject
//   app/shaders/shader-registry.js: getLightSetupForShader
//   app/renderer/ffl-resources.js: getFFLModule
//   app/renderer/animation-controller.js: AnimationController

class MiiRenderScene {
  renderer;
  scene;
  sceneType;
  miiModel;
  miiModel2;
  clock;
  miiStyle;
  cam;
  options;
  constructor(e, t, r) {
    ((this.clock = new Clock()),
      (this.miiStyle = e.gender),
      (this.renderer = getSharedRenderer()),
      (this.scene = new Scene_2()),
      (this.sceneType = t),
      (this.cam = new PerspectiveCamera(15, 1, 50, 15000)),
      this.cam.position.set(0, 50, 900),
      this.cam.lookAt(0, 105, 0),
      (this.options = {
        data: e.export("studioData"),
        additionalInfo: getAdditionalInfo(e),
        drawBody: !0,
        expression: [0, 1],
        module: getFFLModule(),
        renderer: this.renderer,
        type: 0,
        isTemporary: !1,
        shaderType: r,
      }));
  }
  animators = /*@__PURE__*/ new Map();
  bodyModelBase;
  res;
  perform(e = document.body) {
    return new Promise(async (t) => {
      ((this.miiModel = await createMiiModel(this.options)),
        this.renderer.setAnimationLoop(() => {
          let l = this.clock.getDelta();
          (this.animators.forEach((c) => {
            c(l);
          }),
            this.renderer.render(this.scene, this.cam));
        }));
      let r;
      if (e instanceof Html) r = e.elm;
      else r = e;
      (r.appendChild(this.renderer.domElement),
        (this.renderer.domElement.style.pointerEvents = "none"));
      let n = r.getBoundingClientRect();
      (this.renderer.setSize(n.width, n.height, !0),
        this.renderer.setSize(n.width * 2, n.height * 2, !1),
        (this.cam.aspect = n.width / n.height),
        this.cam.updateProjectionMatrix());
      let i = getBodyModels(),
        o = getDefaultBodyModelName();
      if (!i.has(o)) return;
      if (!i.get(o).has(this.miiStyle)) return;
      let s = i.get(o).get(this.miiStyle);
      if (((this.bodyModelBase = s), !s)) return;
      let a = getLightSetupForShader();
      if (a) a(this.scene);
      if (s.unBindPose) s.unBindPose();
      switch (this.sceneType) {
        case 0: {
          let l = () => {
            let u = window.innerWidth / window.innerHeight;
            if (((this.cam.aspect = u), u < 1)) this.cam.fov = 29;
            else if (u < 1.5) this.cam.fov = 20;
            else this.cam.fov = 13;
            (this.cam.updateProjectionMatrix(),
              this.renderer.setSize(window.innerWidth, window.innerHeight));
          };
          ((this.res = l.bind(this)),
            window.addEventListener("resize", this.res),
            l(),
            (this.cam.position.z += 200),
            (this.cam.fov -= 2),
            this.cam.updateProjectionMatrix(),
            (this.miiModel2 = await createMiiModel(this.options)),
            this.miiModel.miiGroup.traverse((u) => {
              let d = u;
              if (!d.isMesh) return;
              if (!d.material) return;
              d.frustumCulled = !1;
            }),
            this.miiModel2.miiGroup.traverse((u) => {
              let d = u;
              if (!d.isMesh) return;
              if (!d.material) return;
              d.frustumCulled = !1;
            }));
          let c = (u, d = this.miiModel) => {
            if (this.miiModel) {
              if (this.miiModel.charModel) this.miiModel.charModel.setExpression(u);
            }
          };
          setTimeout(() => {
            playSound("boing");
            let u = new AnimationController(s, this.miiModel.bodyModel);
            if (this.miiModel.boneScaler)
              this.animators.set("mix", (m) => {
                (u.update(m),
                  this.miiModel.boneScaler.apply(this.miiModel.bodyScale, { x: 1, y: 1, z: 1 }));
              });
            else this.animators.set("mix", u.update.bind(u));
            this.animators.set("head", () => {
              Dp(this.miiModel.miiGroup, getDefaultBodyModelName(), this.miiModel.bodyModel, this.miiModel.headModel);
            });
            let d = new AnimationController(s, this.miiModel2.bodyModel);
            if (this.miiModel2.boneScaler)
              this.animators.set("mix2", (m) => {
                (d.update(m),
                  this.miiModel2.boneScaler.apply(this.miiModel2.bodyScale, { x: 1, y: 1, z: 1 }));
              });
            else
              this.animators.set("mix2", (m) => {
                d.update(m);
              });
            (this.animators.set("head2", () => {
              Dp(this.miiModel2.miiGroup, getDefaultBodyModelName(), this.miiModel2.bodyModel, this.miiModel2.headModel);
            }),
              this.scene.add(this.miiModel.miiGroup),
              this.scene.add(this.miiModel2.miiGroup));
            let h = !1;
            ((this.mixer1 = u), (this.mixer2 = d));
            let f = u.actions.get("SendL");
            if (!f) ((h = !0), (f = u.actions.get("Pose.03")));
            let p = u.actions.get("SendWaitL");
            if (!p) ((h = !0), (p = u.actions.get("Pose.05")));
            let g = d.actions.get("SendR");
            if (!g) ((h = !0), (g = d.actions.get("Pose.04")));
            if (h === !0)
              (this.miiModel.miiGroup.position.set(-70, 0, 0),
                this.miiModel2.miiGroup.position.set(70, 0, 0));
            ((f.clampWhenFinished = !0),
              (g.clampWhenFinished = !0),
              f.setLoop(2200, 1),
              g.setLoop(2200, 1),
              f.play(),
              g.play(),
              setTimeout(() => {
                c(1);
              }, 1333),
              setTimeout(() => {
                if (s.setPose) s.setPose();
                t();
              }, 3000));
          }, 33);
          break;
        }
        case 1: {
          this.miiModel.miiGroup.traverse((c) => {
            let u = c;
            if (!u.isMesh) return;
            if (!u.material) return;
            u.frustumCulled = !1;
          });
          let l = (c) => {
            this.miiModel.charModel.setExpression(c);
          };
          setTimeout(() => {
            playSound("receive");
            let c = new AnimationController(s, this.miiModel.bodyModel);
            if (this.miiModel.boneScaler)
              this.animators.set("mix", (h) => {
                (c.update(h),
                  this.miiModel.boneScaler.apply(this.miiModel.bodyScale, { x: 1, y: 1, z: 1 }));
              });
            else this.animators.set("mix", c.update.bind(c));
            (this.animators.set("head", () => {
              Dp(this.miiModel.miiGroup, getDefaultBodyModelName(), this.miiModel.bodyModel, this.miiModel.headModel);
            }),
              this.scene.add(this.miiModel.miiGroup));
            let u = c.actions.get("Receive");
            if (!u) u = c.actions.get("Pose.03");
            let d = c.actions.get("ReceiveWait");
            if (!d) d = c.actions.get("Pose.05");
            ((u.clampWhenFinished = !0),
              u.setLoop(2200, 1),
              u.play(),
              setTimeout(() => {
                l(1);
              }, 800),
              setTimeout(() => {
                (u.stop(),
                  d.play(),
                  t(),
                  setTimeout(() => {
                    let h = c.actions.get("Wait");
                    if (!h) h = c.actions.get("Pose.01");
                    (d.fadeOut(0.3), h.fadeIn(0.3), l(0));
                  }, 2000));
              }, 1000));
          }, 33);
          break;
        }
      }
    });
  }
  shutdown() {
    if (this.res) window.removeEventListener("resize", this.res);
    if ((this.renderer.setAnimationLoop(null), this.animators.clear(), this.miiModel))
      (this.miiModel.charModel.dispose(),
        disposeObject(this.miiModel.bodyModel),
        disposeObject(this.miiModel.bodyModelBody),
        disposeObject(this.miiModel.bodyModelLegs),
        disposeObject(this.miiModel.headModel),
        disposeObject(this.miiModel.miiGroup),
        cl(this.miiModel, "bodyModel"),
        cl(this.miiModel, "bodyModelBody"),
        cl(this.miiModel, "bodyModelLegs"),
        cl(this.miiModel, "headModel"),
        cl(this.miiModel, "miiGroup"),
        cl(this, "miiModel"));
    if (this.miiModel2)
      (this.miiModel2.charModel.dispose(),
        disposeObject(this.miiModel2.bodyModel),
        disposeObject(this.miiModel2.bodyModelBody),
        disposeObject(this.miiModel2.bodyModelLegs),
        disposeObject(this.miiModel2.headModel),
        disposeObject(this.miiModel2.miiGroup),
        cl(this.miiModel2, "bodyModel"),
        cl(this.miiModel2, "bodyModelBody"),
        cl(this.miiModel2, "bodyModelLegs"),
        cl(this.miiModel2, "headModel"),
        cl(this.miiModel2, "miiGroup"),
        cl(this, "miiModel2"));
    if ((disposeObject(this.scene), this.renderer.renderLists.dispose(), this.bodyModelBase)) {
      if (this.bodyModelBase.unBindPose) this.bodyModelBase.unBindPose();
      if (this.bodyModelBase.setPose) this.bodyModelBase.setPose();
    }
  }
}
var THREE = getTHREE();
var JE = !1;
