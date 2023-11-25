import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { personMovieCredits } from "redux/features/tmdb/tmdbThunk"
import { selectById as selectPersonById } from "redux/features/tmdb/tmdbPersonDetailsSlice"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Typography from "components/ui/Typography"
import { PersonMovieCredits, PersonDetails, FETCH_STATUS } from "types"
import { loadingStyles, layoutStyles, textStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function usePersonMovieCredits<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UsePersonMovieCredits = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const person = useAppSelector((state) =>
      selectPersonById(state, id),
    ) as PersonDetails

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as PersonMovieCredits
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(personMovieCredits(id))
      }
    }, [dispatch, fetchStatus.isFetching, id])

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
        {() => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            gender={person?.gender}
            cast={result.cast}
            crew={result.crew}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UsePersonMovieCredits
}
