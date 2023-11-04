import React from "react"
import { View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "@realm/react"

import i18n from "config/i18n"
import { SEARCH_SCREEN } from "screens/Search"
import { PROFILE_SCREEN } from "screens/Profile"
import Avatar from "components/ui/Avatar"
import Icon from "components/ui/Icon"
import { tabBarStyles } from "styles"
import colors from "styles/colors"

const BottomTabBarComponent = () => {
  const navigation = useNavigation()
  const user = useUser()

  const TABS = [
    {
      id: 1,
      label: i18n.t("discover.title"),
      icon: <Icon name="albums-outline" color={colors.white} size={26} />,
    },
    {
      id: 2,
      label: i18n.t("search.title"),
      icon: <Icon name="search-outline" color={colors.gray} size={26} />,
    },
    {
      id: 3,
      label: i18n.t("profile.title"),
      icon: (
        <Avatar
          style={tabBarStyles.avatar}
          email={user?.profile?.email || user.id}
        />
      ),
      iconActive: (
        <Avatar
          style={tabBarStyles.avatar}
          email={user?.profile?.email || user.id}
        />
      ),
    },
  ]

  const handleClick = (id: number) => {
    switch (id) {
      case 1:
        break
      case 2:
        // @ts-ignore
        navigation.navigate(SEARCH_SCREEN.name)
        break
      case 3:
        // @ts-ignore
        navigation.navigate(PROFILE_SCREEN.name)
        break
      default:
        break
    }
  }

  return (
    <View style={tabBarStyles.list}>
      {TABS.map(({ id, icon }, index: number) => (
        <Pressable
          style={tabBarStyles.item}
          key={index}
          onPress={() => handleClick(id)}
        >
          {icon}
        </Pressable>
      ))}
    </View>
  )
}

export default BottomTabBarComponent
