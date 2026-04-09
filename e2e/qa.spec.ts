import { test, expect } from '@playwright/test';

test('AI answers correctly from Local Gold storage', async ({ page }) => {
  // 1. Point to your local development server
  // Change 3000 to 3001 or 5173 if your local app uses a different port
  await page.goto('http://localhost:3000'); 

  // 2. Wait for the app to load
  await page.waitForLoadState('networkidle');

  // 3. Find the input box (using your "Ask about a country..." placeholder)
  const searchBox = page.getByPlaceholder('Ask about a country...');
  
  // 4. Ghost-type the question
  await searchBox.waitFor({ state: 'visible', timeout: 5000 });
  await searchBox.fill('What is the capital of Australia?');
  await searchBox.press('Enter');

  // 5. Verify the AI response
  // Looking for Canberra from your local data/gold/countries.json
  await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 20000 });
});