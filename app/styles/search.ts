import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { width } = Dimensions.get("window")

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
