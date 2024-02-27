import React from "react"
import { View } from "react-native"
import { useUser } from "@realm/react"
import { useTheme } from "@react-navigation/native"

import Menu from "components/Profile/Menu"
import Avatar from "components/ui/Avatar"
import Typography from "components/ui/Typography"
import { profileStyles, layoutStyles, textStyles } from "styles"

const ProfileScreen = () => {
  const { dark } = useTheme()
  const user = useUser()

  return (
    <View
      style={[
        profileStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <View style={profileStyles.content}>
        <View
          style={[
            profileStyles.section,
            dark
              ? layoutStyles.bgDarkSecondCard
              : layoutStyles.bgLightSecondCard,
          ]}
        >
          <Typography
            variant="callout"
            style={dark ? textStyles.textDark : textStyles.textLight}
          >
            {user?.profile?.email}
          </Typography>
          <Avatar
            style={profileStyles.avatar}
            size={210}
            email={user?.profile?.email || user.id}
          />
        </View>

        <Menu />
      </View>
    </View>
  )
}

export const PROFILE_SCREEN = {
  id: "PROFILE_SCREEN",
  name: "com.biinge.Profile",
}

export default ProfileScreen
