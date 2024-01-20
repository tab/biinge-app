import React from "react"
import { Pressable } from "react-native"
import { BlurView } from "@react-native-community/blur"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { useTranslation } from "react-i18next"

import { overlayStyles } from "styles"
import Poster from "components/ui/Poster"
import Button from "components/ui/Button"
import colors from "styles/colors"

type Props = {
  poster_path: string
  pinned: boolean
  want: boolean
  watching: boolean
  watched: boolean
  onPin: () => void
  onUnpin: () => void
  onWant: () => void
  onWatching: () => void
  onWatched: () => void
  onMoveToWant: () => void
  onMoveToWatched: () => void
  onCancel: () => void
}

const MenuComponent = ({
  poster_path,
  pinned,
  want,
  watching,
  watched,
  onPin,
  onUnpin,
  onWant,
  onWatching,
  onWatched,
  onMoveToWant,
  onMoveToWatched,
  onCancel,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Animated.View entering={FadeIn} style={overlayStyles.root}>
      <BlurView
        style={overlayStyles.blur}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor={colors.white}
      />
      <Poster poster_path={poster_path} />

      <Pressable style={overlayStyles.overlayButton} onPress={onCancel} />

      <Animated.View entering={FadeInDown} style={overlayStyles.actions}>
        {want || watching || watched ? (
          <>
            {want && (
              <>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onWant}
                >
                  {t("actions.want.remove")}
                </Button>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onMoveToWatched}
                >
                  {t("actions.want.watched")}
                </Button>
              </>
            )}
            {watching && (
              <>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onWatching}
                >
                  {t("actions.watching.remove")}
                </Button>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onMoveToWant}
                >
                  {t("actions.watched.want")}
                </Button>
              </>
            )}
            {watched && (
              <>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onWatched}
                >
                  {t("actions.watched.remove")}
                </Button>
                <Button
                  style={overlayStyles.button}
                  textStyle={overlayStyles.text}
                  onPress={onMoveToWant}
                >
                  {t("actions.watched.want")}
                </Button>
              </>
            )}
            {pinned ? (
              <Button
                style={overlayStyles.button}
                textStyle={overlayStyles.text}
                onPress={onUnpin}
              >
                {t("actions.pin.remove")}
              </Button>
            ) : (
              <Button
                style={overlayStyles.button}
                textStyle={overlayStyles.text}
                onPress={onPin}
              >
                {t("actions.pin.add")}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              style={overlayStyles.button}
              textStyle={overlayStyles.text}
              onPress={onWant}
            >
              {t("actions.want.add")}
            </Button>
            <Button
              style={overlayStyles.button}
              textStyle={overlayStyles.text}
              onPress={onWatched}
            >
              {t("actions.watched.add")}
            </Button>
          </>
        )}
        <Button
          style={overlayStyles.button}
          textStyle={overlayStyles.text}
          onPress={onCancel}
        >
          {t("actions.cancel.title")}
        </Button>
      </Animated.View>
    </Animated.View>
  )
}

export default MenuComponent
