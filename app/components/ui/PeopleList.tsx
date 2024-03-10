import React from "react"
import { Pressable, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import {
  horizontalListStyles,
  peopleListStyles,
  listEmptyStyles,
  titleStyles,
} from "styles"
import { PERSON_SCREEN } from "screens/Person"
import Image from "components/ui/BWImage"
import Typography from "components/ui/Typography"
import { CastPerson, CrewPerson } from "types"

type Props = {
  items: CastPerson[] | CrewPerson[]
}

const PeopleListComponent = ({ items }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { dark } = useTheme()

  const renderEmpty = () => {
    return (
      <View style={listEmptyStyles.root}>
        <View style={listEmptyStyles.content}>
          <Typography variant="title1" style={listEmptyStyles.emoji}>
            {t("search.empty.emoji")}
          </Typography>
          <Typography
            variant="callout"
            style={dark ? titleStyles.dark : titleStyles.light}
          >
            {t("search.empty.subtitle")}
          </Typography>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    const { tmdbId, profilePath, name, description } = item

    const handleClick = () => {
      // @ts-ignore
      navigation.push(PERSON_SCREEN.name, { id: tmdbId })
    }

    return (
      <Pressable style={peopleListStyles.root} onPress={handleClick}>
        <Image style={peopleListStyles.image} size="w185" path={profilePath} />
        <View style={peopleListStyles.name}>
          {name.split(" ").map((n: string, index: number) => (
            <Typography
              key={index.toString()}
              variant="caption1"
              style={peopleListStyles.textDark}
            >
              {n}
            </Typography>
          ))}
        </View>
        {description && (
          <>
            {description.split(" ").map((n: string, index: number) => (
              <Typography
                key={index.toString()}
                variant="caption2"
                style={peopleListStyles.textLight}
              >
                {n}
              </Typography>
            ))}
          </>
        )}
      </Pressable>
    )
  }

  return (
    <FlashList
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={horizontalListStyles.content}
      data={items}
      keyExtractor={(_, index: number) => index.toString()}
      renderItem={renderItem}
      estimatedItemSize={100}
      ListEmptyComponent={renderEmpty}
    />
  )
}

export default PeopleListComponent
