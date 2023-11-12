import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
  handleFetchReset,
} from "redux/helpers/fetching"
import { trendingMovie, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieTrendingSlice = createSlice({
  name: "movieTrending",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(trendingMovie.pending, (state) => handleFetchPending(state))
      .addCase(trendingMovie.rejected, (state) => handleFetchRejected(state))
      .addCase(trendingMovie.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
      .addCase(resetResults.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchReset(state)
      })
  },
})

export const { selectTotal, selectAll } = adapter.getSelectors(
  (state: RootState) => state.features.movieTrending,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieTrending.fetchStatus

export default tmdbMovieTrendingSlice.reducer
