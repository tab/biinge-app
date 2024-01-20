import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const searchStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.raisinBlack,
    borderRadius: 4,
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 4,
  },
  icon: {},
  input: {
    flex: 1,
    color: colors.gray,
    fontSize: 16,
    padding: 5,
  },
  button: {
    color: colors.white,
    fontSize: 16,
  },
})

export const searchResultsStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 5,
  },
  title: {
    color: colors.grayDark,
    padding: 12,
  },
})
