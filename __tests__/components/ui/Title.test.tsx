import React from "react"
import "react-native"
import { Text } from "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Title from "components/ui/Title"

describe("Title", () => {
  const title = "Movie title"

  it("renders correctly", () => {
    const tree = render(<Title>{title}</Title>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with aside", () => {
    const tree = render(<Title aside={<Text>Aside</Text>}>{title}</Title>)
    expect(tree).toMatchSnapshot()
  })
})
