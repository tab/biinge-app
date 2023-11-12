import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useMovieSearch } from "hocs"
import { searchResultsStyles } from "styles"
import List from "components/ui/MovieHorizontalList"
import Typography from "components/ui/Typography"
import { SearchResultListType } from "types"

type Props = {
  items: SearchResultListType
}

const MoviesComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  return (
    <View style={searchResultsStyles.content}>
      <Typography variant="subhead" style={searchResultsStyles.title}>
        {t("search.movies.results.title")}
      </Typography>
      <List showStatus items={items} />
    </View>
  )
}

export default compose<ComponentType>(useMovieSearch)(MoviesComponent)
