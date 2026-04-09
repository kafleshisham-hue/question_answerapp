import { test, expect } from '@playwright/test'

test('user can paste a document, ask a question, and see an answer', async ({ page }) => {
  await page.goto('/')

  // Paste sample document text
  await page.getByPlaceholder('Paste your document text here…').fill(
    'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. ' +
    'It was constructed from 1887 to 1889 as the centerpiece of the 1889 World\'s Fair. ' +
    'The tower is 330 metres tall and is the tallest structure in Paris.'
  )

  // Type a question
  await page.getByPlaceholder('Ask a question about your document…').fill(
    'How tall is the Eiffel Tower?'
  )

  // Click Ask
  await page.getByRole('button', { name: 'Ask' }).click()

  // Wait for an answer to appear (allow up to 30s for the AI response)
  await expect(
    page.locator('.justify-start .rounded-2xl').first()
  ).not.toBeEmpty({ timeout: 30_000 })
})
