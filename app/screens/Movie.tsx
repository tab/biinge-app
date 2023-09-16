import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View, Text, StyleSheet } from "react-native"

import i18n from "config/i18n"
import { useMovie } from "hocs/useMovie"
import { MovieType } from "types"

type Props = {
  id: string
  movie: MovieType
}

const MovieScreen = ({ id, movie }: Props) => {
  console.log("--- props ---")
  console.log(id)
  console.log(movie)

  return (
    <View style={styles.root}>
      <Text>{movie.title}</Text>
      <Text>{movie.year}</Text>
      <Text>{movie.plot}</Text>
      <Text>{movie.image}</Text>
    </View>
  )
}

MovieScreen.options = {
  topBar: {
    title: {
      text: i18n.t("screens.movie.title"),
    },
  },
  bottomTab: {
    text: i18n.t("screens.movie.title"),
  },
}

export const MOVIE_SCREEN = {
  name: "com.biinge.Movie",
  title: i18n.t("screens.movie.title"),
}

export default compose<ComponentType>(useMovie)(MovieScreen)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
})
