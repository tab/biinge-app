import React from "react"
import { Text, StyleProp, TextStyle } from "react-native"

import { typographyStyles, TypographyVariantType } from "styles"

type Props = {
  style?: StyleProp<TextStyle>
  variant: TypographyVariantType
  children: React.ReactNode
}

const TypographyComponent = ({ style, variant, children }: Props) => {
  const getVariantStyle = () => typographyStyles[variant] || {}

  return <Text style={[getVariantStyle(), style]}>{children}</Text>
}

export default TypographyComponent
