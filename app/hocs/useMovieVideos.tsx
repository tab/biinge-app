import React, { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { movieVideos } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieVideosSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MovieVideos, FETCH_STATUS } from "types"

type Props = {
  id: number
}

export function useMovieVideos<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieVideos = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as MovieVideos
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(movieVideos(id))
      }
    }, [dispatch, fetchStatus.isFetching, id])

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
        {() => (
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

  return UseMovieVideos
}
