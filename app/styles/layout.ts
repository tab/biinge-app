import { StyleSheet } from "react-native"
import colors from "styles/colors"

export const layoutStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bgDark: {
    backgroundColor: colors.black,
  },
  bgLight: {
    backgroundColor: colors.white,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
  roundCorners: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  list: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: colors.raisinBlack,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 33,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
})

export const contentStyles = StyleSheet.create({
  textBold: {
    color: colors.graniteGray,
    marginBottom: 7,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 21,
    color: colors.black,
  },
})

export const tabBarStyles = StyleSheet.create({
  list: {
    backgroundColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  itemActive: {},
  avatar: {
    height: 26,
    width: 26,
  },
})

export const listStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 10,
    paddingBottom: 15,
  },
  card: {
    flex: 1,
  },
  cardMd: {
    padding: 7,
    maxWidth: "50%",
  },
  cardSm: {
    padding: 5,
    maxWidth: "33.3333%",
  },
  image: {
    aspectRatio: "4/6",
  },
  imageMd: {
    borderRadius: 12,
  },
  imageSm: {
    borderRadius: 6,
  },
  icon: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 3,
    padding: 2,
    position: "absolute",
  },
  iconMd: {
    top: 16,
    right: 16,
  },
  iconSm: {
    top: 10,
    right: 10,
  },
})

export const horizontalListStyles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
})

export const listEmptyStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
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

export const navStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.black,
    margin: 0,
  },
  list: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    paddingBottom: 0.5,
  },
  item: {
    borderBottomColor: "transparent",
    borderBottomWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  itemActive: {
    borderBottomColor: colors.white,
  },
  title: {
    color: colors.americanSilver,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
  },
  titleActive: {
    color: colors.white,
  },
})
