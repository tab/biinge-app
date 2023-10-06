import React from "react"
import { View, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { posterStyles } from "styles"
import Rating from "components/Media/Rating"
import ContentRating from "components/Media/ContentRating"

type Props = {
  image: string
  contentRating: string
  star: number
}

const PosterComponent = ({ image, contentRating, star }: Props) => {
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
      <Rating star={star} />
      <ContentRating contentRating={contentRating} />
    </View>
  )
}

export default PosterComponent
