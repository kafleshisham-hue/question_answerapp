import { test, expect } from '@playwright/test';

test('AI answers correctly from Gold storage', async ({ page }) => {
  // Go to your LIVE Vercel URL
  await page.goto('https://question-answerapp-79qixv2hc-kafleshisham-hues-projects.vercel.app'); 

  // Ask about Australia (The data you just added to Bronze and synced to GCP!)
  await page.fill('input[placeholder*="Ask"]', 'What is the capital of australia?');
  await page.keyboard.press('Enter');

  // Assert it finds the answer from your Gold JSON file
  await expect(page.locator('text=Canberra')).toBeVisible({ timeout: 15000 });
});