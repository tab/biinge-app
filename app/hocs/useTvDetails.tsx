import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { BlurView } from "@react-native-community/blur"
import { useTheme } from "@react-navigation/native"

import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { tvDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbTvDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { TvDetails, FETCH_STATUS } from "types"
import { loadingStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function useTvDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseTvDetails = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { dark } = useTheme()

    const result = useAppSelector((state) => selectById(state, id)) as TvDetails
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (result === undefined && !fetchStatus.isFetching) {
        dispatch(tvDetails(id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderLoader = () => {
      return (
        <View style={loadingStyles.root}>
          <BlurView
            style={loadingStyles.blur}
            blurType={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
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
      return <></>
    }

    return (
      <LoadableEntity
        entity={result}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        {(result: TvDetails) => (
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

  return UseTvDetails
}
