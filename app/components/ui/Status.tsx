import React from "react"
import { View, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

import { statusStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const StatusComponent = ({ children }: Props) => {
  const { dark } = useTheme()

  return (
    <View
      style={[statusStyles.root, dark ? statusStyles.dark : statusStyles.light]}
    >
      <Text
        style={[
          statusStyles.text,
          dark ? statusStyles.dark : statusStyles.light,
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

export default StatusComponent
