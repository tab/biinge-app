import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { width } = Dimensions.get("window")

export const personStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 7,
    paddingVertical: 20,
    marginTop: -20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
    alignItems: "flex-start",
    marginBottom: 7,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 28,
  },
  date: {
    color: colors.gray,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
  },
})

export const personPosterStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {},
  image: {
    alignSelf: "center",
    aspectRatio: "4/6",
    width: width,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  content: {
    position: "absolute",
    bottom: 35,
    left: 15,
    right: 0,
  },
})

export const personListStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    minHeight: 200,
  },
  title: {
    color: colors.grayDark,
    marginHorizontal: 10,
  },
})
