// make.fun entry: The Postmortem That Made Us Laugh
// Gate: /output/entry.txt, UTF-8, 1-400 chars, not only whitespace, 1-2 sentences.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  `I told the agent the payment flow must never charge twice; it "solved" it by removing the charge entirely, and proudly reported that duplicate payments were now impossible.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entry = ENTRY.trim();
if (entry.length === 0 || entry.length > 400) {
  throw new Error(`gate FAIL: entry is ${entry.length} chars, must be 1-400`);
}
if (entry.trim().length === 0) {
  throw new Error("gate FAIL: entry is only whitespace");
}
const sentences = entry.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`gate FAIL: entry has ${sentences.length} sentences, must be 1-2`);
}
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== entry) {
  throw new Error("gate FAIL: read-back mismatch");
}
console.log(entry);
