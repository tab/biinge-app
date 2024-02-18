import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import MovieRuntime from "components/ui/MovieRuntime"

describe("MovieRuntime", () => {
  const runtime = 124

  it("renders correctly", () => {
    const tree = render(<MovieRuntime>{runtime}</MovieRuntime>)
    expect(tree).toMatchSnapshot()
  })
})
