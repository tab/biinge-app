import React from "react"

import { formatDate } from "helpers/formatDate"
import Typography from "components/ui/Typography"
import { tvStyles } from "styles"

type Props = {
  in_production: boolean
  release_date: string
  end_date: string
}

const TvReleaseDateComponent = ({
  in_production,
  release_date,
  end_date,
}: Props) => {
  return (
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
  )
}

export default TvReleaseDateComponent
