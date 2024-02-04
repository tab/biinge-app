import { combineReducers } from "redux"

import movieDetails from "redux/features/tmdb/tmdbMovieDetailsSlice"
import movieSearch from "redux/features/tmdb/tmdbMovieSearchSlice"
import movieTrending from "redux/features/tmdb/tmdbMovieTrendingSlice"
import peopleTrending from "redux/features/tmdb/tmdbPeopleTrendingSlice"
import personDetails from "redux/features/tmdb/tmdbPersonDetailsSlice"
import personSearch from "redux/features/tmdb/tmdbPersonSearchSlice"
import tvDetails from "redux/features/tmdb/tmdbTvDetailsSlice"
import tvSearch from "redux/features/tmdb/tmdbTvSearchSlice"
import tvTrending from "redux/features/tmdb/tmdbTvTrendingSlice"

export const features = combineReducers({
  movieDetails,
  movieSearch,
  movieTrending,
  peopleTrending,
  personDetails,
  personSearch,
  tvDetails,
  tvSearch,
  tvTrending,
})
