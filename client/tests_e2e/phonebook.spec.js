import { test, expect } from '@playwright/test';

const correctPerson = {
  name: 'Ricardo Errazuriz',
  number: '151-456448'
}

const wrongPerson = {
  name: 'Federico Cortisona',
  number: '456448'
}

const fillPersonData = async (page, { name, number }) => {
  await page.getByLabel('name').fill(name)
  await page.getByLabel('number').fill(number)
  await page.getByRole('button', { name: 'add' }).click()
};


test.describe('Validate elements in page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('has title', async ({ page }) => {
    await expect(page.getByText('Phonebook')).toBeVisible();
  });

  test('has form', async ({ page }) => {
    await expect(page.getByText('add a new')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name:' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'number:' })).toBeVisible()
    const addButton = page.getByRole('button', { name: 'add' })
    await expect(addButton).toBeVisible()
  });



  test.describe('fill data', () => {
    test('succeeds with correct data', async ({ page }) => {
      await fillPersonData(page, correctPerson)
      await expect(page.getByText('added ' + correctPerson.name)).toBeVisible()
    })

    test('fails with wrong data', async ({ page }) => {
      await fillPersonData(page, wrongPerson)
      await expect(page.getByText('added ' + wrongPerson.name)).not.toBeVisible()
    })
  })
})