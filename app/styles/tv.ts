import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"
import { buttonStyles } from "./button"

const { width } = Dimensions.get("screen")

export const tvStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: colors.graniteGray,
  },
})

export const seasonsStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    paddingBottom: 20,
  },
  title: {
    color: colors.graniteGray,
    marginBottom: 7,
    paddingHorizontal: 15,
  },
})

export const seasonsListStyles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    padding: 10,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 50,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 5,
    paddingTop: 4,
  },
  itemActive: {
    backgroundColor: colors.gunmetal,
  },
  title: {
    color: colors.grayDark,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  titleActive: {
    color: colors.white,
  },
})

export const seasonActionsStyles = StyleSheet.create({
  root: {
    padding: 15,
  },
  content: {
    flexDirection: "row",
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    ...buttonStyles.button,
    backgroundColor: colors.black,
    marinHorizontal: 5,
    marginLeft: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    width: "100%",
  },
})

export const episodesListStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 0,
  },
  divider: {
    borderTopColor: colors.americanSilver,
    borderTopWidth: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  aside: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  number: {
    color: colors.graniteGray,
  },
  date: {
    color: colors.spanishGray,
    marginTop: 2,
  },
  runtime: {
    color: colors.spanishGray,
    marginTop: 2,
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    maxWidth: width - width * 0.4,
  },
  titleActive: {},
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 15,
    width: 15,
    marginHorizontal: 7,
  },
  toggle: {
    color: colors.white,
  },
})
