import React, { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { tvVideos } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbTvVideosSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { TvVideos, FETCH_STATUS } from "types"

type Props = {
  id: number
}

export function useTvVideos<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseTvVideos = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()

    const result = useAppSelector((state) => selectById(state, id)) as TvVideos
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(tvVideos(id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderLoader = () => {
      return <></>
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
        {(result: TvVideos) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            items={result.items}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseTvVideos
}
