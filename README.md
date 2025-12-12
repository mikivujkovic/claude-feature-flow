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


# Detailed flow:

---

## 0. One-time setup

In the repo root (after unzip):

1. Initialize git (if you want auto-commit):

```bash
git init
```

2. Optionally set your test command in `docs/workflow/config.json`, e.g.:

```json
{
  "test_command": "npm test",
  "default_branch": "main"
}
```

Now open this folder in Claude Code.

---

## 1. Start the feature (DDD phase)

### 1.1 Start the feature

In Claude Code chat:

```text
/feature:start "Add todo item"
```

**What this command does internally:**

* Writes `docs/workflow/feature-state.json` like:

```json
{
  "current_feature": "add-todo-item",
  "phase": "ddd",
  "status": "in-progress"
}
```

* Creates:

  * `docs/features/add-todo-item/domain-notes.md`
  * `docs/features/add-todo-item/feature.feature`
  * `docs/features/add-todo-item/tdd-plan.md`

* Seeds them with headers containing “Add todo item”.

**What Claude should explain back:**

Something like:

> I created:
>
> * docs/features/add-todo-item/domain-notes.md
> * docs/features/add-todo-item/feature.feature
> * docs/features/add-todo-item/tdd-plan.md
>
> We are now in **DDD phase** for feature `add-todo-item`.
> Next: involve the user in clarifying domain language and rules using the **ddd-partner** agent.
> Suggested prompt:
> `Use the subagent ddd-partner. Help me capture the domain for "Add todo item".`

---

## 2. DDD: clarify domain for “Add todo item”

### 2.1 Ask for status (optional but nice)

```text
/feature:status
```

Claude should respond:

* Current feature: `add-todo-item`
* Phase: `ddd`
* Status: `in-progress`
* DDD expectations, e.g.:

> - Identify key terms (Todo item, Title, List, etc.)
> - List rules/invariants for adding a todo
> - Note a few examples and edge cases

### 2.2 Use the DDD agent interactively

Now you start the domain conversation. Paste:

```text
Use the subagent ddd-partner.
We are working on the feature "Add todo item".
Please:
1) Ask me about important domain terms, rules, and edge cases,
2) Capture them in docs/features/add-todo-item/domain-notes.md under:
   - Terms / Glossary
   - Rules / Invariants
   - Examples
3) Keep language business-readable and code-agnostic.
Ask questions one at a time so I can answer.
```

**How the interaction goes (example):**

**Claude (ddd-partner):**

> Let’s start with terms.
> Q1: In your domain, what exactly is a “todo item”? How would you explain it to a non-technical person?

You answer in your own words:

**You:**

> A todo item is something a user wants to remember to do later.
> It has a short title, and optionally some details.

Claude then updates `domain-notes.md` and asks next questions (rules, edge cases: empty title, max length, etc.).

You keep answering until the notes feel right.

### 2.3 Decide DDD is “good enough” for this feature

Once you’re happy with `domain-notes.md`, tell Claude plainly:

```text
DDD for this feature is clear enough. Please treat domain-notes.md as our source of truth and move to the BDD phase.
```

Now call the flow helper:

```text
/feature:next
```

**What should happen:**

* Claude reads `feature-state.json` (phase = "ddd").
* It confirms you want to move to BDD.
* Then updates `phase` → `"bdd"` and reminds you:

> We’re now in **BDD phase** for `add-todo-item`.
> Next: write/refine Gherkin scenarios in `feature.feature` using `bdd-partner`.

---

## 3. BDD: write Gherkin for “Add todo item”

### 3.1 Use the BDD helper command

```text
/bdd:feature
```

This command:

* Reads:

  * `docs/features/add-todo-item/domain-notes.md`
  * `docs/features/add-todo-item/feature.feature`
* Updates `feature.feature` with:

  * a `Feature: Add todo item` header
  * 2–5 example scenarios in Given/When/Then

Example content it might write:

```gherkin
Feature: Add todo item
  In order to track tasks I need to do
  As a user
  I want to add todo items with clear titles

  Scenario: Successfully add a todo item
    Given I have an empty list of todos
    When I add a todo with title "Buy milk"
    Then a todo with title "Buy milk" is stored in my list

  Scenario: Reject empty title
    Given I am adding a new todo
    When I try to add a todo with an empty title
    Then the todo is not created
    And I see a message that the title is required
```

Claude should show this and ask for feedback.

### 3.2 Refine via `bdd-partner` (dialogue with user)

You then say:

```text
Use the subagent bdd-partner.
Review docs/features/add-todo-item/domain-notes.md and feature.feature.
1) Propose one more edge case scenario (e.g., title with leading/trailing spaces),
2) Rewrite any steps that sound like UI clicks into domain language,
3) Show me the updated scenarios and ask if I’m happy with the wording.
```

You review. If something feels off, you say:

> Change “see a message that the title is required” to “the system indicates the title is required”.

Claude updates `feature.feature`.

### 3.3 Mark BDD as done for this feature

Once you’re happy with the scenarios:

```text
I’m happy with the Gherkin scenarios for this feature. Please move to the TDD phase.
```

Then:

```text
/feature:next
```

Claude should:

* Confirm phase switch from `bdd` → `tdd` in `feature-state.json`.
* Tell you next steps:

> We’re now in **TDD phase** for `add-todo-item`.
> Use `/tdd:plan` and the `tdd-partner` agent to derive small tests from the scenarios, then implement in your chosen language/framework.

---

## 4. TDD: derive tests + implement “Add todo item”

### 4.1 Create the TDD plan

```text
/tdd:plan
```

The command:

* Reads `feature.feature`
* Writes/updates `docs/features/add-todo-item/tdd-plan.md` with:

  * a checklist
  * mapped tests per scenario

Example `tdd-plan.md`:

```md
# TDD plan: Add todo item

## Checklist
- [ ] First test: reject empty title
- [ ] Next tests: accept valid title, trim whitespace
- [ ] Refactor: extract Title validation, keep API simple

## From Scenario: Successfully add a todo item
- Test: creating a todo with a non-empty title adds it to the list.
- Suggested test location: tests/todo/add_todo_test.(js|ts|py|go|...)

## From Scenario: Reject empty title
- Test: creating a todo with an empty title is rejected with an error.
- Suggested test location: tests/todo/add_todo_validation_test.(...)
```

Claude then explains how to use this.

### 4.2 Use `tdd-partner` for interactive test planning

Now you bring in the agent:

```text
Use the subagent tdd-partner.
We are in TDD phase for "Add todo item".
1) Look at feature.feature and tdd-plan.md,
2) Tell me what the **first smallest test** should be (RED),
3) Explain, in plain language, what it should assert,
4) Suggest a reasonable test file name pattern (but stay language-agnostic).
```

Example response:

> First test: “reject empty title”.
> Assertion: when the API/use case is asked to create a todo with an empty title, it returns a failure or throws a domain error, and no todo is stored.
> Suggested file: `tests/todo/add_todo_validation_test.<lang>`.

At this point **you** write the actual test in your stack (JS, TS, Python, Go, whatever). Claude can help if you ask, but the setup doesn’t assume any language.

### 4.3 Run tests manually or via `/verify`

While implementing, you can:

* Run your test command directly, or
* Use:

```text
/verify
```

This:

* Reads `docs/workflow/config.json` → `test_command`
* Runs it via Bash
* Shows PASS/FAIL

You iterate:

1. Write a failing test (RED) for empty title.
2. Add minimal implementation (GREEN).
3. Clean up (REFACTOR).
4. Run `/verify` until it passes.

Then repeat for the next behavior:

* valid title added
* title trimming
* etc., as per `tdd-plan.md`.

You can keep using `tdd-partner` to decide “what’s the next smallest test”:

```text
Use the subagent tdd-partner.
Now that I’ve implemented the first test for rejecting empty titles, tell me:
- The next test to write,
- The assertion in plain language,
- Where you’d put it.
```

---

## 5. Accept the feature + Git commit

When you think *“Add todo item” is done* (tests passing, behavior matches scenarios):

### 5.1 Run `/feature:status` (optional)

```text
/feature:status
```

Claude shows:

* Feature: `add-todo-item`
* Phase: `tdd`
* Status: `in-progress`
* Reminder to run tests before accept.

### 5.2 Run `/feature:accept`

```text
/feature:accept
```

**What happens:**

1. It reads `feature-state.json` and `config.json`.

2. Runs the `test_command` via Bash:

   * If tests **fail**:

     * It shows summary and refuses to accept.
     * You fix tests and re-run `/feature:accept`.
   * If tests **pass**:

     * It summarizes:

       * `domain-notes.md` (terms, rules)
       * `feature.feature` (scenarios)
       * `tdd-plan.md` (tests & implementation plan)
     * Then asks:

       > Do you **accept** this feature as done? (yes/no; or tell me what to change.)

3. You answer, e.g.:

```text
Yes, I accept this feature as done.
```

4. Claude asks for a commit message:

```text
Please give me a git commit message to use for this feature.
```

You respond:

```text
"feat(todo): add domain rules and tests for adding todos"
```

5. If a `.git` folder exists:

   * It runs (through a Bash tool):

     * `git status --short`
     * `git add ...` (likely all tracked changes)
     * `git commit -m "feat(todo): add domain rules and tests for adding todos"`

   * Then updates `feature-state.json`:

```json
{
  "current_feature": "add-todo-item",
  "phase": "done",
  "status": "accepted"
}
```

If you *don’t* want auto-commit, you can answer:

```text
I accept the feature, but do NOT commit. I will commit manually.
```

In that case it marks the feature as accepted/done but skips git.

---

## 6. What you’d typically type, start to finish (summary)

Just to see it all in one place:

```text
/feature:start "Add todo item"

Use the subagent ddd-partner. We are working on "Add todo item"...
# (answer its questions until domain-notes.md looks good)

I’m happy with the domain notes for this feature. Please move to BDD.
/feature:next

/bdd:feature
Use the subagent bdd-partner. Refine the scenarios and add an edge case...
# (iterate until feature.feature looks good)

I’m happy with the Gherkin for this feature. Please move to TDD.
/feature:next

/tdd:plan
Use the subagent tdd-partner. Tell me the first test I should write...
# (you write tests & code in your chosen tech, run /verify as needed)

/feature:accept
# (accept when tests pass; optionally let it commit via git)
```

---

If you’d like, next we can design **one more feature** (e.g. “Complete todo item”) using the same flow, and I can show how to keep domain consistency across multiple features while staying language-agnostic.

