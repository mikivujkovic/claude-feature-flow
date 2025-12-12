import fs from "node:fs";
import path from "node:path";

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const statePath = path.join(projectDir, "docs/workflow/feature-state.json");

let state = { current_feature: null, phase: null, status: "idle" };
try {
  state = JSON.parse(fs.readFileSync(statePath, "utf8"));
} catch {}

if (!state.current_feature || state.status === "idle" || state.status === "accepted") {
  process.exit(0);
}

console.error(
  `Stop blocked: feature "${state.current_feature}" is still in progress.\n` +
  `Current phase: ${state.phase || "unknown"}; status: ${state.status}.\n` +
  `Run /feature:status to see details, then either complete it with /feature:accept` +
  ` or explicitly mark it done/abandoned (manually editing feature-state for now).`
);
process.exit(2);
