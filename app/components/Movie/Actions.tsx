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
    loading,
    inWantList,
    inWatchedList,
    addToWantList,
    addToWatchedList,
    removeFromList,
  } = useContext(MovieContext)

  const [visible, setVisible] = useState(false)

  const want = inWantList(item.id)
  const watched = inWatchedList(item.id)

  const handleWant = () => {
    want ? removeFromList(item.id) : addToWantList(item)
  }

  const handleWatched = () => {
    watched ? removeFromList(item.id) : addToWatchedList(item)
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
          want={want}
          watched={watched}
          onWant={handleWant}
          onWatched={handleWatched}
          onCancel={handleCancel}
        />
      </Modal>
    </View>
  )
}

export default ActionsComponent
