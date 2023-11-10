import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { searchMovie, resetSearchResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieSearchSlice = createSlice({
  name: "movieSearch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchMovie.pending, (state) => handleFetchPending(state))
      .addCase(searchMovie.rejected, (state) => handleFetchRejected(state))
      .addCase(searchMovie.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
      .addCase(resetSearchResults.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectTotal, selectAll } = adapter.getSelectors(
  (state: RootState) => state.features.movieSearch,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieSearch.fetchStatus

export default tmdbMovieSearchSlice.reducer
