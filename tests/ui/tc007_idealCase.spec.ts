import { expect } from "@playwright/test";
import { ACCOUNTS, TRANSFER_DATA } from "../../config/config";
import { test } from "../../fixtures/baseFixture";

test("tc_007 ,should deduct from source and add to destination after valid transfer", async ({
  transferPage,
  overviewPage,
}) => {
  let fromBefore: number;
  let toBefore: number;

  await test.step("Check initial balances", async () => {
    await overviewPage.goto();
    fromBefore = await overviewPage.getBalance(ACCOUNTS.UI_TRANSFER_FROM);
    toBefore = await overviewPage.getBalance(ACCOUNTS.UI_TRANSFER_TO);
    console.log(`TC_007: Before — From: ${fromBefore}, To: ${toBefore}`);
  });

  await test.step("Perform valid transfer", async () => {
    await transferPage.goto();
    await transferPage.transfer(
      ACCOUNTS.UI_TRANSFER_FROM,
      ACCOUNTS.UI_TRANSFER_TO,
      TRANSFER_DATA.validTransferAmount,
    );
  });

  await test.step("Verify transfer success and balance updates", async () => {
    await transferPage.assertTransferSuccess();
    console.log("TC_007: Transfer Complete message confirmed");

    await overviewPage.goto();

    await transferPage.page.screenshot({
      path: `test-results/screenshots/TC_007-overview-after.png`,
      fullPage: true,
    });

    await overviewPage.assertBalanceDecreasedBy(
      ACCOUNTS.UI_TRANSFER_FROM,
      fromBefore,
      TRANSFER_DATA.validTransferAmountNum,
    );

    await overviewPage.assertBalanceIncreasedBy(
      ACCOUNTS.UI_TRANSFER_TO,
      toBefore,
      TRANSFER_DATA.validTransferAmountNum,
    );

    console.log("TC_007: Passed — balances correctly updated");
  });
});
