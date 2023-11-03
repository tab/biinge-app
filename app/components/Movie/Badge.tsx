import React from "react"
import { View, Text } from "react-native"

import { badgeStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const BadgeComponent = ({ children }: Props) => {
  return (
    <View style={badgeStyles.container}>
      <Text style={badgeStyles.text}>{children}</Text>
    </View>
  )
}

export default BadgeComponent
