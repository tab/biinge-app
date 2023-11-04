import React from "react"
import { View, Text } from "react-native"

import { ratingStyles } from "styles"
import colors from "../../styles/colors"
import Icon from "../ui/Icon"

type Props = {
  children: React.ReactNode
}

const RatingComponent = ({ children }: Props) => {
  return (
    <View style={ratingStyles.root}>
      <View style={ratingStyles.content}>
        <Icon name="star" color={colors.orangeYellow} size={20} />
        <Text style={ratingStyles.text}>{children}</Text>
      </View>
    </View>
  )
}

export default RatingComponent
