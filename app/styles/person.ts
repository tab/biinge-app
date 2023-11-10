import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { width } = Dimensions.get("window")

export const personStyles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
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
  overview: {
    padding: 0,
  },
})

export const personImageStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    alignSelf: "center",
    aspectRatio: "4/6",
    backgroundColor: colors.americanSilver,
    filter: "grayscale(100%)",
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
})

export const personMoviesStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 10,
  },
  title: {
    color: colors.grayDark,
    marginHorizontal: 5,
    marginBottom: 5,
  },
})
