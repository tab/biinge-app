import React from "react"
import { Pressable } from "react-native"
import { Navigation } from "react-native-navigation"

import { MEDIA_MODAL } from "screens/Modal/Media"
import Image from "components/ui/Image"
import { cardStyles } from "styles"
import { SearchResult } from "types"

type Props = {
  item: SearchResult
  index: number
}

const ListItemComponent = ({ item, index }: Props) => {
  const { image } = item

  const handleClick = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: MEDIA_MODAL.name,
              passProps: { id: item.id },
              options: {
                topBar: {
                  visible: false,
                },
                bottomTabs: {
                  visible: false,
                },
                modal: {
                  swipeToDismiss: true,
                },
                layout: {
                  backgroundColor: "transparent",
                  componentBackgroundColor: "transparent",
                },
              },
            },
          },
        ],
      },
    })
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
      <Image style={cardStyles.image} image={image} />
    </Pressable>
  )
}

export default ListItemComponent
