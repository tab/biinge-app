import React from "react"
import { SafeAreaView } from "react-native"

import i18n from "config/i18n"
import { layoutStyles } from "styles"

const ProfileScreen = () => {
  return <SafeAreaView style={layoutStyles.root}></SafeAreaView>
}

export const PROFILE_SCREEN = {
  id: "PROFILE_SCREEN",
  index: 2,
  name: "com.biinge.Profile",
  title: i18n.t("screens.profile.title"),
}

export default ProfileScreen
