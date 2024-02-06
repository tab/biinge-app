import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import Animated, { SlideInDown } from "react-native-reanimated"
import { useTheme } from "@react-navigation/native"

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
  const { dark } = useTheme()

  const { name, birthday, profile_path, gender, credits, tv_credits } = item

  return (
    <>
      <Close />
      <Poster poster_path={profile_path} name={name} birthday={birthday} />
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
        <Movies gender={gender} items={credits} />
        <TvShows items={tv_credits} />
      </Animated.View>
    </>
  )
}

export default compose<ComponentType>(usePersonDetails)(ContentComponent)
