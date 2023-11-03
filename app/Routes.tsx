import { useColorScheme } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Discover, { DISCOVER_SCREEN } from "screens/Discover"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"
import Details, { DETAILS_SCREEN } from "screens/Details"

const Stack = createNativeStackNavigator()

const transparentModalOptions = {
  contentStyle: {
    backgroundColor: "transparent",
  },
}

const RouterComponent = () => {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={DISCOVER_SCREEN.name}>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            statusBarStyle: "auto",
          }}
        >
          <Stack.Screen name={DISCOVER_SCREEN.name} component={Discover} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: "modal",
          }}
        >
          <Stack.Screen name={SEARCH_SCREEN.name} component={Search} />
          <Stack.Screen name={PROFILE_SCREEN.name} component={Profile} />
          <Stack.Screen
            name={DETAILS_SCREEN.name}
            component={Details}
            options={transparentModalOptions}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouterComponent
