import { it } from "@jest/globals"

import { Store } from "../../../support/redux/store"
import {
  movieDetailsSuccess,
  movieDetailsFailure,
  movieCreditsFailure,
  movieCreditsSuccess,
  movieRecommendationsFailure,
  movieRecommendationsSuccess,
  movieVideosFailure,
  movieVideosSuccess,
  personDetailsFailure,
  personDetailsSuccess,
  personMovieCreditsFailure,
  personMovieCreditsSuccess,
} from "../../../support/mockApi"
import {
  MOVIE_DETAILS,
  MOVIE_CREDITS,
  MOVIE_RECOMMENDATIONS,
  MOVIE_VIDEOS,
} from "../../../support/mock/movie"

import {
  movieDetails,
  movieCredits,
  movieRecommendations,
  movieVideos,
  personDetails,
  personMovieCredits,
} from "redux/features/tmdb/tmdbThunk"
import {
  PERSON_DETAILS,
  PERSON_MOVIE_CREDITS,
} from "../../../support/mock/person"

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

describe("movieCredits thunk", () => {
  const movieId = 438631

  describe("when fails movieCredits", () => {
    beforeEach(() => movieCreditsFailure(movieId))

    it("it failure fetch movie credits", async () => {
      const result = await Store.dispatch(movieCredits(movieId))

      expect(result.type).toBe("tmdb/movie/credits/rejected")
    })
  })

  describe("when success movieCredits", () => {
    beforeAll(() => movieCreditsSuccess(movieId))

    it("it successfully fetch movie credits", async () => {
      const result = await Store.dispatch(movieCredits(movieId))
      const { payload } = result

      expect(result.type).toBe("tmdb/movie/credits/fulfilled")
      expect(payload).toEqual(MOVIE_CREDITS)
    })
  })
})

describe("movieRecommendations thunk", () => {
  const movieId = 438631

  describe("when fails movieRecommendations", () => {
    beforeEach(() => movieRecommendationsFailure(movieId))

    it("it failure fetch movie recommendations", async () => {
      const result = await Store.dispatch(movieRecommendations(movieId))

      expect(result.type).toBe("tmdb/movie/recommendations/rejected")
    })
  })

  describe("when success movieRecommendations", () => {
    beforeAll(() => movieRecommendationsSuccess(movieId))

    it("it successfully fetch movie recommendations", async () => {
      const result = await Store.dispatch(movieRecommendations(movieId))
      const { payload } = result

      expect(result.type).toBe("tmdb/movie/recommendations/fulfilled")
      expect(payload).toEqual(MOVIE_RECOMMENDATIONS)
    })
  })
})

describe("movieVideos thunk", () => {
  const movieId = 438631

  describe("when fails movieVideos", () => {
    beforeEach(() => movieVideosFailure(movieId))

    it("it failure fetch movie videos", async () => {
      const result = await Store.dispatch(movieVideos(movieId))

      expect(result.type).toBe("tmdb/movie/videos/rejected")
    })
  })

  describe("when success movieVideos", () => {
    beforeAll(() => movieVideosSuccess(movieId))

    it("it successfully fetch movie videos", async () => {
      const result = await Store.dispatch(movieVideos(movieId))
      const { payload } = result

      expect(result.type).toBe("tmdb/movie/videos/fulfilled")
      expect(payload).toEqual(MOVIE_VIDEOS)
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

describe("personMovieCredits thunk", () => {
  const personId = 933238

  describe("when fails personMovieCredits", () => {
    beforeEach(() => personMovieCreditsFailure(personId))

    it("it failure fetch person movie credits", async () => {
      const result = await Store.dispatch(personMovieCredits(personId))

      expect(result.type).toBe("tmdb/person/movieCredits/rejected")
    })
  })

  describe("when success personMovieCredits", () => {
    beforeAll(() => personMovieCreditsSuccess(personId))

    it("it successfully fetch person movie credits", async () => {
      const result = await Store.dispatch(personMovieCredits(personId))
      const { payload } = result

      expect(result.type).toBe("tmdb/person/movieCredits/fulfilled")
      expect(payload).toEqual(PERSON_MOVIE_CREDITS)
    })
  })
})
