module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@realm/babel-plugin",
    // ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "module-resolver",
      {
        root: ["./app"],
        extensions: [".ios.ts", ".android.ts", ".ts", ".tsx", ".json"],
      },
    ],
  ],
}
