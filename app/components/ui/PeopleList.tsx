import React from "react"
import { FlatList, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { horizontalListStyles, peopleListStyles } from "styles"
import { PERSON_SCREEN } from "screens/Person"
import Image from "components/ui/BWImage"
import Typography from "components/ui/Typography"

type Props = {
  items: any[]
}

const PeopleListComponent = ({ items }: Props) => {
  const navigation = useNavigation()

  const renderItem = ({ item }: { item: any }) => {
    const { profile_path, name, description } = item

    const handleClick = () => {
      // @ts-ignore
      navigation.push(PERSON_SCREEN.name, { id: item.id })
    }

    return (
      <Pressable style={peopleListStyles.root} onPress={handleClick}>
        <Image style={peopleListStyles.image} size="w185" path={profile_path} />
        <Typography variant="caption1" style={peopleListStyles.name}>
          {name}
        </Typography>
        <Typography variant="caption2" style={peopleListStyles.description}>
          {description}
        </Typography>
      </Pressable>
    )
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontalListStyles.content}
      data={items}
      keyExtractor={(item, index: number) => index.toString()}
      renderItem={renderItem}
    />
  )
}

export default PeopleListComponent
