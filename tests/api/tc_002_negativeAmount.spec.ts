import { APIResponse, expect } from "@playwright/test";
import { ACCOUNTS, TRANSFER_DATA } from "../../config/config";
import { apiTest as test } from "../../fixtures/apiFixture";

test("tc_002 ,should return 400 for negative amount", async ({
  apiRequest,
}) => {
  test.fail(true, "KNOWN BUG TC_002: Api Accept negative amount");

  let response: APIResponse;

  await test.step("Attempt negative transfer", async () => {
    response = await apiRequest.post("/transfer", {
      params: {
        fromAccountId: ACCOUNTS.OVERDRAFT_FROM,
        toAccountId: ACCOUNTS.OVERDRAFT_TO,
        amount: String(TRANSFER_DATA.negativeAmount),
      },
    });
  });

  await test.step("Verify failure response", async () => {
    console.log(`Status: ${response.status()}`);
    console.log(`Body: ${await response.text()}`);

    expect(
      response.status(),
      "Expected 400 Bad Request for negative amount",
    ).toBe(400);
  });
});
