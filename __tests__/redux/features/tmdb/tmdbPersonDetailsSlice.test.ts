import { it } from "@jest/globals"

import {
  tmdbPersonDetailsSlice,
  initialState,
} from "redux/features/tmdb/tmdbPersonDetailsSlice"
import { PERSON_DETAILS } from "../../../support/mock/person"

describe("personDetails reducer", () => {
  const personId = 933238

  it("it returns the initial state", () => {
    expect(tmdbPersonDetailsSlice.reducer(undefined, { type: "" })).toEqual(
      initialState,
    )
  })

  it("it sets personDetails fetching on tmdb/person/details/pending action", () => {
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
      tmdbPersonDetailsSlice.reducer(initialState, {
        type: "tmdb/person/details/pending",
        meta: { arg: personId },
      }),
    ).toEqual(state)
  })

  it("it sets personDetails rejected on tmdb/person/details/rejected action", () => {
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
      tmdbPersonDetailsSlice.reducer(initialState, {
        type: "tmdb/person/details/rejected",
        meta: { arg: personId },
      }),
    ).toEqual(state)
  })

  it("it sets personDetails fulfilled on tmdb/person/details/fulfilled action", () => {
    const payload = PERSON_DETAILS
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
      tmdbPersonDetailsSlice.reducer(initialState, {
        type: "tmdb/person/details/fulfilled",
        meta: { arg: personId },
        payload,
      }),
    ).toEqual(state)
  })
})
