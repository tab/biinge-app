import React from "react"
import { View } from "react-native"
import { BlurView } from "@react-native-community/blur"

import { posterStyles } from "styles"
import Image from "components/ui/Image"
import colors from "styles/colors"

type Props = {
  item: any
}

const PosterComponent = ({ item }: Props) => {
  const { poster_path } = item

  return (
    <View style={posterStyles.root}>
      <BlurView
        style={posterStyles.blur}
        blurType="light"
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <Image style={posterStyles.image} size="w780" path={poster_path} />
    </View>
  )
}

export default PosterComponent
