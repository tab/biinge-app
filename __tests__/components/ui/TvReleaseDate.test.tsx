import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import TvReleaseDate from "components/ui/TvReleaseDate"

describe("TvReleaseDate", () => {
  it("renders correctly when show is not ended", () => {
    const release_date = "2023-12-15"
    const end_date = ""

    const tree = render(
      <TvReleaseDate
        in_production={true}
        release_date={release_date}
        end_date={end_date}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when show is ended", () => {
    const release_date = "2024-01-01"
    const end_date = "2024-02-27"

    const tree = render(
      <TvReleaseDate
        in_production={false}
        release_date={release_date}
        end_date={end_date}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
