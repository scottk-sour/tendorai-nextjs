Audit all internal links across the entire Next.js app:
1. Find every href, Link, and redirect in the codebase.
2. For each one, verify the target route exists in the app directory.
3. List all broken or suspect links with file name and line number.
4. Flag any reference to deleted routes: /ai-visibility-checker, /pricing (standalone).
5. Flag any nav items linking to non-existent anchors.
Do not fix anything — audit and report only.
