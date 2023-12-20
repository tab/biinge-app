import { it } from "@jest/globals"

import {
  tmdbMovieCreditsSlice,
  initialState,
} from "redux/features/tmdb/tmdbMovieCreditsSlice"
import { MOVIE_CREDITS } from "../../../support/mock/movie"

describe("movieCredits reducer", () => {
  const movieId = 438631

  it("it returns the initial state", () => {
    expect(tmdbMovieCreditsSlice.reducer(undefined, { type: "" })).toEqual(
      initialState,
    )
  })

  it("it sets movieCredits fetching on tmdb/movie/credits/pending action", () => {
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
      tmdbMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/movie/credits/pending",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits rejected on tmdb/movie/credits/rejected action", () => {
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
      tmdbMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/movie/credits/rejected",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits fulfilled on tmdb/movie/credits/fulfilled action", () => {
    const payload = MOVIE_CREDITS
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
      tmdbMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/movie/credits/fulfilled",
        meta: { arg: movieId },
        payload,
      }),
    ).toEqual(state)
  })
})
