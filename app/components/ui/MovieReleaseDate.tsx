import React from "react"

import { formatDate } from "helpers/formatDate"
import Typography from "components/ui/Typography"
import { movieStyles } from "styles"

type Props = {
  children: string
}

const MovieReleaseDateComponent = ({ children }: Props) => {
  return (
    <Typography variant="headline" style={movieStyles.date}>
      {formatDate(children)}
    </Typography>
  )
}

export default MovieReleaseDateComponent
