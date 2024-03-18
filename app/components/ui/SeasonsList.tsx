import React, { useState } from "react"
import { FlatList, Pressable, Text } from "react-native"
import { useTranslation } from "react-i18next"

import List from "components/ui/EpisodesList"
import { seasonsListStyles } from "styles"
import { TvShowDetails, TvSeasonDetails } from "types"

type Props = {
  show: TvShowDetails
  items: TvSeasonDetails[]
}

const SeasonsListComponent = ({ show, items }: Props) => {
  const { t } = useTranslation()

  const [currentSeason, setCurrentSeason] = useState(items[0])

  const renderItem = ({
    item,
    index,
  }: {
    item: TvSeasonDetails
    index: number
  }) => {
    const handleClick = () => {
      setCurrentSeason(item)
    }

    return (
      <Pressable
        style={
          currentSeason.id === item.id
            ? [seasonsListStyles.item, seasonsListStyles.itemActive]
            : [seasonsListStyles.item]
        }
        onPress={handleClick}
      >
        <Text
          style={
            currentSeason.id === item.id
              ? [seasonsListStyles.title, seasonsListStyles.titleActive]
              : [seasonsListStyles.title]
          }
        >
          {t("tv.season.title", { number: index + 1 })}
        </Text>
      </Pressable>
    )
  }

  return (
    <>
      <FlatList
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={seasonsListStyles.content}
        keyExtractor={(_, index: number) => index.toString()}
        data={items}
        renderItem={renderItem}
      />
      <List show={show} season={currentSeason} items={currentSeason.items} />
    </>
  )
}

export default SeasonsListComponent
