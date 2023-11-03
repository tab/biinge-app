import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.gunmetal,
    borderRadius: 50,
    justifyContent: "center",
    padding: 15,
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
})

export const activeButtonStyles = StyleSheet.create({
  button: {
    ...buttonStyles.button,
    backgroundColor: colors.orangeYellow,
    width: "100%",
  },
  title: {
    ...buttonStyles.title,
    color: colors.white,
  },
})
