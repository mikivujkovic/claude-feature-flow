import fs from "node:fs";

const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
const cmd = (input.tool_input?.command || "").trim();

const banned = [
  /rm\s+-rf\s+\//,
  /:\(\)\s*\{\s*:\|:\s*&\s*\}\s*;\s*:/,
  /\bcurl\b.*\|\s*(sh|bash)\b/,
  /\bwget\b.*\|\s*(sh|bash)\b/,
];

if (banned.some((re) => re.test(cmd))) {
  console.error(
    `Blocked potentially dangerous Bash command in training/production flow:\n  ${cmd}\n` +
    `Use a checked-in script or run this manually after review.`
  );
  process.exit(2);
}

process.exit(0);
