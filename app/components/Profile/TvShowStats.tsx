import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { TvShow } from "models"
import { getHours, getDays, getWeeks } from "helpers/stats"
import Typography from "components/ui/Typography"
import { statsStyles, textStyles, layoutStyles } from "styles"
import { useQuery } from "@realm/react"

type Props = {
  minutes: number
}

const MovieStatsComponent = ({ minutes }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const tvShows = useQuery<TvShow>(TvShow)
  const wantList = tvShows.filtered("want == $0", true)
  const watchingList = tvShows.filtered("watching == $0", true)
  const watchedList = tvShows.filtered("watched == $0", true)

  return (
    <View
      style={[
        statsStyles.root,
        dark ? layoutStyles.bgDarkSecondCard : layoutStyles.bgLightSecondCard,
      ]}
    >
      <View style={statsStyles.content}>
        <Typography
          variant="callout"
          style={dark ? textStyles.textDark : textStyles.textLight}
        >
          {t("profile.tv.title")}
        </Typography>

        <View style={statsStyles.row}>
          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {wantList?.length || 0}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.want.title")}
            </Typography>
          </View>

          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {watchingList?.length || 0}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.watching.title")}
            </Typography>
          </View>

          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {watchedList?.length || 0}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.watched.title")}
            </Typography>
          </View>
        </View>

        <View style={statsStyles.row}>
          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {getWeeks(minutes)}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.weeks.title")}
            </Typography>
          </View>

          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {getDays(minutes)}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.days.title")}
            </Typography>
          </View>

          <View style={statsStyles.cell}>
            <Typography
              variant="headline"
              style={dark ? textStyles.textDark : textStyles.textLight}
            >
              {getHours(minutes)}
            </Typography>
            <Typography
              variant="footnote"
              style={
                dark
                  ? textStyles.textSecondaryDark
                  : textStyles.textSecondaryLight
              }
            >
              {t("profile.stats.hours.title")}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MovieStatsComponent
