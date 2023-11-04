import React from "react"
import { View, Text } from "react-native"

import { statusStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const StatusComponent = ({ children }: Props) => {
  return (
    <View style={statusStyles.root}>
      <Text style={statusStyles.text}>{children}</Text>
    </View>
  )
}

export default StatusComponent
