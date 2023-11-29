import React from "react"
import "react-native"

import { it } from "@jest/globals"
import renderer from "react-test-renderer"

import Button from "components/ui/Button"

describe("Button", () => {
  const title = "Button title"
  const handleClick = jest.fn()

  it("renders disabled button", () => {
    const disabled = true

    const tree = renderer.create(
      <Button disabled={disabled} onPress={handleClick}>
        {title}
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders button", () => {
    const disabled = false

    const tree = renderer.create(
      <Button disabled={disabled} onPress={handleClick}>
        {title}
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })
})
