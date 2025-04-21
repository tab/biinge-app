import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Player from "components/ui/Player"

describe("Player", () => {
  const video = {
    id: "123",
    tmdbId: 123,
    name: "Test Trailer",
    key: "abc123",
    publishedAt: "2023-01-01T12:00:00Z",
  }
  const handleClick = jest.fn()

  it("renders correctly", () => {
    const tree = render(<Player videoId={video.id} onClose={handleClick}/>)
    expect(tree).toMatchSnapshot()
  })
})
