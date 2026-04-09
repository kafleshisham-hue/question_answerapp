# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa.spec.ts >> user can paste a document, ask a question, and see an answer
- Location: e2e\qa.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Paste your document text here…')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: 🌍
        - generic [ref=e6]:
          - heading "World Knowledge Base" [level=1] [ref=e7]
          - paragraph [ref=e8]: Powered by Gemini 2.5 Flash
        - generic [ref=e9]:
          - generic [ref=e10]: Nepal
          - generic [ref=e11]: Canada
          - generic [ref=e12]: Japan
          - generic [ref=e13]: Brazil
          - generic [ref=e14]: Germany
    - main [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: 🗺️
          - heading "Ask about any country" [level=2] [ref=e19]
          - paragraph [ref=e20]: Explore facts about Nepal, Canada, Japan, Brazil, and Germany
        - generic [ref=e21]:
          - button "What is the capital of Nepal?" [ref=e22]
          - button "How many people live in Japan?" [ref=e23]
          - button "What languages are spoken in Canada?" [ref=e24]
          - button "What is Brazil known for?" [ref=e25]
          - button "Where is Germany located?" [ref=e26]
    - generic [ref=e28]:
      - textbox "Ask about a country…" [active] [ref=e29]
      - button [disabled] [ref=e30]:
        - img [ref=e31]
  - button "Open Next.js Dev Tools" [ref=e38] [cursor=pointer]:
    - img [ref=e39]
  - alert [ref=e42]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test('user can paste a document, ask a question, and see an answer', async ({ page }) => {
  4  |   await page.goto('/')
  5  | 
  6  |   // Paste sample document text
> 7  |   await page.getByPlaceholder('Paste your document text here…').fill(
     |                                                                 ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  8  |     'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. ' +
  9  |     'It was constructed from 1887 to 1889 as the centerpiece of the 1889 World\'s Fair. ' +
  10 |     'The tower is 330 metres tall and is the tallest structure in Paris.'
  11 |   )
  12 | 
  13 |   // Type a question
  14 |   await page.getByPlaceholder('Ask a question about your document…').fill(
  15 |     'How tall is the Eiffel Tower?'
  16 |   )
  17 | 
  18 |   // Click Ask
  19 |   await page.getByRole('button', { name: 'Ask' }).click()
  20 | 
  21 |   // Wait for an answer to appear (allow up to 30s for the AI response)
  22 |   await expect(
  23 |     page.locator('.justify-start .rounded-2xl').first()
  24 |   ).not.toBeEmpty({ timeout: 30_000 })
  25 | })
  26 | 
```