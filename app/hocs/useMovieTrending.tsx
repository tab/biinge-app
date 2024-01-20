import React, { useEffect } from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppSelector, useAppDispatch } from "redux/hooks"
import { trendingMovie } from "redux/features/tmdb/tmdbThunk"
import {
  selectAll,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieTrendingSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import Skeleton from "components/ui/Skeleton"
import { TrendingListType } from "types"
import {
  textStyles,
  searchResultsStyles,
  horizontalStubListStyles,
} from "styles"

type Props = {}

export function useMovieTrending<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieTrending = ({ ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const items = useAppSelector((state) =>
      selectAll(state),
    ) as TrendingListType
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(trendingMovie())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderLoader = () => {
      return (
        <View style={searchResultsStyles.content}>
          <Typography variant="subhead" style={searchResultsStyles.title}>
            {t("search.movies.trending.title")}
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
            {t("search.movies.trending.title")}
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
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {(items: TrendingListType) => (
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

  return UseMovieTrending
}
