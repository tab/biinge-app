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

export const tmdbPersonDetailsSlice = createSlice({
  name: "personDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(personDetails.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(personDetails.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(personDetails.fulfilled, (state, { payload, meta }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectById } = adapter.getSelectors(
  (state: RootState) => state.features.personDetails,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.personDetails.fetchStatus[id]

export default tmdbPersonDetailsSlice.reducer
