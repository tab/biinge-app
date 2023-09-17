import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { SafeAreaView, ScrollView } from "react-native"

import { useMovie } from "hocs/useMovie"
import Poster from "components/Movie/Poster"
import Content from "components/Movie/Content"
import { layoutStyles } from "styles"
import { MovieType } from "types"

type Props = {
  id: string
  movie: MovieType
}

const MovieScreen = ({ movie }: Props) => {
  return (
    <SafeAreaView style={layoutStyles.root}>
      <ScrollView
        contentContainerStyle={null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        <Poster image={movie.image} rating={movie.rating} />
        <Content movie={movie} />
      </ScrollView>
    </SafeAreaView>
  )
}

export const MOVIE_SCREEN = {
  name: "com.biinge.Movie",
}

export default compose<ComponentType>(useMovie)(MovieScreen)
