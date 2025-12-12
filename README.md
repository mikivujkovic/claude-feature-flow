# Claude Code Feature Flow: DDD → BDD → TDD → Git Commit

This repository contains a **production-ready but simple Claude Code setup** for
working feature-by-feature in an interactive flow:

1. **Domain-Driven Design (DDD)** for the feature
2. **Behavior-Driven Design (BDD)** using Gherkin
3. **Test-Driven Development (TDD)** to implement the feature
4. **Git commit** when the feature is finished and the user accepts it

The flow is **code-agnostic** – you can plug in **any programming language or framework**.
Claude will not assume React/Next.js, etc.

## High-level usage

1. Start a feature

   ```text
   /feature:start "Add todo item"
   ```

2. Ask what to do next (DDD → BDD → TDD)

   ```text
   /feature:next
   ```

3. Follow the instructions and use the suggested agents/prompts.

4. When you believe the feature is done, run:

   ```text
   /feature:accept
   ```

   - Claude will:
     - run your test command (if configured),
     - summarize what changed for this feature,
     - ask you to confirm the feature is acceptable,
     - then (with your approval) run a **git commit** for that feature.

You remain involved at **every step** – Claude will ask questions and wait for your answers.
