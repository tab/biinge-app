import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useTvTrending } from "hocs"
import { searchResultsStyles } from "styles"
import List from "components/ui/TvHorizontalList"
import Typography from "components/ui/Typography"
import { TrendingListType } from "types"

type Props = {
  items: TrendingListType
}

const TrendingTvShowsComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  return (
    <View style={searchResultsStyles.content}>
      <Typography variant="subhead" style={searchResultsStyles.title}>
        {t("search.tv.trending.title")}
      </Typography>
      <List showStatus items={items} />
    </View>
  )
}

export default compose<ComponentType>(useTvTrending)(TrendingTvShowsComponent)
