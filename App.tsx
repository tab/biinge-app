/**
 * @format
 */

import "config/i18n"

import { AppWrapperNonSync } from "./app/AppWrapperNonSync"
import { AppWrapperSync } from "./app/AppWrapperSync"
import { SYNC_CONFIG } from "./sync.config"

const App = () =>
  SYNC_CONFIG.enabled ? (
    <AppWrapperSync appId={SYNC_CONFIG.appId} />
  ) : (
    <AppWrapperNonSync />
  )

export default App
