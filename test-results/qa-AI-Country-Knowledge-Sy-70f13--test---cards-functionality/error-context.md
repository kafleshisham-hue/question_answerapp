# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa.spec.ts >> AI Country Knowledge System - Balanced Test Suite >> UI interaction test - cards functionality
- Location: e2e\qa.spec.ts:39:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Nepal')
Expected: visible
Error: strict mode violation: locator('text=Nepal') resolved to 4 elements:
    1) <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">Nepal</span> aka getByRole('banner').getByText('Nepal')
    2) <p class="mt-2 text-sm text-slate-500">Explore facts for 12 countries including Nepal, I…</p> aka getByText('Explore facts for 12')
    3) <h3 class="text-xl font-semibold text-slate-900">Nepal</h3> aka getByRole('heading', { name: 'Nepal' })
    4) <div class="flex h-full items-center justify-center text-slate-400">…</div> aka getByText('Click “Open map” to view Nepal on Google Maps.')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Nepal')

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
        - generic [ref=e21]:
          - generic [ref=e22]: 🗺️
          - heading "Ask about any country" [level=2] [ref=e23]
          - paragraph [ref=e24]: Explore facts for 12 countries including Nepal, India, Egypt, Mexico, France, China, and more.
        - button "Hide country cards" [ref=e26]
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]:
                - heading "Nepal" [level=3] [ref=e31]
                - paragraph [ref=e32]: Country facts.
              - link "Open map" [ref=e33] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Nepal
            - generic [ref=e35]: Click “Open map” to view Nepal on Google Maps.
            - generic [ref=e36]:
              - generic [ref=e37]: "Capital: Unknown"
              - generic [ref=e38]: "Population: Unknown"
              - generic [ref=e39]: "Region: Unknown"
              - generic [ref=e40]: "Languages: Unknown"
              - generic [ref=e41]: "Facts: No facts available"
            - generic [ref=e42]:
              - button "Ask AI" [ref=e43]
              - link "Map link" [ref=e44] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Nepal
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]:
                - heading "Canada" [level=3] [ref=e48]
                - paragraph [ref=e49]: Country facts.
              - link "Open map" [ref=e50] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Canada
            - generic [ref=e52]: Click “Open map” to view Canada on Google Maps.
            - generic [ref=e53]:
              - generic [ref=e54]: "Capital: Unknown"
              - generic [ref=e55]: "Population: Unknown"
              - generic [ref=e56]: "Region: Unknown"
              - generic [ref=e57]: "Languages: Unknown"
              - generic [ref=e58]: "Facts: No facts available"
            - generic [ref=e59]:
              - button "Ask AI" [ref=e60]
              - link "Map link" [ref=e61] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Canada
          - generic [ref=e62]:
            - generic [ref=e63]:
              - generic [ref=e64]:
                - heading "Japan" [level=3] [ref=e65]
                - paragraph [ref=e66]: Country facts.
              - link "Open map" [ref=e67] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Japan
            - generic [ref=e69]: Click “Open map” to view Japan on Google Maps.
            - generic [ref=e70]:
              - generic [ref=e71]: "Capital: Unknown"
              - generic [ref=e72]: "Population: Unknown"
              - generic [ref=e73]: "Region: Unknown"
              - generic [ref=e74]: "Languages: Unknown"
              - generic [ref=e75]: "Facts: No facts available"
            - generic [ref=e76]:
              - button "Ask AI" [ref=e77]
              - link "Map link" [ref=e78] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Japan
          - generic [ref=e79]:
            - generic [ref=e80]:
              - generic [ref=e81]:
                - heading "Brazil" [level=3] [ref=e82]
                - paragraph [ref=e83]: Country facts.
              - link "Open map" [ref=e84] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Brazil
            - generic [ref=e86]: Click “Open map” to view Brazil on Google Maps.
            - generic [ref=e87]:
              - generic [ref=e88]: "Capital: Unknown"
              - generic [ref=e89]: "Population: Unknown"
              - generic [ref=e90]: "Region: Unknown"
              - generic [ref=e91]: "Languages: Unknown"
              - generic [ref=e92]: "Facts: No facts available"
            - generic [ref=e93]:
              - button "Ask AI" [ref=e94]
              - link "Map link" [ref=e95] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Brazil
          - generic [ref=e96]:
            - generic [ref=e97]:
              - generic [ref=e98]:
                - heading "Germany" [level=3] [ref=e99]
                - paragraph [ref=e100]: Country facts.
              - link "Open map" [ref=e101] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Germany
            - generic [ref=e103]: Click “Open map” to view Germany on Google Maps.
            - generic [ref=e104]:
              - generic [ref=e105]: "Capital: Unknown"
              - generic [ref=e106]: "Population: Unknown"
              - generic [ref=e107]: "Region: Unknown"
              - generic [ref=e108]: "Languages: Unknown"
              - generic [ref=e109]: "Facts: No facts available"
            - generic [ref=e110]:
              - button "Ask AI" [ref=e111]
              - link "Map link" [ref=e112] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Germany
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]:
                - heading "Australia" [level=3] [ref=e116]
                - paragraph [ref=e117]: Country facts.
              - link "Open map" [ref=e118] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Australia
            - generic [ref=e120]: Click “Open map” to view Australia on Google Maps.
            - generic [ref=e121]:
              - generic [ref=e122]: "Capital: Unknown"
              - generic [ref=e123]: "Population: Unknown"
              - generic [ref=e124]: "Region: Unknown"
              - generic [ref=e125]: "Languages: Unknown"
              - generic [ref=e126]: "Facts: No facts available"
            - generic [ref=e127]:
              - button "Ask AI" [ref=e128]
              - link "Map link" [ref=e129] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Australia
          - generic [ref=e130]:
            - generic [ref=e131]:
              - generic [ref=e132]:
                - heading "India" [level=3] [ref=e133]
                - paragraph [ref=e134]: Country facts.
              - link "Open map" [ref=e135] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/India
            - generic [ref=e137]: Click “Open map” to view India on Google Maps.
            - generic [ref=e138]:
              - generic [ref=e139]: "Capital: Unknown"
              - generic [ref=e140]: "Population: Unknown"
              - generic [ref=e141]: "Region: Unknown"
              - generic [ref=e142]: "Languages: Unknown"
              - generic [ref=e143]: "Facts: No facts available"
            - generic [ref=e144]:
              - button "Ask AI" [ref=e145]
              - link "Map link" [ref=e146] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/India
          - generic [ref=e147]:
            - generic [ref=e148]:
              - generic [ref=e149]:
                - heading "Egypt" [level=3] [ref=e150]
                - paragraph [ref=e151]: Country facts.
              - link "Open map" [ref=e152] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Egypt
            - generic [ref=e154]: Click “Open map” to view Egypt on Google Maps.
            - generic [ref=e155]:
              - generic [ref=e156]: "Capital: Unknown"
              - generic [ref=e157]: "Population: Unknown"
              - generic [ref=e158]: "Region: Unknown"
              - generic [ref=e159]: "Languages: Unknown"
              - generic [ref=e160]: "Facts: No facts available"
            - generic [ref=e161]:
              - button "Ask AI" [ref=e162]
              - link "Map link" [ref=e163] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Egypt
          - generic [ref=e164]:
            - generic [ref=e165]:
              - generic [ref=e166]:
                - heading "Mexico" [level=3] [ref=e167]
                - paragraph [ref=e168]: Country facts.
              - link "Open map" [ref=e169] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Mexico
            - generic [ref=e171]: Click “Open map” to view Mexico on Google Maps.
            - generic [ref=e172]:
              - generic [ref=e173]: "Capital: Unknown"
              - generic [ref=e174]: "Population: Unknown"
              - generic [ref=e175]: "Region: Unknown"
              - generic [ref=e176]: "Languages: Unknown"
              - generic [ref=e177]: "Facts: No facts available"
            - generic [ref=e178]:
              - button "Ask AI" [ref=e179]
              - link "Map link" [ref=e180] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/Mexico
          - generic [ref=e181]:
            - generic [ref=e182]:
              - generic [ref=e183]:
                - heading "France" [level=3] [ref=e184]
                - paragraph [ref=e185]: Country facts.
              - link "Open map" [ref=e186] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/France
            - generic [ref=e188]: Click “Open map” to view France on Google Maps.
            - generic [ref=e189]:
              - generic [ref=e190]: "Capital: Unknown"
              - generic [ref=e191]: "Population: Unknown"
              - generic [ref=e192]: "Region: Unknown"
              - generic [ref=e193]: "Languages: Unknown"
              - generic [ref=e194]: "Facts: No facts available"
            - generic [ref=e195]:
              - button "Ask AI" [ref=e196]
              - link "Map link" [ref=e197] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/France
          - generic [ref=e198]:
            - generic [ref=e199]:
              - generic [ref=e200]:
                - heading "China" [level=3] [ref=e201]
                - paragraph [ref=e202]: Country facts.
              - link "Open map" [ref=e203] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/China
            - generic [ref=e205]: Click “Open map” to view China on Google Maps.
            - generic [ref=e206]:
              - generic [ref=e207]: "Capital: Unknown"
              - generic [ref=e208]: "Population: Unknown"
              - generic [ref=e209]: "Region: Unknown"
              - generic [ref=e210]: "Languages: Unknown"
              - generic [ref=e211]: "Facts: No facts available"
            - generic [ref=e212]:
              - button "Ask AI" [ref=e213]
              - link "Map link" [ref=e214] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/China
          - generic [ref=e215]:
            - generic [ref=e216]:
              - generic [ref=e217]:
                - heading "South Africa" [level=3] [ref=e218]
                - paragraph [ref=e219]: Country facts.
              - link "Open map" [ref=e220] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/South%20Africa
            - generic [ref=e222]: Click “Open map” to view South Africa on Google Maps.
            - generic [ref=e223]:
              - generic [ref=e224]: "Capital: Unknown"
              - generic [ref=e225]: "Population: Unknown"
              - generic [ref=e226]: "Region: Unknown"
              - generic [ref=e227]: "Languages: Unknown"
              - generic [ref=e228]: "Facts: No facts available"
            - generic [ref=e229]:
              - button "Ask AI" [ref=e230]
              - link "Map link" [ref=e231] [cursor=pointer]:
                - /url: https://www.google.com/maps/search/South%20Africa
        - generic [ref=e232]:
          - heading "Quick suggestions" [level=3] [ref=e233]
          - generic [ref=e234]:
            - button "What is the capital of India?" [ref=e235]
            - button "What does Egypt have famous?" [ref=e236]
            - button "Tell me about France’s culture." [ref=e237]
            - button "What languages are spoken in Mexico?" [ref=e238]
            - button "Where is South Africa located?" [ref=e239]
    - contentinfo [ref=e240]:
      - paragraph [ref=e242]: Powered by OpenAI GPT-4 • Built with Next.js
    - generic [ref=e244]:
      - textbox "Ask about a country…" [active] [ref=e245]
      - button [disabled] [ref=e246]:
        - img [ref=e247]
  - button "Open Next.js Dev Tools" [ref=e254] [cursor=pointer]:
    - img [ref=e255]
  - alert [ref=e258]
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
  32 |       await expect(page.locator('text=' + expected)).toBeVisible({ timeout: 30000 });
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
> 45 |     await expect(page.locator('text=Nepal')).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
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