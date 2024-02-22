import { test, expect } from '@playwright/test';

test('AddItemAndConfirm', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.fill('#input-bar', 'todo-item test');
  await page.press('#input-bar', 'Enter');
  await page.isVisible('todo-item test');
});

test('AddNoteAndConfirmItemCounter', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.fill('#input-bar', 'todo-item test');
  await page.press('#input-bar', 'Enter');
  let itemsLeft1 = await page.textContent('#items-left');
  await expect(itemsLeft1).toContain('1 item left');
  await page.click('#toggle');
  let itemsLeft2 = await page.textContent('#items-left');
  await expect(itemsLeft2).toContain('0 items left');
});

test('Add3NotesAndConfirmItemCounter', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.fill('#input-bar', 'todo-item test1');
  await page.press('#input-bar', 'Enter');
  await page.fill('#input-bar', 'todo-item test2');
  await page.press('#input-bar', 'Enter');
  await page.fill('#input-bar', 'todo-item test3');
  await page.press('#input-bar', 'Enter');
  let checkBox = await page.locator('.todo-checkbox').nth(1);
  await checkBox.click();
  let itemsLeft = await page.textContent('#items-left');
  await expect(itemsLeft).toContain('2 items left');


});