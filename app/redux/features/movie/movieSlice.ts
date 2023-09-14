import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/Store"

const movieAdapter = createEntityAdapter()
export const initialState = movieAdapter.getInitialState({})

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
})

export const {
  selectTotal,
  selectAll: selectMovies,
  selectById: selectMovieById,
} = movieAdapter.getSelectors((state: RootState) => state.features.movie)
export default movieSlice.reducer
