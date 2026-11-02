// src/app/config.js
// APP_CONFIG: version, FFL resource files, external APIs.
//
// Defines: FFL_RESOURCE_FILES, FFL_RESOURCE_NAMES, MII_DATA_API, APP_CONFIG
// Uses from other files:
//   app/i18n/localization.js: getTranslator

var FFL_RESOURCE_FILES = ["/FFLResLow.dat", "/FFLResMiddle.dat", "/FFLResHigh.dat"],
  FFL_RESOURCE_NAMES = ["Low", "Middle", "High"],
  MII_DATA_API = "https://mii-unsecure.ariankordi.net",
  translate = getTranslator(),
  APP_CONFIG = {
    renderer: { fflResourcePath: FFL_RESOURCE_FILES, fflResourcesNames: FFL_RESOURCE_NAMES },
    apis: {
      nnidRandomURL: `${MII_DATA_API}/mii_data_random`,
      nnidFetchURL: (e) => `${MII_DATA_API}/mii_data/${e}`,
      pnidFetchURL: (e) => `${MII_DATA_API}/mii_data/${e}?api_id=1`,
    },
    version: { string: () => translate("Summer 2026 Update"), name: () => translate("Major Update") },
  };
