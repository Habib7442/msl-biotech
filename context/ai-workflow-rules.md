# AI Workflow Rules

This document outlines instructions for AI agent behavior when constructing this website. Follow these commands strictly.

## 1. Incremental, Spec-Driven Development
- Always implement features **one unit at a time** as outlined in the Build Plan (`context/specs/00-build-plan.md`).
- Before starting work on a unit:
  - Verify that the matching spec file (`context/specs/XX-unit-name.md`) exists and is populated.
  - Mark the unit as in-progress `[/]` in `context/progress-tracker.md`.
- Never perform speculative code changes outside the scope of the current unit. Do not modify files unrelated to the active specification.

## 2. Document-Sync Rules
- If implementation changes necessitate adjustments to the system architecture, code standards, or UI components:
  - First, edit the relevant context file (`architecture.md`, `ui-context.md`, `code-standards.md`) to document the changes.
  - Second, execute the file modification.
- Always update `context/progress-tracker.md` at the end of each session or completed unit. Include concise summaries of:
  - What was completed.
  - What is in-progress.
  - Key architectural decisions.
  - Next steps to resume.

## 3. Scope Boundaries & Ambiguity
- If a requirement in a feature spec is undefined or ambiguous:
  - STOP and write down the clarifying question in the "Open Questions" section of `context/progress-tracker.md`.
  - Propose a reasonable default solution and list it next to the question.
  - If working synchronously, seek user approval before continuing. Otherwise, implement the proposed default and label it clearly in the progress tracker.

## 4. Verification Checklists
- Never mark a unit as complete `[x]` in `context/progress-tracker.md` without running the verification checklist defined in the spec.
- The minimum verification for any unit includes:
  - No TypeScript compilation errors.
  - The Next.js dev server builds successfully (`npm run build` validation is preferred for critical phases).
  - Responsive alignment on mobile viewport width (e.g., 375px) and desktop width (e.g., 1280px).
