import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useMovieRecommendations } from "hocs"
import { recommendationsStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/MovieHorizontalList"
import { MovieRecommendations } from "types"

type Props = {
  items: MovieRecommendations[]
}

const RecommendationsComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  const visible = items.length > 0

  return (
    <>
      {visible && (
        <View style={recommendationsStyles.root}>
          <Typography variant="callout" style={recommendationsStyles.title}>
            {t("movie.content.recommendations")}
          </Typography>
          <List showStatus items={items} />
        </View>
      )}
    </>
  )
}

export default compose<ComponentType>(useMovieRecommendations)(
  RecommendationsComponent,
)
