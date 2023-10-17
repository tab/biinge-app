import React from "react"
import { View, Text } from "react-native"

import { contentRatingStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const ContentRatingComponent = ({ children }: Props) => {
  return (
    <View style={contentRatingStyles.container}>
      <Text style={contentRatingStyles.text}>{children}</Text>
    </View>
  )
}

export default ContentRatingComponent
