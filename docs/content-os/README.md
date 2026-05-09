# Content OS

Canonical framework: tendorai-content-os.md

This is the single source of truth for how TendorAI produces content.
Everything else (slash commands, agent prompts, brief templates,
pre-publish checks) references this document by section number.

## Files in this folder

- tendorai-content-os.md — the canonical framework (40 sections, 46 rules)
- brief-template.md — copy this for every new piece, fill it out, get
  it approved before drafting
- pre-publish-checklist.md — copy this into the article folder before
  publish, every item ticked before merge
- archive/ — historical versions (v6 through v9.1), not authoritative

## Workflow

1. New content idea → copy brief-template.md to docs/content-os/briefs/[slug].md
2. Fill out brief, get approval
3. Draft against OS rules (cite the rules being applied)
4. Copy pre-publish-checklist.md to /content/articles/[slug]/pre-publish.md
5. Tick every item before opening PR
6. Merge only when all items ticked

## Updates to this OS

The OS is canonical and intentionally stable. Operational decisions
(SoMV targets, query universe, refresh queue) belong in the
Operations Manual (separate document), not in this OS.

If a real framework change is needed, that's a Content OS v2 — a
once-a-year decision, not a weekend hobby.
