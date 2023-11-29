import React from "react"
import "react-native"

import { it } from "@jest/globals"
import renderer from "react-test-renderer"

import FormError from "components/ui/FormError"

describe("FormError", () => {
  const error = "Error message"

  it("renders correctly", () => {
    const tree = renderer.create(<FormError>{error}</FormError>)
    expect(tree).toMatchSnapshot()
  })
})
