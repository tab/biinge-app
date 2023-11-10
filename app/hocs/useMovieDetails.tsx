import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"
import { BlurView } from "@react-native-community/blur"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { movieDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MovieDetails } from "types"
import { loadingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function useMovieDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMovieDetails = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const result = useAppSelector((state) =>
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
        <View style={loadingStyles.root}>
          <BlurView
            style={loadingStyles.blur}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor={colors.white}
          />
          <ActivityIndicator
            animating={true}
            size="small"
            color={colors.white}
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
        {(result: MovieDetails) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            item={result}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseMovieDetails
}
