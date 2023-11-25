import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { trendingPeople, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
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
      .addCase(trendingPeople.pending, (state) =>
        handleFetchCollectionPending(state),
      )
      .addCase(trendingPeople.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(trendingPeople.fulfilled, (state, { payload }) => {
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
  (state: RootState) => state.features.peopleTrending,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.peopleTrending.fetchCollectionStatus

export default tmdbPeopleTrendingSlice.reducer
