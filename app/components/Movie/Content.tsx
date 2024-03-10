import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme, useNavigation } from "@react-navigation/native"

import { useMovieDetails } from "hocs"
import { layoutStyles, movieStyles } from "styles"
import Close from "components/ui/Close"
import Actions from "components/Movie/Actions"
import Poster from "components/ui/Poster"
import Play from "components/ui/Play"
import ReleaseDate from "components/ui/MovieReleaseDate"
import Runtime from "components/ui/MovieRuntime"
import Status from "components/ui/Status"
import Rating from "components/ui/Rating"
import Title from "components/ui/Title"
import Overview from "components/ui/Overview"
import People from "components/ui/People"
import Recommendations from "components/Movie/Recommendations"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const navigation = useNavigation()
  const { dark } = useTheme()

  const {
    title,
    overview,
    posterPath,
    rating,
    releaseDate,
    runtime,
    status,
    credits,
    recommendations,
    videos,
  } = item

  const isVotes = rating > 0

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <>
      <Close onPress={handleClose} />
      <Poster posterPath={posterPath} />
      <Play items={videos} />

      <Animated.View
        style={[
          layoutStyles.roundCorners,
          layoutStyles.card,
          movieStyles.root,
          movieStyles.content,
          dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
        ]}
        entering={SlideInDown.delay(50)}
      >
        <Title
          aside={
            <>{isVotes && <Rating size={20}>{rating.toFixed(1)}</Rating>}</>
          }
        >
          {title}
        </Title>

        <View style={movieStyles.row}>
          <ReleaseDate>{releaseDate}</ReleaseDate>
          <Runtime>{runtime}</Runtime>
          <Status>{status}</Status>
        </View>

        <Actions item={item} />

        <Overview>{overview}</Overview>
      </Animated.View>

      <People items={credits} />
      <Recommendations items={recommendations} />
    </>
  )
}

export default compose<ComponentType>(useMovieDetails)(ContentComponent)
