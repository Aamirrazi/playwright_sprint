import { Page, expect } from "@playwright/test";
import { PATH } from "../config/config";

export class AccountsOverviewPage {
  readonly page: Page;

  private readonly overviewTable = "#accountTable";
  private readonly accountRows = "#accountTable tbody tr";

  constructor(page: Page) {
    this.page = page;
  }
  async goto(): Promise<void> {
    await this.page.goto(PATH.OVERVIEW);
    await this.page.waitForSelector(this.overviewTable);
  }

  async getBalance(accountId: string): Promise<number> {
    const row = this.page.locator(
      `#accountTable tbody tr:has(a:text("${accountId}"))`,
    );
    await expect(row).toBeVisible();

    const balanceText = await row.locator("td").nth(1).textContent();
    const cleaned = (balanceText ?? "").replace(/[$,]/g, "").trim();
    const balance = parseFloat(cleaned);
    return balance;
  }

  async getAvailableAmount(accountId: string): Promise<number> {
    const row = this.page.locator(
      `#accountTable tbody tr:has(a:text("${accountId}"))`,
    );
    await expect(row).toBeVisible();

    const amountText = await row.locator("td").nth(2).textContent();
    const cleaned = (amountText ?? "").replace(/[$,]/g, "").trim();
    const amount = parseFloat(cleaned);
    return amount;
  }

  async assertBalance(
    accountId: string,
    expectedBalance: number,
  ): Promise<void> {
    const actual = await this.getBalance(accountId);
    expect(actual).toBeCloseTo(expectedBalance, 2);
  }

  async assertBalanceDecreasedBy(
    accountId: string,
    balanceBefore: number,
    decreaseAmount: number,
  ): Promise<void> {
    const balanceAfter = await this.getBalance(accountId);
    const expected = balanceBefore - decreaseAmount;
    expect(balanceAfter).toBeCloseTo(expected, 2);
  }

  async assertBalanceIncreasedBy(
    accountId: string,
    balanceBefore: number,
    increaseAmount: number,
  ): Promise<void> {
    const balanceAfter = await this.getBalance(accountId);
    const expected = balanceBefore + increaseAmount;
    expect(balanceAfter).toBeCloseTo(expected, 2);
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(/overview\.htm/);
    await expect(this.page.locator(this.overviewTable)).toBeVisible();
  }
}
