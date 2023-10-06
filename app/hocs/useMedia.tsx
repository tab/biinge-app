import React, { useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"
import { useRealm, useObject } from "@realm/react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { cacheableFetchMedia as fetchMedia } from "redux/features/media/mediaThunk"
import { selectFetchStatus } from "redux/features/media/mediaSlice"
import LoadableEntity from "components/ui/LoadableEntity"
import { MediaType, ImdbResultType } from "types"
import { MediaModel } from "models/Media"

type Props = {
  id: string
}

export function useMedia<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseMedia = ({ id, ...restProps }: Props) => {
    const dispatch = useAppDispatch()
    const realm = useRealm()

    const media = useObject(MediaModel, id)

    const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

    useEffect(() => {
      const handleFetchMedia = () => {
        if (!fetchStatus.isFetching && id) {
          dispatch(fetchMedia(id))
            .then(({ result }) => {
              return handleSaveMedia(result)
            })
            .catch((error) => {
              console.log("--- error ---")
              console.log(error)
            })
        }
      }

      handleFetchMedia()
    }, [id])

    const transformList = (list: string[]): { name: string }[] => {
      return list.map((name: string) => {
        return { name: name }
      })
    }

    const handleSaveMedia = ({
      title,
      image,
      contentType,
      contentRating,
      plot,
      year,
      actors,
      directors,
      genre,
      rating: { star },
    }: ImdbResultType) => {
      const payload = {
        id,
        title,
        image,
        contentType,
        contentRating,
        plot,
        year,
        star,
        actors: transformList(actors),
        directors: transformList(directors),
        genres: transformList(genre),
      }

      try {
        realm.write(() => {
          realm.create(MediaModel, payload, true)
        })
      } catch (error) {
        console.log("--- error ---")
        console.log(error)
      }
    }

    const renderLoader = () => {
      return (
        <View>
          <ActivityIndicator animating={true} size="small" color="black" />
        </View>
      )
    }

    const renderError = () => {
      return (
        <View>
          <Text>Error</Text>
        </View>
      )
    }

    return (
      <LoadableEntity
        entity={media}
        fetchStatus={fetchStatus}
        renderLoading={renderLoader}
        renderError={renderError}
      >
        {(media: MediaType) => (
          // @ts-ignore
          <WrappedComponent
            {...restProps}
            media={media}
            fetchStatus={fetchStatus}
          />
        )}
      </LoadableEntity>
    )
  }

  return UseMedia
}
