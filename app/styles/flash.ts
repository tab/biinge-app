import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const flashStyles = StyleSheet.create({
  root: {
    backgroundColor: "transparent",
    height: 50,
    width: "100%",
  },
  text: {},
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
})
