import React, { useContext, useState } from "react"
import { View, Modal } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { MovieContext } from "contexts/MovieContext"
import { actionStyles, actionButtonStyles, textStyles } from "styles"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import Menu from "components/Movie/Menu"

type Props = {
  item: any
}

const ActionsComponent = ({ item }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const {
    inWantList,
    inWatchedList,
    inPinList,
    addToWantList,
    addToWatchedList,
    removeFromList,
    pinToList,
    unpinFromList,
  } = useContext(MovieContext)

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const want = inWantList(item.id)
  const watched = inWatchedList(item.id)
  const isPinned = inPinList(item.id)

  const handlePin = () => {
    setLoading(true)

    pinToList(item).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleUnpin = () => {
    setLoading(true)

    unpinFromList(item).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleAddToWant = () => {
    setLoading(true)

    addToWantList(item).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleAddToWatched = () => {
    setLoading(true)

    addToWatchedList(item).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleRemove = () => {
    setLoading(true)

    removeFromList(item.id).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleWant = () => {
    want ? handleRemove() : handleAddToWant()
  }

  const handleWatched = () => {
    watched ? handleRemove() : handleAddToWatched()
  }

  const handleMoveWantToWatched = () => {
    handleRemove()
    handleAddToWatched()
  }

  const handleMoveWatchedToWant = () => {
    handleRemove()
    handleAddToWant()
  }

  const handleOverlay = () => {
    setVisible(!visible)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <View style={actionStyles.root}>
      <View style={actionStyles.content}>
        {want || watched ? (
          <Button
            style={actionButtonStyles.buttonActive}
            loading={loading}
            disabled={loading}
            onPress={handleOverlay}
          >
            <Typography
              variant="callout"
              style={actionButtonStyles.buttonTextActive}
            >
              {want ? t("actions.want.title") : t("actions.watched.title")}
            </Typography>
          </Button>
        ) : (
          <>
            <Button
              style={[
                actionButtonStyles.buttonWant,
                dark
                  ? actionButtonStyles.buttonDark
                  : actionButtonStyles.buttonLight,
              ]}
              loading={loading}
              disabled={loading}
              onPress={handleWant}
            >
              <Typography
                variant="callout"
                style={dark ? textStyles.textLight : textStyles.textDark}
              >
                {t("actions.want.title")}
              </Typography>
            </Button>
            <Button
              style={[
                actionButtonStyles.buttonWatched,
                dark
                  ? actionButtonStyles.buttonDark
                  : actionButtonStyles.buttonLight,
              ]}
              loading={loading}
              disabled={loading}
              onPress={handleWatched}
            >
              <Typography
                variant="callout"
                style={dark ? textStyles.textLight : textStyles.textDark}
              >
                {t("actions.watched.title")}
              </Typography>
            </Button>
          </>
        )}
      </View>
      <Modal transparent animationType="none" visible={visible}>
        <Menu
          posterPath={item.posterPath}
          pinned={isPinned}
          want={want}
          watched={watched}
          onPin={handlePin}
          onUnpin={handleUnpin}
          onWant={handleWant}
          onWatched={handleWatched}
          onMoveToWant={handleMoveWatchedToWant}
          onMoveToWatched={handleMoveWantToWatched}
          onCancel={handleCancel}
        />
      </Modal>
    </View>
  )
}

export default ActionsComponent
