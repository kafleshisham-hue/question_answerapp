import { test, expect } from '@playwright/test';

test('AI answers correctly from Gold storage', async ({ page }) => {
  // 1. Navigate to your app (Replace with your actual URL)
  await page.goto('https://vercel.com/kafleshisham-hues-projects/question-answerapp/5ZUZnBTsrHtE6BXc4kuSe37U3sN6'); 

  // 2. Wait for the page to be ready (bypasses loading spinners)
  await page.waitForLoadState('networkidle');

  // 3. Find the input box by its "role" (most reliable way in modern web)
  const searchBox = page.getByRole('textbox').or(page.locator('input')).first();
  
  // 4. Fill and Submit
  await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  await searchBox.fill('What is the capital of Australia?');
  await searchBox.press('Enter');

  // 5. Look for the Gold data response
  // We look for Canberra because you added Australia to your data
  await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 25000 });
});