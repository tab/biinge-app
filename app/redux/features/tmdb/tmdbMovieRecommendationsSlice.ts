import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { movieRecommendations } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieRecommendationsSlice = createSlice({
  name: "movieRecommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(movieRecommendations.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(movieRecommendations.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(movieRecommendations.fulfilled, (state, { payload, meta }) => {
        adapter.upsertOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.movieRecommendations,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.movieRecommendations.fetchStatus[id]

export default tmdbMovieRecommendationsSlice.reducer
