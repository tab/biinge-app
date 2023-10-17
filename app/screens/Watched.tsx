import React from "react"
import { SafeAreaView } from "react-native"
import { useQuery } from "@realm/react"

import i18n from "config/i18n"
import List from "components/Media/List"
import { Media } from "models/Media"
import { layoutStyles } from "styles"
import { MEDIA_MOVIE_TYPE } from "config"

const WatchedScreen = () => {
  const collection = useQuery(Media)
    .sorted("updatedAt", true)
    .filter((item) => item.watched && item.contentType === MEDIA_MOVIE_TYPE)

  return (
    <SafeAreaView style={layoutStyles.root}>
      <List items={collection} />
    </SafeAreaView>
  )
}

export const WATCHED_SCREEN = {
  id: "WATCHED_SCREEN",
  index: 1,
  name: "com.biinge.Watched",
  title: i18n.t("screens.watched.title"),
}

export default WatchedScreen
