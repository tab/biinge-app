import { EntityId } from "@reduxjs/toolkit"

import { CastPerson, CrewPerson } from "types/person"
import { Video } from "types/video"

export interface MovieListItem {
  id: number
  tmdbId: number
  title: string
  posterPath: string
}

export interface MovieDetails {
  id: number
  tmdbId: number
  imdbId: string
  title: string
  tagline: string
  overview: string
  posterPath: string
  homepage: string
  popularity: number
  status: string
  releaseDate: string
  rating: number
  runtime: number
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
