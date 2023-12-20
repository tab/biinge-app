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
  extraReducers: (builder) => {
    builder
      .addCase(movieVideos.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(movieVideos.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(movieVideos.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieVideos,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.movieVideos.fetchStatus[id]

export default tmdbMovieDetailsSlice.reducer
