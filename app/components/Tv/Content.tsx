import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme, useNavigation } from "@react-navigation/native"

import { useTvDetails } from "hocs"
import { layoutStyles, tvStyles } from "styles"
import Close from "components/ui/Close"
import Actions from "components/Tv/Actions"
import Poster from "components/ui/Poster"
import Play from "components/ui/Play"
import ReleaseDate from "components/ui/TvReleaseDate"
import Status from "components/ui/Status"
import Rating from "components/ui/Rating"
import Title from "components/ui/Title"
import Overview from "components/ui/Overview"
import People from "components/ui/People"
import Seasons from "components/Tv/Seasons"
import Recommendations from "components/Tv/Recommendations"

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
    endDate,
    status,
    inProduction,
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
          tvStyles.root,
          tvStyles.content,
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

        <View style={tvStyles.row}>
          <ReleaseDate
            inProduction={inProduction}
            releaseDate={releaseDate}
            endDate={endDate}
          />
          <Status>{status}</Status>
        </View>

        <Actions item={item} />

        <Overview>{overview}</Overview>
      </Animated.View>

      <Seasons show={item} />
      <People items={credits} />
      <Recommendations items={recommendations} />
    </>
  )
}

export default compose<ComponentType>(useTvDetails)(ContentComponent)
