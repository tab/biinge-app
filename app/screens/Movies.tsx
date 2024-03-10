import React from "react"
import { SafeAreaView, useWindowDimensions } from "react-native"
import { TabView, SceneRendererProps } from "react-native-tab-view"
import { useTheme } from "@react-navigation/native"
import { useQuery } from "@realm/react"

import i18n from "config/i18n"
import List from "components/ui/MovieList"
import Tabs from "components/ui/Tabs"
import { Movie } from "models"
import { layoutStyles } from "styles"

const MoviesScreen = () => {
  const { dark } = useTheme()

  const movies = useQuery<Movie>(Movie)

  const wantList = movies
    .filtered("want == $0", true)
    .sorted("createdAt", true)
    .sorted("pin", true)
  const watchedList = movies
    .filtered("watched == $0", true)
    .sorted("createdAt", true)
    .sorted("pin", true)

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "want", title: i18n.t("nav.want.title") },
    { key: "watched", title: i18n.t("nav.watched.title") },
  ])

  const renderScene = ({
    route: { key },
  }: SceneRendererProps & { route: { key: string; title: string } }) => {
    switch (key) {
      case "want":
        return (
          <List showStatus={false} showPin numColumns={2} items={wantList} />
        )
      case "watched":
        return (
          <List showStatus={false} showPin numColumns={2} items={watchedList} />
        )
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

export const MOVIES_SCREEN = {
  id: "MOVIES_SCREEN",
  name: "com.biinge.Movies",
}

export default MoviesScreen
