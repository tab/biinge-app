import { StyleSheet, Dimensions } from "react-native"
import { buttonStyles } from "./button"
import colors from "styles/colors"

const { height, width } = Dimensions.get("window")

export const movieStyles = StyleSheet.create({
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
    color: colors.raisinBlack,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 28,
  },
  full: {
    flexBasis: "100%",
  },
  short: {
    flexBasis: "75%",
  },
  date: {
    color: colors.graniteGray,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
  },
  overview: {
    paddingBottom: 60,
  },
})

export const posterStyles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 24,
    paddingHorizontal: 36,
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
    // position: "absolute",
  },
  content: {
    // paddingVertical: 20,
    // borderTopWidth: 0.5,
    // borderColor: colors.americanSilver,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: colors.raisinBlack,
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 5,
  },
})

export const imdbLogoStyles = StyleSheet.create({
  image: {
    height: 32,
    width: 64,
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
    marginRight: 5,
    width: "50%",
  },
  buttonWatched: {
    ...buttonStyles.button,
    marginLeft: 5,
    width: "50%",
  },
})

export const cardStyles = StyleSheet.create({
  container: {
    flexBasis: width / 2,
    padding: 15,
  },
  image: {
    aspectRatio: "4/6",
    borderRadius: 12,
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 1,
    //   height: 3,
    // },
    // shadowOpacity: 0.07,
    // shadowRadius: 5,
    // elevation: 1,
  },
  even: {
    paddingLeft: 10,
    paddingBottom: 0,
  },
  odd: {
    paddingRight: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.raisinBlack,
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
  actions: {
    position: "absolute",
    bottom: 24,
    left: 15,
    right: 15,
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
