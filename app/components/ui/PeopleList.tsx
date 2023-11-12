import React from "react"
import { FlatList, Pressable, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { horizontalListStyles, peopleListStyles, listEmptyStyles } from "styles"
import { PERSON_SCREEN } from "screens/Person"
import Image from "components/ui/BWImage"
import Typography from "components/ui/Typography"

type Props = {
  items: any[]
}

const PeopleListComponent = ({ items }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const renderEmpty = () => {
    return (
      <View style={listEmptyStyles.root}>
        <View style={listEmptyStyles.content}>
          <Typography variant="title1" style={listEmptyStyles.emoji}>
            {t("search.empty.emoji")}
          </Typography>
          <Typography variant="callout">
            {t("search.empty.subtitle")}
          </Typography>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    const { profile_path, name, description } = item

    const handleClick = () => {
      // @ts-ignore
      navigation.push(PERSON_SCREEN.name, { id: item.id })
    }

    return (
      <Pressable style={peopleListStyles.root} onPress={handleClick}>
        <Image style={peopleListStyles.image} size="w185" path={profile_path} />
        <Typography
          variant="caption1"
          numberOfLines={2}
          style={peopleListStyles.name}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            variant="caption2"
            numberOfLines={2}
            style={peopleListStyles.description}
          >
            {description}
          </Typography>
        )}
      </Pressable>
    )
  }

  return (
    <FlatList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontalListStyles.content}
      data={items}
      keyExtractor={(item, index: number) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
    />
  )
}

export default PeopleListComponent
