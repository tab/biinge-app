import React from "react"
import { View } from "react-native"
import { Navigation } from "react-native-navigation"
import { useTranslation } from "react-i18next"
import { useRealm } from "@realm/react"

import { overlayStyles } from "styles"
import Button from "components/ui/Button"
import { Media } from "models/Media"

type Props = {
  id: string
  item: Media
  componentId: string
}

const MediaMenuOverlay = ({ id, item, componentId }: Props) => {
  const { t } = useTranslation()
  const realm = useRealm()

  const { want, watched } = item

  const [isWant, setWant] = React.useState(want)
  const [isWatched, setWatched] = React.useState(watched)

  const handleWant = () => {
    realm.write(() => {
      realm.create(
        Media,
        {
          id: id,
          want: !want,
          updatedAt: new Date(),
        },
        true,
      )
    })
    setWant(!want)
  }

  const handleWatched = () => {
    realm.write(() => {
      realm.create(
        Media,
        {
          id: id,
          watched: !watched,
          updatedAt: new Date(),
        },
        true,
      )
    })
    setWatched(!watched)
  }

  const handleCancel = () => {
    Navigation.dismissOverlay(componentId)
  }

  return (
    <View style={overlayStyles.root}>
      <View style={overlayStyles.actions}>
        {isWant || isWatched ? (
          <>
            {isWant && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={handleWant}
              >
                {t("actions.want.remove")}
              </Button>
            )}
            {isWatched && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={handleWatched}
              >
                {t("actions.watched.remove")}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={handleWant}
            >
              {t("actions.want.add")}
            </Button>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={handleWatched}
            >
              {t("actions.watched.add")}
            </Button>
          </>
        )}
        <Button
          style={[overlayStyles.button, overlayStyles.buttonCancel]}
          textStyle={[overlayStyles.text]}
          onPress={handleCancel}
        >
          {t("actions.cancel.title")}
        </Button>
      </View>
    </View>
  )
}

export const MEDIA_MENU_OVERLAY = {
  name: "com.biinge.MediaMenuOverlay",
}

export default MediaMenuOverlay
