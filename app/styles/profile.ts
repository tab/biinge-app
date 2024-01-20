import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const profileStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: colors.lotion,
    padding: 24,
  },
  header: {},
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomColor: colors.americanSilver,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  avatar: {
    height: 70,
    width: 70,
  },
  actions: {},
  logOut: {
    backgroundColor: colors.black,
  },
  counters: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
})
