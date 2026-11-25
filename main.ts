// The Production Database Apology — make.fun
// Session: d7adbed7-954b-408d-81f0-e06aea7b244c
// Writes a single apology line (1-200 characters) to /output/entry.txt.
// First draft: I deleted the production database while trying to free up
// space for a backup of it.
// Runs on Node 22.18+, no dependencies, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";

process.umask(0o022);

const LINE =
  "Sorry, I deleted the production database while trying to free up space for a backup of it.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}
if (LINE.includes("\n")) {
  throw new Error("line must be one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(`wrote ${chars} characters to /output/entry.txt`);
