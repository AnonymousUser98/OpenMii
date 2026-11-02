// src/app/library/icon-cache.js
// IconCache: cached library icons.
//
// Defines: IconCache
// Uses from other files:
//   app/shaders/shader-registry.js: getRendererSetting

var localforage = In(Hs(), 1);
class IconCache {
  static async cacheIcon(e, t, r, n = !1) {
    let i = await getRendererSetting("shaderTypeIcon"),
      o = await getRendererSetting("bodyModelN"),
      s = r;
    await localforage.default.setItem(`icon-${t}`, {
      isc: n,
      icon: e,
      shaderType: i,
      bodyType: o,
      date: Date.now(),
      curData: s,
    });
  }
  static async purgeIconCache(e, t = !1) {
    if (!e) return;
    let r = await getRendererSetting("shaderTypeIcon"),
      n = await localforage.default.keys();
    for (let i of n)
      if (i.startsWith("icon-")) {
        let o = await localforage.default.getItem(i),
          s = i.slice(5);
        if (o.isc) continue;
        if (o.bs) {
          await localforage.default.removeItem(i);
          continue;
        }
        let a = o.date && Date.now() - o.date > 604800000,
          l = e ? !e.some((u) => u.id === s) : !1;
        if (t || a || l) {
          await localforage.default.removeItem(i);
          continue;
        }
        if (o.shaderType !== r) await localforage.default.removeItem(i);
      }
  }
  static async getCachedIcon(e) {
    let t = await localforage.default.getItem(`icon-${e}`);
    if (t) return t;
    return null;
  }
}
