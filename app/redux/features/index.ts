import { combineReducers } from "redux"

import movieCredits from "redux/features/tmdb/tmdbMovieCreditsSlice"
import movieDetails from "redux/features/tmdb/tmdbMovieDetailsSlice"
import movieRecommendations from "redux/features/tmdb/tmdbMovieRecommendationsSlice"
import movieSearch from "redux/features/tmdb/tmdbMovieSearchSlice"
import movieTrending from "redux/features/tmdb/tmdbMovieTrendingSlice"
import movieVideos from "redux/features/tmdb/tmdbMovieVideosSlice"
import peopleTrending from "redux/features/tmdb/tmdbPeopleTrendingSlice"
import personDetails from "redux/features/tmdb/tmdbPersonDetailsSlice"
import personMovieCredits from "redux/features/tmdb/tmdbPersonMovieCreditsSlice"
import personSearch from "redux/features/tmdb/tmdbPersonSearchSlice"

export const features = combineReducers({
  movieCredits,
  movieDetails,
  movieRecommendations,
  movieSearch,
  movieTrending,
  movieVideos,
  peopleTrending,
  personDetails,
  personMovieCredits,
  personSearch,
})
