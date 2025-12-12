---
description: Help write or refine the Gherkin feature file for the current feature
allowed-tools: Read, Edit
---
1. Read @docs/workflow/feature-state.json and ensure a feature and slug exist.
2. Read docs/features/<slug>/domain-notes.md and docs/features/<slug>/feature.feature.
3. Using the glossary/terms from domain-notes.md, update feature.feature to contain:
   - A clear `Feature:` line describing business value,
   - 2–5 `Scenario:` blocks in Given/When/Then form,
   - Steps that speak in domain language, not UI clicks.
4. Show the updated scenarios to the user and invite them to suggest changes.
