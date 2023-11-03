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
