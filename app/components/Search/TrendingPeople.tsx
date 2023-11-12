import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { usePeopleTrending } from "hocs"
import { searchResultsStyles } from "styles"
import List from "components/ui/PeopleList"
import Typography from "components/ui/Typography"
import { PeopleListType } from "types"

type Props = {
  items: PeopleListType
}

const PeopleComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  return (
    <View style={searchResultsStyles.content}>
      <Typography variant="subhead" style={searchResultsStyles.title}>
        {t("search.people.trending.title")}
      </Typography>
      <List items={items} />
    </View>
  )
}

export default compose<ComponentType>(usePeopleTrending)(PeopleComponent)
