#!/usr/bin/env node
/*
 * Local Mii Creator server.
 *
 *   node server.js                 http://127.0.0.1:8080
 *   node server.js --port=3000     another port
 *   node server.js --host=0.0.0.0  reachable from other devices on your network
 *   node server.js --watch         rebuild main.js whenever something in src/ changes
 *
 * - Builds public/dist/main.js from src/ on start when it's missing or older than src/.
 * - Serves public/. Paths without an extension that don't exist (e.g. /about) get index.html.
 * - Answers /api/* with lib/api-core.js and keeps your Miis in data/db.json.
 */
"use strict";
const http = require("http");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const { createApi } = require("./lib/api-core");
const { enabledFlags, injectIntoHead, flagScript } = require("./lib/debug-flags");
const { build, srcMtime } = require("./tools/build");

const arg = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, "public");
const MAIN_JS = path.join(PUBLIC, "dist/main.js");
const DB_FILE = path.resolve(ROOT, process.env.DB_FILE || "data/db.json");
const PORT = Number(arg.port || process.env.PORT || 8080);
const HOST = arg.host || process.env.HOST || "127.0.0.1";

// ---------- build ----------
function buildIfNeeded(force = false) {
  const stale = !fs.existsSync(MAIN_JS) || fs.statSync(MAIN_JS).mtimeMs < srcMtime();
  if (!force && !stale) return;
  const t = Date.now();
  try { const r = build(MAIN_JS); console.log(`[build] ${r.files} source files -> public/dist/main.js (${Date.now() - t} ms)`); }
  catch (e) { console.error(`[build] failed: ${e.message}`); }
}
buildIfNeeded();
if (arg.watch) {
  let timer = null;
  fs.watch(path.join(ROOT, "src"), { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(() => buildIfNeeded(true), 150); });
}

// ---------- database (data/db.json) ----------
const api = createApi({
  load() {
    try { return JSON.parse(fs.readFileSync(DB_FILE, "utf8")); }
    catch (e) { if (e.code !== "ENOENT") console.warn(`[db] could not read ${DB_FILE}: ${e.message} — starting empty`); return null; }
  },
  save(db) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE + ".tmp", JSON.stringify(db, null, 2));
    fs.renameSync(DB_FILE + ".tmp", DB_FILE);
  },
});

// ---------- helpers ----------
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".webp": "image/webp", ".ico": "image/x-icon", ".wasm": "application/wasm", ".glb": "model/gltf-binary",
  ".ktx2": "image/ktx2", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".opus": "audio/ogg", ".wav": "audio/wav",
  ".mp4": "video/mp4", ".webm": "video/webm", ".zip": "application/zip", ".woff": "font/woff", ".woff2": "font/woff2",
  ".ttf": "font/ttf", ".otf": "font/otf", ".dat": "application/octet-stream", ".bin": "application/octet-stream",
};
function send(res, status, body, headers = {}) {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
  res.writeHead(status, { "content-length": buf.length, "cache-control": "no-store", ...headers });
  res.end(buf);
}
const sendJson = (res, status, obj) => send(res, status, JSON.stringify(obj), { "content-type": "application/json; charset=utf-8" });

function readJsonBody(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    req.on("data", (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error("Payload too large"), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { const raw = Buffer.concat(chunks); if (!raw.length) return resolve({}); try { resolve(JSON.parse(raw)); } catch { reject(Object.assign(new Error("Invalid JSON body"), { status: 400 })); } });
    req.on("error", reject);
  });
}

// URL path -> file inside public/, or null (refuses ../ tricks)
function resolvePublic(urlPath) {
  let rel; try { rel = decodeURIComponent(urlPath); } catch { return null; }
  const file = path.resolve(PUBLIC, "." + rel);
  return file === PUBLIC || file.startsWith(PUBLIC + path.sep) ? file : null;
}
async function findFile(urlPath) {
  const file = resolvePublic(urlPath);
  if (!file) return null;
  const st = await fsp.stat(file).catch(() => null);
  if (st && st.isFile()) return { file, st };
  if (st && st.isDirectory()) { const idx = path.join(file, "index.html"); const s2 = await fsp.stat(idx).catch(() => null); if (s2) return { file: idx, st: s2 }; }
  const html = await fsp.stat(file + ".html").catch(() => null); // /about -> about.html
  if (html) return { file: file + ".html", st: html };
  return null;
}

async function serveStatic(req, res, url) {
  let hit = await findFile(url.pathname);
  if (!hit && !path.extname(url.pathname)) hit = await findFile("/index.html"); // client-side routes
  if (!hit) return send(res, 404, "Not found", { "content-type": "text/plain; charset=utf-8" });
  let body = await fsp.readFile(hit.file);
  if (hit.file.endsWith(".html")) {
    const script = flagScript(enabledFlags(PUBLIC));
    if (script) body = Buffer.from(injectIntoHead(body.toString("utf8"), [script]));
  }
  // main.js revalidates its zip cache with HEAD + ETag, so give every file a stable one
  const headers = { "content-type": MIME[path.extname(hit.file).toLowerCase()] || "application/octet-stream", etag: `"${hit.st.size.toString(16)}-${Math.floor(hit.st.mtimeMs).toString(16)}"` };
  if (req.method === "HEAD") { res.writeHead(200, { ...headers, "content-length": body.length, "cache-control": "no-store" }); return res.end(); }
  send(res, 200, body, headers);
}

async function serveApi(req, res, url) {
  let body = {};
  if (!["GET", "HEAD"].includes(req.method)) {
    try { body = await readJsonBody(req); } catch (e) { return sendJson(res, e.status || 400, { error: true, message: e.message }); }
  }
  const out = api.handle({ method: req.method, path: url.pathname, query: url.searchParams, body });
  sendJson(res, out.status, out.body);
}

// ---------- server ----------
http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, `http://${req.headers.host || "localhost"}`); } catch { return send(res, 400, "Bad request"); }
  try {
    if (url.pathname.startsWith("/api/")) return await serveApi(req, res, url);
    return await serveStatic(req, res, url);
  } catch (e) {
    console.error(`${req.method} ${url.pathname}: ${e.stack || e}`);
    if (!res.headersSent) send(res, 500, "Internal error");
  }
}).listen(PORT, HOST, () => {
  console.log(`Mii Creator running at http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}/  (library: ${path.relative(ROOT, DB_FILE)})`);
  if (arg.watch) console.log("Watching src/ — main.js rebuilds when you save a file.");
});
