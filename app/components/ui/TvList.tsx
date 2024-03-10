import React, { useContext } from "react"
import { View, Pressable } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import type Realm from "realm"

import { TvContext } from "contexts/TvContext"
import { DETAILS_SCREEN } from "screens/Details"
import { DETAILS_TV_TYPE } from "config"
import { TvShow } from "models"
import Progress from "components/Tv/Progress"
import Image from "components/ui/Image"
import Icon from "components/ui/Icon"
import { listStyles } from "styles"
import colors from "styles/colors"

type Props = {
  items: Realm.Results<TvShow> | any[]
  numColumns: number
  showStatus?: boolean
  showPin?: boolean
}

const TvListComponent = ({ items, numColumns, showStatus, showPin }: Props) => {
  const navigation = useNavigation()

  const { inWatchingList, inWatchedList, inPinList } = useContext(TvContext)

  const renderItem = ({ item }: { item: TvShow }) => {
    if (item === undefined) {
      return null
    }

    const { title, tmdbId, posterPath } = item

    const isWatching = inWatchingList(tmdbId)
    const isWatched = inWatchedList(tmdbId)
    const inList = isWatching || isWatched
    const isPinned = inPinList(tmdbId)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, {
        id: tmdbId,
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
          path={posterPath}
        />
        {inList && (
          <>
            {showStatus && (
              <Animated.View
                style={[
                  listStyles.icon,
                  numColumns === 2 ? listStyles.iconMd : listStyles.iconSm,
                ]}
                entering={FadeIn.delay(500)}
              >
                <Progress numColumns={numColumns} item={item} />
              </Animated.View>
            )}
            {showPin && isPinned && (
              <View style={listStyles.pin}>
                <Icon
                  style={listStyles.pinIcon}
                  name="pin-outline"
                  color={colors.white}
                  size={18}
                />
              </View>
            )}
          </>
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
