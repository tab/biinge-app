import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { movieDetails } from "redux/features/tmdb/tmdbThunk"
import { selectById, selectFetchStatus } from "redux/features/tmdb/tmdbSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MovieDetails } from "types"

type Props = {
  route: any
}

export function useMovieDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieDetails = ({ route, ...restProps }: Props) => {
    const dispatch = useAppDispatch()

    const { params } = route
    const { id } = params

    const item = useAppSelector((state) =>
      selectById(state, id),
    ) as MovieDetails
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(movieDetails(id))
      }
    }, [])

    const renderLoader = () => {
      return (
        <View>
          <ActivityIndicator animating={true} size="small" color="black" />
        </View>
      )
    }

    const renderError = () => {
      return (
        <View>
          <Text>Error</Text>
        </View>
      )
    }

    return (
      <LoadableEntity
        entity={item}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {(item: MovieDetails) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            item={item}
            tmdbId={id}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseMovieDetails
}
