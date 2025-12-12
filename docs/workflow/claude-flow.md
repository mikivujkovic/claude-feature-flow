# Claude Feature Flow (DDD → BDD → TDD → Git)

For each feature:

1. `/feature:start "Some feature"`  
   - Creates a folder under `docs/features/<slug>/`.
   - Initializes:
     - `domain-notes.md` (DDD)
     - `feature.feature` (BDD)
     - `tdd-plan.md` (TDD)
   - Sets `feature-state.json` with `current_feature` and `phase: "ddd"`.

2. `/feature:next`  
   - Reads `feature-state.json` and tells you what to do next:
     - In **DDD**: talk through the domain, update `domain-notes.md`.
     - In **BDD**: write/refine Gherkin in `feature.feature`.
     - In **TDD**: derive tests/units in `tdd-plan.md` and implement.

3. You follow the instructions, using the suggested **agents**:
   - `ddd-partner` for domain conversations.
   - `bdd-partner` for Gherkin and examples.
   - `tdd-partner` for mapping examples to tests/code.

4. `/feature:accept`  
   - Runs your test command.
   - Summarizes changes for the current feature.
   - Asks whether the feature is accepted.
   - If you approve and git is available:
     - asks you for a commit message,
     - runs `git add` and `git commit`.

The workflow is **code-agnostic** – your code layout and tools are up to you.
Just keep your tests runnable via the test command in `config.json`.
