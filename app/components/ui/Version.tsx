import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import Typography from "components/ui/Typography"
import { menuVersionStyles } from "styles"

const AppVersionComponent = () => {
  const { t } = useTranslation()

  return (
    <View style={menuVersionStyles.root}>
      <Typography variant="caption1" style={menuVersionStyles.text}>
        {t("app.version")}
      </Typography>
      <Typography variant="caption1" style={menuVersionStyles.text}>
        {t("app.name")}
      </Typography>
    </View>
  )
}

export default AppVersionComponent
