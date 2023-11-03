import React from "react"
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm"
import type Realm from "realm"
import { RealmProvider, useUser } from "@realm/react"
import { Provider } from "react-redux"

import MovieProvider from "contexts/MovieContext"
import { Movie, UserMovie } from "models"
import { Store } from "redux/store"

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOutBehavior: OpenRealmTimeOutBehavior?.OpenLocalRealm ?? "openLocalRealm",
  timeOut: 1000,
}

type Props = {
  children: React.ReactNode
}

const Sync = ({ children }: Props) => {
  const user = useUser()
  const partitionValue = user.id

  return (
    <RealmProvider
      schema={[Movie, UserMovie]}
      sync={{
        partitionValue,
        newRealmFileBehavior: realmAccessBehavior,
        existingRealmFileBehavior: realmAccessBehavior,
      }}
    >
      <Provider store={Store}>
        <MovieProvider>{children}</MovieProvider>
      </Provider>
    </RealmProvider>
  )
}

export default Sync
