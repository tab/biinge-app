import React, { useEffect } from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppSelector, useAppDispatch } from "redux/hooks"
import { trendingPeople } from "redux/features/tmdb/tmdbThunk"
import {
  selectAll,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbPeopleTrendingSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import Skeleton from "components/ui/Skeleton"
import { PeopleListType } from "types"
import {
  textStyles,
  searchResultsStyles,
  horizontalStubListStyles,
} from "styles"

type Props = {}

export function usePeopleTrending<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UsePeopleTrending = ({ ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const items = useAppSelector((state) => selectAll(state)) as PeopleListType
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(trendingPeople())
      }
    }, [dispatch, fetchStatus.isFetching])

    const renderLoader = () => {
      return (
        <View style={searchResultsStyles.content}>
          <Typography variant="subhead" style={searchResultsStyles.title}>
            {t("search.people.results.title")}
          </Typography>
          <Skeleton>
            <View style={horizontalStubListStyles.root}>
              <View style={horizontalStubListStyles.itemPerson} />
              <View style={horizontalStubListStyles.itemPerson} />
              <View style={horizontalStubListStyles.itemPerson} />
              <View style={horizontalStubListStyles.itemPerson} />
              <View style={horizontalStubListStyles.itemPerson} />
            </View>
          </Skeleton>
        </View>
      )
    }

    const renderError = () => {
      return (
        <View style={searchResultsStyles.content}>
          <Typography variant="subhead" style={searchResultsStyles.title}>
            {t("search.people.trending.title")}
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

  return UsePeopleTrending
}
