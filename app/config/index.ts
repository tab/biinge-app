import Config from "react-native-config"

export const APP_ID = Config.APP_ID || "realm-sync-app"

export const DEFAULT_LOCALE = "en"

export const NODE_ENV = process.env.NODE_ENV

export const TMDB_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p"
export const TMDB_ACCESS_TOKEN = Config.TMDB_ACCESS_TOKEN

export const YOUTUBE_API_KEY = Config.YOUTUBE_API_KEY
