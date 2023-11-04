declare module "react-native-config" {
  export interface NativeConfig {
    APP_ID: string
    TMDB_ACCESS_TOKEN: string
  }

  export const Config: NativeConfig
  export default Config
}
