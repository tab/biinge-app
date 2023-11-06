import React from "react"
import { Pressable } from "react-native"
import { BlurView } from "@react-native-community/blur"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { useTranslation } from "react-i18next"

import { overlayStyles } from "styles"
import Button from "components/ui/Button"
import colors from "styles/colors"

type Props = {
  want: boolean
  watched: boolean
  onWant: () => void
  onWatched: () => void
  onCancel: () => void
}

const MenuComponent = ({
  want,
  watched,
  onWant,
  onWatched,
  onCancel,
}: Props) => {
  const { t } = useTranslation()

  const handleWant = () => onWant()
  const handleWatched = () => onWatched()
  const handleCancel = () => onCancel()

  return (
    <Animated.View entering={FadeIn} style={overlayStyles.root}>
      <BlurView
        style={overlayStyles.blur}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor={colors.white}
      />
      <Pressable style={overlayStyles.overlayButton} onPress={handleCancel} />
      <Animated.View entering={FadeInDown} style={overlayStyles.actions}>
        {want || watched ? (
          <>
            {want && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={handleWant}
              >
                {t("actions.want.remove")}
              </Button>
            )}
            {watched && (
              <Button
                style={[overlayStyles.button, overlayStyles.buttonDanger]}
                textStyle={[overlayStyles.text, overlayStyles.textDanger]}
                onPress={handleWatched}
              >
                {t("actions.watched.remove")}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={handleWant}
            >
              {t("actions.want.add")}
            </Button>
            <Button
              style={[overlayStyles.button]}
              textStyle={[overlayStyles.text]}
              onPress={handleWatched}
            >
              {t("actions.watched.add")}
            </Button>
          </>
        )}
        <Button
          style={[overlayStyles.button, overlayStyles.buttonCancel]}
          textStyle={[overlayStyles.text]}
          onPress={handleCancel}
        >
          {t("actions.cancel.title")}
        </Button>
      </Animated.View>
    </Animated.View>
  )
}

export default MenuComponent
