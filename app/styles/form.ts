import { StyleSheet } from "react-native"

import { darkTheme, lightTheme } from "styles/theme"
import colors from "styles/colors"

export const inputStyles = StyleSheet.create({
  root: {
    color: colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.black,
  },
  dark: {
    backgroundColor: darkTheme.colors.card,
    color: darkTheme.colors.text,
  },
  light: {
    backgroundColor: lightTheme.colors.card,
    color: lightTheme.colors.text,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
})

export const inputErrorStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginTop: 5,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 15,
  },
})

export const formErrorStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  text: {
    color: colors.darkCandyAppleRed,
    textAlign: "center",
    fontSize: 15,
  },
})
