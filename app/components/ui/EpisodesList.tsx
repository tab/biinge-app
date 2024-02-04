import React from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { episodesListStyles } from "styles"
import Actions from "components/Tv/SeasonActions"
import Episode from "components/ui/Episode"
import { TvEpisode, TvSeason, TvDetails } from "types"

type Props = {
  show: TvDetails
  season: TvSeason
  items: TvEpisode[]
}

const EpisodesListComponent = ({ show, season, items }: Props) => {
  const isEpisodes = items.length > 0

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <Episode show={show} season={season} item={item} index={index} />
  }

  return (
    <View style={episodesListStyles.root}>
      {isEpisodes && (
        <>
          <FlashList
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index: number) => index.toString()}
            data={items}
            estimatedItemSize={64}
            renderItem={renderItem}
          />
          <Actions show={show} item={season} />
        </>
      )}
    </View>
  )
}

export default EpisodesListComponent
