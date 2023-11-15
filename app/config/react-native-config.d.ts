declare module "react-native-config" {
  export interface NativeConfig {
    APP_ID: string
    TMDB_ACCESS_TOKEN: string
    YOUTUBE_API_KEY: string
  }

  export const Config: NativeConfig
  export default Config
}
