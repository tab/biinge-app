import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Overview from "components/ui/Overview"

describe("Overview", () => {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

  it("renders correctly", () => {
    const tree = render(<Overview>{text}</Overview>)
    expect(tree).toMatchSnapshot()
  })
})
