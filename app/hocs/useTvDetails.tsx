import React, { useEffect } from "react"
import { useTheme } from "@react-navigation/native"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { tvDetails } from "redux/features/tmdb/tmdbThunk"
import {
  selectById,
  selectFetchStatus,
} from "redux/features/tmdb/tmdbTvDetailsSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import Loader from "components/ui/Loader"
import { FETCH_STATUS, TvShowDetails } from "types"

type Props = {
  id: number
}

export function useTvDetails<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseTvDetails = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const { dark } = useTheme()

    const result = useAppSelector((state) =>
      selectById(state, id),
    ) as TvShowDetails
    const fetchStatus =
      useAppSelector((state) => selectFetchStatus(state, id)) || FETCH_STATUS

    useEffect(() => {
      if (result === undefined && !fetchStatus.isFetching) {
        dispatch(tvDetails(id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderLoader = () => {
      return <Loader dark={dark} />
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
        {(result: TvShowDetails) => (
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
