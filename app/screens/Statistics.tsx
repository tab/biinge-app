import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import MovieStats from "components/Profile/MovieStats"
import TvStats from "components/Profile/TvShowStats"
import Typography from "components/ui/Typography"
import { layoutStyles, textStyles, statisticsStyles } from "styles"

const StatisticsScreen = () => {
  const { t } = useTranslation()
  const { dark } = useTheme()

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

        <MovieStats />
        <TvStats />
      </View>
    </View>
  )
}

export const STATISTICS_SCREEN = {
  id: "STATISTICS_SCREEN",
  name: "com.biinge.Statistics",
}

export default StatisticsScreen
