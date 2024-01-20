import React, { useEffect } from "react"
import { View, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
// import { tvDetails } from "redux/features/tmdb/tmdbThunk"
// import {
//   selectById,
//   selectFetchStatus,
// } from "redux/features/tmdb/tmdbTvSeasonsSlice"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbTvDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import { TvShow, TvSeasons, FETCH_STATUS } from "types"
import { loadingStyles, layoutStyles, textStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function useTvSeasons<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseTvSeasons = ({ id, ...restProps }: Props) => {
    // const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const result = useAppSelector((state) => selectById(state, id)) as TvShow
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    // useEffect(() => {
    //   if (!fetchStatus.isFetching) {
    //     dispatch(tvDetails(id))
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const renderLoader = () => {
      return (
        <View style={loadingStyles.content}>
          <ActivityIndicator
            animating={true}
            size="small"
            color={colors.black}
          />
        </View>
      )
    }

    const renderError = () => {
      return (
        <View style={layoutStyles.content}>
          <Typography variant="subhead" style={textStyles.center}>
            {t("loading.fetchError.title")}
          </Typography>
        </View>
      )
    }

    return (
      <LoadableEntity
        entity={result}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {(result: TvSeasons) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            show={result}
            items={result.items}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseTvSeasons
}
