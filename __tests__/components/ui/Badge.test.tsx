import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Badge from "components/ui/Badge"

describe("Badge", () => {
  const title = "Badge title"

  it("renders correctly", () => {
    const tree = render(<Badge>{title}</Badge>)
    expect(tree).toMatchSnapshot()
  })
})
