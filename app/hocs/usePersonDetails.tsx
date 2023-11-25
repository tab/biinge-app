import React, { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { BlurView } from "@react-native-community/blur"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { personDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbPersonDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Title from "components/ui/Title"
import Poster from "components/Person/Poster"
import { PersonDetails, FETCH_STATUS } from "types"
import { loadingStyles, textStyles, personStyles } from "styles"
import colors from "styles/colors"

type Props = {
  id: number
}

export function usePersonDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UsePersonDetails = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as PersonDetails
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (!fetchStatus.isFetching) {
        dispatch(personDetails(id))
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
        <>
          <Poster poster_path={""} />
          <View style={personStyles.content}>
            <Title style={[personStyles.title, textStyles.center]}>
              {t("loading.fetchError.title")}
            </Title>
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
        {(result: PersonDetails) => (
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

  return UsePersonDetails
}
