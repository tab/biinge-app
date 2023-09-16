import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/Store"
import {
  handleFetchPending,
  handleFetchRejected,
  handleFetchFulfilled,
} from "redux/helpers/fetching"
import { fetchMovie } from "redux/features/movie/movieThunk"

const movieAdapter = createEntityAdapter()
export const initialState = movieAdapter.getInitialState({
  fetchStatus: {
    isFetching: false,
    isSuccess: false,
    isFailed: false,
  },
})

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => handleFetchPending(state))
      .addCase(fetchMovie.rejected, (state) => handleFetchRejected(state))
      .addCase(fetchMovie.fulfilled, (state, { payload }) => {
        movieAdapter.setOne(state, payload)
        handleFetchFulfilled(state)
      })
  },
})

export const {
  selectTotal,
  selectAll: selectMovies,
  selectById: selectMovieById,
} = movieAdapter.getSelectors((state: RootState) => state.features.movie)

export const selectFetchStatus = (state: RootState) =>
  state.features.movie.fetchStatus

export default movieSlice.reducer
