import { test, APIRequestContext } from "@playwright/test";
import { CONFIG } from "../config/config";

type ApiFixtures = {
  apiRequest: APIRequestContext;
};

export const apiTest = test.extend<ApiFixtures>({
  apiRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: CONFIG.API_BASE,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    await use(context);
    await context.dispose();
  },
});
