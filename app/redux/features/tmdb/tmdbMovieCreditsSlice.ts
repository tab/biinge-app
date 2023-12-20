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

export const tmdbMovieCreditsSlice = createSlice({
  name: "movieCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieCredits.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(movieCredits.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(movieCredits.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieCredits,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.movieCredits.fetchStatus[id]

export default tmdbMovieCreditsSlice.reducer
