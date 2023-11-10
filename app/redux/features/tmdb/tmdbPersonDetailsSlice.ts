import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { personDetails } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieDetailsSlice = createSlice({
  name: "personDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(personDetails.pending, (state) => handleFetchPending(state))
      .addCase(personDetails.rejected, (state) => handleFetchRejected(state))
      .addCase(personDetails.fulfilled, (state, { payload }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.personDetails,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.personDetails.fetchStatus

export default tmdbMovieDetailsSlice.reducer
