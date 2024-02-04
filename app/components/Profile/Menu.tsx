import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "@realm/react"

import { APPEARANCE_SCREEN } from "screens/Appearance"
import { STATISTICS_SCREEN } from "screens/Statistics"
import { PRIVACY_SCREEN } from "screens/Privacy"
import { TERMS_SCREEN } from "screens/Terms"
import Section from "components/Profile/MenuSection"
import Version from "components/ui/Version"
import { menuStyles } from "styles"

const MenuComponent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const user = useUser()

  const MENU = [
    {
      id: 1,
      title: t("profile.actions.theme.title"),
      icon: "contrast-outline",
      // @ts-ignore
      onPress: () => navigation.push(APPEARANCE_SCREEN.name),
    },
    {
      id: 2,
      title: t("profile.actions.statistics.title"),
      icon: "stats-chart-outline",
      // @ts-ignore
      onPress: () => navigation.push(STATISTICS_SCREEN.name),
    },
    {
      id: 3,
      title: t("profile.actions.privacy.title"),
      icon: "document-text-outline",
      // @ts-ignore
      onPress: () => navigation.push(PRIVACY_SCREEN.name),
    },
    {
      id: 4,
      title: t("profile.actions.terms.title"),
      icon: "document-text-outline",
      // @ts-ignore
      onPress: () => navigation.push(TERMS_SCREEN.name),
    },
  ]

  const LOGOUT = [
    {
      id: 5,
      title: t("profile.actions.logOut.title"),
      icon: "log-out-outline",
      onPress: () => user.logOut(),
    },
  ]

  return (
    <View style={menuStyles.root}>
      <Section items={MENU} />
      <Section items={LOGOUT} />
      <Version />
    </View>
  )
}

export default MenuComponent
