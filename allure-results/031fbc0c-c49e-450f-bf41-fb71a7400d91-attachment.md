# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ..\fixtures\auth.ts >> Authenticate once and save session
- Location: fixtures\auth.ts:8:6

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9090/parabank/index.htm
Call log:
  - navigating to "http://localhost:9090/parabank/index.htm", waiting until "load"

```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | import { CONFIG, PATH } from "../config/config";
  3  | 
  4  | export class LoginPage {
  5  |   readonly page: Page;
  6  |   private readonly usernameInput = '[name="username"]';
  7  |   private readonly passwordInput = '[name="password"]';
  8  |   private readonly loginButton = '[value="Log In"]';
  9  |   private readonly errorMessage = ".error";
  10 |   private readonly welcomeText = "#leftPanel p.smallText";
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |   }
  15 | 
  16 |   async goto(): Promise<void> {
> 17 |     await this.page.goto(PATH.LOGIN);
     |                     ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9090/parabank/index.htm
  18 |   }
  19 | 
  20 |   async login(username: string, password: string): Promise<void> {
  21 |     await this.page.fill(this.usernameInput, username);
  22 |     await this.page.fill(this.passwordInput, password);
  23 | 
  24 |     await this.page.screenshot({
  25 |       path: "test-results/screenshots/before-login.png",
  26 |     });
  27 | 
  28 |     await this.page.click(this.loginButton);
  29 |     await this.page.waitForURL("**/overview.htm", { timeout: 15000 });
  30 |   }
  31 |   async gotoAndLogin(
  32 |     username = CONFIG.USERNAME,
  33 |     password = CONFIG.PASSWORD,
  34 |   ): Promise<void> {
  35 |     await this.goto();
  36 |     await this.login(username, password);
  37 |   }
  38 | 
  39 |   async isLoggedIn(): Promise<boolean> {
  40 |     const url = this.page.url();
  41 |     return url.includes("overview.htm") || url.includes("transfer.htm");
  42 |   }
  43 | 
  44 |   async assertOnOverviewPage(): Promise<void> {
  45 |     await expect(this.page).toHaveURL(/overview\.htm/);
  46 |   }
  47 | }
  48 | 
```