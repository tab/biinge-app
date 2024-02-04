import React, { createContext } from "react"
import { useObject, useUser, useRealm, useQuery } from "@realm/react"
import * as Sentry from "@sentry/react-native"

import { TV_IN_PRODUCTION_STATUS } from "config"
import {
  TvShow,
  UserTvShow,
  TvSeason,
  UserTvSeason,
  TvEpisode,
  UserTvEpisode,
} from "models"
import {
  TvShow as TMDBTvShow,
  TvSeason as TMDBTvSeason,
  TvEpisode as TMDBTvEpisode,
} from "types"

type TvContextType = {
  inWantList: (tmdbId: number) => boolean
  inWatchingList: (tmdbId: number) => boolean
  inWatchedList: (tmdbId: number) => boolean
  inWatchedSeasonList: (tmdbId: number) => boolean
  inWatchedEpisodeList: (tmdbId: number) => boolean
  addToWantList: (show: TMDBTvShow) => Promise<void>
  addToWatchedList: ({
    show,
    season,
    episode,
    type,
  }: {
    show: TMDBTvShow
    season?: TMDBTvSeason
    episode?: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }) => Promise<void>
  removeFromList: ({
    show,
    season,
    episode,
    type,
  }: {
    show: TMDBTvShow
    season?: TMDBTvSeason
    episode?: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }) => Promise<void>
  pinned: (tmdbId: number) => boolean
  pinToList: (item: TMDBTvShow) => Promise<void>
  unpinFromList: (item: TMDBTvShow) => Promise<void>
}

export const TvContext = createContext<TvContextType>({
  inWantList(_tmdbId: number): boolean {
    return false
  },
  inWatchingList(_tmdbId: number): boolean {
    return false
  },
  inWatchedList(_tmdbId: number): boolean {
    return false
  },
  inWatchedSeasonList(_tmdbId: number): boolean {
    return false
  },
  inWatchedEpisodeList(_tmdbId: number): boolean {
    return false
  },
  addToWantList(_show: TMDBTvShow): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  addToWatchedList({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    show,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    season,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    episode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
  }: {
    show: TMDBTvShow
    season?: TMDBTvSeason
    episode?: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  removeFromList({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    show,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    season,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    episode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
  }: {
    show: TMDBTvShow
    season?: TMDBTvSeason
    episode?: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  pinned(_tmdbId: number): boolean {
    return false
  },
  pinToList(_item: TMDBTvShow): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  unpinFromList(_item: TMDBTvShow): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
})

const TvProvider = ({ children }: { children: React.ReactNode }) => {
  const realm = useRealm()
  const user = useUser()

  // tv-shows
  const tvShows = useQuery<TvShow>(TvShow)
  const userTvShow = useObject<UserTvShow>(UserTvShow, user.id)

  const wantShowList = userTvShow?.want || []
  const wantShowIds = wantShowList.map(({ tmdb_id }: TvShow) => tmdb_id)
  const watchingShowList = userTvShow?.watching || []
  const watchingShowIds = watchingShowList.map(({ tmdb_id }: TvShow) => tmdb_id)
  const watchedShowList = userTvShow?.watched || []
  const watchedShowIds = watchedShowList.map(({ tmdb_id }: TvShow) => tmdb_id)

  // tv-seasons
  const tvSeasons = useQuery<TvSeason>(TvSeason)
  const userTvSeason = useObject<UserTvSeason>(UserTvSeason, user.id)

  const watchedSeasonList = userTvSeason?.watched || []
  const watchedSeasonIds = watchedSeasonList.map(
    ({ tmdb_id }: TvSeason) => tmdb_id,
  )

  // tv-episodes
  const tvEpisodes = useQuery<TvEpisode>(TvEpisode)
  const userTvEpisode = useObject<UserTvEpisode>(UserTvEpisode, user.id)

  const watchedEpisodeList = userTvEpisode?.watched || []
  const watchedEpisodeIds = watchedEpisodeList.map(
    ({ tmdb_id }: TvEpisode) => tmdb_id,
  )

  const inWantList = (tmdbId: number) => wantShowIds.includes(tmdbId)

  const inWatchingList = (tmdbId: number) => watchingShowIds.includes(tmdbId)

  const inWatchedList = (tmdbId: number) => watchedShowIds.includes(tmdbId)

  const inWatchedSeasonList = (tmdbId: number) =>
    watchedSeasonIds.includes(tmdbId)

  const inWatchedEpisodeList = (tmdbId: number) =>
    watchedEpisodeIds.includes(tmdbId)

  const isWatchedSeason = (season: TMDBTvSeason) => {
    const episodeIds = season.items.map(({ tmdb_id }) => tmdb_id).sort()
    const watchedIds = watchedEpisodeList
      .filter(({ tmdb_season_id }) => tmdb_season_id === season.tmdb_id)
      .map(({ tmdb_id }: TvEpisode) => tmdb_id)
      .sort()

    return JSON.stringify(episodeIds) === JSON.stringify(watchedIds)
  }

  const addToWantList = (show: TMDBTvShow) => {
    return new Promise<void>((resolve, reject) => {
      try {
        realm.write(() => {
          const { id, ...tmdbDetails } = show
          const payload = {
            ...tmdbDetails,
            userId: user.id,
            tmdb_id: id,
            pin: false,
            updatedAt: new Date(),
          }

          if (!inWantList(id)) {
            const tvShow = realm.create(TvShow, payload, true)
            // @ts-ignore
            wantShowList.unshift(tvShow)
          }

          // @ts-ignore
          realm.create(
            UserTvShow,
            {
              _id: user.id,
              userId: user.id,
              want: wantShowList,
            },
            true,
          )
        })
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addShowToWatchingList = (show: TMDBTvShow) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = show
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          pin: false,
          updatedAt: new Date(),
        }

        if (!inWatchingList(id)) {
          const tvShow = realm.create(TvShow, payload, true)
          // @ts-ignore
          watchingShowList.unshift(tvShow)
        }

        // @ts-ignore
        realm.create(
          UserTvShow,
          {
            _id: user.id,
            userId: user.id,
            watching: watchingShowList,
          },
          true,
        )
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addShowToWatchedList = (show: TMDBTvShow) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = show
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          pin: false,
          updatedAt: new Date(),
        }

        if (!inWatchedList(id)) {
          const tvShow = realm.create(TvShow, payload, true)
          // @ts-ignore
          watchedShowList.unshift(tvShow)
        }

        // @ts-ignore
        realm.create(
          UserTvShow,
          {
            _id: user.id,
            userId: user.id,
            watched: watchedShowList,
          },
          true,
        )
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addSeasonToWatchedList = (season: TMDBTvSeason) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = season
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          updatedAt: new Date(),
        }

        if (!inWatchedSeasonList(id)) {
          const tvSeason = realm.create(TvSeason, payload, true)
          // @ts-ignore
          watchedSeasonList.unshift(tvSeason)
        }

        // @ts-ignore
        realm.create(
          UserTvSeason,
          {
            _id: user.id,
            userId: user.id,
            watched: watchedSeasonList,
          },
          true,
        )
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addEpisodeToWatchedList = (episode: TMDBTvEpisode) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = episode
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          updatedAt: new Date(),
        }

        if (!inWatchedEpisodeList(id)) {
          const tvEpisode = realm.create(TvEpisode, payload, true)
          // @ts-ignore
          watchedEpisodeList.unshift(tvEpisode)
        }

        // @ts-ignore
        realm.create(
          UserTvEpisode,
          {
            _id: user.id,
            userId: user.id,
            watched: watchedEpisodeList,
          },
          true,
        )
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const updateShowList = (show: TMDBTvShow) => {
    const watchedEpisodes = tvEpisodes.filter(
      ({ tmdb_show_id }) => tmdb_show_id === show!.tmdb_id,
    )

    if (watchedEpisodes.length === 0) {
      if (inWantList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      } else if (inWatchingList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      } else if (inWatchedList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      }
    } else if (
      watchedEpisodes.length > 0 &&
      watchedEpisodes.length === show.number_of_episodes &&
      show.status !== TV_IN_PRODUCTION_STATUS
    ) {
      if (inWantList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      } else if (inWatchingList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      }

      addShowToWatchedList(show!)
    } else {
      if (inWantList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      } else if (inWatchedList(show!.tmdb_id)) {
        batchRemoveShowFromList([show!.tmdb_id])
      }

      addShowToWatchingList(show)
    }
  }

  const addToWatchedList = ({
    show,
    season,
    episode,
    type,
  }: {
    show: TMDBTvShow
    season?: TMDBTvSeason
    episode?: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        realm.write(() => {
          if (type === "episode") {
            addEpisodeToWatchedList(episode!)

            if (isWatchedSeason(season!)) {
              addSeasonToWatchedList(season!)
            } else {
              batchRemoveSeasonFromList([season!.tmdb_id])
            }
          }

          if (type === "season") {
            addSeasonToWatchedList(season!)

            // NOTE: Mark all episodes in the season as watched
            for (const showEpisode of season!.items) {
              addEpisodeToWatchedList(showEpisode)
            }
          }

          if (type === "show") {
            // NOTE: Mark all seasons in the show as watched
            for (const showSeason of show!.items) {
              addSeasonToWatchedList(showSeason)

              // NOTE: Mark all episodes in the season as watched
              for (const showEpisode of showSeason.items) {
                addEpisodeToWatchedList(showEpisode)
              }
            }
          }

          updateShowList(show!)
        })

        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const batchRemoveShowFromList = (tmdbIds: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvShowList = tvShows.filter(({ tmdb_id }) =>
          tmdbIds.includes(tmdb_id),
        )

        if (tvShowList) {
          realm.delete(tvShowList)
        }
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const batchRemoveSeasonFromList = (tmdbIds: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvSeasonList = tvSeasons.filter(({ tmdb_id }) =>
          tmdbIds.includes(tmdb_id),
        )

        if (tvSeasonList) {
          realm.delete(tvSeasonList)
        }
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const batchRemoveEpisodeFromList = (tmdbIds: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvEpisodeList = tvEpisodes.filter(({ tmdb_id }) =>
          tmdbIds.includes(tmdb_id),
        )

        if (tvEpisodeList) {
          realm.delete(tvEpisodeList)
        }
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const removeFromList = ({
    show,
    season,
    episode,
    type,
  }: {
    show: TMDBTvShow
    season: TMDBTvSeason
    episode: TMDBTvEpisode
    type: "episode" | "season" | "show"
  }) => {
    return new Promise<void>((resolve, reject) => {
      try {
        realm.write(() => {
          if (type === "episode") {
            batchRemoveEpisodeFromList([episode!.tmdb_id])
            batchRemoveSeasonFromList([season!.tmdb_id])
          }

          if (type === "season") {
            batchRemoveEpisodeFromList(
              season.items.map(({ tmdb_id }) => tmdb_id),
            )

            batchRemoveSeasonFromList([season!.tmdb_id])
          }

          if (type === "show") {
            batchRemoveEpisodeFromList(
              show!.items.flatMap((showSeason) =>
                showSeason.items.map(({ tmdb_id }) => tmdb_id),
              ),
            )

            batchRemoveSeasonFromList(show!.items.map(({ tmdb_id }) => tmdb_id))
          }

          updateShowList(show!)
        })
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const pinned = (tmdbId: number) => {
    const tvShow = tvShows.find(({ tmdb_id }) => tmdb_id === tmdbId)

    return tvShow?.pin || false
  }

  const pinToList = (item: TMDBTvShow) => {
    return new Promise<void>((resolve, reject) => {
      const tvShow = tvShows.find(({ tmdb_id }) => tmdb_id === item.id)

      if (tvShow) {
        try {
          const payload = {
            _id: tvShow._id,
            pin: true,
            updatedAt: new Date(),
          }

          realm.write(() => {
            realm.create(TvShow, payload, true)
          })
        } catch (error) {
          Sentry.captureException(error)
          reject(error)
        }

        resolve()
      } else {
        resolve()
      }
    })
  }

  const unpinFromList = (item: TMDBTvShow) => {
    return new Promise<void>((resolve, reject) => {
      const tvShow = tvShows.find(({ tmdb_id }) => tmdb_id === item.id)

      if (tvShow) {
        try {
          const payload = {
            _id: tvShow._id,
            pin: false,
            updatedAt: new Date(),
          }

          realm.write(() => {
            realm.create(TvShow, payload, true)
          })
        } catch (error) {
          Sentry.captureException(error)
          reject(error)
        }

        resolve()
      } else {
        resolve()
      }
    })
  }

  return (
    <TvContext.Provider
      value={{
        inWantList,
        inWatchingList,
        inWatchedList,
        inWatchedSeasonList,
        inWatchedEpisodeList,
        addToWantList,
        // @ts-ignore
        addToWatchedList,
        // @ts-ignore
        removeFromList,
        pinned,
        pinToList,
        unpinFromList,
      }}
    >
      {children}
    </TvContext.Provider>
  )
}

export default TvProvider
