Before creating any new page, run this checklist:
1. Search the app directory for any existing page at the target route.
2. Search for any redirect pointing to or from that route in next.config.js.
3. Check the nav component — does this page need to be added to the nav?
4. Confirm the page does not duplicate an existing page with different URL.
5. Report findings before creating anything.
Then create the page following the existing design system:
- Match hero section style to /vendor-login hero (light gradient, dark text)
- Use existing Tailwind classes and component patterns
- Add correct SEO metadata (title, description)
- Add FAQ section if the page is a tool or landing page
- Mobile responsive
- TypeScript clean before committing
- Commit to main with descriptive message
