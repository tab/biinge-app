import React from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { useTheme } from "@react-navigation/native"

import colors from "styles/colors"
import Icon from "components/ui/Icon"
import { closeStyles, layoutStyles } from "styles"

type Props = {
  isDark?: boolean
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

const CloseComponent = ({ isDark, style, onPress }: Props) => {
  const { dark } = useTheme()

  return (
    <Pressable style={[closeStyles.root, style]} onPress={onPress}>
      <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          closeStyles.content,
          isDark
            ? layoutStyles.bgDarkCard
            : dark
              ? layoutStyles.bgDark
              : layoutStyles.bgLight,
        ]}
      >
        <Icon
          name="close-outline"
          color={
            isDark ? colors.white : dark ? colors.white : colors.graniteGray
          }
          size={21}
        />
      </Animated.View>
    </Pressable>
  )
}

CloseComponent.defaultProps = {
  isDark: false,
}

export default CloseComponent
