/**
 * @format
 */

import "react-native-get-random-values"
import { Navigation } from "react-native-navigation"
import { Provider } from "react-redux"
import { RealmProvider } from "@realm/react"

import { Store } from "redux/Store"
import { Schemas } from "./app/models/index"

import Discover, { DISCOVER_SCREEN } from "screens/Discover"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"

import SearchModal, { SEARCH_MODAL } from "screens/Modal/Search"
import MediaModal, { MEDIA_MODAL } from "screens/Modal/Media"

import MediaMenuOverlay, { MEDIA_MENU_OVERLAY } from "screens/Overlay/MediaMenu"

import { initStack } from "screens"
import { openModal } from "screens/navigation"

Navigation.registerComponent(
  DISCOVER_SCREEN.name,
  () => (props) => (
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
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
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
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
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
      <Provider store={Store}>
        <Profile {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => Profile,
)

Navigation.registerComponent(
  MEDIA_MODAL.name,
  () => (props) => (
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
      <Provider store={Store}>
        <MediaModal {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => MediaModal,
)

Navigation.registerComponent(
  SEARCH_MODAL.name,
  () => (props) => (
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
      <Provider store={Store}>
        <SearchModal {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => SearchModal,
)

Navigation.registerComponent(
  MEDIA_MENU_OVERLAY.name,
  () => (props) => (
    <RealmProvider schema={Schemas} closeOnUnmount={false}>
      <Provider store={Store}>
        <MediaMenuOverlay {...props} />
      </Provider>
    </RealmProvider>
  ),
  () => MediaMenuOverlay,
)

Navigation.setDefaultOptions({
  animations: {
    setRoot: {
      waitForRender: true,
    },
    showModal: {
      waitForRender: true,
    },
    push: {
      waitForRender: true,
    },
  },
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

let bottomTabIndex = DISCOVER_SCREEN.index

const openTabByIndex = (index) => {
  const bottomTabs = [DISCOVER_SCREEN.id, SEARCH_SCREEN.id, PROFILE_SCREEN.id]

  if (index >= 0 && index < bottomTabs.length) {
    Navigation.mergeOptions(bottomTabs[index], {
      bottomTabs: { currentTabIndex: index },
    })
  }
}

Navigation.events().registerAppLaunchedListener(async () => {
  initStack()
})

Navigation.events().registerBottomTabSelectedListener(
  ({ selectedTabIndex }) => {
    if (selectedTabIndex !== SEARCH_SCREEN.index) {
      bottomTabIndex = selectedTabIndex
    }
  },
)

Navigation.events().registerModalDismissedListener(({ componentId }) => {
  switch (componentId) {
    case SEARCH_MODAL.id:
      openTabByIndex(bottomTabIndex)
      break
    default:
      break
  }
})

Navigation.events().registerBottomTabSelectedListener(
  ({ selectedTabIndex }) => {
    switch (selectedTabIndex) {
      case SEARCH_SCREEN.index:
        openModal("stack", SEARCH_MODAL.id, [
          {
            component: {
              id: SEARCH_MODAL.id,
              name: SEARCH_MODAL.name,
              options: SEARCH_MODAL.options,
            },
          },
        ])
        break
      default:
        break
    }
  },
)
