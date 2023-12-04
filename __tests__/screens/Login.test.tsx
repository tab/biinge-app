import React from "react"
import "react-native"
import { render, fireEvent, act } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Login from "screens/Login"

jest.mock("@realm/react", () => ({
  useEmailPasswordAuth: () => ({
    logIn: jest.fn(),
    register: jest.fn(),
    result: { pending: false, success: false, error: null, operation: null },
  }),
}))

describe("Login", () => {
  it("renders correctly", () => {
    const tree = render(<Login />)
    expect(tree).toMatchSnapshot()
  })

  it("handles backdrop click event", () => {
    const { getByTestId } = render(<Login />)
    fireEvent.press(getByTestId("login-backdrop"))
  })

  it("handles form submit", async () => {
    const { getByTestId } = render(<Login />)

    await act(async () => {
      fireEvent.changeText(getByTestId("email-input"), "test@example.com")
      fireEvent.changeText(getByTestId("password-input"), "password123")
      fireEvent.press(getByTestId("login-button"))
    })
  })
})
