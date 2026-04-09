import { test, expect } from '@playwright/test';

test('AI answers correctly from Local Gold storage', async ({ page }) => {
  // 1. Go to local server
  await page.goto('http://localhost:3000'); 

  // 2. Find the FIRST input on the page (ignores placeholder text issues)
  const searchBox = page.locator('input').first();
  
  // 3. Wait up to 15 seconds for it to show up
  await searchBox.waitFor({ state: 'visible', timeout: 15000 });
  
  // 4. Fill and Submit
  await searchBox.fill('What is the capital of Australia?');
  await searchBox.press('Enter');

  // 5. Look for the result
  await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 25000 });
});