import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { height, width } = Dimensions.get("window")

export const searchFormStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.lotion,
    borderBottomColor: colors.americanSilver,
    borderBottomWidth: 0.5,
    flexDirection: "column",
    padding: 15,
    paddingTop: 19,
    paddingBottom: 18,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.gray,
    paddingHorizontal: 8,
    paddingTop: 1,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: colors.gray,
    shadowOffset: { height: 0, width: 0 },
  },
  input: {
    color: colors.black,
    fontSize: 18,
    paddingTop: 9,
    paddingRight: 8,
    paddingBottom: 10,
    paddingLeft: 8,
    width: width - 68,
    borderWidth: 0,
  },
  submit: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.gunmetal,
    borderRadius: 50,
    justifyContent: "center",
    padding: 15,
    marginHorizontal: 5,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
})

export const searchEmptyStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: height / 1.4,
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
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
