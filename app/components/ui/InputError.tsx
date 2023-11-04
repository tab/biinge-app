import React from "react"
import { View, Text } from "react-native"

import { inputErrorStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const InputErrorComponent = ({ children }: Props) => {
  return (
    <>
      {children && (
        <View style={inputErrorStyles.container}>
          <Text style={inputErrorStyles.text}>{children}</Text>
        </View>
      )}
    </>
  )
}

export default InputErrorComponent
