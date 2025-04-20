import React, { useEffect } from "react"
import { useTheme } from "@react-navigation/native"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { episodeDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbEpisodeDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Loader from "components/ui/Loader"
import {
  FETCH_STATUS,
  TvEpisodeDetails,
  TvShowDetails,
  TvSeasonDetails,
} from "types"

type Props = {
  id: number
  show: TvShowDetails
  season: TvSeasonDetails
  episodeNumber: number
}

export function useEpisodeDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseEpisodeDetails = ({
    id,
    show,
    season,
    episodeNumber,
    ...restProps
  }: Props) => {
    const dispatch = useAppDispatch()
    const { dark } = useTheme()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as TvEpisodeDetails
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (result === undefined && !fetchStatus.isFetching) {
        dispatch(
          episodeDetails({
            id,
            tvId: show.id,
            seasonNumber: season.number,
            episodeNumber,
          }),
        )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const renderLoader = () => {
      return <Loader dark={dark} />
    }

    const renderError = () => {
      return <></>
    }

    return (
      <LoadableEntity
        entity={result}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {(result: TvEpisodeDetails) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            item={result}
            show={show}
            season={season}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseEpisodeDetails
}
