import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useUser, useObject } from "@realm/react"
import { useTheme } from "@react-navigation/native"

import MovieStats from "components/Profile/MovieStats"
import TvStats from "components/Profile/TvShowStats"
import TotalStats from "components/Profile/TotalStats"
import { UserMovie, Movie, UserTvShow, UserTvEpisode, TvEpisode } from "models"
import Typography from "components/ui/Typography"
import { layoutStyles, textStyles, statisticsStyles } from "styles"

const StatisticsScreen = () => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const user = useUser()

  const userMovie = useObject<UserMovie>(UserMovie, user.id)
  const movieWatched = userMovie?.watched

  // @ts-ignore
  const movieMinutes =
    movieWatched?.reduce(
      (index: number, item: Movie) => index + (item.runtime || 0),
      0,
    ) || 0

  const userTvShow = useObject<UserTvShow>(UserTvShow, user.id)
  const userTvEpisode = useObject<UserTvEpisode>(UserTvEpisode, user.id)
  const episodesWatched = userTvEpisode?.watched

  // @ts-ignore
  const tvShowMinutes =
    episodesWatched?.reduce(
      (index: number, item: TvEpisode) => index + (item.runtime || 0),
      0,
    ) || 0

  return (
    <View
      style={[
        statisticsStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <View style={statisticsStyles.content}>
        <Typography
          variant="title1"
          style={dark ? textStyles.textDark : textStyles.textLight}
        >
          {t("statistics.title")}
        </Typography>

        <MovieStats object={userMovie} minutes={movieMinutes} />
        <TvStats object={userTvShow} minutes={tvShowMinutes} />
        <TotalStats minutes={movieMinutes + tvShowMinutes} />
      </View>
    </View>
  )
}

export const STATISTICS_SCREEN = {
  id: "STATISTICS_SCREEN",
  name: "com.biinge.Statistics",
}

export default StatisticsScreen
