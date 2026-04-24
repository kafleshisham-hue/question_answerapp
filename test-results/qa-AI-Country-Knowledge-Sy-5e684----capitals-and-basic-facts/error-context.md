# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa.spec.ts >> AI Country Knowledge System - Balanced Test Suite >> Core functionality - capitals and basic facts
- Location: e2e\qa.spec.ts:13:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Canberra')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for locator('text=Canberra')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: 🌍
        - generic [ref=e6]:
          - heading "World Knowledge Base" [level=1] [ref=e7]
          - paragraph [ref=e8]: Bright country cards, AI answers, and interactive exploration.
        - generic [ref=e9]:
          - generic [ref=e10]: Nepal
          - generic [ref=e11]: Canada
          - generic [ref=e12]: Japan
          - generic [ref=e13]: Brazil
          - generic [ref=e14]: Germany
          - generic [ref=e15]: Australia
          - generic [ref=e16]: India
          - generic [ref=e17]: Egypt
          - generic [ref=e18]: +4 more
    - main [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e22]: What is the capital of Australia?
        - generic [ref=e23]:
          - generic [ref=e24]: ⚠️
          - generic [ref=e25]: "OpenAI error: 404 The model `gpt-4` does not exist or you do not have access to it."
    - contentinfo [ref=e26]:
      - paragraph [ref=e28]: Powered by OpenAI GPT-4 • Built with Next.js
    - generic [ref=e30]:
      - button "Clear" [ref=e31]
      - textbox "Ask about a country…" [ref=e32]
      - button [disabled] [ref=e33]:
        - img [ref=e34]
  - button "Open Next.js Dev Tools" [ref=e41] [cursor=pointer]:
    - img [ref=e42]
  - alert [ref=e45]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('AI Country Knowledge System - Balanced Test Suite', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Set reasonable timeout for AI responses
  6  |     test.setTimeout(60000); // 1 minute
  7  | 
  8  |     // Navigate to the app
  9  |     await page.goto('http://localhost:3000');
  10 |     await page.waitForLoadState('networkidle');
  11 |   });
  12 | 
  13 |   test('Core functionality - capitals and basic facts', async ({ page }) => {
  14 |     const questions = [
  15 |       { query: 'What is the capital of Australia?', expected: 'Canberra' },
  16 |       { query: 'What is the capital of Japan?', expected: 'Tokyo' },
  17 |       { query: 'What is the capital of Brazil?', expected: 'Brasilia' },
  18 |       { query: 'What is the capital of Egypt?', expected: 'Cairo' }
  19 |     ];
  20 | 
  21 |     // Test each question with a pause to respect rate limits
  22 |     for (const { query, expected } of questions) {
  23 |       console.log(`Testing: ${query}`);
  24 | 
  25 |       const searchBox = page.locator('input').first();
  26 |       await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  27 |       await searchBox.clear();
  28 |       await searchBox.fill(query);
  29 |       await searchBox.press('Enter');
  30 | 
  31 |       // Wait for response and check it contains expected text
> 32 |       await expect(page.locator('text=' + expected)).toBeVisible({ timeout: 30000 });
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  33 | 
  34 |       // Longer pause between questions to respect API rate limits
  35 |       await page.waitForTimeout(5000);
  36 |     }
  37 |   });
  38 | 
  39 |   test('UI interaction test - cards functionality', async ({ page }) => {
  40 |     // Test hide/show cards functionality
  41 |     const hideShowButton = page.locator('text=Hide country cards').or(page.locator('text=Show country cards'));
  42 |     await hideShowButton.waitFor({ state: 'visible', timeout: 10000 });
  43 | 
  44 |     // Initially should show cards
  45 |     await expect(page.locator('text=Nepal')).toBeVisible();
  46 | 
  47 |     // Click to hide
  48 |     await hideShowButton.click();
  49 |     await expect(page.locator('text=Nepal')).not.toBeVisible();
  50 | 
  51 |     // Click to show again
  52 |     await hideShowButton.click();
  53 |     await expect(page.locator('text=Nepal')).toBeVisible();
  54 | 
  55 |     // Test clicking on a suggestion (no API call needed)
  56 |     const suggestion = page.locator('text=What is the capital of India?');
  57 |     await suggestion.click();
  58 |     await expect(page.locator('input').first()).toHaveValue('What is the capital of India?');
  59 |   });
  60 | 
  61 |   test('Conversation flow - follow-up questions', async ({ page }) => {
  62 |     const searchBox = page.locator('input').first();
  63 | 
  64 |     // First question
  65 |     await searchBox.fill('Tell me about China');
  66 |     await searchBox.press('Enter');
  67 |     await expect(page.locator('text=China')).toBeVisible({ timeout: 30000 });
  68 | 
  69 |     // Wait before follow-up to respect rate limits
  70 |     await page.waitForTimeout(8000);
  71 | 
  72 |     // Follow-up question
  73 |     await searchBox.fill('What about its population?');
  74 |     await searchBox.press('Enter');
  75 |     await expect(page.locator('text=1,400,000,000')).toBeVisible({ timeout: 30000 });
  76 |   });
  77 | 
  78 |   test('Data accuracy verification', async ({ page }) => {
  79 |     const searchBox = page.locator('input').first();
  80 | 
  81 |     // Test specific facts that should be accurate
  82 |     const factChecks = [
  83 |       { question: 'What region is Australia in?', expected: 'Oceania' },
  84 |       { question: 'What languages are spoken in Germany?', expected: 'German' }
  85 |     ];
  86 | 
  87 |     for (const { question, expected } of factChecks) {
  88 |       await searchBox.clear();
  89 |       await searchBox.fill(question);
  90 |       await searchBox.press('Enter');
  91 |       await expect(page.locator('text=' + expected)).toBeVisible({ timeout: 30000 });
  92 | 
  93 |       // Respect rate limits
  94 |       await page.waitForTimeout(6000);
  95 |     }
  96 |   });
  97 | });
```