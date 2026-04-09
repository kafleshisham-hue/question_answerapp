# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa.spec.ts >> AI answers correctly from Gold storage
- Location: e2e\qa.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Ask about a country...')

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
  - alert [ref=e33]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('AI answers correctly from Gold storage', async ({ page }) => {
  4  |   // 1. Go to your actual Vercel URL
  5  |   await page.goto('https://question-answerapp-38dyq4813-kafleshisham-hues-projects.vercel.app/'); 
  6  | 
  7  |   // 2. Use the exact placeholder from your screenshot
  8  |   const searchBox = page.getByPlaceholder('Ask about a country...');
  9  |   
  10 |   // 3. Type the question and press Enter
> 11 |   await searchBox.fill('What is the capital of Australia?');
     |                   ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  12 |   await searchBox.press('Enter');
  13 | 
  14 |   // 4. Wait for the AI to mention Canberra (from your Gold data)
  15 |   await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 20000 });
  16 | });
```