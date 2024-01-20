import { AppProvider, UserProvider } from "@realm/react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as Sentry from "@sentry/react-native"

import { APP_ID, SENTRY_DSN, SENTRY_ENABLED } from "./app/config"
import Sync from "./app/Sync"
import Routes from "./app/Routes"
import Login from "./app/screens/Login"
import { layoutStyles } from "./app/styles"

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: SENTRY_ENABLED ? SENTRY_DSN : undefined,
  environment: __DEV__ ? "development" : "production",
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
})

const App = () => {
  return (
    // @ts-ignore
    <AppProvider id={APP_ID}>
      <UserProvider fallback={Login}>
        <Sync>
          <GestureHandlerRootView style={layoutStyles.root}>
            <Routes />
          </GestureHandlerRootView>
        </Sync>
      </UserProvider>
    </AppProvider>
  )
}

export default Sentry.wrap(App)
