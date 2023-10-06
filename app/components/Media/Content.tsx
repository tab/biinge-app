import React from "react"
import { View, Text } from "react-native"
import { useRealm } from "@realm/react"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "redux/hooks"
import { openMenu } from "redux/features/media/mediaMenuSlice"
import { layoutStyles, mediaStyles, activeButtonStyles } from "styles"
import { MediaModel } from "models/Media"
import Button from "components/ui/Button"
import { MediaType } from "types"

type Props = {
  media: MediaType
}

const ContentComponent = ({ media }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const realm = useRealm()

  const { id, title, year, plot, want, watched } = media

  const handleWant = () => {
    realm.write(() => {
      realm.create(
        MediaModel,
        {
          id: id,
          want: true,
          updatedAt: new Date(),
        },
        true,
      )
    })
  }

  const handleWatched = () => {
    realm.write(() => {
      realm.create(
        MediaModel,
        {
          id: id,
          watched: true,
          updatedAt: new Date(),
        },
        true,
      )
    })
  }

  const handleOverlay = () => {
    dispatch(openMenu())
  }

  return (
    <View style={layoutStyles.content}>
      <View>
        <Text style={layoutStyles.title}>{title}</Text>
        <Text style={mediaStyles.year}>{year}</Text>
      </View>
      <View style={mediaStyles.actions}>
        {want || watched ? (
          <>
            {want && (
              <Button style={activeButtonStyles.button} onPress={handleOverlay}>
                {t("media.actions.want.title")}
              </Button>
            )}
            {watched && (
              <Button style={activeButtonStyles.button} onPress={handleOverlay}>
                {t("media.actions.watched.title")}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button onPress={handleWant}>
              {t("media.actions.want.title")}
            </Button>
            <Button onPress={handleWatched}>
              {t("media.actions.watched.title")}
            </Button>
          </>
        )}
      </View>
      <View>
        <Text style={layoutStyles.text}>{plot}</Text>
      </View>
    </View>
  )
}

export default ContentComponent
