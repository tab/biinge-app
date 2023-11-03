import React from "react"
import { View, ViewStyle, StyleProp } from "react-native"
import FastImage from "react-native-fast-image"
import { MD5 } from "crypto-js"

import { avatarStyles } from "styles"

type Props = {
  style?: StyleProp<ViewStyle>
  email: string
  size?: number
}

const AvatarComponent = ({ style, email, size }: Props) => {
  const uri = `https://www.gravatar.com/avatar/${MD5(
    email,
  ).toString()}/?s=${size}&d=mp`

  return (
    <View style={[avatarStyles.root, style]}>
      <FastImage
        style={avatarStyles.image}
        source={{
          uri: uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  )
}

AvatarComponent.defaultProps = {
  size: 150,
}

export default AvatarComponent
