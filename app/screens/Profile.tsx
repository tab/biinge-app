import React from "react"
import { View, Text, StyleSheet } from "react-native"

import i18n from "config/i18n"

const ProfileScreen = () => {
  return (
    <View style={styles.root}>
      <Text>{i18n.t("screens.profile.title")}</Text>
    </View>
  )
}

export const PROFILE_SCREEN = {
  name: "com.biinge.Profile",
  title: i18n.t("screens.profile.title"),
}

export default ProfileScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
})
