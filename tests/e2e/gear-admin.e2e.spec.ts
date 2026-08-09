import { test, expect } from '@playwright/test'

import { login } from '../helpers/login'
import { cleanupTestUser, seedTestUser, testUser } from '../helpers/seedUser'

test.describe('Gear admin', () => {
  test.beforeAll(async () => {
    await seedTestUser()
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can load the gear page create view', async ({ page }) => {
    const pageErrors: string[] = []
    const consoleErrors: string[] = []

    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
    })

    await login({ page, user: testUser })
    await page.goto('http://localhost:3000/admin/collections/gear-pages/create')

    await expect(page).toHaveURL(/\/admin\/collections\/gear-pages\/(create|[a-zA-Z0-9-_]+)/)
    await expect(page.locator('input[name="title"]')).toBeVisible()
    expect({ pageErrors, consoleErrors }).toEqual({ pageErrors: [], consoleErrors: [] })
  })
})
