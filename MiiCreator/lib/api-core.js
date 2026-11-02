/*
 * Mii Creator local API emulation — shared core.
 *
 * Environment-agnostic: used by server.js (Node) and inlined into the
 * Tampermonkey userscript by build-userscript.js. Keep it dependency-free
 * and ES2018-compatible.
 *
 * Endpoints reproduced from what main.js calls:
 *
 *   GET    /api/session                 -> 200 {ok:true}   (polled every 45s; non-200 shows "lost connection")
 *   GET    /api/library                 -> [{id, data, special}]   (data = base64 .miic)
 *   PUT    /api/library   {data: "b64"}             -> created entry          (Pn action 1)
 *   PUT    /api/library   {data: ["b64", ...]}      -> [created entries]      (Pn action 5, bulk import)
 *   PATCH  /api/library/:id {data: "b64"}           -> updated entry          (Pn action 2)
 *   DELETE /api/library/:id                         -> {ok:true}              (Pn action 3)
 *   DELETE /api/library   {data: [id, ...]}         -> {ok:true}              (Pn action 6, multi-select delete)
 *   PATCH  /api/library_sort {sort: "[id|{g,i}]"}   -> {ok:true}              (Pn action 4, rearrange)
 *   GET    /api/personal_mii            -> entry, or 404 {error}
 *   POST   /api/personal_mii {id}       -> {ok:true}
 *   POST   /api/archive {nickname, creator, ffsd, data, studio} -> {ok:true}  (sent when the editor saves)
 *   POST   /api/account/delete          -> {ok:true}   (frontend then navigates to /logout)
 *
 * Error responses use {error, message} — Pn() shows `message` in its alert.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.MiiCreatorApiCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function emptyDb() {
    return { version: 1, nextId: 1, library: [], personalMiiId: null, archive: [] };
  }

  function normalizeDb(db) {
    var d = db && typeof db === "object" ? db : {};
    var base = emptyDb();
    for (var k in base) if (!(k in d)) d[k] = base[k];
    if (!Array.isArray(d.library)) d.library = [];
    if (!Array.isArray(d.archive)) d.archive = [];
    return d;
  }

  function ok(body, status) {
    return { status: status || 200, body: body === undefined ? { ok: true } : body };
  }
  function fail(status, message) {
    return { status: status, body: { error: true, message: message } };
  }

  // Base64 sanity check (standard or URL-safe). Mii data is small, so cap size.
  function isB64(s) {
    return typeof s === "string" && s.length > 0 && s.length < 65536 && /^[A-Za-z0-9+/_=-]+$/.test(s);
  }

  function createApi(store, opts) {
    opts = opts || {};
    var archiveLimit = opts.archiveLimit || 5000;
    var now = opts.now || function () { return new Date().toISOString(); };

    var db = normalizeDb(store.load());

    function save() { store.save(db); }

    // Entries imported from the live site keep every field the live API returned
    // (`live`), so local responses carry the same shape. `special` is the live
    // value when the live API sent one; otherwise it marks the Personal Mii.
    function publicEntry(e) {
      var out = {};
      if (e.live && typeof e.live === "object") for (var k in e.live) out[k] = e.live[k];
      out.id = e.id;
      out.data = e.data;
      out.special = e.live && "special" in e.live
        ? e.live.special
        : db.personalMiiId !== null && String(e.id) === String(db.personalMiiId);
      if (!("created" in out)) out.created = e.created;
      if (!("updated" in out)) out.updated = e.updated;
      return out;
    }

    // Import the library and Personal Mii fetched from the live site during
    // capture. mode "replace" swaps the local library; "merge" adds entries
    // whose id isn't present yet.
    function importLive(library, personal, mode) {
      if (!Array.isArray(library)) throw new Error("library must be an array");
      if (mode === "replace") { db.library = []; db.personalMiiId = null; }
      var have = {};
      db.library.forEach(function (x) { have[String(x.id)] = 1; });
      var added = 0, t = now();
      library.forEach(function (src) {
        if (!src || src.id === undefined || !isB64(src.data)) return;
        var id = String(src.id);
        if (have[id]) return;
        var live = {};
        for (var k in src) if (k !== "id" && k !== "data") live[k] = src[k];
        db.library.push({ id: id, data: src.data, created: t, updated: t, live: live });
        have[id] = 1;
        added++;
        var n = Number(id);
        if (isFinite(n) && n >= db.nextId) db.nextId = Math.floor(n) + 1;
      });
      if (personal && personal.id !== undefined && (mode === "replace" || db.personalMiiId === null)) {
        if (have[String(personal.id)]) db.personalMiiId = String(personal.id);
      }
      save();
      return { added: added, total: db.library.length, personalMiiId: db.personalMiiId };
    }

    function findIndex(id) {
      for (var i = 0; i < db.library.length; i++) if (String(db.library[i].id) === String(id)) return i;
      return -1;
    }

    function freshId() {
      var id;
      do { id = String(db.nextId++); } while (findIndex(id) !== -1);
      return id;
    }

    function create(data) {
      var t = now();
      var entry = { id: freshId(), data: data, created: t, updated: t };
      db.library.push(entry);
      return entry;
    }

    function flattenSort(list) {
      var out = [];
      (list || []).forEach(function (x) {
        if (x && typeof x === "object" && Array.isArray(x.i)) x.i.forEach(function (id) { out.push(String(id)); });
        else if (x !== null && x !== undefined) out.push(String(x));
      });
      return out;
    }

    function handle(req) {
      var method = (req.method || "GET").toUpperCase();
      var path = req.path.replace(/\/+$/, "") || "/";
      var body = req.body || {};
      var m;

      if (path === "/api/session") return ok({ ok: true, user: { id: "local", username: "local" } });

      if (path === "/api/library") {
        if (method === "GET") return ok(db.library.map(publicEntry));

        if (method === "PUT") {
          if (Array.isArray(body.data)) {
            var bad = body.data.filter(function (d) { return !isB64(d); });
            if (bad.length) return fail(400, "Invalid Mii data in bulk import");
            var created = body.data.map(create);
            save();
            return ok(created.map(publicEntry));
          }
          if (!isB64(body.data)) return fail(400, "Invalid Mii data");
          var e = create(body.data);
          save();
          return ok(publicEntry(e));
        }

        if (method === "DELETE") {
          if (!Array.isArray(body.data)) return fail(400, "Expected an array of ids");
          var ids = body.data.map(String);
          db.library = db.library.filter(function (x) { return ids.indexOf(String(x.id)) === -1; });
          if (db.personalMiiId !== null && ids.indexOf(String(db.personalMiiId)) !== -1) db.personalMiiId = null;
          save();
          return ok();
        }
        return fail(405, "Method not allowed");
      }

      if ((m = path.match(/^\/api\/library\/([^/]+)$/))) {
        var id = decodeURIComponent(m[1]);
        var idx = findIndex(id);
        if (idx === -1) return fail(404, "Mii not found");
        if (method === "GET") return ok(publicEntry(db.library[idx]));
        if (method === "PATCH" || method === "PUT") {
          if (!isB64(body.data)) return fail(400, "Invalid Mii data");
          db.library[idx].data = body.data;
          db.library[idx].updated = now();
          if (db.library[idx].live) { delete db.library[idx].live.updated; delete db.library[idx].live.updatedAt; }
          save();
          return ok(publicEntry(db.library[idx]));
        }
        if (method === "DELETE") {
          db.library.splice(idx, 1);
          if (String(db.personalMiiId) === String(id)) db.personalMiiId = null;
          save();
          return ok();
        }
        return fail(405, "Method not allowed");
      }

      if (path === "/api/library_sort") {
        if (method !== "PATCH" && method !== "POST") return fail(405, "Method not allowed");
        var sort = body.sort;
        if (typeof sort === "string") {
          try { sort = JSON.parse(sort); } catch (err) { return fail(400, "Invalid sort payload"); }
        }
        if (!Array.isArray(sort)) return fail(400, "Invalid sort payload");
        var order = flattenSort(sort);
        var rank = {};
        order.forEach(function (sid, i) { if (!(sid in rank)) rank[sid] = i; });
        var big = order.length;
        db.library = db.library
          .map(function (x, i) { return { x: x, i: i }; })
          .sort(function (a, b) {
            var ra = String(a.x.id) in rank ? rank[String(a.x.id)] : big + a.i;
            var rb = String(b.x.id) in rank ? rank[String(b.x.id)] : big + b.i;
            return ra - rb;
          })
          .map(function (o) { return o.x; });
        save();
        return ok();
      }

      if (path === "/api/personal_mii") {
        if (method === "GET") {
          var pidx = db.personalMiiId === null ? -1 : findIndex(db.personalMiiId);
          if (pidx === -1) return fail(404, "No Personal Mii set");
          return ok(publicEntry(db.library[pidx]));
        }
        if (method === "POST" || method === "PUT") {
          if (body.id === undefined || body.id === null) return fail(400, "Missing id");
          if (findIndex(body.id) === -1) return fail(404, "Mii not found");
          db.personalMiiId = String(body.id);
          save();
          return ok();
        }
        if (method === "DELETE") {
          db.personalMiiId = null;
          save();
          return ok();
        }
        return fail(405, "Method not allowed");
      }

      if (path === "/api/archive") {
        if (method === "POST") {
          db.archive.push({
            at: now(),
            nickname: body.nickname,
            creator: body.creator,
            ffsd: body.ffsd,
            data: body.data,
            studio: body.studio
          });
          if (db.archive.length > archiveLimit) db.archive.splice(0, db.archive.length - archiveLimit);
          save();
          return ok();
        }
        if (method === "GET") return ok(db.archive);
        return fail(405, "Method not allowed");
      }

      if (path === "/api/account/delete") {
        if (method !== "POST") return fail(405, "Method not allowed");
        db = emptyDb();
        save();
        return ok();
      }

      return fail(404, "Unknown endpoint: " + method + " " + path);
    }

    /*
     * Import Miis captured from the live site (GET /api/library + /api/personal_mii
     * responses). Original ids are kept so icon caches and the Personal Mii link
     * still line up. mode: "replace" (default) or "merge" (skip ids already present).
     */
    function importData(payload) {
      payload = payload || {};
      var mode = payload.mode === "merge" ? "merge" : "replace";
      var incoming = Array.isArray(payload.library) ? payload.library : [];
      if (mode === "replace") db.library = [];
      var t = now();
      var added = 0, skipped = 0;
      incoming.forEach(function (e) {
        if (!e || !isB64(e.data)) { skipped++; return; }
        var id = e.id !== undefined && e.id !== null ? String(e.id) : String(db.nextId++);
        if (findIndex(id) !== -1) { skipped++; return; }
        db.library.push({ id: id, data: e.data, created: e.created || t, updated: e.updated || t });
        added++;
      });
      // keep generated ids clear of imported numeric ids
      db.library.forEach(function (e) {
        var n = Number(e.id);
        if (isFinite(n) && n >= db.nextId) db.nextId = Math.floor(n) + 1;
      });
      var pm = payload.personalMii;
      var match = null;
      if (pm && pm.id !== undefined && pm.id !== null && findIndex(pm.id) !== -1) match = String(pm.id);
      else if (pm && isB64(pm.data)) {
        var byData = db.library.filter(function (e) { return e.data === pm.data; })[0];
        if (byData) match = String(byData.id);
      }
      if (match !== null) db.personalMiiId = match;
      else if (mode === "replace") db.personalMiiId = null;
      save();
      return { added: added, skipped: skipped, total: db.library.length, personalMiiId: db.personalMiiId };
    }

    return {
      handle: handle,
      importData: importData,
      getDb: function () { return db; },
      importLive: importLive,
      replaceDb: function (next) { db = normalizeDb(next); save(); }
    };
  }

  return { createApi: createApi, emptyDb: emptyDb };
});
