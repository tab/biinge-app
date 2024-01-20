import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { tvVideos } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvVideosSlice = createSlice({
  name: "tvVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tvVideos.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(tvVideos.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(tvVideos.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.tvVideos,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.tvVideos.fetchStatus[id]

export default tmdbTvVideosSlice.reducer
