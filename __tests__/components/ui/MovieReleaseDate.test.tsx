import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import MovieReleaseDate from "components/ui/MovieReleaseDate"

describe("MovieReleaseDate", () => {
  const release_date = "2024-02-27"

  it("renders correctly", () => {
    const tree = render(<MovieReleaseDate>{release_date}</MovieReleaseDate>)
    expect(tree).toMatchSnapshot()
  })
})
