import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
  handleFetchReset,
} from "redux/helpers/fetching"
import { trendingPeople, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbPeopleTrendingSlice = createSlice({
  name: "peopleTrending",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(trendingPeople.pending, (state) => handleFetchPending(state))
      .addCase(trendingPeople.rejected, (state) => handleFetchRejected(state))
      .addCase(trendingPeople.fulfilled, (state, { payload }) => {
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
  (state: RootState) => state.features.peopleTrending,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.peopleTrending.fetchStatus

export default tmdbPeopleTrendingSlice.reducer
