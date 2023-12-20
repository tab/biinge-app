import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { trendingMovie, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieTrendingSlice = createSlice({
  name: "movieTrending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trendingMovie.pending, (state) =>
        handleFetchCollectionPending(state),
      )
      .addCase(trendingMovie.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(trendingMovie.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchCollectionFulfilled(state)
      })
      .addCase(resetResults.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchCollectionReset(state)
      })
  },
})

export const { selectTotal, selectAll } = adapter.getSelectors(
  (state: RootState) => state.features.movieTrending,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieTrending.fetchCollectionStatus

export default tmdbMovieTrendingSlice.reducer
