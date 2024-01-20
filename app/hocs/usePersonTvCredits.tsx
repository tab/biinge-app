import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { personTvCredits } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbPersonTvCreditsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import { PersonTvCredits, FETCH_STATUS } from "types"
import { loadingStyles, layoutStyles, textStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function usePersonTvCredits<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UsePersonTvCredits = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as PersonTvCredits
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(personTvCredits(id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderLoader = () => {
      return (
        <View
          style={[
            layoutStyles.bgLight,
            layoutStyles.roundCorners,
            loadingStyles.root,
          ]}
        >
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
        {(result: PersonTvCredits) => (
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

  return UsePersonTvCredits
}
