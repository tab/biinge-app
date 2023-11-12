import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import colors from "styles/colors"
import Icon from "components/ui/Icon"

type Props = {
  style?: StyleProp<ViewStyle>
}

const CheckComponent = ({ style }: Props) => {
  return (
    <Animated.View entering={FadeIn} style={style}>
      <Icon name="checkmark-outline" color={colors.white} size={15} />
    </Animated.View>
  )
}

export default CheckComponent
