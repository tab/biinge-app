import { EntityId } from "@reduxjs/toolkit"

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
}

export interface PersonDetails {
  id: EntityId
  name: string
  biography: string
  birthday: string
  popularity: number
  profile_path: string
  gender: number
  imdb_id: string
}

export interface PersonMovieCredits {
  id: EntityId
  cast: MovieCastPerson[]
  crew: MovieCrewPerson[]
}

export interface MovieCastPerson {
  id: EntityId
  gender: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  order: number
}

export interface MovieCrewPerson {
  id: EntityId
  gender: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  department: string
  job: string
}

export interface MovieCredits {
  id: EntityId
  items: MovieCastPerson[]
}

export interface MovieVideo {
  id: EntityId
  name: string
  key: string
  published_at: string
}

export interface MovieVideos {
  id: EntityId
  items: MovieVideo[]
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

export interface MovieResult {
  id: EntityId
  title: string
  poster_path: string
}

export type MoviesListType = MovieResult[]

export interface PersonResult {
  id: EntityId
  name: string
  profile_path: string
}

export type PeopleListType = PersonResult[]
