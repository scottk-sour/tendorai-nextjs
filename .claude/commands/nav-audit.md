Audit the navigation against the rules in CLAUDE.md.

1. Find the main nav component(s) — search `components/` for `Nav`, `Navbar`, `Header`. Also locate the mobile nav if it's a separate component.
2. List every nav item with: label, href, desktop / mobile / both.
3. For each item, verify:
   - The `href` points to a route that exists in the `app/` directory.
   - Anchor links (e.g. `/for-vendors#pricing`) point to an actual `id` on the target page.
   - External links open with `target="_blank"` and `rel="noopener noreferrer"`.
4. Flag every violation of these rules from CLAUDE.md:
   - No nav item labelled "Home" — the logo handles home.
   - No standalone "Pricing" item — pricing lives at `/for-vendors#pricing`.
   - The firm login link is labelled "Firm Login", not "Vendor Login".
   - No link to `/ai-visibility-checker` (deleted route).
   - No duplicate items pointing to the same route.
5. Check the mobile nav mirrors the desktop nav. Flag items present in one but not the other unless there's a clear reason.
6. Report findings as a table:

```
item | href | desktop/mobile | status
```

Status values: `OK`, `broken-route`, `broken-anchor`, `wrong-label`, `forbidden`, `desktop-only`, `mobile-only`, `duplicate`.

Do not fix anything — audit and report only. End with a count of OK vs flagged items.
