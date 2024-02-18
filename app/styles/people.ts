import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const peopleStyles = StyleSheet.create({
  root: {
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
    height: 65,
    width: 65,
  },
  name: {
    marginVertical: 5,
  },
  textDark: {
    color: colors.grayDark,
    textAlign: "center",
  },
  textLight: {
    color: colors.spanishGray,
    textAlign: "center",
  },
})
