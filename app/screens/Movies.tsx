import React, { useEffect, useRef, useState, Fragment } from "react"
import { SafeAreaView } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useUser, useObject } from "@realm/react"
import PagerView from "react-native-pager-view"

import i18n from "config/i18n"
import Tabs from "components/ui/Tabs"
import List from "components/ui/MovieList"
import { layoutStyles } from "styles"
import { UserMovie } from "models"

const MoviesScreen = () => {
  const { dark } = useTheme()

  const user = useUser()
  const userMovie = useObject<UserMovie>(UserMovie, user.id)

  const wantList = userMovie?.want?.sorted("pin", true) || []
  const watchedList = userMovie?.watched?.sorted("pin", true) || []

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
      component: (
        <List showStatus={false} showPin numColumns={2} items={wantList} />
      ),
    },
    {
      id: 2,
      label: i18n.t("nav.watched.title"),
      component: (
        <List showStatus={false} showPin numColumns={2} items={watchedList} />
      ),
    },
  ]

  // @ts-ignore
  const handleSelect = ({ nativeEvent: { position } }) => {
    setPageIndex(position)
  }

  // @ts-ignore
  return (
    <SafeAreaView
      style={[
        layoutStyles.root,
        dark ? layoutStyles.bgDark : layoutStyles.bgLight,
      ]}
    >
      <Tabs items={TABS} tabIndex={tabIndex} pager={pager} />
      <PagerView
        style={layoutStyles.content}
        ref={pager}
        initialPage={0}
        orientation="horizontal"
        onPageSelected={handleSelect}
      >
        {TABS.map(({ id, component }) => (
          <Fragment key={id}>{component}</Fragment>
        ))}
      </PagerView>
    </SafeAreaView>
  )
}

export const MOVIES_SCREEN = {
  id: "MOVIES_SCREEN",
  name: "com.biinge.Movies",
}

export default MoviesScreen
