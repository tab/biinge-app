import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { Navigation } from "react-native-navigation"

import i18n from "config/i18n"

type Props = {
  componentId: string
}

const DiscoverScreen = ({ componentId }: Props) => {
  return (
    <View style={styles.root}>
      <Text>{i18n.t("screens.discover.title")}</Text>
      <Text>Hello React Native Navigation 👋</Text>
      <Button
        title="Push Search Screen"
        color="#710ce3"
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: "com.biinge.Search",
            },
          })
        }
      />
    </View>
  )
}

DiscoverScreen.options = {
  topBar: {
    title: {
      text: i18n.t("screens.discover.title"),
    },
  },
  bottomTab: {
    text: i18n.t("screens.discover.title"),
  },
}

export const DISCOVER_SCREEN = {
  name: "com.biinge.Discover",
  title: i18n.t("screens.discover.title"),
}

export default DiscoverScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
})
