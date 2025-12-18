import type { Config } from "jest"
import nextJest from "next/jest"

const createJestConfig = nextJest({
  dir: "./",
})

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/tests/../$1",
  },
  testMatch: ["**/unit/**/*.test.[jt]s?(x)"],
  collectCoverageFrom: [
    "/components/**/*.{js,jsx,ts,tsx}",
    "/lib/**/*.{js,jsx,ts,tsx}",
    "/app/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/*.stories.tsx",
  ],
}

export default createJestConfig(config)
