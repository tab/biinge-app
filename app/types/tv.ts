import { EntityId } from "@reduxjs/toolkit"

import { CastPerson, CrewPerson } from "types/person"
import { Video } from "types/video"

export interface TvShowDetails {
  id: number
  tmdbId: number
  imdbId: string
  title: string
  posterPath: string
  episodesCount: number
  status: string
  items: TvSeason[]
  credits: CastPerson[] | CrewPerson[]
  videos: Video[]
}

export interface TvSeasonDetails {
  id: number
  tmdbId: number
  tmdbShowId: number
  title: string
  number: number
  posterPath: string
  items: TvEpisode[]
}

export interface TvEpisodeDetails {
  id: number
  tmdbId: number
  tmdbSeasonId: number
  tmdbShowId: number
  title: string
  runtime: number
}

export interface TvSeason {
  id: number
  tmdbId: number
  tmdbShowId: number
  title: string
  number: number
  posterPath: string
  items: TvEpisode[]
}

export interface TvEpisode {
  id: number
  tmdbId: number
  tmdbSeasonId: number
  tmdbShowId: number
  title: string
  runtime: number
}

export interface TvRecommendation {
  id: EntityId
  title: string
  posterPath: string
}

export interface TvRecommendations {
  id: EntityId
  items: TvRecommendation[]
}
