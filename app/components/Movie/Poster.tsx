import React from "react"
import { View } from "react-native"
import { BlurView } from "@react-native-community/blur"

import { posterStyles } from "styles"
import Image from "components/ui/Image"
import colors from "styles/colors"

type Props = {
  poster_path: string
}

const PosterComponent = ({ poster_path }: Props) => {
  return (
    <>
      <BlurView
        style={posterStyles.blur}
        blurType="light"
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <View style={posterStyles.root}>
        <Image style={posterStyles.image} size="w780" path={poster_path} />
      </View>
    </>
  )
}

export default PosterComponent
