import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import FormError from "components/ui/FormError"

describe("FormError", () => {
  const error = "Error message"

  it("renders correctly", () => {
    const tree = render(<FormError>{error}</FormError>)
    expect(tree).toMatchSnapshot()
  })
})
