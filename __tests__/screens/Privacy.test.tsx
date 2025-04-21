import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Privacy from "screens/Privacy"

describe("Privacy", () => {
  it("renders correctly", () => {
    const tree = render(<Privacy />)
    expect(tree).toMatchSnapshot()
  })
})
