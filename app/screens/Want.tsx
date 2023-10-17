import React from "react"
import { SafeAreaView } from "react-native"
import { useQuery } from "@realm/react"

import i18n from "config/i18n"
import List from "components/Media/List"
import { Media } from "models/Media"
import { layoutStyles } from "styles"
import { MEDIA_MOVIE_TYPE } from "config"

const WantScreen = () => {
  const collection = useQuery(Media)
    .sorted("updatedAt", true)
    .filter((item) => item.want && item.contentType === MEDIA_MOVIE_TYPE)

  return (
    <SafeAreaView style={layoutStyles.root}>
      <List items={collection} />
    </SafeAreaView>
  )
}

export const WANT_SCREEN = {
  id: "WANT_SCREEN",
  index: 0,
  name: "com.biinge.Want",
  title: i18n.t("screens.want.title"),
}

export default WantScreen
