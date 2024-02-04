import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Version from "components/ui/Version"

describe("Version", () => {
  it("renders correctly", () => {
    const tree = render(<Version />)
    expect(tree).toMatchSnapshot()
  })
})
