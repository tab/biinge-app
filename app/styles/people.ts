import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const peopleStyles = StyleSheet.create({
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

export const peopleListStyles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 90,
  },
  image: {
    aspectRatio: "1",
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  name: {
    color: colors.grayDark,
    textAlign: "center",
    marginHorizontal: 2,
    marginTop: 7,
  },
  description: {
    color: colors.spanishGray,
    textAlign: "center",
    marginHorizontal: 2,
    marginTop: 3,
  },
})
