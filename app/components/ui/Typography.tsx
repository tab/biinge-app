import React from "react"
import { Text, StyleProp, TextStyle } from "react-native"

import { typographyStyles, TypographyVariantType } from "styles"

type Props = {
  style?: StyleProp<TextStyle>
  variant: TypographyVariantType
  numberOfLines?: number
  children: React.ReactNode
}

const TypographyComponent = ({
  style,
  variant,
  numberOfLines,
  children,
}: Props) => {
  const getVariantStyle = () => typographyStyles[variant] || {}

  return (
    <Text
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[getVariantStyle(), style]}
    >
      {children}
    </Text>
  )
}

TypographyComponent.defaultProps = {
  numberOfLines: 0,
}

export default TypographyComponent
