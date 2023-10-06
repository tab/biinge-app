import React, { ComponentType, useEffect } from "react"
import { compose } from "@reduxjs/toolkit"
import { Navigation } from "react-native-navigation"
import { SafeAreaView, ScrollView } from "react-native"

import { useMedia } from "hocs"
import { useAppDispatch } from "redux/hooks"
import { closeMenu } from "redux/features/media/mediaMenuSlice"
import Poster from "components/Media/Poster"
import Content from "components/Media/Content"
import Menu from "components/Media/Menu"
import { layoutStyles } from "styles"
import { MediaType } from "types"

type Props = {
  id: string
  media: MediaType
  componentId: string
}

const MediaScreen = ({ media, componentId }: Props) => {
  const dispatch = useAppDispatch()

  const { image, star, contentRating } = media

  useEffect(() => {
    const unsubscribe = Navigation.events().registerComponentListener(
      {
        componentDidAppear: () => {},
        componentDidDisappear: () => {
          dispatch(closeMenu())
        },
      },
      componentId,
    )
    return () => {
      unsubscribe.remove()
    }
  }, [componentId])

  return (
    <SafeAreaView style={layoutStyles.root}>
      <ScrollView
        contentContainerStyle={null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        <Poster image={image} star={star} contentRating={contentRating} />
        <Content media={media} />
      </ScrollView>
      <Menu media={media} />
    </SafeAreaView>
  )
}

export const MEDIA_SCREEN = {
  name: "com.biinge.Media",
}

export default compose<ComponentType>(useMedia)(MediaScreen)
