import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { BlurView } from "@react-native-community/blur"
import LinearGradient from "react-native-linear-gradient"

import { MovieContext } from "contexts/MovieContext"
import { usePersonDetails } from "hocs"
import { formatDate } from "helpers/formatDate"
import Title from "components/ui/Title"
import Typography from "components/ui/Typography"
import Image from "components/ui/BWImage"
import { personImageStyles, personStyles } from "styles"
import colors from "styles/colors"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const { name, birthday, profile_path } = item

  return (
    <View style={personImageStyles.root}>
      <BlurView
        style={personImageStyles.blur}
        blurType="light"
        blurAmount={15}
        reducedTransparencyFallbackColor={colors.white}
      />
      <Image style={personImageStyles.image} size="w780" path={profile_path} />
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
      <View style={personStyles.content}>
        <Title style={personStyles.title}>{name}</Title>
        {birthday && (
          <Typography variant="headline" style={personStyles.date}>
            {formatDate(birthday)}
          </Typography>
        )}
      </View>
    </View>
  )
}

export default compose<ComponentType>(usePersonDetails)(ContentComponent)
