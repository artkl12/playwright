// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test.afterEach(async ({ page }) => {
  await page.close();
})

test.describe('Login Tests', () => {
test('TC01 - successful login', async ({ page }) => {
  await page.fill('#username', 'student')
  await page.fill('#password', 'Password123')
  await page.click('#submit')
  await expect(page.getByRole('heading', {name: 'Logged in successfully'})).toHaveText('Logged In Successfully');
});

test('TC02 - incorrect username', async ({ page }) => {
  await page.fill('#username', 'wronguser')
  await page.fill('#password', 'Password123')
  await page.click('#submit')
  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

test('TC03 - incorrect password', async ({page}) => {
  await page.fill('#username', 'student')
  await page.fill('#password', 'WrongPassword')
  await page.click('#submit')
  await expect(page.locator('#error')).toHaveText('Your password is invalid!')
})

test('TC04 - empty username', async ({page}) => {
  await page.fill('#username', '')
  await page.fill('#password', 'Password123')
  await page.click('#submit')
  await expect(page.locator('#error')).toHaveText('Your username is invalid!')
})

test('TC05 - empty password', async ({page}) => {
  await page.fill('#username', 'student')
  await page.fill('#password', '')
  await page.click('#submit')
  await expect(page.locator('#error')).toHaveText('Your password is invalid!')
})

test('TC06 - empty username and password', async ({page}) => {
  await page.fill('#username', '')
  await page.fill('#password', '')
  await page.click('#submit')
  await expect(page.locator('#error')).toHaveText('Your username is invalid!')
})

test('TC07 - logout', async ({page}) => {
  await page.fill('#username', 'student')
  await page.fill('#password', 'Password123')
  await page.click('#submit')
  await expect(page.getByRole('heading', {name: 'Logged in successfully'})).toHaveText('Logged In Successfully');
  await page.getByRole('link', {name: 'Log out'}).click()
  await expect(page.getByRole('heading', {name: 'Test login'})).toHaveText('Test login')
})
})