import React from "react"
import { View, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import { ratingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  children: React.ReactNode
}

const RatingComponent = ({ children }: Props) => {
  return (
    <View style={ratingStyles.container}>
      <Icon name="star" size={20} color={colors.orangeYellow} />
      <Text style={ratingStyles.text}>{children}</Text>
    </View>
  )
}

export default RatingComponent
