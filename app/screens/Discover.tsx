import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, View, Text, Pressable } from "react-native"
import PagerView from "react-native-pager-view"
import { useQuery } from "@realm/react"

import i18n from "config/i18n"
import List from "components/Media/List"
import { Media } from "models/Media"
import { layoutStyles, navStyles } from "styles"
import { MEDIA_MOVIE_TYPE, MEDIA_SERIES_TYPE } from "config"

const DiscoverScreen = () => {
  const [tabIndex, setPageIndex] = useState(0)

  const pager = useRef<PagerView>(null)

  useEffect(() => {
    if (pager.current) {
      pager.current.setPage(tabIndex)
    }
  }, [tabIndex])

  const TABS = [
    {
      id: 1,
      label: i18n.t("nav.want.title"),
      items: useQuery(Media)
        .sorted("updatedAt", true)
        .filter((item) => item.want && item.contentType === MEDIA_MOVIE_TYPE),
    },
    {
      id: 2,
      label: i18n.t("nav.watched.title"),
      items: useQuery(Media)
        .sorted("updatedAt", true)
        .filter(
          (item) => item.watched && item.contentType === MEDIA_MOVIE_TYPE,
        ),
    },
    {
      id: 3,
      label: i18n.t("nav.series.title"),
      items: useQuery(Media)
        .sorted("updatedAt", true)
        .filter(
          (item) =>
            (item.want || item.watched) &&
            item.contentType === MEDIA_SERIES_TYPE,
        ),
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
          <List key={id} items={items} />
        ))}
      </PagerView>
    </SafeAreaView>
  )
}

export const DISCOVER_SCREEN = {
  id: "DISCOVER_SCREEN",
  index: 0,
  name: "com.biinge.Discover",
  title: i18n.t("screens.discover.title"),
}

export default DiscoverScreen
