import React from "react"
import { StyleProp } from "react-native"
import FastImage from "react-native-fast-image"

type Props = {
  image: string
  style?: StyleProp<any>
}

const ImageComponent = ({ image, style }: Props) => {
  return (
    <FastImage
      style={style}
      source={{
        uri: image,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  )
}

export default ImageComponent
