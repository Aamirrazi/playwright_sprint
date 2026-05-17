import { APIResponse, expect } from "@playwright/test";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";
import { logger } from "../../utils/logger";

test("tc_005 ,Verify Balance State", async ({ apiRequest }) => {
  test.fail(
    true,
    "KNOWN BUG TC_005: Account balance becomes negative after overdraft",
  );

  let response: APIResponse;
  const accountData = TEST_DATA.tc005_balanceCheck;
  const url = `${CONFIG.API_BASE}/accounts/${accountData.account}`;

  await test.step("Get account details", async () => {
    logger.apiRequest("GET", url);
    response = await apiRequest.get(url);
  });

  await test.step("Verify balance state", async () => {
    const body = await response.json();
    logger.apiResponse(response.status(), response.url(), body);

    expect(response.status(), "Expected 200 OK").toBe(200);
    expect(body).toHaveProperty("balance");

    expect(
      body.balance,
      `KNOWN BUG: Expected balance >= 0, but got ${body.balance}`,
    ).toBeGreaterThanOrEqual(0);
  });
});
