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
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="Ask"]')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('AI answers correctly from Gold storage', async ({ page }) => {
  4  |   // Go to your LIVE Vercel URL
  5  |   await page.goto('https://your-app-name.vercel.app'); 
  6  | 
  7  |   // Ask about Spain (The data you just added to Bronze and synced to GCP!)
> 8  |   await page.fill('input[placeholder*="Ask"]', 'What is the capital of Spain?');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  9  |   await page.keyboard.press('Enter');
  10 | 
  11 |   // Assert it finds the answer from your Gold JSON file
  12 |   await expect(page.locator('text=Madrid')).toBeVisible({ timeout: 15000 });
  13 | });
```