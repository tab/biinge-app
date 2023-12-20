import { it } from "@jest/globals"

import {
  tmdbMovieVideosSlice,
  initialState,
} from "redux/features/tmdb/tmdbMovieVideosSlice"
import { MOVIE_VIDEOS } from "../../../support/mock/movie"

describe("movieVideos reducer", () => {
  const movieId = 438631

  it("it returns the initial state", () => {
    expect(tmdbMovieVideosSlice.reducer(undefined, { type: "" })).toEqual(
      initialState,
    )
  })

  it("it sets movieCredits fetching on tmdb/movie/videos/pending action", () => {
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
      tmdbMovieVideosSlice.reducer(initialState, {
        type: "tmdb/movie/videos/pending",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits rejected on tmdb/movie/videos/rejected action", () => {
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
      tmdbMovieVideosSlice.reducer(initialState, {
        type: "tmdb/movie/videos/rejected",
        meta: { arg: movieId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits fulfilled on tmdb/movie/videos/fulfilled action", () => {
    const payload = MOVIE_VIDEOS
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
      tmdbMovieVideosSlice.reducer(initialState, {
        type: "tmdb/movie/videos/fulfilled",
        meta: { arg: movieId },
        payload,
      }),
    ).toEqual(state)
  })
})
