import React from "react"
import "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"

import { it } from "@jest/globals"

import List from "components/ui/MovieList"

describe("MovieList", () => {
  describe("without items", () => {
    it("renders correctly", () => {
      const tree = render(
        <NavigationContainer>
          <List numColumns={2} items={[]} />
        </NavigationContainer>,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe("with items", () => {
    const items = [
      {
        id: 1,
        title: "Star Wars: Episode IV - A New Hope",
        poster_path: "brWLt72DyKVNpgZuqJwsr78brj.jpg",
      },
      {
        id: 2,
        title: "Star Wars: Episode V - The Empire Strikes Back",
        poster_path: "a1MlbLBk5Sy6YvMbSuKfwGlDVlb.jpg",
      },
      {
        id: 3,
        title: "Star Wars: Episode VI - Return of the Jedi",
        poster_path: "cPo5m7MmFVxgFVbO1gmfb74dGdj.jpg",
      },
    ]

    it("renders correctly", () => {
      const tree = render(
        <NavigationContainer>
          <List numColumns={2} items={items} />
        </NavigationContainer>,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
