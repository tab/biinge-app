import React from "react"
import { View } from "react-native"
import { BlurView } from "@react-native-community/blur"
import { useTheme } from "@react-navigation/native"

import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import { posterStyles } from "styles"
import Image from "components/ui/Image"
import colors from "styles/colors"

type Props = {
  posterPath: string
}

const PosterComponent = ({ posterPath }: Props) => {
  const { dark } = useTheme()

  return (
    <>
      <BlurView
        style={[
          posterStyles.blur,
          dark ? posterStyles.blurDark : posterStyles.blurLight,
        ]}
        blurType={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <View style={posterStyles.root}>
        <Image style={posterStyles.image} size="w780" path={posterPath} />
      </View>
    </>
  )
}

export default PosterComponent
