import React from "react"
import { View, Text, StyleProp, TextStyle } from "react-native"
import { useTheme } from "@react-navigation/native"

import Icon from "components/ui/Icon"
import { ratingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  size: number
  style?: StyleProp<TextStyle>
  children: React.ReactNode
}

const RatingComponent = ({ size, style, children }: Props) => {
  const { dark } = useTheme()

  return (
    <View style={ratingStyles.root}>
      <Icon name="star" color={colors.orangeYellow} size={size} />
      <Text
        style={[
          ratingStyles.text,
          dark ? ratingStyles.dark : ratingStyles.light,
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

RatingComponent.defaultProps = {
  size: 20,
}

export default RatingComponent
