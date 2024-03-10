import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme, useNavigation } from "@react-navigation/native"

import { usePersonDetails } from "hocs"
import Close from "components/ui/Close"
import Poster from "components/Person/Poster"
import Movies from "components/Person/Movies"
import TvShows from "components/Person/TvShows"
import { personStyles, layoutStyles } from "styles"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const navigation = useNavigation()
  const { dark } = useTheme()

  const { name, birthday, profilePath, gender, movieCredits, tvCredits } = item

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <>
      <Close isDark onPress={handleClose} />
      <Poster posterPath={profilePath} name={name} birthday={birthday} />
      <Animated.View
        style={[
          layoutStyles.roundCorners,
          layoutStyles.card,
          personStyles.root,
          personStyles.content,
          dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
        ]}
        entering={SlideInDown}
      >
        <Movies gender={gender} items={movieCredits} />
        <TvShows items={tvCredits} />
      </Animated.View>
    </>
  )
}

export default compose<ComponentType>(usePersonDetails)(ContentComponent)
