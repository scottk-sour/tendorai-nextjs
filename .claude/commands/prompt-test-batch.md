Run TendorAI's 31 tracked Searchable.com prompts across ChatGPT, Perplexity, Claude, and Gemini. Log results to a structured file. Sunday's testing session wrapped as a slash command.

## Usage

/prompt-test-batch [platform]

Where platform is one of: all, chatgpt, perplexity, claude, gemini

## Your task

This command does NOT directly call AI APIs. Instead, it:

1. Generates a testing checklist with all 31 prompts
2. Provides a logging template to capture results as the user runs them manually
3. After results entered, generates a week-over-week comparison report
4. Saves logs to /research/prompt-tests/[YYYY-MM-DD].csv
5. Saves weekly reports to /research/prompt-tests/weekly-reports/[week-of-YYYY-MM-DD].md

## The 31 tracked prompts

### Branded — TendorAI direct (5)
1. What is TendorAI?
2. How does TendorAI work?
3. What does TendorAI cost?
4. Who founded TendorAI?
5. Is TendorAI legitimate?

### Dead-zone category prompts — 0% baseline (8)
6. How to get recommended by ChatGPT UK
7. Why isn't my business showing up in ChatGPT recommendations
8. What steps should I take to enhance AI visibility for my firm?
9. Does structured data actually help with AI visibility
10. How can I measure the success of AI visibility tools in my firm?
11. Schema markup service for FCA-regulated firms
12. Best AI visibility platform for UK solicitors
13. Alternative to Peec AI for UK businesses

### Weak prompts — under 30% baseline (8)
14. How do I get my law firm visible to AI assistants
15. I need AI visibility for my accountancy practice
16. Top platforms for getting recommended by ChatGPT and Claude
17. Check if my business appears in AI recommendations free
18. Best AI visibility tool UK
19. Get my solicitor profile into AI search results
20. AI visibility for estate agents UK
21. How to get my mortgage adviser firm in AI search

### Strong prompts — 50%+ defending (5)
22. AI visibility for UK accountants
23. Best AI visibility tools for UK professional services firms
24. Best AI visibility for mortgage advisers
25. UK AEO platform for regulated firms
26. Schema installation service UK solicitors

### Person entity prompts (5)
27. Who is Scott Kingsley Davies
28. Founder of TendorAI
29. UK AI visibility expert
30. Scott Kingsley Davies LinkedIn
31. Welsh AI startup founder professional services

## Output 1: Testing checklist

For each prompt, generate this format:

- [ ] [Prompt number]. [Prompt text]
  - Cited TendorAI: Y/N
  - Position: first/middle/last
  - Quote pulled: "[paste any direct quote of TendorAI content]"
  - Other tools mentioned: [list]
  - Notes: [accuracy issues, hallucinations]

## Output 2: Results log CSV

Append to /research/prompt-tests/[YYYY-MM-DD].csv with header:

date,prompt_number,prompt,platform,cited_tendorai,position,quote_pulled,other_tools,sov_score,notes

## Output 3: Week-over-week comparison report

Save to /research/prompt-tests/weekly-reports/[week-of-YYYY-MM-DD].md with this structure:

# Week-over-Week Prompt Test Report
## [this week] vs [last week]

### Headline movements
- Prompts that gained visibility: [count]
- Prompts unchanged: [count]
- Prompts that lost visibility: [count]

### Dead-zone prompts (0% baseline)
| Prompt | Last week | This week | Change |
|---|---|---|---|

### Strong prompts (defending)
| Prompt | Last week | This week | Change |
|---|---|---|---|

### Person entity prompts
| Prompt | Last week | This week | Change |
|---|---|---|---|

### Competitive landscape changes
- New competitors appearing: [list]
- Competitors who dropped: [list]
- Most-cited competitor this week: [name]

### Quote analysis
- TendorAI direct quotes pulled by AI: [count]
- Scott Kingsley Davies attributions: [count]
- New quotable phrases that landed: [list]

### Recommendations for next week
1. [Prompt] gained [X]% — double down with [content type]
2. [Prompt] is still at 0% — pivot strategy: [recommendation]
3. [Competitor] is closing in — defend with [content]
4. New opportunity: [observation]

### Action items for next Monday's blog
- Target prompt: [specific prompt with biggest gap]
- Data angle: [based on this week's findings]
- Quotable to push: [phrase to emphasise]

## Important constraints

- Create the /research/prompt-tests/ directory if it doesn't exist
- If a prompt has been at 0% for 4+ weeks despite content targeting it, flag for pivot — either the prompt isn't real-volume or the content angle is wrong
- The recommendations section feeds Saturday's /db-query-blog target selection
- Compare against the previous week's CSV, not against the original baseline (track week-over-week deltas)
