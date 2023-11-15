import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useMovieDetails } from "hocs"
import { layoutStyles, movieStyles } from "styles"
import { formatDate } from "helpers/formatDate"
import Poster from "components/Movie/Poster"
import Play from "components/Movie/Play"
import Status from "components/Movie/Status"
import Rating from "components/Movie/Rating"
import Actions from "components/Movie/Actions"
import Title from "components/ui/Title"
import Typography from "components/ui/Typography"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const { t } = useTranslation()

  const { title, overview, poster_path, vote_average, release_date, status } =
    item

  const votes = vote_average > 0

  return (
    <>
      <Poster poster_path={poster_path} />
      {/* @ts-ignore */}
      <Play id={item.id} />

      <View
        style={[
          layoutStyles.roundCorners,
          movieStyles.root,
          movieStyles.content,
        ]}
      >
        <Title
          aside={<>{votes && <Rating>{vote_average.toFixed(1)}</Rating>}</>}
        >
          {title}
        </Title>

        <View style={movieStyles.row}>
          <Typography variant="headline" style={movieStyles.date}>
            {formatDate(release_date)}
          </Typography>
          <Status>{status}</Status>
        </View>

        <Actions item={item} />

        <View style={movieStyles.overview}>
          <Typography variant="callout" style={movieStyles.overviewTitle}>
            {t("movie.content.overview")}
          </Typography>
          <Typography variant="body">{overview}</Typography>
        </View>
      </View>
    </>
  )
}

export default compose<ComponentType>(useMovieDetails)(ContentComponent)
