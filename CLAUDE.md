# Claude Code Feature Flow: DDD → BDD → TDD → Git

This repo is configured for a **feature-based workflow**:

1. **Start a feature** with `/feature:start "<feature name>"`.
2. **Walk through phases** with `/feature:next`:
   - DDD (domain notes, terms, rules)
   - BDD (Gherkin feature + scenarios)
   - TDD (tests + implementation)
3. **Accept + commit** finished feature with `/feature:accept`.

The flow is:
- interactive (you are involved at each step),
- language/framework agnostic,
- designed to be resilient for real-world work.

## Expectations

- You keep tests runnable using your own stack (e.g. `npm test`, `pytest`, `go test`).
- You configure the test command in `docs/workflow/config.json`.
- You have an initialized git repo if you want automated commits.

If you don’t want automated commits, simply say **“do not commit”**
when `/feature:accept` asks for permission.
