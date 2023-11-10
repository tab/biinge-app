import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { personMovieCredits } from "redux/features/tmdb/tmdbThunk"
import { selectById as selectPersonById } from "redux/features/tmdb/tmdbPersonDetailsSlice"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { PersonMovieCredits, PersonDetails } from "types"
import { loadingStyles, layoutStyles } from "styles"
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
    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(personMovieCredits(id))
      }
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
        {(result: PersonMovieCredits) => (
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
