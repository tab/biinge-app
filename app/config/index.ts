import Config from "react-native-config"

export const APP_ID = Config.APP_ID

export const DEFAULT_LOCALE = "en"

export const SENTRY_DSN = Config.SENTRY_DSN
export const SENTRY_ENABLED = Config.SENTRY_ENABLED || false

export const TMDB_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p"
export const TMDB_ACCESS_TOKEN = Config.TMDB_ACCESS_TOKEN

export const YOUTUBE_API_KEY = Config.YOUTUBE_API_KEY

export const DETAILS_MOVIE_TYPE = "movie"
export const DETAILS_TV_TYPE = "tv"
export const DETAILS_EPISODE_TYPE = "episode"

export const TV_IN_PRODUCTION_STATUS = "Returning Series"

export const APP_APPEARANCE_SYSTEM = "system"
export const APP_APPEARANCE_DARK = "dark"
export const APP_APPEARANCE_LIGHT = "light"
