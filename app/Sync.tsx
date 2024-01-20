import React from "react"
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm"
import type Realm from "realm"
import { RealmProvider, useUser } from "@realm/react"
import { Provider } from "react-redux"

import MovieProvider from "contexts/MovieContext"
import TvProvider from "contexts/TvContext"
import {
  Movie,
  UserMovie,
  TvShow,
  UserTvShow,
  TvSeason,
  UserTvSeason,
  TvEpisode,
  UserTvEpisode,
} from "models"
import { Store } from "redux/store"

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOutBehavior: OpenRealmTimeOutBehavior?.OpenLocalRealm ?? "openLocalRealm",
  timeOut: 100,
}

type Props = {
  children: React.ReactNode
}

const Sync = ({ children }: Props) => {
  const user = useUser()
  const partitionValue = user.id

  return (
    <RealmProvider
      schema={[
        Movie,
        UserMovie,
        TvShow,
        UserTvShow,
        TvSeason,
        UserTvSeason,
        TvEpisode,
        UserTvEpisode,
      ]}
      sync={{
        partitionValue,
        newRealmFileBehavior: realmAccessBehavior,
        existingRealmFileBehavior: realmAccessBehavior,
      }}
    >
      <Provider store={Store}>
        <MovieProvider>
          <TvProvider>{children}</TvProvider>
        </MovieProvider>
      </Provider>
    </RealmProvider>
  )
}

export default Sync
