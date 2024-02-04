import React, { useState } from "react"
import { Modal, Pressable } from "react-native"
import Animated, { ZoomIn } from "react-native-reanimated"

import Player from "components/ui/Player"
import Icon from "components/ui/Icon"
import { Video } from "types"
import colors from "styles/colors"
import { playStyles } from "styles"

type Props = {
  items: Video[]
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
        <Animated.View entering={ZoomIn.delay(500)} style={playStyles.root}>
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

export default PlayComponent
