import React from "react"
import { FlatList, View } from "react-native"

import Content from "components/Person/Content"
import Movies from "components/Person/Movies"
import { layoutStyles } from "styles"

type Props = {
  route: any
}

const PersonScreen = ({ route }: Props) => {
  const { params } = route
  const { id } = params

  const SECTIONS = [
    {
      key: "content",
      component: (
        // @ts-ignore
        <Content id={id} />
      ),
    },
    {
      key: "movies",
      component: (
        // @ts-ignore
        <Movies id={id} />
      ),
    },
  ]

  const renderItem = ({ item }: { item: any }) => {
    return item.component
  }

  return (
    <View style={[layoutStyles.root, layoutStyles.bgTransparent]}>
      <FlatList
        data={SECTIONS}
        renderItem={renderItem}
        keyExtractor={(item, index: number) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      />
    </View>
  )
}

export const PERSON_SCREEN = {
  id: "PERSON_SCREEN",
  name: "com.biinge.Person",
}

export default PersonScreen
