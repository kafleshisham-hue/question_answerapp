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

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
            - /url: /signup?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Fquestion-answerapp-79qixv2hc-kafleshisham-hues-projects.vercel.app%252F%26nonce%3D7c3fb3b611c33a94493c90fd13eb258d678b788d9438622f11dfb515e7d3e192
            - paragraph [ref=e10]: Sign Up
    - main [ref=e11]:
      - generic [ref=e13]:
        - heading "Log in to Vercel" [level=1] [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]:
            - textbox "Email Address" [ref=e20]
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
            - /url: /signup?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Fquestion-answerapp-79qixv2hc-kafleshisham-hues-projects.vercel.app%252F%26nonce%3D7c3fb3b611c33a94493c90fd13eb258d678b788d9438622f11dfb515e7d3e192
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
  4  |   // Go to your LIVE Vercel URL
  5  |   await page.goto('https://question-answerapp-79qixv2hc-kafleshisham-hues-projects.vercel.app'); 
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