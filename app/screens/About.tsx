import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import Typography from "components/ui/Typography"
import { layoutStyles, textStyles, profileStyles } from "styles"

const AboutScreen = () => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  return (
    <View
      style={[
        profileStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <View style={profileStyles.content}>
        <Typography
          variant="title1"
          style={dark ? textStyles.textDark : textStyles.textLight}
        >
          {t("about.title")}
        </Typography>
      </View>
    </View>
  )
}

export const ABOUT_SCREEN = {
  id: "ABOUT_SCREEN",
  name: "com.biinge.About",
}

export default AboutScreen
