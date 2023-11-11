import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { View } from "react-native"

import { usePersonDetails } from "hocs"
import { formatDate } from "helpers/formatDate"
import Poster from "components/Person/Poster"
import Title from "components/ui/Title"
import Typography from "components/ui/Typography"
import { personImageStyles, personStyles } from "styles"

type Props = {
  item: any
}

const ContentComponent = ({ item }: Props) => {
  const { name, birthday, profile_path } = item

  return (
    <View style={personImageStyles.root}>
      <Poster poster_path={profile_path} />
      <View style={personStyles.content}>
        <Title style={personStyles.title}>{name}</Title>
        {birthday && (
          <Typography variant="headline" style={personStyles.date}>
            {formatDate(birthday)}
          </Typography>
        )}
      </View>
    </View>
  )
}

export default compose<ComponentType>(usePersonDetails)(ContentComponent)
