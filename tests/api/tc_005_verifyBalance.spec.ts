import { APIResponse, expect } from "@playwright/test";
import { ACCOUNTS, CONFIG } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";

test("tc_005 ,Verify Balance State", async ({ apiRequest }) => {
  test.fail(
    true,
    "KNOWN BUG TC_005: Account balance becomes negative after overdraft",
  );

  let response: APIResponse;

  await test.step("Get account details", async () => {
    response = await apiRequest.get(
      `${CONFIG.API_BASE}/accounts/${ACCOUNTS.OVERDRAFT_FROM}`,
    );
  });

  await test.step("Verify balance state", async () => {
    console.log(`Status: ${response.status()}`);
    expect(response.status(), "Expected 200 OK").toBe(200);

    const body = await response.json();
    console.log(`Body: ${JSON.stringify(body)}`);

    expect(body).toHaveProperty("balance");

    expect(
      body.balance,
      `KNOWN BUG: Expected balance >= 0, but got ${body.balance}`,
    ).toBeGreaterThanOrEqual(0);
  });
});
