import { it } from "@jest/globals"

import { Store } from "../../../support/redux/store"
import {
  movieDetailsSuccess,
  movieDetailsFailure,
  personDetailsFailure,
  personDetailsSuccess,
} from "../../../support/mockApi"

import { movieDetails, personDetails } from "redux/features/tmdb/tmdbThunk"
import { MOVIE_DETAILS } from "../../../support/mock/movie"
import { PERSON_DETAILS } from "../../../support/mock/person"

describe("movieDetails thunk", () => {
  const movieId = 438631

  describe("when fails movieDetails", () => {
    beforeEach(() => movieDetailsFailure(movieId))

    it("it failure fetch movie details", async () => {
      const result = await Store.dispatch(movieDetails(movieId))

      expect(result.type).toBe("tmdb/movie/details/rejected")
    })
  })

  describe("when success movieDetails", () => {
    beforeAll(() => movieDetailsSuccess(movieId))

    it("it successfully fetch movie details", async () => {
      const result = await Store.dispatch(movieDetails(movieId))
      const { payload } = result

      expect(result.type).toBe("tmdb/movie/details/fulfilled")
      expect(payload).toEqual(MOVIE_DETAILS)
    })
  })
})

describe("personDetails thunk", () => {
  const personId = 933238

  describe("when fails personDetails", () => {
    beforeEach(() => personDetailsFailure(personId))

    it("it failure fetch person details", async () => {
      const result = await Store.dispatch(personDetails(personId))

      expect(result.type).toBe("tmdb/person/details/rejected")
    })
  })

  describe("when success personDetails", () => {
    beforeAll(() => personDetailsSuccess(personId))

    it("it successfully fetch person details", async () => {
      const result = await Store.dispatch(personDetails(personId))
      const { payload } = result

      expect(result.type).toBe("tmdb/person/details/fulfilled")
      expect(payload).toEqual(PERSON_DETAILS)
    })
  })
})
