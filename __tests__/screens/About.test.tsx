import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import About from "screens/About"

describe("About", () => {
  it("renders correctly", () => {
    const tree = render(<About />)
    expect(tree).toMatchSnapshot()
  })
})
