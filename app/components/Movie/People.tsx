import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useMovieCredits } from "hocs"
import { contentStyles, castStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/PeopleList"
import { MovieCredits } from "types"

type Props = {
  items: MovieCredits[]
}

const PeopleComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  return (
    <View style={castStyles.root}>
      <Typography
        variant="callout"
        style={[castStyles.title, contentStyles.textBold]}
      >
        {t("movie.content.cast")}
      </Typography>
      <List items={items} />
    </View>
  )
}

export default compose<ComponentType>(useMovieCredits)(PeopleComponent)
