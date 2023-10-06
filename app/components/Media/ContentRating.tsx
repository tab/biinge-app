import React from "react"
import { View, Text } from "react-native"

import { contentRatingStyles } from "styles"

type Props = {
  contentRating: string
}

const ContentRatingComponent = ({ contentRating }: Props) => {
  return (
    <View style={contentRatingStyles.container}>
      <Text style={contentRatingStyles.text}>{contentRating}</Text>
    </View>
  )
}

export default ContentRatingComponent
