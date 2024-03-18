import React, { useContext, useRef } from "react"
import { View, Text, Pressable } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { useTheme, useNavigation } from "@react-navigation/native"

import { TvContext } from "contexts/TvContext"
import { formatDate } from "helpers/formatDate"
import { formatRuntime } from "helpers/formatRuntime"
import { DETAILS_SCREEN } from "screens/Details"
import Icon from "components/ui/Icon"
import Rating from "components/ui/Rating"
import Typography from "components/ui/Typography"
import { DETAILS_EPISODE_TYPE } from "config"
import { episodesListStyles, titleStyles } from "styles"
import { TvShowDetails, TvSeasonDetails, TvEpisodeDetails } from "types"
import colors from "styles/colors"

type Props = {
  show: TvShowDetails
  season: TvSeasonDetails
  item: TvEpisodeDetails
  index: number
}

const EpisodeComponent = ({ show, season, item, index }: Props) => {
  const navigation = useNavigation()
  const swipeable = useRef(null)
  const { dark } = useTheme()

  const { inWatchedEpisodeList, addToWatchedList, removeFromList } =
    useContext(TvContext)

  const { id, tmdbId } = item

  const watched = inWatchedEpisodeList(id)

  const { title, airDate, runtime, rating } = item
  const votes = rating > 0

  const handleAdd = () => {
    addToWatchedList({
      show,
      season,
      episode: item,
      type: "episode",
    }).finally(() => {
      handleToggle()
    })
  }

  const handleRemove = () => {
    removeFromList({
      show,
      season,
      episode: item,
      type: "episode",
    }).finally(() => {
      handleToggle()
    })
  }

  const handleSwipe = () => {
    watched ? handleRemove() : handleAdd()
  }

  const handleToggle = () => {
    if (swipeable) {
      // @ts-ignore
      swipeable.current.close()
    }
  }

  const handleClick = () => {
    // @ts-ignore
    navigation.push(DETAILS_SCREEN.name, {
      id: tmdbId,
      episodeNumber: index + 1,
      show,
      season,
      type: DETAILS_EPISODE_TYPE,
    })
  }

  const renderLeftActions = () => (
    <RectButton onPress={handleToggle}>
      <Text style={episodesListStyles.toggle}>&nbsp;</Text>
    </RectButton>
  )

  return (
    <View
      style={
        index === 0
          ? {}
          : [
              dark
                ? episodesListStyles.dividerDark
                : episodesListStyles.dividerLight,
            ]
      }
    >
      <Swipeable
        ref={swipeable}
        overshootLeft
        onSwipeableOpen={handleSwipe}
        renderLeftActions={renderLeftActions}
      >
        <Animated.View entering={FadeIn} style={episodesListStyles.item}>
          <View style={episodesListStyles.row}>
            <View style={episodesListStyles.aside}>
              <Typography variant="caption1" style={episodesListStyles.number}>
                {index + 1}
              </Typography>
              <Animated.View entering={FadeIn} style={episodesListStyles.icon}>
                <Icon
                  name={watched ? "checkmark" : "ellipse"}
                  color={watched ? colors.graniteGray : colors.orangeYellow}
                  size={watched ? 15 : 8}
                />
              </Animated.View>
              <Pressable onPress={handleClick}>
                <Typography
                  variant="subhead"
                  numberOfLines={2}
                  style={[
                    episodesListStyles.title,
                    dark ? titleStyles.dark : titleStyles.light,
                  ]}
                >
                  {title}
                </Typography>
              </Pressable>
            </View>
            {votes && (
              <Rating style={episodesListStyles.rating} size={16}>
                {rating.toFixed(1)}
              </Rating>
            )}
          </View>
          <View style={episodesListStyles.row}>
            <Typography variant="caption2" style={episodesListStyles.date}>
              {formatDate(airDate)}
              {runtime && (
                <>
                  &nbsp;&middot;&nbsp;
                  {formatRuntime(runtime)}
                </>
              )}
            </Typography>
          </View>
        </Animated.View>
      </Swipeable>
    </View>
  )
}

export default EpisodeComponent
