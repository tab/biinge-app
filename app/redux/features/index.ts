import { combineReducers } from "redux"

import movieSearch from "redux/features/tmdb/tmdbMovieSearchSlice"
import movieDetails from "redux/features/tmdb/tmdbMovieDetailsSlice"
import movieCredits from "redux/features/tmdb/tmdbMovieCreditsSlice"
import personDetails from "redux/features/tmdb/tmdbPersonDetailsSlice"
import personMovieCredits from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"

export const features = combineReducers({
  movieSearch,
  movieDetails,
  movieCredits,
  personDetails,
  personMovieCredits,
})
