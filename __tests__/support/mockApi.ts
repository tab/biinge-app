import MockAdapter from "axios-mock-adapter"

import { TMDB_API, LANG } from "redux/api/tmdb"
import { TMDB_MOVIE_DETAILS } from "./mock/movie"
import { TMDB_PERSON_DETAILS } from "./mock/person"

const mock = new MockAdapter(TMDB_API)

export const movieDetailsFailure = (movieId: number) => {
  mock
    .onGet(
      `/movie/${movieId}?language=${LANG}&append_to_response=credits,recommendations,videos`,
    )
    .reply(401, {})
}

export const movieDetailsSuccess = (movieId: number) => {
  mock
    .onGet(
      `/movie/${movieId}?language=${LANG}&append_to_response=credits,recommendations,videos`,
    )
    .reply(200, TMDB_MOVIE_DETAILS)
}

export const personDetailsFailure = (personId: number) => {
  mock
    .onGet(
      `/person/${personId}?language=${LANG}&append_to_response=credits,tv_credits`,
    )
    .reply(401, {})
}

export const personDetailsSuccess = (personId: number) => {
  mock
    .onGet(
      `/person/${personId}?language=${LANG}&append_to_response=credits,tv_credits`,
    )
    .reply(200, TMDB_PERSON_DETAILS)
}
