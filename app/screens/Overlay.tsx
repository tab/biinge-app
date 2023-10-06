import React, { ComponentType, useState } from "react"
import { compose } from "@reduxjs/toolkit"
import { Navigation } from "react-native-navigation"
import { Realm, useRealm, useQuery, useObject } from "@realm/react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// import { useBacklog } from "hocs"
import Button from "components/ui/Button"
// import { BacklogModel } from "models/Backlog"
import { MediaModel } from "models/Media"
// import { BACKLOG_WANT_STATE, BACKLOG_WATCHED_STATE } from "config"
import { BacklogType, MediaType } from "types"
import colors from "styles/colors"

type Props = {
  media: MediaType
  componentId: string
}

const OverlayScreen = ({ media, componentId }: Props) => {
  const { t } = useTranslation()
  const realm = useRealm()

  // const items = useQuery(BacklogModel)
  // const item = items.find((record: BacklogType) => record.mediaId === id)

  // const record = useObject(MediaModel, media.id)

  const { id, want, watched } = media
  const [isWant, setWant] = useState(want)
  const [isWatched, setWatched] = useState(watched)

  // const isWanted = item && item.state === BACKLOG_WANT_STATE
  // const isWatched = item && item.state === BACKLOG_WATCHED_STATE
  // const isBacklog = isWanted || isWatched

  // const handleDestroy = () => {
  //   realm.write(() => {
  //     realm.delete(item)
  //   })
  // }

  const handleWant = () => {
    // realm.write(() => {
    //   realm.create(
    //     BacklogModel,
    //     {
    //       userId: "1",
    //       mediaId: id,
    //       state: BACKLOG_WANT_STATE,
    //     },
    //     // Realm.UpdateMode.Modified,
    //   )
    // })

    setWant(!isWant)

    realm.write(() => {
      realm.create(
        MediaModel,
        {
          id: id,
          want: !isWant,
          createdAt: new Date(),
        },
        true,
      )
    })
  }

  const handleWatched = () => {
    // realm.write(() => {
    //   realm.create(
    //     BacklogModel,
    //     {
    //       userId: "1",
    //       mediaId: id,
    //       state: BACKLOG_WATCHED_STATE,
    //     },
    //     // Realm.UpdateMode.Modified,
    //   )
    // })

    setWatched(!isWatched)

    realm.write(() => {
      realm.create(
        MediaModel,
        {
          id: id,
          watched: !isWatched,
          createdAt: new Date(),
        },
        true,
      )
    })
  }

  const handleCancel = () => {
    Navigation.dismissOverlay(componentId)
  }

  return (
    <View style={styles.root}>
      <View style={styles.actions}>
        {want || watched ? (
          <>
            {want && (
              <Button
                style={[styles.button, styles.buttonDanger]}
                textStyle={[styles.text, styles.textDanger]}
                onPress={handleWant}
              >
                {t("actions.want.remove")}
              </Button>
            )}
            {watched && (
              <Button
                style={[styles.button, styles.buttonDanger]}
                textStyle={[styles.text, styles.textDanger]}
                onPress={handleWatched}
              >
                {t("actions.watched.remove")}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              style={[styles.button]}
              textStyle={[styles.text]}
              onPress={handleWant}
            >
              {t("actions.want.add")}
            </Button>
            <Button
              style={[styles.button]}
              textStyle={[styles.text]}
              onPress={handleWatched}
            >
              {t("actions.watched.add")}
            </Button>
          </>
        )}
        <Button
          style={[styles.button, styles.buttonCancel]}
          textStyle={[styles.text]}
          onPress={handleCancel}
        >
          {t("actions.cancel.title")}
        </Button>
      </View>
    </View>
  )
}

export const OVERLAY_SCREEN = {
  name: "com.biinge.Overlay",
}

export default compose<ComponentType>()(OverlayScreen)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    zIndex: 1000,
  },
  actions: {
    position: "absolute",
    bottom: 5,
    width: "100%",
  },
  button: {
    backgroundColor: colors.raisinBlack,
    borderRadius: 0,
    margin: 0,
    borderBottomColor: colors.gunmetal,
    borderBottomWidth: 0.5,
  },
  buttonCancel: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomWidth: 0,
  },
  buttonDanger: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  text: {
    color: colors.americanSilver,
  },
  textDanger: {
    color: colors.darkCandyAppleRed,
  },
})
