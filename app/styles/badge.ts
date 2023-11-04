import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const badgeStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(25, 25, 25, 0.25)",
    borderRadius: 50,
    paddingVertical: 0,
    paddingBottom: 2,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 22,
    right: 18,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21,
  },
})
