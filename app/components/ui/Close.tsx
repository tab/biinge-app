import React from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { useTheme, useNavigation } from "@react-navigation/native"

import colors from "styles/colors"
import Icon from "components/ui/Icon"
import { closeStyles, layoutStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
}

const CloseComponent = ({ style }: Props) => {
  const navigation = useNavigation()
  const { dark } = useTheme()

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <Pressable style={[closeStyles.root, style]} onPress={handleClose}>
      <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          closeStyles.content,
          dark ? layoutStyles.bgDark : layoutStyles.bgLight,
        ]}
      >
        <Icon
          name="close-outline"
          color={dark ? colors.white : colors.graniteGray}
          size={21}
        />
      </Animated.View>
    </Pressable>
  )
}

export default CloseComponent
