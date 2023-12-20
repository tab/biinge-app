import MockAdapter from "axios-mock-adapter"

import { TMDB_API, LANG } from "redux/api/tmdb"
import {
  TMDB_MOVIE_DETAILS,
  TMDB_MOVIE_CREDITS,
  TMDB_MOVIE_RECOMMENDATIONS,
  TMDB_MOVIE_VIDEOS,
} from "./mock/movie"
import { TMDB_PERSON_DETAILS, TMDB_PERSON_MOVIE_CREDITS } from "./mock/person"

const mock = new MockAdapter(TMDB_API)

export const movieDetailsFailure = (movieId: number) => {
  mock.onGet(`/movie/${movieId}?language=${LANG}`).reply(401, {})
}

export const movieDetailsSuccess = (movieId: number) => {
  mock
    .onGet(`/movie/${movieId}?language=${LANG}`)
    .reply(200, TMDB_MOVIE_DETAILS)
}

export const movieCreditsFailure = (movieId: number) => {
  mock.onGet(`/movie/${movieId}/credits?language=${LANG}`).reply(401, {})
}

export const movieCreditsSuccess = (movieId: number) => {
  mock
    .onGet(`/movie/${movieId}/credits?language=${LANG}`)
    .reply(200, TMDB_MOVIE_CREDITS)
}

export const movieRecommendationsFailure = (movieId: number) => {
  mock
    .onGet(
      `/movie/${movieId}/recommendations?include_adult=false&language=${LANG}`,
    )
    .reply(401, {})
}

export const movieRecommendationsSuccess = (movieId: number) => {
  mock
    .onGet(
      `/movie/${movieId}/recommendations?include_adult=false&language=${LANG}`,
    )
    .reply(200, TMDB_MOVIE_RECOMMENDATIONS)
}

export const movieVideosFailure = (movieId: number) => {
  mock.onGet(`/movie/${movieId}/videos?language=${LANG}`).reply(401, {})
}

export const movieVideosSuccess = (movieId: number) => {
  mock
    .onGet(`/movie/${movieId}/videos?language=${LANG}`)
    .reply(200, TMDB_MOVIE_VIDEOS)
}

export const personDetailsFailure = (personId: number) => {
  mock.onGet(`/person/${personId}?language=${LANG}`).reply(401, {})
}

export const personDetailsSuccess = (personId: number) => {
  mock
    .onGet(`/person/${personId}?language=${LANG}`)
    .reply(200, TMDB_PERSON_DETAILS)
}

export const personMovieCreditsFailure = (personId: number) => {
  mock.onGet(`/person/${personId}/credits?language=${LANG}`).reply(401, {})
}

export const personMovieCreditsSuccess = (personId: number) => {
  mock
    .onGet(`/person/${personId}/credits?language=${LANG}`)
    .reply(200, TMDB_PERSON_MOVIE_CREDITS)
}
