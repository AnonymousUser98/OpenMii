// src/app/i18n/localization.js
// Translation setup: i18n instance, getTranslator(), loadLanguage().
//
// Defines: i18n, getTranslator, loadLanguage

var i18n = $9();
if (typeof window < "u") window.localization = i18n;
var getTranslator = () => i18n.gettext.bind(i18n);
async function loadLanguage(e) {
  try {
    if (e !== null) {
      let t = await (await fetch(`/dist/lang/${e}.json`)).json();
      (i18n.setMessages("messages", e, t), i18n.setLocale(e));
    }
    return !0;
  } catch (t) {
    return !1;
  }
}
