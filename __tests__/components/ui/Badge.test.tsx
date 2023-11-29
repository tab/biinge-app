import React from "react"
import "react-native"

import { it } from "@jest/globals"
import renderer from "react-test-renderer"

import Badge from "components/ui/Badge"

describe("Badge", () => {
  const title = "Badge title"

  it("renders correctly", () => {
    const tree = renderer.create(<Badge>{title}</Badge>)
    expect(tree).toMatchSnapshot()
  })
})
