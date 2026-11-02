// src/app/mii/modulate-type.js
// ModulateType: which face/head part a mesh or texture is.
//
// Defines: ModulateTypeEnum, ModulateType

var ModulateTypeEnum;
((A) => {
  A[(A.OpaFaceline = 0)] = "OpaFaceline";
  A[(A.OpaBeard = 1)] = "OpaBeard";
  A[(A.OpaNose = 2)] = "OpaNose";
  A[(A.OpaForehead = 3)] = "OpaForehead";
  A[(A.OpaHair = 4)] = "OpaHair";
  A[(A.OpaCap = 5)] = "OpaCap";
  A[(A.XluMask = 6)] = "XluMask";
  A[(A.XluNoseline = 7)] = "XluNoseline";
  A[(A.XluGlass = 8)] = "XluGlass";
  A[(A.MskMustache = 9)] = "MskMustache";
  A[(A.MskMouth = 10)] = "MskMouth";
  A[(A.MskEyebrow = 11)] = "MskEyebrow";
  A[(A.MskEye = 12)] = "MskEye";
  A[(A.MskMole = 13)] = "MskMole";
  A[(A.FclMakeup = 14)] = "FclMakeup";
  A[(A.FclWrinkle = 15)] = "FclWrinkle";
  A[(A.FclBeard = 16)] = "FclBeard";
})((ModulateTypeEnum ||= {}));
var ModulateType = ModulateTypeEnum;
