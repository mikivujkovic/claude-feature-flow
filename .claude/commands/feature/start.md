---
description: Start working on a feature in DDD → BDD → TDD → Git flow
argument-hint: [feature name]
allowed-tools: Edit, Read, Glob, Write
---
1. Compute a URL/slug-safe version of "$ARGUMENTS" (lowercase, hyphens instead of spaces).
2. Update @docs/workflow/feature-state.json:
   - current_feature: the slug
   - phase: "ddd"
   - status: "in-progress"
3. Under @docs/features/<slug>/ create (if missing):
   - domain-notes.md
   - feature.feature
   - tdd-plan.md
4. Seed each file with a small header mentioning the human-readable feature name.
5. Explain to the user:
   - the slug and path for the feature,
   - that we are now in **DDD** phase,
   - which agent to call next (ddd-partner),
   - and provide a suggested prompt they can copy-paste.
