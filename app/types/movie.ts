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

export interface PersonDetails {
  name: string
  biography: string
  birthday: string
  popularity: number
  profile_path: string
  gender: number
  imdb_id: string
}

export interface PersonMovieCredits {
  id: number
  cast: MovieCastPerson[]
  crew: MovieCrewPerson[]
}

export interface MovieCastPerson {
  id: number
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
  id: number
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
  id: number
  items: MovieCastPerson[]
}

export interface MovieResult {
  id: number
  title: string
  poster_path: string
}

export type MoviesListType = MovieResult[]

export interface PersonResult {
  id: number
  name: string
  profile_path: string
}

export type PeopleListType = PersonResult[]
