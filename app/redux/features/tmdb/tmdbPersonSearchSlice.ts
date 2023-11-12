import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
  handleFetchReset,
} from "redux/helpers/fetching"
import { personSearch, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieSearchSlice = createSlice({
  name: "personSearch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(personSearch.pending, (state) => handleFetchPending(state))
      .addCase(personSearch.rejected, (state) => handleFetchRejected(state))
      .addCase(personSearch.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchFulfilled(state)
      })
      .addCase(resetResults.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload)
        handleFetchReset(state)
      })
  },
})

export const { selectTotal, selectAll } = adapter.getSelectors(
  (state: RootState) => state.features.personSearch,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.personSearch.fetchStatus

export default tmdbMovieSearchSlice.reducer
