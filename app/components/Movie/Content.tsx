import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"

import { useMovieDetails } from "hocs"
import { layoutStyles, movieStyles } from "styles"
import { formatDate } from "helpers/formatDate"
import { formatRuntime } from "helpers/formatRuntime"
import Play from "components/Movie/Play"
import Actions from "components/Movie/Actions"
import Poster from "components/ui/Poster"
import Status from "components/ui/Status"
import Rating from "components/ui/Rating"
import Title from "components/ui/Title"
import Overview from "components/ui/Overview"
import Typography from "components/ui/Typography"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const {
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    runtime,
    status,
  } = item

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
          aside={
            <>{votes && <Rating size={20}>{vote_average.toFixed(1)}</Rating>}</>
          }
        >
          {title}
        </Title>

        <View style={movieStyles.row}>
          <Typography variant="headline" style={movieStyles.date}>
            {formatDate(release_date)}
          </Typography>
          <Typography variant="subhead" style={movieStyles.runtime}>
            {formatRuntime(runtime)}
          </Typography>
          <Status>{status}</Status>
        </View>

        <Actions item={item} />

        <Overview>{overview}</Overview>
      </View>
    </>
  )
}

export default compose<ComponentType>(useMovieDetails)(ContentComponent)
