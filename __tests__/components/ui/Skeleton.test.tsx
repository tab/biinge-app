import React from "react"
import { View } from "react-native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import Skeleton from "components/ui/Skeleton"
import { horizontalStubListStyles } from "styles"

describe("Skeleton", () => {
  it("renders correctly", () => {
    const tree = render(
      <Skeleton>
        <View style={horizontalStubListStyles.root}>
          <View style={horizontalStubListStyles.itemMovie} />
          <View style={horizontalStubListStyles.itemMovie} />
          <View style={horizontalStubListStyles.itemMovie} />
        </View>
      </Skeleton>,
    )
    expect(tree).toMatchSnapshot()
  })
})
