export const TMDB_JOB_DIRECTOR = "Director"
export const TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY = "Director of Photography"
export const TMDB_JOB_SCREENPLAY = "Screenplay"
export const TMDB_FEMALE_GENDER = 1
export const TMDB_MALE_GENDER = 2
export const TMDB_YOUTUBE_TYPE = "YouTube"
export const TMDB_TRAILER_TYPE = "Trailer"
export const TMDB_VIDEO_NOT_EMBEDDABLE = "not_embeddable"

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
}

export interface TMDBMovieVideo {
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

export interface TMDBSearchResult {
  id: number
  title: string
  release_date: string
  adult: boolean
  backdrop_path: string
  genre_ids: []
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  video: boolean
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
