import React from "react"
import { Pressable } from "react-native"
import { BlurView } from "@react-native-community/blur"
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"
import { useTranslation } from "react-i18next"

import { overlayStyles } from "styles"
import Poster from "components/ui/Poster"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import colors from "styles/colors"

type Props = {
  posterPath: string
  pinned: boolean
  want: boolean
  watched: boolean
  onPin: () => void
  onUnpin: () => void
  onWant: () => void
  onWatched: () => void
  onMoveToWant: () => void
  onMoveToWatched: () => void
  onCancel: () => void
}

const MenuComponent = ({
  posterPath,
  pinned,
  want,
  watched,
  onPin,
  onUnpin,
  onWant,
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
      <Poster posterPath={posterPath} />

      <Pressable style={overlayStyles.overlayButton} onPress={onCancel} />

      <Animated.View entering={FadeInDown} style={overlayStyles.actions}>
        {want || watched ? (
          <>
            {want && (
              <>
                <Button style={overlayStyles.button} onPress={onWant}>
                  <Typography variant="body" style={overlayStyles.text}>
                    {t("actions.want.remove")}
                  </Typography>
                </Button>
                <Button style={overlayStyles.button} onPress={onMoveToWatched}>
                  <Typography variant="body" style={overlayStyles.text}>
                    {t("actions.want.watched")}
                  </Typography>
                </Button>
              </>
            )}
            {watched && (
              <>
                <Button style={overlayStyles.button} onPress={onWatched}>
                  <Typography variant="body" style={overlayStyles.text}>
                    {t("actions.watched.remove")}
                  </Typography>
                </Button>
                <Button style={overlayStyles.button} onPress={onMoveToWant}>
                  <Typography variant="body" style={overlayStyles.text}>
                    {t("actions.watched.want")}
                  </Typography>
                </Button>
              </>
            )}
            {pinned ? (
              <Button style={overlayStyles.button} onPress={onUnpin}>
                <Typography variant="body" style={overlayStyles.text}>
                  {t("actions.pin.remove")}
                </Typography>
              </Button>
            ) : (
              <Button style={overlayStyles.button} onPress={onPin}>
                <Typography variant="body" style={overlayStyles.text}>
                  {t("actions.pin.add")}
                </Typography>
              </Button>
            )}
          </>
        ) : (
          <>
            <Button style={overlayStyles.button} onPress={onWant}>
              <Typography variant="body" style={overlayStyles.text}>
                {t("actions.want.add")}
              </Typography>
            </Button>
            <Button style={overlayStyles.button} onPress={onWatched}>
              <Typography variant="body" style={overlayStyles.text}>
                {t("actions.watched.add")}
              </Typography>
            </Button>
          </>
        )}
        <Button style={overlayStyles.button} onPress={onCancel}>
          <Typography variant="body" style={overlayStyles.text}>
            {t("actions.cancel.title")}
          </Typography>
        </Button>
      </Animated.View>
    </Animated.View>
  )
}

export default MenuComponent
