import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import InputError from "components/ui/InputError"

describe("InputError", () => {
  const error = "Error message"

  it("renders correctly", () => {
    const tree = render(<InputError>{error}</InputError>)
    expect(tree).toMatchSnapshot()
  })
})
