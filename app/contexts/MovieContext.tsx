import React, { createContext } from "react"
import { BSON } from "realm"
import { useUser, useRealm, useQuery } from "@realm/react"
import * as Sentry from "@sentry/react-native"

import { Movie } from "models"
import { MovieDetails } from "types"

type MovieContextType = {
  inWantList: (tmdbId: number) => boolean
  inWatchedList: (tmdbId: number) => boolean
  inPinList: (tmdbId: number) => boolean
  addToWantList: (item: MovieDetails) => Promise<void>
  addToWatchedList: (item: MovieDetails) => Promise<void>
  removeFromList: (tmdbId: number) => Promise<void>
  pinToList: (item: MovieDetails) => Promise<void>
  unpinFromList: (item: MovieDetails) => Promise<void>
}

export const MovieContext = createContext<MovieContextType>({
  inWantList(_tmdbId: number): boolean {
    return false
  },
  inWatchedList(_tmdbId: number): boolean {
    return false
  },
  inPinList(_tmdbId: number): boolean {
    return false
  },
  addToWantList(_item: MovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  addToWatchedList(_item: MovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  removeFromList(_tmdbId: number): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  pinToList(_item: MovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  unpinFromList(_item: MovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
})

const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const realm = useRealm()
  const user = useUser()

  const movies = useQuery<Movie>(Movie)

  const wantList = movies.filtered("want == $0", true)
  const watchedList = movies.filtered("watched == $0", true)
  const pinList = movies.filtered("pin == $0", true)

  const wantIds = wantList.map(({ tmdbId }: Movie) => tmdbId)
  const watchedIds = watchedList.map(({ tmdbId }: Movie) => tmdbId)
  const pinIds = pinList.map(({ tmdbId }: Movie) => tmdbId)

  const inWantList = (tmdbId: number) => wantIds.includes(tmdbId)
  const inWatchedList = (tmdbId: number) => watchedIds.includes(tmdbId)
  const inPinList = (tmdbId: number) => pinIds.includes(tmdbId)

  const addToWantList = (item: MovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, runtime } = item
        const movie = movies.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: movie ? movie._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          imdbId,
          title,
          posterPath,
          runtime,
          want: true,
          watched: false,
          pin: false,
          updatedAt: new Date(),
        }

        realm.write(() => {
          realm.create(Movie, payload, true)
        })
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const addToWatchedList = (item: MovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, imdbId, title, posterPath, runtime } = item
        const movie = movies.find(({ tmdbId }) => tmdbId === id)

        const payload = {
          _id: movie ? movie._id : new BSON.ObjectId(),
          userId: user.id,
          tmdbId: id,
          imdbId,
          title,
          posterPath,
          runtime,
          want: false,
          watched: true,
          pin: false,
          updatedAt: new Date(),
        }

        realm.write(() => {
          realm.create(Movie, payload, true)
        })
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const removeFromList = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const movie = movies.find(({ tmdbId }) => tmdbId === id)

        realm.write(() => {
          realm.delete(movie)
        })
      } catch (error) {
        Sentry.captureException(error)
        reject(error)
      }

      resolve()
    })
  }

  const pinToList = (item: MovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      const movie = movies.find(({ tmdbId }) => tmdbId === item.id)

      if (movie) {
        try {
          const payload = {
            _id: movie._id,
            pin: true,
            updatedAt: new Date(),
          }

          realm.write(() => {
            realm.create(Movie, payload, true)
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

  const unpinFromList = (item: MovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      const movie = movies.find(({ tmdbId }) => tmdbId === item.id)

      if (movie) {
        try {
          const payload = {
            _id: movie._id,
            pin: false,
            updatedAt: new Date(),
          }

          realm.write(() => {
            realm.create(Movie, payload, true)
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
    <MovieContext.Provider
      value={{
        inWantList,
        inWatchedList,
        inPinList,
        addToWantList,
        addToWatchedList,
        removeFromList,
        pinToList,
        unpinFromList,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider
