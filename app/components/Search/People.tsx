import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { usePersonSearch } from "hocs"
import { searchResultsStyles } from "styles"
import List from "components/ui/PeopleList"
import Typography from "components/ui/Typography"
import { SearchResultListType } from "types"

type Props = {
  items: SearchResultListType
}

const PeopleComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  return (
    <View style={searchResultsStyles.content}>
      <Typography variant="subhead" style={searchResultsStyles.title}>
        {t("search.people.results.title")}
      </Typography>
      <List items={items} />
    </View>
  )
}

export default compose<ComponentType>(usePersonSearch)(PeopleComponent)
