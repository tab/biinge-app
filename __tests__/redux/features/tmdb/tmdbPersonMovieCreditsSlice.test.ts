import { it } from "@jest/globals"

import {
  tmdbPersonMovieCreditsSlice,
  initialState,
} from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"
import { PERSON_MOVIE_CREDITS } from "../../../support/mock/person"

describe("personMovieCredits reducer", () => {
  const personId = 933238

  it("it returns the initial state", () => {
    expect(
      tmdbPersonMovieCreditsSlice.reducer(undefined, { type: "" }),
    ).toEqual(initialState)
  })

  it("it sets movieCredits fetching on tmdb/person/movieCredits/pending action", () => {
    const state = {
      ...initialState,
      fetchStatus: {
        [personId]: {
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
      tmdbPersonMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/person/movieCredits/pending",
        meta: { arg: personId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits rejected on tmdb/person/movieCredits/rejected action", () => {
    const state = {
      ...initialState,
      fetchStatus: {
        [personId]: {
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
      tmdbPersonMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/person/movieCredits/rejected",
        meta: { arg: personId },
      }),
    ).toEqual(state)
  })

  it("it sets movieCredits fulfilled on tmdb/person/movieCredits/fulfilled action", () => {
    const payload = PERSON_MOVIE_CREDITS
    const state = {
      ...initialState,
      fetchStatus: {
        [personId]: {
          isFetching: false,
          isSuccess: true,
          isFailed: false,
        },
        isFetching: false,
        isSuccess: false,
        isFailed: false,
      },
      entities: {
        [personId]: payload,
      },
      ids: [personId],
    }

    expect(
      tmdbPersonMovieCreditsSlice.reducer(initialState, {
        type: "tmdb/person/movieCredits/fulfilled",
        meta: { arg: personId },
        payload,
      }),
    ).toEqual(state)
  })
})
