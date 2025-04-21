import React from "react"
import { View, ActivityIndicator } from "react-native"
import { BlurView } from "@react-native-community/blur"

import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import { loadingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  dark: boolean
}

const LoaderComponent = ({ dark }: Props) => {
  return (
    <View style={loadingStyles.root}>
      <BlurView
        style={loadingStyles.blur}
        blurType={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.darkBlack}
      />
      <ActivityIndicator animating={true} size="small" color={colors.white} />
    </View>
  )
}

LoaderComponent.defaultProps = {
  dark: true,
}

export default LoaderComponent
