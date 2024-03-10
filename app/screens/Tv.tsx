import React from "react"
import { SafeAreaView, useWindowDimensions } from "react-native"
import { TabView, SceneRendererProps } from "react-native-tab-view"
import { useTheme } from "@react-navigation/native"
import { useQuery } from "@realm/react"

import i18n from "config/i18n"
import List from "components/ui/TvList"
import Tabs from "components/ui/Tabs"
import { TvShow } from "models"
import { layoutStyles } from "styles"

const TvScreen = () => {
  const { dark } = useTheme()

  const tvShows = useQuery<TvShow>(TvShow)

  const wantList = tvShows
    .filtered("want == $0", true)
    .sorted("createdAt", true)
    .sorted("pin", true)
  const watchingList = tvShows
    .filtered("watching == $0", true)
    .sorted("createdAt", true)
    .sorted("pin", true)
  const watchedList = tvShows
    .filtered("watched == $0", true)
    .sorted("createdAt", true)
    .sorted("pin", true)

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "want", title: i18n.t("nav.want.title") },
    { key: "watching", title: i18n.t("nav.watching.title") },
    { key: "watched", title: i18n.t("nav.watched.title") },
  ])

  const renderScene = ({
    route: { key },
  }: SceneRendererProps & { route: { key: string; title: string } }) => {
    switch (key) {
      case "want":
        return <List showStatus showPin numColumns={2} items={wantList} />
      case "watching":
        return <List showStatus showPin numColumns={2} items={watchingList} />
      case "watched":
        return <List showPin numColumns={2} items={watchedList} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView
      style={[
        layoutStyles.root,
        dark ? layoutStyles.bgDark : layoutStyles.bgLight,
      ]}
    >
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => <Tabs {...props} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  )
}

export const TV_SCREEN = {
  id: "TV_SCREEN",
  name: "com.biinge.Tv",
}

export default TvScreen
