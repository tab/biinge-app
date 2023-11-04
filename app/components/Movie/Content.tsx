import React from "react"
import { View, Text } from "react-native"
import { useTranslation } from "react-i18next"

import { layoutStyles, contentStyles, movieStyles } from "styles"
import { formatDate } from "helpers/formatDate"
import Status from "components/Movie/Status"
import Rating from "components/Movie/Rating"
import Actions from "components/Movie/Actions"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const { t } = useTranslation()

  const { title, overview, vote_average, release_date, status } = item

  const votes = vote_average > 0

  return (
    <View style={layoutStyles.content}>
      <View style={[movieStyles.row, movieStyles.rowTitle]}>
        <Text
          style={[
            movieStyles.title,
            votes ? movieStyles.short : movieStyles.full,
          ]}
        >
          {title}
        </Text>
        {votes && <Rating>{vote_average.toFixed(1)}</Rating>}
      </View>
      <View style={movieStyles.row}>
        <Text style={movieStyles.date}>{formatDate(release_date)}</Text>
        <Status>{status}</Status>
      </View>

      <Actions item={item} />

      <View style={movieStyles.overview}>
        <Text style={contentStyles.textBold}>
          {t("movie.content.overview")}
        </Text>
        <Text style={contentStyles.text}>{overview}</Text>
      </View>
    </View>
  )
}

export default ContentComponent
