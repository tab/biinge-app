import React from "react"
import "react-native"
import { render } from "@testing-library/react-native"
import { I18nextProvider } from "react-i18next"

import { it } from "@jest/globals"

import i18n from "config/i18n"
import Overview from "components/ui/Overview"

describe("Overview", () => {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

  it("renders correctly", () => {
    const tree = render(
      <I18nextProvider i18n={i18n}>
        <Overview>{text}</Overview>
      </I18nextProvider>,
    )
    expect(tree).toMatchSnapshot()
  })
})
