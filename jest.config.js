module.exports = {
  preset: "@testing-library/react-native",
  testMatch: ["**/?(*.)(spec|test).ts?(x)"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|@react-navigation|react-native-.*|@react-native-community|rn-color-matrices|concat-color-matrices|@expo)"
  ],
  moduleNameMapper: {
  },
  setupFiles: [
    "<rootDir>/__tests__/support/jest.setup.ts"
  ]
}
