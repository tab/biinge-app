import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/Store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { fetchMedia } from "redux/features/media/mediaThunk"

const mediaAdapter = createEntityAdapter()
export const initialState = mediaAdapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMedia.pending, (state) => handleFetchPending(state))
      .addCase(fetchMedia.rejected, (state) => handleFetchRejected(state))
      .addCase(fetchMedia.fulfilled, (state, { payload }) => {
        mediaAdapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const {
  selectTotal,
  selectAll: selectMedias,
  selectById: selectMediaById,
} = mediaAdapter.getSelectors((state: RootState) => state.features.media)

export const selectFetchStatus = (state: RootState) =>
  state.features.media.fetchStatus

export default mediaSlice.reducer
