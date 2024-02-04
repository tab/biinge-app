import React from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"

import Content from "components/Person/Content"
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
  ]

  const renderItem = ({ item }: { item: any }) => {
    return item.component
  }

  return (
    <View style={[layoutStyles.root, layoutStyles.bgDark]}>
      <FlashList
        data={SECTIONS}
        renderItem={renderItem}
        keyExtractor={(_, index: number) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        estimatedItemSize={500}
      />
    </View>
  )
}

export const PERSON_SCREEN = {
  id: "PERSON_SCREEN",
  name: "com.biinge.Person",
}

export default PersonScreen
