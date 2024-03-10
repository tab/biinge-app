import React, { createContext } from "react"
import { useUser, useRealm, useQuery } from "@realm/react"
import * as Sentry from "@sentry/react-native"

import { TV_IN_PRODUCTION_STATUS } from "config"
import { TvShow, TvSeason, TvEpisode } from "models"
import { TvShowDetails, TvSeasonDetails, TvEpisodeDetails } from "types"
import { BSON } from "realm"

type TvContextType = {
  inWantList: (tmdbId: number) => boolean
  inWatchingList: (tmdbId: number) => boolean
  inWatchedList: (tmdbId: number) => boolean
  inPinList: (tmdbId: number) => boolean
  inWatchedSeasonList: (tmdbId: number) => boolean
  inWatchedEpisodeList: (tmdbId: number) => boolean
  addToWantList: (show: TvShowDetails) => Promise<void>
  addToWatchedList: ({
    show,
    season,
    episode,
    type,
  }: {
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
    type: "episode" | "season" | "show"
  }) => Promise<void>
  removeFromList: ({
    show,
    season,
    episode,
    type,
  }: {
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
    type: "episode" | "season" | "show"
  }) => Promise<void>
  pinToList: (item: TvShowDetails) => Promise<void>
  unpinFromList: (item: TvShowDetails) => Promise<void>
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
  inPinList(_tmdbId: number): boolean {
    return false
  },
  inWatchedSeasonList(_tmdbId: number): boolean {
    return false
  },
  inWatchedEpisodeList(_tmdbId: number): boolean {
    return false
  },
  addToWantList(_show: TvShowDetails): Promise<void> {
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
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
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
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
    type: "episode" | "season" | "show"
  }): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  pinToList(_item: TvShowDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  unpinFromList(_item: TvShowDetails): Promise<void> {
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

  const wantShowList = tvShows.filtered("want == $0", true)
  const watchingShowList = tvShows.filtered("watching == $0", true)
  const watchedShowList = tvShows.filtered("watched == $0", true)
  const pinList = tvShows.filtered("pin == $0", true)

  const pinIds = pinList.map(({ tmdbId }: TvShow) => tmdbId)

  const wantShowIds = wantShowList.map(({ tmdbId }: TvShow) => tmdbId)
  const watchingShowIds = watchingShowList.map(({ tmdbId }: TvShow) => tmdbId)
  const watchedShowIds = watchedShowList.map(({ tmdbId }: TvShow) => tmdbId)

  // tv-seasons
  const watchedSeasonList = useQuery<TvSeason>(TvSeason)
  const watchedSeasonIds = watchedSeasonList.map(
    ({ tmdbId }: TvSeason) => tmdbId,
  )

  // tv-episodes
  const watchedEpisodeList = useQuery<TvEpisode>(TvEpisode)
  const watchedEpisodeIds = watchedEpisodeList.map(
    ({ tmdbId }: TvEpisode) => tmdbId,
  )

  const inWantList = (tmdbId: number) => wantShowIds.includes(tmdbId)

  const inWatchingList = (tmdbId: number) => watchingShowIds.includes(tmdbId)

  const inWatchedList = (tmdbId: number) => watchedShowIds.includes(tmdbId)

  const inPinList = (tmdbId: number) => pinIds.includes(tmdbId)

  const inWatchedSeasonList = (tmdbId: number) =>
    watchedSeasonIds.includes(tmdbId)

  const inWatchedEpisodeList = (tmdbId: number) =>
    watchedEpisodeIds.includes(tmdbId)

  const isWatchedSeason = (season: TvSeasonDetails) => {
    const episodeIds = season.items.map(({ tmdbId }) => tmdbId).sort()
    const watchedIds = watchedEpisodeList
      .filter(({ tmdbSeasonId }) => tmdbSeasonId === season.tmdbId)
      .map(({ tmdbId }: TvEpisode) => tmdbId)
      .sort()

    return JSON.stringify(episodeIds) === JSON.stringify(watchedIds)
  }

  const addToWantList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: tvShow ? tvShow._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          imdbId,
          title,
          posterPath,
          episodesCount,
          status,
          want: true,
          watching: false,
          watched: false,
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
    })
  }

  const addShowToWatchingList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: tvShow ? tvShow._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          imdbId,
          title,
          posterPath,
          episodesCount,
          status,
          want: false,
          watching: true,
          watched: false,
          pin: false,
          updatedAt: new Date(),
        }
        realm.create(TvShow, payload, true)
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addShowToWatchedList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: tvShow ? tvShow._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          imdbId,
          title,
          posterPath,
          episodesCount,
          status,
          want: false,
          watching: false,
          watched: true,
          pin: false,
          updatedAt: new Date(),
        }

        realm.create(TvShow, payload, true)
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addSeasonToWatchedList = (item: TvSeasonDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, tmdbShowId, title, number, posterPath } = item
        const tvSeason = watchedSeasonList.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: tvSeason ? tvSeason._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          tmdbShowId,
          title,
          number,
          posterPath,
          updatedAt: new Date(),
        }

        realm.create(TvSeason, payload, true)
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addEpisodeToWatchedList = (item: TvEpisodeDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, tmdbShowId, tmdbSeasonId, title, runtime } = item
        const tvEpisode = watchedEpisodeList.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: tvEpisode ? tvEpisode._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          tmdbShowId,
          tmdbSeasonId,
          title,
          runtime,
          updatedAt: new Date(),
        }

        realm.create(TvEpisode, payload, true)
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const updateShowList = (show: TvShowDetails) => {
    const watchedEpisodes = watchedEpisodeList.filter(
      ({ tmdbShowId }) => tmdbShowId === show!.tmdbId,
    )

    if (watchedEpisodes.length === 0) {
      if (inWantList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      } else if (inWatchingList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      } else if (inWatchedList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      }
    } else if (
      watchedEpisodes.length > 0 &&
      watchedEpisodes.length === show.episodesCount &&
      show.status !== TV_IN_PRODUCTION_STATUS
    ) {
      if (inWantList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      } else if (inWatchingList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      }

      addShowToWatchedList(show!)
    } else {
      if (inWantList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
      } else if (inWatchedList(show!.tmdbId)) {
        batchRemoveShowFromList([show!.tmdbId])
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
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
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
              batchRemoveSeasonFromList([season!.tmdbId])
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

  const batchRemoveShowFromList = (ids: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvShowList = tvShows.filter(({ tmdbId }) => ids.includes(tmdbId))

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

  const batchRemoveSeasonFromList = (ids: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvSeasonList = watchedSeasonList.filter(({ tmdbId }) =>
          ids.includes(tmdbId),
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

  const batchRemoveEpisodeFromList = (ids: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvEpisodeList = watchedEpisodeList.filter(({ tmdbId }) =>
          ids.includes(tmdbId),
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
    show: TvShowDetails
    season?: TvSeasonDetails
    episode?: TvEpisodeDetails
    type: "episode" | "season" | "show"
  }) => {
    return new Promise<void>((resolve, reject) => {
      try {
        realm.write(() => {
          if (type === "episode") {
            batchRemoveEpisodeFromList([episode!.tmdbId])
            batchRemoveSeasonFromList([season!.tmdbId])
          }

          if (type === "season") {
            batchRemoveEpisodeFromList(
              season!.items.map(({ tmdbId }) => tmdbId),
            )
            batchRemoveSeasonFromList([season!.tmdbId])
          }

          if (type === "show") {
            batchRemoveEpisodeFromList(
              show!.items.flatMap((showSeason) =>
                showSeason.items.map(({ tmdbId }) => tmdbId),
              ),
            )
            batchRemoveSeasonFromList(show!.items.map(({ tmdbId }) => tmdbId))
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

  const pinToList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      const tvShow = tvShows.find(({ tmdbId }) => tmdbId === item.id)

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

  const unpinFromList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      const tvShow = tvShows.find(({ tmdbId }) => tmdbId === item.id)

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
        inPinList,
        inWatchedSeasonList,
        inWatchedEpisodeList,
        addToWantList,
        addToWatchedList,
        removeFromList,
        pinToList,
        unpinFromList,
      }}
    >
      {children}
    </TvContext.Provider>
  )
}

export default TvProvider
