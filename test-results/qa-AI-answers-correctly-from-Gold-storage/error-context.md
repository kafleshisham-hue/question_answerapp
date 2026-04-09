# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa.spec.ts >> AI answers correctly from Gold storage
- Location: e2e\qa.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Canberra')
Expected: visible
Timeout: 25000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 25000ms
  - waiting for locator('text=Canberra')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content":
    - /url: "#geist-skip-nav"
  - alert [ref=e2]
  - generic [ref=e4]:
    - banner [ref=e5]:
      - link "Vercel logo":
        - /url: /home
        - button "Vercel Logo":
          - img "Vercel Logo"
      - navigation [ref=e6]:
        - navigation [ref=e7]:
          - link "Sign Up" [ref=e8] [cursor=pointer]:
            - /url: /signup?next=%2Fkafleshisham-hues-projects%2Fquestion-answerapp%2F5ZUZnBTsrHtE6BXc4kuSe37U3sN6
            - paragraph [ref=e10]: Sign Up
    - main [ref=e11]:
      - generic [ref=e13]:
        - heading "Log in to Vercel" [level=1] [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]:
            - textbox "Email Address" [active] [ref=e20]: What is the capital of Australia?
            - button "Continue with Email" [ref=e22] [cursor=pointer]:
              - generic [ref=e23]: Continue with Email
          - generic [ref=e25]:
            - button "Continue with Google" [ref=e26] [cursor=pointer]:
              - img [ref=e29]
              - generic [ref=e35]: Continue with Google
            - button "Continue with GitHub" [ref=e36] [cursor=pointer]:
              - img [ref=e38]
              - generic [ref=e42]: Continue with GitHub
            - button "Continue with Apple" [ref=e43] [cursor=pointer]:
              - img [ref=e45]
              - generic [ref=e48]: Continue with Apple
            - button "Continue with SAML SSO" [ref=e50] [cursor=pointer]:
              - img [ref=e52]
              - generic [ref=e54]: Continue with SAML SSO
            - button "Continue with Passkey" [ref=e55] [cursor=pointer]:
              - img [ref=e57]
              - generic [ref=e59]: Continue with Passkey
            - button "Show other options" [ref=e60] [cursor=pointer]:
              - generic [ref=e61]: Show other options
        - paragraph [ref=e63]:
          - text: Don't have an account?
          - link "Sign Up" [ref=e64] [cursor=pointer]:
            - /url: /signup?email=What%20is%20the%20capital%20of%20Australia%3F&next=%2Fkafleshisham-hues-projects%2Fquestion-answerapp%2F5ZUZnBTsrHtE6BXc4kuSe37U3sN6
      - generic [ref=e67]:
        - link "Terms" [ref=e68] [cursor=pointer]:
          - /url: /legal/terms
        - link "Privacy Policy" [ref=e69] [cursor=pointer]:
          - /url: /legal/privacy-policy
  - generic:
    - generic:
      - generic:
        - generic:
          - img
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('AI answers correctly from Gold storage', async ({ page }) => {
  4  |   // 1. Navigate to your app (Replace with your actual URL)
  5  |   await page.goto('https://vercel.com/kafleshisham-hues-projects/question-answerapp/5ZUZnBTsrHtE6BXc4kuSe37U3sN6'); 
  6  | 
  7  |   // 2. Wait for the page to be ready (bypasses loading spinners)
  8  |   await page.waitForLoadState('networkidle');
  9  | 
  10 |   // 3. Find the input box by its "role" (most reliable way in modern web)
  11 |   const searchBox = page.getByRole('textbox').or(page.locator('input')).first();
  12 |   
  13 |   // 4. Fill and Submit
  14 |   await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  15 |   await searchBox.fill('What is the capital of Australia?');
  16 |   await searchBox.press('Enter');
  17 | 
  18 |   // 5. Look for the Gold data response
  19 |   // We look for Canberra because you added Australia to your data
> 20 |   await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 25000 });
     |                                               ^ Error: expect(locator).toBeVisible() failed
  21 | });
```