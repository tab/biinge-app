/**
 * @format
 */

import "react-native-get-random-values"
import { Navigation } from "react-native-navigation"
import { Provider } from "react-redux"

import { Store } from "./app/redux/Store"

// import App from "App"

import Discover, { DISCOVER_SCREEN } from "./app/screens/Discover"
import Search, { SEARCH_SCREEN } from "./app/screens/Search"
import Profile, { PROFILE_SCREEN } from "./app/screens/Profile"

Navigation.registerComponent(
  DISCOVER_SCREEN.name,
  () => (props) => (
    <Provider store={Store}>
      <Discover {...props} />
    </Provider>
  ),
  () => Discover,
)

Navigation.registerComponent(
  SEARCH_SCREEN.name,
  () => (props) => (
    <Provider store={Store}>
      <Search {...props} />
    </Provider>
  ),
  () => Search,
)

Navigation.registerComponent(
  PROFILE_SCREEN.name,
  () => (props) => (
    <Provider store={Store}>
      <Profile {...props} />
    </Provider>
  ),
  () => Profile,
)

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: "#fff",
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
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })
})
