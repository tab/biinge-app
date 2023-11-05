import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const layoutStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bgDark: {
    backgroundColor: colors.black,
  },
  bgLight: {
    backgroundColor: colors.white,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  list: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: colors.raisinBlack,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 33,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
})

export const contentStyles = StyleSheet.create({
  textBold: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
    marginBottom: 7,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
})

export const topBarStyles = StyleSheet.create({
  content: {
    backgroundColor: colors.orangeYellow,
    padding: 15,
  },
  text: {
    fontWeight: "600",
    fontSize: 24,
    color: colors.black,
  },
})

export const tabBarStyles = StyleSheet.create({
  list: {
    backgroundColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  itemActive: {},
  avatar: {
    height: 26,
    width: 26,
  },
})

export const listStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingBottom: 15,
  },
  empty: {
    padding: 15,
    width: "100%",
  },
})

export const listEmptyStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
  },
  subTitle: {
    color: colors.grayDark,
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
  },
  emoji: {
    fontSize: 44,
  },
})

export const navRoundStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.gunmetal,
    borderRadius: 50,
    margin: 15,
    marginBottom: 0,
  },
  list: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    padding: 3,
  },
  item: {
    backgroundColor: "transparent",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  itemActive: {
    backgroundColor: colors.white,
  },
  title: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
  },
  titleActive: {
    color: colors.black,
  },
})

export const navStyles = StyleSheet.create({
  root: {
    // backgroundColor: colors.gunmetal,
    backgroundColor: colors.black,
    margin: 0,
  },
  list: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    paddingBottom: 0.5,
  },
  item: {
    borderBottomColor: "transparent",
    borderBottomWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  itemActive: {
    borderBottomColor: colors.white,
  },
  title: {
    color: colors.americanSilver,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
  },
  titleActive: {
    color: colors.white,
  },
})
