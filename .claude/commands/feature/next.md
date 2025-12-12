---
description: Guide the user to the next step in the DDD → BDD → TDD flow for the current feature
allowed-tools: Read, Edit
---
1. Read @docs/workflow/feature-state.json.
2. If no feature is active, tell the user to run /feature:start.
3. If phase is "ddd":
   - Read docs/features/<slug>/domain-notes.md if it exists.
   - Suggest a short DDD conversation using the ddd-partner agent, with a copy-paste prompt.
   - Tell the user that once they feel the domain is clear and domain-notes.md looks good, they should say so, and then you will update phase to "bdd".
4. If phase is "bdd":
   - Read docs/features/<slug>/feature.feature.
   - Suggest using bdd-partner with a copy-paste prompt to refine 2–5 scenarios.
   - Tell the user that once they are happy with the scenarios, they should say so, and then you will update phase to "tdd".
5. If phase is "tdd":
   - Read docs/features/<slug>/tdd-plan.md and feature.feature.
   - Suggest using tdd-partner to map scenarios to tests and implementation, and remind the user to run their test command or /verify regularly.
6. Do not silently change the phase; always wait for the user to say they are ready to move on, then update feature-state.json accordingly.
