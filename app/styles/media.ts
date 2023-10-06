import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const mediaStyles = StyleSheet.create({
  year: {
    color: colors.graniteGray,
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 26,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  action: {
    width: "100%",
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
    backgroundColor: colors.gunmetal,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    left: 10,
  },
  text: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "500",
    lineHeight: 30,
    marginLeft: 5,
  },
})

export const contentRatingStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "300",
    lineHeight: 30,
  },
})
