import React from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { DETAILS_SCREEN } from "screens/Details"
import { Movie } from "models"
import Image from "components/ui/Image"
import { cardStyles } from "styles"

type Props = {
  item: Movie
  index: number
}

const ListItemComponent = ({ item, index }: Props) => {
  const navigation = useNavigation()

  const { title, poster_path } = item

  const handleClick = () => {
    // @ts-ignore
    navigation.navigate(DETAILS_SCREEN.name, { id: item.tmdb_id })
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
    </Pressable>
  )
}

export default ListItemComponent
