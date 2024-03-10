import React from "react"

import { formatDate } from "helpers/formatDate"
import Typography from "components/ui/Typography"
import { tvStyles } from "styles"

type Props = {
  inProduction: boolean
  releaseDate: string
  endDate: string
}

const TvReleaseDateComponent = ({
  inProduction,
  releaseDate,
  endDate,
}: Props) => {
  return (
    <Typography variant="headline" style={tvStyles.date}>
      {inProduction ? (
        <>{formatDate(releaseDate, "d MMMM yyyy")}</>
      ) : (
        <>
          {formatDate(releaseDate, "dd.MM.yyyy")}
          &nbsp;&ndash;&nbsp;
          {formatDate(endDate, "dd.MM.yyyy")}
        </>
      )}
    </Typography>
  )
}

export default TvReleaseDateComponent
