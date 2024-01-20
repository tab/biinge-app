import React, { useContext } from "react"
import { View, Pressable } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import type Realm from "realm"

import { TvContext } from "contexts/TvContext"
import { DETAILS_SCREEN } from "screens/Details"
import { DETAILS_TV_TYPE } from "config"
import Progress from "components/Tv/Progress"
import Image from "components/ui/Image"
import { TvShow } from "models"
import { listStyles } from "styles"

type Props = {
  items: Realm.Results<TvShow> | any[]
  numColumns: number
  showStatus?: boolean
  showPin?: boolean
}

const TvListComponent = ({ items, numColumns, showStatus }: Props) => {
  const navigation = useNavigation()

  const { inWatchingList, inWatchedList } = useContext(TvContext)

  const renderItem = ({ item }: { item: any }) => {
    const { title, poster_path } = item

    const isWatching = inWatchingList(item.tmdb_id)
    const isWatched = inWatchedList(item.tmdb_id)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, {
        id: item.tmdb_id,
        type: DETAILS_TV_TYPE,
      })
    }

    return (
      <Pressable
        style={[
          listStyles.card,
          numColumns === 2 ? listStyles.cardMd : listStyles.cardSm,
        ]}
        onPress={handleClick}
      >
        <Image
          style={[
            listStyles.image,
            numColumns === 2 ? listStyles.imageMd : listStyles.imageSm,
          ]}
          size={numColumns === 2 ? "w342" : "w185"}
          title={title}
          path={poster_path}
        />
        {(isWatching || isWatched) && showStatus && (
          <View
            style={[
              listStyles.icon,
              numColumns === 2 ? listStyles.iconMd : listStyles.iconSm,
            ]}
          >
            <Progress numColumns={numColumns} item={item} />
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <View style={listStyles.root}>
      <FlashList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={listStyles.content}
        keyExtractor={(_, index: number) => index.toString()}
        numColumns={numColumns}
        // @ts-ignore
        data={items}
        renderItem={renderItem}
        windowSize={10}
        estimatedItemSize={numColumns === 2 ? 282 : 175}
      />
    </View>
  )
}

TvListComponent.defaultProps = {
  showStatus: false,
  showPin: false,
}

export default TvListComponent
