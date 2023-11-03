import { AppProvider, UserProvider } from "@realm/react"

import { APP_ID } from "./app/config"
import Sync from "./app/Sync"
import Routes from "./app/Routes"
import Login from "./app/screens/Login"

const App = () => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={Login}>
        <Sync>
          <Routes />
        </Sync>
      </UserProvider>
    </AppProvider>
  )
}

export default App
