import { Page, expect } from "@playwright/test";
import { PATH } from "../config/config";
import { getPageLoadTime } from "../utils/loadTimeUtils";

export class TransferPage {
  readonly page: Page;

  private readonly amountInput = "#amount";
  private readonly fromSelect = "#fromAccountId";
  private readonly toSelect = "#toAccountId";
  private readonly transferBtn = '[value="Transfer"]';

  private readonly successHeading = "#showResult h1";
  private readonly errorDiv = ".error";
  private readonly pageTitle = ".title";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(PATH.TRANSFER);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async enterAmount(amount: string): Promise<void> {
    await this.page.fill(this.amountInput, amount);
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.page.selectOption(this.fromSelect, { value: accountId });
  }

  async selectToAccount(accountId: string): Promise<void> {
    await this.page.selectOption(this.toSelect, { value: accountId });
  }

  async getFromAccountOptionsCount(): Promise<number> {
    const options = this.page.locator(`${this.fromSelect} option`);
    return await options.count();
  }

  async clickTransfer(): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/before-transfer-${Date.now()}.png`,
    });
    await this.page.click(this.transferBtn);
    await this.page.waitForLoadState("networkidle");
  }

  async transfer(
    fromAccountId: string,
    toAccountId: string,
    amount: string,
  ): Promise<void> {
    await this.selectFromAccount(fromAccountId);
    await this.selectToAccount(toAccountId);
    await this.enterAmount(amount);
    await this.clickTransfer();
  }

  async getResultHeading(): Promise<string> {
    const successEl = this.page.locator(this.successHeading);
    if (await successEl.isVisible({ timeout: 3_000 }).catch(() => false)) {
      return (await successEl.textContent()) ?? "";
    }
    const titleEl = this.page.locator(this.pageTitle);
    return (await titleEl.textContent()) ?? "";
  }

  async getErrorText(): Promise<string> {
    const el = this.page.locator(this.errorDiv).first();
    const visible = await el.isVisible({ timeout: 3_000 }).catch(() => false);
    if (visible) {
      return (await el.textContent()) ?? "";
    }
    return "";
  }

  async isTransferSuccessful(): Promise<boolean> {
    const heading = await this.getResultHeading();
    return heading.includes("Transfer Complete");
  }

  async getBodyText(): Promise<string> {
    return (await this.page.locator("body").textContent()) ?? "";
  }

  async assertTransferSuccess(): Promise<void> {
    await expect(this.page.locator(this.successHeading)).toContainText(
      "Transfer Complete!",
    );
    await this.page.screenshot({
      path: `test-results/screenshots/transfer-success-${Date.now()}.png`,
    });
  }

  async assertPageContains(text: string): Promise<void> {
    await expect(this.page.locator("body")).toContainText(text);
  }

  async assertAmountFieldIsEmpty(): Promise<void> {
    await expect(this.page.locator(this.amountInput)).toHaveValue("");
  }

  async getLoadTime() {
    return await getPageLoadTime(this.page);
  }
}
