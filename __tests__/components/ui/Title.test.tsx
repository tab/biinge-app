import React from "react"
import "react-native"
import { Text } from "react-native"

import { it } from "@jest/globals"
import renderer from "react-test-renderer"

import Title from "components/ui/Title"

describe("Title", () => {
  const title = "Movie title"

  it("renders correctly", () => {
    const tree = renderer.create(<Title>{title}</Title>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with aside", () => {
    const tree = renderer.create(
      <Title aside={<Text>Aside</Text>}>{title}</Title>,
    )
    expect(tree).toMatchSnapshot()
  })
})
