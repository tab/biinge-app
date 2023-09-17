import React from "react"
import { View, Text, StyleSheet } from "react-native"

import i18n from "config/i18n"

const SearchScreen = () => {
  return (
    <View style={styles.root}>
      <Text>{i18n.t("screens.search.title")}</Text>
    </View>
  )
}

export const SEARCH_SCREEN = {
  name: "com.biinge.Search",
  title: i18n.t("screens.search.title"),
}

export default SearchScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
})
