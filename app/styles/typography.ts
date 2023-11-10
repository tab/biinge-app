import { StyleSheet, Dimensions } from "react-native"
import colors from "styles/colors"

const { width } = Dimensions.get("window")

export const titleStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  full: {
    flexBasis: "100%",
  },
  short: {
    flexBasis: width - 115,
  },
})

export type TypographyVariantType =
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2"

export const typographyStyles = StyleSheet.create({
  title1: {
    color: colors.black,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 28,
  },
  title2: {
    color: colors.black,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
  },
  title3: {
    color: colors.black,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "400",
  },
  callout: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  body: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "300",
  },
  headline: {
    color: colors.black,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600",
  },
  subhead: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  footnote: {
    color: colors.black,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  caption1: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "700",
  },
  caption2: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
  },
})
