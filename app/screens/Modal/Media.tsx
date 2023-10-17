import React, { ComponentType } from "react"
import { compose } from "@reduxjs/toolkit"
import { SafeAreaView, ScrollView } from "react-native"

import { useMedia } from "hocs"
import Poster from "components/Media/Poster"
import Content from "components/Media/Content"
import { layoutStyles } from "styles"
import { Media } from "models/Media"

type Props = {
  id: string
  item: Media
  componentId: string
}

const MediaModal = ({ item }: Props) => {
  return (
    <SafeAreaView style={layoutStyles.root}>
      <ScrollView
        contentContainerStyle={null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        <Poster item={item} />
        <Content item={item} />
      </ScrollView>
    </SafeAreaView>
  )
}

export const MEDIA_MODAL = {
  name: "com.biinge.MediaModal",
}

export default compose<ComponentType>(useMedia)(MediaModal)
