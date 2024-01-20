import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { usePersonTvCredits } from "hocs"
import { personTvStyles } from "styles"
import List from "components/ui/TvList"
import Typography from "components/ui/Typography"
import { TvCastPerson, TvCrewPerson } from "types"

type Props = {
  items: TvCastPerson[] | TvCrewPerson[]
}

const TvShowsComponent = ({ items }: Props) => {
  const { t } = useTranslation()

  const isPresent = items.length > 0

  return (
    <View style={personTvStyles.root}>
      {isPresent && (
        <>
          <View style={personTvStyles.content}>
            <Typography variant="subhead" style={personTvStyles.title}>
              {t("person.content.tv")}
            </Typography>
            <List showStatus numColumns={3} items={items} />
          </View>
        </>
      )}
    </View>
  )
}

export default compose<ComponentType>(usePersonTvCredits)(TvShowsComponent)
