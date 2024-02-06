import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import { it } from "@jest/globals"

import Close from "components/ui/Close"

describe("Close", () => {
  it("renders correctly", () => {
    const tree = render(
      <NavigationContainer>
        <Close />
      </NavigationContainer>,
    )
    expect(tree).toMatchSnapshot()
  })
})
