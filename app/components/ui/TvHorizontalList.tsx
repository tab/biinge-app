import React, { useContext } from "react"
import { View, Pressable } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { TvContext } from "contexts/TvContext.tsx"
import { DETAILS_SCREEN } from "screens/Details"
import { DETAILS_TV_TYPE } from "config"
import Image from "components/ui/Image"
import Check from "components/ui/Check"
import Typography from "components/ui/Typography"
import { horizontalListStyles, listEmptyStyles, titleStyles } from "styles"

type Props = {
  items: any[]
  showStatus?: boolean
}

const TvHorizontalListComponent = ({ items, showStatus }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { dark } = useTheme()

  const { inWantList, inWatchingList, inWatchedList } = useContext(TvContext)

  const renderEmpty = () => {
    return (
      <View style={listEmptyStyles.root}>
        <View style={listEmptyStyles.content}>
          <Typography variant="title1" style={listEmptyStyles.emoji}>
            {t("search.empty.emoji")}
          </Typography>
          <Typography
            variant="callout"
            style={dark ? titleStyles.dark : titleStyles.light}
          >
            {t("search.empty.subtitle")}
          </Typography>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    const { title, poster_path } = item

    const inList =
      inWantList(item.tmdb_id) ||
      inWatchingList(item.tmdb_id) ||
      inWatchedList(item.tmdb_id)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, {
        id: item.tmdb_id,
        type: DETAILS_TV_TYPE,
      })
    }

    return (
      <Pressable style={horizontalListStyles.item} onPress={handleClick}>
        <Image
          style={[horizontalListStyles.image, horizontalListStyles.imageSm]}
          size="w342"
          title={title}
          path={poster_path}
        />
        {showStatus && inList && (
          <Check
            style={[horizontalListStyles.icon, horizontalListStyles.iconSm]}
          />
        )}
      </Pressable>
    )
  }

  return (
    <FlashList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontalListStyles.content}
      data={items}
      keyExtractor={(_, index: number) => index.toString()}
      renderItem={renderItem}
      estimatedItemSize={120}
      ListEmptyComponent={renderEmpty}
    />
  )
}

TvHorizontalListComponent.defaultProps = {
  showStatus: false,
}

export default TvHorizontalListComponent
