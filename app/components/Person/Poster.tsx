import React from "react"
import { BlurView } from "@react-native-community/blur"

import { personImageStyles } from "styles"
import Image from "components/ui/BWImage"
import colors from "styles/colors"
import LinearGradient from "react-native-linear-gradient"

type Props = {
  poster_path: string
}

const PosterComponent = ({ poster_path }: Props) => {
  return (
    <>
      <BlurView
        style={personImageStyles.blur}
        blurType="light"
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <Image style={personImageStyles.image} size="w780" path={poster_path} />
      <LinearGradient
        style={personImageStyles.blur}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,1)",
        ]}
      />
    </>
  )
}

export default PosterComponent
