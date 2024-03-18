import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { episodeDetails } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbEpisodeDetailsSlice = createSlice({
  name: "episodeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(episodeDetails.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg.id),
      )
      .addCase(episodeDetails.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg.id),
      )
      .addCase(episodeDetails.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg.id)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.episodeDetails,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.episodeDetails.fetchStatus[id]

export default tmdbEpisodeDetailsSlice.reducer
