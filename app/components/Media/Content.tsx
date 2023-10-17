import React from "react"
import { View, Text } from "react-native"
import { Navigation } from "react-native-navigation"
import { useRealm } from "@realm/react"
import { useTranslation } from "react-i18next"

import {
  layoutStyles,
  mediaStyles,
  activeButtonStyles,
  actionButtonStyles,
} from "styles"
import { Media } from "models/Media"
import Button from "components/ui/Button"
import { MEDIA_MENU_OVERLAY } from "screens/Overlay/MediaMenu"

type Props = {
  item: Media
}

const ContentComponent = ({ item }: Props) => {
  const { t } = useTranslation()
  const realm = useRealm()

  const { id, title, year, plot, want, watched } = item

  const handleWant = () => {
    realm.write(() => {
      realm.create(
        Media,
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
        Media,
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
    Navigation.showOverlay({
      component: {
        name: MEDIA_MENU_OVERLAY.name,
        passProps: { id: id, item: item },
        options: {
          layout: {
            componentBackgroundColor: "transparent",
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    })
  }

  return (
    <View style={layoutStyles.content}>
      <View>
        <Text style={layoutStyles.title}>{title}</Text>
        <Text style={mediaStyles.year}>{year}</Text>
      </View>
      <View style={mediaStyles.actions}>
        {want || watched ? (
          <Button style={activeButtonStyles.button} onPress={handleOverlay}>
            {want
              ? t("media.actions.want.title")
              : t("media.actions.watched.title")}
          </Button>
        ) : (
          <>
            <Button style={actionButtonStyles.buttonWant} onPress={handleWant}>
              {t("media.actions.want.title")}
            </Button>
            <Button
              style={actionButtonStyles.buttonWatched}
              onPress={handleWatched}
            >
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
