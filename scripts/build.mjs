import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const browser = process.argv[2];

if (!browser || !/^[a-z]+$/.test(browser)) {
  throw new Error("Usage: node scripts/build.mjs <browser>");
}

const manifestPath = join(projectRoot, "browsers", browser, "manifest.json");
if (!existsSync(manifestPath)) {
  throw new Error(`No ready manifest for ${browser}. See browsers/${browser}/README.md.`);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const buildRoot = join(projectRoot, "build");
const extensionRoot = join(buildRoot, browser);
rmSync(extensionRoot, { recursive: true, force: true });
mkdirSync(extensionRoot, { recursive: true });
cpSync(join(projectRoot, "src"), extensionRoot, { recursive: true });
copyFileSync(manifestPath, join(extensionRoot, "manifest.json"));

const archivePath = join(buildRoot, `open-link-list-${browser}-${manifest.version}.zip`);
rmSync(archivePath, { force: true });
execFileSync("zip", ["-qr", archivePath, "."], { cwd: extensionRoot });
console.log(`Built ${extensionRoot}`);
console.log(`Packaged ${archivePath}`);
