import React from "react"
import { useQuery } from "@realm/react"

import { TvEpisode } from "models"
import PieChart from "components/ui/PieChart"
import colors from "styles/colors"
import { TV_IN_PRODUCTION_STATUS } from "config"
import Icon from "../ui/Icon"

type Props = {
  item: any
  numColumns: number
}

const ProgressComponent = ({ item, numColumns }: Props) => {
  const { tmdb_id, status, number_of_episodes } = item

  const tvEpisodes = useQuery<TvEpisode>(TvEpisode)

  const watched = tvEpisodes.filter(
    ({ tmdb_show_id }) => tmdb_show_id === tmdb_id,
  )

  const percent = (watched.length / number_of_episodes) * 100

  const inProduction = status === TV_IN_PRODUCTION_STATUS
  const isEnded = !inProduction
  const isCompleted = watched.length === number_of_episodes

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
