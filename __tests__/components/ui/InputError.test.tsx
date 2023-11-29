import React from "react"
import "react-native"

import { it } from "@jest/globals"
import renderer from "react-test-renderer"

import InputError from "components/ui/InputError"

describe("InputError", () => {
  const error = "Error message"

  it("renders correctly", () => {
    const tree = renderer.create(<InputError>{error}</InputError>)
    expect(tree).toMatchSnapshot()
  })
})
