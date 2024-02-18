import React from "react"

import { formatRuntime } from "helpers/formatRuntime"
import Typography from "components/ui/Typography"
import { movieStyles } from "styles"

type Props = {
  children: number
}

const MovieReleaseDateComponent = ({ children }: Props) => {
  return (
    <Typography variant="subhead" style={movieStyles.runtime}>
      {formatRuntime(children)}
    </Typography>
  )
}

export default MovieReleaseDateComponent
