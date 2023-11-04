import React from "react"
import { FlatList, View, Text } from "react-native"

import i18n from "config/i18n"
import { Movie } from "models"
import { listStyles, listEmptyStyles } from "styles"
import Item from "components/Movie/ListItem"

type Props = {
  items: Movie[]
}

const ListComponent = ({ items }: Props) => {
  const empty = items.length === 0

  const renderHeader = () => {
    return <></>
  }

  const renderFooter = () => {
    return <></>
  }

  const renderEmpty = () => {
    return (
      <View style={listEmptyStyles.root}>
        <View style={listEmptyStyles.content}>
          <Text style={listEmptyStyles.emoji}>
            {i18n.t("discover.help.emoji")}
          </Text>
          <Text style={listEmptyStyles.title}>
            {i18n.t("discover.help.title")}
          </Text>
          <Text style={listEmptyStyles.subTitle}>
            {i18n.t("discover.help.subtitle")}
          </Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item, index }: { item: Movie; index: number }) => {
    return <Item item={item} index={index} />
  }

  return (
    <FlatList
      style={listStyles.root}
      contentContainerStyle={
        empty ? listEmptyStyles.content : listStyles.content
      }
      numColumns={2}
      data={items}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  )
}

export default ListComponent
