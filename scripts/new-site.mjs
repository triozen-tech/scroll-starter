#!/usr/bin/env node
// Start a new project from this one.
//
//   npm run new-site -- coffee-roastery     → ../coffee-roastery
//   options: --port 3040 · --dest <folder> · --no-install · --no-git
//
// Copies the tools, effects and docs. The new project gets an empty site/ (your pages), empty raw/ and
// public/ folders, its own package name and a free dev port. Then: git init and a first local commit.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const category = args.find((a, i) => !a.startsWith("--") && !(i > 0 && ["--port", "--dest"].includes(args[i - 1])));
if (!category || !/^[a-z0-9][a-z0-9-]*$/.test(category)) {
  console.log("Usage: npm run new-site -- <category> [--port 3040] [--dest <folder>] [--no-install] [--no-git]");
  console.log("  e.g. npm run new-site -- coffee-roastery   (lowercase letters, digits and dashes)");
  process.exit(1);
}

const HERE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = resolve(opt("dest") ?? join(dirname(HERE), category));
if (existsSync(DEST) && readdirSync(DEST).length) {
  console.log(`✗ ${DEST} already exists and is not empty`);
  process.exit(1);
}

const free = (port) =>
  new Promise((ok) => {
    const s = createServer();
    s.once("error", () => ok(false));
    s.listen(port, () => s.close(() => ok(true)));
  });
let port = opt("port") ? Number(opt("port")) : null;
for (let p = 3001; !port && p <= 3099; p++) if (await free(p)) port = p;
if (!port) throw new Error("no free port between 3001 and 3099");

// What is NOT copied: dependencies, builds, git, secrets, your own media and the pages of the current project.
const SKIP = new Set(["node_modules", ".next", "out", ".git", ".env", ".DS_Store", ".venv-cutout", "recordings", "dist"]);
const SKIP_TOP = new Set(["site", "raw", "package-lock.json", "cover.jpg", "CONTENTS.txt"]);
const copy = (from, to, top = true) => {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    if (SKIP.has(name) || name.startsWith(".env") || (top && SKIP_TOP.has(name))) continue;
    const a = join(from, name);
    const b = join(to, name);
    if (statSync(a).isDirectory()) {
      if (a === join(HERE, "public", "images")) mkdirSync(b, { recursive: true });
      else copy(a, b, false);
    } else cpSync(a, b);
  }
};
copy(HERE, DEST);

// a blank site/ (the starter pages) and empty media folders
cpSync(join(HERE, "site"), join(DEST, "site"), { recursive: true });
for (const d of ["raw", "public/images"]) {
  mkdirSync(join(DEST, d), { recursive: true });
  writeFileSync(join(DEST, d, ".gitkeep"), "");
}

const pkg = JSON.parse(readFileSync(join(HERE, "package.json"), "utf8"));
pkg.name = category;
pkg.scripts.dev = `next dev -p ${port}`;
pkg.scripts.start = `next start -p ${port}`;
writeFileSync(join(DEST, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
console.log(`✓ Copied → ${DEST} (blank site/, port ${port})`);

const run = (cmd, a) => spawnSync(cmd, a, { cwd: DEST, stdio: "inherit" });
if (!flag("no-install")) run("npm", ["install", "--no-audit", "--no-fund"]);
if (!flag("no-git")) {
  run("git", ["init", "-q", "-b", "main"]);
  run("git", ["add", "-A"]);
  run("git", ["commit", "-q", "-m", `Start ${category}`]);
}
console.log(`\nNext:\n  cd "${DEST}"\n  npm run dev   → http://localhost:${port}`);
