import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Check from "components/ui/Check"

describe("Check", () => {
  it("renders correctly", () => {
    const tree = render(<Check />)
    expect(tree).toMatchSnapshot()
  })
})
