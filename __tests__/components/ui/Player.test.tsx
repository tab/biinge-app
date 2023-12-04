import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Player from "components/ui/Player"

describe("Player", () => {
  const videoId = "123456789"

  const handlePlayer = jest.fn()

  it("renders correctly", () => {
    const tree = render(<Player videoId={videoId} onClose={handlePlayer} />)
    expect(tree).toMatchSnapshot()
  })
})
