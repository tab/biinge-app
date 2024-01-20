import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Status from "components/ui/Status"

describe("Status", () => {
  it("renders correctly", () => {
    const tree = render(<Status>Post Production</Status>)
    expect(tree).toMatchSnapshot()
  })
})
