import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import {
  movieDetails,
  searchMovie,
  resetSearchResults,
} from "redux/features/tmdb/tmdbThunk"

const tmdbAdapter = createEntityAdapter()
export const initialState = tmdbAdapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(movieDetails.pending, (state) => handleFetchPending(state))
      .addCase(movieDetails.rejected, (state) => handleFetchRejected(state))
      .addCase(movieDetails.fulfilled, (state, { payload }) => {
        tmdbAdapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
      .addCase(searchMovie.pending, (state) => handleFetchPending(state))
      .addCase(searchMovie.rejected, (state) => handleFetchRejected(state))
      .addCase(searchMovie.fulfilled, (state, { payload }) => {
        tmdbAdapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
      .addCase(resetSearchResults.fulfilled, (state, { payload }) => {
        tmdbAdapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectTotal, selectAll, selectById } = tmdbAdapter.getSelectors(
  (state: RootState) => state.features.tmdb,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.tmdb.fetchStatus

export default tmdbSlice.reducer
