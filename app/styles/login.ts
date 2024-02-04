import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const loginStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
})

export const loginFormStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 60,
    width: "100%",
  },
  contentPadding: {
    paddingBottom: 24,
  },
  group: {
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "column",
  },
  submit: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 4,
    justifyContent: "center",
    padding: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
})
