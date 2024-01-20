import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Rating from "components/ui/Rating"

describe("Rating", () => {
  it("renders correctly", () => {
    const tree = render(<Rating>7.3</Rating>)
    expect(tree).toMatchSnapshot()
  })
})
