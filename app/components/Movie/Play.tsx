import React, { ComponentType, useState } from "react"
import { compose } from "@reduxjs/toolkit"
import { Modal, Pressable } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useMovieVideos } from "hocs"
import Player from "components/ui/Player"
import Icon from "components/ui/Icon"
import { MovieVideo } from "types"
import colors from "styles/colors"
import { playStyles } from "styles"

type Props = {
  items: MovieVideo[]
}

const PlayComponent = ({ items }: Props) => {
  const [visible, setVisible] = useState(false)
  const trailer = items[0]

  const handlePlayer = () => {
    setVisible(!visible)
  }

  return (
    <>
      {trailer && (
        <Animated.View entering={FadeIn} style={playStyles.root}>
          <Pressable style={playStyles.button} onPress={handlePlayer}>
            <Icon name="play" color={colors.white} size={24} />
          </Pressable>
          <Modal transparent animationType="none" visible={visible}>
            <Player videoId={trailer.key} onClose={handlePlayer} />
          </Modal>
        </Animated.View>
      )}
    </>
  )
}

export default compose<ComponentType>(useMovieVideos)(PlayComponent)
