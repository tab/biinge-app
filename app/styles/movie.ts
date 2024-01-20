import { StyleSheet, Dimensions } from "react-native"
import { buttonStyles } from "./button"
import colors from "styles/colors"

const { height, width } = Dimensions.get("window")

const POSTER_HEIGHT = (width * 0.7 * 6) / 4

export const movieStyles = StyleSheet.create({
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
  runtime: {
    color: colors.spanishGray,
  },
})

export const posterStyles = StyleSheet.create({
  root: {
    paddingVertical: 24,
    paddingHorizontal: 36,
    paddingBottom: 24,
  },
  image: {
    alignSelf: "center",
    aspectRatio: "4/6",
    backgroundColor: colors.americanSilver,
    borderRadius: 12,
    width: width * 0.7,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 3,
  },
  blur: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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

export const actionStyles = StyleSheet.create({
  root: {
    paddingVertical: 15,
  },
  content: {
    flexDirection: "row",
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  action: {
    width: width,
  },
})

export const ratingStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: colors.raisinBlack,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
    marginLeft: 5,
  },
})

export const overviewStyles = StyleSheet.create({
  root: {
    padding: 0,
  },
  title: {
    color: colors.graniteGray,
    marginBottom: 7,
  },
})

export const statusStyles = StyleSheet.create({
  root: {
    borderColor: colors.gunmetal,
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.gunmetal,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 22,
  },
})

export const actionButtonStyles = StyleSheet.create({
  buttonWant: {
    ...buttonStyles.button,
    backgroundColor: colors.black,
    marinHorizontal: 5,
    marginRight: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    width: "48%",
  },
  buttonWatching: {
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
    width: "48%",
  },
  buttonWatched: {
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
    width: "48%",
  },
  buttonActive: {
    ...buttonStyles.button,
    backgroundColor: colors.orangeYellow,
    // shadowColor: colors.orangeYellow,
    // shadowOffset: {
    //   width: 1,
    //   height: 3,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 1,
    width: "100%",
  },
})

export const overlayStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height,
    width: width,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlayButton: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  actions: {
    padding: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 0,
    margin: 0,
    padding: 10,
  },
  text: {
    color: colors.graniteGray,
    fontWeight: "600",
  },
})

export const playStyles = StyleSheet.create({
  root: {
    position: "absolute",
    top: POSTER_HEIGHT - 20,
    right: 65,
    height: 40,
    width: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    paddingLeft: 3,
    height: "100%",
    width: "100%",
  },
})

export const recommendationsStyles = StyleSheet.create({
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
