// src/vendor/three/addons/GLTFLoader.js
// three.js GLTFLoader (loads every .glb model).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

class rg extends Loader_2 {
  constructor(e) {
    super(e);
    ((this.dracoLoader = null),
      (this.ktx2Loader = null),
      (this.meshoptDecoder = null),
      (this.pluginCallbacks = []),
      this.register(function (t) {
        return new dO(t);
      }),
      this.register(function (t) {
        return new hO(t);
      }),
      this.register(function (t) {
        return new _O(t);
      }),
      this.register(function (t) {
        return new vO(t);
      }),
      this.register(function (t) {
        return new CO(t);
      }),
      this.register(function (t) {
        return new pO(t);
      }),
      this.register(function (t) {
        return new mO(t);
      }),
      this.register(function (t) {
        return new gO(t);
      }),
      this.register(function (t) {
        return new AO(t);
      }),
      this.register(function (t) {
        return new uO(t);
      }),
      this.register(function (t) {
        return new yO(t);
      }),
      this.register(function (t) {
        return new fO(t);
      }),
      this.register(function (t) {
        return new bO(t);
      }),
      this.register(function (t) {
        return new xO(t);
      }),
      this.register(function (t) {
        return new lO(t);
      }),
      this.register(function (t) {
        return new wO(t);
      }),
      this.register(function (t) {
        return new TO(t);
      }));
  }
  load(e, t, r, n) {
    let i = this,
      o;
    if (this.resourcePath !== "") o = this.resourcePath;
    else if (this.path !== "") {
      let l = LoaderUtils.extractUrlBase(e);
      o = LoaderUtils.resolveURL(l, this.path);
    } else o = LoaderUtils.extractUrlBase(e);
    this.manager.itemStart(e);
    let s = function (l) {
        if (n) n(l);
        (i.manager.itemError(e), i.manager.itemEnd(e));
      },
      a = new FileLoader(this.manager);
    (a.setPath(this.path),
      a.setResponseType("arraybuffer"),
      a.setRequestHeader(this.requestHeader),
      a.setWithCredentials(this.withCredentials),
      a.load(
        e,
        function (l) {
          try {
            i.parse(
              l,
              o,
              function (c) {
                (t(c), i.manager.itemEnd(e));
              },
              s,
            );
          } catch (c) {
            s(c);
          }
        },
        r,
        s,
      ));
  }
  setDRACOLoader(e) {
    return ((this.dracoLoader = e), this);
  }
  setKTX2Loader(e) {
    return ((this.ktx2Loader = e), this);
  }
  setMeshoptDecoder(e) {
    return ((this.meshoptDecoder = e), this);
  }
  register(e) {
    if (this.pluginCallbacks.indexOf(e) === -1) this.pluginCallbacks.push(e);
    return this;
  }
  unregister(e) {
    if (this.pluginCallbacks.indexOf(e) !== -1)
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1);
    return this;
  }
  parse(e, t, r, n) {
    let i,
      o = {},
      s = {},
      a = /*@__PURE__*/ new TextDecoder();
    if (typeof e === "string") i = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (a.decode(new Uint8Array(e, 0, 4)) === EO) {
        try {
          o[Qr.KHR_BINARY_GLTF] = new SO(e);
        } catch (u) {
          if (n) n(u);
          return;
        }
        i = JSON.parse(o[Qr.KHR_BINARY_GLTF].content);
      } else i = JSON.parse(a.decode(e));
    else i = e;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      if (n) n(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    let l = new LO(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder,
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let c = 0; c < this.pluginCallbacks.length; c++) {
      let u = this.pluginCallbacks[c](l);
      if (!u.name);
      ((s[u.name] = u), (o[u.name] = !0));
    }
    if (i.extensionsUsed)
      for (let c = 0; c < i.extensionsUsed.length; ++c) {
        let u = i.extensionsUsed[c],
          d = i.extensionsRequired || [];
        switch (u) {
          case Qr.KHR_MATERIALS_UNLIT:
            o[u] = new cO();
            break;
          case Qr.KHR_DRACO_MESH_COMPRESSION:
            o[u] = new MO(i, this.dracoLoader);
            break;
          case Qr.KHR_TEXTURE_TRANSFORM:
            o[u] = new IO();
            break;
          case Qr.KHR_MESH_QUANTIZATION:
            o[u] = new RO();
            break;
          default:
            if (d.indexOf(u) >= 0 && s[u] === void 0);
        }
      }
    (l.setExtensions(o), l.setPlugins(s), l.parse(r, n));
  }
  parseAsync(e, t) {
    let r = this;
    return new Promise(function (n, i) {
      r.parse(e, t, n, i);
    });
  }
}
function Fj() {
  let e = {};
  return {
    get: function (t) {
      return e[t];
    },
    add: function (t, r) {
      e[t] = r;
    },
    remove: function (t) {
      delete e[t];
    },
    removeAll: function () {
      e = {};
    },
  };
}
var Qr = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
};
class lO {
  constructor(e) {
    ((this.parser = e),
      (this.name = Qr.KHR_LIGHTS_PUNCTUAL),
      (this.cache = { refs: {}, uses: {} }));
  }
  _markDefs() {
    let e = this.parser,
      t = this.parser.json.nodes || [];
    for (let r = 0, n = t.length; r < n; r++) {
      let i = t[r];
      if (i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0)
        e._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    let t = this.parser,
      r = "light:" + e,
      n = t.cache.get(r);
    if (n) return n;
    let i = t.json,
      a = (((i.extensions && i.extensions[this.name]) || {}).lights || [])[e],
      l,
      c = new Color(16777215);
    if (a.color !== void 0) c.setRGB(a.color[0], a.color[1], a.color[2], LinearSRGBColorSpace);
    let u = a.range !== void 0 ? a.range : 0;
    switch (a.type) {
      case "directional":
        ((l = new DirectionalLight(c)), l.target.position.set(0, 0, -1), l.add(l.target));
        break;
      case "point":
        ((l = new PointLight(c)), (l.distance = u));
        break;
      case "spot":
        ((l = new SpotLight(c)),
          (l.distance = u),
          (a.spot = a.spot || {}),
          (a.spot.innerConeAngle = a.spot.innerConeAngle !== void 0 ? a.spot.innerConeAngle : 0),
          (a.spot.outerConeAngle =
            a.spot.outerConeAngle !== void 0 ? a.spot.outerConeAngle : Math.PI / 4),
          (l.angle = a.spot.outerConeAngle),
          (l.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle),
          l.target.position.set(0, 0, -1),
          l.add(l.target));
        break;
      default:
        throw Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    if ((l.position.set(0, 0, 0), su(l, a), a.intensity !== void 0)) l.intensity = a.intensity;
    return (
      (l.name = t.createUniqueName(a.name || "light_" + e)),
      (n = Promise.resolve(l)),
      t.cache.add(r, n),
      n
    );
  }
  getDependency(e, t) {
    if (e !== "light") return;
    return this._loadLight(t);
  }
  createNodeAttachment(e) {
    let t = this,
      r = this.parser,
      i = r.json.nodes[e],
      s = ((i.extensions && i.extensions[this.name]) || {}).light;
    if (s === void 0) return null;
    return this._loadLight(s).then(function (a) {
      return r._getNodeRef(t.cache, s, a);
    });
  }
}
class cO {
  constructor() {
    this.name = Qr.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(e, t, r) {
    let n = [];
    ((e.color = new Color(1, 1, 1)), (e.opacity = 1));
    let i = t.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        let o = i.baseColorFactor;
        (e.color.setRGB(o[0], o[1], o[2], LinearSRGBColorSpace), (e.opacity = o[3]));
      }
      if (i.baseColorTexture !== void 0) n.push(r.assignTexture(e, "map", i.baseColorTexture, SRGBColorSpace));
    }
    return Promise.all(n);
  }
}
class uO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_EMISSIVE_STRENGTH));
  }
  extendMaterialParams(e, t) {
    let n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = n.extensions[this.name].emissiveStrength;
    if (i !== void 0) t.emissiveIntensity = i;
    return Promise.resolve();
  }
}
class dO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_CLEARCOAT));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (o.clearcoatFactor !== void 0) t.clearcoat = o.clearcoatFactor;
    if (o.clearcoatTexture !== void 0)
      i.push(r.assignTexture(t, "clearcoatMap", o.clearcoatTexture));
    if (o.clearcoatRoughnessFactor !== void 0) t.clearcoatRoughness = o.clearcoatRoughnessFactor;
    if (o.clearcoatRoughnessTexture !== void 0)
      i.push(r.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture));
    if (o.clearcoatNormalTexture !== void 0) {
      if (
        (i.push(r.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)),
        o.clearcoatNormalTexture.scale !== void 0)
      ) {
        let s = o.clearcoatNormalTexture.scale;
        t.clearcoatNormalScale = new Vector2(s, s);
      }
    }
    return Promise.all(i);
  }
}
class hO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_DISPERSION));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = n.extensions[this.name];
    return ((t.dispersion = i.dispersion !== void 0 ? i.dispersion : 0), Promise.resolve());
  }
}
class fO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_IRIDESCENCE));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (o.iridescenceFactor !== void 0) t.iridescence = o.iridescenceFactor;
    if (o.iridescenceTexture !== void 0)
      i.push(r.assignTexture(t, "iridescenceMap", o.iridescenceTexture));
    if (o.iridescenceIor !== void 0) t.iridescenceIOR = o.iridescenceIor;
    if (t.iridescenceThicknessRange === void 0) t.iridescenceThicknessRange = [100, 400];
    if (o.iridescenceThicknessMinimum !== void 0)
      t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum;
    if (o.iridescenceThicknessMaximum !== void 0)
      t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum;
    if (o.iridescenceThicknessTexture !== void 0)
      i.push(r.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture));
    return Promise.all(i);
  }
}
class pO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_SHEEN));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [];
    ((t.sheenColor = new Color(0, 0, 0)), (t.sheenRoughness = 0), (t.sheen = 1));
    let o = n.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      let s = o.sheenColorFactor;
      t.sheenColor.setRGB(s[0], s[1], s[2], LinearSRGBColorSpace);
    }
    if (o.sheenRoughnessFactor !== void 0) t.sheenRoughness = o.sheenRoughnessFactor;
    if (o.sheenColorTexture !== void 0)
      i.push(r.assignTexture(t, "sheenColorMap", o.sheenColorTexture, SRGBColorSpace));
    if (o.sheenRoughnessTexture !== void 0)
      i.push(r.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture));
    return Promise.all(i);
  }
}
class mO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_TRANSMISSION));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (o.transmissionFactor !== void 0) t.transmission = o.transmissionFactor;
    if (o.transmissionTexture !== void 0)
      i.push(r.assignTexture(t, "transmissionMap", o.transmissionTexture));
    return Promise.all(i);
  }
}
class gO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_VOLUME));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (
      ((t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0),
      o.thicknessTexture !== void 0)
    )
      i.push(r.assignTexture(t, "thicknessMap", o.thicknessTexture));
    t.attenuationDistance = o.attenuationDistance || 1 / 0;
    let s = o.attenuationColor || [1, 1, 1];
    return ((t.attenuationColor = new Color().setRGB(s[0], s[1], s[2], LinearSRGBColorSpace)), Promise.all(i));
  }
}
class AO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_IOR));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = n.extensions[this.name];
    return ((t.ior = i.ior !== void 0 ? i.ior : 1.5), Promise.resolve());
  }
}
class yO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_SPECULAR));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (
      ((t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1),
      o.specularTexture !== void 0)
    )
      i.push(r.assignTexture(t, "specularIntensityMap", o.specularTexture));
    let s = o.specularColorFactor || [1, 1, 1];
    if (
      ((t.specularColor = new Color().setRGB(s[0], s[1], s[2], LinearSRGBColorSpace)), o.specularColorTexture !== void 0)
    )
      i.push(r.assignTexture(t, "specularColorMap", o.specularColorTexture, SRGBColorSpace));
    return Promise.all(i);
  }
}
class xO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.EXT_MATERIALS_BUMP));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (((t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1), o.bumpTexture !== void 0))
      i.push(r.assignTexture(t, "bumpMap", o.bumpTexture));
    return Promise.all(i);
  }
}
class bO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_MATERIALS_ANISOTROPY));
  }
  getMaterialType(e) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      o = n.extensions[this.name];
    if (o.anisotropyStrength !== void 0) t.anisotropy = o.anisotropyStrength;
    if (o.anisotropyRotation !== void 0) t.anisotropyRotation = o.anisotropyRotation;
    if (o.anisotropyTexture !== void 0)
      i.push(r.assignTexture(t, "anisotropyMap", o.anisotropyTexture));
    return Promise.all(i);
  }
}
class _O {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.KHR_TEXTURE_BASISU));
  }
  loadTexture(e) {
    let t = this.parser,
      r = t.json,
      n = r.textures[e];
    if (!n.extensions || !n.extensions[this.name]) return null;
    let i = n.extensions[this.name],
      o = t.options.ktx2Loader;
    if (!o)
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
        throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      else return null;
    return t.loadTextureImage(e, i.source, o);
  }
}
class vO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.EXT_TEXTURE_WEBP), (this.isSupported = null));
  }
  loadTexture(e) {
    let t = this.name,
      r = this.parser,
      n = r.json,
      i = n.textures[e];
    if (!i.extensions || !i.extensions[t]) return null;
    let o = i.extensions[t],
      s = n.images[o.source],
      a = r.textureLoader;
    if (s.uri) {
      let l = r.options.manager.getHandler(s.uri);
      if (l !== null) a = l;
    }
    return this.detectSupport().then(function (l) {
      if (l) return r.loadTextureImage(e, o.source, a);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    if (!this.isSupported)
      this.isSupported = new Promise(function (e) {
        let t = new Image();
        ((t.src =
          "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
          (t.onload = t.onerror =
            function () {
              e(t.height === 1);
            }));
      });
    return this.isSupported;
  }
}
class CO {
  constructor(e) {
    ((this.parser = e), (this.name = Qr.EXT_TEXTURE_AVIF), (this.isSupported = null));
  }
  loadTexture(e) {
    let t = this.name,
      r = this.parser,
      n = r.json,
      i = n.textures[e];
    if (!i.extensions || !i.extensions[t]) return null;
    let o = i.extensions[t],
      s = n.images[o.source],
      a = r.textureLoader;
    if (s.uri) {
      let l = r.options.manager.getHandler(s.uri);
      if (l !== null) a = l;
    }
    return this.detectSupport().then(function (l) {
      if (l) return r.loadTextureImage(e, o.source, a);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    if (!this.isSupported)
      this.isSupported = new Promise(function (e) {
        let t = new Image();
        ((t.src =
          "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="),
          (t.onload = t.onerror =
            function () {
              e(t.height === 1);
            }));
      });
    return this.isSupported;
  }
}
class wO {
  constructor(e) {
    ((this.name = Qr.EXT_MESHOPT_COMPRESSION), (this.parser = e));
  }
  loadBufferView(e) {
    let t = this.parser.json,
      r = t.bufferViews[e];
    if (r.extensions && r.extensions[this.name]) {
      let n = r.extensions[this.name],
        i = this.parser.getDependency("buffer", n.buffer),
        o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported)
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw Error(
            "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files",
          );
        else return null;
      return i.then(function (s) {
        let a = n.byteOffset || 0,
          l = n.byteLength || 0,
          { count: c, byteStride: u } = n,
          d = new Uint8Array(s, a, l);
        if (o.decodeGltfBufferAsync)
          return o.decodeGltfBufferAsync(c, u, d, n.mode, n.filter).then(function (h) {
            return h.buffer;
          });
        else
          return o.ready.then(function () {
            let h = new ArrayBuffer(c * u);
            return (o.decodeGltfBuffer(new Uint8Array(h), c, u, d, n.mode, n.filter), h);
          });
      });
    } else return null;
  }
}
class TO {
  constructor(e) {
    ((this.name = Qr.EXT_MESH_GPU_INSTANCING), (this.parser = e));
  }
  createNodeMesh(e) {
    let t = this.parser.json,
      r = t.nodes[e];
    if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0) return null;
    let n = t.meshes[r.mesh];
    for (let l of n.primitives)
      if (
        l.mode !== qa.TRIANGLES &&
        l.mode !== qa.TRIANGLE_STRIP &&
        l.mode !== qa.TRIANGLE_FAN &&
        l.mode !== void 0
      )
        return null;
    let o = r.extensions[this.name].attributes,
      s = [],
      a = {};
    for (let l in o)
      s.push(this.parser.getDependency("accessor", o[l]).then((c) => ((a[l] = c), a[l])));
    if (s.length < 1) return null;
    return (
      s.push(this.parser.createNodeMesh(e)),
      Promise.all(s).then((l) => {
        let c = l.pop(),
          u = c.isGroup ? c.children : [c],
          d = l[0].count,
          h = [];
        for (let f of u) {
          let p = new Matrix4(),
            g = new Vector3(),
            m = new Quaternion(),
            A = new Vector3(1, 1, 1),
            y = new InstancedMesh(f.geometry, f.material, d);
          for (let x = 0; x < d; x++) {
            if (a.TRANSLATION) g.fromBufferAttribute(a.TRANSLATION, x);
            if (a.ROTATION) m.fromBufferAttribute(a.ROTATION, x);
            if (a.SCALE) A.fromBufferAttribute(a.SCALE, x);
            y.setMatrixAt(x, p.compose(g, m, A));
          }
          for (let x in a)
            if (x === "_COLOR_0") {
              let b = a[x];
              y.instanceColor = new InstancedBufferAttribute(b.array, b.itemSize, b.normalized);
            } else if (x !== "TRANSLATION" && x !== "ROTATION" && x !== "SCALE")
              f.geometry.setAttribute(x, a[x]);
          (Object3D.prototype.copy.call(y, f), this.parser.assignFinalMaterial(y), h.push(y));
        }
        if (c.isGroup) return (c.clear(), c.add(...h), c);
        return h[0];
      })
    );
  }
}
var EO = "glTF",
  tg = 12,
  iO = { JSON: 1313821514, BIN: 5130562 };
class SO {
  constructor(e) {
    ((this.name = Qr.KHR_BINARY_GLTF), (this.content = null), (this.body = null));
    let t = new DataView(e, 0, tg),
      r = /*@__PURE__*/ new TextDecoder();
    if (
      ((this.header = {
        magic: r.decode(new Uint8Array(e.slice(0, 4))),
        version: t.getUint32(4, !0),
        length: t.getUint32(8, !0),
      }),
      this.header.magic !== EO)
    )
      throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    else if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
    let n = this.header.length - tg,
      i = new DataView(e, tg),
      o = 0;
    while (o < n) {
      let s = i.getUint32(o, !0);
      o += 4;
      let a = i.getUint32(o, !0);
      if (((o += 4), a === iO.JSON)) {
        let l = new Uint8Array(e, tg + o, s);
        this.content = r.decode(l);
      } else if (a === iO.BIN) {
        let l = tg + o;
        this.body = e.slice(l, l + s);
      }
      o += s;
    }
    if (this.content === null) throw Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class MO {
  constructor(e, t) {
    if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    ((this.name = Qr.KHR_DRACO_MESH_COMPRESSION),
      (this.json = e),
      (this.dracoLoader = t),
      this.dracoLoader.preload());
  }
  decodePrimitive(e, t) {
    let r = this.json,
      n = this.dracoLoader,
      i = e.extensions[this.name].bufferView,
      o = e.extensions[this.name].attributes,
      s = {},
      a = {},
      l = {};
    for (let c in o) {
      let u = rT[c] || c.toLowerCase();
      s[u] = o[c];
    }
    for (let c in e.attributes) {
      let u = rT[c] || c.toLowerCase();
      if (o[c] !== void 0) {
        let d = r.accessors[e.attributes[c]],
          h = Lp[d.componentType];
        ((l[u] = h.name), (a[u] = d.normalized === !0));
      }
    }
    return t.getDependency("bufferView", i).then(function (c) {
      return new Promise(function (u, d) {
        n.decodeDracoFile(
          c,
          function (h) {
            for (let f in h.attributes) {
              let p = h.attributes[f],
                g = a[f];
              if (g !== void 0) p.normalized = g;
            }
            u(h);
          },
          s,
          l,
          LinearSRGBColorSpace,
          d,
        );
      });
    });
  }
}
class IO {
  constructor() {
    this.name = Qr.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    if (
      (t.texCoord === void 0 || t.texCoord === e.channel) &&
      t.offset === void 0 &&
      t.rotation === void 0 &&
      t.scale === void 0
    )
      return e;
    if (((e = e.clone()), t.texCoord !== void 0)) e.channel = t.texCoord;
    if (t.offset !== void 0) e.offset.fromArray(t.offset);
    if (t.rotation !== void 0) e.rotation = t.rotation;
    if (t.scale !== void 0) e.repeat.fromArray(t.scale);
    return ((e.needsUpdate = !0), e);
  }
}
class RO {
  constructor() {
    this.name = Qr.KHR_MESH_QUANTIZATION;
  }
}
class iT extends Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  copySampleValue_(e) {
    let t = this.resultBuffer,
      r = this.sampleValues,
      n = this.valueSize,
      i = e * n * 3 + n;
    for (let o = 0; o !== n; o++) t[o] = r[i + o];
    return t;
  }
  interpolate_(e, t, r, n) {
    let i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      a = s * 2,
      l = s * 3,
      c = n - t,
      u = (r - t) / c,
      d = u * u,
      h = d * u,
      f = e * l,
      p = f - l,
      g = -2 * h + 3 * d,
      m = h - d,
      A = 1 - g,
      y = m - d + u;
    for (let x = 0; x !== s; x++) {
      let b = o[p + x + s],
        v = o[p + x + a] * c,
        _ = o[f + x + s],
        w = o[f + x] * c;
      i[x] = A * b + y * v + g * _ + m * w;
    }
    return i;
  }
}
var Dj = new Quaternion();
class OO extends iT {
  interpolate_(e, t, r, n) {
    let i = super.interpolate_(e, t, r, n);
    return (Dj.fromArray(i).normalize().toArray(i), i);
  }
}
var qa = {
    FLOAT: 5126,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123,
  },
  Lp = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
  },
  oO = { 9728: NearestFilter, 9729: LinearFilter, 9984: NearestMipmapNearestFilter, 9985: LinearMipmapNearestFilter, 9986: NearestMipmapLinearFilter, 9987: LinearMipmapLinearFilter },
  sO = { 33071: ClampToEdgeWrapping, 33648: MirroredRepeatWrapping, 10497: RepeatWrapping },
  Jw = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
  rT = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex",
  },
  _d = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences",
  },
  Nj = { CUBICSPLINE: void 0, LINEAR: InterpolateLinear, STEP: InterpolateDiscrete },
  eT = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
function Pj(e) {
  if (e.DefaultMaterial === void 0)
    e.DefaultMaterial = new MeshStandardMaterial({
      color: 16777215,
      emissive: 0,
      metalness: 1,
      roughness: 1,
      transparent: !1,
      depthTest: !0,
      side: FrontSide,
    });
  return e.DefaultMaterial;
}
function Ef(e, t, r) {
  for (let n in r.extensions)
    if (e[n] === void 0)
      ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
        (t.userData.gltfExtensions[n] = r.extensions[n]));
}
function su(e, t) {
  if (t.extras !== void 0) {
    if (typeof t.extras === "object") Object.assign(e.userData, t.extras);
  }
}
function kj(e, t, r) {
  let n = !1,
    i = !1,
    o = !1;
  for (let c = 0, u = t.length; c < u; c++) {
    let d = t[c];
    if (d.POSITION !== void 0) n = !0;
    if (d.NORMAL !== void 0) i = !0;
    if (d.COLOR_0 !== void 0) o = !0;
    if (n && i && o) break;
  }
  if (!n && !i && !o) return Promise.resolve(e);
  let s = [],
    a = [],
    l = [];
  for (let c = 0, u = t.length; c < u; c++) {
    let d = t[c];
    if (n) {
      let h =
        d.POSITION !== void 0 ? r.getDependency("accessor", d.POSITION) : e.attributes.position;
      s.push(h);
    }
    if (i) {
      let h = d.NORMAL !== void 0 ? r.getDependency("accessor", d.NORMAL) : e.attributes.normal;
      a.push(h);
    }
    if (o) {
      let h = d.COLOR_0 !== void 0 ? r.getDependency("accessor", d.COLOR_0) : e.attributes.color;
      l.push(h);
    }
  }
  return Promise.all([Promise.all(s), Promise.all(a), Promise.all(l)]).then(function (c) {
    let u = c[0],
      d = c[1],
      h = c[2];
    if (n) e.morphAttributes.position = u;
    if (i) e.morphAttributes.normal = d;
    if (o) e.morphAttributes.color = h;
    return ((e.morphTargetsRelative = !0), e);
  });
}
function Uj(e, t) {
  if ((e.updateMorphTargets(), t.weights !== void 0))
    for (let r = 0, n = t.weights.length; r < n; r++) e.morphTargetInfluences[r] = t.weights[r];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    let r = t.extras.targetNames;
    if (e.morphTargetInfluences.length === r.length) {
      e.morphTargetDictionary = {};
      for (let n = 0, i = r.length; n < i; n++) e.morphTargetDictionary[r[n]] = n;
    }
  }
}
function Hj(e) {
  let t,
    r = e.extensions && e.extensions[Qr.KHR_DRACO_MESH_COMPRESSION];
  if (r) t = "draco:" + r.bufferView + ":" + r.indices + ":" + tT(r.attributes);
  else t = e.indices + ":" + tT(e.attributes) + ":" + e.mode;
  if (e.targets !== void 0)
    for (let n = 0, i = e.targets.length; n < i; n++) t += ":" + tT(e.targets[n]);
  return t;
}
function tT(e) {
  let t = "",
    r = Object.keys(e).sort();
  for (let n = 0, i = r.length; n < i; n++) t += r[n] + ":" + e[r[n]] + ";";
  return t;
}
function nT(e) {
  switch (e) {
    case Int8Array:
      return 0.007874015748031496;
    case Uint8Array:
      return 0.00392156862745098;
    case Int16Array:
      return 0.00003051850947599719;
    case Uint16Array:
      return 0.000015259021896696422;
    default:
      throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Gj(e) {
  if (e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
  if (e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0) return "image/webp";
  if (e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0) return "image/ktx2";
  return "image/png";
}
var zj = new Matrix4();
class LO {
  constructor(e = {}, t = {}) {
    ((this.json = e),
      (this.extensions = {}),
      (this.plugins = {}),
      (this.options = t),
      (this.cache = new Fj()),
      (this.associations = /*@__PURE__*/ new Map()),
      (this.primitiveCache = {}),
      (this.nodeCache = {}),
      (this.meshCache = { refs: {}, uses: {} }),
      (this.cameraCache = { refs: {}, uses: {} }),
      (this.lightCache = { refs: {}, uses: {} }),
      (this.sourceCache = {}),
      (this.textureCache = {}),
      (this.nodeNamesUsed = {}));
    let r = !1,
      n = -1,
      i = !1,
      o = -1;
    if (typeof navigator < "u") {
      let s = navigator.userAgent;
      r = /^((?!chrome|android).)*safari/i.test(s) === !0;
      let a = s.match(/Version\/(\d+)/);
      ((n = r && a ? parseInt(a[1], 10) : -1),
        (i = s.indexOf("Firefox") > -1),
        (o = i ? s.match(/Firefox\/([0-9]+)\./)[1] : -1));
    }
    if (typeof createImageBitmap > "u" || (r && n < 17) || (i && o < 98))
      this.textureLoader = new TextureLoader(this.options.manager);
    else this.textureLoader = new ImageBitmapLoader(this.options.manager);
    if (
      (this.textureLoader.setCrossOrigin(this.options.crossOrigin),
      this.textureLoader.setRequestHeader(this.options.requestHeader),
      (this.fileLoader = new FileLoader(this.options.manager)),
      this.fileLoader.setResponseType("arraybuffer"),
      this.options.crossOrigin === "use-credentials")
    )
      this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    let r = this,
      n = this.json,
      i = this.extensions;
    (this.cache.removeAll(),
      (this.nodeCache = {}),
      this._invokeAll(function (o) {
        return o._markDefs && o._markDefs();
      }),
      Promise.all(
        this._invokeAll(function (o) {
          return o.beforeRoot && o.beforeRoot();
        }),
      )
        .then(function () {
          return Promise.all([
            r.getDependencies("scene"),
            r.getDependencies("animation"),
            r.getDependencies("camera"),
          ]);
        })
        .then(function (o) {
          let s = {
            scene: o[0][n.scene || 0],
            scenes: o[0],
            animations: o[1],
            cameras: o[2],
            asset: n.asset,
            parser: r,
            userData: {},
          };
          return (
            Ef(i, s, n),
            su(s, n),
            Promise.all(
              r._invokeAll(function (a) {
                return a.afterRoot && a.afterRoot(s);
              }),
            ).then(function () {
              for (let a of s.scenes) a.updateMatrixWorld();
              e(s);
            })
          );
        })
        .catch(t));
  }
  _markDefs() {
    let e = this.json.nodes || [],
      t = this.json.skins || [],
      r = this.json.meshes || [];
    for (let n = 0, i = t.length; n < i; n++) {
      let o = t[n].joints;
      for (let s = 0, a = o.length; s < a; s++) e[o[s]].isBone = !0;
    }
    for (let n = 0, i = e.length; n < i; n++) {
      let o = e[n];
      if (o.mesh !== void 0) {
        if ((this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0))
          r[o.mesh].isSkinnedMesh = !0;
      }
      if (o.camera !== void 0) this._addNodeRef(this.cameraCache, o.camera);
    }
  }
  _addNodeRef(e, t) {
    if (t === void 0) return;
    if (e.refs[t] === void 0) e.refs[t] = e.uses[t] = 0;
    e.refs[t]++;
  }
  _getNodeRef(e, t, r) {
    if (e.refs[t] <= 1) return r;
    let n = r.clone(),
      i = (o, s) => {
        let a = this.associations.get(o);
        if (a != null) this.associations.set(s, a);
        for (let [l, c] of o.children.entries()) i(c, s.children[l]);
      };
    return (i(r, n), (n.name += "_instance_" + e.uses[t]++), n);
  }
  _invokeOne(e) {
    let t = Object.values(this.plugins);
    t.push(this);
    for (let r = 0; r < t.length; r++) {
      let n = e(t[r]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    let t = Object.values(this.plugins);
    t.unshift(this);
    let r = [];
    for (let n = 0; n < t.length; n++) {
      let i = e(t[n]);
      if (i) r.push(i);
    }
    return r;
  }
  getDependency(e, t) {
    let r = e + ":" + t,
      n = this.cache.get(r);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function (i) {
            return i.loadNode && i.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function (i) {
            return i.loadMesh && i.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function (i) {
            return i.loadBufferView && i.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function (i) {
            return i.loadMaterial && i.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function (i) {
            return i.loadTexture && i.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function (i) {
            return i.loadAnimation && i.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (
            ((n = this._invokeOne(function (i) {
              return i != this && i.getDependency && i.getDependency(e, t);
            })),
            !n)
          )
            throw Error("Unknown type: " + e);
          break;
      }
      this.cache.add(r, n);
    }
    return n;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      let r = this,
        n = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      ((t = Promise.all(
        n.map(function (i, o) {
          return r.getDependency(e, o);
        }),
      )),
        this.cache.add(e, t));
    }
    return t;
  }
  loadBuffer(e) {
    let t = this.json.buffers[e],
      r = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[Qr.KHR_BINARY_GLTF].body);
    let n = this.options;
    return new Promise(function (i, o) {
      r.load(LoaderUtils.resolveURL(t.uri, n.path), i, void 0, function () {
        o(Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    let t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function (r) {
      let n = t.byteLength || 0,
        i = t.byteOffset || 0;
      return r.slice(i, i + n);
    });
  }
  loadAccessor(e) {
    let t = this,
      r = this.json,
      n = this.json.accessors[e];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      let o = Jw[n.type],
        s = Lp[n.componentType],
        a = n.normalized === !0,
        l = new s(n.count * o);
      return Promise.resolve(new BufferAttribute(l, o, a));
    }
    let i = [];
    if (n.bufferView !== void 0) i.push(this.getDependency("bufferView", n.bufferView));
    else i.push(null);
    if (n.sparse !== void 0)
      (i.push(this.getDependency("bufferView", n.sparse.indices.bufferView)),
        i.push(this.getDependency("bufferView", n.sparse.values.bufferView)));
    return Promise.all(i).then(function (o) {
      let s = o[0],
        a = Jw[n.type],
        l = Lp[n.componentType],
        c = l.BYTES_PER_ELEMENT,
        u = c * a,
        d = n.byteOffset || 0,
        h = n.bufferView !== void 0 ? r.bufferViews[n.bufferView].byteStride : void 0,
        f = n.normalized === !0,
        p,
        g;
      if (h && h !== u) {
        let m = Math.floor(d / h),
          A = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + m + ":" + n.count,
          y = t.cache.get(A);
        if (!y)
          ((p = new l(s, m * h, (n.count * h) / c)), (y = new InterleavedBuffer(p, h / c)), t.cache.add(A, y));
        g = new InterleavedBufferAttribute(y, a, (d % h) / c, f);
      } else {
        if (s === null) p = new l(n.count * a);
        else p = new l(s, d, n.count * a);
        g = new BufferAttribute(p, a, f);
      }
      if (n.sparse !== void 0) {
        let m = Jw.SCALAR,
          A = Lp[n.sparse.indices.componentType],
          y = n.sparse.indices.byteOffset || 0,
          x = n.sparse.values.byteOffset || 0,
          b = new A(o[1], y, n.sparse.count * m),
          v = new l(o[2], x, n.sparse.count * a);
        if (s !== null) g = new BufferAttribute(g.array.slice(), g.itemSize, g.normalized);
        g.normalized = !1;
        for (let _ = 0, w = b.length; _ < w; _++) {
          let S = b[_];
          if ((g.setX(S, v[_ * a]), a >= 2)) g.setY(S, v[_ * a + 1]);
          if (a >= 3) g.setZ(S, v[_ * a + 2]);
          if (a >= 4) g.setW(S, v[_ * a + 3]);
          if (a >= 5)
            throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        g.normalized = f;
      }
      return g;
    });
  }
  loadTexture(e) {
    let t = this.json,
      r = this.options,
      i = t.textures[e].source,
      o = t.images[i],
      s = this.textureLoader;
    if (o.uri) {
      let a = r.manager.getHandler(o.uri);
      if (a !== null) s = a;
    }
    return this.loadTextureImage(e, i, s);
  }
  loadTextureImage(e, t, r) {
    let n = this,
      i = this.json,
      o = i.textures[e],
      s = i.images[t],
      a = (s.uri || s.bufferView) + ":" + o.sampler;
    if (this.textureCache[a]) return this.textureCache[a];
    let l = this.loadImageSource(t, r)
      .then(function (c) {
        if (
          ((c.flipY = !1),
          (c.name = o.name || s.name || ""),
          c.name === "" && typeof s.uri === "string" && s.uri.startsWith("data:image/") === !1)
        )
          c.name = s.uri;
        let d = (i.samplers || {})[o.sampler] || {};
        return (
          (c.magFilter = oO[d.magFilter] || LinearFilter),
          (c.minFilter = oO[d.minFilter] || LinearMipmapLinearFilter),
          (c.wrapS = sO[d.wrapS] || RepeatWrapping),
          (c.wrapT = sO[d.wrapT] || RepeatWrapping),
          (c.generateMipmaps = !c.isCompressedTexture && c.minFilter !== NearestFilter && c.minFilter !== LinearFilter),
          n.associations.set(c, { textures: e }),
          c
        );
      })
      .catch(function () {
        return null;
      });
    return ((this.textureCache[a] = l), l);
  }
  loadImageSource(e, t) {
    let r = this,
      n = this.json,
      i = this.options;
    if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((u) => u.clone());
    let o = n.images[e],
      s = self.URL || self.webkitURL,
      a = o.uri || "",
      l = !1;
    if (o.bufferView !== void 0)
      a = r.getDependency("bufferView", o.bufferView).then(function (u) {
        l = !0;
        let d = new Blob([u], { type: o.mimeType });
        return ((a = s.createObjectURL(d)), a);
      });
    else if (o.uri === void 0)
      throw Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    let c = Promise.resolve(a)
      .then(function (u) {
        return new Promise(function (d, h) {
          let f = d;
          if (t.isImageBitmapLoader === !0)
            f = function (p) {
              let g = new Texture(p);
              ((g.needsUpdate = !0), d(g));
            };
          t.load(LoaderUtils.resolveURL(u, i.path), f, void 0, h);
        });
      })
      .then(function (u) {
        if (l === !0) s.revokeObjectURL(a);
        return (su(u, o), (u.userData.mimeType = o.mimeType || Gj(o.uri)), u);
      })
      .catch(function (u) {
        throw u;
      });
    return ((this.sourceCache[e] = c), c);
  }
  assignTexture(e, t, r, n) {
    let i = this;
    return this.getDependency("texture", r.index).then(function (o) {
      if (!o) return null;
      if (r.texCoord !== void 0 && r.texCoord > 0) ((o = o.clone()), (o.channel = r.texCoord));
      if (i.extensions[Qr.KHR_TEXTURE_TRANSFORM]) {
        let s = r.extensions !== void 0 ? r.extensions[Qr.KHR_TEXTURE_TRANSFORM] : void 0;
        if (s) {
          let a = i.associations.get(o);
          ((o = i.extensions[Qr.KHR_TEXTURE_TRANSFORM].extendTexture(o, s)),
            i.associations.set(o, a));
        }
      }
      if (n !== void 0) o.colorSpace = n;
      return ((e[t] = o), o);
    });
  }
  assignFinalMaterial(e) {
    let { geometry: t, material: r } = e,
      n = t.attributes.tangent === void 0,
      i = t.attributes.color !== void 0,
      o = t.attributes.normal === void 0;
    if (e.isPoints) {
      let s = "PointsMaterial:" + r.uuid,
        a = this.cache.get(s);
      if (!a)
        ((a = new PointsMaterial()),
          Material.prototype.copy.call(a, r),
          a.color.copy(r.color),
          (a.map = r.map),
          (a.sizeAttenuation = !1),
          this.cache.add(s, a));
      r = a;
    } else if (e.isLine) {
      let s = "LineBasicMaterial:" + r.uuid,
        a = this.cache.get(s);
      if (!a)
        ((a = new LineBasicMaterial()),
          Material.prototype.copy.call(a, r),
          a.color.copy(r.color),
          (a.map = r.map),
          this.cache.add(s, a));
      r = a;
    }
    if (n || i || o) {
      let s = "ClonedMaterial:" + r.uuid + ":";
      if (n) s += "derivative-tangents:";
      if (i) s += "vertex-colors:";
      if (o) s += "flat-shading:";
      let a = this.cache.get(s);
      if (!a) {
        if (((a = r.clone()), i)) a.vertexColors = !0;
        if (o) a.flatShading = !0;
        if (n) {
          if (a.normalScale) a.normalScale.y *= -1;
          if (a.clearcoatNormalScale) a.clearcoatNormalScale.y *= -1;
        }
        (this.cache.add(s, a), this.associations.set(a, this.associations.get(r)));
      }
      r = a;
    }
    e.material = r;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  loadMaterial(e) {
    let t = this,
      r = this.json,
      n = this.extensions,
      i = r.materials[e],
      o,
      s = {},
      a = i.extensions || {},
      l = [];
    if (a[Qr.KHR_MATERIALS_UNLIT]) {
      let u = n[Qr.KHR_MATERIALS_UNLIT];
      ((o = u.getMaterialType()), l.push(u.extendParams(s, i, t)));
    } else {
      let u = i.pbrMetallicRoughness || {};
      if (((s.color = new Color(1, 1, 1)), (s.opacity = 1), Array.isArray(u.baseColorFactor))) {
        let d = u.baseColorFactor;
        (s.color.setRGB(d[0], d[1], d[2], LinearSRGBColorSpace), (s.opacity = d[3]));
      }
      if (u.baseColorTexture !== void 0) l.push(t.assignTexture(s, "map", u.baseColorTexture, SRGBColorSpace));
      if (
        ((s.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1),
        (s.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1),
        u.metallicRoughnessTexture !== void 0)
      )
        (l.push(t.assignTexture(s, "metalnessMap", u.metallicRoughnessTexture)),
          l.push(t.assignTexture(s, "roughnessMap", u.metallicRoughnessTexture)));
      ((o = this._invokeOne(function (d) {
        return d.getMaterialType && d.getMaterialType(e);
      })),
        l.push(
          Promise.all(
            this._invokeAll(function (d) {
              return d.extendMaterialParams && d.extendMaterialParams(e, s);
            }),
          ),
        ));
    }
    if (i.doubleSided === !0) s.side = DoubleSide;
    let c = i.alphaMode || eT.OPAQUE;
    if (c === eT.BLEND) ((s.transparent = !0), (s.depthWrite = !1));
    else if (((s.transparent = !1), c === eT.MASK))
      s.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5;
    if (i.normalTexture !== void 0 && o !== MeshBasicMaterial) {
      if (
        (l.push(t.assignTexture(s, "normalMap", i.normalTexture)),
        (s.normalScale = new Vector2(1, 1)),
        i.normalTexture.scale !== void 0)
      ) {
        let u = i.normalTexture.scale;
        s.normalScale.set(u, u);
      }
    }
    if (i.occlusionTexture !== void 0 && o !== MeshBasicMaterial) {
      if (
        (l.push(t.assignTexture(s, "aoMap", i.occlusionTexture)),
        i.occlusionTexture.strength !== void 0)
      )
        s.aoMapIntensity = i.occlusionTexture.strength;
    }
    if (i.emissiveFactor !== void 0 && o !== MeshBasicMaterial) {
      let u = i.emissiveFactor;
      s.emissive = new Color().setRGB(u[0], u[1], u[2], LinearSRGBColorSpace);
    }
    if (i.emissiveTexture !== void 0 && o !== MeshBasicMaterial)
      l.push(t.assignTexture(s, "emissiveMap", i.emissiveTexture, SRGBColorSpace));
    return Promise.all(l).then(function () {
      let u = new o(s);
      if (i.name) u.name = i.name;
      if ((su(u, i), t.associations.set(u, { materials: e }), i.extensions)) Ef(n, u, i);
      return u;
    });
  }
  createUniqueName(e) {
    let t = PropertyBinding.sanitizeNodeName(e || "");
    if (t in this.nodeNamesUsed) return t + "_" + ++this.nodeNamesUsed[t];
    else return ((this.nodeNamesUsed[t] = 0), t);
  }
  loadGeometries(e) {
    let t = this,
      r = this.extensions,
      n = this.primitiveCache;
    function i(s) {
      return r[Qr.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s, t).then(function (a) {
        return aO(a, s, t);
      });
    }
    let o = [];
    for (let s = 0, a = e.length; s < a; s++) {
      let l = e[s],
        c = Hj(l),
        u = n[c];
      if (u) o.push(u.promise);
      else {
        let d;
        if (l.extensions && l.extensions[Qr.KHR_DRACO_MESH_COMPRESSION]) d = i(l);
        else d = aO(new BufferGeometry(), l, t);
        ((n[c] = { primitive: l, promise: d }), o.push(d));
      }
    }
    return Promise.all(o);
  }
  loadMesh(e) {
    let t = this,
      r = this.json,
      n = this.extensions,
      i = r.meshes[e],
      o = i.primitives,
      s = [];
    for (let a = 0, l = o.length; a < l; a++) {
      let c =
        o[a].material === void 0 ? Pj(this.cache) : this.getDependency("material", o[a].material);
      s.push(c);
    }
    return (
      s.push(t.loadGeometries(o)),
      Promise.all(s).then(function (a) {
        let l = a.slice(0, a.length - 1),
          c = a[a.length - 1],
          u = [];
        for (let h = 0, f = c.length; h < f; h++) {
          let p = c[h],
            g = o[h],
            m,
            A = l[h];
          if (
            g.mode === qa.TRIANGLES ||
            g.mode === qa.TRIANGLE_STRIP ||
            g.mode === qa.TRIANGLE_FAN ||
            g.mode === void 0
          ) {
            if (
              ((m = i.isSkinnedMesh === !0 ? new SkinnedMesh(p, A) : new Mesh(p, A)), m.isSkinnedMesh === !0)
            )
              m.normalizeSkinWeights();
            if (g.mode === qa.TRIANGLE_STRIP) m.geometry = $w(m.geometry, TriangleStripDrawMode);
            else if (g.mode === qa.TRIANGLE_FAN) m.geometry = $w(m.geometry, TriangleFanDrawMode);
          } else if (g.mode === qa.LINES) m = new LineSegments(p, A);
          else if (g.mode === qa.LINE_STRIP) m = new Line(p, A);
          else if (g.mode === qa.LINE_LOOP) m = new LineLoop(p, A);
          else if (g.mode === qa.POINTS) m = new Points(p, A);
          else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + g.mode);
          if (Object.keys(m.geometry.morphAttributes).length > 0) Uj(m, i);
          if (((m.name = t.createUniqueName(i.name || "mesh_" + e)), su(m, i), g.extensions))
            Ef(n, m, g);
          (t.assignFinalMaterial(m), u.push(m));
        }
        for (let h = 0, f = u.length; h < f; h++)
          t.associations.set(u[h], { meshes: e, primitives: h });
        if (u.length === 1) {
          if (i.extensions) Ef(n, u[0], i);
          return u[0];
        }
        let d = new Group();
        if (i.extensions) Ef(n, d, i);
        t.associations.set(d, { meshes: e });
        for (let h = 0, f = u.length; h < f; h++) d.add(u[h]);
        return d;
      })
    );
  }
  loadCamera(e) {
    let t,
      r = this.json.cameras[e],
      n = r[r.type];
    if (!n) return;
    if (r.type === "perspective")
      t = new PerspectiveCamera(MathUtils.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2000000);
    else if (r.type === "orthographic")
      t = new OrthographicCamera(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar);
    if (r.name) t.name = this.createUniqueName(r.name);
    return (su(t, r), Promise.resolve(t));
  }
  loadSkin(e) {
    let t = this.json.skins[e],
      r = [];
    for (let n = 0, i = t.joints.length; n < i; n++) r.push(this._loadNodeShallow(t.joints[n]));
    if (t.inverseBindMatrices !== void 0)
      r.push(this.getDependency("accessor", t.inverseBindMatrices));
    else r.push(null);
    return Promise.all(r).then(function (n) {
      let i = n.pop(),
        o = n,
        s = [],
        a = [];
      for (let l = 0, c = o.length; l < c; l++) {
        let u = o[l];
        if (u) {
          s.push(u);
          let d = new Matrix4();
          if (i !== null) d.fromArray(i.array, l * 16);
          a.push(d);
        }
      }
      return new Skeleton(s, a);
    });
  }
  loadAnimation(e) {
    let t = this.json,
      r = this,
      n = t.animations[e],
      i = n.name ? n.name : "animation_" + e,
      o = [],
      s = [],
      a = [],
      l = [],
      c = [];
    for (let u = 0, d = n.channels.length; u < d; u++) {
      let h = n.channels[u],
        f = n.samplers[h.sampler],
        p = h.target,
        g = p.node,
        m = n.parameters !== void 0 ? n.parameters[f.input] : f.input,
        A = n.parameters !== void 0 ? n.parameters[f.output] : f.output;
      if (p.node === void 0) continue;
      (o.push(this.getDependency("node", g)),
        s.push(this.getDependency("accessor", m)),
        a.push(this.getDependency("accessor", A)),
        l.push(f),
        c.push(p));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(s),
      Promise.all(a),
      Promise.all(l),
      Promise.all(c),
    ]).then(function (u) {
      let d = u[0],
        h = u[1],
        f = u[2],
        p = u[3],
        g = u[4],
        m = [];
      for (let A = 0, y = d.length; A < y; A++) {
        let x = d[A],
          b = h[A],
          v = f[A],
          _ = p[A],
          w = g[A];
        if (x === void 0) continue;
        if (x.updateMatrix) x.updateMatrix();
        let S = r._createAnimationTracks(x, b, v, _, w);
        if (S) for (let E = 0; E < S.length; E++) m.push(S[E]);
      }
      return new AnimationClip(i, void 0, m);
    });
  }
  createNodeMesh(e) {
    let t = this.json,
      r = this,
      n = t.nodes[e];
    if (n.mesh === void 0) return null;
    return r.getDependency("mesh", n.mesh).then(function (i) {
      let o = r._getNodeRef(r.meshCache, n.mesh, i);
      if (n.weights !== void 0)
        o.traverse(function (s) {
          if (!s.isMesh) return;
          for (let a = 0, l = n.weights.length; a < l; a++)
            s.morphTargetInfluences[a] = n.weights[a];
        });
      return o;
    });
  }
  loadNode(e) {
    let t = this.json,
      r = this,
      n = t.nodes[e],
      i = r._loadNodeShallow(e),
      o = [],
      s = n.children || [];
    for (let l = 0, c = s.length; l < c; l++) o.push(r.getDependency("node", s[l]));
    let a = n.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", n.skin);
    return Promise.all([i, Promise.all(o), a]).then(function (l) {
      let c = l[0],
        u = l[1],
        d = l[2];
      if (d !== null)
        c.traverse(function (h) {
          if (!h.isSkinnedMesh) return;
          h.bind(d, zj);
        });
      for (let h = 0, f = u.length; h < f; h++) c.add(u[h]);
      return c;
    });
  }
  _loadNodeShallow(e) {
    let t = this.json,
      r = this.extensions,
      n = this;
    if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
    let i = t.nodes[e],
      o = i.name ? n.createUniqueName(i.name) : "",
      s = [],
      a = n._invokeOne(function (l) {
        return l.createNodeMesh && l.createNodeMesh(e);
      });
    if (a) s.push(a);
    if (i.camera !== void 0)
      s.push(
        n.getDependency("camera", i.camera).then(function (l) {
          return n._getNodeRef(n.cameraCache, i.camera, l);
        }),
      );
    return (
      n
        ._invokeAll(function (l) {
          return l.createNodeAttachment && l.createNodeAttachment(e);
        })
        .forEach(function (l) {
          s.push(l);
        }),
      (this.nodeCache[e] = Promise.all(s).then(function (l) {
        let c;
        if (i.isBone === !0) c = new Bone();
        else if (l.length > 1) c = new Group();
        else if (l.length === 1) c = l[0];
        else c = new Object3D();
        if (c !== l[0]) for (let u = 0, d = l.length; u < d; u++) c.add(l[u]);
        if (i.name) ((c.userData.name = i.name), (c.name = o));
        if ((su(c, i), i.extensions)) Ef(r, c, i);
        if (i.matrix !== void 0) {
          let u = new Matrix4();
          (u.fromArray(i.matrix), c.applyMatrix4(u));
        } else {
          if (i.translation !== void 0) c.position.fromArray(i.translation);
          if (i.rotation !== void 0) c.quaternion.fromArray(i.rotation);
          if (i.scale !== void 0) c.scale.fromArray(i.scale);
        }
        if (!n.associations.has(c)) n.associations.set(c, {});
        return ((n.associations.get(c).nodes = e), c);
      })),
      this.nodeCache[e]
    );
  }
  loadScene(e) {
    let t = this.extensions,
      r = this.json.scenes[e],
      n = this,
      i = new Group();
    if (r.name) i.name = n.createUniqueName(r.name);
    if ((su(i, r), r.extensions)) Ef(t, i, r);
    let o = r.nodes || [],
      s = [];
    for (let a = 0, l = o.length; a < l; a++) s.push(n.getDependency("node", o[a]));
    return Promise.all(s).then(function (a) {
      for (let c = 0, u = a.length; c < u; c++) i.add(a[c]);
      let l = (c) => {
        let u = /*@__PURE__*/ new Map();
        for (let [d, h] of n.associations) if (d instanceof Material || d instanceof Texture) u.set(d, h);
        return (
          c.traverse((d) => {
            let h = n.associations.get(d);
            if (h != null) u.set(d, h);
          }),
          u
        );
      };
      return ((n.associations = l(i)), i);
    });
  }
  _createAnimationTracks(e, t, r, n, i) {
    let o = [],
      s = e.name ? e.name : e.uuid,
      a = [];
    if (_d[i.path] === _d.weights)
      e.traverse(function (d) {
        if (d.morphTargetInfluences) a.push(d.name ? d.name : d.uuid);
      });
    else a.push(s);
    let l;
    switch (_d[i.path]) {
      case _d.weights:
        l = NumberKeyframeTrack;
        break;
      case _d.rotation:
        l = QuaternionKeyframeTrack;
        break;
      case _d.position:
      case _d.scale:
        l = VectorKeyframeTrack;
        break;
      default:
        switch (r.itemSize) {
          case 1:
            l = NumberKeyframeTrack;
            break;
          case 2:
          case 3:
          default:
            l = VectorKeyframeTrack;
            break;
        }
        break;
    }
    let c = n.interpolation !== void 0 ? Nj[n.interpolation] : InterpolateLinear,
      u = this._getArrayFromAccessor(r);
    for (let d = 0, h = a.length; d < h; d++) {
      let f = new l(a[d] + "." + _d[i.path], t.array, u, c);
      if (n.interpolation === "CUBICSPLINE") this._createCubicSplineTrackInterpolant(f);
      o.push(f);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      let r = nT(t.constructor),
        n = new Float32Array(t.length);
      for (let i = 0, o = t.length; i < o; i++) n[i] = t[i] * r;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    ((e.createInterpolant = function (r) {
      return new (this instanceof QuaternionKeyframeTrack ? OO : iT)(
        this.times,
        this.values,
        this.getValueSize() / 3,
        r,
      );
    }),
      (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0));
  }
}
function Vj(e, t, r) {
  let n = t.attributes,
    i = new Box3();
  if (n.POSITION !== void 0) {
    let a = r.json.accessors[n.POSITION],
      { min: l, max: c } = a;
    if (l !== void 0 && c !== void 0) {
      if ((i.set(new Vector3(l[0], l[1], l[2]), new Vector3(c[0], c[1], c[2])), a.normalized)) {
        let u = nT(Lp[a.componentType]);
        (i.min.multiplyScalar(u), i.max.multiplyScalar(u));
      }
    } else return;
  } else return;
  let o = t.targets;
  if (o !== void 0) {
    let a = new Vector3(),
      l = new Vector3();
    for (let c = 0, u = o.length; c < u; c++) {
      let d = o[c];
      if (d.POSITION !== void 0) {
        let h = r.json.accessors[d.POSITION],
          { min: f, max: p } = h;
        if (f !== void 0 && p !== void 0) {
          if (
            (l.setX(Math.max(Math.abs(f[0]), Math.abs(p[0]))),
            l.setY(Math.max(Math.abs(f[1]), Math.abs(p[1]))),
            l.setZ(Math.max(Math.abs(f[2]), Math.abs(p[2]))),
            h.normalized)
          ) {
            let g = nT(Lp[h.componentType]);
            l.multiplyScalar(g);
          }
          a.max(l);
        }
      }
    }
    i.expandByVector(a);
  }
  e.boundingBox = i;
  let s = new Sphere();
  (i.getCenter(s.center), (s.radius = i.min.distanceTo(i.max) / 2), (e.boundingSphere = s));
}
function aO(e, t, r) {
  let n = t.attributes,
    i = [];
  function o(s, a) {
    return r.getDependency("accessor", s).then(function (l) {
      e.setAttribute(a, l);
    });
  }
  for (let s in n) {
    let a = rT[s] || s.toLowerCase();
    if (a in e.attributes) continue;
    i.push(o(n[s], a));
  }
  if (t.indices !== void 0 && !e.index) {
    let s = r.getDependency("accessor", t.indices).then(function (a) {
      e.setIndex(a);
    });
    i.push(s);
  }
  if (ColorManagement.workingColorSpace !== LinearSRGBColorSpace && "COLOR_0" in n);
  return (
    su(e, t),
    Vj(e, t, r),
    Promise.all(i).then(function () {
      return t.targets !== void 0 ? kj(e, t.targets, r) : e;
    })
  );
}
