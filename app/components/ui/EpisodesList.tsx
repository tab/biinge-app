import React from "react"
import { FlatList, View } from "react-native"

import { episodesListStyles } from "styles"
import Episode from "components/ui/Episode"
import { TvEpisode, TvSeason, TvDetails } from "types"

type Props = {
  show: TvDetails
  season: TvSeason
  items: TvEpisode[]
}

const EpisodesListComponent = ({ show, season, items }: Props) => {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <Episode show={show} season={season} item={item} index={index} />
  }

  return (
    <View style={episodesListStyles.root}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        data={items}
        renderItem={renderItem}
      />
    </View>
  )
}

export default EpisodesListComponent
