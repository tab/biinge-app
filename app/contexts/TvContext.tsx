import React, { createContext, useMemo } from "react"
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

  const tvShows = useQuery<TvShow>(TvShow)
  const watchedSeasonList = useQuery<TvSeason>(TvSeason)
  const watchedEpisodeList = useQuery<TvEpisode>(TvEpisode)

  const wantShowList = useMemo(
    () => tvShows.filtered("want == $0", true),
    [tvShows],
  )
  const watchingShowList = useMemo(
    () => tvShows.filtered("watching == $0", true),
    [tvShows],
  )
  const watchedShowList = useMemo(
    () => tvShows.filtered("watched == $0", true),
    [tvShows],
  )
  const pinList = useMemo(() => tvShows.filtered("pin == $0", true), [tvShows])

  const pinIds = useMemo(
    () => pinList.map(({ tmdbId }: TvShow) => tmdbId),
    [pinList],
  )
  const wantShowIds = useMemo(
    () => wantShowList.map(({ tmdbId }: TvShow) => tmdbId),
    [wantShowList],
  )
  const watchingShowIds = useMemo(
    () => watchingShowList.map(({ tmdbId }: TvShow) => tmdbId),
    [watchingShowList],
  )
  const watchedShowIds = useMemo(
    () => watchedShowList.map(({ tmdbId }: TvShow) => tmdbId),
    [watchedShowList],
  )
  const watchedSeasonIds = useMemo(
    () => watchedSeasonList.map(({ tmdbId }: TvSeason) => tmdbId),
    [watchedSeasonList],
  )
  const watchedEpisodeIds = useMemo(
    () => watchedEpisodeList.map(({ tmdbId }: TvEpisode) => tmdbId),
    [watchedEpisodeList],
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
    if (season.items.length === 0) {return false}

    const episodeSet = new Set(season.items.map(({ tmdbId }) => tmdbId))
    const watchedSet = new Set(
      watchedEpisodeList
        .filter(({ tmdbSeasonId }) => tmdbSeasonId === season.tmdbId)
        .map(({ tmdbId }) => tmdbId),
    )

    if (episodeSet.size !== watchedSet.size) {return false}

    for (const id of episodeSet) {
      if (!watchedSet.has(id)) {return false}
    }

    return true
  }

  const addToWantList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)
        const isPinned = tvShow ? tvShow.pin : false

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
          pin: isPinned,
          updatedAt: new Date(),
        }

        realm.write(() => {
          realm.create(TvShow, payload, true)
        })
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const addShowToWatchingList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)
        const isPinned = tvShow ? tvShow.pin : false

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
          pin: isPinned,
          updatedAt: new Date(),
        }

        realm.write(() => {
          realm.create(TvShow, payload, true)
        })
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const addShowToWatchedList = (item: TvShowDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, episodesCount, status } = item
        const tvShow = tvShows.find(({ tmdbId }) => tmdbId === id)
        const isPinned = tvShow ? tvShow.pin : false

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
          pin: isPinned,
          updatedAt: new Date(),
        }

        realm.write(() => {
          realm.create(TvShow, payload, true)
        })
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
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
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
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
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const updateShowList = (show: TvShowDetails) => {
    const tvShow = tvShows.find(({ tmdbId }) => tmdbId === show.tmdbId)
    const isPinned = tvShow ? tvShow.pin : false

    const watchedEpisodes = watchedEpisodeList.filtered(
      "tmdbShowId == $0",
      show.tmdbId,
    )

    if (watchedEpisodes.length === 0) {
      if (
        inWantList(show.tmdbId) ||
        inWatchingList(show.tmdbId) ||
        inWatchedList(show.tmdbId)
      ) {
        batchRemoveShowFromList([show.tmdbId])
      }
    } else if (
      watchedEpisodes.length > 0 &&
      watchedEpisodes.length === show.episodesCount &&
      show.status !== TV_IN_PRODUCTION_STATUS
    ) {
      if (inWantList(show.tmdbId) || inWatchingList(show.tmdbId)) {
        batchRemoveShowFromList([show.tmdbId])
      }

      const showToUpdate = {
        ...show,
        pin: isPinned,
      }
      addShowToWatchedList(showToUpdate)
    } else {
      if (inWantList(show.tmdbId) || inWatchedList(show.tmdbId)) {
        batchRemoveShowFromList([show.tmdbId])
      }

      const showToUpdate = {
        ...show,
        pin: isPinned,
      }
      addShowToWatchingList(showToUpdate)
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
        const tvShowList = tvShows.filtered("tmdbId IN $0", ids)

        if (tvShowList.length > 0) {
          realm.delete(tvShowList)
        }
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const batchRemoveSeasonFromList = (ids: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvSeasonList = watchedSeasonList.filtered("tmdbId IN $0", ids)

        if (tvSeasonList.length > 0) {
          realm.delete(tvSeasonList)
        }
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
    })
  }

  const batchRemoveEpisodeFromList = (ids: number[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const tvEpisodeList = watchedEpisodeList.filtered("tmdbId IN $0", ids)

        if (tvEpisodeList.length > 0) {
          realm.delete(tvEpisodeList)
        }
        resolve()
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }
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
            const episodeIds = season!.items.map(({ tmdbId }) => tmdbId)
            batchRemoveEpisodeFromList(episodeIds)
            batchRemoveSeasonFromList([season!.tmdbId])
          }

          if (type === "show") {
            const episodeIds = show!.items.flatMap((showSeason) =>
              showSeason.items.map(({ tmdbId }) => tmdbId),
            )
            batchRemoveEpisodeFromList(episodeIds)
            batchRemoveSeasonFromList(show!.items.map(({ tmdbId }) => tmdbId))
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
          resolve()
        } catch (error) {
          Sentry.captureException(error)
          reject(error)
        }
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
          resolve()
        } catch (error) {
          Sentry.captureException(error)
          reject(error)
        }
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
