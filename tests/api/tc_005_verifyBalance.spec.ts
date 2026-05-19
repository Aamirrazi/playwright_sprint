import { APIResponse, expect } from "@playwright/test";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";
import { logger } from "../../utils/logger";
import { validateAccount } from "../../schemas/accountSchema";

test(
  "tc_005 ,Verify Balance State",
  {
    tag: ["@api", "@nehative"],
  },
  async ({ apiRequest }) => {
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

      const isValid = validateAccount(body);
      if (!isValid) {
        logger.error("Schema Validation Failed", validateAccount.errors);
      }
      expect(isValid).toBe(true);

      expect(
        body.balance,
        ` Expected balance >= 0, but got ${body.balance}`,
      ).toBeGreaterThanOrEqual(0);
    });
  },
);
