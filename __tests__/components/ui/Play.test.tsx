import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Play from "components/ui/Play"

describe("Play", () => {
  const videos = [
    {
      id: "123",
      tmdbId: 123,
      name: "Test Trailer",
      key: "abc123",
      publishedAt: "2023-01-01T12:00:00Z",
    },
  ]

  it("does not render when there are no videos", () => {
    const tree = render(<Play items={[]} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with video items", () => {
    const tree = render(<Play items={videos} />)
    expect(tree).toMatchSnapshot()
  })
})
