---
description: Show the current feature, phase, and what is expected next
allowed-tools: Read
---
1. Read @docs/workflow/feature-state.json.
2. If there is no current feature, say so and suggest running /feature:start.
3. Otherwise, show:
   - Feature slug and (if present) the human name from the first heading in docs/features/<slug>/domain-notes.md.
   - Current phase (ddd|bdd|tdd|done).
   - Status (in-progress|accepted|idle).
4. Based on the phase, summarize in 3–5 bullet points what needs to be true before moving to the next phase.
