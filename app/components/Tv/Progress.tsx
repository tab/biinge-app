import React from "react"
import { useQuery } from "@realm/react"

import { TvEpisode } from "models"
import { TV_IN_PRODUCTION_STATUS } from "config"
import PieChart from "components/ui/PieChart"
import Icon from "components/ui/Icon"
import colors from "styles/colors"

type Props = {
  item: any
  numColumns: number
}

const ProgressComponent = ({ item, numColumns }: Props) => {
  const { tmdbId, status, episodesCount } = item

  const tvEpisodes = useQuery<TvEpisode>(TvEpisode)

  const watched = tvEpisodes.filter(({ tmdbShowId }) => tmdbShowId === tmdbId)

  const percent = (watched.length / episodesCount) * 100

  const inProduction = status === TV_IN_PRODUCTION_STATUS
  const isEnded = !inProduction
  const isCompleted = watched.length === episodesCount

  return (
    <>
      {isCompleted && isEnded ? (
        <Icon
          name="checkmark-outline"
          color={colors.white}
          size={numColumns === 2 ? 20 : 15}
        />
      ) : (
        <PieChart color={colors.white} percent={percent} />
      )}
    </>
  )
}

export default ProgressComponent
