import React from "react"

import { MovieType } from "types"

type Props = {
  movie: MovieType
}

const MovieCardComponent = ({ movie }: Props) => {
  return <>{movie.title}</>
}

export default MovieCardComponent
