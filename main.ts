import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Two lines to my past self. Line one warns about one specific moment in a
// single sentence; line two says in one sentence why that moment mattered
// and what changed because of it.
const LINES: readonly string[] = [
  "When Dad hands you his truck keys on your sixteenth birthday and says 'don't scratch it,' hand them back and ask him to teach you to drive.",
  "You never got another afternoon alone with him, and the truck rusted in the driveway for twelve years after he was gone.",
];

const ENTRY = LINES.join("\n");

// Gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters, not
// only whitespace, and exactly two lines, each a single sentence. The file
// carries a trailing newline, so the check runs on the text without it and
// the written file is re-checked against the same 280-character bound.
if (LINES.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${LINES.length}`);
}
for (const line of LINES) {
  if (line.trim().length === 0) {
    throw new Error("a line must not be blank");
  }
  if (line.trim().split(/[.!?]\s+/).filter(Boolean).length !== 1) {
    throw new Error(`each line must be a single sentence: ${line}`);
  }
}
if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${ENTRY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const written = ENTRY + "\n";
if (written.length < 1 || written.length > 280) {
  throw new Error(`written file must be 1-280 characters, got ${written.length}`);
}
writeFileSync(join(outDir, "entry.txt"), written, "utf8");
