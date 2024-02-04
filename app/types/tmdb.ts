import { EntityId } from "@reduxjs/toolkit"

export const TMDB_JOB_DIRECTOR = "Director"
export const TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY = "Director of Photography"
export const TMDB_JOB_SCREENPLAY = "Screenplay"
export const TMDB_JOB_EXECUTIVE_PRODUCER = "Executive Producer"
export const TMDB_JOB_WRITER = "Writer"
export const TMDB_FEMALE_GENDER = 1
export const TMDB_MALE_GENDER = 2
export const TMDB_YOUTUBE_TYPE = "YouTube"
export const TMDB_TRAILER_TYPE = "Trailer"
export const TMDB_VIDEO_NOT_EMBEDDABLE = "not_embeddable"
export const TMDB_TV_GENRE_TALK_ID = 10767
export const TMDB_TV_GENRE_NEWS_ID = 10763
export const TMDB_TV_GENRE_REALITY_ID = 10764
export const TMDB_TV_GENRE_DOCUMENTARY_ID = 99

export const TMDB_TV_EXCLUDED_GENRE_IDS = [
  TMDB_TV_GENRE_TALK_ID,
  TMDB_TV_GENRE_NEWS_ID,
  TMDB_TV_GENRE_REALITY_ID,
  TMDB_TV_GENRE_DOCUMENTARY_ID,
]

export interface TMDBMovieResult {
  id: EntityId
  title: string
  poster_path: string
}

export type TMDBMovieListType = TMDBMovieResult[]

export interface TMDBTvResult {
  id: EntityId
  name: string
  poster_path: string
}

export type TMDBTvListType = TMDBTvResult[]

export interface TMDBPersonResult {
  id: EntityId
  name: string
  profile_path: string
}

export type TMDBPersonListType = TMDBPersonResult[]

export interface TMDBMovieDetails {
  id: number
  title: string
  tagline: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  imdb_id: string
  budget: number
  genres: []
  release_date: string
  homepage: string
  original_language: string
  original_title: string
  popularity: number
  revenue: number
  runtime: number
  status: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBPersonCast {
  id: number
  name: string
  biography: string
  adult: boolean
  profile_path: string
  popularity: number
  character: string
  order: number
}

export interface TMDBPersonCrew {
  id: number
  name: string
  biography: string
  adult: boolean
  profile_path: string
  popularity: number
  department: string
  job: string
}

export interface TMDBMovieCast {
  id: number
  title: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  release_date: string
  original_language: string
  original_title: string
  popularity: number
  vote_average: number
  vote_count: number
  character: string
  job?: string
  order: number
}

export interface TMDBMovieCrew {
  id: number
  title: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  release_date: string
  original_language: string
  original_title: string
  popularity: number
  vote_average: number
  vote_count: number
  department: string
  job: string
  character?: string
}

export interface TMDBVideo {
  id: number
  name: string
  key: string
  site: string
  size: number
  type: string
  official: true
  published_at: string
  iso_3166_1: string
  iso_639_1: string
}

export interface TMDBTvDetails {
  id: number
  name: string
  tagline: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  genres: []
  seasons: []
  first_air_date: string
  last_air_date: string
  number_of_seasons: number
  number_of_episodes: number
  homepage: string
  original_language: string
  original_name: string
  popularity: number
  status: string
  in_production: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBTvSeason {
  id: number
  name: string
  poster_path: string
  season_number: number
}

export interface TMDBTvEpisode {
  id: number
  name: string
  air_date: string
  runtime: number
  vote_average: number
  vote_count: number
  still_path: string
}

export interface TMDBTvCast {
  id: number
  name: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  first_air_date: string
  original_language: string
  original_name: string
  popularity: number
  vote_average: number
  vote_count: number
  character: string
  episode_count: number
  genre_ids: number[]
}

export interface TMDBTvCrew {
  id: number
  name: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  first_air_date: string
  original_language: string
  original_name: string
  popularity: number
  vote_average: number
  vote_count: number
  department: string
  job: string
  genre_ids: number[]
  episode_count: number
}

export interface TMDBRecommendation {
  id: number
  title: string
  overview: string
  adult: boolean
  backdrop_path: string
  poster_path: string
  release_date: string
  original_language: string
  original_title: string
  popularity: number
  vote_average: number
  vote_count: number
}

export type TMDBPosterSizeType =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original"
