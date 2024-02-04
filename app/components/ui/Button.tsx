import React from "react"
import { Pressable, ViewStyle, TextStyle, StyleProp } from "react-native"

import { buttonStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  loading?: boolean
  testID?: string
  children: React.ReactNode
  onPress: () => void
}

const ButtonComponent = ({
  style,
  disabled,
  loading,
  testID,
  children,
  onPress,
}: Props) => {
  return (
    <Pressable
      testID={testID}
      style={
        disabled || loading
          ? [buttonStyles.button, buttonStyles.disabled, style]
          : [buttonStyles.button, style]
      }
      disabled={disabled || loading}
      onPress={onPress}
    >
      {children}
    </Pressable>
  )
}

ButtonComponent.defaultProps = {
  disabled: false,
  loading: false,
}

export default ButtonComponent
