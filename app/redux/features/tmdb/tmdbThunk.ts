import { createAsyncThunk } from "@reduxjs/toolkit"

import { TMDB_API, LANG } from "redux/api/tmdb"
import { TMDBSearchResult } from "types"

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
