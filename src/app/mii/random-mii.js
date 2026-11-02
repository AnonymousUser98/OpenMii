// src/app/mii/random-mii.js
// Random Mii generator (FFLiDatabaseRandom).
//
// Defines: Hre, u8e, RANDOM_FACELINE_TYPES, randomFloat, pickRandomEntry, Gre, randomChance,
//          generateRandomMii
// Uses from other files:
//   app/mii/colors.js: LEGACY_HAIR_COLOR_TO_COMMON, LEGACY_EYE_COLOR_TO_COMMON,
//                      LEGACY_MOUTH_COLOR_TO_COMMON, LEGACY_GLASS_COLOR_TO_COMMON
//   app/mii/formats/ffsd-miic.js: CREATE_ID_STRUCT, Bm
//   app/mii/mii.js: Mii

var structFu = In(Nc(), 1);
function s0(e) {
  return (
    32 -
    [
      3, 4, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 3, 4, 4, 4, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 4, 3, 4,
      4, 4, 3, 3, 3, 4, 4, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ][e]
  );
}
var Hre = structFu.default.struct([
    structFu.default.int32("faceType"),
    structFu.default.int32("facelineColor"),
    structFu.default.int32("faceLine"),
    structFu.default.int32("faceMakeup"),
    structFu.default.int32("hairType"),
    structFu.default.int32("hairColor"),
    structFu.default.int32("hairDir"),
    structFu.default.int32("eyeType"),
    structFu.default.int32("eyeColor"),
    structFu.default.int32("eyeScale"),
    structFu.default.int32("eyeScaleY"),
    structFu.default.int32("eyeRotate"),
    structFu.default.int32("eyeSpacingX"),
    structFu.default.int32("eyePositionY"),
    structFu.default.int32("eyebrowType"),
    structFu.default.int32("eyebrowColor"),
    structFu.default.int32("eyebrowScale"),
    structFu.default.int32("eyebrowScaleY"),
    structFu.default.int32("eyebrowRotate"),
    structFu.default.int32("eyebrowSpacingX"),
    structFu.default.int32("eyebrowPositionY"),
    structFu.default.int32("noseType"),
    structFu.default.int32("noseScale"),
    structFu.default.int32("nosePositionY"),
    structFu.default.int32("mouthType"),
    structFu.default.int32("mouthColor"),
    structFu.default.int32("mouthScale"),
    structFu.default.int32("mouthScaleY"),
    structFu.default.int32("mouthPositionY"),
    structFu.default.int32("mustacheType"),
    structFu.default.int32("beardType"),
    structFu.default.int32("beardColor"),
    structFu.default.int32("mustacheScale"),
    structFu.default.int32("mustachePositionY"),
    structFu.default.int32("glassType"),
    structFu.default.int32("glassColor"),
    structFu.default.int32("glassScale"),
    structFu.default.int32("glassPositionY"),
    structFu.default.int32("moleType"),
    structFu.default.int32("moleScale"),
    structFu.default.int32("molePositionX"),
    structFu.default.int32("molePositionY"),
  ]),
  u8e = structFu.default.struct([
    structFu.default.uint32("miiVersion"),
    structFu.default.struct("parts", [Hre]),
    structFu.default.uint32("height"),
    structFu.default.uint32("build"),
    structFu.default.char16be("name", 22),
    structFu.default.char16be("creatorName", 22),
    structFu.default.uint32("gender"),
    structFu.default.uint32("birthMonth"),
    structFu.default.uint32("birthDay"),
    structFu.default.uint32("favoriteColor"),
    structFu.default.uint8("favoriteMii"),
    structFu.default.uint8("copyable"),
    structFu.default.uint8("ngWord"),
    structFu.default.uint8("localOnly"),
    structFu.default.uint32("regionMove"),
    structFu.default.uint32("fontRegion"),
    structFu.default.uint32("pageIndex"),
    structFu.default.uint32("slotIndex"),
    structFu.default.uint32("birthPlatform"),
    structFu.default.struct("creatorID", [CREATE_ID_STRUCT]),
    structFu.default.uint16("_112"),
    structFu.default.uint32("_114"),
    structFu.default.struct("authorID", [Bm]),
  ]);
function a0(e) {
  return (
    32 - [6, 6, 5, 7, 6, 7, 6, 7, 4, 7, 6, 8, 5, 5, 6, 6, 7, 7, 6, 6, 5, 6, 7, 5, 6, 6, 6, 6][e]
  );
}
var Q6 = 5;
var RANDOM_FACELINE_TYPES = includeJSON("random-faceline-types.json"),
  X6 = [
    [
      [
        [
          30,
          [
            13, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 43, 44, 45, 47, 48, 49, 50, 51, 52, 54,
            56, 57, 64, 66, 75, 76, 86, 89,
          ],
        ],
        [
          31,
          [
            13, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 43, 44, 45, 47, 48, 49, 50, 51, 52, 54,
            56, 57, 64, 66, 73, 75, 81, 86, 87,
          ],
        ],
        [
          31,
          [
            13, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 43, 44, 45, 47, 48, 49, 50, 51, 52, 54,
            56, 57, 64, 66, 73, 75, 81, 86, 87,
          ],
        ],
      ],
      [
        [
          38,
          [
            13, 23, 30, 31, 32, 33, 34, 36, 37, 38, 40, 42, 43, 44, 45, 47, 48, 49, 50, 51, 52, 53,
            54, 55, 56, 58, 59, 60, 64, 65, 66, 67, 68, 70, 75, 76, 86, 89,
          ],
        ],
        [
          39,
          [
            13, 23, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 43, 44, 45, 47, 48, 49, 50, 51, 52, 53,
            54, 55, 56, 58, 59, 60, 64, 65, 66, 67, 68, 70, 73, 75, 81, 86, 87,
          ],
        ],
        [
          39,
          [
            13, 23, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 43, 44, 45, 47, 48, 49, 50, 51, 52, 53,
            54, 55, 56, 58, 59, 60, 64, 65, 66, 67, 68, 70, 73, 75, 81, 86, 87,
          ],
        ],
      ],
      [
        [18, [13, 23, 30, 36, 37, 41, 45, 47, 51, 53, 54, 55, 58, 59, 65, 67, 86, 88]],
        [19, [13, 23, 30, 36, 37, 39, 41, 45, 47, 51, 53, 54, 55, 58, 59, 65, 67, 86, 88]],
        [19, [13, 23, 30, 36, 37, 39, 41, 45, 47, 51, 53, 54, 55, 58, 59, 65, 67, 86, 88]],
      ],
    ],
    [
      [
        [
          39,
          [
            0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25,
            26, 28, 46, 50, 61, 62, 63, 64, 69, 76, 77, 79, 80, 83, 85,
          ],
        ],
        [
          42,
          [
            0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25,
            26, 28, 46, 50, 61, 62, 63, 64, 69, 72, 74, 77, 78, 82, 83, 84, 85, 87,
          ],
        ],
        [
          42,
          [
            0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25,
            26, 28, 46, 50, 61, 62, 63, 64, 69, 72, 74, 77, 78, 82, 83, 84, 85, 87,
          ],
        ],
      ],
      [
        [
          44,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24,
            25, 26, 27, 29, 42, 50, 58, 60, 62, 63, 64, 69, 71, 76, 79, 80, 81, 82, 83, 86,
          ],
        ],
        [
          44,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24,
            25, 26, 27, 29, 50, 58, 60, 62, 63, 64, 69, 71, 72, 74, 79, 81, 82, 83, 84, 85,
          ],
        ],
        [
          44,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24,
            25, 26, 27, 29, 50, 58, 60, 62, 63, 64, 69, 71, 72, 74, 79, 81, 82, 83, 84, 85,
          ],
        ],
      ],
      [
        [
          24,
          [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 24, 25, 58, 62, 69, 76, 83],
        ],
        [
          27,
          [
            0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 24, 25, 58, 62, 69, 74, 76,
            81, 83, 85,
          ],
        ],
        [
          27,
          [
            0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 24, 25, 58, 62, 69, 74, 76,
            81, 83, 85,
          ],
        ],
      ],
    ],
  ],
  j6 = [
    [
      [
        [
          26,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 16, 18, 27, 29, 32, 34, 36, 38, 39, 41, 43, 47, 49,
            51, 53, 57,
          ],
        ],
        [
          26,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 16, 18, 27, 29, 32, 34, 36, 38, 39, 41, 43, 47, 49,
            51, 53, 57,
          ],
        ],
        [
          27,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 16, 18, 26, 27, 29, 32, 34, 36, 38, 39, 41, 43, 47,
            48, 49, 53, 57,
          ],
        ],
      ],
      [
        [
          35,
          [
            2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 21, 22, 27, 29, 31, 32, 34, 36, 37, 38,
            39, 41, 43, 44, 47, 49, 51, 53, 55, 56, 57,
          ],
        ],
        [
          35,
          [
            2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 21, 22, 27, 29, 31, 32, 34, 36, 37, 38,
            39, 41, 43, 44, 47, 49, 51, 53, 55, 56, 57,
          ],
        ],
        [
          35,
          [
            2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 18, 21, 22, 26, 27, 29, 31, 32, 34, 36, 37, 38,
            39, 41, 43, 44, 47, 48, 49, 50, 53, 56, 57,
          ],
        ],
      ],
      [
        [
          30,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 31, 32, 34, 36, 37, 39, 41,
            44, 49, 51, 53, 55, 56, 57,
          ],
        ],
        [
          30,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 31, 32, 34, 36, 37, 39, 41,
            44, 49, 51, 53, 55, 56, 57,
          ],
        ],
        [
          30,
          [
            2, 3, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 21, 22, 26, 31, 32, 34, 36, 37, 39, 41,
            44, 48, 49, 50, 51, 53, 57,
          ],
        ],
      ],
    ],
    [
      [
        [
          39,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 27, 28, 29, 32, 33,
            34, 35, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 59,
          ],
        ],
        [
          39,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 27, 28, 29, 32, 33,
            34, 35, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 59,
          ],
        ],
        [
          40,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 26, 27, 28, 29, 32,
            33, 34, 35, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 59,
          ],
        ],
      ],
      [
        [
          46,
          [
            0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 27,
            28, 29, 30, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 58, 59,
          ],
        ],
        [
          46,
          [
            0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 27,
            28, 29, 30, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 58, 59,
          ],
        ],
        [
          46,
          [
            0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 20, 21, 23, 24, 25, 26, 27,
            28, 29, 30, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 53, 54, 57, 58, 59,
          ],
        ],
      ],
      [
        [
          34,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 27, 28, 29, 32, 33,
            34, 35, 38, 39, 40, 41, 42, 45, 46, 47,
          ],
        ],
        [
          34,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 27, 28, 29, 32, 33,
            34, 35, 38, 39, 40, 41, 42, 45, 46, 47,
          ],
        ],
        [
          35,
          [
            0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 23, 24, 25, 26, 27, 28, 29, 32,
            33, 34, 35, 38, 39, 40, 41, 42, 45, 46, 47,
          ],
        ],
      ],
    ],
  ],
  K6 = [
    [
      [
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 20]],
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 20]],
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 20]],
      ],
      [
        [23, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]],
        [23, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]],
        [23, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]],
      ],
      [
        [21, [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22]],
        [21, [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22]],
        [21, [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22]],
      ],
    ],
    [
      [
        [9, [0, 1, 3, 7, 8, 9, 10, 11, 13]],
        [9, [0, 1, 3, 7, 8, 9, 10, 11, 13]],
        [9, [0, 1, 3, 7, 8, 9, 10, 11, 13]],
      ],
      [
        [11, [0, 1, 3, 7, 8, 9, 10, 11, 13, 15, 19]],
        [11, [0, 1, 3, 7, 8, 9, 10, 11, 13, 15, 19]],
        [11, [0, 1, 3, 7, 8, 9, 10, 11, 13, 15, 19]],
      ],
      [
        [9, [0, 3, 7, 8, 9, 10, 11, 13, 15]],
        [9, [0, 3, 7, 8, 9, 10, 11, 13, 15]],
        [9, [0, 3, 7, 8, 9, 10, 11, 13, 15]],
      ],
    ],
  ],
  q6 = [
    [
      [
        [11, [0, 1, 2, 3, 4, 5, 7, 8, 10, 13, 14]],
        [11, [0, 1, 2, 3, 4, 5, 7, 8, 10, 13, 14]],
        [11, [0, 1, 2, 3, 4, 5, 7, 8, 10, 13, 14]],
      ],
      [
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]],
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]],
        [15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16]],
      ],
      [
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]],
        [18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]],
        [15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16]],
      ],
    ],
    [
      [
        [8, [0, 1, 3, 4, 8, 10, 13, 14]],
        [8, [0, 1, 3, 4, 8, 10, 13, 14]],
        [8, [0, 1, 3, 4, 8, 10, 13, 14]],
      ],
      [
        [12, [0, 1, 3, 4, 6, 8, 9, 10, 11, 13, 14, 15]],
        [11, [0, 1, 3, 4, 6, 8, 9, 10, 11, 13, 15]],
        [10, [0, 1, 3, 4, 6, 8, 10, 11, 13, 14]],
      ],
      [
        [12, [0, 1, 3, 4, 6, 8, 9, 10, 11, 13, 14, 15]],
        [11, [0, 1, 3, 4, 6, 8, 9, 10, 11, 13, 15]],
        [10, [0, 1, 3, 4, 6, 8, 10, 11, 13, 14]],
      ],
    ],
  ],
  Z6 = [
    [
      [
        [
          25,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 12, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 30, 32, 33, 34,
            35,
          ],
        ],
        [
          27,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 30, 32,
            33, 34, 35,
          ],
        ],
        [
          28,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 30, 31,
            32, 33, 34, 35,
          ],
        ],
      ],
      [
        [
          24,
          [0, 2, 3, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33, 34, 35],
        ],
        [
          26,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33,
            34, 35,
          ],
        ],
        [
          26,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33,
            34, 35,
          ],
        ],
      ],
      [
        [
          24,
          [0, 2, 3, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33, 34, 35],
        ],
        [
          26,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33,
            34, 35,
          ],
        ],
        [
          26,
          [
            0, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 33,
            34, 35,
          ],
        ],
      ],
    ],
    [
      [
        [
          25,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 30, 33, 34,
            35,
          ],
        ],
        [
          26,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 30, 33,
            34, 35,
          ],
        ],
        [
          26,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 30, 33,
            34, 35,
          ],
        ],
      ],
      [
        [
          25,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 17, 18, 19, 21, 22, 23, 24, 26, 27, 29, 33,
            35,
          ],
        ],
        [
          26,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 24, 26, 27, 29,
            33, 35,
          ],
        ],
        [
          25,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 24, 25, 29, 33,
            35,
          ],
        ],
      ],
      [
        [
          24,
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 29, 33],
        ],
        [
          25,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 29,
            33,
          ],
        ],
        [
          25,
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 29,
            33,
          ],
        ],
      ],
    ],
  ],
  $6 = [
    [
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
      ],
      [
        [20, [9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11]],
        [20, [9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11]],
        [20, [9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11]],
      ],
    ],
    [
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 8, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 8, 8]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4]],
      ],
      [
        [20, [9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11]],
        [20, [9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11]],
        [20, [9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11]],
      ],
    ],
  ],
  J6 = [
    [
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9]],
      ],
    ],
    [
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 9, 9]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9]],
        [20, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]],
        [20, [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 9]],
      ],
      [
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
      ],
    ],
  ],
  eS = [
    [
      [10, [2, 2, 4, 4, 4, 4, 5, 5, 5, 5]],
      [10, [0, 0, 0, 0, 1, 1, 2, 3, 3, 3]],
      [10, [0, 0, 1, 1, 1, 1, 1, 1, 1, 2]],
    ],
    [
      [10, [2, 2, 4, 4, 4, 4, 5, 5, 5, 5]],
      [10, [0, 0, 0, 0, 0, 0, 0, 0, 1, 3]],
      [10, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]],
    ],
  ],
  tS = [
    [
      [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      [20, [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
    ],
    [
      [20, [2, 3, 3, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7]],
      [20, [2, 3, 3, 3, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7]],
      [20, [2, 3, 3, 4, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7]],
    ],
    [
      [20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
      [20, [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3]],
      [20, [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
    ],
  ],
  rS = [
    [10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
    [10, [0, 1, 1, 2, 3, 3, 4, 4, 4, 5]],
    [10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
  ];
function randomFloat() {
  if (typeof crypto < "u" && crypto.getRandomValues) {
    let e = new Uint32Array(1);
    return (crypto.getRandomValues(e), e[0] / 4294967296);
  } else return Math.random();
}
function wk(e, t, r) {
  let n = e,
    i = t,
    o = r;
  if (e == 2) n = Math.floor(randomFloat() * 2) == 0 ? 0 : 1;
  if (t == 3) {
    let s = Math.floor(randomFloat() * 10);
    i = s < 4 ? 0 : s < 8 ? 1 : 2;
  }
  if (r == 3) {
    let s = Math.floor(randomFloat() * 10);
    o = s < 4 ? 2 : s < 8 ? 1 : 0;
  }
  return [n, i, o];
}
function Tk(e) {
  let t = Math.floor(randomFloat() * 100),
    r = 0;
  while (t >= Gre[e][r]) r++;
  return r;
}
function pickRandomEntry(e, t) {
  return e[1][Math.floor(randomFloat() * e[0])];
}
var Gre = [
    [90, 94, 96, 100, 0, 0, 0, 0, 0],
    [83, 86, 90, 93, 94, 96, 98, 100, 0],
    [78, 83, 0, 93, 0, 0, 98, 100, 0],
  ],
  Ek = [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16];
function randomChance(e) {
  if (Math.floor(randomFloat() * 100) >= 100 - e) return !0;
  return !1;
}
function generateRandomMii(e, t) {
  let [r, n, i] = [2, 3, 3],
    [o, s, a] = wk(r, n, i);
  if (t.age !== void 0) s = t.age;
  if (t.gender !== void 0) o = t.gender;
  if (t.race !== void 0) a = t.race;
  e.originPlatform = 3;
  let l = 0;
  if (o == 1 || s == 0) l = Math.floor(randomFloat() * 3);
  if (
    ((e.facelineType = pickRandomEntry(RANDOM_FACELINE_TYPES[o][s][a], 0)),
    (e.facelineColor = pickRandomEntry(eS[o][a], 1)),
    (e.facelineWrinkle = pickRandomEntry($6[o][s][a], 2)),
    (e.facelineMake = pickRandomEntry(J6[o][s][a], 3)),
    (e.hairType = pickRandomEntry(X6[o][s][a], 4)),
    (e.hairColor = LEGACY_HAIR_COLOR_TO_COMMON[pickRandomEntry(tS[a][s], 5)]),
    t.hairColor !== void 0)
  )
    e.hairColor = LEGACY_HAIR_COLOR_TO_COMMON[t.hairColor];
  if (
    ((e.hairFlip = Math.ceil(randomFloat() * 2) - 1),
    (e.eyeType = pickRandomEntry(j6[o][s][a], 6)),
    (e.eyeColor = LEGACY_EYE_COLOR_TO_COMMON[pickRandomEntry(rS[a], 7)]),
    t.eyeColor !== void 0)
  )
    e.eyeColor = LEGACY_EYE_COLOR_TO_COMMON[t.eyeColor];
  ((e.eyeScale = 4), (e.eyeAspect = 3));
  let c;
  if (o == 0) ((e.eyeRotate = 4), (c = s0(2)));
  else ((e.eyeRotate = 3), (c = s0(4)));
  let u = s0(e.eyeType);
  ((e.eyeX = 2),
    (e.eyeY = l + 12),
    (e.eyeRotate += c - u),
    (e.eyebrowType = pickRandomEntry(K6[o][s][a], 8)),
    (e.eyebrowColor = e.hairColor),
    (e.eyebrowScale = 4),
    (e.eyebrowAspect = 3),
    (e.eyebrowRotate = 6),
    (e.eyebrowX = 2));
  let d;
  if (a == 2) ((e.eyebrowY = l + 9), (d = a0(6)));
  else ((e.eyebrowY = l + 10), (d = a0(0)));
  let h = a0(e.eyebrowType);
  ((e.eyebrowRotate += d - h),
    (e.noseType = pickRandomEntry(q6[o][s][a], 9)),
    (e.noseScale = o == 0 ? 4 : 3),
    (e.noseY = l + 9),
    (e.mouthType = pickRandomEntry(Z6[o][s][a], 10)),
    (e.mouthColor = LEGACY_MOUTH_COLOR_TO_COMMON[o == 0 ? 0 : Math.floor(randomFloat() * Q6)]),
    (e.mouthScale = 4),
    (e.mouthAspect = 3),
    (e.mouthY = l + 13));
  let f, p, g;
  if (o == 0 && (s == 1 || s == 2) && Math.floor(randomFloat() * 10) < 2) {
    f = 0;
    let m = !1;
    switch (Math.floor(randomFloat() * 3)) {
      case 0:
        m = !0;
        break;
      case 2:
        m = !0;
      case 1:
        f = Math.floor(randomFloat() * 5) + 1;
        break;
    }
    ((p = m ? Math.floor(randomFloat() * 5) + 1 : 0), (g = 10));
  } else ((f = 0), (p = 0), (g = l + 10));
  if (
    ((e.mustacheType = f),
    (e.beardType = p),
    (e.beardColor = e.hairColor),
    (e.mustacheScale = 4),
    (e.mustacheY = g),
    (e.glassType = Tk(s)),
    (e.glassColor = LEGACY_GLASS_COLOR_TO_COMMON[Math.floor(randomFloat() * 6)]),
    (e.glassScale = 4),
    (e.glassY = l + 10),
    (e.moleType = 0),
    (e.moleScale = 4),
    (e.moleX = 2),
    (e.moleY = 20),
    (e.height = 64),
    (e.build = 64),
    (e.nickname = ""),
    (e.gender = o),
    (e.birthMonth = 0),
    (e.birthDay = 0),
    (e.favoriteColor = Math.floor(randomFloat() * 12)),
    t.favoriteColor !== void 0)
  )
    e.favoriteColor = t.favoriteColor;
  if (((e.favorite = 0), e.facelineType === 9))
    ((e.eyebrowY -= 2), (e.eyeY -= 2), (e.noseY -= 2), (e.mouthY -= 2), (e.glassY = Ek[e.eyeY]));
}
function Sk(e, t) {
  let [r, n, i] = [2, 3, 3],
    [o, s, a] = wk(r, n, i);
  if (t.age !== void 0) s = t.age;
  if (t.gender !== void 0) o = t.gender;
  if (t.race !== void 0) a = t.race;
  let l = 0;
  if (o == 1 || s == 0) l = Math.floor(randomFloat() * 3);
  if (randomChance(6)) e.facelineType = pickRandomEntry(RANDOM_FACELINE_TYPES[o][s][a], 0);
  if (randomChance(5)) e.facelineColor = pickRandomEntry(eS[o][a], 1);
  if (randomChance(5)) e.facelineWrinkle = pickRandomEntry($6[o][s][a], 2);
  if (randomChance(5)) e.facelineMake = pickRandomEntry(J6[o][s][a], 3);
  if (randomChance(7)) e.hairType = pickRandomEntry(X6[o][s][a], 4);
  if (randomChance(5)) e.hairColor = LEGACY_HAIR_COLOR_TO_COMMON[pickRandomEntry(tS[a][s], 5)];
  if (t.hairColor !== void 0) e.hairColor = LEGACY_HAIR_COLOR_TO_COMMON[t.hairColor];
  if (randomChance(15)) e.hairFlip = Math.ceil(randomFloat() * 2) - 1;
  if (randomChance(10)) e.eyeType = pickRandomEntry(j6[o][s][a], 6);
  if (randomChance(5)) e.eyeColor = LEGACY_EYE_COLOR_TO_COMMON[pickRandomEntry(rS[a], 7)];
  if (t.eyeColor !== void 0) e.eyeColor = LEGACY_EYE_COLOR_TO_COMMON[t.eyeColor];
  if (t.isOriginalMii !== !0) {
    ((e.eyeScale = 4), (e.eyeAspect = 3));
    let h;
    if (o == 0) ((e.eyeRotate = 4), (h = s0(2)));
    else ((e.eyeRotate = 3), (h = s0(4)));
    let f = s0(e.eyeType);
    e.eyeRotate += h - f;
  }
  if (randomChance(15)) e.eyebrowType = pickRandomEntry(K6[o][s][a], 8);
  if (t.isOriginalMii !== !0) {
    ((e.eyebrowColor = e.hairColor),
      (e.eyebrowScale = 4),
      (e.eyebrowAspect = 3),
      (e.eyebrowRotate = 6),
      (e.eyebrowX = 2));
    let h;
    if (a == 2) ((e.eyebrowY = l + 9), (h = a0(6)));
    else ((e.eyebrowY = l + 10), (h = a0(0)));
    let f = a0(e.eyebrowType);
    e.eyebrowRotate += h - f;
  }
  if (randomChance(15)) e.noseType = pickRandomEntry(q6[o][s][a], 9);
  if (t.isOriginalMii !== !0) ((e.noseScale = o == 0 ? 4 : 3), (e.noseY = l + 9));
  if (((e.mouthType = pickRandomEntry(Z6[o][s][a], 10)), randomChance(15)))
    e.mouthColor = LEGACY_MOUTH_COLOR_TO_COMMON[o == 0 ? 0 : Math.floor(randomFloat() * Q6)];
  if (t.isOriginalMii !== !0) ((e.mouthScale = 4), (e.mouthAspect = 3), (e.mouthY = l + 13));
  let c, u, d;
  if (o == 0 && (s == 1 || s == 2) && Math.floor(randomFloat() * 10) < 2) {
    c = 0;
    let h = !1;
    switch (Math.floor(randomFloat() * 3)) {
      case 0:
        h = !0;
        break;
      case 2:
        h = !0;
      case 1:
        if (randomChance(15)) c = Math.floor(randomFloat() * 5) + 1;
        break;
    }
    ((u = h ? Math.floor(randomFloat() * 5) + 1 : 0), (d = 10));
  } else ((c = 0), (u = 0), (d = l + 10));
  if (randomChance(20)) e.mustacheType = c;
  if (randomChance(20)) e.beardType = u;
  if (((e.beardColor = e.hairColor), t.isOriginalMii !== !0))
    ((e.mustacheScale = 4), (e.mustacheY = d));
  else if (e.glassType === 0) e.glassY = Ek[e.eyeY];
  if (((e.glassType = Tk(s)), randomChance(20))) e.glassColor = LEGACY_GLASS_COLOR_TO_COMMON[Math.floor(randomFloat() * 6)];
  if (t.isOriginalMii !== !0) ((e.glassScale = 4), (e.glassY = l + 10));
}
window.mii = Mii;
window.FFLiDatabaseRandom_Get = generateRandomMii;
