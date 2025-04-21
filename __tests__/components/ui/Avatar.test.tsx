import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Avatar from "components/ui/Avatar"

describe("Avatar", () => {
  const email = "test@local"

  it("renders correctly", () => {
    const tree = render(<Avatar email={email} />)
    expect(tree).toMatchSnapshot()
  })
})
