import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Terms from "screens/Terms"

describe("Terms", () => {
  it("renders correctly", () => {
    const tree = render(<Terms />)
    expect(tree).toMatchSnapshot()
  })
})
