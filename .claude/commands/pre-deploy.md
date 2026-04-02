Before deploying anything, run this checklist in order:
1. Run `npx tsc --noEmit` — list every error. Fix all before proceeding.
2. Run `git branch` — confirm we are on main. If not, switch to main.
3. Run `git status` — list all changed files and confirm they are expected.
4. Check every internal link in changed files points to a route that exists in the app directory.
5. Check no reference to /ai-visibility-checker exists (deleted — redirects to /aeo-report).
6. Check no reference to "vendor" in user-facing copy — should be "firm".
7. Confirm commit message is descriptive and accurate.
8. Push to main.
Report pass/fail for each step before pushing.
