import React from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useTranslation } from "react-i18next"

import { posterStyles } from "styles"
import Image from "components/ui/Image"
import Rating from "components/Media/Rating"
import Badge from "components/Media/Badge"
import ContentRating from "components/Media/ContentRating"
import { Media } from "models/Media"

type Props = {
  item: Media
}

const PosterComponent = ({
  item: { image, contentRating, star, want, watched },
}: Props) => {
  const { t } = useTranslation()

  return (
    <View style={posterStyles.container}>
      <Image style={posterStyles.image} image={image} />
      <LinearGradient
        style={posterStyles.gradient}
        colors={[
          "rgba(0, 0, 0, 0) 100%)",
          "rgba(0, 0, 0, 0.4) 50%",
          "rgba(0, 0, 0, 0.6) 0%",
        ]}
      />
      <Rating>{star}</Rating>
      {(want || watched) && (
        <Badge>{want ? t("badge.want.title") : t("badge.watched.title")}</Badge>
      )}
      <ContentRating>{contentRating}</ContentRating>
    </View>
  )
}

export default PosterComponent
