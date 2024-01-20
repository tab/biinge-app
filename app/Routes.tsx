import React, { useRef } from "react"
import { useColorScheme } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import i18n from "config/i18n"
import { routingInstrumentation } from "../App"
import Movies, { MOVIES_SCREEN } from "screens/Movies"
import Tv, { TV_SCREEN } from "screens/Tv"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"
import Details, { DETAILS_SCREEN } from "screens/Details"
import Person, { PERSON_SCREEN } from "screens/Person"
import Icon from "components/ui/Icon"
import ProfileIcon from "components/Layout/ProfileIcon"
import colors from "styles/colors"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const transparentModalOptions = {
  contentStyle: {
    backgroundColor: "transparent",
  },
}

const Root = () => {
  return (
    <Tab.Navigator
      initialRouteName={MOVIES_SCREEN.name}
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: colors.black,
          backgroundColor: colors.black,
        },
        tabBarActiveTintColor: colors.white,
      }}
    >
      <Tab.Group
        screenOptions={{
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: colors.black,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name={MOVIES_SCREEN.name}
          component={Movies}
          options={{
            title: i18n.t("nav.movies.title"),
            tabBarIcon: ({ color, size }) => (
              <Icon name="film-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={TV_SCREEN.name}
          component={Tv}
          options={{
            title: i18n.t("nav.tvShows.title"),
            tabBarIcon: ({ color, size }) => (
              <Icon name="tv-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={SEARCH_SCREEN.name}
          component={Search}
          options={{
            title: i18n.t("nav.search.title"),
            tabBarIcon: ({ color, size }) => (
              <Icon name="search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={PROFILE_SCREEN.name}
          component={Profile}
          options={{
            title: i18n.t("nav.profile.title"),
            headerStyle: {
              backgroundColor: colors.lotion,
            },
            headerTintColor: colors.black,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarIcon: () => <ProfileIcon />,
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  )
}

const RouterComponent = () => {
  const navigation = useRef()

  const scheme = useColorScheme()
  const dark = scheme === "dark"

  return (
    <NavigationContainer
      // @ts-ignore
      ref={navigation}
      theme={dark ? DarkTheme : DefaultTheme}
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
            statusBarStyle: "light",
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouterComponent
