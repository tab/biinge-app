import React from "react"
import { FlatList, View, Text } from "react-native"

import i18n from "config/i18n"
import { listStyles, listEmptyStyles } from "styles"
import Item from "components/Search/ListItem"
import { SearchResultListType, SearchResult } from "types"

type Props = {
  query: string
  items: SearchResultListType
}

const ListComponent = ({ query, items }: Props) => {
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
            {query ? i18n.t("search.empty.emoji") : i18n.t("search.help.emoji")}
          </Text>
          <Text style={listEmptyStyles.title}>
            {query ? i18n.t("search.empty.title") : i18n.t("search.help.title")}
          </Text>
          <Text style={listEmptyStyles.subTitle}>
            {query
              ? i18n.t("search.empty.subtitle")
              : i18n.t("search.help.subtitle")}
          </Text>
        </View>
      </View>
    )
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: SearchResult
    index: number
  }) => {
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
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  )
}

export default ListComponent
