import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/store"
import {
  handleFetchCollectionPending,
  handleFetchCollectionRejected,
  handleFetchCollectionFulfilled,
  handleFetchCollectionReset,
} from "redux/helpers/fetching"
import { personSearch, resetResults } from "redux/features/tmdb/tmdbThunk"

const adapter = createEntityAdapter()
export const initialState = adapter.getInitialState({
  fetchCollectionStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const tmdbMovieSearchSlice = createSlice({
  name: "personSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(personSearch.pending, (state) =>
        handleFetchCollectionPending(state),
      )
      .addCase(personSearch.rejected, (state) =>
        handleFetchCollectionRejected(state),
      )
      .addCase(personSearch.fulfilled, (state, { payload }) => {
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
  (state: RootState) => state.features.personSearch,
)

export const selectFetchStatus = (state: RootState) =>
  state.features.personSearch.fetchCollectionStatus

export default tmdbMovieSearchSlice.reducer
