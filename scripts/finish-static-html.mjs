#!/usr/bin/env node
/**
 * Post-step for static build: flatten index.html and copy hosting helpers.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = path.join(root, "static-html");
const hosting = path.join(root, "static-hosting");

if (!existsSync(out)) {
  console.error("static-html/ not found — run vite build first.");
  process.exit(1);
}

const nestedHtml = path.join(out, "static-hosting", "index.html");
const topHtml = path.join(out, "index.html");
if (existsSync(nestedHtml)) {
  if (existsSync(topHtml)) rmSync(topHtml);
  renameSync(nestedHtml, topHtml);
  rmSync(path.join(out, "static-hosting"), { recursive: true, force: true });
  console.log("Moved index.html to static-html/ root");
}

if (existsSync(topHtml)) {
  let html = readFileSync(topHtml, "utf8");
  html = html.replace(/\.\.\/assets\//g, "./assets/");
  writeFileSync(topHtml, html);
}

for (const file of [".htaccess", "README.md"]) {
  copyFileSync(path.join(hosting, file), path.join(out, file));
  console.log(`Copied ${file} → static-html/`);
}

const globeSrc = path.join(root, "src/assets/globe-engine.js");
const globePublic = path.join(root, "public/hero/globe-engine.js");
if (existsSync(globeSrc)) {
  copyFileSync(globeSrc, globePublic);
  copyFileSync(globeSrc, path.join(out, "hero/globe-engine.js"));
  console.log("Synced globe-engine.js → public/hero/ and static-html/hero/");
}

mkdirSync(out, { recursive: true });
console.log("\nDeploy: upload all files inside static-html/ to your host.");
