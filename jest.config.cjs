module.exports = {
  preset: "ts-jest/presets/js-with-ts", // important for TS + JSX
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};