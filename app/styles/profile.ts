import { StyleSheet } from "react-native"
import colors from "styles/colors"
import { darkTheme, lightTheme } from "./theme"

export const profileStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 24,
  },
  section: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 15,
    marginBottom: 15,
  },
  avatar: {
    height: 70,
    width: 70,
  },
  menu: {
    backgroundColor: "transparent",
  },
  logOut: {
    backgroundColor: colors.black,
  },
  counters: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
})

export const appearanceStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 118,
    width: 60,
  },
  title: {
    marginVertical: 10,
  },
})

export const statisticsStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  sectionDark: {
    borderBottomColor: darkTheme.colors.border,
    borderBottomWidth: 0.5,
  },
  sectionLight: {
    borderBottomColor: lightTheme.colors.border,
    borderBottomWidth: 0.5,
  },
})

export const statsStyles = StyleSheet.create({
  root: {
    borderRadius: 12,
    marginTop: 15,
  },
  content: {
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginVertical: 10,
    width: "100%",
  },
  cell: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "33.3333%",
  },
})

export const menuStyles = StyleSheet.create({
  root: {},
  button: {
    backgroundColor: "transparent",
  },
})

export const menuSectionStyles = StyleSheet.create({
  root: {
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  icon: {
    marginRight: 7,
  },
})

export const menuVersionStyles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.graniteGray,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
  },
})
