import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { personListStyles } from "styles"
import List from "components/ui/TvList"
import Typography from "components/ui/Typography"
import { CastPerson, CrewPerson } from "types"

type Props = {
  items: CastPerson[] | CrewPerson[]
}

const TvShowsComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  const isPresent = items.length > 0

  return (
    <>
      {isPresent && (
        <View style={personListStyles.content}>
          <Typography variant="subhead" style={personListStyles.title}>
            {t("person.content.tv")}
          </Typography>
          <List showStatus numColumns={3} items={items} />
        </View>
      )}
    </>
  )
}

export default TvShowsComponent
