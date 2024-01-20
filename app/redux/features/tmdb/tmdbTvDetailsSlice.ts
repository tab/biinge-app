import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { tvDetails } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbTvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tvDetails.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(tvDetails.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(tvDetails.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.tvDetails,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.tvDetails.fetchStatus[id]

export default tmdbTvDetailsSlice.reducer
