import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useTvSeasons } from "hocs"
import { seasonsStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/SeasonsList"
import { TvSeason, TvDetails } from "types"

type Props = {
  show: TvDetails
  items: TvSeason[]
}

const SeasonsComponent = ({ show, items }: Props) => {
  const { t } = useTranslation()

  const visible = items.length > 0

  return (
    <>
      {visible && (
        <View style={seasonsStyles.root}>
          <Typography variant="callout" style={seasonsStyles.title}>
            {t("tv.content.seasons")}
          </Typography>
          <List show={show} items={items} />
        </View>
      )}
    </>
  )
}

export default compose<ComponentType>(useTvSeasons)(SeasonsComponent)
