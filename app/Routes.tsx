import { useColorScheme } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HeaderBackground } from "@react-navigation/elements"
import { useTranslation } from "react-i18next"

import Discover, { DISCOVER_SCREEN } from "screens/Discover"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"
import Details, { DETAILS_SCREEN } from "screens/Details"
import Person, { PERSON_SCREEN } from "screens/Person"
import colors from "styles/colors"

const Stack = createNativeStackNavigator()

const transparentModalOptions = {
  contentStyle: {
    backgroundColor: "transparent",
  },
}

const RouterComponent = () => {
  const { t } = useTranslation()

  const scheme = useColorScheme()
  const dark = scheme === "dark"

  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={DISCOVER_SCREEN.name}>
        <Stack.Group
          screenOptions={{
            headerTitle: t("app.name"),
            headerShadowVisible: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerBackground: () => (
              <HeaderBackground style={{ backgroundColor: colors.black }} />
            ),
            statusBarStyle: "light",
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
          <Stack.Screen name={PROFILE_SCREEN.name} component={Profile} />
          <Stack.Screen
            name={DETAILS_SCREEN.name}
            component={Details}
            options={transparentModalOptions}
          />
          <Stack.Screen
            name={PERSON_SCREEN.name}
            component={Person}
            options={transparentModalOptions}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: "modal",
          }}
        >
          <Stack.Screen name={SEARCH_SCREEN.name} component={Search} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouterComponent
