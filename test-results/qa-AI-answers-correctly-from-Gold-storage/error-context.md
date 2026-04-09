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
- main [ref=e3]:
  - paragraph [ref=e4]:
    - generic [ref=e5]:
      - strong [ref=e6]: "404"
      - text: ": NOT_FOUND"
    - generic [ref=e7]:
      - text: "Code:"
      - code [ref=e8]: "`DEPLOYMENT_NOT_FOUND`"
    - generic [ref=e9]:
      - text: "ID:"
      - code [ref=e10]: "`yul1::bflsg-1775761443972-2bad585b05dc`"
  - link "This deployment cannot be found. For more information and troubleshooting, see our documentation." [ref=e11] [cursor=pointer]:
    - /url: https://vercel.com/docs/errors/DEPLOYMENT_NOT_FOUND
    - generic [ref=e12]: This deployment cannot be found. For more information and troubleshooting, see our documentation.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('AI answers correctly from Gold storage', async ({ page }) => {
  4  |   // 1. Go to your actual Vercel URL
  5  |   await page.goto('https://your-real-app-name.vercel.app'); 
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