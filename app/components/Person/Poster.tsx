import React from "react"
import { View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import LinearGradient from "react-native-linear-gradient"
import { BlurView } from "@react-native-community/blur"
import { useTheme } from "@react-navigation/native"

import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import { formatDate } from "helpers/formatDate"
import Image from "components/ui/BWImage"
import Title from "components/ui/Title"
import Typography from "components/ui/Typography"
import { personPosterStyles, personStyles } from "styles"
import colors from "styles/colors"

type Props = {
  poster_path: string
  name: string
  birthday: string
}

const PosterComponent = ({ poster_path, name, birthday }: Props) => {
  const { dark } = useTheme()

  return (
    <View style={personPosterStyles.root}>
      <BlurView
        style={personPosterStyles.blur}
        blurType={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <View style={personPosterStyles.card}>
        <Image
          style={personPosterStyles.image}
          size="w780"
          path={poster_path}
        />
        <LinearGradient
          style={personPosterStyles.blur}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0.5)",
            "rgba(0,0,0,1)",
          ]}
        />
        <Animated.View
          style={personPosterStyles.content}
          entering={FadeIn.delay(500)}
        >
          <Title style={personStyles.title}>{name}</Title>
          {birthday && (
            <Typography variant="headline" style={personStyles.date}>
              {formatDate(birthday)}
            </Typography>
          )}
        </Animated.View>
      </View>
    </View>
  )
}

export default PosterComponent
