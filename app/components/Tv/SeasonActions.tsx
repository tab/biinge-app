import React, { useContext, useState } from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { TvContext } from "contexts/TvContext"
import { seasonActionsStyles } from "styles"
import Button from "components/ui/Button"

type Props = {
  show: any
  item: any
}

const SeasonActionsComponent = ({ show, item }: Props) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const { inWatchedSeasonList, addToWatchedList, removeFromList } =
    useContext(TvContext)

  const watched = inWatchedSeasonList(item.id)

  const handleAdd = () => {
    setLoading(true)
    addToWatchedList({ show, season: item, type: "season" }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleRemove = () => {
    setLoading(true)
    removeFromList({ show, season: item, type: "season" }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 150)
    })
  }

  const handleWatched = () => {
    watched ? handleRemove() : handleAdd()
  }

  return (
    <View style={seasonActionsStyles.root}>
      <View style={seasonActionsStyles.content}>
        <Button
          style={seasonActionsStyles.button}
          loading={loading}
          disabled={loading}
          onPress={handleWatched}
        >
          {watched ? t("actions.watched.remove") : t("actions.watched.add")}
        </Button>
      </View>
    </View>
  )
}

export default SeasonActionsComponent
