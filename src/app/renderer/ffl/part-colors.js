// src/app/renderer/ffl/part-colors.js
// Default colours per part, ColorRGBA.
//
// Defines: LT, ColorRGBA, ColorRGBAExport
// Uses from other files:
//   app/mii/formats/charinfo.js: l7, ALTERNATE_DEFAULT_PALETTE
//   app/settings/palette-flags.js: isAlternatePaletteEnabled
//   app/mii/modulate-type.js: ModulateType
//   app/shaders/shader-registry.js: getShaderMaterialClass

var $j = [
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 1, g: 0.827, b: 0.678 },
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 1, g: 0.713, b: 0.419 },
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 0.87, g: 0.474, b: 0.258 },
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 1, g: 0.666, b: 0.549 },
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 0.678, g: 0.317, b: 0.16 },
    { t: [ModulateType.OpaFaceline, ModulateType.OpaForehead, ModulateType.OpaNose], r: 0.388, g: 0.172, b: 0.094 },
    { t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache], b: 0, g: 0, r: 0 },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      b: 0.062,
      g: 0.125,
      r: 0.25,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.36,
      g: 0.094,
      b: 0.039,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.486,
      g: 0.227,
      b: 0.078,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.47,
      g: 0.47,
      b: 0.501,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.305,
      g: 0.243,
      b: 0.062,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.533,
      g: 0.345,
      b: 0.094,
    },
    {
      t: [ModulateType.OpaHair, ModulateType.MskEyebrow, ModulateType.OpaBeard, ModulateType.FclBeard, ModulateType.MskMustache],
      r: 0.815,
      g: 0.627,
      b: 0.29,
    },
    { t: [ModulateType.MskEye], r: 0.423, g: 0.439, b: 0.439 },
    { t: [ModulateType.MskEye], r: 0.4, g: 0.235, b: 0.172 },
    { t: [ModulateType.MskEye], r: 0.376, g: 0.368, b: 0.188 },
    { t: [ModulateType.MskEye], r: 0.274, g: 0.329, b: 0.658 },
    { t: [ModulateType.MskEye], r: 0.219, g: 0.439, b: 0.345 },
    { t: [ModulateType.XluGlass], r: 0.117, g: 0.101, b: 0.094 },
    { t: [ModulateType.XluGlass], r: 0.376, g: 0.219, b: 0.062 },
    { t: [ModulateType.XluGlass], r: 0.658, g: 0.062, b: 0.031 },
    { t: [ModulateType.XluGlass], r: 0.125, g: 0.188, b: 0.407 },
    { t: [ModulateType.XluGlass], r: 0.658, g: 0.376, b: 0 },
    { t: [ModulateType.XluGlass], r: 0.47, g: 0.439, b: 0.407 },
    ...l7,
  ],
  Jj = [
    { r: 0.9411764705882353, g: 0.8470588235294118, b: 0.7686274509803922 },
    { r: 1, g: 0.7372549019607844, b: 0.5019607843137255 },
    { r: 0.8470588235294118, g: 0.5333333333333333, b: 0.3137254901960784 },
    { r: 1, g: 0.6901960784313725, b: 0.5647058823529412 },
    { r: 0.596078431372549, g: 0.3137254901960784, b: 0.18823529411764706 },
    { r: 0.3215686274509804, g: 0.1803921568627451, b: 0.10980392156862745 },
    { r: 0.11764705882352941, g: 0.10196078431372549, b: 0.09411764705882353 },
    { r: 0.2196078431372549, g: 0.12549019607843137, b: 0.08235294117647059 },
    { r: 0.3333333333333333, g: 0.14901960784313725, b: 0.09019607843137255 },
    { r: 0.4392156862745098, g: 0.25098039215686274, b: 0.1411764705882353 },
    { r: 0.4470588235294118, g: 0.4470588235294118, b: 0.47058823529411764 },
    { r: 0.28627450980392155, g: 0.21176470588235294, b: 0.10196078431372549 },
    { r: 0.47843137254901963, g: 0.34901960784313724, b: 0.1568627450980392 },
    { r: 0.7568627450980392, g: 0.6235294117647059, b: 0.39215686274509803 },
    { r: 0.48627450980392156, g: 0.5019607843137255, b: 0.5019607843137255 },
    { r: 0.4392156862745098, g: 0.3137254901960784, b: 0.25098039215686274 },
    { r: 0.4392156862745098, g: 0.43137254901960786, b: 0.25098039215686274 },
    { r: 0.34509803921568627, g: 0.40784313725490196, b: 0.7215686274509804 },
    { r: 0.2823529411764706, g: 0.5019607843137255, b: 0.40784313725490196 },
    { r: 0.06274509803921569, g: 0.06274509803921569, b: 0.06274509803921569 },
    { r: 0.3764705882352941, g: 0.2196078431372549, b: 0.06274509803921569 },
    { r: 0.596078431372549, g: 0.09411764705882353, b: 0.06274509803921569 },
    { r: 0.12549019607843137, g: 0.18823529411764706, b: 0.3764705882352941 },
    { r: 0.5647058823529412, g: 0.34509803921568627, b: 0 },
    { r: 0.3764705882352941, g: 0.34509803921568627, b: 0.3137254901960784 },
    ...ALTERNATE_DEFAULT_PALETTE,
  ];
function LT(e) {
  return Math.floor(e * 1000) / 1000;
}
function Oo(e, t, r) {
  if (r) {
    if (!("isWiiShader" in r.prototype)) return e;
  }
  let n = getShaderMaterialClass();
  function i(o) {
    if (isAlternatePaletteEnabled() && "isWiiShader" in n.prototype) {
      let s = LT(o.r),
        a = LT(o.g),
        l = LT(o.b),
        c = $j.findIndex((u) => u.t.includes(t) && u.r === s && u.g === a && u.b === l);
      if (c !== -1) {
        let u = Jj[c];
        return ((o = new Color_2(u.r, u.g, u.b)), o);
      } else return o;
    } else return o;
  }
  if (Array.isArray(e)) return e.map((o) => i(o));
  else return i(e);
}
class ColorRGBA extends Color_2 {
  constructor(e, t, r, n = 1) {
    super(e, t, r);
    this.a = n;
  }
  set(e, t, r, n = 1) {
    return ((this.a = n), super.set(e, t, r));
  }
  copy(e) {
    if (e.a !== void 0) this.a = e.a;
    return super.copy(e);
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b, this.a);
  }
}
var ColorRGBAExport = ColorRGBA;
