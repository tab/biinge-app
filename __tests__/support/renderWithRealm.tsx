import React, { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { render } from "@testing-library/react-native"
import { setupStore } from "redux/store"
import { AppProvider, UserProvider, RealmProvider } from "@realm/react"
import Realm from "realm"

import type { RenderOptions } from "@testing-library/react-native"
import type { PreloadedState } from "@reduxjs/toolkit"
import type { AppStore, RootState } from "redux/store"

import MovieProvider from "contexts/MovieContext"
import Login from "screens/Login"
import { Movie, UserMovie } from "models"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

const config = {
  schema: [Movie, UserMovie],
  deleteRealmIfMigrationNeeded: true,
  inMemory: true,
  path: "realm-sync-test",
}

let realm: Realm

export const openRealm = async () => {
  realm = await Realm.open(config)

  const user = await Realm.User.register()
  realm.write(() => {
    realm.create("User", {
      _id: user.id,
      profile: {
        email: "luke.skywalker@jedy.local",
      },
    })
  })
}

export const closeRealm = async () => realm.close()

export function renderWithRealm(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<any>) {
    return (
      <AppProvider id="realm-sync-test">
        <UserProvider fallback={Login}>
          <RealmProvider {...config}>
            <Provider store={store}>
              <MovieProvider>{children}</MovieProvider>
            </Provider>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
