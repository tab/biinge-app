import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import ProfileIcon from "components/ui/ProfileIcon"

jest.mock("@realm/react", () => ({
  useUser: () => ({
    email: "test@local",
  }),
}))

describe("ProfileIcon", () => {
  it("renders correctly", () => {
    const tree = render(<ProfileIcon />)
    expect(tree).toMatchSnapshot()
  })
})
