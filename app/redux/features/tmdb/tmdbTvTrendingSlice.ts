import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { trendingTv, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvTrendingSlice = createSlice({
  name: "tvTrending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trendingTv.pending, (state) =>
        handleFetchCollectionPending(state),
      )
      .addCase(trendingTv.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(trendingTv.fulfilled, (state, { payload }) => {
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
  (state: RootState) => state.features.tvTrending,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.tvTrending.fetchCollectionStatus

export default tmdbTvTrendingSlice.reducer
