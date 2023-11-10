import React from "react"
import { View } from "react-native"
import { useObject, useUser } from "@realm/react"
import { useTranslation } from "react-i18next"

import i18n from "config/i18n"
import { UserMovie } from "models"
import Avatar from "components/ui/Avatar"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
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
    <View style={profileStyles.root}>
      <View style={profileStyles.content}>
        <View style={profileStyles.header}>
          <View style={profileStyles.section}>
            <Typography variant="callout">{user?.profile?.email}</Typography>
            <Avatar
              style={profileStyles.avatar}
              size={210}
              email={user?.profile?.email || user.id}
            />
          </View>

          <View style={profileStyles.section}>
            <View style={profileStyles.counters}>
              <Typography variant="callout">{want.length}</Typography>
              <Typography variant="footnote">
                {t("profile.stats.want.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">{watched.length}</Typography>
              <Typography variant="footnote">
                {t("profile.stats.watched.title")}
              </Typography>
            </View>
          </View>
        </View>
        <View style={profileStyles.actions}>
          <Button style={profileStyles.logOut} onPress={handleClick}>
            {t("profile.actions.logOut.title")}
          </Button>
        </View>
      </View>
    </View>
  )
}

export const PROFILE_SCREEN = {
  name: "com.biinge.Profile",
  title: i18n.t("profile.title"),
}

export default ProfileScreen
