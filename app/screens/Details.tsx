import React from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { DETAILS_MOVIE_TYPE } from "config"
import MovieContent from "components/Movie/Content"
import MoviePeople from "components/Movie/People"
import MovieRecommendations from "components/Movie/Recommendations"
import TvContent from "components/Tv/Content"
import TvPeople from "components/Tv/People"
import TvSeasons from "components/Tv/Seasons"
import { layoutStyles } from "styles"

type Props = {
  route: any
}

const DetailsScreen = ({ route }: Props) => {
  const { params } = route
  const { id, type } = params

  const MOVIE_ITEMS = [
    {
      key: "MovieContent",
      component: (
        // @ts-ignore
        <MovieContent id={id} />
      ),
    },
    {
      key: "MoviePeople",
      component: (
        // @ts-ignore
        <MoviePeople id={id} />
      ),
    },
    {
      key: "MovieRecommendations",
      component: (
        // @ts-ignore
        <MovieRecommendations id={id} />
      ),
    },
  ]

  const TV_ITEMS = [
    {
      key: "TvContent",
      component: (
        // @ts-ignore
        <TvContent id={id} />
      ),
    },
    {
      key: "TvSeasons",
      component: (
        // @ts-ignore
        <TvSeasons id={id} />
      ),
    },
    {
      key: "TvPeople",
      component: (
        // @ts-ignore
        <TvPeople id={id} />
      ),
    },
  ]

  const SECTIONS = type === DETAILS_MOVIE_TYPE ? MOVIE_ITEMS : TV_ITEMS

  const renderItem = ({ item }: { item: any }) => {
    return item.component
  }

  return (
    <View style={[layoutStyles.root, layoutStyles.bgTransparent]}>
      <FlashList
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        data={SECTIONS}
        renderItem={renderItem}
        estimatedItemSize={500}
      />
    </View>
  )
}

export const DETAILS_SCREEN = {
  id: "DETAILS_SCREEN",
  name: "com.biinge.Details",
}

export default DetailsScreen
