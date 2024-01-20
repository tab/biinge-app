import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { BlurView } from "@react-native-community/blur"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { movieDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbMovieDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import Poster from "components/ui/Poster"
import { MovieDetails, FETCH_STATUS } from "types"
import { loadingStyles, layoutStyles, textStyles } from "styles"
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
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(movieDetails(id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
          <Poster poster_path="" />
          <View style={[layoutStyles.root, layoutStyles.content]}>
            <Typography variant="subhead" style={textStyles.center}>
              {t("loading.fetchError.title")}
            </Typography>
          </View>
        </>
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
