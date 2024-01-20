import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { tvSeasons } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvSeasonsSlice = createSlice({
  name: "tvSeasons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tvSeasons.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(tvSeasons.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(tvSeasons.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.tvSeasons,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.tvSeasons.fetchStatus[id]

export default tmdbTvSeasonsSlice.reducer
