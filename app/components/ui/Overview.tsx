import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { overviewStyles } from "styles"
import Typography from "./Typography"

type Props = {
  children: React.ReactNode
}

const OverviewComponent = ({ children }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  return (
    <View style={overviewStyles.root}>
      <Typography
        variant="callout"
        style={dark ? overviewStyles.title : overviewStyles.title}
      >
        {t("content.overview")}
      </Typography>
      <Typography
        variant="body"
        style={dark ? overviewStyles.dark : overviewStyles.light}
      >
        {children}
      </Typography>
    </View>
  )
}

export default OverviewComponent
