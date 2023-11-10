import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { movieCredits } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieDetailsSlice = createSlice({
  name: "movieCredits",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(movieCredits.pending, (state) => handleFetchPending(state))
      .addCase(movieCredits.rejected, (state) => handleFetchRejected(state))
      .addCase(movieCredits.fulfilled, (state, { payload }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieCredits,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieCredits.fetchStatus

export default tmdbMovieDetailsSlice.reducer
