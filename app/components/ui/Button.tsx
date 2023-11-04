import React from "react"
import { Pressable, Text, ViewStyle, TextStyle, StyleProp } from "react-native"

import { buttonStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  children: React.ReactNode
  onPress: () => void
}

const ButtonComponent = ({
  style,
  textStyle,
  disabled,
  children,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={[buttonStyles.button, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[buttonStyles.text, textStyle]}>{children}</Text>
    </Pressable>
  )
}

ButtonComponent.defaultProps = {
  disabled: false,
}

export default ButtonComponent
