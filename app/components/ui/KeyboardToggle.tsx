import React, { useEffect, useState } from "react"
import { Pressable, Keyboard, StyleSheet } from "react-native"
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated"

import colors from "styles/colors"
import Icon from "components/ui/Icon"

const KeyboardToggleComponent = () => {
  const [bottomOffset, setBottomOffset] = useState(0)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height + 10
        setBottomOffset(keyboardHeight)
        setVisible(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBottomOffset(0)
        setVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleClick = () => {
    setVisible(false)
    Keyboard.dismiss()
  }

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={
        isVisible ? [styles.root, { bottom: bottomOffset }] : styles.hidden
      }
    >
      <Pressable style={styles.content} onPress={handleClick}>
        <Icon name="chevron-down-outline" color={colors.white} size={24} />
      </Pressable>
    </Animated.View>
  )
}

export default KeyboardToggleComponent

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderRadius: 50,
    padding: 9,
  },
  hidden: {
    display: "none",
  },
})
