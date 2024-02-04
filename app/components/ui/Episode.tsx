import React, { useContext, useRef } from "react"
import { View, Text } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { useTheme } from "@react-navigation/native"

import { TvContext } from "contexts/TvContext"
import { formatDate } from "helpers/formatDate"
import { formatRuntime } from "helpers/formatRuntime"
import Icon from "components/ui/Icon"
import Rating from "components/ui/Rating"
import Typography from "components/ui/Typography"
import { episodesListStyles, titleStyles } from "styles"
import colors from "styles/colors"

type Props = {
  show: any
  season: any
  item: any
  index: number
}

const EpisodeComponent = ({ show, season, item, index }: Props) => {
  const swipeable = useRef(null)
  const { dark } = useTheme()

  const { inWatchedEpisodeList, addToWatchedList, removeFromList } =
    useContext(TvContext)

  const watched = inWatchedEpisodeList(item.id)

  const { title, air_date, runtime, vote_average } = item
  const votes = vote_average > 0

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
            </View>
            {votes && (
              <Rating style={episodesListStyles.rating} size={16}>
                {vote_average.toFixed(1)}
              </Rating>
            )}
          </View>
          <View style={episodesListStyles.row}>
            <Typography variant="caption2" style={episodesListStyles.date}>
              {formatDate(air_date)}
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
