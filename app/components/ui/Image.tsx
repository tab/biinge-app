import React from "react"
import { View, Text, StyleProp, StyleSheet } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import FastImage from "react-native-fast-image"
import { useTheme } from "@react-navigation/native"

import { imageUrl } from "helpers/imageUrl"
import { TMDBPosterSizeType } from "types"
import { darkTheme, lightTheme } from "styles/theme"
import colors from "styles/colors"

type Props = {
  title?: string
  path: string
  size: TMDBPosterSizeType
  style?: StyleProp<any>
}

const ImageComponent = ({ title, path, size, style }: Props) => {
  const { dark } = useTheme()

  return (
    <Animated.View
      entering={FadeIn.delay(250)}
      exiting={FadeOut}
      style={[style, dark ? styles.bgDark : styles.bgLight]}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <FastImage
        style={style}
        source={{
          uri: imageUrl(size, path),
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Animated.View>
  )
}

export default ImageComponent

const styles = StyleSheet.create({
  bgDark: {
    backgroundColor: darkTheme.colors.card,
  },
  bgLight: {
    backgroundColor: lightTheme.colors.card,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.spanishGray,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
})
