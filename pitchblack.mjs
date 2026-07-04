#!/usr/bin/env node
/**
 * pitchblack — treatment decks from a JSON file.
 *
 *   node pitchblack.mjs example/treatment.json
 *   node pitchblack.mjs my-video.json --skin drench --out out
 *
 * The JSON is a flat map of TOKEN -> value. Every {{TOKEN}} in the skin gets
 * replaced; anything you leave out is warned about and blanked. A refs/
 * folder next to your JSON is copied beside the deck so image slots resolve.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { dirname, resolve, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const flag = (n) => argv.includes(n);

const jsonPath = argv.find((a) => a.endsWith(".json"));
if (!jsonPath) { console.error("Usage: node pitchblack.mjs <treatment.json> [--skin drench] [--out out] [--no-pdf]"); process.exit(1); }

const skin = opt("--skin", "drench");
const OUT = resolve(opt("--out", "out"));
const skinPath = join(ROOT, "skins", `${skin}.html`);
if (!existsSync(skinPath)) { console.error(`No skin named "${skin}" in skins/`); process.exit(1); }

const t = JSON.parse(readFileSync(resolve(jsonPath), "utf8"));
let html = readFileSync(skinPath, "utf8");

const missing = new Set();
html = html.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, k) => {
  if (k in t) return String(t[k]);
  missing.add(k);
  return "";
});
if (missing.size) console.warn(`⚠ unfilled tokens (blanked): ${[...missing].join(", ")}`);

mkdirSync(OUT, { recursive: true });
const refs = join(dirname(resolve(jsonPath)), "refs");
if (existsSync(refs)) cpSync(refs, join(OUT, "refs"), { recursive: true });

const slug = basename(jsonPath, ".json").replace(/[^\w.-]+/g, "_");
const htmlOut = join(OUT, `${slug}.html`);
writeFileSync(htmlOut, html);
console.log(`✓ ${htmlOut}`);

if (!flag("--no-pdf")) {
  const { chromium } = await import("playwright");
  const b = await chromium.launch();
  try {
    const p = await b.newPage();
    await p.goto(`file://${htmlOut}`, { waitUntil: "networkidle" });
    await p.pdf({ path: join(OUT, `${slug}.pdf`), landscape: true, format: "Letter", printBackground: true, preferCSSPageSize: true });
    console.log(`✓ ${join(OUT, `${slug}.pdf`)}`);
  } finally { await b.close(); }
}
