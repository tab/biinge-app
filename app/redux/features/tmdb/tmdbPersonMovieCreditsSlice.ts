import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { personMovieCredits } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieDetailsSlice = createSlice({
  name: "personMovieCredits",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(personMovieCredits.pending, (state) => handleFetchPending(state))
      .addCase(personMovieCredits.rejected, (state) =>
        handleFetchRejected(state),
      )
      .addCase(personMovieCredits.fulfilled, (state, { payload }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.personMovieCredits,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.personMovieCredits.fetchStatus

export default tmdbMovieDetailsSlice.reducer
