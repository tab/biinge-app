import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Loader from "components/ui/Loader"

describe("Loader", () => {
  it("renders correctly", () => {
    const tree = render(<Loader />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with dark", () => {
    const tree = render(<Loader dark />)
    expect(tree).toMatchSnapshot()
  })
})
