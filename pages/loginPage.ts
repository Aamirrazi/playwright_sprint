import { Page, Locator, expect } from "@playwright/test";
import { CONFIG, PATH } from "../config/config";
import { getPageLoadTime } from "../utils/loadTimeUtils";

export class LoginPage {
  readonly page: Page;

  // Define locators as types instead of raw strings
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Log In" });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  async goto(): Promise<void> {
    await this.page.goto(PATH.LOGIN);
  }

  async login(username: string, password: string): Promise<void> {
    // Fill uses the Locator directly now
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.page.screenshot({
      path: "test-results/screenshots/before-login.png",
    });

    // Click uses the Locator directly
    await this.loginButton.click();
    await this.page.waitForURL("**/overview.htm", { timeout: 15000 });
  }

  async gotoAndLogin(
    username = CONFIG.USERNAME,
    password = CONFIG.PASSWORD,
  ): Promise<void> {
    await this.goto();
    await this.login(username, password);
  }

  async isLoggedIn(): Promise<boolean> {
    const url = this.page.url();
    return url.includes("overview.htm") || url.includes("transfer.htm");
  }

  async assertOnOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(/overview\.htm/);
  }

  async getLoadTime() {
    return await getPageLoadTime(this.page);
  }
}
