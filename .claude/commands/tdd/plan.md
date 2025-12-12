---
description: Derive a TDD plan from the Gherkin feature for the current feature
allowed-tools: Read, Edit
---
1. Read @docs/workflow/feature-state.json and docs/features/<slug>/feature.feature.
2. For each scenario:
   - Identify the smallest units of behavior that need tests.
   - Map them to test "examples" in plain language (no code) in docs/features/<slug>/tdd-plan.md.
   - Suggest where tests should live (file/module name) in a language/framework-agnostic way.
3. At the top of tdd-plan.md, add a short checklist:
   - [ ] First test to write
   - [ ] Next tests
   - [ ] Refactor opportunities to watch for
4. Present the plan to the user and remind them they remain in control of the actual test framework and code locations.
