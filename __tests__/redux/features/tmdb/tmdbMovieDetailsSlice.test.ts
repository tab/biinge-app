import { it } from "@jest/globals"

import {
  tmdbMovieDetailsSlice,
  initialState,
} from "redux/features/tmdb/tmdbMovieDetailsSlice"
import { MOVIE_DETAILS } from "../../../support/mock/movie"

describe("movieDetails reducer", () => {
  const movieId = 438631

  it("it returns the initial state", () => {
    expect(tmdbMovieDetailsSlice.reducer(undefined, { type: "" })).toEqual(
      initialState,
    )
  })

  it("it sets movieDetails fetching on tmdb/movie/details/pending action", () => {
    const state = {
      ...initialState,
      fetchStatus: {
        [movieId]: {
          isFetching: true,
          isSuccess: false,
          isFailed: false,
        },
        isFetching: false,
        isSuccess: false,
        isFailed: false,
      },
    }

    expect(
      tmdbMovieDetailsSlice.reducer(initialState, {
        type: "tmdb/movie/details/pending",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieDetails rejected on tmdb/movie/details/rejected action", () => {
    const state = {
      ...initialState,
      fetchStatus: {
        [movieId]: {
          isFetching: false,
          isSuccess: false,
          isFailed: true,
        },
        isFetching: false,
        isSuccess: false,
        isFailed: false,
      },
    }

    expect(
      tmdbMovieDetailsSlice.reducer(initialState, {
        type: "tmdb/movie/details/rejected",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieDetails fulfilled on tmdb/movie/details/fulfilled action", () => {
    const payload = MOVIE_DETAILS
    const state = {
      ...initialState,
      fetchStatus: {
        [movieId]: {
          isFetching: false,
          isSuccess: true,
          isFailed: false,
        },
        isFetching: false,
        isSuccess: false,
        isFailed: false,
      },
      entities: {
        [movieId]: payload,
      },
      ids: [movieId],
    }

    expect(
      tmdbMovieDetailsSlice.reducer(initialState, {
        type: "tmdb/movie/details/fulfilled",
        meta: { arg: movieId },
        payload,
      }),
    ).toEqual(state)
  })
})
