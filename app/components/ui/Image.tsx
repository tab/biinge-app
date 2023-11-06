import React from "react"
import { View, Text, StyleProp, StyleSheet } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import FastImage from "react-native-fast-image"

import { imageUrl } from "helpers/imageUrl"
import colors from "styles/colors"
import { TMDBPosterSizeType } from "types"

type Props = {
  title?: string
  path: string
  size: TMDBPosterSizeType
  style?: StyleProp<any>
}

const ImageComponent = ({ title, path, size, style }: Props) => {
  return (
    <Animated.View entering={FadeIn} style={[style, styles.root]}>
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
  root: {
    backgroundColor: colors.americanSilver,
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
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
})
