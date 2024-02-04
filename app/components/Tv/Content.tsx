import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme } from "@react-navigation/native"

import { useTvDetails } from "hocs"
import { layoutStyles, tvStyles } from "styles"
import { formatDate } from "helpers/formatDate"
import Actions from "components/Tv/Actions"
import Poster from "components/ui/Poster"
import Play from "components/ui/Play"
import Status from "components/ui/Status"
import Rating from "components/ui/Rating"
import Title from "components/ui/Title"
import Overview from "components/ui/Overview"
import People from "components/ui/People"
import Seasons from "components/Tv/Seasons"
import Recommendations from "components/Tv/Recommendations"
import Typography from "components/ui/Typography"

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
          <Typography variant="headline" style={tvStyles.date}>
            {in_production ? (
              <>{formatDate(release_date, "d MMMM yyyy")}</>
            ) : (
              <>
                {formatDate(release_date, "dd.MM.yyyy")}
                &nbsp;&ndash;&nbsp;
                {formatDate(end_date, "dd.MM.yyyy")}
              </>
            )}
          </Typography>
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
