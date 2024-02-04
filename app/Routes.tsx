import React, { useRef } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, ThemeProvider } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useObject, useUser } from "@realm/react"

import { routingInstrumentation } from "../App"
import {
  APP_APPEARANCE_SYSTEM,
  APP_APPEARANCE_DARK,
  APP_APPEARANCE_LIGHT,
} from "config"
import { Profile } from "models"
import Root from "screens/Root"
import { MOVIES_SCREEN } from "screens/Movies"
import Details, { DETAILS_SCREEN } from "screens/Details"
import Person, { PERSON_SCREEN } from "screens/Person"
import Appearance, { APPEARANCE_SCREEN } from "screens/Appearance"
import Statistics, { STATISTICS_SCREEN } from "screens/Statistics"
import Privacy, { PRIVACY_SCREEN } from "screens/Privacy"
import Terms, { TERMS_SCREEN } from "screens/Terms"
import { darkTheme, lightTheme } from "styles/theme"

const Stack = createNativeStackNavigator()

const transparentModalOptions = {
  contentStyle: {
    backgroundColor: "transparent",
  },
}

const RouterComponent = () => {
  const navigation = useRef()

  const user = useUser()
  const profile = useObject<Profile>(Profile, user.id)

  const scheme = useColorScheme()
  const dark =
    profile?.appearance != null
      ? profile?.appearance === APP_APPEARANCE_DARK ||
        (profile?.appearance === APP_APPEARANCE_SYSTEM &&
          scheme === APP_APPEARANCE_DARK)
      : scheme === APP_APPEARANCE_DARK
  const theme = dark ? darkTheme : lightTheme

  return (
    <ThemeProvider value={theme}>
      <NavigationContainer
        // @ts-ignore
        ref={navigation}
        theme={theme}
        onReady={() => {
          routingInstrumentation.registerNavigationContainer(navigation)
        }}
      >
        <Stack.Navigator initialRouteName={MOVIES_SCREEN.name}>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{
              headerShown: false,
              statusBarStyle: dark ? APP_APPEARANCE_LIGHT : APP_APPEARANCE_DARK,
            }}
          />
          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: "modal",
            }}
          >
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
            <Stack.Screen
              name={APPEARANCE_SCREEN.name}
              component={Appearance}
              options={transparentModalOptions}
            />
            <Stack.Screen
              name={STATISTICS_SCREEN.name}
              component={Statistics}
              options={transparentModalOptions}
            />
            <Stack.Screen
              name={PRIVACY_SCREEN.name}
              component={Privacy}
              options={transparentModalOptions}
            />
            <Stack.Screen
              name={TERMS_SCREEN.name}
              component={Terms}
              options={transparentModalOptions}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default RouterComponent
