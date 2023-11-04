import { combineReducers } from "redux"

import tmdbReducer from "redux/features/tmdb/tmdbSlice"

export const features = combineReducers({
  tmdb: tmdbReducer,
})
