import { EntityId } from "@reduxjs/toolkit"

import { CastPerson, CrewPerson } from "types/person"
import { Video } from "types/video"

export interface TvDetails {
  id: EntityId
  tmdb_id: number
  title: string
  tagline: string
  overview: string
  backdrop_path: string
  poster_path: string
  homepage: string
  popularity: number
  status: string
  in_production: boolean
  release_date: string
  end_date: string
  first_air_date: string
  last_air_date: string
  next_episode_to_air: string
  vote_average: number
  vote_count: number
  number_of_seasons: number
  number_of_episodes: number
  seasons: TvSeason[]
  credits: CastPerson[] | CrewPerson[]
  videos: Video[]
}

export interface TvShow {
  id: number
  tmdb_id: number
  title: string
  status: string
  poster_path: string
  number_of_seasons: number
  number_of_episodes: number
  items: TvSeason[]
}

export interface TvSeason {
  id: number
  tmdb_id: number
  tmdb_show_id: number
  title: string
  number: number
  poster_path: string
  items: TvEpisode[]
}

export interface TvSeasons {
  id: EntityId
  items: TvSeason[]
}

export interface TvEpisode {
  id: number
  tmdb_id: number
  tmdb_season_id: number
  tmdb_show_id: number
  title: string
  air_date: string
  runtime: number
  vote_average: number
  vote_count: number
}

export interface TvRecommendation {
  id: EntityId
  title: string
  poster_path: string
}

export interface TvRecommendations {
  id: EntityId
  items: TvRecommendation[]
}
