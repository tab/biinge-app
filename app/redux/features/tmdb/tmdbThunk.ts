import { createAsyncThunk } from "@reduxjs/toolkit"
import { parseISO } from "date-fns"

import { TMDB_API, LANG } from "redux/api/tmdb"
import {
  MovieRecommendation,
  MovieResult,
  PersonResult,
  TMDBMovieCast,
  TMDBMovieCrew,
  TMDBMovieVideo,
  TMDBPersonCast,
  TMDBPersonCrew,
  TMDB_JOB_DIRECTOR,
  TMDB_TRAILER_TYPE,
  TMDB_YOUTUBE_TYPE,
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
      runtime,
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
      runtime,
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

// NOTE: Movie screen, trailer
export const movieVideos = createAsyncThunk(
  "tmdb/movie/videos",
  async (id: number) => {
    const response = await TMDB_API.get(`/movie/${id}/videos?language=${LANG}`)
    const { results } = response.data

    const filteredVideos = results
      .filter(({ official }: TMDBMovieVideo) => official)
      .filter(({ site }: TMDBMovieVideo) => site === TMDB_YOUTUBE_TYPE)
      .filter(({ type }: TMDBMovieVideo) => type === TMDB_TRAILER_TYPE)
      .map(({ id, name, key, published_at }: TMDBMovieVideo) => {
        return {
          id,
          tmdb_id: id,
          name,
          key,
          published_at,
        }
      })

    return {
      id,
      items: filteredVideos,
    }
  },
)

// NOTE: Movie screen, trailer
export const movieRecommendations = createAsyncThunk(
  "tmdb/movie/recommendations",
  async (id: number) => {
    const response = await TMDB_API.get(
      `/movie/${id}/recommendations?include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    const filteredRecommendations = results
      .filter(({ poster_path }: MovieRecommendation) => poster_path)
      .map(({ id, title, poster_path }: MovieRecommendation) => {
        return {
          id,
          tmdb_id: id,
          title,
          poster_path,
        }
      })

    return {
      id,
      items: filteredRecommendations,
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
export const trendingMovie = createAsyncThunk(
  "tmdb/trending/movie",
  async () => {
    const response = await TMDB_API.get(
      `/trending/movie/week?include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ poster_path }: MovieResult) => poster_path)
      .map(({ id, title, poster_path }: MovieResult) => {
        return {
          id,
          tmdb_id: id,
          title,
          poster_path,
        }
      })
  },
)

export const trendingPeople = createAsyncThunk(
  "tmdb/trending/people",
  async () => {
    const response = await TMDB_API.get(
      `/trending/person/week?include_adult=false&language=${LANG}`,
    )
    const results = response.data.results

    return results
      .filter(({ profile_path }: PersonResult) => profile_path)
      .map(({ id, name, profile_path }: PersonResult) => {
        return {
          id,
          tmdb_id: id,
          name,
          profile_path,
        }
      })
  },
)

export const movieSearch = createAsyncThunk(
  "tmdb/movie/search",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/movie?query=${query}&include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ poster_path }: MovieResult) => poster_path)
      .map(({ id, title, poster_path }: MovieResult) => {
        return {
          id,
          tmdb_id: id,
          title,
          poster_path,
        }
      })
  },
)

export const personSearch = createAsyncThunk(
  "tmdb/person/search",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/person?query=${query}&include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ profile_path }: PersonResult) => profile_path)
      .map(({ id, name, profile_path }: PersonResult) => {
        return {
          id,
          tmdb_id: id,
          name,
          profile_path,
        }
      })
  },
)

export const resetResults = createAsyncThunk("tmdb/results/reset", async () => {
  return []
})
