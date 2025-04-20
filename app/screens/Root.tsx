import React from "react"
import { BSON } from "realm"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import i18n from "config/i18n"
import { Profile as UserProfile } from "models"
import { APP_APPEARANCE_DARK, APP_APPEARANCE_SYSTEM } from "config"
import Movies, { MOVIES_SCREEN } from "screens/Movies"
import Tv, { TV_SCREEN } from "screens/Tv"
import Search, { SEARCH_SCREEN } from "screens/Search"
import Profile, { PROFILE_SCREEN } from "screens/Profile"
import Icon from "components/ui/Icon"
import ProfileIcon from "components/ui/ProfileIcon"
import { darkTheme, lightTheme } from "styles/theme"
import { useUser, useObject } from "@realm/react"
import { useColorScheme } from "react-native"

const Tab = createBottomTabNavigator()

const Root = () => {
  const user = useUser()
  const profile = useObject<UserProfile>(
    UserProfile,
    new BSON.ObjectId(user.id),
  )

  const scheme = useColorScheme()
  const dark =
    profile?.appearance != null
      ? profile?.appearance === APP_APPEARANCE_DARK ||
      (profile?.appearance === APP_APPEARANCE_SYSTEM &&
        scheme === APP_APPEARANCE_DARK)
      : scheme === APP_APPEARANCE_DARK

  return (
    <Tab.Navigator
      initialRouteName={MOVIES_SCREEN.name}
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: dark ? darkTheme.colors.card : lightTheme.colors.card,
          backgroundColor: dark
            ? darkTheme.colors.card
            : lightTheme.colors.card,
        },
        tabBarActiveTintColor: dark
          ? darkTheme.colors.text
          : lightTheme.colors.text,
        tabBarInactiveTintColor: dark
          ? darkTheme.colors.textSecondary
          : lightTheme.colors.textSecondary,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Group
        screenOptions={{
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: dark
              ? darkTheme.colors.card
              : lightTheme.colors.card,
          },
          headerTintColor: dark
            ? darkTheme.colors.text
            : lightTheme.colors.text,
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
            tabBarIcon: () => <ProfileIcon />,
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  )
}

export default Root
