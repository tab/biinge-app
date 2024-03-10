import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "@realm/react"
import { useTheme } from "@react-navigation/native"

import MovieStats from "components/Profile/MovieStats"
import TvStats from "components/Profile/TvShowStats"
import TotalStats from "components/Profile/TotalStats"
import { Movie, TvEpisode } from "models"
import Typography from "components/ui/Typography"
import { layoutStyles, textStyles, statisticsStyles } from "styles"

const StatisticsScreen = () => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const movies = useQuery<Movie>(Movie)
  const moviesWatchedList = movies.filtered("watched == $0", true)

  const movieMinutes =
    moviesWatchedList?.reduce(
      (index: number, item: Movie) => index + (item.runtime || 0),
      0,
    ) || 0

  const episodesWatchedList = useQuery<TvEpisode>(TvEpisode)

  const tvShowMinutes =
    episodesWatchedList?.reduce(
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

        <MovieStats minutes={movieMinutes} />
        <TvStats minutes={tvShowMinutes} />
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
