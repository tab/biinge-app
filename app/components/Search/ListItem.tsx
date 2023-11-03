import React from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { DETAILS_SCREEN } from "screens/Details"
import Image from "components/ui/Image"
import { cardStyles } from "styles"
import { SearchResult } from "types"

type Props = {
  item: SearchResult
  index: number
}

const ListItemComponent = ({ item, index }: Props) => {
  const navigation = useNavigation()

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
    </Pressable>
  )
}

export default ListItemComponent
