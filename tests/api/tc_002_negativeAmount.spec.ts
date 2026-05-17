import { APIResponse, expect } from "@playwright/test";
import { CONFIG, TEST_DATA, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";
import { logger } from "../../utils/logger";

test("tc_002 ,should return 400 for negative amount", async ({
  apiRequest,
}) => {
  test.fail(true, "KNOWN BUG TC_002: Api Accept negative amount");

  let response: APIResponse;
  const accountData = TEST_DATA.tc004_overdraft;

  await test.step("Attempt negative transfer", async () => {
    const url = `${CONFIG.API_BASE}/transfer`;
    const params = {
      fromAccountId: accountData.from,
      toAccountId: accountData.to,
      amount: String(TRANSFER_DATA.negative),
    };

    logger.apiRequest("POST", url, params);

    response = await apiRequest.post(url, { params });
  });

  await test.step("Verify failure response", async () => {
    const bodyText = await response.text();
    logger.apiResponse(response.status(), response.url(), bodyText);

    expect(
      response.status(),
      "Expected 400 Bad Request for negative amount",
    ).toBe(400);
  });
});
