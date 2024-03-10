import React, { useContext } from "react"
import { View, Pressable } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import type Realm from "realm"

import { MovieContext } from "contexts/MovieContext"
import { DETAILS_SCREEN } from "screens/Details"
import { DETAILS_MOVIE_TYPE } from "config"
import Image from "components/ui/Image"
import Icon from "components/ui/Icon"
import { Movie } from "models"
import { listStyles } from "styles"
import colors from "styles/colors"

type Props = {
  items: Realm.Results<Movie> | never[]
  numColumns: number
  showStatus?: boolean
  showPin?: boolean
}

const MovieListComponent = ({
  items,
  numColumns,
  showStatus,
  showPin,
}: Props) => {
  const navigation = useNavigation()

  const { inWantList, inWatchedList, inPinList } = useContext(MovieContext)

  const renderItem = ({ item }: { item: Movie }) => {
    if (item === undefined) {
      return null
    }

    const { title, tmdbId, posterPath } = item

    const inList = inWantList(tmdbId) || inWatchedList(tmdbId)
    const isPinned = inPinList(tmdbId)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, {
        id: tmdbId,
        type: DETAILS_MOVIE_TYPE,
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
                <Icon
                  name="checkmark-outline"
                  color={colors.white}
                  size={numColumns === 2 ? 20 : 15}
                />
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

MovieListComponent.defaultProps = {
  showStatus: false,
  showPin: false,
}

export default MovieListComponent
