import React from "react"
import { View } from "react-native"
import { useUser, useObject } from "@realm/react"
import { useTranslation } from "react-i18next"

import { Movie, UserMovie, UserTvShow, TvEpisode, UserTvEpisode } from "models"
import Avatar from "components/ui/Avatar"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import { profileStyles } from "styles"

const ProfileScreen = () => {
  const { t } = useTranslation()
  const user = useUser()

  const userMovie = useObject<UserMovie>(UserMovie, user.id)
  const moviesWant = userMovie?.want
  const moviesWatched = userMovie?.watched

  const userTvShow = useObject<UserTvShow>(UserTvShow, user.id)
  const showWant = userTvShow?.want
  const showWatching = userTvShow?.watching
  const showWatched = userTvShow?.watched

  const userTvEpisode = useObject<UserTvEpisode>(UserTvEpisode, user.id)
  const episodesWatched = userTvEpisode?.watched

  // @ts-ignore
  const movieMinutes =
    moviesWatched?.reduce(
      (index: number, item: Movie) => index + (item.runtime || 0),
      0,
    ) || 0
  const movieHours = Math.floor(movieMinutes / 60)

  // @ts-ignore
  const tvMinutes =
    episodesWatched?.reduce(
      (index: number, item: TvEpisode) => index + (item.runtime || 0),
      0,
    ) || 0
  const tvHours = Math.floor(tvMinutes / 60)

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
            <Typography variant="callout">
              {t("profile.movies.title")}
            </Typography>
            <View style={profileStyles.counters}>
              <Typography variant="callout">
                {moviesWant?.length || 0}
              </Typography>
              <Typography variant="footnote">
                {t("profile.stats.want.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">
                {moviesWatched?.length || 0}
              </Typography>
              <Typography variant="footnote">
                {t("profile.stats.watched.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">{movieHours}</Typography>
              <Typography variant="footnote">
                {t("profile.stats.hours.title")}
              </Typography>
            </View>
          </View>

          <View style={profileStyles.section}>
            <Typography variant="callout">{t("profile.tv.title")}</Typography>
            <View style={profileStyles.counters}>
              <Typography variant="callout">{showWant?.length || 0}</Typography>
              <Typography variant="footnote">
                {t("profile.stats.want.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">
                {showWatching?.length || 0}
              </Typography>
              <Typography variant="footnote">
                {t("profile.stats.watching.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">
                {showWatched?.length || 0}
              </Typography>
              <Typography variant="footnote">
                {t("profile.stats.watched.title")}
              </Typography>
            </View>
            <View style={profileStyles.counters}>
              <Typography variant="callout">{tvHours}</Typography>
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
  id: "PROFILE_SCREEN",
  name: "com.biinge.Profile",
}

export default ProfileScreen
