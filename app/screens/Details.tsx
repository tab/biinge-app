import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { SafeAreaView, ScrollView } from "react-native"

import { useMovieDetails } from "hocs"
import Poster from "components/Movie/Poster"
import Content from "components/Movie/Content"
import { layoutStyles } from "styles"
import { MovieDetails } from "types"

type Props = {
  item: MovieDetails
}

const DetailsScreen = ({ item }: Props) => {
  return (
    <SafeAreaView style={layoutStyles.root}>
      <ScrollView
        contentContainerStyle={null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        <Poster item={item} />
        <Content item={item} />
      </ScrollView>
    </SafeAreaView>
  )
}

export const DETAILS_SCREEN = {
  id: "DETAILS_SCREEN",
  name: "com.biinge.Details",
}

export default compose<ComponentType>(useMovieDetails)(DetailsScreen)
