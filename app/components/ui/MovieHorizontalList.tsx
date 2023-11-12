import React, { useContext } from "react"
import { FlatList, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { MovieContext } from "contexts/MovieContext"
import { DETAILS_SCREEN } from "screens/Details"
import Image from "components/ui/Image"
import Check from "components/ui/Check"
import Typography from "components/ui/Typography"
import { horizontalListStyles, listEmptyStyles } from "styles"

type Props = {
  items: any[]
  showStatus?: boolean
}

const MovieHorizontalListComponent = ({ items, showStatus }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const { inWantList, inWatchedList } = useContext(MovieContext)

  const renderEmpty = () => {
    return (
      <View style={listEmptyStyles.root}>
        <View style={listEmptyStyles.content}>
          <Typography variant="title1" style={listEmptyStyles.emoji}>
            {t("search.empty.emoji")}
          </Typography>
          <Typography variant="callout">
            {t("search.empty.subtitle")}
          </Typography>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    const { title, poster_path } = item

    const inList = inWantList(item.tmdb_id) || inWatchedList(item.tmdb_id)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, { id: item.tmdb_id })
    }

    return (
      <Pressable style={horizontalListStyles.item} onPress={handleClick}>
        <Image
          style={[horizontalListStyles.image, horizontalListStyles.imageMd]}
          size="w342"
          title={title}
          path={poster_path}
        />
        {showStatus && inList && (
          <Check
            style={[horizontalListStyles.icon, horizontalListStyles.iconMd]}
          />
        )}
      </Pressable>
    )
  }

  return (
    <FlatList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontalListStyles.content}
      data={items}
      keyExtractor={(item, index: number) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
    />
  )
}

MovieHorizontalListComponent.defaultProps = {
  showStatus: false,
}

export default MovieHorizontalListComponent
