import React from "react"
import { View, ScrollView } from "react-native"

import Content from "components/Movie/Content"
import People from "components/Movie/People"
import Recommendations from "components/Movie/Recommendations"
import { layoutStyles } from "styles"

type Props = {
  route: any
}

const DetailsScreen = ({ route }: Props) => {
  const { params } = route
  const { id } = params

  return (
    <View style={[layoutStyles.root, layoutStyles.bgTransparent]}>
      <ScrollView
        contentContainerStyle={null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        {/* @ts-ignore */}
        <Content id={id} />
        {/* @ts-ignore */}
        <People id={id} />
        {/* @ts-ignore */}
        <Recommendations id={id} />
      </ScrollView>
    </View>
  )
}

export const DETAILS_SCREEN = {
  id: "DETAILS_SCREEN",
  name: "com.biinge.Details",
}

export default DetailsScreen
