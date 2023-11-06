module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@realm/babel-plugin",
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./app"],
        extensions: [".ios.ts", ".android.ts", ".ts", ".tsx", ".json"],
      },
    ],
  ],
}
