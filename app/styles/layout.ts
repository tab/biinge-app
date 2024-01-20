import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { width } = Dimensions.get("window")

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
    backgroundColor: colors.white,
    padding: 5,
  },
  card: {
    flex: 1,
  },
  cardMd: {
    padding: 5,
    width: "50%",
  },
  cardSm: {
    padding: 5,
    width: "33.3333%",
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
  pin: {
    borderRadius: 3,
    padding: 2,
    position: "absolute",
    top: 10,
    right: 10,
  },
  pinIcon: {
    transform: [{ rotate: "25deg" }],
  },
})

export const horizontalListStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: 200,
  },
  content: {
    backgroundColor: colors.white,
    paddingLeft: 10,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 10,
  },
  image: {
    aspectRatio: "4/6",
    width: width * 0.3333,
  },
  imageMd: {
    borderRadius: 8,
  },
  imageSm: {
    borderRadius: 4,
    width: width * 0.28,
  },
  icon: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 3,
    padding: 2,
    position: "absolute",
  },
  iconMd: {
    top: 8,
    right: 8,
  },
  iconSm: {
    top: 5,
    right: 5,
  },
})

export const horizontalStubListStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  item: {},
  itemMovie: {
    borderRadius: 8,
    marginRight: 10,
    height: (width * 0.3333 * 6) / 4,
    width: width * 0.3333,
  },
  itemTv: {
    borderRadius: 8,
    marginRight: 10,
    height: (width * 0.3333 * 6) / 4,
    width: width * 0.3333,
  },
  itemPerson: {
    borderRadius: 50,
    marginHorizontal: 10,
    height: 70,
    width: 70,
  },
})

export const listEmptyStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: width - 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    lineHeight: 60,
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
    width: "50%",
  },
  itemTv: {
    width: "33.3333%",
  },
  itemActive: {
    borderBottomColor: colors.white,
  },
  title: {
    color: colors.americanSilver,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  titleActive: {
    color: colors.white,
  },
})
