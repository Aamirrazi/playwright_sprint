import { test as baseTest, APIRequestContext } from "@playwright/test";
import { CONFIG } from "../config/config";
import { logger } from "../utils/logger";

type ApiFixtures = {
  apiRequest: APIRequestContext;
};

export const apiTest = baseTest.extend<ApiFixtures>({
  apiRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: CONFIG.API_BASE,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const oldGet = context.get;
    context.get = async (url, options) => {
      const startTime = performance.now();
      const response = await oldGet.call(context, url, options);
      const endTime = performance.now();

      const duration = Math.round(endTime - startTime);
      logger.apiResponse(response.status(), url.toString(), {
        durationMs: duration,
      });

      return response;
    };

    const oldPost = context.post;
    context.post = async (url, options) => {
      const startTime = performance.now();
      const response = await oldPost.call(context, url, options);
      const endTime = performance.now();

      const duration = Math.round(endTime - startTime);
      logger.apiResponse(response.status(), url.toString(), {
        durationMs: duration,
      });

      return response;
    };

    await use(context);
    await context.dispose();
  },
});
