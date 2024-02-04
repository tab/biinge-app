import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { personListStyles } from "styles"
import List from "components/ui/MovieList"
import Typography from "components/ui/Typography"
import {
  CastPerson,
  CrewPerson,
  TMDB_FEMALE_GENDER,
  TMDB_JOB_DIRECTOR,
} from "types"

type Props = {
  gender?: number
  items: CastPerson[] | CrewPerson[]
}

const MoviesComponent = ({ gender, items }: Props) => {
  const { t } = useTranslation()

  const cast = items.filter((item) => item.type !== TMDB_JOB_DIRECTOR)
  const crew = items.filter((item) => item.type === TMDB_JOB_DIRECTOR)

  const isCast = cast && cast.length > 0
  const isCrew = crew && crew.length > 0

  return (
    <>
      {isCast && (
        <View style={personListStyles.content}>
          {gender !== undefined && (
            <Typography variant="subhead" style={personListStyles.title}>
              {gender === TMDB_FEMALE_GENDER
                ? t("person.content.actress")
                : t("person.content.actor")}
            </Typography>
          )}
          {/* @ts-ignore */}
          <List showStatus numColumns={3} items={cast} />
        </View>
      )}
      {isCrew && (
        <View style={personListStyles.content}>
          <Typography variant="subhead" style={personListStyles.title}>
            {t("person.content.director")}
          </Typography>
          {/* @ts-ignore */}
          <List showStatus numColumns={3} items={crew} />
        </View>
      )}
    </>
  )
}

export default MoviesComponent
