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
      <Button
        title="Annie Hall"
        onPress={() =>
          Navigation.showModal({
            stack: {
              children: [
                {
                  component: {
                    name: "com.biinge.Movie",
                    passProps: { id: "tt0075686" },
                    options: {
                      topBar: {
                        visible: false,
                      },
                      bottomTabs: {
                        visible: false,
                      },
                      modal: {
                        swipeToDismiss: true,
                      },
                    },
                  },
                },
              ],
            },
          })
        }
      />
    </View>
  )
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
