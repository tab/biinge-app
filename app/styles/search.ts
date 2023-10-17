import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const searchFormStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    paddingBottom: 0,
  },
  group: {
    marginBottom: 15,
  },
  input: {
    color: colors.black,
    fontSize: 18,
    borderWidth: 1,
    paddingTop: 9,
    paddingRight: 8,
    paddingBottom: 10,
    paddingLeft: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.orangeYellow,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: colors.orangeYellow,
    shadowOffset: { height: 0, width: 0 },
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
