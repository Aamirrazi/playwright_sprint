import { Page, expect } from "@playwright/test";
import { CONFIG, PATH } from "../config/config";
import { getPageLoadTime } from "../utils/loadTimeUtils";

export class LoginPage {
  readonly page: Page;
  private readonly usernameInput = '[name="username"]';
  private readonly passwordInput = '[name="password"]';
  private readonly loginButton = '[value="Log In"]';
  private readonly errorMessage = ".error";
  private readonly welcomeText = "#leftPanel p.smallText";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(PATH.LOGIN);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);

    await this.page.screenshot({
      path: "test-results/screenshots/before-login.png",
    });

    await this.page.click(this.loginButton);
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
