import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { tvCredits } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvCreditsSlice = createSlice({
  name: "tvCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tvCredits.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(tvCredits.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(tvCredits.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.tvCredits,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.tvCredits.fetchStatus[id]

export default tmdbTvCreditsSlice.reducer
