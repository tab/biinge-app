import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const layoutStyles: StyleSheet.NamedStyles<any> = {
  root: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  title: {
    color: colors.raisinBlack,
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 33,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
}
