import { createAsyncThunk } from "@reduxjs/toolkit"
import { parseISO } from "date-fns"

import { TMDB_API, LANG } from "redux/api/tmdb"
import {
  TMDBSearchResult,
  TMDBMovieCast,
  TMDBMovieCrew,
  TMDBPersonCast,
  TMDBPersonCrew,
  TMDB_JOB_DIRECTOR,
} from "types"

// NOTE: Movie screen
export const movieDetails = createAsyncThunk(
  "tmdb/movie/details",
  async (id: number) => {
    const response = await TMDB_API.get(`/movie/${id}?language=${LANG}`)
    const {
      title,
      tagline,
      overview,
      backdrop_path,
      poster_path,
      homepage,
      popularity,
      status,
      imdb_id,
      release_date,
      vote_average,
      vote_count,
    } = response.data

    return {
      id,
      title,
      tagline,
      overview,
      backdrop_path,
      poster_path,
      homepage,
      popularity,
      status,
      imdb_id,
      release_date,
      vote_average,
      vote_count,
    }
  },
)

// NOTE: Movie screen, people list
export const movieCredits = createAsyncThunk(
  "tmdb/movie/credits",
  async (id: number) => {
    const response = await TMDB_API.get(`/movie/${id}/credits?language=${LANG}`)
    const { cast, crew } = response.data

    const filteredCast = cast
      .filter(({ profile_path }: TMDBPersonCast) => profile_path)
      .map(({ id, profile_path, name, character }: TMDBPersonCast) => {
        return {
          id,
          tmdb_id: id,
          profile_path,
          name,
          description: character,
        }
      })

    const filteredCrew = crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) => [TMDB_JOB_DIRECTOR].includes(job))
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdb_id: id,
          profile_path,
          name,
          description: job,
        }
      })

    return {
      id,
      items: [...filteredCrew, ...filteredCast],
    }
  },
)

// NOTE: Person screen
export const personDetails = createAsyncThunk(
  "tmdb/person/details",
  async (id: number) => {
    const response = await TMDB_API.get(`/person/${id}?language=${LANG}`)
    const { name, birthday, profile_path, gender, imdb_id } = response.data

    return {
      id,
      tmdb_id: id,
      imdb_id,
      name,
      birthday,
      profile_path,
      gender,
    }
  },
)

const filterCredits = (items: (TMDBMovieCast | TMDBMovieCrew)[]): any[] => {
  return items
    .filter(({ adult }: TMDBMovieCast | TMDBMovieCrew) => !adult)
    .filter(({ poster_path }: TMDBMovieCast | TMDBMovieCrew) => poster_path)
    .filter(({ release_date }: TMDBMovieCast | TMDBMovieCrew) => release_date)
    .sort(
      (a: TMDBMovieCast | TMDBMovieCrew, b: TMDBMovieCast | TMDBMovieCrew) => {
        return (
          parseISO(b.release_date).getTime() -
          parseISO(a.release_date).getTime()
        )
      },
    )
    .map(({ id, poster_path, title }: TMDBMovieCast | TMDBMovieCrew) => {
      return {
        id,
        tmdb_id: id,
        title,
        poster_path,
      }
    })
}

// NOTE: Person screen, movies list
export const personMovieCredits = createAsyncThunk(
  "tmdb/person/movieCredits",
  async (id: number) => {
    const response = await TMDB_API.get(
      `/person/${id}/credits?language=${LANG}`,
    )
    const { cast, crew } = response.data

    return {
      id,
      cast: filterCredits(cast),
      crew: filterCredits(
        crew.filter(({ job }: TMDBPersonCrew) =>
          [TMDB_JOB_DIRECTOR].includes(job),
        ),
      ),
    }
  },
)

// NOTE: Search screen
export const searchMovie = createAsyncThunk(
  "tmdb/search/movie",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/movie?query=${query}&include_adult=false&language=${LANG}`,
    )
    const results = response.data.results

    return results
      .filter(({ poster_path }: TMDBSearchResult) => poster_path)
      .map(({ id, title, poster_path }: TMDBSearchResult) => {
        return {
          id,
          title,
          poster_path,
        }
      })
  },
)

export const resetSearchResults = createAsyncThunk(
  "tmdb/search/reset",
  async () => {
    return []
  },
)
