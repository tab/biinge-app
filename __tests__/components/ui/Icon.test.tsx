import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Icon from "components/ui/Icon"
import colors from "styles/colors"

describe("Icon", () => {
  it("renders correctly", () => {
    const tree = render(
      <Icon name="star" color={colors.orangeYellow} size={20} />,
    )
    expect(tree).toMatchSnapshot()
  })
})
