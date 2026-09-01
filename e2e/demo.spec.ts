import { expect, test } from '@playwright/test'

test('builds a trail through nested friends', async ({ page }) => {
  await page.goto('/')
  const trail = page.getByRole('navigation', { name: 'Breadcrumb' })
  await expect(trail.getByText('Home')).toHaveAttribute('aria-current', 'page')

  await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Friends' }).click()
  await expect(trail.getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(trail.getByText('Friends')).toHaveAttribute('aria-current', 'page')

  await page.getByRole('link', { name: /Alice/ }).click()
  await expect(trail.getByRole('link', { name: 'Friends' })).toBeVisible()
  await expect(trail.getByText('Alice')).toHaveAttribute('aria-current', 'page')
  await expect(trail.getByRole('link', { name: 'Alice' })).toHaveCount(0)
})

test('can hide a crumb and restore it', async ({ page }) => {
  await page.goto('/locations/overlook')
  const trail = page.getByRole('navigation', { name: 'Breadcrumb' })
  await expect(trail.getByText('Overlook')).toHaveCount(0)

  await page.getByLabel('Show Overlook on the trail').check()
  await expect(trail.getByText('Overlook')).toHaveAttribute('aria-current', 'page')
})

test('rtl toggle sets document direction', async ({ page }) => {
  await page.goto('/friends')
  await page.getByLabel('RTL').check()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('route handle source still renders crumbs', async ({ page }) => {
  await page.goto('/events/dance')
  await page.locator('label', { hasText: 'Route handle' }).click()
  const trail = page.getByRole('navigation', { name: 'Breadcrumb' })
  await expect(trail.getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(trail.getByRole('link', { name: 'Events' })).toBeVisible()
  await expect(trail.getByText('Dance')).toHaveAttribute('aria-current', 'page')
})
