import { BSON } from "realm"

export interface MovieDetails {
  _id: BSON.ObjectId
  tmdb_id: number
  imdb_id: string
  title: string
  tagline: string
  overview: string
  backdrop_path: string
  poster_path: string
  homepage: string
  popularity: number
  status: string
  release_date: string
  vote_average: number
  want: boolean
  watched: boolean
}
