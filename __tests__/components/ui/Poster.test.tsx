import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Poster from "components/ui/Poster"

describe("Poster", () => {
  const imgPath = "eO3r38fwnhb58M1YgcjQBd3VNcp.jpg"

  it("renders correctly", () => {
    const tree = render(<Poster posterPath={imgPath} />)
    expect(tree).toMatchSnapshot()
  })
})
