import React, { useContext, useState } from "react"
import { View, Modal } from "react-native"
import { useTranslation } from "react-i18next"

import { MovieContext } from "contexts/MovieContext"
import { actionStyles, actionButtonStyles } from "styles"
import Button from "components/ui/Button"
import Menu from "components/Movie/Menu"

type Props = {
  item: any
}

const ActionsComponent = ({ item }: Props) => {
  const { t } = useTranslation()

  const {
    inWantList,
    inWatchedList,
    addToWantList,
    addToWatchedList,
    removeFromList,
    pinned,
    pinToList,
    unpinFromList,
  } = useContext(MovieContext)

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const isPinned = pinned(item.id)
  const want = inWantList(item.id)
  const watched = inWatchedList(item.id)

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
            {want ? t("actions.want.title") : t("actions.watched.title")}
          </Button>
        ) : (
          <>
            <Button
              style={actionButtonStyles.buttonWant}
              loading={loading}
              disabled={loading}
              onPress={handleWant}
            >
              {t("actions.want.title")}
            </Button>
            <Button
              style={actionButtonStyles.buttonWatched}
              loading={loading}
              disabled={loading}
              onPress={handleWatched}
            >
              {t("actions.watched.title")}
            </Button>
          </>
        )}
      </View>
      <Modal transparent animationType="none" visible={visible}>
        <Menu
          poster_path={item.poster_path}
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
