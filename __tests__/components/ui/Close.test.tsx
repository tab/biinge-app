import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import { it } from "@jest/globals"

import Close from "components/ui/Close"

describe("Close", () => {
  const handleClose = jest.fn()

  it("renders correctly", () => {
    const tree = render(
      <NavigationContainer>
        <Close onPress={handleClose} />
      </NavigationContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
})
