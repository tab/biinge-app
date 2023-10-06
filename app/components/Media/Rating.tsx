import React from "react"
import { View, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import { ratingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  star: number
}

const RatingComponent = ({ star }: Props) => {
  return (
    <View style={ratingStyles.container}>
      <Icon name="star" size={20} color={colors.orangeYellow} />
      <Text style={ratingStyles.text}>{star}</Text>
    </View>
  )
}

export default RatingComponent
