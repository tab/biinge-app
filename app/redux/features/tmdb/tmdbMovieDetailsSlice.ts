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
  extraReducers: (builder) => {
    builder
      .addCase(movieDetails.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(movieDetails.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(movieDetails.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieDetails,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.movieDetails.fetchStatus[id]

export default tmdbMovieDetailsSlice.reducer
