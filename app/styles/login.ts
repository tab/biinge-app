import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const loginStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  content: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
})

export const loginFormStyles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    width: "100%",
  },
  group: {
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    padding: 12,
    backgroundColor: colors.white,
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
