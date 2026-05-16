import { test as setup, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";
import { LoginPage } from "../pages/loginPage";
import { CONFIG } from "../config/config";

const AUTH_FILE = path.join("test-results", ".auth", "user.json");
setup("Authenticate once and save session", async ({ page }) => {
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const loginPage = new LoginPage(page);
  await loginPage.gotoAndLogin(CONFIG.USERNAME, CONFIG.PASSWORD);

  await loginPage.assertOnOverviewPage();
  await page.context().storageState({ path: AUTH_FILE });
});
