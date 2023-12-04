import React from "react"
import "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import List from "components/ui/PeopleList"

describe("PeopleList", () => {
  describe("without items", () => {
    it("renders correctly", () => {
      const tree = render(
        <NavigationContainer>
          <List items={[]} />
        </NavigationContainer>,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe("with items", () => {
    const items = [
      {
        id: 1,
        name: "Luke Skywalker",
        description: "Jedi",
        profile_path: "brWLt72DyKVNpgZuqJwsr78brj.jpg",
      },
      {
        id: 2,
        name: "Han Solo",
        description: "Smuggler",
        profile_path: "a1MlbLBk5Sy6YvMbSuKfwGlDVlb.jpg",
      },
      {
        id: 3,
        name: "C3PO",
        description: "Droid",
        profile_path: "cPo5m7MmFVxgFVbO1gmfb74dGdj.jpg",
      },
    ]

    it("renders correctly", () => {
      const tree = render(
        <NavigationContainer>
          <List items={items} />
        </NavigationContainer>,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
