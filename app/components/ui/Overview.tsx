import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { overviewStyles } from "styles"
import Typography from "./Typography"

type Props = {
  children: React.ReactNode
}

const OverviewComponent = ({ children }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={overviewStyles.root}>
      <Typography variant="callout" style={overviewStyles.title}>
        {t("movie.content.overview")}
      </Typography>
      <Typography variant="body">{children}</Typography>
    </View>
  )
}

export default OverviewComponent
