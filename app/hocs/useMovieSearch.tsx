import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "redux/hooks"
import {
  selectAll,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieSearchSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import Skeleton from "components/ui/Skeleton"
import { MoviesListType } from "types"
import {
  textStyles,
  searchResultsStyles,
  horizontalStubListStyles,
} from "styles"

type Props = {}

export function useMovieSearch<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieSearch = ({ ...restProps }: Props) => {
    const { t } = useTranslation()

    const items = useAppSelector((state) => selectAll(state)) as MoviesListType
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    const renderLoader = () => {
      return (
        <View style={searchResultsStyles.content}>
          <Typography variant="subhead" style={searchResultsStyles.title}>
            {t("search.movies.results.title")}
          </Typography>
          <Skeleton>
            <View style={horizontalStubListStyles.root}>
              <View style={horizontalStubListStyles.itemMovie} />
              <View style={horizontalStubListStyles.itemMovie} />
              <View style={horizontalStubListStyles.itemMovie} />
            </View>
          </Skeleton>
        </View>
      )
    }

    const renderError = () => {
      return (
        <View style={searchResultsStyles.content}>
          <Typography variant="subhead" style={searchResultsStyles.title}>
            {t("search.movies.results.title")}
          </Typography>
          <Typography variant="subhead" style={textStyles.center}>
            {t("loading.fetchError.title")}
          </Typography>
        </View>
      )
    }

    return (
      <LoadableEntity
        entity={items}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {() => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            items={items}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseMovieSearch
}
