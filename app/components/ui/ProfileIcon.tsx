import React from "react"
import { useUser } from "@realm/react"

import Avatar from "components/ui/Avatar"
import { tabBarStyles } from "styles"

const ProfileIconComponent = () => {
  const user = useUser()

  return (
    <Avatar
      style={tabBarStyles.avatar}
      email={user?.profile?.email || user.id}
    />
  )
}

export default ProfileIconComponent
