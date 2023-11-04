import React from "react"
import Ionicons from "react-native-vector-icons/Ionicons"

import colors from "styles/colors"

type Props = {
  name: string
  size: number
  color?: string
} & React.ComponentProps<typeof Ionicons>

const IconComponent = ({
  name,
  size,
  color = colors.white,
  ...restProps
}: Props) => {
  return <Ionicons name={name} color={color} size={size} {...restProps} />
}

export default IconComponent
