import { it } from "@jest/globals"

import {
  tmdbMovieRecommendationsSlice,
  initialState,
} from "redux/features/tmdb/tmdbMovieRecommendationsSlice"
import { MOVIE_RECOMMENDATIONS } from "../../../support/mock/movie"

describe("movieRecommendations reducer", () => {
  const movieId = 438631

  it("it returns the initial state", () => {
    expect(
      tmdbMovieRecommendationsSlice.reducer(undefined, { type: "" }),
    ).toEqual(initialState)
  })

  it("it sets movieCredits fetching on tmdb/movie/recommendations/pending action", () => {
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
      tmdbMovieRecommendationsSlice.reducer(initialState, {
        type: "tmdb/movie/recommendations/pending",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits rejected on tmdb/movie/recommendations/rejected action", () => {
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
      tmdbMovieRecommendationsSlice.reducer(initialState, {
        type: "tmdb/movie/recommendations/rejected",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits fulfilled on tmdb/movie/recommendations/fulfilled action", () => {
    const payload = MOVIE_RECOMMENDATIONS
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
      tmdbMovieRecommendationsSlice.reducer(initialState, {
        type: "tmdb/movie/recommendations/fulfilled",
        meta: { arg: movieId },
        payload,
      }),
    ).toEqual(state)
  })
})
