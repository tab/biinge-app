import React from "react"
import { FlatList, View, Text } from "react-native"

import i18n from "config/i18n"
import { listStyles } from "styles"
import Item from "components/Search/Item"
import { SearchResult } from "types"

type Props = {
  items: SearchResult[]
}

const ListComponent = ({ items }: Props) => {
  const renderHeader = () => {
    return <></>
  }

  const renderFooter = () => {
    return <></>
  }

  const renderEmpty = () => {
    return (
      <View style={listStyles.empty}>
        <Text>{i18n.t("empty.title")}</Text>
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
      contentContainerStyle={listStyles.content}
      numColumns={2}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  )
}

export default ListComponent
