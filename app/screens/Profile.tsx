import React, { useContext } from "react"
import { View } from "react-native"
import { useUser } from "@realm/react"
import { useTranslation } from "react-i18next"

import i18n from "config/i18n"
import { MovieContext } from "contexts/MovieContext"
import { Movie } from "models"
import Avatar from "components/ui/Avatar"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import { profileStyles } from "styles"

const ProfileScreen = () => {
  const { t } = useTranslation()

  const { wantList, watchedList } = useContext(MovieContext)

  const user = useUser()
  const want = wantList()
  const watched = watchedList()

  // @ts-ignore
  const minutes = watched.reduce(
    (index: number, item: Movie) => index + (item.runtime || 0),
    0,
  )
  const hours = Math.floor(minutes / 60)

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
            <View style={profileStyles.counters}>
              <Typography variant="callout">{hours}</Typography>
              <Typography variant="footnote">
                {t("profile.stats.hours.title")}
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
