import React from "react"
import { View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { peopleStyles, layoutStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/PeopleList"
import { CastPerson, CrewPerson } from "types"

type Props = {
  items: CastPerson[] | CrewPerson[]
}

const PeopleComponent = ({ items }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  return (
    <View
      style={[
        peopleStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <Typography variant="callout" style={peopleStyles.title}>
        {t("content.cast")}
      </Typography>
      <List items={items} />
    </View>
  )
}

export default PeopleComponent
