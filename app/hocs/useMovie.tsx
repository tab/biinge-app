import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { fetchMovie } from "redux/features/movie/movieThunk"
import {
  selectMovieById,
  selectFetchStatus,
} from "redux/features/movie/movieSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MovieType } from "types"

export function useMovie<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovie = (props: GenericType) => {
    const dispatch = useAppDispatch()

    const movieId = "tt0075686"

    const movie = useAppSelector(
      (state) => selectMovieById(state, movieId) as MovieType,
    )
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      const handleFetchMovie = () => {
        if (!fetchStatus.isFetching && movieId) {
          dispatch(fetchMovie(movieId))
        }
      }

      handleFetchMovie()
    }, [movieId])

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
        entity={movie}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {(movie: MovieType) => (
          <WrappedComponent
            {...props}
            movie={movie}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseMovie
}
