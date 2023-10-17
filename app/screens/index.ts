import { Navigation } from "react-native-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"

import { DISCOVER_SCREEN } from "screens/Discover"
import { SEARCH_SCREEN } from "screens/Search"
import { PROFILE_SCREEN } from "screens/Profile"

import colors from "styles/colors"

export const initStack = () => {
  Promise.all([
    Ionicons.getImageSource("albums-outline", 30, colors.gray),
    Ionicons.getImageSource("albums", 30, colors.orangeYellow),
    Ionicons.getImageSource("search-outline", 30, colors.gray),
    Ionicons.getImageSource("search", 30, colors.orangeYellow),
    Ionicons.getImageSource("person-outline", 30, colors.gray),
    Ionicons.getImageSource("person", 30, colors.orangeYellow),
  ]).then(
    ([
      iconWant,
      iconWantSelected,
      iconSearch,
      iconSearchSelected,
      iconProfile,
      iconProfileSelected,
    ]) => {
      Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  id: DISCOVER_SCREEN.id,
                  children: [
                    {
                      component: {
                        name: DISCOVER_SCREEN.name,
                        options: {
                          topBar: {
                            ...topBarOptions,
                            title: {
                              text: DISCOVER_SCREEN.title,
                            },
                          },
                          // @ts-ignore
                          bottomTabs: bottomTabsOptions,
                          bottomTab: {
                            ...bottomTabOptions,
                            icon: iconWant,
                            selectedIcon: iconWantSelected,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  id: SEARCH_SCREEN.id,
                  children: [
                    {
                      component: {
                        name: SEARCH_SCREEN.name,
                        options: {
                          topBar: {
                            visible: false,
                          },
                          bottomTabs: {
                            visible: false,
                          },
                          bottomTab: {
                            ...bottomTabOptions,
                            icon: iconSearch,
                            selectedIcon: iconSearchSelected,
                          },
                          layout: {
                            componentBackgroundColor: "transparent",
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  id: PROFILE_SCREEN.id,
                  children: [
                    {
                      component: {
                        name: PROFILE_SCREEN.name,
                        options: {
                          topBar: {
                            ...topBarOptions,
                            title: {
                              text: PROFILE_SCREEN.title,
                            },
                          },
                          // @ts-ignore
                          bottomTabs: bottomTabsOptions,
                          bottomTab: {
                            ...bottomTabOptions,
                            icon: iconProfile,
                            selectedIcon: iconProfileSelected,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      })

      Navigation.mergeOptions(DISCOVER_SCREEN.id, {
        bottomTabs: { currentTabIndex: DISCOVER_SCREEN.index },
      })
    },
  )
}

const topBarOptions = {
  background: {
    color: colors.orangeYellow,
    translucent: false,
    blur: false,
  },
  borderHeight: 0,
  drawBehind: true,
  noBorder: true,
  largeTitle: {
    color: colors.white,
    visible: false,
  },
}

const bottomTabsOptions = {
  barStyle: "default",
  backgroundColor: colors.white,
  translucent: false,
  hideShadow: false,
  titleDisplayMode: "alwaysHide",
}

const bottomTabOptions = {
  fontSize: 15,
  iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
  iconColor: colors.black,
  selectedIconColor: colors.orangeYellow,
  disableIconTint: true,
  disableSelectedIconTint: true,
  textColor: colors.gray,
  selectedTextColor: colors.black,
}
