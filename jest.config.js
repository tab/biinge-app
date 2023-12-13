module.exports = {
  preset: "@testing-library/react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|react-native-flash-message|react-clone-referenced-element|@react-native-community|rn-color-matrices|concat-color-matrices/*)",
  ],
}
