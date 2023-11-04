import React from "react"
import { View, Text } from "react-native"

import { formErrorStyles } from "styles"

type Props = {
  children: React.ReactNode
}

const FormErrorComponent = ({ children }: Props) => {
  return (
    <>
      {children && (
        <View style={formErrorStyles.container}>
          <Text style={formErrorStyles.text}>{children}</Text>
        </View>
      )}
    </>
  )
}

export default FormErrorComponent
