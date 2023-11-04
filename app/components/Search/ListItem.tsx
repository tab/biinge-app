import React, { useContext } from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { MovieContext } from "contexts/MovieContext"
import { DETAILS_SCREEN } from "screens/Details"
import Image from "components/ui/Image"
import Badge from "components/ui/Badge"
import { cardStyles } from "styles"
import { SearchResult } from "types"

type Props = {
  item: SearchResult
  index: number
}

const ListItemComponent = ({ item, index }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const { inWantList, inWatchedList } = useContext(MovieContext)

  const want = inWantList(item.id)
  const watched = inWatchedList(item.id)

  const { title, poster_path } = item

  const handleClick = () => {
    // @ts-ignore
    navigation.navigate(DETAILS_SCREEN.name, { id: item.id })
  }

  return (
    <Pressable
      style={
        index % 2 === 0
          ? [cardStyles.container, cardStyles.odd]
          : [cardStyles.container, cardStyles.even]
      }
      onPress={handleClick}
    >
      <Image
        style={cardStyles.image}
        size="w342"
        title={title}
        path={poster_path}
      />
      {(want || watched) && (
        <Badge>{want ? t("badge.want.title") : t("badge.watched.title")}</Badge>
      )}
    </Pressable>
  )
}

export default ListItemComponent
