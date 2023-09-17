import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const movieStyles = StyleSheet.create({
  year: {
    color: colors.graniteGray,
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 26,
    marginVertical: 7,
  },
})

export const posterStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingTop: 24,
    // paddingHorizontal: 44,
  },
  image: {
    // borderRadius: 8,
    resizeMode: "contain",
    flex: 1,
    aspectRatio: "4/5",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
})

export const ratingStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 24,
    left: 24,
  },
  rating: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 30,
  },
})
