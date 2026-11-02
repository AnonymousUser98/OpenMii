#!/usr/bin/env node
/*
 * Builds public/dist/main.js from src/.
 *
 *   node tools/build.js            build once
 *   node tools/build.js --watch    rebuild whenever something in src/ changes
 *   node tools/build.js --out=path write somewhere else
 *
 * How it works: the files listed in src/manifest.json are joined in that order into one
 * ES module (they share one scope, exactly like the original single-file bundle), and
 *   includeGLSL("3ds/3ds.frag.glsl")   is replaced by the text of src/shaders/3ds/3ds.frag.glsl
 *   includeJSON("hat-model-info.json") is replaced by the contents of src/data/hat-model-info.json
 * No dependencies: only Node.js 18+.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

function build(outFile = path.join(ROOT, "public/dist/main.js")) {
  const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "manifest.json"), "utf8"));
  const parts = [`// Mii Creator — built from src/ by tools/build.js. Edit the files in src/, not this one.\n`];
  for (const { file } of manifest.files) {
    let code = fs.readFileSync(path.join(SRC, file), "utf8");
    code = code.replace(/includeGLSL\("([^"]+)"\)/g, (_, p) => JSON.stringify(readInclude("shaders", p, file)));
    code = code.replace(/includeJSON\("([^"]+)"\)/g, (_, p) => {
      const text = readInclude("data", p, file);
      JSON.parse(text); // fail early on broken JSON, with the file name
      return text.trim();
    });
    parts.push(`\n//#region src/${file}\n${code.replace(/\s+$/, "")}\n//#endregion\n`);
  }
  const out = parts.join("");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, out);
  return { files: manifest.files.length, bytes: out.length, outFile };
}

function readInclude(dir, p, from) {
  const f = path.join(SRC, dir, p);
  if (!f.startsWith(path.join(SRC, dir) + path.sep)) throw new Error(`${from}: include path escapes src/${dir}: ${p}`);
  try { return fs.readFileSync(f, "utf8"); }
  catch { throw new Error(`${from}: src/${dir}/${p} not found`); }
}

// Newest modification time in src/ (used by server.js to rebuild only when needed).
function srcMtime(dir = SRC) {
  let t = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    t = Math.max(t, e.isDirectory() ? srcMtime(p) : fs.statSync(p).mtimeMs);
  }
  return t;
}

module.exports = { build, srcMtime };

if (require.main === module) {
  const arg = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
  const out = arg.out ? path.resolve(arg.out) : undefined;
  const run = () => {
    try { const r = build(out); console.log(`[build] ${r.files} files -> ${path.relative(process.cwd(), r.outFile)} (${(r.bytes / 1048576).toFixed(1)} MB)`); }
    catch (e) { console.error("[build] failed:", e.message); if (!arg.watch) process.exit(1); }
  };
  run();
  if (arg.watch) {
    let timer = null;
    fs.watch(SRC, { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(run, 150); });
    console.log("[build] watching src/ for changes…");
  }
}
