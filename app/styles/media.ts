import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"
import { buttonStyles } from "./button"

const { height, width } = Dimensions.get("window")

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
    width: width,
  },
})

export const posterStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    height: (width * 5) / 4,
    width: width,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
})

export const badgeStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(43, 40, 53, 0.95)",
    borderRadius: 50,
    paddingVertical: 2,
    paddingBottom: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 15,
    right: 10,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
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

export const actionButtonStyles = StyleSheet.create({
  buttonWant: {
    ...buttonStyles.button,
    marginRight: 5,
  },
  buttonWatched: {
    ...buttonStyles.button,
    marginLeft: 5,
  },
})

export const cardStyles = StyleSheet.create({
  container: {
    flexBasis: width / 2,
    padding: 15,
  },
  image: {
    borderRadius: 15,
    aspectRatio: "4/5",
  },
  even: {
    paddingLeft: 10,
    paddingBottom: 0,
  },
  odd: {
    paddingRight: 10,
    paddingBottom: 0,
  },
})

export const overlayStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    height: height,
    width: width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  actions: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    width: width - 10,
  },
  button: {
    backgroundColor: colors.raisinBlack,
    borderRadius: 0,
    margin: 0,
    borderBottomColor: colors.gunmetal,
    borderBottomWidth: 0.5,
  },
  buttonCancel: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomWidth: 0,
  },
  buttonDanger: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  text: {
    color: colors.americanSilver,
  },
  textDanger: {
    color: colors.darkCandyAppleRed,
  },
})
