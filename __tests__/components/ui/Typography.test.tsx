import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import Typography from "components/ui/Typography"

describe("Typography", () => {
  const title = "Title"

  it("renders correctly title1 variant", () => {
    const tree = render(<Typography variant="title1">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly title2 variant", () => {
    const tree = render(<Typography variant="title2">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly title3 variant", () => {
    const tree = render(<Typography variant="title3">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly headline variant", () => {
    const tree = render(<Typography variant="headline">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly body variant", () => {
    const tree = render(<Typography variant="body">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly callout variant", () => {
    const tree = render(<Typography variant="callout">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly subhead variant", () => {
    const tree = render(<Typography variant="subhead">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly footnote variant", () => {
    const tree = render(<Typography variant="footnote">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly caption1 variant", () => {
    const tree = render(<Typography variant="caption1">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly caption2 variant", () => {
    const tree = render(<Typography variant="caption2">{title}</Typography>)
    expect(tree).toMatchSnapshot()
  })
})
