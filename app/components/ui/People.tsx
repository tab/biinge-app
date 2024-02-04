import React from "react"
import { View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { peopleStyles, layoutStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/PeopleList"
import { MovieCredits } from "types"

type Props = {
  items: MovieCredits[]
}

const PeopleComponent = ({ items }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  return (
    <View
      style={[
        peopleStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLight,
      ]}
    >
      <Typography variant="callout" style={peopleStyles.title}>
        {t("movie.content.cast")}
      </Typography>
      <List items={items} />
    </View>
  )
}

export default PeopleComponent
