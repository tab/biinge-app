import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { usePersonMovieCredits } from "hocs"
import { personMoviesStyles } from "styles"
import List from "components/ui/MovieList"
import Typography from "components/ui/Typography"
import { MovieCastPerson, MovieCrewPerson, TMDB_FEMALE_GENDER } from "types"

type Props = {
  gender?: number
  cast: MovieCastPerson[]
  crew: MovieCrewPerson[]
}

const MoviesComponent = ({ gender, cast, crew }: Props) => {
  const { t } = useTranslation()

  const isCast = cast && cast.length > 0
  const isCrew = crew && crew.length > 0

  return (
    <View style={personMoviesStyles.root}>
      {isCast && (
        <View style={personMoviesStyles.content}>
          {gender !== undefined && (
            <Typography variant="subhead" style={personMoviesStyles.title}>
              {gender === TMDB_FEMALE_GENDER
                ? t("person.content.actress")
                : t("person.content.actor")}
            </Typography>
          )}
          <List showStatus numColumns={3} items={cast} />
        </View>
      )}
      {isCrew && (
        <View style={personMoviesStyles.content}>
          <Typography variant="subhead" style={personMoviesStyles.title}>
            {t("person.content.director")}
          </Typography>
          <List showStatus numColumns={3} items={crew} />
        </View>
      )}
    </View>
  )
}

export default compose<ComponentType>(usePersonMovieCredits)(MoviesComponent)
