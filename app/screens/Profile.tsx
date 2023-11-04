import React from "react"
import { SafeAreaView, View, Text } from "react-native"
import { useObject, useUser } from "@realm/react"
import { useTranslation } from "react-i18next"

import i18n from "config/i18n"
import { UserMovie } from "models"
import Avatar from "components/ui/Avatar"
import Button from "components/ui/Button"
import { profileStyles } from "styles"

const ProfileScreen = () => {
  const { t } = useTranslation()

  const user = useUser()
  const userMovie = useObject(UserMovie, user.id)
  const want = userMovie?.want || []
  const watched = userMovie?.watched || []

  const handleClick = () => {
    user.logOut()
  }

  return (
    <SafeAreaView style={profileStyles.root}>
      <View style={profileStyles.content}>
        <View style={profileStyles.header}>
          <View style={profileStyles.section}>
            <Text style={profileStyles.email}>{user?.profile?.email}</Text>
            <Avatar
              style={profileStyles.avatar}
              size={210}
              email={user?.profile?.email || user.id}
            />
          </View>

          <View style={profileStyles.section}>
            <View style={profileStyles.counters}>
              <Text style={profileStyles.bold}>{want.length}</Text>
              <Text style={profileStyles.regular}>
                {t("profile.stats.want.title")}
              </Text>
            </View>
            <View style={profileStyles.counters}>
              <Text style={profileStyles.bold}>{watched.length}</Text>
              <Text style={profileStyles.regular}>
                {t("profile.stats.watched.title")}
              </Text>
            </View>
          </View>
        </View>
        <View style={profileStyles.actions}>
          <Button style={profileStyles.logOut} onPress={handleClick}>
            {t("profile.actions.logOut.title")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export const PROFILE_SCREEN = {
  name: "com.biinge.Profile",
  title: i18n.t("profile.title"),
}

export default ProfileScreen
