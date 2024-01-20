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
import personTvCredits from "redux/features/tmdb/tmdbPersonTvCreditsSlice"
import personSearch from "redux/features/tmdb/tmdbPersonSearchSlice"
import tvDetails from "redux/features/tmdb/tmdbTvDetailsSlice"
import tvCredits from "redux/features/tmdb/tmdbTvCreditsSlice"
import tvSeasons from "redux/features/tmdb/tmdbTvSeasonsSlice"
import tvVideos from "redux/features/tmdb/tmdbTvVideosSlice"
import tvSearch from "redux/features/tmdb/tmdbTvSearchSlice"
import tvTrending from "redux/features/tmdb/tmdbTvTrendingSlice"

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
  personTvCredits,
  personSearch,
  tvDetails,
  tvCredits,
  tvSeasons,
  tvVideos,
  tvSearch,
  tvTrending,
})
