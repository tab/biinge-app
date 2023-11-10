import { StyleSheet, Dimensions } from "react-native"

const { height } = Dimensions.get("window")

export const loadingStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
