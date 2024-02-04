import { EntityId } from "@reduxjs/toolkit"

import { CastPerson, CrewPerson } from "types/person"
import { Video } from "types/video"

export interface MovieDetails {
  id: EntityId
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
  vote_count: number
  credits: CastPerson[] | CrewPerson[]
  videos: Video[]
}

export interface MovieRecommendation {
  id: EntityId
  title: string
  poster_path: string
}

export interface MovieRecommendations {
  id: EntityId
  items: MovieRecommendation[]
}
