import React from "react"
import { Pressable, Text, ViewStyle, TextStyle, StyleProp } from "react-native"

import { buttonStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children: React.ReactNode
  onPress: () => void
}

const ButtonComponent = ({ style, textStyle, children, onPress }: Props) => {
  return (
    <Pressable style={[buttonStyles.button, style]} onPress={onPress}>
      <Text style={[buttonStyles.text, textStyle]}>{children}</Text>
    </Pressable>
  )
}

export default ButtonComponent
