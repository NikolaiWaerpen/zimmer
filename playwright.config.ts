import { PlaywrightTestConfig } from "@playwright/test";
import { TEST_STATE_PATH } from "./consts";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    // headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:3000",
    storageState: TEST_STATE_PATH,
  },
  // globalSetup: require.resolve("./tests/global-setup"),
};

export default config;
