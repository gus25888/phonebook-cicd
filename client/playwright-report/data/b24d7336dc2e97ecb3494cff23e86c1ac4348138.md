# Test info

- Name: Validate elements in page >> has title
- Location: C:\Users\gusta\Desktop\phonebook\client\tests_e2e\phonebook.spec.js:25:3

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

    at C:\Users\gusta\Desktop\phonebook\client\tests_e2e\phonebook.spec.js:22:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const correctPerson = {
   4 |   name: 'Ricardo Errazuriz',
   5 |   number: '151-456448'
   6 | }
   7 |
   8 | const wrongPerson = {
   9 |   name: 'Federico Cortisona',
  10 |   number: '456448'
  11 | }
  12 |
  13 | const fillPersonData = async (page, { name, number }) => {
  14 |   await page.getByLabel('name').fill(name)
  15 |   await page.getByLabel('number').fill(number)
  16 |   await page.getByRole('button', { name: 'add' }).click()
  17 | };
  18 |
  19 |
  20 | test.describe('Validate elements in page', () => {
  21 |   test.beforeEach(async ({ page }) => {
> 22 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_ABORTED at http://localhost:5173/
  23 |   })
  24 |
  25 |   test('has title', async ({ page }) => {
  26 |     await expect(page.getByText('Phonebook')).toBeVisible();
  27 |   });
  28 |
  29 |   test('has form', async ({ page }) => {
  30 |     await expect(page.getByText('add a new')).toBeVisible();
  31 |     await expect(page.getByRole('textbox', { name: 'name:' })).toBeVisible()
  32 |     await expect(page.getByRole('textbox', { name: 'number:' })).toBeVisible()
  33 |     const addButton = page.getByRole('button', { name: 'add' })
  34 |     await expect(addButton).toBeVisible()
  35 |   });
  36 |
  37 |
  38 |
  39 |   test.describe('fill data', () => {
  40 |     test('succeeds with correct data', async ({ page }) => {
  41 |       await fillPersonData(page, correctPerson)
  42 |       await expect(page.getByText('added ' + correctPerson.name)).toBeVisible()
  43 |     })
  44 |
  45 |     test('fails with wrong data', async ({ page }) => {
  46 |       await fillPersonData(page, wrongPerson)
  47 |       await expect(page.getByText('added ' + wrongPerson.name)).not.toBeVisible()
  48 |     })
  49 |   })
  50 | })
```