import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Button from "components/ui/Button"
import Typography from "components/ui/Typography"

describe("Button", () => {
  const title = "Button title"
  const handleClick = jest.fn()

  it("renders disabled button", () => {
    const disabled = true

    const tree = render(
      <Button disabled={disabled} onPress={handleClick}>
        <Typography variant="body">{title}</Typography>
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })

  it("renders button", () => {
    const disabled = false

    const tree = render(
      <Button disabled={disabled} onPress={handleClick}>
        <Typography variant="body">{title}</Typography>
      </Button>,
    )
    expect(tree).toMatchSnapshot()
  })
})
