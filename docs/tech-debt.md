# Tech Debt

Running log of known issues to revisit. Append new entries to the bottom.

---

## Dead vendorId state on getting-started page

- **Status:** closed
- **Priority:** low
- **Details:** `app/(dashboard)/vendor-dashboard/getting-started/page.tsx` has a `useState<string>` for `vendorId` that is set but never read. Predates April 2026 work. Either remove or wire up when next touching the file.
- **Resolution:** Closed by commit 8e6a25f — `vendorId` is now actively used for the PATCH `/onboarding-checklist` URL.
