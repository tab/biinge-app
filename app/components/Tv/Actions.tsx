import React, { useContext, useState } from "react"
import { View, Modal } from "react-native"
import { useTranslation } from "react-i18next"

import { TvContext } from "contexts/TvContext"
import { TV_IN_PRODUCTION_STATUS } from "config"
import { actionStyles, actionButtonStyles } from "styles"
import Button from "components/ui/Button"
import Menu from "components/Tv/Menu"

type Props = {
  item: any
}

const ActionsComponent = ({ item }: Props) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const {
    inWantList,
    inWatchingList,
    inWatchedList,
    addToWantList,
    addToWatchedList,
    removeFromList,
    pinned,
    pinToList,
    unpinFromList,
  } = useContext(TvContext)

  const isPinned = pinned(item.id)
  const want = inWantList(item.id)
  const watching = inWatchingList(item.id)
  const watched = inWatchedList(item.id)
  const isAdded = want || watching || watched

  const { status } = item
  const inProduction = status === TV_IN_PRODUCTION_STATUS

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

    addToWatchedList({ show: item, type: "show" }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleRemove = () => {
    setLoading(true)

    removeFromList({ show: item, type: "show" }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleWant = () => {
    want ? handleRemove() : handleAddToWant()
  }

  const handleWatching = () => {
    watching ? handleRemove() : handleAddToWatched()
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
        {isAdded ? (
          <Button
            style={actionButtonStyles.buttonActive}
            loading={loading}
            disabled={loading}
            onPress={handleOverlay}
          >
            {want
              ? t("actions.want.title")
              : t(`actions.${watching ? "watching" : "watched"}.title`)}
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
              {inProduction
                ? t("actions.watching.title")
                : t("actions.watched.title")}
            </Button>
          </>
        )}
      </View>
      <Modal transparent animationType="none" visible={visible}>
        <Menu
          poster_path={item.poster_path}
          pinned={isPinned}
          want={want}
          watching={watching}
          watched={watched}
          onPin={handlePin}
          onUnpin={handleUnpin}
          onWant={handleWant}
          onWatching={handleWatching}
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
