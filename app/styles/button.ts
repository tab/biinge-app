import { StyleSheet } from "react-native"
import colors from "styles/colors"
import { darkTheme, lightTheme } from "./theme"

export const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
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
  textDark: {
    color: darkTheme.colors.text,
  },
  textLight: {
    color: lightTheme.colors.text,
  },
  loader: {
    position: "absolute",
    left: 16,
  },
})

export const actionButtonStyles = StyleSheet.create({
  buttonWant: {
    ...buttonStyles.button,
    backgroundColor: colors.black,
    marinHorizontal: 5,
    marginRight: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    width: "48%",
  },
  buttonWatching: {
    ...buttonStyles.button,
    backgroundColor: colors.black,
    marinHorizontal: 5,
    marginLeft: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    width: "48%",
  },
  buttonWatched: {
    ...buttonStyles.button,
    backgroundColor: colors.black,
    marinHorizontal: 5,
    marginLeft: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    width: "48%",
  },
  buttonActive: {
    ...buttonStyles.button,
    backgroundColor: colors.orangeYellow,
    width: "100%",
  },
  buttonTextActive: {
    color: colors.white,
  },
  buttonDark: {
    backgroundColor: darkTheme.colors.text,
    shadowColor: darkTheme.colors.text,
  },
  buttonLight: {
    backgroundColor: lightTheme.colors.text,
    shadowColor: lightTheme.colors.text,
  },
})
