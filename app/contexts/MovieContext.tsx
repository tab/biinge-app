import React, { createContext, useState } from "react"
import type Realm from "realm"
import { useObject, useUser, useRealm, useQuery } from "@realm/react"

import { UserMovie, Movie } from "models"
import { TMDBMovieDetails } from "types"

interface MovieContextType {
  loading: boolean
  wantList: () => Realm.List<Movie> | never[]
  watchedList: () => Realm.List<Movie> | never[]
  inWantList: (tmdbId: number) => boolean
  inWatchedList: (tmdbId: number) => boolean
  addToWantList: (item: TMDBMovieDetails) => void
  addToWatchedList: (item: TMDBMovieDetails) => void
  removeFromList: (tmdbId: number) => void
}

export const MovieContext = createContext<MovieContextType>({
  loading: false,
  wantList(): Realm.List<Movie> | never[] {
    return []
  },
  watchedList(): Realm.List<Movie> | never[] {
    return []
  },
  inWantList(tmdbId: number): boolean {
    return false
  },
  inWatchedList(tmdbId: number): boolean {
    return false
  },
  addToWantList(item: TMDBMovieDetails): void {},
  addToWatchedList(item: TMDBMovieDetails): void {},
  removeFromList(tmdbId: number): void {},
})

const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const realm = useRealm()
  const user = useUser()

  const movies = useQuery(Movie)
  const userMovie = useObject(UserMovie, user.id)

  const [loading, setLoading] = useState(false)

  const wantList = () => userMovie?.want || []

  const watchedList = () => userMovie?.watched || []

  const wantIds = wantList().map(({ tmdb_id }: Movie) => tmdb_id)

  const watchedIds = watchedList().map(({ tmdb_id }: Movie) => tmdb_id)

  const inWantList = (tmdbId: number) => wantIds.includes(tmdbId)

  const inWatchedList = (tmdbId: number) => watchedIds.includes(tmdbId)

  const addToWantList = (item: TMDBMovieDetails) => {
    setLoading(true)

    setTimeout(() => {
      try {
        const { id, ...tmdbDetails } = item
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          updatedAt: new Date(),
        }

        realm.write(() => {
          const want = wantList()

          if (!inWantList(id)) {
            const movie = realm.create(Movie, payload, true)
            // @ts-ignore
            want.unshift(movie)
          }

          // @ts-ignore
          realm.create(
            UserMovie,
            {
              _id: user.id,
              userId: user.id,
              want,
            },
            true,
          )
        })
      } finally {
        setLoading(false)
      }
    }, 200)
  }

  const addToWatchedList = (item: TMDBMovieDetails) => {
    setLoading(true)

    setTimeout(() => {
      try {
        const { id, ...tmdbDetails } = item
        const payload = {
          ...tmdbDetails,
          userId: user.id,
          tmdb_id: id,
          updatedAt: new Date(),
        }

        realm.write(() => {
          const watched = watchedList()

          if (!inWatchedList(id)) {
            const movie = realm.create(Movie, payload, true)
            // @ts-ignore
            watched.unshift(movie)
          }

          // @ts-ignore
          realm.create(
            UserMovie,
            {
              _id: user.id,
              userId: user.id,
              watched,
            },
            true,
          )
        })
      } finally {
        setLoading(false)
      }
    }, 200)
  }

  const removeFromList = (tmdbId: number) => {
    setLoading(true)

    try {
      const movie = movies.find(({ tmdb_id }) => tmdb_id === tmdbId)

      realm.write(() => {
        realm.delete(movie)
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MovieContext.Provider
      value={{
        loading,
        wantList,
        watchedList,
        inWantList,
        inWatchedList,
        addToWantList,
        addToWatchedList,
        removeFromList,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider
