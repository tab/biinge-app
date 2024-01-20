declare module "react-native-config" {
  export interface NativeConfig {
    APP_ID: string
    SENTRY_DSN: string
    SENTRY_ENABLED: boolean
    TMDB_ACCESS_TOKEN: string
    YOUTUBE_API_KEY: string
  }

  export const Config: NativeConfig
  export default Config
}
