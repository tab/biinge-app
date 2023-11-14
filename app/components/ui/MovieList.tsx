import React, { useContext } from "react"
import { FlatList, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { MovieContext } from "contexts/MovieContext"
import { DETAILS_SCREEN } from "screens/Details"
import Image from "components/ui/Image"
import Icon from "components/ui/Icon"
import { listStyles } from "styles"
import colors from "styles/colors"

type Props = {
  items: any[]
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

  const { inWantList, inWatchedList, pinned } = useContext(MovieContext)

  const renderItem = ({ item }: { item: any }) => {
    const { title, poster_path } = item

    const inList = inWantList(item.tmdb_id) || inWatchedList(item.tmdb_id)
    const isPinned = pinned(item.tmdb_id)

    const handleClick = () => {
      // @ts-ignore
      navigation.push(DETAILS_SCREEN.name, { id: item.tmdb_id })
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
        {inList && (
          <>
            {showStatus && (
              <View
                style={[
                  listStyles.icon,
                  numColumns === 2 ? listStyles.iconMd : listStyles.iconSm,
                ]}
              >
                <Icon
                  name="checkmark-outline"
                  color={colors.white}
                  size={numColumns === 2 ? 20 : 15}
                />
              </View>
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
    <FlatList
      style={listStyles.root}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={listStyles.content}
      keyExtractor={(item, index: number) => index.toString()}
      numColumns={numColumns}
      data={items}
      renderItem={renderItem}
    />
  )
}

MovieListComponent.defaultProps = {
  showStatus: false,
  showPin: false,
}

export default MovieListComponent
