Run TypeScript and fix every error before stopping.

1. Run `npx tsc --noEmit` and capture the output.
2. Count the errors. If zero, report clean and stop.
3. Group errors by file. Fix in this order:
   - `app/` first (user-facing routes)
   - then `components/`
   - then `lib/` and `utils/`
   - then everything else
4. After each file is fixed, re-run `npx tsc --noEmit` to confirm the count is dropping. If it isn't, stop and report what happened.
5. Loop until the error count is 0.
6. Do not silence errors with `any`, `// @ts-ignore`, or `// @ts-expect-error` unless the user has explicitly approved it for a specific line. Fix the type.
7. Do not delete code to make errors go away.
8. Report the final clean run before stopping. Do not commit — leave that to the user.
