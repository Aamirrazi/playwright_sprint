import { Page, Locator, expect } from "@playwright/test";
import { PATH } from "../config/config";
import { getPageLoadTime } from "../utils/loadTimeUtils";

export class TransferPage {
  readonly page: Page;
  private readonly amountInput: Locator;
  private readonly fromSelect: Locator;
  private readonly toSelect: Locator;
  private readonly transferBtn: Locator;
  private readonly successHeading: Locator;
  private readonly errorDiv: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator("#amount");
    this.fromSelect = page.locator("#fromAccountId");
    this.toSelect = page.locator("#toAccountId");
    this.transferBtn = page.getByRole("button", { name: "Transfer" });
    this.successHeading = page.getByRole("heading", {
      name: "Transfer Complete!",
    });
    this.pageTitle = page.locator(".title");
    this.errorDiv = page.locator(".error");
  }

  async goto(): Promise<void> {
    await this.page.goto(PATH.TRANSFER);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async enterAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.fromSelect.selectOption({ value: accountId });
  }

  async selectToAccount(accountId: string): Promise<void> {
    await this.toSelect.selectOption({ value: accountId });
  }

  async getFromAccountOptionsCount(): Promise<number> {
    const options = this.fromSelect.locator("option");
    return await options.count();
  }

  async clickTransfer(): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/before-transfer-${Date.now()}.png`,
    });
    await this.transferBtn.click();
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
    if (
      await this.successHeading.isVisible({ timeout: 3_000 }).catch(() => false)
    ) {
      return (await this.successHeading.textContent()) ?? "";
    }

    for (const title of await this.pageTitle.all()) {
      if (await title.isVisible()) {
        return (await title.textContent())?.trim() ?? "";
      }
    }
    return "";
  }

  async getErrorText(): Promise<string> {
    for (const el of await this.errorDiv.all()) {
      if (await el.isVisible({ timeout: 3_000 }).catch(() => false)) {
        return (await el.textContent())?.trim() ?? "";
      }
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
    await expect(this.successHeading).toBeVisible();
    await this.page.screenshot({
      path: `test-results/screenshots/transfer-success-${Date.now()}.png`,
    });
  }

  async assertPageContains(text: string): Promise<void> {
    await expect(this.page.locator("body")).toContainText(text);
  }

  async assertAmountFieldIsEmpty(): Promise<void> {
    await expect(this.amountInput).toHaveValue("");
  }

  async getLoadTime() {
    return await getPageLoadTime(this.page);
  }
}
