import { combineReducers } from "redux"

import movieCredits from "redux/features/tmdb/tmdbMovieCreditsSlice"
import movieDetails from "redux/features/tmdb/tmdbMovieDetailsSlice"
import movieSearch from "redux/features/tmdb/tmdbMovieSearchSlice"
import movieTrending from "redux/features/tmdb/tmdbMovieTrendingSlice"
import peopleTrending from "redux/features/tmdb/tmdbPeopleTrendingSlice"
import personDetails from "redux/features/tmdb/tmdbPersonDetailsSlice"
import personMovieCredits from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"
import personSearch from "redux/features/tmdb/tmdbPersonSearchSlice"

export const features = combineReducers({
  movieCredits,
  movieDetails,
  movieSearch,
  movieTrending,
  peopleTrending,
  personDetails,
  personMovieCredits,
  personSearch,
})
