import React from "react"
import { Pressable } from "react-native"
import { BlurView } from "@react-native-community/blur"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { useTranslation } from "react-i18next"

import { overlayStyles } from "styles"
import Button from "components/ui/Button"
import colors from "styles/colors"

type Props = {
  pinned: boolean
  want: boolean
  watched: boolean
  onPin: () => void
  onUnpin: () => void
  onWant: () => void
  onWatched: () => void
  onCancel: () => void
}

const MenuComponent = ({
  pinned,
  want,
  watched,
  onPin,
  onUnpin,
  onWant,
  onWatched,
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
      <Pressable style={overlayStyles.overlayButton} onPress={onCancel} />
      <Animated.View entering={FadeInDown} style={overlayStyles.actions}>
        {want || watched ? (
          <>
            {want && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={onWant}
              >
                {t("actions.want.remove")}
              </Button>
            )}
            {watched && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={onWatched}
              >
                {t("actions.watched.remove")}
              </Button>
            )}
            {pinned ? (
              <Button
                style={[overlayStyles.button]}
                textStyle={[overlayStyles.text]}
                onPress={onUnpin}
              >
                {t("actions.pin.remove", {
                  name: want
                    ? t("actions.want.title")
                    : t("actions.watched.title"),
                })}
              </Button>
            ) : (
              <Button
                style={[overlayStyles.button]}
                textStyle={[overlayStyles.text]}
                onPress={onPin}
              >
                {t("actions.pin.add", {
                  name: want
                    ? t("actions.want.title")
                    : t("actions.watched.title"),
                })}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={onWant}
            >
              {t("actions.want.add")}
            </Button>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={onWatched}
            >
              {t("actions.watched.add")}
            </Button>
          </>
        )}
        <Button
          style={[overlayStyles.button, overlayStyles.buttonCancel]}
          textStyle={[overlayStyles.text]}
          onPress={onCancel}
        >
          {t("actions.cancel.title")}
        </Button>
      </Animated.View>
    </Animated.View>
  )
}

export default MenuComponent
