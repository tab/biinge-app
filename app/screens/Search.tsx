import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native"

import i18n from "config/i18n"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { searchMovie, resetSearchResults } from "redux/features/tmdb/tmdbThunk"
import { selectAll, selectFetchStatus } from "redux/features/tmdb/tmdbSlice"
import Form from "components/Search/Form"
import List from "components/Search/List"
import { layoutStyles } from "styles"
import { SearchFormValues, SearchResultListType } from "types"

const SearchModal = () => {
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState("")

  // NOTE: reset search results
  useEffect(() => {
    if (query) {
      dispatch(searchMovie(query))
    } else {
      dispatch(resetSearchResults())
    }
  }, [])

  const items = useAppSelector((state) =>
    selectAll(state),
  ) as SearchResultListType
  const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

  const handleSubmit = async (values: SearchFormValues) => {
    if (!fetchStatus.isFetching) {
      setQuery(values.query)
      dispatch(searchMovie(values.query))
    }
  }

  return (
    <SafeAreaView style={layoutStyles.root}>
      {/* @ts-ignore */}
      <Form initialValues={{ query: "" }} onSubmit={handleSubmit} />
      <List query={query} items={items} />
    </SafeAreaView>
  )
}

export const SEARCH_SCREEN = {
  name: "com.biinge.Search",
  title: i18n.t("search.title"),
}

export default SearchModal
