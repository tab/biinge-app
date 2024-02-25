import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { UserTvShow } from "models"
import Typography from "components/ui/Typography"
import { statsStyles, textStyles, layoutStyles } from "styles"

type Props = {
  object: UserTvShow | null
  minutes: number
}

const MovieStatsComponent = ({ object, minutes }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const want = object?.want
  const watching = object?.watching
  const watched = object?.watched

  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  return (
    <View
      style={[
        statsStyles.root,
        dark ? layoutStyles.bgDark : layoutStyles.bgLight,
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
              {want?.length || 0}
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
              {watching?.length || 0}
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
              {watched?.length || 0}
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
              {weeks || 0}
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
              {days || 0}
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
              {hours || 0}
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
