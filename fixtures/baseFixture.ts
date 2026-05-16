import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { TransferPage } from "../pages/transferPage";
import { AccountsOverviewPage } from "../pages/AccountOverviewPage";
import { CONFIG, PATH } from "../config/config";

type MyFixtures = {
  loginPage: LoginPage;
  transferPage: TransferPage;
  overviewPage: AccountsOverviewPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },

  overviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto(PATH.OVERVIEW);

    const currentUrl = page.url();
    if (currentUrl.includes("index.htm") || currentUrl.includes("login")) {
      const loginPage = new LoginPage(page);
      await loginPage.login(CONFIG.USERNAME, CONFIG.PASSWORD);
      await expect(page).toHaveURL(/overview\.htm/);
    } else {
      console.error("AUTH", "Session still valid");
    }

    await use(page);
  },
});
