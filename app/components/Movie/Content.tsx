import React from "react"
import { View, Text } from "react-native"

import { layoutStyles, movieStyles } from "styles"
import { MovieType } from "types"

type Props = {
  movie: MovieType
}

const ContentComponent = ({ movie }: Props) => {
  return (
    <View style={layoutStyles.content}>
      <Text style={layoutStyles.title}>{movie.title}</Text>
      <Text style={movieStyles.year}>{movie.year}</Text>
      <Text style={layoutStyles.text}>{movie.plot}</Text>
    </View>
  )
}

export default ContentComponent
