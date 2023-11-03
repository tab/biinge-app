import React, { useEffect, useRef, useState, useContext } from "react"
import { SafeAreaView, View, Text, Pressable } from "react-native"
import PagerView from "react-native-pager-view"

import i18n from "config/i18n"
import { MovieContext } from "contexts/MovieContext"
import BottomTabBar from "components/Layout/BottomTabBar"
import List from "components/Movie/List"
import { layoutStyles, navStyles } from "styles"

const DiscoverScreen = () => {
  const [tabIndex, setPageIndex] = useState(0)
  const pager = useRef<PagerView>(null)

  const { wantList, watchedList } = useContext(MovieContext)

  useEffect(() => {
    if (pager.current) {
      pager.current.setPage(tabIndex)
    }
  }, [tabIndex])

  const TABS = [
    {
      id: 1,
      label: i18n.t("discover.nav.want.title"),
      items: wantList(),
    },
    {
      id: 2,
      label: i18n.t("discover.nav.watched.title"),
      items: watchedList(),
    },
  ]

  // @ts-ignore
  const handleSelect = ({ nativeEvent: { position } }) => {
    setPageIndex(position)
  }

  return (
    <SafeAreaView style={layoutStyles.root}>
      <View style={navStyles.root}>
        <View style={navStyles.list}>
          {TABS.map((page, index: number) => (
            <Pressable
              style={
                tabIndex === index
                  ? [navStyles.item, navStyles.itemActive]
                  : [navStyles.item]
              }
              key={index}
              onPress={() => pager?.current?.setPage(page.id - 1)}
            >
              <Text
                style={
                  tabIndex === index
                    ? [navStyles.title, navStyles.titleActive]
                    : [navStyles.title]
                }
              >
                {page.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <PagerView
        style={layoutStyles.content}
        ref={pager}
        initialPage={0}
        orientation="horizontal"
        onPageSelected={handleSelect}
      >
        {TABS.map(({ id, items }) => (
          // @ts-ignore
          <List key={id} items={items} />
        ))}
      </PagerView>
      <BottomTabBar />
    </SafeAreaView>
  )
}

export const DISCOVER_SCREEN = {
  name: "com.biinge.Discover",
  title: i18n.t("discover.title"),
}

export default DiscoverScreen
