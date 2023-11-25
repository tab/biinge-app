import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { movieSearch, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieSearchSlice = createSlice({
  name: "movieSearch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(movieSearch.pending, (state) =>
        handleFetchCollectionPending(state),
      )
      .addCase(movieSearch.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(movieSearch.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchCollectionFulfilled(state)
      })
      .addCase(resetResults.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchCollectionReset(state)
      })
  },
})

export const { selectTotal, selectAll } = adapter.getSelectors(
  (state: RootState) => state.features.movieSearch,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.movieSearch.fetchCollectionStatus

export default tmdbMovieSearchSlice.reducer
