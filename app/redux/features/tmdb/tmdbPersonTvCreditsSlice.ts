import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { personTvCredits } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbPersonTvCreditsSlice = createSlice({
  name: "personTvCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(personTvCredits.pending, (state, { meta }) =>
        handleFetchPending(state, meta.arg),
      )
      .addCase(personTvCredits.rejected, (state, { meta }) =>
        handleFetchRejected(state, meta.arg),
      )
      .addCase(personTvCredits.fulfilled, (state, { payload, meta }) => {
        adapter.setOne(state, payload)
        handleFetchFulfilled(state, meta.arg)
      })
  },
})

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.features.personTvCredits,
)

export const selectFetchStatus = (state: RootState, id: number) =>
  // @ts-ignore
  state.features.personTvCredits.fetchStatus[id]

export default tmdbPersonTvCreditsSlice.reducer
