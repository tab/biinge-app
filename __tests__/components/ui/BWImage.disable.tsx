import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Image from "components/ui/BWImage"

describe("BWImage", () => {
  const imgPath = "eO3r38fwnhb58M1YgcjQBd3VNcp.jpg"

  it("renders correctly", () => {
    const tree = render(<Image size="w780" path={imgPath} />)
    expect(tree).toMatchSnapshot()
  })
})
