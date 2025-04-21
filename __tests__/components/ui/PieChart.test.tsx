import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import PieChart from "components/ui/PieChart"
import colors from "styles/colors"

describe("PieChart", () => {
  it("renders with default props", () => {
    const tree = render(<PieChart percent={50} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders with custom color", () => {
    const tree = render(<PieChart percent={75} color={colors.orangeYellow} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders with zero percent", () => {
    const tree = render(<PieChart percent={0} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders with 100 percent", () => {
    const tree = render(<PieChart percent={100} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders with over 100 percent (should cap at 100)", () => {
    const tree = render(<PieChart percent={150} />)
    expect(tree).toMatchSnapshot()
  })
})
