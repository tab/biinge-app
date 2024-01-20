import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import { useAppSelector, useAppDispatch } from "redux/hooks"
import {
  movieSearch,
  tvSearch,
  personSearch,
  resetResults,
} from "redux/features/tmdb/tmdbThunk"
import { selectFetchStatus } from "redux/features/tmdb/tmdbMovieSearchSlice"
import KeyboardToggle from "components/ui/KeyboardToggle"
import Form from "components/Search/Form"
import Movies from "components/Search/Movies"
import TvShows from "components/Search/TvShows"
import People from "components/Search/People"
import TrendingMovies from "components/Search/TrendingMovies"
import TrendingTvShows from "components/Search/TrendingTvShows"
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
      dispatch(tvSearch(query))
      dispatch(personSearch(query))
    } else {
      dispatch(resetResults())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStatus = useAppSelector((state) => selectFetchStatus(state))

  const handleSubmit = async (values: SearchFormValues) => {
    if (!fetchStatus.isFetching) {
      setQuery(values.query)
      dispatch(movieSearch(values.query))
      dispatch(tvSearch(values.query))
      dispatch(personSearch(values.query))
    }
  }

  const SEARCH_ITEMS = [
    {
      key: "searchMovies",
      component: <Movies />,
    },
    {
      key: "searchTvShows",
      component: <TvShows />,
    },
    {
      key: "searchPeople",
      component: <People />,
    },
  ]

  const TRENDING_ITEMS = [
    {
      key: "trendingMovies",
      component: <TrendingMovies />,
    },
    {
      key: "trendingTvShows",
      component: <TrendingTvShows />,
    },
    {
      key: "trendingPeople",
      component: <TrendingPeople />,
    },
  ]

  const SECTIONS = query ? SEARCH_ITEMS : TRENDING_ITEMS

  const renderItem = ({ item }: { item: any }) => {
    return item.component
  }

  return (
    <View style={[layoutStyles.root, layoutStyles.bgLight]}>
      {/* @ts-ignore */}
      <Form initialValues={{ query: "" }} onSubmit={handleSubmit} />
      <FlashList
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        data={SECTIONS}
        renderItem={renderItem}
        estimatedItemSize={500}
      />
      <KeyboardToggle />
    </View>
  )
}

export const SEARCH_SCREEN = {
  id: "SEARCH_SCREEN",
  name: "com.biinge.Search",
}

export default SearchScreen
