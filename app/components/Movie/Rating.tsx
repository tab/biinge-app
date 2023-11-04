import React from "react"
import { View, Image, Text } from "react-native"

import { ratingStyles, imdbLogoStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const RatingComponent = ({ children }: Props) => {
  return (
    <View style={ratingStyles.container}>
      <Image
        style={imdbLogoStyles.image}
        source={require("../../assets/icons/imdb.png")}
      />
      <Text style={ratingStyles.text}>{children}</Text>
    </View>
  )
}

export default RatingComponent
