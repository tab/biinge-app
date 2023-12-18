import React from "react"
import "react-native"

import { it } from "@jest/globals"

import Profile from "screens/Profile"
import { renderWithRealm, openRealm } from "../support/renderWithRealm"

describe("Profile", () => {
  beforeEach(async () => {
    await openRealm()

    jest.mock("@realm/react", () => ({
      ...jest.requireActual("@realm/react"),
      useUser: jest.fn(() => ({
        id: "1",
        profile: {
          email: "luke.skywalker@jedy.local",
        },
      })),
    }))
  })

  // afterEach(async () => {
  //   closeRealm()
  // })

  it("renders correctly", () => {
    const tree = renderWithRealm(<Profile />)
    expect(tree).toMatchSnapshot()
  })
})
