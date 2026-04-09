import { test, expect } from '@playwright/test';

test('AI answers correctly from Gold storage', async ({ page }) => {
  // 1. Go to your actual Vercel URL
  await page.goto('https://question-answerapp-38dyq4813-kafleshisham-hues-projects.vercel.app/'); 

  // 2. Use the exact placeholder from your screenshot
  const searchBox = page.getByPlaceholder('Ask about a country...');
  
  // 3. Type the question and press Enter
  await searchBox.fill('What is the capital of Australia?');
  await searchBox.press('Enter');

  // 4. Wait for the AI to mention Canberra (from your Gold data)
  await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 20000 });
});