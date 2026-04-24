import { test, expect } from '@playwright/test';

test.describe('AI Country Knowledge System - Balanced Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Increased timeout for sequential AI responses and rate limit pauses
    test.setTimeout(120000); // 2 minutes

    // Navigate to the app
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Core functionality - capitals and basic facts', async ({ page }) => {
    const questions = [
      { query: 'What is the capital of Australia?', expected: 'Canberra' },
      { query: 'What is the capital of Japan?', expected: 'Tokyo' },
      { query: 'What is the capital of Brazil?', expected: 'Brasilia' },
      { query: 'What is the capital of Egypt?', expected: 'Cairo' }
    ];

    // Test each question with a pause to respect rate limits
    for (const { query, expected } of questions) {
      console.log(`Testing: ${query}`);

      const searchBox = page.getByRole('textbox').first();
      await searchBox.waitFor({ state: 'visible', timeout: 10000 });
      await searchBox.clear();
      await searchBox.fill(query);
      await searchBox.press('Enter');

      // Wait for response and check it contains expected text
      await expect(page.locator('body')).toContainText(expected, { timeout: 30000 });

      // Longer pause between questions to respect API rate limits
      await page.waitForTimeout(5000);
    }
  });

  test('UI interaction test - cards functionality', async ({ page }) => {
    // Test hide/show cards functionality
    const hideShowButton = page.getByText('Hide country cards').or(page.getByText('Show country cards'));
    await hideShowButton.waitFor({ state: 'visible', timeout: 10000 });

    // Initially should show cards
    await expect(page.getByRole('heading', { name: 'Nepal' })).toBeVisible();

    // Click to hide
    await hideShowButton.click();
    await expect(page.getByRole('heading', { name: 'Nepal' })).not.toBeVisible();

    // Click to show again
    await hideShowButton.click();
    await expect(page.getByRole('heading', { name: 'Nepal' })).toBeVisible();

    // Test clicking on a suggestion
    const suggestion = page.getByText('What is the capital of India?');
    await suggestion.click();
    // The suggestion auto-submits, so we expect the AI response instead of the input value
    await expect(page.locator('body')).toContainText('New Delhi', { timeout: 30000 });
  });

  test('Conversation flow - follow-up questions', async ({ page }) => {
    const searchBox = page.getByRole('textbox').first();

    // First question
    await searchBox.fill('Tell me about China');
    await searchBox.press('Enter');
    await expect(page.locator('body')).toContainText('China', { timeout: 30000 });

    // Wait before follow-up to respect rate limits
    await page.waitForTimeout(8000);

    // Follow-up question
    await searchBox.fill('What about its population?');
    await searchBox.press('Enter');
    await expect(page.locator('body')).toContainText('1,400,000,000', { timeout: 30000 });
  });

  test('Data accuracy verification', async ({ page }) => {
    const searchBox = page.getByRole('textbox').first();

    // Test specific facts that should be accurate
    const factChecks = [
      { question: 'What region is Australia in?', expected: 'Oceania' },
      { question: 'What languages are spoken in Germany?', expected: 'German' }
    ];

    for (const { question, expected } of factChecks) {
      await searchBox.clear();
      await searchBox.fill(question);
      await searchBox.press('Enter');
      await expect(page.locator('body')).toContainText(expected, { timeout: 30000 });

      // Respect rate limits
      await page.waitForTimeout(6000);
    }
  });
});