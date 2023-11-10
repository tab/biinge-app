import React from "react"
import { Pressable, Text, ViewStyle, TextStyle, StyleProp } from "react-native"

import { buttonStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onPress: () => void
}

const ButtonComponent = ({
  style,
  textStyle,
  disabled,
  loading,
  children,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={
        disabled || loading
          ? [buttonStyles.button, buttonStyles.disabled, style]
          : [buttonStyles.button, style]
      }
      disabled={disabled || loading}
      onPress={onPress}
    >
      <Text style={[buttonStyles.text, textStyle]}>{children}</Text>
    </Pressable>
  )
}

ButtonComponent.defaultProps = {
  disabled: false,
  loading: false,
}

export default ButtonComponent
