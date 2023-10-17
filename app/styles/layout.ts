import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const layoutStyles: StyleSheet.NamedStyles<any> = {
  root: {
    flex: 1,
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

export const listStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  empty: {
    padding: 15,
    width: "100%",
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
    backgroundColor: colors.gunmetal,
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
