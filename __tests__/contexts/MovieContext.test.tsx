import React from "react"
import "react-native"
import { act } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Realm from "realm"

import {
  openRealm,
  closeRealm,
  renderWithRealm,
} from "../support/renderWithRealm"
import { MovieContext } from "contexts/MovieContext"
import { TMDBMovieDetails } from "types"

describe("MovieProvider", () => {
  const item: TMDBMovieDetails = {
    id: 123,
    title: "Test Movie",
    tagline: "Test tagline",
    overview: "Test overview",
    adult: false,
    backdrop_path: "Test path",
    poster_path: "Test path",
    imdb_id: "tt1234567",
    budget: 1000000,
    genres: [],
    release_date: "2022-01-01",
    homepage: "https://testmovie.com",
    original_language: "en",
    original_title: "Test Movie",
    popularity: 10.0,
    revenue: 2000000,
    runtime: 120,
    status: "Released",
    video: false,
    vote_average: 7.5,
    vote_count: 1000,
  }

  const payload = {
    ...item,
    userId: "1",
    tmdb_id: item.id,
    pin: false,
    updatedAt: new Date(),
  }

  let realm: Realm

  beforeEach(async () => {
    realm = await openRealm()
  })

  afterEach(async () => {
    closeRealm()
  })

  it("adds movie to want list", async () => {
    renderWithRealm(
      <MovieContext.Consumer>
        {({ addToWantList }) => {
          act(() => addToWantList(payload))
          return null
        }}
      </MovieContext.Consumer>,
    )

    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 0))
    // })

    const movies = realm.objects("Movie")
    console.log("--- movies ---")
    console.log(realm)
    console.log(movies)

    expect(movies.length).toBe(1)
    expect(movies[0].tmdb_id).toBe(item.id)
  })
})
