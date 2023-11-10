import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { movieCredits } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieCreditsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MovieCredits } from "types"
import { loadingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function useMovieCredits<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieCredits = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as MovieCredits
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(movieCredits(id))
      }
    }, [])

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
        <View>
          <Text>{t("loading.fetchError.title")}</Text>
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
        {(result: MovieCredits) => (
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

  return UseMovieCredits
}
