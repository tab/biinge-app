import React from "react"
import { View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { recommendationsStyles, layoutStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/MovieHorizontalList"
import { MovieRecommendations } from "types"

type Props = {
  items: MovieRecommendations[]
}

const RecommendationsComponent = ({ items }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const visible = items.length > 0

  return (
    <>
      {visible && (
        <View
          style={[
            recommendationsStyles.root,
            dark ? layoutStyles.bgDarkCard : layoutStyles.bgLight,
          ]}
        >
          <Typography variant="callout" style={recommendationsStyles.title}>
            {t("movie.content.recommendations")}
          </Typography>
          <List showStatus items={items} />
        </View>
      )}
    </>
  )
}

export default RecommendationsComponent
