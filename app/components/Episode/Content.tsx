import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme, useNavigation } from "@react-navigation/native"

import { useEpisodeDetails } from "hocs"
import { layoutStyles, tvStyles } from "styles"
import Close from "components/ui/Close"
import Poster from "components/ui/Poster"
import Play from "components/ui/Play"
import Rating from "components/ui/Rating"
import Title from "components/ui/Title"
import Overview from "components/ui/Overview"
import People from "components/ui/People"
import Actions from "components/Episode/Actions"
import { TvShowDetails, TvSeasonDetails, TvEpisodeDetails } from "types"

type Props = {
  show: TvShowDetails
  season: TvSeasonDetails
  item: TvEpisodeDetails
}

const ContentComponent = ({ show, season, item }: Props) => {
  const navigation = useNavigation()
  const { dark } = useTheme()

  const { title, overview, posterPath, rating, credits, videos } = item

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
        <Overview>{overview}</Overview>
        <Actions show={show} season={season} item={item} />
      </Animated.View>
      <People items={credits} />
    </>
  )
}

export default compose<ComponentType>(useEpisodeDetails)(ContentComponent)
