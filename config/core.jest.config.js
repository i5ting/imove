module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  rootDir: '../',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  testMatch: [
    "<rootDir>/__tests__/core/src/**/*.(spec|test).[jt]s?(x)"
  ]
};