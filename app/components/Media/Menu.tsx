import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { useTranslation } from "react-i18next"
import { useRealm } from "@realm/react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectMenuVisibility,
  closeMenu,
} from "redux/features/media/mediaMenuSlice"
import Button from "components/ui/Button"
import { MediaModel } from "models/Media"
import colors from "styles/colors"
import { MediaType } from "types"

type Props = {
  media: MediaType
}

const MenuComponent = ({ media }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const realm = useRealm()

  const { id, want, watched } = media

  const visible = useAppSelector(
    (state) => selectMenuVisibility(state) as boolean,
  )

  const handleWant = () => {
    realm.write(() => {
      realm.create(
        MediaModel,
        {
          id: id,
          want: !want,
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
          watched: !watched,
          updatedAt: new Date(),
        },
        true,
      )
    })
  }

  const handleCancel = () => {
    dispatch(closeMenu())
  }

  if (!visible) {
    return null
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

export default MenuComponent

const { height, width } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    height: height - 40,
    width: width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
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
