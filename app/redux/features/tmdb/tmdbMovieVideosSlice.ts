import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { movieVideos } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieDetailsSlice = createSlice({
  name: "movieVideos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(movieVideos.pending, (state) => handleFetchPending(state))
      .addCase(movieVideos.rejected, (state) => handleFetchRejected(state))
      .addCase(movieVideos.fulfilled, (state, { payload }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieVideos,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieVideos.fetchStatus

export default tmdbMovieDetailsSlice.reducer
