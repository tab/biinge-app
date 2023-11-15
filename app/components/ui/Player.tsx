import React, { useState } from "react"
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native"
import YouTube from "react-native-youtube"

import { YOUTUBE_API_KEY } from "config"
import Icon from "components/ui/Icon"
import colors from "styles/colors"
import { TMDB_VIDEO_NOT_EMBEDDABLE } from "types"

type PlayerProps = {
  videoId: string
  onClose: () => void
}

const PlayerComponent: React.FC<PlayerProps> = ({ videoId, onClose }) => {
  const [loading, setLoading] = useState(true)

  const handleReady = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const handleError = (error: { error: string; target: number }) => {
    if (error && error.error === TMDB_VIDEO_NOT_EMBEDDABLE) {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Icon style={styles.icon} name="close" color={colors.white} size={30} />
        <Pressable style={styles.close} onPress={onClose} />
        <YouTube
          apiKey={YOUTUBE_API_KEY}
          videoId={videoId}
          play
          controls={1}
          modestbranding
          showFullscreenButton
          fullscreen
          style={styles.player}
          onReady={handleReady}
          onError={handleError}
        />
        <ActivityIndicator
          style={loading ? styles.loader : styles.hidden}
          animating={true}
          size="small"
          color={colors.white}
        />
      </View>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.darkBlack,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  player: {
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1",
    width: width,
  },
  loader: {
    backgroundColor: colors.darkBlack,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hidden: {
    opacity: 0,
  },
  close: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    position: "absolute",
    top: 5,
    left: 10,
  },
})

export default PlayerComponent
