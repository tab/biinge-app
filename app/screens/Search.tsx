import React, { useState, useEffect } from "react"
import { View } from "react-native"

import { useAppSelector, useAppDispatch } from "redux/hooks"
import {
  movieSearch,
  personSearch,
  resetResults,
} from "redux/features/tmdb/tmdbThunk"
import { selectFetchStatus } from "redux/features/tmdb/tmdbMovieSearchSlice"
import KeyboardToggle from "components/ui/KeyboardToggle"
import Form from "components/Search/Form"
import Movies from "components/Search/Movies"
import People from "components/Search/People"
import TrendingMovies from "components/Search/TrendingMovies"
import TrendingPeople from "components/Search/TrendingPeople"
import { layoutStyles } from "styles"
import { SearchFormValues } from "types"

const SearchScreen = () => {
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState("")

  // NOTE: reset search results
  useEffect(() => {
    if (query) {
      dispatch(movieSearch(query))
      dispatch(personSearch(query))
    } else {
      dispatch(resetResults())
    }
  }, [dispatch, query])

  const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

  const handleSubmit = async (values: SearchFormValues) => {
    if (!fetchStatus.isFetching) {
      setQuery(values.query)
      dispatch(movieSearch(values.query))
      dispatch(personSearch(values.query))
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <Form initialValues={{ query: "" }} onSubmit={handleSubmit} />
      <View style={[layoutStyles.root, layoutStyles.bgLight]}>
        {query ? (
          <>
            <Movies />
            <People />
          </>
        ) : (
          <>
            <TrendingMovies />
            <TrendingPeople />
          </>
        )}
      </View>
      <KeyboardToggle />
    </>
  )
}

export const SEARCH_SCREEN = {
  id: "SEARCH_SCREEN",
  name: "com.biinge.Search",
}

export default SearchScreen
