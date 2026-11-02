// src/app/renderer/ffl/resource-reader.js
// FFLResourceReader: reads FFLResHigh/Middle/Low.dat (parts, textures, shapes).
//
// Defines: FFLResourceReader
// Uses from other files:
//   app/assets/models.js: getPublicRoot

var structFu = In(Nc(), 1),
  rK = 12;
var fL = "ARFF",
  nK = "FFRA",
  iK = 38809056,
  oK = 3,
  pL = 2216628391;
class FFLResourceReader {
  #t;
  #e;
  #n;
  #i;
  u16;
  u32;
  f32;
  ResourcePartsInfo;
  ResourceTextureHeader;
  ResourceTextureFooter;
  ResourceShapeHeader;
  Vec3;
  FacelineTransform;
  HairTransform;
  BoundingBox;
  ShapeDataHeader;
  ResourceHeader;
  Header;
  constructor(e) {
    if (
      ((this.#t = e),
      (this.#i = String.fromCharCode(...new Uint8Array(this.#t).subarray(0, 4))),
      !(this.#i == fL || this.#i == nK))
    )
      throw Error("❌" + " Magic not valid");
    this.#e = this.#i === fL;
    let n = new DataView(this.#t).getUint32(rK, this.#e);
    if (((this.#n = n === iK), this.#n === !1)) {
      if (n >> 29 === oK) this.#n = !0;
    }
    ((this.u16 = this.#e ? structFu.default.uint16le : structFu.default.uint16),
      (this.u32 = this.#e ? structFu.default.uint32le : structFu.default.uint32),
      (this.f32 = this.#e ? structFu.default.float32le : structFu.default.float32),
      (this.ResourcePartsInfo = structFu.default.struct([
        this.u32("dataPosition"),
        this.u32("dataSize"),
        this.u32("compressSize"),
        structFu.default.uint8("compressLevel"),
        structFu.default.uint8("windowBits"),
        structFu.default.uint8("memoryLevel"),
        structFu.default.uint8("strategy"),
      ])),
      (this.ResourceTextureHeader = structFu.default.struct([
        this.u32("partsMaxSize", 11),
        structFu.default.struct("beard", [this.ResourcePartsInfo], 3),
        structFu.default.struct("cap", [this.ResourcePartsInfo], 132),
        structFu.default.struct("eye", [this.ResourcePartsInfo], this.#n ? 80 : 62),
        structFu.default.struct("eyebrow", [this.ResourcePartsInfo], this.#n ? 28 : 24),
        structFu.default.struct("faceline", [this.ResourcePartsInfo], 12),
        structFu.default.struct("faceMakeup", [this.ResourcePartsInfo], 12),
        structFu.default.struct("glass", [this.ResourcePartsInfo], this.#n ? 20 : 9),
        structFu.default.struct("mole", [this.ResourcePartsInfo], 2),
        structFu.default.struct("mouth", [this.ResourcePartsInfo], this.#n ? 52 : 37),
        structFu.default.struct("mustache", [this.ResourcePartsInfo], 6),
        structFu.default.struct("noseline", [this.ResourcePartsInfo], 18),
      ])),
      (this.ResourceTextureFooter = structFu.default.struct([
        this.u32("MipOffset"),
        this.u16("Width"),
        this.u16("Height"),
        structFu.default.uint8("NumMips"),
        structFu.default.uint8("TextureFormat"),
        structFu.default.byte("_padding", 2),
      ])),
      (this.ResourceShapeHeader = structFu.default.struct([
        this.u32("partsMaxSize", 12),
        structFu.default.struct("beard", [this.ResourcePartsInfo], 4),
        structFu.default.struct("hatNormal", [this.ResourcePartsInfo], 132),
        structFu.default.struct("hatCap", [this.ResourcePartsInfo], 132),
        structFu.default.struct("faceline", [this.ResourcePartsInfo], 12),
        structFu.default.struct("glass", [this.ResourcePartsInfo], 1),
        structFu.default.struct("mask", [this.ResourcePartsInfo], 12),
        structFu.default.struct("noseline", [this.ResourcePartsInfo], 18),
        structFu.default.struct("nose", [this.ResourcePartsInfo], 18),
        structFu.default.struct("hairNormal", [this.ResourcePartsInfo], 132),
        structFu.default.struct("hairCap", [this.ResourcePartsInfo], 132),
        structFu.default.struct("foreheadNormal", [this.ResourcePartsInfo], 132),
        structFu.default.struct("foreheadCap", [this.ResourcePartsInfo], 132),
      ])),
      (this.Vec3 = structFu.default.struct([this.f32("x"), this.f32("y"), this.f32("z")])),
      (this.FacelineTransform = structFu.default.struct([
        structFu.default.struct("hair", [this.Vec3]),
        structFu.default.struct("nose", [this.Vec3]),
        structFu.default.struct("beard", [this.Vec3]),
      ])),
      (this.HairTransform = structFu.default.struct([
        structFu.default.struct("frontTranslate", [this.Vec3]),
        structFu.default.struct("frontRotate", [this.Vec3]),
        structFu.default.struct("sideTranslate", [this.Vec3]),
        structFu.default.struct("sideRotate", [this.Vec3]),
        structFu.default.struct("topTranslate", [this.Vec3]),
        structFu.default.struct("topRotate", [this.Vec3]),
      ])),
      (this.BoundingBox = structFu.default.struct([
        structFu.default.struct("min", [this.Vec3]),
        structFu.default.struct("max", [this.Vec3]),
      ])),
      (this.ShapeDataHeader = structFu.default.struct([
        this.u32("pos", 6),
        this.u32("size", 6),
        structFu.default.struct("boundingBox", [this.BoundingBox]),
        this.f32("transform", this.HairTransform.size / 4),
      ])),
      (this.ResourceHeader = structFu.default.struct([
        this.u32("magic"),
        this.u32("version"),
        this.u32("uncompressedBufferSize"),
        this.u32("expandBufferSize"),
        this.u32("isExpand"),
        structFu.default.struct("textureHeader", [this.ResourceTextureHeader]),
        structFu.default.struct("shapeHeader", [this.ResourceShapeHeader]),
        this.u32("unknown", 12),
      ])),
      (this.Header = this.ResourceHeader.unpack(this.#t)));
  }
  getLittleEndian() {
    return this.#e;
  }
  brotliWasm;
  loadingBrotliWasm;
  brotliWasmPath;
  async ensureBrotliLoaded() {
    if (this.loadingBrotliWasm) return this.loadingBrotliWasm;
    return (
      (this.loadingBrotliWasm = (async () => {
        if (!this.brotliWasmPath) this.brotliWasmPath = `${getPublicRoot()}dist/brotli-wasm.js`;
        return (
          (this.brotliWasm = await (await import(this.brotliWasmPath)).default),
          this.brotliWasm
        );
      })()),
      this.loadingBrotliWasm
    );
  }
  async readPartsInfo(e) {
    if (!e) return;
    let t = new Uint8Array(this.#t),
      r = t.subarray(e.dataPosition, e.dataPosition + e.compressSize),
      n;
    if (r.length === 0) return [];
    if (e.strategy === 5) return r.buffer;
    if (e.strategy === 6)
      return (await this.ensureBrotliLoaded(), (n = this.brotliWasm.decompress(r)), n);
    if (e.strategy === 0) {
      let i = new DecompressionStream("deflate"),
        o = new Response(r).body.pipeThrough(i);
      ((n = await new Response(o).arrayBuffer()), (i = null), (o = null));
    } //! Garbage Collect !
    return ((t = null), (r = null), n);
  }
  getTextureFooter(e) {
    return this.ResourceTextureFooter.unpack(e.subarray(-this.ResourceTextureFooter.size));
  }
  getShapeHeader(e) {
    return this.ShapeDataHeader.unpack(e.subarray(0, this.ShapeDataHeader.size));
  }
  getFacelineTransform(e) {
    let t = this.ShapeDataHeader.fields.m_Transform.offset,
      r = e.subarray(t, t + this.FacelineTransform.size);
    return this.FacelineTransform.unpack(r);
  }
}
