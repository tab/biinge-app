import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme } from "@react-navigation/native"

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
  const { dark } = useTheme()

  const {
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    end_date,
    status,
    in_production,
    credits,
    recommendations,
    videos,
  } = item

  const isVotes = vote_average > 0

  return (
    <>
      <Close />
      <Poster poster_path={poster_path} />
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
            <>
              {isVotes && <Rating size={20}>{vote_average.toFixed(1)}</Rating>}
            </>
          }
        >
          {title}
        </Title>

        <View style={tvStyles.row}>
          <ReleaseDate
            in_production={in_production}
            release_date={release_date}
            end_date={end_date}
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
