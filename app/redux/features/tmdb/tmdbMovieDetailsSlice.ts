import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { movieDetails } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(movieDetails.pending, (state) => handleFetchPending(state))
      .addCase(movieDetails.rejected, (state) => handleFetchRejected(state))
      .addCase(movieDetails.fulfilled, (state, { payload }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieDetails,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieDetails.fetchStatus

export default tmdbMovieDetailsSlice.reducer
