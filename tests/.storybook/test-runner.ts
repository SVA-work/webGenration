import type { TestRunnerConfig } from "@storybook/test-runner"
import { toMatchImageSnapshot } from "jest-image-snapshot"
import { expect } from "@jest/globals"

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async postVisit(page, context) {
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: "../__snapshots__",
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.01,
      failureThresholdType: "percent",
    })
  },
}

export default config
