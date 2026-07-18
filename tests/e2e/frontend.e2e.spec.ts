import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Troop 771/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Adventure, Leadership, and Skills for Life')
  })

  test('can load Kason Eagle project page', async ({ page }) => {
    await page.goto('http://localhost:3000/eagle/kason')

    await expect(page).toHaveTitle(/Kason/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      "Kason's Eagle Scout Service Project",
    )
    await expect(page.getByRole('progressbar', { name: 'Fundraising progress' })).toBeVisible()
    await expect(page.getByText('$3,500').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Where will donations go?' })).toBeVisible()

    await page.getByRole('button', { name: 'Are donations tax-deductible?' }).click()
    await expect(page.getByText('Tax-deductible status has not been confirmed.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Share This Project' }).first()).toBeVisible()
  })
})
