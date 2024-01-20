import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { tvSearch, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvSearchSlice = createSlice({
  name: "tvSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tvSearch.pending, (state) => handleFetchCollectionPending(state))
      .addCase(tvSearch.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(tvSearch.fulfilled, (state, { payload }) => {
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
  (state: RootState) => state.features.tvSearch,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.tvSearch.fetchCollectionStatus

export default tmdbTvSearchSlice.reducer
