import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"

import { useTvDetails } from "hocs"
import { layoutStyles, tvStyles } from "styles"
import { formatDate } from "helpers/formatDate"
import Play from "components/Tv/Play"
import Actions from "components/Tv/Actions"
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
    end_date,
    status,
    in_production,
  } = item

  const votes = vote_average > 0

  return (
    <>
      <Poster poster_path={poster_path} />
      {/* @ts-ignore */}
      <Play id={item.id} />

      <View
        style={[layoutStyles.roundCorners, tvStyles.root, tvStyles.content]}
      >
        <Title
          aside={
            <>{votes && <Rating size={20}>{vote_average.toFixed(1)}</Rating>}</>
          }
        >
          {title}
        </Title>

        <View style={tvStyles.row}>
          <Typography variant="headline" style={tvStyles.date}>
            {in_production ? (
              <>{formatDate(release_date, "d MMMM yyyy")}</>
            ) : (
              <>
                {formatDate(release_date, "dd.MM.yyyy")}
                &nbsp;&ndash;&nbsp;
                {formatDate(end_date, "dd.MM.yyyy")}
              </>
            )}
          </Typography>
          <Status>{status}</Status>
        </View>

        <Actions item={item} />

        <Overview>{overview}</Overview>
      </View>
    </>
  )
}

export default compose<ComponentType>(useTvDetails)(ContentComponent)
