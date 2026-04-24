import { test, expect } from '@playwright/test';

test.describe('AI Country Knowledge System - Comprehensive Stress Test', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for AI responses
    test.setTimeout(120000); // 2 minutes

    // Navigate to the app
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Multi-question conversation flow with different country types', async ({ page }) => {
    const questions = [
      { query: 'What is the capital of Japan?', expected: 'Tokyo' },
      { query: 'How many people live in India?', expected: '1,400,000,000' },
      { query: 'What languages are spoken in Canada?', expected: 'English, French' },
      { query: 'Tell me about Brazil\'s rainforest', expected: 'largest rainforest' },
      { query: 'What is famous about Egypt?', expected: 'Nile River' },
      { query: 'What is the population of Germany?', expected: '83,000,000' },
      { query: 'What languages do they speak in South Africa?', expected: 'English' },
      { query: 'Tell me about France\'s landmarks', expected: 'Eiffel Tower' }
    ];

    // Test each question in sequence
    for (const { query, expected } of questions) {
      console.log(`Testing: ${query}`);

      const searchBox = page.locator('input').first();
      await searchBox.waitFor({ state: 'visible', timeout: 10000 });
      await searchBox.clear();
      await searchBox.fill(query);
      await searchBox.press('Enter');

      // Wait for response and check it contains expected text
      await expect(page.locator('text=' + expected)).toBeVisible({ timeout: 30000 });

      // Brief pause between questions to simulate real user behavior
      await page.waitForTimeout(2000);
    }
  });

  test('UI interaction stress test - cards and suggestions', async ({ page }) => {
    // Test hide/show cards functionality
    const hideShowButton = page.locator('text=Hide country cards').or(page.locator('text=Show country cards'));
    await hideShowButton.waitFor({ state: 'visible', timeout: 10000 });

    // Initially should show cards
    await expect(page.locator('text=Nepal')).toBeVisible();

    // Click to hide
    await hideShowButton.click();
    await expect(page.locator('text=Nepal')).not.toBeVisible();

    // Click to show again
    await hideShowButton.click();
    await expect(page.locator('text=Nepal')).toBeVisible();

    // Test clicking on country cards to ask AI
    const askAIButton = page.locator('text=Ask AI').first();
    await askAIButton.click();

    // Should get a response about Nepal
    await expect(page.locator('text=Nepal')).toBeVisible({ timeout: 30000 });
  });

  test('Complex multi-part questions and follow-ups', async ({ page }) => {
    const searchBox = page.locator('input').first();

    // First question
    await searchBox.fill('What can you tell me about China?');
    await searchBox.press('Enter');
    await expect(page.locator('text=China')).toBeVisible({ timeout: 30000 });

    // Follow-up question
    await searchBox.fill('What about its population?');
    await searchBox.press('Enter');
    await expect(page.locator('text=1,400,000,000')).toBeVisible({ timeout: 30000 });

    // Another follow-up
    await searchBox.fill('What languages are spoken there?');
    await searchBox.press('Enter');
    await expect(page.locator('text=Mandarin')).toBeVisible({ timeout: 30000 });
  });

  test('Edge cases and error handling', async ({ page }) => {
    const searchBox = page.locator('input').first();

    // Test with non-country question
    await searchBox.fill('What is the meaning of life?');
    await searchBox.press('Enter');

    // Should still get some response (may be generic or error)
    await page.waitForTimeout(10000);
    const messages = page.locator('[class*="rounded-2xl"]');
    await expect(messages).toHaveCount(await messages.count() + 1, { timeout: 30000 });

    // Test with very long question
    const longQuestion = 'Can you tell me everything you know about Mexico including its history, culture, cuisine, geography, population, languages, famous landmarks, and any interesting facts that make it unique compared to other countries in North America?';
    await searchBox.fill(longQuestion);
    await searchBox.press('Enter');
    await expect(page.locator('text=Mexico')).toBeVisible({ timeout: 45000 });
  });

  test('Performance and responsiveness test', async ({ page }) => {
    const searchBox = page.locator('input').first();

    // Measure response time for a simple question
    const startTime = Date.now();
    await searchBox.fill('Capital of France?');
    await searchBox.press('Enter');
    await expect(page.locator('text=Paris')).toBeVisible({ timeout: 30000 });
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime}ms`);

    // Response should be reasonably fast (under 30 seconds)
    expect(responseTime).toBeLessThan(30000);

    // Test multiple rapid questions
    for (let i = 0; i < 3; i++) {
      await searchBox.clear();
      await searchBox.fill(`Quick question ${i + 1}: Capital of Nepal?`);
      await searchBox.press('Enter');
      await expect(page.locator('text=Kathmandu')).toBeVisible({ timeout: 25000 });
    }
  });

  test('Data integrity and accuracy verification', async ({ page }) => {
    const searchBox = page.locator('input').first();

    // Test specific facts that should be accurate
    const factChecks = [
      { question: 'What is Australia\'s region?', expected: 'Oceania' },
      { question: 'Population of Egypt?', expected: '105,000,000' },
      { question: 'Languages in Germany?', expected: 'German' },
      { question: 'What is famous about Nepal?', expected: 'Mount Everest' }
    ];

    for (const { question, expected } of factChecks) {
      await searchBox.clear();
      await searchBox.fill(question);
      await searchBox.press('Enter');
      await expect(page.locator('text=' + expected)).toBeVisible({ timeout: 30000 });
    }
  });
});