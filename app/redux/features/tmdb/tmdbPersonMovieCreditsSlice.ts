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
      .addCase(personMovieCredits.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(personMovieCredits.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(personMovieCredits.fulfilled, (state, { payload, meta }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.personMovieCredits,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.personMovieCredits.fetchStatus[id]

export default tmdbMovieDetailsSlice.reducer
