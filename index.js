/**
 * @format
 */

import "react-native-get-random-values"
import { Navigation } from "react-native-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Provider } from "react-redux"
import { RealmProvider } from "@realm/react"

import { Store } from "redux/Store"
import { Schemas } from "./app/models/index"

import Discover, { DISCOVER_SCREEN } from "screens/Discover"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"
import Media, { MEDIA_SCREEN } from "screens/Media"
import Overlay, { OVERLAY_SCREEN } from "screens/Overlay"

import colors from "styles/colors"

Navigation.registerComponent(
  DISCOVER_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas}>
      <Provider store={Store}>
        <Discover {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Discover,
)

Navigation.registerComponent(
  SEARCH_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas}>
      <Provider store={Store}>
        <Search {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Search,
)

Navigation.registerComponent(
  PROFILE_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas}>
      <Provider store={Store}>
        <Profile {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Profile,
)

Navigation.registerComponent(
  MEDIA_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas}>
      <Provider store={Store}>
        <Media {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Media,
)

Navigation.registerComponent(
  OVERLAY_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas}>
      <Provider store={Store}>
        <Overlay {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Overlay,
)

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: "white",
  },
  topBar: {
    title: {
      color: "white",
    },
    backButton: {
      color: "white",
    },
    background: {
      color: "white",
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
})

Navigation.events().registerAppLaunchedListener(async () => {
  Promise.all([
    Ionicons.getImageSource("albums-outline", 30, colors.gray),
    Ionicons.getImageSource("albums", 30, colors.orangeYellow),
    Ionicons.getImageSource("search-outline", 30, colors.gray),
    Ionicons.getImageSource("search", 30, colors.orangeYellow),
    Ionicons.getImageSource("person-outline", 30, colors.gray),
    Ionicons.getImageSource("person", 30, colors.orangeYellow),
  ]).then(
    ([
      iconDiscover,
      iconDiscoverSelected,
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
                          bottomTabs: bottomTabsOptions,
                          bottomTab: {
                            ...bottomTabOptions,
                            icon: iconDiscover,
                            selectedIcon: iconDiscoverSelected,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: SEARCH_SCREEN.name,
                        options: {
                          topBar: {
                            ...topBarOptions,
                            title: {
                              text: SEARCH_SCREEN.title,
                            },
                          },
                          bottomTabs: bottomTabsOptions,
                          bottomTab: {
                            ...bottomTabOptions,
                            icon: iconSearch,
                            selectedIcon: iconSearchSelected,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
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
    },
  )
})

const topBarOptions = {
  background: {
    color: colors.white,
    translucent: false,
    blur: false,
  },
  borderHeight: 0,
  drawBehind: true,
  noBorder: true,
  largeTitle: {
    visible: true,
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
