import { combineReducers } from "redux"

import movieReducer from "redux/features/movie/movieSlice"

export const features = combineReducers({
  movie: movieReducer,
})
