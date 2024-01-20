import React, { createContext } from "react"
import { useObject, useUser, useRealm, useQuery } from "@realm/react"

import { UserMovie, Movie } from "models"
import { TMDBMovieDetails } from "types"

type MovieContextType = {
  inWantList: (tmdbId: number) => boolean
  inWatchedList: (tmdbId: number) => boolean
  addToWantList: (item: TMDBMovieDetails) => Promise<void>
  addToWatchedList: (item: TMDBMovieDetails) => Promise<void>
  removeFromList: (tmdbId: number) => Promise<void>
  pinned: (tmdbId: number) => boolean
  pinToList: (item: TMDBMovieDetails) => Promise<void>
  unpinFromList: (item: TMDBMovieDetails) => Promise<void>
}

export const MovieContext = createContext<MovieContextType>({
  inWantList(_tmdbId: number): boolean {
    return false
  },
  inWatchedList(_tmdbId: number): boolean {
    return false
  },
  addToWantList(_item: TMDBMovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  addToWatchedList(_item: TMDBMovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  removeFromList(_tmdbId: number): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  pinned(_tmdbId: number): boolean {
    return false
  },
  pinToList(_item: TMDBMovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
  unpinFromList(_item: TMDBMovieDetails): Promise<void> {
    return new Promise((resolve, _) => {
      resolve()
    })
  },
})

const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const realm = useRealm()
  const user = useUser()

  const movies = useQuery<Movie>(Movie)
  const userMovie = useObject<UserMovie>(UserMovie, user.id)

  const wantList = userMovie?.want || []
  const watchedList = userMovie?.watched || []

  const wantIds = wantList.map(({ tmdb_id }: Movie) => tmdb_id)
  const watchedIds = watchedList.map(({ tmdb_id }: Movie) => tmdb_id)

  const inWantList = (tmdbId: number) => wantIds.includes(tmdbId)
  const inWatchedList = (tmdbId: number) => watchedIds.includes(tmdbId)

  const addToWantList = (item: TMDBMovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = item
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          pin: false,
          updatedAt: new Date(),
        }

        realm.write(() => {
          if (!inWantList(id)) {
            const movie = realm.create(Movie, payload, true)
            // @ts-ignore
            wantList.unshift(movie)
          }

          // @ts-ignore
          realm.create(
            UserMovie,
            {
              _id: user.id,
              userId: user.id,
              want: wantList,
            },
            true,
          )
        })
      } catch (error) {
        reject(error)
      }

      resolve()
    })
  }

  const addToWatchedList = (item: TMDBMovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const { id, ...tmdbDetails } = item
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          pin: false,
          updatedAt: new Date(),
        }

        realm.write(() => {
          if (!inWatchedList(id)) {
            const movie = realm.create(Movie, payload, true)
            // @ts-ignore
            watchedList.unshift(movie)
          }

          // @ts-ignore
          realm.create(
            UserMovie,
            {
              _id: user.id,
              userId: user.id,
              watched: watchedList,
            },
            true,
          )
        })
      } catch (error) {
        reject(error)
      }

      resolve()
    })
  }

  const removeFromList = (tmdbId: number) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const movie = movies.find(({ tmdb_id }) => tmdb_id === tmdbId)

        realm.write(() => {
          realm.delete(movie)
        })
      } catch (error) {
        reject(error)
      }

      resolve()
    })
  }

  const pinned = (tmdbId: number) => {
    const movie = movies.find(({ tmdb_id }) => tmdb_id === tmdbId)

    return movie?.pin || false
  }

  const pinToList = (item: TMDBMovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      const movie = movies.find(({ tmdb_id }) => tmdb_id === item.id)

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
          reject(error)
        }

        resolve()
      } else {
        resolve()
      }
    })
  }

  const unpinFromList = (item: TMDBMovieDetails) => {
    return new Promise<void>((resolve, reject) => {
      const movie = movies.find(({ tmdb_id }) => tmdb_id === item.id)

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
        addToWantList,
        addToWatchedList,
        removeFromList,
        pinned,
        pinToList,
        unpinFromList,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider
