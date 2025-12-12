---
description: Run the configured test command from docs/workflow/config.json and show a pass/fail summary
allowed-tools: Read, Bash
---
1. Read @docs/workflow/config.json and take the `test_command` string.
2. Run it via Bash, streaming or summarizing the output (truncate very long logs).
3. Print a short PASS/FAIL result for the user.
4. Do not change any state; /feature:accept is responsible for updating feature status.
