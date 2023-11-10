import React from "react"
import { View, StyleProp, TextStyle } from "react-native"

import Typography from "components/ui/Typography"
import { titleStyles } from "styles"

type Props = {
  style?: StyleProp<TextStyle>
  aside?: React.ReactNode
  children: React.ReactNode
}

const TitleComponent = ({ style, aside, children }: Props) => {
  return (
    <View style={titleStyles.root}>
      <Typography
        variant="title1"
        style={[aside ? titleStyles.short : titleStyles.full, style]}
      >
        {children}
      </Typography>
      {aside && <>{aside}</>}
    </View>
  )
}

export default TitleComponent
