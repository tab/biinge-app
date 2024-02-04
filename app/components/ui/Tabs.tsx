import React from "react"
import { View, Pressable, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

import { navStyles, layoutStyles } from "styles"
import PagerView from "react-native-pager-view"

interface TabType {
  id: number
  label: string
  component: React.ReactNode
}

type Props = {
  items: TabType[]
  tabIndex: number
  pager: React.RefObject<PagerView>
}

const TabsComponent = ({ items, tabIndex, pager }: Props) => {
  const { dark } = useTheme()

  const getItemStyle = (index: number) => {
    const baseStyle = [navStyles.item, { width: `${100 / items.length}%` }]
    const activeStyle =
      tabIndex === index
        ? dark
          ? navStyles.itemActiveDark
          : navStyles.itemActiveLight
        : null
    return [...baseStyle, activeStyle]
  }

  const getTextStyle = (index: number) => {
    const baseStyle = [navStyles.title]
    const activeStyle =
      tabIndex === index
        ? dark
          ? navStyles.titleActiveDark
          : navStyles.titleActiveLight
        : dark
          ? navStyles.titleDark
          : navStyles.titleLight
    return [...baseStyle, activeStyle]
  }

  return (
    <View
      style={[
        navStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <View style={navStyles.list}>
        {items.map((page, index) => (
          <Pressable
            // @ts-ignore
            style={getItemStyle(index)}
            key={index}
            onPress={() => pager?.current?.setPage(page.id - 1)}
          >
            <Text style={getTextStyle(index)}>{page.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default TabsComponent
