---
description: Run tests, summarize the feature, and (optionally) commit with git when the user accepts it
allowed-tools: Read, Edit, Bash
---
1. Read @docs/workflow/feature-state.json.
2. If there is no active feature or status is not "in-progress", explain and stop.
3. Read @docs/workflow/config.json to get the test_command.
4. Run the test command via Bash and show the user:
   - Whether tests passed or failed,
   - A summarized output (truncate very long logs).
5. If tests failed:
   - Tell the user the feature cannot be accepted yet,
   - Suggest they fix tests and re-run /feature:accept,
   - Do not touch feature-state.json.
6. If tests passed:
   - Summarize the feature from:
     - docs/features/<slug>/domain-notes.md
     - docs/features/<slug>/feature.feature
     - docs/features/<slug>/tdd-plan.md
   - Ask the user explicitly in the chat: do they **accept** this feature as done?
7. When the user clearly says they accept:
   - Ask them for a preferred git commit message.
   - Check if a `.git` directory exists:
     - If it does:
       - Run `git status --short` and show a brief summary.
       - Run `git add` (it's acceptable to add all modified tracked files for simplicity).
       - Run `git commit -m "<user message>"`.
       - Inform the user that the commit succeeded (or report any error).
     - If it does not:
       - Inform the user that no commit was made because the project is not a git repo.
   - Update @docs/workflow/feature-state.json:
     - status: "accepted"
     - phase: "done"
8. If the user explicitly says they do not want an automatic commit:
   - Explain that no commit will be performed,
   - Still update feature-state.json to status: "accepted", phase: "done".
