import React from "react"
import { View, Image, Text } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { posterStyles, ratingStyles } from "styles"
import { RatingType } from "types"

type Props = {
  image: string
  rating: RatingType
}

const PosterComponent = ({ image, rating }: Props) => {
  return (
    <View style={posterStyles.container}>
      <Image
        style={posterStyles.image}
        resizeMode="cover"
        source={{ uri: image }}
      />
      <LinearGradient
        style={posterStyles.gradient}
        colors={[
          "rgba(0, 0, 0, 0) 100%)",
          "rgba(0, 0, 0, 0.4) 50%",
          "rgba(0, 0, 0, 0.6) 0%",
        ]}
      />
      <View style={ratingStyles.container}>
        <Text style={ratingStyles.rating}>{rating.star}</Text>
      </View>
    </View>
  )
}

export default PosterComponent
