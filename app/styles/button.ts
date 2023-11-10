import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gunmetal,
    borderRadius: 50,
    justifyContent: "center",
    padding: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    position: "absolute",
    left: 16,
  },
})
